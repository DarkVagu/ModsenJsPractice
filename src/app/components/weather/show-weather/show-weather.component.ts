import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/models/weather';
import { CityService } from 'src/app/services/city.service';
import { WeatherService } from 'src/app/services/weather.service';
import { GetWeather } from 'src/app/store/action/weather.action';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.scss'],
})
export class ShowWeatherComponent {
  constructor(
    private store: Store<{ weather: any; city: any }>,
    private weatherService: WeatherService,
    private cityService: CityService
  ) {
    this.weather$ = store.select('weather');
    this.city$ = store.select('city');
  }
  weather$: Observable<any> | undefined;
  city$: Observable<any> | undefined;
  now: string = '';
  cityName: string = '';
  weather: Weather = {
    main: '',
    temp: 0,
    speed: 0,
    humidity: 0,
  };

  ngOnInit() {
    this.weatherService.init();

    this.weather$?.subscribe((result) => {
      this.weather = result.data;
    });

    this.city$?.subscribe((result) => {
      this.cityName = result.name;
    });

    const today = new Date();
    this.now = today.toDateString();
  }
}
