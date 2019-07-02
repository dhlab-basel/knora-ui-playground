import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadListValue } from '@knora/core';
import { ListCacheService } from '@knora/core';
var ListValueComponent = /** @class */ (function () {
    function ListValueComponent(_listCacheService) {
        this._listCacheService = _listCacheService;
    }
    Object.defineProperty(ListValueComponent.prototype, "valueObject", {
        get: function () {
            return this._listValueObj;
        },
        set: function (value) {
            this._listValueObj = value;
        },
        enumerable: true,
        configurable: true
    });
    ListValueComponent.prototype.ngOnChanges = function () {
        // given the node's Iri, ask the list cache service
        this.node = this._listCacheService.getListNode(this._listValueObj.listNodeIri);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadListValue),
        tslib_1.__metadata("design:paramtypes", [ReadListValue])
    ], ListValueComponent.prototype, "valueObject", null);
    ListValueComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-list-value',
            template: "<span *ngIf=\"node | async\">{{(node | async )?.label}}</span>\n",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ListCacheService])
    ], ListValueComponent);
    return ListValueComponent;
}());
export { ListValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2xpc3QtdmFsdWUvbGlzdC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYyxNQUFNLGFBQWEsQ0FBQztBQVEzRDtJQWVJLDRCQUFvQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUN2RCxDQUFDO0lBYkQsc0JBQUksMkNBQVc7YUFJZjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBTkQsVUFBZ0IsS0FBb0I7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFhRCx3Q0FBVyxHQUFYO1FBQ0ksbURBQW1EO1FBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRW5GLENBQUM7SUFuQkQ7UUFEQyxLQUFLLEVBQUU7MENBQ2UsYUFBYTtpREFBYixhQUFhO3lEQUVuQztJQUxRLGtCQUFrQjtRQUw5QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLDRFQUEwQzs7U0FFN0MsQ0FBQztpREFnQnlDLGdCQUFnQjtPQWY5QyxrQkFBa0IsQ0F3QjlCO0lBQUQseUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQXhCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZExpc3RWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IExpc3RDYWNoZVNlcnZpY2UsIExpc3ROb2RlVjIgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWxpc3QtdmFsdWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saXN0LXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saXN0LXZhbHVlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlzdFZhbHVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkTGlzdFZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xpc3RWYWx1ZU9iaiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9saXN0VmFsdWVPYmo6IFJlYWRMaXN0VmFsdWU7XG5cbiAgICBub2RlOiBPYnNlcnZhYmxlPExpc3ROb2RlVjI+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGlzdENhY2hlU2VydmljZTogTGlzdENhY2hlU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICAvLyBnaXZlbiB0aGUgbm9kZSdzIElyaSwgYXNrIHRoZSBsaXN0IGNhY2hlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5fbGlzdENhY2hlU2VydmljZS5nZXRMaXN0Tm9kZSh0aGlzLl9saXN0VmFsdWVPYmoubGlzdE5vZGVJcmkpO1xuXG4gICAgfVxuXG59XG4iXX0=