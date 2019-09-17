import * as tslib_1 from "tslib";
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KnoraConstants, ValueLiteral } from '@knora/core';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
let TextValueComponent = class TextValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.TextValue;
    }
    ngOnInit() {
        this.form = this.fb.group({
            textValue: [null, Validators.required]
        });
        resolvedPromise.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new ValueLiteral(String(this.form.value.textValue), KnoraConstants.xsdString);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", FormGroup)
], TextValueComponent.prototype, "formGroup", void 0);
TextValueComponent = tslib_1.__decorate([
    Component({
        selector: 'text-value',
        template: "<mat-form-field class=\"large-field\">\n    <input matInput [formControl]=\"form.controls['textValue']\" placeholder=\"text value\" value=\"\">\n</mat-form-field>\n",
        styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}.mat-datepicker-content .mat-calendar{height:auto!important}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
    }),
    tslib_1.__param(0, Inject(FormBuilder)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], TextValueComponent);
export { TextValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS90ZXh0LXZhbHVlL3RleHQtdmFsdWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQXdCLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVqRix3SEFBd0g7QUFDeEgsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQU85QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQVMzQixZQUEwQyxFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUp6RCxTQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztJQU1oQyxDQUFDO0lBRUQsUUFBUTtRQUVKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDdEIsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEIsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsV0FBVztRQUVQLHlDQUF5QztRQUN6QyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxRQUFRO1FBRUosT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7Q0FFSixDQUFBO0FBckNZO0lBQVIsS0FBSyxFQUFFO3NDQUFZLFNBQVM7cURBQUM7QUFIckIsa0JBQWtCO0lBTDlCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLGdMQUEwQzs7S0FFN0MsQ0FBQztJQVVnQixtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7NkNBQWEsV0FBVztHQVRoRCxrQkFBa0IsQ0F3QzlCO1NBeENZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBQcm9wZXJ0eVZhbHVlLCBWYWx1ZSwgVmFsdWVMaXRlcmFsIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0ZXh0LXZhbHVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGV4dC12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGV4dC12YWx1ZS5jb21wb25lbnQuc2NzcycsICcuLi8uLi8uLi8uLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0VmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuVGV4dFZhbHVlO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3IgKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIHRleHRWYWx1ZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgncHJvcFZhbHVlJywgdGhpcy5mb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICAvLyByZW1vdmUgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdwcm9wVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWYWx1ZUxpdGVyYWwoU3RyaW5nKHRoaXMuZm9ybS52YWx1ZS50ZXh0VmFsdWUpLCBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcpO1xuICAgIH1cblxufVxuIl19