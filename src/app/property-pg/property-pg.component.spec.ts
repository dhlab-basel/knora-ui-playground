import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPgComponent } from './property-pg.component';

describe('PropertyPgComponent', () => {
  let component: PropertyPgComponent;
  let fixture: ComponentFixture<PropertyPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
