import { Component, OnInit } from '@angular/core';
import { FilmService } from '../shared/film.service';
import { take } from 'rxjs/operators';
import { Film } from 'src/app/film-catalog/shared/film.model';
import { Actor } from 'src/app/film-catalog/shared/actor.model';
import { Subscription } from 'rxjs';
import { ActorService } from 'src/app/film-catalog/shared/actor.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  popularFilms: Film[] = [];
  popularActors: Actor[] = [];
  filmsSubscription: Subscription;
  actorsSubscription: Subscription;

  constructor(public filmService: FilmService, public actorService: ActorService) { }

  ngOnInit() { 
    this.filmService.setFirstPage();
    this.filmService.nextPage();
    this.filmsSubscription = this.filmService.getFilmsList().subscribe( (list: Film[]) => {
      this.popularFilms = list.slice(0,6);
      console.log(list.slice(0,6));
    });

    this.actorService.setFirstPage();
    this.actorService.nextPage();
    this.actorsSubscription = this.actorService.getActorsList().subscribe( (list: Actor[]) => {
      this.popularActors = list.slice(0,6);
      console.log(list.slice(0,6));
    })
  }

  ngOnDestroy() {
    this.filmService.popularFilmsUnsubscribe();
    this.filmsSubscription.unsubscribe();
    this.actorService.popularActorsUnsubscribe();
    this.actorsSubscription.unsubscribe();
  }
}
