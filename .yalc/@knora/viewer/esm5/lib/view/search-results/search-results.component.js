import * as tslib_1 from "tslib";
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SearchResultsComponent.prototype, "complexView", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SearchResultsComponent.prototype, "searchQuery", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SearchResultsComponent.prototype, "searchMode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SearchResultsComponent.prototype, "projectIri", void 0);
    SearchResultsComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-search-results',
            template: "<kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n<div *ngIf=\"!loading && !badRequest\">\n\n    <div *ngIf=\"numberOfAllResults !== 0 && result; else noResult\">\n\n        <mat-tab-group animationDuration=\"0ms\" [selectedIndex]=\"1\">\n            <mat-tab disabled>\n                <ng-template mat-tab-label>\n                    <!-- <mat-icon class=\"tab-icon\">hashtag</mat-icon> -->\n                    <h4 class=\"search-results-title\">Results: {{numberOfAllResults}}</h4>\n                </ng-template>\n            </mat-tab>\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_list</mat-icon>\n                    List\n                </ng-template>\n                <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-list-view>\n            </mat-tab>\n\n            <!-- in caase of complexView: show tab to switch to grid view -->\n            <mat-tab *ngIf=\"complexView\">\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_module</mat-icon>\n                    Grid\n                </ng-template>\n                <kui-grid-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-grid-view>\n            </mat-tab>\n            <!-- not yet implemented! --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">table_chart</mat-icon>\n                    Table\n                </ng-template>\n                <kui-table-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\">\n                </kui-table-view>\n            </mat-tab>\n            -->\n\n            <!-- the following tab we don't need anymore? The GravSearch view will be part of the export menu --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">code</mat-icon>\n                    Gravsearch\n                </ng-template>\n                <kui-gravsearch-view></kui-gravsearch-view>\n            </mat-tab>\n            -->\n\n        </mat-tab-group>\n        <!-- <div>\n            <p>List view n\u00B02</p>\n            <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\" *ngIf=\"!complexView\"></kui-list-view>\n        </div> -->\n\n        <div class=\"load-panel\" *ngIf=\"result.length > 0\">\n            <button mat-flat-button color=\"primary\" class=\"link center\" (click)=\"loadMore(offset)\"\n                    *ngIf=\"offset < maxOffset\">Load more\n                <mat-icon>keyboard_arrow_down</mat-icon>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- In case of 0 result -->\n    <ng-template #noResult>\n        <kui-message [message]=\"{status: 404, statusMsg: 'No results', statusText: 'Sorry, but we couldn\\'t find any results matching your search'}\"\n                     [medium]=\"true\"></kui-message>\n        <!-- <p><strong>No result</strong></p> -->\n    </ng-template>\n\n</div>\n\n<!-- Error message -->\n<kui-message *ngIf=\"errorMessage\" [message]=\"{status: 400, statusText: errorMessage.errorInfo}\" [medium]=\"true\">\n</kui-message>\n",
            styles: [".load-panel{width:100%}.load-panel .center{display:block;line-height:24px;margin:12px auto}.tab-icon{margin-right:8px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            SearchService,
            SearchParamsService,
            Router])
    ], SearchResultsComponent);
    return SearchResultsComponent;
}());
export { SearchResultsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQVUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBMEMsY0FBYyxFQUE0RCxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFcE07Ozs7R0FJRztBQU1IO0lBd0NJLGdDQUNZLE1BQXNCLEVBQ3RCLGNBQTZCLEVBQzdCLG9CQUF5QyxFQUN6QyxPQUFlO1FBSjNCLGlCQU9DO1FBTlcsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBM0MzQjs7OztXQUlHO1FBQ00sZ0JBQVcsR0FBYSxLQUFLLENBQUM7UUFvQnZDLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUd0QixXQUFNLEdBQW1CLEVBQUUsQ0FBQztRQUc1Qiw2QkFBNkI7UUFDN0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsaUJBQVksR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUN0RCxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQW1LekI7Ozs7Ozs7V0FPRztRQUNLLHlCQUFvQixHQUFHLFVBQUMsWUFBbUM7WUFDL0QsMEZBQTBGO1lBQzFGLElBQUksS0FB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RUFBRSxtQkFBbUI7WUFDOUMsVUFBQyxLQUFzQjtnQkFDbkIsS0FBSSxDQUFDLFlBQVksR0FBb0IsS0FBSyxDQUFDO1lBQy9DLENBQUMsQ0FDSixDQUFDO1NBQ1Q7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRywwQkFDMUIsSUFBSSxDQUFDLFVBQ0gsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQWlERDs7Ozs7OztPQU9HO0lBQ0gseUNBQVEsR0FBUixVQUFTLE1BQWM7UUFDbkIsa0dBQWtHO1FBQ2xHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBdlFRO1FBQVIsS0FBSyxFQUFFOzsrREFBK0I7SUFNOUI7UUFBUixLQUFLLEVBQUU7OytEQUFzQjtJQU1yQjtRQUFSLEtBQUssRUFBRTs7OERBQXFCO0lBTXBCO1FBQVIsS0FBSyxFQUFFOzs4REFBcUI7SUF4QnBCLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLGdxR0FBOEM7O1NBRWpELENBQUM7aURBMENzQixjQUFjO1lBQ04sYUFBYTtZQUNQLG1CQUFtQjtZQUNoQyxNQUFNO09BNUNsQixzQkFBc0IsQ0E4UWxDO0lBQUQsNkJBQUM7Q0FBQSxBQTlRRCxJQThRQztTQTlRWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQ291bnRRdWVyeVJlc3VsdCwgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIEtub3JhQ29uc3RhbnRzLCBPbnRvbG9neUluZm9ybWF0aW9uLCBSZWFkUmVzb3VyY2UsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSwgU2VhcmNoUGFyYW1zU2VydmljZSwgU2VhcmNoU2VydmljZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLyoqXG4gKiBUaGUgc2VhcmNoLXJlc3VsdHMgZ2V0cyB0aGUgc2VhcmNoIG1vZGUgYW5kIHBhcmFtZXRlcnMgZnJvbSByb3V0ZXMgb3IgaW5wdXRzLFxuICogYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzb3VyY2VzIHRoYXQgYXJlIGRpc3BsYXllZCBpbiBhIGxpc3Qgb3IgYSBncmlkLlxuICogVGhlIHJlc3VsdHMgY2FuIGJlIGZpbHRlcmVkIGJ5IHByb2plY3QuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlYXJjaC1yZXN1bHRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IFtjb21wbGV4Vmlld10gSWYgdHJ1ZSBpdCBzaG93cyAyIHdheXMgdG8gZGlzcGxheSB0aGUgc2VhcmNoIHJlc3VsdHM6IGxpc3Qgb3IgZ3JpZC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbXBsZXhWaWV3PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtzZWFyY2hRdWVyeV0gU2VhcmNoIHBhcmFtZXRlcnMuIEl0IGNhbiBiZSBhIGdyYXZzZWFyY2ggcXVlcnkgKGV4dGVuZGVkIG1vZGUpIG9yIHN0cmluZyAoZnVsbHRleHQgbW9kZSkuXG4gICAgICovXG4gICAgQElucHV0KCkgc2VhcmNoUXVlcnk/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW3NlYXJjaE1vZGVdIFNlYXJjaCBtb2RlOiBFeHRlbmRlZCBvciBmdWxsdGV4dC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWFyY2hNb2RlPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtwcm9qZWN0SXJpXSBQcm9qZWN0IElyaS4gVG8gZmlsdGVyIHRoZSByZXN1bHRzIGJ5IHByb2plY3QuXG4gICAgICovXG4gICAgQElucHV0KCkgcHJvamVjdElyaT86IHN0cmluZztcblxuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG4gICAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgIG1heE9mZnNldDogbnVtYmVyID0gMDtcbiAgICBncmF2U2VhcmNoUXVlcnk6IHN0cmluZztcbiAgICBncmF2c2VhcmNoR2VuZXJhdG9yOiBFeHRlbmRlZFNlYXJjaFBhcmFtcztcbiAgICByZXN1bHQ6IFJlYWRSZXNvdXJjZVtdID0gW107XG4gICAgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIG51bWJlck9mQWxsUmVzdWx0czogbnVtYmVyO1xuICAgIC8vIHJlcmVuZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgYmFkUmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGxvYWRpbmcgPSB0cnVlO1xuICAgIGVycm9yTWVzc2FnZTogQXBpU2VydmljZUVycm9yID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgIHBhZ2luZ0xpbWl0OiBudW1iZXIgPSAyNTtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlclxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5fcm91dGUucGFyYW1NYXAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBzZWFyY2ggbW9kZVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWFyY2hNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoTW9kZSA9IHBhcmFtcy5nZXQoJ21vZGUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHByb2plY3QgaXJpXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5nZXQoJ3Byb2plY3QnKSAmJiAodGhpcy5wcm9qZWN0SXJpICE9PSBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmdldCgncHJvamVjdCcpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0SXJpID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5nZXQoJ3Byb2plY3QnKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBvZmZzZXQgIGFuZCByZXN1bHRcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBxdWVyeSBwYXJhbXMgZGVwZW5kaW5nIG9uIHRoZSBzZWFyY2ggbW9kZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdmdWxsdGV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHBhcmFtcy5nZXQoJ3EnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWRSZXF1ZXN0ID0gdGhpcy5zZWFyY2hRdWVyeS5sZW5ndGggPCAzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhdnNlYXJjaEdlbmVyYXRvciA9IHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuZ2V0U2VhcmNoUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWFyY2hRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2U2VhcmNoUXVlcnkgPSB0aGlzLnNlYXJjaFF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHJlc3VsdHNcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlc3VsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBHcmF2c2VhcmNoIHF1ZXJ5IGZvciB0aGUgY3VycmVudCBvZmZzZXQuXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKSB7XG4gICAgICAgIGNvbnN0IGdyYXZzZWFyY2g6XG4gICAgICAgICAgICB8IHN0cmluZ1xuICAgICAgICAgICAgfCBib29sZWFuID0gdGhpcy5ncmF2c2VhcmNoR2VuZXJhdG9yLmdlbmVyYXRlR3JhdnNlYXJjaChcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldFxuICAgICAgICAgICAgKTtcbiAgICAgICAgaWYgKGdyYXZzZWFyY2ggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBubyB2YWxpZCBzZWFyY2ggcGFyYW1zIChhcHBsaWNhdGlvbiBoYXMgYmVlbiByZWxvYWRlZClcbiAgICAgICAgICAgIC8vIGdvIHRvIHJvb3RcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJyddLCB7IHJlbGF0aXZlVG86IHRoaXMuX3JvdXRlIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ncmF2U2VhcmNoUXVlcnkgPSA8c3RyaW5nPmdyYXZzZWFyY2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgc2VhcmNoIHJlc3VsdCBmcm9tIEtub3JhIC0gMiBjYXNlczogc2ltcGxlIHNlYXJjaCBhbmQgZXh0ZW5kZWQgc2VhcmNoXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzdWx0KCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIHJlc2V0IHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEZVTExURVhUIFNFQVJDSFxuICAgICAgICBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZnVsbHRleHQnKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhZFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZS5lcnJvckluZm8gPVxuICAgICAgICAgICAgICAgICAgICAnQSBzZWFyY2ggdmFsdWUgaXMgZXhwZWN0ZWQgdG8gaGF2ZSBhdCBsZWFzdCBsZW5ndGggb2YgMyBjaGFyYWN0ZXJzLic7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZXJlbmRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hQYXJhbXM7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0geyBsaW1pdFRvUHJvamVjdDogdGhpcy5wcm9qZWN0SXJpIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcmZvcm0gY291bnQgcXVlcnlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvRnVsbFRleHRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZkFsbFJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBmdWxsIHRleHQgc2VhcmNoXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuZG9GdWxsVGV4dFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaFJlc3VsdHMsIC8vIGZ1bmN0aW9uIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIHRoaXMuZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRVhURU5ERUQgU0VBUkNIXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAvLyBwZXJmb3JtIGNvdW50IHF1ZXJ5XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIC5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZTZWFyY2hRdWVyeVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZkFsbFJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2VcbiAgICAgICAgICAgICAgICAuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHRoaXMuZ3JhdlNlYXJjaFF1ZXJ5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaFJlc3VsdHMsIC8vIGZ1bmN0aW9uIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLmVycm9ySW5mbyA9IGBzZWFyY2ggbW9kZSBpbnZhbGlkOiAke1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoTW9kZVxuICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb252ZXJ0cyBzZWFyY2ggcmVzdWx0cyBmcm9tIEpTT04tTEQgdG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dIGFuZCByZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCBvbnRvbG9neSBlbnRpdGllcy5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBgc3Vic2NyaWJlYCBhcyBhIHBvaW50ZXIgKGluc3RlYWQgb2YgcmVkdW5kYW50bHkgZGVmaW5pbmcgdGhlIHNhbWUgbGFtYmRhIGZ1bmN0aW9uKS5cbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRSZXNvdXJjZXNTZXF1ZW5jZX0gc2VhcmNoUmVzdWx0IHRoZSBhbnN3ZXIgdG8gYSBzZWFyY2ggcmVxdWVzdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHByb2Nlc3NTZWFyY2hSZXN1bHRzID0gKHNlYXJjaFJlc3VsdDogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgIC8vIGFzc2lnbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBhIHZhcmlhYmxlIHNvIGl0IGNhbiBiZSB1c2VkIGluIHRoZSBjb21wb25lbnQncyB0ZW1wbGF0ZVxuICAgICAgICBpZiAodGhpcy5vbnRvbG9neUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gaW5pdCBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8gPSBzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgcmVzdWx0cyB0byBzZWFyY2ggcmVzdWx0c1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHRoaXMucmVzdWx0LmNvbmNhdChzZWFyY2hSZXN1bHQucmVzb3VyY2VzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlYXJjaCByZXN1bHRzJywgdGhpcy5yZXN1bHQpO1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnJlcmVuZGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdG90YWwgbnVtYmVyIG9mIHJlc3VsdHMgcmV0dXJuZWQgYnkgYSBjb3VudCBxdWVyeS5cbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FwaVNlcnZpY2VSZXN1bHR9IGNvdW50UXVlcnlSZXN1bHQgdGhlIHJlc3BvbnNlIHRvIGEgY291bnQgcXVlcnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93TnVtYmVyT2ZBbGxSZXN1bHRzID0gKGNvdW50UXVlcnlSZXN1bHQ6IENvdW50UXVlcnlSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgPSBjb3VudFF1ZXJ5UmVzdWx0Lm51bWJlck9mUmVzdWx0cztcblxuICAgICAgICBpZiAodGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgPiAwKSB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgaXMgMC1iYXNlZFxuICAgICAgICAgICAgLy8gaWYgbnVtYmVyT2ZBbGxSZXN1bHRzIGVxdWFscyB0aGUgcGFnaW5nTGltaXQsIHRoZSBtYXguIG9mZnNldCBpcyAwXG4gICAgICAgICAgICB0aGlzLm1heE9mZnNldCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtYmVyT2ZBbGxSZXN1bHRzIC0gMSkgLyB0aGlzLnBhZ2luZ0xpbWl0XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXhPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIG5leHQgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIFRoZSByZXN1bHRzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG9uZXMuXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBsb2FkTW9yZShvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyB1cGRhdGUgdGhlIHBhZ2Ugb2Zmc2V0IHdoZW4gdGhlIGVuZCBvZiBzY3JvbGwgaXMgcmVhY2hlZCB0byBnZXQgdGhlIG5leHQgcGFnZSBvZiBzZWFyY2ggcmVzdWx0c1xuICAgICAgICBpZiAodGhpcy5vZmZzZXQgPCB0aGlzLm1heE9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdleHRlbmRlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0UmVzdWx0KCk7XG4gICAgfVxufVxuIl19