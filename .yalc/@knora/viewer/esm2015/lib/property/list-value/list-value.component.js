import { Component, Input } from '@angular/core';
import { ReadListValue } from '@knora/core';
import { ListCacheService } from '@knora/core';
export class ListValueComponent {
    constructor(_listCacheService) {
        this._listCacheService = _listCacheService;
    }
    set valueObject(value) {
        this._listValueObj = value;
    }
    get valueObject() {
        return this._listValueObj;
    }
    ngOnChanges() {
        // given the node's Iri, ask the list cache service
        this.node = this._listCacheService.getListNode(this._listValueObj.listNodeIri);
    }
}
ListValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-list-value',
                template: "<span *ngIf=\"node | async\">{{(node | async )?.label}}</span>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }] }
];
/** @nocollapse */
ListValueComponent.ctorParameters = () => [
    { type: ListCacheService }
];
ListValueComponent.propDecorators = {
    valueObject: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2xpc3QtdmFsdWUvbGlzdC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFjLE1BQU0sYUFBYSxDQUFDO0FBUTNELE1BQU0sT0FBTyxrQkFBa0I7SUFlM0IsWUFBb0IsaUJBQW1DO1FBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7SUFDdkQsQ0FBQztJQWRELElBQ0ksV0FBVyxDQUFDLEtBQW9CO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQVNELFdBQVc7UUFDUCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFbkYsQ0FBQzs7O1lBM0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQiw0RUFBMEM7O2FBRTdDOzs7O1lBUFEsZ0JBQWdCOzs7MEJBVXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhZExpc3RWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IExpc3RDYWNoZVNlcnZpY2UsIExpc3ROb2RlVjIgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWxpc3QtdmFsdWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saXN0LXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saXN0LXZhbHVlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlzdFZhbHVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkTGlzdFZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xpc3RWYWx1ZU9iaiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZU9iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RWYWx1ZU9iajtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9saXN0VmFsdWVPYmo6IFJlYWRMaXN0VmFsdWU7XG5cbiAgICBub2RlOiBPYnNlcnZhYmxlPExpc3ROb2RlVjI+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGlzdENhY2hlU2VydmljZTogTGlzdENhY2hlU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICAvLyBnaXZlbiB0aGUgbm9kZSdzIElyaSwgYXNrIHRoZSBsaXN0IGNhY2hlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5fbGlzdENhY2hlU2VydmljZS5nZXRMaXN0Tm9kZSh0aGlzLl9saXN0VmFsdWVPYmoubGlzdE5vZGVJcmkpO1xuXG4gICAgfVxuXG59XG4iXX0=