import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material';

import { AuthenticationPgComponent } from './authentication-pg.component';

describe('AuthenticationPgComponent', () => {
    let component: AuthenticationPgComponent;
    let fixture: ComponentFixture<AuthenticationPgComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatDividerModule
            ],
            declarations: [
                AuthenticationPgComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationPgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
