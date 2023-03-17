import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';
import {
  GetOtherApiWeather,
  GetWeather,
  GetWeatherFail,
  GetWeatherSuccess,
} from '../action/weather.action';

@Injectable()
export class WeatherEffects {
  date: Date = new Date();
  weather: Weather = {
    main: '',
    temp: 0,
    speed: 0,
    humidity: 0,
  };

  loadWeather = createEffect(() =>
    this.actions$.pipe(
      ofType(GetWeather),
      switchMap((action) =>
        this.weatherService.getOpenWeatherMap(action.lat, action.lon).pipe(
          map((payload) => {
            this.weather = {
              main: payload.weather[0].main,
              temp: Math.round(payload.main.temp - 273.15),
              speed: payload.wind.speed,
              humidity: payload.main.humidity,
            };
            const key = action.lon + action.lat;
            localStorage.setItem(
              key.toFixed(3),
              JSON.stringify({ data: this.weather, date: this.date })
            );
            return GetWeatherSuccess({ payload: this.weather });
          }),
          catchError(() => of(GetWeatherFail()))
        )
      )
    )
  );

  loadOtherWeather = createEffect(() =>
    this.actions$.pipe(
      ofType(GetOtherApiWeather),
      switchMap((action) =>
        this.weatherService.getVisualCrossing(action.lat, action.lon).pipe(
          map((payload) => {
            this.weather = {
              main: payload.currentConditions.conditions,
              temp: Math.round(((payload.currentConditions.temp - 32) * 5) / 9),
              speed: payload.currentConditions.windspeed,
              humidity: payload.currentConditions.humidity,
            };
            const key = action.lon + action.lat;
            localStorage.setItem(
              key.toFixed(3),
              JSON.stringify({ data: this.weather, date: this.date })
            );
            return GetWeatherSuccess({ payload: this.weather });
          }),
          catchError(() => of(GetWeatherFail()))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}
