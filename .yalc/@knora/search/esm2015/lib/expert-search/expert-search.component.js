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
PREFIX incunabula: <${this.config.api}/ontology/0803/incunabula/simple/v2#>

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
        styles: [".expert-search-container{min-height:100%}.expert-search-container .expert-search-form{min-width:150px;width:100%;margin:auto}.expert-search-container .expert-search-form .textarea-field{width:100%;display:block;margin-bottom:24px}.expert-search-container .expert-search-form .form-panel{width:100%}.mat-input-element{font-family:\"Courier New\",Courier,monospace}.form-content{margin:24px auto;width:472px}.form-content .large-field{min-width:472px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:-webkit-inline-box;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:-webkit-inline-box;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:-webkit-inline-box;display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
    }),
    tslib_1.__param(5, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        Router,
        SearchService,
        SearchParamsService, Object])
], ExpertSearchComponent);
export { ExpertSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4cGVydC1zZWFyY2gvZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTzNHLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBb0I5QixZQUNZLEVBQWUsRUFDZixNQUFzQixFQUN0QixPQUFlLEVBQ2YsY0FBNkIsRUFDN0Isb0JBQXlDLEVBQ2QsTUFBTTtRQUxqQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBbkI3Qzs7V0FFRztRQUNPLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBR2xEOztXQUVHO1FBQ08sMkJBQXNCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQVczRCxDQUFDO0lBRUwsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssUUFBUTtRQUNaLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNsQyxTQUFTLEVBQUU7Z0JBQ1A7O3NCQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7Ozs7Ozs7OztDQVVwQztnQkFDZSxVQUFVLENBQUMsUUFBUTthQUN0QjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXO1FBQ1AsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDL0Y7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGtCQUFrQixDQUFDLFNBQWlCLENBQUM7UUFDekMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFeEUsMkNBQTJDO1FBQzNDLE1BQU0sY0FBYyxHQUFHO2tCQUNiLE1BQU07VUFDZCxDQUFDO1FBRUgsMEVBQTBFO1FBQzFFLE1BQU0sa0NBQWtDLEdBQUcsQ0FDdkMsV0FBbUIsRUFDYixFQUFFO1lBQ1IsTUFBTSxvQkFBb0IsR0FBRztzQkFDbkIsV0FBVztjQUNuQixDQUFDO1lBRUgsT0FBTyxhQUFhLEdBQUcsb0JBQW9CLENBQUM7UUFDaEQsQ0FBQyxDQUFDO1FBRUYsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2QseUZBQXlGO1lBQ3pGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FDM0MsSUFBSSxvQkFBb0IsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUMvRCxDQUFDO1NBQ0w7UUFDRCxPQUFPLGFBQWEsR0FBRyxjQUFjLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDTCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNKLENBQUE7QUE3R1k7SUFBUixLQUFLLEVBQUU7O29EQUFRO0FBS047SUFBVCxNQUFNLEVBQUU7O3lEQUF5QztBQU14QztJQUFULE1BQU0sRUFBRTs7cUVBQXNEO0FBaEJ0RCxxQkFBcUI7SUFMakMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixtdENBQTZDOztLQUVoRCxDQUFDO0lBMkJPLG1CQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBOzZDQUxmLFdBQVc7UUFDUCxjQUFjO1FBQ2IsTUFBTTtRQUNDLGFBQWE7UUFDUCxtQkFBbUI7R0F6QjVDLHFCQUFxQixDQWtIakM7U0FsSFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgS3VpQ29yZUNvbmZpZ1Rva2VuLCBTZWFyY2hQYXJhbXNTZXJ2aWNlLCBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1leHBlcnQtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuc2NzcycsICcuLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFeHBlcnRTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSByb3V0ZSBSb3V0ZSB0byBuYXZpZ2F0ZSBhZnRlciBzZWFyY2guIFRoaXMgcm91dGUgcGF0aCBzaG91bGQgY29udGFpbiBhIGNvbXBvbmVudCBmb3Igc2VhcmNoIHJlc3VsdHMuXG4gICAgICovXG4gICAgQElucHV0KCkgcm91dGU/O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2ggU2VuZCB0aGUgZ3JhdnNlYXJjaCBxdWVyeSBiYWNrLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBncmF2c2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IHRvZ2dsZUV4dGVuZGVkU2VhcmNoRm9ybSBUcmlnZ2VyIHRvZ2dsZSBmb3IgZXh0ZW5kZWQgc2VhcmNoIGZvcm0uXG4gICAgICovXG4gICAgQE91dHB1dCgpIHRvZ2dsZUV4cGVydFNlYXJjaEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBleHBlcnRTZWFyY2hGb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZ1xuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBJbml0aWF0ZSB0aGUgZm9ybSB3aXRoIHByZWRlZmluZWQgR3JhdnNlYXJjaCBxdWVyeSBhcyBleGFtcGxlLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEZvcm0oKSB7XG4gICAgICAgIHRoaXMuZXhwZXJ0U2VhcmNoRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgZ3JhdnF1ZXJ5OiBbXG4gICAgICAgICAgICAgICAgYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuUFJFRklYIGluY3VuYWJ1bGE6IDwke3RoaXMuY29uZmlnLmFwaX0vb250b2xvZ3kvMDgwMy9pbmN1bmFidWxhL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4gICAgP2Jvb2sga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuICAgID9ib29rIGluY3VuYWJ1bGE6dGl0bGUgP3RpdGxlIC5cblxufSBXSEVSRSB7XG4gICAgP2Jvb2sgYSBpbmN1bmFidWxhOmJvb2sgLlxuICAgID9ib29rIGluY3VuYWJ1bGE6dGl0bGUgP3RpdGxlIC5cbn1cbmAsXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZFxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogU2VuZCB0aGUgZ3JhdnNlYXJjaCBxdWVyeSB0byB0aGUgcmVzdWx0IHZpZXcsIGVpdGhlciB0aHJvdWdoIHRoZSByb3V0ZSBvciBieSBlbWl0dGluZyB0aGUgZ3JhdnNlYXJjaCBhcyBhbiBvdXRwdXQuXG4gICAgICovXG4gICAgc3VibWl0UXVlcnkoKSB7XG4gICAgICAgIGNvbnN0IGdyYXZzZWFyY2ggPSB0aGlzLmdlbmVyYXRlR3JhdnNlYXJjaCgwKTtcblxuICAgICAgICBpZiAodGhpcy5yb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlICsgJy9leHRlbmRlZC8nLCBncmF2c2VhcmNoXSwgeyByZWxhdGl2ZVRvOiB0aGlzLl9yb3V0ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhdnNlYXJjaC5lbWl0KGdyYXZzZWFyY2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlIGV4cGVydCBzZWFyY2ggZm9ybVxuICAgICAgICB0aGlzLnRvZ2dsZUV4cGVydFNlYXJjaEZvcm0uZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogR2VuZXJhdGUgdGhlIHdob2xlIGdyYXZzZWFyY2ggcXVlcnkgbWF0Y2hpbmcgdGhlIHF1ZXJ5IGdpdmVuIGJ5IHRoZSBmb3JtLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVHcmF2c2VhcmNoKG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5VGVtcGxhdGUgPSB0aGlzLmV4cGVydFNlYXJjaEZvcm0uY29udHJvbHNbJ2dyYXZxdWVyeSddLnZhbHVlO1xuXG4gICAgICAgIC8vIG9mZnNldCBjb21wb25lbnQgb2YgdGhlIEdyYXZzZWFyY2ggcXVlcnlcbiAgICAgICAgY29uc3Qgb2Zmc2V0VGVtcGxhdGUgPSBgXG4gICAgICAgICBPRkZTRVQgJHtvZmZzZXR9XG4gICAgICAgICBgO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHRoZSBzYW1lIEdyYXZzZWFyY2ggcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFdpdGhDdXN0b21PZmZzZXQgPSAoXG4gICAgICAgICAgICBsb2NhbE9mZnNldDogbnVtYmVyXG4gICAgICAgICk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRDdXN0b21UZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgICBPRkZTRVQgJHtsb2NhbE9mZnNldH1cbiAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlUZW1wbGF0ZSArIG9mZnNldEN1c3RvbVRlbXBsYXRlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmdW5jdGlvbiBzbyBhbm90aGVyIEdyYXZzZWFyY2ggcXVlcnkgY2FuIGJlIGNyZWF0ZWQgd2l0aCBhbiBpbmNyZWFzZWQgb2Zmc2V0XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hQYXJhbXNTZXJ2aWNlLmNoYW5nZVNlYXJjaFBhcmFtc01zZyhcbiAgICAgICAgICAgICAgICBuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoZ2VuZXJhdGVHcmF2c2VhcmNoV2l0aEN1c3RvbU9mZnNldClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXJ5VGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogUmVzZXQgdGhlIGZvcm0gdG8gdGhlIGluaXRpYWwgc3RhdGUuXG4gICAgICovXG4gICAgcmVzZXRGb3JtKCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgfVxufVxuIl19