import { createAction, props } from "@ngrx/store";

export const GetWeatherAction = "Get Weather";
export const GetWeatherFailAction = "Get Weather Fail";
export const GetWeatherSuccessAction = "Get Weather Success";

export const GetWeather = createAction(GetWeatherAction,
    props<{ lat: number, lon: number }>());

export const GetWeatherSuccess = createAction(GetWeatherSuccessAction,
    props<{ payload: any }>());

export const GetWeatherFail = createAction(GetWeatherFailAction);

