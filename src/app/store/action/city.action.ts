import { createAction, props } from '@ngrx/store';

export const enum CityAction {
  GetCityNameSuccessAction = 'Get City Name Success',
  GetCityNameAction = 'Get City Name',
  GetCityAction = 'Get City',
  GetCitySuccessAction = 'Get City Success',
  GetCityFailAction = 'Get City Fail',
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
