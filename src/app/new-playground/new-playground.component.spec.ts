import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaygroundComponent } from './new-playground.component';

describe('NewPlaygroundComponent', () => {
  let component: NewPlaygroundComponent;
  let fixture: ComponentFixture<NewPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlaygroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
