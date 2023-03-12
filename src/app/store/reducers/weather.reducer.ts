import { createReducer, on } from '@ngrx/store';
import { GetWeatherFail, GetWeatherSuccess } from '../action/weather.action';


export interface WeatherState {
    data: Object,
    loaded: boolean,
    loading: boolean
}

export const initialState: WeatherState = {
    data: {},
    loaded: false,
    loading: false
}

export const weatherReducer = createReducer(
    initialState,
    on(GetWeatherSuccess, (state, { payload }) => ({
        ...state,
        data: payload,
        loaded: true
    })),

    on(GetWeatherFail, (state) => ({
        ...state,
        loading: true
    }))
)


