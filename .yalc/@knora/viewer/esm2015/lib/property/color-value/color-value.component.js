import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadColorValue } from '@knora/core';
let ColorValueComponent = class ColorValueComponent {
    constructor() {
    }
    set valueObject(value) {
        this._colorValueObj = value;
    }
    get valueObject() {
        return this._colorValueObj;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadColorValue),
    tslib_1.__metadata("design:paramtypes", [ReadColorValue])
], ColorValueComponent.prototype, "valueObject", null);
ColorValueComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-color-value',
        template: "<span [style.background-color]=\"valueObject.colorHex\">{{valueObject.colorHex}}</span>",
        styles: [".fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.mat-form-field{width:36px;overflow-x:visible}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ColorValueComponent);
export { ColorValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItdmFsdWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS9jb2xvci12YWx1ZS9jb2xvci12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPN0MsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFhNUI7SUFDQSxDQUFDO0lBWEQsSUFBSSxXQUFXLENBQUMsS0FBcUI7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0NBT0osQ0FBQTtBQWJHO0lBREMsS0FBSyxFQUFFO3NDQUNlLGNBQWM7NkNBQWQsY0FBYztzREFFcEM7QUFMUSxtQkFBbUI7SUFML0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixtR0FBMkM7O0tBRTlDLENBQUM7O0dBQ1csbUJBQW1CLENBZ0IvQjtTQWhCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkQ29sb3JWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktY29sb3ItdmFsdWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb2xvci12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29sb3ItdmFsdWUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb2xvclZhbHVlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkQ29sb3JWYWx1ZSkge1xuICAgICAgICB0aGlzLl9jb2xvclZhbHVlT2JqID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3JWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb2xvclZhbHVlT2JqOiBSZWFkQ29sb3JWYWx1ZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxufVxuIl19