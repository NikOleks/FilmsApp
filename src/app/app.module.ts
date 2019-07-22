import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmCatalogModule } from './film-catalog/film-catalog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { requestConfig, REQUEST_CONFIG } from 'src/app/film-catalog/shared/config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    FilmCatalogModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    {provide: REQUEST_CONFIG, useValue: requestConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

