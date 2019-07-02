import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadIntegerValue } from '@knora/core';
let IntegerValueComponent = class IntegerValueComponent {
    constructor() {
    }
    set valueObject(value) {
        this._integerValueObj = value;
    }
    get valueObject() {
        return this._integerValueObj;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadIntegerValue),
    tslib_1.__metadata("design:paramtypes", [ReadIntegerValue])
], IntegerValueComponent.prototype, "valueObject", null);
IntegerValueComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-integer-value',
        template: "<span>{{valueObject.integer}}</span>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], IntegerValueComponent);
export { IntegerValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlci12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2ludGVnZXItdmFsdWUvaW50ZWdlci12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU8vQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQWE5QjtJQUNBLENBQUM7SUFYRCxJQUFJLFdBQVcsQ0FBQyxLQUF1QjtRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0NBT0osQ0FBQTtBQWJHO0lBREMsS0FBSyxFQUFFO3NDQUNlLGdCQUFnQjs2Q0FBaEIsZ0JBQWdCO3dEQUV0QztBQUxRLHFCQUFxQjtJQUxqQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLGdEQUE2Qzs7S0FFaEQsQ0FBQzs7R0FDVyxxQkFBcUIsQ0FnQmpDO1NBaEJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRJbnRlZ2VyVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWludGVnZXItdmFsdWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbnRlZ2VyLXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pbnRlZ2VyLXZhbHVlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW50ZWdlclZhbHVlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkSW50ZWdlclZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2ludGVnZXJWYWx1ZU9iaiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVnZXJWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbnRlZ2VyVmFsdWVPYmo6IFJlYWRJbnRlZ2VyVmFsdWU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbn1cbiJdfQ==