import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SearchService } from './search.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
import * as i3 from "./ontology-cache.service";
/**
 * Requests incoming information (regions, links, stillImageRepresentations) from Knora.
 */
let IncomingService = class IncomingService extends SearchService {
    /**
    * Returns all incoming regions for a particular resource.
    *
    * @param {string} resourceIRI the Iri of the resource whose Incoming regions should be returned.
    * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
    * @returns {Observable<any>}
    */
    getIncomingRegions(resourceIRI, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?region knora-api:isMainResource true .

?region knora-api:hasGeometry ?geom .

?region knora-api:hasComment ?comment .

?region knora-api:hasColor ?color .
} WHERE {
?region a knora-api:Region .
?region a knora-api:Resource .

?region knora-api:isRegionOf <${resourceIRI}> .
knora-api:isRegionOf knora-api:objectType knora-api:Resource .

<${resourceIRI}> a knora-api:Resource .

?region knora-api:hasGeometry ?geom .
knora-api:hasGeometry knora-api:objectType knora-api:Geom .

?geom a knora-api:Geom .

?region knora-api:hasComment ?comment .
knora-api:hasComment knora-api:objectType xsd:string .

?comment a xsd:string .

?region knora-api:hasColor ?color .
knora-api:hasColor knora-api:objectType knora-api:Color .

?color a knora-api:Color .
} OFFSET ${offset}
`;
        // console.log('sparqlQueryStr ', sparqlQueryStr);
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
    }
    /**
     * Returns all the StillImageRepresentations for the given resource, if any.
     * StillImageRepresentations link to the given resource via knora-base:isPartOf.
     *
     * @param {string} resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    getStillImageRepresentationsForCompoundResource(resourceIri, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?page knora-api:isMainResource true .

?page knora-api:seqnum ?seqnum .

?page knora-api:hasStillImageFile ?file .
} WHERE {

?page a knora-api:StillImageRepresentation .
?page a knora-api:Resource .

?page knora-api:isPartOf <${resourceIri}> .
knora-api:isPartOf knora-api:objectType knora-api:Resource .

<${resourceIri}> a knora-api:Resource .

?page knora-api:seqnum ?seqnum .
knora-api:seqnum knora-api:objectType xsd:integer .

?seqnum a xsd:integer .

?page knora-api:hasStillImageFile ?file .
knora-api:hasStillImageFile knora-api:objectType knora-api:File .

?file a knora-api:File .

} ORDER BY ?seqnum
OFFSET ${offset}
`;
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
    }
    /**
     * Returns all incoming links for the given resource Iri but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    getIncomingLinksForResource(resourceIri, offset) {
        const sparqlQueryStr = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

CONSTRUCT {
?incomingRes knora-api:isMainResource true .

?incomingRes ?incomingProp <${resourceIri}> .

} WHERE {

?incomingRes a knora-api:Resource .

?incomingRes ?incomingProp <${resourceIri}> .

<${resourceIri}> a knora-api:Resource .

?incomingProp knora-api:objectType knora-api:Resource .

knora-api:isRegionOf knora-api:objectType knora-api:Resource .
knora-api:isPartOf knora-api:objectType knora-api:Resource .

FILTER NOT EXISTS {
 ?incomingRes  knora-api:isRegionOf <${resourceIri}> .
}

FILTER NOT EXISTS {
 ?incomingRes  knora-api:isPartOf <${resourceIri}> .
}

} OFFSET ${offset}
`;
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
    }
};
IncomingService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken), i0.ɵɵinject(i3.OntologyCacheService)); }, token: IncomingService, providedIn: "root" });
IncomingService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root',
    })
], IncomingService);
export { IncomingService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jb21pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2luY29taW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7OztBQUdqRDs7R0FFRztBQUlILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsYUFBYTtJQUU5Qzs7Ozs7O01BTUU7SUFDRixrQkFBa0IsQ0FBQyxXQUFtQixFQUFFLE1BQWM7UUFDbEQsTUFBTSxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7OztnQ0FlQyxXQUFXOzs7R0FHeEMsV0FBVzs7Ozs7Ozs7Ozs7Ozs7OztXQWdCSCxNQUFNO0NBQ2hCLENBQUM7UUFDTSxrREFBa0Q7UUFDbEQsT0FBTyxJQUFJLENBQUMsb0NBQW9DLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCwrQ0FBK0MsQ0FBQyxXQUFtQixFQUFFLE1BQWM7UUFDL0UsTUFBTSxjQUFjLEdBQUc7Ozs7Ozs7Ozs7Ozs7OzRCQWNILFdBQVc7OztHQUdwQyxXQUFXOzs7Ozs7Ozs7Ozs7O1NBYUwsTUFBTTtDQUNkLENBQUM7UUFFTSxPQUFPLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRSxDQUFDO0lBR0Q7Ozs7OztPQU1HO0lBQ0gsMkJBQTJCLENBQUMsV0FBbUIsRUFBRSxNQUFjO1FBQzNELE1BQU0sY0FBYyxHQUFHOzs7Ozs7OEJBTUQsV0FBVzs7Ozs7OzhCQU1YLFdBQVc7O0dBRXRDLFdBQVc7Ozs7Ozs7O3VDQVF5QixXQUFXOzs7O3FDQUliLFdBQVc7OztXQUdyQyxNQUFNO0NBQ2hCLENBQUM7UUFFTSxPQUFPLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBRUosQ0FBQTs7QUE1SVksZUFBZTtJQUgzQixVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0dBQ1csZUFBZSxDQTRJM0I7U0E1SVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogUmVxdWVzdHMgaW5jb21pbmcgaW5mb3JtYXRpb24gKHJlZ2lvbnMsIGxpbmtzLCBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zKSBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbmNvbWluZ1NlcnZpY2UgZXh0ZW5kcyBTZWFyY2hTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgcmVnaW9ucyBmb3IgYSBwYXJ0aWN1bGFyIHJlc291cmNlLlxuICAgICpcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlSSSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBJbmNvbWluZyByZWdpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICovXG4gICAgZ2V0SW5jb21pbmdSZWdpb25zKHJlc291cmNlSVJJOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/cmVnaW9uIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb21tZW50ID9jb21tZW50IC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbn0gV0hFUkUge1xuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZWdpb24gLlxuP3JlZ2lvbiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmlzUmVnaW9uT2YgPCR7cmVzb3VyY2VJUkl9PiAuXG5rbm9yYS1hcGk6aXNSZWdpb25PZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlSSX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzR2VvbWV0cnkgP2dlb20gLlxua25vcmEtYXBpOmhhc0dlb21ldHJ5IGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpHZW9tIC5cblxuP2dlb20gYSBrbm9yYS1hcGk6R2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxua25vcmEtYXBpOmhhc0NvbW1lbnQga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOnN0cmluZyAuXG5cbj9jb21tZW50IGEgeHNkOnN0cmluZyAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbG9yID9jb2xvciAuXG5rbm9yYS1hcGk6aGFzQ29sb3Iga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkNvbG9yIC5cblxuP2NvbG9yIGEga25vcmEtYXBpOkNvbG9yIC5cbn0gT0ZGU0VUICR7b2Zmc2V0fVxuYDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NwYXJxbFF1ZXJ5U3RyICcsIHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBmb3IgdGhlIGdpdmVuIHJlc291cmNlLCBpZiBhbnkuXG4gICAgICogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBsaW5rIHRvIHRoZSBnaXZlbiByZXNvdXJjZSB2aWEga25vcmEtYmFzZTppc1BhcnRPZi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZ2V0U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc0ZvckNvbXBvdW5kUmVzb3VyY2UocmVzb3VyY2VJcmk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9wYWdlIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbn0gV0hFUkUge1xuXG4/cGFnZSBhIGtub3JhLWFwaTpTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gLlxuP3BhZ2UgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aXNQYXJ0T2YgPCR7cmVzb3VyY2VJcml9PiAuXG5rbm9yYS1hcGk6aXNQYXJ0T2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTpzZXFudW0gP3NlcW51bSAuXG5rbm9yYS1hcGk6c2VxbnVtIGtub3JhLWFwaTpvYmplY3RUeXBlIHhzZDppbnRlZ2VyIC5cblxuP3NlcW51bSBhIHhzZDppbnRlZ2VyIC5cblxuP3BhZ2Uga25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlID9maWxlIC5cbmtub3JhLWFwaTpoYXNTdGlsbEltYWdlRmlsZSBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6RmlsZSAuXG5cbj9maWxlIGEga25vcmEtYXBpOkZpbGUgLlxuXG59IE9SREVSIEJZID9zZXFudW1cbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNwYXJxbFF1ZXJ5U3RyKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBJcmkgYnV0IGluY29taW5nIHJlZ2lvbnMgYW5kIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB3aG9zZSBpbmNvbWluZyBsaW5rcyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP2luY29taW5nUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuP2luY29taW5nUmVzID9pbmNvbWluZ1Byb3AgPCR7cmVzb3VyY2VJcml9PiAuXG5cbn0gV0hFUkUge1xuXG4/aW5jb21pbmdSZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxuPCR7cmVzb3VyY2VJcml9PiBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1Byb3Aga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cblxua25vcmEtYXBpOmlzUmVnaW9uT2Yga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOlJlc291cmNlIC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlyaX0+IC5cbn1cblxuRklMVEVSIE5PVCBFWElTVFMge1xuID9pbmNvbWluZ1JlcyAga25vcmEtYXBpOmlzUGFydE9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG59IE9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNwYXJxbFF1ZXJ5U3RyKTtcbiAgICB9XG5cbn1cbiJdfQ==