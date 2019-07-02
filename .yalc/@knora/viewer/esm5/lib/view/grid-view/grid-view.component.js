import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { KnoraConstants, OntologyInformation } from '@knora/core';
import { Router } from '@angular/router';
var GridViewComponent = /** @class */ (function () {
    function GridViewComponent(_router) {
        this._router = _router;
        // @Input() isLoading: boolean;
        this.KnoraConstants = KnoraConstants;
    }
    GridViewComponent.prototype.ngOnInit = function () {
    };
    /**
     * Navigate to the resource viewer when clicking on one resource of the search result grid
     * @param {string} id
     */
    GridViewComponent.prototype.openResource = function (id) {
        var url = '/resource/' + encodeURIComponent(id);
        this._router.navigate([url]);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], GridViewComponent.prototype, "result", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", OntologyInformation)
    ], GridViewComponent.prototype, "ontologyInfo", void 0);
    GridViewComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-grid-view',
            template: "<div>\n  <!-- <kui-progress-indicator *ngIf=\"isLoading\" [color]=\"'#D88958'\"></kui-progress-indicator> -->\n\n  <div fxLayout=\"row wrap\" fxLayout.xs=\"column\" fxLayoutGap=\"grid\">\n\n    <div fxFlex.sm=\"50\" fxFlex.md=\"33.3\" fxFlex.lg=\"20\" fxFlex.xl=\"16.6\" fxFlex=\"16.6\" *ngFor=\"let res of result\" class=\"gv-preview\">\n      <mat-card class=\"link\" (click)=\"openResource(res.id)\">\n\n        <mat-card-subtitle>{{ontologyInfo?.getLabelForResourceClass(res.type)}}</mat-card-subtitle>\n        <mat-card-title>{{res.label}}</mat-card-title>\n\n\n        <mat-card-content *ngFor=\"let prop of res.properties | kuiKey\">\n          <!-- description -->\n          <div *ngFor=\"let val of prop.value | kuiKey\">\n            <div [ngSwitch]=\"val.value.getClassName()\">\n              <div class=\"lv-html-text\" *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\">\n                <kui-text-value-as-html [valueObject]=\"val.value\" [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"false\"></kui-text-value-as-html>\n                <p class=\"lv-read-more\"></p>\n              </div>\n              <div>\n                <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val.value\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n                <span *ngSwitchDefault=\"\">{{val.value.getContent()}}</span>\n              </div>\n              <br>\n              <span *ngIf=\"ontologyInfo?.getLabelForProperty(prop.key) !== 'Text'\">\n                {{ontologyInfo?.getLabelForProperty(prop.key)}}\n              </span>\n            </div>\n          </div>\n        </mat-card-content>\n\n      </mat-card>\n    </div>\n  </div>\n\n\n</div>",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.gv-preview{margin:6px 0;padding:24px;word-wrap:break-word;border-radius:5px}.gv-preview .mat-card{height:160px;color:rgba(0,0,0,.81);overflow:hidden;padding-bottom:25px}.gv-preview .mat-card:hover{background:rgba(0,105,92,.39);color:#000}.gv-preview .mat-card:active{background:rgba(0,105,92,.61)}.gv-preview .mat-card .mat-card-title{font-size:12pt;font-weight:600}"]
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], GridViewComponent);
    return GridViewComponent;
}());
export { GridViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlldy9ncmlkLXZpZXcvZ3JpZC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPekM7SUFnQkUsMkJBQ1UsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFMekIsK0JBQStCO1FBRS9CLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBSTVCLENBQUM7SUFFTCxvQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVEOzs7T0FHRztJQUNILHdDQUFZLEdBQVosVUFBYSxFQUFVO1FBQ3JCLElBQU0sR0FBRyxHQUFXLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQXpCUTtRQUFSLEtBQUssRUFBRTs7cURBQWE7SUFLWjtRQUFSLEtBQUssRUFBRTswQ0FBZSxtQkFBbUI7MkRBQUM7SUFWaEMsaUJBQWlCO1FBTDdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLHdyREFBeUM7O1NBRTFDLENBQUM7aURBa0JtQixNQUFNO09BakJkLGlCQUFpQixDQStCN0I7SUFBRCx3QkFBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdrdWktZ3JpZC12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dyaWQtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2dyaWQtdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvKipcbiAgICogQHBhcmFtICB7YW55fSByZXN1bHQgU2VhcmNoIHJlc3VsdCByZWNlaXZlZCBmcm9tIFNlYXJjaFJlc3VsdHNDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdDogYW55O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gT250b2xvZ3kgaW5mb3JtYXRpb24gcmVjZWl2ZWQgZnJvbSBTZWFyY2hSZXN1bHRzQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb247XG5cbiAgLy8gQElucHV0KCkgaXNMb2FkaW5nOiBib29sZWFuO1xuXG4gIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byB0aGUgcmVzb3VyY2Ugdmlld2VyIHdoZW4gY2xpY2tpbmcgb24gb25lIHJlc291cmNlIG9mIHRoZSBzZWFyY2ggcmVzdWx0IGdyaWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFxuICAgKi9cbiAgb3BlblJlc291cmNlKGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvcmVzb3VyY2UvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZCk7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt1cmxdKTtcbiAgfVxufVxuIl19