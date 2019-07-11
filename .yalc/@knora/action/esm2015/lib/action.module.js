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
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
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
/**
 * export @dec class
 */
export class KuiActionModule {
}
KuiActionModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFzQzFFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7OztZQXZDM0IsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLHVCQUF1QjtvQkFDdkIsZUFBZTtvQkFDZixhQUFhO29CQUNiLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixhQUFhO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsMEJBQTBCO29CQUMxQixtQkFBbUI7b0JBQ25CLFVBQVU7b0JBQ1YsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxZQUFZO29CQUNaLHVCQUF1QjtvQkFDdkIsc0JBQXNCO29CQUN0QixnQkFBZ0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDTCwwQkFBMEI7b0JBQzFCLG1CQUFtQjtvQkFDbkIsVUFBVTtvQkFDVixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsV0FBVztvQkFDWCxPQUFPO29CQUNQLFlBQVk7b0JBQ1osc0JBQXNCO29CQUN0QixnQkFBZ0I7aUJBQ25CO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgbW9kdWxlIGlzIHBhcnQgb2YgdGhlIEtub3JhLXVpIG1vZHVsZXM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGhsYWItYmFzZWwvS25vcmEtdWlcbiAqXG4gKiBAY29weXJpZ2h0IDIwMThcbiAqIERpZ2l0YWwgSHVtYW5pdGllcyBMYWIsIFVuaXZlcnNpdHkgb2YgQmFzZWw7XG4gKiBEYXRhIGFuZCBTZXJ2aWNlIENlbnRlciBmb3IgdGhlIEh1bWFuaXRpZXMgRGFTQ0g7XG4gKiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIEBsaWNlbmNlXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqL1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdExpc3RNb2R1bGUsIE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBZG1pbkltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9hZG1pbi1pbWFnZS9hZG1pbi1pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRXhpc3RpbmdOYW1lRGlyZWN0aXZlIH0gZnJvbSAnLi9leGlzdGluZy1uYW1lL2V4aXN0aW5nLW5hbWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEduZERpcmVjdGl2ZSB9IGZyb20gJy4vZ25kL2duZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vamRuLWRhdGVwaWNrZXIvamRuLWRhdGVwaWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgS2V5UGlwZSB9IGZyb20gJy4vcGlwZXMva2V5LnBpcGUnO1xuaW1wb3J0IHsgUmV2ZXJzZVBpcGUgfSBmcm9tICcuL3BpcGVzL3JldmVyc2UucGlwZSc7XG5pbXBvcnQgeyBTb3J0QnlQaXBlIH0gZnJvbSAnLi9waXBlcy9zb3J0LWJ5LnBpcGUnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzLWluZGljYXRvci9wcm9ncmVzcy1pbmRpY2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc291cmNlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS1kaWFsb2cvcmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTb3J0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgUmVzb3VyY2VEaWFsb2dDb21wb25lbnQsXG4gICAgICAgIEpkbkRhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIE1lc3NhZ2VDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudFxuICAgIF1cbn0pXG4vKipcbiAqIGV4cG9ydCBAZGVjIGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBLdWlBY3Rpb25Nb2R1bGUge1xufVxuIl19