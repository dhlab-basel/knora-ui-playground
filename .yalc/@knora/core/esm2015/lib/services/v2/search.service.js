import * as tslib_1 from "tslib";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { KuiCoreConfigToken } from '../../core.module';
import { ApiService } from '../api.service';
import { ConvertJSONLD } from './convert-jsonld';
import { OntologyCacheService } from './ontology-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
import * as i3 from "./ontology-cache.service";
/**
 * Performs searches (fulltext or extended) and search count queries into Knora.
 */
let SearchService = class SearchService extends ApiService {
    constructor(http, config, _ontologyCacheService) {
        super(http, config);
        this.http = http;
        this.config = config;
        this._ontologyCacheService = _ontologyCacheService;
        /**
         * Converts a JSON-LD object to a `ReadResorceSequence`.
         * To be passed as a function pointer (arrow notation required).
         *
         * @param {Object} resourceResponse
         * @returns {Observable<ReadResourcesSequence>}
         */
        this.convertJSONLDToReadResourceSequence = (resourceResponse) => {
            // convert JSON-LD into a ReadResourceSequence
            const resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            const resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map((ontoInfo) => {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        };
    }
    /**
     * Assign fulltext search params to http params.
     *
     * @param {FulltextSearchParams} params
     * @param {HttpParams} httpParams
     * @returns {HttpParams}
     */
    processFulltextSearchParams(params, httpParams) {
        // avoid reassignment to method param
        let searchParams = httpParams;
        // HttpParams is immutable, `set` returns a new instance
        if (params.limitToProject !== undefined) {
            searchParams = searchParams.set('limitToProject', params.limitToProject);
        }
        if (params.limitToResourceClass !== undefined) {
            searchParams = searchParams.set('limitToResourceClass', params.limitToResourceClass);
        }
        if (params.limitToStandoffClass !== undefined) {
            searchParams = searchParams.set('limitToStandoffClass', params.limitToStandoffClass);
        }
        return searchParams;
    }
    /**
     * Assign search by label search params to http params.
     *
     * @param {SearchByLabelParams} params
     * @param {HttpParams} httpParams
     * @returns {HttpParams}
     */
    processSearchByLabelParams(params, httpParams) {
        // avoid reassignment to method param
        let searchParams = httpParams;
        // HttpParams is immutable, `set` returns a new instance
        if (params.limitToResourceClass !== undefined) {
            searchParams = searchParams.set('limitToResourceClass', params.limitToResourceClass);
        }
        if (params.limitToProject !== undefined) {
            searchParams = searchParams.set('limitToProject', params.limitToProject);
        }
        return searchParams;
    }
    /**
     * Performs a fulltext search.
     * TODO: mark as deprecated, use of `doFullTextSearchReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @param {FulltextSearchParams} params restrictions, if any.
     * @returns Observable<ApiServiceResult>
     */
    doFulltextSearch(searchTerm, offset = 0, params) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        if (params !== undefined) {
            httpParams = this.processFulltextSearchParams(params, httpParams);
        }
        return this.httpGet('/v2/search/' + encodeURIComponent(searchTerm), httpParams);
    }
    /**
     * Performs a fulltext search and turns the result into a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @param {FulltextSearchParams} params restrictions, if any.
     * @returns Observable<ApiServiceResult>
     */
    doFullTextSearchReadResourceSequence(searchTerm, offset = 0, params) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        if (params !== undefined) {
            httpParams = this.processFulltextSearchParams(params, httpParams);
        }
        const res = this.httpGet('/v2/search/' + encodeURIComponent(searchTerm), httpParams);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        this.convertJSONLDToReadResourceSequence));
    }
    /**
     * Performs a fulltext search count query.
     * TODO: mark as deprecated, use of `doFullTextSearchCountQueryCountQueryResult` recommended
     *
     * @param searchTerm the term to search for.
     * @param {FulltextSearchParams} params restrictions, if any.
     * @returns Observable<ApiServiceResult>
     */
    doFulltextSearchCountQuery(searchTerm, params) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }
        let httpParams = new HttpParams();
        if (params !== undefined) {
            httpParams = this.processFulltextSearchParams(params, httpParams);
        }
        return this.httpGet('/v2/search/count/' + encodeURIComponent(searchTerm), httpParams);
    }
    /**
     * Performs a fulltext search count query and turns the result into a `CountQueryResult`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {FulltextSearchParams} params restrictions, if any.
     * @returns Observable<CountQueryResult>
     */
    doFullTextSearchCountQueryCountQueryResult(searchTerm, params) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }
        let httpParams = new HttpParams();
        if (params !== undefined) {
            httpParams = this.processFulltextSearchParams(params, httpParams);
        }
        const res = this.httpGet('/v2/search/count/' + encodeURIComponent(searchTerm), httpParams);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    }
    /**
     * Performs an extended search.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearch(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }
        return this.httpPost('/v2/searchextended', gravsearchQuery);
    }
    /**
     * Performs an extended search and turns the result into a `ReadResourceSequence`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchReadResourceSequence(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }
        const res = this.httpPost('/v2/searchextended', gravsearchQuery);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    }
    /**
     * Performs an extended search count query.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param {string} gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchCountQuery(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }
        return this.httpPost('/v2/searchextended/count', gravsearchQuery);
    }
    /**
     * Performs an extended search count query and turns the result into a `CountQueryResult`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchCountQueryCountQueryResult(gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }
        const res = this.httpPost('/v2/searchextended/count', gravsearchQuery);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    }
    /**
     * Perform a search by a resource's rdfs:label.
     * TODO: mark as deprecated, use of `searchByLabelReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset offset to use.
     * @param {FulltextSearchParams} params restrictions, if any.
     * @returns Observable<ApiServiceResult>
     */
    searchByLabel(searchTerm, offset = 0, params) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        if (params !== undefined) {
            httpParams = this.processSearchByLabelParams(params, httpParams);
        }
        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
    }
    /**
     * Perform a search by a resource's rdfs:label and turns the results in a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset offset to use.
     * @param {FulltextSearchParams} params restrictions, if any.
     * @returns Observable<ApiServiceResult>
     */
    searchByLabelReadResourceSequence(searchTerm, offset = 0, params) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }
        let httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        if (params !== undefined) {
            httpParams = this.processSearchByLabelParams(params, httpParams);
        }
        const res = this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    }
};
SearchService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SearchService_Factory() { return new SearchService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken), i0.ɵɵinject(i3.OntologyCacheService)); }, token: SearchService, providedIn: "root" });
SearchService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    }),
    tslib_1.__param(1, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object, OntologyCacheService])
], SearchService);
export { SearchService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQXVCLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBa0JyRjs7R0FFRztBQUlILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxVQUFVO0lBRXpDLFlBQW1CLElBQWdCLEVBQ0ksTUFBTSxFQUNqQyxxQkFBMkM7UUFDbkQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUhMLFNBQUksR0FBSixJQUFJLENBQVk7UUFDSSxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQ2pDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7UUEyRHZEOzs7Ozs7V0FNRztRQUNLLHdDQUFtQyxHQUFvRSxDQUFDLGdCQUF3QixFQUFFLEVBQUU7WUFDeEksOENBQThDO1lBQzlDLE1BQU0sTUFBTSxHQUEwQixhQUFhLENBQUMscUNBQXFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU1Ryw4QkFBOEI7WUFDOUIsTUFBTSxpQkFB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S0FBSyxTQUFTLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckQsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDLENBQUM7U0FDM0g7UUFFRCxJQUFJLFVBQVUsR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBRTlDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUV6RCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdEIsVUFBVSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDcEU7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTVGLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWCxRQUFRLENBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDckIsRUFDRCxRQUFRLENBQ0osSUFBSSxDQUFDLG1DQUFtQyxDQUMzQyxDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTs7QUE3VlksYUFBYTtJQUh6QixVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBSU8sbUJBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7NkNBRE4sVUFBVSxVQUVBLG9CQUFvQjtHQUo5QyxhQUFhLENBNlZ6QjtTQTdWWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWdUb2tlbiB9IGZyb20gJy4uLy4uL2NvcmUubW9kdWxlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIENvdW50UXVlcnlSZXN1bHQsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udmVydEpTT05MRCB9IGZyb20gJy4vY29udmVydC1qc29ubGQnO1xuaW1wb3J0IHsgT250b2xvZ3lDYWNoZVNlcnZpY2UsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZ1bGx0ZXh0U2VhcmNoUGFyYW1zIHtcblxuICAgIGxpbWl0VG9SZXNvdXJjZUNsYXNzPzogc3RyaW5nO1xuXG4gICAgbGltaXRUb1Byb2plY3Q/OiBzdHJpbmc7XG5cbiAgICBsaW1pdFRvU3RhbmRvZmZDbGFzcz86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hCeUxhYmVsUGFyYW1zIHtcblxuICAgIGxpbWl0VG9SZXNvdXJjZUNsYXNzPzogc3RyaW5nO1xuXG4gICAgbGltaXRUb1Byb2plY3Q/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgc2VhcmNoZXMgKGZ1bGx0ZXh0IG9yIGV4dGVuZGVkKSBhbmQgc2VhcmNoIGNvdW50IHF1ZXJpZXMgaW50byBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnLFxuICAgICAgICBwcml2YXRlIF9vbnRvbG9neUNhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3NpZ24gZnVsbHRleHQgc2VhcmNoIHBhcmFtcyB0byBodHRwIHBhcmFtcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVsbHRleHRTZWFyY2hQYXJhbXN9IHBhcmFtc1xuICAgICAqIEBwYXJhbSB7SHR0cFBhcmFtc30gaHR0cFBhcmFtc1xuICAgICAqIEByZXR1cm5zIHtIdHRwUGFyYW1zfVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvY2Vzc0Z1bGx0ZXh0U2VhcmNoUGFyYW1zKHBhcmFtczogRnVsbHRleHRTZWFyY2hQYXJhbXMsIGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMpOiBIdHRwUGFyYW1zIHtcblxuICAgICAgICAvLyBhdm9pZCByZWFzc2lnbm1lbnQgdG8gbWV0aG9kIHBhcmFtXG4gICAgICAgIGxldCBzZWFyY2hQYXJhbXMgPSBodHRwUGFyYW1zO1xuXG4gICAgICAgIC8vIEh0dHBQYXJhbXMgaXMgaW1tdXRhYmxlLCBgc2V0YCByZXR1cm5zIGEgbmV3IGluc3RhbmNlXG5cbiAgICAgICAgaWYgKHBhcmFtcy5saW1pdFRvUHJvamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBzZWFyY2hQYXJhbXMuc2V0KCdsaW1pdFRvUHJvamVjdCcsIHBhcmFtcy5saW1pdFRvUHJvamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmxpbWl0VG9SZXNvdXJjZUNsYXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcyA9IHNlYXJjaFBhcmFtcy5zZXQoJ2xpbWl0VG9SZXNvdXJjZUNsYXNzJywgcGFyYW1zLmxpbWl0VG9SZXNvdXJjZUNsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMubGltaXRUb1N0YW5kb2ZmQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gc2VhcmNoUGFyYW1zLnNldCgnbGltaXRUb1N0YW5kb2ZmQ2xhc3MnLCBwYXJhbXMubGltaXRUb1N0YW5kb2ZmQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBc3NpZ24gc2VhcmNoIGJ5IGxhYmVsIHNlYXJjaCBwYXJhbXMgdG8gaHR0cCBwYXJhbXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1NlYXJjaEJ5TGFiZWxQYXJhbXN9IHBhcmFtc1xuICAgICAqIEBwYXJhbSB7SHR0cFBhcmFtc30gaHR0cFBhcmFtc1xuICAgICAqIEByZXR1cm5zIHtIdHRwUGFyYW1zfVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvY2Vzc1NlYXJjaEJ5TGFiZWxQYXJhbXMocGFyYW1zOiBTZWFyY2hCeUxhYmVsUGFyYW1zLCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zKTogSHR0cFBhcmFtcyB7XG5cbiAgICAgICAgLy8gYXZvaWQgcmVhc3NpZ25tZW50IHRvIG1ldGhvZCBwYXJhbVxuICAgICAgICBsZXQgc2VhcmNoUGFyYW1zID0gaHR0cFBhcmFtcztcblxuICAgICAgICAvLyBIdHRwUGFyYW1zIGlzIGltbXV0YWJsZSwgYHNldGAgcmV0dXJucyBhIG5ldyBpbnN0YW5jZVxuXG4gICAgICAgIGlmIChwYXJhbXMubGltaXRUb1Jlc291cmNlQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gc2VhcmNoUGFyYW1zLnNldCgnbGltaXRUb1Jlc291cmNlQ2xhc3MnLCBwYXJhbXMubGltaXRUb1Jlc291cmNlQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcy5saW1pdFRvUHJvamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBzZWFyY2hQYXJhbXMuc2V0KCdsaW1pdFRvUHJvamVjdCcsIHBhcmFtcy5saW1pdFRvUHJvamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBKU09OLUxEIG9iamVjdCB0byBhIGBSZWFkUmVzb3JjZVNlcXVlbmNlYC5cbiAgICAgKiBUbyBiZSBwYXNzZWQgYXMgYSBmdW5jdGlvbiBwb2ludGVyIChhcnJvdyBub3RhdGlvbiByZXF1aXJlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVzb3VyY2VSZXNwb25zZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT59XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZTogKHJlc291cmNlUmVzcG9uc2U6IE9iamVjdCkgPT4gT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+ID0gKHJlc291cmNlUmVzcG9uc2U6IE9iamVjdCkgPT4ge1xuICAgICAgICAvLyBjb252ZXJ0IEpTT04tTEQgaW50byBhIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgIGNvbnN0IHJlc1NlcTogUmVhZFJlc291cmNlc1NlcXVlbmNlID0gQ29udmVydEpTT05MRC5jcmVhdGVSZWFkUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBDb252ZXJ0SlNPTkxELmdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgLy8gcmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neUNhY2hlU2VydmljZS5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgKG9udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1NlcTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2guXG4gICAgICogVE9ETzogbWFyayBhcyBkZXByZWNhdGVkLCB1c2Ugb2YgYGRvRnVsbFRleHRTZWFyY2hSZWFkUmVzb3VyY2VTZXF1ZW5jZWAgcmVjb21tZW5kZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcGFyYW0ge0Z1bGx0ZXh0U2VhcmNoUGFyYW1zfSBwYXJhbXMgcmVzdHJpY3Rpb25zLCBpZiBhbnkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2goc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDAsIHBhcmFtcz86IEZ1bGx0ZXh0U2VhcmNoUGFyYW1zKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5wcm9jZXNzRnVsbHRleHRTZWFyY2hQYXJhbXMocGFyYW1zLCBodHRwUGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgaHR0cFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBSZWFkUmVzb3VyY2VTZXF1ZW5jZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChmb3IgcGFnaW5nLCBmaXJzdCBvZmZzZXQgaXMgMCkuXG4gICAgICogQHBhcmFtIHtGdWxsdGV4dFNlYXJjaFBhcmFtc30gcGFyYW1zIHJlc3RyaWN0aW9ucywgaWYgYW55LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGxUZXh0U2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDAsIHBhcmFtcz86IEZ1bGx0ZXh0U2VhcmNoUGFyYW1zKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5wcm9jZXNzRnVsbHRleHRTZWFyY2hQYXJhbXMocGFyYW1zLCBodHRwUGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIGh0dHBQYXJhbXMpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9GdWxsVGV4dFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0YCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge0Z1bGx0ZXh0U2VhcmNoUGFyYW1zfSBwYXJhbXMgcmVzdHJpY3Rpb25zLCBpZiBhbnkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5KHNlYXJjaFRlcm06IHN0cmluZywgcGFyYW1zPzogRnVsbHRleHRTZWFyY2hQYXJhbXMpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5wcm9jZXNzRnVsbHRleHRTZWFyY2hQYXJhbXMocGFyYW1zLCBodHRwUGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvY291bnQvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgaHR0cFBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkgYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBDb3VudFF1ZXJ5UmVzdWx0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtGdWxsdGV4dFNlYXJjaFBhcmFtc30gcGFyYW1zIHJlc3RyaWN0aW9ucywgaWYgYW55LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0Z1bGxUZXh0U2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoc2VhcmNoVGVybTogc3RyaW5nLCBwYXJhbXM/OiBGdWxsdGV4dFNlYXJjaFBhcmFtcyk6IE9ic2VydmFibGU8Q291bnRRdWVyeVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLnByb2Nlc3NGdWxsdGV4dFNlYXJjaFBhcmFtcyhwYXJhbXMsIGh0dHBQYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoL2NvdW50LycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIGh0dHBQYXJhbXMpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGEgYENvdW50UXVlcnlSZXN1bHRgXG4gICAgICAgICAgICAgICAgQ29udmVydEpTT05MRC5jcmVhdGVDb3VudFF1ZXJ5UmVzdWx0XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2goZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBncmF2c2VhcmNoUXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZCcsIGdyYXZzZWFyY2hRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeShncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBncmF2c2VhcmNoUXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBjb3VudCBxdWVyeSBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvdW50UXVlcnlSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBncmF2c2VhcmNoUXVlcnkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGEgYENvdW50UXVlcnlSZXN1bHRgXG4gICAgICAgICAgICAgICAgQ29udmVydEpTT05MRC5jcmVhdGVDb3VudFF1ZXJ5UmVzdWx0XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgc2VhcmNoQnlMYWJlbFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IG9mZnNldCB0byB1c2UuXG4gICAgICogQHBhcmFtIHtGdWxsdGV4dFNlYXJjaFBhcmFtc30gcGFyYW1zIHJlc3RyaWN0aW9ucywgaWYgYW55LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsKHNlYXJjaFRlcm06IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwLCBwYXJhbXM/OiBTZWFyY2hCeUxhYmVsUGFyYW1zKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5wcm9jZXNzU2VhcmNoQnlMYWJlbFBhcmFtcyhwYXJhbXMsIGh0dHBQYXJhbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaHR0cEdldCgpIGV4cGVjdHMgb25seSBvbmUgYXJndW1lbnQsIG5vdCAyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2hieWxhYmVsLycgKyBlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSksIGh0dHBQYXJhbXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbCBhbmQgdHVybnMgdGhlIHJlc3VsdHMgaW4gYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IG9mZnNldCB0byB1c2UuXG4gICAgICogQHBhcmFtIHtGdWxsdGV4dFNlYXJjaFBhcmFtc30gcGFyYW1zIHJlc3RyaWN0aW9ucywgaWYgYW55LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsUmVhZFJlc291cmNlU2VxdWVuY2Uoc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDAsIHBhcmFtcz86IFNlYXJjaEJ5TGFiZWxQYXJhbXMpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnb2Zmc2V0Jywgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGlmIChwYXJhbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IHRoaXMucHJvY2Vzc1NlYXJjaEJ5TGFiZWxQYXJhbXMocGFyYW1zLCBodHRwUGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaGJ5bGFiZWwvJyArIGVuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKSwgaHR0cFBhcmFtcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==