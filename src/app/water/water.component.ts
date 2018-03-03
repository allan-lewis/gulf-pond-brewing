import 'rxjs/add/operator/combineLatest';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { AppState } from '../app.state';

import { BrewhouseModel } from '../brewhouse/brewhouse-model';
import { FermentablesModel } from '../fermentables/fermentables-model';
import { WaterModel } from './water-model';
import { BoilModel } from '../boil/boil-model';
import { WATER, WaterAction } from './water-model.reducer';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.css']
})
export class WaterComponent implements OnInit {

  brewhouse: Observable<BrewhouseModel>;
  fermentables: Observable<FermentablesModel>;
  boil: Observable<BoilModel>;
  water: Observable<WaterModel>;

  form: FormGroup;

  total: number;
  absorption: number;
  boiloff: number;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.brewhouse = store.select(state => state.brewhouse);
    this.fermentables = store.select(state => state.fermentables);
    this.water = store.select(state => state.water);
    this.boil = store.select(state => state.boil);
    
    this.buildForm();

    this.water.take(1).subscribe(x => {
      this.form.setValue({
        evaporation: x.evaporation,
        absorption: x.absorption,
        shrinkage: x.shrinkage
      });
    });

    this.water.combineLatest(this.fermentables, this.brewhouse, this.boil).subscribe(x => {
      this.calculate(x[0], x[1], x[2], x[3]);
    });
  }

  ngOnInit() {

  }

  calculate(water: WaterModel, fermentables: FermentablesModel, brewhouse: BrewhouseModel, boil: BoilModel) {
    this.boiloff = boil.duration * water.evaporation;
    this.absorption = water.absorption * fermentables.pounds; 
    this.total = brewhouse.batchSize + this.boiloff + this.absorption + water.shrinkage;
  }  
  
  buildForm(): void {
    this.form = this.fb.group({
      evaporation: [0, Validators.required],
      absorption: [0, Validators.required],
      shrinkage: [0, Validators.required]
    });

    this.form.valueChanges.subscribe(x => {
      if (this.form.status === "VALID") {
        let water = new WaterModel();
        water.evaporation = +this.form.value.evaporation;
        water.absorption = +this.form.value.absorption;
        water.shrinkage = +this.form.value.shrinkage;

        this.store.dispatch(new WaterAction(water));
      }
    });
  }

}
