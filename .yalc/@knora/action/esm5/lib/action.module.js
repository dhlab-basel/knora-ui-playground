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
var KuiActionModule = /** @class */ (function () {
    /**
     * export @dec class
     */
    function KuiActionModule() {
    }
    KuiActionModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatCardModule,
                MatIconModule,
                MatListModule,
                MatMenuModule
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
                MessageComponent
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
                MessageComponent
            ]
        })
        /**
         * export @dec class
         */
    ], KuiActionModule);
    return KuiActionModule;
}());
export { KuiActionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBeUMxRTtJQUhBOztPQUVHO0lBQ0g7SUFDQSxDQUFDO0lBRFksZUFBZTtRQXZDM0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osdUJBQXVCO2dCQUN2QixlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixhQUFhO2dCQUNiLGFBQWE7YUFDaEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsMEJBQTBCO2dCQUMxQixtQkFBbUI7Z0JBQ25CLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixxQkFBcUI7Z0JBQ3JCLFdBQVc7Z0JBQ1gsT0FBTztnQkFDUCxZQUFZO2dCQUNaLHVCQUF1QjtnQkFDdkIsc0JBQXNCO2dCQUN0QixnQkFBZ0I7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsMEJBQTBCO2dCQUMxQixtQkFBbUI7Z0JBQ25CLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixxQkFBcUI7Z0JBQ3JCLFdBQVc7Z0JBQ1gsT0FBTztnQkFDUCxZQUFZO2dCQUNaLHNCQUFzQjtnQkFDdEIsZ0JBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztXQUVHO09BQ1UsZUFBZSxDQUMzQjtJQUFELHNCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBtb2R1bGUgaXMgcGFydCBvZiB0aGUgS25vcmEtdWkgbW9kdWxlczpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kaGxhYi1iYXNlbC9Lbm9yYS11aVxuICpcbiAqIEBjb3B5cmlnaHQgMjAxOFxuICogRGlnaXRhbCBIdW1hbml0aWVzIExhYiwgVW5pdmVyc2l0eSBvZiBCYXNlbDtcbiAqIERhdGEgYW5kIFNlcnZpY2UgQ2VudGVyIGZvciB0aGUgSHVtYW5pdGllcyBEYVNDSDtcbiAqIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogQGxpY2VuY2VcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICovXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBZG1pbkltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9hZG1pbi1pbWFnZS9hZG1pbi1pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRXhpc3RpbmdOYW1lRGlyZWN0aXZlIH0gZnJvbSAnLi9leGlzdGluZy1uYW1lL2V4aXN0aW5nLW5hbWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEduZERpcmVjdGl2ZSB9IGZyb20gJy4vZ25kL2duZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vamRuLWRhdGVwaWNrZXIvamRuLWRhdGVwaWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgS2V5UGlwZSB9IGZyb20gJy4vcGlwZXMva2V5LnBpcGUnO1xuaW1wb3J0IHsgUmV2ZXJzZVBpcGUgfSBmcm9tICcuL3BpcGVzL3JldmVyc2UucGlwZSc7XG5pbXBvcnQgeyBTb3J0QnlQaXBlIH0gZnJvbSAnLi9waXBlcy9zb3J0LWJ5LnBpcGUnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzLWluZGljYXRvci9wcm9ncmVzcy1pbmRpY2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc291cmNlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS1kaWFsb2cvcmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTb3J0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgUmVzb3VyY2VEaWFsb2dDb21wb25lbnQsXG4gICAgICAgIEpkbkRhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIE1lc3NhZ2VDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudFxuICAgIF1cbn0pXG4vKipcbiAqIGV4cG9ydCBAZGVjIGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBLdWlBY3Rpb25Nb2R1bGUge1xufVxuIl19