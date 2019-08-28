import * as tslib_1 from "tslib";
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRI, KnoraConstants, Property } from '@knora/core';
import { ListCacheService } from '@knora/core';
import { MatMenuTrigger } from '@angular/material/menu';
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
let ListValueComponent = class ListValueComponent {
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
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", FormGroup)
], ListValueComponent.prototype, "formGroup", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Property)
], ListValueComponent.prototype, "property", void 0);
tslib_1.__decorate([
    ViewChild(MatMenuTrigger, { static: false }),
    tslib_1.__metadata("design:type", MatMenuTrigger)
], ListValueComponent.prototype, "menuTrigger", void 0);
ListValueComponent = tslib_1.__decorate([
    Component({
        selector: 'list-value',
        template: "<span *ngIf=\"listRootNode !== undefined\">\n    <button mat-stroked-button [matMenuTriggerFor]=\"mainMenu\" type=\"button\">\n        <span *ngIf=\"!selectedNode\">Select list value</span>\n        <span *ngIf=\"selectedNode\">{{selectedNode.label}}</span>\n    </button>\n\n    <mat-menu #mainMenu=\"matMenu\" [overlapTrigger]=\"false\">\n        <span *ngFor=\"let child of listRootNode.children\">\n            <span *ngIf=\"child.children && child.children.length > 0\">\n                <button mat-menu-item [matMenuTriggerFor]=\"menu.childMenu\" (click)=\"getSelectedNode(child)\"\n                        type=\"button\">\n                    {{child.label}}\n                </button>\n                <list-display #menu [children]=\"child.children\" (selectedNode)=\"getSelectedNode($event)\">\n                </list-display>\n            </span>\n\n            <span *ngIf=\"!child.children || child.children.length === 0\">\n                <button mat-menu-item (click)=\"getSelectedNode(child)\" type=\"button\">\n                    {{child.label}}\n                </button>\n            </span>\n        </span>\n    </mat-menu>\n</span>\n\n<!-- hidden input field for the selected list item (listNode iri) -->\n<mat-form-field class=\"hidden\">\n    <input matInput [formControl]=\"form.controls['listValue']\" placeholder=\"list value\">\n</mat-form-field>\n",
        styles: [".hidden{display:none}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
    }),
    tslib_1.__param(0, Inject(FormBuilder)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder, ListCacheService])
], ListValueComponent);
export { ListValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12YWx1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvc2VhcmNoLyIsInNvdXJjZXMiOlsibGliL2V4dGVuZGVkLXNlYXJjaC9zZWxlY3QtcHJvcGVydHkvc3BlY2lmeS1wcm9wZXJ0eS12YWx1ZS9saXN0LXZhbHVlL2xpc3QtdmFsdWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBYyxRQUFRLEVBQXdCLE1BQU0sYUFBYSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEQsd0hBQXdIO0FBQ3hILE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFPOUMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFtQjNCLFlBQXlDLEVBQWUsRUFBVSxpQkFBbUM7UUFBNUQsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFkckcsU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFlaEMsQ0FBQztJQUVPLGNBQWM7UUFDbEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFFM0MsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtZQUN0RyxPQUFPLFdBQVcsQ0FBQztTQUN0QjthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ3REO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFFSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3RCLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztRQUVILGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3RCLG9DQUFvQztZQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUNqRCxDQUFDLElBQWdCLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDLENBQ0osQ0FBQztJQUVOLENBQUM7SUFFRCxXQUFXO1FBRVAseUNBQXlDO1FBQ3pDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBZ0I7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FFSixDQUFBO0FBdkVZO0lBQVIsS0FBSyxFQUFFO3NDQUFhLFNBQVM7cURBQUM7QUFNdEI7SUFBUixLQUFLLEVBQUU7c0NBQVksUUFBUTtvREFBQztBQVFpQjtJQUE3QyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUFjLGNBQWM7dURBQUM7QUFqQmpFLGtCQUFrQjtJQUw5QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixnM0NBQTBDOztLQUU3QyxDQUFDO0lBb0JlLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTs2Q0FBYSxXQUFXLEVBQTZCLGdCQUFnQjtHQW5CNUYsa0JBQWtCLENBMEU5QjtTQTFFWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJUkksIEtub3JhQ29uc3RhbnRzLCBMaXN0Tm9kZVYyLCBQcm9wZXJ0eSwgUHJvcGVydHlWYWx1ZSwgVmFsdWUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBMaXN0Q2FjaGVTZXJ2aWNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDU2NjEwMTAvZHluYW1pYy1uZXN0ZWQtcmVhY3RpdmUtZm9ybS1leHByZXNzaW9uY2hhbmdlZGFmdGVyaXRoYXNiZWVuY2hlY2tlZGVycm9yXG5jb25zdCByZXNvbHZlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGlzdC12YWx1ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtdmFsdWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2xpc3QtdmFsdWUuY29tcG9uZW50LnNjc3MnLCAnLi4vLi4vLi4vLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlzdFZhbHVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIFByb3BlcnR5VmFsdWUge1xuXG4gICAgLy8gcGFyZW50IEZvcm1Hcm91cFxuICAgIEBJbnB1dCgpIGZvcm1Hcm91cD86IEZvcm1Hcm91cDtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU7XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBASW5wdXQoKSBwcm9wZXJ0eT86IFByb3BlcnR5O1xuXG4gICAgbGlzdFJvb3ROb2RlOiBMaXN0Tm9kZVYyO1xuXG4gICAgLy8gYWN0aXZlTm9kZTtcblxuICAgIHNlbGVjdGVkTm9kZTogTGlzdE5vZGVWMjtcblxuICAgIEBWaWV3Q2hpbGQoTWF0TWVudVRyaWdnZXIsIHsgc3RhdGljOiBmYWxzZSB9KSBtZW51VHJpZ2dlcjogTWF0TWVudVRyaWdnZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEZvcm1CdWlsZGVyKSBwcml2YXRlIGZiOiBGb3JtQnVpbGRlciwgcHJpdmF0ZSBfbGlzdENhY2hlU2VydmljZTogTGlzdENhY2hlU2VydmljZSkge1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Um9vdE5vZGVJcmkoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZ3VpQXR0ciA9IHRoaXMucHJvcGVydHkuZ3VpQXR0cmlidXRlO1xuXG4gICAgICAgIGlmIChndWlBdHRyLmxlbmd0aCA9PT0gMSAmJiBndWlBdHRyWzBdLnN0YXJ0c1dpdGgoJ2hsaXN0PScpKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0Tm9kZUlyaSA9IGd1aUF0dHJbMF0uc3Vic3RyKDcsIGd1aUF0dHJbMF0ubGVuZ3RoIC0gKDEgKyA3KSk7IC8vIGhsaXN0PTw+LCBnZXQgYWxzbyByaWQgb2YgPD5cbiAgICAgICAgICAgIHJldHVybiBsaXN0Tm9kZUlyaTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyByb290IG5vZGUgSXJpIGdpdmVuIGZvciBwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICBsaXN0VmFsdWU6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woJ3Byb3BWYWx1ZScsIHRoaXMuZm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJvb3ROb2RlSXJpID0gdGhpcy5nZXRSb290Tm9kZUlyaSgpO1xuXG4gICAgICAgIHRoaXMuX2xpc3RDYWNoZVNlcnZpY2UuZ2V0TGlzdChyb290Tm9kZUlyaSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGxpc3Q6IExpc3ROb2RlVjIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RSb290Tm9kZSA9IGxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICAvLyByZW1vdmUgZm9ybSBmcm9tIHRoZSBwYXJlbnQgZm9ybSBncm91cFxuICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5yZW1vdmVDb250cm9sKCdwcm9wVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZSB7XG4gICAgICAgIHJldHVybiBuZXcgSVJJKHRoaXMuZm9ybS52YWx1ZS5saXN0VmFsdWUpO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkTm9kZShpdGVtOiBMaXN0Tm9kZVYyKSB7XG4gICAgICAgIHRoaXMubWVudVRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlID0gaXRlbTtcblxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbJ2xpc3RWYWx1ZSddLnNldFZhbHVlKGl0ZW0uaWQpO1xuICAgIH1cblxufVxuIl19