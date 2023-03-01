import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { GetWeather, GetWeatherAction, GetWeatherFail, GetWeatherSuccess, GetWeatherSuccessAction } from '../action/action';


@Injectable()
export class WeatherEffects {
    loadWeather = createEffect(() => this.actions$.pipe(
        ofType(GetWeather),
        switchMap(() => this.weatherService.getOpenWeatherMap().pipe(
            map(payload => GetWeatherSuccess({ payload })),
            catchError(() => of(GetWeatherFail())))
        )
    )
    )
    constructor(private actions$: Actions, private weatherService: WeatherService) { }
}