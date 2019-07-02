import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
/**
* JdnDatepickerDirective creates a wrapper element that provides a new adapter with each instance of the datepicker.
*/
var JdnDatepickerDirective = /** @class */ (function () {
    function JdnDatepickerDirective(adapter) {
        this.adapter = adapter;
    }
    JdnDatepickerDirective = tslib_1.__decorate([
        Directive({
            selector: 'kuiJdnDatepicker',
            providers: [
                { provide: DateAdapter, useClass: JDNConvertibleCalendarDateAdapter, deps: [MAT_DATE_LOCALE] }
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [DateAdapter])
    ], JdnDatepickerDirective);
    return JdnDatepickerDirective;
}());
export { JdnDatepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamRuLWRhdGVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9qZG4tZGF0ZXBpY2tlci9qZG4tZGF0ZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd0RTs7RUFFRTtBQU9GO0lBQ0ksZ0NBQW9CLE9BQTRDO1FBQTVDLFlBQU8sR0FBUCxPQUFPLENBQXFDO0lBQUksQ0FBQztJQUQ1RCxzQkFBc0I7UUFObEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxpQ0FBaUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRTthQUNqRztTQUNKLENBQUM7aURBRStCLFdBQVc7T0FEL0Isc0JBQXNCLENBRWxDO0lBQUQsNkJBQUM7Q0FBQSxBQUZELElBRUM7U0FGWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEpETkNvbnZlcnRpYmxlQ2FsZW5kYXJEYXRlQWRhcHRlciB9IGZyb20gJ2pkbmNvbnZlcnRpYmxlY2FsZW5kYXJkYXRlYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfTE9DQUxFIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBKRE5Db252ZXJ0aWJsZUNhbGVuZGFyIH0gZnJvbSAnamRuY29udmVydGlibGVjYWxlbmRhcic7XG5cbi8qKlxuKiBKZG5EYXRlcGlja2VyRGlyZWN0aXZlIGNyZWF0ZXMgYSB3cmFwcGVyIGVsZW1lbnQgdGhhdCBwcm92aWRlcyBhIG5ldyBhZGFwdGVyIHdpdGggZWFjaCBpbnN0YW5jZSBvZiB0aGUgZGF0ZXBpY2tlci5cbiovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2t1aUpkbkRhdGVwaWNrZXInLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IERhdGVBZGFwdGVyLCB1c2VDbGFzczogSkROQ29udmVydGlibGVDYWxlbmRhckRhdGVBZGFwdGVyLCBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFXSB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBKZG5EYXRlcGlja2VyRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFkYXB0ZXI6IERhdGVBZGFwdGVyPEpETkNvbnZlcnRpYmxlQ2FsZW5kYXI+KSB7IH1cbn1cbiJdfQ==