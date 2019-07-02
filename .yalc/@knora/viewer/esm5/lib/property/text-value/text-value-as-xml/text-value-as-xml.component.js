import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadTextValueAsXml } from '@knora/core';
var TextValueAsXmlComponent = /** @class */ (function () {
    function TextValueAsXmlComponent() {
    }
    Object.defineProperty(TextValueAsXmlComponent.prototype, "valueObject", {
        get: function () {
            return this._xmlValueObj;
        },
        set: function (value) {
            this._xmlValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadTextValueAsXml),
        tslib_1.__metadata("design:paramtypes", [ReadTextValueAsXml])
    ], TextValueAsXmlComponent.prototype, "valueObject", null);
    TextValueAsXmlComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-text-value-as-xml',
            template: "<span>{{valueObject.xml}}</span>",
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TextValueAsXmlComponent);
    return TextValueAsXmlComponent;
}());
export { TextValueAsXmlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy14bWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMteG1sL3RleHQtdmFsdWUtYXMteG1sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT2pEO0lBYUk7SUFDQSxDQUFDO0lBWEQsc0JBQUksZ0RBQVc7YUFJZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBTkQsVUFBZ0IsS0FBeUI7WUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFGRDtRQURDLEtBQUssRUFBRTswQ0FDZSxrQkFBa0I7aURBQWxCLGtCQUFrQjs4REFFeEM7SUFMUSx1QkFBdUI7UUFMbkMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyw0Q0FBaUQ7O1NBRXBELENBQUM7O09BQ1csdUJBQXVCLENBZ0JuQztJQUFELDhCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FoQlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZFRleHRWYWx1ZUFzWG1sIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS10ZXh0LXZhbHVlLWFzLXhtbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RleHQtdmFsdWUtYXMteG1sLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90ZXh0LXZhbHVlLWFzLXhtbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRleHRWYWx1ZUFzWG1sQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkVGV4dFZhbHVlQXNYbWwpIHtcbiAgICAgICAgdGhpcy5feG1sVmFsdWVPYmogPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94bWxWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBwcml2YXRlIF94bWxWYWx1ZU9iajogUmVhZFRleHRWYWx1ZUFzWG1sO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG59XG4iXX0=