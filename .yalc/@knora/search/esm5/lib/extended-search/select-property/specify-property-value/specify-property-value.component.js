import * as tslib_1 from "tslib";
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparisonOperatorAndValue, Equals, Exists, GreaterThan, GreaterThanEquals, KnoraConstants, LessThan, LessThanEquals, Like, Match, NotEquals, Property } from '@knora/core';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
var resolvedPromise = Promise.resolve(null);
var SpecifyPropertyValueComponent = /** @class */ (function () {
    function SpecifyPropertyValueComponent(fb) {
        this.fb = fb;
        this.KnoraConstants = KnoraConstants;
        // available comparison operators for the property
        this.comparisonOperators = [];
    }
    Object.defineProperty(SpecifyPropertyValueComponent.prototype, "property", {
        // getter method for this._property
        get: function () {
            return this._property;
        },
        // setter method for the property chosen by the user
        set: function (prop) {
            this.comparisonOperatorSelected = undefined; // reset to initial state
            this._property = prop;
            this.resetComparisonOperators(); // reset comparison operators for given property (overwriting any previous selection)
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the comparison operators for this._property.
     */
    SpecifyPropertyValueComponent.prototype.resetComparisonOperators = function () {
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
    };
    SpecifyPropertyValueComponent.prototype.ngOnInit = function () {
    };
    SpecifyPropertyValueComponent.prototype.ngOnChanges = function () {
        var _this = this;
        // build a form for comparison operator selection
        this.form = this.fb.group({
            comparisonOperator: [null, Validators.required]
        });
        // store comparison operator when selected
        this.form.valueChanges.subscribe(function (data) {
            _this.comparisonOperatorSelected = data.comparisonOperator;
        });
        resolvedPromise.then(function () {
            // remove from the parent form group (clean reset)
            _this.formGroup.removeControl('comparisonOperator');
            // add form to the parent form group
            _this.formGroup.addControl('comparisonOperator', _this.form);
        });
    };
    /**
     * Gets the specified comparison operator and value for the property.
     *
     * returns {ComparisonOperatorAndValue} the comparison operator and the specified value
     */
    SpecifyPropertyValueComponent.prototype.getComparisonOperatorAndValueLiteralForProperty = function () {
        // return value (literal or IRI) from the child component
        var value;
        // comparison operator 'Exists' does not require a value
        if (this.comparisonOperatorSelected.getClassName() !== 'Exists') {
            value = this.propertyValueComponent.getValue();
        }
        // return the comparison operator and the specified value
        return new ComparisonOperatorAndValue(this.comparisonOperatorSelected, value);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormGroup)
    ], SpecifyPropertyValueComponent.prototype, "formGroup", void 0);
    tslib_1.__decorate([
        ViewChild('propertyValue', { static: false }),
        tslib_1.__metadata("design:type", Object)
    ], SpecifyPropertyValueComponent.prototype, "propertyValueComponent", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Property),
        tslib_1.__metadata("design:paramtypes", [Property])
    ], SpecifyPropertyValueComponent.prototype, "property", null);
    SpecifyPropertyValueComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-specify-property-value',
            template: "<mat-form-field class=\"search-operator-field small-field\" *ngIf=\"comparisonOperators?.length > 0\">\n  <mat-select placeholder=\"Comparison Operator\" [formControl]=\"form.controls['comparisonOperator']\">\n    <mat-option *ngFor=\"let compOp of comparisonOperators\" [value]=\"compOp\">{{ compOp.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<!-- select apt component for value specification using a switch case statement-->\n<span *ngIf=\"comparisonOperatorSelected !== undefined && comparisonOperatorSelected !== null && comparisonOperatorSelected.getClassName() != 'Exists'\"\n      [ngSwitch]=\"propertyValueType\">\n  <boolean-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.BooleanValue\"></boolean-value>\n  <date-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DateValue\"></date-value>\n  <decimal-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DecimalValue\"></decimal-value>\n  <integer-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.IntValue\"></integer-value>\n  <link-value #propertyValue [formGroup]=\"form\" [restrictResourceClass]=\"property.objectType\"\n              *ngSwitchCase=\"KnoraConstants.Resource\"></link-value>\n  <text-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.TextValue\"></text-value>\n  <uri-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.UriValue\"></uri-value>\n  <list-value #propertyValue [formGroup]=\"form\" [property]=\"property\" *ngSwitchCase=\"KnoraConstants.ListValue\">\n  </list-value>\n\n  <!-- TODO: Resource: handle linking properties with target class restriction: access property member to get objectClass via property() getter method -->\n  <span *ngSwitchDefault=\"\">Not supported {{propertyValueType}}</span>\n</span>\n",
            styles: [".search-operator-field{margin-right:8px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}.mat-datepicker-content .mat-calendar{height:auto!important}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
        }),
        tslib_1.__param(0, Inject(FormBuilder)),
        tslib_1.__metadata("design:paramtypes", [FormBuilder])
    ], SpecifyPropertyValueComponent);
    return SpecifyPropertyValueComponent;
}());
export { SpecifyPropertyValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUVILDBCQUEwQixFQUMxQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsY0FBYyxFQUNkLFFBQVEsRUFDUixjQUFjLEVBQ2QsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUdYLE1BQU0sYUFBYSxDQUFDO0FBR3JCLHdIQUF3SDtBQUN4SCxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBTzlDO0lBbUNJLHVDQUF5QyxFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQWpDeEQsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUF3QmhDLGtEQUFrRDtRQUNsRCx3QkFBbUIsR0FBOEIsRUFBRSxDQUFDO0lBU3BELENBQUM7SUF6QkQsc0JBQUksbURBQVE7UUFNWixtQ0FBbUM7YUFDbkM7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQVhELG9EQUFvRDthQUVwRCxVQUFhLElBQWM7WUFDdkIsSUFBSSxDQUFDLDBCQUEwQixHQUFHLFNBQVMsQ0FBQyxDQUFDLHlCQUF5QjtZQUN0RSxJQUFJLENBQUMsU0FBUyxHQUFHLElB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QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIENvbXBhcmlzb25PcGVyYXRvcixcbiAgICBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSxcbiAgICBFcXVhbHMsXG4gICAgRXhpc3RzLFxuICAgIEdyZWF0ZXJUaGFuLFxuICAgIEdyZWF0ZXJUaGFuRXF1YWxzLFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIExlc3NUaGFuLFxuICAgIExlc3NUaGFuRXF1YWxzLFxuICAgIExpa2UsXG4gICAgTWF0Y2gsXG4gICAgTm90RXF1YWxzLFxuICAgIFByb3BlcnR5LFxuICAgIFByb3BlcnR5VmFsdWUsXG4gICAgVmFsdWVcbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1NjYxMDEwL2R5bmFtaWMtbmVzdGVkLXJlYWN0aXZlLWZvcm0tZXhwcmVzc2lvbmNoYW5nZWRhZnRlcml0aGFzYmVlbmNoZWNrZWRlcnJvclxuY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1zcGVjaWZ5LXByb3BlcnR5LXZhbHVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS5jb21wb25lbnQuc2NzcycsICcuLi8uLi8uLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTcGVjaWZ5UHJvcGVydHlWYWx1ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICBAVmlld0NoaWxkKCdwcm9wZXJ0eVZhbHVlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByb3BlcnR5VmFsdWVDb21wb25lbnQ6IFByb3BlcnR5VmFsdWU7XG5cbiAgICAvLyBzZXR0ZXIgbWV0aG9kIGZvciB0aGUgcHJvcGVydHkgY2hvc2VuIGJ5IHRoZSB1c2VyXG4gICAgQElucHV0KClcbiAgICBzZXQgcHJvcGVydHkocHJvcDogUHJvcGVydHkpIHtcbiAgICAgICAgdGhpcy5jb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZCA9IHVuZGVmaW5lZDsgLy8gcmVzZXQgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICB0aGlzLl9wcm9wZXJ0eSA9IHByb3A7XG4gICAgICAgIHRoaXMucmVzZXRDb21wYXJpc29uT3BlcmF0b3JzKCk7IC8vIHJlc2V0IGNvbXBhcmlzb24gb3BlcmF0b3JzIGZvciBnaXZlbiBwcm9wZXJ0eSAob3ZlcndyaXRpbmcgYW55IHByZXZpb3VzIHNlbGVjdGlvbilcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXIgbWV0aG9kIGZvciB0aGlzLl9wcm9wZXJ0eVxuICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHk7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICAvLyBhdmFpbGFibGUgY29tcGFyaXNvbiBvcGVyYXRvcnMgZm9yIHRoZSBwcm9wZXJ0eVxuICAgIGNvbXBhcmlzb25PcGVyYXRvcnM6IEFycmF5PENvbXBhcmlzb25PcGVyYXRvcj4gPSBbXTtcblxuICAgIC8vIGNvbXBhcmlzb24gb3BlcmF0b3Igc2VsZWN0ZWQgYnkgdGhlIHVzZXJcbiAgICBjb21wYXJpc29uT3BlcmF0b3JTZWxlY3RlZDogQ29tcGFyaXNvbk9wZXJhdG9yO1xuXG4gICAgLy8gdGhlIHR5cGUgb2YgdGhlIHByb3BlcnR5XG4gICAgcHJvcGVydHlWYWx1ZVR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgY29tcGFyaXNvbiBvcGVyYXRvcnMgZm9yIHRoaXMuX3Byb3BlcnR5LlxuICAgICAqL1xuICAgIHJlc2V0Q29tcGFyaXNvbk9wZXJhdG9ycygpIHtcblxuICAgICAgICAvLyBkZXBlbmRpbmcgb24gb2JqZWN0IGNsYXNzLCBzZXQgY29tcGFyaXNvbiBvcGVyYXRvcnMgYW5kIHZhbHVlIGVudHJ5IGZpZWxkXG4gICAgICAgIGlmICh0aGlzLl9wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eVZhbHVlVHlwZSA9IEtub3JhQ29uc3RhbnRzLlJlc291cmNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eVZhbHVlVHlwZSA9IHRoaXMuX3Byb3BlcnR5Lm9iamVjdFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcGVydHlWYWx1ZVR5cGUpIHtcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0VmFsdWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wYXJpc29uT3BlcmF0b3JzID0gW25ldyBMaWtlKCksIG5ldyBNYXRjaCgpLCBuZXcgRXF1YWxzKCksIG5ldyBOb3RFcXVhbHMoKSwgbmV3IEV4aXN0cygpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlJlc291cmNlOlxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhcmlzb25PcGVyYXRvcnMgPSBbbmV3IEVxdWFscygpLCBuZXcgTm90RXF1YWxzKCksIG5ldyBFeGlzdHMoKV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTpcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9ycyA9IFtuZXcgRXF1YWxzKCksIG5ldyBOb3RFcXVhbHMoKSwgbmV3IExlc3NUaGFuKCksIG5ldyBMZXNzVGhhbkVxdWFscygpLCBuZXcgR3JlYXRlclRoYW4oKSwgbmV3IEdyZWF0ZXJUaGFuRXF1YWxzKCksIG5ldyBFeGlzdHMoKV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTGlzdFZhbHVlOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyaXNvbk9wZXJhdG9ycyA9IFtuZXcgRXF1YWxzKCksIG5ldyBOb3RFcXVhbHMoKSwgbmV3IEV4aXN0cygpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkZpbGVWYWx1ZTpcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQXVkaW9GaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkREREZpbGVWYWx1ZTpcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuTW92aW5nSW1hZ2VGaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU6XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wYXJpc29uT3BlcmF0b3JzID0gW25ldyBFeGlzdHMoKV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SOiBVbnN1cHBvcnRlZCB2YWx1ZSB0eXBlICcgKyB0aGlzLl9wcm9wZXJ0eS5vYmplY3RUeXBlKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcblxuICAgICAgICAvLyBidWlsZCBhIGZvcm0gZm9yIGNvbXBhcmlzb24gb3BlcmF0b3Igc2VsZWN0aW9uXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc3RvcmUgY29tcGFyaXNvbiBvcGVyYXRvciB3aGVuIHNlbGVjdGVkXG4gICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBhcmlzb25PcGVyYXRvclNlbGVjdGVkID0gZGF0YS5jb21wYXJpc29uT3BlcmF0b3I7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwIChjbGVhbiByZXNldClcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woJ2NvbXBhcmlzb25PcGVyYXRvcicpO1xuXG4gICAgICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ2NvbXBhcmlzb25PcGVyYXRvcicsIHRoaXMuZm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHZhbHVlIGZvciB0aGUgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiByZXR1cm5zIHtDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZX0gdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIHRoZSBzcGVjaWZpZWQgdmFsdWVcbiAgICAgKi9cbiAgICBnZXRDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZUxpdGVyYWxGb3JQcm9wZXJ0eSgpOiBDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZSB7XG4gICAgICAgIC8vIHJldHVybiB2YWx1ZSAobGl0ZXJhbCBvciBJUkkpIGZyb20gdGhlIGNoaWxkIGNvbXBvbmVudFxuICAgICAgICBsZXQgdmFsdWU6IFZhbHVlO1xuXG4gICAgICAgIC8vIGNvbXBhcmlzb24gb3BlcmF0b3IgJ0V4aXN0cycgZG9lcyBub3QgcmVxdWlyZSBhIHZhbHVlXG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmlzb25PcGVyYXRvclNlbGVjdGVkLmdldENsYXNzTmFtZSgpICE9PSAnRXhpc3RzJykge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnByb3BlcnR5VmFsdWVDb21wb25lbnQuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuICAgICAgICByZXR1cm4gbmV3IENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlKHRoaXMuY29tcGFyaXNvbk9wZXJhdG9yU2VsZWN0ZWQsIHZhbHVlKTtcblxuICAgIH1cblxufVxuXG4iXX0=