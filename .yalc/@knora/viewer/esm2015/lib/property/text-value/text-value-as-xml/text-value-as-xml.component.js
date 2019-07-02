import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadTextValueAsXml } from '@knora/core';
let TextValueAsXmlComponent = class TextValueAsXmlComponent {
    constructor() {
    }
    set valueObject(value) {
        this._xmlValueObj = value;
    }
    get valueObject() {
        return this._xmlValueObj;
    }
};
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
export { TextValueAsXmlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy14bWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMteG1sL3RleHQtdmFsdWUtYXMteG1sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT2pELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBYWhDO0lBQ0EsQ0FBQztJQVhELElBQUksV0FBVyxDQUFDLEtBQXlCO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztDQU9KLENBQUE7QUFiRztJQURDLEtBQUssRUFBRTtzQ0FDZSxrQkFBa0I7NkNBQWxCLGtCQUFrQjswREFFeEM7QUFMUSx1QkFBdUI7SUFMbkMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyw0Q0FBaUQ7O0tBRXBELENBQUM7O0dBQ1csdUJBQXVCLENBZ0JuQztTQWhCWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkVGV4dFZhbHVlQXNYbWwgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXRleHQtdmFsdWUtYXMteG1sJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dC12YWx1ZS1hcy14bWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RleHQtdmFsdWUtYXMteG1sLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGV4dFZhbHVlQXNYbWxDb21wb25lbnQge1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRUZXh0VmFsdWVBc1htbCkge1xuICAgICAgICB0aGlzLl94bWxWYWx1ZU9iaiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3htbFZhbHVlT2JqO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3htbFZhbHVlT2JqOiBSZWFkVGV4dFZhbHVlQXNYbWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbn1cbiJdfQ==