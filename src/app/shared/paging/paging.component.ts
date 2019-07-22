import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilmService } from 'src/app/film-catalog/shared/film.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  isLastPage: boolean = false;
  routerSubscription: Subscription;
  target: string[];

  constructor(public router: Router, public filmService: FilmService) { 
    this.routerSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        console.log(event.url.split("/"));
        this.target = event.url.split("/");
        console.log(`constructor ${this.target[1]} page`);
      }
    })
  }

  ngOnInit() {
    this.isLastPage = this.filmService.isLastPage();
  }

  loadMore(){
    this.filmService.nextPage();
  }

  ngOnDestroy(){
    console.log(`destructor ${this.target[1]} page`);
    this.routerSubscription.unsubscribe();
  }

}
