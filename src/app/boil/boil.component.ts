import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { BoilModel } from './boil-model';
import { BOIL, BoilAction } from './boil-model.reducer';
import { AppState } from '../app.state';

@Component({
  selector: 'app-boil',
  templateUrl: './boil.component.html',
  styleUrls: ['./boil.component.css']
})
export class BoilComponent implements OnInit {

  boil: Observable<BoilModel>;

  form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.boil = store.select(state => state.boil);

    this.buildForm();

    this.boil.take(1).subscribe(x => {
      this.form.setValue({
        duration: x.duration
      });
    });
  }

  ngOnInit() {
  }

  buildForm(): void {
    this.form = this.fb.group({
      duration: [0, Validators.required]
    });

    this.form.valueChanges.subscribe(x => {
      if (this.form.status === "VALID") {
        let boil = new BoilModel();
        boil.duration = +this.form.value.duration;

        this.store.dispatch(new BoilAction(boil));
      }
    });
  }

}
