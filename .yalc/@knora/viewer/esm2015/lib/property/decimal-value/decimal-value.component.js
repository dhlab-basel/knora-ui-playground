import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadDecimalValue } from '@knora/core';
let DecimalValueComponent = class DecimalValueComponent {
    constructor() { }
    set valueObject(value) {
        this._decimalValueObj = value;
    }
    get valueObject() {
        return this._decimalValueObj;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadDecimalValue),
    tslib_1.__metadata("design:paramtypes", [ReadDecimalValue])
], DecimalValueComponent.prototype, "valueObject", null);
DecimalValueComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-decimal-value',
        template: "<span>{{valueObject.decimal}}</span>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], DecimalValueComponent);
export { DecimalValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2RlY2ltYWwtdmFsdWUvZGVjaW1hbC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU8vQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQWFoQyxnQkFBZ0IsQ0FBQztJQVZqQixJQUFJLFdBQVcsQ0FBQyxLQUF1QjtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0NBTUYsQ0FBQTtBQVpDO0lBREMsS0FBSyxFQUFFO3NDQUNlLGdCQUFnQjs2Q0FBaEIsZ0JBQWdCO3dEQUV0QztBQUxVLHFCQUFxQjtJQUxqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLGdEQUE2Qzs7S0FFOUMsQ0FBQzs7R0FDVyxxQkFBcUIsQ0FlakM7U0FmWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkRGVjaW1hbFZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZGVjaW1hbC12YWx1ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kZWNpbWFsLXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGVjaW1hbC12YWx1ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIERlY2ltYWxWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkRGVjaW1hbFZhbHVlKSB7XG4gICAgdGhpcy5fZGVjaW1hbFZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlY2ltYWxWYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2RlY2ltYWxWYWx1ZU9iajogUmVhZERlY2ltYWxWYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=