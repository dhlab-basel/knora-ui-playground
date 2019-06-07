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
    ExpertSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-expert-search',
                    template: "<div class=\"expert-search-container\">\n  <!-- The integration in container like the accordeon expansion panel should be handled on app side\n  <mat-expansion-panel [expanded]=\"true\">\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        Expert search\n      </mat-panel-title>\n      <mat-panel-description> </mat-panel-description>\n    </mat-expansion-panel-header>\n  -->\n  <form [formGroup]=\"expertSearchForm\" class=\"expert-search-form kui-form-content\">\n    <mat-form-field class=\"textarea-field large-field\">\n      <textarea matInput formControlName=\"gravquery\" matTextareaAutosize matAutosizeMinRows=\"12\" matAutosizeMaxRows=\"24\"\n                placeholder=\"Write your gravsearch query\"></textarea>\n    </mat-form-field>\n\n    <div class=\"kui-form-action\">\n      <button class=\"reset\" mat-button type=\"button\" (click)=\"resetForm()\">\n        Reset\n      </button>\n      <span class=\"fill-remaining-space\"></span>\n      <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!expertSearchForm.valid\"\n              (click)=\"submitQuery()\">\n        Search\n      </button>\n    </div>\n\n  </form>\n\n  <!-- </mat-expansion-panel> -->\n</div>\n",
                    styles: [".expert-search-container{min-height:100%}.expert-search-container .expert-search-form{min-width:150px;width:100%;margin:auto}.expert-search-container .expert-search-form .textarea-field{width:100%;display:block}.expert-search-container .expert-search-form .form-panel{width:100%}.mat-input-element{font-family:\"Courier New\",Courier,monospace}.form-content{margin:24px auto;width:472px}.form-content .large-field{min-width:472px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
                }] }
    ];
    /** @nocollapse */
    ExpertSearchComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: ActivatedRoute },
        { type: Router },
        { type: SearchService },
        { type: SearchParamsService },
        { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] }
    ]; };
    ExpertSearchComponent.propDecorators = {
        route: [{ type: Input }],
        gravsearch: [{ type: Output }]
    };
    return ExpertSearchComponent;
}());
export { ExpertSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4cGVydC1zZWFyY2gvZXhwZXJ0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFM0c7SUFtQkksK0JBQ1ksRUFBZSxFQUNmLE1BQXNCLEVBQ3RCLE9BQWUsRUFDZixjQUE2QixFQUM3QixvQkFBeUMsRUFDZCxNQUFNO1FBTGpDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUNkLFdBQU0sR0FBTixNQUFNLENBQUE7UUFiN0M7O1dBRUc7UUFDTyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQVc5QyxDQUFDO0lBRUwsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssd0NBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbEMsU0FBUyxFQUFFO2dCQUNQLG1HQUVNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRywrTkFVcEM7Z0JBQ2UsVUFBVSxDQUFDLFFBQVE7YUFDdEI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMkNBQVcsR0FBWDtRQUNJLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5QyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQy9GO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxrREFBa0IsR0FBMUIsVUFBMkIsTUFBa0I7UUFBbEIsdUJBQUEsRUFBQSxVQUFrQjtRQUN6QyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUV4RSwyQ0FBMkM7UUFDM0MsSUFBTSxjQUFjLEdBQUcsdUJBQ2IsTUFBTSxnQkFDZCxDQUFDO1FBRUgsMEVBQTBFO1FBQzFFLElBQU0sa0NBQWtDLEdBQUcsVUFDdkMsV0FBbUI7WUFFbkIsSUFBTSxvQkFBb0IsR0FBRywyQkFDbkIsV0FBVyxvQkFDbkIsQ0FBQztZQUVILE9BQU8sYUFBYSxHQUFHLG9CQUFvQixDQUFDO1FBQ2hELENBQUMsQ0FBQztRQUVGLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNkLHlGQUF5RjtZQUN6RixJQUFJLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLENBQzNDLElBQUksb0JBQW9CLENBQUMsa0NBQWtDLENBQUMsQ0FDL0QsQ0FBQztTQUNMO1FBQ0QsT0FBTyxhQUFhLEdBQUcsY0FBYyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7O2dCQTdHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsbXRDQUE2Qzs7aUJBRWhEOzs7O2dCQVJRLFdBQVc7Z0JBQ1gsY0FBYztnQkFBRSxNQUFNO2dCQUN5QyxhQUFhO2dCQUFsQyxtQkFBbUI7Z0RBMkI3RCxNQUFNLFNBQUMsa0JBQWtCOzs7d0JBZjdCLEtBQUs7NkJBS0wsTUFBTTs7SUErRlgsNEJBQUM7Q0FBQSxBQTlHRCxJQThHQztTQXpHWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEV4dGVuZGVkU2VhcmNoUGFyYW1zLCBLdWlDb3JlQ29uZmlnVG9rZW4sIFNlYXJjaFBhcmFtc1NlcnZpY2UsIFNlYXJjaFNlcnZpY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWV4cGVydC1zZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9leHBlcnQtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9leHBlcnQtc2VhcmNoLmNvbXBvbmVudC5zY3NzJywgJy4uL2Fzc2V0cy9zdHlsZS9zZWFyY2guc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEV4cGVydFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHJvdXRlIFJvdXRlIHRvIG5hdmlnYXRlIGFmdGVyIHNlYXJjaC4gVGhpcyByb3V0ZSBwYXRoIHNob3VsZCBjb250YWluIGEgY29tcG9uZW50IGZvciBzZWFyY2ggcmVzdWx0cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3V0ZT87XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaCBTZW5kIHRoZSBncmF2c2VhcmNoIHF1ZXJ5IGJhY2suXG4gICAgICovXG4gICAgQE91dHB1dCgpIGdyYXZzZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGV4cGVydFNlYXJjaEZvcm06IEZvcm1Hcm91cDtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEluaXRpYXRlIHRoZSBmb3JtIHdpdGggcHJlZGVmaW5lZCBHcmF2c2VhcmNoIHF1ZXJ5IGFzIGV4YW1wbGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0Rm9ybSgpIHtcbiAgICAgICAgdGhpcy5leHBlcnRTZWFyY2hGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBncmF2cXVlcnk6IFtcbiAgICAgICAgICAgICAgICBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5QUkVGSVggaW5jdW5hYnVsYTogPCR7dGhpcy5jb25maWcuYXBpfS9vbnRvbG9neS8wODAzL2luY3VuYWJ1bGEvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbiAgICA/Ym9vayBrbm9yYS1hcGk6aXNNYWluUmVzb3VyY2UgdHJ1ZSAuXG4gICAgP2Jvb2sgaW5jdW5hYnVsYTp0aXRsZSA/dGl0bGUgLlxuXG59IFdIRVJFIHtcbiAgICA/Ym9vayBhIGluY3VuYWJ1bGE6Ym9vayAuXG4gICAgP2Jvb2sgaW5jdW5hYnVsYTp0aXRsZSA/dGl0bGUgLlxufVxuYCxcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBTZW5kIHRoZSBncmF2c2VhcmNoIHF1ZXJ5IHRvIHRoZSByZXN1bHQgdmlldywgZWl0aGVyIHRocm91Z2ggdGhlIHJvdXRlIG9yIGJ5IGVtaXR0aW5nIHRoZSBncmF2c2VhcmNoIGFzIGFuIG91dHB1dC5cbiAgICAgKi9cbiAgICBzdWJtaXRRdWVyeSgpIHtcbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaCA9IHRoaXMuZ2VuZXJhdGVHcmF2c2VhcmNoKDApO1xuXG4gICAgICAgIGlmICh0aGlzLnJvdXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2V4dGVuZGVkLycsIGdyYXZzZWFyY2hdLCB7IHJlbGF0aXZlVG86IHRoaXMuX3JvdXRlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ncmF2c2VhcmNoLmVtaXQoZ3JhdnNlYXJjaCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogR2VuZXJhdGUgdGhlIHdob2xlIGdyYXZzZWFyY2ggcXVlcnkgbWF0Y2hpbmcgdGhlIHF1ZXJ5IGdpdmVuIGJ5IHRoZSBmb3JtLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVHcmF2c2VhcmNoKG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5VGVtcGxhdGUgPSB0aGlzLmV4cGVydFNlYXJjaEZvcm0uY29udHJvbHNbJ2dyYXZxdWVyeSddLnZhbHVlO1xuXG4gICAgICAgIC8vIG9mZnNldCBjb21wb25lbnQgb2YgdGhlIEdyYXZzZWFyY2ggcXVlcnlcbiAgICAgICAgY29uc3Qgb2Zmc2V0VGVtcGxhdGUgPSBgXG4gICAgICAgICBPRkZTRVQgJHtvZmZzZXR9XG4gICAgICAgICBgO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHRoZSBzYW1lIEdyYXZzZWFyY2ggcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFdpdGhDdXN0b21PZmZzZXQgPSAoXG4gICAgICAgICAgICBsb2NhbE9mZnNldDogbnVtYmVyXG4gICAgICAgICk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRDdXN0b21UZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgICBPRkZTRVQgJHtsb2NhbE9mZnNldH1cbiAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlUZW1wbGF0ZSArIG9mZnNldEN1c3RvbVRlbXBsYXRlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmdW5jdGlvbiBzbyBhbm90aGVyIEdyYXZzZWFyY2ggcXVlcnkgY2FuIGJlIGNyZWF0ZWQgd2l0aCBhbiBpbmNyZWFzZWQgb2Zmc2V0XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hQYXJhbXNTZXJ2aWNlLmNoYW5nZVNlYXJjaFBhcmFtc01zZyhcbiAgICAgICAgICAgICAgICBuZXcgRXh0ZW5kZWRTZWFyY2hQYXJhbXMoZ2VuZXJhdGVHcmF2c2VhcmNoV2l0aEN1c3RvbU9mZnNldClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXJ5VGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogUmVzZXQgdGhlIGZvcm0gdG8gdGhlIGluaXRpYWwgc3RhdGUuXG4gICAgICovXG4gICAgcmVzZXRGb3JtKCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgfVxufVxuIl19