import * as tslib_1 from "tslib";
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRI, KnoraConstants, OntologyCacheService, ReadResource, SearchService } from '@knora/core';
const jsonld = require('jsonld');
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
let LinkValueComponent = class LinkValueComponent {
    constructor(fb, _searchService, _cacheService) {
        this.fb = fb;
        this._searchService = _searchService;
        this._cacheService = _cacheService;
        this.type = KnoraConstants.LinkValue;
    }
    set restrictResourceClass(value) {
        this._restrictToResourceClass = value;
    }
    get restrictResourceClass() {
        return this._restrictToResourceClass;
    }
    /**
     * Displays a selected resource using its label.
     *
     * @param resource the resource to be displayed (or no selection yet).
     * @returns
     */
    displayResource(resource) {
        // null is the initial value (no selection yet)
        if (resource !== null) {
            return resource.label;
        }
    }
    /**
     * Search for resources whose labels contain the given search term, restricting to to the given properties object constraint.
     *
     * @param searchTerm
     */
    searchByLabel(searchTerm) {
        // at least 3 characters are required
        if (searchTerm.length >= 3) {
            this._searchService.searchByLabelReadResourceSequence(searchTerm, 0, { limitToResourceClass: this._restrictToResourceClass }).subscribe((result) => {
                this.resources = result.resources;
            }, function (err) {
                console.log('JSONLD of full resource request could not be expanded:' + err);
            });
        }
        else {
            // clear selection
            this.resources = undefined;
        }
    }
    /**
     * Checks that the selection is a [[ReadResource]].
     *
     * Surprisingly, [null] has to be returned if the value is valid: https://angular.io/guide/form-validation#custom-validators
     *
     * @param the form element whose value has to be checked.
     * @returns
     */
    validateResource(c) {
        const isValidResource = (c.value instanceof ReadResource);
        if (isValidResource) {
            return null;
        }
        else {
            return {
                noResource: {
                    value: c.value
                }
            };
        }
    }
    ngOnInit() {
        this.form = this.fb.group({
            resource: [null, Validators.compose([
                    Validators.required,
                    this.validateResource
                ])]
        });
        this.form.valueChanges.subscribe((data) => {
            this.searchByLabel(data.resource);
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
        return new IRI(this.form.value.resource.id);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", FormGroup)
], LinkValueComponent.prototype, "formGroup", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], LinkValueComponent.prototype, "restrictResourceClass", null);
LinkValueComponent = tslib_1.__decorate([
    Component({
        selector: 'link-value',
        template: "<mat-form-field class=\"large-field\">\n    <input matInput placeholder=\"resource\" aria-label=\"resource\" [matAutocomplete]=\"auto\"\n           [formControl]=\"form.controls['resource']\">\n    <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayResource\">\n        <mat-option *ngFor=\"let res of resources\" [value]=\"res\">\n            {{res?.label}}\n        </mat-option>\n    </mat-autocomplete>\n</mat-form-field>\n",
        styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
    }),
    tslib_1.__param(0, Inject(FormBuilder)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder, SearchService, OntologyCacheService])
], LinkValueComponent);
export { LinkValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9saW5rLXZhbHVlL2xpbmstdmFsdWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxXQUFXLEVBQWUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pGLE9BQU8sRUFHSCxHQUFHLEVBQ0gsY0FBYyxFQUNkLG9CQUFvQixFQUVwQixZQUFZLEVBRVosYUFBYSxFQUVoQixNQUFNLGFBQWEsQ0FBQztBQUdyQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsd0hBQXdIO0FBQ3hILE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFPOUMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFzQjNCLFlBQTBDLEVBQWUsRUFBVSxjQUE2QixFQUFVLGFBQW1DO1FBQW5HLE9BQUUsR0FBRixFQUFFLENBQWE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQWpCN0ksU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFtQmhDLENBQUM7SUFWRCxJQUFJLHFCQUFxQixDQUFDLEtBQWE7UUFDbkMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSxxQkFBcUI7UUFDckIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDekMsQ0FBQztJQU1EOzs7OztPQUtHO0lBQ0gsZUFB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IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIENvbnZlcnRKU09OTEQsXG4gICAgSVJJLFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIE9udG9sb2d5Q2FjaGVTZXJ2aWNlLFxuICAgIFByb3BlcnR5VmFsdWUsXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBTZWFyY2hTZXJ2aWNlLFxuICAgIFZhbHVlXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaW5rLXZhbHVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGluay12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGluay12YWx1ZS5jb21wb25lbnQuc2NzcycsICcuLi8uLi8uLi8uLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rVmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgcmVzb3VyY2VzOiBSZWFkUmVzb3VyY2VbXTtcblxuICAgIHByaXZhdGUgX3Jlc3RyaWN0VG9SZXNvdXJjZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCByZXN0cmljdFJlc291cmNlQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9yZXN0cmljdFRvUmVzb3VyY2VDbGFzcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCByZXN0cmljdFJlc291cmNlQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN0cmljdFRvUmVzb3VyY2VDbGFzcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAoQEluamVjdChGb3JtQnVpbGRlcikgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsIHByaXZhdGUgX3NlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsIHByaXZhdGUgX2NhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIGEgc2VsZWN0ZWQgcmVzb3VyY2UgdXNpbmcgaXRzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlIHRoZSByZXNvdXJjZSB0byBiZSBkaXNwbGF5ZWQgKG9yIG5vIHNlbGVjdGlvbiB5ZXQpLlxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgZGlzcGxheVJlc291cmNlKHJlc291cmNlOiBSZWFkUmVzb3VyY2UgfCBudWxsKSB7XG5cbiAgICAgICAgLy8gbnVsbCBpcyB0aGUgaW5pdGlhbCB2YWx1ZSAobm8gc2VsZWN0aW9uIHlldClcbiAgICAgICAgaWYgKHJlc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb3VyY2UubGFiZWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIHJlc291cmNlcyB3aG9zZSBsYWJlbHMgY29udGFpbiB0aGUgZ2l2ZW4gc2VhcmNoIHRlcm0sIHJlc3RyaWN0aW5nIHRvIHRvIHRoZSBnaXZlbiBwcm9wZXJ0aWVzIG9iamVjdCBjb25zdHJhaW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNlYXJjaFRlcm1cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsKHNlYXJjaFRlcm06IHN0cmluZykge1xuXG4gICAgICAgIC8vIGF0IGxlYXN0IDMgY2hhcmFjdGVycyBhcmUgcmVxdWlyZWRcbiAgICAgICAgaWYgKHNlYXJjaFRlcm0ubGVuZ3RoID49IDMpIHtcblxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZS5zZWFyY2hCeUxhYmVsUmVhZFJlc291cmNlU2VxdWVuY2Uoc2VhcmNoVGVybSwgMCwgeyBsaW1pdFRvUmVzb3VyY2VDbGFzczogdGhpcy5fcmVzdHJpY3RUb1Jlc291cmNlQ2xhc3MgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChyZXN1bHQ6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlcyA9IHJlc3VsdC5yZXNvdXJjZXM7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSlNPTkxEIG9mIGZ1bGwgcmVzb3VyY2UgcmVxdWVzdCBjb3VsZCBub3QgYmUgZXhwYW5kZWQ6JyArIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNsZWFyIHNlbGVjdGlvblxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGF0IHRoZSBzZWxlY3Rpb24gaXMgYSBbW1JlYWRSZXNvdXJjZV1dLlxuICAgICAqXG4gICAgICogU3VycHJpc2luZ2x5LCBbbnVsbF0gaGFzIHRvIGJlIHJldHVybmVkIGlmIHRoZSB2YWx1ZSBpcyB2YWxpZDogaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2Zvcm0tdmFsaWRhdGlvbiNjdXN0b20tdmFsaWRhdG9yc1xuICAgICAqXG4gICAgICogQHBhcmFtIHRoZSBmb3JtIGVsZW1lbnQgd2hvc2UgdmFsdWUgaGFzIHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICB2YWxpZGF0ZVJlc291cmNlKGM6IEZvcm1Db250cm9sKSB7XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZFJlc291cmNlID0gKGMudmFsdWUgaW5zdGFuY2VvZiBSZWFkUmVzb3VyY2UpO1xuXG4gICAgICAgIGlmIChpc1ZhbGlkUmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBub1Jlc291cmNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjLnZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgcmVzb3VyY2U6IFtudWxsLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVJlc291cmNlXG4gICAgICAgICAgICBdKV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQnlMYWJlbChkYXRhLnJlc291cmNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gYWRkIGZvcm0gdG8gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdwcm9wVmFsdWUnLCB0aGlzLmZvcm0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICAvLyByZW1vdmUgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdwcm9wVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJUkkodGhpcy5mb3JtLnZhbHVlLnJlc291cmNlLmlkKTtcbiAgICB9XG5cbn1cbiJdfQ==