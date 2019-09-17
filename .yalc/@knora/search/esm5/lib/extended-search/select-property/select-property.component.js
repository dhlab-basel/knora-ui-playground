import * as tslib_1 from "tslib";
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { CardinalityOccurrence, Properties, PropertyWithValue, ResourceClass } from '@knora/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecifyPropertyValueComponent } from './specify-property-value/specify-property-value.component';
import { OntologyInformation } from '@knora/core';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
var resolvedPromise = Promise.resolve(null);
var SelectPropertyComponent = /** @class */ (function () {
    function SelectPropertyComponent(fb) {
        this.fb = fb;
    }
    Object.defineProperty(SelectPropertyComponent.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        // setter method for properties when being updated by parent component
        set: function (value) {
            this.propertySelected = undefined; // reset selected property (overwriting any previous selection)
            this._properties = value;
            this.updatePropertiesArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectPropertyComponent.prototype, "activeResourceClass", {
        // setter method for selected resource class
        set: function (value) {
            this._activeResourceClass = value;
        },
        enumerable: true,
        configurable: true
    });
    SelectPropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // build a form for the property selection
        this.form = this.fb.group({
            property: [null, Validators.required],
            isSortCriterion: [false, Validators.required]
        });
        // update the selected property
        this.form.valueChanges.subscribe(function (data) {
            var propIri = data.property;
            _this.propertySelected = _this._properties[propIri];
        });
        resolvedPromise.then(function () {
            _this.propIndex = 'property' + _this.index;
            // add form to the parent form group
            _this.formGroup.addControl(_this.propIndex, _this.form);
        });
    };
    SelectPropertyComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        // remove form from the parent form group
        resolvedPromise.then(function () {
            _this.formGroup.removeControl(_this.propIndex);
        });
    };
    /**
     * Indicates if property can be used as a sort criterion.
     * Property has to have cardinality or max cardinality 1 for the chosen resource class.
     *
     * We cannot sort by properties whose cardinality is greater than 1.
     * Return boolean
     */
    SelectPropertyComponent.prototype.sortCriterion = function () {
        var _this = this;
        // check if a resource class is selected and if the property's cardinality is 1 for the selected resource class
        if (this._activeResourceClass !== undefined && this.propertySelected !== undefined && !this.propertySelected.isLinkProperty) {
            var cardinalities = this._activeResourceClass.cardinalities.filter(function (card) {
                // cardinality 1 or max occurrence 1
                return card.property === _this.propertySelected.id
                    && card.value === 1
                    && (card.occurrence === CardinalityOccurrence.card || card.occurrence === CardinalityOccurrence.maxCard);
            });
            return cardinalities.length === 1;
        }
        else {
            return false;
        }
    };
    /**
     * Updates the properties array that is accessed by the template.
     */
    SelectPropertyComponent.prototype.updatePropertiesArray = function () {
        // represent the properties as an array to be accessed by the template
        var propsArray = [];
        for (var propIri in this._properties) {
            if (this._properties.hasOwnProperty(propIri)) {
                var prop = this._properties[propIri];
                // only list editable props that are not link value props
                if (prop.isEditable && !prop.isLinkValueProperty) {
                    propsArray.push(this._properties[propIri]);
                }
            }
        }
        // sort properties by label (ascending)
        propsArray.sort(OntologyInformation.sortFunc);
        this.propertiesAsArray = propsArray;
    };
    /**
     * Returns the selected property with the specified value.
     */
    SelectPropertyComponent.prototype.getPropertySelectedWithValue = function () {
        var propVal = this.specifyPropertyValue.getComparisonOperatorAndValueLiteralForProperty();
        var isSortCriterion = false;
        // only non linking properties can be used for sorting
        if (!this.propertySelected.isLinkProperty) {
            isSortCriterion = this.form.value.isSortCriterion;
        }
        return new PropertyWithValue(this.propertySelected, propVal, isSortCriterion);
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
            styles: [".search-property-field{margin-right:8px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}.mat-datepicker-content .mat-calendar{height:auto!important}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
        }),
        tslib_1.__param(0, Inject(FormBuilder)),
        tslib_1.__metadata("design:paramtypes", [FormBuilder])
    ], SelectPropertyComponent);
    return SelectPropertyComponent;
}());
export { SelectPropertyComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXByb3BlcnR5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zZWxlY3QtcHJvcGVydHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBRUgscUJBQXFCLEVBRXJCLFVBQVUsRUFFVixpQkFBaUIsRUFDakIsYUFBYSxFQUNoQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHbEQsd0hBQXdIO0FBQ3hILElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFPOUM7SUE2Q0ksaUNBQXlDLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO0lBRXhELENBQUM7SUFyQ0Qsc0JBQUksK0NBQVU7YUFNZDtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO1FBVkQsc0VBQXNFO2FBRXRFLFVBQWUsS0FBaUI7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxDQUFDLCtEQUErRDtZQUNsRyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQVVELHNCQUFJLHdEQUFtQjtRQUZ2Qiw0Q0FBNEM7YUFFNUMsVUFBd0IsS0FBb0I7WUFD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cHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhcmRpbmFsaXR5LFxuICAgIENhcmRpbmFsaXR5T2NjdXJyZW5jZSxcbiAgICBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSxcbiAgICBQcm9wZXJ0aWVzLFxuICAgIFByb3BlcnR5LFxuICAgIFByb3BlcnR5V2l0aFZhbHVlLFxuICAgIFJlc291cmNlQ2xhc3Ncbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNwZWNpZnlQcm9wZXJ0eVZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL3NwZWNpZnktcHJvcGVydHktdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICdAa25vcmEvY29yZSc7XG5cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlbGVjdC1wcm9wZXJ0eScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1wcm9wZXJ0eS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LXByb3BlcnR5LmNvbXBvbmVudC5zY3NzJywgJy4uLy4uL2Fzc2V0cy9zdHlsZS9zZWFyY2guc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFByb3BlcnR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLy8gcGFyZW50IEZvcm1Hcm91cFxuICAgIEBJbnB1dCgpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gICAgLy8gaW5kZXggb2YgdGhlIGdpdmVuIHByb3BlcnR5ICh1bmlxdWUpXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIC8vIHNldHRlciBtZXRob2QgZm9yIHByb3BlcnRpZXMgd2hlbiBiZWluZyB1cGRhdGVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgICBASW5wdXQoKVxuICAgIHNldCBwcm9wZXJ0aWVzKHZhbHVlOiBQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucHJvcGVydHlTZWxlY3RlZCA9IHVuZGVmaW5lZDsgLy8gcmVzZXQgc2VsZWN0ZWQgcHJvcGVydHkgKG92ZXJ3cml0aW5nIGFueSBwcmV2aW91cyBzZWxlY3Rpb24pXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzQXJyYXkoKTtcbiAgICB9XG5cbiAgICBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgX2FjdGl2ZVJlc291cmNlQ2xhc3M6IFJlc291cmNlQ2xhc3M7XG5cbiAgICAvLyBzZXR0ZXIgbWV0aG9kIGZvciBzZWxlY3RlZCByZXNvdXJjZSBjbGFzc1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGFjdGl2ZVJlc291cmNlQ2xhc3ModmFsdWU6IFJlc291cmNlQ2xhc3MpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlUmVzb3VyY2VDbGFzcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIHJlZmVyZW5jZSB0byBjaGlsZCBjb21wb25lbnQ6IGNvbWJpbmF0aW9uIG9mIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHZhbHVlIGZvciBjaG9zZW4gcHJvcGVydHlcbiAgICBAVmlld0NoaWxkKCdzcGVjaWZ5UHJvcGVydHlWYWx1ZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzcGVjaWZ5UHJvcGVydHlWYWx1ZTogU3BlY2lmeVByb3BlcnR5VmFsdWVDb21wb25lbnQ7XG5cbiAgICAvLyBwcm9wZXJ0aWVzIHRoYXQgY2FuIGJlIHNlbGVjdGVkIGZyb21cbiAgICBwcml2YXRlIF9wcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xuXG4gICAgLy8gcHJvcGVydGllcyBhcyBhbiBBcnJheSBzdHJ1Y3R1cmUgKGJhc2VkIG9uIHRoaXMucHJvcGVydGllcylcbiAgICBwcm9wZXJ0aWVzQXNBcnJheTogQXJyYXk8UHJvcGVydHk+O1xuXG4gICAgLy8gcmVwcmVzZW50cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHByb3BlcnR5XG4gICAgcHJvcGVydHlTZWxlY3RlZDogUHJvcGVydHk7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvLyB1bmlxdWUgbmFtZSBmb3IgdGhpcyBwcm9wZXJ0eSB0byBiZSB1c2VkIGluIHRoZSBwYXJlbnQgRm9ybUdyb3VwXG4gICAgcHJvcEluZGV4OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gYnVpbGQgYSBmb3JtIGZvciB0aGUgcHJvcGVydHkgc2VsZWN0aW9uXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgcHJvcGVydHk6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGlzU29ydENyaXRlcmlvbjogW2ZhbHNlLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHNlbGVjdGVkIHByb3BlcnR5XG4gICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9wSXJpID0gZGF0YS5wcm9wZXJ0eTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlTZWxlY3RlZCA9IHRoaXMuX3Byb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvcEluZGV4ID0gJ3Byb3BlcnR5JyArIHRoaXMuaW5kZXg7XG5cbiAgICAgICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCh0aGlzLnByb3BJbmRleCwgdGhpcy5mb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICAvLyByZW1vdmUgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKHRoaXMucHJvcEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIHByb3BlcnR5IGNhbiBiZSB1c2VkIGFzIGEgc29ydCBjcml0ZXJpb24uXG4gICAgICogUHJvcGVydHkgaGFzIHRvIGhhdmUgY2FyZGluYWxpdHkgb3IgbWF4IGNhcmRpbmFsaXR5IDEgZm9yIHRoZSBjaG9zZW4gcmVzb3VyY2UgY2xhc3MuXG4gICAgICpcbiAgICAgKiBXZSBjYW5ub3Qgc29ydCBieSBwcm9wZXJ0aWVzIHdob3NlIGNhcmRpbmFsaXR5IGlzIGdyZWF0ZXIgdGhhbiAxLlxuICAgICAqIFJldHVybiBib29sZWFuXG4gICAgICovXG4gICAgc29ydENyaXRlcmlvbigpIHtcblxuICAgICAgICAvLyBjaGVjayBpZiBhIHJlc291cmNlIGNsYXNzIGlzIHNlbGVjdGVkIGFuZCBpZiB0aGUgcHJvcGVydHkncyBjYXJkaW5hbGl0eSBpcyAxIGZvciB0aGUgc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVJlc291cmNlQ2xhc3MgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BlcnR5U2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5wcm9wZXJ0eVNlbGVjdGVkLmlzTGlua1Byb3BlcnR5KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXRpZXM6IENhcmRpbmFsaXR5W10gPSB0aGlzLl9hY3RpdmVSZXNvdXJjZUNsYXNzLmNhcmRpbmFsaXRpZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChjYXJkOiBDYXJkaW5hbGl0eSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXJkaW5hbGl0eSAxIG9yIG1heCBvY2N1cnJlbmNlIDFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcmQucHJvcGVydHkgPT09IHRoaXMucHJvcGVydHlTZWxlY3RlZC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgY2FyZC52YWx1ZSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKGNhcmQub2NjdXJyZW5jZSA9PT0gQ2FyZGluYWxpdHlPY2N1cnJlbmNlLmNhcmQgfHwgY2FyZC5vY2N1cnJlbmNlID09PSBDYXJkaW5hbGl0eU9jY3VycmVuY2UubWF4Q2FyZCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gY2FyZGluYWxpdGllcy5sZW5ndGggPT09IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHByb3BlcnRpZXMgYXJyYXkgdGhhdCBpcyBhY2Nlc3NlZCBieSB0aGUgdGVtcGxhdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9wZXJ0aWVzQXJyYXkoKSB7XG5cbiAgICAgICAgLy8gcmVwcmVzZW50IHRoZSBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5IHRvIGJlIGFjY2Vzc2VkIGJ5IHRoZSB0ZW1wbGF0ZVxuICAgICAgICBjb25zdCBwcm9wc0FycmF5ID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wSXJpIGluIHRoaXMuX3Byb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BJcmkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuX3Byb3BlcnRpZXNbcHJvcElyaV07XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGxpc3QgZWRpdGFibGUgcHJvcHMgdGhhdCBhcmUgbm90IGxpbmsgdmFsdWUgcHJvcHNcbiAgICAgICAgICAgICAgICBpZiAocHJvcC5pc0VkaXRhYmxlICYmICFwcm9wLmlzTGlua1ZhbHVlUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHNBcnJheS5wdXNoKHRoaXMuX3Byb3BlcnRpZXNbcHJvcElyaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNvcnQgcHJvcGVydGllcyBieSBsYWJlbCAoYXNjZW5kaW5nKVxuICAgICAgICBwcm9wc0FycmF5LnNvcnQoT250b2xvZ3lJbmZvcm1hdGlvbi5zb3J0RnVuYyk7XG5cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzQXNBcnJheSA9IHByb3BzQXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc2VsZWN0ZWQgcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICAgICAqL1xuICAgIGdldFByb3BlcnR5U2VsZWN0ZWRXaXRoVmFsdWUoKTogUHJvcGVydHlXaXRoVmFsdWUge1xuXG4gICAgICAgIGNvbnN0IHByb3BWYWw6IENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlID0gdGhpcy5zcGVjaWZ5UHJvcGVydHlWYWx1ZS5nZXRDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZUxpdGVyYWxGb3JQcm9wZXJ0eSgpO1xuXG4gICAgICAgIGxldCBpc1NvcnRDcml0ZXJpb24gPSBmYWxzZTtcblxuICAgICAgICAvLyBvbmx5IG5vbiBsaW5raW5nIHByb3BlcnRpZXMgY2FuIGJlIHVzZWQgZm9yIHNvcnRpbmdcbiAgICAgICAgaWYgKCF0aGlzLnByb3BlcnR5U2VsZWN0ZWQuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlzU29ydENyaXRlcmlvbiA9IHRoaXMuZm9ybS52YWx1ZS5pc1NvcnRDcml0ZXJpb247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5V2l0aFZhbHVlKHRoaXMucHJvcGVydHlTZWxlY3RlZCwgcHJvcFZhbCwgaXNTb3J0Q3JpdGVyaW9uKTtcblxuICAgIH1cblxuXG59XG4iXX0=