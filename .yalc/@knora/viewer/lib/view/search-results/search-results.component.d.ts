import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceError, ExtendedSearchParams, KnoraConstants, OntologyInformation, ReadResource, SearchParamsService, SearchService } from '@knora/core';
/**
 * The search-results gets the search mode and parameters from routes or inputs,
 * and returns the corresponding resources that are displayed in a list or a grid.
 * The results can be filtered by project.
 */
export declare class SearchResultsComponent implements OnInit {
    private _route;
    private _searchService;
    private _searchParamsService;
    private _router;
    /**
     *
     * @param  {boolean} [complexView] If true it shows 2 ways to display the search results: list or grid.
     *
     */
    complexView?: boolean;
    /**
     *
     * @param  {string} [searchQuery] Search parameters. It can be a gravsearch query (extended mode) or string (fulltext mode).
     */
    searchQuery?: string;
    /**
     *
     * @param  {string} [searchMode] Search mode: Extended or fulltext.
     */
    searchMode?: string;
    /**
     *
     * @param  {string} [projectIri] Project Iri. To filter the results by project.
     */
    projectIri?: string;
    KnoraConstants: typeof KnoraConstants;
    offset: number;
    maxOffset: number;
    gravSearchQuery: string;
    gravsearchGenerator: ExtendedSearchParams;
    result: ReadResource[];
    ontologyInfo: OntologyInformation;
    numberOfAllResults: number;
    rerender: boolean;
    badRequest: boolean;
    loading: boolean;
    errorMessage: ApiServiceError;
    pagingLimit: number;
    constructor(_route: ActivatedRoute, _searchService: SearchService, _searchParamsService: SearchParamsService, _router: Router);
    ngOnInit(): void;
    /**
     * Generates the Gravsearch query for the current offset.
     * @ignore
     */
    private generateGravsearchQuery;
    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     * @ignore
     */
    private getResult;
    /**
     *
     * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
     * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
     * @ignore
     *
     * @param {ReadResourcesSequence} searchResult the answer to a search request.
     */
    private processSearchResults;
    /**
     * Shows total number of results returned by a count query.
     * @ignore
     *
     * @param {ApiServiceResult} countQueryResult the response to a count query.
     */
    private showNumberOfAllResults;
    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     * @ignore
     *
     * @param {number} offset
     * @returns void
     */
    loadMore(offset: number): void;
}
