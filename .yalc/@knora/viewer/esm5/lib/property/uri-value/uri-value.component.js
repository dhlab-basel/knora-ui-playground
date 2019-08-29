import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadUriValue } from '@knora/core';
var UriValueComponent = /** @class */ (function () {
    function UriValueComponent() {
    }
    Object.defineProperty(UriValueComponent.prototype, "valueObject", {
        get: function () {
            return this.__uriValueObj;
        },
        set: function (value) {
            this.__uriValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    UriValueComponent.prototype.ngOnChanges = function () {
        if (this.label === undefined) {
            this.displayString = this.__uriValueObj.uri;
        }
        else {
            this.displayString = this.label;
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadUriValue),
        tslib_1.__metadata("design:paramtypes", [ReadUriValue])
    ], UriValueComponent.prototype, "valueObject", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], UriValueComponent.prototype, "label", void 0);
    UriValueComponent = tslib_1.__decorate([
        Component({
            selector: '   kui-uri-value',
            template: "<a href=\"{{valueObject.uri}}\" target=\"_blank\" class=\"kui-link\">{{displayString}}</a>\n",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], UriValueComponent);
    return UriValueComponent;
}());
export { UriValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpLXZhbHVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvcHJvcGVydHkvdXJpLXZhbHVlL3VyaS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFRM0M7SUFhRTtJQUFnQixDQUFDO0lBVmpCLHNCQUFJLDBDQUFXO2FBSWY7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzthQU5ELFVBQWdCLEtBQW1CO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTdCLENBQUM7OztPQUFBO0lBU0QsdUNBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztTQUMvQzthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQWxCRDtRQURDLEtBQUssRUFBRTswQ0FDZSxZQUFZO2lEQUFaLFlBQVk7d0RBR2xDO0lBSVE7UUFBUixLQUFLLEVBQUU7O29EQUFnQjtJQVZiLGlCQUFpQjtRQUw3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLHdHQUF5Qzs7U0FFMUMsQ0FBQzs7T0FDVyxpQkFBaUIsQ0F1QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRVcmlWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAndXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJyAgIGt1aS11cmktdmFsdWUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdXJpLXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXJpLXZhbHVlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVXJpVmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZFVyaVZhbHVlKSB7XG4gICAgdGhpcy5fX3VyaVZhbHVlT2JqID0gdmFsdWU7XG5cbiAgfVxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX191cmlWYWx1ZU9iajtcbiAgfVxuICBASW5wdXQoKSBsYWJlbD86IHN0cmluZztcbiAgcHJpdmF0ZSBfX3VyaVZhbHVlT2JqOiBSZWFkVXJpVmFsdWU7XG4gIHB1YmxpYyBkaXNwbGF5U3RyaW5nOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICBpZiAodGhpcy5sYWJlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nID0gdGhpcy5fX3VyaVZhbHVlT2JqLnVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5U3RyaW5nID0gdGhpcy5sYWJlbDtcbiAgICAgIH1cbiAgfVxuXG59XG4iXX0=