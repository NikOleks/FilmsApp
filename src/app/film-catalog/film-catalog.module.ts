import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { FilmsListComponent } from './films-list/films-list.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilmItemComponent } from './shared/film-item/film-item.component';
import { ActorItemComponent } from './shared/actor-item/actor-item.component';
import { SharedModule } from '../shared/shared.module';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { ActorReviewComponent } from './actor-review/actor-review.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    SharedModule
  ],
  declarations: [
    MainComponent,  
    FilmsListComponent,
    FilmItemComponent,
    ActorItemComponent,
    ActorsListComponent,
    ActorReviewComponent
  ]
})
export class FilmCatalogModule { }
