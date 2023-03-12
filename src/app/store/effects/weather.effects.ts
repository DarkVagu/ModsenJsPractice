import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { GetWeather, GetWeatherFail, GetWeatherSuccess } from '../action/weather.action';


@Injectable()
export class WeatherEffects {
    loadWeather = createEffect(() => this.actions$.pipe(
        ofType(GetWeather),
        switchMap(action => this.weatherService.getOpenWeatherMap(action.lat, action.lon).pipe(
            map(payload => GetWeatherSuccess({ payload })),
            catchError(() => of(GetWeatherFail())))
        )
    )
    )
    constructor(private actions$: Actions, private weatherService: WeatherService) { }
}