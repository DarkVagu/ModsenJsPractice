import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import {
  GetOtherApiWeather,
  GetWeather,
  GetWeatherSuccess,
} from '../store/action/weather.action';
import { GetCityName, GetCityNameSuccess } from '../store/action/city.action';
import { state } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient, private store: Store<state>) {
    this.city$ = store.select('city');
  }
  city$: Observable<any> | undefined;
  private cacheDataKey: number | undefined;
  date: Date = new Date();
  isSwitch: boolean = false;

  getVisualCrossing(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=UB5BAY8P7JFHZRHVBYQEBGYVN`
    );
  }

  getOpenWeatherMap(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=10241e2d22b6e42e2776e9b3c3ca8355`
    );
  }

  init(): void {
    navigator.geolocation.getCurrentPosition((data) => {
      this.store.dispatch(
        GetCityName({ lat: data.coords.latitude, lon: data.coords.longitude })
      );
      this.cacheDataKey = data.coords.latitude + data.coords.longitude;
      const cacheData = localStorage.getItem(this.cacheDataKey.toFixed(3));
      if (cacheData) {
        const cacheTime = new Date(JSON.parse(cacheData).date);
        if (this.date.getTime() - cacheTime.getTime() > 7200000) {
          if (!this.isSwitch) {
            this.store.dispatch(
              GetWeather({
                lat: data.coords.latitude,
                lon: data.coords.longitude,
              })
            );
          } else {
            this.store.dispatch(
              GetOtherApiWeather({
                lat: data.coords.latitude,
                lon: data.coords.longitude,
              })
            );
          }
        } else {
          this.store.dispatch(
            GetWeatherSuccess({ payload: JSON.parse(cacheData).data })
          );
        }
      } else {
        if (!this.isSwitch) {
          this.store.dispatch(
            GetWeather({
              lat: data.coords.latitude,
              lon: data.coords.longitude,
            })
          );
        } else {
          this.store.dispatch(
            GetOtherApiWeather({
              lat: data.coords.latitude,
              lon: data.coords.longitude,
            })
          );
        }
      }
    });
  }

  getDifferentWeather(city: any): void {
    this.store.dispatch(GetCityNameSuccess({ payload: city.name }));
    this.cacheDataKey = city.lat + city.lon;
    if (this.cacheDataKey != undefined) {
      const cacheData = localStorage.getItem(this.cacheDataKey.toFixed(3));
      if (cacheData) {
        const cacheTime = new Date(JSON.parse(cacheData).date);
        if (this.date.getTime() - cacheTime.getTime() > 7200000) {
          if (!this.isSwitch) {
            this.store.dispatch(GetWeather({ lat: city.lat, lon: city.lon }));
          } else {
            this.store.dispatch(
              GetOtherApiWeather({ lat: city.lat, lon: city.lon })
            );
          }
        } else {
          this.store.dispatch(
            GetWeatherSuccess({ payload: JSON.parse(cacheData).data })
          );
        }
      } else {
        if (!this.isSwitch) {
          this.store.dispatch(GetWeather({ lat: city.lat, lon: city.lon }));
        } else {
          this.store.dispatch(
            GetOtherApiWeather({ lat: city.lat, lon: city.lon })
          );
        }
      }
    } else {
      if (!this.isSwitch) {
        this.store.dispatch(GetWeather({ lat: city.lat, lon: city.lon }));
      } else {
        this.store.dispatch(
          GetOtherApiWeather({ lat: city.lat, lon: city.lon })
        );
      }
    }
  }
}
