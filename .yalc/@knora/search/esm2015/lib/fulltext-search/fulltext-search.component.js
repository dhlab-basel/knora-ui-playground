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
        this.defaultProjectLabel = 'All projects';
        this.projectLabel = this.defaultProjectLabel;
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
            this.projectLabel = this.defaultProjectLabel;
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
            this.projectLabel = this.defaultProjectLabel;
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
                template: "<!-- full-text search panel -->\n<div class=\"kui-fulltext-search-panel\" [class.active]=\"searchPanelFocus\" [class.with-project-filter]=\"projectfilter\"\n     #fulltextSearchPanel cdkOverlayOrigin>\n    <div class=\"kui-project-filter\" *ngIf=\"projectfilter\">\n        <button mat-button class=\"kui-project-filter-button\" [matMenuTriggerFor]=\"selectProject\"\n                #btnToSelectProject=\"matMenuTrigger\" isIconButton>\n            <span class=\"label\">{{projectLabel}}</span>\n            <mat-icon class=\"icon\" matSuffix>keyboard_arrow_down</mat-icon>\n        </button>\n        <mat-menu #selectProject=\"matMenu\" class=\"kui-project-filter-menu\">\n            <button mat-menu-item class=\"center\" (click)=\"setProject();changeFocus()\">{{defaultProjectLabel}}</button>\n            <mat-divider></mat-divider>\n            <button mat-menu-item *ngFor=\"let project of projects\"\n                    (click)=\"setProject(project);changeFocus()\">{{project.shortname}}</button>\n        </mat-menu>\n    </div>\n\n    <div class=\"kui-fulltext-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-fulltext-search-field\">\n            <input #fulltextSearchInput class=\"kui-fulltext-search-input\" type=\"search\" [(ngModel)]=\"searchQuery\"\n                   name=\"search\" minlength=\"3\" autocomplete=\"off\" [placeholder]=\"'Search'\" (keyup.esc)=\"resetSearch()\"\n                   (keyup.enter)=\"doSearch()\" (click)=\"setFocus()\">\n        </div>\n        <button class=\"kui-fulltext-search-button suffix\" (click)=\"doSearch()\" type=\"submit\">\n            <mat-icon>search</mat-icon>\n        </button>\n    </div>\n\n</div>\n\n<!-- full-text search menu -->\n<ng-template #fulltextSearchMenu>\n    <div class=\"kui-search-menu\" [class.with-project-filter]=\"projectfilter\">\n        <mat-list class=\"kui-previous-search-list\">\n            <div *ngFor=\"let item of prevSearch | kuiReverse; let i=index\">\n                <mat-list-item *ngIf=\"i<10\">\n                    <h4 mat-line (click)=\"doPrevSearch(item)\" class=\"kui-previous-search-item\">\n                        <div class=\"kui-project-filter-label\" [class.not-empty]=\"item.projectIri\"\n                             *ngIf=\"projectfilter && !error && projects?.length > 0\">\n                            <span *ngIf=\"item.projectIri\">{{item.projectLabel}}</span>\n                        </div>\n                        <div class=\"kui-previous-search-query\">\n                            {{item.query}}\n                        </div>\n                    </h4>\n                    <button mat-icon-button (click)=\"resetPrevSearch(item)\">\n                        <mat-icon aria-label=\"close\">close</mat-icon>\n                    </button>\n                </mat-list-item>\n            </div>\n        </mat-list>\n\n        <div class=\"kui-menu-action\" *ngIf=\"prevSearch\">\n            <mat-divider></mat-divider>\n            <button mat-button color=\"primary\" class=\"center\" (click)=\"resetPrevSearch()\">Clear\n                list</button>\n        </div>\n    </div>\n</ng-template>\n",
                styles: ["input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.center{text-align:center}.kui-fulltext-search-panel{border-radius:4px;display:flex;height:40px;position:relative;width:480px;z-index:100;background-color:#f9f9f9}.kui-fulltext-search-panel.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-fulltext-search-panel.with-project-filter{width:calc(480px + 160px)}.kui-fulltext-search-panel .kui-project-filter .kui-project-filter-button{font-size:inherit;overflow:hidden;text-overflow:ellipsis;width:160px;margin:1px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search{background-color:#f9f9f9;border-radius:4px;display:inline-flex;position:relative;z-index:10}.kui-fulltext-search-panel .kui-fulltext-search.with-project-filter{width:calc(480px + 160px);border-top-left-radius:0;border-bottom-left-radius:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field{flex:1;width:calc(480px - 40px);margin:1px}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input{border-style:none;font-size:14pt;height:38px;position:absolute;padding-left:12px;width:calc(100% - 40px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input.with-project-filter{width:calc(100% - 40px - 160px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:active,.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:focus{outline:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-button{background-color:#fff}.kui-fulltext-search-panel .kui-fulltext-search .suffix{margin:1px 0 1px -3px;border-radius:0 4px 4px 0}.kui-fulltext-search-panel .kui-fulltext-search .prefix{margin:1px 0 1px 3px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search .prefix,.kui-fulltext-search-panel .kui-fulltext-search .suffix{border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:39px}.kui-fulltext-search-panel .kui-fulltext-search .prefix.disabled,.kui-fulltext-search-panel .kui-fulltext-search .suffix.disabled{cursor:auto}.kui-fulltext-search-panel .kui-fulltext-search .prefix:active,.kui-fulltext-search-panel .kui-fulltext-search .suffix:active{color:#515151}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQWdDLE1BQU0sc0JBQXNCLENBQUM7QUFDcEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxXQUFXLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9HLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQTRCLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRbkQ7O0dBRUc7QUFNSCxNQUFNLE9BQU8sdUJBQXVCO0lBcURoQyxZQUNZLFFBQWlCLEVBQ2pCLE9BQWUsRUFDZixpQkFBbUMsRUFDbkMsZ0JBQWlDO1FBSGpDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQXZEN0M7Ozs7V0FJRztRQUNNLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFbkM7Ozs7V0FJRztRQUNNLGtCQUFhLEdBQWEsS0FBSyxDQUFDO1FBa0J6Qyw2Q0FBNkM7UUFDN0MsZUFBVSxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQU85RSx3QkFBbUIsR0FBVyxjQUFjLENB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dkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7OztZQXBRSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsMG1HQUErQzs7YUFFbEQ7Ozs7WUFwQmdDLE9BQU87WUFHL0IsTUFBTTtZQUR3RCxnQkFBZ0I7WUFFcEQsZUFBZTs7O29CQXdCN0MsS0FBSzs0QkFPTCxLQUFLOzhCQU9MLEtBQUs7MEJBRUwsU0FBUyxTQUFDLHFCQUFxQjswQkFDL0IsU0FBUyxTQUFDLHFCQUFxQjt5QkFDL0IsU0FBUyxTQUFDLG9CQUFvQjs0QkFFOUIsU0FBUyxTQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsIE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYsIFBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBQcm9qZWN0LCBQcm9qZWN0c1NlcnZpY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuZXhwb3J0IGludGVyZmFjZSBQcmV2U2VhcmNoSXRlbSB7XG4gICAgcHJvamVjdElyaT86IHN0cmluZztcbiAgICBwcm9qZWN0TGFiZWw/OiBzdHJpbmc7XG4gICAgcXVlcnk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1mdWxsdGV4dC1zZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mdWxsdGV4dC1zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQuc2NzcycsICcuLi9hc3NldHMvc3R5bGUvc2VhcmNoLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGdWxsdGV4dFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcm91dGUgUm91dGUgdG8gbmF2aWdhdGUgYWZ0ZXIgc2VhcmNoLlxuICAgICAqIFRoaXMgcm91dGUgcGF0aCBzaG91bGQgY29udGFpbiBhIGNvbXBvbmVudCBmb3Igc2VhcmNoIHJlc3VsdHMuXG4gICAgICovXG4gICAgQElucHV0KCkgcm91dGU6IHN0cmluZyA9ICcvc2VhcmNoJztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gW3Byb2plY3RmaWx0ZXJdIElmIHRydWUgaXQgc2hvd3MgdGhlIHNlbGVjdGlvblxuICAgICAqIG9mIHByb2plY3RzIHRvIGZpbHRlciBieSBvbmUgb2YgdGhlbVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHByb2plY3RmaWx0ZXI/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW2ZpbHRlcmJ5cHJvamVjdF0gSWYgdGhlIGZ1bGwtdGV4dCBzZWFyY2ggc2hvdWxkIGJlXG4gICAgICogZmlsdGVyZWQgYnkgb25lIHByb2plY3QsIHlvdSBjYW4gZGVmaW5lIGl0IHdpdGggcHJvamVjdCBpcmkuXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyYnlwcm9qZWN0Pzogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnZnVsbHRleHRTZWFyY2hQYW5lbCcpIHNlYXJjaFBhbmVsOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2Z1bGx0ZXh0U2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdmdWxsdGV4dFNlYXJjaE1lbnUnKSBzZWFyY2hNZW51OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZCgnYnRuVG9TZWxlY3RQcm9qZWN0Jykgc2VsZWN0UHJvamVjdDogTWF0TWVudVRyaWdnZXI7XG5cbiAgICAvLyBzZWFyY2ggcXVlcnlcbiAgICBzZWFyY2hRdWVyeTogc3RyaW5nO1xuXG4gICAgLy8gcHJldmlvdXMgc2VhcmNoID0gZnVsbC10ZXh0IHNlYXJjaCBoaXN0b3J5XG4gICAgcHJldlNlYXJjaDogUHJldlNlYXJjaEl0ZW1bXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG5cbiAgICAvLyBsaXN0IG9mIHByb2plY3RzLCBpbiBjYXNlIG9mIGZpbHRlcnByb2plY3QgaXMgdHJ1ZVxuICAgIHByb2plY3RzOiBQcm9qZWN0W107XG5cbiAgICAvLyBzZWxlY3RlZCBwcm9qZWN0LCBpbiBjYXNlIG9mIGZpbHRlcmJ5cHJvamVjdCBhbmQvb3IgcHJvamVjdGZpbHRlciBpcyB0cnVlXG4gICAgcHJvamVjdDogUHJvamVjdDtcbiAgICBkZWZhdWx0UHJvamVjdExhYmVsOiBzdHJpbmcgPSAnQWxsIHByb2plY3RzJztcbiAgICBwcm9qZWN0TGFiZWw6IHN0cmluZyA9IHRoaXMuZGVmYXVsdFByb2plY3RMYWJlbDtcbiAgICBwcm9qZWN0SXJpOiBzdHJpbmc7XG5cbiAgICAvLyBpbiBjYXNlIG9mIGFuIChhcGkpIGVycm9yXG4gICAgZXJyb3I6IGFueTtcblxuICAgIC8vIGlzIHNlYXJjaCBwYW5lbCBmb2N1c2VkP1xuICAgIHNlYXJjaFBhbmVsRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIG92ZXJsYXkgcmVmZXJlbmNlXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RzU2VydmljZTogUHJvamVjdHNTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIHRoaXMuc2V0Rm9jdXMoKTtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJieXByb2plY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvamVjdCh0aGlzLmZpbHRlcmJ5cHJvamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0ZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEFsbFByb2plY3RzKCk7XG5cbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvamVjdChcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBhbmVsV2l0aEJhY2tkcm9wKCkge1xuICAgICAgICBjb25zdCBjb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICAvLyBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5hdHRhY2gobmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuc2VhcmNoTWVudSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZikpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9KSxcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVBvc2l0aW9uID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5zZWFyY2hQYW5lbCkud2l0aFBvc2l0aW9ucyhwb3NpdGlvbnMpLndpdGhMb2NrZWRQb3NpdGlvbihmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIG92ZXJsYXlQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBnZXRBbGxQcm9qZWN0cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdHNTZXJ2aWNlLmdldEFsbFByb2plY3RzKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sb2FkU3lzdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdCA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0KGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdHNTZXJ2aWNlLmdldFByb2plY3RCeUlyaShpZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHByb2plY3Q6IFByb2plY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFByb2plY3QocHJvamVjdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgY3VycmVudCBwcm9qZWN0IGFuZCBzd2l0Y2ggZm9jdXMgdG8gaW5wdXQgZmllbGRcbiAgICBzZXRQcm9qZWN0KHByb2plY3Q/OiBQcm9qZWN0KTogdm9pZCB7XG4gICAgICAgIGlmICghcHJvamVjdCkge1xuICAgICAgICAgICAgLy8gc2V0IGRlZmF1bHQgcHJvamVjdDogYWxsXG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHRoaXMuZGVmYXVsdFByb2plY3RMYWJlbDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50UHJvamVjdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2V0IGN1cnJlbnQgcHJvamVjdCBzaG9ydG5hbWUgYW5kIGlkXG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHByb2plY3Quc2hvcnRuYW1lO1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0SXJpID0gcHJvamVjdC5pZDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvamVjdCcsIEpTT04uc3RyaW5naWZ5KHByb2plY3QpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvU2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VhcmNoUXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGUgK1xuICAgICAgICAgICAgICAgICAgICAnL2Z1bGx0ZXh0LycgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ICtcbiAgICAgICAgICAgICAgICAgICAgJy8nICtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucHJvamVjdElyaSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlYXJjaCBxdWVyeSBpbnRvIHRoZSBsb2NhbCBzdG9yYWdlIHByZXZTZWFyY2ggYXJyYXkgKHByZXZpb3VzIHNlYXJjaClcbiAgICAgICAgICAgIC8vIHRvIGhhdmUgYSBsaXN0IG9mIHJlY2VudCBzZWFyY2ggcmVxdWVzdHNcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1ByZXZTZWFyY2g6IFByZXZTZWFyY2hJdGVtW10gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdQcmV2U2VhcmNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZXhpc3RpbmdQcmV2U2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGVudHJ5LCBpZiBleGlzdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ID09PSBlbnRyeS5xdWVyeSAmJiB0aGlzLnByb2plY3RJcmkgPT09IGVudHJ5LnByb2plY3RJcmkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBIHNlYXJjaCB2YWx1ZSBpcyBleHBlY3RlZCB0byBoYXZlIGF0IGxlYXN0IGxlbmd0aCBvZiAzXG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWVyeTogUHJldlNlYXJjaEl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RJcmkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdElyaTogdGhpcy5wcm9qZWN0SXJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdExhYmVsOiB0aGlzLnByb2plY3RMYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoLnB1c2goY3VycmVudFF1ZXJ5KTtcblxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAgICAgICAncHJldlNlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nUHJldlNlYXJjaClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRTZWFyY2goKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHJlc2V0U2VhcmNoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSB0cnVlO1xuICAgICAgICB0aGlzLm9wZW5QYW5lbFdpdGhCYWNrZHJvcCgpO1xuICAgIH1cblxuICAgIGRvUHJldlNlYXJjaChwcmV2U2VhcmNoOiBQcmV2U2VhcmNoSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcHJldlNlYXJjaC5xdWVyeTtcblxuICAgICAgICBpZiAocHJldlNlYXJjaC5wcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHByZXZTZWFyY2gucHJvamVjdElyaTtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gcHJldlNlYXJjaC5wcm9qZWN0TGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2Z1bGx0ZXh0LycgKyB0aGlzLnNlYXJjaFF1ZXJ5ICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByZXZTZWFyY2gucHJvamVjdElyaSldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gdGhpcy5kZWZhdWx0UHJvamVjdExhYmVsO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlICsgJy9mdWxsdGV4dC8nICsgdGhpcy5zZWFyY2hRdWVyeV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNldFNlYXJjaCgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmV2U2VhcmNoKHByZXZTZWFyY2g/OiBQcmV2U2VhcmNoSXRlbSk6IHZvaWQge1xuICAgICAgICBpZiAocHJldlNlYXJjaCkge1xuICAgICAgICAgICAgLy8gZGVsZXRlIG9ubHkgdGhpcyBpdGVtIHdpdGggdGhlIG5hbWUgLi4uXG4gICAgICAgICAgICBjb25zdCBpOiBudW1iZXIgPSB0aGlzLnByZXZTZWFyY2guaW5kZXhPZihwcmV2U2VhcmNoKTtcbiAgICAgICAgICAgIHRoaXMucHJldlNlYXJjaC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJldlNlYXJjaCcsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJldlNlYXJjaCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSB3aG9sZSBcInByZXZpb3VzIHNlYXJjaFwiIGFycmF5XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncHJldlNlYXJjaCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldlNlYXJjaCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0UHJvamVjdC5jbG9zZU1lbnUoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICB9XG59XG4iXX0=