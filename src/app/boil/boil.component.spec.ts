import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilComponent } from './boil.component';

describe('BoilComponent', () => {
  let component: BoilComponent;
  let fixture: ComponentFixture<BoilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
