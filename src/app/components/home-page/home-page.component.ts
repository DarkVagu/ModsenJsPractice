import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetWeather } from 'src/app/store/action/weather.action';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private store: Store<{ weather: any }>) {
    this.weather$ = store.select('weather')
  }
  tempWeather: number = 0
  weather$: Observable<any> | undefined

  ngOnInit() {
    //this.store.dispatch(GetWeather())

    this.weather$?.subscribe(data => {
      this.tempWeather = Math.ceil((+data.data.main.temp - 273.15) * 100) / 100
    })
  }

  getWeather() {
    if (this.weather$ != undefined) {
      this.weather$.subscribe(data => {
        data.loading == true ? console.log("loading error") : console.log(data)
      })
    }
  }
}
