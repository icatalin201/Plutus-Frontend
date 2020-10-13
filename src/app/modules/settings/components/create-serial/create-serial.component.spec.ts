import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSerialComponent } from './create-serial.component';

describe('CreateSerialComponent', () => {
  let component: CreateSerialComponent;
  let fixture: ComponentFixture<CreateSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
