import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { AppState } from '../app.state';

import { BrewhouseModel } from '../brewhouse/brewhouse-model';
import { FermentablesModel } from '../fermentables/fermentables-model';
import { WaterModel } from '../water/water-model';
import { BoilModel } from '../boil/boil-model';
import { YeastModel } from '../yeast/yeast-model';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent implements OnInit {

  brewhouse: Observable<BrewhouseModel>;
  fermentables: Observable<FermentablesModel>;
  boil: Observable<BoilModel>;
  water: Observable<WaterModel>;
  yeast: Observable<YeastModel>;

  gravityPreBoil: string;
  gravityOriginal: string;
  gravityFinal: string;
  waterPreBoil: string;
  waterPostCooling: string;

  constructor(private store: Store<AppState>) {
    this.brewhouse = store.select(state => state.brewhouse);
    this.fermentables = store.select(state => state.fermentables);
    this.water = store.select(state => state.water);
    this.boil = store.select(state => state.boil);
    this.yeast = store.select(state => state.yeast);

    this.water.combineLatest(this.brewhouse, this.fermentables, this.boil, this.yeast).subscribe(x => {
      let preBoilGravity = (x[2].potential - 1) * 1000 * x[2].pounds * x[1].efficiency / 100 / (x[0].total - x[0].lossToAbsorption);
      preBoilGravity = preBoilGravity / 1000;
      preBoilGravity += 1;

      let originalGravity = (x[2].potential - 1) * 1000 * x[2].pounds * x[1].efficiency / 100 / (x[0].total - x[0].lossToAbsorption - x[0].lossToBoiloff - x[0].shrinkage);
      originalGravity = originalGravity / 1000;
      originalGravity += 1;

      this.gravityPreBoil = preBoilGravity.toFixed(3);
      this.gravityOriginal = originalGravity.toFixed(3);

      this.waterPreBoil = (x[0].total - x[0].lossToAbsorption).toFixed(2);
      this.waterPostCooling = (x[0].total - x[0].lossToAbsorption - x[0].lossToBoiloff - x[0].shrinkage).toFixed(2);
      
      const attenutation = (100 - x[4].attenuation) / 100;
      let finalGravity = ((originalGravity - 1) * 1000 * attenutation / 1000) + 1;

      this.gravityFinal = finalGravity.toFixed(3);
    });
  }

  ngOnInit() {

  }

}
