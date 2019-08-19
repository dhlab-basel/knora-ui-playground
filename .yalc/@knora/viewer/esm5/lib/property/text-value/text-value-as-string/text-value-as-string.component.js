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
    TextValueAsStringComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-text-value-as-string',
                    template: "<span [innerHTML]=\"valueObject.str\"></span>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}", ".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
                }] }
    ];
    /** @nocollapse */
    TextValueAsStringComponent.ctorParameters = function () { return []; };
    TextValueAsStringComponent.propDecorators = {
        valueObject: [{ type: Input }]
    };
    return TextValueAsStringComponent;
}());
export { TextValueAsStringComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtc3RyaW5nL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFcEQ7SUFpQ0k7UUExQkEsYUFBUSxHQUFXLG9FQUFvRSxDQUFDO0lBMkJ4RixDQUFDO0lBekJELHNCQUNJLG1EQUFXO2FBZWY7WUFHSSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNwQyxDQUFDO2FBcEJELFVBQ2dCLEtBQTRCO1lBQ3hDLHNCQUFzQjtZQUV0QixJQUFNLEdBQUcsR0FBVyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBRTlCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLElBQU0sR0FBRyxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ3BHLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO2dCQUNuQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7YUFDcEM7UUFDTCxDQUFDOzs7T0FBQTs7Z0JBdkJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQywyREFBb0Q7O2lCQUV2RDs7Ozs7OEJBS0ksS0FBSzs7SUEyQlYsaUNBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQS9CWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXRleHQtdmFsdWUtYXMtc3RyaW5nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC5zY3NzJywgJy4uLy4uLy4uL2Fzc2V0cy9zdHlsZS92aWV3ZXIuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRleHRWYWx1ZUFzU3RyaW5nQ29tcG9uZW50IHtcblxuICAgIHJlZ2V4VXJsOiBSZWdFeHAgPSAvKGh0dHB8aHR0cHN8ZnRwfGZ0cHMpXFw6XFwvXFwvW2EtekEtWjAtOVxcLVxcLl0rXFwuW2EtekEtWl17MiwzfShcXC9cXFMqKT8vO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRUZXh0VmFsdWVBc1N0cmluZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSk7XG5cbiAgICAgICAgY29uc3Qgc3RyOiBzdHJpbmcgPSB2YWx1ZS5zdHI7XG5cbiAgICAgICAgaWYgKHRoaXMucmVnZXhVcmwuZXhlYyhzdHIpKSB7XG4gICAgICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMucmVnZXhVcmwuZXhlYyhzdHIpWzBdO1xuICAgICAgICAgICAgY29uc3QgbmV3U3RyID0gc3RyLnJlcGxhY2UodGhpcy5yZWdleFVybCwgJzxhIGNsYXNzPVwia3VpLWxpbmtcIiBocmVmPVwiJyArIHVybCArICdcIj4nICsgdXJsICsgJzwvYT4nKTtcbiAgICAgICAgICAgIHZhbHVlLnN0ciA9IG5ld1N0cjtcbiAgICAgICAgICAgIHRoaXMuX3RleHRTdHJpbmdWYWx1ZU9iaiA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFN0cmluZ1ZhbHVlT2JqID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG5cblxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dFN0cmluZ1ZhbHVlT2JqO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RleHRTdHJpbmdWYWx1ZU9iajogUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgIH1cblxufVxuIl19