import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceError, KnoraConstants, SearchParamsService, SearchService } from '@knora/core';
/**
 * The search-results gets the search mode and parameters from routes or inputs,
 * and returns the corresponding resources that are displayed in a list or a grid.
 * The results can be filtered by project.
 */
var SearchResultsComponent = /** @class */ (function () {
    function SearchResultsComponent(_route, _searchService, _searchParamsService, _router) {
        var _this = this;
        this._route = _route;
        this._searchService = _searchService;
        this._searchParamsService = _searchParamsService;
        this._router = _router;
        /**
         *
         * @param  {boolean} [complexView] If true it shows 2 ways to display the search results: list or grid.
         *
         */
        this.complexView = false;
        this.KnoraConstants = KnoraConstants;
        this.offset = 0;
        this.maxOffset = 0;
        this.result = [];
        // rerender: boolean = false;
        this.badRequest = false;
        this.loading = true;
        this.errorMessage = new ApiServiceError();
        this.pagingLimit = 25;
        /**
         *
         * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
         * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
         * @ignore
         *
         * @param {ReadResourcesSequence} searchResult the answer to a search request.
         */
        this.processSearchResults = function (searchResult) {
            // assign ontology information to a variable so it can be used in the component's template
            if (_this.ontologyInfo === undefined) {
                // init ontology information
                _this.ontologyInfo = searchResult.ontologyInformation;
            }
            else {
                // update ontology information
                _this.ontologyInfo.updateOntologyInformation(searchResult.ontologyInformation);
            }
            // append results to search results
            _this.result = _this.result.concat(searchResult.resources);
            // console.log('search results', this.result);
            _this.loading = false;
            // this.rerender = false;
        };
        /**
         * Shows total number of results returned by a count query.
         * @ignore
         *
         * @param {ApiServiceResult} countQueryResult the response to a count query.
         */
        this.showNumberOfAllResults = function (countQueryResult) {
            _this.numberOfAllResults = countQueryResult.numberOfResults;
            if (_this.numberOfAllResults > 0) {
                // offset is 0-based
                // if numberOfAllResults equals the pagingLimit, the max. offset is 0
                _this.maxOffset = Math.floor((_this.numberOfAllResults - 1) / _this.pagingLimit);
            }
            else {
                _this.maxOffset = 0;
            }
        };
    }
    SearchResultsComponent.prototype.ngOnInit = function () {
    };
    SearchResultsComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this._route.paramMap.subscribe(function (params) {
            // get the search mode
            if (!_this.searchMode) {
                _this.searchMode = params.get('mode');
            }
            // get the project iri
            if (params.get('project') && (_this.projectIri !== decodeURIComponent(params.get('project')))) {
                _this.projectIri = decodeURIComponent(params.get('project'));
            }
            // init offset  and result
            _this.offset = 0;
            _this.result = [];
            // get query params depending on the search mode
            if (_this.searchMode === 'fulltext') {
                _this.searchQuery = params.get('q');
                _this.badRequest = _this.searchQuery.length < 3;
            }
            else if (_this.searchMode === 'extended') {
                _this.gravsearchGenerator = _this._searchParamsService.getSearchParams();
                if (!_this.searchQuery) {
                    _this.generateGravsearchQuery();
                }
                else {
                    _this.gravSearchQuery = _this.searchQuery;
                }
            }
            // get results
            // this.rerender = true;
            _this.getResult();
        });
    };
    /**
     * Generates the Gravsearch query for the current offset.
     * @ignore
     */
    SearchResultsComponent.prototype.generateGravsearchQuery = function () {
        var gravsearch = this.gravsearchGenerator.generateGravsearch(this.offset);
        if (gravsearch === false) {
            // no valid search params (application has been reloaded)
            // go to root
            this._router.navigate([''], { relativeTo: this._route });
            return;
        }
        else {
            this.gravSearchQuery = gravsearch;
        }
    };
    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     * @ignore
     */
    SearchResultsComponent.prototype.getResult = function () {
        var _this = this;
        this.loading = true;
        // reset the error message
        this.errorMessage = undefined;
        // FULLTEXT SEARCH
        if (this.searchMode === 'fulltext') {
            // this.rerender = true;
            if (this.badRequest) {
                this.errorMessage = new ApiServiceError();
                this.errorMessage.errorInfo =
                    'A search value is expected to have at least length of 3 characters.';
                this.loading = false;
                // this.rerender = false;
            }
            else {
                var searchParams = void 0;
                if (this.projectIri !== undefined) {
                    searchParams = { limitToProject: this.projectIri };
                }
                if (this.offset === 0) {
                    // perform count query
                    this._searchService
                        .doFullTextSearchCountQueryCountQueryResult(this.searchQuery, searchParams)
                        .subscribe(this.showNumberOfAllResults, function (error) {
                        _this.errorMessage = error;
                    });
                }
                // perform full text search
                this._searchService
                    .doFullTextSearchReadResourceSequence(this.searchQuery, this.offset, searchParams)
                    .subscribe(this.processSearchResults, // function pointer
                function (error) {
                    _this.errorMessage = error;
                    console.log('error', error);
                    console.log('message', _this.errorMessage);
                });
            }
            // EXTENDED SEARCH
        }
        else if (this.searchMode === 'extended') {
            // perform count query
            if (this.offset === 0) {
                this._searchService
                    .doExtendedSearchCountQueryCountQueryResult(this.gravSearchQuery)
                    .subscribe(this.showNumberOfAllResults, function (error) {
                    _this.errorMessage = error;
                });
            }
            this._searchService
                .doExtendedSearchReadResourceSequence(this.gravSearchQuery)
                .subscribe(this.processSearchResults, // function pointer
            function (error) {
                _this.errorMessage = error;
            });
        }
        else {
            this.errorMessage = new ApiServiceError();
            this.errorMessage.errorInfo = "search mode invalid: " + this.searchMode;
        }
    };
    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     * @ignore
     *
     * @param {number} offset
     * @returns void
     */
    SearchResultsComponent.prototype.loadMore = function (offset) {
        // update the page offset when the end of scroll is reached to get the next page of search results
        if (this.offset < this.maxOffset) {
            this.offset++;
        }
        else {
            return;
        }
        if (this.searchMode === 'extended') {
            this.generateGravsearchQuery();
        }
        this.getResult();
    };
    SearchResultsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-search-results',
                    template: "<kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n<div *ngIf=\"!loading && !badRequest\">\n\n    <div *ngIf=\"numberOfAllResults !== 0 && result; else noResult\">\n\n        <mat-tab-group animationDuration=\"0ms\" [selectedIndex]=\"1\">\n            <mat-tab disabled>\n                <ng-template mat-tab-label>\n                    <!-- <mat-icon class=\"tab-icon\">hashtag</mat-icon> -->\n                    <h4 class=\"search-results-title\">Results: {{numberOfAllResults}}</h4>\n                </ng-template>\n            </mat-tab>\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_list</mat-icon>\n                    List\n                </ng-template>\n                <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-list-view>\n            </mat-tab>\n\n            <!-- in caase of complexView: show tab to switch to grid view -->\n            <mat-tab *ngIf=\"complexView\">\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_module</mat-icon>\n                    Grid\n                </ng-template>\n                <kui-grid-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-grid-view>\n            </mat-tab>\n            <!-- not yet implemented! --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">table_chart</mat-icon>\n                    Table\n                </ng-template>\n                <kui-table-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\">\n                </kui-table-view>\n            </mat-tab>\n            -->\n\n            <!-- the following tab we don't need anymore? The GravSearch view will be part of the export menu --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">code</mat-icon>\n                    Gravsearch\n                </ng-template>\n                <kui-gravsearch-view></kui-gravsearch-view>\n            </mat-tab>\n            -->\n\n        </mat-tab-group>\n        <!-- <div>\n            <p>List view n\u00B02</p>\n            <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\" *ngIf=\"!complexView\"></kui-list-view>\n        </div> -->\n\n        <div class=\"load-panel\" *ngIf=\"result.length > 0\">\n            <button mat-flat-button color=\"primary\" class=\"link center\" (click)=\"loadMore(offset)\"\n                    *ngIf=\"offset < maxOffset\">Load more\n                <mat-icon>keyboard_arrow_down</mat-icon>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- In case of 0 result -->\n    <ng-template #noResult>\n        <kui-message [message]=\"{status: 404, statusMsg: 'No results', statusText: 'Sorry, but we couldn\\'t find any results matching your search'}\"\n                     [medium]=\"true\"></kui-message>\n        <!-- <p><strong>No result</strong></p> -->\n    </ng-template>\n\n</div>\n\n<!-- Error message -->\n<kui-message *ngIf=\"errorMessage\" [message]=\"{status: 400, statusText: errorMessage.errorInfo}\" [medium]=\"true\">\n</kui-message>\n",
                    styles: [".load-panel{width:100%}.load-panel .center{display:block;line-height:24px;margin:12px auto}.tab-icon{margin-right:8px}"]
                }] }
    ];
    /** @nocollapse */
    SearchResultsComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: SearchService },
        { type: SearchParamsService },
        { type: Router }
    ]; };
    SearchResultsComponent.propDecorators = {
        complexView: [{ type: Input }],
        searchQuery: [{ type: Input }],
        searchMode: [{ type: Input }],
        projectIri: [{ type: Input }]
    };
    return SearchResultsComponent;
}());
export { SearchResultsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBVSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZUFBZSxFQUEwQyxjQUFjLEVBQTRELG1CQUFtQixFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwTTs7OztHQUlHO0FBQ0g7SUE2Q0ksZ0NBQ1ksTUFBc0IsRUFDdEIsY0FBNkIsRUFDN0Isb0JBQXlDLEVBQ3pDLE9BQWU7UUFKM0IsaUJBT0M7UUFOVyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUEzQzNCOzs7O1dBSUc7UUFDTSxnQkFBVyxHQUFhLEtBQUssQ0FBQztRQW9CdkMsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFDaEMsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBR3RCLFdBQU0sR0FBbUIsRUFBRSxDQUFDO1FBRzVCLDZCQUE2QjtRQUM3QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixpQkFBWSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3RELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBbUt6Qjs7Ozs7OztXQU9HO1FBQ0sseUJBQW9CLEdBQUcsVUFBQyxZQUFtQztZQUMvRCwwRkFBMEY7WUFDMUYsSUFBSSxLQUFJ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QUFFLG1CQUFtQjtZQUM5QyxVQUFDLEtBQXNCO2dCQUNuQixLQUFJLENBQUMsWUFBWSxHQUFvQixLQUFLLENBQUM7WUFDL0MsQ0FBQyxDQUNKLENBQUM7U0FDVDthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLDBCQUMxQixJQUFJLENBQUMsVUFDSCxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBaUREOzs7Ozs7O09BT0c7SUFDSCx5Q0FBUSxHQUFSLFVBQVMsTUFBYztRQUNuQixrR0FBa0c7UUFDbEcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ2hDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7O2dCQWxSSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsZ3FHQUE4Qzs7aUJBRWpEOzs7O2dCQVpRLGNBQWM7Z0JBQzBJLGFBQWE7Z0JBQWxDLG1CQUFtQjtnQkFEOUgsTUFBTTs7OzhCQW1CbEMsS0FBSzs4QkFNTCxLQUFLOzZCQU1MLEtBQUs7NkJBTUwsS0FBSzs7SUFzUFYsNkJBQUM7Q0FBQSxBQW5SRCxJQW1SQztTQTlRWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQ291bnRRdWVyeVJlc3VsdCwgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIEtub3JhQ29uc3RhbnRzLCBPbnRvbG9neUluZm9ybWF0aW9uLCBSZWFkUmVzb3VyY2UsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSwgU2VhcmNoUGFyYW1zU2VydmljZSwgU2VhcmNoU2VydmljZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLyoqXG4gKiBUaGUgc2VhcmNoLXJlc3VsdHMgZ2V0cyB0aGUgc2VhcmNoIG1vZGUgYW5kIHBhcmFtZXRlcnMgZnJvbSByb3V0ZXMgb3IgaW5wdXRzLFxuICogYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzb3VyY2VzIHRoYXQgYXJlIGRpc3BsYXllZCBpbiBhIGxpc3Qgb3IgYSBncmlkLlxuICogVGhlIHJlc3VsdHMgY2FuIGJlIGZpbHRlcmVkIGJ5IHByb2plY3QuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlYXJjaC1yZXN1bHRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IFtjb21wbGV4Vmlld10gSWYgdHJ1ZSBpdCBzaG93cyAyIHdheXMgdG8gZGlzcGxheSB0aGUgc2VhcmNoIHJlc3VsdHM6IGxpc3Qgb3IgZ3JpZC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbXBsZXhWaWV3PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtzZWFyY2hRdWVyeV0gU2VhcmNoIHBhcmFtZXRlcnMuIEl0IGNhbiBiZSBhIGdyYXZzZWFyY2ggcXVlcnkgKGV4dGVuZGVkIG1vZGUpIG9yIHN0cmluZyAoZnVsbHRleHQgbW9kZSkuXG4gICAgICovXG4gICAgQElucHV0KCkgc2VhcmNoUXVlcnk/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW3NlYXJjaE1vZGVdIFNlYXJjaCBtb2RlOiBFeHRlbmRlZCBvciBmdWxsdGV4dC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWFyY2hNb2RlPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtwcm9qZWN0SXJpXSBQcm9qZWN0IElyaS4gVG8gZmlsdGVyIHRoZSByZXN1bHRzIGJ5IHByb2plY3QuXG4gICAgICovXG4gICAgQElucHV0KCkgcHJvamVjdElyaT86IHN0cmluZztcblxuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG4gICAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgIG1heE9mZnNldDogbnVtYmVyID0gMDtcbiAgICBncmF2U2VhcmNoUXVlcnk6IHN0cmluZztcbiAgICBncmF2c2VhcmNoR2VuZXJhdG9yOiBFeHRlbmRlZFNlYXJjaFBhcmFtcztcbiAgICByZXN1bHQ6IFJlYWRSZXNvdXJjZVtdID0gW107XG4gICAgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIG51bWJlck9mQWxsUmVzdWx0czogbnVtYmVyO1xuICAgIC8vIHJlcmVuZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgYmFkUmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGxvYWRpbmcgPSB0cnVlO1xuICAgIGVycm9yTWVzc2FnZTogQXBpU2VydmljZUVycm9yID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgIHBhZ2luZ0xpbWl0OiBudW1iZXIgPSAyNTtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlclxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5fcm91dGUucGFyYW1NYXAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBzZWFyY2ggbW9kZVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWFyY2hNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoTW9kZSA9IHBhcmFtcy5nZXQoJ21vZGUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHByb2plY3QgaXJpXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5nZXQoJ3Byb2plY3QnKSAmJiAodGhpcy5wcm9qZWN0SXJpICE9PSBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmdldCgncHJvamVjdCcpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0SXJpID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5nZXQoJ3Byb2plY3QnKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBvZmZzZXQgIGFuZCByZXN1bHRcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBxdWVyeSBwYXJhbXMgZGVwZW5kaW5nIG9uIHRoZSBzZWFyY2ggbW9kZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdmdWxsdGV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHBhcmFtcy5nZXQoJ3EnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWRSZXF1ZXN0ID0gdGhpcy5zZWFyY2hRdWVyeS5sZW5ndGggPCAzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhdnNlYXJjaEdlbmVyYXRvciA9IHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuZ2V0U2VhcmNoUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWFyY2hRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2U2VhcmNoUXVlcnkgPSB0aGlzLnNlYXJjaFF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHJlc3VsdHNcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlc3VsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBHcmF2c2VhcmNoIHF1ZXJ5IGZvciB0aGUgY3VycmVudCBvZmZzZXQuXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKSB7XG4gICAgICAgIGNvbnN0IGdyYXZzZWFyY2g6XG4gICAgICAgICAgICB8IHN0cmluZ1xuICAgICAgICAgICAgfCBib29sZWFuID0gdGhpcy5ncmF2c2VhcmNoR2VuZXJhdG9yLmdlbmVyYXRlR3JhdnNlYXJjaChcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldFxuICAgICAgICAgICAgKTtcbiAgICAgICAgaWYgKGdyYXZzZWFyY2ggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBubyB2YWxpZCBzZWFyY2ggcGFyYW1zIChhcHBsaWNhdGlvbiBoYXMgYmVlbiByZWxvYWRlZClcbiAgICAgICAgICAgIC8vIGdvIHRvIHJvb3RcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJyddLCB7IHJlbGF0aXZlVG86IHRoaXMuX3JvdXRlIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ncmF2U2VhcmNoUXVlcnkgPSA8c3RyaW5nPmdyYXZzZWFyY2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgc2VhcmNoIHJlc3VsdCBmcm9tIEtub3JhIC0gMiBjYXNlczogc2ltcGxlIHNlYXJjaCBhbmQgZXh0ZW5kZWQgc2VhcmNoXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzdWx0KCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIHJlc2V0IHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEZVTExURVhUIFNFQVJDSFxuICAgICAgICBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZnVsbHRleHQnKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhZFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZS5lcnJvckluZm8gPVxuICAgICAgICAgICAgICAgICAgICAnQSBzZWFyY2ggdmFsdWUgaXMgZXhwZWN0ZWQgdG8gaGF2ZSBhdCBsZWFzdCBsZW5ndGggb2YgMyBjaGFyYWN0ZXJzLic7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZXJlbmRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hQYXJhbXM7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0geyBsaW1pdFRvUHJvamVjdDogdGhpcy5wcm9qZWN0SXJpIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcmZvcm0gY291bnQgcXVlcnlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvRnVsbFRleHRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZkFsbFJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBmdWxsIHRleHQgc2VhcmNoXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuZG9GdWxsVGV4dFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaFJlc3VsdHMsIC8vIGZ1bmN0aW9uIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIHRoaXMuZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRVhURU5ERUQgU0VBUkNIXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAvLyBwZXJmb3JtIGNvdW50IHF1ZXJ5XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIC5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZTZWFyY2hRdWVyeVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZkFsbFJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2VcbiAgICAgICAgICAgICAgICAuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHRoaXMuZ3JhdlNlYXJjaFF1ZXJ5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaFJlc3VsdHMsIC8vIGZ1bmN0aW9uIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLmVycm9ySW5mbyA9IGBzZWFyY2ggbW9kZSBpbnZhbGlkOiAke1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoTW9kZVxuICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb252ZXJ0cyBzZWFyY2ggcmVzdWx0cyBmcm9tIEpTT04tTEQgdG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dIGFuZCByZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCBvbnRvbG9neSBlbnRpdGllcy5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBgc3Vic2NyaWJlYCBhcyBhIHBvaW50ZXIgKGluc3RlYWQgb2YgcmVkdW5kYW50bHkgZGVmaW5pbmcgdGhlIHNhbWUgbGFtYmRhIGZ1bmN0aW9uKS5cbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRSZXNvdXJjZXNTZXF1ZW5jZX0gc2VhcmNoUmVzdWx0IHRoZSBhbnN3ZXIgdG8gYSBzZWFyY2ggcmVxdWVzdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHByb2Nlc3NTZWFyY2hSZXN1bHRzID0gKHNlYXJjaFJlc3VsdDogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgIC8vIGFzc2lnbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBhIHZhcmlhYmxlIHNvIGl0IGNhbiBiZSB1c2VkIGluIHRoZSBjb21wb25lbnQncyB0ZW1wbGF0ZVxuICAgICAgICBpZiAodGhpcy5vbnRvbG9neUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gaW5pdCBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8gPSBzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgcmVzdWx0cyB0byBzZWFyY2ggcmVzdWx0c1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHRoaXMucmVzdWx0LmNvbmNhdChzZWFyY2hSZXN1bHQucmVzb3VyY2VzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlYXJjaCByZXN1bHRzJywgdGhpcy5yZXN1bHQpO1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnJlcmVuZGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdG90YWwgbnVtYmVyIG9mIHJlc3VsdHMgcmV0dXJuZWQgYnkgYSBjb3VudCBxdWVyeS5cbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FwaVNlcnZpY2VSZXN1bHR9IGNvdW50UXVlcnlSZXN1bHQgdGhlIHJlc3BvbnNlIHRvIGEgY291bnQgcXVlcnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93TnVtYmVyT2ZBbGxSZXN1bHRzID0gKGNvdW50UXVlcnlSZXN1bHQ6IENvdW50UXVlcnlSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgPSBjb3VudFF1ZXJ5UmVzdWx0Lm51bWJlck9mUmVzdWx0cztcblxuICAgICAgICBpZiAodGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgPiAwKSB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgaXMgMC1iYXNlZFxuICAgICAgICAgICAgLy8gaWYgbnVtYmVyT2ZBbGxSZXN1bHRzIGVxdWFscyB0aGUgcGFnaW5nTGltaXQsIHRoZSBtYXguIG9mZnNldCBpcyAwXG4gICAgICAgICAgICB0aGlzLm1heE9mZnNldCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtYmVyT2ZBbGxSZXN1bHRzIC0gMSkgLyB0aGlzLnBhZ2luZ0xpbWl0XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXhPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIG5leHQgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIFRoZSByZXN1bHRzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG9uZXMuXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBsb2FkTW9yZShvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyB1cGRhdGUgdGhlIHBhZ2Ugb2Zmc2V0IHdoZW4gdGhlIGVuZCBvZiBzY3JvbGwgaXMgcmVhY2hlZCB0byBnZXQgdGhlIG5leHQgcGFnZSBvZiBzZWFyY2ggcmVzdWx0c1xuICAgICAgICBpZiAodGhpcy5vZmZzZXQgPCB0aGlzLm1heE9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdleHRlbmRlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0UmVzdWx0KCk7XG4gICAgfVxufVxuIl19