import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { ProgressIndicatorComponent } from '@knora/action';
import { KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';

import { OntologyPgComponent } from './ontology-pg.component';

describe('OntologyPgComponent', () => {
  let component: OntologyPgComponent;
  let fixture: ComponentFixture<OntologyPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule
      ],
      declarations: [
        OntologyPgComponent,
        ProgressIndicatorComponent
      ],
      providers: [
        {
          provide: KuiCoreConfigToken,
          useValue: KuiCoreConfig
        },
        HttpClient
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
