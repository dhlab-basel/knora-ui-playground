import * as tslib_1 from "tslib";
import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
/**
 * The search-panel contains the kui-fulltext-search and the kui-extended-search components.
 */
var SearchPanelComponent = /** @class */ (function () {
    function SearchPanelComponent(_overlay, _viewContainerRef) {
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        /**
         * @param  {string} route Route to navigate after search. This route path should contain a component for search results.
         */
        this.route = '/search';
        /**
         *@param  {boolean} [projectfilter] If true it shows the selection of projects to filter by one of them
         */
        this.projectfilter = false;
        /**
         * @param  {boolean} [advanced] Adds the extended / advanced search to the panel
         */
        this.advanced = false;
        /**
         * @param  {boolean} [expert] Adds the expert search / gravsearch editor to the panel
         */
        this.expert = false;
    }
    SearchPanelComponent.prototype.openPanelWithBackdrop = function (type) {
        var _this = this;
        this.showAdvanced = (type === 'advanced');
        var config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            // backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this._overlay.scrollStrategies.block()
        });
        this.overlayRef = this._overlay.create(config);
        this.overlayRef.attach(new TemplatePortal(this.searchMenu, this._viewContainerRef));
        this.overlayRef.backdropClick().subscribe(function () {
            _this.overlayRef.detach();
        });
    };
    SearchPanelComponent.prototype.getOverlayPosition = function () {
        var positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        var overlayPosition = this._overlay.position().flexibleConnectedTo(this.searchPanel).withPositions(positions).withLockedPosition(false);
        return overlayPosition;
    };
    SearchPanelComponent.prototype.closeMenu = function () {
        this.overlayRef.detach();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SearchPanelComponent.prototype, "route", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SearchPanelComponent.prototype, "projectfilter", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SearchPanelComponent.prototype, "filterbyproject", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SearchPanelComponent.prototype, "advanced", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SearchPanelComponent.prototype, "expert", void 0);
    tslib_1.__decorate([
        ViewChild('fullSearchPanel', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SearchPanelComponent.prototype, "searchPanel", void 0);
    tslib_1.__decorate([
        ViewChild('searchMenu', { static: false }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], SearchPanelComponent.prototype, "searchMenu", void 0);
    SearchPanelComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-search-panel',
            template: "<div class=\"kui-search-panel\" #fullSearchPanel cdkOverlayOrigin>\n\n    <kui-fulltext-search [route]=\"route\" [projectfilter]=\"projectfilter\" [filterbyproject]=\"filterbyproject\">\n    </kui-fulltext-search>\n\n    <!-- advanced search button: if advanced === true -->\n    <button mat-button *ngIf=\"advanced && !expert\" color=\"primary\"\n            (click)=\"openPanelWithBackdrop('advanced')\">advanced</button>\n\n    <!-- expert search button: if expert === true -->\n    <button mat-button *ngIf=\"!advanced && expert\" color=\"primary\"\n            (click)=\"openPanelWithBackdrop('expert')\">expert</button>\n\n    <!-- button to select advanced or expert search: if advanced AND expert === true; open menu to select -->\n    <button mat-button *ngIf=\"advanced && expert\" [matMenuTriggerFor]=\"selectSearch\">\n        <mat-icon>filter_list</mat-icon>\n    </button>\n    <mat-menu #selectSearch=\"matMenu\">\n        <button mat-menu-item (click)=\"openPanelWithBackdrop('advanced')\">\n            <span>Advanced search</span>\n        </button>\n        <button mat-menu-item (click)=\"openPanelWithBackdrop('expert')\">\n            <span>Expert search</span>\n        </button>\n    </mat-menu>\n\n</div>\n\n<!-- full-text search menu -->\n<ng-template #searchMenu>\n    <div class=\"kui-search-menu with-extended-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-menu-header\">\n            <span class=\"kui-menu-title\">\n                <h4 *ngIf=\"showAdvanced\">Advanced search</h4>\n                <h4 *ngIf=\"!showAdvanced\">Expert search</h4>\n            </span>\n            <span class=\"fill-remaining-space\"></span>\n            <span class=\"kui-menu-close\">\n                <button mat-icon-button (click)=\"closeMenu()\">\n                    <mat-icon>close</mat-icon>\n                </button>\n            </span>\n        </div>\n        <div class=\"kui-menu-content\">\n            <kui-extended-search *ngIf=\"showAdvanced\" [route]=\"route\" (toggleExtendedSearchForm)=\"closeMenu()\">\n            </kui-extended-search>\n            <kui-expert-search *ngIf=\"!showAdvanced\" [route]=\"route\" (toggleExpertSearchForm)=\"closeMenu()\">\n            </kui-expert-search>\n        </div>\n    </div>\n</ng-template>\n",
            styles: [".advanced-btn{margin-left:10px}.kui-search-panel{display:-webkit-box;display:flex;position:relative;z-index:100}.extended-search-box{margin:12px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:-webkit-inline-box;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:-webkit-inline-box;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:-webkit-inline-box;display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
        }),
        tslib_1.__metadata("design:paramtypes", [Overlay,
            ViewContainerRef])
    ], SearchPanelComponent);
    return SearchPanelComponent;
}());
export { SearchPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvc2VhcmNoLXBhbmVsL3NlYXJjaC1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFnQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2Rzs7R0FFRztBQU1IO0lBcUNJLDhCQUFvQixRQUFpQixFQUN6QixpQkFBbUM7UUFEM0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBckMvQzs7V0FFRztRQUNNLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFbkM7O1dBRUc7UUFDTSxrQkFBYSxHQUFhLEtBQUssQ0FBQztRQU96Qzs7V0FFRztRQUNNLGFBQVEsR0FBYSxLQUFLLENBQUM7UUFFcEM7O1dBRUc7UUFDTSxXQUFNLEdBQWEsS0FBSyxDQUFDO0lBY21CLENBQUM7SUFFdEQsb0RBQXFCLEdBQXJCLFVBQXNCLElBQVk7UUFBbEMsaUJBaUJDO1FBZkcsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQztRQUUxQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQztZQUM3QixXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsa0NBQWtDO1lBQ2pELDhDQUE4QztZQUM5QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0MsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO1NBQ3pELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaURBQWtCLEdBQWxCO1FBQ0ksSUFBTSxTQUFTLEdBQUc7WUFDZCxJQUFJLHNCQUFzQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUMzRyxJQUFJLHNCQUFzQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUM5RyxDQUFDO1FBRUYsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFJLE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFFRCx3Q0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBcEVRO1FBQVIsS0FBSyxFQUFFOzt1REFBMkI7SUFLMUI7UUFBUixLQUFLLEVBQUU7OytEQUFpQztJQUtoQztRQUFSLEtBQUssRUFBRTs7aUVBQTBCO0lBS3pCO1FBQVIsS0FBSyxFQUFFOzswREFBNEI7SUFLM0I7UUFBUixLQUFLLEVBQUU7O3dEQUEwQjtJQUVlO1FBQWhELFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FBYyxVQUFVOzZEQUFDO0lBRTdCO1FBQTNDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQWEsV0FBVzs0REFBTTtJQTVCaEUsb0JBQW9CO1FBTGhDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsNHdFQUE0Qzs7U0FFL0MsQ0FBQztpREFzQ2dDLE9BQU87WUFDTixnQkFBZ0I7T0F0Q3RDLG9CQUFvQixDQXlFaEM7SUFBRCwyQkFBQztDQUFBLEFBekVELElBeUVDO1NBekVZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsIE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYsIFBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBzZWFyY2gtcGFuZWwgY29udGFpbnMgdGhlIGt1aS1mdWxsdGV4dC1zZWFyY2ggYW5kIHRoZSBrdWktZXh0ZW5kZWQtc2VhcmNoIGNvbXBvbmVudHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlYXJjaC1wYW5lbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1wYW5lbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXBhbmVsLmNvbXBvbmVudC5zY3NzJywgJy4uL2Fzc2V0cy9zdHlsZS9zZWFyY2guc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFBhbmVsQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHJvdXRlIFJvdXRlIHRvIG5hdmlnYXRlIGFmdGVyIHNlYXJjaC4gVGhpcyByb3V0ZSBwYXRoIHNob3VsZCBjb250YWluIGEgY29tcG9uZW50IGZvciBzZWFyY2ggcmVzdWx0cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3V0ZTogc3RyaW5nID0gJy9zZWFyY2gnO1xuXG4gICAgLyoqXG4gICAgICpAcGFyYW0gIHtib29sZWFufSBbcHJvamVjdGZpbHRlcl0gSWYgdHJ1ZSBpdCBzaG93cyB0aGUgc2VsZWN0aW9uIG9mIHByb2plY3RzIHRvIGZpbHRlciBieSBvbmUgb2YgdGhlbVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHByb2plY3RmaWx0ZXI/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtmaWx0ZXJieXByb2plY3RdIElmIHlvdXIgZnVsbC10ZXh0IHNlYXJjaCBzaG91bGQgYmUgZmlsdGVyZWQgYnkgb25lIHByb2plY3QsIHlvdSBjYW4gZGVmaW5lIGl0IHdpdGggcHJvamVjdCBpcmkgaW4gdGhlIHBhcmFtZXRlciBmaWx0ZXJieXByb2plY3QuXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyYnlwcm9qZWN0Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gW2FkdmFuY2VkXSBBZGRzIHRoZSBleHRlbmRlZCAvIGFkdmFuY2VkIHNlYXJjaCB0byB0aGUgcGFuZWxcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhZHZhbmNlZD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IFtleHBlcnRdIEFkZHMgdGhlIGV4cGVydCBzZWFyY2ggLyBncmF2c2VhcmNoIGVkaXRvciB0byB0aGUgcGFuZWxcbiAgICAgKi9cbiAgICBASW5wdXQoKSBleHBlcnQ/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkKCdmdWxsU2VhcmNoUGFuZWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoUGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzZWFyY2hNZW51JywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlYXJjaE1lbnU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgLy8gICAgQFZpZXdDaGlsZCgnZXhwZXJ0U2VhcmNoTWVudScsIHtzdGF0aWM6ZmFsc2V9KSBleHBlcnRNZW51OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLy8gb3ZlcmxheSByZWZlcmVuY2VcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuXG4gICAgLy8gc2hvdyBhZHZhbmNlZCBvciBleHBlcnQgc2VhcmNoXG4gICAgc2hvd0FkdmFuY2VkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgKSB7IH1cblxuICAgIG9wZW5QYW5lbFdpdGhCYWNrZHJvcCh0eXBlOiBzdHJpbmcpIHtcblxuICAgICAgICB0aGlzLnNob3dBZHZhbmNlZCA9ICh0eXBlID09PSAnYWR2YW5jZWQnKTtcblxuICAgICAgICBjb25zdCBjb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICAvLyBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5hdHRhY2gobmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuc2VhcmNoTWVudSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZikpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE92ZXJsYXlQb3NpdGlvbigpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gW1xuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAnYm90dG9tJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSksXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJyB9KVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IG92ZXJsYXlQb3NpdGlvbiA9IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuc2VhcmNoUGFuZWwpLndpdGhQb3NpdGlvbnMocG9zaXRpb25zKS53aXRoTG9ja2VkUG9zaXRpb24oZmFsc2UpO1xuXG4gICAgICAgIHJldHVybiBvdmVybGF5UG9zaXRpb247XG4gICAgfVxuXG4gICAgY2xvc2VNZW51KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgfVxufVxuIl19