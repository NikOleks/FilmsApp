import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { PagingComponent } from './paging/paging.component';

@NgModule({
  declarations: [SearchComponent, SpinnerComponent, PagingComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule
  ],
  exports:[
    SearchComponent,
    SpinnerComponent,
    PagingComponent
  ]
})
export class SharedModule { }
