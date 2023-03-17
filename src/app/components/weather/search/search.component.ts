import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { empty, Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { GetCity } from 'src/app/store/action/city.action';
import { GetWeather } from 'src/app/store/action/weather.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(
    private store: Store<{ city: any; weather: any }>,
    private weatherService: WeatherService
  ) {
    this.city$ = store.select('city');
    this.weather$ = store.select('weather');
  }
  loadedCity: any;
  notFound: boolean = false;
  city$: Observable<any> | undefined;
  weather$: Observable<any> | undefined;
  cityName: string = '';

  getCity(title: string) {
    this.store.dispatch(GetCity({ payload: title }));
    this.cityName = title;
    this.city$?.subscribe((data) => {
      this.loadedCity = data.data;
    });
  }

  getWeatheByCoordinates(city: any) {
    this.weatherService.getDifferentWeather(city);
  }

  switchAPI($event: any) {
    const isCkeck = $event.target.checked;
    if (isCkeck) {
      this.weatherService.isSwitch = true;
    } else {
      this.weatherService.isSwitch = false;
    }
    console.log(this.weatherService.isSwitch);
  }
}
