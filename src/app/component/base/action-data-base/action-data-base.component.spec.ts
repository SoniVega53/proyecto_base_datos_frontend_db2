import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDataBaseComponent } from './action-data-base.component';

describe('ActionDataBaseComponent', () => {
  let component: ActionDataBaseComponent;
  let fixture: ComponentFixture<ActionDataBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDataBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionDataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
