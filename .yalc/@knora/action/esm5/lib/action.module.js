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
import { TruncatePipe } from './pipes/truncate.pipe';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';
import { SortButtonComponent } from './sort-button/sort-button.component';
import { StringLiteralInputComponent } from './string-literal-input/string-literal-input.component';
import { StringifyStringLiteralPipe } from './pipes/stringify-string-literal.pipe';
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
                StringLiteralInputComponent,
                StringifyStringLiteralPipe,
                TruncatePipe
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
                StringLiteralInputComponent,
                StringifyStringLiteralPipe,
                TruncatePipe
            ]
        })
        /**
         * export @dec class
         */
    ], KuiActionModule);
    return KuiActionModule;
}());
export { KuiActionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFxRG5GO0lBSEE7O09BRUc7SUFDSDtJQUNBLENBQUM7SUFEWSxlQUFlO1FBbkQzQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWix1QkFBdUI7Z0JBQ3ZCLGVBQWU7Z0JBQ2YscUJBQXFCO2dCQUNyQixhQUFhO2dCQUNiLGtCQUFrQjtnQkFDbEIsYUFBYTtnQkFDYixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixtQkFBbUI7YUFDdEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsMEJBQTBCO2dCQUMxQixtQkFBbUI7Z0JBQ25CLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixxQkFBcUI7Z0JBQ3JCLFdBQVc7Z0JBQ1gsT0FBTztnQkFDUCxZQUFZO2dCQUNaLHVCQUF1QjtnQkFDdkIsc0JBQXNCO2dCQUN0QixnQkFBZ0I7Z0JBQ2hCLDJCQUEyQjtnQkFDM0IsMEJBQTBCO2dCQUMxQixZQUFZO2FBRWY7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsMEJBQTBCO2dCQUMxQixtQkFBbUI7Z0JBQ25CLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixxQkFBcUI7Z0JBQ3JCLFdBQVc7Z0JBQ1gsT0FBTztnQkFDUCxZQUFZO2dCQUNaLHNCQUFzQjtnQkFDdEIsZ0JBQWdCO2dCQUNoQiwyQkFBMkI7Z0JBQzNCLDBCQUEwQjtnQkFDMUIsWUFBWTthQUVmO1NBQ0osQ0FBQztRQUNGOztXQUVHO09BQ1UsZUFBZSxDQUMzQjtJQUFELHNCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBtb2R1bGUgaXMgcGFydCBvZiB0aGUgS25vcmEtdWkgbW9kdWxlczpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kaGxhYi1iYXNlbC9Lbm9yYS11aVxuICpcbiAqIEBjb3B5cmlnaHQgMjAxOFxuICogRGlnaXRhbCBIdW1hbml0aWVzIExhYiwgVW5pdmVyc2l0eSBvZiBCYXNlbDtcbiAqIERhdGEgYW5kIFNlcnZpY2UgQ2VudGVyIGZvciB0aGUgSHVtYW5pdGllcyBEYVNDSDtcbiAqIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogQGxpY2VuY2VcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICovXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQWRtaW5JbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vYWRtaW4taW1hZ2UvYWRtaW4taW1hZ2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IEV4aXN0aW5nTmFtZURpcmVjdGl2ZSB9IGZyb20gJy4vZXhpc3RpbmctbmFtZS9leGlzdGluZy1uYW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHbmREaXJlY3RpdmUgfSBmcm9tICcuL2duZC9nbmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEpkbkRhdGVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2pkbi1kYXRlcGlja2VyL2pkbi1kYXRlcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEtleVBpcGUgfSBmcm9tICcuL3BpcGVzL2tleS5waXBlJztcbmltcG9ydCB7IFJldmVyc2VQaXBlIH0gZnJvbSAnLi9waXBlcy9yZXZlcnNlLnBpcGUnO1xuaW1wb3J0IHsgU29ydEJ5UGlwZSB9IGZyb20gJy4vcGlwZXMvc29ydC1ieS5waXBlJztcbmltcG9ydCB7IFRydW5jYXRlUGlwZSB9IGZyb20gJy4vcGlwZXMvdHJ1bmNhdGUucGlwZSc7XG5pbXBvcnQgeyBQcm9ncmVzc0luZGljYXRvckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzb3VyY2VEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlLWRpYWxvZy9yZXNvdXJjZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNvcnRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3NvcnQtYnV0dG9uL3NvcnQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL3N0cmluZy1saXRlcmFsLWlucHV0L3N0cmluZy1saXRlcmFsLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdHJpbmdpZnlTdHJpbmdMaXRlcmFsUGlwZSB9IGZyb20gJy4vcGlwZXMvc3RyaW5naWZ5LXN0cmluZy1saXRlcmFsLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXG4gICAgICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBQcm9ncmVzc0luZGljYXRvckNvbXBvbmVudCxcbiAgICAgICAgU29ydEJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgQWRtaW5JbWFnZURpcmVjdGl2ZSxcbiAgICAgICAgRXhpc3RpbmdOYW1lRGlyZWN0aXZlLFxuICAgICAgICBSZXZlcnNlUGlwZSxcbiAgICAgICAgS2V5UGlwZSxcbiAgICAgICAgR25kRGlyZWN0aXZlLFxuICAgICAgICBSZXNvdXJjZURpYWxvZ0NvbXBvbmVudCxcbiAgICAgICAgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgU3RyaW5nTGl0ZXJhbElucHV0Q29tcG9uZW50LFxuICAgICAgICBTdHJpbmdpZnlTdHJpbmdMaXRlcmFsUGlwZSxcbiAgICAgICAgVHJ1bmNhdGVQaXBlXG5cbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQsXG4gICAgICAgIFNvcnRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEFkbWluSW1hZ2VEaXJlY3RpdmUsXG4gICAgICAgIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSxcbiAgICAgICAgUmV2ZXJzZVBpcGUsXG4gICAgICAgIEtleVBpcGUsXG4gICAgICAgIEduZERpcmVjdGl2ZSxcbiAgICAgICAgSmRuRGF0ZXBpY2tlckRpcmVjdGl2ZSxcbiAgICAgICAgTWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgU3RyaW5nTGl0ZXJhbElucHV0Q29tcG9uZW50LFxuICAgICAgICBTdHJpbmdpZnlTdHJpbmdMaXRlcmFsUGlwZSxcbiAgICAgICAgVHJ1bmNhdGVQaXBlXG5cbiAgICBdXG59KVxuLyoqXG4gKiBleHBvcnQgQGRlYyBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgS3VpQWN0aW9uTW9kdWxlIHtcbn1cbiJdfQ==