import { Observable } from 'rxjs';
import { ListService } from './list.service';
/**
 * Represents a list node v2.
 */
export declare class ListNodeV2 {
    readonly id: string;
    readonly label: string;
    readonly position?: number;
    readonly hasRootNode?: string;
    readonly children: ListNodeV2[];
    readonly isRootNode: boolean;
    constructor(id: string, label: string, position?: number, hasRootNode?: string);
}
export declare class ListCacheService {
    private _listService;
    private listCache;
    private listNodeIriToListNodeV2;
    constructor(_listService: ListService);
    private hasRootNode;
    /**
     * Converts a JSON-LD represention of a ListNodeV2 to  a `ListNodeV2`.
     * Recursively converts child nodes.
     *
     * @param {object} listJSONLD the JSON-LD representation of a list node v2.
     * @return {ListNodeV2}
     */
    private convertJSONLDToListNode;
    /**
     * Gets a list from the cache or requests it from Knora and caches it.
     *
     * @param {string} rootNodeIri the Iri of the list's root node.
     * @return {Observable<ListNodeV2>}
     */
    getList(rootNodeIri: string): Observable<ListNodeV2>;
    /**
     * Gets a list node from the cache or requests the whole list from Knora and caches it.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<object>}
     */
    getListNode(listNodeIri: string): Observable<ListNodeV2>;
}
