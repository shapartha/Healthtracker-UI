import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSugarComponent } from './blood-sugar.component';

describe('BloodSugarComponent', () => {
  let component: BloodSugarComponent;
  let fixture: ComponentFixture<BloodSugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloodSugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodSugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
