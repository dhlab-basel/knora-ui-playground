import * as tslib_1 from "tslib";
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
let SelectResourceClassComponent = class SelectResourceClassComponent {
    constructor(fb) {
        this.fb = fb;
        // event emitted to parent component once a resource class is selected by the user
        this.resourceClassSelectedEvent = new EventEmitter();
    }
    // setter method for resource classes when being updated by parent component
    set resourceClasses(value) {
        this.resourceClassSelected = undefined; // reset on updates
        this._resourceClasses = value;
    }
    // getter method for resource classes (used in template)
    get resourceClasses() {
        return this._resourceClasses;
    }
    /**
     * Returns the Iri of the selected resource class.
     *
     * @returns the Iri of the selected resource class or false in case no resource class is selected.
     */
    getResourceClassSelected() {
        if (this.resourceClassSelected !== undefined && this.resourceClassSelected !== null) {
            return this.resourceClassSelected;
        }
        else {
            return false;
        }
    }
    /**
     * Initalizes the FormGroup for the resource class selection.
     * The initial value is set to null.
     */
    initForm() {
        // build a form for the resource class selection
        this.form = this.fb.group({
            resourceClass: [null] // resource class selection is optional
        });
        // store and emit Iri of the resource class when selected
        this.form.valueChanges.subscribe((data) => {
            this.resourceClassSelected = data.resourceClass;
            this.resourceClassSelectedEvent.emit(this.resourceClassSelected);
        });
    }
    ngOnInit() {
        this.initForm();
        // add form to the parent form group
        this.formGroup.addControl('resourceClass', this.form);
    }
    ngOnChanges() {
        if (this.form !== undefined) {
            // resource classes have been reinitialized
            // reset form
            resolvedPromise.then(() => {
                // remove this form from the parent form group
                this.formGroup.removeControl('resourceClass');
                this.initForm();
                // add form to the parent form group
                this.formGroup.addControl('resourceClass', this.form);
            });
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", FormGroup)
], SelectResourceClassComponent.prototype, "formGroup", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array),
    tslib_1.__metadata("design:paramtypes", [Array])
], SelectResourceClassComponent.prototype, "resourceClasses", null);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SelectResourceClassComponent.prototype, "resourceClassSelectedEvent", void 0);
SelectResourceClassComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-select-resource-class',
        template: "<mat-form-field *ngIf=\"resourceClasses.length > 0\" class=\"large-field\">\n  <mat-select placeholder=\"Select a Resource Class (optional)\" [formControl]=\"form.controls['resourceClass']\">\n    <mat-option [value]=\"null\">no selection</mat-option>\n    <!-- undo selection of a resource class -->\n    <mat-option *ngFor=\"let resourceClass of resourceClasses\" [value]=\"resourceClass.id\">{{ resourceClass.label }}\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n",
        styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}.mat-datepicker-content .mat-calendar{height:auto!important}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
    }),
    tslib_1.__param(0, Inject(FormBuilder)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], SelectResourceClassComponent);
export { SelectResourceClassComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXJlc291cmNlLWNsYXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy9zZWxlY3QtcmVzb3VyY2UtY2xhc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwRSx3SEFBd0g7QUFDeEgsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQU85QyxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQTJCckMsWUFBeUMsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUFYeEQsa0ZBQWtGO1FBQ3hFLCtCQUEwQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFXbEUsQ0FBQztJQXhCRCw0RUFBNEU7SUFFNUUsSUFBSSxlQUFlLENBQUMsS0FBMkI7UUFDM0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQjtRQUMzRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsSUFBSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQWdCRDs7OztPQUlHO0lBQ0gsd0JBQXdCO1FBQ3BCLElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssSUFBSSxFQUFFO1lBQ2pGLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ3JDO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxRQUFRO1FBQ1osZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDdEIsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsdUNBQXVDO1NBQ2hFLENBQUMsQ0FBQztRQUVILHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVE7UUFFSixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFMUQsQ0FBQztJQUVELFdBQVc7UUFFUCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBRXpCLDJDQUEyQztZQUMzQyxhQUFhO1lBQ2IsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBRXRCLDhDQUE4QztnQkFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRTlDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFaEIsb0NBQW9DO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFELENBQUMsQ0FBQyxDQUFDO1NBRU47SUFDTCxDQUFDO0NBRUosQ0FBQTtBQXhGWTtJQUFSLEtBQUssRUFBRTtzQ0FBWSxTQUFTOytEQUFDO0FBSTlCO0lBREMsS0FBSyxFQUFFO3NDQUNtQixLQUFLOzZDQUFMLEtBQUs7bUVBRy9CO0FBUVM7SUFBVCxNQUFNLEVBQUU7O2dGQUF5RDtBQWpCekQsNEJBQTRCO0lBTHhDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSwyQkFBMkI7UUFDckMseWVBQXFEOztLQUV4RCxDQUFDO0lBNEJlLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTs2Q0FBYSxXQUFXO0dBM0IvQyw0QkFBNEIsQ0EwRnhDO1NBMUZZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVzb3VyY2VDbGFzcyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlbGVjdC1yZXNvdXJjZS1jbGFzcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LXJlc291cmNlLWNsYXNzLmNvbXBvbmVudC5zY3NzJywgJy4uLy4uL2Fzc2V0cy9zdHlsZS9zZWFyY2guc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFJlc291cmNlQ2xhc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICAgIC8vIHNldHRlciBtZXRob2QgZm9yIHJlc291cmNlIGNsYXNzZXMgd2hlbiBiZWluZyB1cGRhdGVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgICBASW5wdXQoKVxuICAgIHNldCByZXNvdXJjZUNsYXNzZXModmFsdWU6IEFycmF5PFJlc291cmNlQ2xhc3M+KSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc1NlbGVjdGVkID0gdW5kZWZpbmVkOyAvLyByZXNldCBvbiB1cGRhdGVzXG4gICAgICAgIHRoaXMuX3Jlc291cmNlQ2xhc3NlcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGdldHRlciBtZXRob2QgZm9yIHJlc291cmNlIGNsYXNzZXMgKHVzZWQgaW4gdGVtcGxhdGUpXG4gICAgZ2V0IHJlc291cmNlQ2xhc3NlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlQ2xhc3NlcztcbiAgICB9XG5cbiAgICAvLyBldmVudCBlbWl0dGVkIHRvIHBhcmVudCBjb21wb25lbnQgb25jZSBhIHJlc291cmNlIGNsYXNzIGlzIHNlbGVjdGVkIGJ5IHRoZSB1c2VyXG4gICAgQE91dHB1dCgpIHJlc291cmNlQ2xhc3NTZWxlY3RlZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICAvLyBhdmFpbGFibGUgcmVzb3VyY2UgY2xhc3NlcyBmb3Igc2VsZWN0aW9uXG4gICAgcHJpdmF0ZSBfcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxSZXNvdXJjZUNsYXNzPjtcblxuICAgIC8vIHN0b3JlcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJlc291cmNlIGNsYXNzXG4gICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzU2VsZWN0ZWQ6IHN0cmluZztcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgSXJpIG9mIHRoZSBzZWxlY3RlZCByZXNvdXJjZSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSBJcmkgb2YgdGhlIHNlbGVjdGVkIHJlc291cmNlIGNsYXNzIG9yIGZhbHNlIGluIGNhc2Ugbm8gcmVzb3VyY2UgY2xhc3MgaXMgc2VsZWN0ZWQuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc1NlbGVjdGVkKCk6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLnJlc291cmNlQ2xhc3NTZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVzb3VyY2VDbGFzc1NlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzU2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0YWxpemVzIHRoZSBGb3JtR3JvdXAgZm9yIHRoZSByZXNvdXJjZSBjbGFzcyBzZWxlY3Rpb24uXG4gICAgICogVGhlIGluaXRpYWwgdmFsdWUgaXMgc2V0IHRvIG51bGwuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0Rm9ybSgpIHtcbiAgICAgICAgLy8gYnVpbGQgYSBmb3JtIGZvciB0aGUgcmVzb3VyY2UgY2xhc3Mgc2VsZWN0aW9uXG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgcmVzb3VyY2VDbGFzczogW251bGxdIC8vIHJlc291cmNlIGNsYXNzIHNlbGVjdGlvbiBpcyBvcHRpb25hbFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzdG9yZSBhbmQgZW1pdCBJcmkgb2YgdGhlIHJlc291cmNlIGNsYXNzIHdoZW4gc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc1NlbGVjdGVkID0gZGF0YS5yZXNvdXJjZUNsYXNzO1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzU2VsZWN0ZWRFdmVudC5lbWl0KHRoaXMucmVzb3VyY2VDbGFzc1NlbGVjdGVkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuXG4gICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdyZXNvdXJjZUNsYXNzJywgdGhpcy5mb3JtKTtcblxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAvLyByZXNvdXJjZSBjbGFzc2VzIGhhdmUgYmVlbiByZWluaXRpYWxpemVkXG4gICAgICAgICAgICAvLyByZXNldCBmb3JtXG4gICAgICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhpcyBmb3JtIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAucmVtb3ZlQ29udHJvbCgncmVzb3VyY2VDbGFzcycpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgncmVzb3VyY2VDbGFzcycsIHRoaXMuZm9ybSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==