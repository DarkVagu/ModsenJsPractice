import { createAction, props } from "@ngrx/store";

export const GetCityAction = "Get City";
export const GetCitySuccessAction = "Get City Success"
export const GetCityFailAction = "Get City Fail"

export const GetCity = createAction(GetCityAction,
    props<{ payload: string }>());

export const GetCitySuccess = createAction(GetCitySuccessAction,
    props<{ payload: any }>());

export const GetCityFail = createAction(GetCityFailAction);