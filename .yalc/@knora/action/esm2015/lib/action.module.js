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
export { KuiActionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBeUMxRSxJQUFhLGVBQWU7QUFINUI7O0dBRUc7QUFDSCxNQUFhLGVBQWU7Q0FDM0IsQ0FBQTtBQURZLGVBQWU7SUF2QzNCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWix1QkFBdUI7WUFDdkIsZUFBZTtZQUNmLGFBQWE7WUFDYixhQUFhO1lBQ2IsYUFBYTtZQUNiLGFBQWE7U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDViwwQkFBMEI7WUFDMUIsbUJBQW1CO1lBQ25CLFVBQVU7WUFDVixtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLFdBQVc7WUFDWCxPQUFPO1lBQ1AsWUFBWTtZQUNaLHVCQUF1QjtZQUN2QixzQkFBc0I7WUFDdEIsZ0JBQWdCO1NBQ25CO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsMEJBQTBCO1lBQzFCLG1CQUFtQjtZQUNuQixVQUFVO1lBQ1YsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQixXQUFXO1lBQ1gsT0FBTztZQUNQLFlBQVk7WUFDWixzQkFBc0I7WUFDdEIsZ0JBQWdCO1NBQ25CO0tBQ0osQ0FBQztJQUNGOztPQUVHO0dBQ1UsZUFBZSxDQUMzQjtTQURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgbW9kdWxlIGlzIHBhcnQgb2YgdGhlIEtub3JhLXVpIG1vZHVsZXM6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGhsYWItYmFzZWwvS25vcmEtdWlcbiAqXG4gKiBAY29weXJpZ2h0IDIwMThcbiAqIERpZ2l0YWwgSHVtYW5pdGllcyBMYWIsIFVuaXZlcnNpdHkgb2YgQmFzZWw7XG4gKiBEYXRhIGFuZCBTZXJ2aWNlIENlbnRlciBmb3IgdGhlIEh1bWFuaXRpZXMgRGFTQ0g7XG4gKiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIEBsaWNlbmNlXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICpcbiAqL1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0TGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQWRtaW5JbWFnZURpcmVjdGl2ZSB9IGZyb20gJy4vYWRtaW4taW1hZ2UvYWRtaW4taW1hZ2UuZGlyZWN0aXZlJztcbmltcG9ydCB7IEV4aXN0aW5nTmFtZURpcmVjdGl2ZSB9IGZyb20gJy4vZXhpc3RpbmctbmFtZS9leGlzdGluZy1uYW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHbmREaXJlY3RpdmUgfSBmcm9tICcuL2duZC9nbmQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEpkbkRhdGVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2pkbi1kYXRlcGlja2VyL2pkbi1kYXRlcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlL21lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEtleVBpcGUgfSBmcm9tICcuL3BpcGVzL2tleS5waXBlJztcbmltcG9ydCB7IFJldmVyc2VQaXBlIH0gZnJvbSAnLi9waXBlcy9yZXZlcnNlLnBpcGUnO1xuaW1wb3J0IHsgU29ydEJ5UGlwZSB9IGZyb20gJy4vcGlwZXMvc29ydC1ieS5waXBlJztcbmltcG9ydCB7IFByb2dyZXNzSW5kaWNhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzcy1pbmRpY2F0b3IvcHJvZ3Jlc3MtaW5kaWNhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNvdXJjZURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UtZGlhbG9nL3Jlc291cmNlLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU29ydEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vc29ydC1idXR0b24vc29ydC1idXR0b24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcbiAgICAgICAgTWF0TWVudU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFByb2dyZXNzSW5kaWNhdG9yQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnV0dG9uQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBBZG1pbkltYWdlRGlyZWN0aXZlLFxuICAgICAgICBFeGlzdGluZ05hbWVEaXJlY3RpdmUsXG4gICAgICAgIFJldmVyc2VQaXBlLFxuICAgICAgICBLZXlQaXBlLFxuICAgICAgICBHbmREaXJlY3RpdmUsXG4gICAgICAgIFJlc291cmNlRGlhbG9nQ29tcG9uZW50LFxuICAgICAgICBKZG5EYXRlcGlja2VyRGlyZWN0aXZlLFxuICAgICAgICBNZXNzYWdlQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFByb2dyZXNzSW5kaWNhdG9yQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnV0dG9uQ29tcG9uZW50LFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBBZG1pbkltYWdlRGlyZWN0aXZlLFxuICAgICAgICBFeGlzdGluZ05hbWVEaXJlY3RpdmUsXG4gICAgICAgIFJldmVyc2VQaXBlLFxuICAgICAgICBLZXlQaXBlLFxuICAgICAgICBHbmREaXJlY3RpdmUsXG4gICAgICAgIEpkbkRhdGVwaWNrZXJEaXJlY3RpdmUsXG4gICAgICAgIE1lc3NhZ2VDb21wb25lbnRcbiAgICBdXG59KVxuLyoqXG4gKiBleHBvcnQgQGRlYyBjbGFzc1xuICovXG5leHBvcnQgY2xhc3MgS3VpQWN0aW9uTW9kdWxlIHtcbn1cbiJdfQ==