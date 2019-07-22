import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../film.model'

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  
  @Input() filmItem: Film;
  @Output() changeFavorite = new EventEmitter<number>();
  favoriteStyles: object;
  //isVisible: boolean = false;
  

  constructor(public filmsService: FilmService) { }

  ngOnInit() {
    //this.favoriteStyles = {"color": this.filmItem.isFavorite ? "accent" : "primary"}
  }

  clickToFavoriteBtn( filmId : number){
    this.changeFavorite.emit( filmId );
  }
}
