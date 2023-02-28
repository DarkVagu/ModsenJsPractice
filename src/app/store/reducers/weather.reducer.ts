import { GetWeatherAction, GetWeatherFailAction, GetWeatherSuccessAction, WeatherActions } from '../action/action';

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

export function reducer(state = initialState, action: WeatherActions): WeatherState {
    switch (action.type) {

        case GetWeatherAction: {
            console.log("From Reducer Action Fetch");
            return {
                ...state, loading: true
            }
        }

        case GetWeatherSuccessAction: {
            console.log("From Reducer Action Success", action.payload)
            const data = action.payload;

            return {
                ...state, loading: false, loaded: true, data
            }
        }

        case GetWeatherFailAction: {

            console.log("From Reducer Action Fail", action.payload)
            const data = action.payload;
            return {
                ...state, loading: false, loaded: false, data
            }
        }
        default:
            return state
    }

}
