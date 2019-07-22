import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/film-catalog/shared/film.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  isActive: boolean = false;

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.filmService.getSpinnerStatus().subscribe( (status: boolean) => {
      this.isActive = status;
      //console.log(this.isActive);
    });
  }

  getVisibilityStatus(): boolean {
    this.filmService.getSpinnerStatus().subscribe( (status: boolean) => {
      this.isActive = status;
      console.log(this.isActive);
    });
    return this.isActive;
  }

}
