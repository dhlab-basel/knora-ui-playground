import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiServiceError, ReadResourcesSequence, ResourcesSequence } from '../../declarations';
import { ApiService } from '../api.service';
import { IncomingService } from './incoming.service';
import { OntologyCacheService } from './ontology-cache.service';
/**
 * Requests representation of resources from Knora.
 */
export declare class ResourceService extends ApiService {
    http: HttpClient;
    config: any;
    private _incomingService;
    private _ontologyCacheService;
    constructor(http: HttpClient, config: any, _incomingService: IncomingService, _ontologyCacheService: OntologyCacheService);
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    getResource(iri: string): Observable<ResourcesSequence | ApiServiceError>;
    private getResourcesSequence;
    requestIncomingResources(sequence: ResourcesSequence): void;
    /**
     * @deprecated Use **getResourcesSequence** instead
     *
     * Given the Iri, requests the representation of a resource as a `ReadResourceSequence`.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns {Observable<ReadResourcesSequence>}
     */
    getReadResource(iri: string): Observable<ReadResourcesSequence | ApiServiceError>;
}
