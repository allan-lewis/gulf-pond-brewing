import { Action } from '@ngrx/store';

import { BrewhouseModel, BrewType } from './brewhouse-model';

export const BREWHOUSE = 'a77abea9-fd37-40aa-a414-0f832a80aab0';

export class BrewhouseAction implements Action {
  readonly type: string = BREWHOUSE;

  constructor(public payload: BrewhouseModel) { }
}

export function brewhouseModelReducer(state: BrewhouseModel = {brewType: BrewType.Extract, batchSize: 1.25, efficiency: 70.00}, action: BrewhouseAction) {
  switch (action.type) {
    case BREWHOUSE:
      const original = JSON.stringify(state);
      const updated = JSON.stringify(action.payload);
      return original === updated ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
