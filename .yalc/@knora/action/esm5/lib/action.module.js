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
var KuiActionModule = /** @class */ (function () {
    function KuiActionModule() {
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
    return KuiActionModule;
}());
export { KuiActionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFL0Q7SUFBQTtJQXdDQSxDQUFDOztnQkF4Q0EsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixhQUFhO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsMEJBQTBCO3dCQUMxQixtQkFBbUI7d0JBQ25CLFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLFdBQVc7d0JBQ1gsT0FBTzt3QkFDUCxZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3dCQUN0QixnQkFBZ0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDTCwwQkFBMEI7d0JBQzFCLG1CQUFtQjt3QkFDbkIsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsV0FBVzt3QkFDWCxPQUFPO3dCQUNQLFlBQVk7d0JBQ1osc0JBQXNCO3dCQUN0QixnQkFBZ0I7cUJBQ25CO2lCQUNKOztJQUtELHNCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7U0FEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyBwYXJ0IG9mIHRoZSBLbm9yYS11aSBtb2R1bGVzOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2RobGFiLWJhc2VsL0tub3JhLXVpXG4gKlxuICogQGNvcHlyaWdodCAyMDE4XG4gKiBEaWdpdGFsIEh1bWFuaXRpZXMgTGFiLCBVbml2ZXJzaXR5IG9mIEJhc2VsO1xuICogRGF0YSBhbmQgU2VydmljZSBDZW50ZXIgZm9yIHRoZSBIdW1hbml0aWVzIERhU0NIO1xuICogQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBAbGljZW5jZVxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKi9cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRNZW51TW9kdWxlLCBNYXRDYXJkTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQWRtaW5JbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vYWRtaW4taW1hZ2UvYWRtaW4taW1hZ2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IEduZERpcmVjdGl2ZSB9IGZyb20gJy4vZ25kL2duZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vamRuLWRhdGVwaWNrZXIvamRuLWRhdGVwaWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEV4aXN0aW5nTmFtZURpcmVjdGl2ZSB9IGZyb20gJy4vZXhpc3RpbmctbmFtZS9leGlzdGluZy1uYW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBLZXlQaXBlIH0gZnJvbSAnLi9waXBlcy9rZXkucGlwZSc7XG5pbXBvcnQgeyBSZXZlcnNlUGlwZSB9IGZyb20gJy4vcGlwZXMvcmV2ZXJzZS5waXBlJztcbmltcG9ydCB7IFNvcnRCeVBpcGUgfSBmcm9tICcuL3BpcGVzL3NvcnQtYnkucGlwZSc7XG5cbmltcG9ydCB7IFByb2dyZXNzSW5kaWNhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNvdXJjZURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UtZGlhbG9nL3Jlc291cmNlLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU29ydEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vc29ydC1idXR0b24vc29ydC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgUmVzb3VyY2VEaWFsb2dDb21wb25lbnQsXG4gICAgICAgIEpkbkRhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIE1lc3NhZ2VDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudFxuICAgIF1cbn0pXG4vKipcbiAqIGV4cG9ydCBAZGVjIGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBLdWlBY3Rpb25Nb2R1bGUge1xufVxuIl19