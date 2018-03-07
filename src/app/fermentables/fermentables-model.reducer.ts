import { Action } from '@ngrx/store';

import { FermentablesModel } from './fermentables-model';

export const FERMENTABLES = '00aabea9-f73d-40aa-a414-0f832a80aab0';

export class FermentablesAction implements Action {
  readonly type: string = FERMENTABLES;

  constructor(public payload: FermentablesModel) { }
}

export function fermentablesModelReducer(state: FermentablesModel = {pounds: 2, potential: 1.045}, action: FermentablesAction) {
  switch (action.type) {
    case FERMENTABLES:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
