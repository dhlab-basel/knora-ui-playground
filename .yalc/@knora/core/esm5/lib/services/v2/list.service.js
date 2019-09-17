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
    ListService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ListService_Factory() { return new ListService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken)); }, token: ListService, providedIn: "root" });
    ListService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(KuiCoreConfigToken)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], ListService);
    return ListService;
}(ApiService));
export { ListService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xELE9BQU8sRUFBTyxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUt2RDtJQUFpQyx1Q0FBVTtJQUV2QyxxQkFBbUIsSUFBZ0IsRUFDWSxNQUFNO1FBRHJELFlBRUksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtRQUhrQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQ1ksWUFBTSxHQUFOLE1BQU0sQ0FBQTs7SUFFckQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssc0NBQWdCLEdBQXhCLFVBQXlCLFdBQW1CO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw2QkFBTyxHQUFQLFVBQVEsV0FBbUI7UUFDdkIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FDbEIsUUFBUTtRQUNKLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsYUFBYSxDQUNyQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSywwQ0FBb0IsR0FBNUIsVUFBNkIsV0FBbUI7UUFDNUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlDQUFXLEdBQVgsVUFBWSxXQUFtQjtRQUUzQixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUQsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUN0QixRQUFRO1FBQ0osNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxhQUFhLENBQ3JCLENBQ0osQ0FBQztJQUNOLENBQUM7O0lBNURRLFdBQVc7UUFIdkIsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUllLG1CQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO2lEQURkLFVBQVU7T0FGMUIsV0FBVyxDQTZEdkI7c0JBeEVEO0NBd0VDLEFBN0RELENBQWlDLFVBQVUsR0E2RDFDO1NBN0RZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICcuLi8uLi9jb3JlLm1vZHVsZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdFNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGh0dHAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGhpZXJhcmNoaWNhbCBsaXN0IGZyb20gS25vcmEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcm9vdE5vZGVJcmkgdGhlIElyaSBvZiB0aGUgbGlzdCdzIHJvb3Qgbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+fVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0TGlzdEZyb21Lbm9yYShyb290Tm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9saXN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJvb3ROb2RlSXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3QgYXMgZXhwYW5kZWQgSlNPTi1MRC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByb290Tm9kZUlyaSB0aGUgcm9vdCBub2RlIG9mIHRoZSBsaXN0LlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8b2JqZWN0Pn0gdGhlIGV4cGFuZGVkIEpTT04tTEQuXG4gICAgICovXG4gICAgZ2V0TGlzdChyb290Tm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcbiAgICAgICAgY29uc3QgbGlzdEpTT05MRCA9IHRoaXMuZ2V0TGlzdEZyb21Lbm9yYShyb290Tm9kZUlyaSk7XG5cbiAgICAgICAgcmV0dXJuIGxpc3RKU09OTEQucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBsaXN0IG5vZGUgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0Tm9kZUlyaSB0aGUgSXJpIG9mIHRoZSBsaXN0IG5vZGUuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldExpc3ROb2RlRnJvbUtub3JhKGxpc3ROb2RlSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL25vZGUvJyArIGVuY29kZVVSSUNvbXBvbmVudChsaXN0Tm9kZUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG5vZGUgYXMgZXhwYW5kZWQgSlNPTi1MRC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0Tm9kZUlyaSB0aGUgSXJpIG9mIHRoZSBsaXN0IG5vZGUuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxvYmplY3Q+fVxuICAgICAqL1xuICAgIGdldExpc3ROb2RlKGxpc3ROb2RlSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIGNvbnN0IGxpc3ROb2RlSlNPTkxEID0gdGhpcy5nZXRMaXN0Tm9kZUZyb21Lbm9yYShsaXN0Tm9kZUlyaSk7XG5cbiAgICAgICAgcmV0dXJuIGxpc3ROb2RlSlNPTkxELnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=