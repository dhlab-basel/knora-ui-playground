import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRI, KnoraConstants, Property } from '@knora/core';
import { ListCacheService } from '@knora/core';
import { MatMenuTrigger } from '@angular/material';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
export class ListValueComponent {
    constructor(fb, _listCacheService) {
        this.fb = fb;
        this._listCacheService = _listCacheService;
        this.type = KnoraConstants.ListValue;
    }
    getRootNodeIri() {
        const guiAttr = this.property.guiAttribute;
        if (guiAttr.length === 1 && guiAttr[0].startsWith('hlist=')) {
            const listNodeIri = guiAttr[0].substr(7, guiAttr[0].length - (1 + 7)); // hlist=<>, get also rid of <>
            return listNodeIri;
        }
        else {
            console.log('No root node Iri given for property');
        }
    }
    ngOnInit() {
        this.form = this.fb.group({
            listValue: [null, Validators.required]
        });
        resolvedPromise.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
        const rootNodeIri = this.getRootNodeIri();
        this._listCacheService.getList(rootNodeIri).subscribe((list) => {
            this.listRootNode = list;
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new IRI(this.form.value.listValue);
    }
    getSelectedNode(item) {
        this.menuTrigger.closeMenu();
        this.selectedNode = item;
        this.form.controls['listValue'].setValue(item.id);
    }
}
ListValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'list-value',
                template: "<span *ngIf=\"listRootNode !== undefined\">\n    <button mat-stroked-button [matMenuTriggerFor]=\"mainMenu\" type=\"button\">\n        <span *ngIf=\"!selectedNode\">Select list value</span>\n        <span *ngIf=\"selectedNode\">{{selectedNode.label}}</span>\n    </button>\n\n    <mat-menu #mainMenu=\"matMenu\" [overlapTrigger]=\"false\">\n        <span *ngFor=\"let child of listRootNode.children\">\n            <span *ngIf=\"child.children && child.children.length > 0\">\n                <button mat-menu-item [matMenuTriggerFor]=\"menu.childMenu\" (click)=\"getSelectedNode(child)\"\n                        type=\"button\">\n                    {{child.label}}\n                </button>\n                <list-display #menu [children]=\"child.children\" (selectedNode)=\"getSelectedNode($event)\">\n                </list-display>\n            </span>\n\n            <span *ngIf=\"!child.children || child.children.length === 0\">\n                <button mat-menu-item (click)=\"getSelectedNode(child)\" type=\"button\">\n                    {{child.label}}\n                </button>\n            </span>\n        </span>\n    </mat-menu>\n</span>\n\n<!-- hidden input field for the selected list item (listNode iri) -->\n<mat-form-field class=\"hidden\">\n    <input matInput [formControl]=\"form.controls['listValue']\" placeholder=\"list value\">\n</mat-form-field>\n",
                styles: [".hidden{display:none}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
ListValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] },
    { type: ListCacheService }
];
ListValueComponent.propDecorators = {
    formGroup: [{ type: Input }],
    property: [{ type: Input }],
    menuTrigger: [{ type: ViewChild, args: [MatMenuTrigger,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9saXN0LXZhbHVlL2xpc3QtdmFsdWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFjLFFBQVEsRUFBd0IsTUFBTSxhQUFhLENBQUM7QUFDOUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCx3SEFBd0g7QUFDeEgsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQU85QyxNQUFNLE9BQU8sa0JBQWtCO0lBbUIzQixZQUEwQyxFQUFlLEVBQVUsaUJBQW1DO1FBQTVELE9BQUUsR0FBRixFQUFFLENBQWE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBZHRHLFNBQUksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO0lBZWhDLENBQUM7SUFFTyxjQUFjO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBRTNDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQywrQkFBK0I7WUFDdEcsT0FBTyxXQUFXLENBQUM7U0FDdEI7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFFRCxRQUFRO1FBRUosSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN0QixTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUN6QyxDQUFDLENBQUM7UUFFSCxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QixvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsQ0FBQyxJQUFnQixFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQyxDQUNKLENBQUM7SUFFTixDQUFDO0lBRUQsV0FBVztRQUVQLHlDQUF5QztRQUN6QyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQWdCO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7WUE3RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixnM0NBQTBDOzthQUU3Qzs7OztZQVpRLFdBQVcsdUJBZ0NGLE1BQU0sU0FBQyxXQUFXO1lBOUIzQixnQkFBZ0I7Ozt3QkFjcEIsS0FBSzt1QkFNTCxLQUFLOzBCQVFMLFNBQVMsU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSVJJLCBLbm9yYUNvbnN0YW50cywgTGlzdE5vZGVWMiwgUHJvcGVydHksIFByb3BlcnR5VmFsdWUsIFZhbHVlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgTGlzdENhY2hlU2VydmljZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTY2MTAxMC9keW5hbWljLW5lc3RlZC1yZWFjdGl2ZS1mb3JtLWV4cHJlc3Npb25jaGFuZ2VkYWZ0ZXJpdGhhc2JlZW5jaGVja2VkZXJyb3JcbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaXN0LXZhbHVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC12YWx1ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC12YWx1ZS5jb21wb25lbnQuc2NzcycsICcuLi8uLi8uLi8uLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0VmFsdWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgUHJvcGVydHlWYWx1ZSB7XG5cbiAgICAvLyBwYXJlbnQgRm9ybUdyb3VwXG4gICAgQElucHV0KCkgZm9ybUdyb3VwPzogRm9ybUdyb3VwO1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIEBJbnB1dCgpIHByb3BlcnR5PzogUHJvcGVydHk7XG5cbiAgICBsaXN0Um9vdE5vZGU6IExpc3ROb2RlVjI7XG5cbiAgICAvLyBhY3RpdmVOb2RlO1xuXG4gICAgc2VsZWN0ZWROb2RlOiBMaXN0Tm9kZVYyO1xuXG4gICAgQFZpZXdDaGlsZChNYXRNZW51VHJpZ2dlcikgbWVudVRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuXG4gICAgY29uc3RydWN0b3IgKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIF9saXN0Q2FjaGVTZXJ2aWNlOiBMaXN0Q2FjaGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSb290Tm9kZUlyaSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBndWlBdHRyID0gdGhpcy5wcm9wZXJ0eS5ndWlBdHRyaWJ1dGU7XG5cbiAgICAgICAgaWYgKGd1aUF0dHIubGVuZ3RoID09PSAxICYmIGd1aUF0dHJbMF0uc3RhcnRzV2l0aCgnaGxpc3Q9JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3ROb2RlSXJpID0gZ3VpQXR0clswXS5zdWJzdHIoNywgZ3VpQXR0clswXS5sZW5ndGggLSAoMSArIDcpKTsgLy8gaGxpc3Q9PD4sIGdldCBhbHNvIHJpZCBvZiA8PlxuICAgICAgICAgICAgcmV0dXJuIGxpc3ROb2RlSXJpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIHJvb3Qgbm9kZSBJcmkgZ2l2ZW4gZm9yIHByb3BlcnR5Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIGxpc3RWYWx1ZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuYWRkQ29udHJvbCgncHJvcFZhbHVlJywgdGhpcy5mb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgcm9vdE5vZGVJcmkgPSB0aGlzLmdldFJvb3ROb2RlSXJpKCk7XG5cbiAgICAgICAgdGhpcy5fbGlzdENhY2hlU2VydmljZS5nZXRMaXN0KHJvb3ROb2RlSXJpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAobGlzdDogTGlzdE5vZGVWMikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFJvb3ROb2RlID0gbGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIC8vIHJlbW92ZSBmb3JtIGZyb20gdGhlIHBhcmVudCBmb3JtIGdyb3VwXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woJ3Byb3BWYWx1ZScpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldFZhbHVlKCk6IFZhbHVlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJUkkodGhpcy5mb3JtLnZhbHVlLmxpc3RWYWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWROb2RlKGl0ZW06IExpc3ROb2RlVjIpIHtcbiAgICAgICAgdGhpcy5tZW51VHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUgPSBpdGVtO1xuXG4gICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1snbGlzdFZhbHVlJ10uc2V0VmFsdWUoaXRlbS5pZCk7XG4gICAgfVxuXG59XG4iXX0=