import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSerialComponent } from './update-serial.component';

describe('UpdateSerialComponent', () => {
  let component: UpdateSerialComponent;
  let fixture: ComponentFixture<UpdateSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
