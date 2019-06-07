import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '@knora/core';
import { MatMenuTrigger } from '@angular/material';
/**
 * @deprecated
 */
export class FulltextSearchComponent {
    constructor(_overlay, _router, _viewContainerRef, _projectsService) {
        this._overlay = _overlay;
        this._router = _router;
        this._viewContainerRef = _viewContainerRef;
        this._projectsService = _projectsService;
        /**
         *
         * @param  {string} route Route to navigate after search.
         * This route path should contain a component for search results.
         */
        this.route = '/search';
        /**
         *
         * @param  {boolean} [projectfilter] If true it shows the selection
         * of projects to filter by one of them
         */
        this.projectfilter = false;
        // previous search = full-text search history
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        this.projectLabel = 'Filter project';
        // is search panel focused?
        this.searchPanelFocus = false;
    }
    ngOnInit() {
        // this.setFocus();
        if (this.filterbyproject) {
            this.getProject(this.filterbyproject);
        }
        if (this.projectfilter) {
            this.getAllProjects();
            if (localStorage.getItem('currentProject') !== null) {
                this.setProject(JSON.parse(localStorage.getItem('currentProject')));
            }
        }
    }
    openPanelWithBackdrop() {
        const config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            // backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this._overlay.scrollStrategies.block()
        });
        this.overlayRef = this._overlay.create(config);
        this.overlayRef.attach(new TemplatePortal(this.searchMenu, this._viewContainerRef));
        this.overlayRef.backdropClick().subscribe(() => {
            this.searchPanelFocus = false;
            this.overlayRef.detach();
        });
    }
    getOverlayPosition() {
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        const overlayPosition = this._overlay.position().flexibleConnectedTo(this.searchPanel).withPositions(positions).withLockedPosition(false);
        return overlayPosition;
    }
    getAllProjects() {
        this._projectsService.getAllProjects().subscribe((projects) => {
            this.projects = projects;
            // this.loadSystem = false;
            if (localStorage.getItem('currentProject') !== null) {
                this.project = JSON.parse(localStorage.getItem('currentProject'));
            }
        }, (error) => {
            console.error(error);
            this.error = error;
        });
    }
    getProject(id) {
        this._projectsService.getProjectByIri(id).subscribe((project) => {
            this.setProject(project);
        }, (error) => {
            console.error(error);
        });
    }
    // set current project and switch focus to input field
    setProject(project) {
        if (!project) {
            // set default project: all
            this.projectLabel = 'Filter project';
            this.projectIri = undefined;
            localStorage.removeItem('currentProject');
        }
        else {
            // set current project shortname and id
            this.projectLabel = project.shortname;
            this.projectIri = project.id;
            localStorage.setItem('currentProject', JSON.stringify(project));
        }
    }
    doSearch() {
        if (this.searchQuery !== undefined && this.searchQuery !== null) {
            if (this.projectIri !== undefined) {
                this._router.navigate([
                    this.route +
                        '/fulltext/' +
                        this.searchQuery +
                        '/' +
                        encodeURIComponent(this.projectIri)
                ]);
            }
            else {
                this._router.navigate([
                    this.route + '/fulltext/' + this.searchQuery
                ]);
            }
            // push the search query into the local storage prevSearch array (previous search)
            // to have a list of recent search requests
            let existingPrevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            if (existingPrevSearch === null) {
                existingPrevSearch = [];
            }
            let i = 0;
            for (const entry of existingPrevSearch) {
                // remove entry, if exists already
                if (this.searchQuery === entry.query && this.projectIri === entry.projectIri) {
                    existingPrevSearch.splice(i, 1);
                }
                i++;
            }
            // A search value is expected to have at least length of 3
            if (this.searchQuery.length > 2) {
                let currentQuery = {
                    query: this.searchQuery
                };
                if (this.projectIri) {
                    currentQuery = {
                        projectIri: this.projectIri,
                        projectLabel: this.projectLabel,
                        query: this.searchQuery
                    };
                }
                existingPrevSearch.push(currentQuery);
                localStorage.setItem('prevSearch', JSON.stringify(existingPrevSearch));
            }
        }
        this.resetSearch();
        this.overlayRef.detach();
    }
    resetSearch() {
        this.searchPanelFocus = false;
        this.searchInput.nativeElement.blur();
        this.overlayRef.detach();
    }
    setFocus() {
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        this.searchPanelFocus = true;
        this.openPanelWithBackdrop();
    }
    doPrevSearch(prevSearch) {
        this.searchQuery = prevSearch.query;
        if (prevSearch.projectIri !== undefined) {
            this.projectIri = prevSearch.projectIri;
            this.projectLabel = prevSearch.projectLabel;
            this._router.navigate([this.route + '/fulltext/' + this.searchQuery + '/' + encodeURIComponent(prevSearch.projectIri)]);
        }
        else {
            this.projectIri = undefined;
            this.projectLabel = 'Filter project';
            this._router.navigate([this.route + '/fulltext/' + this.searchQuery]);
        }
        this.resetSearch();
        this.overlayRef.detach();
    }
    resetPrevSearch(prevSearch) {
        if (prevSearch) {
            // delete only this item with the name ...
            const i = this.prevSearch.indexOf(prevSearch);
            this.prevSearch.splice(i, 1);
            localStorage.setItem('prevSearch', JSON.stringify(this.prevSearch));
        }
        else {
            // delete the whole "previous search" array
            localStorage.removeItem('prevSearch');
        }
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
    }
    changeFocus() {
        this.selectProject.closeMenu();
        this.searchInput.nativeElement.focus();
        this.setFocus();
    }
}
FulltextSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-fulltext-search',
                template: "<!-- full-text search panel -->\n<div class=\"kui-fulltext-search-panel\" [class.active]=\"searchPanelFocus\" [class.with-project-filter]=\"projectfilter\"\n     #fulltextSearchPanel cdkOverlayOrigin>\n    <div class=\"kui-project-filter\" *ngIf=\"projectfilter\">\n        <button mat-button class=\"kui-project-filter-button\" [matMenuTriggerFor]=\"selectProject\"\n                #btnToSelectProject=\"matMenuTrigger\" isIconButton>\n            <span class=\"label\">{{projectLabel}}</span>\n            <mat-icon class=\"icon\" matSuffix>keyboard_arrow_down</mat-icon>\n        </button>\n        <mat-menu #selectProject=\"matMenu\" class=\"kui-project-filter-menu\">\n            <button mat-menu-item class=\"center\" (click)=\"setProject();changeFocus()\">All Projects</button>\n            <mat-divider></mat-divider>\n            <button mat-menu-item *ngFor=\"let project of projects\"\n                    (click)=\"setProject(project);changeFocus()\">{{project.shortname}}</button>\n        </mat-menu>\n    </div>\n\n    <div class=\"kui-fulltext-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-fulltext-search-field\">\n            <input #fulltextSearchInput class=\"kui-fulltext-search-input\" type=\"search\" [(ngModel)]=\"searchQuery\"\n                   name=\"search\" minlength=\"3\" autocomplete=\"off\" [placeholder]=\"'Search'\" (keyup.esc)=\"resetSearch()\"\n                   (keyup.enter)=\"doSearch()\" (click)=\"setFocus()\">\n        </div>\n        <button class=\"kui-fulltext-search-button suffix\" (click)=\"doSearch()\" type=\"submit\">\n            <mat-icon>search</mat-icon>\n        </button>\n    </div>\n\n</div>\n\n<!-- full-text search menu -->\n<ng-template #fulltextSearchMenu>\n    <div class=\"kui-search-menu\" [class.with-project-filter]=\"projectfilter\">\n        <mat-list class=\"kui-previous-search-list\">\n            <div *ngFor=\"let item of prevSearch | kuiReverse; let i=index\">\n                <mat-list-item *ngIf=\"i<10\">\n                    <h4 mat-line (click)=\"doPrevSearch(item)\" class=\"kui-previous-search-item\">\n                        <div class=\"kui-project-filter-label\" [class.not-empty]=\"item.projectIri\"\n                             *ngIf=\"projectfilter && !error && projects?.length > 0\">\n                            <span *ngIf=\"item.projectIri\">{{item.projectLabel}}</span>\n                        </div>\n                        <div class=\"kui-previous-search-query\">\n                            {{item.query}}\n                        </div>\n                    </h4>\n                    <button mat-icon-button (click)=\"resetPrevSearch(item)\">\n                        <mat-icon aria-label=\"close\">close</mat-icon>\n                    </button>\n                </mat-list-item>\n            </div>\n        </mat-list>\n\n        <div class=\"kui-menu-action\" *ngIf=\"prevSearch\">\n            <mat-divider></mat-divider>\n            <button mat-button color=\"primary\" class=\"center\" (click)=\"resetPrevSearch()\">Clear\n                list</button>\n        </div>\n    </div>\n</ng-template>\n",
                styles: ["input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.center{text-align:center}.kui-fulltext-search-panel{border-radius:4px;display:flex;height:40px;position:relative;width:480px;z-index:100;background-color:#f9f9f9}.kui-fulltext-search-panel.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-fulltext-search-panel.with-project-filter{width:calc(480px + 160px)}.kui-fulltext-search-panel .kui-project-filter .kui-project-filter-button{font-size:inherit;overflow:hidden;text-overflow:ellipsis;width:160px;margin:1px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search{background-color:#f9f9f9;border-radius:4px;display:inline-flex;position:relative;z-index:10}.kui-fulltext-search-panel .kui-fulltext-search.with-project-filter{width:calc(480px + 160px);border-top-left-radius:0;border-bottom-left-radius:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field{flex:1;width:calc(480px - 40px);margin:1px}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input{border-style:none;font-size:14pt;height:38px;position:absolute;padding-left:12px;width:calc(100% - 40px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input.with-project-filter{width:calc(100% - 40px - 160px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:active,.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:focus{outline:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-button{background-color:#fff}.kui-fulltext-search-panel .kui-fulltext-search .suffix{margin:1px 0 1px -3px;border-radius:0 4px 4px 0}.kui-fulltext-search-panel .kui-fulltext-search .prefix{margin:1px 0 1px 3px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search .prefix,.kui-fulltext-search-panel .kui-fulltext-search .suffix{border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:39px}.kui-fulltext-search-panel .kui-fulltext-search .prefix.disabled,.kui-fulltext-search-panel .kui-fulltext-search .suffix.disabled{cursor:auto}.kui-fulltext-search-panel .kui-fulltext-search .prefix:active,.kui-fulltext-search-panel .kui-fulltext-search .suffix:active{color:#515151}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
FulltextSearchComponent.ctorParameters = () => [
    { type: Overlay },
    { type: Router },
    { type: ViewContainerRef },
    { type: ProjectsService }
];
FulltextSearchComponent.propDecorators = {
    route: [{ type: Input }],
    projectfilter: [{ type: Input }],
    filterbyproject: [{ type: Input }],
    searchPanel: [{ type: ViewChild, args: ['fulltextSearchPanel',] }],
    searchInput: [{ type: ViewChild, args: ['fulltextSearchInput',] }],
    searchMenu: [{ type: ViewChild, args: ['fulltextSearchMenu',] }],
    selectProject: [{ type: ViewChild, args: ['btnToSelectProject',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQWdDLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxXQUFXLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9HLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQTRCLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRbkQ7O0dBRUc7QUFNSCxNQUFNLE9BQU8sdUJBQXVCO0lBb0RoQyxZQUNZLFFBQWlCLEVBQ2pCLE9BQWUsRUFDZixpQkFBbUMsRUFDbkMsZ0JBQWlDO1FBSGpDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQXREN0M7Ozs7V0FJRztRQUNNLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFbkM7Ozs7V0FJRztRQUNNLGtCQUFhLEdBQWEsS0FBSyxDQUFDO1FBa0J6Qyw2Q0FBNkM7UUFDN0MsZUFBVSxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQU85RSxpQkFBWSxHQUFXLGdCQUFnQixD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QkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiwrbEdBQStDOzthQUVsRDs7OztZQXBCZ0MsT0FBTztZQUcvQixNQUFNO1lBRHdELGdCQUFnQjtZQUVwRCxlQUFlOzs7b0JBd0I3QyxLQUFLOzRCQU9MLEtBQUs7OEJBT0wsS0FBSzswQkFFTCxTQUFTLFNBQUMscUJBQXFCOzBCQUMvQixTQUFTLFNBQUMscUJBQXFCO3lCQUMvQixTQUFTLFNBQUMsb0JBQW9COzRCQUU5QixTQUFTLFNBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdGlvblBvc2l0aW9uUGFpciwgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiwgUG9zaXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIFByb2plY3QsIFByb2plY3RzU2VydmljZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByZXZTZWFyY2hJdGVtIHtcbiAgICBwcm9qZWN0SXJpPzogc3RyaW5nO1xuICAgIHByb2plY3RMYWJlbD86IHN0cmluZztcbiAgICBxdWVyeTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWZ1bGx0ZXh0LXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5zY3NzJywgJy4uL2Fzc2V0cy9zdHlsZS9zZWFyY2guc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGx0ZXh0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSByb3V0ZSBSb3V0ZSB0byBuYXZpZ2F0ZSBhZnRlciBzZWFyY2guXG4gICAgICogVGhpcyByb3V0ZSBwYXRoIHNob3VsZCBjb250YWluIGEgY29tcG9uZW50IGZvciBzZWFyY2ggcmVzdWx0cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3V0ZTogc3RyaW5nID0gJy9zZWFyY2gnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBbcHJvamVjdGZpbHRlcl0gSWYgdHJ1ZSBpdCBzaG93cyB0aGUgc2VsZWN0aW9uXG4gICAgICogb2YgcHJvamVjdHMgdG8gZmlsdGVyIGJ5IG9uZSBvZiB0aGVtXG4gICAgICovXG4gICAgQElucHV0KCkgcHJvamVjdGZpbHRlcj86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbZmlsdGVyYnlwcm9qZWN0XSBJZiB0aGUgZnVsbC10ZXh0IHNlYXJjaCBzaG91bGQgYmVcbiAgICAgKiBmaWx0ZXJlZCBieSBvbmUgcHJvamVjdCwgeW91IGNhbiBkZWZpbmUgaXQgd2l0aCBwcm9qZWN0IGlyaS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJieXByb2plY3Q/OiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKCdmdWxsdGV4dFNlYXJjaFBhbmVsJykgc2VhcmNoUGFuZWw6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnZnVsbHRleHRTZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2Z1bGx0ZXh0U2VhcmNoTWVudScpIHNlYXJjaE1lbnU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAVmlld0NoaWxkKCdidG5Ub1NlbGVjdFByb2plY3QnKSBzZWxlY3RQcm9qZWN0OiBNYXRNZW51VHJpZ2dlcjtcblxuICAgIC8vIHNlYXJjaCBxdWVyeVxuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG5cbiAgICAvLyBwcmV2aW91cyBzZWFyY2ggPSBmdWxsLXRleHQgc2VhcmNoIGhpc3RvcnlcbiAgICBwcmV2U2VhcmNoOiBQcmV2U2VhcmNoSXRlbVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcblxuICAgIC8vIGxpc3Qgb2YgcHJvamVjdHMsIGluIGNhc2Ugb2YgZmlsdGVycHJvamVjdCBpcyB0cnVlXG4gICAgcHJvamVjdHM6IFByb2plY3RbXTtcblxuICAgIC8vIHNlbGVjdGVkIHByb2plY3QsIGluIGNhc2Ugb2YgZmlsdGVyYnlwcm9qZWN0IGFuZC9vciBwcm9qZWN0ZmlsdGVyIGlzIHRydWVcbiAgICBwcm9qZWN0OiBQcm9qZWN0O1xuICAgIHByb2plY3RMYWJlbDogc3RyaW5nID0gJ0ZpbHRlciBwcm9qZWN0JztcbiAgICBwcm9qZWN0SXJpOiBzdHJpbmc7XG5cbiAgICAvLyBpbiBjYXNlIG9mIGFuIChhcGkpIGVycm9yXG4gICAgZXJyb3I6IGFueTtcblxuICAgIC8vIGlzIHNlYXJjaCBwYW5lbCBmb2N1c2VkP1xuICAgIHNlYXJjaFBhbmVsRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIG92ZXJsYXkgcmVmZXJlbmNlXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RzU2VydmljZTogUHJvamVjdHNTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIHRoaXMuc2V0Rm9jdXMoKTtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJieXByb2plY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvamVjdCh0aGlzLmZpbHRlcmJ5cHJvamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0ZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEFsbFByb2plY3RzKCk7XG5cbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvamVjdChcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBhbmVsV2l0aEJhY2tkcm9wKCkge1xuICAgICAgICBjb25zdCBjb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICAvLyBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5hdHRhY2gobmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuc2VhcmNoTWVudSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZikpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9KSxcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVBvc2l0aW9uID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5zZWFyY2hQYW5lbCkud2l0aFBvc2l0aW9ucyhwb3NpdGlvbnMpLndpdGhMb2NrZWRQb3NpdGlvbihmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIG92ZXJsYXlQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBnZXRBbGxQcm9qZWN0cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdHNTZXJ2aWNlLmdldEFsbFByb2plY3RzKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sb2FkU3lzdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdCA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0KGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdHNTZXJ2aWNlLmdldFByb2plY3RCeUlyaShpZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHByb2plY3Q6IFByb2plY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFByb2plY3QocHJvamVjdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgY3VycmVudCBwcm9qZWN0IGFuZCBzd2l0Y2ggZm9jdXMgdG8gaW5wdXQgZmllbGRcbiAgICBzZXRQcm9qZWN0KHByb2plY3Q/OiBQcm9qZWN0KTogdm9pZCB7XG4gICAgICAgIGlmICghcHJvamVjdCkge1xuICAgICAgICAgICAgLy8gc2V0IGRlZmF1bHQgcHJvamVjdDogYWxsXG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9ICdGaWx0ZXIgcHJvamVjdCc7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RJcmkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFByb2plY3QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNldCBjdXJyZW50IHByb2plY3Qgc2hvcnRuYW1lIGFuZCBpZFxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0TGFiZWwgPSBwcm9qZWN0LnNob3J0bmFtZTtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHByb2plY3QuaWQ7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2plY3QnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb1NlYXJjaCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUXVlcnkgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlYXJjaFF1ZXJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlICtcbiAgICAgICAgICAgICAgICAgICAgJy9mdWxsdGV4dC8nICtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSArXG4gICAgICAgICAgICAgICAgICAgICcvJyArXG4gICAgICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnByb2plY3RJcmkpXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGUgKyAnL2Z1bGx0ZXh0LycgKyB0aGlzLnNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwdXNoIHRoZSBzZWFyY2ggcXVlcnkgaW50byB0aGUgbG9jYWwgc3RvcmFnZSBwcmV2U2VhcmNoIGFycmF5IChwcmV2aW91cyBzZWFyY2gpXG4gICAgICAgICAgICAvLyB0byBoYXZlIGEgbGlzdCBvZiByZWNlbnQgc2VhcmNoIHJlcXVlc3RzXG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdQcmV2U2VhcmNoOiBQcmV2U2VhcmNoSXRlbVtdID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nUHJldlNlYXJjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nUHJldlNlYXJjaCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGk6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGV4aXN0aW5nUHJldlNlYXJjaCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlbnRyeSwgaWYgZXhpc3RzIGFscmVhZHlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeSA9PT0gZW50cnkucXVlcnkgJiYgdGhpcy5wcm9qZWN0SXJpID09PSBlbnRyeS5wcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nUHJldlNlYXJjaC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQSBzZWFyY2ggdmFsdWUgaXMgZXhwZWN0ZWQgdG8gaGF2ZSBhdCBsZWFzdCBsZW5ndGggb2YgM1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoUXVlcnkubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UXVlcnk6IFByZXZTZWFyY2hJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogdGhpcy5zZWFyY2hRdWVyeVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRRdWVyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RJcmk6IHRoaXMucHJvamVjdElyaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RMYWJlbDogdGhpcy5wcm9qZWN0TGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogdGhpcy5zZWFyY2hRdWVyeVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV4aXN0aW5nUHJldlNlYXJjaC5wdXNoKGN1cnJlbnRRdWVyeSk7XG5cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICAgICAgICAgJ3ByZXZTZWFyY2gnLFxuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShleGlzdGluZ1ByZXZTZWFyY2gpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICByZXNldFNlYXJjaCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hQYW5lbEZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgdGhpcy5zZWFyY2hQYW5lbEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWxXaXRoQmFja2Ryb3AoKTtcbiAgICB9XG5cbiAgICBkb1ByZXZTZWFyY2gocHJldlNlYXJjaDogUHJldlNlYXJjaEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHByZXZTZWFyY2gucXVlcnk7XG5cbiAgICAgICAgaWYgKHByZXZTZWFyY2gucHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RJcmkgPSBwcmV2U2VhcmNoLnByb2plY3RJcmk7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHByZXZTZWFyY2gucHJvamVjdExhYmVsO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlICsgJy9mdWxsdGV4dC8nICsgdGhpcy5zZWFyY2hRdWVyeSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcmV2U2VhcmNoLnByb2plY3RJcmkpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RJcmkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9ICdGaWx0ZXIgcHJvamVjdCc7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2Z1bGx0ZXh0LycgKyB0aGlzLnNlYXJjaFF1ZXJ5XSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc2V0U2VhcmNoKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICByZXNldFByZXZTZWFyY2gocHJldlNlYXJjaD86IFByZXZTZWFyY2hJdGVtKTogdm9pZCB7XG4gICAgICAgIGlmIChwcmV2U2VhcmNoKSB7XG4gICAgICAgICAgICAvLyBkZWxldGUgb25seSB0aGlzIGl0ZW0gd2l0aCB0aGUgbmFtZSAuLi5cbiAgICAgICAgICAgIGNvbnN0IGk6IG51bWJlciA9IHRoaXMucHJldlNlYXJjaC5pbmRleE9mKHByZXZTZWFyY2gpO1xuICAgICAgICAgICAgdGhpcy5wcmV2U2VhcmNoLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmV2U2VhcmNoJywgSlNPTi5zdHJpbmdpZnkodGhpcy5wcmV2U2VhcmNoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHdob2xlIFwicHJldmlvdXMgc2VhcmNoXCIgYXJyYXlcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcmV2U2VhcmNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VGb2N1cygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RQcm9qZWN0LmNsb3NlTWVudSgpO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==