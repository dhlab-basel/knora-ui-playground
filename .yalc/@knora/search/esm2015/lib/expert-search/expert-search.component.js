import * as tslib_1 from "tslib";
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtendedSearchParams, KuiCoreConfigToken, SearchParamsService, SearchService } from '@knora/core';
let ExpertSearchComponent = class ExpertSearchComponent {
    constructor(fb, _route, _router, _searchService, _searchParamsService, config) {
        this.fb = fb;
        this._route = _route;
        this._router = _router;
        this._searchService = _searchService;
        this._searchParamsService = _searchParamsService;
        this.config = config;
        /**
         * @param gravsearch Send the gravsearch query back.
         */
        this.gravsearch = new EventEmitter();
        /**
         * @param  {boolean} toggleExtendedSearchForm Trigger toggle for extended search form.
         */
        this.toggleExpertSearchForm = new EventEmitter();
    }
    ngOnInit() {
        this.initForm();
    }
    /**
     * @ignore
     * Initiate the form with predefined Gravsearch query as example.
     */
    initForm() {
        this.expertSearchForm = this.fb.group({
            gravquery: [
                `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
PREFIX incunabula: <${this.config.ontologyIRI}/ontology/0803/incunabula/simple/v2#>

CONSTRUCT {
    ?book knora-api:isMainResource true .
    ?book incunabula:title ?title .

} WHERE {
    ?book a incunabula:book .
    ?book incunabula:title ?title .
}
`,
                Validators.required
            ]
        });
    }
    /**
     * @ignore
     * Send the gravsearch query to the result view, either through the route or by emitting the gravsearch as an output.
     */
    submitQuery() {
        const gravsearch = this.generateGravsearch(0);
        if (this.route) {
            this._router.navigate([this.route + '/extended/', gravsearch], { relativeTo: this._route });
        }
        else {
            this.gravsearch.emit(gravsearch);
        }
        // toggle expert search form
        this.toggleExpertSearchForm.emit(true);
    }
    /**
     * @ignore
     * Generate the whole gravsearch query matching the query given by the form.
     */
    generateGravsearch(offset = 0) {
        const queryTemplate = this.expertSearchForm.controls['gravquery'].value;
        // offset component of the Gravsearch query
        const offsetTemplate = `
         OFFSET ${offset}
         `;
        // function that generates the same Gravsearch query with the given offset
        const generateGravsearchWithCustomOffset = (localOffset) => {
            const offsetCustomTemplate = `
             OFFSET ${localOffset}
             `;
            return queryTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another Gravsearch query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchWithCustomOffset));
        }
        return queryTemplate + offsetTemplate;
    }
    /**
     * @ignore
     * Reset the form to the initial state.
     */
    resetForm() {
        this.initForm();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ExpertSearchComponent.prototype, "route", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], ExpertSearchComponent.prototype, "gravsearch", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], ExpertSearchComponent.prototype, "toggleExpertSearchForm", void 0);
ExpertSearchComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-expert-search',
        template: "<div class=\"expert-search-container\">\n  <!-- The integration in container like the accordeon expansion panel should be handled on app side\n  <mat-expansion-panel [expanded]=\"true\">\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        Expert search\n      </mat-panel-title>\n      <mat-panel-description> </mat-panel-description>\n    </mat-expansion-panel-header>\n  -->\n  <form [formGroup]=\"expertSearchForm\" class=\"expert-search-form kui-form-content\">\n    <mat-form-field class=\"textarea-field large-field\">\n      <textarea matInput formControlName=\"gravquery\" matTextareaAutosize matAutosizeMinRows=\"12\" matAutosizeMaxRows=\"24\"\n                placeholder=\"Write your gravsearch query\"></textarea>\n    </mat-form-field>\n\n    <div class=\"kui-form-action\">\n      <button class=\"reset\" mat-button type=\"button\" (click)=\"resetForm()\">\n        Reset\n      </button>\n      <span class=\"fill-remaining-space\"></span>\n      <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!expertSearchForm.valid\"\n              (click)=\"submitQuery()\">\n        Search\n      </button>\n    </div>\n\n  </form>\n\n  <!-- </mat-expansion-panel> -->\n</div>\n",
        styles: [".expert-search-container{min-height:100%}.expert-search-container .expert-search-form{min-width:150px;width:100%;margin:auto}.expert-search-container .expert-search-form .textarea-field{width:100%;display:block;margin-bottom:24px}.expert-search-container .expert-search-form .form-panel{width:100%}.mat-input-element{font-family:\"Courier New\",Courier,monospace}.form-content{margin:24px auto;width:472px}.form-content .large-field{min-width:472px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
    }),
    tslib_1.__param(5, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        Router,
        SearchService,
        SearchParamsService, Object])
], ExpertSearchComponent);
export { ExpertSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4cGVydC1zZWFyY2gvZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTzNHLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBb0I5QixZQUNZLEVBQWUsRUFDZixNQUFzQixFQUN0QixPQUFlLEVBQ2YsY0FBNkIsRUFDN0Isb0JBQXlDLEVBQ2QsTUFBTTtRQUxqQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBbkI3Qzs7V0FFRztRQUNPLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBR2xEOztXQUVHO1FBQ08sMkJBQXNCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQVczRCxDQUFDO0lBRUwsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssUUFBUTtRQUNaLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNsQyxTQUFTLEVBQUU7Z0JBQ1A7O3NCQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVzs7Ozs7Ozs7OztDQVU1QztnQkFDZSxVQUFVLENBQUMsUUFBUTthQUN0QjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXO1FBQ1AsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDL0Y7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGtCQUFrQixDQUFDLFNBQWlCLENBQUM7UUFDekMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFeEUsMkNBQTJDO1FBQzNDLE1BQU0sY0FBYyxHQUFHO2tCQUNiLE1BQU07VUFDZCxDQUFDO1FBRUgsMEVBQTBFO1FBQzFFLE1BQU0sa0NBQWtDLEdBQUcsQ0FDdkMsV0FBbUIsRUFDYixFQUFFO1lBQ1IsTUFBTSxvQkFBb0IsR0FBRztzQkFDbkIsV0FBVztjQUNuQixDQUFDO1lBRUgsT0FBTyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7UUFDaEQsQ0FBQyxDQUFDO1FBRUYsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2QseUZBQXlGO1lBQ3pGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FDM0MsSUFBSSxvQkFBb0IsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUMvRCxDQUFDO1NBQ0w7UUFDRCxPQUFPLGFBQWEsR0FBRyxjQUFjLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDTCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNKLENBQUE7QUE3R1k7SUFBUixLQUFLLEVBQUU7O29EQUFRO0FBS047SUFBVCxNQUFNLEVBQUU7O3lEQUF5QztBQU14QztJQUFULE1BQU0sRUFBRTs7cUVBQXNEO0FBaEJ0RCxxQkFBcUI7SUFMakMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixtdENBQTZDOztLQUVoRCxDQUFDO0lBMkJPLG1CQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBOzZDQUxmLFdBQVc7UUFDUCxjQUFjO1FBQ2IsTUFBTTtRQUNDLGFBQWE7UUFDUCxtQkFBbUI7R0F6QjVDLHFCQUFxQixDQWtIakM7U0FsSFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgS3VpQ29yZUNvbmZpZ1Rva2VuLCBTZWFyY2hQYXJhbXNTZXJ2aWNlLCBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1leHBlcnQtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuc2NzcycsICcuLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFeHBlcnRTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSByb3V0ZSBSb3V0ZSB0byBuYXZpZ2F0ZSBhZnRlciBzZWFyY2guIFRoaXMgcm91dGUgcGF0aCBzaG91bGQgY29udGFpbiBhIGNvbXBvbmVudCBmb3Igc2VhcmNoIHJlc3VsdHMuXG4gICAgICovXG4gICAgQElucHV0KCkgcm91dGU/O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2ggU2VuZCB0aGUgZ3JhdnNlYXJjaCBxdWVyeSBiYWNrLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBncmF2c2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IHRvZ2dsZUV4dGVuZGVkU2VhcmNoRm9ybSBUcmlnZ2VyIHRvZ2dsZSBmb3IgZXh0ZW5kZWQgc2VhcmNoIGZvcm0uXG4gICAgICovXG4gICAgQE91dHB1dCgpIHRvZ2dsZUV4cGVydFNlYXJjaEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBleHBlcnRTZWFyY2hGb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEluaXRpYXRlIHRoZSBmb3JtIHdpdGggcHJlZGVmaW5lZCBHcmF2c2VhcmNoIHF1ZXJ5IGFzIGV4YW1wbGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0Rm9ybSgpIHtcbiAgICAgICAgdGhpcy5leHBlcnRTZWFyY2hGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBncmF2cXVlcnk6IFtcbiAgICAgICAgICAgICAgICBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5QUkVGSVggaW5jdW5hYnVsYTogPCR7dGhpcy5jb25maWcub250b2xvZ3lJUkl9L29udG9sb2d5LzA4MDMvaW5jdW5hYnVsYS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuICAgID9ib29rIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cbiAgICA/Ym9vayBpbmN1bmFidWxhOnRpdGxlID90aXRsZSAuXG5cbn0gV0hFUkUge1xuICAgID9ib29rIGEgaW5jdW5hYnVsYTpib29rIC5cbiAgICA/Ym9vayBpbmN1bmFidWxhOnRpdGxlID90aXRsZSAuXG59XG5gLFxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIFNlbmQgdGhlIGdyYXZzZWFyY2ggcXVlcnkgdG8gdGhlIHJlc3VsdCB2aWV3LCBlaXRoZXIgdGhyb3VnaCB0aGUgcm91dGUgb3IgYnkgZW1pdHRpbmcgdGhlIGdyYXZzZWFyY2ggYXMgYW4gb3V0cHV0LlxuICAgICAqL1xuICAgIHN1Ym1pdFF1ZXJ5KCkge1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoID0gdGhpcy5nZW5lcmF0ZUdyYXZzZWFyY2goMCk7XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZXh0ZW5kZWQvJywgZ3JhdnNlYXJjaF0sIHsgcmVsYXRpdmVUbzogdGhpcy5fcm91dGUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyYXZzZWFyY2guZW1pdChncmF2c2VhcmNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZ2dsZSBleHBlcnQgc2VhcmNoIGZvcm1cbiAgICAgICAgdGhpcy50b2dnbGVFeHBlcnRTZWFyY2hGb3JtLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEdlbmVyYXRlIHRoZSB3aG9sZSBncmF2c2VhcmNoIHF1ZXJ5IG1hdGNoaW5nIHRoZSBxdWVyeSBnaXZlbiBieSB0aGUgZm9ybS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlR3JhdnNlYXJjaChvZmZzZXQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBxdWVyeVRlbXBsYXRlID0gdGhpcy5leHBlcnRTZWFyY2hGb3JtLmNvbnRyb2xzWydncmF2cXVlcnknXS52YWx1ZTtcblxuICAgICAgICAvLyBvZmZzZXQgY29tcG9uZW50IG9mIHRoZSBHcmF2c2VhcmNoIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuICAgICAgICAgT0ZGU0VUICR7b2Zmc2V0fVxuICAgICAgICAgYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBHcmF2c2VhcmNoIHF1ZXJ5IHdpdGggdGhlIGdpdmVuIG9mZnNldFxuICAgICAgICBjb25zdCBnZW5lcmF0ZUdyYXZzZWFyY2hXaXRoQ3VzdG9tT2Zmc2V0ID0gKFxuICAgICAgICAgICAgbG9jYWxPZmZzZXQ6IG51bWJlclxuICAgICAgICApOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0Q3VzdG9tVGVtcGxhdGUgPSBgXG4gICAgICAgICAgICAgT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG4gICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5VGVtcGxhdGUgKyBvZmZzZXRDdXN0b21UZW1wbGF0ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgZnVuY3Rpb24gc28gYW5vdGhlciBHcmF2c2VhcmNoIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2coXG4gICAgICAgICAgICAgICAgbmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFdpdGhDdXN0b21PZmZzZXQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVyeVRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIFJlc2V0IHRoZSBmb3JtIHRvIHRoZSBpbml0aWFsIHN0YXRlLlxuICAgICAqL1xuICAgIHJlc2V0Rm9ybSgpIHtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgIH1cbn1cbiJdfQ==