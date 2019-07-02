import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadBooleanValue } from '@knora/core';
var BooleanValueComponent = /** @class */ (function () {
    function BooleanValueComponent() {
    }
    Object.defineProperty(BooleanValueComponent.prototype, "valueObject", {
        get: function () {
            return this._booleanValueObj;
        },
        set: function (value) {
            this._booleanValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadBooleanValue),
        tslib_1.__metadata("design:paramtypes", [ReadBooleanValue])
    ], BooleanValueComponent.prototype, "valueObject", null);
    BooleanValueComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-boolean-value',
            template: "<mat-checkbox [checked]=\"valueObject.bool\" disabled=\"true\"></mat-checkbox>\n",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], BooleanValueComponent);
    return BooleanValueComponent;
}());
export { BooleanValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhbi12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2Jvb2xlYW4tdmFsdWUvYm9vbGVhbi12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU8vQztJQWFFO0lBQWdCLENBQUM7SUFWakIsc0JBQUksOENBQVc7YUFJZjtZQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7YUFORCxVQUFnQixLQUF1QjtZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRkQ7UUFEQyxLQUFLLEVBQUU7MENBQ2UsZ0JBQWdCO2lEQUFoQixnQkFBZ0I7NERBRXRDO0lBTFUscUJBQXFCO1FBTGpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsNEZBQTZDOztTQUU5QyxDQUFDOztPQUNXLHFCQUFxQixDQWVqQztJQUFELDRCQUFDO0NBQUEsQUFmRCxJQWVDO1NBZlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEJvb2xlYW5WYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWJvb2xlYW4tdmFsdWUnLFxuICB0ZW1wbGF0ZVVybDogJy4vYm9vbGVhbi12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Jvb2xlYW4tdmFsdWUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCb29sZWFuVmFsdWVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZEJvb2xlYW5WYWx1ZSkge1xuICAgICAgdGhpcy5fYm9vbGVhblZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYm9vbGVhblZhbHVlT2JqO1xuICB9XG5cbiAgcHJpdmF0ZSBfYm9vbGVhblZhbHVlT2JqOiBSZWFkQm9vbGVhblZhbHVlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiJdfQ==