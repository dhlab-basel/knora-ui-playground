import * as tslib_1 from "tslib";
import { Component, EventEmitter, Inject, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { GravsearchGenerationService, OntologyCacheService, ReadResourcesSequence } from '@knora/core';
import { SelectResourceClassComponent } from './select-resource-class/select-resource-class.component';
/**
 * The extended search allows you to filter by project, by source type (resource class), or by the metadata (properties) of source types. Each filter can be standalone or combined. The metadata field can be precisely filtered with criteria such as "contains", "like", "equals to", "exists" or in case of a date value with "before" or "after". In addition, for a metadata field that is connected to another source type, it's possible to filter by this second source type. If you are looking for the source type "Photograph" with the metadata field "Photographer", which is connected to source type "Person", you can search for photograph(s) taken by person(s) who is born before February 1970. The result of this request will be an intersection of the two source types.
 */
var ExtendedSearchComponent = /** @class */ (function () {
    function ExtendedSearchComponent(fb, _route, _router, _cacheService, _gravSearchService) {
        this.fb = fb;
        this._route = _route;
        this._router = _router;
        this._cacheService = _cacheService;
        this._gravSearchService = _gravSearchService;
        /**
         * @param  {boolean} toggleExtendedSearchForm Trigger toggle for extended search form.
         */
        this.toggleExtendedSearchForm = new EventEmitter();
        /**
         * @param  {string} gravsearch Send the gravsearch query back.
         */
        this.gravsearch = new EventEmitter();
        // all available ontologies
        this.ontologies = [];
        // properties specified by the user
        this.activeProperties = [];
        // resource classes for the selected ontology
        this.resourceClasses = [];
        this.result = new ReadResourcesSequence([], 0);
        // form validation status
        this.formValid = false;
    }
    ExtendedSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        // parent form is empty, it gets passed to the child components
        this.form = this.fb.group({});
        // if form status changes, re-run validation
        this.form.statusChanges.subscribe(function (data) {
            _this.formValid = _this.validateForm();
            // console.log(this.form);
        });
        // initialize ontologies to be used for the ontologies selection in the search form
        this.initializeOntologies();
    };
    /**
     * @ignore
     * Add a property to the search form.
     * @returns void
     */
    ExtendedSearchComponent.prototype.addProperty = function () {
        this.activeProperties.push(true);
    };
    /**
     * @ignore
     * Remove the last property from the search form.
     * @returns void
     */
    ExtendedSearchComponent.prototype.removeProperty = function () {
        this.activeProperties.splice(-1, 1);
    };
    /**
     * @ignore
     * Gets all available ontologies for the search form.
     * @returns void
     */
    ExtendedSearchComponent.prototype.initializeOntologies = function () {
        var _this = this;
        this._cacheService.getOntologiesMetadata().subscribe(function (ontologies) {
            _this.ontologies = ontologies;
        });
    };
    /**
     * @ignore
     * Once an ontology has been selected, gets its classes and properties.
     * The classes and properties will be made available to the user for selection.
     *
     * @param ontologyIri Iri of the ontology chosen by the user.
     * @returns void
     */
    ExtendedSearchComponent.prototype.getResourceClassesAndPropertiesForOntology = function (ontologyIri) {
        var _this = this;
        // reset active resource class definition
        this.activeResourceClass = undefined;
        // reset specified properties
        this.activeProperties = [];
        this.activeOntology = ontologyIri;
        this._cacheService.getEntityDefinitionsForOntologies([ontologyIri]).subscribe(function (ontoInfo) {
            _this.resourceClasses = ontoInfo.getResourceClassesAsArray(true);
            _this.properties = ontoInfo.getProperties();
        });
    };
    /**
     * @ignore
     * Once a resource class has been selected, gets its properties.
     * The properties will be made available to the user for selection.
     *
     * @param resourceClassIri
     * @returns void
     */
    ExtendedSearchComponent.prototype.getPropertiesForResourceClass = function (resourceClassIri) {
        var _this = this;
        // reset specified properties
        this.activeProperties = [];
        // if the client undoes the selection of a resource class, use the active ontology as a fallback
        if (resourceClassIri === null) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        }
        else {
            this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe(function (ontoInfo) {
                _this.properties = ontoInfo.getProperties();
                _this.activeResourceClass = ontoInfo.getResourceClasses()[resourceClassIri];
            });
        }
    };
    /**
     * @ignore
     * Validates form and returns its status (boolean).
     */
    ExtendedSearchComponent.prototype.validateForm = function () {
        // check that either a resource class is selected or at least one property is specified
        return this.form.valid &&
            (this.propertyComponents.length > 0 || (this.resourceClassComponent !== undefined && this.resourceClassComponent.getResourceClassSelected() !== false));
    };
    /**
     * @ignore
     * Resets the form (selected resource class and specified properties) preserving the active ontology.
     */
    ExtendedSearchComponent.prototype.resetForm = function () {
        if (this.activeOntology !== undefined) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        }
    };
    /**
     * @ignore
     * Creates a GravSearch query with the given form values and calls the extended search route.
     */
    ExtendedSearchComponent.prototype.submit = function () {
        if (!this.formValid)
            return; // check that from is valid
        var resClassOption = this.resourceClassComponent.getResourceClassSelected();
        var resClass;
        if (resClassOption !== false) {
            resClass = resClassOption;
        }
        var properties = this.propertyComponents.map(function (propComp) {
            return propComp.getPropertySelectedWithValue();
        });
        var gravsearch = this._gravSearchService.createGravsearchQuery(properties, resClass, 0);
        if (this.route) {
            this._router.navigate([this.route + '/extended/', gravsearch], { relativeTo: this._route });
        }
        else {
            this.gravsearch.emit(gravsearch);
        }
        // toggle extended search form
        this.toggleExtendedSearchForm.emit(true);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ExtendedSearchComponent.prototype, "route", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ExtendedSearchComponent.prototype, "toggleExtendedSearchForm", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ExtendedSearchComponent.prototype, "gravsearch", void 0);
    tslib_1.__decorate([
        ViewChild('resourceClass', { static: false }),
        tslib_1.__metadata("design:type", SelectResourceClassComponent)
    ], ExtendedSearchComponent.prototype, "resourceClassComponent", void 0);
    tslib_1.__decorate([
        ViewChildren('property'),
        tslib_1.__metadata("design:type", QueryList)
    ], ExtendedSearchComponent.prototype, "propertyComponents", void 0);
    ExtendedSearchComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-extended-search',
            template: "<form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"kui-form-content\">\n\n  <div>\n    <kui-select-ontology *ngIf=\"ontologies.length > 0\" [formGroup]=\"form\" [ontologies]=\"ontologies\"\n                         (ontologySelected)=\"getResourceClassesAndPropertiesForOntology($event)\"></kui-select-ontology>\n  </div>\n\n  <div class=\"select-resource-class\" *ngIf=\"resourceClasses?.length > 0\">\n    <kui-select-resource-class #resourceClass [formGroup]=\"form\" [resourceClasses]=\"resourceClasses\"\n                               (resourceClassSelectedEvent)=\"getPropertiesForResourceClass($event)\">\n    </kui-select-resource-class>\n  </div>\n\n  <div class=\"select-property\" *ngIf=\"properties !== undefined\">\n    <div *ngFor=\"let prop of activeProperties; let i = index\">\n\n      <kui-select-property #property [activeResourceClass]=\"activeResourceClass\" [formGroup]=\"form\" [index]=\"i\"\n                           [properties]=\"properties\"></kui-select-property>\n\n    </div>\n  </div>\n\n\n  <div class=\"select-property buttons\">\n    <button mat-mini-fab class=\"property-button add-property-button\" color=\"primary\" type=\"button\"\n            (click)=\"addProperty()\" [disabled]=\"activeOntology === undefined || activeProperties.length >= 4\">\n      <mat-icon aria-label=\"add a property\">add</mat-icon>\n    </button>\n\n    <button mat-mini-fab class=\"property-button remove-property-button\" color=\"primary\" type=\"button\"\n            (click)=\"removeProperty()\" [disabled]=\"activeProperties.length == 0\">\n      <mat-icon aria-label=\"remove property\">remove</mat-icon>\n    </button>\n  </div>\n\n  <!--  <div>\n    <button mat-icon-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n      <mat-icon aria-label=\"reset query form\">clear</mat-icon>\n    </button>\n\n    <button mat-icon-button type=\"submit\" [disabled]=\"!formValid\">\n      <mat-icon aria-label=\"submit query\">send</mat-icon>\n    </button>\n  </div> -->\n\n  <div class=\"kui-form-action\">\n    <button class=\"reset\" mat-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n      Reset\n    </button>\n    <span class=\"fill-remaining-space\"></span>\n    <button class=\"extended-search-button\" mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!formValid\">\n      Search\n    </button>\n  </div>\n\n</form>\n",
            styles: [".select-resource-class{margin-left:8px}.select-property{margin-left:16px}.select-property .property-button{margin:0 12px 64px 0}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:-webkit-inline-box;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:-webkit-inline-box;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:-webkit-inline-box;display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
        }),
        tslib_1.__param(0, Inject(FormBuilder)),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            Router,
            OntologyCacheService,
            GravsearchGenerationService])
    ], ExtendedSearchComponent);
    return ExtendedSearchComponent;
}());
export { ExtendedSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL2V4dGVuZGVkLXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFDSCwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBS3BCLHFCQUFxQixFQUV4QixNQUFNLGFBQWEsQ0FBQztBQUVyQixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUV2Rzs7R0FFRztBQU1IO0lBaURJLGlDQUF5QyxFQUFlLEVBQzVDLE1BQXNCLEVBQ3RCLE9BQWUsRUFDZixhQUFtQyxFQUNuQyxrQkFBK0M7UUFKbEIsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUM1QyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2Ysa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBNkI7UUE5QzNEOztXQUVHO1FBQ08sNkJBQXdCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUVqRTs7V0FFRztRQUNPLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRWxELDJCQUEyQjtRQUMzQixlQUFVLEdBQTRCLEVBQUUsQ0FBQztRQUt6QyxtQ0FBbUM7UUFDbkMscUJBQWdCLEdBQWMsRUFBRSxDQUFDO1FBRWpDLDZD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Qy9GO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNwQztRQUVELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdDLENBQUM7SUFwTlE7UUFBUixLQUFLLEVBQUU7OzBEQUFRO0lBS047UUFBVCxNQUFNLEVBQUU7OzZFQUF3RDtJQUt2RDtRQUFULE1BQU0sRUFBRTs7K0RBQXlDO0lBdUJIO1FBQTlDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQXlCLDRCQUE0QjsyRUFBQztJQUcxRTtRQUF6QixZQUFZLENBQUMsVUFBVSxDQUFDOzBDQUFxQixTQUFTO3VFQUEwQjtJQXpDeEUsdUJBQXVCO1FBTG5DLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsNDZFQUErQzs7U0FFbEQsQ0FBQztRQWtEZSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7aURBQWEsV0FBVztZQUNwQyxjQUFjO1lBQ2IsTUFBTTtZQUNBLG9CQUFvQjtZQUNmLDJCQUEyQjtPQXJEbEQsdUJBQXVCLENBMk5uQztJQUFELDhCQUFDO0NBQUEsQUEzTkQsSUEyTkM7U0EzTlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSxcbiAgICBPbnRvbG9neUNhY2hlU2VydmljZSxcbiAgICBPbnRvbG9neUluZm9ybWF0aW9uLFxuICAgIE9udG9sb2d5TWV0YWRhdGEsXG4gICAgUHJvcGVydGllcyxcbiAgICBQcm9wZXJ0eVdpdGhWYWx1ZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVzb3VyY2VDbGFzc1xufSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RQcm9wZXJ0eUNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXByb3BlcnR5L3NlbGVjdC1wcm9wZXJ0eS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0UmVzb3VyY2VDbGFzc0NvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXJlc291cmNlLWNsYXNzL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy5jb21wb25lbnQnO1xuXG4vKipcbiAqIFRoZSBleHRlbmRlZCBzZWFyY2ggYWxsb3dzIHlvdSB0byBmaWx0ZXIgYnkgcHJvamVjdCwgYnkgc291cmNlIHR5cGUgKHJlc291cmNlIGNsYXNzKSwgb3IgYnkgdGhlIG1ldGFkYXRhIChwcm9wZXJ0aWVzKSBvZiBzb3VyY2UgdHlwZXMuIEVhY2ggZmlsdGVyIGNhbiBiZSBzdGFuZGFsb25lIG9yIGNvbWJpbmVkLiBUaGUgbWV0YWRhdGEgZmllbGQgY2FuIGJlIHByZWNpc2VseSBmaWx0ZXJlZCB3aXRoIGNyaXRlcmlhIHN1Y2ggYXMgXCJjb250YWluc1wiLCBcImxpa2VcIiwgXCJlcXVhbHMgdG9cIiwgXCJleGlzdHNcIiBvciBpbiBjYXNlIG9mIGEgZGF0ZSB2YWx1ZSB3aXRoIFwiYmVmb3JlXCIgb3IgXCJhZnRlclwiLiBJbiBhZGRpdGlvbiwgZm9yIGEgbWV0YWRhdGEgZmllbGQgdGhhdCBpcyBjb25uZWN0ZWQgdG8gYW5vdGhlciBzb3VyY2UgdHlwZSwgaXQncyBwb3NzaWJsZSB0byBmaWx0ZXIgYnkgdGhpcyBzZWNvbmQgc291cmNlIHR5cGUuIElmIHlvdSBhcmUgbG9va2luZyBmb3IgdGhlIHNvdXJjZSB0eXBlIFwiUGhvdG9ncmFwaFwiIHdpdGggdGhlIG1ldGFkYXRhIGZpZWxkIFwiUGhvdG9ncmFwaGVyXCIsIHdoaWNoIGlzIGNvbm5lY3RlZCB0byBzb3VyY2UgdHlwZSBcIlBlcnNvblwiLCB5b3UgY2FuIHNlYXJjaCBmb3IgcGhvdG9ncmFwaChzKSB0YWtlbiBieSBwZXJzb24ocykgd2hvIGlzIGJvcm4gYmVmb3JlIEZlYnJ1YXJ5IDE5NzAuIFRoZSByZXN1bHQgb2YgdGhpcyByZXF1ZXN0IHdpbGwgYmUgYW4gaW50ZXJzZWN0aW9uIG9mIHRoZSB0d28gc291cmNlIHR5cGVzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1leHRlbmRlZC1zZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9leHRlbmRlZC1zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2V4dGVuZGVkLXNlYXJjaC5jb21wb25lbnQuc2NzcycsICcuLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHJvdXRlIFJvdXRlIHRvIG5hdmlnYXRlIGFmdGVyIHNlYXJjaC4gVGhpcyByb3V0ZSBwYXRoIHNob3VsZCBjb250YWluIGEgY29tcG9uZW50IGZvciBzZWFyY2ggcmVzdWx0cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3V0ZT87XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSB0b2dnbGVFeHRlbmRlZFNlYXJjaEZvcm0gVHJpZ2dlciB0b2dnbGUgZm9yIGV4dGVuZGVkIHNlYXJjaCBmb3JtLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSB0b2dnbGVFeHRlbmRlZFNlYXJjaEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGdyYXZzZWFyY2ggU2VuZCB0aGUgZ3JhdnNlYXJjaCBxdWVyeSBiYWNrLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBncmF2c2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICAvLyBhbGwgYXZhaWxhYmxlIG9udG9sb2dpZXNcbiAgICBvbnRvbG9naWVzOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiA9IFtdO1xuXG4gICAgLy8gb250b2xvZ3kgY2hvc2VuIGJ5IHRoZSB1c2VyXG4gICAgYWN0aXZlT250b2xvZ3k6IHN0cmluZztcblxuICAgIC8vIHByb3BlcnRpZXMgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyXG4gICAgYWN0aXZlUHJvcGVydGllczogYm9vbGVhbltdID0gW107XG5cbiAgICAvLyByZXNvdXJjZSBjbGFzc2VzIGZvciB0aGUgc2VsZWN0ZWQgb250b2xvZ3lcbiAgICByZXNvdXJjZUNsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAvLyBkZWZpbml0aW9uIG9mIHRoZSBzZWxlY3RlZCByZXNvdXJjZSBjbGFzcywgaWYgc2V0LlxuICAgIGFjdGl2ZVJlc291cmNlQ2xhc3M6IFJlc291cmNlQ2xhc3M7XG5cbiAgICAvLyBwcm9wZXJ0aWVzIGZvciB0aGUgc2VsZWN0ZWQgb250b2xvZ3kgb3Igc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3NcbiAgICBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xuXG4gICAgcmVzdWx0OiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKFtdLCAwKTtcblxuICAgIC8vIHJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IHRoYXQgY29udHJvbHMgdGhlIHJlc291cmNlIGNsYXNzIHNlbGVjdGlvblxuICAgIEBWaWV3Q2hpbGQoJ3Jlc291cmNlQ2xhc3MnLCB7IHN0YXRpYzogZmFsc2UgfSkgcmVzb3VyY2VDbGFzc0NvbXBvbmVudDogU2VsZWN0UmVzb3VyY2VDbGFzc0NvbXBvbmVudDtcblxuICAgIC8vIHJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IGNvbnRyb2xsaW5nIHRoZSBwcm9wZXJ0eSBzZWxlY3Rpb25cbiAgICBAVmlld0NoaWxkcmVuKCdwcm9wZXJ0eScpIHByb3BlcnR5Q29tcG9uZW50czogUXVlcnlMaXN0PFNlbGVjdFByb3BlcnR5Q29tcG9uZW50PjtcblxuICAgIC8vIEZvcm1Hcm91cCAodXNlZCBhcyBwYXJlbnQgZm9yIGNoaWxkIGNvbXBvbmVudHMpXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgLy8gZm9ybSB2YWxpZGF0aW9uIHN0YXR1c1xuICAgIGZvcm1WYWxpZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX2NhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2dyYXZTZWFyY2hTZXJ2aWNlOiBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyBwYXJlbnQgZm9ybSBpcyBlbXB0eSwgaXQgZ2V0cyBwYXNzZWQgdG8gdGhlIGNoaWxkIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7fSk7XG5cbiAgICAgICAgLy8gaWYgZm9ybSBzdGF0dXMgY2hhbmdlcywgcmUtcnVuIHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy5mb3JtLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1WYWxpZCA9IHRoaXMudmFsaWRhdGVGb3JtKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIG9udG9sb2dpZXMgdG8gYmUgdXNlZCBmb3IgdGhlIG9udG9sb2dpZXMgc2VsZWN0aW9uIGluIHRoZSBzZWFyY2ggZm9ybVxuICAgICAgICB0aGlzLmluaXRpYWxpemVPbnRvbG9naWVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEFkZCBhIHByb3BlcnR5IHRvIHRoZSBzZWFyY2ggZm9ybS5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgYWRkUHJvcGVydHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlUHJvcGVydGllcy5wdXNoKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBSZW1vdmUgdGhlIGxhc3QgcHJvcGVydHkgZnJvbSB0aGUgc2VhcmNoIGZvcm0uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHJlbW92ZVByb3BlcnR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZVByb3BlcnRpZXMuc3BsaWNlKC0xLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogR2V0cyBhbGwgYXZhaWxhYmxlIG9udG9sb2dpZXMgZm9yIHRoZSBzZWFyY2ggZm9ybS5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZU9udG9sb2dpZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhY2hlU2VydmljZS5nZXRPbnRvbG9naWVzTWV0YWRhdGEoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAob250b2xvZ2llczogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9udG9sb2dpZXMgPSBvbnRvbG9naWVzO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIE9uY2UgYW4gb250b2xvZ3kgaGFzIGJlZW4gc2VsZWN0ZWQsIGdldHMgaXRzIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMuXG4gICAgICogVGhlIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMgd2lsbCBiZSBtYWRlIGF2YWlsYWJsZSB0byB0aGUgdXNlciBmb3Igc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpIElyaSBvZiB0aGUgb250b2xvZ3kgY2hvc2VuIGJ5IHRoZSB1c2VyLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXNBbmRQcm9wZXJ0aWVzRm9yT250b2xvZ3kob250b2xvZ3lJcmk6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgICAgIC8vIHJlc2V0IGFjdGl2ZSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIHRoaXMuYWN0aXZlUmVzb3VyY2VDbGFzcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyByZXNldCBzcGVjaWZpZWQgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmFjdGl2ZVByb3BlcnRpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLmFjdGl2ZU9udG9sb2d5ID0gb250b2xvZ3lJcmk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLmdldEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhbb250b2xvZ3lJcmldKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzID0gb250b0luZm8uZ2V0UmVzb3VyY2VDbGFzc2VzQXNBcnJheSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBvbnRvSW5mby5nZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBPbmNlIGEgcmVzb3VyY2UgY2xhc3MgaGFzIGJlZW4gc2VsZWN0ZWQsIGdldHMgaXRzIHByb3BlcnRpZXMuXG4gICAgICogVGhlIHByb3BlcnRpZXMgd2lsbCBiZSBtYWRlIGF2YWlsYWJsZSB0byB0aGUgdXNlciBmb3Igc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllc0ZvclJlc291cmNlQ2xhc3MocmVzb3VyY2VDbGFzc0lyaTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVzZXQgc3BlY2lmaWVkIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5hY3RpdmVQcm9wZXJ0aWVzID0gW107XG5cbiAgICAgICAgLy8gaWYgdGhlIGNsaWVudCB1bmRvZXMgdGhlIHNlbGVjdGlvbiBvZiBhIHJlc291cmNlIGNsYXNzLCB1c2UgdGhlIGFjdGl2ZSBvbnRvbG9neSBhcyBhIGZhbGxiYWNrXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSXJpID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlc291cmNlQ2xhc3Nlc0FuZFByb3BlcnRpZXNGb3JPbnRvbG9neSh0aGlzLmFjdGl2ZU9udG9sb2d5KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhbcmVzb3VyY2VDbGFzc0lyaV0pLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gb250b0luZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUmVzb3VyY2VDbGFzcyA9IG9udG9JbmZvLmdldFJlc291cmNlQ2xhc3NlcygpW3Jlc291cmNlQ2xhc3NJcmldO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogVmFsaWRhdGVzIGZvcm0gYW5kIHJldHVybnMgaXRzIHN0YXR1cyAoYm9vbGVhbikuXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUZvcm0oKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgdGhhdCBlaXRoZXIgYSByZXNvdXJjZSBjbGFzcyBpcyBzZWxlY3RlZCBvciBhdCBsZWFzdCBvbmUgcHJvcGVydHkgaXMgc3BlY2lmaWVkXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm0udmFsaWQgJiZcbiAgICAgICAgICAgICh0aGlzLnByb3BlcnR5Q29tcG9uZW50cy5sZW5ndGggPiAwIHx8ICh0aGlzLnJlc291cmNlQ2xhc3NDb21wb25lbnQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlc291cmNlQ2xhc3NDb21wb25lbnQuZ2V0UmVzb3VyY2VDbGFzc1NlbGVjdGVkKCkgIT09IGZhbHNlKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogUmVzZXRzIHRoZSBmb3JtIChzZWxlY3RlZCByZXNvdXJjZSBjbGFzcyBhbmQgc3BlY2lmaWVkIHByb3BlcnRpZXMpIHByZXNlcnZpbmcgdGhlIGFjdGl2ZSBvbnRvbG9neS5cbiAgICAgKi9cbiAgICByZXNldEZvcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZU9udG9sb2d5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc2VzQW5kUHJvcGVydGllc0Zvck9udG9sb2d5KHRoaXMuYWN0aXZlT250b2xvZ3kpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogQ3JlYXRlcyBhIEdyYXZTZWFyY2ggcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gZm9ybSB2YWx1ZXMgYW5kIGNhbGxzIHRoZSBleHRlbmRlZCBzZWFyY2ggcm91dGUuXG4gICAgICovXG4gICAgc3VibWl0KCkge1xuXG4gICAgICAgIGlmICghdGhpcy5mb3JtVmFsaWQpIHJldHVybjsgLy8gY2hlY2sgdGhhdCBmcm9tIGlzIHZhbGlkXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NPcHRpb24gPSB0aGlzLnJlc291cmNlQ2xhc3NDb21wb25lbnQuZ2V0UmVzb3VyY2VDbGFzc1NlbGVjdGVkKCk7XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc09wdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzID0gcmVzQ2xhc3NPcHRpb247XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVdpdGhWYWx1ZVtdID0gdGhpcy5wcm9wZXJ0eUNvbXBvbmVudHMubWFwKFxuICAgICAgICAgICAgKHByb3BDb21wKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BDb21wLmdldFByb3BlcnR5U2VsZWN0ZWRXaXRoVmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBncmF2c2VhcmNoID0gdGhpcy5fZ3JhdlNlYXJjaFNlcnZpY2UuY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXMsIHJlc0NsYXNzLCAwKTtcblxuICAgICAgICBpZiAodGhpcy5yb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlICsgJy9leHRlbmRlZC8nLCBncmF2c2VhcmNoXSwgeyByZWxhdGl2ZVRvOiB0aGlzLl9yb3V0ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhdnNlYXJjaC5lbWl0KGdyYXZzZWFyY2gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlIGV4dGVuZGVkIHNlYXJjaCBmb3JtXG4gICAgICAgIHRoaXMudG9nZ2xlRXh0ZW5kZWRTZWFyY2hGb3JtLmVtaXQodHJ1ZSk7XG5cbiAgICB9XG5cbn1cbiJdfQ==