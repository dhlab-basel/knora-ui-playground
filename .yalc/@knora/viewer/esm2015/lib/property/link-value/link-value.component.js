import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OntologyInformation, ReadLinkValue } from '@knora/core';
let LinkValueComponent = class LinkValueComponent {
    constructor() {
        this.referredResourceClicked = new EventEmitter();
    }
    set ontologyInfo(value) {
        this._ontoInfo = value;
    }
    get ontologyInfo() {
        return this._ontoInfo;
    }
    set valueObject(value) {
        this._linkValueObj = value;
        if (this.valueObject.referredResource !== undefined) {
            this.referredResource = this.valueObject.referredResource.label;
        }
        else {
            this.referredResource = this.valueObject.referredResourceIri;
        }
    }
    get valueObject() {
        return this._linkValueObj;
    }
    refResClicked() {
        this.referredResourceClicked.emit(this._linkValueObj);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", OntologyInformation),
    tslib_1.__metadata("design:paramtypes", [OntologyInformation])
], LinkValueComponent.prototype, "ontologyInfo", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadLinkValue),
    tslib_1.__metadata("design:paramtypes", [ReadLinkValue])
], LinkValueComponent.prototype, "valueObject", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], LinkValueComponent.prototype, "referredResourceClicked", void 0);
LinkValueComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-link-value',
        template: "<a class=\"kui-link\" (click)=\"refResClicked()\">{{referredResource}}</a>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], LinkValueComponent);
export { LinkValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2xpbmstdmFsdWUvbGluay12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU9qRSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQWlDM0I7UUFOQSw0QkFBdUIsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU0xRCxDQUFDO0lBOUJqQixJQUFJLFlBQVksQ0FBQyxLQUEwQjtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFHRCxJQUFJLFdBQVcsQ0FBQyxLQUFvQjtRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUzQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxFQUFFO1lBQ2pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztTQUNuRTthQUFNO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFXRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNKLENBQUE7QUFuQ0c7SUFEQyxLQUFLLEVBQUU7c0NBQ2dCLG1CQUFtQjs2Q0FBbkIsbUJBQW1CO3NEQUUxQztBQU9EO0lBREMsS0FBSyxFQUFFO3NDQUNlLGFBQWE7NkNBQWIsYUFBYTtxREFRbkM7QUFPRDtJQURDLE1BQU0sRUFBRTtzQ0FDZ0IsWUFBWTttRUFBcUM7QUEzQmpFLGtCQUFrQjtJQUw5QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLHdGQUEwQzs7S0FFN0MsQ0FBQzs7R0FDVyxrQkFBa0IsQ0FzQzlCO1NBdENZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24sIFJlYWRMaW5rVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWxpbmstdmFsdWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saW5rLXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saW5rLXZhbHVlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlua1ZhbHVlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG9udG9sb2d5SW5mbyh2YWx1ZTogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICB0aGlzLl9vbnRvSW5mbyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBvbnRvbG9neUluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvSW5mbztcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZExpbmtWYWx1ZSkge1xuICAgICAgICB0aGlzLl9saW5rVmFsdWVPYmogPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZU9iamVjdC5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVmZXJyZWRSZXNvdXJjZSA9IHRoaXMudmFsdWVPYmplY3QucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmZXJyZWRSZXNvdXJjZSA9IHRoaXMudmFsdWVPYmplY3QucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmtWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWZlcnJlZFJlc291cmNlQ2xpY2tlZDogRXZlbnRFbWl0dGVyPFJlYWRMaW5rVmFsdWU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBfbGlua1ZhbHVlT2JqOiBSZWFkTGlua1ZhbHVlO1xuICAgIHByaXZhdGUgX29udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIHJlZmVycmVkUmVzb3VyY2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICByZWZSZXNDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnJlZmVycmVkUmVzb3VyY2VDbGlja2VkLmVtaXQodGhpcy5fbGlua1ZhbHVlT2JqKTtcbiAgICB9XG59XG4iXX0=