import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparisonOperatorAndValue, Equals, Exists, GreaterThan, GreaterThanEquals, KnoraConstants, LessThan, LessThanEquals, Like, Match, NotEquals, Property } from '@knora/core';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
export class SpecifyPropertyValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.KnoraConstants = KnoraConstants;
        // available comparison operators for the property
        this.comparisonOperators = [];
    }
    // setter method for the property chosen by the user
    set property(prop) {
        this.comparisonOperatorSelected = undefined; // reset to initial state
        this._property = prop;
        this.resetComparisonOperators(); // reset comparison operators for given property (overwriting any previous selection)
    }
    // getter method for this._property
    get property() {
        return this._property;
    }
    /**
     * Resets the comparison operators for this._property.
     */
    resetComparisonOperators() {
        // depending on object class, set comparison operators and value entry field
        if (this._property.isLinkProperty) {
            this.propertyValueType = KnoraConstants.Resource;
        }
        else {
            this.propertyValueType = this._property.objectType;
        }
        switch (this.propertyValueType) {
            case KnoraConstants.TextValue:
                this.comparisonOperators = [new Like(), new Match(), new Equals(), new NotEquals(), new Exists()];
                break;
            case KnoraConstants.BooleanValue:
            case KnoraConstants.Resource:
            case KnoraConstants.UriValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;
            case KnoraConstants.IntValue:
            case KnoraConstants.DecimalValue:
            case KnoraConstants.DateValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new LessThan(), new LessThanEquals(), new GreaterThan(), new GreaterThanEquals(), new Exists()];
                break;
            case KnoraConstants.ListValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;
            case KnoraConstants.GeomValue:
            case KnoraConstants.FileValue:
            case KnoraConstants.AudioFileValue:
            case KnoraConstants.StillImageFileValue:
            case KnoraConstants.DDDFileValue:
            case KnoraConstants.MovingImageFileValue:
            case KnoraConstants.TextFileValue:
            case KnoraConstants.ColorValue:
            case KnoraConstants.IntervalValue:
                this.comparisonOperators = [new Exists()];
                break;
            default:
                console.log('ERROR: Unsupported value type ' + this._property.objectType);
        }
    }
    ngOnInit() {
    }
    ngOnChanges() {
        // build a form for comparison operator selection
        this.form = this.fb.group({
            comparisonOperator: [null, Validators.required]
        });
        // store comparison operator when selected
        this.form.valueChanges.subscribe((data) => {
            this.comparisonOperatorSelected = data.comparisonOperator;
        });
        resolvedPromise.then(() => {
            // remove from the parent form group (clean reset)
            this.formGroup.removeControl('comparisonOperator');
            // add form to the parent form group
            this.formGroup.addControl('comparisonOperator', this.form);
        });
    }
    /**
     * Gets the specified comparison operator and value for the property.
     *
     * returns {ComparisonOperatorAndValue} the comparison operator and the specified value
     */
    getComparisonOperatorAndValueLiteralForProperty() {
        // return value (literal or IRI) from the child component
        let value;
        // comparison operator 'Exists' does not require a value
        if (this.comparisonOperatorSelected.getClassName() !== 'Exists') {
            value = this.propertyValueComponent.getValue();
        }
        // return the comparison operator and the specified value
        return new ComparisonOperatorAndValue(this.comparisonOperatorSelected, value);
    }
}
SpecifyPropertyValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-specify-property-value',
                template: "<mat-form-field class=\"search-operator-field small-field\" *ngIf=\"comparisonOperators?.length > 0\">\n  <mat-select placeholder=\"Comparison Operator\" [formControl]=\"form.controls['comparisonOperator']\">\n    <mat-option *ngFor=\"let compOp of comparisonOperators\" [value]=\"compOp\">{{ compOp.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<!-- select apt component for value specification using a switch case statement-->\n<span *ngIf=\"comparisonOperatorSelected !== undefined && comparisonOperatorSelected !== null && comparisonOperatorSelected.getClassName() != 'Exists'\"\n      [ngSwitch]=\"propertyValueType\">\n  <boolean-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.BooleanValue\"></boolean-value>\n  <date-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DateValue\"></date-value>\n  <decimal-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DecimalValue\"></decimal-value>\n  <integer-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.IntValue\"></integer-value>\n  <link-value #propertyValue [formGroup]=\"form\" [restrictResourceClass]=\"property.objectType\"\n              *ngSwitchCase=\"KnoraConstants.Resource\"></link-value>\n  <text-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.TextValue\"></text-value>\n  <uri-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.UriValue\"></uri-value>\n  <list-value #propertyValue [formGroup]=\"form\" [property]=\"property\" *ngSwitchCase=\"KnoraConstants.ListValue\">\n  </list-value>\n\n  <!-- TODO: Resource: handle linking properties with target class restriction: access property member to get objectClass via property() getter method -->\n  <span *ngSwitchDefault=\"\">Not supported {{propertyValueType}}</span>\n</span>\n",
                styles: [".search-operator-field{margin-right:8px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
SpecifyPropertyValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
SpecifyPropertyValueComponent.propDecorators = {
    formGroup: [{ type: Input }],
    propertyValueComponent: [{ type: ViewChild, args: ['propertyValue',] }],
    property: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBRUgsMEJBQTBCLEVBQzFCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsUUFBUSxFQUNSLGNBQWMsRUFDZCxJQUFJLEVBQ0osS0FBSyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBR1gsTUFBTSxhQUFhLENBQUM7QUFHckIsd0hBQXdIO0FBQ3hILE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFPOUMsTUFBTSxPQUFPLDZCQUE2QjtJQW1DdEMsWUFBMEMsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUFqQ3pELG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBd0JoQyxrREFBa0Q7UUFDbEQsd0JBQW1CLEdBQThCLEVBQUUsQ0FBQztJQVNwRCxDQUFDO0lBM0JELG9EQUFvRDtJQUNwRCxJQUNJLFFBQVEsQ0FBQyxJQUFjO1FBQ3ZCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxTQUFTLENBQUMsQ0FBQyx5QkFBeUI7UUFDdEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxxRkFB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QUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFFdEIsa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFbkQsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsK0NBQStDO1FBQzNDLHlEQUF5RDtRQUN6RCxJQUFJLEtBQVksQ0FBQztRQUVqQix3REFBd0Q7UUFDeEQsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQzdELEtBQUssR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbEQ7UUFFRCx5REFBeUQ7UUFDekQsT0FBTyxJQUFJLDBCQUEwQixDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUVsRixDQUFDOzs7WUEzSUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLDIwREFBc0Q7O2FBRXpEOzs7O1lBM0JRLFdBQVcsdUJBK0RGLE1BQU0sU0FBQyxXQUFXOzs7d0JBOUIvQixLQUFLO3FDQUVMLFNBQVMsU0FBQyxlQUFlO3VCQUd6QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBDb21wYXJpc29uT3BlcmF0b3IsXG4gICAgQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUsXG4gICAgRXF1YWxzLFxuICAgIEV4aXN0cyxcbiAgICBHcmVhdGVyVGhhbixcbiAgICBHcmVhdGVyVGhhbkVxdWFscyxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBMZXNzVGhhbixcbiAgICBMZXNzVGhhbkVxdWFscyxcbiAgICBMaWtlLFxuICAgIE1hdGNoLFxuICAgIE5vdEVxdWFscyxcbiAgICBQcm9wZXJ0eSxcbiAgICBQcm9wZXJ0eVZhbHVlLFxuICAgIFZhbHVlXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NwZWNpZnktcHJvcGVydHktdmFsdWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NwZWNpZnktcHJvcGVydHktdmFsdWUuY29tcG9uZW50LnNjc3MnLCAnLi4vLi4vLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3BlY2lmeVByb3BlcnR5VmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuXG4gICAgLy8gcGFyZW50IEZvcm1Hcm91cFxuICAgIEBJbnB1dCgpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gICAgQFZpZXdDaGlsZCgncHJvcGVydHlWYWx1ZScpIHByb3BlcnR5VmFsdWVDb21wb25lbnQ6IFByb3BlcnR5VmFsdWU7XG5cbiAgICAvLyBzZXR0ZXIgbWV0aG9kIGZvciB0aGUgcHJvcGVydHkgY2hvc2VuIGJ5IHRoZSB1c2VyXG4gICAgQElucHV0KClcbiAgICBzZXQgcHJvcGVydHkocHJvcDogUHJvcGVydHkpIHtcbiAgICAgICAgdGhpcy5jb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZCA9IHVuZGVmaW5lZDsgLy8gcmVzZXQgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICB0aGlzLl9wcm9wZXJ0eSA9IHByb3A7XG4gICAgICAgIHRoaXMucmVzZXRDb21wYXJpc29uT3BlcmF0b3JzKCk7IC8vIHJlc2V0IGNvbXBhcmlzb24gb3BlcmF0b3JzIGZvciBnaXZlbiBwcm9wZXJ0eSAob3ZlcndyaXRpbmcgYW55IHByZXZpb3VzIHNlbGVjdGlvbilcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXIgbWV0aG9kIGZvciB0aGlzLl9wcm9wZXJ0eVxuICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHk7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvLyBhdmFpbGFibGUgY29tcGFyaXNvbiBvcGVyYXRvcnMgZm9yIHRoZSBwcm9wZXJ0eVxuICAgIGNvbXBhcmlzb25PcGVyYXRvcnM6IEFycmF5PENvbXBhcmlzb25PcGVyYXRvcj4gPSBbXTtcblxuICAgIC8vIGNvbXBhcmlzb24gb3BlcmF0b3Igc2VsZWN0ZWQgYnkgdGhlIHVzZXJcbiAgICBjb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZDogQ29tcGFyaXNvbk9wZXJhdG9yO1xuXG4gICAgLy8gdGhlIHR5cGUgb2YgdGhlIHByb3BlcnR5XG4gICAgcHJvcGVydHlWYWx1ZVR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvciAoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3JzIGZvciB0aGlzLl9wcm9wZXJ0eS5cbiAgICAgKi9cbiAgICByZXNldENvbXBhcmlzb25PcGVyYXRvcnMoKSB7XG5cbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIG9iamVjdCBjbGFzcywgc2V0IGNvbXBhcmlzb24gb3BlcmF0b3JzIGFuZCB2YWx1ZSBlbnRyeSBmaWVsZFxuICAgICAgICBpZiAodGhpcy5fcHJvcGVydHkuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlWYWx1ZVR5cGUgPSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydHlWYWx1ZVR5cGUgPSB0aGlzLl9wcm9wZXJ0eS5vYmplY3RUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByb3BlcnR5VmFsdWVUeXBlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dFZhbHVlOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9ycyA9IFtuZXcgTGlrZSgpLCBuZXcgTWF0Y2goKSwgbmV3IEVxdWFscygpLCBuZXcgTm90RXF1YWxzKCksIG5ldyBFeGlzdHMoKV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZTpcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVXJpVmFsdWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wYXJpc29uT3BlcmF0b3JzID0gW25ldyBFcXVhbHMoKSwgbmV3IE5vdEVxdWFscygpLCBuZXcgRXhpc3RzKCldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludFZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhcmlzb25PcGVyYXRvcnMgPSBbbmV3IEVxdWFscygpLCBuZXcgTm90RXF1YWxzKCksIG5ldyBMZXNzVGhhbigpLCBuZXcgTGVzc1RoYW5FcXVhbHMoKSwgbmV3IEdyZWF0ZXJUaGFuKCksIG5ldyBHcmVhdGVyVGhhbkVxdWFscygpLCBuZXcgRXhpc3RzKCldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhcmlzb25PcGVyYXRvcnMgPSBbbmV3IEVxdWFscygpLCBuZXcgTm90RXF1YWxzKCksIG5ldyBFeGlzdHMoKV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuR2VvbVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5GaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkF1ZGlvRmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5ERERGaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLk1vdmluZ0ltYWdlRmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9ycyA9IFtuZXcgRXhpc3RzKCldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogVW5zdXBwb3J0ZWQgdmFsdWUgdHlwZSAnICsgdGhpcy5fcHJvcGVydHkub2JqZWN0VHlwZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG5cbiAgICAgICAgLy8gYnVpbGQgYSBmb3JtIGZvciBjb21wYXJpc29uIG9wZXJhdG9yIHNlbGVjdGlvblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHN0b3JlIGNvbXBhcmlzb24gb3BlcmF0b3Igd2hlbiBzZWxlY3RlZFxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZCA9IGRhdGEuY29tcGFyaXNvbk9wZXJhdG9yO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cCAoY2xlYW4gcmVzZXQpXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdjb21wYXJpc29uT3BlcmF0b3InKTtcblxuICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdjb21wYXJpc29uT3BlcmF0b3InLCB0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogcmV0dXJucyB7Q29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWV9IHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCB0aGUgc3BlY2lmaWVkIHZhbHVlXG4gICAgICovXG4gICAgZ2V0Q29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWVMaXRlcmFsRm9yUHJvcGVydHkoKTogQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUge1xuICAgICAgICAvLyByZXR1cm4gdmFsdWUgKGxpdGVyYWwgb3IgSVJJKSBmcm9tIHRoZSBjaGlsZCBjb21wb25lbnRcbiAgICAgICAgbGV0IHZhbHVlOiBWYWx1ZTtcblxuICAgICAgICAvLyBjb21wYXJpc29uIG9wZXJhdG9yICdFeGlzdHMnIGRvZXMgbm90IHJlcXVpcmUgYSB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5jb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZC5nZXRDbGFzc05hbWUoKSAhPT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wcm9wZXJ0eVZhbHVlQ29tcG9uZW50LmdldFZhbHVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHRoZSBzcGVjaWZpZWQgdmFsdWVcbiAgICAgICAgcmV0dXJuIG5ldyBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSh0aGlzLmNvbXBhcmlzb25PcGVyYXRvclNlbGVjdGVkLCB2YWx1ZSk7XG5cbiAgICB9XG5cbn1cblxuIl19