import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ListInfoResponse, ListNodeInfoResponse, ListResponse, ListsResponse } from '../../declarations';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
/**
 * Request information about lists from Knora.
 */
let ListsService = class ListsService extends ApiService {
    /**
     * Request information about lists from Knora.
     */
    constructor() {
        super(...arguments);
        this.path = '/admin/lists';
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all lists.
     *
     * @param {string} [projectIri]
     * @returns Observable<ListNodeInfo[]>
     */
    getLists(projectIri) {
        if (projectIri) {
            this.path += '?projectIri=' + encodeURIComponent(projectIri);
        }
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListsResponse).lists), catchError(this.handleJsonError));
    }
    /**
     * Return a list object.
     *
     * @param {string} listIri
     * @returns Observable<List>
     */
    getList(listIri) {
        return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(map((result) => result.getBody(ListResponse).list), catchError(this.handleJsonError));
    }
    /**
     * Return a list info object.
     *
     * @param {string} listIri
     * @returns Observable<ListInfo>
     */
    getListInfo(listIri) {
        this.path += '/infos/' + encodeURIComponent(listIri);
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListInfoResponse).listinfo), catchError(this.handleJsonError));
    }
    /**
     * Return a list node info object.
     *
     * @param {string} nodeIri
     * @returns Observable<ListNodeInfo>
     */
    getListNodeInfo(nodeIri) {
        this.path += '/nodes/' + encodeURIComponent(nodeIri);
        return this.httpGet(this.path).pipe(map((result) => result.getBody(ListNodeInfoResponse).nodeinfo), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new list.
     *
     * @param {ListCreatePayload} payload
     * @returns Observable<List>
     */
    createList(payload) {
        return this.httpPost(this.path, payload).pipe(map((result) => result.getBody(ListResponse).list), catchError(this.handleJsonError));
    }
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Edit list data.
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns Observable<ListInfo>
     */
    updateListInfo(payload) {
        this.path += '/infos/' + encodeURIComponent(payload.listIri);
        return this.httpPut(this.path, payload).pipe(map((result) => result.getBody(ListInfoResponse).listinfo), catchError(this.handleJsonError));
    }
};
ListsService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ListsService_Factory() { return new ListsService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken)); }, token: ListsService, providedIn: "root" });
ListsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ListsService);
export { ListsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FkbWluL2xpc3RzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBS0gsZ0JBQWdCLEVBR2hCLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osYUFBYSxFQUNoQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUU1Qzs7R0FFRztBQUlILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxVQUFVO0lBTjVDOztPQUVHO0lBQ0g7O1FBS1ksU0FBSSxHQUFXLGNBQWMsQ0FBQztLQXFHekM7SUFsR0csMkVBQTJFO0lBQzNFLE1BQU07SUFDTiwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCxRQUFRLENBQUMsVUFBbUI7UUFDeEIsSUFBSSxVQUFVLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxJQUFJLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoRTtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQixHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUFDLE9BQWU7UUFDbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNuRSxHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsV0FBVyxDQUFDLE9BQWU7UUFDdkIsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQy9CLEdBQUcsQ0FBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFDNUUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGVBQWUsQ0FBQyxPQUFlO1FBQzNCLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMvQixHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsUUFBUSxDQUFDLEVBQ2hGLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBR0QsMkVBQTJFO0lBQzNFLE9BQU87SUFDUCwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCxVQUFVLENBQUMsT0FBMEI7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN6QyxHQUFHLENBQUMsQ0FBQyxNQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNwRSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUdELDJFQUEyRTtJQUMzRSxNQUFNO0lBQ04sMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLE9BQThCO1FBQ3pDLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hDLEdBQUcsQ0FBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFDNUUsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUVOLENBQUM7Q0FDSixDQUFBOztBQXZHWSxZQUFZO0lBSHhCLFVBQVUsQ0FBQztRQUNSLFVBQVUsRUFBRSxNQUFNO0tBQ3JCLENBQUM7R0FDVyxZQUFZLENBdUd4QjtTQXZHWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBMaXN0LFxuICAgIExpc3RDcmVhdGVQYXlsb2FkLFxuICAgIExpc3RJbmZvLFxuICAgIExpc3RJbmZvUmVzcG9uc2UsXG4gICAgTGlzdEluZm9VcGRhdGVQYXlsb2FkLFxuICAgIExpc3ROb2RlSW5mbyxcbiAgICBMaXN0Tm9kZUluZm9SZXNwb25zZSxcbiAgICBMaXN0UmVzcG9uc2UsXG4gICAgTGlzdHNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgbGlzdHMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9saXN0cyc7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGxpc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+XG4gICAgICovXG4gICAgZ2V0TGlzdHMocHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvW10+IHtcbiAgICAgICAgaWYgKHByb2plY3RJcmkpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aCArPSAnP3Byb2plY3RJcmk9JyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0c1Jlc3BvbnNlKS5saXN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3Q+XG4gICAgICovXG4gICAgZ2V0TGlzdChsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGggKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdFJlc3BvbnNlKS5saXN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBpbmZvIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0SW5mbz5cbiAgICAgKi9cbiAgICBnZXRMaXN0SW5mbyhsaXN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBub2RlIGluZm8gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3ROb2RlSW5mbz5cbiAgICAgKi9cbiAgICBnZXRMaXN0Tm9kZUluZm8obm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+IHtcbiAgICAgICAgdGhpcy5wYXRoICs9ICcvbm9kZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChub2RlSXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdE5vZGVJbmZvUmVzcG9uc2UpLm5vZGVpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IGxpc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RDcmVhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0PlxuICAgICAqL1xuICAgIGNyZWF0ZUxpc3QocGF5bG9hZDogTGlzdENyZWF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBFZGl0IGxpc3QgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TGlzdEluZm9VcGRhdGVQYXlsb2FkfSBwYXlsb2FkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0SW5mbz5cbiAgICAgKi9cbiAgICB1cGRhdGVMaXN0SW5mbyhwYXlsb2FkOiBMaXN0SW5mb1VwZGF0ZVBheWxvYWQpOiBPYnNlcnZhYmxlPExpc3RJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL2luZm9zLycgKyBlbmNvZGVVUklDb21wb25lbnQocGF5bG9hZC5saXN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dCh0aGlzLnBhdGgsIHBheWxvYWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdEluZm9SZXNwb25zZSkubGlzdGluZm8pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cbn1cbiJdfQ==