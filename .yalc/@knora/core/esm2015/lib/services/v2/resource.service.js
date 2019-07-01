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
export class ResourceService extends ApiService {
    constructor(http, config, _incomingService, _ontologyCacheService) {
        super(http, config);
        this.http = http;
        this.config = config;
        this._incomingService = _incomingService;
        this._ontologyCacheService = _ontologyCacheService;
    }
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    // this should return a resource object with incoming links, annotations, file representations
    // it includes a property: FileRepresentation to display with the parameters for the media type viewer
    getResource(iri) {
        const res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        (resourceResponse) => {
            // convert JSON-LD into a ReadResourceSequence
            const resSeq = ConvertJSONLD.createResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            const resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            const res = resSeq.resources[0];
            // set file representation to display
            console.log(Object.keys(res.properties));
            const propKeys = Object.keys(res.properties);
            switch (true) {
                case propKeys.includes(KnoraConstants.hasStillImageFileValue):
                    // res.fileRepresentationsToDisplay[0] = res.properties[KnoraConstants.hasStillImageFileValue];
                    const imgRepresentations = [];
                    const fileValues = res.properties[KnoraConstants.hasStillImageFileValue];
                    const imagesToDisplay = fileValues.filter((image) => {
                        return !image.isPreview;
                    });
                    for (const img of imagesToDisplay) {
                        const regions = [];
                        for (const incomingRegion of res.incomingAnnotations) {
                            // TODO: change return type in ImageRegion from ReadResource into Resource
                            // const region = new ImageRegion(incomingRegion);
                            // regions.push(region);
                        }
                        const stillImage = new StillImageRepresentation(img, regions);
                        imgRepresentations.push(stillImage);
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
                    this._incomingService.getStillImageRepresentationsForCompoundResource(res.id, 0).subscribe((incomingImageRepresentations) => {
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
                    }, (error) => {
                        console.error(error);
                    });
                    console.log('incoming file representations to display');
            }
            // resource.properties[KnoraConstants.hasStillImageFileValue]
            // get incoming links
            this._incomingService.getIncomingLinks(resSeq.resources[0].id, 0).subscribe((incomingRes) => {
                // update ontology information
                resSeq.ontologyInformation.updateOntologyInformation(incomingRes.ontologyInformation);
                // Append elements incomingResources to this.sequence.incomingLinks
                Array.prototype.push.apply(resSeq.resources[0].incomingLinks, incomingRes.resources);
            });
            // get incoming annotations
            // request information about resource classes
            return this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map((ontoInfo) => {
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
    }
    getResourcesSequence(iri) {
        const res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        (resourceResponse) => {
            // convert JSON-LD into a ReadResourceSequence
            const resSeq = ConvertJSONLD.createResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            const resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map((ontoInfo) => {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        }));
    }
    requestIncomingResources(sequence) {
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
    }
    /**
     * @deprecated Use **getResourcesSequence** instead
     *
     * Given the Iri, requests the representation of a resource as a `ReadResourceSequence`.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns {Observable<ReadResourcesSequence>}
     */
    getReadResource(iri) {
        const res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        // TODO: handle case of an ApiServiceError
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        (resourceResponse) => {
            // convert JSON-LD into a ReadResourceSequence
            const resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            const resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map((ontoInfo) => {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        }));
    }
}
ResourceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ResourceService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [KuiCoreConfigToken,] }] },
    { type: IncomingService },
    { type: OntologyCacheService }
];
ResourceService.ngInjectableDef = i0.defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken), i0.inject(i3.IncomingService), i0.inject(i4.OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFrRCxjQUFjLEVBQXFFLHdCQUF3QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDak0sT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUF1QixNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFFckY7O0dBRUc7QUFJSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBRTNDLFlBQW9CLElBQWdCLEVBQ0csTUFBTSxFQUNqQyxnQkFBaUMsRUFDakMscUJBQTJDO1FBQ25ELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFKSixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ0csV0FBTSxHQUFOLE1BQU0sQ0FBQTtRQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7SUFFdkQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsOEZBQThGO0lBQzlGLHNHQUFzRztJQUN0RyxXQUFXLENBQUMsR0FBVztR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LDZDQUE2QztRQUM3QyxDQUFDLGdCQUF3QixFQUFFLEVBQUU7WUFDekIsOENBQThDO1lBQzlDLE1BQU0sTUFBTSxHQUEwQixhQUFhLENBQUMscUNBQXFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU1Ryw4QkFBOEI7WUFDOUIsTUFBTSxpQkFBaUIsR0FBYSxhQUFhLENBQUMsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVqRyw2Q0FBNkM7WUFDN0MsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQ2pGLEdBQUcsQ0FDQyxDQUFDLFFBQTZCLEVBQUUsRUFBRTtnQkFDOUIsbURBQW1EO2dCQUNuRCxNQUFNLENBQUMsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUMsQ0FDSixDQUNKLENBQUM7UUFDTixDQUFDLENBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7O1lBdFVKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OztZQWhCUSxVQUFVOzRDQW9CVixNQUFNLFNBQUMsa0JBQWtCO1lBWnpCLGVBQWU7WUFDZixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZ1Rva2VuIH0gZnJvbSAnLi4vLi4vY29yZS5tb2R1bGUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBBcGlTZXJ2aWNlUmVzdWx0LCBJbWFnZVJlZ2lvbiwgS25vcmFDb25zdGFudHMsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSwgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsIFJlc291cmNlc1NlcXVlbmNlLCBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnZlcnRKU09OTEQgfSBmcm9tICcuL2NvbnZlcnQtanNvbmxkJztcbmltcG9ydCB7IEluY29taW5nU2VydmljZSB9IGZyb20gJy4vaW5jb21pbmcuc2VydmljZSc7XG5pbXBvcnQgeyBPbnRvbG9neUNhY2hlU2VydmljZSwgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4vb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdHMgcmVwcmVzZW50YXRpb24gb2YgcmVzb3VyY2VzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnLFxuICAgICAgICBwcml2YXRlIF9pbmNvbWluZ1NlcnZpY2U6IEluY29taW5nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfb250b2xvZ3lDYWNoZVNlcnZpY2U6IE9udG9sb2d5Q2FjaGVTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGh0dHAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIElyaSBvZiB0aGUgcmVzb3VyY2UgKG5vdCB5ZXQgVVJMIGVuY29kZWQpLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICAvLyB0aGlzIHNob3VsZCByZXR1cm4gYSByZXNvdXJjZSBvYmplY3Qgd2l0aCBpbmNvbWluZyBsaW5rcywgYW5ub3RhdGlvbnMsIGZpbGUgcmVwcmVzZW50YXRpb25zXG4gICAgLy8gaXQgaW5jbHVkZXMgYSBwcm9wZXJ0eTogRmlsZVJlcHJlc2VudGF0aW9uIHRvIGRpc3BsYXkgd2l0aCB0aGUgcGFyYW1ldGVycyBmb3IgdGhlIG1lZGlhIHR5cGUgdmlld2VyXG4gICAgZ2V0UmVzb3VyY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlc291cmNlc1NlcXVlbmNlIHwgQXBpU2VydmljZUVycm9yPiB7XG5cbiAgICAgICAgY29uc3QgcmVzOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+ID0gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG5cblxuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlc291cmNlc1NlcXVlbmNlID0gQ29udmVydEpTT05MRC5jcmVhdGVSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSByZXNTZXEucmVzb3VyY2VzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBmaWxlIHJlcHJlc2VudGF0aW9uIHRvIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coT2JqZWN0LmtleXMocmVzLnByb3BlcnRpZXMpKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhyZXMucHJvcGVydGllcyk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBwcm9wS2V5cy5pbmNsdWRlcyhLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXMuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheVswXSA9IHJlcy5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nUmVwcmVzZW50YXRpb25zOiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHJlcy5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5OiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaW1hZ2UuaXNQcmV2aWV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWcgb2YgaW1hZ2VzVG9EaXNwbGF5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogSW1hZ2VSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIHJlcy5pbmNvbWluZ0Fubm90YXRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoYW5nZSByZXR1cm4gdHlwZSBpbiBJbWFnZVJlZ2lvbiBmcm9tIFJlYWRSZXNvdXJjZSBpbnRvIFJlc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCByZWdpb24gPSBuZXcgSW1hZ2VSZWdpb24oaW5jb21pbmdSZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWdpb25zLnB1c2gocmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZSA9IG5ldyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24oaW1nLCByZWdpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nUmVwcmVzZW50YXRpb25zLnB1c2goc3RpbGxJbWFnZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IGltZ1JlcHJlc2VudGF0aW9ucztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBwcm9wS2V5cy5pbmNsdWRlcyhLbm9yYUNvbnN0YW50cy5oYXNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSByZXMucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNNb3ZpbmdJbWFnZUZpbGVWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHByb3BLZXlzLmluY2x1ZGVzKEtub3JhQ29uc3RhbnRzLmhhc0F1ZGlvRmlsZVZhbHVlKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IHJlcy5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc0F1ZGlvRmlsZVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgcHJvcEtleXMuaW5jbHVkZXMoS25vcmFDb25zdGFudHMuaGFzRG9jdW1lbnRGaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gcmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzRG9jdW1lbnRGaWxlVmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBwcm9wS2V5cy5pbmNsdWRlcyhLbm9yYUNvbnN0YW50cy5oYXNERERGaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gcmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzRERERmlsZVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTllJIC8gVE9ETzogVGV4dEZpbGVWYWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvb2sgZm9yIGluY29taW5nIGZpbGVSZXByZXNlbnRhdGlvbiB0byBkaXNwbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZS5nLiBsb29raW5nIGZvciBpbmNvbWluZyBzdGlsbEltYWdlIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNGb3JDb21wb3VuZFJlc291cmNlKHJlcy5pZCwgMCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5jb21pbmdJbWFnZVJlcHJlc2VudGF0aW9uczogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmNvbWluZ0ltYWdlUmVwcmVzZW50YXRpb25zLnJlc291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ0ltYWdlUmVwcmVzZW50YXRpb25zLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGN1cnJlbnQgb2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbkN1cnJlbnRPZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgcHJlcGVuZGluZyBvZiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHdoZW4gbW92aW5nIHRvIHRoZSBsZWZ0IChnZXR0aW5nIHByZXZpb3VzIHBhZ2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGFwcGVuZCBleGlzdGluZyBpbWFnZXMgdG8gcmVzcG9uc2UgYW5kIHRoZW4gYXNzaWduIHJlc3BvbnNlIHRvIGB0aGlzLnJlc291cmNlLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBtYXliZSB3ZSBoYXZlIHRvIHN1cHBvcnQgbm9uIGNvbnNlY3V0aXZlIGFycmF5cyAoc3BhcnNlIGFycmF5cylcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBpbmNvbWluZ0ltYWdlUmVwcmVzZW50YXRpb25zLnJlc291cmNlcyB0byB0aGlzLnJlc291cmNlLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlc1NlcS5yZXNvdXJjZXNbMF0uaW5jb21pbmdGaWxlUmVwcmVzZW50YXRpb25zLCBpbmNvbWluZ0ltYWdlUmVwcmVzZW50YXRpb25zLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIGF0dGFjaGVkIGltYWdlIGZpbGVzIHRvIGJlIGRpc3BsYXllZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJlb2xSZXNvdXJjZS5jb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHRoaXMucmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmNvbWluZyBmaWxlIHJlcHJlc2VudGF0aW9ucyB0byBkaXNwbGF5Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBsaW5rc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0SW5jb21pbmdMaW5rcyhyZXNTZXEucmVzb3VyY2VzWzBdLmlkLCAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW5jb21pbmdSZXM6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ1Jlcy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbGVtZW50cyBpbmNvbWluZ1Jlc291cmNlcyB0byB0aGlzLnNlcXVlbmNlLmluY29taW5nTGlua3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyZXNTZXEucmVzb3VyY2VzWzBdLmluY29taW5nTGlua3MsIGluY29taW5nUmVzLnJlc291cmNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGFubm90YXRpb25zXG5cblxuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNTZXEgLS0gcmVzb3VyY2VTZXJ2aWUnLCByZXNTZXEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGxldCByZXNTZXE6IE9ic2VydmFibGU8UmVzb3VyY2VzU2VxdWVuY2U+O1xuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuZ2V0UmVzb3VyY2VzU2VxdWVuY2UoaXJpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoc2VxdWVuY2U6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXNTZXEgPSBzZXF1ZW5jZTtcblxuICAgICAgICAgICAgICAgIC8qIHBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cHNSZXNwb25zZSkuZ3JvdXBzKSxcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmVzU2VxLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgoc2VxOiBSZXNvdXJjZXNTZXF1ZW5jZSkgPT4gc2VxdWVuY2UpLFxuICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICAgICAgICAgICk7ICpcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBsaW5rc1xuICAgICAgICAgICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ0xpbmtzKHNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgMCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoaW5jb21pbmdSZXNvdXJjZXM6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ1Jlc291cmNlcy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIGluY29taW5nUmVzb3VyY2VzIHRvIHRoaXMuc2VxdWVuY2UuaW5jb21pbmdMaW5rc1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nTGlua3MsIGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGNhbGxiYWNrIGlzIGdpdmVuLCBleGVjdXRlIGZ1bmN0aW9uIHdpdGggdGhlIGFtb3VudCBvZiBpbmNvbWluZyByZXNvdXJjZXMgYXMgdGhlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLyogVE9ETzogd2hhdCBpcyBjYWxsYmFjaz8gRmluZCBhIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKlxuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgYW5ub3RhdGlvbnNcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBmaWxlcmVwcmVzZW50YXRpb25zXG5cblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cblxuICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAqL1xuXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJlc291cmNlc1NlcXVlbmNlKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAocmVzb3VyY2VSZXNwb25zZTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzU2VxOiBSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBDb252ZXJ0SlNPTkxELmdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIHJlcXVlc3RJbmNvbWluZ1Jlc291cmNlcyhzZXF1ZW5jZTogUmVzb3VyY2VzU2VxdWVuY2UpOiB2b2lkIHtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGlzLnNlcXVlbmNlIGhhcyBiZWVuIGluaXRpYWxpemVkIGNvcnJlY3RseVxuICAgICAgICBpZiAoc2VxdWVuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVxdWVzdCBpbmNvbWluZyBzZXF1ZW5jZXMgaW4gY2FzZSBvZiBtb3ZpbmdJbWFnZSBhbmQgYXVkaW9cblxuICAgICAgICAvLyByZXF1ZXN0IGluY29taW5nIHJlZ2lvbnMgaW4gY2FzZSBvZiBzdGlsbEltYWdlIGFuZCBkZGRJbWFnZVxuICAgICAgICBpZiAoc2VxdWVuY2UucmVzb3VyY2VzWzBdLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0pIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAvLyB0aGUgcmVzb3VyY2UgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24sIGNoZWNrIGlmIHRoZXJlIGFyZSByZWdpb25zIHBvaW50aW5nIHRvIGl0XG5cbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdSZWdpb25zKDApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIHJlc291cmNlIGlzIG5vdCBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZVxuXG4gICAgICAgICAgICAvLyB0aGlzIGdldHMgdGhlIGZpcnN0IHBhZ2Ugb2YgaW5jb21pbmcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1xuICAgICAgICAgICAgLy8gbW9yZSBwYWdlcyBtYXkgYmUgcmVxdWVzdGVkIGJ5IFtbdGhpcy52aWV3ZXJdXS5cbiAgICAgICAgICAgIC8vIFRPRE86IGZvciBub3csIHdlIGJlZ2luIHdpdGggb2Zmc2V0IDAuIFRoaXMgbWF5IGhhdmUgdG8gYmUgY2hhbmdlZCBsYXRlciAoYmVnaW5uaW5nIHNvbWV3aGVyZSBpbiBhIGNvbGxlY3Rpb24pXG4gICAgICAgICAgICAvLyB0aGlzLmdldEluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBpbmNvbWluZyBsaW5rcyBmb3IgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ0xpbmtzKDApO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgKipnZXRSZXNvdXJjZXNTZXF1ZW5jZSoqIGluc3RlYWRcbiAgICAgKlxuICAgICAqIEdpdmVuIHRoZSBJcmksIHJlcXVlc3RzIHRoZSByZXByZXNlbnRhdGlvbiBvZiBhIHJlc291cmNlIGFzIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPn1cbiAgICAgKi9cbiAgICBnZXRSZWFkUmVzb3VyY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgY2FzZSBvZiBhbiBBcGlTZXJ2aWNlRXJyb3JcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAocmVzb3VyY2VSZXNwb25zZTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcG9zdCwgcHV0LCBkZWxldGVcbn1cbiJdfQ==