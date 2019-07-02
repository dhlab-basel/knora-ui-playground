import * as tslib_1 from "tslib";
import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService, KnoraConstants } from '@knora/core';
import { MatMenuTrigger } from '@angular/material/menu';
/**
 * @deprecated
 */
let FulltextSearchComponent = class FulltextSearchComponent {
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
        // do not show the following projects: default system projects from knora
        this.doNotDisplay = [
            KnoraConstants.SystemProjectIRI,
            KnoraConstants.DefaultSharedOntologyIRI
        ];
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
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], FulltextSearchComponent.prototype, "route", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], FulltextSearchComponent.prototype, "projectfilter", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], FulltextSearchComponent.prototype, "filterbyproject", void 0);
tslib_1.__decorate([
    ViewChild('fulltextSearchPanel', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], FulltextSearchComponent.prototype, "searchPanel", void 0);
tslib_1.__decorate([
    ViewChild('fulltextSearchInput', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], FulltextSearchComponent.prototype, "searchInput", void 0);
tslib_1.__decorate([
    ViewChild('fulltextSearchMenu', { static: false }),
    tslib_1.__metadata("design:type", TemplateRef)
], FulltextSearchComponent.prototype, "searchMenu", void 0);
tslib_1.__decorate([
    ViewChild('btnToSelectProject', { static: false }),
    tslib_1.__metadata("design:type", MatMenuTrigger)
], FulltextSearchComponent.prototype, "selectProject", void 0);
FulltextSearchComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-fulltext-search',
        template: "<!-- full-text search panel -->\n<div class=\"kui-fulltext-search-panel\" [class.active]=\"searchPanelFocus\" [class.with-project-filter]=\"projectfilter\"\n     #fulltextSearchPanel cdkOverlayOrigin>\n    <div class=\"kui-project-filter\" *ngIf=\"projectfilter\">\n        <button mat-button class=\"kui-project-filter-button\" [matMenuTriggerFor]=\"selectProject\"\n                #btnToSelectProject=\"matMenuTrigger\" isIconButton>\n            <span class=\"label\">{{projectLabel}}</span>\n            <mat-icon class=\"icon\" matSuffix>keyboard_arrow_down</mat-icon>\n        </button>\n        <mat-menu #selectProject=\"matMenu\">\n            <div class=\"kui-project-filter-menu\">\n                <button mat-menu-item class=\"center\"\n                        (click)=\"setProject();changeFocus()\">{{defaultProjectLabel}}</button>\n                <mat-divider></mat-divider>\n                <span *ngFor=\"let project of projects | kuiSortBy: 'shortname'\">\n                    <button mat-menu-item *ngIf=\"!doNotDisplay.includes(project.id)\"\n                            (click)=\"setProject(project);changeFocus()\" [matTooltip]=\"project.longname\"\n                            [matTooltipPosition]=\"'after'\">{{project.shortname}}</button>\n                </span>\n            </div>\n        </mat-menu>\n    </div>\n\n    <div class=\"kui-fulltext-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-fulltext-search-field\">\n            <input #fulltextSearchInput class=\"kui-fulltext-search-input\" type=\"search\" [(ngModel)]=\"searchQuery\"\n                   name=\"search\" minlength=\"3\" autocomplete=\"off\" [placeholder]=\"'Search'\" (keyup.esc)=\"resetSearch()\"\n                   (keyup.enter)=\"doSearch()\" (click)=\"setFocus()\">\n        </div>\n        <button class=\"kui-fulltext-search-button suffix\" (click)=\"doSearch()\" type=\"submit\">\n            <mat-icon>search</mat-icon>\n        </button>\n    </div>\n\n</div>\n\n<!-- full-text search menu -->\n<ng-template #fulltextSearchMenu>\n    <div class=\"kui-search-menu\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-menu-content\">\n            <mat-list class=\"kui-previous-search-list\">\n                <div *ngFor=\"let item of prevSearch | kuiReverse; let i=index\">\n                    <mat-list-item *ngIf=\"i<10\">\n                        <h4 mat-line (click)=\"doPrevSearch(item)\" class=\"kui-previous-search-item\">\n                            <div class=\"kui-project-filter-label\" [class.not-empty]=\"item.projectIri\"\n                                 *ngIf=\"projectfilter && !error && projects?.length > 0\">\n                                <span *ngIf=\"item.projectIri\">{{item.projectLabel}}</span>\n                            </div>\n                            <div class=\"kui-previous-search-query\" [class.fix-width]=\"projectfilter\">\n                                {{item.query}}\n                            </div>\n                        </h4>\n                        <button mat-icon-button (click)=\"resetPrevSearch(item)\">\n                            <mat-icon aria-label=\"close\">close</mat-icon>\n                        </button>\n                    </mat-list-item>\n                </div>\n            </mat-list>\n        </div>\n\n        <div class=\"kui-menu-action\" *ngIf=\"prevSearch\">\n            <mat-divider></mat-divider>\n            <button mat-button color=\"primary\" class=\"center\" (click)=\"resetPrevSearch()\">Clear\n                list</button>\n        </div>\n    </div>\n</ng-template>\n",
        styles: ["input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.center{text-align:center}.kui-fulltext-search-panel{border-radius:4px;display:-webkit-box;display:flex;height:40px;position:relative;width:480px;z-index:100;background-color:#f9f9f9}.kui-fulltext-search-panel.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-fulltext-search-panel.with-project-filter{width:calc(480px + 160px)}.kui-fulltext-search-panel .kui-project-filter-button{font-size:inherit;overflow:hidden;text-overflow:ellipsis;width:160px;margin:1px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search{background-color:#f9f9f9;border-radius:4px;display:-webkit-inline-box;display:inline-flex;position:relative;z-index:10}.kui-fulltext-search-panel .kui-fulltext-search.with-project-filter{width:calc(480px + 160px);border-top-left-radius:0;border-bottom-left-radius:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field{-webkit-box-flex:1;flex:1;width:calc(480px - 40px);margin:1px}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input{border-style:none;font-size:14pt;height:38px;position:absolute;padding-left:12px;width:calc(100% - 40px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input.with-project-filter{width:calc(100% - 40px - 160px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:active,.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:focus{outline:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-button{background-color:#fff}.kui-fulltext-search-panel .kui-fulltext-search .suffix{margin:1px 0 1px -3px;border-radius:0 4px 4px 0}.kui-fulltext-search-panel .kui-fulltext-search .prefix{margin:1px 0 1px 3px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search .prefix,.kui-fulltext-search-panel .kui-fulltext-search .suffix{border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:39px}.kui-fulltext-search-panel .kui-fulltext-search .prefix.disabled,.kui-fulltext-search-panel .kui-fulltext-search .suffix.disabled{cursor:auto}.kui-fulltext-search-panel .kui-fulltext-search .prefix:active,.kui-fulltext-search-panel .kui-fulltext-search .suffix:active{color:#515151}.kui-search-menu{height:100%}.kui-search-menu .kui-menu-content{display:block}.kui-search-menu .kui-menu-content .mat-list{padding-bottom:8px}.kui-search-menu .kui-menu-content .mat-list .kui-previous-search-query{overflow:hidden;text-overflow:ellipsis}.kui-search-menu .kui-menu-content .mat-list .kui-previous-search-query.fix-width{width:calc(100% - 160px)}.kui-project-filter-menu{width:160px}.kui-project-filter-menu .mat-menu-item{text-transform:capitalize}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:-webkit-inline-box;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:-webkit-inline-box;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:-webkit-inline-box;display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [Overlay,
        Router,
        ViewContainerRef,
        ProjectsService])
], FulltextSearchComponent);
export { FulltextSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFnQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsV0FBVyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUE0QixlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVF4RDs7R0FFRztBQU1ILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBMkRoQyxZQUNZLFFBQWlCLEVBQ2pCLE9BQWUsRUFDZixpQkFBbUMsRUFDbkMsZ0JBQWlDO1FBSGpDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQTdEN0M7Ozs7V0FJRztRQUNNLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFbkM7Ozs7V0FJRztRQUNNLGtCQUFhLEdBQWEsS0FBSyxDQUFDO1FBa0J6Qyw2Q0FBNkM7UUFDN0MsZUFBVSxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztR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LENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUdKLENBQUE7QUFqUVk7SUFBUixLQUFLLEVBQUU7O3NEQUEyQjtBQU8xQjtJQUFSLEtBQUssRUFBRTs7OERBQWlDO0FBT2hDO0lBQVIsS0FBSyxFQUFFOztnRUFBMEI7QUFFbUI7SUFBcEQsU0FBUyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUFjLFVBQVU7NERBQUM7QUFDeEI7SUFBcEQsU0FBUyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUFjLFVBQVU7NERBQUM7QUFDekI7SUFBbkQsU0FBUyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUFhLFdBQVc7MkRBQU07QUFFN0I7SUFBbkQsU0FBUyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUFnQixjQUFjOzhEQUFDO0FBM0J6RSx1QkFBdUI7SUFMbkMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQiwrakhBQStDOztLQUVsRCxDQUFDOzZDQTZEd0IsT0FBTztRQUNSLE1BQU07UUFDSSxnQkFBZ0I7UUFDakIsZUFBZTtHQS9EcEMsdUJBQXVCLENBd1FuQztTQXhRWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25uZWN0aW9uUG9zaXRpb25QYWlyLCBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmLCBQb3NpdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgUHJvamVjdCwgUHJvamVjdHNTZXJ2aWNlLCBLbm9yYUNvbnN0YW50cyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJldlNlYXJjaEl0ZW0ge1xuICAgIHByb2plY3RJcmk/OiBzdHJpbmc7XG4gICAgcHJvamVjdExhYmVsPzogc3RyaW5nO1xuICAgIHF1ZXJ5OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktZnVsbHRleHQtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mdWxsdGV4dC1zZWFyY2guY29tcG9uZW50LnNjc3MnLCAnLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnVsbHRleHRTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHJvdXRlIFJvdXRlIHRvIG5hdmlnYXRlIGFmdGVyIHNlYXJjaC5cbiAgICAgKiBUaGlzIHJvdXRlIHBhdGggc2hvdWxkIGNvbnRhaW4gYSBjb21wb25lbnQgZm9yIHNlYXJjaCByZXN1bHRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvdXRlOiBzdHJpbmcgPSAnL3NlYXJjaCc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IFtwcm9qZWN0ZmlsdGVyXSBJZiB0cnVlIGl0IHNob3dzIHRoZSBzZWxlY3Rpb25cbiAgICAgKiBvZiBwcm9qZWN0cyB0byBmaWx0ZXIgYnkgb25lIG9mIHRoZW1cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcm9qZWN0ZmlsdGVyPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtmaWx0ZXJieXByb2plY3RdIElmIHRoZSBmdWxsLXRleHQgc2VhcmNoIHNob3VsZCBiZVxuICAgICAqIGZpbHRlcmVkIGJ5IG9uZSBwcm9qZWN0LCB5b3UgY2FuIGRlZmluZSBpdCB3aXRoIHByb2plY3QgaXJpLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlcmJ5cHJvamVjdD86IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2Z1bGx0ZXh0U2VhcmNoUGFuZWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoUGFuZWw6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnZnVsbHRleHRTZWFyY2hJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdmdWxsdGV4dFNlYXJjaE1lbnUnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoTWVudTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2J0blRvU2VsZWN0UHJvamVjdCcsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWxlY3RQcm9qZWN0OiBNYXRNZW51VHJpZ2dlcjtcblxuICAgIC8vIHNlYXJjaCBxdWVyeVxuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG5cbiAgICAvLyBwcmV2aW91cyBzZWFyY2ggPSBmdWxsLXRleHQgc2VhcmNoIGhpc3RvcnlcbiAgICBwcmV2U2VhcmNoOiBQcmV2U2VhcmNoSXRlbVtdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcblxuICAgIC8vIGxpc3Qgb2YgcHJvamVjdHMsIGluIGNhc2Ugb2YgZmlsdGVycHJvamVjdCBpcyB0cnVlXG4gICAgcHJvamVjdHM6IFByb2plY3RbXTtcblxuICAgIC8vIHNlbGVjdGVkIHByb2plY3QsIGluIGNhc2Ugb2YgZmlsdGVyYnlwcm9qZWN0IGFuZC9vciBwcm9qZWN0ZmlsdGVyIGlzIHRydWVcbiAgICBwcm9qZWN0OiBQcm9qZWN0O1xuICAgIGRlZmF1bHRQcm9qZWN0TGFiZWw6IHN0cmluZyA9ICdBbGwgcHJvamVjdHMnO1xuICAgIHByb2plY3RMYWJlbDogc3RyaW5nID0gdGhpcy5kZWZhdWx0UHJvamVjdExhYmVsO1xuICAgIHByb2plY3RJcmk6IHN0cmluZztcblxuICAgIC8vIGluIGNhc2Ugb2YgYW4gKGFwaSkgZXJyb3JcbiAgICBlcnJvcjogYW55O1xuXG4gICAgLy8gaXMgc2VhcmNoIHBhbmVsIGZvY3VzZWQ/XG4gICAgc2VhcmNoUGFuZWxGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gb3ZlcmxheSByZWZlcmVuY2VcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuXG4gICAgLy8gZG8gbm90IHNob3cgdGhlIGZvbGxvd2luZyBwcm9qZWN0czogZGVmYXVsdCBzeXN0ZW0gcHJvamVjdHMgZnJvbSBrbm9yYVxuICAgIGRvTm90RGlzcGxheTogc3RyaW5nW10gPSBbXG4gICAgICAgIEtub3JhQ29uc3RhbnRzLlN5c3RlbVByb2plY3RJUkksXG4gICAgICAgIEtub3JhQ29uc3RhbnRzLkRlZmF1bHRTaGFyZWRPbnRvbG9neUlSSVxuICAgIF07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RzU2VydmljZTogUHJvamVjdHNTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIC8vIHRoaXMuc2V0Rm9jdXMoKTtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJieXByb2plY3QpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvamVjdCh0aGlzLmZpbHRlcmJ5cHJvamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0ZmlsdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmdldEFsbFByb2plY3RzKCk7XG5cbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvamVjdChcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBhbmVsV2l0aEJhY2tkcm9wKCkge1xuICAgICAgICBjb25zdCBjb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXG4gICAgICAgICAgICAvLyBiYWNrZHJvcENsYXNzOiAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKGNvbmZpZyk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5hdHRhY2gobmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuc2VhcmNoTWVudSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZikpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9KSxcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheVBvc2l0aW9uID0gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5zZWFyY2hQYW5lbCkud2l0aFBvc2l0aW9ucyhwb3NpdGlvbnMpLndpdGhMb2NrZWRQb3NpdGlvbihmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIG92ZXJsYXlQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBnZXRBbGxQcm9qZWN0cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdHNTZXJ2aWNlLmdldEFsbFByb2plY3RzKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sb2FkU3lzdGVtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdCA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2plY3QnKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0KGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdHNTZXJ2aWNlLmdldFByb2plY3RCeUlyaShpZCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHByb2plY3Q6IFByb2plY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFByb2plY3QocHJvamVjdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgY3VycmVudCBwcm9qZWN0IGFuZCBzd2l0Y2ggZm9jdXMgdG8gaW5wdXQgZmllbGRcbiAgICBzZXRQcm9qZWN0KHByb2plY3Q/OiBQcm9qZWN0KTogdm9pZCB7XG4gICAgICAgIGlmICghcHJvamVjdCkge1xuICAgICAgICAgICAgLy8gc2V0IGRlZmF1bHQgcHJvamVjdDogYWxsXG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHRoaXMuZGVmYXVsdFByb2plY3RMYWJlbDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50UHJvamVjdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2V0IGN1cnJlbnQgcHJvamVjdCBzaG9ydG5hbWUgYW5kIGlkXG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHByb2plY3Quc2hvcnRuYW1lO1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0SXJpID0gcHJvamVjdC5pZDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvamVjdCcsIEpTT04uc3RyaW5naWZ5KHByb2plY3QpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvU2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VhcmNoUXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGUgK1xuICAgICAgICAgICAgICAgICAgICAnL2Z1bGx0ZXh0LycgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ICtcbiAgICAgICAgICAgICAgICAgICAgJy8nICtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucHJvamVjdElyaSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlYXJjaCBxdWVyeSBpbnRvIHRoZSBsb2NhbCBzdG9yYWdlIHByZXZTZWFyY2ggYXJyYXkgKHByZXZpb3VzIHNlYXJjaClcbiAgICAgICAgICAgIC8vIHRvIGhhdmUgYSBsaXN0IG9mIHJlY2VudCBzZWFyY2ggcmVxdWVzdHNcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1ByZXZTZWFyY2g6IFByZXZTZWFyY2hJdGVtW10gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdQcmV2U2VhcmNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZXhpc3RpbmdQcmV2U2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGVudHJ5LCBpZiBleGlzdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ID09PSBlbnRyeS5xdWVyeSAmJiB0aGlzLnByb2plY3RJcmkgPT09IGVudHJ5LnByb2plY3RJcmkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBIHNlYXJjaCB2YWx1ZSBpcyBleHBlY3RlZCB0byBoYXZlIGF0IGxlYXN0IGxlbmd0aCBvZiAzXG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWVyeTogUHJldlNlYXJjaEl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RJcmkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdElyaTogdGhpcy5wcm9qZWN0SXJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdExhYmVsOiB0aGlzLnByb2plY3RMYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoLnB1c2goY3VycmVudFF1ZXJ5KTtcblxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAgICAgICAncHJldlNlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nUHJldlNlYXJjaClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRTZWFyY2goKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHJlc2V0U2VhcmNoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSB0cnVlO1xuICAgICAgICB0aGlzLm9wZW5QYW5lbFdpdGhCYWNrZHJvcCgpO1xuICAgIH1cblxuICAgIGRvUHJldlNlYXJjaChwcmV2U2VhcmNoOiBQcmV2U2VhcmNoSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcHJldlNlYXJjaC5xdWVyeTtcblxuICAgICAgICBpZiAocHJldlNlYXJjaC5wcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHByZXZTZWFyY2gucHJvamVjdElyaTtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gcHJldlNlYXJjaC5wcm9qZWN0TGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2Z1bGx0ZXh0LycgKyB0aGlzLnNlYXJjaFF1ZXJ5ICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByZXZTZWFyY2gucHJvamVjdElyaSldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gdGhpcy5kZWZhdWx0UHJvamVjdExhYmVsO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlICsgJy9mdWxsdGV4dC8nICsgdGhpcy5zZWFyY2hRdWVyeV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNldFNlYXJjaCgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQcmV2U2VhcmNoKHByZXZTZWFyY2g/OiBQcmV2U2VhcmNoSXRlbSk6IHZvaWQge1xuICAgICAgICBpZiAocHJldlNlYXJjaCkge1xuICAgICAgICAgICAgLy8gZGVsZXRlIG9ubHkgdGhpcyBpdGVtIHdpdGggdGhlIG5hbWUgLi4uXG4gICAgICAgICAgICBjb25zdCBpOiBudW1iZXIgPSB0aGlzLnByZXZTZWFyY2guaW5kZXhPZihwcmV2U2VhcmNoKTtcbiAgICAgICAgICAgIHRoaXMucHJldlNlYXJjaC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJldlNlYXJjaCcsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJldlNlYXJjaCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSB3aG9sZSBcInByZXZpb3VzIHNlYXJjaFwiIGFycmF5XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncHJldlNlYXJjaCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldlNlYXJjaCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKSk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0UHJvamVjdC5jbG9zZU1lbnUoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXMoKTtcbiAgICB9XG5cblxufVxuIl19