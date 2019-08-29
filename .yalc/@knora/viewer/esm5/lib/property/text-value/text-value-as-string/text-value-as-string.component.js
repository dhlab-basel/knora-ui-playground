import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadTextValueAsString } from '@knora/core';
var TextValueAsStringComponent = /** @class */ (function () {
    function TextValueAsStringComponent() {
        this.regexUrl = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
    }
    Object.defineProperty(TextValueAsStringComponent.prototype, "valueObject", {
        get: function () {
            return this._textStringValueObj;
        },
        set: function (value) {
            // console.log(value);
            var str = value.str;
            if (this.regexUrl.exec(str)) {
                var url = this.regexUrl.exec(str)[0];
                var newStr = str.replace(this.regexUrl, '<a class="kui-link" href="' + url + '">' + url + '</a>');
                value.str = newStr;
                this._textStringValueObj = value;
            }
            else {
                this._textStringValueObj = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadTextValueAsString),
        tslib_1.__metadata("design:paramtypes", [ReadTextValueAsString])
    ], TextValueAsStringComponent.prototype, "valueObject", null);
    TextValueAsStringComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-text-value-as-string',
            template: "<span [innerHTML]=\"valueObject.str\"></span>\n",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TextValueAsStringComponent);
    return TextValueAsStringComponent;
}());
export { TextValueAsStringComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtc3RyaW5nL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT3BEO0lBNEJJO1FBMUJBLGFBQVEsR0FBVyxvRUFBb0UsQ0FBQztJQTJCeEYsQ0FBQztJQXhCRCxzQkFBSSxtREFBVzthQWVmO1lBR0ksT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEMsQ0FBQzthQW5CRCxVQUFnQixLQUE0QjtZQUN4QyxzQkFBc0I7WUFFdEIsSUFBTSxHQUFHLEdBQVcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUU5QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixJQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLDRCQUE0QixHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztnQkFDbkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzthQUNwQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2FBQ3BDO1FBQ0wsQ0FBQzs7O09BQUE7SUFiRDtRQURDLEtBQUssRUFBRTswQ0FDZSxxQkFBcUI7aURBQXJCLHFCQUFxQjtpRUFhM0M7SUFsQlEsMEJBQTBCO1FBTHRDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsMkRBQW9EOztTQUV2RCxDQUFDOztPQUNXLDBCQUEwQixDQStCdEM7SUFBRCxpQ0FBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRUZXh0VmFsdWVBc1N0cmluZyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktdGV4dC12YWx1ZS1hcy1zdHJpbmcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZXh0LXZhbHVlLWFzLXN0cmluZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0VmFsdWVBc1N0cmluZ0NvbXBvbmVudCB7XG5cbiAgICByZWdleFVybDogUmVnRXhwID0gLyhodHRwfGh0dHBzfGZ0cHxmdHBzKVxcOlxcL1xcL1thLXpBLVowLTlcXC1cXC5dK1xcLlthLXpBLVpdezIsM30oXFwvXFxTKik/LztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkVGV4dFZhbHVlQXNTdHJpbmcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IHN0cjogc3RyaW5nID0gdmFsdWUuc3RyO1xuXG4gICAgICAgIGlmICh0aGlzLnJlZ2V4VXJsLmV4ZWMoc3RyKSkge1xuICAgICAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLnJlZ2V4VXJsLmV4ZWMoc3RyKVswXTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0ciA9IHN0ci5yZXBsYWNlKHRoaXMucmVnZXhVcmwsICc8YSBjbGFzcz1cImt1aS1saW5rXCIgaHJlZj1cIicgKyB1cmwgKyAnXCI+JyArIHVybCArICc8L2E+Jyk7XG4gICAgICAgICAgICB2YWx1ZS5zdHIgPSBuZXdTdHI7XG4gICAgICAgICAgICB0aGlzLl90ZXh0U3RyaW5nVmFsdWVPYmogPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRTdHJpbmdWYWx1ZU9iaiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHRTdHJpbmdWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90ZXh0U3RyaW5nVmFsdWVPYmo6IFJlYWRUZXh0VmFsdWVBc1N0cmluZztcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICB9XG5cbn1cbiJdfQ==