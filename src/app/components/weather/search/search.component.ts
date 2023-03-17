import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { GetCity } from 'src/app/store/action/city.action';
import { state } from 'src/app/store/reducers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(
    private store: Store<state>,
    private weatherService: WeatherService,
    private formBuilder: FormBuilder
  ) {
    this.city$ = store.select('city');
    this.weather$ = store.select('weather');
  }

  loginForm: FormGroup = this.formBuilder.group({
    name: '',
  });
  loadedCity: any;
  notFound: boolean = false;
  city$: Observable<any> | undefined;
  weather$: Observable<any> | undefined;
  cityName: string = '';

  onSubmit(): void {
    this.getCity(this.loginForm.value.name);
  }

  getCity(title: string): void {
    this.store.dispatch(GetCity({ payload: title }));
    this.cityName = title;
    this.city$?.subscribe((data) => {
      this.loadedCity = data.data;
    });
  }

  getWeatheByCoordinates(city: any): void {
    this.weatherService.getDifferentWeather(city);
  }

  switchAPI($event: any): void {
    const isCkeck = $event.target.checked;
    if (isCkeck) {
      this.weatherService.isSwitch = true;
    } else {
      this.weatherService.isSwitch = false;
    }
    console.log(this.weatherService.isSwitch);
  }
}
