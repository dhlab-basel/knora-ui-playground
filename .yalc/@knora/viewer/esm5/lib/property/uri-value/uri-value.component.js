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
    UriValueComponent.decorators = [
        { type: Component, args: [{
                    selector: '   kui-uri-value',
                    template: "<a href=\"{{valueObject.uri}}\" target=\"_blank\" class=\"kui-link\">{{displayString}}</a>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
                }] }
    ];
    /** @nocollapse */
    UriValueComponent.ctorParameters = function () { return []; };
    UriValueComponent.propDecorators = {
        valueObject: [{ type: Input }],
        label: [{ type: Input }]
    };
    return UriValueComponent;
}());
export { UriValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpLXZhbHVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvcHJvcGVydHkvdXJpLXZhbHVlL3VyaS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUczQztJQWtCRTtJQUFnQixDQUFDO0lBWGpCLHNCQUNJLDBDQUFXO2FBSWY7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzthQVBELFVBQ2dCLEtBQW1CO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBRTdCLENBQUM7OztPQUFBO0lBU0QsdUNBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztTQUMvQzthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Z0JBMUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1Qix3R0FBeUM7O2lCQUUxQzs7Ozs7OEJBR0UsS0FBSzt3QkFRTCxLQUFLOztJQWFSLHdCQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0F2QlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkVXJpVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICcgICBrdWktdXJpLXZhbHVlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VyaS12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3VyaS12YWx1ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFVyaVZhbHVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRVcmlWYWx1ZSkge1xuICAgIHRoaXMuX191cmlWYWx1ZU9iaiA9IHZhbHVlO1xuXG4gIH1cbiAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl9fdXJpVmFsdWVPYmo7XG4gIH1cbiAgQElucHV0KCkgbGFiZWw/OiBzdHJpbmc7XG4gIHByaXZhdGUgX191cmlWYWx1ZU9iajogUmVhZFVyaVZhbHVlO1xuICBwdWJsaWMgZGlzcGxheVN0cmluZzogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgICAgaWYgKHRoaXMubGFiZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuZGlzcGxheVN0cmluZyA9IHRoaXMuX191cmlWYWx1ZU9iai51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGxheVN0cmluZyA9IHRoaXMubGFiZWw7XG4gICAgICB9XG4gIH1cblxufVxuIl19