import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NavigationEnd } from '@angular/router';
import { FilmService } from 'src/app/film-catalog/shared/film.service';
import { ActorService } from 'src/app/film-catalog/shared/actor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  target: string[];
  source: string;
  searchStr: string = '';
  isVisible: boolean = false;
  routerSubscription: Subscription;
  
  constructor(public router: Router, private filmService: FilmService, private actorService: ActorService) { 
    this.routerSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        //console.log(event.url.split("/"));
        this.target = event.url.split("/");
        console.log(`constructor ${this.target[1]} page`);
        if (this.target[1] === "films" || this.target[1] === "actors"){
          this.isVisible = true;
          this.source = this.target[1];
        }
        else{
          this.closeSearch();
          this.isVisible = false;
        }
      }
    })
  }

  ngOnInit() {
  }

  search(){
    console.log(this.searchStr);
    if (this.searchStr.length >= 3){
      if (this.source === "films"){
        this.filmService.setFirstPage();
        this.filmService.setSearchModeParams(this.searchStr);
        this.filmService.nextPage();
      }
      if(this.source === "actors"){
        console.log("search actors");
        this.actorService.setFirstPage();
        this.actorService.setSearchModeParams(this.searchStr);
        this.actorService.nextPage();
      }
    }
  }

  closeSearch(){
    this.clearSearchInput();
    this.filmService.setFirstPage();
    this.filmService.exitSearchMode();
    this.filmService.nextPage();
  }

  clearSearchInput(){
    this.searchStr = '';
  }

  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
  }
}
