import * as tslib_1 from "tslib";
/**
 * This module is part of the Knora-ui modules:
 * https://github.com/dhlab-basel/Knora-ui
 *
 * @copyright 2018
 * Digital Humanities Lab, University of Basel;
 * Data and Service Center for the Humanities DaSCH;
 * All Rights Reserved.
 *
 * @licence
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://opensource.org/licenses/MIT
 *
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminImageDirective } from './admin-image/admin-image.directive';
import { ExistingNameDirective } from './existing-name/existing-name.directive';
import { GndDirective } from './gnd/gnd.directive';
import { JdnDatepickerDirective } from './jdn-datepicker/jdn-datepicker.directive';
import { MessageComponent } from './message/message.component';
import { KeyPipe } from './pipes/key.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';
import { SortButtonComponent } from './sort-button/sort-button.component';
import { StringLiteralInputComponent } from './string-literal-input/string-literal-input.component';
let KuiActionModule = 
/**
 * export @dec class
 */
class KuiActionModule {
};
KuiActionModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            BrowserAnimationsModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            ReactiveFormsModule
        ],
        declarations: [
            ProgressIndicatorComponent,
            SortButtonComponent,
            SortByPipe,
            AdminImageDirective,
            ExistingNameDirective,
            ReversePipe,
            KeyPipe,
            GndDirective,
            ResourceDialogComponent,
            JdnDatepickerDirective,
            MessageComponent,
            StringLiteralInputComponent
        ],
        exports: [
            ProgressIndicatorComponent,
            SortButtonComponent,
            SortByPipe,
            AdminImageDirective,
            ExistingNameDirective,
            ReversePipe,
            KeyPipe,
            GndDirective,
            JdnDatepickerDirective,
            MessageComponent,
            StringLiteralInputComponent
        ]
    })
    /**
     * export @dec class
     */
], KuiActionModule);
export { KuiActionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMvRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQStDcEcsSUFBYSxlQUFlO0FBSDVCOztHQUVHO0FBQ0gsTUFBYSxlQUFlO0NBQzNCLENBQUE7QUFEWSxlQUFlO0lBN0MzQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osdUJBQXVCO1lBQ3ZCLGVBQWU7WUFDZixxQkFBcUI7WUFDckIsYUFBYTtZQUNiLGtCQUFrQjtZQUNsQixhQUFhO1lBQ2IsY0FBYztZQUNkLGFBQWE7WUFDYixhQUFhO1lBQ2IsbUJBQW1CO1NBQ3RCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsMEJBQTBCO1lBQzFCLG1CQUFtQjtZQUNuQixVQUFVO1lBQ1YsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixXQUFXO1lBQ1gsT0FBTztZQUNQLFlBQVk7WUFDWix1QkFBdUI7WUFDdkIsc0JBQXNCO1lBQ3RCLGdCQUFnQjtZQUNoQiwyQkFBMkI7U0FDOUI7UUFDRCxPQUFPLEVBQUU7WUFDTCwwQkFBMEI7WUFDMUIsbUJBQW1CO1lBQ25CLFVBQVU7WUFDVixtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLFdBQVc7WUFDWCxPQUFPO1lBQ1AsWUFBWTtZQUNaLHNCQUFzQjtZQUN0QixnQkFBZ0I7WUFDaEIsMkJBQTJCO1NBQzlCO0tBQ0osQ0FBQztJQUNGOztPQUVHO0dBQ1UsZUFBZSxDQUMzQjtTQURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgbW9kdWxlIGlzIHBhcnQgb2YgdGhlIEtub3JhLXVpIG1vZHVsZXM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGhsYWItYmFzZWwvS25vcmEtdWlcbiAqXG4gKiBAY29weXJpZ2h0IDIwMThcbiAqIERpZ2l0YWwgSHVtYW5pdGllcyBMYWIsIFVuaXZlcnNpdHkgb2YgQmFzZWw7XG4gKiBEYXRhIGFuZCBTZXJ2aWNlIENlbnRlciBmb3IgdGhlIEh1bWFuaXRpZXMgRGFTQ0g7XG4gKiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIEBsaWNlbmNlXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqL1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLCBNYXRGb3JtRmllbGRNb2R1bGUsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFkbWluSW1hZ2VEaXJlY3RpdmUgfSBmcm9tICcuL2FkbWluLWltYWdlL2FkbWluLWltYWdlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFeGlzdGluZ05hbWVEaXJlY3RpdmUgfSBmcm9tICcuL2V4aXN0aW5nLW5hbWUvZXhpc3RpbmctbmFtZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR25kRGlyZWN0aXZlIH0gZnJvbSAnLi9nbmQvZ25kLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBKZG5EYXRlcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9qZG4tZGF0ZXBpY2tlci9qZG4tZGF0ZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBLZXlQaXBlIH0gZnJvbSAnLi9waXBlcy9rZXkucGlwZSc7XG5pbXBvcnQgeyBSZXZlcnNlUGlwZSB9IGZyb20gJy4vcGlwZXMvcmV2ZXJzZS5waXBlJztcbmltcG9ydCB7IFNvcnRCeVBpcGUgfSBmcm9tICcuL3BpcGVzL3NvcnQtYnkucGlwZSc7XG5pbXBvcnQgeyBQcm9ncmVzc0luZGljYXRvckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzb3VyY2VEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlLWRpYWxvZy9yZXNvdXJjZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNvcnRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3NvcnQtYnV0dG9uL3NvcnQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL3N0cmluZy1saXRlcmFsLWlucHV0L3N0cmluZy1saXRlcmFsLWlucHV0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFByb2dyZXNzSW5kaWNhdG9yQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnV0dG9uQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBBZG1pbkltYWdlRGlyZWN0aXZlLFxuICAgICAgICBFeGlzdGluZ05hbWVEaXJlY3RpdmUsXG4gICAgICAgIFJldmVyc2VQaXBlLFxuICAgICAgICBLZXlQaXBlLFxuICAgICAgICBHbmREaXJlY3RpdmUsXG4gICAgICAgIFJlc291cmNlRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBKZG5EYXRlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBNZXNzYWdlQ29tcG9uZW50LFxuICAgICAgICBTdHJpbmdMaXRlcmFsSW5wdXRDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgU3RyaW5nTGl0ZXJhbElucHV0Q29tcG9uZW50XG4gICAgXVxufSlcbi8qKlxuICogZXhwb3J0IEBkZWMgY2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIEt1aUFjdGlvbk1vZHVsZSB7XG59XG4iXX0=