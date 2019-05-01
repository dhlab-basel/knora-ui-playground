import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchPgComponent } from './new-search-pg.component';

describe('NewSearchPgComponent', () => {
  let component: NewSearchPgComponent;
  let fixture: ComponentFixture<NewSearchPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearchPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSearchPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
