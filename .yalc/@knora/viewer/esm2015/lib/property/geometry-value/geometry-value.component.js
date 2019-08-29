import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadGeomValue } from '@knora/core';
let GeometryValueComponent = class GeometryValueComponent {
    constructor() { }
    set valueObject(value) {
        this._geomValueObj = value;
    }
    get valueObject() {
        return this._geomValueObj;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadGeomValue),
    tslib_1.__metadata("design:paramtypes", [ReadGeomValue])
], GeometryValueComponent.prototype, "valueObject", null);
GeometryValueComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-geometry-value',
        template: "<span>{{valueObject.geometryString}}</span>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], GeometryValueComponent);
export { GeometryValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktdmFsdWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS9nZW9tZXRyeS12YWx1ZS9nZW9tZXRyeS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPNUMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFhakMsZ0JBQWdCLENBQUM7SUFWakIsSUFBSSxXQUFXLENBQUMsS0FBb0I7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0NBTUYsQ0FBQTtBQVpDO0lBREMsS0FBSyxFQUFFO3NDQUNlLGFBQWE7NkNBQWIsYUFBYTt5REFFbkM7QUFMVSxzQkFBc0I7SUFMbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5Qix1REFBOEM7O0tBRS9DLENBQUM7O0dBQ1csc0JBQXNCLENBZWxDO1NBZlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZEdlb21WYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLWdlb21ldHJ5LXZhbHVlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dlb21ldHJ5LXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2VvbWV0cnktdmFsdWUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeVZhbHVlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRHZW9tVmFsdWUpIHtcbiAgICB0aGlzLl9nZW9tVmFsdWVPYmogPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2VvbVZhbHVlT2JqO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VvbVZhbHVlT2JqOiBSZWFkR2VvbVZhbHVlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiJdfQ==