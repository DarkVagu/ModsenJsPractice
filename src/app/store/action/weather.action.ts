import { createAction, props } from '@ngrx/store';
import { Weather } from 'src/app/models/weather';

export const enum WeatherAction {
  GetOtherApiWeatherAction = 'Get Other Api Weather',
  GetWeatherAction = 'Get Weather',
  GetWeatherFailAction = 'Get Weather Fail',
  GetWeatherSuccessAction = 'Get Weather Success',
}

export const GetOtherApiWeather = createAction(
  WeatherAction.GetOtherApiWeatherAction,
  props<{ lat: number; lon: number }>()
);

export const GetWeather = createAction(
  WeatherAction.GetWeatherAction,
  props<{ lat: number; lon: number }>()
);

export const GetWeatherSuccess = createAction(
  WeatherAction.GetWeatherSuccessAction,
  props<{ payload: Weather }>()
);

export const GetWeatherFail = createAction(WeatherAction.GetWeatherFailAction);
