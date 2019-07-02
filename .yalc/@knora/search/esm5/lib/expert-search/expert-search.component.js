import * as tslib_1 from "tslib";
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtendedSearchParams, KuiCoreConfigToken, SearchParamsService, SearchService } from '@knora/core';
var ExpertSearchComponent = /** @class */ (function () {
    function ExpertSearchComponent(fb, _route, _router, _searchService, _searchParamsService, config) {
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
    ExpertSearchComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    /**
     * @ignore
     * Initiate the form with predefined Gravsearch query as example.
     */
    ExpertSearchComponent.prototype.initForm = function () {
        this.expertSearchForm = this.fb.group({
            gravquery: [
                "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\nPREFIX incunabula: <" + this.config.api + "/ontology/0803/incunabula/simple/v2#>\n\nCONSTRUCT {\n    ?book knora-api:isMainResource true .\n    ?book incunabula:title ?title .\n\n} WHERE {\n    ?book a incunabula:book .\n    ?book incunabula:title ?title .\n}\n",
                Validators.required
            ]
        });
    };
    /**
     * @ignore
     * Send the gravsearch query to the result view, either through the route or by emitting the gravsearch as an output.
     */
    ExpertSearchComponent.prototype.submitQuery = function () {
        var gravsearch = this.generateGravsearch(0);
        if (this.route) {
            this._router.navigate([this.route + '/extended/', gravsearch], { relativeTo: this._route });
        }
        else {
            this.gravsearch.emit(gravsearch);
        }
        // toggle expert search form
        this.toggleExpertSearchForm.emit(true);
    };
    /**
     * @ignore
     * Generate the whole gravsearch query matching the query given by the form.
     */
    ExpertSearchComponent.prototype.generateGravsearch = function (offset) {
        if (offset === void 0) { offset = 0; }
        var queryTemplate = this.expertSearchForm.controls['gravquery'].value;
        // offset component of the Gravsearch query
        var offsetTemplate = "\n         OFFSET " + offset + "\n         ";
        // function that generates the same Gravsearch query with the given offset
        var generateGravsearchWithCustomOffset = function (localOffset) {
            var offsetCustomTemplate = "\n             OFFSET " + localOffset + "\n             ";
            return queryTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another Gravsearch query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchWithCustomOffset));
        }
        return queryTemplate + offsetTemplate;
    };
    /**
     * @ignore
     * Reset the form to the initial state.
     */
    ExpertSearchComponent.prototype.resetForm = function () {
        this.initForm();
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
    return ExpertSearchComponent;
}());
export { ExpertSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4cGVydC1zZWFyY2gvZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTzNHO0lBb0JJLCtCQUNZLEVBQWUsRUFDZixNQUFzQixFQUN0QixPQUFlLEVBQ2YsY0FBNkIsRUFDN0Isb0JBQXlDLEVBQ2QsTUFBTTtRQUxqQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBbkI3Qzs7V0FFRztRQUNPLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBR2xEOztXQUVHO1FBQ08sMkJBQXNCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQVczRCxDQUFDO0lBRUwsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssd0NBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbEMsU0FBUyxFQUFFO2dCQUNQLG1HQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRywrTkFVcEM7Z0JBQ2UsVUFBVSxDQUFDLFFBQVE7YUFDdEI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMkNBQVcsR0FBWDtRQUNJLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5QyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQy9GO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNwQztRQUVELDRCQUE0QjtRQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7SUFDSyxrREFBa0IsR0FBMUIsVUFBMkIsTUFBa0I7UUFBbEIsdUJBQUEsRUFBQSxVQUFrQjtRQUN6QyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUV4RSwyQ0FBMkM7UUFDM0MsSUFBTSxjQUFjLEdBQUcsdUJBQ2IsTUFBTSxnQkFDZCxDQUFDO1FBRUgsMEVBQTBFO1FBQzFFLElBQU0sa0NBQWtDLEdBQUcsVUFDdkMsV0FBbUI7WUFFbkIsSUFBTSxvQkFBb0IsR0FBRywyQkFDbkIsV0FBVyxvQkFDbkIsQ0FBQztZQUVILE9BQU8sYUFBYSxHQUFHLG9CQUFvQixDQUFDO1FBQ2hELENBQUMsQ0FBQztRQUVGLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNkLHlGQUF5RjtZQUN6RixJQUFJLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLENBQzNDLElBQUksb0JBQW9CLENBQUMsa0NBQWtDLENBQUMsQ0FDL0QsQ0FBQztTQUNMO1FBQ0QsT0FBTyxhQUFhLEdBQUcsY0FBYyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUE1R1E7UUFBUixLQUFLLEVBQUU7O3dEQUFRO0lBS047UUFBVCxNQUFNLEVBQUU7OzZEQUF5QztJQU14QztRQUFULE1BQU0sRUFBRTs7eUVBQXNEO0lBaEJ0RCxxQkFBcUI7UUFMakMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixtdENBQTZDOztTQUVoRCxDQUFDO1FBMkJPLG1CQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO2lEQUxmLFdBQVc7WUFDUCxjQUFjO1lBQ2IsTUFBTTtZQUNDLGFBQWE7WUFDUCxtQkFBbUI7T0F6QjVDLHFCQUFxQixDQWtIakM7SUFBRCw0QkFBQztDQUFBLEFBbEhELElBa0hDO1NBbEhZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIEt1aUNvcmVDb25maWdUb2tlbiwgU2VhcmNoUGFyYW1zU2VydmljZSwgU2VhcmNoU2VydmljZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktZXhwZXJ0LXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2V4cGVydC1zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2V4cGVydC1zZWFyY2guY29tcG9uZW50LnNjc3MnLCAnLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRXhwZXJ0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcm91dGUgUm91dGUgdG8gbmF2aWdhdGUgYWZ0ZXIgc2VhcmNoLiBUaGlzIHJvdXRlIHBhdGggc2hvdWxkIGNvbnRhaW4gYSBjb21wb25lbnQgZm9yIHNlYXJjaCByZXN1bHRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvdXRlPztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoIFNlbmQgdGhlIGdyYXZzZWFyY2ggcXVlcnkgYmFjay5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgZ3JhdnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSB0b2dnbGVFeHRlbmRlZFNlYXJjaEZvcm0gVHJpZ2dlciB0b2dnbGUgZm9yIGV4dGVuZGVkIHNlYXJjaCBmb3JtLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSB0b2dnbGVFeHBlcnRTZWFyY2hGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgZXhwZXJ0U2VhcmNoRm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoUGFyYW1zU2VydmljZTogU2VhcmNoUGFyYW1zU2VydmljZSxcbiAgICAgICAgQEluamVjdChLdWlDb3JlQ29uZmlnVG9rZW4pIHB1YmxpYyBjb25maWdcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdEZvcm0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogSW5pdGlhdGUgdGhlIGZvcm0gd2l0aCBwcmVkZWZpbmVkIEdyYXZzZWFyY2ggcXVlcnkgYXMgZXhhbXBsZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRGb3JtKCkge1xuICAgICAgICB0aGlzLmV4cGVydFNlYXJjaEZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGdyYXZxdWVyeTogW1xuICAgICAgICAgICAgICAgIGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblBSRUZJWCBpbmN1bmFidWxhOiA8JHt0aGlzLmNvbmZpZy5hcGl9L29udG9sb2d5LzA4MDMvaW5jdW5hYnVsYS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuICAgID9ib29rIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cbiAgICA/Ym9vayBpbmN1bmFidWxhOnRpdGxlID90aXRsZSAuXG5cbn0gV0hFUkUge1xuICAgID9ib29rIGEgaW5jdW5hYnVsYTpib29rIC5cbiAgICA/Ym9vayBpbmN1bmFidWxhOnRpdGxlID90aXRsZSAuXG59XG5gLFxuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIFNlbmQgdGhlIGdyYXZzZWFyY2ggcXVlcnkgdG8gdGhlIHJlc3VsdCB2aWV3LCBlaXRoZXIgdGhyb3VnaCB0aGUgcm91dGUgb3IgYnkgZW1pdHRpbmcgdGhlIGdyYXZzZWFyY2ggYXMgYW4gb3V0cHV0LlxuICAgICAqL1xuICAgIHN1Ym1pdFF1ZXJ5KCkge1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoID0gdGhpcy5nZW5lcmF0ZUdyYXZzZWFyY2goMCk7XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZXh0ZW5kZWQvJywgZ3JhdnNlYXJjaF0sIHsgcmVsYXRpdmVUbzogdGhpcy5fcm91dGUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyYXZzZWFyY2guZW1pdChncmF2c2VhcmNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZ2dsZSBleHBlcnQgc2VhcmNoIGZvcm1cbiAgICAgICAgdGhpcy50b2dnbGVFeHBlcnRTZWFyY2hGb3JtLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEdlbmVyYXRlIHRoZSB3aG9sZSBncmF2c2VhcmNoIHF1ZXJ5IG1hdGNoaW5nIHRoZSBxdWVyeSBnaXZlbiBieSB0aGUgZm9ybS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlR3JhdnNlYXJjaChvZmZzZXQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBxdWVyeVRlbXBsYXRlID0gdGhpcy5leHBlcnRTZWFyY2hGb3JtLmNvbnRyb2xzWydncmF2cXVlcnknXS52YWx1ZTtcblxuICAgICAgICAvLyBvZmZzZXQgY29tcG9uZW50IG9mIHRoZSBHcmF2c2VhcmNoIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuICAgICAgICAgT0ZGU0VUICR7b2Zmc2V0fVxuICAgICAgICAgYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBHcmF2c2VhcmNoIHF1ZXJ5IHdpdGggdGhlIGdpdmVuIG9mZnNldFxuICAgICAgICBjb25zdCBnZW5lcmF0ZUdyYXZzZWFyY2hXaXRoQ3VzdG9tT2Zmc2V0ID0gKFxuICAgICAgICAgICAgbG9jYWxPZmZzZXQ6IG51bWJlclxuICAgICAgICApOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0Q3VzdG9tVGVtcGxhdGUgPSBgXG4gICAgICAgICAgICAgT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG4gICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5VGVtcGxhdGUgKyBvZmZzZXRDdXN0b21UZW1wbGF0ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgZnVuY3Rpb24gc28gYW5vdGhlciBHcmF2c2VhcmNoIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2coXG4gICAgICAgICAgICAgICAgbmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFdpdGhDdXN0b21PZmZzZXQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVyeVRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIFJlc2V0IHRoZSBmb3JtIHRvIHRoZSBpbml0aWFsIHN0YXRlLlxuICAgICAqL1xuICAgIHJlc2V0Rm9ybSgpIHtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgIH1cbn1cbiJdfQ==