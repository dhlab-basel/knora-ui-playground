import * as tslib_1 from "tslib";
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRI, KnoraConstants, OntologyCacheService, ReadResource, SearchService } from '@knora/core';
var jsonld = require('jsonld');
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
var resolvedPromise = Promise.resolve(null);
var LinkValueComponent = /** @class */ (function () {
    function LinkValueComponent(fb, _searchService, _cacheService) {
        this.fb = fb;
        this._searchService = _searchService;
        this._cacheService = _cacheService;
        this.type = KnoraConstants.LinkValue;
    }
    Object.defineProperty(LinkValueComponent.prototype, "restrictResourceClass", {
        get: function () {
            return this._restrictToResourceClass;
        },
        set: function (value) {
            this._restrictToResourceClass = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Displays a selected resource using its label.
     *
     * @param resource the resource to be displayed (or no selection yet).
     * @returns
     */
    LinkValueComponent.prototype.displayResource = function (resource) {
        // null is the initial value (no selection yet)
        if (resource !== null) {
            return resource.label;
        }
    };
    /**
     * Search for resources whose labels contain the given search term, restricting to to the given properties object constraint.
     *
     * @param searchTerm
     */
    LinkValueComponent.prototype.searchByLabel = function (searchTerm) {
        var _this = this;
        // at least 3 characters are required
        if (searchTerm.length >= 3) {
            this._searchService.searchByLabelReadResourceSequence(searchTerm, 0, { limitToResourceClass: this._restrictToResourceClass }).subscribe(function (result) {
                _this.resources = result.resources;
            }, function (err) {
                console.log('JSONLD of full resource request could not be expanded:' + err);
            });
        }
        else {
            // clear selection
            this.resources = undefined;
        }
    };
    /**
     * Checks that the selection is a [[ReadResource]].
     *
     * Surprisingly, [null] has to be returned if the value is valid: https://angular.io/guide/form-validation#custom-validators
     *
     * @param the form element whose value has to be checked.
     * @returns
     */
    LinkValueComponent.prototype.validateResource = function (c) {
        var isValidResource = (c.value instanceof ReadResource);
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
    };
    LinkValueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            resource: [null, Validators.compose([
                    Validators.required,
                    this.validateResource
                ])]
        });
        this.form.valueChanges.subscribe(function (data) {
            _this.searchByLabel(data.resource);
        });
        resolvedPromise.then(function () {
            // add form to the parent form group
            _this.formGroup.addControl('propValue', _this.form);
        });
    };
    LinkValueComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        // remove form from the parent form group
        resolvedPromise.then(function () {
            _this.formGroup.removeControl('propValue');
        });
    };
    LinkValueComponent.prototype.getValue = function () {
        return new IRI(this.form.value.resource.id);
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
            styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:-webkit-inline-box;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:-webkit-inline-box;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:-webkit-inline-box;display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
        }),
        tslib_1.__param(0, Inject(FormBuilder)),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, SearchService, OntologyCacheService])
    ], LinkValueComponent);
    return LinkValueComponent;
}());
export { LinkValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9saW5rLXZhbHVlL2xpbmstdmFsdWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxXQUFXLEVBQWUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pGLE9BQU8sRUFHSCxHQUFHLEVBQ0gsY0FBYyxFQUNkLG9CQUFvQixFQUVwQixZQUFZLEVBRVosYUFBYSxFQUVoQixNQUFNLGFBQWEsQ0FBQztBQUdyQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakMsd0hBQXdIO0FBQ3hILElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFPOUM7SUFzQkksNEJBQTBDLEVBQWUsRUFBVSxjQUE2QixFQUFVLGFBQW1DO1FBQW5HLE9BQUUsR0FBRixFQUFFLENBQWE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQWpCN0ksU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFtQmhDLENBQUM7SUFWRCxzQkFBSSxxREFBcUI7YUFJekI7WUFDSSxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUN6QyxDQUFDO2FBTkQsVUFBMEIsS0FBYTtZQUNuQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBVUQ7Ozs7O09BS0c7SUFDSCw0Q0FBZSxHQUFmLFVBQWdCLFFBQTZCO1FBRXpDLCtD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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgQ29udmVydEpTT05MRCxcbiAgICBJUkksXG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgT250b2xvZ3lDYWNoZVNlcnZpY2UsXG4gICAgUHJvcGVydHlWYWx1ZSxcbiAgICBSZWFkUmVzb3VyY2UsXG4gICAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICAgIFNlYXJjaFNlcnZpY2UsXG4gICAgVmFsdWVcbn0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQ3MzAwMTAvYW5ndWxhcjItNS1taW51dGUtaW5zdGFsbC1idWctcmVxdWlyZS1pcy1ub3QtZGVmaW5lZFxuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1NjYxMDEwL2R5bmFtaWMtbmVzdGVkLXJlYWN0aXZlLWZvcm0tZXhwcmVzc2lvbmNoYW5nZWRhZnRlcml0aGFzYmVlbmNoZWNrZWRlcnJvclxuY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpbmstdmFsdWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saW5rLXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saW5rLXZhbHVlLmNvbXBvbmVudC5zY3NzJywgJy4uLy4uLy4uLy4uL2Fzc2V0cy9zdHlsZS9zZWFyY2guc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpbmtWYWx1ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBQcm9wZXJ0eVZhbHVlIHtcblxuICAgIC8vIHBhcmVudCBGb3JtR3JvdXBcbiAgICBASW5wdXQoKSBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICByZXNvdXJjZXM6IFJlYWRSZXNvdXJjZVtdO1xuXG4gICAgcHJpdmF0ZSBfcmVzdHJpY3RUb1Jlc291cmNlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHJlc3RyaWN0UmVzb3VyY2VDbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3Jlc3RyaWN0VG9SZXNvdXJjZUNsYXNzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHJlc3RyaWN0UmVzb3VyY2VDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3RyaWN0VG9SZXNvdXJjZUNsYXNzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSwgcHJpdmF0ZSBfY2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgYSBzZWxlY3RlZCByZXNvdXJjZSB1c2luZyBpdHMgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2UgdGhlIHJlc291cmNlIHRvIGJlIGRpc3BsYXllZCAob3Igbm8gc2VsZWN0aW9uIHlldCkuXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBkaXNwbGF5UmVzb3VyY2UocmVzb3VyY2U6IFJlYWRSZXNvdXJjZSB8IG51bGwpIHtcblxuICAgICAgICAvLyBudWxsIGlzIHRoZSBpbml0aWFsIHZhbHVlIChubyBzZWxlY3Rpb24geWV0KVxuICAgICAgICBpZiAocmVzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgcmVzb3VyY2VzIHdob3NlIGxhYmVscyBjb250YWluIHRoZSBnaXZlbiBzZWFyY2ggdGVybSwgcmVzdHJpY3RpbmcgdG8gdG8gdGhlIGdpdmVuIHByb3BlcnRpZXMgb2JqZWN0IGNvbnN0cmFpbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGVybVxuICAgICAqL1xuICAgIHNlYXJjaEJ5TGFiZWwoc2VhcmNoVGVybTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gYXQgbGVhc3QgMyBjaGFyYWN0ZXJzIGFyZSByZXF1aXJlZFxuICAgICAgICBpZiAoc2VhcmNoVGVybS5sZW5ndGggPj0gMykge1xuXG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlLnNlYXJjaEJ5TGFiZWxSZWFkUmVzb3VyY2VTZXF1ZW5jZShzZWFyY2hUZXJtLCAwLCB7IGxpbWl0VG9SZXNvdXJjZUNsYXNzOiB0aGlzLl9yZXN0cmljdFRvUmVzb3VyY2VDbGFzcyB9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3VsdDogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzID0gcmVzdWx0LnJlc291cmNlcztcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdKU09OTEQgb2YgZnVsbCByZXNvdXJjZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBleHBhbmRlZDonICsgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2xlYXIgc2VsZWN0aW9uXG4gICAgICAgICAgICB0aGlzLnJlc291cmNlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoYXQgdGhlIHNlbGVjdGlvbiBpcyBhIFtbUmVhZFJlc291cmNlXV0uXG4gICAgICpcbiAgICAgKiBTdXJwcmlzaW5nbHksIFtudWxsXSBoYXMgdG8gYmUgcmV0dXJuZWQgaWYgdGhlIHZhbHVlIGlzIHZhbGlkOiBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvZm9ybS12YWxpZGF0aW9uI2N1c3RvbS12YWxpZGF0b3JzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGhlIGZvcm0gZWxlbWVudCB3aG9zZSB2YWx1ZSBoYXMgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHZhbGlkYXRlUmVzb3VyY2UoYzogRm9ybUNvbnRyb2wpIHtcblxuICAgICAgICBjb25zdCBpc1ZhbGlkUmVzb3VyY2UgPSAoYy52YWx1ZSBpbnN0YW5jZW9mIFJlYWRSZXNvdXJjZSk7XG5cbiAgICAgICAgaWYgKGlzVmFsaWRSZXNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5vUmVzb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGMudmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICByZXNvdXJjZTogW251bGwsIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUmVzb3VyY2VcbiAgICAgICAgICAgIF0pXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hCeUxhYmVsKGRhdGEucmVzb3VyY2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ3Byb3BWYWx1ZScsIHRoaXMuZm9ybSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIC8vIHJlbW92ZSBmb3JtIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woJ3Byb3BWYWx1ZScpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldFZhbHVlKCk6IFZhbHVlIHtcblxuICAgICAgICByZXR1cm4gbmV3IElSSSh0aGlzLmZvcm0udmFsdWUucmVzb3VyY2UuaWQpO1xuICAgIH1cblxufVxuIl19