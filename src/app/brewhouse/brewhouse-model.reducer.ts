import { Action } from '@ngrx/store';

import { BrewhouseModel, BrewType } from './brewhouse-model';

export const BREWHOUSE = 'a77abea9-fd37-40aa-a414-0f832a80aab0';

export class BrewhouseAction implements Action {
  readonly type: string = BREWHOUSE;

  constructor(public payload: BrewhouseModel) { }
}

export function brewhouseModelReducer(state: BrewhouseModel = {brewType: BrewType.AllGrain, batchSize: 1.5, efficiency: 75.00}, action: BrewhouseAction) {
  switch (action.type) {
    case BREWHOUSE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
