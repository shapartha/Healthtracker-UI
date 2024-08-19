import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBloodSugarComponent } from './update-blood-sugar.component';

describe('UpdateBloodSugarComponent', () => {
  let component: UpdateBloodSugarComponent;
  let fixture: ComponentFixture<UpdateBloodSugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBloodSugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBloodSugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
