import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { KuiCoreConfigToken } from '../../core.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
var ListService = /** @class */ (function (_super) {
    tslib_1.__extends(ListService, _super);
    function ListService(http, config) {
        var _this = _super.call(this, http, config) || this;
        _this.http = http;
        _this.config = config;
        return _this;
    }
    /**
     * Gets a hierarchical list from Knora.
     *
     * @param {string} rootNodeIri the Iri of the list's root node.
     * @return {Observable<ApiServiceResult | ApiServiceError>}
     */
    ListService.prototype.getListFromKnora = function (rootNodeIri) {
        return this.httpGet('/v2/lists/' + encodeURIComponent(rootNodeIri));
    };
    /**
     * Returns a list as expanded JSON-LD.
     *
     * @param {string} rootNodeIri the root node of the list.
     * @return {Observable<object>} the expanded JSON-LD.
     */
    ListService.prototype.getList = function (rootNodeIri) {
        var listJSONLD = this.getListFromKnora(rootNodeIri);
        return listJSONLD.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD));
    };
    /**
     * Gets a list node from Knora.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<ApiServiceResult | ApiServiceError>}
     */
    ListService.prototype.getListNodeFromKnora = function (listNodeIri) {
        return this.httpGet('/v2/node/' + encodeURIComponent(listNodeIri));
    };
    /**
     * Returns a list node as expanded JSON-LD.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<object>}
     */
    ListService.prototype.getListNode = function (listNodeIri) {
        var listNodeJSONLD = this.getListNodeFromKnora(listNodeIri);
        return listNodeJSONLD.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD));
    };
    ListService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ListService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] }
    ]; };
    ListService.ngInjectableDef = i0.defineInjectable({ factory: function ListService_Factory() { return new ListService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken)); }, token: ListService, providedIn: "root" });
    return ListService;
}(ApiService));
export { ListService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xELE9BQU8sRUFBTyxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUV2RDtJQUdpQyx1Q0FBVTtJQUV2QyxxQkFBbUIsSUFBZ0IsRUFDWSxNQUFNO1FBRHJELFlBRUksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtRQUhrQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQ1ksWUFBTSxHQUFOLE1BQU0sQ0FBQTs7SUFFckQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssc0NBQWdCLEdBQXhCLFVBQXlCLFdBQW1CO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw2QkFBTyxHQUFQLFVBQVEsV0FBbUI7UUFDdkIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FDbEIsUUFBUTtRQUNKLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsYUFBYSxDQUNyQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSywwQ0FBb0IsR0FBNUIsVUFBNkIsV0FBbUI7UUFDNUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlDQUFXLEdBQVgsVUFBWSxXQUFtQjtRQUUzQixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUQsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUN0QixRQUFRO1FBQ0osNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxhQUFhLENBQ3JCLENBQ0osQ0FBQztJQUNOLENBQUM7O2dCQS9ESixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dCQVJRLFVBQVU7Z0RBWUYsTUFBTSxTQUFDLGtCQUFrQjs7O3NCQWQxQztDQXdFQyxBQWhFRCxDQUdpQyxVQUFVLEdBNkQxQztTQTdEWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZ1Rva2VuIH0gZnJvbSAnLi4vLi4vY29yZS5tb2R1bGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZykge1xuICAgICAgICBzdXBlcihodHRwLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBoaWVyYXJjaGljYWwgbGlzdCBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJvb3ROb2RlSXJpIHRoZSBJcmkgb2YgdGhlIGxpc3QncyByb290IG5vZGUuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldExpc3RGcm9tS25vcmEocm9vdE5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvbGlzdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChyb290Tm9kZUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IGFzIGV4cGFuZGVkIEpTT04tTEQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcm9vdE5vZGVJcmkgdGhlIHJvb3Qgbm9kZSBvZiB0aGUgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPG9iamVjdD59IHRoZSBleHBhbmRlZCBKU09OLUxELlxuICAgICAqL1xuICAgIGdldExpc3Qocm9vdE5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG4gICAgICAgIGNvbnN0IGxpc3RKU09OTEQgPSB0aGlzLmdldExpc3RGcm9tS25vcmEocm9vdE5vZGVJcmkpO1xuXG4gICAgICAgIHJldHVybiBsaXN0SlNPTkxELnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBub2RlIGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdE5vZGVJcmkgdGhlIElyaSBvZiB0aGUgbGlzdCBub2RlLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj59XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRMaXN0Tm9kZUZyb21Lbm9yYShsaXN0Tm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9ub2RlLycgKyBlbmNvZGVVUklDb21wb25lbnQobGlzdE5vZGVJcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBub2RlIGFzIGV4cGFuZGVkIEpTT04tTEQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdE5vZGVJcmkgdGhlIElyaSBvZiB0aGUgbGlzdCBub2RlLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8b2JqZWN0Pn1cbiAgICAgKi9cbiAgICBnZXRMaXN0Tm9kZShsaXN0Tm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICBjb25zdCBsaXN0Tm9kZUpTT05MRCA9IHRoaXMuZ2V0TGlzdE5vZGVGcm9tS25vcmEobGlzdE5vZGVJcmkpO1xuXG4gICAgICAgIHJldHVybiBsaXN0Tm9kZUpTT05MRC5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19