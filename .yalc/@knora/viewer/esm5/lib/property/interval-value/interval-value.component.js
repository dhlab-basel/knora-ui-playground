import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadIntervalValue } from '@knora/core';
var IntervalValueComponent = /** @class */ (function () {
    function IntervalValueComponent() {
    }
    Object.defineProperty(IntervalValueComponent.prototype, "valueObject", {
        get: function () {
            return this._intervalValueObj;
        },
        set: function (value) {
            this._intervalValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadIntervalValue),
        tslib_1.__metadata("design:paramtypes", [ReadIntervalValue])
    ], IntervalValueComponent.prototype, "valueObject", null);
    IntervalValueComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-interval-value',
            template: "<span>{{valueObject.intervalStart}} - {{valueObject.intervalEnd}}</span>",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], IntervalValueComponent);
    return IntervalValueComponent;
}());
export { IntervalValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJ2YWwtdmFsdWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS9pbnRlcnZhbC12YWx1ZS9pbnRlcnZhbC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU9oRDtJQWFFO0lBQWdCLENBQUM7SUFWakIsc0JBQUksK0NBQVc7YUFJZjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hDLENBQUM7YUFORCxVQUFnQixLQUF3QjtZQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBRkQ7UUFEQyxLQUFLLEVBQUU7MENBQ2UsaUJBQWlCO2lEQUFqQixpQkFBaUI7NkRBRXZDO0lBTFUsc0JBQXNCO1FBTGxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsb0ZBQThDOztTQUUvQyxDQUFDOztPQUNXLHNCQUFzQixDQWVsQztJQUFELDZCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEludGVydmFsVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1pbnRlcnZhbC12YWx1ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbnRlcnZhbC12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ludGVydmFsLXZhbHVlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW50ZXJ2YWxWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSkge1xuICAgIHRoaXMuX2ludGVydmFsVmFsdWVPYmogPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJ2YWxWYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2ludGVydmFsVmFsdWVPYmo6IFJlYWRJbnRlcnZhbFZhbHVlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiJdfQ==