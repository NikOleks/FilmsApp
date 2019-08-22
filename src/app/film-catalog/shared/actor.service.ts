import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Actor } from './actor.model';
import { ConfigService } from './config.service';
import { REQUEST_CONFIG } from './config';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  currentPage: number;
  totalPages: number = -1;
  actorsList: Actor[];
  isLoading: boolean = false;
  isSearchMode: boolean = false;
  searchString: string;
  actorsBus$ = new Subject();
  spinnerBus$ = new Subject();
  searchBus$ = new Subject();
  popularActorsSubscription: Subscription;
  searchActorsSubscription: Subscription;
  
  newTransform = (actor) => {
    return {
      id: actor.id,
      name: actor.name,
      imgUrl: `${this.config.smallBackPath}${actor.profile_path}`
    }
  };

  constructor(private http: HttpClient, @Inject(REQUEST_CONFIG) private config: ConfigService) { }

  loadingChanged() {
    if (this.isLoading) {
      this.isLoading = false;
      console.log("spinner stop");
    }
    else {
      this.isLoading = true;
      console.log("spinner start");
    }
    this.spinnerBus$.next(this.isLoading);
  }

  getPopularActors(page?: number) {
    return this.http.get(`${this.config.personUrl}/popular?page=${page}${this.config.params}`).pipe(debounceTime(5000));
  }

  getSearchActors(page: number, searchStr: string) {
    return this.http.get(`${this.config.searchUrl}/person?query=${encodeURIComponent(searchStr)}${this.config.params}&page=${page}`);
  }

  actorSubscriber() {
    this.loadingChanged();
    this.popularActorsSubscription = this.getPopularActors(this.currentPage).subscribe(
      (list: any) => {
        this.actorsList = list.results.map(this.newTransform);
        if (this.totalPages === -1){
          this.totalPages = list.total_pages;
        }
        this.loadingChanged();
        this.actorsBus$.next(this.actorsList);
      },
      err => {
        console.log("error");
      }
    );
  }

  searchSubscriber(text: string) {
    this.loadingChanged();
    this.searchActorsSubscription = this.getSearchActors(this.currentPage, text).subscribe((list: any) => {
      this.actorsList = list.results.map(this.newTransform);
      if (this.totalPages === -1){
        this.totalPages = list.total_pages;
      }
      this.loadingChanged();
      this.actorsBus$.next(this.actorsList);
    },
    err => {
        console.log("error");
      }
    );
  }

  setFirstPage() {
    this.currentPage = 1;
  }

  setSearchModeParams(searchText: string) {
    this.isSearchMode = true;
    this.searchString = searchText;
    this.searchBus$.next(this.isSearchMode);
    this.popularActorsSubscription.unsubscribe();
    this.totalPages = -1;
  }

  exitSearchMode(){
    this.isSearchMode = false;
    this.searchString = "";
    this.searchBus$.next(this.isSearchMode);
    if (this.searchActorsSubscription){
      this.searchActorsSubscription.unsubscribe();
    }
    this.totalPages = -1;
  }

  nextPage() {
    if (this.isSearchMode) {
      this.searchSubscriber(this.searchString);
    }
    else {
      this.actorSubscriber();
    }
    this.currentPage++;
  }

  isLastPage(): boolean {
    console.log(`current page = ${this.currentPage}, total pages = ${this.totalPages}`);
    return this.currentPage > this.totalPages;
  }

  getActorsList() {
    return this.actorsBus$.asObservable();
  }

  getSpinnerStatus() {
    return this.spinnerBus$.asObservable();
  }

  getSearchMode(){
    return this.searchBus$.asObservable();
  }

  popularActorsUnsubscribe() {
    this.popularActorsSubscription.unsubscribe();
  }

  searchActorsUnsubscribe(){
    this.searchActorsSubscription.unsubscribe();
  }
}


