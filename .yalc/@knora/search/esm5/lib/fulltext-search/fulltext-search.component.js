import * as tslib_1 from "tslib";
import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '@knora/core';
import { MatMenuTrigger } from '@angular/material';
/**
 * @deprecated
 */
var FulltextSearchComponent = /** @class */ (function () {
    function FulltextSearchComponent(_overlay, _router, _viewContainerRef, _projectsService) {
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
    FulltextSearchComponent.prototype.ngOnInit = function () {
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
    };
    FulltextSearchComponent.prototype.openPanelWithBackdrop = function () {
        var _this = this;
        var config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            // backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this._overlay.scrollStrategies.block()
        });
        this.overlayRef = this._overlay.create(config);
        this.overlayRef.attach(new TemplatePortal(this.searchMenu, this._viewContainerRef));
        this.overlayRef.backdropClick().subscribe(function () {
            _this.searchPanelFocus = false;
            _this.overlayRef.detach();
        });
    };
    FulltextSearchComponent.prototype.getOverlayPosition = function () {
        var positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        var overlayPosition = this._overlay.position().flexibleConnectedTo(this.searchPanel).withPositions(positions).withLockedPosition(false);
        return overlayPosition;
    };
    FulltextSearchComponent.prototype.getAllProjects = function () {
        var _this = this;
        this._projectsService.getAllProjects().subscribe(function (projects) {
            _this.projects = projects;
            // this.loadSystem = false;
            if (localStorage.getItem('currentProject') !== null) {
                _this.project = JSON.parse(localStorage.getItem('currentProject'));
            }
        }, function (error) {
            console.error(error);
            _this.error = error;
        });
    };
    FulltextSearchComponent.prototype.getProject = function (id) {
        var _this = this;
        this._projectsService.getProjectByIri(id).subscribe(function (project) {
            _this.setProject(project);
        }, function (error) {
            console.error(error);
        });
    };
    // set current project and switch focus to input field
    FulltextSearchComponent.prototype.setProject = function (project) {
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
    };
    FulltextSearchComponent.prototype.doSearch = function () {
        var e_1, _a;
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
            var existingPrevSearch = JSON.parse(localStorage.getItem('prevSearch'));
            if (existingPrevSearch === null) {
                existingPrevSearch = [];
            }
            var i = 0;
            try {
                for (var existingPrevSearch_1 = tslib_1.__values(existingPrevSearch), existingPrevSearch_1_1 = existingPrevSearch_1.next(); !existingPrevSearch_1_1.done; existingPrevSearch_1_1 = existingPrevSearch_1.next()) {
                    var entry = existingPrevSearch_1_1.value;
                    // remove entry, if exists already
                    if (this.searchQuery === entry.query && this.projectIri === entry.projectIri) {
                        existingPrevSearch.splice(i, 1);
                    }
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (existingPrevSearch_1_1 && !existingPrevSearch_1_1.done && (_a = existingPrevSearch_1.return)) _a.call(existingPrevSearch_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // A search value is expected to have at least length of 3
            if (this.searchQuery.length > 2) {
                var currentQuery = {
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
    };
    FulltextSearchComponent.prototype.resetSearch = function () {
        this.searchPanelFocus = false;
        this.searchInput.nativeElement.blur();
        this.overlayRef.detach();
    };
    FulltextSearchComponent.prototype.setFocus = function () {
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        this.searchPanelFocus = true;
        this.openPanelWithBackdrop();
    };
    FulltextSearchComponent.prototype.doPrevSearch = function (prevSearch) {
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
    };
    FulltextSearchComponent.prototype.resetPrevSearch = function (prevSearch) {
        if (prevSearch) {
            // delete only this item with the name ...
            var i = this.prevSearch.indexOf(prevSearch);
            this.prevSearch.splice(i, 1);
            localStorage.setItem('prevSearch', JSON.stringify(this.prevSearch));
        }
        else {
            // delete the whole "previous search" array
            localStorage.removeItem('prevSearch');
        }
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
    };
    FulltextSearchComponent.prototype.changeFocus = function () {
        this.selectProject.closeMenu();
        this.searchInput.nativeElement.focus();
        this.setFocus();
    };
    FulltextSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-fulltext-search',
                    template: "<!-- full-text search panel -->\n<div class=\"kui-fulltext-search-panel\" [class.active]=\"searchPanelFocus\" [class.with-project-filter]=\"projectfilter\"\n     #fulltextSearchPanel cdkOverlayOrigin>\n    <div class=\"kui-project-filter\" *ngIf=\"projectfilter\">\n        <button mat-button class=\"kui-project-filter-button\" [matMenuTriggerFor]=\"selectProject\"\n                #btnToSelectProject=\"matMenuTrigger\" isIconButton>\n            <span class=\"label\">{{projectLabel}}</span>\n            <mat-icon class=\"icon\" matSuffix>keyboard_arrow_down</mat-icon>\n        </button>\n        <mat-menu #selectProject=\"matMenu\" class=\"kui-project-filter-menu\">\n            <button mat-menu-item class=\"center\" (click)=\"setProject();changeFocus()\">All Projects</button>\n            <mat-divider></mat-divider>\n            <button mat-menu-item *ngFor=\"let project of projects\"\n                    (click)=\"setProject(project);changeFocus()\">{{project.shortname}}</button>\n        </mat-menu>\n    </div>\n\n    <div class=\"kui-fulltext-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-fulltext-search-field\">\n            <input #fulltextSearchInput class=\"kui-fulltext-search-input\" type=\"search\" [(ngModel)]=\"searchQuery\"\n                   name=\"search\" minlength=\"3\" autocomplete=\"off\" [placeholder]=\"'Search'\" (keyup.esc)=\"resetSearch()\"\n                   (keyup.enter)=\"doSearch()\" (click)=\"setFocus()\">\n        </div>\n        <button class=\"kui-fulltext-search-button suffix\" (click)=\"doSearch()\" type=\"submit\">\n            <mat-icon>search</mat-icon>\n        </button>\n    </div>\n\n</div>\n\n<!-- full-text search menu -->\n<ng-template #fulltextSearchMenu>\n    <div class=\"kui-search-menu\" [class.with-project-filter]=\"projectfilter\">\n        <mat-list class=\"kui-previous-search-list\">\n            <div *ngFor=\"let item of prevSearch | kuiReverse; let i=index\">\n                <mat-list-item *ngIf=\"i<10\">\n                    <h4 mat-line (click)=\"doPrevSearch(item)\" class=\"kui-previous-search-item\">\n                        <div class=\"kui-project-filter-label\" [class.not-empty]=\"item.projectIri\"\n                             *ngIf=\"projectfilter && !error && projects?.length > 0\">\n                            <span *ngIf=\"item.projectIri\">{{item.projectLabel}}</span>\n                        </div>\n                        <div class=\"kui-previous-search-query\">\n                            {{item.query}}\n                        </div>\n                    </h4>\n                    <button mat-icon-button (click)=\"resetPrevSearch(item)\">\n                        <mat-icon aria-label=\"close\">close</mat-icon>\n                    </button>\n                </mat-list-item>\n            </div>\n        </mat-list>\n\n        <div class=\"kui-menu-action\" *ngIf=\"prevSearch\">\n            <mat-divider></mat-divider>\n            <button mat-button color=\"primary\" class=\"center\" (click)=\"resetPrevSearch()\">Clear\n                list</button>\n        </div>\n    </div>\n</ng-template>\n",
                    styles: ["input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.center{text-align:center}.kui-fulltext-search-panel{border-radius:4px;display:flex;height:40px;position:relative;width:480px;z-index:100;background-color:#f9f9f9}.kui-fulltext-search-panel.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-fulltext-search-panel.with-project-filter{width:calc(480px + 160px)}.kui-fulltext-search-panel .kui-project-filter .kui-project-filter-button{font-size:inherit;overflow:hidden;text-overflow:ellipsis;width:160px;margin:1px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search{background-color:#f9f9f9;border-radius:4px;display:inline-flex;position:relative;z-index:10}.kui-fulltext-search-panel .kui-fulltext-search.with-project-filter{width:calc(480px + 160px);border-top-left-radius:0;border-bottom-left-radius:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field{flex:1;width:calc(480px - 40px);margin:1px}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input{border-style:none;font-size:14pt;height:38px;position:absolute;padding-left:12px;width:calc(100% - 40px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input.with-project-filter{width:calc(100% - 40px - 160px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:active,.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:focus{outline:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-button{background-color:#fff}.kui-fulltext-search-panel .kui-fulltext-search .suffix{margin:1px 0 1px -3px;border-radius:0 4px 4px 0}.kui-fulltext-search-panel .kui-fulltext-search .prefix{margin:1px 0 1px 3px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search .prefix,.kui-fulltext-search-panel .kui-fulltext-search .suffix{border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:39px}.kui-fulltext-search-panel .kui-fulltext-search .prefix.disabled,.kui-fulltext-search-panel .kui-fulltext-search .suffix.disabled{cursor:auto}.kui-fulltext-search-panel .kui-fulltext-search .prefix:active,.kui-fulltext-search-panel .kui-fulltext-search .suffix:active{color:#515151}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
                }] }
    ];
    /** @nocollapse */
    FulltextSearchComponent.ctorParameters = function () { return [
        { type: Overlay },
        { type: Router },
        { type: ViewContainerRef },
        { type: ProjectsService }
    ]; };
    FulltextSearchComponent.propDecorators = {
        route: [{ type: Input }],
        projectfilter: [{ type: Input }],
        filterbyproject: [{ type: Input }],
        searchPanel: [{ type: ViewChild, args: ['fulltextSearchPanel',] }],
        searchInput: [{ type: ViewChild, args: ['fulltextSearchInput',] }],
        searchMenu: [{ type: ViewChild, args: ['fulltextSearchMenu',] }],
        selectProject: [{ type: ViewChild, args: ['btnToSelectProject',] }]
    };
    return FulltextSearchComponent;
}());
export { FulltextSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFnQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsV0FBVyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUE0QixlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUW5EOztHQUVHO0FBQ0g7SUF5REksaUNBQ1ksUUFBaUIsRUFDakIsT0FBZSxFQUNmLGlCQUFtQyxFQUNuQyxnQkFBaUM7UUFIakMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBdEQ3Qzs7OztXQUlHO1FBQ00sVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUVuQzs7OztXQUlHO1FBQ00sa0JBQWEsR0FBYSxLQUFLLENBQUM7UUFrQnpDLDZDQUE2QztRQUM3QyxlQUFVLEdBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBTzlFLGlCQUFZLEdBQVcsZ0JBQWdCLENBQUM7UUFNeEMsMkJBQTJCO1FBQzNCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztJQVU5QixDQUFDO0lBRUwsMENBQVEsR0FBUjtRQUVJLG1CQUFtQjtRQUVuQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDakQsSUFBSSxDQUFDLFVBQVUsQ0FDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUNyRCxDQUFDO2FBQ0w7U0FDSjtJQUNMLENBQUM7SUFFRCx1REFBcUIsR0FBckI7UUFBQSxpQkFlQztRQWRHLElBQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQzdCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGFBQWEsRUFBRSxrQ0FBa0M7WUFDakQsOENBQThDO1lBQzlDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7U0FDekQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDdEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9EQUFrQixHQUFsQjtRQUNJLElBQU0sU0FBUyxHQUFHO1lBQ2QsSUFBSSxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDM0csSUFBSSxzQkFBc0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7U0FDOUcsQ0FBQztRQUVGLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxSSxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0RBQWMsR0FBZDtRQUFBLGlCQWdCQztRQWZHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQzVDLFVBQUMsUUFBbUI7WUFDaEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsMkJBQTJCO1lBQzNCLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDakQsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQ3pDLENBQUM7YUFDTDtRQUNMLENBQUMsRUFDRCxVQUFDLEtBQXNCO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsNENBQVUsR0FBVixVQUFXLEVBQVU7UUFBckIsaUJBU0M7UUFSRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDL0MsVUFBQyxPQUFnQjtZQUNiLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUNELFVBQUMsS0FBc0I7WUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsNENBQVUsR0FBVixVQUFXLE9BQWlCO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDViwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixZQUFZLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNILHVDQUF1QztZQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUVELDBDQUFRLEdBQVI7O1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUM3RCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO2dCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUs7d0JBQ1YsWUFBWTt3QkFDWixJQUFJLENBQUMsV0FBVzt3QkFDaEIsR0FBRzt3QkFDSCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2lCQUN0QyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVc7aUJBQy9DLENBQUMsQ0FBQzthQUNOO1lBQ0Qsa0ZBQWtGO1lBQ2xGLDJDQUEyQztZQUMzQyxJQUFJLGtCQUFrQixHQUFxQixJQUFJLENBQUMsS0FBSyxDQUNqRCxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUNyQyxDQUFDO1lBQ0YsSUFBSSxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7Z0JBQzdCLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQzs7Z0JBQ2xCLEtBQW9CLElBQUEsdUJBQUEsaUJBQUEsa0JBQWtCLENBQUEsc0RBQUEsc0ZBQUU7b0JBQW5DLElBQU0sS0FBSywrQkFBQTtvQkFDWixrQ0FBa0M7b0JBQ2xDLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFVBQVUsRUFBRTt3QkFDMUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDbkM7b0JBQ0QsQ0FBQyxFQUFFLENBQUM7aUJBQ1A7Ozs7Ozs7OztZQUVELDBEQUEwRDtZQUMxRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxZQUFZLEdBQW1CO29CQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7aUJBQzFCLENBQUM7Z0JBRUYsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNqQixZQUFZLEdBQUc7d0JBQ1gsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO3dCQUMzQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7d0JBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVztxQkFDMUIsQ0FBQztpQkFDTDtnQkFFRCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRXRDLFlBQVksQ0FBQyxPQUFPLENBQ2hCLFlBQVksRUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQ3JDLENBQUM7YUFDTDtTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDZDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELDhDQUFZLEdBQVosVUFBYSxVQUEwQjtRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFcEMsSUFBSSxVQUFVLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzSDthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGlEQUFlLEdBQWYsVUFBZ0IsVUFBMkI7UUFDdkMsSUFBSSxVQUFVLEVBQUU7WUFDWiwwQ0FBMEM7WUFDMUMsSUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDdkU7YUFBTTtZQUNILDJDQUEyQztZQUMzQyxZQUFZLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsNkNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7O2dCQW5RSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsK2xHQUErQzs7aUJBRWxEOzs7O2dCQXBCZ0MsT0FBTztnQkFHL0IsTUFBTTtnQkFEd0QsZ0JBQWdCO2dCQUVwRCxlQUFlOzs7d0JBd0I3QyxLQUFLO2dDQU9MLEtBQUs7a0NBT0wsS0FBSzs4QkFFTCxTQUFTLFNBQUMscUJBQXFCOzhCQUMvQixTQUFTLFNBQUMscUJBQXFCOzZCQUMvQixTQUFTLFNBQUMsb0JBQW9CO2dDQUU5QixTQUFTLFNBQUMsb0JBQW9COztJQW9PbkMsOEJBQUM7Q0FBQSxBQXBRRCxJQW9RQztTQS9QWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25uZWN0aW9uUG9zaXRpb25QYWlyLCBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmLCBQb3NpdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgUHJvamVjdCwgUHJvamVjdHNTZXJ2aWNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJldlNlYXJjaEl0ZW0ge1xuICAgIHByb2plY3RJcmk/OiBzdHJpbmc7XG4gICAgcHJvamVjdExhYmVsPzogc3RyaW5nO1xuICAgIHF1ZXJ5OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktZnVsbHRleHQtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mdWxsdGV4dC1zZWFyY2guY29tcG9uZW50LnNjc3MnLCAnLi4vYXNzZXRzL3N0eWxlL3NlYXJjaC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnVsbHRleHRTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHJvdXRlIFJvdXRlIHRvIG5hdmlnYXRlIGFmdGVyIHNlYXJjaC5cbiAgICAgKiBUaGlzIHJvdXRlIHBhdGggc2hvdWxkIGNvbnRhaW4gYSBjb21wb25lbnQgZm9yIHNlYXJjaCByZXN1bHRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvdXRlOiBzdHJpbmcgPSAnL3NlYXJjaCc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IFtwcm9qZWN0ZmlsdGVyXSBJZiB0cnVlIGl0IHNob3dzIHRoZSBzZWxlY3Rpb25cbiAgICAgKiBvZiBwcm9qZWN0cyB0byBmaWx0ZXIgYnkgb25lIG9mIHRoZW1cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcm9qZWN0ZmlsdGVyPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtmaWx0ZXJieXByb2plY3RdIElmIHRoZSBmdWxsLXRleHQgc2VhcmNoIHNob3VsZCBiZVxuICAgICAqIGZpbHRlcmVkIGJ5IG9uZSBwcm9qZWN0LCB5b3UgY2FuIGRlZmluZSBpdCB3aXRoIHByb2plY3QgaXJpLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlcmJ5cHJvamVjdD86IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2Z1bGx0ZXh0U2VhcmNoUGFuZWwnKSBzZWFyY2hQYW5lbDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdmdWxsdGV4dFNlYXJjaElucHV0Jykgc2VhcmNoSW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnZnVsbHRleHRTZWFyY2hNZW51Jykgc2VhcmNoTWVudTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2J0blRvU2VsZWN0UHJvamVjdCcpIHNlbGVjdFByb2plY3Q6IE1hdE1lbnVUcmlnZ2VyO1xuXG4gICAgLy8gc2VhcmNoIHF1ZXJ5XG4gICAgc2VhcmNoUXVlcnk6IHN0cmluZztcblxuICAgIC8vIHByZXZpb3VzIHNlYXJjaCA9IGZ1bGwtdGV4dCBzZWFyY2ggaGlzdG9yeVxuICAgIHByZXZTZWFyY2g6IFByZXZTZWFyY2hJdGVtW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuXG4gICAgLy8gbGlzdCBvZiBwcm9qZWN0cywgaW4gY2FzZSBvZiBmaWx0ZXJwcm9qZWN0IGlzIHRydWVcbiAgICBwcm9qZWN0czogUHJvamVjdFtdO1xuXG4gICAgLy8gc2VsZWN0ZWQgcHJvamVjdCwgaW4gY2FzZSBvZiBmaWx0ZXJieXByb2plY3QgYW5kL29yIHByb2plY3RmaWx0ZXIgaXMgdHJ1ZVxuICAgIHByb2plY3Q6IFByb2plY3Q7XG4gICAgcHJvamVjdExhYmVsOiBzdHJpbmcgPSAnRmlsdGVyIHByb2plY3QnO1xuICAgIHByb2plY3RJcmk6IHN0cmluZztcblxuICAgIC8vIGluIGNhc2Ugb2YgYW4gKGFwaSkgZXJyb3JcbiAgICBlcnJvcjogYW55O1xuXG4gICAgLy8gaXMgc2VhcmNoIHBhbmVsIGZvY3VzZWQ/XG4gICAgc2VhcmNoUGFuZWxGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gb3ZlcmxheSByZWZlcmVuY2VcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfcHJvamVjdHNTZXJ2aWNlOiBQcm9qZWN0c1NlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gdGhpcy5zZXRGb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcmJ5cHJvamVjdCkge1xuICAgICAgICAgICAgdGhpcy5nZXRQcm9qZWN0KHRoaXMuZmlsdGVyYnlwcm9qZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb2plY3RmaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWxsUHJvamVjdHMoKTtcblxuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9qZWN0KFxuICAgICAgICAgICAgICAgICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuUGFuZWxXaXRoQmFja2Ryb3AoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgICAgICAgIC8vIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5zZWFyY2hNZW51LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKSk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFuZWxGb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRPdmVybGF5UG9zaXRpb24oKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnIH0pLFxuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSlcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UG9zaXRpb24gPSB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLnNlYXJjaFBhbmVsKS53aXRoUG9zaXRpb25zKHBvc2l0aW9ucykud2l0aExvY2tlZFBvc2l0aW9uKGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gb3ZlcmxheVBvc2l0aW9uO1xuICAgIH1cblxuICAgIGdldEFsbFByb2plY3RzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wcm9qZWN0c1NlcnZpY2UuZ2V0QWxsUHJvamVjdHMoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxvYWRTeXN0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRQcm9qZWN0JykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFByb2plY3QoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wcm9qZWN0c1NlcnZpY2UuZ2V0UHJvamVjdEJ5SXJpKGlkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocHJvamVjdDogUHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIHNldCBjdXJyZW50IHByb2plY3QgYW5kIHN3aXRjaCBmb2N1cyB0byBpbnB1dCBmaWVsZFxuICAgIHNldFByb2plY3QocHJvamVjdD86IFByb2plY3QpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFwcm9qZWN0KSB7XG4gICAgICAgICAgICAvLyBzZXQgZGVmYXVsdCBwcm9qZWN0OiBhbGxcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gJ0ZpbHRlciBwcm9qZWN0JztcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50UHJvamVjdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2V0IGN1cnJlbnQgcHJvamVjdCBzaG9ydG5hbWUgYW5kIGlkXG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHByb2plY3Quc2hvcnRuYW1lO1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0SXJpID0gcHJvamVjdC5pZDtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvamVjdCcsIEpTT04uc3RyaW5naWZ5KHByb2plY3QpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvU2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VhcmNoUXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGUgK1xuICAgICAgICAgICAgICAgICAgICAnL2Z1bGx0ZXh0LycgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ICtcbiAgICAgICAgICAgICAgICAgICAgJy8nICtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucHJvamVjdElyaSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHB1c2ggdGhlIHNlYXJjaCBxdWVyeSBpbnRvIHRoZSBsb2NhbCBzdG9yYWdlIHByZXZTZWFyY2ggYXJyYXkgKHByZXZpb3VzIHNlYXJjaClcbiAgICAgICAgICAgIC8vIHRvIGhhdmUgYSBsaXN0IG9mIHJlY2VudCBzZWFyY2ggcmVxdWVzdHNcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1ByZXZTZWFyY2g6IFByZXZTZWFyY2hJdGVtW10gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdQcmV2U2VhcmNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZXhpc3RpbmdQcmV2U2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGVudHJ5LCBpZiBleGlzdHMgYWxyZWFkeVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ID09PSBlbnRyeS5xdWVyeSAmJiB0aGlzLnByb2plY3RJcmkgPT09IGVudHJ5LnByb2plY3RJcmkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBIHNlYXJjaCB2YWx1ZSBpcyBleHBlY3RlZCB0byBoYXZlIGF0IGxlYXN0IGxlbmd0aCBvZiAzXG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hRdWVyeS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWVyeTogUHJldlNlYXJjaEl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RJcmkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFF1ZXJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdElyaTogdGhpcy5wcm9qZWN0SXJpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdExhYmVsOiB0aGlzLnByb2plY3RMYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLnNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdQcmV2U2VhcmNoLnB1c2goY3VycmVudFF1ZXJ5KTtcblxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAgICAgICAncHJldlNlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nUHJldlNlYXJjaClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRTZWFyY2goKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHJlc2V0U2VhcmNoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHNldEZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgICAgICB0aGlzLnNlYXJjaFBhbmVsRm9jdXMgPSB0cnVlO1xuICAgICAgICB0aGlzLm9wZW5QYW5lbFdpdGhCYWNrZHJvcCgpO1xuICAgIH1cblxuICAgIGRvUHJldlNlYXJjaChwcmV2U2VhcmNoOiBQcmV2U2VhcmNoSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcHJldlNlYXJjaC5xdWVyeTtcblxuICAgICAgICBpZiAocHJldlNlYXJjaC5wcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHByZXZTZWFyY2gucHJvamVjdElyaTtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gcHJldlNlYXJjaC5wcm9qZWN0TGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3RoaXMucm91dGUgKyAnL2Z1bGx0ZXh0LycgKyB0aGlzLnNlYXJjaFF1ZXJ5ICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByZXZTZWFyY2gucHJvamVjdElyaSldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gJ0ZpbHRlciBwcm9qZWN0JztcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzZXRTZWFyY2goKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHJlc2V0UHJldlNlYXJjaChwcmV2U2VhcmNoPzogUHJldlNlYXJjaEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgaWYgKHByZXZTZWFyY2gpIHtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSBvbmx5IHRoaXMgaXRlbSB3aXRoIHRoZSBuYW1lIC4uLlxuICAgICAgICAgICAgY29uc3QgaTogbnVtYmVyID0gdGhpcy5wcmV2U2VhcmNoLmluZGV4T2YocHJldlNlYXJjaCk7XG4gICAgICAgICAgICB0aGlzLnByZXZTZWFyY2guc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXZTZWFyY2gnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByZXZTZWFyY2gpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgd2hvbGUgXCJwcmV2aW91cyBzZWFyY2hcIiBhcnJheVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3ByZXZTZWFyY2gnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzKCkge1xuICAgICAgICB0aGlzLnNlbGVjdFByb2plY3QuY2xvc2VNZW51KCk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgfVxufVxuIl19