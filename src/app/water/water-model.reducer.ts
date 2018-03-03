import { Action } from '@ngrx/store';

import { WaterModel } from './water-model';

export const WATER = '77aabea9-fd37-40aa-a414-0f832a80aab0';

export class WaterAction implements Action {
  readonly type: string = WATER;

  constructor(public payload: WaterModel) { }
}

export function waterModelReducer(state: WaterModel = {evaporation: 0.7, absorption: 0.075, shrinkage: 0.05}, action: WaterAction) {
  switch (action.type) {
    case WATER:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
