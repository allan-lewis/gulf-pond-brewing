import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FermentablesComponent } from './fermentables.component';

describe('FermentablesComponent', () => {
  let component: FermentablesComponent;
  let fixture: ComponentFixture<FermentablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FermentablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FermentablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
