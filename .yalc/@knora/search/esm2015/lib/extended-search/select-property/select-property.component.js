import * as tslib_1 from "tslib";
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { CardinalityOccurrence, Properties, PropertyWithValue, ResourceClass } from '@knora/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecifyPropertyValueComponent } from './specify-property-value/specify-property-value.component';
import { OntologyInformation } from '@knora/core';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
let SelectPropertyComponent = class SelectPropertyComponent {
    constructor(fb) {
        this.fb = fb;
    }
    // setter method for properties when being updated by parent component
    set properties(value) {
        this.propertySelected = undefined; // reset selected property (overwriting any previous selection)
        this._properties = value;
        this.updatePropertiesArray();
    }
    get properties() {
        return this._properties;
    }
    // setter method for selected resource class
    set activeResourceClass(value) {
        this._activeResourceClass = value;
    }
    ngOnInit() {
        // build a form for the property selection
        this.form = this.fb.group({
            property: [null, Validators.required],
            isSortCriterion: [false, Validators.required]
        });
        // update the selected property
        this.form.valueChanges.subscribe((data) => {
            const propIri = data.property;
            this.propertySelected = this._properties[propIri];
        });
        resolvedPromise.then(() => {
            this.propIndex = 'property' + this.index;
            // add form to the parent form group
            this.formGroup.addControl(this.propIndex, this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise.then(() => {
            this.formGroup.removeControl(this.propIndex);
        });
    }
    /**
     * Indicates if property can be used as a sort criterion.
     * Property has to have cardinality or max cardinality 1 for the chosen resource class.
     *
     * We cannot sort by properties whose cardinality is greater than 1.
     * Return boolean
     */
    sortCriterion() {
        // check if a resource class is selected and if the property's cardinality is 1 for the selected resource class
        if (this._activeResourceClass !== undefined && this.propertySelected !== undefined && !this.propertySelected.isLinkProperty) {
            const cardinalities = this._activeResourceClass.cardinalities.filter((card) => {
                // cardinality 1 or max occurrence 1
                return card.property === this.propertySelected.id
                    && card.value === 1
                    && (card.occurrence === CardinalityOccurrence.card || card.occurrence === CardinalityOccurrence.maxCard);
            });
            return cardinalities.length === 1;
        }
        else {
            return false;
        }
    }
    /**
     * Updates the properties array that is accessed by the template.
     */
    updatePropertiesArray() {
        // represent the properties as an array to be accessed by the template
        const propsArray = [];
        for (const propIri in this._properties) {
            if (this._properties.hasOwnProperty(propIri)) {
                const prop = this._properties[propIri];
                // only list editable props that are not link value props
                if (prop.isEditable && !prop.isLinkValueProperty) {
                    propsArray.push(this._properties[propIri]);
                }
            }
        }
        // sort properties by label (ascending)
        propsArray.sort(OntologyInformation.sortFunc);
        this.propertiesAsArray = propsArray;
    }
    /**
     * Returns the selected property with the specified value.
     */
    getPropertySelectedWithValue() {
        const propVal = this.specifyPropertyValue.getComparisonOperatorAndValueLiteralForProperty();
        let isSortCriterion = false;
        // only non linking properties can be used for sorting
        if (!this.propertySelected.isLinkProperty) {
            isSortCriterion = this.form.value.isSortCriterion;
        }
        return new PropertyWithValue(this.propertySelected, propVal, isSortCriterion);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", FormGroup)
], SelectPropertyComponent.prototype, "formGroup", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], SelectPropertyComponent.prototype, "index", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Properties),
    tslib_1.__metadata("design:paramtypes", [Properties])
], SelectPropertyComponent.prototype, "properties", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ResourceClass),
    tslib_1.__metadata("design:paramtypes", [ResourceClass])
], SelectPropertyComponent.prototype, "activeResourceClass", null);
tslib_1.__decorate([
    ViewChild('specifyPropertyValue', { static: false }),
    tslib_1.__metadata("design:type", SpecifyPropertyValueComponent)
], SelectPropertyComponent.prototype, "specifyPropertyValue", void 0);
SelectPropertyComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-select-property',
        template: "<mat-form-field class=\"search-property-field medium-field\" *ngIf=\"propertiesAsArray?.length > 0\">\n  <mat-select placeholder=\"Select Properties\" [formControl]=\"form.controls['property']\">\n    <mat-option *ngFor=\"let prop of propertiesAsArray\" [value]=\"prop.id\">{{ prop.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<kui-specify-property-value #specifyPropertyValue [formGroup]=\"form\" *ngIf=\"propertySelected !== undefined\"\n                            [property]=\"propertySelected\"></kui-specify-property-value>\n\n<mat-checkbox matTooltip=\"Sort criterion\" *ngIf=\"propertySelected !== undefined && sortCriterion()\"\n              [formControl]=\"form.controls['isSortCriterion']\"></mat-checkbox>\n",
        styles: [".search-property-field{margin-right:8px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
    }),
    tslib_1.__param(0, Inject(FormBuilder)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], SelectPropertyComponent);
export { SelectPropertyComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXByb3BlcnR5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zZWxlY3QtcHJvcGVydHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBRUgscUJBQXFCLEVBRXJCLFVBQVUsRUFFVixpQkFBaUIsRUFDakIsYUFBYSxFQUNoQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHbEQsd0hBQXdIO0FBQ3hILE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFPOUMsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUE2Q2hDLFlBQXlDLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO0lBRXhELENBQUM7SUF2Q0Qsc0VBQXNFO0lBRXRFLElBQUksVUFBVSxDQUFDLEtBQWlCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsQ0FBQywrREFBK0Q7UUFDbEcsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBSUQsNENBQTRDO0lBRTVDLElBQUksbUJB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bUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCw0QkFBNEI7UUFFeEIsTUFBTSxPQUFPLEdBQStCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQywrQ0FBK0MsRUFBRSxDQUFDO1FBRXhILElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztRQUU1QixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUU7WUFDdkMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztTQUNyRDtRQUVELE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRWxGLENBQUM7Q0FHSixDQUFBO0FBdEpZO0lBQVIsS0FBSyxFQUFFO3NDQUFZLFNBQVM7MERBQUM7QUFHckI7SUFBUixLQUFLLEVBQUU7O3NEQUFlO0FBSXZCO0lBREMsS0FBSyxFQUFFO3NDQUNjLFVBQVU7NkNBQVYsVUFBVTt5REFJL0I7QUFVRDtJQURDLEtBQUssRUFBRTtzQ0FDdUIsYUFBYTs2Q0FBYixhQUFhO2tFQUUzQztBQUdxRDtJQUFyRCxTQUFTLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQXVCLDZCQUE2QjtxRUFBQztBQTdCakcsdUJBQXVCO0lBTG5DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsNHVCQUErQzs7S0FFbEQsQ0FBQztJQThDZSxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7NkNBQWEsV0FBVztHQTdDL0MsdUJBQXVCLENBeUpuQztTQXpKWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FyZGluYWxpdHksXG4gICAgQ2FyZGluYWxpdHlPY2N1cnJlbmNlLFxuICAgIENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlLFxuICAgIFByb3BlcnRpZXMsXG4gICAgUHJvcGVydHksXG4gICAgUHJvcGVydHlXaXRoVmFsdWUsXG4gICAgUmVzb3VyY2VDbGFzc1xufSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3BlY2lmeVByb3BlcnR5VmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3NwZWNpZnktcHJvcGVydHktdmFsdWUvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc2VsZWN0LXByb3BlcnR5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LXByb3BlcnR5LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWxlY3QtcHJvcGVydHkuY29tcG9uZW50LnNjc3MnLCAnLi4vLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0UHJvcGVydHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICAvLyBpbmRleCBvZiB0aGUgZ2l2ZW4gcHJvcGVydHkgKHVuaXF1ZSlcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuXG4gICAgLy8gc2V0dGVyIG1ldGhvZCBmb3IgcHJvcGVydGllcyB3aGVuIGJlaW5nIHVwZGF0ZWQgYnkgcGFyZW50IGNvbXBvbmVudFxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHByb3BlcnRpZXModmFsdWU6IFByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eVNlbGVjdGVkID0gdW5kZWZpbmVkOyAvLyByZXNldCBzZWxlY3RlZCBwcm9wZXJ0eSAob3ZlcndyaXRpbmcgYW55IHByZXZpb3VzIHNlbGVjdGlvbilcbiAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXNBcnJheSgpO1xuICAgIH1cblxuICAgIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcztcbiAgICB9XG5cbiAgICBfYWN0aXZlUmVzb3VyY2VDbGFzczogUmVzb3VyY2VDbGFzcztcblxuICAgIC8vIHNldHRlciBtZXRob2QgZm9yIHNlbGVjdGVkIHJlc291cmNlIGNsYXNzXG4gICAgQElucHV0KClcbiAgICBzZXQgYWN0aXZlUmVzb3VyY2VDbGFzcyh2YWx1ZTogUmVzb3VyY2VDbGFzcykge1xuICAgICAgICB0aGlzLl9hY3RpdmVSZXNvdXJjZUNsYXNzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gcmVmZXJlbmNlIHRvIGNoaWxkIGNvbXBvbmVudDogY29tYmluYXRpb24gb2YgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdmFsdWUgZm9yIGNob3NlbiBwcm9wZXJ0eVxuICAgIEBWaWV3Q2hpbGQoJ3NwZWNpZnlQcm9wZXJ0eVZhbHVlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNwZWNpZnlQcm9wZXJ0eVZhbHVlOiBTcGVjaWZ5UHJvcGVydHlWYWx1ZUNvbXBvbmVudDtcblxuICAgIC8vIHByb3BlcnRpZXMgdGhhdCBjYW4gYmUgc2VsZWN0ZWQgZnJvbVxuICAgIHByaXZhdGUgX3Byb3BlcnRpZXM6IFByb3BlcnRpZXM7XG5cbiAgICAvLyBwcm9wZXJ0aWVzIGFzIGFuIEFycmF5IHN0cnVjdHVyZSAoYmFzZWQgb24gdGhpcy5wcm9wZXJ0aWVzKVxuICAgIHByb3BlcnRpZXNBc0FycmF5OiBBcnJheTxQcm9wZXJ0eT47XG5cbiAgICAvLyByZXByZXNlbnRzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcHJvcGVydHlcbiAgICBwcm9wZXJ0eVNlbGVjdGVkOiBQcm9wZXJ0eTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIC8vIHVuaXF1ZSBuYW1lIGZvciB0aGlzIHByb3BlcnR5IHRvIGJlIHVzZWQgaW4gdGhlIHBhcmVudCBGb3JtR3JvdXBcbiAgICBwcm9wSW5kZXg6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICAvLyBidWlsZCBhIGZvcm0gZm9yIHRoZSBwcm9wZXJ0eSBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBwcm9wZXJ0eTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgaXNTb3J0Q3JpdGVyaW9uOiBbZmFsc2UsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc2VsZWN0ZWQgcHJvcGVydHlcbiAgICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BJcmkgPSBkYXRhLnByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eVNlbGVjdGVkID0gdGhpcy5fcHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wSW5kZXggPSAncHJvcGVydHknICsgdGhpcy5pbmRleDtcblxuICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKHRoaXMucHJvcEluZGV4LCB0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIC8vIHJlbW92ZSBmb3JtIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2wodGhpcy5wcm9wSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgaWYgcHJvcGVydHkgY2FuIGJlIHVzZWQgYXMgYSBzb3J0IGNyaXRlcmlvbi5cbiAgICAgKiBQcm9wZXJ0eSBoYXMgdG8gaGF2ZSBjYXJkaW5hbGl0eSBvciBtYXggY2FyZGluYWxpdHkgMSBmb3IgdGhlIGNob3NlbiByZXNvdXJjZSBjbGFzcy5cbiAgICAgKlxuICAgICAqIFdlIGNhbm5vdCBzb3J0IGJ5IHByb3BlcnRpZXMgd2hvc2UgY2FyZGluYWxpdHkgaXMgZ3JlYXRlciB0aGFuIDEuXG4gICAgICogUmV0dXJuIGJvb2xlYW5cbiAgICAgKi9cbiAgICBzb3J0Q3JpdGVyaW9uKCkge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgcmVzb3VyY2UgY2xhc3MgaXMgc2VsZWN0ZWQgYW5kIGlmIHRoZSBwcm9wZXJ0eSdzIGNhcmRpbmFsaXR5IGlzIDEgZm9yIHRoZSBzZWxlY3RlZCByZXNvdXJjZSBjbGFzc1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlUmVzb3VyY2VDbGFzcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcGVydHlTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmICF0aGlzLnByb3BlcnR5U2VsZWN0ZWQuaXNMaW5rUHJvcGVydHkpIHtcblxuICAgICAgICAgICAgY29uc3QgY2FyZGluYWxpdGllczogQ2FyZGluYWxpdHlbXSA9IHRoaXMuX2FjdGl2ZVJlc291cmNlQ2xhc3MuY2FyZGluYWxpdGllcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKGNhcmQ6IENhcmRpbmFsaXR5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhcmRpbmFsaXR5IDEgb3IgbWF4IG9jY3VycmVuY2UgMVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FyZC5wcm9wZXJ0eSA9PT0gdGhpcy5wcm9wZXJ0eVNlbGVjdGVkLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBjYXJkLnZhbHVlID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoY2FyZC5vY2N1cnJlbmNlID09PSBDYXJkaW5hbGl0eU9jY3VycmVuY2UuY2FyZCB8fCBjYXJkLm9jY3VycmVuY2UgPT09IENhcmRpbmFsaXR5T2NjdXJyZW5jZS5tYXhDYXJkKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBjYXJkaW5hbGl0aWVzLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcHJvcGVydGllcyBhcnJheSB0aGF0IGlzIGFjY2Vzc2VkIGJ5IHRoZSB0ZW1wbGF0ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZVByb3BlcnRpZXNBcnJheSgpIHtcblxuICAgICAgICAvLyByZXByZXNlbnQgdGhlIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkgdG8gYmUgYWNjZXNzZWQgYnkgdGhlIHRlbXBsYXRlXG4gICAgICAgIGNvbnN0IHByb3BzQXJyYXkgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BJcmkgaW4gdGhpcy5fcHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Byb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcElyaSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5fcHJvcGVydGllc1twcm9wSXJpXTtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgbGlzdCBlZGl0YWJsZSBwcm9wcyB0aGF0IGFyZSBub3QgbGluayB2YWx1ZSBwcm9wc1xuICAgICAgICAgICAgICAgIGlmIChwcm9wLmlzRWRpdGFibGUgJiYgIXByb3AuaXNMaW5rVmFsdWVQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wc0FycmF5LnB1c2godGhpcy5fcHJvcGVydGllc1twcm9wSXJpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc29ydCBwcm9wZXJ0aWVzIGJ5IGxhYmVsIChhc2NlbmRpbmcpXG4gICAgICAgIHByb3BzQXJyYXkuc29ydChPbnRvbG9neUluZm9ybWF0aW9uLnNvcnRGdW5jKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXNBc0FycmF5ID0gcHJvcHNBcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzZWxlY3RlZCBwcm9wZXJ0eSB3aXRoIHRoZSBzcGVjaWZpZWQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydHlTZWxlY3RlZFdpdGhWYWx1ZSgpOiBQcm9wZXJ0eVdpdGhWYWx1ZSB7XG5cbiAgICAgICAgY29uc3QgcHJvcFZhbDogQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUgPSB0aGlzLnNwZWNpZnlQcm9wZXJ0eVZhbHVlLmdldENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlTGl0ZXJhbEZvclByb3BlcnR5KCk7XG5cbiAgICAgICAgbGV0IGlzU29ydENyaXRlcmlvbiA9IGZhbHNlO1xuXG4gICAgICAgIC8vIG9ubHkgbm9uIGxpbmtpbmcgcHJvcGVydGllcyBjYW4gYmUgdXNlZCBmb3Igc29ydGluZ1xuICAgICAgICBpZiAoIXRoaXMucHJvcGVydHlTZWxlY3RlZC5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgaXNTb3J0Q3JpdGVyaW9uID0gdGhpcy5mb3JtLnZhbHVlLmlzU29ydENyaXRlcmlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlXaXRoVmFsdWUodGhpcy5wcm9wZXJ0eVNlbGVjdGVkLCBwcm9wVmFsLCBpc1NvcnRDcml0ZXJpb24pO1xuXG4gICAgfVxuXG5cbn1cbiJdfQ==