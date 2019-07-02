import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ListService } from './list.service';
import * as i0 from "@angular/core";
import * as i1 from "./list.service";
/**
 * Represents a list node v2.
 */
export class ListNodeV2 {
    constructor(id, label, position, hasRootNode) {
        this.id = id;
        this.label = label;
        this.position = position;
        this.hasRootNode = hasRootNode;
        // if hasRootNode is not given, this node is the root node.
        this.isRootNode = (hasRootNode === undefined);
        this.children = [];
    }
}
class ListCache {
}
class ListNodeIriToListNodeV2 {
}
let ListCacheService = class ListCacheService {
    constructor(_listService) {
        this._listService = _listService;
        this.listCache = new ListCache();
        this.listNodeIriToListNodeV2 = new ListNodeIriToListNodeV2();
        /**
         * Converts a JSON-LD represention of a ListNodeV2 to  a `ListNodeV2`.
         * Recursively converts child nodes.
         *
         * @param {object} listJSONLD the JSON-LD representation of a list node v2.
         * @return {ListNodeV2}
         */
        this.convertJSONLDToListNode = (listJSONLD) => {
            const listNodeIri = listJSONLD['@id'];
            const hasRootNode = this.hasRootNode(listJSONLD);
            const listNode = new ListNodeV2(listNodeIri, listJSONLD['http://www.w3.org/2000/01/rdf-schema#label'], listJSONLD['http://api.knora.org/ontology/knora-api/v2#listNodePosition'], hasRootNode);
            // check if there are child nodes
            if (listJSONLD['http://api.knora.org/ontology/knora-api/v2#hasSubListNode'] !== undefined) {
                if (Array.isArray(listJSONLD['http://api.knora.org/ontology/knora-api/v2#hasSubListNode'])) {
                    // array of child nodes
                    for (const subListNode of listJSONLD['http://api.knora.org/ontology/knora-api/v2#hasSubListNode']) {
                        listNode.children.push(this.convertJSONLDToListNode(subListNode));
                    }
                }
                else {
                    // single child node
                    listNode.children.push(this.convertJSONLDToListNode(listJSONLD['http://api.knora.org/ontology/knora-api/v2#hasSubListNode']));
                }
            }
            this.listNodeIriToListNodeV2[listNodeIri] = listNode;
            return listNode;
        };
    }
    hasRootNode(listJSONLD) {
        let hasRoot;
        if (listJSONLD['http://api.knora.org/ontology/knora-api/v2#hasRootNode'] !== undefined) {
            hasRoot = listJSONLD['http://api.knora.org/ontology/knora-api/v2#hasRootNode']['@id'];
        }
        return hasRoot;
    }
    /**
     * Gets a list from the cache or requests it from Knora and caches it.
     *
     * @param {string} rootNodeIri the Iri of the list's root node.
     * @return {Observable<ListNodeV2>}
     */
    getList(rootNodeIri) {
        // check if list is already in cache
        if (this.listCache[rootNodeIri] !== undefined) {
            // return list from cache
            return of(this.listCache[rootNodeIri]);
        }
        else {
            // get list from Knora and cache it
            const listJSONLD = this._listService.getList(rootNodeIri);
            const listV2 = listJSONLD.pipe(map(this.convertJSONLDToListNode));
            return listV2.pipe(map((list) => {
                // write list to cache and return it
                this.listCache[rootNodeIri] = list;
                return list;
            }));
        }
    }
    /**
     * Gets a list node from the cache or requests the whole list from Knora and caches it.
     *
     * @param {string} listNodeIri the Iri of the list node.
     * @return {Observable<object>}
     */
    getListNode(listNodeIri) {
        // check if list node is already in cache
        if (this.listNodeIriToListNodeV2[listNodeIri] !== undefined) {
            // list node is already cached
            return of(this.listNodeIriToListNodeV2[listNodeIri]);
        }
        else {
            const listNode = this._listService.getListNode(listNodeIri);
            return listNode.pipe(mergeMap((listNodeJSONLD) => {
                const hasRootNode = this.hasRootNode(listNodeJSONLD);
                if (hasRootNode !== undefined) {
                    // get the whole list
                    return this.getList(hasRootNode).pipe(map((completeList) => {
                        // get list node from cache
                        return this.listNodeIriToListNodeV2[listNodeIri];
                    }));
                }
                else {
                    // this is the root node, get the whole list
                    return this.getList(listNodeIri).pipe(map((completeList) => {
                        // get list node from cache
                        return this.listNodeIriToListNodeV2[listNodeIri];
                    }));
                }
            }));
        }
    }
};
ListCacheService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ListCacheService_Factory() { return new ListCacheService(i0.ɵɵinject(i1.ListService)); }, token: ListCacheService, providedIn: "root" });
ListCacheService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ListService])
], ListCacheService);
export { ListCacheService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jYWNoZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvbGlzdC1jYWNoZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUU3Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxVQUFVO0lBTW5CLFlBQXFCLEVBQVUsRUFBVyxLQUFhLEVBQVcsUUFBaUIsRUFBVyxXQUFvQjtRQUE3RixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVcsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFXLGFBQVEsR0FBUixRQUFRLENBQVM7UUFBVyxnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUU5RywyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFFRCxNQUFNLFNBQVM7Q0FJZDtBQUVELE1BQU0sdUJBQXVCO0NBRzVCO0FBS0QsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFNekIsWUFBb0IsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFKckMsY0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFFNUIsNEJBQXVCLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1FBZWhFOzs7Ozs7V0FNRztRQUNLLDRCQUF1QixHQUF1QyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtZQUV6RixNQUFN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LFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFFckQsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO29CQUMzQixxQkFBcUI7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ2pDLEdBQUcsQ0FDQyxDQUFDLFlBQXdCLEVBQUUsRUFBRTt3QkFDekIsMkJBQTJCO3dCQUMzQixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQ1QsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCw0Q0FBNEM7b0JBQzVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ2pDLEdBQUcsQ0FDQyxDQUFDLFlBQXdCLEVBQUUsRUFBRTt3QkFDekIsMkJBQTJCO3dCQUMzQixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQ1QsQ0FBQztpQkFDTDtZQUNMLENBQUMsQ0FDSixDQUNKLENBQUM7U0FDTDtJQUNMLENBQUM7Q0FDSixDQUFBOztBQS9JWSxnQkFBZ0I7SUFINUIsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQzs2Q0FPb0MsV0FBVztHQU5wQyxnQkFBZ0IsQ0ErSTVCO1NBL0lZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuL2xpc3Quc2VydmljZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpc3Qgbm9kZSB2Mi5cbiAqL1xuZXhwb3J0IGNsYXNzIExpc3ROb2RlVjIge1xuXG4gICAgcmVhZG9ubHkgY2hpbGRyZW46IExpc3ROb2RlVjJbXTtcblxuICAgIHJlYWRvbmx5IGlzUm9vdE5vZGU6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBsYWJlbDogc3RyaW5nLCByZWFkb25seSBwb3NpdGlvbj86IG51bWJlciwgcmVhZG9ubHkgaGFzUm9vdE5vZGU/OiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBpZiBoYXNSb290Tm9kZSBpcyBub3QgZ2l2ZW4sIHRoaXMgbm9kZSBpcyB0aGUgcm9vdCBub2RlLlxuICAgICAgICB0aGlzLmlzUm9vdE5vZGUgPSAoaGFzUm9vdE5vZGUgPT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgIH1cbn1cblxuY2xhc3MgTGlzdENhY2hlIHtcblxuICAgIFtpbmRleDogc3RyaW5nXTogTGlzdE5vZGVWMjtcblxufVxuXG5jbGFzcyBMaXN0Tm9kZUlyaVRvTGlzdE5vZGVWMiB7XG5cbiAgICBbaW5kZXg6IHN0cmluZ106IExpc3ROb2RlVjI7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdENhY2hlU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGxpc3RDYWNoZSA9IG5ldyBMaXN0Q2FjaGUoKTtcblxuICAgIHByaXZhdGUgbGlzdE5vZGVJcmlUb0xpc3ROb2RlVjIgPSBuZXcgTGlzdE5vZGVJcmlUb0xpc3ROb2RlVjIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xpc3RTZXJ2aWNlOiBMaXN0U2VydmljZSkge1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzUm9vdE5vZGUobGlzdEpTT05MRCkge1xuICAgICAgICBsZXQgaGFzUm9vdDtcblxuICAgICAgICBpZiAobGlzdEpTT05MRFsnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI2hhc1Jvb3ROb2RlJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaGFzUm9vdCA9IGxpc3RKU09OTERbJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNoYXNSb290Tm9kZSddWydAaWQnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoYXNSb290O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgSlNPTi1MRCByZXByZXNlbnRpb24gb2YgYSBMaXN0Tm9kZVYyIHRvICBhIGBMaXN0Tm9kZVYyYC5cbiAgICAgKiBSZWN1cnNpdmVseSBjb252ZXJ0cyBjaGlsZCBub2Rlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBsaXN0SlNPTkxEIHRoZSBKU09OLUxEIHJlcHJlc2VudGF0aW9uIG9mIGEgbGlzdCBub2RlIHYyLlxuICAgICAqIEByZXR1cm4ge0xpc3ROb2RlVjJ9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0SlNPTkxEVG9MaXN0Tm9kZTogKGxpc3RKU09OTEQ6IG9iamVjdCkgPT4gTGlzdE5vZGVWMiA9IChsaXN0SlNPTkxEOiBvYmplY3QpID0+IHtcblxuICAgICAgICBjb25zdCBsaXN0Tm9kZUlyaSA9IGxpc3RKU09OTERbJ0BpZCddO1xuXG4gICAgICAgIGNvbnN0IGhhc1Jvb3ROb2RlID0gdGhpcy5oYXNSb290Tm9kZShsaXN0SlNPTkxEKTtcblxuICAgICAgICBjb25zdCBsaXN0Tm9kZSA9IG5ldyBMaXN0Tm9kZVYyKFxuICAgICAgICAgICAgbGlzdE5vZGVJcmksXG4gICAgICAgICAgICBsaXN0SlNPTkxEWydodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjbGFiZWwnXSxcbiAgICAgICAgICAgIGxpc3RKU09OTERbJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNsaXN0Tm9kZVBvc2l0aW9uJ10sXG4gICAgICAgICAgICBoYXNSb290Tm9kZVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBjaGlsZCBub2Rlc1xuICAgICAgICBpZiAobGlzdEpTT05MRFsnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI2hhc1N1Ykxpc3ROb2RlJ10gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0SlNPTkxEWydodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjaGFzU3ViTGlzdE5vZGUnXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiBjaGlsZCBub2Rlc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViTGlzdE5vZGUgb2YgbGlzdEpTT05MRFsnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI2hhc1N1Ykxpc3ROb2RlJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdE5vZGUuY2hpbGRyZW4ucHVzaCh0aGlzLmNvbnZlcnRKU09OTERUb0xpc3ROb2RlKHN1Ykxpc3ROb2RlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2hpbGQgbm9kZVxuICAgICAgICAgICAgICAgIGxpc3ROb2RlLmNoaWxkcmVuLnB1c2godGhpcy5jb252ZXJ0SlNPTkxEVG9MaXN0Tm9kZShsaXN0SlNPTkxEWydodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjaGFzU3ViTGlzdE5vZGUnXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxpc3ROb2RlSXJpVG9MaXN0Tm9kZVYyW2xpc3ROb2RlSXJpXSA9IGxpc3ROb2RlO1xuXG4gICAgICAgIHJldHVybiBsaXN0Tm9kZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGxpc3QgZnJvbSB0aGUgY2FjaGUgb3IgcmVxdWVzdHMgaXQgZnJvbSBLbm9yYSBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJvb3ROb2RlSXJpIHRoZSBJcmkgb2YgdGhlIGxpc3QncyByb290IG5vZGUuXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxMaXN0Tm9kZVYyPn1cbiAgICAgKi9cbiAgICBnZXRMaXN0KHJvb3ROb2RlSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlVjI+IHtcblxuICAgICAgICAvLyBjaGVjayBpZiBsaXN0IGlzIGFscmVhZHkgaW4gY2FjaGVcbiAgICAgICAgaWYgKHRoaXMubGlzdENhY2hlW3Jvb3ROb2RlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBsaXN0IGZyb20gY2FjaGVcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmxpc3RDYWNoZVtyb290Tm9kZUlyaV0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBnZXQgbGlzdCBmcm9tIEtub3JhIGFuZCBjYWNoZSBpdFxuXG4gICAgICAgICAgICBjb25zdCBsaXN0SlNPTkxEID0gdGhpcy5fbGlzdFNlcnZpY2UuZ2V0TGlzdChyb290Tm9kZUlyaSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3RWMjogT2JzZXJ2YWJsZTxMaXN0Tm9kZVYyPiA9IGxpc3RKU09OTEQucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvTGlzdE5vZGVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gbGlzdFYyLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAobGlzdDogTGlzdE5vZGVWMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd3JpdGUgbGlzdCB0byBjYWNoZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RDYWNoZVtyb290Tm9kZUlyaV0gPSBsaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGxpc3Qgbm9kZSBmcm9tIHRoZSBjYWNoZSBvciByZXF1ZXN0cyB0aGUgd2hvbGUgbGlzdCBmcm9tIEtub3JhIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdE5vZGVJcmkgdGhlIElyaSBvZiB0aGUgbGlzdCBub2RlLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8b2JqZWN0Pn1cbiAgICAgKi9cbiAgICBnZXRMaXN0Tm9kZShsaXN0Tm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZVYyPiB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgbGlzdCBub2RlIGlzIGFscmVhZHkgaW4gY2FjaGVcbiAgICAgICAgaWYgKHRoaXMubGlzdE5vZGVJcmlUb0xpc3ROb2RlVjJbbGlzdE5vZGVJcmldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgLy8gbGlzdCBub2RlIGlzIGFscmVhZHkgY2FjaGVkXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5saXN0Tm9kZUlyaVRvTGlzdE5vZGVWMltsaXN0Tm9kZUlyaV0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3ROb2RlID0gdGhpcy5fbGlzdFNlcnZpY2UuZ2V0TGlzdE5vZGUobGlzdE5vZGVJcmkpO1xuXG4gICAgICAgICAgICByZXR1cm4gbGlzdE5vZGUucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgKGxpc3ROb2RlSlNPTkxEOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1Jvb3ROb2RlID0gdGhpcy5oYXNSb290Tm9kZShsaXN0Tm9kZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNSb290Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSB3aG9sZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdChoYXNSb290Tm9kZSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbXBsZXRlTGlzdDogTGlzdE5vZGVWMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBsaXN0IG5vZGUgZnJvbSBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3ROb2RlSXJpVG9MaXN0Tm9kZVYyW2xpc3ROb2RlSXJpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgcm9vdCBub2RlLCBnZXQgdGhlIHdob2xlIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMaXN0KGxpc3ROb2RlSXJpKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29tcGxldGVMaXN0OiBMaXN0Tm9kZVYyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGxpc3Qgbm9kZSBmcm9tIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdE5vZGVJcmlUb0xpc3ROb2RlVjJbbGlzdE5vZGVJcmldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==