import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetCity } from 'src/app/store/action/city.action';
import { GetWeather } from 'src/app/store/action/weather.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private store: Store<{ city: any, weather: any }>) {
    this.city$ = store.select('city');
    this.weather$ = store.select('weather');
  }
  loadedCities: any;
  city$: Observable<any> | undefined;
  weather$: Observable<any> | undefined;


  getCity(title: string) {
    this.store.dispatch(GetCity({ payload: title }));

    this.city$?.subscribe(data => {
      this.loadedCities = data.data
    });
  };

  getWeatheByCoordinates(city: any) {
    this.store.dispatch(GetWeather({ lat: city.lat, lon: city.lon }));
  };
}
