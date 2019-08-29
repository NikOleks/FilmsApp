import { Component, OnInit, QueryList, SimpleChanges } from '@angular/core';
//import { FilmService } from '../shared/services/film.service';
import { Observable, Subject, Subscription } from 'rxjs';
//import { Film } from '../shared/film.model';
import { Actor } from '../shared/models/actor.model';
//import { FilmItemComponent } from '../shared/film-item/film-item.component';
import { SearchComponent } from '../../shared/search/search.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActorService } from '../shared/services/actor.service';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {
  actors: Actor[] = [];
  isLoadBtnDisabled: boolean = false;
  isLastPage: boolean = true;
  isSearchMode: boolean = false;
  isNoResult: boolean;
  actorsSubscription: Subscription;
  searchModeSubscription: Subscription;
  
  constructor(public actorService: ActorService) { 
    this.searchModeSubscription = this.actorService.getSearchMode().subscribe( (searchStatus: boolean) => {
      this.isSearchMode = searchStatus;
      this.actors.length = 0;
    });
  }

  ngOnInit() {
    this.actorService.setFirstPage();
    this.actorService.nextPage();
    this.actorsSubscription = this.actorService.getActorsList().subscribe( 
      (list: Actor[]) => {
        this.actors = [...this.actors, ...list];
        this.isLastPage = this.actorService.isLastPage();
    });
  }

  loadMore(){
    this.actorService.nextPage();
  }

  searchItems(searchStr: string){
    this.isNoResult = false;
    this.actorService.setFirstPage();
    this.actors.length = 0;
    this.actorService.setSearchModeParams(searchStr);
    this.actorService.nextPage();
    if (this.actors.length === 0){
      this.isNoResult = true;
    }
  }

  ngOnDestroy(){
    this.actorsSubscription.unsubscribe();
    if (this.isSearchMode){
      this.actorService.exitSearchMode();
    }
    this.searchModeSubscription.unsubscribe();
  }
}
