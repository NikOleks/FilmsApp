import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  isLoading: boolean = false;
  spinnerBus$ = new Subject();
  constructor() { }

  loadingChanged() {
    if (this.isLoading){
      this.isLoading = false;
      console.log("spinner stop");
    }
    else{
      this.isLoading = true;
      console.log("spinner start");
    }
    this.spinnerBus$.next(this.isLoading);
  }
}
