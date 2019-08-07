import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, Subscription, Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Film } from './film.model';
import { ConfigService } from './config.service';
import { REQUEST_CONFIG } from './config';
import { debounceTime } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  currentPage: number;
  totalPages: number;
  filmsList: Film[];
  isLoading: boolean = false;
  searchString: string;
  isSearchMode: boolean = false;
  filmsBus$ = new Subject();
  //pagesBus$ = new Subject();
  spinnerBus$ = new Subject();
  searchBus$ = new Subject();
  popularFilmsSubscription: Subscription;
  searchFilmsSubscription: Subscription;
  //subscription: Subscription;
  newTransform = (film) => {
    return {
      id: film.id,
      name: film.title,
      year: film.release_date.slice(0, 4),
      imgUrl: `${this.config.midImgPath}${film.poster_path}`,
      description: this.getDescription(film.overview),
      rating: film.vote_average
    }
  };

  constructor(private http: HttpClient, @Inject(REQUEST_CONFIG) private config: ConfigService) {
  }

  getDescription(description: string): string {
    if (description.length >= 100) {
      return `${description.substr(0, 100)}...`;
    }
    if (description.length === 0){
      return "No description";
    }
    return description;
  }

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
  
  getPopularFilms(page?: number) {
    return this.http.get(`${this.config.movieUrl}/popular?page=${page}${this.config.params}`).pipe(debounceTime(5000));
  }

  getSearchFilms(page: number, searchStr: string) {
    return this.http.get(`${this.config.searchUrl}/movie?query=${encodeURIComponent(searchStr)}${this.config.params}&page=${page}`);
  }

  filmSubscriber() {
    this.loadingChanged();
    this.popularFilmsSubscription = this.getPopularFilms(this.currentPage).subscribe(
      (list: any) => {
        this.filmsList = list.results.map(this.newTransform);
        if (this.totalPages === undefined){
          this.totalPages = list.total_pages;
        }
        this.loadingChanged()
        this.filmsBus$.next(this.filmsList);
      },
      err => {
        console.log("error");
      }
    );
  }

  searchSubscriber(text: string) {
    this.loadingChanged();
    this.searchFilmsSubscription = this.getSearchFilms(this.currentPage, text).subscribe(
      (list: any) => {
        this.filmsList = list.results.map(this.newTransform);
        if (this.totalPages === undefined){
          this.totalPages = list.total_pages;
        }
        this.loadingChanged()
        this.filmsBus$.next(this.filmsList);
      },
      err => {
        console.log("error");
      }
    );
  }

  setFirstPage(){
    this.currentPage = 1;
  }

  setSearchModeParams(searchText:string){
    this.isSearchMode = true;
    this.searchString = searchText;
    this.searchBus$.next(this.isSearchMode);
    this.popularFilmsSubscription.unsubscribe();
  }

  exitSearchMode(){
    this.isSearchMode = false;
    this.searchBus$.next(this.isSearchMode);
    if (this.searchFilmsSubscription){
      this.searchFilmsSubscription.unsubscribe();
    }
  }

  isLastPage(): boolean{
    console.log(`current page = ${this.currentPage}, total pages = ${this.totalPages}`);
    return this.currentPage > this.totalPages;
  }

  nextPage() {
    if (this.isSearchMode){
      this.searchSubscriber(this.searchString);
    }
    else{
      this.filmSubscriber();
    }
    this.currentPage++;
  }

  getFilmsList() {
    return this.filmsBus$.asObservable();
  }

  /*getTotalPages() {
    return this.pagesBus$.asObservable();
  }*/

  getSpinnerStatus() {
    return this.spinnerBus$.asObservable();
  }

  getSearchMode(){
    return this.searchBus$.asObservable();
  }

  popularFilmsUnsubscribe(){
    this.popularFilmsSubscription.unsubscribe();
  }
  searchFilmsUnsubscribe(){
    this.searchFilmsSubscription.unsubscribe();
  }
}
