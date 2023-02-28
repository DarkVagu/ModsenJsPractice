import { Action } from "@ngrx/store";

export const GetWeatherAction = "Get Weather";
export const GetWeatherFailAction = "Get Weather Fail";
export const GetWeatherSuccessAction = "Get Weather Success";
// export const GetCoordinatesAction = "Get Coordinates"

export class GetWeather implements Action {
    readonly type = GetWeatherAction;
    constructor(public payload: any) { }
}

export class GetWeatherFail implements Action {
    readonly type = GetWeatherFailAction;
    constructor(public payload: any) { }
}

export class GetWeatherSuccess implements Action {
    readonly type = GetWeatherSuccessAction;
    constructor(public payload: any) { }
}

// export class GetCoordinates implements Action {
//     readonly type = GetCoordinatesAction;
//     constructor(public payload: any) { }
// }

export type WeatherActions = GetWeather | GetWeatherFail | GetWeatherSuccess;
