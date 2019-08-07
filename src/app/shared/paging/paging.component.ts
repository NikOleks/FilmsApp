import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { FilmService } from 'src/app/film-catalog/shared/film.service';
import { ActorService } from 'src/app/film-catalog/shared/actor.service';
import { observable } from 'rxjs/internal/symbol/observable';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  @Input() route: string;
  isLastPage: boolean = false;
  routes: string[];
  source: string;
  routerSubscription: Subscription;
  targetService: FilmService | ActorService;

  constructor(public router: Router, public filmService: FilmService, public actorService: ActorService) {
  }

  ngOnInit() {
    if (this.route === "films") {
      this.targetService = this.filmService;
    }
    if (this.route === "actors") {
      this.targetService = this.actorService;
    }
  }

  loadMore() {
    this.targetService.nextPage();
  }
}
