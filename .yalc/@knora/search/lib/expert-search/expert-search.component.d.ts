import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParamsService, SearchService } from '@knora/core';
export declare class ExpertSearchComponent implements OnInit {
    private fb;
    private _route;
    private _router;
    private _searchService;
    private _searchParamsService;
    config: any;
    /**
     * @param  {string} route Route to navigate after search. This route path should contain a component for search results.
     */
    route?: any;
    /**
     * @param gravsearch Send the gravsearch query back.
     */
    gravsearch: EventEmitter<string>;
    /**
     * @param  {boolean} toggleExtendedSearchForm Trigger toggle for extended search form.
     */
    toggleExpertSearchForm: EventEmitter<boolean>;
    expertSearchForm: FormGroup;
    constructor(fb: FormBuilder, _route: ActivatedRoute, _router: Router, _searchService: SearchService, _searchParamsService: SearchParamsService, config: any);
    ngOnInit(): void;
    /**
     * @ignore
     * Initiate the form with predefined Gravsearch query as example.
     */
    private initForm;
    /**
     * @ignore
     * Send the gravsearch query to the result view, either through the route or by emitting the gravsearch as an output.
     */
    submitQuery(): void;
    /**
     * @ignore
     * Generate the whole gravsearch query matching the query given by the form.
     */
    private generateGravsearch;
    /**
     * @ignore
     * Reset the form to the initial state.
     */
    resetForm(): void;
}
