import { Action } from '@ngrx/store';

import { BoilModel } from './boil-model';

export const BOIL = 'b77abea9-fd37-aa40-a414-0f832a80aab0';

export class BoilAction implements Action {
  readonly type: string = BOIL;

  constructor(public payload: BoilModel) { }
}

export function boilModelReducer(state: BoilModel = {duration: 1}, action: BoilAction) {
  switch (action.type) {
    case BOIL:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
