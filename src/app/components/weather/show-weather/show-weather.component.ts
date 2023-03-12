import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetWeather } from 'src/app/store/action/weather.action';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.scss']
})
export class ShowWeatherComponent {
  constructor(private store: Store<{ city: any, weather: any }>) {
    this.weather$ = store.select('weather');
  }
  weather$: Observable<any> | undefined;
  speed: number | undefined;
  temp: number | undefined;
  humidity: number | undefined;
  main: string | undefined;


  ngOnInit() {
    navigator.geolocation.getCurrentPosition(data => {
      this.store.dispatch(GetWeather({ lat: data.coords.latitude, lon: data.coords.longitude }));
    })


    this.weather$?.subscribe(result => {

      this.speed = result.data.wind.speed;
      this.temp = Math.round(+result.data.main.temp - 273.15);
      this.humidity = result.data.main.humidity;
      this.main = result.data.weather[0].main;
    })

  }

}
