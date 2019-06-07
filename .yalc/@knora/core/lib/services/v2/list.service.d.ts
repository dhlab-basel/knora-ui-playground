import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class ListService extends ApiService {
    http: HttpClient;
    config: any;
    constructor(http: HttpClient, config: any);
    /**
     * Gets a hierarchical list from Knora.
     *
     * @param {string} rootNodeIri the Iri of the list's root node.
     * @return {Observable<ApiServiceResult | ApiServiceError>}
     */
    private getListFromKnora;
    /**
     * Returns a list as expanded JSON-LD.
     *
     * @param {string} rootNodeIri the root node of the list.
     * @return {Observable<object>} the expanded JSON-LD.
     */
    getList(rootNodeIri: string): Observable<object>;
    /**
     * Gets a list node from Knora.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<ApiServiceResult | ApiServiceError>}
     */
    private getListNodeFromKnora;
    /**
     * Returns a list node as expanded JSON-LD.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<object>}
     */
    getListNode(listNodeIri: string): Observable<object>;
}
