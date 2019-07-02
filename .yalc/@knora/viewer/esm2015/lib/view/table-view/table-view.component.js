import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { KnoraConstants } from '@knora/core';
let TableViewComponent = class TableViewComponent {
    constructor() {
        this.KnoraConstants = KnoraConstants;
    }
    ngOnInit() {
    }
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
export { TableViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvdGFibGUtdmlldy90YWJsZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU83QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQVE3QjtRQUZBLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBRWhCLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7Q0FFRixDQUFBO0FBWFU7SUFBUixLQUFLLEVBQUU7O2tEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7O3dEQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7O3FEQUFXO0FBSlIsa0JBQWtCO0lBTDlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsNENBQTBDOztLQUUzQyxDQUFDOztHQUNXLGtCQUFrQixDQWE5QjtTQWJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS10YWJsZS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSByZXN1bHQ7XG4gIEBJbnB1dCgpIG9udG9sb2d5SW5mbztcbiAgQElucHV0KCkgaXNMb2FkaW5nO1xuXG4gIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iXX0=