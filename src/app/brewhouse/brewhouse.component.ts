import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { BrewhouseModel } from './brewhouse-model';
import { BREWHOUSE, BrewhouseAction } from './brewhouse-model.reducer';
import { AppState } from '../app.state';

@Component({
  selector: 'app-brewhouse',
  templateUrl: './brewhouse.component.html',
  styleUrls: ['./brewhouse.component.css']
})
export class BrewhouseComponent implements OnInit {

  model: Observable<BrewhouseModel>;

  form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.model = store.select(state => state.brewhouse);
    
    this.buildForm();

    this.model.take(1).subscribe(x => {
      this.form.setValue({
        batchSize: x.batchSize,
        efficiency: x.efficiency
      });
    });
  }

  ngOnInit() {

  }

  buildForm(): void {
    this.form = this.fb.group({
      batchSize: [0, Validators.required],
      efficiency: [0, Validators.required]
    });

    this.form.valueChanges.subscribe(x => {
      if (this.form.status === "VALID") {
        let brewhouse = new BrewhouseModel();
        brewhouse.batchSize = +this.form.value.batchSize;
        brewhouse.efficiency = +this.form.value.efficiency;

        this.store.dispatch(new BrewhouseAction(brewhouse));
      }
    });
  }

}
