import { Component, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { FilmService } from '../shared/film.service';
import { Observable, Subject } from 'rxjs';
import { Film } from '../shared/film.model';
//import { Actor } from '../shared/actor.model';
//import { FilmItemComponent } from '../shared/film-item/film-item.component';
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
  isLoadBtnDisabled: boolean = false;
  isLastPage: boolean = true;
  isSearchMode: boolean = false;
  isNoResult: boolean;
  filmsSubscription: Subscription;
  searchModeSubscription: Subscription;

  constructor(public filmService: FilmService) { 
    this.searchModeSubscription = this.filmService.getSearchMode().subscribe( (searchStatus: boolean) => {
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
        this.isLastPage = this.filmService.isLastPage();
    });
  }

  loadMore() {
    this.filmService.nextPage();
  }

  searchItems(searchStr: string) {
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
    if (this.isSearchMode){
      this.filmService.exitSearchMode();
    }
    this.searchModeSubscription.unsubscribe();
  }
}
