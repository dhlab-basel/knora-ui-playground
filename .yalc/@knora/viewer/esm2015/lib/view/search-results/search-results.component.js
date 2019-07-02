import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceError, KnoraConstants, SearchParamsService, SearchService } from '@knora/core';
/**
 * The search-results gets the search mode and parameters from routes or inputs,
 * and returns the corresponding resources that are displayed in a list or a grid.
 * The results can be filtered by project.
 */
let SearchResultsComponent = class SearchResultsComponent {
    constructor(_route, _searchService, _searchParamsService, _router) {
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
        this.processSearchResults = (searchResult) => {
            // assign ontology information to a variable so it can be used in the component's template
            if (this.ontologyInfo === undefined) {
                // init ontology information
                this.ontologyInfo = searchResult.ontologyInformation;
            }
            else {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(searchResult.ontologyInformation);
            }
            // append results to search results
            this.result = this.result.concat(searchResult.resources);
            // console.log('search results', this.result);
            this.loading = false;
            // this.rerender = false;
        };
        /**
         * Shows total number of results returned by a count query.
         * @ignore
         *
         * @param {ApiServiceResult} countQueryResult the response to a count query.
         */
        this.showNumberOfAllResults = (countQueryResult) => {
            this.numberOfAllResults = countQueryResult.numberOfResults;
            if (this.numberOfAllResults > 0) {
                // offset is 0-based
                // if numberOfAllResults equals the pagingLimit, the max. offset is 0
                this.maxOffset = Math.floor((this.numberOfAllResults - 1) / this.pagingLimit);
            }
            else {
                this.maxOffset = 0;
            }
        };
    }
    ngOnInit() {
    }
    ngOnChanges() {
        this._route.paramMap.subscribe((params) => {
            // get the search mode
            if (!this.searchMode) {
                this.searchMode = params.get('mode');
            }
            // get the project iri
            if (params.get('project') && (this.projectIri !== decodeURIComponent(params.get('project')))) {
                this.projectIri = decodeURIComponent(params.get('project'));
            }
            // init offset  and result
            this.offset = 0;
            this.result = [];
            // get query params depending on the search mode
            if (this.searchMode === 'fulltext') {
                this.searchQuery = params.get('q');
                this.badRequest = this.searchQuery.length < 3;
            }
            else if (this.searchMode === 'extended') {
                this.gravsearchGenerator = this._searchParamsService.getSearchParams();
                if (!this.searchQuery) {
                    this.generateGravsearchQuery();
                }
                else {
                    this.gravSearchQuery = this.searchQuery;
                }
            }
            // get results
            // this.rerender = true;
            this.getResult();
        });
    }
    /**
     * Generates the Gravsearch query for the current offset.
     * @ignore
     */
    generateGravsearchQuery() {
        const gravsearch = this.gravsearchGenerator.generateGravsearch(this.offset);
        if (gravsearch === false) {
            // no valid search params (application has been reloaded)
            // go to root
            this._router.navigate([''], { relativeTo: this._route });
            return;
        }
        else {
            this.gravSearchQuery = gravsearch;
        }
    }
    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     * @ignore
     */
    getResult() {
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
                let searchParams;
                if (this.projectIri !== undefined) {
                    searchParams = { limitToProject: this.projectIri };
                }
                if (this.offset === 0) {
                    // perform count query
                    this._searchService
                        .doFullTextSearchCountQueryCountQueryResult(this.searchQuery, searchParams)
                        .subscribe(this.showNumberOfAllResults, (error) => {
                        this.errorMessage = error;
                    });
                }
                // perform full text search
                this._searchService
                    .doFullTextSearchReadResourceSequence(this.searchQuery, this.offset, searchParams)
                    .subscribe(this.processSearchResults, // function pointer
                (error) => {
                    this.errorMessage = error;
                    console.log('error', error);
                    console.log('message', this.errorMessage);
                });
            }
            // EXTENDED SEARCH
        }
        else if (this.searchMode === 'extended') {
            // perform count query
            if (this.offset === 0) {
                this._searchService
                    .doExtendedSearchCountQueryCountQueryResult(this.gravSearchQuery)
                    .subscribe(this.showNumberOfAllResults, (error) => {
                    this.errorMessage = error;
                });
            }
            this._searchService
                .doExtendedSearchReadResourceSequence(this.gravSearchQuery)
                .subscribe(this.processSearchResults, // function pointer
            (error) => {
                this.errorMessage = error;
            });
        }
        else {
            this.errorMessage = new ApiServiceError();
            this.errorMessage.errorInfo = `search mode invalid: ${this.searchMode}`;
        }
    }
    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     * @ignore
     *
     * @param {number} offset
     * @returns void
     */
    loadMore(offset) {
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
    }
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
export { SearchResultsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQVUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBMEMsY0FBYyxFQUE0RCxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFcE07Ozs7R0FJRztBQU1ILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBd0MvQixZQUNZLE1BQXNCLEVBQ3RCLGNBQTZCLEVBQzdCLG9CQUF5QyxFQUN6QyxPQUFlO1FBSGYsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBM0MzQjs7OztXQUlHO1FBQ00sZ0JBQVcsR0FBYSxLQUFLLENBQUM7UUFvQnZDLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUd0QixXQUFNLEdBQW1CLEVBQUUsQ0FBQztRQUc1Qiw2QkFBNkI7UUFDN0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsaUJBQVksR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUN0RCxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQW1LekI7Ozs7Ozs7V0FPRztRQUNLLHlCQUFvQixHQUFHLENBQUMsWUFBbUMsRUFBRSxFQUFFO1lBQ25FLDBGQUEwRjtZQUMxRixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUNqQyw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLG1CQUFtQixDQUFDO2FBQ3hEO2lCQUFNO2dCQUNILDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FDdkMsWUFBWSxDQUFDLG1CQUFtQixDQUNuQyxDQUFDO2FBQ0w7WUFDRCxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQsOENBQThDO1lBRTlDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLHlCQUF5QjtRQUM3QixDQUFDLENBQUE7UUFFRDs7Ozs7V0FLRztRQUNLLDJCQUFzQixHQUFHLENBQUMsZ0JBQWtDLEVBQUUsRUFBRTtZQUNwRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO1lBRTNELElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTtnQkFDN0Isb0JBQW9CO2dCQUNwQixxRUFBcUU7Z0JBQ3JFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDdkIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDbkQsQ0FBQzthQUNMO2lCQUFNO2dCQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFBO0lBdk1ELENBQUM7SUFFRCxRQUFRO0lBRVIsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQzFCLENBQUMsTUFBYyxFQUFFLEVBQUU7WUFDZixzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QztZQUVELHNCQUFzQjtZQUN0QixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxRixJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMvRDtZQUVELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVqQixnREFBZ0Q7WUFDaEQsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNqRDtpQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7aUJBQ2xDO3FCQUFNO29CQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDM0M7YUFDSjtZQUVELGNBQWM7WUFDZCx3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUdEOzs7T0FHRztJQUNLLHVCQUF1QjtRQUMzQixNQUFNLFVBQVUsR0FFQSxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQ25ELElBQUksQ0FBQyxNQUFNLENBQ2QsQ0FBQztRQUNOLElBQUksVUFBVSxLQUFLLEtBQUssRUFBRTtZQUN0Qix5REFBeUQ7WUFDekQsYUFBYTtZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDekQsT0FBTztTQUNWO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxHQUFXLFVBQVUsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxTQUFTO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1FBRTlCLGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ2hDLHdCQUF3QjtZQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO29CQUN2QixxRUFBcUUsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLHlCQUF5QjthQUM1QjtpQkFBTTtnQkFFSCxJQUFJLFlBQVksQ0FBQztnQkFFakIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtvQkFDL0IsWUFBWSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDdEQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDbkIsc0JBQXNCO29CQUN0QixJQUFJLENBQUMsY0FBYzt5QkFDZCwwQ0FBMEMsQ0FDdkMsSUFBSSxDQUFDLFdBQVcsRUFDaEIsWUFBWSxDQUNmO3lCQUNBLFNBQVMsQ0FDTixJQUFJLENBQUMsc0JBQXNCLEVBQzNCLENBQUMsS0FBc0IsRUFBRSxFQUFFO3dCQUN2QixJQUFJLENBQUMsWUFBWSxHQUFvQixLQUFLLENBQUM7b0JBQy9DLENBQUMsQ0FDSixDQUFDO2lCQUNUO2dCQUVELDJCQUEyQjtnQkFDM0IsSUFBSSxDQUFDLGNBQWM7cUJBQ2Qsb0NBQW9DLENBQ2pDLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQ1gsWUFBWSxDQUNmO3FCQUNBLFNBQVMsQ0FDTixJQUFJLENBQUMsb0JBQW9CLEVBQUUsbUJBQW1CO2dCQUM5QyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBb0IsS0FBSyxDQUFDO29CQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLENBQ0osQ0FBQzthQUNUO1lBRUQsa0JBQWtCO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUN2QyxzQkFBc0I7WUFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGNBQWM7cUJBQ2QsMENBQTBDLENBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQ3ZCO3FCQUNBLFNBQVMsQ0FDTixJQUFJLENBQUMsc0JBQXNCLEVBQzNCLENBQUMsS0FBc0IsRUFBRSxFQUFFO29CQUN2QixJQUFJLENBQUMsWUFBWSxHQUFvQixLQUFLLENBQUM7Z0JBQy9DLENBQUMsQ0FDSixDQUFDO2FBQ1Q7WUFDRCxJQUFJLENBQUMsY0FBYztpQkFDZCxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUMxRCxTQUFTLENBQ04sSUFBSSxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQjtZQUM5QyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBb0IsS0FBSyxDQUFDO1lBQy9DLENBQUMsQ0FDSixDQUFDO1NBQ1Q7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyx3QkFDMUIsSUFBSSxDQUFDLFVBQ0wsRUFBRSxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBaUREOzs7Ozs7O09BT0c7SUFDSCxRQUFRLENBQUMsTUFBYztRQUNuQixrR0FBa0c7UUFDbEcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ2hDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDSixDQUFBO0FBeFFZO0lBQVIsS0FBSyxFQUFFOzsyREFBK0I7QUFNOUI7SUFBUixLQUFLLEVBQUU7OzJEQUFzQjtBQU1yQjtJQUFSLEtBQUssRUFBRTs7MERBQXFCO0FBTXBCO0lBQVIsS0FBSyxFQUFFOzswREFBcUI7QUF4QnBCLHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLGdxR0FBOEM7O0tBRWpELENBQUM7NkNBMENzQixjQUFjO1FBQ04sYUFBYTtRQUNQLG1CQUFtQjtRQUNoQyxNQUFNO0dBNUNsQixzQkFBc0IsQ0E4UWxDO1NBOVFZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBDb3VudFF1ZXJ5UmVzdWx0LCBFeHRlbmRlZFNlYXJjaFBhcmFtcywgS25vcmFDb25zdGFudHMsIE9udG9sb2d5SW5mb3JtYXRpb24sIFJlYWRSZXNvdXJjZSwgUmVhZFJlc291cmNlc1NlcXVlbmNlLCBTZWFyY2hQYXJhbXNTZXJ2aWNlLCBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBzZWFyY2gtcmVzdWx0cyBnZXRzIHRoZSBzZWFyY2ggbW9kZSBhbmQgcGFyYW1ldGVycyBmcm9tIHJvdXRlcyBvciBpbnB1dHMsXG4gKiBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZXNvdXJjZXMgdGhhdCBhcmUgZGlzcGxheWVkIGluIGEgbGlzdCBvciBhIGdyaWQuXG4gKiBUaGUgcmVzdWx0cyBjYW4gYmUgZmlsdGVyZWQgYnkgcHJvamVjdC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc2VhcmNoLXJlc3VsdHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gW2NvbXBsZXhWaWV3XSBJZiB0cnVlIGl0IHNob3dzIDIgd2F5cyB0byBkaXNwbGF5IHRoZSBzZWFyY2ggcmVzdWx0czogbGlzdCBvciBncmlkLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KCkgY29tcGxleFZpZXc/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW3NlYXJjaFF1ZXJ5XSBTZWFyY2ggcGFyYW1ldGVycy4gSXQgY2FuIGJlIGEgZ3JhdnNlYXJjaCBxdWVyeSAoZXh0ZW5kZWQgbW9kZSkgb3Igc3RyaW5nIChmdWxsdGV4dCBtb2RlKS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWFyY2hRdWVyeT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbc2VhcmNoTW9kZV0gU2VhcmNoIG1vZGU6IEV4dGVuZGVkIG9yIGZ1bGx0ZXh0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlYXJjaE1vZGU/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW3Byb2plY3RJcmldIFByb2plY3QgSXJpLiBUbyBmaWx0ZXIgdGhlIHJlc3VsdHMgYnkgcHJvamVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcm9qZWN0SXJpPzogc3RyaW5nO1xuXG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcbiAgICBvZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgbWF4T2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgIGdyYXZTZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIGdyYXZzZWFyY2hHZW5lcmF0b3I6IEV4dGVuZGVkU2VhcmNoUGFyYW1zO1xuICAgIHJlc3VsdDogUmVhZFJlc291cmNlW10gPSBbXTtcbiAgICBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb247XG4gICAgbnVtYmVyT2ZBbGxSZXN1bHRzOiBudW1iZXI7XG4gICAgLy8gcmVyZW5kZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBiYWRSZXF1ZXN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgbG9hZGluZyA9IHRydWU7XG4gICAgZXJyb3JNZXNzYWdlOiBBcGlTZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgcGFnaW5nTGltaXQ6IG51bWJlciA9IDI1O1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZS5wYXJhbU1hcC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocGFyYW1zOiBQYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHNlYXJjaCBtb2RlXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlYXJjaE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hNb2RlID0gcGFyYW1zLmdldCgnbW9kZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcHJvamVjdCBpcmlcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmdldCgncHJvamVjdCcpICYmICh0aGlzLnByb2plY3RJcmkgIT09IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbXMuZ2V0KCdwcm9qZWN0JykpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RJcmkgPSBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmdldCgncHJvamVjdCcpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpbml0IG9mZnNldCAgYW5kIHJlc3VsdFxuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHF1ZXJ5IHBhcmFtcyBkZXBlbmRpbmcgb24gdGhlIHNlYXJjaCBtb2RlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2Z1bGx0ZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gcGFyYW1zLmdldCgncScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhZFJlcXVlc3QgPSB0aGlzLnNlYXJjaFF1ZXJ5Lmxlbmd0aCA8IDM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdleHRlbmRlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2c2VhcmNoR2VuZXJhdG9yID0gdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5nZXRTZWFyY2hQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlYXJjaFF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZTZWFyY2hRdWVyeSA9IHRoaXMuc2VhcmNoUXVlcnk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgcmVzdWx0c1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVyZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVzdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIEdyYXZzZWFyY2ggcXVlcnkgZm9yIHRoZSBjdXJyZW50IG9mZnNldC5cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeSgpIHtcbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaDpcbiAgICAgICAgICAgIHwgc3RyaW5nXG4gICAgICAgICAgICB8IGJvb2xlYW4gPSB0aGlzLmdyYXZzZWFyY2hHZW5lcmF0b3IuZ2VuZXJhdGVHcmF2c2VhcmNoKFxuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0XG4gICAgICAgICAgICApO1xuICAgICAgICBpZiAoZ3JhdnNlYXJjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIG5vIHZhbGlkIHNlYXJjaCBwYXJhbXMgKGFwcGxpY2F0aW9uIGhhcyBiZWVuIHJlbG9hZGVkKVxuICAgICAgICAgICAgLy8gZ28gdG8gcm9vdFxuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5fcm91dGUgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyYXZTZWFyY2hRdWVyeSA9IDxzdHJpbmc+Z3JhdnNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzZWFyY2ggcmVzdWx0IGZyb20gS25vcmEgLSAyIGNhc2VzOiBzaW1wbGUgc2VhcmNoIGFuZCBleHRlbmRlZCBzZWFyY2hcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXN1bHQoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gcmVzZXQgdGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gRlVMTFRFWFQgU0VBUkNIXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdmdWxsdGV4dCcpIHtcbiAgICAgICAgICAgIC8vIHRoaXMucmVyZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYmFkUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlLmVycm9ySW5mbyA9XG4gICAgICAgICAgICAgICAgICAgICdBIHNlYXJjaCB2YWx1ZSBpcyBleHBlY3RlZCB0byBoYXZlIGF0IGxlYXN0IGxlbmd0aCBvZiAzIGNoYXJhY3RlcnMuJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlcmVuZGVyID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaFBhcmFtcztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSB7IGxpbWl0VG9Qcm9qZWN0OiB0aGlzLnByb2plY3RJcmkgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBjb3VudCBxdWVyeVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9GdWxsVGV4dFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd051bWJlck9mQWxsUmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxBcGlTZXJ2aWNlRXJyb3I+ZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBwZXJmb3JtIGZ1bGwgdGV4dCBzZWFyY2hcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIC5kb0Z1bGxUZXh0U2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VhcmNoUmVzdWx0cywgLy8gZnVuY3Rpb24gcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxBcGlTZXJ2aWNlRXJyb3I+ZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlJywgdGhpcy5lcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFWFRFTkRFRCBTRUFSQ0hcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaE1vZGUgPT09ICdleHRlbmRlZCcpIHtcbiAgICAgICAgICAgIC8vIHBlcmZvcm0gY291bnQgcXVlcnlcbiAgICAgICAgICAgIGlmICh0aGlzLm9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgLmRvRXh0ZW5kZWRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhdlNlYXJjaFF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd051bWJlck9mQWxsUmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgIC5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2UodGhpcy5ncmF2U2VhcmNoUXVlcnkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzU2VhcmNoUmVzdWx0cywgLy8gZnVuY3Rpb24gcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSA8QXBpU2VydmljZUVycm9yPmVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UuZXJyb3JJbmZvID0gYHNlYXJjaCBtb2RlIGludmFsaWQ6ICR7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hNb2RlXG4gICAgICAgICAgICAgICAgfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvbnZlcnRzIHNlYXJjaCByZXN1bHRzIGZyb20gSlNPTi1MRCB0byBhIFtbUmVhZFJlc291cmNlc1NlcXVlbmNlXV0gYW5kIHJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IG9udG9sb2d5IGVudGl0aWVzLlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIGBzdWJzY3JpYmVgIGFzIGEgcG9pbnRlciAoaW5zdGVhZCBvZiByZWR1bmRhbnRseSBkZWZpbmluZyB0aGUgc2FtZSBsYW1iZGEgZnVuY3Rpb24pLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhZFJlc291cmNlc1NlcXVlbmNlfSBzZWFyY2hSZXN1bHQgdGhlIGFuc3dlciB0byBhIHNlYXJjaCByZXF1ZXN0LlxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvY2Vzc1NlYXJjaFJlc3VsdHMgPSAoc2VhcmNoUmVzdWx0OiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgLy8gYXNzaWduIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIGEgdmFyaWFibGUgc28gaXQgY2FuIGJlIHVzZWQgaW4gdGhlIGNvbXBvbmVudCdzIHRlbXBsYXRlXG4gICAgICAgIGlmICh0aGlzLm9udG9sb2d5SW5mbyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBpbml0IG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mbyA9IHNlYXJjaFJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mby51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKFxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFwcGVuZCByZXN1bHRzIHRvIHNlYXJjaCByZXN1bHRzXG4gICAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5yZXN1bHQuY29uY2F0KHNlYXJjaFJlc3VsdC5yZXNvdXJjZXMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc2VhcmNoIHJlc3VsdHMnLCB0aGlzLnJlc3VsdCk7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMucmVyZW5kZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0b3RhbCBudW1iZXIgb2YgcmVzdWx0cyByZXR1cm5lZCBieSBhIGNvdW50IHF1ZXJ5LlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXBpU2VydmljZVJlc3VsdH0gY291bnRRdWVyeVJlc3VsdCB0aGUgcmVzcG9uc2UgdG8gYSBjb3VudCBxdWVyeS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNob3dOdW1iZXJPZkFsbFJlc3VsdHMgPSAoY291bnRRdWVyeVJlc3VsdDogQ291bnRRdWVyeVJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLm51bWJlck9mQWxsUmVzdWx0cyA9IGNvdW50UXVlcnlSZXN1bHQubnVtYmVyT2ZSZXN1bHRzO1xuXG4gICAgICAgIGlmICh0aGlzLm51bWJlck9mQWxsUmVzdWx0cyA+IDApIHtcbiAgICAgICAgICAgIC8vIG9mZnNldCBpcyAwLWJhc2VkXG4gICAgICAgICAgICAvLyBpZiBudW1iZXJPZkFsbFJlc3VsdHMgZXF1YWxzIHRoZSBwYWdpbmdMaW1pdCwgdGhlIG1heC4gb2Zmc2V0IGlzIDBcbiAgICAgICAgICAgIHRoaXMubWF4T2Zmc2V0ID0gTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAodGhpcy5udW1iZXJPZkFsbFJlc3VsdHMgLSAxKSAvIHRoaXMucGFnaW5nTGltaXRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1heE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgbmV4dCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogVGhlIHJlc3VsdHMgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgZXhpc3Rpbmcgb25lcy5cbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGxvYWRNb3JlKG9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcGFnZSBvZmZzZXQgd2hlbiB0aGUgZW5kIG9mIHNjcm9sbCBpcyByZWFjaGVkIHRvIGdldCB0aGUgbmV4dCBwYWdlIG9mIHNlYXJjaCByZXN1bHRzXG4gICAgICAgIGlmICh0aGlzLm9mZnNldCA8IHRoaXMubWF4T2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2V4dGVuZGVkJykge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRSZXN1bHQoKTtcbiAgICB9XG59XG4iXX0=