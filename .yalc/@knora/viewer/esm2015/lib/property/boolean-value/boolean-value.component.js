import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadBooleanValue } from '@knora/core';
let BooleanValueComponent = class BooleanValueComponent {
    constructor() { }
    set valueObject(value) {
        this._booleanValueObj = value;
    }
    get valueObject() {
        return this._booleanValueObj;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadBooleanValue),
    tslib_1.__metadata("design:paramtypes", [ReadBooleanValue])
], BooleanValueComponent.prototype, "valueObject", null);
BooleanValueComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-boolean-value',
        template: "<mat-checkbox [checked]=\"valueObject.bool\" disabled=\"true\"></mat-checkbox>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], BooleanValueComponent);
export { BooleanValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2Jvb2xlYW4tdmFsdWUvYm9vbGVhbi12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU8vQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQWFoQyxnQkFBZ0IsQ0FBQztJQVZqQixJQUFJLFdBQVcsQ0FBQyxLQUF1QjtRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0NBTUYsQ0FBQTtBQVpDO0lBREMsS0FBSyxFQUFFO3NDQUNlLGdCQUFnQjs2Q0FBaEIsZ0JBQWdCO3dEQUV0QztBQUxVLHFCQUFxQjtJQUxqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLDRGQUE2Qzs7S0FFOUMsQ0FBQzs7R0FDVyxxQkFBcUIsQ0FlakM7U0FmWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkQm9vbGVhblZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktYm9vbGVhbi12YWx1ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ib29sZWFuLXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYm9vbGVhbi12YWx1ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJvb2xlYW5WYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkQm9vbGVhblZhbHVlKSB7XG4gICAgICB0aGlzLl9ib29sZWFuVmFsdWVPYmogPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ib29sZWFuVmFsdWVPYmo7XG4gIH1cblxuICBwcml2YXRlIF9ib29sZWFuVmFsdWVPYmo6IFJlYWRCb29sZWFuVmFsdWU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIl19