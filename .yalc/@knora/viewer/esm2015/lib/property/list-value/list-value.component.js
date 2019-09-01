import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadListValue } from '@knora/core';
import { ListCacheService } from '@knora/core';
let ListValueComponent = class ListValueComponent {
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
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ListCacheService])
], ListValueComponent);
export { ListValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2xpc3QtdmFsdWUvbGlzdC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYyxNQUFNLGFBQWEsQ0FBQztBQVEzRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQWUzQixZQUFvQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUN2RCxDQUFDO0lBYkQsSUFBSSxXQUFXLENBQUMsS0FBb0I7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBU0QsV0FBVztRQUNQLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVuRixDQUFDO0NBRUosQ0FBQTtBQXJCRztJQURDLEtBQUssRUFBRTtzQ0FDZSxhQUFhOzZDQUFiLGFBQWE7cURBRW5DO0FBTFEsa0JBQWtCO0lBTDlCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsNEVBQTBDOztLQUU3QyxDQUFDOzZDQWdCeUMsZ0JBQWdCO0dBZjlDLGtCQUFrQixDQXdCOUI7U0F4Qlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRMaXN0VmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBMaXN0Q2FjaGVTZXJ2aWNlLCBMaXN0Tm9kZVYyIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1saXN0LXZhbHVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC12YWx1ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpc3RWYWx1ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZExpc3RWYWx1ZSkge1xuICAgICAgICB0aGlzLl9saXN0VmFsdWVPYmogPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0VmFsdWVPYmo7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbGlzdFZhbHVlT2JqOiBSZWFkTGlzdFZhbHVlO1xuXG4gICAgbm9kZTogT2JzZXJ2YWJsZTxMaXN0Tm9kZVYyPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xpc3RDYWNoZVNlcnZpY2U6IExpc3RDYWNoZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgLy8gZ2l2ZW4gdGhlIG5vZGUncyBJcmksIGFzayB0aGUgbGlzdCBjYWNoZSBzZXJ2aWNlXG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMuX2xpc3RDYWNoZVNlcnZpY2UuZ2V0TGlzdE5vZGUodGhpcy5fbGlzdFZhbHVlT2JqLmxpc3ROb2RlSXJpKTtcblxuICAgIH1cblxufVxuIl19