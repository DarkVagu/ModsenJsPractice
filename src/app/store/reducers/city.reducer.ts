import { createReducer, on } from "@ngrx/store"
import { GetCityFail, GetCitySuccess } from "../action/city.action"

export interface CityState {
    data: object,
    loaded: boolean,
    loading: boolean
}

export const initialState: CityState = {
    data: {},
    loaded: false,
    loading: false
}

export const cityReducer = createReducer(
    initialState,
    on(GetCitySuccess, (state, { payload }) => ({
        ...state,
        data: payload,
        loaded: true
    })),

    on(GetCityFail, (state) => ({
        ...state,
        loading: true
    }))
)