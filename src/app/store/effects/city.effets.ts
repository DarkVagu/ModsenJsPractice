import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CityService } from 'src/app/services/city.service';
import {
  GetCity,
  GetCityFail,
  GetCityName,
  GetCityNameSuccess,
  GetCitySuccess,
} from '../action/city.action';

@Injectable()
export class CityEffects {
  loadCityName = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCityName),
      switchMap((action) =>
        this.cityService.getCityName(action.lat, action.lon).pipe(
          map((payload) => {
            return GetCityNameSuccess({ payload: payload.address.city });
          }),
          catchError(() => of(GetCityFail()))
        )
      )
    )
  );

  loadCity = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCity),
      switchMap((action) =>
        this.cityService.getCity(action.payload).pipe(
          map((payload) => {
            return GetCitySuccess({ payload });
          }),
          catchError(() => of(GetCityFail()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private cityService: CityService) {}
}
