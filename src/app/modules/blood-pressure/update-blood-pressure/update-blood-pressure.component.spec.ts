import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBloodPressureComponent } from './update-blood-pressure.component';

describe('UpdateBloodPressureComponent', () => {
  let component: UpdateBloodPressureComponent;
  let fixture: ComponentFixture<UpdateBloodPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBloodPressureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBloodPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
