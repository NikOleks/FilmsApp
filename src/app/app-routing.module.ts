import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './film-catalog/main/main.component';
import { FilmsListComponent } from './film-catalog/films-list/films-list.component';
import { ActorsListComponent } from './film-catalog/actors-list/actors-list.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "main" }, 
  { path: "main", component: MainComponent },
  { path: "films", component: FilmsListComponent},
  { path: "actors", component: ActorsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
