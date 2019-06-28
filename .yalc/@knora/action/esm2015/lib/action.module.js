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
import { MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminImageDirective } from './admin-image/admin-image.directive';
import { GndDirective } from './gnd/gnd.directive';
import { JdnDatepickerDirective } from './jdn-datepicker/jdn-datepicker.directive';
import { ExistingNameDirective } from './existing-name/existing-name.directive';
import { KeyPipe } from './pipes/key.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';
import { SortButtonComponent } from './sort-button/sort-button.component';
import { MessageComponent } from './message/message.component';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFzQy9EOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7OztZQXZDM0IsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLHVCQUF1QjtvQkFDdkIsZUFBZTtvQkFDZixhQUFhO29CQUNiLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixhQUFhO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsMEJBQTBCO29CQUMxQixtQkFBbUI7b0JBQ25CLFVBQVU7b0JBQ1YsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxZQUFZO29CQUNaLHVCQUF1QjtvQkFDdkIsc0JBQXNCO29CQUN0QixnQkFBZ0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDTCwwQkFBMEI7b0JBQzFCLG1CQUFtQjtvQkFDbkIsVUFBVTtvQkFDVixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsV0FBVztvQkFDWCxPQUFPO29CQUNQLFlBQVk7b0JBQ1osc0JBQXNCO29CQUN0QixnQkFBZ0I7aUJBQ25CO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgbW9kdWxlIGlzIHBhcnQgb2YgdGhlIEtub3JhLXVpIG1vZHVsZXM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGhsYWItYmFzZWwvS25vcmEtdWlcbiAqXG4gKiBAY29weXJpZ2h0IDIwMThcbiAqIERpZ2l0YWwgSHVtYW5pdGllcyBMYWIsIFVuaXZlcnNpdHkgb2YgQmFzZWw7XG4gKiBEYXRhIGFuZCBTZXJ2aWNlIENlbnRlciBmb3IgdGhlIEh1bWFuaXRpZXMgRGFTQ0g7XG4gKiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIEBsaWNlbmNlXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqL1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdE1lbnVNb2R1bGUsIE1hdENhcmRNb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBZG1pbkltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9hZG1pbi1pbWFnZS9hZG1pbi1pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgR25kRGlyZWN0aXZlIH0gZnJvbSAnLi9nbmQvZ25kLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBKZG5EYXRlcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9qZG4tZGF0ZXBpY2tlci9qZG4tZGF0ZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRXhpc3RpbmdOYW1lRGlyZWN0aXZlIH0gZnJvbSAnLi9leGlzdGluZy1uYW1lL2V4aXN0aW5nLW5hbWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtleVBpcGUgfSBmcm9tICcuL3BpcGVzL2tleS5waXBlJztcbmltcG9ydCB7IFJldmVyc2VQaXBlIH0gZnJvbSAnLi9waXBlcy9yZXZlcnNlLnBpcGUnO1xuaW1wb3J0IHsgU29ydEJ5UGlwZSB9IGZyb20gJy4vcGlwZXMvc29ydC1ieS5waXBlJztcblxuaW1wb3J0IHsgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzLWluZGljYXRvci9wcm9ncmVzcy1pbmRpY2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc291cmNlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS1kaWFsb2cvcmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTb3J0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXG4gICAgICAgIE1hdE1lbnVNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBQcm9ncmVzc0luZGljYXRvckNvbXBvbmVudCxcbiAgICAgICAgU29ydEJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgQWRtaW5JbWFnZURpcmVjdGl2ZSxcbiAgICAgICAgRXhpc3RpbmdOYW1lRGlyZWN0aXZlLFxuICAgICAgICBSZXZlcnNlUGlwZSxcbiAgICAgICAgS2V5UGlwZSxcbiAgICAgICAgR25kRGlyZWN0aXZlLFxuICAgICAgICBSZXNvdXJjZURpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBQcm9ncmVzc0luZGljYXRvckNvbXBvbmVudCxcbiAgICAgICAgU29ydEJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgQWRtaW5JbWFnZURpcmVjdGl2ZSxcbiAgICAgICAgRXhpc3RpbmdOYW1lRGlyZWN0aXZlLFxuICAgICAgICBSZXZlcnNlUGlwZSxcbiAgICAgICAgS2V5UGlwZSxcbiAgICAgICAgR25kRGlyZWN0aXZlLFxuICAgICAgICBKZG5EYXRlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBNZXNzYWdlQ29tcG9uZW50XG4gICAgXVxufSlcbi8qKlxuICogZXhwb3J0IEBkZWMgY2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIEt1aUFjdGlvbk1vZHVsZSB7XG59XG4iXX0=