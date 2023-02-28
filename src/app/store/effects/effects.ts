import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { GetWeatherAction, GetWeatherSuccessAction } from '../action/action';


@Injectable()
export class WeatherEffects {

    constructor(private actions$: Actions, private weatherService: WeatherService) { }
    loadWeather$ = createEffect(() => this.actions$.pipe(
        ofType(GetWeatherAction),
        exhaustMap(() => this.weatherService.getOpenWeatherMap()
            .pipe(
                map(data => ({ type: GetWeatherSuccessAction, payload: data })),
            ))
    ))
}