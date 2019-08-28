import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { KnoraConstants } from '@knora/core';
var TableViewComponent = /** @class */ (function () {
    function TableViewComponent() {
        this.KnoraConstants = KnoraConstants;
    }
    TableViewComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TableViewComponent.prototype, "result", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TableViewComponent.prototype, "ontologyInfo", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TableViewComponent.prototype, "isLoading", void 0);
    TableViewComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-table-view',
            template: "<p>\n  table-view works!\n</p>\n",
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TableViewComponent);
    return TableViewComponent;
}());
export { TableViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvdGFibGUtdmlldy90YWJsZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU83QztJQVFFO1FBRkEsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFFaEIsQ0FBQztJQUVqQixxQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQVRRO1FBQVIsS0FBSyxFQUFFOztzREFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzs0REFBYztJQUNiO1FBQVIsS0FBSyxFQUFFOzt5REFBVztJQUpSLGtCQUFrQjtRQUw5QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLDRDQUEwQzs7U0FFM0MsQ0FBQzs7T0FDVyxrQkFBa0IsQ0FhOUI7SUFBRCx5QkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS10YWJsZS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSByZXN1bHQ7XG4gIEBJbnB1dCgpIG9udG9sb2d5SW5mbztcbiAgQElucHV0KCkgaXNMb2FkaW5nO1xuXG4gIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iXX0=