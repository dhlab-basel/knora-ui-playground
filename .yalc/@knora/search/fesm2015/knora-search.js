import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Router, ActivatedRoute } from '@angular/router';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KuiActionModule } from '@knora/action';
import { KuiViewerModule } from '@knora/viewer';
import { JDNConvertibleCalendarDateAdapter, MatJDNConvertibleCalendarDateAdapterModule } from 'jdnconvertiblecalendardateadapter';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService, GravsearchGenerationService, OntologyCacheService, ReadResourcesSequence, ExtendedSearchParams, KuiCoreConfigToken, SearchParamsService, SearchService, ComparisonOperatorAndValue, Equals, Exists, GreaterThan, GreaterThanEquals, KnoraConstants, LessThan, LessThanEquals, Like, Match, NotEquals, CardinalityOccurrence, PropertyWithValue, OntologyInformation, ValueLiteral, IRI, ReadResource, Utils, ListCacheService, KuiCoreModule } from '@knora/core';
import { Component, Input, ViewChild, ViewContainerRef, EventEmitter, Inject, Output, ViewChildren, Host, NgModule } from '@angular/core';
import { MatMenuTrigger, DateAdapter, MatCalendar, MatDatepickerContent, MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatTooltipModule } from '@angular/material';

/**
 * @deprecated
 */
class FulltextSearchComponent {
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

/**
 * The search-panel contains the kui-fulltext-search and the kui-extended-search components.
 */
class SearchPanelComponent {
    constructor(_overlay, _viewContainerRef) {
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        /**
         * @param  {string} route Route to navigate after search. This route path should contain a component for search results.
         */
        this.route = '/search';
        /**
         *@param  {boolean} [projectfilter] If true it shows the selection of projects to filter by one of them
         */
        this.projectfilter = false;
        /**
         * @param  {boolean} [advanced] Adds the extended / advanced search to the panel
         */
        this.advanced = false;
        /**
         * @param  {boolean} [expert] Adds the expert search / gravsearch editor to the panel
         */
        this.expert = false;
    }
    openPanelWithBackdrop(type) {
        this.showAdvanced = (type === 'advanced');
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
    closeMenu() {
        this.overlayRef.detach();
    }
}
SearchPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-search-panel',
                template: "<div class=\"kui-search-panel\" #fullSearchPanel cdkOverlayOrigin>\n\n    <kui-fulltext-search [route]=\"route\" [projectfilter]=\"projectfilter\" [filterbyproject]=\"filterbyproject\">\n    </kui-fulltext-search>\n\n    <!-- advanced search button: if advanced === true -->\n    <button mat-button *ngIf=\"advanced && !expert\" color=\"primary\"\n            (click)=\"openPanelWithBackdrop('advanced')\">advanced</button>\n\n    <!-- expert search button: if expert === true -->\n    <button mat-button *ngIf=\"!advanced && expert\" color=\"primary\"\n            (click)=\"openPanelWithBackdrop('expert')\">expert</button>\n\n    <!-- button to select advanced or expert search: if advanced AND expert === true; open menu to select -->\n    <button mat-button *ngIf=\"advanced && expert\" [matMenuTriggerFor]=\"selectSearch\">\n        <mat-icon>filter_list</mat-icon>\n    </button>\n    <mat-menu #selectSearch=\"matMenu\">\n        <button mat-menu-item (click)=\"openPanelWithBackdrop('advanced')\">\n            <span>Advanced search</span>\n        </button>\n        <button mat-menu-item (click)=\"openPanelWithBackdrop('expert')\">\n            <span>Expert search</span>\n        </button>\n    </mat-menu>\n\n</div>\n\n<!-- full-text search menu -->\n<ng-template #searchMenu>\n    <div class=\"kui-search-menu with-extended-search\" [class.with-project-filter]=\"projectfilter\">\n        <div class=\"kui-menu-header\">\n            <span class=\"kui-menu-title\">\n                <h4 *ngIf=\"showAdvanced\">Advanced search</h4>\n                <h4 *ngIf=\"!showAdvanced\">Expert search</h4>\n            </span>\n            <span class=\"fill-remaining-space\"></span>\n            <span class=\"kui-menu-close\">\n                <button mat-icon-button (click)=\"closeMenu()\">\n                    <mat-icon>close</mat-icon>\n                </button>\n            </span>\n        </div>\n        <div class=\"kui-menu-content\">\n            <kui-extended-search *ngIf=\"showAdvanced\" [route]=\"route\" (toggleExtendedSearchForm)=\"closeMenu()\">\n            </kui-extended-search>\n            <kui-expert-search *ngIf=\"!showAdvanced\" [route]=\"route\" (toggleExtendedSearchForm)=\"closeMenu()\">\n            </kui-expert-search>\n        </div>\n    </div>\n</ng-template>\n",
                styles: [".advanced-btn{margin-left:10px}.kui-search-panel{display:flex;position:relative;z-index:100}.extended-search-box{margin:12px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
SearchPanelComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef }
];
SearchPanelComponent.propDecorators = {
    route: [{ type: Input }],
    projectfilter: [{ type: Input }],
    filterbyproject: [{ type: Input }],
    advanced: [{ type: Input }],
    expert: [{ type: Input }],
    searchPanel: [{ type: ViewChild, args: ['fullSearchPanel',] }],
    searchMenu: [{ type: ViewChild, args: ['searchMenu',] }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise = Promise.resolve(null);
class SelectResourceClassComponent {
    constructor(fb) {
        this.fb = fb;
        // event emitted to parent component once a resource class is selected by the user
        this.resourceClassSelectedEvent = new EventEmitter();
    }
    // setter method for resource classes when being updated by parent component
    set resourceClasses(value) {
        this.resourceClassSelected = undefined; // reset on updates
        this._resourceClasses = value;
    }
    // getter method for resource classes (used in template)
    get resourceClasses() {
        return this._resourceClasses;
    }
    /**
     * Returns the Iri of the selected resource class.
     *
     * @returns the Iri of the selected resource class or false in case no resource class is selected.
     */
    getResourceClassSelected() {
        if (this.resourceClassSelected !== undefined && this.resourceClassSelected !== null) {
            return this.resourceClassSelected;
        }
        else {
            return false;
        }
    }
    /**
     * Initalizes the FormGroup for the resource class selection.
     * The initial value is set to null.
     */
    initForm() {
        // build a form for the resource class selection
        this.form = this.fb.group({
            resourceClass: [null] // resource class selection is optional
        });
        // store and emit Iri of the resource class when selected
        this.form.valueChanges.subscribe((data) => {
            this.resourceClassSelected = data.resourceClass;
            this.resourceClassSelectedEvent.emit(this.resourceClassSelected);
        });
    }
    ngOnInit() {
        this.initForm();
        // add form to the parent form group
        this.formGroup.addControl('resourceClass', this.form);
    }
    ngOnChanges() {
        if (this.form !== undefined) {
            // resource classes have been reinitialized
            // reset form
            resolvedPromise.then(() => {
                // remove this form from the parent form group
                this.formGroup.removeControl('resourceClass');
                this.initForm();
                // add form to the parent form group
                this.formGroup.addControl('resourceClass', this.form);
            });
        }
    }
}
SelectResourceClassComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-select-resource-class',
                template: "<mat-form-field *ngIf=\"resourceClasses.length > 0\" class=\"large-field\">\n  <mat-select placeholder=\"Select a Resource Class (optional)\" [formControl]=\"form.controls['resourceClass']\">\n    <mat-option [value]=\"null\">no selection</mat-option>\n    <!-- undo selection of a resource class -->\n    <mat-option *ngFor=\"let resourceClass of resourceClasses\" [value]=\"resourceClass.id\">{{ resourceClass.label }}\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
SelectResourceClassComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
SelectResourceClassComponent.propDecorators = {
    formGroup: [{ type: Input }],
    resourceClasses: [{ type: Input }],
    resourceClassSelectedEvent: [{ type: Output }]
};

/**
 * The extended search allows you to filter by project, by source type (resource class), or by the metadata (properties) of source types. Each filter can be standalone or combined. The metadata field can be precisely filtered with criteria such as "contains", "like", "equals to", "exists" or in case of a date value with "before" or "after". In addition, for a metadata field that is connected to another source type, it's possible to filter by this second source type. If you are looking for the source type "Photograph" with the metadata field "Photographer", which is connected to source type "Person", you can search for photograph(s) taken by person(s) who is born before February 1970. The result of this request will be an intersection of the two source types.
 */
class ExtendedSearchComponent {
    constructor(fb, _route, _router, _cacheService, _gravSearchService) {
        this.fb = fb;
        this._route = _route;
        this._router = _router;
        this._cacheService = _cacheService;
        this._gravSearchService = _gravSearchService;
        /**
         * @param  {boolean} toggleExtendedSearchForm Trigger toggle for extended search form.
         */
        this.toggleExtendedSearchForm = new EventEmitter();
        /**
         * @param  {string} gravsearch Send the gravsearch query back.
         */
        this.gravsearch = new EventEmitter();
        // all available ontologies
        this.ontologies = [];
        // properties specified by the user
        this.activeProperties = [];
        // resource classes for the selected ontology
        this.resourceClasses = [];
        this.result = new ReadResourcesSequence([], 0);
        // form validation status
        this.formValid = false;
    }
    ngOnInit() {
        // parent form is empty, it gets passed to the child components
        this.form = this.fb.group({});
        // if form status changes, re-run validation
        this.form.statusChanges.subscribe((data) => {
            this.formValid = this.validateForm();
            // console.log(this.form);
        });
        // initialize ontologies to be used for the ontologies selection in the search form
        this.initializeOntologies();
    }
    /**
     * @ignore
     * Add a property to the search form.
     * @returns void
     */
    addProperty() {
        this.activeProperties.push(true);
    }
    /**
     * @ignore
     * Remove the last property from the search form.
     * @returns void
     */
    removeProperty() {
        this.activeProperties.splice(-1, 1);
    }
    /**
     * @ignore
     * Gets all available ontologies for the search form.
     * @returns void
     */
    initializeOntologies() {
        this._cacheService.getOntologiesMetadata().subscribe((ontologies) => {
            this.ontologies = ontologies;
        });
    }
    /**
     * @ignore
     * Once an ontology has been selected, gets its classes and properties.
     * The classes and properties will be made available to the user for selection.
     *
     * @param ontologyIri Iri of the ontology chosen by the user.
     * @returns void
     */
    getResourceClassesAndPropertiesForOntology(ontologyIri) {
        // reset active resource class definition
        this.activeResourceClass = undefined;
        // reset specified properties
        this.activeProperties = [];
        this.activeOntology = ontologyIri;
        this._cacheService.getEntityDefinitionsForOntologies([ontologyIri]).subscribe((ontoInfo) => {
            this.resourceClasses = ontoInfo.getResourceClassesAsArray(true);
            this.properties = ontoInfo.getProperties();
        });
    }
    /**
     * @ignore
     * Once a resource class has been selected, gets its properties.
     * The properties will be made available to the user for selection.
     *
     * @param resourceClassIri
     * @returns void
     */
    getPropertiesForResourceClass(resourceClassIri) {
        // reset specified properties
        this.activeProperties = [];
        // if the client undoes the selection of a resource class, use the active ontology as a fallback
        if (resourceClassIri === null) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        }
        else {
            this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe((ontoInfo) => {
                this.properties = ontoInfo.getProperties();
                this.activeResourceClass = ontoInfo.getResourceClasses()[resourceClassIri];
            });
        }
    }
    /**
     * @ignore
     * Validates form and returns its status (boolean).
     */
    validateForm() {
        // check that either a resource class is selected or at least one property is specified
        return this.form.valid &&
            (this.propertyComponents.length > 0 || (this.resourceClassComponent !== undefined && this.resourceClassComponent.getResourceClassSelected() !== false));
    }
    /**
     * @ignore
     * Resets the form (selected resource class and specified properties) preserving the active ontology.
     */
    resetForm() {
        if (this.activeOntology !== undefined) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        }
    }
    /**
     * @ignore
     * Creates a GravSearch query with the given form values and calls the extended search route.
     */
    submit() {
        if (!this.formValid)
            return; // check that from is valid
        const resClassOption = this.resourceClassComponent.getResourceClassSelected();
        let resClass;
        if (resClassOption !== false) {
            resClass = resClassOption;
        }
        const properties = this.propertyComponents.map((propComp) => {
            return propComp.getPropertySelectedWithValue();
        });
        const gravsearch = this._gravSearchService.createGravsearchQuery(properties, resClass, 0);
        if (this.route) {
            this._router.navigate([this.route + '/extended/', gravsearch], { relativeTo: this._route });
        }
        else {
            this.gravsearch.emit(gravsearch);
        }
        // toggle extended search form
        this.toggleExtendedSearchForm.emit(true);
    }
}
ExtendedSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-extended-search',
                template: "<form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"kui-form-content\">\n\n  <div>\n    <kui-select-ontology *ngIf=\"ontologies.length > 0\" [formGroup]=\"form\" [ontologies]=\"ontologies\"\n                         (ontologySelected)=\"getResourceClassesAndPropertiesForOntology($event)\"></kui-select-ontology>\n  </div>\n\n  <div class=\"select-resource-class\" *ngIf=\"resourceClasses?.length > 0\">\n    <kui-select-resource-class #resourceClass [formGroup]=\"form\" [resourceClasses]=\"resourceClasses\"\n                               (resourceClassSelectedEvent)=\"getPropertiesForResourceClass($event)\">\n    </kui-select-resource-class>\n  </div>\n\n  <div class=\"select-property\" *ngIf=\"properties !== undefined\">\n    <div *ngFor=\"let prop of activeProperties; let i = index\">\n\n      <kui-select-property #property [activeResourceClass]=\"activeResourceClass\" [formGroup]=\"form\" [index]=\"i\"\n                           [properties]=\"properties\"></kui-select-property>\n\n    </div>\n  </div>\n\n\n  <div class=\"select-property buttons\">\n    <button mat-mini-fab class=\"property-button add-property-button\" color=\"primary\" type=\"button\"\n            (click)=\"addProperty()\" [disabled]=\"activeOntology === undefined || activeProperties.length >= 4\">\n      <mat-icon aria-label=\"add a property\">add</mat-icon>\n    </button>\n\n    <button mat-mini-fab class=\"property-button remove-property-button\" color=\"primary\" type=\"button\"\n            (click)=\"removeProperty()\" [disabled]=\"activeProperties.length == 0\">\n      <mat-icon aria-label=\"remove property\">remove</mat-icon>\n    </button>\n  </div>\n\n  <!--  <div>\n    <button mat-icon-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n      <mat-icon aria-label=\"reset query form\">clear</mat-icon>\n    </button>\n\n    <button mat-icon-button type=\"submit\" [disabled]=\"!formValid\">\n      <mat-icon aria-label=\"submit query\">send</mat-icon>\n    </button>\n  </div> -->\n\n  <div class=\"kui-form-action\">\n    <button class=\"reset\" mat-button type=\"button\" (click)=\"resetForm()\" [disabled]=\"this.activeOntology === undefined\">\n      Reset\n    </button>\n    <span class=\"fill-remaining-space\"></span>\n    <button class=\"extended-search-button\" mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!formValid\">\n      Search\n    </button>\n  </div>\n\n</form>\n",
                styles: [".select-resource-class{margin-left:8px}.select-property{margin-left:16px}.select-property .property-button{margin:0 12px 64px 0}.kui-form-content{position:relative;min-height:320px;height:100%}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
ExtendedSearchComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] },
    { type: ActivatedRoute },
    { type: Router },
    { type: OntologyCacheService },
    { type: GravsearchGenerationService }
];
ExtendedSearchComponent.propDecorators = {
    route: [{ type: Input }],
    toggleExtendedSearchForm: [{ type: Output }],
    gravsearch: [{ type: Output }],
    resourceClassComponent: [{ type: ViewChild, args: ['resourceClass',] }],
    propertyComponents: [{ type: ViewChildren, args: ['property',] }]
};

class ExpertSearchComponent {
    constructor(fb, _route, _router, _searchService, _searchParamsService, config) {
        this.fb = fb;
        this._route = _route;
        this._router = _router;
        this._searchService = _searchService;
        this._searchParamsService = _searchParamsService;
        this.config = config;
        /**
         * @param gravsearch Send the gravsearch query back.
         */
        this.gravsearch = new EventEmitter();
    }
    ngOnInit() {
        this.initForm();
    }
    /**
     * @ignore
     * Initiate the form with predefined Gravsearch query as example.
     */
    initForm() {
        this.expertSearchForm = this.fb.group({
            gravquery: [
                `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
PREFIX incunabula: <${this.config.api}/ontology/0803/incunabula/simple/v2#>

CONSTRUCT {
    ?book knora-api:isMainResource true .
    ?book incunabula:title ?title .

} WHERE {
    ?book a incunabula:book .
    ?book incunabula:title ?title .
}
`,
                Validators.required
            ]
        });
    }
    /**
     * @ignore
     * Send the gravsearch query to the result view, either through the route or by emitting the gravsearch as an output.
     */
    submitQuery() {
        const gravsearch = this.generateGravsearch(0);
        if (this.route) {
            this._router.navigate([this.route + '/extended/', gravsearch], { relativeTo: this._route });
        }
        else {
            this.gravsearch.emit(gravsearch);
        }
    }
    /**
     * @ignore
     * Generate the whole gravsearch query matching the query given by the form.
     */
    generateGravsearch(offset = 0) {
        const queryTemplate = this.expertSearchForm.controls['gravquery'].value;
        // offset component of the Gravsearch query
        const offsetTemplate = `
         OFFSET ${offset}
         `;
        // function that generates the same Gravsearch query with the given offset
        const generateGravsearchWithCustomOffset = (localOffset) => {
            const offsetCustomTemplate = `
             OFFSET ${localOffset}
             `;
            return queryTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another Gravsearch query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchWithCustomOffset));
        }
        return queryTemplate + offsetTemplate;
    }
    /**
     * @ignore
     * Reset the form to the initial state.
     */
    resetForm() {
        this.initForm();
    }
}
ExpertSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-expert-search',
                template: "<div class=\"expert-search-container\">\n  <!-- The integration in container like the accordeon expansion panel should be handled on app side\n  <mat-expansion-panel [expanded]=\"true\">\n    <mat-expansion-panel-header>\n      <mat-panel-title>\n        Expert search\n      </mat-panel-title>\n      <mat-panel-description> </mat-panel-description>\n    </mat-expansion-panel-header>\n  -->\n  <form [formGroup]=\"expertSearchForm\" class=\"expert-search-form kui-form-content\">\n    <mat-form-field class=\"textarea-field large-field\">\n      <textarea matInput formControlName=\"gravquery\" matTextareaAutosize matAutosizeMinRows=\"12\" matAutosizeMaxRows=\"24\"\n                placeholder=\"Write your gravsearch query\"></textarea>\n    </mat-form-field>\n\n    <div class=\"kui-form-action\">\n      <button class=\"reset\" mat-button type=\"button\" (click)=\"resetForm()\">\n        Reset\n      </button>\n      <span class=\"fill-remaining-space\"></span>\n      <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!expertSearchForm.valid\"\n              (click)=\"submitQuery()\">\n        Search\n      </button>\n    </div>\n\n  </form>\n\n  <!-- </mat-expansion-panel> -->\n</div>\n",
                styles: [".expert-search-container{min-height:100%}.expert-search-container .expert-search-form{min-width:150px;width:100%;margin:auto}.expert-search-container .expert-search-form .textarea-field{width:100%;display:block}.expert-search-container .expert-search-form .form-panel{width:100%}.mat-input-element{font-family:\"Courier New\",Courier,monospace}.form-content{margin:24px auto;width:472px}.form-content .large-field{min-width:472px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
ExpertSearchComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: ActivatedRoute },
    { type: Router },
    { type: SearchService },
    { type: SearchParamsService },
    { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] }
];
ExpertSearchComponent.propDecorators = {
    route: [{ type: Input }],
    gravsearch: [{ type: Output }]
};

class SelectOntologyComponent {
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
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
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

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$1 = Promise.resolve(null);
class SpecifyPropertyValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.KnoraConstants = KnoraConstants;
        // available comparison operators for the property
        this.comparisonOperators = [];
    }
    // setter method for the property chosen by the user
    set property(prop) {
        this.comparisonOperatorSelected = undefined; // reset to initial state
        this._property = prop;
        this.resetComparisonOperators(); // reset comparison operators for given property (overwriting any previous selection)
    }
    // getter method for this._property
    get property() {
        return this._property;
    }
    /**
     * Resets the comparison operators for this._property.
     */
    resetComparisonOperators() {
        // depending on object class, set comparison operators and value entry field
        if (this._property.isLinkProperty) {
            this.propertyValueType = KnoraConstants.Resource;
        }
        else {
            this.propertyValueType = this._property.objectType;
        }
        switch (this.propertyValueType) {
            case KnoraConstants.TextValue:
                this.comparisonOperators = [new Like(), new Match(), new Equals(), new NotEquals(), new Exists()];
                break;
            case KnoraConstants.BooleanValue:
            case KnoraConstants.Resource:
            case KnoraConstants.UriValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;
            case KnoraConstants.IntValue:
            case KnoraConstants.DecimalValue:
            case KnoraConstants.DateValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new LessThan(), new LessThanEquals(), new GreaterThan(), new GreaterThanEquals(), new Exists()];
                break;
            case KnoraConstants.ListValue:
                this.comparisonOperators = [new Equals(), new NotEquals(), new Exists()];
                break;
            case KnoraConstants.GeomValue:
            case KnoraConstants.FileValue:
            case KnoraConstants.AudioFileValue:
            case KnoraConstants.StillImageFileValue:
            case KnoraConstants.DDDFileValue:
            case KnoraConstants.MovingImageFileValue:
            case KnoraConstants.TextFileValue:
            case KnoraConstants.ColorValue:
            case KnoraConstants.IntervalValue:
                this.comparisonOperators = [new Exists()];
                break;
            default:
                console.log('ERROR: Unsupported value type ' + this._property.objectType);
        }
    }
    ngOnInit() {
    }
    ngOnChanges() {
        // build a form for comparison operator selection
        this.form = this.fb.group({
            comparisonOperator: [null, Validators.required]
        });
        // store comparison operator when selected
        this.form.valueChanges.subscribe((data) => {
            this.comparisonOperatorSelected = data.comparisonOperator;
        });
        resolvedPromise$1.then(() => {
            // remove from the parent form group (clean reset)
            this.formGroup.removeControl('comparisonOperator');
            // add form to the parent form group
            this.formGroup.addControl('comparisonOperator', this.form);
        });
    }
    /**
     * Gets the specified comparison operator and value for the property.
     *
     * returns {ComparisonOperatorAndValue} the comparison operator and the specified value
     */
    getComparisonOperatorAndValueLiteralForProperty() {
        // return value (literal or IRI) from the child component
        let value;
        // comparison operator 'Exists' does not require a value
        if (this.comparisonOperatorSelected.getClassName() !== 'Exists') {
            value = this.propertyValueComponent.getValue();
        }
        // return the comparison operator and the specified value
        return new ComparisonOperatorAndValue(this.comparisonOperatorSelected, value);
    }
}
SpecifyPropertyValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-specify-property-value',
                template: "<mat-form-field class=\"search-operator-field small-field\" *ngIf=\"comparisonOperators?.length > 0\">\n  <mat-select placeholder=\"Comparison Operator\" [formControl]=\"form.controls['comparisonOperator']\">\n    <mat-option *ngFor=\"let compOp of comparisonOperators\" [value]=\"compOp\">{{ compOp.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<!-- select apt component for value specification using a switch case statement-->\n<span *ngIf=\"comparisonOperatorSelected !== undefined && comparisonOperatorSelected !== null && comparisonOperatorSelected.getClassName() != 'Exists'\"\n      [ngSwitch]=\"propertyValueType\">\n  <boolean-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.BooleanValue\"></boolean-value>\n  <date-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DateValue\"></date-value>\n  <decimal-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.DecimalValue\"></decimal-value>\n  <integer-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.IntValue\"></integer-value>\n  <link-value #propertyValue [formGroup]=\"form\" [restrictResourceClass]=\"property.objectType\"\n              *ngSwitchCase=\"KnoraConstants.Resource\"></link-value>\n  <text-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.TextValue\"></text-value>\n  <uri-value #propertyValue [formGroup]=\"form\" *ngSwitchCase=\"KnoraConstants.UriValue\"></uri-value>\n  <list-value #propertyValue [formGroup]=\"form\" [property]=\"property\" *ngSwitchCase=\"KnoraConstants.ListValue\">\n  </list-value>\n\n  <!-- TODO: Resource: handle linking properties with target class restriction: access property member to get objectClass via property() getter method -->\n  <span *ngSwitchDefault=\"\">Not supported {{propertyValueType}}</span>\n</span>\n",
                styles: [".search-operator-field{margin-right:8px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
SpecifyPropertyValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
SpecifyPropertyValueComponent.propDecorators = {
    formGroup: [{ type: Input }],
    propertyValueComponent: [{ type: ViewChild, args: ['propertyValue',] }],
    property: [{ type: Input }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$2 = Promise.resolve(null);
class SelectPropertyComponent {
    constructor(fb) {
        this.fb = fb;
    }
    // setter method for properties when being updated by parent component
    set properties(value) {
        this.propertySelected = undefined; // reset selected property (overwriting any previous selection)
        this._properties = value;
        this.updatePropertiesArray();
    }
    get properties() {
        return this._properties;
    }
    // setter method for selected resource class
    set activeResourceClass(value) {
        this._activeResourceClass = value;
    }
    ngOnInit() {
        // build a form for the property selection
        this.form = this.fb.group({
            property: [null, Validators.required],
            isSortCriterion: [false, Validators.required]
        });
        // update the selected property
        this.form.valueChanges.subscribe((data) => {
            const propIri = data.property;
            this.propertySelected = this._properties[propIri];
        });
        resolvedPromise$2.then(() => {
            this.propIndex = 'property' + this.index;
            // add form to the parent form group
            this.formGroup.addControl(this.propIndex, this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$2.then(() => {
            this.formGroup.removeControl(this.propIndex);
        });
    }
    /**
     * Indicates if property can be used as a sort criterion.
     * Property has to have cardinality or max cardinality 1 for the chosen resource class.
     *
     * We cannot sort by properties whose cardinality is greater than 1.
     * Return boolean
     */
    sortCriterion() {
        // check if a resource class is selected and if the property's cardinality is 1 for the selected resource class
        if (this._activeResourceClass !== undefined && this.propertySelected !== undefined && !this.propertySelected.isLinkProperty) {
            const cardinalities = this._activeResourceClass.cardinalities.filter((card) => {
                // cardinality 1 or max occurrence 1
                return card.property === this.propertySelected.id
                    && card.value === 1
                    && (card.occurrence === CardinalityOccurrence.card || card.occurrence === CardinalityOccurrence.maxCard);
            });
            return cardinalities.length === 1;
        }
        else {
            return false;
        }
    }
    /**
     * Updates the properties array that is accessed by the template.
     */
    updatePropertiesArray() {
        // represent the properties as an array to be accessed by the template
        const propsArray = [];
        for (const propIri in this._properties) {
            if (this._properties.hasOwnProperty(propIri)) {
                const prop = this._properties[propIri];
                // only list editable props that are not link value props
                if (prop.isEditable && !prop.isLinkValueProperty) {
                    propsArray.push(this._properties[propIri]);
                }
            }
        }
        // sort properties by label (ascending)
        propsArray.sort(OntologyInformation.sortFunc);
        this.propertiesAsArray = propsArray;
    }
    /**
     * Returns the selected property with the specified value.
     */
    getPropertySelectedWithValue() {
        const propVal = this.specifyPropertyValue.getComparisonOperatorAndValueLiteralForProperty();
        let isSortCriterion = false;
        // only non linking properties can be used for sorting
        if (!this.propertySelected.isLinkProperty) {
            isSortCriterion = this.form.value.isSortCriterion;
        }
        return new PropertyWithValue(this.propertySelected, propVal, isSortCriterion);
    }
}
SelectPropertyComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-select-property',
                template: "<mat-form-field class=\"search-property-field medium-field\" *ngIf=\"propertiesAsArray?.length > 0\">\n  <mat-select placeholder=\"Select Properties\" [formControl]=\"form.controls['property']\">\n    <mat-option *ngFor=\"let prop of propertiesAsArray\" [value]=\"prop.id\">{{ prop.label }}</mat-option>\n  </mat-select>\n</mat-form-field>\n\n<kui-specify-property-value #specifyPropertyValue [formGroup]=\"form\" *ngIf=\"propertySelected !== undefined\"\n                            [property]=\"propertySelected\"></kui-specify-property-value>\n\n<mat-checkbox matTooltip=\"Sort criterion\" *ngIf=\"propertySelected !== undefined && sortCriterion()\"\n              [formControl]=\"form.controls['isSortCriterion']\"></mat-checkbox>\n",
                styles: [".search-property-field{margin-right:8px}", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
SelectPropertyComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
SelectPropertyComponent.propDecorators = {
    formGroup: [{ type: Input }],
    index: [{ type: Input }],
    properties: [{ type: Input }],
    activeResourceClass: [{ type: Input }],
    specifyPropertyValue: [{ type: ViewChild, args: ['specifyPropertyValue',] }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$3 = Promise.resolve(null);
class BooleanValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.BooleanValue;
    }
    ngOnInit() {
        this.form = this.fb.group({
            booleanValue: [false, Validators.compose([Validators.required])]
        });
        resolvedPromise$3.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$3.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new ValueLiteral(String(this.form.value.booleanValue), KnoraConstants.xsdBoolean);
    }
}
BooleanValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'boolean-value',
                template: "<mat-checkbox [formControl]=\"form.controls['booleanValue']\"> true</mat-checkbox>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
BooleanValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
BooleanValueComponent.propDecorators = {
    formGroup: [{ type: Input }]
};

/** Custom header component containing a calendar format switcher */
class HeaderComponent {
    constructor(_calendar, _dateAdapter, _datepickerContent, fb) {
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._datepickerContent = _datepickerContent;
        this.fb = fb;
        // a list of supported calendar formats (Gregorian and Julian)
        this.supportedCalendarFormats = JDNConvertibleCalendar.supportedCalendars;
    }
    ngOnInit() {
        // get the currently active calendar format from the date adapter
        if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
            this.activeFormat = this._dateAdapter.activeCalendarFormat;
        }
        else {
            console.log('date adapter is expected to be an instance of JDNConvertibleCalendarDateAdapter');
        }
        // build a form for the calendar format selection
        this.form = this.fb.group({
            calendar: [this.activeFormat, Validators.required]
        });
        // do the conversion when the user selects another calendar format
        this.form.valueChanges.subscribe((data) => {
            // pass the target calendar format to the conversion method
            this.convertDate(data.calendar);
        });
    }
    /**
     * Converts the date into the target format.
     *
     * @param calendar the target calendar format.
     */
    convertDate(calendar) {
        if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
            // convert the date into the target calendar format
            const convertedDate = this._dateAdapter.convertCalendarFormat(this._calendar.activeDate, calendar);
            // set the new date
            this._calendar.activeDate = convertedDate;
            // select the new date in the datepicker UI
            this._datepickerContent.datepicker.select(convertedDate);
            // update view after calendar format conversion
            this._calendar.updateTodaysDate();
        }
        else {
            console.log('date adapter is expected to be an instance of JDNConvertibleCalendarDateAdapter');
        }
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-calendar-header',
                template: `
      <mat-select placeholder="Calendar Format" class="kui-calendar-header" [formControl]="form.controls['calendar']">
        <mat-option *ngFor="let cal of supportedCalendarFormats" [value]="cal">{{cal}}</mat-option>
      </mat-select>
      <mat-calendar-header></mat-calendar-header>
    `,
                styles: [".mat-select.kui-calendar-header{margin:12px!important;width:calc(100% - 24px)!important}"]
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: MatCalendar, decorators: [{ type: Host }] },
    { type: DateAdapter },
    { type: MatDatepickerContent },
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$4 = Promise.resolve(null);
class DateValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.DateValue;
        // custom header for the datepicker
        this.headerComponent = HeaderComponent;
    }
    ngOnInit() {
        // init datepicker
        this.form = this.fb.group({
            dateValue: [null, Validators.compose([Validators.required])]
        });
        this.form.valueChanges.subscribe((data) => {
            // console.log(data.dateValue);
        });
        resolvedPromise$4.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$4.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        const dateObj = this.form.value.dateValue;
        // get calendar format
        const calendarFormat = dateObj.calendarName;
        // get calendar period
        const calendarPeriod = dateObj.toCalendarPeriod();
        // get the date
        const dateString = `${calendarFormat.toUpperCase()}:${calendarPeriod.periodStart.year}-${calendarPeriod.periodStart.month}-${calendarPeriod.periodStart.day}:${calendarPeriod.periodEnd.year}-${calendarPeriod.periodEnd.month}-${calendarPeriod.periodEnd.day}`;
        return new ValueLiteral(String(dateString), KnoraConstants.dateSimple);
    }
}
DateValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-value',
                template: "<mat-form-field class=\"large-field\">\n    <kuiJdnDatepicker>\n        <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" [formControl]=\"form.controls['dateValue']\">\n        <mat-datepicker #picker [calendarHeaderComponent]=\"headerComponent\"></mat-datepicker>\n    </kuiJdnDatepicker>\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
DateValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
DateValueComponent.propDecorators = {
    formGroup: [{ type: Input }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$5 = Promise.resolve(null);
class DecimalValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.DecimalValue;
    }
    ngOnInit() {
        this.form = this.fb.group({
            decimalValue: [null, Validators.compose([Validators.required])]
        });
        resolvedPromise$5.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$5.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new ValueLiteral(String(this.form.value.decimalValue), KnoraConstants.xsdDecimal);
    }
}
DecimalValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'decimal-value',
                template: "<mat-form-field class=\"large-field\">\n    <input matInput [formControl]=\"form.controls['decimalValue']\" placeholder=\"Decimal value\" value=\"\" type=\"number\">\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
DecimalValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
DecimalValueComponent.propDecorators = {
    formGroup: [{ type: Input }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$6 = Promise.resolve(null);
class IntegerValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.IntValue;
    }
    ngOnInit() {
        this.form = this.fb.group({
            integerValue: [null, Validators.compose([Validators.required, Validators.pattern(/^-?\d+$/)])] // only allow for integer values (no fractions)
        });
        resolvedPromise$6.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$6.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new ValueLiteral(String(this.form.value.integerValue), KnoraConstants.xsdInteger);
    }
}
IntegerValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'integer-value',
                template: "<mat-form-field class=\"large-field\">\n    <input matInput [formControl]=\"form.controls['integerValue']\" placeholder=\"Integer value\" value=\"\" type=\"number\">\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
IntegerValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
IntegerValueComponent.propDecorators = {
    formGroup: [{ type: Input }]
};

const jsonld = require('jsonld');
// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$7 = Promise.resolve(null);
class LinkValueComponent {
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
        resolvedPromise$7.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$7.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new IRI(this.form.value.resource.id);
    }
}
LinkValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-value',
                template: "<mat-form-field class=\"large-field\">\n    <input matInput placeholder=\"resource\" aria-label=\"resource\" [matAutocomplete]=\"auto\"\n           [formControl]=\"form.controls['resource']\">\n    <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayResource\">\n        <mat-option *ngFor=\"let res of resources\" [value]=\"res\">\n            {{res?.label}}\n        </mat-option>\n    </mat-autocomplete>\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
LinkValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] },
    { type: SearchService },
    { type: OntologyCacheService }
];
LinkValueComponent.propDecorators = {
    formGroup: [{ type: Input }],
    restrictResourceClass: [{ type: Input }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$8 = Promise.resolve(null);
class TextValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.TextValue;
    }
    ngOnInit() {
        this.form = this.fb.group({
            textValue: [null, Validators.required]
        });
        resolvedPromise$8.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$8.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new ValueLiteral(String(this.form.value.textValue), KnoraConstants.xsdString);
    }
}
TextValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'text-value',
                template: "<mat-form-field class=\"large-field\">\n    <input matInput [formControl]=\"form.controls['textValue']\" placeholder=\"text value\" value=\"\">\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
TextValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
TextValueComponent.propDecorators = {
    formGroup: [{ type: Input }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$9 = Promise.resolve(null);
class UriValueComponent {
    constructor(fb) {
        this.fb = fb;
        this.type = KnoraConstants.UriValue;
    }
    ngOnInit() {
        this.form = this.fb.group({
            uriValue: [null, Validators.compose([Validators.required, Validators.pattern(Utils.RegexUrl)])]
        });
        resolvedPromise$9.then(() => {
            // add form to the parent form group
            this.formGroup.addControl('propValue', this.form);
        });
    }
    ngOnDestroy() {
        // remove form from the parent form group
        resolvedPromise$9.then(() => {
            this.formGroup.removeControl('propValue');
        });
    }
    getValue() {
        return new ValueLiteral(String(this.form.value.uriValue), KnoraConstants.xsdUri);
    }
}
UriValueComponent.decorators = [
    { type: Component, args: [{
                selector: 'uri-value',
                template: "<mat-form-field class=\"large-field\">\n    <input matInput [formControl]=\"form.controls['uriValue']\" placeholder=\"URI\" value=\"\">\n</mat-form-field>\n",
                styles: ["", "input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration{display:none}input[type=search]{-moz-appearance:none;-webkit-appearance:none}.fill-remaining-space{flex:1 1 auto}.kui-search-menu{box-shadow:0 1px 3px rgba(0,0,0,.5);background-color:#f9f9f9;border-radius:4px;overflow-y:auto;width:calc(480px - 32px);min-height:320px;height:100%;margin-top:6px;padding:16px;z-index:-1;position:relative}.kui-search-menu.with-project-filter{width:calc(480px + 160px - 32px)}.kui-search-menu.with-extended-search{width:calc(740px - 32px)}.kui-search-menu .kui-menu-header{background-color:#f9f9f9;border-top-left-radius:4px;border-top-right-radius:4px;display:inline-flex;height:48px;width:100%;margin-bottom:12px}.kui-search-menu .kui-menu-header .kui-menu-title h4{margin:12px 0}.kui-search-menu .kui-previous-search-list .mat-list-item:hover{background-color:#b8b8b8}.kui-search-menu .kui-previous-search-list .mat-list-item:hover .mat-icon{display:inline-block}.kui-search-menu .kui-previous-search-list .mat-list-item .mat-icon{display:none}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item{cursor:pointer;padding:12px!important;display:inherit}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label{overflow:hidden;text-overflow:ellipsis;width:160px}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::before{content:\"[\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-project-filter-label.not-empty::after{content:\"]\"}.kui-search-menu .kui-previous-search-list .mat-list-item .kui-previous-search-item .kui-previous-search-query{font-weight:700}.kui-search-menu .kui-menu-action{position:absolute;bottom:0;width:calc(100% - 32px)}.kui-search-menu .kui-menu-action .center{display:block;margin:12px auto}.kui-form-content{width:100%}.kui-form-content .kui-form-action{position:absolute;bottom:16px;width:calc(100% - 32px);display:inline-flex}.small-field{width:121px}.medium-field{width:195px}.large-field{min-width:320px}.input-icon{color:rgba(11,11,11,.6)}@media screen and (max-width:1024px){.fulltext-search.input-field input{width:calc(360px - 80px)}.fulltext-search,.kui-menu.extended-search{width:360px}}@media screen and (max-width:768px){.fulltext-search.input-field input{width:calc(360px - 160px - 80px)}.fulltext-search,.kui-menu.extended-search{width:calc(360px - 80px)}}"]
            }] }
];
/** @nocollapse */
UriValueComponent.ctorParameters = () => [
    { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] }] }
];
UriValueComponent.propDecorators = {
    formGroup: [{ type: Input }]
};

// https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
const resolvedPromise$a = Promise.resolve(null);
class ListValueComponent {
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
        resolvedPromise$a.then(() => {
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
        resolvedPromise$a.then(() => {
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

class ListDisplayComponent {
    constructor() {
        this.selectedNode = new EventEmitter();
    }
    ngOnInit() {
        // console.log(this.children)
    }
    setValue(item) {
        this.selectedNode.emit(item);
    }
}
ListDisplayComponent.decorators = [
    { type: Component, args: [{
                selector: 'list-display',
                template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n    <span *ngFor=\"let child of children\">\n        <span *ngIf=\"child.children && child.children.length > 0\">\n            <button mat-menu-item [matMenuTriggerFor]=\"menu.childMenu\" (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n            <list-display #menu [children]=\"child.children\" (selectedNode)=\"setValue($event)\"></list-display>\n        </span>\n\n        <span *ngIf=\"!child.children || child.children.length === 0\">\n            <button mat-menu-item (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n        </span>\n    </span>\n</mat-menu>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ListDisplayComponent.ctorParameters = () => [];
ListDisplayComponent.propDecorators = {
    children: [{ type: Input }],
    selectedNode: [{ type: Output }],
    childMenu: [{ type: ViewChild, args: ['childMenu',] }]
};

class KuiSearchModule {
}
KuiSearchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BrowserAnimationsModule,
                    MatAutocompleteModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatDatepickerModule,
                    MatExpansionModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatListModule,
                    MatMenuModule,
                    MatSelectModule,
                    MatTooltipModule,
                    FormsModule,
                    ReactiveFormsModule,
                    KuiCoreModule,
                    KuiActionModule,
                    KuiViewerModule,
                    MatJDNConvertibleCalendarDateAdapterModule
                ],
                declarations: [
                    SelectOntologyComponent,
                    ExtendedSearchComponent,
                    SelectResourceClassComponent,
                    SelectPropertyComponent,
                    SpecifyPropertyValueComponent,
                    BooleanValueComponent,
                    DateValueComponent,
                    DecimalValueComponent,
                    IntegerValueComponent,
                    LinkValueComponent,
                    TextValueComponent,
                    UriValueComponent,
                    HeaderComponent,
                    FulltextSearchComponent,
                    SearchPanelComponent,
                    ListValueComponent,
                    ListDisplayComponent,
                    ExpertSearchComponent
                ],
                exports: [
                    SearchPanelComponent,
                    FulltextSearchComponent,
                    ExtendedSearchComponent,
                    ExpertSearchComponent,
                    DateValueComponent
                ],
                entryComponents: [
                    HeaderComponent
                ]
            },] }
];

/*
 * Public API Surface of search
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ListDisplayComponent as ɵb, ListValueComponent as ɵa, FulltextSearchComponent, SearchPanelComponent, ExtendedSearchComponent, ExpertSearchComponent, SelectOntologyComponent, SelectPropertyComponent, SpecifyPropertyValueComponent, BooleanValueComponent, DateValueComponent, HeaderComponent, DecimalValueComponent, IntegerValueComponent, LinkValueComponent, TextValueComponent, UriValueComponent, SelectResourceClassComponent, KuiSearchModule };

//# sourceMappingURL=knora-search.js.map