import { Observable } from 'rxjs';
import { List, ListCreatePayload, ListInfo, ListInfoUpdatePayload, ListNode, ListNodeUpdatePayload } from '../../declarations';
import { ApiService } from '../api.service';
/**
 * Request information about lists from Knora.
 */
export declare class ListsService extends ApiService {
    private path;
    /**
     * Returns a list of all lists.
     *
     * @param {string} [projectIri]
     * @returns Observable<ListNode[]>
     */
    getLists(projectIri?: string): Observable<ListNode[]>;
    /**
     * Return a list object.
     *
     * @param {string} listIri
     * @returns Observable<List>
     */
    getList(listIri: string): Observable<List>;
    /**
     * Return a list info object.
     *
     * @param {string} listIri
     * @returns Observable<ListInfo>
     */
    getListInfo(listIri: string): Observable<ListInfo>;
    /**
     * Return a list node info object.
     *
     * @param {string} nodeIri
     * @returns Observable<ListNode>
     */
    getListNodeInfo(nodeIri: string): Observable<ListNode>;
    /**
     * Create new list.
     *
     * @param {ListCreatePayload} payload
     * @returns Observable<List>
     */
    createList(payload: ListCreatePayload): Observable<List>;
    /**
     * Create new list node.
     *
     * @param {string} listIri
     * @param {ListNodeUpdatePayload} payload
     * @returns Observable<ListNode>
     */
    createListItem(listIri: string, payload: ListNodeUpdatePayload): Observable<ListNode>;
    /**
     * Edit list data.
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns Observable<ListInfo>
     */
    updateListInfo(payload: ListInfoUpdatePayload): Observable<ListInfo>;
}
