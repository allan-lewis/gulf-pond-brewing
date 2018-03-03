import { BrewhouseModel } from './brewhouse/brewhouse-model';
import { FermentablesModel } from './fermentables/fermentables-model';
import { BoilModel } from './boil/boil-model';
import { WaterModel } from './water/water-model';

export interface AppState {
  brewhouse: BrewhouseModel;
  fermentables: FermentablesModel;
  boil: BoilModel;
  water: WaterModel;
}
