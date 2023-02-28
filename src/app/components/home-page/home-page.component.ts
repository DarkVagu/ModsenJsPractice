import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as WeatherStore from "../../store";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private store: Store<WeatherStore.state>) { }

  movies$: Observable<any> = this.store.select(state => state.weather);

  ngOnInit() {
    // this.weatherService.geStormglasstWeather().subscribe(data => {
    //   console.log(data)
    //   localStorage.setItem('Stormglasst', JSON.stringify(data))
    //   console.log(localStorage.getItem('Stormglasst'))
    // })


    // this.weatherService.getOpenWeatherMap().subscribe(data => {
    //   console.log(data)
    //   localStorage.setItem('OpenWeatherMap', JSON.stringify(data))
    //   console.log(localStorage.getItem('OpenWeatherMap'))
    //   this.weather = localStorage.getItem('OpenWeatherMap')
    //   if (this.weather != null) {
    //     this.weather = JSON.parse(this.weather)
    //   }
    //   //console.log(JSON.parse(this.weather))
    // })

    this.store.dispatch({ type: WeatherStore.GetWeatherAction })

  }

  getWeather() {
    this.movies$.subscribe(data => {
      console.log(data)
    })
  }
}
