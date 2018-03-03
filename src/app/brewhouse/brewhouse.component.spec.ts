import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewhouseComponent } from './brewhouse.component';

describe('BrewhouseComponent', () => {
  let component: BrewhouseComponent;
  let fixture: ComponentFixture<BrewhouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrewhouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
