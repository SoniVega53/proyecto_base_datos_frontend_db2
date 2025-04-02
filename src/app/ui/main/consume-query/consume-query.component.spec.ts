import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeQueryComponent } from './consume-query.component';

describe('ConsumeQueryComponent', () => {
  let component: ConsumeQueryComponent;
  let fixture: ComponentFixture<ConsumeQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsumeQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumeQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
