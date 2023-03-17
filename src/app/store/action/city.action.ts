import { createAction, props } from '@ngrx/store';

export const enum CityAction {
  GetCityNameSuccessAction = '[City] Get City Name Success',
  GetCityNameAction = '[City] Get City Name',
  GetCityAction = '[City] Get City',
  GetCitySuccessAction = '[City] Get City Success',
  GetCityFailAction = '[City] Get City Fail',
}

export const GetCityName = createAction(
  CityAction.GetCityNameAction,
  props<{ lat: number; lon: number }>()
);

export const GetCityNameSuccess = createAction(
  CityAction.GetCityNameSuccessAction,
  props<{ payload: string }>()
);

export const GetCity = createAction(
  CityAction.GetCityAction,
  props<{ payload: string }>()
);

export const GetCitySuccess = createAction(
  CityAction.GetCitySuccessAction,
  props<{ payload: any }>()
);

export const GetCityFail = createAction(CityAction.GetCityFailAction);
