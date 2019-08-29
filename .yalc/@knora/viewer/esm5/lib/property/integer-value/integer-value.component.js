import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadIntegerValue } from '@knora/core';
var IntegerValueComponent = /** @class */ (function () {
    function IntegerValueComponent() {
    }
    Object.defineProperty(IntegerValueComponent.prototype, "valueObject", {
        get: function () {
            return this._integerValueObj;
        },
        set: function (value) {
            this._integerValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadIntegerValue),
        tslib_1.__metadata("design:paramtypes", [ReadIntegerValue])
    ], IntegerValueComponent.prototype, "valueObject", null);
    IntegerValueComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-integer-value',
            template: "<span>{{valueObject.integer}}</span>",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], IntegerValueComponent);
    return IntegerValueComponent;
}());
export { IntegerValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlci12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2ludGVnZXItdmFsdWUvaW50ZWdlci12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU8vQztJQWFJO0lBQ0EsQ0FBQztJQVhELHNCQUFJLDhDQUFXO2FBSWY7WUFDSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDO2FBTkQsVUFBZ0IsS0FBdUI7WUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUZEO1FBREMsS0FBSyxFQUFFOzBDQUNlLGdCQUFnQjtpREFBaEIsZ0JBQWdCOzREQUV0QztJQUxRLHFCQUFxQjtRQUxqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLGdEQUE2Qzs7U0FFaEQsQ0FBQzs7T0FDVyxxQkFBcUIsQ0FnQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWhCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkSW50ZWdlclZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1pbnRlZ2VyLXZhbHVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW50ZWdlci12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW50ZWdlci12YWx1ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEludGVnZXJWYWx1ZUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZEludGVnZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLl9pbnRlZ2VyVmFsdWVPYmogPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlZ2VyVmFsdWVPYmo7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW50ZWdlclZhbHVlT2JqOiBSZWFkSW50ZWdlclZhbHVlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG59XG4iXX0=