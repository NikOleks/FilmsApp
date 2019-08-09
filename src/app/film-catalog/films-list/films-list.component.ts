import { Component, OnInit, ViewChildren, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { FilmService } from '../shared/film.service';
import { Observable, Subject } from 'rxjs';
import { Film } from '../shared/film.model';
import { Actor } from '../shared/actor.model';
import { FilmItemComponent } from '../shared/film-item/film-item.component';
import { SearchComponent } from '../../shared/search/search.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  films: Film[] = [];
  //shownList: Film[] = [];
  //currentPage: number;
  //totalPages: number;
  isLoadBtnDisabled: boolean = false;
  //isLastPage: boolean = true;
  isSearchMode: boolean = false;
  isNoResult: boolean;
  filmsSubscription: Subscription;
  //@ViewChild(SearchComponent) searchInput: SearchComponent;
  constructor(public filmService: FilmService) { 
    this.filmService.getSearchMode().subscribe( (searchStatus: boolean) => {
      this.isSearchMode = searchStatus;
      this.films.length = 0;
    });
  }

  ngOnInit() {
    this.filmService.setFirstPage();
    this.filmService.nextPage();
    this.filmsSubscription = this.filmService.getFilmsList().subscribe(
      (list: Film[]) => {
        this.films = [...this.films, ...list];
      //this.isLastPage = this.filmService.isLastPage();
    });
  }

  loadMore() {
    this.filmService.nextPage();
  }

  searchItems(searchStr: string) {
    //this.prepareList();
    //this.isLoadBtnDisabled = true;
    //this.isSearchMode = true;
    this.isNoResult = false;
    this.filmService.setFirstPage();
    this.films.length = 0;
    this.filmService.setSearchModeParams(searchStr);
    this.filmService.nextPage();
    if (this.films.length === 0) {
      this.isNoResult = true;
    }
  }

  ngOnDestroy(){
    this.filmsSubscription.unsubscribe();
  }

  /*isLastPage(): boolean {
    return this.filmService.isLastPage();
  }*/

  /*prepareList() {
    this.shownList.length === 0 ?
      this.createShownList() :
      this.setShownList();
  }*/

  /*createShownList() {
    this.shownList = [...this.films];
  }*/

  /*setShownList() {
    this.films = [...this.shownList];
  }*/

  /*findFilmsByName(filmName: string): Film[] {
    return this.films.filter(film =>
      film.name.toLowerCase().search(filmName.toLowerCase()) >= 0);
  }*/

  /*canselSearch() {
    this.setShownList();
    this.cleareSearchParams();
  }*/

  /*cleareSearchParams() {
    this.shownList.length = 0;
    this.isLoadBtnDisabled = false;
    this.searchInput.clearSearchInput();
    this.isSearchMode = false;
    this.isNoResult = false;
  }*/
}
