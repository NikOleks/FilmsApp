import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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
  @Output() visible = new EventEmitter<boolean>();
  @Input() route: string;
  target: string[];
  source: string;
  searchStr: string = '';
  isVisible: boolean = false;
  routerSubscription: Subscription;
  targetService: FilmService | ActorService;
  
  
  constructor(public router: Router, private filmService: FilmService, private actorService: ActorService) { 
    /*this.routerSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        //console.log(event.url.split("/"));
        this.target = event.url.split("/");
        console.log(`constructor ${this.target[1]} page in search component`);
        if (this.target[1] === "films" || this.target[1] === "actors"){
          this.isVisible = true;
          this.source = this.target[1];
          this.clearSearchInput();
        }
        else{
          this.closeSearch();
          this.isVisible = false;
        }
        this.visible.emit(this.isVisible);
      }
    })*/
  }

  ngOnInit() {
    if (this.route === "films"){
      this.targetService = this.filmService;
      this.clearSearchInput();
    }
    else if (this.route === "actors"){
      this.targetService = this.actorService;
      this.clearSearchInput();
    }
    else{
      this.closeSearch();
    }
  }

  search(){
    console.log(this.searchStr);
    if (this.searchStr.length >= 3){
      this.targetService.setFirstPage();
      this.targetService.setSearchModeParams(this.searchStr);
      this.targetService.nextPage();
    }
  }

  closeSearch(){
    this.clearSearchInput();
    this.targetService.setFirstPage();
    this.targetService.exitSearchMode();
    this.targetService.nextPage();
  }

  clearSearchInput(){
    this.searchStr = '';
  }

  ngOnDestroy(){
    console.log("search compopent router unsubscribe");
    this.routerSubscription.unsubscribe();
  }
}
