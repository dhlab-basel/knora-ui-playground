import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadTextValueAsString } from '@knora/core';
let TextValueAsStringComponent = class TextValueAsStringComponent {
    constructor() {
    }
    set valueObject(value) {
        this._textStringValueObj = value;
    }
    get valueObject() {
        return this._textStringValueObj;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadTextValueAsString),
    tslib_1.__metadata("design:paramtypes", [ReadTextValueAsString])
], TextValueAsStringComponent.prototype, "valueObject", null);
TextValueAsStringComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-text-value-as-string',
        template: "<span>{{valueObject.str}}</span>\n",
        styles: [""]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TextValueAsStringComponent);
export { TextValueAsStringComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtc3RyaW5nL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT3BELElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBYW5DO0lBQ0EsQ0FBQztJQVhELElBQUksV0FBVyxDQUFDLEtBQTRCO1FBQ3hDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3BDLENBQUM7Q0FPSixDQUFBO0FBYkc7SUFEQyxLQUFLLEVBQUU7c0NBQ2UscUJBQXFCOzZDQUFyQixxQkFBcUI7NkRBRTNDO0FBTFEsMEJBQTBCO0lBTHRDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsOENBQW9EOztLQUV2RCxDQUFDOztHQUNXLDBCQUEwQixDQWdCdEM7U0FoQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS10ZXh0LXZhbHVlLWFzLXN0cmluZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90ZXh0LXZhbHVlLWFzLXN0cmluZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRleHRWYWx1ZUFzU3RyaW5nQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkVGV4dFZhbHVlQXNTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGV4dFN0cmluZ1ZhbHVlT2JqID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dFN0cmluZ1ZhbHVlT2JqO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RleHRTdHJpbmdWYWx1ZU9iajogUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG59XG4iXX0=