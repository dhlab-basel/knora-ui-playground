import * as tslib_1 from "tslib";
import { Component, Host, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatDatepickerContent } from '@angular/material/datepicker';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
/** Custom header component containing a calendar format switcher */
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_calendar, _dateAdapter, _datepickerContent, fb) {
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._datepickerContent = _datepickerContent;
        this.fb = fb;
        // a list of supported calendar formats (Gregorian and Julian)
        this.supportedCalendarFormats = ['Gregorian', 'Julian'];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get the currently active calendar format from the date adapter
        if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
            this.activeFormat = this._dateAdapter.activeCalendar;
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
            var convertedDate = this._dateAdapter.convertCalendar(this._calendar.activeDate, calendar);
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
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-calendar-header',
            template: "\n      <mat-select placeholder=\"Calendar Format\" class=\"kui-calendar-header\" [formControl]=\"form.controls['calendar']\">\n        <mat-option *ngFor=\"let cal of supportedCalendarFormats\" [value]=\"cal\">{{cal}}</mat-option>\n      </mat-select>\n      <mat-calendar-header></mat-calendar-header>\n    ",
            styles: [":host .mat-select.kui-calendar-header{margin:16px 16px 0!important;width:calc(100% - 32px)!important}"]
        }),
        tslib_1.__param(0, Host()),
        tslib_1.__param(3, Inject(FormBuilder)),
        tslib_1.__metadata("design:paramtypes", [MatCalendar,
            DateAdapter,
            MatDatepickerContent,
            FormBuilder])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2RhdGUtdmFsdWUvaGVhZGVyLWNhbGVuZGFyL2hlYWRlci1jYWxlbmRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsSUFBSSxFQUFFLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwRSxPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV0RixvRUFBb0U7QUFXcEU7SUFDSSx5QkFBNkIsU0FBOEMsRUFDL0QsWUFBaUQsRUFDakQsa0JBQWdFLEVBQzNDLEVBQWU7UUFIbkIsY0FBUyxHQUFULFNBQVMsQ0FBcUM7UUFDL0QsaUJBQVksR0FBWixZQUFZLENBQXFDO1FBQ2pELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBOEM7UUFDM0MsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUtoRCw4REFBOEQ7UUFDOUQsNkJBQXdCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFMbkQsQ0FBQztJQVVELGtDQUFRLEdBQVI7UUFBQSxpQkFvQkM7UUFsQkcsaUVBQWlFO1FBQ2pFLElBQUksSUFBSSxDQUFDLFlBQVksWUFBWSxpQ0FBaUMsRUFBRTtZQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1NBQ3hEO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlGQUFpRixDQUFDLENBQUM7U0FDbEc7UUFFRCxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN0QixRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDckQsQ0FBQyxDQUFDO1FBRUgsa0VBQWtFO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDbEMsMkRBQTJEO1lBQzNELEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxxQ0FBVyxHQUFYLFVBQVksUUFBZ0M7UUFFeEMsSUFBSSxJQUFJLENBQUMsWUFBWSxZQUFZLGlDQUFpQyxFQUFFO1lBRWhFLG1EQUFtRDtZQUNuRCxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUU3RixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO1lBRTFDLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV6RCwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3JDO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlGQUFpRixDQUFDLENBQUM7U0FDbEc7SUFDTCxDQUFDO0lBNURRLGVBQWU7UUFWM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsdVRBS1Q7O1NBRUosQ0FBQztRQUVnQixtQkFBQSxJQUFJLEVBQUUsQ0FBQTtRQUdmLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtpREFIZ0IsV0FBVztZQUN6QixXQUFXO1lBQ0wsb0JBQW9CO1lBQ2YsV0FBVztPQUp2QyxlQUFlLENBNkQzQjtJQUFELHNCQUFDO0NBQUEsQUE3REQsSUE2REM7U0E3RFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBIb3N0LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBQcm9wZXJ0eVZhbHVlLCBWYWx1ZSwgVmFsdWVMaXRlcmFsIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgR3JlZ29yaWFuQ2FsZW5kYXJEYXRlLCBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyLCBKRE5QZXJpb2QgfSBmcm9tICdqZG5jb252ZXJ0aWJsZWNhbGVuZGFyJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdENhbGVuZGFyLCBNYXREYXRlcGlja2VyQ29udGVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgSkROQ29udmVydGlibGVDYWxlbmRhckRhdGVBZGFwdGVyIH0gZnJvbSAnamRuY29udmVydGlibGVjYWxlbmRhcmRhdGVhZGFwdGVyJztcblxuLyoqIEN1c3RvbSBoZWFkZXIgY29tcG9uZW50IGNvbnRhaW5pbmcgYSBjYWxlbmRhciBmb3JtYXQgc3dpdGNoZXIgKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWNhbGVuZGFyLWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgIDxtYXQtc2VsZWN0IHBsYWNlaG9sZGVyPVwiQ2FsZW5kYXIgRm9ybWF0XCIgY2xhc3M9XCJrdWktY2FsZW5kYXItaGVhZGVyXCIgW2Zvcm1Db250cm9sXT1cImZvcm0uY29udHJvbHNbJ2NhbGVuZGFyJ11cIj5cbiAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGNhbCBvZiBzdXBwb3J0ZWRDYWxlbmRhckZvcm1hdHNcIiBbdmFsdWVdPVwiY2FsXCI+e3tjYWx9fTwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDxtYXQtY2FsZW5kYXItaGVhZGVyPjwvbWF0LWNhbGVuZGFyLWhlYWRlcj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL2hlYWRlci1jYWxlbmRhci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudDxEPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IgKEBIb3N0KCkgcHJpdmF0ZSBfY2FsZW5kYXI6IE1hdENhbGVuZGFyPEpETkNvbnZlcnRpYmxlQ2FsZW5kYXI+LFxuICAgICAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8SkROQ29udmVydGlibGVDYWxlbmRhcj4sXG4gICAgICAgIHByaXZhdGUgX2RhdGVwaWNrZXJDb250ZW50OiBNYXREYXRlcGlja2VyQ29udGVudDxKRE5Db252ZXJ0aWJsZUNhbGVuZGFyPixcbiAgICAgICAgQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvLyBhIGxpc3Qgb2Ygc3VwcG9ydGVkIGNhbGVuZGFyIGZvcm1hdHMgKEdyZWdvcmlhbiBhbmQgSnVsaWFuKVxuICAgIHN1cHBvcnRlZENhbGVuZGFyRm9ybWF0cyA9IFsnR3JlZ29yaWFuJywgJ0p1bGlhbiddO1xuXG4gICAgLy8gdGhlIGN1cnJlbnRseSBhY3RpdmUgY2FsZW5kYXIgZm9ybWF0XG4gICAgYWN0aXZlRm9ybWF0O1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50bHkgYWN0aXZlIGNhbGVuZGFyIGZvcm1hdCBmcm9tIHRoZSBkYXRlIGFkYXB0ZXJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGVBZGFwdGVyIGluc3RhbmNlb2YgSkROQ29udmVydGlibGVDYWxlbmRhckRhdGVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZvcm1hdCA9IHRoaXMuX2RhdGVBZGFwdGVyLmFjdGl2ZUNhbGVuZGFyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGUgYWRhcHRlciBpcyBleHBlY3RlZCB0byBiZSBhbiBpbnN0YW5jZSBvZiBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJ1aWxkIGEgZm9ybSBmb3IgdGhlIGNhbGVuZGFyIGZvcm1hdCBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBjYWxlbmRhcjogW3RoaXMuYWN0aXZlRm9ybWF0LCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBkbyB0aGUgY29udmVyc2lvbiB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYW5vdGhlciBjYWxlbmRhciBmb3JtYXRcbiAgICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIC8vIHBhc3MgdGhlIHRhcmdldCBjYWxlbmRhciBmb3JtYXQgdG8gdGhlIGNvbnZlcnNpb24gbWV0aG9kXG4gICAgICAgICAgICB0aGlzLmNvbnZlcnREYXRlKGRhdGEuY2FsZW5kYXIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBkYXRlIGludG8gdGhlIHRhcmdldCBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2FsZW5kYXIgdGhlIHRhcmdldCBjYWxlbmRhciBmb3JtYXQuXG4gICAgICovXG4gICAgY29udmVydERhdGUoY2FsZW5kYXI6ICdHcmVnb3JpYW4nIHwgJ0p1bGlhbicpIHtcblxuICAgICAgICBpZiAodGhpcy5fZGF0ZUFkYXB0ZXIgaW5zdGFuY2VvZiBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyRGF0ZUFkYXB0ZXIpIHtcblxuICAgICAgICAgICAgLy8gY29udmVydCB0aGUgZGF0ZSBpbnRvIHRoZSB0YXJnZXQgY2FsZW5kYXIgZm9ybWF0XG4gICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWREYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY29udmVydENhbGVuZGFyKHRoaXMuX2NhbGVuZGFyLmFjdGl2ZURhdGUsIGNhbGVuZGFyKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXcgZGF0ZVxuICAgICAgICAgICAgdGhpcy5fY2FsZW5kYXIuYWN0aXZlRGF0ZSA9IGNvbnZlcnRlZERhdGU7XG5cbiAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgbmV3IGRhdGUgaW4gdGhlIGRhdGVwaWNrZXIgVUlcbiAgICAgICAgICAgIHRoaXMuX2RhdGVwaWNrZXJDb250ZW50LmRhdGVwaWNrZXIuc2VsZWN0KGNvbnZlcnRlZERhdGUpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdmlldyBhZnRlciBjYWxlbmRhciBmb3JtYXQgY29udmVyc2lvblxuICAgICAgICAgICAgdGhpcy5fY2FsZW5kYXIudXBkYXRlVG9kYXlzRGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGUgYWRhcHRlciBpcyBleHBlY3RlZCB0byBiZSBhbiBpbnN0YW5jZSBvZiBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyRGF0ZUFkYXB0ZXInKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==