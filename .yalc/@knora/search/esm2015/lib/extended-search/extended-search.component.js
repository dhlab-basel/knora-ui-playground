import { Component, EventEmitter, Inject, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { GravsearchGenerationService, OntologyCacheService, ReadResourcesSequence } from '@knora/core';
import { SelectResourceClassComponent } from './select-resource-class/select-resource-class.component';
/**
 * The extended search allows you to filter by project, by source type (resource class), or by the metadata (properties) of source types. Each filter can be standalone or combined. The metadata field can be precisely filtered with criteria such as "contains", "like", "equals to", "exists" or in case of a date value with "before" or "after". In addition, for a metadata field that is connected to another source type, it's possible to filter by this second source type. If you are looking for the source type "Photograph" with the metadata field "Photographer", which is connected to source type "Person", you can search for photograph(s) taken by person(s) who is born before February 1970. The result of this request will be an intersection of the two source types.
 */
export class ExtendedSearchComponent {
    constructor(fb, _route, _router, _cacheService, _gravSearchService) {
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
    ngOnInit() {
        // parent form is empty, it gets passed to the child components
        this.form = this.fb.group({});
        // if form status changes, re-run validation
        this.form.statusChanges.subscribe((data) => {
            this.formValid = this.validateForm();
            // console.log(this.form);
        });
        // initialize ontologies to be used for the ontologies selection in the search form
        this.initializeOntologies();
    }
    /**
     * @ignore
     * Add a property to the search form.
     * @returns void
     */
    addProperty() {
        this.activeProperties.push(true);
    }
    /**
     * @ignore
     * Remove the last property from the search form.
     * @returns void
     */
    removeProperty() {
        this.activeProperties.splice(-1, 1);
    }
    /**
     * @ignore
     * Gets all available ontologies for the search form.
     * @returns void
     */
    initializeOntologies() {
        this._cacheService.getOntologiesMetadata().subscribe((ontologies) => {
            this.ontologies = ontologies;
        });
    }
    /**
     * @ignore
     * Once an ontology has been selected, gets its classes and properties.
     * The classes and properties will be made available to the user for selection.
     *
     * @param ontologyIri Iri of the ontology chosen by the user.
     * @returns void
     */
    getResourceClassesAndPropertiesForOntology(ontologyIri) {
        // reset active resource class definition
        this.activeResourceClass = undefined;
        // reset specified properties
        this.activeProperties = [];
        this.activeOntology = ontologyIri;
        this._cacheService.getEntityDefinitionsForOntologies([ontologyIri]).subscribe((ontoInfo) => {
            this.resourceClasses = ontoInfo.getResourceClassesAsArray(true);
            this.properties = ontoInfo.getProperties();
        });
    }
    /**
     * @ignore
     * Once a resource class has been selected, gets its properties.
     * The properties will be made available to the user for selection.
     *
     * @param resourceClassIri
     * @returns void
     */
    getPropertiesForResourceClass(resourceClassIri) {
        // reset specified properties
        this.activeProperties = [];
        // if the client undoes the selection of a resource class, use the active ontology as a fallback
        if (resourceClassIri === null) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        }
        else {
            this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe((ontoInfo) => {
                this.properties = ontoInfo.getProperties();
                this.activeResourceClass = ontoInfo.getResourceClasses()[resourceClassIri];
            });
        }
    }
    /**
     * @ignore
     * Validates form and returns its status (boolean).
     */
    validateForm() {
        // check that either a resource class is selected or at least one property is specified
        return this.form.valid &&
            (this.propertyComponents.length > 0 || (this.resourceClassComponent !== undefined && this.resourceClassComponent.getResourceClassSelected() !== false));
    }
    /**
     * @ignore
     * Resets the form (selected resource class and specified properties) preserving the active ontology.
     */
    resetForm() {
        if (this.activeOntology !== undefined) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        }
    }
    /**
     * @ignore
     * Creates a GravSearch query with the given form values and calls the extended search route.
     */
    submit() {
        if (!this.formValid)
            return; // check that from is valid
        const resClassOption = this.resourceClassComponent.getResourceClassSelected();
        let resClass;
        if (resClassOption !== false) {
            resClass = resClassOption;
        }
        const properties = this.propertyComponents.map((propComp) => {
            return propComp.getPropertySelectedWithValue();
        });
        const gravsearch = this._gravSearchService.createGravsearchQuery(properties, resClass, 0);
        if (this.route) {
            this._router.navigate([this.route + '/extended/', gravsearch], { relativeTo: this._route });
        }
        else {
            this.gravsearch.emit(gravsearch);
        }
        // toggle extended search form
        this.toggleExtendedSearchForm.emit(true);
    }
}
ExtendedSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-extended-search',
                template: "<form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"kui-form-content\">\n\n  <div>\n    <kui-select-ontology *ngIf=\"ontologies.length > 0\" [formGroup]=\"form\" [ontologies]=\"ontologies\"\n                         (ontologySelected)=\"getResourceClassesAndPropertiesForOntology($event)\"></kui-select-ontology>\n  </div>\n\n  <div class=\"select-resource-class\" *ngIf=\"resourceClasses?.length > 0\">\n    <kui-select-resource-class #resourceClass [formGroup]=\"form\" [resourceClasses]=\"resourceClasses\"\n                               (resourceClassSelectedEvent)=\"getPropertiesForResourceClass($event)\">\n    </kui-select-resource-class>\n  </div>\n\n  <div class=\"select-property\" *ngIf=\"properties !== undefined\">\n    <div *ngFor=\"let prop of activeProperties; let i = index\">\n\n      <kui-select-property #property [activeResourceClass]=\"activeResourceClass\" [formGroup]=\"form\" [index]=\"i\"\n                           [properties]=\"properties\"></kui-select-property>\n\n    </div>\n  </div>\n\n\n  <div class=\"select-property buttons\">\n    <button mat-mini-fab class=\"property-button add-property-button\" color=\"primary\" type=\"button\"\n            (click)=\"addProperty()\" [disabled]=\"activeOntology === undefined || activeProperties.length >= 4\">\n      <mat-icon aria-label=\"add a property\">add</mat-icon>\n    </button>\n\n    <button mat-mini-fab class=\"property-button remove-property-button\" color=\"primary\" type=\"button\"\n            (click)=\"removeProperty()\" [disabled]=\"activeProperties.length == 0\">\n      <mat-icon aria-label=\"remove property\">remove</mat-icon>\n    </button>\n  </div>\n\n  <!--  <div>\n    <button mat-icon-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n      <mat-icon aria-label=\"reset query form\">clear</mat-icon>\n    </button>\n\n    <button mat-icon-button type=\"submit\" [disabled]=\"!formValid\">\n      <mat-icon aria-label=\"submit query\">send</mat-icon>\n    </button>\n  </div> -->\n\n  <div class=\"kui-form-action\">\n    <button class=\"reset\" mat-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n      Reset\n    </button>\n    <span class=\"fill-remaining-space\"></span>\n    <button class=\"extended-search-button\" mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!formValid\">\n      Search\n    </button>\n  </div>\n\n</form>\n",
                styles: [".select-resource-class{margin-left:8px}.select-property{margin-left:16px}.select-property .property-button{margin:0 12px 64px 0}.kui-form-content{position:relative;min-height:320px;height:100%}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
ExtendedSearchComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] },
    { type: ActivatedRoute },
    { type: Router },
    { type: OntologyCacheService },
    { type: GravsearchGenerationService }
];
ExtendedSearchComponent.propDecorators = {
    route: [{ type: Input }],
    toggleExtendedSearchForm: [{ type: Output }],
    gravsearch: [{ type: Output }],
    resourceClassComponent: [{ type: ViewChild, args: ['resourceClass',] }],
    propertyComponents: [{ type: ViewChildren, args: ['property',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL2V4dGVuZGVkLXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUNILDJCQUEyQixFQUMzQixvQkFBb0IsRUFLcEIscUJBQXFCLEVBRXhCLE1BQU0sYUFBYSxDQUFDO0FBRXJCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBRXZHOztHQUVHO0FBTUgsTUFBTSxPQUFPLHVCQUF1QjtJQWlEaEMsWUFBeUMsRUFBZSxFQUM1QyxNQUFzQixFQUN0QixPQUFlLEVBQ2YsYUFBbUMsRUFDbkMsa0JBQStDO1FBSmxCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDNUMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUNuQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTZCO1FBOUMzRDs7V0FFRztRQUNPLDZCQUF3QixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFakU7O1dBRUc7UUFDTyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVsRCwyQkFBMkI7UUFDM0IsZUFBVSxHQUE0QixFQUFFLENBQUM7UUFLekMsbUNBQW1DO1FBQ25DLHFCQUFnQixHQUFjLEVBQUUsQ0FBQztRQUVqQyw2Q0FBNkM7UUFDN0Msb0JBQWUsR0FBeUIsRUFBRSxDQUFDO1FBUTNDLFdBQU0sR0FBMEIsSUFBSSxxQkFBcUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFXakUseUJBQXlCO1FBQ3pCLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFPbEIsQ0FBQztJQUVELFFBQVE7UUFFSiwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU5Qiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckMsMEJBQTBCO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUZBQW1GO1FBQ25GLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVztRQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG9CQUFvQjtRQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsU0FBUyxDQUNoRCxDQUFDLFVBQW1DLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsMENBQTBDLENBQUMsV0FBbUI7UUFFMUQseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUM7UUFFckMsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFFbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUN6RSxDQUFDLFFBQTZCLEVBQUUsRUFBRTtZQUU5QixJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUUvQyxDQUFDLENBQ0osQ0FBQztJQUVOLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsNkJBQTZCLENBQUMsZ0JBQXdCO1FBRWxELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTNCLGdHQUFnRztRQUNoRyxJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsMENBQTBDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3hFO2FBQU07WUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDeEUsQ0FBQyxRQUE2QixFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUUzQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUvRSxDQUFDLENBQ0osQ0FBQztTQUVMO0lBRUwsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFlBQVk7UUFFaEIsdUZBQXVGO1FBQ3ZGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ2xCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFaEssQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDTCxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ25DLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsTUFBTTtRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sQ0FBQywyQkFBMkI7UUFFeEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFOUUsSUFBSSxRQUFRLENBQUM7UUFFYixJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUU7WUFDMUIsUUFBUSxHQUFHLGNBQWMsQ0FBQztTQUM3QjtRQUVELE1BQU0sVUFBVSxHQUF3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUMvRCxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ1QsT0FBTyxRQUFRLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNuRCxDQUFDLENBQ0osQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFGLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDL0Y7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BDO1FBR0QsOEJBQThCO1FBQzlCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFN0MsQ0FBQzs7O1lBL05KLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiw0NkVBQStDOzthQUVsRDs7OztZQXJCUSxXQUFXLHVCQXVFSCxNQUFNLFNBQUMsV0FBVztZQXhFMUIsY0FBYztZQUFFLE1BQU07WUFJM0Isb0JBQW9CO1lBRHBCLDJCQUEyQjs7O29CQXlCMUIsS0FBSzt1Q0FLTCxNQUFNO3lCQUtOLE1BQU07cUNBdUJOLFNBQVMsU0FBQyxlQUFlO2lDQUd6QixZQUFZLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UsXG4gICAgT250b2xvZ3lDYWNoZVNlcnZpY2UsXG4gICAgT250b2xvZ3lJbmZvcm1hdGlvbixcbiAgICBPbnRvbG9neU1ldGFkYXRhLFxuICAgIFByb3BlcnRpZXMsXG4gICAgUHJvcGVydHlXaXRoVmFsdWUsXG4gICAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICAgIFJlc291cmNlQ2xhc3Ncbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0UHJvcGVydHlDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1wcm9wZXJ0eS9zZWxlY3QtcHJvcGVydHkuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdFJlc291cmNlQ2xhc3NDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy9zZWxlY3QtcmVzb3VyY2UtY2xhc3MuY29tcG9uZW50JztcblxuLyoqXG4gKiBUaGUgZXh0ZW5kZWQgc2VhcmNoIGFsbG93cyB5b3UgdG8gZmlsdGVyIGJ5IHByb2plY3QsIGJ5IHNvdXJjZSB0eXBlIChyZXNvdXJjZSBjbGFzcyksIG9yIGJ5IHRoZSBtZXRhZGF0YSAocHJvcGVydGllcykgb2Ygc291cmNlIHR5cGVzLiBFYWNoIGZpbHRlciBjYW4gYmUgc3RhbmRhbG9uZSBvciBjb21iaW5lZC4gVGhlIG1ldGFkYXRhIGZpZWxkIGNhbiBiZSBwcmVjaXNlbHkgZmlsdGVyZWQgd2l0aCBjcml0ZXJpYSBzdWNoIGFzIFwiY29udGFpbnNcIiwgXCJsaWtlXCIsIFwiZXF1YWxzIHRvXCIsIFwiZXhpc3RzXCIgb3IgaW4gY2FzZSBvZiBhIGRhdGUgdmFsdWUgd2l0aCBcImJlZm9yZVwiIG9yIFwiYWZ0ZXJcIi4gSW4gYWRkaXRpb24sIGZvciBhIG1ldGFkYXRhIGZpZWxkIHRoYXQgaXMgY29ubmVjdGVkIHRvIGFub3RoZXIgc291cmNlIHR5cGUsIGl0J3MgcG9zc2libGUgdG8gZmlsdGVyIGJ5IHRoaXMgc2Vjb25kIHNvdXJjZSB0eXBlLiBJZiB5b3UgYXJlIGxvb2tpbmcgZm9yIHRoZSBzb3VyY2UgdHlwZSBcIlBob3RvZ3JhcGhcIiB3aXRoIHRoZSBtZXRhZGF0YSBmaWVsZCBcIlBob3RvZ3JhcGhlclwiLCB3aGljaCBpcyBjb25uZWN0ZWQgdG8gc291cmNlIHR5cGUgXCJQZXJzb25cIiwgeW91IGNhbiBzZWFyY2ggZm9yIHBob3RvZ3JhcGgocykgdGFrZW4gYnkgcGVyc29uKHMpIHdobyBpcyBib3JuIGJlZm9yZSBGZWJydWFyeSAxOTcwLiBUaGUgcmVzdWx0IG9mIHRoaXMgcmVxdWVzdCB3aWxsIGJlIGFuIGludGVyc2VjdGlvbiBvZiB0aGUgdHdvIHNvdXJjZSB0eXBlcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktZXh0ZW5kZWQtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZXh0ZW5kZWQtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9leHRlbmRlZC1zZWFyY2guY29tcG9uZW50LnNjc3MnLCAnLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSByb3V0ZSBSb3V0ZSB0byBuYXZpZ2F0ZSBhZnRlciBzZWFyY2guIFRoaXMgcm91dGUgcGF0aCBzaG91bGQgY29udGFpbiBhIGNvbXBvbmVudCBmb3Igc2VhcmNoIHJlc3VsdHMuXG4gICAgICovXG4gICAgQElucHV0KCkgcm91dGU/O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gdG9nZ2xlRXh0ZW5kZWRTZWFyY2hGb3JtIFRyaWdnZXIgdG9nZ2xlIGZvciBleHRlbmRlZCBzZWFyY2ggZm9ybS5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgdG9nZ2xlRXh0ZW5kZWRTZWFyY2hGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBncmF2c2VhcmNoIFNlbmQgdGhlIGdyYXZzZWFyY2ggcXVlcnkgYmFjay5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgZ3JhdnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgLy8gYWxsIGF2YWlsYWJsZSBvbnRvbG9naWVzXG4gICAgb250b2xvZ2llczogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4gPSBbXTtcblxuICAgIC8vIG9udG9sb2d5IGNob3NlbiBieSB0aGUgdXNlclxuICAgIGFjdGl2ZU9udG9sb2d5OiBzdHJpbmc7XG5cbiAgICAvLyBwcm9wZXJ0aWVzIHNwZWNpZmllZCBieSB0aGUgdXNlclxuICAgIGFjdGl2ZVByb3BlcnRpZXM6IGJvb2xlYW5bXSA9IFtdO1xuXG4gICAgLy8gcmVzb3VyY2UgY2xhc3NlcyBmb3IgdGhlIHNlbGVjdGVkIG9udG9sb2d5XG4gICAgcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxSZXNvdXJjZUNsYXNzPiA9IFtdO1xuXG4gICAgLy8gZGVmaW5pdGlvbiBvZiB0aGUgc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3MsIGlmIHNldC5cbiAgICBhY3RpdmVSZXNvdXJjZUNsYXNzOiBSZXNvdXJjZUNsYXNzO1xuXG4gICAgLy8gcHJvcGVydGllcyBmb3IgdGhlIHNlbGVjdGVkIG9udG9sb2d5IG9yIHNlbGVjdGVkIHJlc291cmNlIGNsYXNzXG4gICAgcHJvcGVydGllczogUHJvcGVydGllcztcblxuICAgIHJlc3VsdDogUmVhZFJlc291cmNlc1NlcXVlbmNlID0gbmV3IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZShbXSwgMCk7XG5cbiAgICAvLyByZWZlcmVuY2UgdG8gdGhlIGNvbXBvbmVudCB0aGF0IGNvbnRyb2xzIHRoZSByZXNvdXJjZSBjbGFzcyBzZWxlY3Rpb25cbiAgICBAVmlld0NoaWxkKCdyZXNvdXJjZUNsYXNzJykgcmVzb3VyY2VDbGFzc0NvbXBvbmVudDogU2VsZWN0UmVzb3VyY2VDbGFzc0NvbXBvbmVudDtcblxuICAgIC8vIHJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IGNvbnRyb2xsaW5nIHRoZSBwcm9wZXJ0eSBzZWxlY3Rpb25cbiAgICBAVmlld0NoaWxkcmVuKCdwcm9wZXJ0eScpIHByb3BlcnR5Q29tcG9uZW50czogUXVlcnlMaXN0PFNlbGVjdFByb3BlcnR5Q29tcG9uZW50PjtcblxuICAgIC8vIEZvcm1Hcm91cCAodXNlZCBhcyBwYXJlbnQgZm9yIGNoaWxkIGNvbXBvbmVudHMpXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgLy8gZm9ybSB2YWxpZGF0aW9uIHN0YXR1c1xuICAgIGZvcm1WYWxpZCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX2NhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2dyYXZTZWFyY2hTZXJ2aWNlOiBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyBwYXJlbnQgZm9ybSBpcyBlbXB0eSwgaXQgZ2V0cyBwYXNzZWQgdG8gdGhlIGNoaWxkIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7fSk7XG5cbiAgICAgICAgLy8gaWYgZm9ybSBzdGF0dXMgY2hhbmdlcywgcmUtcnVuIHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy5mb3JtLnN0YXR1c0NoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1WYWxpZCA9IHRoaXMudmFsaWRhdGVGb3JtKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpbml0aWFsaXplIG9udG9sb2dpZXMgdG8gYmUgdXNlZCBmb3IgdGhlIG9udG9sb2dpZXMgc2VsZWN0aW9uIGluIHRoZSBzZWFyY2ggZm9ybVxuICAgICAgICB0aGlzLmluaXRpYWxpemVPbnRvbG9naWVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEFkZCBhIHByb3BlcnR5IHRvIHRoZSBzZWFyY2ggZm9ybS5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgYWRkUHJvcGVydHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlUHJvcGVydGllcy5wdXNoKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBSZW1vdmUgdGhlIGxhc3QgcHJvcGVydHkgZnJvbSB0aGUgc2VhcmNoIGZvcm0uXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHJlbW92ZVByb3BlcnR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZVByb3BlcnRpZXMuc3BsaWNlKC0xLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogR2V0cyBhbGwgYXZhaWxhYmxlIG9udG9sb2dpZXMgZm9yIHRoZSBzZWFyY2ggZm9ybS5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZU9udG9sb2dpZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhY2hlU2VydmljZS5nZXRPbnRvbG9naWVzTWV0YWRhdGEoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAob250b2xvZ2llczogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9udG9sb2dpZXMgPSBvbnRvbG9naWVzO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIE9uY2UgYW4gb250b2xvZ3kgaGFzIGJlZW4gc2VsZWN0ZWQsIGdldHMgaXRzIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMuXG4gICAgICogVGhlIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMgd2lsbCBiZSBtYWRlIGF2YWlsYWJsZSB0byB0aGUgdXNlciBmb3Igc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9udG9sb2d5SXJpIElyaSBvZiB0aGUgb250b2xvZ3kgY2hvc2VuIGJ5IHRoZSB1c2VyLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXNBbmRQcm9wZXJ0aWVzRm9yT250b2xvZ3kob250b2xvZ3lJcmk6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgICAgIC8vIHJlc2V0IGFjdGl2ZSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIHRoaXMuYWN0aXZlUmVzb3VyY2VDbGFzcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyByZXNldCBzcGVjaWZpZWQgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmFjdGl2ZVByb3BlcnRpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLmFjdGl2ZU9udG9sb2d5ID0gb250b2xvZ3lJcmk7XG5cbiAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLmdldEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhbb250b2xvZ3lJcmldKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzID0gb250b0luZm8uZ2V0UmVzb3VyY2VDbGFzc2VzQXNBcnJheSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBvbnRvSW5mby5nZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBPbmNlIGEgcmVzb3VyY2UgY2xhc3MgaGFzIGJlZW4gc2VsZWN0ZWQsIGdldHMgaXRzIHByb3BlcnRpZXMuXG4gICAgICogVGhlIHByb3BlcnRpZXMgd2lsbCBiZSBtYWRlIGF2YWlsYWJsZSB0byB0aGUgdXNlciBmb3Igc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlQ2xhc3NJcmlcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllc0ZvclJlc291cmNlQ2xhc3MocmVzb3VyY2VDbGFzc0lyaTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVzZXQgc3BlY2lmaWVkIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5hY3RpdmVQcm9wZXJ0aWVzID0gW107XG5cbiAgICAgICAgLy8gaWYgdGhlIGNsaWVudCB1bmRvZXMgdGhlIHNlbGVjdGlvbiBvZiBhIHJlc291cmNlIGNsYXNzLCB1c2UgdGhlIGFjdGl2ZSBvbnRvbG9neSBhcyBhIGZhbGxiYWNrXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSXJpID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlc291cmNlQ2xhc3Nlc0FuZFByb3BlcnRpZXNGb3JPbnRvbG9neSh0aGlzLmFjdGl2ZU9udG9sb2d5KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5fY2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhbcmVzb3VyY2VDbGFzc0lyaV0pLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gb250b0luZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUmVzb3VyY2VDbGFzcyA9IG9udG9JbmZvLmdldFJlc291cmNlQ2xhc3NlcygpW3Jlc291cmNlQ2xhc3NJcmldO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogVmFsaWRhdGVzIGZvcm0gYW5kIHJldHVybnMgaXRzIHN0YXR1cyAoYm9vbGVhbikuXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUZvcm0oKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgdGhhdCBlaXRoZXIgYSByZXNvdXJjZSBjbGFzcyBpcyBzZWxlY3RlZCBvciBhdCBsZWFzdCBvbmUgcHJvcGVydHkgaXMgc3BlY2lmaWVkXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm0udmFsaWQgJiZcbiAgICAgICAgICAgICh0aGlzLnByb3BlcnR5Q29tcG9uZW50cy5sZW5ndGggPiAwIHx8ICh0aGlzLnJlc291cmNlQ2xhc3NDb21wb25lbnQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlc291cmNlQ2xhc3NDb21wb25lbnQuZ2V0UmVzb3VyY2VDbGFzc1NlbGVjdGVkKCkgIT09IGZhbHNlKSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogUmVzZXRzIHRoZSBmb3JtIChzZWxlY3RlZCByZXNvdXJjZSBjbGFzcyBhbmQgc3BlY2lmaWVkIHByb3BlcnRpZXMpIHByZXNlcnZpbmcgdGhlIGFjdGl2ZSBvbnRvbG9neS5cbiAgICAgKi9cbiAgICByZXNldEZvcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZU9udG9sb2d5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc2VzQW5kUHJvcGVydGllc0Zvck9udG9sb2d5KHRoaXMuYWN0aXZlT250b2xvZ3kpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogQ3JlYXRlcyBhIEdyYXZTZWFyY2ggcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gZm9ybSB2YWx1ZXMgYW5kIGNhbGxzIHRoZSBleHRlbmRlZCBzZWFyY2ggcm91dGUuXG4gICAgICovXG4gICAgc3VibWl0KCkge1xuXG4gICAgICAgIGlmICghdGhpcy5mb3JtVmFsaWQpIHJldHVybjsgLy8gY2hlY2sgdGhhdCBmcm9tIGlzIHZhbGlkXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NPcHRpb24gPSB0aGlzLnJlc291cmNlQ2xhc3NDb21wb25lbnQuZ2V0UmVzb3VyY2VDbGFzc1NlbGVjdGVkKCk7XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc09wdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzID0gcmVzQ2xhc3NPcHRpb247XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eVdpdGhWYWx1ZVtdID0gdGhpcy5wcm9wZXJ0eUNvbXBvbmVudHMubWFwKFxuICAgICAgICAgICAgKHByb3BDb21wKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BDb21wLmdldFByb3BlcnR5U2VsZWN0ZWRXaXRoVmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBncmF2c2VhcmNoID0gdGhpcy5fZ3JhdlNlYXJjaFNlcnZpY2UuY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXMsIHJlc0NsYXNzLCAwKTtcblxuICAgICAgICBpZiAodGhpcy5yb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlICsgJy9leHRlbmRlZC8nLCBncmF2c2VhcmNoXSwgeyByZWxhdGl2ZVRvOiB0aGlzLl9yb3V0ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhdnNlYXJjaC5lbWl0KGdyYXZzZWFyY2gpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyB0b2dnbGUgZXh0ZW5kZWQgc2VhcmNoIGZvcm1cbiAgICAgICAgdGhpcy50b2dnbGVFeHRlbmRlZFNlYXJjaEZvcm0uZW1pdCh0cnVlKTtcblxuICAgIH1cblxufVxuIl19