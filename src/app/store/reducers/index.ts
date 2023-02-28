import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { reducer, WeatherState } from "./weather.reducer";

//state
export interface state {
  weather: WeatherState
}
