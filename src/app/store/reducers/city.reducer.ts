import { createReducer, on } from '@ngrx/store';
import {
  GetCityFail,
  GetCityNameSuccess,
  GetCitySuccess,
} from '../action/city.action';

export interface CityState {
  data: object;
  name: string;
  loaded: boolean;
  loading: boolean;
}

export const initialState: CityState = {
  data: {},
  name: '',
  loaded: false,
  loading: false,
};

export const cityReducer = createReducer(
  initialState,
  on(GetCitySuccess, (state, { payload }) => ({
    ...state,
    data: payload,
    loaded: true,
  })),

  on(GetCityFail, (state) => ({
    ...state,
    loading: true,
  })),

  on(GetCityNameSuccess, (state, { payload }) => ({
    ...state,
    name: payload,
  }))
);
