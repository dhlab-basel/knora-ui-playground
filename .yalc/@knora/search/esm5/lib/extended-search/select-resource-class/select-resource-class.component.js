import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
var resolvedPromise = Promise.resolve(null);
var SelectResourceClassComponent = /** @class */ (function () {
    function SelectResourceClassComponent(fb) {
        this.fb = fb;
        // event emitted to parent component once a resource class is selected by the user
        this.resourceClassSelectedEvent = new EventEmitter();
    }
    Object.defineProperty(SelectResourceClassComponent.prototype, "resourceClasses", {
        // getter method for resource classes (used in template)
        get: function () {
            return this._resourceClasses;
        },
        // setter method for resource classes when being updated by parent component
        set: function (value) {
            this.resourceClassSelected = undefined; // reset on updates
            this._resourceClasses = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the Iri of the selected resource class.
     *
     * @returns the Iri of the selected resource class or false in case no resource class is selected.
     */
    SelectResourceClassComponent.prototype.getResourceClassSelected = function () {
        if (this.resourceClassSelected !== undefined && this.resourceClassSelected !== null) {
            return this.resourceClassSelected;
        }
        else {
            return false;
        }
    };
    /**
     * Initalizes the FormGroup for the resource class selection.
     * The initial value is set to null.
     */
    SelectResourceClassComponent.prototype.initForm = function () {
        var _this = this;
        // build a form for the resource class selection
        this.form = this.fb.group({
            resourceClass: [null] // resource class selection is optional
        });
        // store and emit Iri of the resource class when selected
        this.form.valueChanges.subscribe(function (data) {
            _this.resourceClassSelected = data.resourceClass;
            _this.resourceClassSelectedEvent.emit(_this.resourceClassSelected);
        });
    };
    SelectResourceClassComponent.prototype.ngOnInit = function () {
        this.initForm();
        // add form to the parent form group
        this.formGroup.addControl('resourceClass', this.form);
    };
    SelectResourceClassComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.form !== undefined) {
            // resource classes have been reinitialized
            // reset form
            resolvedPromise.then(function () {
                // remove this form from the parent form group
                _this.formGroup.removeControl('resourceClass');
                _this.initForm();
                // add form to the parent form group
                _this.formGroup.addControl('resourceClass', _this.form);
            });
        }
    };
    SelectResourceClassComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-select-resource-class',
                    template: "<mat-form-field *ngIf=\"resourceClasses.length > 0\" class=\"large-field\">\n  <mat-select placeholder=\"Select a Resource Class (optional)\" [formControl]=\"form.controls['resourceClass']\">\n    <mat-option [value]=\"null\">no selection</mat-option>\n    <!-- undo selection of a resource class -->\n    <mat-option *ngFor=\"let resourceClass of resourceClasses\" [value]=\"resourceClass.id\">{{ resourceClass.label }}\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n",
                    styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
                }] }
    ];
    /** @nocollapse */
    SelectResourceClassComponent.ctorParameters = function () { return [
        { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
    ]; };
    SelectResourceClassComponent.propDecorators = {
        formGroup: [{ type: Input }],
        resourceClasses: [{ type: Input }],
        resourceClassSelectedEvent: [{ type: Output }]
    };
    return SelectResourceClassComponent;
}());
export { SelectResourceClassComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXJlc291cmNlLWNsYXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy9zZWxlY3QtcmVzb3VyY2UtY2xhc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBR3BFLHdIQUF3SDtBQUN4SCxJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTlDO0lBZ0NJLHNDQUF5QyxFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQVh4RCxrRkFBa0Y7UUFDeEUsK0JBQTBCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQVdsRSxDQUFDO0lBdkJELHNCQUNJLHlEQUFlO1FBS25CLHdEQUF3RDthQUN4RDtZQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pDLENBQUM7UUFWRCw0RUFBNEU7YUFDNUUsVUFDb0IsS0FBMkI7WUFDM0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQjtZQUMzRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBcUJEOzs7O09BSUc7SUFDSCwrREFBd0IsR0FBeEI7UUFDSSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLElBQUksRUFBRTtZQUNqRixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztTQUNyQzthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssK0NBQVEsR0FBaEI7UUFBQSxpQkFXQztRQVZHLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3RCLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLHVDQUF1QztTQUNoRSxDQUFDLENBQUM7UUFFSCx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNsQyxLQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoRCxLQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtDQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFMUQsQ0FBQztJQUVELGtEQUFXLEdBQVg7UUFBQSxpQkFtQkM7UUFqQkcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUV6QiwyQ0FBMkM7WUFDM0MsYUFBYTtZQUNiLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBRWpCLDhDQUE4QztnQkFDOUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRTlDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFaEIsb0NBQW9DO2dCQUNwQyxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFELENBQUMsQ0FBQyxDQUFDO1NBRU47SUFDTCxDQUFDOztnQkE3RkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLHllQUFxRDs7aUJBRXhEOzs7O2dCQVZRLFdBQVcsdUJBc0NILE1BQU0sU0FBQyxXQUFXOzs7NEJBekI5QixLQUFLO2tDQUdMLEtBQUs7NkNBWUwsTUFBTTs7SUF5RVgsbUNBQUM7Q0FBQSxBQS9GRCxJQStGQztTQTFGWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJlc291cmNlQ2xhc3MgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1NjYxMDEwL2R5bmFtaWMtbmVzdGVkLXJlYWN0aXZlLWZvcm0tZXhwcmVzc2lvbmNoYW5nZWRhZnRlcml0aGFzYmVlbmNoZWNrZWRlcnJvclxuY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1zZWxlY3QtcmVzb3VyY2UtY2xhc3MnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtcmVzb3VyY2UtY2xhc3MuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC1yZXNvdXJjZS1jbGFzcy5jb21wb25lbnQuc2NzcycsICcuLi8uLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RSZXNvdXJjZUNsYXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICAvLyBzZXR0ZXIgbWV0aG9kIGZvciByZXNvdXJjZSBjbGFzc2VzIHdoZW4gYmVpbmcgdXBkYXRlZCBieSBwYXJlbnQgY29tcG9uZW50XG4gICAgQElucHV0KClcbiAgICBzZXQgcmVzb3VyY2VDbGFzc2VzKHZhbHVlOiBBcnJheTxSZXNvdXJjZUNsYXNzPikge1xuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NTZWxlY3RlZCA9IHVuZGVmaW5lZDsgLy8gcmVzZXQgb24gdXBkYXRlc1xuICAgICAgICB0aGlzLl9yZXNvdXJjZUNsYXNzZXMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBnZXR0ZXIgbWV0aG9kIGZvciByZXNvdXJjZSBjbGFzc2VzICh1c2VkIGluIHRlbXBsYXRlKVxuICAgIGdldCByZXNvdXJjZUNsYXNzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZUNsYXNzZXM7XG4gICAgfVxuXG4gICAgLy8gZXZlbnQgZW1pdHRlZCB0byBwYXJlbnQgY29tcG9uZW50IG9uY2UgYSByZXNvdXJjZSBjbGFzcyBpcyBzZWxlY3RlZCBieSB0aGUgdXNlclxuICAgIEBPdXRwdXQoKSByZXNvdXJjZUNsYXNzU2VsZWN0ZWRFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgLy8gYXZhaWxhYmxlIHJlc291cmNlIGNsYXNzZXMgZm9yIHNlbGVjdGlvblxuICAgIHByaXZhdGUgX3Jlc291cmNlQ2xhc3NlczogQXJyYXk8UmVzb3VyY2VDbGFzcz47XG5cbiAgICAvLyBzdG9yZXMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByZXNvdXJjZSBjbGFzc1xuICAgIHByaXZhdGUgcmVzb3VyY2VDbGFzc1NlbGVjdGVkOiBzdHJpbmc7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIElyaSBvZiB0aGUgc2VsZWN0ZWQgcmVzb3VyY2UgY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0aGUgSXJpIG9mIHRoZSBzZWxlY3RlZCByZXNvdXJjZSBjbGFzcyBvciBmYWxzZSBpbiBjYXNlIG5vIHJlc291cmNlIGNsYXNzIGlzIHNlbGVjdGVkLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NTZWxlY3RlZCgpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZUNsYXNzU2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlc291cmNlQ2xhc3NTZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc1NlbGVjdGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGFsaXplcyB0aGUgRm9ybUdyb3VwIGZvciB0aGUgcmVzb3VyY2UgY2xhc3Mgc2VsZWN0aW9uLlxuICAgICAqIFRoZSBpbml0aWFsIHZhbHVlIGlzIHNldCB0byBudWxsLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEZvcm0oKSB7XG4gICAgICAgIC8vIGJ1aWxkIGEgZm9ybSBmb3IgdGhlIHJlc291cmNlIGNsYXNzIHNlbGVjdGlvblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIHJlc291cmNlQ2xhc3M6IFtudWxsXSAvLyByZXNvdXJjZSBjbGFzcyBzZWxlY3Rpb24gaXMgb3B0aW9uYWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc3RvcmUgYW5kIGVtaXQgSXJpIG9mIHRoZSByZXNvdXJjZSBjbGFzcyB3aGVuIHNlbGVjdGVkXG4gICAgICAgIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NTZWxlY3RlZCA9IGRhdGEucmVzb3VyY2VDbGFzcztcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc1NlbGVjdGVkRXZlbnQuZW1pdCh0aGlzLnJlc291cmNlQ2xhc3NTZWxlY3RlZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuaW5pdEZvcm0oKTtcblxuICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgncmVzb3VyY2VDbGFzcycsIHRoaXMuZm9ybSk7XG5cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcblxuICAgICAgICBpZiAodGhpcy5mb3JtICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgLy8gcmVzb3VyY2UgY2xhc3NlcyBoYXZlIGJlZW4gcmVpbml0aWFsaXplZFxuICAgICAgICAgICAgLy8gcmVzZXQgZm9ybVxuICAgICAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoaXMgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woJ3Jlc291cmNlQ2xhc3MnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvcm0oKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ3Jlc291cmNlQ2xhc3MnLCB0aGlzLmZvcm0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=