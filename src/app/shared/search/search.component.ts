import { Component, OnInit, Input} from '@angular/core';
import { FilmService } from 'src/app/film-catalog/shared/film.service';
import { ActorService } from 'src/app/film-catalog/shared/actor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() route: string;
  searchStr: string = '';
  targetService: FilmService | ActorService;
  
  
  constructor(private filmService: FilmService, private actorService: ActorService) { 
  }

  ngOnInit() {
    console.log("Search component create");
    //this.clearSearchInput();
    /*if (this.route === "films"){
      this.targetService = this.filmService;
    }
    else if (this.route === "actors"){
      this.targetService = this.actorService;
    }
    else{
      this.closeSearch();
    }*/
  }

  setTargetService(){
    if (this.route === "films" && this.targetService !== this.filmService){
      this.targetService = this.filmService;
    }
    else if (this.route === "actors" && this.targetService !== this.actorService){
      this.targetService = this.actorService;
    }
  }

  search(){
    console.log(this.searchStr);
    this.setTargetService();
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
    this.targetService.exitSearchMode();
  }
}
