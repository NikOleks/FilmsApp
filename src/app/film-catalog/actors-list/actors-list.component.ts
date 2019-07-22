import { Component, OnInit, ViewChildren, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { FilmService } from '../shared/film.service';
import { Observable, Subject } from 'rxjs';
import { Film } from '../shared/film.model';
import { Actor } from '../shared/actor.model';
import { FilmItemComponent } from '../shared/film-item/film-item.component';
import { SearchComponent } from '../../shared/search/search.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActorService } from '../shared/actor.service';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {
  actors: Actor[] = [];
  shownList:  Actor[] = [];
  currentPage: number;
  totalPages: number;
  isLoadBtnDisabled: boolean = false;
  isSearchMode: boolean = false;
  isNoResult: boolean;
  @ViewChild(SearchComponent) searchInput: SearchComponent;
  constructor(public actorService: ActorService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.actorService.nextPage(this.currentPage);

    this.actorService.getActorsList().subscribe( (list: Actor[]) => {
      this.actors = [...this.actors, ...list];
    });

    this.actorService.getTotalPages().subscribe( (pages: number) => {
      this.totalPages = pages;
      this.isLastPage();
    });
  }

  loadMore(){
    this.currentPage++;
    this.actorService.nextPage(this.currentPage);
  }

  isLastPage(): boolean {
    console.log(`current page ${this.currentPage}, total page ${this.totalPages}`);
    return ( this.currentPage >= this.totalPages );
  }

  searchItems(searchStr: string){
    this.prepareList();
    this.isLoadBtnDisabled = true;
    this.isSearchMode = true;
    this.isNoResult = false;
    this.actors = this.findActorsByName(searchStr);
    if (this.actors.length === 0){
      this.isNoResult = true;
    }
  }

  prepareList() {
    this.shownList.length === 0 ? 
                                this.createShownList() : 
                                this.setShownList();
  }

  createShownList(){
      this.shownList = [...this.actors];
  }

  setShownList(){
      this.actors = [...this.shownList];
  }

  findActorsByName(actorName: string): Actor[]{
    return this.actors.filter(actor => 
      actor.name.toLowerCase().search(actorName.toLowerCase()) >= 0);
  }

  canselSearch(){
    //this.isBtnLoadDisabled = false;
    this.setShownList();
    this.cleareSearchParams();
  }

  cleareSearchParams(){
    this.shownList.length = 0;
    this.isLoadBtnDisabled = false;
    this.searchInput.clearSearchInput();
    this.isSearchMode = false;
    this.isNoResult = false;
  }


}
