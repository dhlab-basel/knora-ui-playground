import * as tslib_1 from "tslib";
import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
/**
 * The search-panel contains the kui-fulltext-search and the kui-extended-search components.
 */
let SearchPanelComponent = class SearchPanelComponent {
    constructor(_overlay, _viewContainerRef) {
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
    openPanelWithBackdrop(type) {
        this.showAdvanced = (type === 'advanced');
        const config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            // backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this._overlay.scrollStrategies.block()
        });
        this.overlayRef = this._overlay.create(config);
        this.overlayRef.attach(new TemplatePortal(this.searchMenu, this._viewContainerRef));
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.detach();
        });
    }
    getOverlayPosition() {
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        const overlayPosition = this._overlay.position().flexibleConnectedTo(this.searchPanel).withPositions(positions).withLockedPosition(false);
        return overlayPosition;
    }
    closeMenu() {
        this.overlayRef.detach();
    }
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
        template: "<div class=\"kui-search-panel\" #fullSearchPanel cdkOverlayOrigin>\n\n    <!-- DESKTOP VERSION -->\n    <kui-fulltext-search class=\"kui-fulltext-search\" [route]=\"route\" [projectfilter]=\"projectfilter\" [filterbyproject]=\"filterbyproject\">\n    </kui-fulltext-search>\n\n    <!-- advanced search button: if advanced === true -->\n    <button mat-button *ngIf=\"advanced && !expert\" color=\"primary\" (click)=\"openPanelWithBackdrop('advanced')\">advanced</button>\n\n    <!-- expert search button: if expert === true -->\n    <button mat-button *ngIf=\"!advanced && expert\" color=\"primary\" (click)=\"openPanelWithBackdrop('expert')\">expert</button>\n\n    <!-- button to select advanced or expert search: if advanced AND expert === true; open menu to select -->\n    <button mat-button *ngIf=\"advanced && expert\" [matMenuTriggerFor]=\"selectSearch\">\n        <mat-icon>filter_list</mat-icon>\n    </button>\n    <mat-menu #selectSearch=\"matMenu\">\n        <button mat-menu-item (click)=\"openPanelWithBackdrop('advanced')\">\n            <span>Advanced search</span>\n        </button>\n        <button mat-menu-item (click)=\"openPanelWithBackdrop('expert')\">\n            <span>Expert search</span>\n        </button>\n    </mat-menu>\n\n</div>\n\n<!-- full-text search menu -->\n<ng-template #searchMenu>\n    <div class=\"kui-search-menu with-extended-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-menu-header\">\n            <span class=\"kui-menu-title\">\n                <h4 *ngIf=\"showAdvanced\">Advanced search</h4>\n                <h4 *ngIf=\"!showAdvanced\">Expert search</h4>\n            </span>\n            <span class=\"fill-remaining-space\"></span>\n            <span class=\"kui-menu-close\">\n                <button mat-icon-button (click)=\"closeMenu()\">\n                    <mat-icon>close</mat-icon>\n                </button>\n            </span>\n        </div>\n        <div class=\"kui-menu-content\">\n            <kui-extended-search *ngIf=\"showAdvanced\" [route]=\"route\" (toggleExtendedSearchForm)=\"closeMenu()\">\n            </kui-extended-search>\n            <kui-expert-search *ngIf=\"!showAdvanced\" [route]=\"route\" (toggleExpertSearchForm)=\"closeMenu()\">\n            </kui-expert-search>\n        </div>\n    </div>\n</ng-template>\n",
        styles: [".advanced-btn{margin-left:10px}.kui-search-panel{display:flex;position:relative;z-index:100}.extended-search-box{margin:12px}@media (max-width:576px){.kui-fulltext-search{height:100%;width:100%!important}}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [Overlay,
        ViewContainerRef])
], SearchPanelComponent);
export { SearchPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvc2VhcmNoLXBhbmVsL3NlYXJjaC1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFnQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFFN0g7O0dBRUc7QUFNSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQXFDN0IsWUFBb0IsUUFBaUIsRUFDekIsaUJBQW1DO1FBRDNCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQXJDL0M7O1dBRUc7UUFDTSxVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRW5DOztXQUVHO1FBQ00sa0JBQWEsR0FBYSxLQUFLLENBQUM7UUFPekM7O1dBRUc7UUFDTSxhQUFRLEdBQWEsS0FBSyxDQUFDO1FBRXBDOztXQUVHO1FBQ00sV0FBTSxHQUFhLEtBQUssQ0FBQztJQWNtQixDQUFDO0lBRXRELHFCQUFxQixDQUFDLElBQVk7UUFFOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQztRQUUxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGFBQWEsQ0FBQztZQUM3QixXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsa0NBQWtDO1lBQ2pELDhDQUE4QztZQUM5QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0MsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO1NBQ3pELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtCQUFrQjtRQUNkLE1BQU0sU0FBUyxHQUFHO1lBQ2QsSUFBSSxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDM0csSUFBSSxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7U0FDOUcsQ0FBQztRQUVGLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxSSxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNKLENBQUE7QUFyRVk7SUFBUixLQUFLLEVBQUU7O21EQUEyQjtBQUsxQjtJQUFSLEtBQUssRUFBRTs7MkRBQWlDO0FBS2hDO0lBQVIsS0FBSyxFQUFFOzs2REFBMEI7QUFLekI7SUFBUixLQUFLLEVBQUU7O3NEQUE0QjtBQUszQjtJQUFSLEtBQUssRUFBRTs7b0RBQTBCO0FBRWU7SUFBaEQsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUFjLFVBQVU7eURBQUM7QUFFN0I7SUFBM0MsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FBYSxXQUFXO3dEQUFNO0FBNUJoRSxvQkFBb0I7SUFMaEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGtCQUFrQjtRQUM1Qiw4eUVBQTRDOztLQUUvQyxDQUFDOzZDQXNDZ0MsT0FBTztRQUNOLGdCQUFnQjtHQXRDdEMsb0JBQW9CLENBeUVoQztTQXpFWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25uZWN0aW9uUG9zaXRpb25QYWlyLCBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmLCBQb3NpdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIHNlYXJjaC1wYW5lbCBjb250YWlucyB0aGUga3VpLWZ1bGx0ZXh0LXNlYXJjaCBhbmQgdGhlIGt1aS1leHRlbmRlZC1zZWFyY2ggY29tcG9uZW50cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc2VhcmNoLXBhbmVsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcGFuZWwuY29tcG9uZW50LnNjc3MnLCAnLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUGFuZWxDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcm91dGUgUm91dGUgdG8gbmF2aWdhdGUgYWZ0ZXIgc2VhcmNoLiBUaGlzIHJvdXRlIHBhdGggc2hvdWxkIGNvbnRhaW4gYSBjb21wb25lbnQgZm9yIHNlYXJjaCByZXN1bHRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvdXRlOiBzdHJpbmcgPSAnL3NlYXJjaCc7XG5cbiAgICAvKipcbiAgICAgKkBwYXJhbSAge2Jvb2xlYW59IFtwcm9qZWN0ZmlsdGVyXSBJZiB0cnVlIGl0IHNob3dzIHRoZSBzZWxlY3Rpb24gb2YgcHJvamVjdHMgdG8gZmlsdGVyIGJ5IG9uZSBvZiB0aGVtXG4gICAgICovXG4gICAgQElucHV0KCkgcHJvamVjdGZpbHRlcj86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW2ZpbHRlcmJ5cHJvamVjdF0gSWYgeW91ciBmdWxsLXRleHQgc2VhcmNoIHNob3VsZCBiZSBmaWx0ZXJlZCBieSBvbmUgcHJvamVjdCwgeW91IGNhbiBkZWZpbmUgaXQgd2l0aCBwcm9qZWN0IGlyaSBpbiB0aGUgcGFyYW1ldGVyIGZpbHRlcmJ5cHJvamVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJieXByb2plY3Q/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBbYWR2YW5jZWRdIEFkZHMgdGhlIGV4dGVuZGVkIC8gYWR2YW5jZWQgc2VhcmNoIHRvIHRoZSBwYW5lbFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGFkdmFuY2VkPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gW2V4cGVydF0gQWRkcyB0aGUgZXhwZXJ0IHNlYXJjaCAvIGdyYXZzZWFyY2ggZWRpdG9yIHRvIHRoZSBwYW5lbFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGV4cGVydD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBWaWV3Q2hpbGQoJ2Z1bGxTZWFyY2hQYW5lbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hQYW5lbDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaE1lbnUnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoTWVudTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvLyAgICBAVmlld0NoaWxkKCdleHBlcnRTZWFyY2hNZW51Jywge3N0YXRpYzpmYWxzZX0pIGV4cGVydE1lbnU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvLyBvdmVybGF5IHJlZmVyZW5jZVxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG5cbiAgICAvLyBzaG93IGFkdmFuY2VkIG9yIGV4cGVydCBzZWFyY2hcbiAgICBzaG93QWR2YW5jZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLCApIHsgfVxuXG4gICAgb3BlblBhbmVsV2l0aEJhY2tkcm9wKHR5cGU6IHN0cmluZykge1xuXG4gICAgICAgIHRoaXMuc2hvd0FkdmFuY2VkID0gKHR5cGUgPT09ICdhZHZhbmNlZCcpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgICAgICAgIC8vIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5zZWFyY2hNZW51LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKSk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9KSxcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVBvc2l0aW9uID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5zZWFyY2hQYW5lbCkud2l0aFBvc2l0aW9ucyhwb3NpdGlvbnMpLndpdGhMb2NrZWRQb3NpdGlvbihmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIG92ZXJsYXlQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBjbG9zZU1lbnUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG59XG4iXX0=