import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPgComponent } from './action-pg.component';

describe('ActionPgComponent', () => {
  let component: ActionPgComponent;
  let fixture: ComponentFixture<ActionPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
