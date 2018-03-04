import 'rxjs/add/operator/take';

import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { BrewhouseModel, BrewType } from './brewhouse-model';
import { BREWHOUSE, BrewhouseAction } from './brewhouse-model.reducer';
import { AppState } from '../app.state';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (var enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({key: parseInt(enumMember, 10), value: value[enumMember]});
      } 
    }

    return keys;
  }
}

@Component({
  selector: 'app-brewhouse',
  templateUrl: './brewhouse.component.html',
  styleUrls: ['./brewhouse.component.css']
})
export class BrewhouseComponent implements OnInit {

  model: Observable<BrewhouseModel>;

  form: FormGroup;
  types = BrewType;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.model = store.select(state => state.brewhouse);
    
    this.buildForm();

    this.model.take(1).subscribe(x => {
      this.form.setValue({
        brewType: x.brewType,
        batchSize: x.batchSize,
        efficiency: x.efficiency
      });
    });
  }

  ngOnInit() {
  }

  buildForm(): void {
    this.form = this.fb.group({
      brewType: BrewType.BIAB,
      batchSize: [0, Validators.required],
      efficiency: [0, Validators.required]
    });

    this.form.valueChanges.subscribe(x => {
      if (this.form.status === "VALID") {
        let brewhouse = new BrewhouseModel();
        brewhouse.brewType = this.form.value.brewType;
        brewhouse.batchSize = +this.form.value.batchSize;
        brewhouse.efficiency = +this.form.value.efficiency;

        this.store.dispatch(new BrewhouseAction(brewhouse));
      }
    });
  }

}
