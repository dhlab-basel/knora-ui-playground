import * as tslib_1 from "tslib";
import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService, KnoraConstants } from '@knora/core';
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
        this.showState = new EventEmitter();
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
        this.show = false;
        this.showState.emit(this.show);
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
            this.projectLabel = this.defaultProjectLabel;
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
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], FulltextSearchComponent.prototype, "show", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], FulltextSearchComponent.prototype, "showState", void 0);
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
            template: "<!-- full-text search panel -->\n<div class=\"kui-fulltext-search-panel\" [class.active]=\"searchPanelFocus\" [class.with-project-filter]=\"projectfilter\" #fulltextSearchPanel cdkOverlayOrigin>\n\n    <!-- DESKTOP / TABLET VERSION -->\n    <div class=\"kui-project-filter\" *ngIf=\"projectfilter\">\n        <button mat-button class=\"kui-project-filter-button\" [matMenuTriggerFor]=\"selectProject\" #btnToSelectProject=\"matMenuTrigger\" isIconButton>\n            <span class=\"label\">{{projectLabel}}</span>\n            <mat-icon class=\"icon\" matSuffix>keyboard_arrow_down</mat-icon>\n        </button>\n        <mat-menu #selectProject=\"matMenu\">\n            <div class=\"kui-project-filter-menu\">\n                <button mat-menu-item class=\"center\" (click)=\"setProject();changeFocus()\">{{defaultProjectLabel}}</button>\n                <mat-divider></mat-divider>\n                <span *ngFor=\"let project of projects | kuiSortBy: 'shortname'\">\n                    <button mat-menu-item *ngIf=\"!doNotDisplay.includes(project.id)\" (click)=\"setProject(project);changeFocus()\" [matTooltip]=\"project.longname\" [matTooltipPosition]=\"'after'\">{{project.shortname}}</button>\n                </span>\n            </div>\n        </mat-menu>\n    </div>\n\n    <div class=\"kui-fulltext-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-fulltext-search-field\">\n            <input #fulltextSearchInput class=\"kui-fulltext-search-input\" type=\"search\" [(ngModel)]=\"searchQuery\" name=\"search\" minlength=\"3\" autocomplete=\"off\" [placeholder]=\"'Search'\" (keyup.esc)=\"resetSearch()\" (keyup.enter)=\"doSearch()\" (click)=\"setFocus()\">\n        </div>\n        <button class=\"kui-fulltext-search-button suffix\" (click)=\"doSearch()\" type=\"submit\">\n            <mat-icon>search</mat-icon>\n        </button>\n    </div>\n\n    <!-- PHONE VERSION *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** -->\n    <div class=\"kui-project-filter-mobile\" *ngIf=\"projectfilter\">\n        <button mat-stroked-button class=\"kui-project-filter-button-mobile\" [matMenuTriggerFor]=\"selectProject\" #btnToSelectProject=\"matMenuTrigger\" isIconButton>\n            <span class=\"label\">{{projectLabel}}</span>\n            <mat-icon class=\"icon\" matSuffix>keyboard_arrow_down</mat-icon>\n        </button>\n        <mat-menu #selectProject=\"matMenu\">\n            <div class=\"kui-project-filter-menu-mobile\">\n                <button mat-menu-item class=\"center\" (click)=\"setProject();changeFocus()\">{{defaultProjectLabel}}</button>\n                <mat-divider></mat-divider>\n                <span *ngFor=\"let project of projects | kuiSortBy: 'shortname'\">\n                    <button mat-menu-item *ngIf=\"!doNotDisplay.includes(project.id)\" (click)=\"setProject(project);changeFocus()\" [matTooltip]=\"project.longname\" [matTooltipPosition]=\"'after'\">{{project.shortname}}</button>\n                </span>\n            </div>\n        </mat-menu>\n        <!--  <mat-form-field class=\"kui-project-filter-select-mobile\">\n            <mat-select [(ngModel)]=\"All projects\">\n                <mat-option *ngFor=\"let project of projects | kuiSortBy: 'shortname'\" [value]=\"project.shortname\">\n                    {{project.shortname}}\n                </mat-option>\n            </mat-select>\n        </mat-form-field> -->\n    </div>\n\n    <div class=\"kui-fulltext-search-mobile\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-fulltext-search-field-mobile\">\n            <input #fulltextSearchInput class=\"kui-fulltext-search-input-mobile\" type=\"search\" [(ngModel)]=\"searchQuery\" name=\"search\" minlength=\"3\" autocomplete=\"off\" [placeholder]=\"'Search'\" (keyup.esc)=\"resetSearch()\" (keyup.enter)=\"doSearch()\" (click)=\"setFocus()\">\n        </div>\n        <button mat-stroked-button class=\"kui-fulltext-search-button-mobile suffix-mobile\" (click)=\"doSearch()\" type=\"submit\">\n            Search\n        </button>\n    </div>\n    <!-- *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** -->\n\n</div>\n\n<!-- full-text search menu - only for desktop/tablet versions -->\n<ng-template #fulltextSearchMenu>\n\n    <div class=\"kui-search-menu\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-menu-content\">\n            <mat-list class=\"kui-previous-search-list\">\n                <div *ngFor=\"let item of prevSearch | kuiReverse; let i=index\">\n                    <mat-list-item *ngIf=\"i<10\">\n                        <h4 mat-line (click)=\"doPrevSearch(item)\" class=\"kui-previous-search-item\">\n                            <div class=\"kui-project-filter-label\" [class.not-empty]=\"item.projectIri\" *ngIf=\"projectfilter && !error && projects?.length > 0\">\n                                <span *ngIf=\"item.projectIri\">{{item.projectLabel}}</span>\n                            </div>\n                            <div class=\"kui-previous-search-query\" [class.fix-width]=\"projectfilter\">\n                                {{item.query}}\n                            </div>\n                        </h4>\n                        <button mat-icon-button (click)=\"resetPrevSearch(item)\">\n                            <mat-icon class=\"mat-list-close-icon\" aria-label=\"close\">close</mat-icon>\n                        </button>\n                    </mat-list-item>\n                </div>\n            </mat-list>\n        </div>\n\n        <div class=\"kui-menu-action\" *ngIf=\"prevSearch\">\n            <mat-divider></mat-divider>\n            <button mat-button color=\"primary\" class=\"center\" (click)=\"resetPrevSearch()\">Clear list\n            </button>\n        </div>\n    </div>\n\n</ng-template>\n",
            styles: ["input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.center{text-align:center}.kui-fulltext-search-panel{border-radius:4px;display:flex;height:40px;position:relative;width:480px;z-index:100;background-color:#f9f9f9}.kui-fulltext-search-panel.active{box-shadow:0 1px 3px rgba(0,0,0,.5)}.kui-fulltext-search-panel.with-project-filter{width:calc(480px + 160px)}.kui-fulltext-search-panel .kui-project-filter-button{font-size:inherit;overflow:hidden;text-overflow:ellipsis;width:160px;margin:1px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search{background-color:#f9f9f9;border-radius:4px;display:inline-flex;position:relative;z-index:10}.kui-fulltext-search-panel .kui-fulltext-search.with-project-filter{width:calc(480px + 160px);border-top-left-radius:0;border-bottom-left-radius:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field{flex:1;width:calc(480px - 40px);margin:1px}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input{border-style:none;font-size:14pt;height:38px;position:absolute;padding-left:12px;width:calc(100% - 40px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input.with-project-filter{width:calc(100% - 40px - 160px)}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:active,.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-field .kui-fulltext-search-input:focus{outline:0}.kui-fulltext-search-panel .kui-fulltext-search .kui-fulltext-search-button{background-color:#fff}.kui-fulltext-search-panel .kui-fulltext-search .suffix{margin:1px 0 1px -3px;border-radius:0 4px 4px 0}.kui-fulltext-search-panel .kui-fulltext-search .prefix{margin:1px 0 1px 3px;border-radius:4px 0 0 4px}.kui-fulltext-search-panel .kui-fulltext-search .prefix,.kui-fulltext-search-panel .kui-fulltext-search .suffix{border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:38px;outline:0;position:relative;width:39px}.kui-fulltext-search-panel .kui-fulltext-search .prefix.disabled,.kui-fulltext-search-panel .kui-fulltext-search .suffix.disabled{cursor:auto}.kui-fulltext-search-panel .kui-fulltext-search .prefix:active,.kui-fulltext-search-panel .kui-fulltext-search .suffix:active{color:#515151}.kui-search-menu{height:100%}.kui-search-menu .kui-menu-content{display:block}.kui-search-menu .kui-menu-content .mat-list{padding-bottom:8px}.kui-search-menu .kui-menu-content .mat-list .kui-previous-search-query{overflow:hidden;text-overflow:ellipsis}.kui-search-menu .kui-menu-content .mat-list .kui-previous-search-query.fix-width{width:calc(100% - 160px)}.kui-project-filter-menu{width:160px}.kui-project-filter-menu .mat-menu-item{text-transform:capitalize}@media (min-width:576px){.kui-fulltext-search-mobile,.kui-fulltext-search-mobile.with-project-filter,.kui-project-filter-mobile{display:none}}@media (max-width:576px){.kui-fulltext-search,.kui-project-filter{display:none}.kui-fulltext-search.with-project-filter{display:none!important}.kui-search-menu{display:none}.kui-search-menu.with-project-filter{display:none!important}.kui-fulltext-search-panel{height:100vh!important;background-color:rgba(220,218,218,.9);position:relative;width:100%!important;z-index:100;display:block;border-radius:0}.kui-fulltext-search-panel.with-project-filter{width:100%!important}.kui-fulltext-search-panel .kui-project-filter-mobile{height:54px;margin:0 2% 5%;padding-top:3%}.kui-fulltext-search-panel .kui-project-filter-mobile.mat-stroked-button{padding:0}.kui-fulltext-search-panel .kui-project-filter-mobile .kui-project-filter-button-mobile{width:calc(100% - 16px);margin:8px;height:100%;background-color:#b8b8b8;cursor:pointer}.kui-fulltext-search-panel .kui-project-filter-mobile .kui-project-filter-menu-mobile{width:calc(100% - 16px)!important;margin:0 8px;height:100%!important}.kui-fulltext-search-panel .kui-fulltext-search-mobile{display:flex;height:64px;margin-top:5%;margin-right:4%;margin-left:4%}.kui-fulltext-search-panel .kui-fulltext-search-mobile .kui-fulltext-search-field-mobile{width:80%;margin-right:2px}.kui-fulltext-search-panel .kui-fulltext-search-mobile .kui-fulltext-search-field-mobile .kui-fulltext-search-input-mobile{width:72%;height:64px;font-size:14pt;position:absolute;padding-left:12px;border-radius:5px;border:.6px solid #b8b8b8}.kui-fulltext-search-panel .kui-fulltext-search-mobile .kui-fulltext-search-field-mobile .kui-fulltext-search-input-mobile:active,.kui-fulltext-search-panel .kui-fulltext-search-mobile .kui-fulltext-search-field-mobile .kui-fulltext-search-input-mobile:focus{outline:0}.kui-fulltext-search-panel .kui-fulltext-search-mobile .kui-fulltext-search-button-mobile{background-color:#fff;width:20%;height:64px;padding:0;margin-left:2px;border-radius:5px;border:.8px solid #b8b8b8}.kui-fulltext-search-panel .kui-fulltext-search-mobile .suffix{margin:1px 0 1px -3px;border-radius:0 4px 4px 0}.kui-fulltext-search-panel .kui-fulltext-search-mobile .prefix,.kui-fulltext-search-panel .kui-fulltext-search-mobile .suffix{border-style:none;color:rgba(41,41,41,.4);cursor:pointer;height:100%;outline:0;position:relative;width:20%}.kui-fulltext-search-panel .kui-fulltext-search-mobile .prefix.disabled,.kui-fulltext-search-panel .kui-fulltext-search-mobile .suffix.disabled{cursor:auto}.kui-fulltext-search-panel .kui-fulltext-search-mobile .prefix:active,.kui-fulltext-search-panel .kui-fulltext-search-mobile .suffix:active{color:#515151}::ng-deep .cdk-overlay-pane .mat-menu-panel{box-shadow:none}::ng-deep .cdk-overlay-pane .mat-select-panel-wrap{margin-top:20%}::ng-deep .cdk-overlay-pane .mat-select-panel-wrap .mat-select-panel{max-height:100%!important}}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%;position:relative;min-height:320px;height:100%}.kui-form-content .kui-form-action{position:absolute;bottom:0;width:100%;display:inline-flex}.kui-form-content .kui-form-expert-search{bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}.mat-datepicker-content .mat-calendar{height:auto!important}@media (max-width:1200px) and (min-width:768px){.kui-fulltext-search.input-field input{width:calc(360px - 80px)}.kui-fulltext-search,.kui-menu.extended-search{width:360px}}@media (max-width:768px) and (min-width:576px){.kui-fulltext-search-panel{width:360px}.kui-fulltext-search-panel.with-project-filter{width:calc(360px + 160px)}.kui-fulltext-search,.kui-menu.extended-search{width:calc(360px - 160px)}.kui-fulltext-search.with-project-filter,.kui-menu.extended-search.with-project-filter{width:360px!important}}"]
        }),
        tslib_1.__metadata("design:paramtypes", [Overlay,
            Router,
            ViewContainerRef,
            ProjectsService])
    ], FulltextSearchComponent);
    return FulltextSearchComponent;
}());
export { FulltextSearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZnVsbHRleHQtc2VhcmNoL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFnQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsV0FBVyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBcUIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUE0QixlQUFlLEVBQUUsY0FBYyxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUN2RyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRbkQ7O0dBRUc7QUFNSDtJQTZESSxpQ0FDWSxRQUFpQixFQUNqQixPQUFlLEVBQ2YsaUJBQW1DLEVBQ25DLGdCQUFpQztRQUhqQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUEvRDdDOzs7O1dBSUc7UUFDTSxVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRW5DOzs7O1dBSUc7UUFDTSxrQkFBYSxHQUFhLEtBQUssQ0FBQztRQVMvQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVd6Qyw2Q0FBNkM7UUFDN0MsZUFBVSxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFP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Qiw4eUxBQStDOztTQUVsRCxDQUFDO2lEQStEd0IsT0FBTztZQUNSLE1BQU07WUFDSSxnQkFBZ0I7WUFDakIsZUFBZTtPQWpFcEMsdUJBQXVCLENBNlFuQztJQUFELDhCQUFDO0NBQUEsQUE3UUQsSUE2UUM7U0E3UVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdGlvblBvc2l0aW9uUGFpciwgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiwgUG9zaXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgUHJvamVjdCwgUHJvamVjdHNTZXJ2aWNlLCBLbm9yYUNvbnN0YW50cywgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByZXZTZWFyY2hJdGVtIHtcbiAgICBwcm9qZWN0SXJpPzogc3RyaW5nO1xuICAgIHByb2plY3RMYWJlbD86IHN0cmluZztcbiAgICBxdWVyeTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLWZ1bGx0ZXh0LXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Z1bGx0ZXh0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZnVsbHRleHQtc2VhcmNoLmNvbXBvbmVudC5zY3NzJywgJy4uL2Fzc2V0cy9zdHlsZS9zZWFyY2guc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGx0ZXh0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSByb3V0ZSBSb3V0ZSB0byBuYXZpZ2F0ZSBhZnRlciBzZWFyY2guXG4gICAgICogVGhpcyByb3V0ZSBwYXRoIHNob3VsZCBjb250YWluIGEgY29tcG9uZW50IGZvciBzZWFyY2ggcmVzdWx0cy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3V0ZTogc3RyaW5nID0gJy9zZWFyY2gnO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBbcHJvamVjdGZpbHRlcl0gSWYgdHJ1ZSBpdCBzaG93cyB0aGUgc2VsZWN0aW9uXG4gICAgICogb2YgcHJvamVjdHMgdG8gZmlsdGVyIGJ5IG9uZSBvZiB0aGVtXG4gICAgICovXG4gICAgQElucHV0KCkgcHJvamVjdGZpbHRlcj86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbZmlsdGVyYnlwcm9qZWN0XSBJZiB0aGUgZnVsbC10ZXh0IHNlYXJjaCBzaG91bGQgYmVcbiAgICAgKiBmaWx0ZXJlZCBieSBvbmUgcHJvamVjdCwgeW91IGNhbiBkZWZpbmUgaXQgd2l0aCBwcm9qZWN0IGlyaS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJieXByb2plY3Q/OiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2hvdzogYm9vbGVhbjtcbiAgICBAT3V0cHV0KCkgc2hvd1N0YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZnVsbHRleHRTZWFyY2hQYW5lbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hQYW5lbDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdmdWxsdGV4dFNlYXJjaElucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2Z1bGx0ZXh0U2VhcmNoTWVudScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hNZW51OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZCgnYnRuVG9TZWxlY3RQcm9qZWN0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlbGVjdFByb2plY3Q6IE1hdE1lbnVUcmlnZ2VyO1xuXG4gICAgLy8gc2VhcmNoIHF1ZXJ5XG4gICAgc2VhcmNoUXVlcnk6IHN0cmluZztcblxuICAgIC8vIHByZXZpb3VzIHNlYXJjaCA9IGZ1bGwtdGV4dCBzZWFyY2ggaGlzdG9yeVxuICAgIHByZXZTZWFyY2g6IFByZXZTZWFyY2hJdGVtW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuXG4gICAgLy8gbGlzdCBvZiBwcm9qZWN0cywgaW4gY2FzZSBvZiBmaWx0ZXJwcm9qZWN0IGlzIHRydWVcbiAgICBwcm9qZWN0czogUHJvamVjdFtdO1xuXG4gICAgLy8gc2VsZWN0ZWQgcHJvamVjdCwgaW4gY2FzZSBvZiBmaWx0ZXJieXByb2plY3QgYW5kL29yIHByb2plY3RmaWx0ZXIgaXMgdHJ1ZVxuICAgIHByb2plY3Q6IFByb2plY3Q7XG4gICAgZGVmYXVsdFByb2plY3RMYWJlbDogc3RyaW5nID0gJ0FsbCBwcm9qZWN0cyc7XG4gICAgcHJvamVjdExhYmVsOiBzdHJpbmcgPSB0aGlzLmRlZmF1bHRQcm9qZWN0TGFiZWw7XG4gICAgcHJvamVjdElyaTogc3RyaW5nO1xuXG4gICAgLy8gaW4gY2FzZSBvZiBhbiAoYXBpKSBlcnJvclxuICAgIGVycm9yOiBhbnk7XG5cbiAgICAvLyBpcyBzZWFyY2ggcGFuZWwgZm9jdXNlZD9cbiAgICBzZWFyY2hQYW5lbEZvY3VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBvdmVybGF5IHJlZmVyZW5jZVxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG5cbiAgICAvLyBkbyBub3Qgc2hvdyB0aGUgZm9sbG93aW5nIHByb2plY3RzOiBkZWZhdWx0IHN5c3RlbSBwcm9qZWN0cyBmcm9tIGtub3JhXG4gICAgZG9Ob3REaXNwbGF5OiBzdHJpbmdbXSA9IFtcbiAgICAgICAgS25vcmFDb25zdGFudHMuU3lzdGVtUHJvamVjdElSSSxcbiAgICAgICAgS25vcmFDb25zdGFudHMuRGVmYXVsdFNoYXJlZE9udG9sb2d5SVJJXG4gICAgXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfcHJvamVjdHNTZXJ2aWNlOiBQcm9qZWN0c1NlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgLy8gdGhpcy5zZXRGb2N1cygpO1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcmJ5cHJvamVjdCkge1xuICAgICAgICAgICAgdGhpcy5nZXRQcm9qZWN0KHRoaXMuZmlsdGVyYnlwcm9qZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb2plY3RmaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWxsUHJvamVjdHMoKTtcblxuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9qZWN0KFxuICAgICAgICAgICAgICAgICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuUGFuZWxXaXRoQmFja2Ryb3AoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgICAgICAgIC8vIGJhY2tkcm9wQ2xhc3M6ICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyxcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuZ2V0T3ZlcmxheVBvc2l0aW9uKCksXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoY29uZmlnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5zZWFyY2hNZW51LCB0aGlzLl92aWV3Q29udGFpbmVyUmVmKSk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUGFuZWxGb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRPdmVybGF5UG9zaXRpb24oKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICd0b3AnIH0pLFxuICAgICAgICAgICAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSlcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBvdmVybGF5UG9zaXRpb24gPSB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLnNlYXJjaFBhbmVsKS53aXRoUG9zaXRpb25zKHBvc2l0aW9ucykud2l0aExvY2tlZFBvc2l0aW9uKGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gb3ZlcmxheVBvc2l0aW9uO1xuICAgIH1cblxuICAgIGdldEFsbFByb2plY3RzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wcm9qZWN0c1NlcnZpY2UuZ2V0QWxsUHJvamVjdHMoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxvYWRTeXN0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRQcm9qZWN0JykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFByb2plY3QoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wcm9qZWN0c1NlcnZpY2UuZ2V0UHJvamVjdEJ5SXJpKGlkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocHJvamVjdDogUHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIHNldCBjdXJyZW50IHByb2plY3QgYW5kIHN3aXRjaCBmb2N1cyB0byBpbnB1dCBmaWVsZFxuICAgIHNldFByb2plY3QocHJvamVjdD86IFByb2plY3QpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFwcm9qZWN0KSB7XG4gICAgICAgICAgICAvLyBzZXQgZGVmYXVsdCBwcm9qZWN0OiBhbGxcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gdGhpcy5kZWZhdWx0UHJvamVjdExhYmVsO1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0SXJpID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRQcm9qZWN0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZXQgY3VycmVudCBwcm9qZWN0IHNob3J0bmFtZSBhbmQgaWRcbiAgICAgICAgICAgIHRoaXMucHJvamVjdExhYmVsID0gcHJvamVjdC5zaG9ydG5hbWU7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RJcmkgPSBwcm9qZWN0LmlkO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRQcm9qZWN0JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9TZWFyY2goKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWFyY2hRdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZSArXG4gICAgICAgICAgICAgICAgICAgICcvZnVsbHRleHQvJyArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgK1xuICAgICAgICAgICAgICAgICAgICAnLycgK1xuICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wcm9qZWN0SXJpKVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlICsgJy9mdWxsdGV4dC8nICsgdGhpcy5zZWFyY2hRdWVyeVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcHVzaCB0aGUgc2VhcmNoIHF1ZXJ5IGludG8gdGhlIGxvY2FsIHN0b3JhZ2UgcHJldlNlYXJjaCBhcnJheSAocHJldmlvdXMgc2VhcmNoKVxuICAgICAgICAgICAgLy8gdG8gaGF2ZSBhIGxpc3Qgb2YgcmVjZW50IHNlYXJjaCByZXF1ZXN0c1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nUHJldlNlYXJjaDogUHJldlNlYXJjaEl0ZW1bXSA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXZTZWFyY2gnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1ByZXZTZWFyY2ggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ1ByZXZTZWFyY2ggPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBleGlzdGluZ1ByZXZTZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZW50cnksIGlmIGV4aXN0cyBhbHJlYWR5XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoUXVlcnkgPT09IGVudHJ5LnF1ZXJ5ICYmIHRoaXMucHJvamVjdElyaSA9PT0gZW50cnkucHJvamVjdElyaSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1ByZXZTZWFyY2guc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEEgc2VhcmNoIHZhbHVlIGlzIGV4cGVjdGVkIHRvIGhhdmUgYXQgbGVhc3QgbGVuZ3RoIG9mIDNcbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFF1ZXJ5Lmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFF1ZXJ5OiBQcmV2U2VhcmNoSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMuc2VhcmNoUXVlcnlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdElyaSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UXVlcnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SXJpOiB0aGlzLnByb2plY3RJcmksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0TGFiZWw6IHRoaXMucHJvamVjdExhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMuc2VhcmNoUXVlcnlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBleGlzdGluZ1ByZXZTZWFyY2gucHVzaChjdXJyZW50UXVlcnkpO1xuXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgICAgICdwcmV2U2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmdQcmV2U2VhcmNoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFNlYXJjaCgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG5cbiAgICAgICAgdGhpcy5zaG93ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1N0YXRlLmVtaXQodGhpcy5zaG93KTtcbiAgICB9XG5cbiAgICByZXNldFNlYXJjaCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hQYW5lbEZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBzZXRGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmV2U2VhcmNoID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJldlNlYXJjaCcpKTtcbiAgICAgICAgdGhpcy5zZWFyY2hQYW5lbEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vcGVuUGFuZWxXaXRoQmFja2Ryb3AoKTtcbiAgICB9XG5cbiAgICBkb1ByZXZTZWFyY2gocHJldlNlYXJjaDogUHJldlNlYXJjaEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHByZXZTZWFyY2gucXVlcnk7XG5cbiAgICAgICAgaWYgKHByZXZTZWFyY2gucHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RJcmkgPSBwcmV2U2VhcmNoLnByb2plY3RJcmk7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHByZXZTZWFyY2gucHJvamVjdExhYmVsO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0aGlzLnJvdXRlICsgJy9mdWxsdGV4dC8nICsgdGhpcy5zZWFyY2hRdWVyeSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcmV2U2VhcmNoLnByb2plY3RJcmkpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RJcmkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RMYWJlbCA9IHRoaXMuZGVmYXVsdFByb2plY3RMYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbdGhpcy5yb3V0ZSArICcvZnVsbHRleHQvJyArIHRoaXMuc2VhcmNoUXVlcnldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzZXRTZWFyY2goKTtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgIH1cblxuICAgIHJlc2V0UHJldlNlYXJjaChwcmV2U2VhcmNoPzogUHJldlNlYXJjaEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgaWYgKHByZXZTZWFyY2gpIHtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSBvbmx5IHRoaXMgaXRlbSB3aXRoIHRoZSBuYW1lIC4uLlxuICAgICAgICAgICAgY29uc3QgaTogbnVtYmVyID0gdGhpcy5wcmV2U2VhcmNoLmluZGV4T2YocHJldlNlYXJjaCk7XG4gICAgICAgICAgICB0aGlzLnByZXZTZWFyY2guc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXZTZWFyY2gnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByZXZTZWFyY2gpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgd2hvbGUgXCJwcmV2aW91cyBzZWFyY2hcIiBhcnJheVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3ByZXZTZWFyY2gnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZTZWFyY2ggPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmV2U2VhcmNoJykpO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzKCkge1xuICAgICAgICB0aGlzLnNlbGVjdFByb2plY3QuY2xvc2VNZW51KCk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgfVxuXG5cbn1cbiJdfQ==