import { Action } from '@ngrx/store';

import { YeastModel } from './yeast-model';

export const YEAST = '67aabea9-fd37-40aa-b515-0f832a80aab0';

export class YeastAction implements Action {
  readonly type: string = YEAST;

  constructor(public payload: YeastModel) { }
}

export function yeastModelReducer(state: YeastModel = {attenuation: 71}, action: YeastAction) {
  switch (action.type) {
    case YEAST:
        const original = JSON.stringify(state);
        const updated = JSON.stringify(action.payload);
        return original === updated ? state : Object.assign({}, action.payload);
    default:
        return state;
  }
}
