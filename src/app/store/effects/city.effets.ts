import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CityService } from "src/app/services/city.service";
import { GetCity, GetCityFail, GetCitySuccess } from "../action/city.action";

@Injectable()
export class CityEffects {
    loadWeather = createEffect(() => this.actions$.pipe(
        ofType(GetCity),
        switchMap(action => this.cityService.getCity(action.payload).pipe(
            map(payload => GetCitySuccess({ payload })),
            catchError(() => of(GetCityFail())))
        )
    )
    )

    constructor(private actions$: Actions, private cityService: CityService) { }
}