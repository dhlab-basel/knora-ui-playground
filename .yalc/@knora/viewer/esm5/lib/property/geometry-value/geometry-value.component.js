import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadGeomValue } from '@knora/core';
var GeometryValueComponent = /** @class */ (function () {
    function GeometryValueComponent() {
    }
    Object.defineProperty(GeometryValueComponent.prototype, "valueObject", {
        get: function () {
            return this._geomValueObj;
        },
        set: function (value) {
            this._geomValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadGeomValue),
        tslib_1.__metadata("design:paramtypes", [ReadGeomValue])
    ], GeometryValueComponent.prototype, "valueObject", null);
    GeometryValueComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-geometry-value',
            template: "<span>{{valueObject.geometryString}}</span>",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], GeometryValueComponent);
    return GeometryValueComponent;
}());
export { GeometryValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnktdmFsdWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS9nZW9tZXRyeS12YWx1ZS9nZW9tZXRyeS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPNUM7SUFhRTtJQUFnQixDQUFDO0lBVmpCLHNCQUFJLCtDQUFXO2FBSWY7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzthQU5ELFVBQWdCLEtBQW9CO1lBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRkQ7UUFEQyxLQUFLLEVBQUU7MENBQ2UsYUFBYTtpREFBYixhQUFhOzZEQUVuQztJQUxVLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLHVEQUE4Qzs7U0FFL0MsQ0FBQzs7T0FDVyxzQkFBc0IsQ0FlbEM7SUFBRCw2QkFBQztDQUFBLEFBZkQsSUFlQztTQWZZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRHZW9tVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1nZW9tZXRyeS12YWx1ZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9nZW9tZXRyeS12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dlb21ldHJ5LXZhbHVlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlWYWx1ZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkR2VvbVZhbHVlKSB7XG4gICAgdGhpcy5fZ2VvbVZhbHVlT2JqID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dlb21WYWx1ZU9iajtcbiAgfVxuXG4gIHByaXZhdGUgX2dlb21WYWx1ZU9iajogUmVhZEdlb21WYWx1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=