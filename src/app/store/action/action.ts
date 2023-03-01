import { Action, createAction, props } from "@ngrx/store";

export const GetWeatherAction = "Get Weather";
export const GetWeatherFailAction = "Get Weather Fail";
export const GetWeatherSuccessAction = "Get Weather Success";
export const GetCoordinatesAction = "Get Coordinates"



export const GetWeather = createAction(GetWeatherAction)

export const GetWeatherSuccess = createAction(GetWeatherSuccessAction,
    props<{ payload: any }>())

export const GetWeatherFail = createAction(GetWeatherFailAction)