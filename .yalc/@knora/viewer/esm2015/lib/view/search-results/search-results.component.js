import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceError, KnoraConstants, SearchParamsService, SearchService } from '@knora/core';
/**
 * The search-results gets the search mode and parameters from routes or inputs,
 * and returns the corresponding resources that are displayed in a list or a grid.
 * The results can be filtered by project.
 */
export class SearchResultsComponent {
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
            this.rerender = false;
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
            this.rerender = true;
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
            this.rerender = true;
            if (this.badRequest) {
                this.errorMessage = new ApiServiceError();
                this.errorMessage.errorInfo =
                    'A search value is expected to have at least length of 3 characters.';
                this.loading = false;
                this.rerender = false;
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
}
SearchResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-search-results',
                template: "<kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n<div *ngIf=\"!rerender && !badRequest\">\n\n    <div *ngIf=\"numberOfAllResults !== 0 && result; else noResult\">\n\n        <mat-tab-group animationDuration=\"0ms\" [selectedIndex]=\"1\">\n            <mat-tab disabled>\n                <ng-template mat-tab-label>\n                    <!-- <mat-icon class=\"tab-icon\">hashtag</mat-icon> -->\n                    <h4 class=\"search-results-title\">Results: {{numberOfAllResults}}</h4>\n                </ng-template>\n            </mat-tab>\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_list</mat-icon>\n                    List\n                </ng-template>\n                <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-list-view>\n            </mat-tab>\n\n            <!-- in caase of complexView: show tab to switch to grid view -->\n            <mat-tab *ngIf=\"complexView\">\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_module</mat-icon>\n                    Grid\n                </ng-template>\n                <kui-grid-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-grid-view>\n            </mat-tab>\n            <!-- not yet implemented! --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">table_chart</mat-icon>\n                    Table\n                </ng-template>\n                <kui-table-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\">\n                </kui-table-view>\n            </mat-tab>\n            -->\n\n            <!-- the following tab we don't need anymore? The GravSearch view will be part of the export menu --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">code</mat-icon>\n                    Gravsearch\n                </ng-template>\n                <kui-gravsearch-view></kui-gravsearch-view>\n            </mat-tab>\n            -->\n\n        </mat-tab-group>\n        <!-- <div>\n            <p>List view n\u00B02</p>\n            <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\" *ngIf=\"!complexView\"></kui-list-view>\n        </div> -->\n\n        <div class=\"load-panel\" *ngIf=\"result.length > 0\">\n            <button mat-flat-button color=\"primary\" class=\"link center\" (click)=\"loadMore(offset)\" *ngIf=\"offset < maxOffset\">Load more\n                <mat-icon>keyboard_arrow_down</mat-icon>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- In case of 0 result -->\n    <ng-template #noResult>\n        <kui-message [message]=\"{status: 404, statusMsg: 'No results', statusText: 'Sorry, but we couldn\\'t find any results matching your search'}\" [medium]=\"true\"></kui-message>\n        <!-- <p><strong>No result</strong></p> -->\n    </ng-template>\n\n</div>\n\n<!-- Error message -->\n<kui-message *ngIf=\"errorMessage\" [message]=\"{status: 400, statusText: errorMessage.errorInfo}\" [medium]=\"true\">\n</kui-message>\n",
                styles: [".load-panel{width:100%}.load-panel .center{display:block;line-height:24px;margin:12px auto}.tab-icon{margin-right:8px}"]
            }] }
];
/** @nocollapse */
SearchResultsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: SearchService },
    { type: SearchParamsService },
    { type: Router }
];
SearchResultsComponent.propDecorators = {
    complexView: [{ type: Input }],
    searchQuery: [{ type: Input }],
    searchMode: [{ type: Input }],
    projectIri: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFVLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQTBDLGNBQWMsRUFBNEQsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3BNOzs7O0dBSUc7QUFNSCxNQUFNLE9BQU8sc0JBQXNCO0lBd0MvQixZQUNZLE1BQXNCLEVBQ3RCLGNBQTZCLEVBQzdCLG9CQUF5QyxFQUN6QyxPQUFlO1FBSGYsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBM0MzQjs7OztXQUlHO1FBQ00sZ0JBQVcsR0FBYSxLQUFLLENBQUM7UUFvQnZDLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUd0QixXQUFNLEdBQW1CLEVBQUUsQ0FBQztRQUc1QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGlCQUFZLEdBQW9CLElBQUksZUFBZSxFQUFFLENBQUM7UUFDdEQsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUErSnpCOzs7Ozs7O1dBT0c7UUFDSyx5QkFBb0IsR0FBRyxDQUFDLFlBQW1DLEVBQUUsRUFBRTtZ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O1lBQ0QsSUFBSSxDQUFDLGNBQWM7aUJBQ2Qsb0NBQW9DLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDMUQsU0FBUyxDQUNOLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUI7WUFDOUMsQ0FBQyxLQUFzQixFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQW9CLEtBQUssQ0FBQztZQUMvQyxDQUFDLENBQ0osQ0FBQztTQUNUO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsd0JBQzFCLElBQUksQ0FBQyxVQUNMLEVBQUUsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQWlERDs7Ozs7OztPQU9HO0lBQ0gsUUFBUSxDQUFDLE1BQWM7UUFDbkIsa0dBQWtHO1FBQ2xHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7WUE5UUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLHNuR0FBOEM7O2FBRWpEOzs7O1lBYlEsY0FBYztZQUMwSSxhQUFhO1lBQWxDLG1CQUFtQjtZQUQ5SCxNQUFNOzs7MEJBb0JsQyxLQUFLOzBCQU1MLEtBQUs7eUJBTUwsS0FBSzt5QkFNTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBDb3VudFF1ZXJ5UmVzdWx0LCBFeHRlbmRlZFNlYXJjaFBhcmFtcywgS25vcmFDb25zdGFudHMsIE9udG9sb2d5SW5mb3JtYXRpb24sIFJlYWRSZXNvdXJjZSwgUmVhZFJlc291cmNlc1NlcXVlbmNlLCBTZWFyY2hQYXJhbXNTZXJ2aWNlLCBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogVGhlIHNlYXJjaC1yZXN1bHRzIGdldHMgdGhlIHNlYXJjaCBtb2RlIGFuZCBwYXJhbWV0ZXJzIGZyb20gcm91dGVzIG9yIGlucHV0cyxcbiAqIGFuZCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHJlc291cmNlcyB0aGF0IGFyZSBkaXNwbGF5ZWQgaW4gYSBsaXN0IG9yIGEgZ3JpZC5cbiAqIFRoZSByZXN1bHRzIGNhbiBiZSBmaWx0ZXJlZCBieSBwcm9qZWN0LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1zZWFyY2gtcmVzdWx0cycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlc3VsdHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gW2NvbXBsZXhWaWV3XSBJZiB0cnVlIGl0IHNob3dzIDIgd2F5cyB0byBkaXNwbGF5IHRoZSBzZWFyY2ggcmVzdWx0czogbGlzdCBvciBncmlkLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KCkgY29tcGxleFZpZXc/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW3NlYXJjaFF1ZXJ5XSBTZWFyY2ggcGFyYW1ldGVycy4gSXQgY2FuIGJlIGEgZ3JhdnNlYXJjaCBxdWVyeSAoZXh0ZW5kZWQgbW9kZSkgb3Igc3RyaW5nIChmdWxsdGV4dCBtb2RlKS5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWFyY2hRdWVyeT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbc2VhcmNoTW9kZV0gU2VhcmNoIG1vZGU6IEV4dGVuZGVkIG9yIGZ1bGx0ZXh0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlYXJjaE1vZGU/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gW3Byb2plY3RJcmldIFByb2plY3QgSXJpLiBUbyBmaWx0ZXIgdGhlIHJlc3VsdHMgYnkgcHJvamVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBwcm9qZWN0SXJpPzogc3RyaW5nO1xuXG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcbiAgICBvZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgbWF4T2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgIGdyYXZTZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIGdyYXZzZWFyY2hHZW5lcmF0b3I6IEV4dGVuZGVkU2VhcmNoUGFyYW1zO1xuICAgIHJlc3VsdDogUmVhZFJlc291cmNlW10gPSBbXTtcbiAgICBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb247XG4gICAgbnVtYmVyT2ZBbGxSZXN1bHRzOiBudW1iZXI7XG4gICAgcmVyZW5kZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBiYWRSZXF1ZXN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgbG9hZGluZyA9IHRydWU7XG4gICAgZXJyb3JNZXNzYWdlOiBBcGlTZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgcGFnaW5nTGltaXQ6IG51bWJlciA9IDI1O1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fcm91dGUucGFyYW1NYXAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHBhcmFtczogUGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBzZWFyY2ggbW9kZVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWFyY2hNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoTW9kZSA9IHBhcmFtcy5nZXQoJ21vZGUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHByb2plY3QgaXJpIFxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZ2V0KCdwcm9qZWN0JykgJiYgKHRoaXMucHJvamVjdElyaSAhPT0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5nZXQoJ3Byb2plY3QnKSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdElyaSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbXMuZ2V0KCdwcm9qZWN0JykpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGluaXQgb2Zmc2V0ICBhbmQgcmVzdWx0XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgcXVlcnkgcGFyYW1zIGRlcGVuZGluZyBvbiB0aGUgc2VhcmNoIG1vZGVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZnVsbHRleHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSBwYXJhbXMuZ2V0KCdxJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFkUmVxdWVzdCA9IHRoaXMuc2VhcmNoUXVlcnkubGVuZ3RoIDwgMztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2V4dGVuZGVkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZzZWFyY2hHZW5lcmF0b3IgPSB0aGlzLl9zZWFyY2hQYXJhbXNTZXJ2aWNlLmdldFNlYXJjaFBhcmFtcygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VhcmNoUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVHcmF2c2VhcmNoUXVlcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JhdlNlYXJjaFF1ZXJ5ID0gdGhpcy5zZWFyY2hRdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdldCByZXN1bHRzXG4gICAgICAgICAgICAgICAgdGhpcy5yZXJlbmRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZXN1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB0aGUgR3JhdnNlYXJjaCBxdWVyeSBmb3IgdGhlIGN1cnJlbnQgb2Zmc2V0LlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5KCkge1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoOlxuICAgICAgICAgICAgfCBzdHJpbmdcbiAgICAgICAgICAgIHwgYm9vbGVhbiA9IHRoaXMuZ3JhdnNlYXJjaEdlbmVyYXRvci5nZW5lcmF0ZUdyYXZzZWFyY2goXG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXRcbiAgICAgICAgICAgICk7XG4gICAgICAgIGlmIChncmF2c2VhcmNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gbm8gdmFsaWQgc2VhcmNoIHBhcmFtcyAoYXBwbGljYXRpb24gaGFzIGJlZW4gcmVsb2FkZWQpXG4gICAgICAgICAgICAvLyBnbyB0byByb290XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycnXSwgeyByZWxhdGl2ZVRvOiB0aGlzLl9yb3V0ZSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ3JhdlNlYXJjaFF1ZXJ5ID0gPHN0cmluZz5ncmF2c2VhcmNoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHNlYXJjaCByZXN1bHQgZnJvbSBLbm9yYSAtIDIgY2FzZXM6IHNpbXBsZSBzZWFyY2ggYW5kIGV4dGVuZGVkIHNlYXJjaFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc3VsdCgpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyByZXNldCB0aGUgZXJyb3IgbWVzc2FnZVxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBGVUxMVEVYVCBTRUFSQ0hcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2Z1bGx0ZXh0Jykge1xuICAgICAgICAgICAgdGhpcy5yZXJlbmRlciA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5iYWRSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UuZXJyb3JJbmZvID1cbiAgICAgICAgICAgICAgICAgICAgJ0Egc2VhcmNoIHZhbHVlIGlzIGV4cGVjdGVkIHRvIGhhdmUgYXQgbGVhc3QgbGVuZ3RoIG9mIDMgY2hhcmFjdGVycy4nO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVyZW5kZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoUGFyYW1zO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvamVjdElyaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtcyA9IHsgbGltaXRUb1Byb2plY3Q6IHRoaXMucHJvamVjdElyaSB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwZXJmb3JtIGNvdW50IHF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb0Z1bGxUZXh0U2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TnVtYmVyT2ZBbGxSZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHBlcmZvcm0gZnVsbCB0ZXh0IHNlYXJjaFxuICAgICAgICAgICAgICAgIHRoaXMuX3NlYXJjaFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgLmRvRnVsbFRleHRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtc1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2hSZXN1bHRzLCAvLyBmdW5jdGlvbiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gPEFwaVNlcnZpY2VFcnJvcj5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21lc3NhZ2UnLCB0aGlzLmVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVYVEVOREVEIFNFQVJDSFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoTW9kZSA9PT0gJ2V4dGVuZGVkJykge1xuICAgICAgICAgICAgLy8gcGVyZm9ybSBjb3VudCBxdWVyeVxuICAgICAgICAgICAgaWYgKHRoaXMub2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VhcmNoU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2U2VhcmNoUXVlcnlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TnVtYmVyT2ZBbGxSZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxBcGlTZXJ2aWNlRXJyb3I+ZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmRvRXh0ZW5kZWRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZSh0aGlzLmdyYXZTZWFyY2hRdWVyeSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2hSZXN1bHRzLCAvLyBmdW5jdGlvbiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IDxBcGlTZXJ2aWNlRXJyb3I+ZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZS5lcnJvckluZm8gPSBgc2VhcmNoIG1vZGUgaW52YWxpZDogJHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaE1vZGVcbiAgICAgICAgICAgICAgICB9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ29udmVydHMgc2VhcmNoIHJlc3VsdHMgZnJvbSBKU09OLUxEIHRvIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXSBhbmQgcmVxdWVzdHMgaW5mb3JtYXRpb24gYWJvdXQgb250b2xvZ3kgZW50aXRpZXMuXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gYHN1YnNjcmliZWAgYXMgYSBwb2ludGVyIChpbnN0ZWFkIG9mIHJlZHVuZGFudGx5IGRlZmluaW5nIHRoZSBzYW1lIGxhbWJkYSBmdW5jdGlvbikuXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkUmVzb3VyY2VzU2VxdWVuY2V9IHNlYXJjaFJlc3VsdCB0aGUgYW5zd2VyIHRvIGEgc2VhcmNoIHJlcXVlc3QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcm9jZXNzU2VhcmNoUmVzdWx0cyA9IChzZWFyY2hSZXN1bHQ6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAvLyBhc3NpZ24gb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gYSB2YXJpYWJsZSBzbyBpdCBjYW4gYmUgdXNlZCBpbiB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGVcbiAgICAgICAgaWYgKHRoaXMub250b2xvZ3lJbmZvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGluaXQgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvID0gc2VhcmNoUmVzdWx0Lm9udG9sb2d5SW5mb3JtYXRpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0Lm9udG9sb2d5SW5mb3JtYXRpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXBwZW5kIHJlc3VsdHMgdG8gc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLnJlc3VsdC5jb25jYXQoc2VhcmNoUmVzdWx0LnJlc291cmNlcyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZWFyY2ggcmVzdWx0cycsIHRoaXMucmVzdWx0KTtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXJlbmRlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRvdGFsIG51bWJlciBvZiByZXN1bHRzIHJldHVybmVkIGJ5IGEgY291bnQgcXVlcnkuXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcGlTZXJ2aWNlUmVzdWx0fSBjb3VudFF1ZXJ5UmVzdWx0IHRoZSByZXNwb25zZSB0byBhIGNvdW50IHF1ZXJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvd051bWJlck9mQWxsUmVzdWx0cyA9IChjb3VudFF1ZXJ5UmVzdWx0OiBDb3VudFF1ZXJ5UmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMubnVtYmVyT2ZBbGxSZXN1bHRzID0gY291bnRRdWVyeVJlc3VsdC5udW1iZXJPZlJlc3VsdHM7XG5cbiAgICAgICAgaWYgKHRoaXMubnVtYmVyT2ZBbGxSZXN1bHRzID4gMCkge1xuICAgICAgICAgICAgLy8gb2Zmc2V0IGlzIDAtYmFzZWRcbiAgICAgICAgICAgIC8vIGlmIG51bWJlck9mQWxsUmVzdWx0cyBlcXVhbHMgdGhlIHBhZ2luZ0xpbWl0LCB0aGUgbWF4LiBvZmZzZXQgaXMgMFxuICAgICAgICAgICAgdGhpcy5tYXhPZmZzZXQgPSBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICh0aGlzLm51bWJlck9mQWxsUmVzdWx0cyAtIDEpIC8gdGhpcy5wYWdpbmdMaW1pdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWF4T2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBuZXh0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBUaGUgcmVzdWx0cyB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZSBleGlzdGluZyBvbmVzLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgbG9hZE1vcmUob2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwYWdlIG9mZnNldCB3aGVuIHRoZSBlbmQgb2Ygc2Nyb2xsIGlzIHJlYWNoZWQgdG8gZ2V0IHRoZSBuZXh0IHBhZ2Ugb2Ygc2VhcmNoIHJlc3VsdHNcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0IDwgdGhpcy5tYXhPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hNb2RlID09PSAnZXh0ZW5kZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldFJlc3VsdCgpO1xuICAgIH1cbn1cbiJdfQ==