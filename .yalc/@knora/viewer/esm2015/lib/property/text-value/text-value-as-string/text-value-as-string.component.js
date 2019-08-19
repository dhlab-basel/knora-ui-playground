import { Component, Input } from '@angular/core';
import { ReadTextValueAsString } from '@knora/core';
export class TextValueAsStringComponent {
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
}
TextValueAsStringComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-text-value-as-string',
                template: "<span [innerHTML]=\"valueObject.str\"></span>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}", ".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }] }
];
/** @nocollapse */
TextValueAsStringComponent.ctorParameters = () => [];
TextValueAsStringComponent.propDecorators = {
    valueObject: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtc3RyaW5nL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPcEQsTUFBTSxPQUFPLDBCQUEwQjtJQTRCbkM7UUExQkEsYUFBUSxHQUFXLG9FQUFvRSxDQUFDO0lBMkJ4RixDQUFDO0lBekJELElBQ0ksV0FBVyxDQUFDLEtBQTRCO1FBQ3hDLHNCQUFzQjtRQUV0QixNQUFNLEdBQUcsR0FBVyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTlCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekIsTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLDRCQUE0QixHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3BHLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ25CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDcEM7YUFBTTtZQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBR1gsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQzs7O1lBN0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQywyREFBb0Q7O2FBRXZEOzs7OzswQkFLSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZFRleHRWYWx1ZUFzU3RyaW5nIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS10ZXh0LXZhbHVlLWFzLXN0cmluZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90ZXh0LXZhbHVlLWFzLXN0cmluZy5jb21wb25lbnQuc2NzcycsICcuLi8uLi8uLi9hc3NldHMvc3R5bGUvdmlld2VyLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0VmFsdWVBc1N0cmluZ0NvbXBvbmVudCB7XG5cbiAgICByZWdleFVybDogUmVnRXhwID0gLyhodHRwfGh0dHBzfGZ0cHxmdHBzKVxcOlxcL1xcL1thLXpBLVowLTlcXC1cXC5dK1xcLlthLXpBLVpdezIsM30oXFwvXFxTKik/LztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkVGV4dFZhbHVlQXNTdHJpbmcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IHN0cjogc3RyaW5nID0gdmFsdWUuc3RyO1xuXG4gICAgICAgIGlmICh0aGlzLnJlZ2V4VXJsLmV4ZWMoc3RyKSkge1xuICAgICAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLnJlZ2V4VXJsLmV4ZWMoc3RyKVswXTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0ciA9IHN0ci5yZXBsYWNlKHRoaXMucmVnZXhVcmwsICc8YSBjbGFzcz1cImt1aS1saW5rXCIgaHJlZj1cIicgKyB1cmwgKyAnXCI+JyArIHVybCArICc8L2E+Jyk7XG4gICAgICAgICAgICB2YWx1ZS5zdHIgPSBuZXdTdHI7XG4gICAgICAgICAgICB0aGlzLl90ZXh0U3RyaW5nVmFsdWVPYmogPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRTdHJpbmdWYWx1ZU9iaiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHRTdHJpbmdWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBwcml2YXRlIF90ZXh0U3RyaW5nVmFsdWVPYmo6IFJlYWRUZXh0VmFsdWVBc1N0cmluZztcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICB9XG5cbn1cbiJdfQ==