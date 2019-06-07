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
        this.rerender = false;
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
            _this.rerender = false;
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
            _this.rerender = true;
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
            this.rerender = true;
            if (this.badRequest) {
                this.errorMessage = new ApiServiceError();
                this.errorMessage.errorInfo =
                    'A search value is expected to have at least length of 3 characters.';
                this.loading = false;
                this.rerender = false;
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
                    template: "<kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n<div *ngIf=\"!rerender && !badRequest\">\n\n    <div *ngIf=\"numberOfAllResults !== 0 && result; else noResult\">\n\n        <mat-tab-group animationDuration=\"0ms\" [selectedIndex]=\"1\">\n            <mat-tab disabled>\n                <ng-template mat-tab-label>\n                    <!-- <mat-icon class=\"tab-icon\">hashtag</mat-icon> -->\n                    <h4 class=\"search-results-title\">Results: {{numberOfAllResults}}</h4>\n                </ng-template>\n            </mat-tab>\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_list</mat-icon>\n                    List\n                </ng-template>\n                <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-list-view>\n            </mat-tab>\n\n            <!-- in caase of complexView: show tab to switch to grid view -->\n            <mat-tab *ngIf=\"complexView\">\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_module</mat-icon>\n                    Grid\n                </ng-template>\n                <kui-grid-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-grid-view>\n            </mat-tab>\n            <!-- not yet implemented! --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">table_chart</mat-icon>\n                    Table\n                </ng-template>\n                <kui-table-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\">\n                </kui-table-view>\n            </mat-tab>\n            -->\n\n            <!-- the following tab we don't need anymore? The GravSearch view will be part of the export menu --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">code</mat-icon>\n                    Gravsearch\n                </ng-template>\n                <kui-gravsearch-view></kui-gravsearch-view>\n            </mat-tab>\n            -->\n\n        </mat-tab-group>\n        <!-- <div>\n            <p>List view n\u00B02</p>\n            <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\" *ngIf=\"!complexView\"></kui-list-view>\n        </div> -->\n\n        <div class=\"load-panel\" *ngIf=\"result.length > 0\">\n            <button mat-flat-button color=\"primary\" class=\"link center\" (click)=\"loadMore(offset)\" *ngIf=\"offset < maxOffset\">Load more\n                <mat-icon>keyboard_arrow_down</mat-icon>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- In case of 0 result -->\n    <ng-template #noResult>\n        <kui-message [message]=\"{status: 404, statusMsg: 'No results', statusText: 'Sorry, but we couldn\\'t find any results matching your search'}\" [medium]=\"true\"></kui-message>\n        <!-- <p><strong>No result</strong></p> -->\n    </ng-template>\n\n</div>\n\n<!-- Error message -->\n<kui-message *ngIf=\"errorMessage\" [message]=\"{status: 400, statusText: errorMessage.errorInfo}\" [medium]=\"true\">\n</kui-message>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQTBDLGNBQWMsRUFBNEQsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3BNOzs7O0dBSUc7QUFDSDtJQTZDSSxnQ0FDWSxNQUFzQixFQUN0QixjQUE2QixFQUM3QixvQkFBeUMsRUFDekMsT0FBZTtRQUozQixpQkFPQztRQU5XLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQTNDM0I7Ozs7V0FJRztRQUNNLGdCQUFXLEdBQWEsS0FBSyxDQUFDO1FBb0J2QyxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFHdEIsV0FBTSxHQUFtQixFQUFFLENBQUM7UUFHNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixpQkFBWSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ3RELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBK0p6Qjs7Ozs7OztXQU9HO1FBQ0sseUJBQW9CLEdBQUcsVUFBQyxZQUFtQztZQUMvRCwwRkFBMEY7WUFD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Y0FBYztpQkFDZCxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUMxRCxTQUFTLENBQ04sSUFBSSxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQjtZQUM5QyxVQUFDLEtBQXNCO2dCQUNuQixLQUFJLENBQUMsWUFBWSxHQUFvQixLQUFLLENBQUM7WUFDL0MsQ0FBQyxDQUNKLENBQUM7U0FDVDthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLDBCQUMxQixJQUFJLENBQUMsVUFDSCxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBaUREOzs7Ozs7O09BT0c7SUFDSCx5Q0FBUSxHQUFSLFVBQVMsTUFBYztRQUNuQixrR0FBa0c7UUFDbEcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ2hDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7O2dCQTlRSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsc25HQUE4Qzs7aUJBRWpEOzs7O2dCQWJRLGNBQWM7Z0JBQzBJLGFBQWE7Z0JBQWxDLG1CQUFtQjtnQkFEOUgsTUFBTTs7OzhCQW9CbEMsS0FBSzs4QkFNTCxLQUFLOzZCQU1MLEtBQUs7NkJBTUwsS0FBSzs7SUFrUFYsNkJBQUM7Q0FBQSxBQS9RRCxJQStRQztTQTFRWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIENvdW50UXVlcnlSZXN1bHQsIEV4dGVuZGVkU2VhcmNoUGFyYW1zLCBLbm9yYUNvbnN0YW50cywgT250b2xvZ3lJbmZvcm1hdGlvbiwgUmVhZFJlc291cmNlLCBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsIFNlYXJjaFBhcmFtc1NlcnZpY2UsIFNlYXJjaFNlcnZpY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGUgc2VhcmNoLXJlc3VsdHMgZ2V0cyB0aGUgc2VhcmNoIG1vZGUgYW5kIHBhcmFtZXRlcnMgZnJvbSByb3V0ZXMgb3IgaW5wdXRzLFxuICogYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzb3VyY2VzIHRoYXQgYXJlIGRpc3BsYXllZCBpbiBhIGxpc3Qgb3IgYSBncmlkLlxuICogVGhlIHJlc3VsdHMgY2FuIGJlIGZpbHRlcmVkIGJ5IHByb2plY3QuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNlYXJjaC1yZXN1bHRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBbY29tcGxleFZpZXddIElmIHRydWUgaXQgc2hvd3MgMiB3YXlzIHRvIGRpc3BsYXkgdGhlIHNlYXJjaCByZXN1bHRzOiBsaXN0IG9yIGdyaWQuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb21wbGV4Vmlldz86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbc2VhcmNoUXVlcnldIFNlYXJjaCBwYXJhbWV0ZXJzLiBJdCBjYW4gYmUgYSBncmF2c2VhcmNoIHF1ZXJ5IChleHRlbmRlZCBtb2RlKSBvciBzdHJpbmcgKGZ1bGx0ZXh0IG1vZGUpLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlYXJjaFF1ZXJ5Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtzZWFyY2hNb2RlXSBTZWFyY2ggbW9kZTogRXh0ZW5kZWQgb3IgZnVsbHRleHQuXG4gICAgICovXG4gICAgQElucHV0KCkgc2VhcmNoTW9kZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbcHJvamVjdElyaV0gUHJvamVjdCBJcmkuIFRvIGZpbHRlciB0aGUgcmVzdWx0cyBieSBwcm9qZWN0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHByb2plY3RJcmk/OiBzdHJpbmc7XG5cbiAgICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuICAgIG9mZnNldDogbnVtYmVyID0gMDtcbiAgICBtYXhPZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgZ3JhdlNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG4gICAgZ3JhdnNlYXJjaEdlbmVyYXRvcjogRXh0ZW5kZWRTZWFyY2hQYXJhbXM7XG4gICAgcmVzdWx0OiBSZWFkUmVzb3VyY2VbXSA9IFtdO1xuICAgIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICBudW1iZXJPZkFsbFJlc3VsdHM6IG51bWJlcjtcbiAgICByZXJlbmRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGJhZFJlcXVlc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsb2FkaW5nID0gdHJ1ZTtcbiAgICBlcnJvck1lc3NhZ2U6IEFwaVNlcnZpY2VFcnJvciA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICBwYWdpbmdMaW1pdDogbnVtYmVyID0gMjU7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHByaXZhdGUgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc2VhcmNoUGFyYW1zU2VydmljZTogU2VhcmNoUGFyYW1zU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJcbiAgICApIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9yb3V0ZS5wYXJhbU1hcC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocGFyYW1zOiBQYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHNlYXJjaCBtb2RlXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlYXJjaE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hNb2RlID0gcGFyYW1zLmdldCgnbW9kZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcHJvamVjdCBpcmkgXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5nZXQoJ3Byb2plY3QnKSAmJiAodGhpcy5wcm9qZWN0SXJpICE9PSBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmdldCgncHJvamVjdCcpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0SXJpID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5nZXQoJ3Byb2plY3QnKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaW5pdCBvZmZzZXQgIGFuZCByZXN1bHRcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBxdWVyeSBwYXJhbXMgZGVwZW5kaW5nIG9uIHRoZSBzZWFyY2ggbW9kZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdmdWxsdGV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHBhcmFtcy5nZXQoJ3EnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWRSZXF1ZXN0ID0gdGhpcy5zZWFyY2hRdWVyeS5sZW5ndGggPCAzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhdnNlYXJjaEdlbmVyYXRvciA9IHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuZ2V0U2VhcmNoUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWFyY2hRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2U2VhcmNoUXVlcnkgPSB0aGlzLnNlYXJjaFF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHJlc3VsdHNcbiAgICAgICAgICAgICAgICB0aGlzLnJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlc3VsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSBHcmF2c2VhcmNoIHF1ZXJ5IGZvciB0aGUgY3VycmVudCBvZmZzZXQuXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKSB7XG4gICAgICAgIGNvbnN0IGdyYXZzZWFyY2g6XG4gICAgICAgICAgICB8IHN0cmluZ1xuICAgICAgICAgICAgfCBib29sZWFuID0gdGhpcy5ncmF2c2VhcmNoR2VuZXJhdG9yLmdlbmVyYXRlR3JhdnNlYXJjaChcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldFxuICAgICAgICAgICAgKTtcbiAgICAgICAgaWYgKGdyYXZzZWFyY2ggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBubyB2YWxpZCBzZWFyY2ggcGFyYW1zIChhcHBsaWNhdGlvbiBoYXMgYmVlbiByZWxvYWRlZClcbiAgICAgICAgICAgIC8vIGdvIHRvIHJvb3RcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJyddLCB7IHJlbGF0aXZlVG86IHRoaXMuX3JvdXRlIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ncmF2U2VhcmNoUXVlcnkgPSA8c3RyaW5nPmdyYXZzZWFyY2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgc2VhcmNoIHJlc3VsdCBmcm9tIEtub3JhIC0gMiBjYXNlczogc2ltcGxlIHNlYXJjaCBhbmQgZXh0ZW5kZWQgc2VhcmNoXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UmVzdWx0KCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIHJlc2V0IHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEZVTExURVhUIFNFQVJDSFxuICAgICAgICBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZnVsbHRleHQnKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhZFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZS5lcnJvckluZm8gPVxuICAgICAgICAgICAgICAgICAgICAnQSBzZWFyY2ggdmFsdWUgaXMgZXhwZWN0ZWQgdG8gaGF2ZSBhdCBsZWFzdCBsZW5ndGggb2YgMyBjaGFyYWN0ZXJzLic7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXJlbmRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hQYXJhbXM7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0geyBsaW1pdFRvUHJvamVjdDogdGhpcy5wcm9qZWN0SXJpIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcmZvcm0gY291bnQgcXVlcnlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvRnVsbFRleHRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZkFsbFJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBmdWxsIHRleHQgc2VhcmNoXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuZG9GdWxsVGV4dFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaFJlc3VsdHMsIC8vIGZ1bmN0aW9uIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIHRoaXMuZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRVhURU5ERUQgU0VBUkNIXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICAvLyBwZXJmb3JtIGNvdW50IHF1ZXJ5XG4gICAgICAgICAgICBpZiAodGhpcy5vZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIC5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZTZWFyY2hRdWVyeVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOdW1iZXJPZkFsbFJlc3VsdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2VcbiAgICAgICAgICAgICAgICAuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHRoaXMuZ3JhdlNlYXJjaFF1ZXJ5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaFJlc3VsdHMsIC8vIGZ1bmN0aW9uIHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG5ldyBBcGlTZXJ2aWNlRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLmVycm9ySW5mbyA9IGBzZWFyY2ggbW9kZSBpbnZhbGlkOiAke1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoTW9kZVxuICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb252ZXJ0cyBzZWFyY2ggcmVzdWx0cyBmcm9tIEpTT04tTEQgdG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dIGFuZCByZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCBvbnRvbG9neSBlbnRpdGllcy5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBgc3Vic2NyaWJlYCBhcyBhIHBvaW50ZXIgKGluc3RlYWQgb2YgcmVkdW5kYW50bHkgZGVmaW5pbmcgdGhlIHNhbWUgbGFtYmRhIGZ1bmN0aW9uKS5cbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRSZXNvdXJjZXNTZXF1ZW5jZX0gc2VhcmNoUmVzdWx0IHRoZSBhbnN3ZXIgdG8gYSBzZWFyY2ggcmVxdWVzdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHByb2Nlc3NTZWFyY2hSZXN1bHRzID0gKHNlYXJjaFJlc3VsdDogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgIC8vIGFzc2lnbiBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBhIHZhcmlhYmxlIHNvIGl0IGNhbiBiZSB1c2VkIGluIHRoZSBjb21wb25lbnQncyB0ZW1wbGF0ZVxuICAgICAgICBpZiAodGhpcy5vbnRvbG9neUluZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gaW5pdCBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8gPSBzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgcmVzdWx0cyB0byBzZWFyY2ggcmVzdWx0c1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHRoaXMucmVzdWx0LmNvbmNhdChzZWFyY2hSZXN1bHQucmVzb3VyY2VzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NlYXJjaCByZXN1bHRzJywgdGhpcy5yZXN1bHQpO1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlcmVuZGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdG90YWwgbnVtYmVyIG9mIHJlc3VsdHMgcmV0dXJuZWQgYnkgYSBjb3VudCBxdWVyeS5cbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FwaVNlcnZpY2VSZXN1bHR9IGNvdW50UXVlcnlSZXN1bHQgdGhlIHJlc3BvbnNlIHRvIGEgY291bnQgcXVlcnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG93TnVtYmVyT2ZBbGxSZXN1bHRzID0gKGNvdW50UXVlcnlSZXN1bHQ6IENvdW50UXVlcnlSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgPSBjb3VudFF1ZXJ5UmVzdWx0Lm51bWJlck9mUmVzdWx0cztcblxuICAgICAgICBpZiAodGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgPiAwKSB7XG4gICAgICAgICAgICAvLyBvZmZzZXQgaXMgMC1iYXNlZFxuICAgICAgICAgICAgLy8gaWYgbnVtYmVyT2ZBbGxSZXN1bHRzIGVxdWFscyB0aGUgcGFnaW5nTGltaXQsIHRoZSBtYXguIG9mZnNldCBpcyAwXG4gICAgICAgICAgICB0aGlzLm1heE9mZnNldCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgKHRoaXMubnVtYmVyT2ZBbGxSZXN1bHRzIC0gMSkgLyB0aGlzLnBhZ2luZ0xpbWl0XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXhPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIG5leHQgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIFRoZSByZXN1bHRzIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlIGV4aXN0aW5nIG9uZXMuXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBsb2FkTW9yZShvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyB1cGRhdGUgdGhlIHBhZ2Ugb2Zmc2V0IHdoZW4gdGhlIGVuZCBvZiBzY3JvbGwgaXMgcmVhY2hlZCB0byBnZXQgdGhlIG5leHQgcGFnZSBvZiBzZWFyY2ggcmVzdWx0c1xuICAgICAgICBpZiAodGhpcy5vZmZzZXQgPCB0aGlzLm1heE9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdleHRlbmRlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0UmVzdWx0KCk7XG4gICAgfVxufVxuIl19