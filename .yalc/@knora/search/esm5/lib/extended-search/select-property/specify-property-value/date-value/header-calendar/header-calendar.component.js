import { Component, Host, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { DateAdapter, MatCalendar, MatDatepickerContent } from '@angular/material';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
/** Custom header component containing a calendar format switcher */
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_calendar, _dateAdapter, _datepickerContent, fb) {
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._datepickerContent = _datepickerContent;
        this.fb = fb;
        // a list of supported calendar formats (Gregorian and Julian)
        this.supportedCalendarFormats = JDNConvertibleCalendar.supportedCalendars;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.form.valueChanges.subscribe(function (data) {
            // pass the target calendar format to the conversion method
            _this.convertDate(data.calendar);
        });
    };
    /**
     * Converts the date into the target format.
     *
     * @param calendar the target calendar format.
     */
    HeaderComponent.prototype.convertDate = function (calendar) {
        if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
            // convert the date into the target calendar format
            var convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);
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
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-calendar-header',
                    template: "\n      <mat-select placeholder=\"Calendar Format\" class=\"kui-calendar-header\" [formControl]=\"form.controls['calendar']\">\n        <mat-option *ngFor=\"let cal of supportedCalendarFormats\" [value]=\"cal\">{{cal}}</mat-option>\n      </mat-select>\n      <mat-calendar-header></mat-calendar-header>\n    ",
                    styles: [".mat-select.kui-calendar-header{margin:12px!important;width:calc(100% - 24px)!important}"]
                }] }
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: MatCalendar, decorators: [{ type: Host }] },
        { type: DateAdapter },
        { type: MatDatepickerContent },
        { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2RhdGUtdmFsdWUvaGVhZGVyLWNhbGVuZGFyL2hlYWRlci1jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxJQUFJLEVBQUUsTUFBTSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsV0FBVyxFQUFhLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBFLE9BQU8sRUFBeUIsc0JBQXNCLEVBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsV0FBVyxFQUFtQixXQUFXLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV0RixvRUFBb0U7QUFDcEU7SUFXSSx5QkFBNkIsU0FBOEMsRUFDL0QsWUFBaUQsRUFDakQsa0JBQWdFLEVBQzNDLEVBQWU7UUFIbkIsY0FBUyxHQUFULFNBQVMsQ0FBcUM7UUFDL0QsaUJBQVksR0FBWixZQUFZLENBQXFDO1FBQ2pELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBOEM7UUFDM0MsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUtoRCw4REFBOEQ7UUFDOUQsNkJBQXdCLEdBQUcsc0JBQXNCLENBQUMsa0JBQWtCLENBQUM7SUFMckUsQ0FBQztJQVVELGtDQUFRLEdBQVI7UUFBQSxpQkFvQkM7UUFsQkcsaUVBQWlFO1FBQ2pFLElBQUksSUFBSSxDQUFDLFlBQVksWUFBWSxpQ0FBaUMsRUFBRTtZQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUM7U0FDOUQ7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsaUZBQWlGLENBQUMsQ0FBQztTQUNsRztRQUVELGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3RCLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUNyRCxDQUFDLENBQUM7UUFFSCxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNsQywyREFBMkQ7WUFDM0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHFDQUFXLEdBQVgsVUFBWSxRQUFnQztRQUV4QyxJQUFJLElBQUksQ0FBQyxZQUFZLFlBQVksaUNBQWlDLEVBQUU7WUFFaEUsbURBQW1EO1lBQ25ELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbkcsbUJBQW1CO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQztZQUUxQywyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekQsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNyQzthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ2xHO0lBQ0wsQ0FBQzs7Z0JBdEVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsdVRBS1Q7O2lCQUVKOzs7O2dCQWJzQyxXQUFXLHVCQWVoQyxJQUFJO2dCQWZiLFdBQVc7Z0JBQWdDLG9CQUFvQjtnQkFIL0QsV0FBVyx1QkFxQlgsTUFBTSxTQUFDLFdBQVc7O0lBeUQzQixzQkFBQztDQUFBLEFBdkVELElBdUVDO1NBN0RZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSG9zdCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgUHJvcGVydHlWYWx1ZSwgVmFsdWUsIFZhbHVlTGl0ZXJhbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IEdyZWdvcmlhbkNhbGVuZGFyRGF0ZSwgSkROQ29udmVydGlibGVDYWxlbmRhciwgSkROUGVyaW9kIH0gZnJvbSAnamRuY29udmVydGlibGVjYWxlbmRhcic7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfTE9DQUxFLCBNYXRDYWxlbmRhciwgTWF0RGF0ZXBpY2tlckNvbnRlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyRGF0ZUFkYXB0ZXIgfSBmcm9tICdqZG5jb252ZXJ0aWJsZWNhbGVuZGFyZGF0ZWFkYXB0ZXInO1xuXG4vKiogQ3VzdG9tIGhlYWRlciBjb21wb25lbnQgY29udGFpbmluZyBhIGNhbGVuZGFyIGZvcm1hdCBzd2l0Y2hlciAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktY2FsZW5kYXItaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgPG1hdC1zZWxlY3QgcGxhY2Vob2xkZXI9XCJDYWxlbmRhciBGb3JtYXRcIiBjbGFzcz1cImt1aS1jYWxlbmRhci1oZWFkZXJcIiBbZm9ybUNvbnRyb2xdPVwiZm9ybS5jb250cm9sc1snY2FsZW5kYXInXVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY2FsIG9mIHN1cHBvcnRlZENhbGVuZGFyRm9ybWF0c1wiIFt2YWx1ZV09XCJjYWxcIj57e2NhbH19PC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgPG1hdC1jYWxlbmRhci1oZWFkZXI+PC9tYXQtY2FsZW5kYXItaGVhZGVyPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLWNhbGVuZGFyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50PEQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBjb25zdHJ1Y3RvciAoQEhvc3QoKSBwcml2YXRlIF9jYWxlbmRhcjogTWF0Q2FsZW5kYXI8SkROQ29udmVydGlibGVDYWxlbmRhcj4sXG4gICAgICAgIHByaXZhdGUgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxKRE5Db252ZXJ0aWJsZUNhbGVuZGFyPixcbiAgICAgICAgcHJpdmF0ZSBfZGF0ZXBpY2tlckNvbnRlbnQ6IE1hdERhdGVwaWNrZXJDb250ZW50PEpETkNvbnZlcnRpYmxlQ2FsZW5kYXI+LFxuICAgICAgICBASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIC8vIGEgbGlzdCBvZiBzdXBwb3J0ZWQgY2FsZW5kYXIgZm9ybWF0cyAoR3JlZ29yaWFuIGFuZCBKdWxpYW4pXG4gICAgc3VwcG9ydGVkQ2FsZW5kYXJGb3JtYXRzID0gSkROQ29udmVydGlibGVDYWxlbmRhci5zdXBwb3J0ZWRDYWxlbmRhcnM7XG5cbiAgICAvLyB0aGUgY3VycmVudGx5IGFjdGl2ZSBjYWxlbmRhciBmb3JtYXRcbiAgICBhY3RpdmVGb3JtYXQ7XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnRseSBhY3RpdmUgY2FsZW5kYXIgZm9ybWF0IGZyb20gdGhlIGRhdGUgYWRhcHRlclxuICAgICAgICBpZiAodGhpcy5fZGF0ZUFkYXB0ZXIgaW5zdGFuY2VvZiBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyRGF0ZUFkYXB0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9ybWF0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWN0aXZlQ2FsZW5kYXJGb3JtYXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0ZSBhZGFwdGVyIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGluc3RhbmNlIG9mIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYnVpbGQgYSBmb3JtIGZvciB0aGUgY2FsZW5kYXIgZm9ybWF0IHNlbGVjdGlvblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGNhbGVuZGFyOiBbdGhpcy5hY3RpdmVGb3JtYXQsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRvIHRoZSBjb252ZXJzaW9uIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbm90aGVyIGNhbGVuZGFyIGZvcm1hdFxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gcGFzcyB0aGUgdGFyZ2V0IGNhbGVuZGFyIGZvcm1hdCB0byB0aGUgY29udmVyc2lvbiBtZXRob2RcbiAgICAgICAgICAgIHRoaXMuY29udmVydERhdGUoZGF0YS5jYWxlbmRhcik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIGRhdGUgaW50byB0aGUgdGFyZ2V0IGZvcm1hdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxlbmRhciB0aGUgdGFyZ2V0IGNhbGVuZGFyIGZvcm1hdC5cbiAgICAgKi9cbiAgICBjb252ZXJ0RGF0ZShjYWxlbmRhcjogJ0dyZWdvcmlhbicgfCAnSnVsaWFuJykge1xuXG4gICAgICAgIGlmICh0aGlzLl9kYXRlQWRhcHRlciBpbnN0YW5jZW9mIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlcikge1xuXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBkYXRlIGludG8gdGhlIHRhcmdldCBjYWxlbmRhciBmb3JtYXRcbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZERhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jb252ZXJ0Q2FsZW5kYXJGb3JtYXQodGhpcy5fY2FsZW5kYXIuYWN0aXZlRGF0ZSwgY2FsZW5kYXIpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIG5ldyBkYXRlXG4gICAgICAgICAgICB0aGlzLl9jYWxlbmRhci5hY3RpdmVEYXRlID0gY29udmVydGVkRGF0ZTtcblxuICAgICAgICAgICAgLy8gc2VsZWN0IHRoZSBuZXcgZGF0ZSBpbiB0aGUgZGF0ZXBpY2tlciBVSVxuICAgICAgICAgICAgdGhpcy5fZGF0ZXBpY2tlckNvbnRlbnQuZGF0ZXBpY2tlci5zZWxlY3QoY29udmVydGVkRGF0ZSk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB2aWV3IGFmdGVyIGNhbGVuZGFyIGZvcm1hdCBjb252ZXJzaW9uXG4gICAgICAgICAgICB0aGlzLl9jYWxlbmRhci51cGRhdGVUb2RheXNEYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0ZSBhZGFwdGVyIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGluc3RhbmNlIG9mIEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlcicpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19