import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadTextValueAsString } from '@knora/core';
let TextValueAsStringComponent = class TextValueAsStringComponent {
    constructor() {
        this.regexUrl = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
    }
    set valueObject(value) {
        // console.log(value);
        const str = value.str;
        if (this.regexUrl.exec(str)) {
            const url = this.regexUrl.exec(str)[0];
            const newStr = str.replace(this.regexUrl, '<a class="kui-link" href="' + url + '">' + url + '</a>');
            value.str = newStr;
            this._textStringValueObj = value;
        }
        else {
            this._textStringValueObj = value;
        }
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
        template: "<span [innerHTML]=\"valueObject.str\"></span>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TextValueAsStringComponent);
export { TextValueAsStringComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtc3RyaW5nL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT3BELElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBNEJuQztRQTFCQSxhQUFRLEdBQVcsb0VBQW9FLENBQUM7SUEyQnhGLENBQUM7SUF4QkQsSUFBSSxXQUFXLENBQUMsS0FBNEI7UUFDeEMsc0JBQXNCO1FBRXRCLE1BQU0sR0FBRyxHQUFXLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFFOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QixNQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDcEcsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDbkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztTQUNwQzthQUFNO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFHWCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDO0NBT0osQ0FBQTtBQTFCRztJQURDLEtBQUssRUFBRTtzQ0FDZSxxQkFBcUI7NkNBQXJCLHFCQUFxQjs2REFhM0M7QUFsQlEsMEJBQTBCO0lBTHRDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsMkRBQW9EOztLQUV2RCxDQUFDOztHQUNXLDBCQUEwQixDQStCdEM7U0EvQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS10ZXh0LXZhbHVlLWFzLXN0cmluZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90ZXh0LXZhbHVlLWFzLXN0cmluZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRleHRWYWx1ZUFzU3RyaW5nQ29tcG9uZW50IHtcblxuICAgIHJlZ2V4VXJsOiBSZWdFeHAgPSAvKGh0dHB8aHR0cHN8ZnRwfGZ0cHMpXFw6XFwvXFwvW2EtekEtWjAtOVxcLVxcLl0rXFwuW2EtekEtWl17MiwzfShcXC9cXFMqKT8vO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRUZXh0VmFsdWVBc1N0cmluZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSk7XG5cbiAgICAgICAgY29uc3Qgc3RyOiBzdHJpbmcgPSB2YWx1ZS5zdHI7XG5cbiAgICAgICAgaWYgKHRoaXMucmVnZXhVcmwuZXhlYyhzdHIpKSB7XG4gICAgICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMucmVnZXhVcmwuZXhlYyhzdHIpWzBdO1xuICAgICAgICAgICAgY29uc3QgbmV3U3RyID0gc3RyLnJlcGxhY2UodGhpcy5yZWdleFVybCwgJzxhIGNsYXNzPVwia3VpLWxpbmtcIiBocmVmPVwiJyArIHVybCArICdcIj4nICsgdXJsICsgJzwvYT4nKTtcbiAgICAgICAgICAgIHZhbHVlLnN0ciA9IG5ld1N0cjtcbiAgICAgICAgICAgIHRoaXMuX3RleHRTdHJpbmdWYWx1ZU9iaiA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dFN0cmluZ1ZhbHVlT2JqID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG5cblxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dFN0cmluZ1ZhbHVlT2JqO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RleHRTdHJpbmdWYWx1ZU9iajogUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgIH1cblxufVxuIl19