import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BrewhouseComponent } from './brewhouse/brewhouse.component';
import { HeaderComponent } from './header/header.component';
import { FermentablesComponent } from './fermentables/fermentables.component';

import { MatToolbarModule, MatInputModule, MatSelectModule } from '@angular/material';
import { WaterComponent } from './water/water.component';
import { MashComponent } from './mash/mash.component';

import { StoreModule } from '@ngrx/store';
import { brewhouseModelReducer } from './brewhouse/brewhouse-model.reducer';
import { fermentablesModelReducer } from './fermentables/fermentables-model.reducer';
import { waterModelReducer } from './water/water-model.reducer';
import { boilModelReducer } from './boil/boil-model.reducer';
import { BoilComponent } from './boil/boil.component';

import { KeysPipe } from './brewhouse/brewhouse.component';
import { TargetsComponent } from './targets/targets.component';
import { YeastComponent } from './yeast/yeast.component';
import { yeastModelReducer } from './yeast/yeast-model.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BrewhouseComponent,
    HeaderComponent,
    FermentablesComponent,
    WaterComponent,
    MashComponent,
    BoilComponent,
    KeysPipe,
    TargetsComponent,
    YeastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    StoreModule.forRoot({ 
      brewhouse: brewhouseModelReducer,
      fermentables: fermentablesModelReducer,
      water: waterModelReducer,
      boil: boilModelReducer,
      yeast: yeastModelReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
