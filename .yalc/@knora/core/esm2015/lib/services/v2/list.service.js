import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { KuiCoreConfigToken } from '../../core.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
export class ListService extends ApiService {
    constructor(http, config) {
        super(http, config);
        this.http = http;
        this.config = config;
    }
    /**
     * Gets a hierarchical list from Knora.
     *
     * @param {string} rootNodeIri the Iri of the list's root node.
     * @return {Observable<ApiServiceResult | ApiServiceError>}
     */
    getListFromKnora(rootNodeIri) {
        return this.httpGet('/v2/lists/' + encodeURIComponent(rootNodeIri));
    }
    /**
     * Returns a list as expanded JSON-LD.
     *
     * @param {string} rootNodeIri the root node of the list.
     * @return {Observable<object>} the expanded JSON-LD.
     */
    getList(rootNodeIri) {
        const listJSONLD = this.getListFromKnora(rootNodeIri);
        return listJSONLD.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD));
    }
    /**
     * Gets a list node from Knora.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<ApiServiceResult | ApiServiceError>}
     */
    getListNodeFromKnora(listNodeIri) {
        return this.httpGet('/v2/node/' + encodeURIComponent(listNodeIri));
    }
    /**
     * Returns a list node as expanded JSON-LD.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<object>}
     */
    getListNode(listNodeIri) {
        const listNodeJSONLD = this.getListNodeFromKnora(listNodeIri);
        return listNodeJSONLD.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD));
    }
}
ListService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ListService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] }
];
ListService.ngInjectableDef = i0.defineInjectable({ factory: function ListService_Factory() { return new ListService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken)); }, token: ListService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbEQsT0FBTyxFQUFPLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBS3ZELE1BQU0sT0FBTyxXQUFZLFNBQVEsVUFBVTtJQUV2QyxZQUFtQixJQUFnQixFQUNZLE1BQU07UUFDakQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUZMLFNBQUksR0FBSixJQUFJLENBQVk7UUFDWSxXQUFNLEdBQU4sTUFBTSxDQUFBO0lBRXJELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGdCQUFnQixDQUFDLFdBQW1CO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxPQUFPLENBQUMsV0FBbUI7UUFDdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FDbEIsUUFBUTtRQUNKLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsYUFBYSxDQUNyQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxvQkFBb0IsQ0FBQyxXQUFtQjtRQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsV0FBVyxDQUFDLFdBQW1CO1FBRTNCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5RCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQ3RCLFFBQVE7UUFDSiw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLGFBQWEsQ0FDckIsQ0FDSixDQUFDO0lBQ04sQ0FBQzs7O1lBL0RKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OztZQVJRLFVBQVU7NENBWUYsTUFBTSxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWdUb2tlbiB9IGZyb20gJy4uLy4uL2NvcmUubW9kdWxlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgQEluamVjdChLdWlDb3JlQ29uZmlnVG9rZW4pIHB1YmxpYyBjb25maWcpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgaGllcmFyY2hpY2FsIGxpc3QgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByb290Tm9kZUlyaSB0aGUgSXJpIG9mIHRoZSBsaXN0J3Mgcm9vdCBub2RlLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj59XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRMaXN0RnJvbUtub3JhKHJvb3ROb2RlSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL2xpc3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQocm9vdE5vZGVJcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBhcyBleHBhbmRlZCBKU09OLUxELlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJvb3ROb2RlSXJpIHRoZSByb290IG5vZGUgb2YgdGhlIGxpc3QuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxvYmplY3Q+fSB0aGUgZXhwYW5kZWQgSlNPTi1MRC5cbiAgICAgKi9cbiAgICBnZXRMaXN0KHJvb3ROb2RlSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuICAgICAgICBjb25zdCBsaXN0SlNPTkxEID0gdGhpcy5nZXRMaXN0RnJvbUtub3JhKHJvb3ROb2RlSXJpKTtcblxuICAgICAgICByZXR1cm4gbGlzdEpTT05MRC5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGxpc3Qgbm9kZSBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3ROb2RlSXJpIHRoZSBJcmkgb2YgdGhlIGxpc3Qgbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+fVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0TGlzdE5vZGVGcm9tS25vcmEobGlzdE5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvbm9kZS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3ROb2RlSXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgbm9kZSBhcyBleHBhbmRlZCBKU09OLUxELlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3ROb2RlSXJpIHRoZSBJcmkgb2YgdGhlIGxpc3Qgbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPG9iamVjdD59XG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGUobGlzdE5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgY29uc3QgbGlzdE5vZGVKU09OTEQgPSB0aGlzLmdldExpc3ROb2RlRnJvbUtub3JhKGxpc3ROb2RlSXJpKTtcblxuICAgICAgICByZXR1cm4gbGlzdE5vZGVKU09OTEQucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==