import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { KuiCoreConfigToken } from '../../core.module';
import { KnoraConstants, StillImageRepresentation } from '../../declarations';
import { ApiService } from '../api.service';
import { ConvertJSONLD } from './convert-jsonld';
import { IncomingService } from './incoming.service';
import { OntologyCacheService } from './ontology-cache.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
import * as i3 from "./incoming.service";
import * as i4 from "./ontology-cache.service";
/**
 * Requests representation of resources from Knora.
 */
var ResourceService = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceService, _super);
    function ResourceService(http, config, _incomingService, _ontologyCacheService) {
        var _this = _super.call(this, http, config) || this;
        _this.http = http;
        _this.config = config;
        _this._incomingService = _incomingService;
        _this._ontologyCacheService = _ontologyCacheService;
        return _this;
    }
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    // this should return a resource object with incoming links, annotations, file representations
    // it includes a property: FileRepresentation to display with the parameters for the media type viewer
    ResourceService.prototype.getResource = function (iri) {
        var _this = this;
        var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        function (resourceResponse) {
            var e_1, _a, e_2, _b;
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            var res = resSeq.resources[0];
            // set file representation to display
            console.log(Object.keys(res.properties));
            var propKeys = Object.keys(res.properties);
            switch (true) {
                case propKeys.includes(KnoraConstants.hasStillImageFileValue):
                    // res.fileRepresentationsToDisplay[0] = res.properties[KnoraConstants.hasStillImageFileValue];
                    var imgRepresentations = [];
                    var fileValues = res.properties[KnoraConstants.hasStillImageFileValue];
                    var imagesToDisplay = fileValues.filter(function (image) {
                        return !image.isPreview;
                    });
                    try {
                        for (var imagesToDisplay_1 = tslib_1.__values(imagesToDisplay), imagesToDisplay_1_1 = imagesToDisplay_1.next(); !imagesToDisplay_1_1.done; imagesToDisplay_1_1 = imagesToDisplay_1.next()) {
                            var img = imagesToDisplay_1_1.value;
                            var regions = [];
                            try {
                                for (var _c = tslib_1.__values(res.incomingAnnotations), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var incomingRegion = _d.value;
                                    // TODO: change return type in ImageRegion from ReadResource into Resource
                                    // const region = new ImageRegion(incomingRegion);
                                    // regions.push(region);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            var stillImage = new StillImageRepresentation(img, regions);
                            imgRepresentations.push(stillImage);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (imagesToDisplay_1_1 && !imagesToDisplay_1_1.done && (_a = imagesToDisplay_1.return)) _a.call(imagesToDisplay_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    res.fileRepresentationsToDisplay = imgRepresentations;
                    break;
                case propKeys.includes(KnoraConstants.hasMovingImageFileValue):
                    res.fileRepresentationsToDisplay = res.properties[KnoraConstants.hasMovingImageFileValue];
                    break;
                case propKeys.includes(KnoraConstants.hasAudioFileValue):
                    res.fileRepresentationsToDisplay = res.properties[KnoraConstants.hasAudioFileValue];
                    break;
                case propKeys.includes(KnoraConstants.hasDocumentFileValue):
                    res.fileRepresentationsToDisplay = res.properties[KnoraConstants.hasDocumentFileValue];
                    break;
                case propKeys.includes(KnoraConstants.hasDDDFileValue):
                    res.fileRepresentationsToDisplay = res.properties[KnoraConstants.hasDDDFileValue];
                    break;
                // NYI / TODO: TextFileValue
                default:
                    // look for incoming fileRepresentation to display
                    // e.g. looking for incoming stillImage files
                    _this._incomingService.getStillImageRepresentationsForCompoundResource(res.id, 0).subscribe(function (incomingImageRepresentations) {
                        if (incomingImageRepresentations.resources.length > 0) {
                            // update ontology information
                            resSeq.ontologyInformation.updateOntologyInformation(incomingImageRepresentations.ontologyInformation);
                            // set current offset
                            // this.incomingStillImageRepresentationCurrentOffset = offset;
                            // TODO: implement prepending of StillImageRepresentations when moving to the left (getting previous pages)
                            // TODO: append existing images to response and then assign response to `this.resource.incomingStillImageRepresentations`
                            // TODO: maybe we have to support non consecutive arrays (sparse arrays)
                            // append incomingImageRepresentations.resources to this.resource.incomingStillImageRepresentations
                            Array.prototype.push.apply(resSeq.resources[0].incomingFileRepresentations, incomingImageRepresentations.resources);
                            // prepare attached image files to be displayed
                            // BeolResource.collectImagesAndRegionsForResource(this.resource);
                        }
                    }, function (error) {
                        console.error(error);
                    });
                    console.log('incoming file representations to display');
            }
            // resource.properties[KnoraConstants.hasStillImageFileValue]
            // get incoming links
            _this._incomingService.getIncomingLinks(resSeq.resources[0].id, 0).subscribe(function (incomingRes) {
                // update ontology information
                resSeq.ontologyInformation.updateOntologyInformation(incomingRes.ontologyInformation);
                // Append elements incomingResources to this.sequence.incomingLinks
                Array.prototype.push.apply(resSeq.resources[0].incomingLinks, incomingRes.resources);
            });
            // get incoming annotations
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                console.log('resSeq -- resourceServie', resSeq);
                return resSeq;
            }));
        }));
        // let resSeq: Observable<ResourcesSequence>;
        /*
        this.getResourcesSequence(iri).subscribe(
            (sequence: ResourcesSequence) => {

                // resSeq = sequence;

                /* pipe(
                    map((result: ApiServiceResult) => result.getBody(GroupsResponse).groups),
                    catchError(this.handleJsonError)
                );

                resSeq.pipe(
                    map((seq: ResourcesSequence) => sequence),
                    catchError(this.handleJsonError)
                ); *

                // get incoming links
                this._incomingService.getIncomingLinks(sequence.resources[0].id, 0).subscribe(
                    (incomingResources: ResourcesSequence) => {
                        // update ontology information
                        sequence.ontologyInformation.updateOntologyInformation(incomingResources.ontologyInformation);

                        // Append elements incomingResources to this.sequence.incomingLinks
                        Array.prototype.push.apply(sequence.resources[0].incomingLinks, incomingResources.resources);

                        // if callback is given, execute function with the amount of incoming resources as the parameter
                        /* TODO: what is callback? Find a solution
                        if (callback !== undefined) {
                            callback(incomingResources.resources.length);
                        }
                        *

                    },
                    (error: any) => {
                        console.error(error);
                    }
                );

                // get incoming annotations

                // get incoming filerepresentations



            },
            (error: ApiServiceError) => {
                console.error(error);
                return error;
            }
        );


        return resSeq;
        */
    };
    ResourceService.prototype.getResourcesSequence = function (iri) {
        var _this = this;
        var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        function (resourceResponse) {
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        }));
    };
    ResourceService.prototype.requestIncomingResources = function (sequence) {
        // make sure that this.sequence has been initialized correctly
        if (sequence === undefined) {
            return;
        }
        // request incoming sequences in case of movingImage and audio
        // request incoming regions in case of stillImage and dddImage
        if (sequence.resources[0].properties[KnoraConstants.hasStillImageFileValue]) {
            // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // the resource is a StillImageRepresentation, check if there are regions pointing to it
            // this.getIncomingRegions(0);
        }
        else {
            // this resource is not a StillImageRepresentation
            // check if there are StillImageRepresentations pointing to this resource
            // this gets the first page of incoming StillImageRepresentations
            // more pages may be requested by [[this.viewer]].
            // TODO: for now, we begin with offset 0. This may have to be changed later (beginning somewhere in a collection)
            // this.getIncomingStillImageRepresentations(0);
        }
        // check for incoming links for the current resource
        // this.getIncomingLinks(0);
    };
    /**
     * @deprecated Use **getResourcesSequence** instead
     *
     * Given the Iri, requests the representation of a resource as a `ReadResourceSequence`.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns {Observable<ReadResourcesSequence>}
     */
    ResourceService.prototype.getReadResource = function (iri) {
        var _this = this;
        var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        // TODO: handle case of an ApiServiceError
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        function (resourceResponse) {
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        }));
    };
    ResourceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ResourceService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] },
        { type: IncomingService },
        { type: OntologyCacheService }
    ]; };
    ResourceService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken), i0.inject(i3.IncomingService), i0.inject(i4.OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
    return ResourceService;
}(ApiService));
export { ResourceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBa0QsY0FBYyxFQUFxRSx3QkFBd0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pNLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBdUIsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBRXJGOztHQUVHO0FBQ0g7SUFHcUMsMkNBQVU7SUFFM0MseUJBQW9CLElBQWdCLEVBQ0csTUFBTSxFQUNqQyxnQkFBaUMsRUFDakMscUJBQTJDO1FBSHZELFlBSUksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtRQUxtQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQ0csWUFBTSxHQUFOLE1BQU0sQ0FBQTtRQUNqQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLDJCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7O0lBRXZELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDhGQUE4RjtJQUM5RixzR0FBc0c7SUFDdEcscUNBQVcsR0FBWCxVQUFZLEdBQVc7UUFB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QyxJQUFJLENBQ1gsUUFBUTtRQUNKLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsYUFBYSxDQUNyQixFQUNELFFBQVE7UUFDSiw2Q0FBNkM7UUFDN0MsVUFBQyxnQkFBd0I7WUFDckIsOENBQThDO1lBQzlDLElBQU0sTUFBTSxHQUEwQixhQUFhLENBQUMscUNBQXFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU1Ryw4QkFBOEI7WUFDOUIsSUFBTSxpQkFBaUIsR0FBYSxhQUFhLENBQUMsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVqRyw2Q0FBNkM7WUFDN0MsT0FBTyxLQUFJLENBQUMscUJBQXFCLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQ2pGLEdBQUcsQ0FDQyxVQUFDLFFBQTZCO2dCQUMxQixtREFBbUQ7Z0JBQ25ELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQyxDQUNKLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztnQkF0VUosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFoQlEsVUFBVTtnREFvQlYsTUFBTSxTQUFDLGtCQUFrQjtnQkFaekIsZUFBZTtnQkFDZixvQkFBb0I7OzswQkFUN0I7Q0F1VkMsQUF6VUQsQ0FHcUMsVUFBVSxHQXNVOUM7U0F0VVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICcuLi8uLi9jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEFwaVNlcnZpY2VSZXN1bHQsIEltYWdlUmVnaW9uLCBLbm9yYUNvbnN0YW50cywgUmVhZFJlc291cmNlc1NlcXVlbmNlLCBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSwgUmVzb3VyY2VzU2VxdWVuY2UsIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udmVydEpTT05MRCB9IGZyb20gJy4vY29udmVydC1qc29ubGQnO1xuaW1wb3J0IHsgSW5jb21pbmdTZXJ2aWNlIH0gZnJvbSAnLi9pbmNvbWluZy5zZXJ2aWNlJztcbmltcG9ydCB7IE9udG9sb2d5Q2FjaGVTZXJ2aWNlLCBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0cyByZXByZXNlbnRhdGlvbiBvZiByZXNvdXJjZXMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdChLdWlDb3JlQ29uZmlnVG9rZW4pIHB1YmxpYyBjb25maWcsXG4gICAgICAgIHByaXZhdGUgX2luY29taW5nU2VydmljZTogSW5jb21pbmdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9vbnRvbG9neUNhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGUgSXJpLCByZXF1ZXN0cyB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIC8vIHRoaXMgc2hvdWxkIHJldHVybiBhIHJlc291cmNlIG9iamVjdCB3aXRoIGluY29taW5nIGxpbmtzLCBhbm5vdGF0aW9ucywgZmlsZSByZXByZXNlbnRhdGlvbnNcbiAgICAvLyBpdCBpbmNsdWRlcyBhIHByb3BlcnR5OiBGaWxlUmVwcmVzZW50YXRpb24gdG8gZGlzcGxheSB3aXRoIHRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgbWVkaWEgdHlwZSB2aWV3ZXJcbiAgICBnZXRSZXNvdXJjZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UmVzb3VyY2VzU2VxdWVuY2UgfCBBcGlTZXJ2aWNlRXJyb3I+IHtcblxuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuXG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIE9ic2VydmFibGUgb2YgUmVhZFJlc291cmNlc1NlcXVlbmNlXG4gICAgICAgICAgICAgICAgKHJlc291cmNlUmVzcG9uc2U6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IEpTT04tTEQgaW50byBhIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc1NlcTogUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHJlc1NlcS5yZXNvdXJjZXNbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGZpbGUgcmVwcmVzZW50YXRpb24gdG8gZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhyZXMucHJvcGVydGllcykpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKHJlcy5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHByb3BLZXlzLmluY2x1ZGVzKEtub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlcy5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5WzBdID0gcmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdSZXByZXNlbnRhdGlvbnM6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZXNUb0Rpc3BsYXk6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSBmaWxlVmFsdWVzLmZpbHRlcigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpbWFnZS5pc1ByZXZpZXc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiBpbWFnZXNUb0Rpc3BsYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25zOiBJbWFnZVJlZ2lvbltdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5jb21pbmdSZWdpb24gb2YgcmVzLmluY29taW5nQW5ub3RhdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hhbmdlIHJldHVybiB0eXBlIGluIEltYWdlUmVnaW9uIGZyb20gUmVhZFJlc291cmNlIGludG8gUmVzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlZ2lvbiA9IG5ldyBJbWFnZVJlZ2lvbihpbmNvbWluZ1JlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlZ2lvbnMucHVzaChyZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdSZXByZXNlbnRhdGlvbnMucHVzaChzdGlsbEltYWdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gaW1nUmVwcmVzZW50YXRpb25zO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHByb3BLZXlzLmluY2x1ZGVzKEtub3JhQ29uc3RhbnRzLmhhc01vdmluZ0ltYWdlRmlsZVZhbHVlKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IHJlcy5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc01vdmluZ0ltYWdlRmlsZVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgcHJvcEtleXMuaW5jbHVkZXMoS25vcmFDb25zdGFudHMuaGFzQXVkaW9GaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gcmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzQXVkaW9GaWxlVmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBwcm9wS2V5cy5pbmNsdWRlcyhLbm9yYUNvbnN0YW50cy5oYXNEb2N1bWVudEZpbGVWYWx1ZSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSByZXMucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNEb2N1bWVudEZpbGVWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHByb3BLZXlzLmluY2x1ZGVzKEtub3JhQ29uc3RhbnRzLmhhc0REREZpbGVWYWx1ZSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSByZXMucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNERERGaWxlVmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOWUkgLyBUT0RPOiBUZXh0RmlsZVZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9vayBmb3IgaW5jb21pbmcgZmlsZVJlcHJlc2VudGF0aW9uIHRvIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlLmcuIGxvb2tpbmcgZm9yIGluY29taW5nIHN0aWxsSW1hZ2UgZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc0ZvckNvbXBvdW5kUmVzb3VyY2UocmVzLmlkLCAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmNvbWluZ0ltYWdlUmVwcmVzZW50YXRpb25zOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluY29taW5nSW1hZ2VSZXByZXNlbnRhdGlvbnMucmVzb3VyY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nSW1hZ2VSZXByZXNlbnRhdGlvbnMub250b2xvZ3lJbmZvcm1hdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgY3VycmVudCBvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uQ3VycmVudE9mZnNldCA9IG9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBwcmVwZW5kaW5nIG9mIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgd2hlbiBtb3ZpbmcgdG8gdGhlIGxlZnQgKGdldHRpbmcgcHJldmlvdXMgcGFnZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYXBwZW5kIGV4aXN0aW5nIGltYWdlcyB0byByZXNwb25zZSBhbmQgdGhlbiBhc3NpZ24gcmVzcG9uc2UgdG8gYHRoaXMucmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG1heWJlIHdlIGhhdmUgdG8gc3VwcG9ydCBub24gY29uc2VjdXRpdmUgYXJyYXlzIChzcGFyc2UgYXJyYXlzKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwZW5kIGluY29taW5nSW1hZ2VSZXByZXNlbnRhdGlvbnMucmVzb3VyY2VzIHRvIHRoaXMucmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocmVzU2VxLnJlc291cmNlc1swXS5pbmNvbWluZ0ZpbGVSZXByZXNlbnRhdGlvbnMsIGluY29taW5nSW1hZ2VSZXByZXNlbnRhdGlvbnMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgYXR0YWNoZWQgaW1hZ2UgZmlsZXMgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmVvbFJlc291cmNlLmNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UodGhpcy5yZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luY29taW5nIGZpbGUgcmVwcmVzZW50YXRpb25zIHRvIGRpc3BsYXknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGxpbmtzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ0xpbmtzKHJlc1NlcS5yZXNvdXJjZXNbMF0uaWQsIDApLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbmNvbWluZ1JlczogUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nUmVzLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIGluY29taW5nUmVzb3VyY2VzIHRvIHRoaXMuc2VxdWVuY2UuaW5jb21pbmdMaW5rc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlc1NlcS5yZXNvdXJjZXNbMF0uaW5jb21pbmdMaW5rcywgaW5jb21pbmdSZXMucmVzb3VyY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgYW5ub3RhdGlvbnNcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc1NlcSAtLSByZXNvdXJjZVNlcnZpZScsIHJlc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1NlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gbGV0IHJlc1NlcTogT2JzZXJ2YWJsZTxSZXNvdXJjZXNTZXF1ZW5jZT47XG5cbiAgICAgICAgLypcbiAgICAgICAgdGhpcy5nZXRSZXNvdXJjZXNTZXF1ZW5jZShpcmkpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChzZXF1ZW5jZTogUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJlc1NlcSA9IHNlcXVlbmNlO1xuXG4gICAgICAgICAgICAgICAgLyogcGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3Vwc1Jlc3BvbnNlKS5ncm91cHMpLFxuICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXNTZXEucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChzZXE6IFJlc291cmNlc1NlcXVlbmNlKSA9PiBzZXF1ZW5jZSksXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICAgICAgICAgKTsgKlxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGxpbmtzXG4gICAgICAgICAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nTGlua3Moc2VxdWVuY2UucmVzb3VyY2VzWzBdLmlkLCAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChpbmNvbWluZ1Jlc291cmNlczogUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2Uub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nUmVzb3VyY2VzLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgaW5jb21pbmdSZXNvdXJjZXMgdG8gdGhpcy5zZXF1ZW5jZS5pbmNvbWluZ0xpbmtzXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShzZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdMaW5rcywgaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgY2FsbGJhY2sgaXMgZ2l2ZW4sIGV4ZWN1dGUgZnVuY3Rpb24gd2l0aCB0aGUgYW1vdW50IG9mIGluY29taW5nIHJlc291cmNlcyBhcyB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBUT0RPOiB3aGF0IGlzIGNhbGxiYWNrPyBGaW5kIGEgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAqXG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBhbm5vdGF0aW9uc1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGZpbGVyZXByZXNlbnRhdGlvbnNcblxuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuXG4gICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICovXG5cblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VzU2VxdWVuY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiA9IHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlc291cmNlc1NlcXVlbmNlID0gQ29udmVydEpTT05MRC5jcmVhdGVSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neUNhY2hlU2VydmljZS5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1NlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgcmVxdWVzdEluY29taW5nUmVzb3VyY2VzKHNlcXVlbmNlOiBSZXNvdXJjZXNTZXF1ZW5jZSk6IHZvaWQge1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoaXMuc2VxdWVuY2UgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgY29ycmVjdGx5XG4gICAgICAgIGlmIChzZXF1ZW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXF1ZXN0IGluY29taW5nIHNlcXVlbmNlcyBpbiBjYXNlIG9mIG1vdmluZ0ltYWdlIGFuZCBhdWRpb1xuXG4gICAgICAgIC8vIHJlcXVlc3QgaW5jb21pbmcgcmVnaW9ucyBpbiBjYXNlIG9mIHN0aWxsSW1hZ2UgYW5kIGRkZEltYWdlXG4gICAgICAgIGlmIChzZXF1ZW5jZS5yZXNvdXJjZXNbMF0ucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSkge1xuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgIC8vIHRoZSByZXNvdXJjZSBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiwgY2hlY2sgaWYgdGhlcmUgYXJlIHJlZ2lvbnMgcG9pbnRpbmcgdG8gaXRcblxuICAgICAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ1JlZ2lvbnMoMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgcmVzb3VyY2UgaXMgbm90IGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlXG5cbiAgICAgICAgICAgIC8vIHRoaXMgZ2V0cyB0aGUgZmlyc3QgcGFnZSBvZiBpbmNvbWluZyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAvLyBtb3JlIHBhZ2VzIG1heSBiZSByZXF1ZXN0ZWQgYnkgW1t0aGlzLnZpZXdlcl1dLlxuICAgICAgICAgICAgLy8gVE9ETzogZm9yIG5vdywgd2UgYmVnaW4gd2l0aCBvZmZzZXQgMC4gVGhpcyBtYXkgaGF2ZSB0byBiZSBjaGFuZ2VkIGxhdGVyIChiZWdpbm5pbmcgc29tZXdoZXJlIGluIGEgY29sbGVjdGlvbilcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGluY29taW5nIGxpbmtzIGZvciB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICAvLyB0aGlzLmdldEluY29taW5nTGlua3MoMCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSAqKmdldFJlc291cmNlc1NlcXVlbmNlKiogaW5zdGVhZFxuICAgICAqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UgYXMgYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChub3QgeWV0IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+fVxuICAgICAqL1xuICAgIGdldFJlYWRSZXNvdXJjZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiA9IHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuXG4gICAgICAgIC8vIFRPRE86IGhhbmRsZSBjYXNlIG9mIGFuIEFwaVNlcnZpY2VFcnJvclxuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBwb3N0LCBwdXQsIGRlbGV0ZVxufVxuIl19