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
            var res0 = resSeq.resources[0];
            // set file representation to display
            var propKeys = Object.keys(res0.properties);
            switch (true) {
                case propKeys.includes(KnoraConstants.hasStillImageFileValue):
                    // res.fileRepresentationsToDisplay[0] = res.properties[KnoraConstants.hasStillImageFileValue];
                    var imgRepresentations = [];
                    var fileValues = res0.properties[KnoraConstants.hasStillImageFileValue];
                    var imagesToDisplay = fileValues.filter(function (image) {
                        return !image.isPreview;
                    });
                    try {
                        for (var imagesToDisplay_1 = tslib_1.__values(imagesToDisplay), imagesToDisplay_1_1 = imagesToDisplay_1.next(); !imagesToDisplay_1_1.done; imagesToDisplay_1_1 = imagesToDisplay_1.next()) {
                            var img = imagesToDisplay_1_1.value;
                            var regions = [];
                            try {
                                for (var _c = tslib_1.__values(res0.incomingAnnotations), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var incomingRegion = _d.value;
                                    // TODO: change return type in Region from ReadResource into Resource
                                    // const region = new Region(incomingRegion);
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
                    res0.fileRepresentationsToDisplay.stillImage = imgRepresentations;
                    break;
                case propKeys.includes(KnoraConstants.hasMovingImageFileValue):
                    //                            res0.fileRepresentationsToDisplay = res0.properties[KnoraConstants.hasMovingImageFileValue];
                    break;
                case propKeys.includes(KnoraConstants.hasAudioFileValue):
                    //                            res0.fileRepresentationsToDisplay = res0.properties[KnoraConstants.hasAudioFileValue];
                    break;
                case propKeys.includes(KnoraConstants.hasDocumentFileValue):
                    //                            res0.fileRepresentationsToDisplay = res0.properties[KnoraConstants.hasDocumentFileValue];
                    break;
                case propKeys.includes(KnoraConstants.hasDDDFileValue):
                    //                            res0.fileRepresentationsToDisplay = res0.properties[KnoraConstants.hasDDDFileValue];
                    break;
                // TODO: TextFileValue
                default:
                    // look for incoming fileRepresentation to display
                    // get incoming stillImage files
                    _this._incomingService.getStillImageRepresentationsForCompoundResource(res0.id, 0).subscribe(function (incomingFiles) {
                        var e_3, _a, e_4, _b;
                        console.log('incomingFiles', incomingFiles);
                        if (incomingFiles.resources.length > 0) {
                            // update ontology information
                            resSeq.ontologyInformation.updateOntologyInformation(incomingFiles.ontologyInformation);
                            // set current offset
                            // this.incomingStillImageRepresentationCurrentOffset = offset;
                            // TODO: implement prepending of StillImageRepresentations when moving to the left (getting previous pages)
                            // TODO: append existing images to response and then assign response to `this.resource.incomingStillImageRepresentations`
                            // TODO: maybe we have to support non consecutive arrays (sparse arrays)
                            // append incomingImageRepresentations.resources to this.resource.incomingStillImageRepresentations
                            Array.prototype.push.apply(res0.incomingFileRepresentations, incomingFiles.resources);
                            // Array.prototype.push.apply(resSeq.resources[0].incomingFileRepresentations, incomingImageRepresentations.resources);
                            var incomingImgRepresentations = [];
                            try {
                                for (var _c = tslib_1.__values(incomingFiles.resources), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var inRes = _d.value;
                                    var incomingFileValues = inRes.properties[KnoraConstants.hasStillImageFileValue];
                                    var incomingImagesToDisplay = incomingFileValues.filter(function (image) {
                                        return !image.isPreview;
                                    });
                                    try {
                                        for (var incomingImagesToDisplay_1 = tslib_1.__values(incomingImagesToDisplay), incomingImagesToDisplay_1_1 = incomingImagesToDisplay_1.next(); !incomingImagesToDisplay_1_1.done; incomingImagesToDisplay_1_1 = incomingImagesToDisplay_1.next()) {
                                            var img = incomingImagesToDisplay_1_1.value;
                                            var regions = [];
                                            /*
                                            for (const incomingRegion of inRes.incomingAnnotations) {

                                                // TODO: change return type in Region from ReadResource into Resource
                                                // const region = new Region(incomingRegion);

                                                // regions.push(incomingRegion);

                                            }
                                            */
                                            var stillImage = new StillImageRepresentation(img, regions);
                                            incomingImgRepresentations.push(stillImage);
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (incomingImagesToDisplay_1_1 && !incomingImagesToDisplay_1_1.done && (_b = incomingImagesToDisplay_1.return)) _b.call(incomingImagesToDisplay_1);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    res0.fileRepresentationsToDisplay.stillImage = incomingImgRepresentations;
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            // prepare attached image files to be displayed
                            // BeolResource.collectImagesAndRegionsForResource(this.resource);
                        }
                    }, function (error) {
                        console.error(error);
                    });
                // do the same for all other incoming file representations
                // TODO: get incoming movingImage files
                // TODO: get incoming audio files
                // TODO: get incoming document files
                // TODO: get incoming text files
                // TODO: get ddd images files
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBcUMsY0FBYyxFQUE2RSx3QkFBd0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVMLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBdUIsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBRXJGOztHQUVHO0FBQ0g7SUFHcUMsMkNBQVU7SUFFM0MseUJBQW9CLElBQWdCLEVBQ0csTUFBTSxFQUNqQyxnQkFBaUMsRUFDakMscUJBQTJDO1FBSHZELFlBSUksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtRQUxtQixVQUFJLEdBQUosSUFBSSxDQUFZO1FBQ0csWUFBTSxHQUFOLE1BQU0sQ0FBQTtRQUNqQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLDJCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7O0lBRXZELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDhGQUE4RjtJQUM5RixzR0FBc0c7SUFDdEcscUNBQVcsR0FBWCxVQUFZLEdBQVc7UUFB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VSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFoQlEsVUFBVTtnREFvQlYsTUFBTSxTQUFDLGtCQUFrQjtnQkFaekIsZUFBZTtnQkFDZixvQkFBb0I7OzswQkFUN0I7Q0FzWUMsQUF4WEQsQ0FHcUMsVUFBVSxHQXFYOUM7U0FyWFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICcuLi8uLi9jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEFwaVNlcnZpY2VSZXN1bHQsIEtub3JhQ29uc3RhbnRzLCBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLCBSZWdpb24sIFJlc291cmNlc1NlcXVlbmNlLCBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnZlcnRKU09OTEQgfSBmcm9tICcuL2NvbnZlcnQtanNvbmxkJztcbmltcG9ydCB7IEluY29taW5nU2VydmljZSB9IGZyb20gJy4vaW5jb21pbmcuc2VydmljZSc7XG5pbXBvcnQgeyBPbnRvbG9neUNhY2hlU2VydmljZSwgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4vb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdHMgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnLFxuICAgICAgICBwcml2YXRlIF9pbmNvbWluZ1NlcnZpY2U6IEluY29taW5nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfb250b2xvZ3lDYWNoZVNlcnZpY2U6IE9udG9sb2d5Q2FjaGVTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGh0dHAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKG5vdCB5ZXQgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICAvLyB0aGlzIHNob3VsZCByZXR1cm4gYSByZXNvdXJjZSBvYmplY3Qgd2l0aCBpbmNvbWluZyBsaW5rcywgYW5ub3RhdGlvbnMsIGZpbGUgcmVwcmVzZW50YXRpb25zXG4gICAgLy8gaXQgaW5jbHVkZXMgYSBwcm9wZXJ0eTogRmlsZVJlcHJlc2VudGF0aW9uIHRvIGRpc3BsYXkgd2l0aCB0aGUgcGFyYW1ldGVycyBmb3IgdGhlIG1lZGlhIHR5cGUgdmlld2VyXG4gICAgZ2V0UmVzb3VyY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG5cbiAgICAgICAgY29uc3QgcmVzOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+ID0gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIE9ic2VydmFibGUgb2YgUmVhZFJlc291cmNlc1NlcXVlbmNlXG4gICAgICAgICAgICAgICAgKHJlc291cmNlUmVzcG9uc2U6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IEpTT04tTEQgaW50byBhIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc1NlcTogUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczAgPSByZXNTZXEucmVzb3VyY2VzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBmaWxlIHJlcHJlc2VudGF0aW9uIHRvIGRpc3BsYXlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhyZXMwLnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgcHJvcEtleXMuaW5jbHVkZXMoS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXlbMF0gPSByZXMucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZ1JlcHJlc2VudGF0aW9uczogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10gPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSByZXMwLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZXNUb0Rpc3BsYXk6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSBmaWxlVmFsdWVzLmZpbHRlcigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpbWFnZS5pc1ByZXZpZXc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiBpbWFnZXNUb0Rpc3BsYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25zOiBSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIHJlczAuaW5jb21pbmdBbm5vdGF0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGFuZ2UgcmV0dXJuIHR5cGUgaW4gUmVnaW9uIGZyb20gUmVhZFJlc291cmNlIGludG8gUmVzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlZ2lvbiA9IG5ldyBSZWdpb24oaW5jb21pbmdSZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWdpb25zLnB1c2gocmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZSA9IG5ldyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24oaW1nLCByZWdpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nUmVwcmVzZW50YXRpb25zLnB1c2goc3RpbGxJbWFnZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMwLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkuc3RpbGxJbWFnZSA9IGltZ1JlcHJlc2VudGF0aW9ucztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBwcm9wS2V5cy5pbmNsdWRlcyhLbm9yYUNvbnN0YW50cy5oYXNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzMC5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gcmVzMC5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc01vdmluZ0ltYWdlRmlsZVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgcHJvcEtleXMuaW5jbHVkZXMoS25vcmFDb25zdGFudHMuaGFzQXVkaW9GaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlczAuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IHJlczAucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNBdWRpb0ZpbGVWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHByb3BLZXlzLmluY2x1ZGVzKEtub3JhQ29uc3RhbnRzLmhhc0RvY3VtZW50RmlsZVZhbHVlKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMwLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSByZXMwLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzRG9jdW1lbnRGaWxlVmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBwcm9wS2V5cy5pbmNsdWRlcyhLbm9yYUNvbnN0YW50cy5oYXNERERGaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlczAuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IHJlczAucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNERERGaWxlVmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBUZXh0RmlsZVZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9vayBmb3IgaW5jb21pbmcgZmlsZVJlcHJlc2VudGF0aW9uIHRvIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgc3RpbGxJbWFnZSBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zRm9yQ29tcG91bmRSZXNvdXJjZShyZXMwLmlkLCAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbmNvbWluZ0ZpbGVzOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luY29taW5nRmlsZXMnLCBpbmNvbWluZ0ZpbGVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluY29taW5nRmlsZXMucmVzb3VyY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nRmlsZXMub250b2xvZ3lJbmZvcm1hdGlvbik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCBjdXJyZW50IG9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25DdXJyZW50T2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IHByZXBlbmRpbmcgb2YgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyB3aGVuIG1vdmluZyB0byB0aGUgbGVmdCAoZ2V0dGluZyBwcmV2aW91cyBwYWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBhcHBlbmQgZXhpc3RpbmcgaW1hZ2VzIHRvIHJlc3BvbnNlIGFuZCB0aGVuIGFzc2lnbiByZXNwb25zZSB0byBgdGhpcy5yZXNvdXJjZS5pbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbWF5YmUgd2UgaGF2ZSB0byBzdXBwb3J0IG5vbiBjb25zZWN1dGl2ZSBhcnJheXMgKHNwYXJzZSBhcnJheXMpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhcHBlbmQgaW5jb21pbmdJbWFnZVJlcHJlc2VudGF0aW9ucy5yZXNvdXJjZXMgdG8gdGhpcy5yZXNvdXJjZS5pbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlczAuaW5jb21pbmdGaWxlUmVwcmVzZW50YXRpb25zLCBpbmNvbWluZ0ZpbGVzLnJlc291cmNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocmVzU2VxLnJlc291cmNlc1swXS5pbmNvbWluZ0ZpbGVSZXByZXNlbnRhdGlvbnMsIGluY29taW5nSW1hZ2VSZXByZXNlbnRhdGlvbnMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nSW1nUmVwcmVzZW50YXRpb25zOiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpblJlcyBvZiBpbmNvbWluZ0ZpbGVzLnJlc291cmNlcykge1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ0ZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSBpblJlcy5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nSW1hZ2VzVG9EaXNwbGF5OiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gaW5jb21pbmdGaWxlVmFsdWVzLmZpbHRlcigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaW1hZ2UuaXNQcmV2aWV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiBpbmNvbWluZ0ltYWdlc1RvRGlzcGxheSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25zOiBSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5jb21pbmdSZWdpb24gb2YgaW5SZXMuaW5jb21pbmdBbm5vdGF0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hhbmdlIHJldHVybiB0eXBlIGluIFJlZ2lvbiBmcm9tIFJlYWRSZXNvdXJjZSBpbnRvIFJlc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcmVnaW9uID0gbmV3IFJlZ2lvbihpbmNvbWluZ1JlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWdpb25zLnB1c2goaW5jb21pbmdSZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb21pbmdJbWdSZXByZXNlbnRhdGlvbnMucHVzaChzdGlsbEltYWdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzMC5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5LnN0aWxsSW1hZ2UgPSBpbmNvbWluZ0ltZ1JlcHJlc2VudGF0aW9ucztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlcGFyZSBhdHRhY2hlZCBpbWFnZSBmaWxlcyB0byBiZSBkaXNwbGF5ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCZW9sUmVzb3VyY2UuY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZSh0aGlzLnJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gdGhlIHNhbWUgZm9yIGFsbCBvdGhlciBpbmNvbWluZyBmaWxlIHJlcHJlc2VudGF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGluY29taW5nIG1vdmluZ0ltYWdlIGZpbGVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBpbmNvbWluZyBhdWRpbyBmaWxlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBnZXQgaW5jb21pbmcgZG9jdW1lbnQgZmlsZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGluY29taW5nIHRleHQgZmlsZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGRkZCBpbWFnZXMgZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXVxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGxpbmtzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ0xpbmtzKHJlc1NlcS5yZXNvdXJjZXNbMF0uaWQsIDApLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbmNvbWluZ1JlczogUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nUmVzLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIGluY29taW5nUmVzb3VyY2VzIHRvIHRoaXMuc2VxdWVuY2UuaW5jb21pbmdMaW5rc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlc1NlcS5yZXNvdXJjZXNbMF0uaW5jb21pbmdMaW5rcywgaW5jb21pbmdSZXMucmVzb3VyY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgYW5ub3RhdGlvbnNcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc1NlcSAtLSByZXNvdXJjZVNlcnZpZScsIHJlc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1NlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gbGV0IHJlc1NlcTogT2JzZXJ2YWJsZTxSZXNvdXJjZXNTZXF1ZW5jZT47XG5cbiAgICAgICAgLypcbiAgICAgICAgdGhpcy5nZXRSZXNvdXJjZXNTZXF1ZW5jZShpcmkpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChzZXF1ZW5jZTogUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJlc1NlcSA9IHNlcXVlbmNlO1xuXG4gICAgICAgICAgICAgICAgLyogcGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KEdyb3Vwc1Jlc3BvbnNlKS5ncm91cHMpLFxuICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXNTZXEucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKChzZXE6IFJlc291cmNlc1NlcXVlbmNlKSA9PiBzZXF1ZW5jZSksXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICAgICAgICAgKTsgKlxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGxpbmtzXG4gICAgICAgICAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nTGlua3Moc2VxdWVuY2UucmVzb3VyY2VzWzBdLmlkLCAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChpbmNvbWluZ1Jlc291cmNlczogUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2Uub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nUmVzb3VyY2VzLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgaW5jb21pbmdSZXNvdXJjZXMgdG8gdGhpcy5zZXF1ZW5jZS5pbmNvbWluZ0xpbmtzXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShzZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdMaW5rcywgaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgY2FsbGJhY2sgaXMgZ2l2ZW4sIGV4ZWN1dGUgZnVuY3Rpb24gd2l0aCB0aGUgYW1vdW50IG9mIGluY29taW5nIHJlc291cmNlcyBhcyB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBUT0RPOiB3aGF0IGlzIGNhbGxiYWNrPyBGaW5kIGEgc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAqXG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBhbm5vdGF0aW9uc1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGZpbGVyZXByZXNlbnRhdGlvbnNcblxuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuXG4gICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICovXG5cblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVzb3VyY2VzU2VxdWVuY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiA9IHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlc291cmNlc1NlcXVlbmNlID0gQ29udmVydEpTT05MRC5jcmVhdGVSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neUNhY2hlU2VydmljZS5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1NlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgcmVxdWVzdEluY29taW5nUmVzb3VyY2VzKHNlcXVlbmNlOiBSZXNvdXJjZXNTZXF1ZW5jZSk6IHZvaWQge1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoaXMuc2VxdWVuY2UgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgY29ycmVjdGx5XG4gICAgICAgIGlmIChzZXF1ZW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXF1ZXN0IGluY29taW5nIHNlcXVlbmNlcyBpbiBjYXNlIG9mIG1vdmluZ0ltYWdlIGFuZCBhdWRpb1xuXG4gICAgICAgIC8vIHJlcXVlc3QgaW5jb21pbmcgcmVnaW9ucyBpbiBjYXNlIG9mIHN0aWxsSW1hZ2UgYW5kIGRkZEltYWdlXG4gICAgICAgIGlmIChzZXF1ZW5jZS5yZXNvdXJjZXNbMF0ucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSkge1xuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgIC8vIHRoZSByZXNvdXJjZSBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiwgY2hlY2sgaWYgdGhlcmUgYXJlIHJlZ2lvbnMgcG9pbnRpbmcgdG8gaXRcblxuICAgICAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ1JlZ2lvbnMoMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgcmVzb3VyY2UgaXMgbm90IGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlXG5cbiAgICAgICAgICAgIC8vIHRoaXMgZ2V0cyB0aGUgZmlyc3QgcGFnZSBvZiBpbmNvbWluZyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAvLyBtb3JlIHBhZ2VzIG1heSBiZSByZXF1ZXN0ZWQgYnkgW1t0aGlzLnZpZXdlcl1dLlxuICAgICAgICAgICAgLy8gVE9ETzogZm9yIG5vdywgd2UgYmVnaW4gd2l0aCBvZmZzZXQgMC4gVGhpcyBtYXkgaGF2ZSB0byBiZSBjaGFuZ2VkIGxhdGVyIChiZWdpbm5pbmcgc29tZXdoZXJlIGluIGEgY29sbGVjdGlvbilcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGluY29taW5nIGxpbmtzIGZvciB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICAvLyB0aGlzLmdldEluY29taW5nTGlua3MoMCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSAqKmdldFJlc291cmNlc1NlcXVlbmNlKiogaW5zdGVhZFxuICAgICAqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UgYXMgYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChub3QgeWV0IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+fVxuICAgICAqL1xuICAgIGdldFJlYWRSZXNvdXJjZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiA9IHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuXG4gICAgICAgIC8vIFRPRE86IGhhbmRsZSBjYXNlIG9mIGFuIEFwaVNlcnZpY2VFcnJvclxuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gQ29udmVydEpTT05MRC5nZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBwb3N0LCBwdXQsIGRlbGV0ZVxufVxuIl19