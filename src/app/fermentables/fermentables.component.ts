import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { AppState } from '../app.state';

import { FermentablesModel } from './fermentables-model';
import { FermentablesAction } from './fermentables-model.reducer';

@Component({
  selector: 'app-fermentables',
  templateUrl: './fermentables.component.html',
  styleUrls: ['./fermentables.component.css']
})
export class FermentablesComponent implements OnInit {

  fermentables: Observable<FermentablesModel>;

  form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) { 
    this.fermentables = store.select(state => state.fermentables);

    this.buildForm();

    this.fermentables.take(1).subscribe(x => {
      this.form.setValue({
        pounds: x.pounds,
        potential: x.potential
      });
    });
  }

  ngOnInit() {
  }  
  
  buildForm(): void {
    this.form = this.fb.group({
      pounds: [0, Validators.required],
      potential: [0, Validators.required]
    });

    this.form.valueChanges.subscribe(x => {
      if (this.form.status === "VALID") {
        let fermentables = new FermentablesModel();
        fermentables.potential = +this.form.value.potential;
        fermentables.pounds = +this.form.value.pounds;

        this.store.dispatch(new FermentablesAction(fermentables));
      }
    });
  }

}
