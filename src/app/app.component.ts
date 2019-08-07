import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isSearchVisible: boolean = false;
  isPagingVisible: boolean = false;
  routerSubscription: Subscription;
  target: string[];
  currentRoute: string;
  links: object[] = [
    { path: '/main', label: 'Главная', active: 'button-active', icon: 'home'}, 
    { path: '/films', label: 'Все фильмы', active: 'button-active', icon: 'list_alt'},
    { path: '/actors', label: 'Все актеры', active: 'button-active', icon: 'list_alt'}
  ];

  constructor(public router: Router){
    this.routerSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
       this.target = event.url.split("/");
        if (this.target[1] === "films" || this.target[1] === "actors"){
          this.isPagingVisible = true;
          this.isSearchVisible = true;
        }
        else{
          this.isPagingVisible = false;
          this.isSearchVisible = false;
        }
        this.currentRoute = this.target[1];
      }
    })
  }
}
