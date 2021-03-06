import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export class SelectOntologyComponent {
    constructor(fb) {
        this.fb = fb;
        this.ontologySelected = new EventEmitter();
    }
    ngOnInit() {
        // build a form for the named graph selection
        this.form = this.fb.group({
            ontology: [null, Validators.required]
        });
        // emit Iri of the ontology when being selected
        this.form.valueChanges.subscribe((data) => {
            this.ontologySelected.emit(data.ontology);
        });
        // add form to the parent form group
        this.formGroup.addControl('ontology', this.form);
    }
}
SelectOntologyComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-select-ontology',
                template: "<mat-form-field *ngIf=\"ontologies.length > 0\" class=\"large-field\">\n  <mat-select placeholder=\"Select an Ontology\" [formControl]=\"form.controls['ontology']\">\n    <mat-option *ngFor=\"let onto of ontologies\" [value]=\"onto.id\">{{ onto.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
SelectOntologyComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
SelectOntologyComponent.propDecorators = {
    formGroup: [{ type: Input }],
    ontologies: [{ type: Input }],
    ontologySelected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9udG9sb2d5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1vbnRvbG9neS9zZWxlY3Qtb250b2xvZ3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3BFLE1BQU0sT0FBTyx1QkFBdUI7SUFVbEMsWUFBeUMsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUFKOUMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUlJLENBQUM7SUFFN0QsUUFBUTtRQUVOLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3RDLENBQUMsQ0FBQztRQUVILCtDQUErQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILG9DQUFvQztRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRW5ELENBQUM7OztZQWhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsNFRBQStDOzthQUVoRDs7OztZQU5RLFdBQVcsdUJBaUJMLE1BQU0sU0FBQyxXQUFXOzs7d0JBUjlCLEtBQUs7eUJBRUwsS0FBSzsrQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPbnRvbG9neU1ldGFkYXRhIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXNlbGVjdC1vbnRvbG9neScsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3Qtb250b2xvZ3kuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3Qtb250b2xvZ3kuY29tcG9uZW50LnNjc3MnLCAnLi4vLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0T250b2xvZ3lDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gIEBJbnB1dCgpIG9udG9sb2dpZXM6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+O1xuXG4gIEBPdXRwdXQoKSBvbnRvbG9neVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgZm9ybTogRm9ybUdyb3VwO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRm9ybUJ1aWxkZXIpIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcblxuICAgIC8vIGJ1aWxkIGEgZm9ybSBmb3IgdGhlIG5hbWVkIGdyYXBoIHNlbGVjdGlvblxuICAgIHRoaXMuZm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgb250b2xvZ3k6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pO1xuXG4gICAgLy8gZW1pdCBJcmkgb2YgdGhlIG9udG9sb2d5IHdoZW4gYmVpbmcgc2VsZWN0ZWRcbiAgICB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5vbnRvbG9neVNlbGVjdGVkLmVtaXQoZGF0YS5vbnRvbG9neSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgZm9ybSB0byB0aGUgcGFyZW50IGZvcm0gZ3JvdXBcbiAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKCdvbnRvbG9neScsIHRoaXMuZm9ybSk7XG5cbiAgfVxuXG59XG4iXX0=