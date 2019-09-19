import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ViewerPgComponent } from './viewer-pg.component';


describe('ViewerPgComponent', () => {
    let component: ViewerPgComponent;
    let fixture: ComponentFixture<ViewerPgComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewerPgComponent],
            imports: [
                MatButtonToggleModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewerPgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
