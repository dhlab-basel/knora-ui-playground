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
export class ListCacheService {
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
}
ListCacheService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ListCacheService.ctorParameters = () => [
    { type: ListService }
];
ListCacheService.ngInjectableDef = i0.defineInjectable({ factory: function ListCacheService_Factory() { return new ListCacheService(i0.inject(i1.ListService)); }, token: ListCacheService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jYWNoZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdjIvbGlzdC1jYWNoZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTdDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUFNbkIsWUFBcUIsRUFBVSxFQUFXLEtBQWEsRUFBVyxRQUFpQixFQUFXLFdBQW9CO1FBQTdGLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVcsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFXLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBRTlHLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQUVELE1BQU0sU0FBUztDQUlkO0FBRUQsTUFBTSx1QkFBdUI7Q0FHNUI7QUFLRCxNQUFNLE9BQU8sZ0JBQWdCO0lBTXpCLFlBQW9CLFlBQXlCO1FBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBSnJDLGNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBRTVCLDRCQUF1QixHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQWVoRTs7Ozs7O1dBTUc7UUFDSyw0QkFBdUIsR0FBdUMsQ0FBQyxVQUFrQixFQUFFLEVBQUU7WUFFekYsTUFBTSxXQUFXLEdBQUcsVUFB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YyxDQUFDLENBQUM7Z0JBRXJELElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtvQkFDM0IscUJBQXFCO29CQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNqQyxHQUFHLENBQ0MsQ0FBQyxZQUF3QixFQUFFLEVBQUU7d0JBQ3pCLDJCQUEyQjt3QkFDM0IsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUNULENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsNENBQTRDO29CQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNqQyxHQUFHLENBQ0MsQ0FBQyxZQUF3QixFQUFFLEVBQUU7d0JBQ3pCLDJCQUEyQjt3QkFDM0IsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUNULENBQUM7aUJBQ0w7WUFDTCxDQUFDLENBQ0osQ0FDSixDQUFDO1NBQ0w7SUFDTCxDQUFDOzs7WUFqSkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBakNRLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi9saXN0LnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IG5vZGUgdjIuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZVYyIHtcblxuICAgIHJlYWRvbmx5IGNoaWxkcmVuOiBMaXN0Tm9kZVYyW107XG5cbiAgICByZWFkb25seSBpc1Jvb3ROb2RlOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgbGFiZWw6IHN0cmluZywgcmVhZG9ubHkgcG9zaXRpb24/OiBudW1iZXIsIHJlYWRvbmx5IGhhc1Jvb3ROb2RlPzogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gaWYgaGFzUm9vdE5vZGUgaXMgbm90IGdpdmVuLCB0aGlzIG5vZGUgaXMgdGhlIHJvb3Qgbm9kZS5cbiAgICAgICAgdGhpcy5pc1Jvb3ROb2RlID0gKGhhc1Jvb3ROb2RlID09PSB1bmRlZmluZWQpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB9XG59XG5cbmNsYXNzIExpc3RDYWNoZSB7XG5cbiAgICBbaW5kZXg6IHN0cmluZ106IExpc3ROb2RlVjI7XG5cbn1cblxuY2xhc3MgTGlzdE5vZGVJcmlUb0xpc3ROb2RlVjIge1xuXG4gICAgW2luZGV4OiBzdHJpbmddOiBMaXN0Tm9kZVYyO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RDYWNoZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBsaXN0Q2FjaGUgPSBuZXcgTGlzdENhY2hlKCk7XG5cbiAgICBwcml2YXRlIGxpc3ROb2RlSXJpVG9MaXN0Tm9kZVYyID0gbmV3IExpc3ROb2RlSXJpVG9MaXN0Tm9kZVYyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9saXN0U2VydmljZTogTGlzdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc1Jvb3ROb2RlKGxpc3RKU09OTEQpIHtcbiAgICAgICAgbGV0IGhhc1Jvb3Q7XG5cbiAgICAgICAgaWYgKGxpc3RKU09OTERbJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNoYXNSb290Tm9kZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhhc1Jvb3QgPSBsaXN0SlNPTkxEWydodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjaGFzUm9vdE5vZGUnXVsnQGlkJ107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzUm9vdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEpTT04tTEQgcmVwcmVzZW50aW9uIG9mIGEgTGlzdE5vZGVWMiB0byAgYSBgTGlzdE5vZGVWMmAuXG4gICAgICogUmVjdXJzaXZlbHkgY29udmVydHMgY2hpbGQgbm9kZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbGlzdEpTT05MRCB0aGUgSlNPTi1MRCByZXByZXNlbnRhdGlvbiBvZiBhIGxpc3Qgbm9kZSB2Mi5cbiAgICAgKiBAcmV0dXJuIHtMaXN0Tm9kZVYyfVxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEpTT05MRFRvTGlzdE5vZGU6IChsaXN0SlNPTkxEOiBvYmplY3QpID0+IExpc3ROb2RlVjIgPSAobGlzdEpTT05MRDogb2JqZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgbGlzdE5vZGVJcmkgPSBsaXN0SlNPTkxEWydAaWQnXTtcblxuICAgICAgICBjb25zdCBoYXNSb290Tm9kZSA9IHRoaXMuaGFzUm9vdE5vZGUobGlzdEpTT05MRCk7XG5cbiAgICAgICAgY29uc3QgbGlzdE5vZGUgPSBuZXcgTGlzdE5vZGVWMihcbiAgICAgICAgICAgIGxpc3ROb2RlSXJpLFxuICAgICAgICAgICAgbGlzdEpTT05MRFsnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI2xhYmVsJ10sXG4gICAgICAgICAgICBsaXN0SlNPTkxEWydodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjbGlzdE5vZGVQb3NpdGlvbiddLFxuICAgICAgICAgICAgaGFzUm9vdE5vZGVcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgY2hpbGQgbm9kZXNcbiAgICAgICAgaWYgKGxpc3RKU09OTERbJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNoYXNTdWJMaXN0Tm9kZSddICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGlzdEpTT05MRFsnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI2hhc1N1Ykxpc3ROb2RlJ10pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2YgY2hpbGQgbm9kZXNcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ykxpc3ROb2RlIG9mIGxpc3RKU09OTERbJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNoYXNTdWJMaXN0Tm9kZSddKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3ROb2RlLmNoaWxkcmVuLnB1c2godGhpcy5jb252ZXJ0SlNPTkxEVG9MaXN0Tm9kZShzdWJMaXN0Tm9kZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc2luZ2xlIGNoaWxkIG5vZGVcbiAgICAgICAgICAgICAgICBsaXN0Tm9kZS5jaGlsZHJlbi5wdXNoKHRoaXMuY29udmVydEpTT05MRFRvTGlzdE5vZGUobGlzdEpTT05MRFsnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI2hhc1N1Ykxpc3ROb2RlJ10pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saXN0Tm9kZUlyaVRvTGlzdE5vZGVWMltsaXN0Tm9kZUlyaV0gPSBsaXN0Tm9kZTtcblxuICAgICAgICByZXR1cm4gbGlzdE5vZGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBsaXN0IGZyb20gdGhlIGNhY2hlIG9yIHJlcXVlc3RzIGl0IGZyb20gS25vcmEgYW5kIGNhY2hlcyBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByb290Tm9kZUlyaSB0aGUgSXJpIG9mIHRoZSBsaXN0J3Mgcm9vdCBub2RlLlxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8TGlzdE5vZGVWMj59XG4gICAgICovXG4gICAgZ2V0TGlzdChyb290Tm9kZUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0Tm9kZVYyPiB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgbGlzdCBpcyBhbHJlYWR5IGluIGNhY2hlXG4gICAgICAgIGlmICh0aGlzLmxpc3RDYWNoZVtyb290Tm9kZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gbGlzdCBmcm9tIGNhY2hlXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5saXN0Q2FjaGVbcm9vdE5vZGVJcmldKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZ2V0IGxpc3QgZnJvbSBLbm9yYSBhbmQgY2FjaGUgaXRcblxuICAgICAgICAgICAgY29uc3QgbGlzdEpTT05MRCA9IHRoaXMuX2xpc3RTZXJ2aWNlLmdldExpc3Qocm9vdE5vZGVJcmkpO1xuXG4gICAgICAgICAgICBjb25zdCBsaXN0VjI6IE9ic2VydmFibGU8TGlzdE5vZGVWMj4gPSBsaXN0SlNPTkxELnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRKU09OTERUb0xpc3ROb2RlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxpc3RWMi5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgKGxpc3Q6IExpc3ROb2RlVjIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlIGxpc3QgdG8gY2FjaGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q2FjaGVbcm9vdE5vZGVJcmldID0gbGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBsaXN0IG5vZGUgZnJvbSB0aGUgY2FjaGUgb3IgcmVxdWVzdHMgdGhlIHdob2xlIGxpc3QgZnJvbSBLbm9yYSBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpc3ROb2RlSXJpIHRoZSBJcmkgb2YgdGhlIGxpc3Qgbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPG9iamVjdD59XG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGUobGlzdE5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVWMj4ge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGxpc3Qgbm9kZSBpcyBhbHJlYWR5IGluIGNhY2hlXG4gICAgICAgIGlmICh0aGlzLmxpc3ROb2RlSXJpVG9MaXN0Tm9kZVYyW2xpc3ROb2RlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIC8vIGxpc3Qgbm9kZSBpcyBhbHJlYWR5IGNhY2hlZFxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMubGlzdE5vZGVJcmlUb0xpc3ROb2RlVjJbbGlzdE5vZGVJcmldKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zdCBsaXN0Tm9kZSA9IHRoaXMuX2xpc3RTZXJ2aWNlLmdldExpc3ROb2RlKGxpc3ROb2RlSXJpKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxpc3ROb2RlLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIChsaXN0Tm9kZUpTT05MRDogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNSb290Tm9kZSA9IHRoaXMuaGFzUm9vdE5vZGUobGlzdE5vZGVKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzUm9vdE5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgd2hvbGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldExpc3QoaGFzUm9vdE5vZGUpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb21wbGV0ZUxpc3Q6IExpc3ROb2RlVjIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgbGlzdCBub2RlIGZyb20gY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0Tm9kZUlyaVRvTGlzdE5vZGVWMltsaXN0Tm9kZUlyaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHJvb3Qgbm9kZSwgZ2V0IHRoZSB3aG9sZSBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdChsaXN0Tm9kZUlyaSkucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbXBsZXRlTGlzdDogTGlzdE5vZGVWMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBsaXN0IG5vZGUgZnJvbSBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3ROb2RlSXJpVG9MaXN0Tm9kZVYyW2xpc3ROb2RlSXJpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=