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
    ListValueComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-list-value',
                    template: "<span *ngIf=\"node | async\">{{(node | async )?.label}}</span>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
                }] }
    ];
    /** @nocollapse */
    ListValueComponent.ctorParameters = function () { return [
        { type: ListCacheService }
    ]; };
    ListValueComponent.propDecorators = {
        valueObject: [{ type: Input }]
    };
    return ListValueComponent;
}());
export { ListValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3Byb3BlcnR5L2xpc3QtdmFsdWUvbGlzdC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFjLE1BQU0sYUFBYSxDQUFDO0FBRzNEO0lBb0JJLDRCQUFvQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUN2RCxDQUFDO0lBZEQsc0JBQ0ksMkNBQVc7YUFJZjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBUEQsVUFDZ0IsS0FBb0I7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFhRCx3Q0FBVyxHQUFYO1FBQ0ksbURBQW1EO1FBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRW5GLENBQUM7O2dCQTNCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsNEVBQTBDOztpQkFFN0M7Ozs7Z0JBUFEsZ0JBQWdCOzs7OEJBVXBCLEtBQUs7O0lBc0JWLHlCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0F4Qlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRMaXN0VmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBMaXN0Q2FjaGVTZXJ2aWNlLCBMaXN0Tm9kZVYyIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1saXN0LXZhbHVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC12YWx1ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpc3RWYWx1ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZExpc3RWYWx1ZSkge1xuICAgICAgICB0aGlzLl9saXN0VmFsdWVPYmogPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVPYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0VmFsdWVPYmo7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbGlzdFZhbHVlT2JqOiBSZWFkTGlzdFZhbHVlO1xuXG4gICAgbm9kZTogT2JzZXJ2YWJsZTxMaXN0Tm9kZVYyPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xpc3RDYWNoZVNlcnZpY2U6IExpc3RDYWNoZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgLy8gZ2l2ZW4gdGhlIG5vZGUncyBJcmksIGFzayB0aGUgbGlzdCBjYWNoZSBzZXJ2aWNlXG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMuX2xpc3RDYWNoZVNlcnZpY2UuZ2V0TGlzdE5vZGUodGhpcy5fbGlzdFZhbHVlT2JqLmxpc3ROb2RlSXJpKTtcblxuICAgIH1cblxufVxuIl19