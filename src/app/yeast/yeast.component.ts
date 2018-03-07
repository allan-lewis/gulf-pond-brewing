import { Component, OnInit } from '@angular/core';
import { YeastModel } from './yeast-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { YeastAction } from './yeast-model.reducer';

@Component({
  selector: 'app-yeast',
  templateUrl: './yeast.component.html',
  styleUrls: ['./yeast.component.css']
})
export class YeastComponent implements OnInit {

  model: Observable<YeastModel>;
  form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.model = store.select(state => state.yeast);

    this.buildForm();

    this.model.subscribe(x => {
      this.form.setValue({
        attenuation: x.attenuation
      });
    });
  }

  ngOnInit() {
  }

  buildForm(): void {
    this.form = this.fb.group({
      attenuation: [0, Validators.required]
    });

    this.form.valueChanges.subscribe(x => {
      if (this.form.status === "VALID") {
        let yeast = new YeastModel();
        yeast.attenuation = +this.form.value.attenuation;

        this.store.dispatch(new YeastAction(yeast));
      }
    });
  }

}
