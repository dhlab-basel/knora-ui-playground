import * as tslib_1 from "tslib";
import { Component, Host, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatDatepickerContent } from '@angular/material/datepicker';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
/** Custom header component containing a calendar format switcher */
let HeaderComponent = class HeaderComponent {
    constructor(_calendar, _dateAdapter, _datepickerContent, fb) {
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._datepickerContent = _datepickerContent;
        this.fb = fb;
        // a list of supported calendar formats (Gregorian and Julian)
        this.supportedCalendarFormats = JDNConvertibleCalendar.supportedCalendars;
    }
    ngOnInit() {
        // get the currently active calendar format from the date adapter
        if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
            this.activeFormat = this._dateAdapter.activeCalendarFormat;
        }
        else {
            console.log('date adapter is expected to be an instance of JDNConvertibleCalendarDateAdapter');
        }
        // build a form for the calendar format selection
        this.form = this.fb.group({
            calendar: [this.activeFormat, Validators.required]
        });
        // do the conversion when the user selects another calendar format
        this.form.valueChanges.subscribe((data) => {
            // pass the target calendar format to the conversion method
            this.convertDate(data.calendar);
        });
    }
    /**
     * Converts the date into the target format.
     *
     * @param calendar the target calendar format.
     */
    convertDate(calendar) {
        if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
            // convert the date into the target calendar format
            const convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);
            // set the new date
            this._calendar.activeDate = convertedDate;
            // select the new date in the datepicker UI
            this._datepickerContent.datepicker.select(convertedDate);
            // update view after calendar format conversion
            this._calendar.updateTodaysDate();
        }
        else {
            console.log('date adapter is expected to be an instance of JDNConvertibleCalendarDateAdapter');
        }
    }
};
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-calendar-header',
        template: `
      <mat-select placeholder="Calendar Format" class="kui-calendar-header" [formControl]="form.controls['calendar']">
        <mat-option *ngFor="let cal of supportedCalendarFormats" [value]="cal">{{cal}}</mat-option>
      </mat-select>
      <mat-calendar-header></mat-calendar-header>
    `,
        styles: [".mat-select.kui-calendar-header{margin:12px!important;width:calc(100% - 24px)!important}"]
    }),
    tslib_1.__param(0, Host()),
    tslib_1.__param(3, Inject(FormBuilder)),
    tslib_1.__metadata("design:paramtypes", [MatCalendar,
        DateAdapter,
        MatDatepickerContent,
        FormBuilder])
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2RhdGUtdmFsdWUvaGVhZGVyLWNhbGVuZGFyL2hlYWRlci1jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsSUFBSSxFQUFFLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRSxPQUFPLEVBQXlCLHNCQUFzQixFQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFDbEcsT0FBTyxFQUFFLFdBQVcsRUFBbUIsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFdEYsb0VBQW9FO0FBV3BFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDeEIsWUFBNkIsU0FBOEMsRUFDL0QsWUFBaUQsRUFDakQsa0JBQWdFLEVBQzNDLEVBQWU7UUFIbkIsY0FBUyxHQUFULFNBQVMsQ0FBcUM7UUFDL0QsaUJBQVksR0FBWixZQUFZLENBQXFDO1FBQ2pELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBOEM7UUFDM0MsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUtoRCw4REFBOEQ7UUFDOUQsNkJBQXdCLEdBQUcsc0JBQXNCLENBQUMsa0JBQWtCLENBQUM7SUFMckUsQ0FBQztJQVVELFFBQVE7UUFFSixpRUFBaUU7UUFDakUsSUFBSSxJQUFJLENBQUMsWUFBWSxZQUFZLGlDQUFpQyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztTQUM5RDthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ2xHO1FBRUQsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDdEIsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3JELENBQUMsQ0FBQztRQUVILGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QywyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxRQUFnQztRQUV4QyxJQUFJLElBQUksQ0FBQyxZQUFZLFlBQVksaUNBQWlDLEVBQUU7WUFFaEUsbURBQW1EO1lBQ25ELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbkcsbUJBQW1CO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQztZQUUxQywyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekQsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNyQzthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ2xHO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUE3RFksZUFBZTtJQVYzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLFFBQVEsRUFBRTs7Ozs7S0FLVDs7S0FFSixDQUFDO0lBRWdCLG1CQUFBLElBQUksRUFBRSxDQUFBO0lBR2YsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzZDQUhnQixXQUFXO1FBQ3pCLFdBQVc7UUFDTCxvQkFBb0I7UUFDZixXQUFXO0dBSnZDLGVBQWUsQ0E2RDNCO1NBN0RZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSG9zdCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgUHJvcGVydHlWYWx1ZSwgVmFsdWUsIFZhbHVlTGl0ZXJhbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IEdyZWdvcmlhbkNhbGVuZGFyRGF0ZSwgSkROQ29udmVydGlibGVDYWxlbmRhciwgSkROUGVyaW9kIH0gZnJvbSAnamRuY29udmVydGlibGVjYWxlbmRhcic7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfTE9DQUxFIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRDYWxlbmRhciwgTWF0RGF0ZXBpY2tlckNvbnRlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlciB9IGZyb20gJ2pkbmNvbnZlcnRpYmxlY2FsZW5kYXJkYXRlYWRhcHRlcic7XG5cbi8qKiBDdXN0b20gaGVhZGVyIGNvbXBvbmVudCBjb250YWluaW5nIGEgY2FsZW5kYXIgZm9ybWF0IHN3aXRjaGVyICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1jYWxlbmRhci1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIkNhbGVuZGFyIEZvcm1hdFwiIGNsYXNzPVwia3VpLWNhbGVuZGFyLWhlYWRlclwiIFtmb3JtQ29udHJvbF09XCJmb3JtLmNvbnRyb2xzWydjYWxlbmRhciddXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjYWwgb2Ygc3VwcG9ydGVkQ2FsZW5kYXJGb3JtYXRzXCIgW3ZhbHVlXT1cImNhbFwiPnt7Y2FsfX08L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8bWF0LWNhbGVuZGFyLWhlYWRlcj48L21hdC1jYWxlbmRhci1oZWFkZXI+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9oZWFkZXItY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQ8RD4gaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbnN0cnVjdG9yIChASG9zdCgpIHByaXZhdGUgX2NhbGVuZGFyOiBNYXRDYWxlbmRhcjxKRE5Db252ZXJ0aWJsZUNhbGVuZGFyPixcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEpETkNvbnZlcnRpYmxlQ2FsZW5kYXI+LFxuICAgICAgICBwcml2YXRlIF9kYXRlcGlja2VyQ29udGVudDogTWF0RGF0ZXBpY2tlckNvbnRlbnQ8SkROQ29udmVydGlibGVDYWxlbmRhcj4sXG4gICAgICAgIEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgLy8gYSBsaXN0IG9mIHN1cHBvcnRlZCBjYWxlbmRhciBmb3JtYXRzIChHcmVnb3JpYW4gYW5kIEp1bGlhbilcbiAgICBzdXBwb3J0ZWRDYWxlbmRhckZvcm1hdHMgPSBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyLnN1cHBvcnRlZENhbGVuZGFycztcblxuICAgIC8vIHRoZSBjdXJyZW50bHkgYWN0aXZlIGNhbGVuZGFyIGZvcm1hdFxuICAgIGFjdGl2ZUZvcm1hdDtcblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudGx5IGFjdGl2ZSBjYWxlbmRhciBmb3JtYXQgZnJvbSB0aGUgZGF0ZSBhZGFwdGVyXG4gICAgICAgIGlmICh0aGlzLl9kYXRlQWRhcHRlciBpbnN0YW5jZW9mIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlcikge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVGb3JtYXQgPSB0aGlzLl9kYXRlQWRhcHRlci5hY3RpdmVDYWxlbmRhckZvcm1hdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRlIGFkYXB0ZXIgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgSkROQ29udmVydGlibGVDYWxlbmRhckRhdGVBZGFwdGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBidWlsZCBhIGZvcm0gZm9yIHRoZSBjYWxlbmRhciBmb3JtYXQgc2VsZWN0aW9uXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgY2FsZW5kYXI6IFt0aGlzLmFjdGl2ZUZvcm1hdCwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZG8gdGhlIGNvbnZlcnNpb24gd2hlbiB0aGUgdXNlciBzZWxlY3RzIGFub3RoZXIgY2FsZW5kYXIgZm9ybWF0XG4gICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvLyBwYXNzIHRoZSB0YXJnZXQgY2FsZW5kYXIgZm9ybWF0IHRvIHRoZSBjb252ZXJzaW9uIG1ldGhvZFxuICAgICAgICAgICAgdGhpcy5jb252ZXJ0RGF0ZShkYXRhLmNhbGVuZGFyKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgZGF0ZSBpbnRvIHRoZSB0YXJnZXQgZm9ybWF0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNhbGVuZGFyIHRoZSB0YXJnZXQgY2FsZW5kYXIgZm9ybWF0LlxuICAgICAqL1xuICAgIGNvbnZlcnREYXRlKGNhbGVuZGFyOiAnR3JlZ29yaWFuJyB8ICdKdWxpYW4nKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2RhdGVBZGFwdGVyIGluc3RhbmNlb2YgSkROQ29udmVydGlibGVDYWxlbmRhckRhdGVBZGFwdGVyKSB7XG5cbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdGhlIGRhdGUgaW50byB0aGUgdGFyZ2V0IGNhbGVuZGFyIGZvcm1hdFxuICAgICAgICAgICAgY29uc3QgY29udmVydGVkRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNvbnZlcnRDYWxlbmRhckZvcm1hdCh0aGlzLl9jYWxlbmRhci5hY3RpdmVEYXRlLCBjYWxlbmRhcik7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgbmV3IGRhdGVcbiAgICAgICAgICAgIHRoaXMuX2NhbGVuZGFyLmFjdGl2ZURhdGUgPSBjb252ZXJ0ZWREYXRlO1xuXG4gICAgICAgICAgICAvLyBzZWxlY3QgdGhlIG5ldyBkYXRlIGluIHRoZSBkYXRlcGlja2VyIFVJXG4gICAgICAgICAgICB0aGlzLl9kYXRlcGlja2VyQ29udGVudC5kYXRlcGlja2VyLnNlbGVjdChjb252ZXJ0ZWREYXRlKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHZpZXcgYWZ0ZXIgY2FsZW5kYXIgZm9ybWF0IGNvbnZlcnNpb25cbiAgICAgICAgICAgIHRoaXMuX2NhbGVuZGFyLnVwZGF0ZVRvZGF5c0RhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRlIGFkYXB0ZXIgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgSkROQ29udmVydGlibGVDYWxlbmRhckRhdGVBZGFwdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=