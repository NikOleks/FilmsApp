import { Injectable, Inject } from '@angular/core'; 
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Actor } from './actor.model';
import { ConfigService } from './config.service';
import { REQUEST_CONFIG } from './config';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  currentPage: number;
  totalPages: number;
  actorsList: Actor[];
  isLoading: boolean = false;
  pagesBus$ = new Subject();
  actorsBus$ = new Subject();
  spinnerBus$ = new Subject();
  popularActorsSubscription: Subscription;
  newTransform = (actor) => {
    return {
      id: actor.id,
      name: actor.name,
      imgUrl: `${this.config.smallBackPath}${actor.profile_path}`
    }
  };
  
  constructor(private http: HttpClient, @Inject(REQUEST_CONFIG) private config: ConfigService) { }

  loadingChanged() {
    if (this.isLoading){
      this.isLoading = false;
      console.log("spinner stop");
    }
    else{
      this.isLoading = true;
      console.log("spinner start");
    }
    this.spinnerBus$.next(this.isLoading);
  }

  getPopularActors (page?: number){
    return this.http.get(`${this.config.personUrl}/popular?page=${page}${this.config.params}`).pipe(debounceTime(5000));
  }

  actorsSubscriber(page: number){
    this.loadingChanged();
    this.popularActorsSubscription = this.getPopularActors(page).subscribe(
      (list: any) => {
        this.actorsList = list.results.map(this.newTransform);
        this.totalPages = list.total_pages;
        this.loadingChanged();
        this.pagesBus$.next(this.totalPages);
        this.actorsBus$.next(this.actorsList);
      },
      err => {
        console.log("error");
      }
    );
  }

  nextPage(page: number){
    this.actorsSubscriber(page);
  }

  getActorsList(){
    return this.actorsBus$.asObservable();
  }

  getTotalPages(){
    return this.pagesBus$.asObservable();
  }

  getSpinnerStatus(){
    return this.spinnerBus$.asObservable();
  }

  ngOnDestroy(){
    this.popularActorsSubscription.unsubscribe();
  }
}


