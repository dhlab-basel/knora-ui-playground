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
let ResourceService = class ResourceService extends ApiService {
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
            const res0 = resSeq.resources[0];
            // set file representation to display
            const propKeys = Object.keys(res0.properties);
            switch (true) {
                case propKeys.includes(KnoraConstants.hasStillImageFileValue):
                    // res.fileRepresentationsToDisplay[0] = res.properties[KnoraConstants.hasStillImageFileValue];
                    const imgRepresentations = [];
                    const fileValues = res0.properties[KnoraConstants.hasStillImageFileValue];
                    const imagesToDisplay = fileValues.filter((image) => {
                        return !image.isPreview;
                    });
                    for (const img of imagesToDisplay) {
                        const regions = [];
                        for (const incomingRegion of res0.incomingAnnotations) {
                            // TODO: change return type in Region from ReadResource into Resource
                            // const region = new Region(incomingRegion);
                            // regions.push(region);
                        }
                        const stillImage = new StillImageRepresentation(img, regions);
                        imgRepresentations.push(stillImage);
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
                    this._incomingService.getStillImageRepresentationsForCompoundResource(res0.id, 0).subscribe((incomingFiles) => {
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
                            const incomingImgRepresentations = [];
                            for (const inRes of incomingFiles.resources) {
                                const incomingFileValues = inRes.properties[KnoraConstants.hasStillImageFileValue];
                                const incomingImagesToDisplay = incomingFileValues.filter((image) => {
                                    return !image.isPreview;
                                });
                                for (const img of incomingImagesToDisplay) {
                                    const regions = [];
                                    /*
                                    for (const incomingRegion of inRes.incomingAnnotations) {

                                        // TODO: change return type in Region from ReadResource into Resource
                                        // const region = new Region(incomingRegion);

                                        // regions.push(incomingRegion);

                                    }
                                    */
                                    const stillImage = new StillImageRepresentation(img, regions);
                                    incomingImgRepresentations.push(stillImage);
                                }
                                res0.fileRepresentationsToDisplay.stillImage = incomingImgRepresentations;
                            }
                            // prepare attached image files to be displayed
                            // BeolResource.collectImagesAndRegionsForResource(this.resource);
                        }
                    }, (error) => {
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
};
ResourceService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken), i0.ɵɵinject(i3.IncomingService), i0.ɵɵinject(i4.OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
ResourceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object, IncomingService,
        OntologyCacheService])
], ResourceService);
export { ResourceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL3Jlc291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE9BQU8sRUFBcUMsY0FBYyxFQUE2RSx3QkFBd0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVMLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBdUIsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBRXJGOztHQUVHO0FBSUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxVQUFVO0lBRTNDLFlBQW9CLElBQWdCLEVBQ0csTUFBTSxFQUNqQyxnQkFBaUMsRUFDakMscUJBQTJDO1FBQ25ELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFKSixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ0csV0FBTSxHQUFOLE1BQU0sQ0FBQTtRQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7SUFFdkQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsOEZBQThGO0lBQzlGLHNHQUFzRztJQUN0RyxXQUFX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Q1Ysb0JBQW9CO0dBTDlDLGVBQWUsQ0FxWDNCO1NBclhZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZ1Rva2VuIH0gZnJvbSAnLi4vLi4vY29yZS5tb2R1bGUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBBcGlTZXJ2aWNlUmVzdWx0LCBLbm9yYUNvbnN0YW50cywgUmVhZFJlc291cmNlc1NlcXVlbmNlLCBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSwgUmVnaW9uLCBSZXNvdXJjZXNTZXF1ZW5jZSwgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDb252ZXJ0SlNPTkxEIH0gZnJvbSAnLi9jb252ZXJ0LWpzb25sZCc7XG5pbXBvcnQgeyBJbmNvbWluZ1NlcnZpY2UgfSBmcm9tICcuL2luY29taW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgT250b2xvZ3lDYWNoZVNlcnZpY2UsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3RzIHJlcHJlc2VudGF0aW9uIG9mIHJlc291cmNlcyBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBfaW5jb21pbmdTZXJ2aWNlOiBJbmNvbWluZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX29udG9sb2d5Q2FjaGVTZXJ2aWNlOiBPbnRvbG9neUNhY2hlU2VydmljZSkge1xuICAgICAgICBzdXBlcihodHRwLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIHRoZSBJcmksIHJlcXVlc3RzIHRoZSByZXByZXNlbnRhdGlvbiBvZiBhIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChub3QgeWV0IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgLy8gdGhpcyBzaG91bGQgcmV0dXJuIGEgcmVzb3VyY2Ugb2JqZWN0IHdpdGggaW5jb21pbmcgbGlua3MsIGFubm90YXRpb25zLCBmaWxlIHJlcHJlc2VudGF0aW9uc1xuICAgIC8vIGl0IGluY2x1ZGVzIGEgcHJvcGVydHk6IEZpbGVSZXByZXNlbnRhdGlvbiB0byBkaXNwbGF5IHdpdGggdGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBtZWRpYSB0eXBlIHZpZXdlclxuICAgIGdldFJlc291cmNlKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuXG4gICAgICAgIGNvbnN0IHJlczogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0IHwgQXBpU2VydmljZUVycm9yPiA9IHRoaXMuaHR0cEdldCgnL3YyL3Jlc291cmNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIChyZXNvdXJjZVJlc3BvbnNlOiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBKU09OLUxEIGludG8gYSBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNTZXE6IFJlc291cmNlc1NlcXVlbmNlID0gQ29udmVydEpTT05MRC5jcmVhdGVSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMwID0gcmVzU2VxLnJlc291cmNlc1swXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgZmlsZSByZXByZXNlbnRhdGlvbiB0byBkaXNwbGF5XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcEtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMocmVzMC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHByb3BLZXlzLmluY2x1ZGVzKEtub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlcy5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5WzBdID0gcmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdSZXByZXNlbnRhdGlvbnM6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzMC5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5OiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaW1hZ2UuaXNQcmV2aWV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWcgb2YgaW1hZ2VzVG9EaXNwbGF5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogUmVnaW9uW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbmNvbWluZ1JlZ2lvbiBvZiByZXMwLmluY29taW5nQW5ub3RhdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hhbmdlIHJldHVybiB0eXBlIGluIFJlZ2lvbiBmcm9tIFJlYWRSZXNvdXJjZSBpbnRvIFJlc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCByZWdpb24gPSBuZXcgUmVnaW9uKGluY29taW5nUmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVnaW9ucy5wdXNoKHJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2UgPSBuZXcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uKGltZywgcmVnaW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ1JlcHJlc2VudGF0aW9ucy5wdXNoKHN0aWxsSW1hZ2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzMC5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5LnN0aWxsSW1hZ2UgPSBpbWdSZXByZXNlbnRhdGlvbnM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgcHJvcEtleXMuaW5jbHVkZXMoS25vcmFDb25zdGFudHMuaGFzTW92aW5nSW1hZ2VGaWxlVmFsdWUpOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlczAuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IHJlczAucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNNb3ZpbmdJbWFnZUZpbGVWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHByb3BLZXlzLmluY2x1ZGVzKEtub3JhQ29uc3RhbnRzLmhhc0F1ZGlvRmlsZVZhbHVlKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMwLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSByZXMwLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzQXVkaW9GaWxlVmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBwcm9wS2V5cy5pbmNsdWRlcyhLbm9yYUNvbnN0YW50cy5oYXNEb2N1bWVudEZpbGVWYWx1ZSk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzMC5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gcmVzMC5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc0RvY3VtZW50RmlsZVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgcHJvcEtleXMuaW5jbHVkZXMoS25vcmFDb25zdGFudHMuaGFzRERERmlsZVZhbHVlKTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMwLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSByZXMwLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzRERERmlsZVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogVGV4dEZpbGVWYWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvb2sgZm9yIGluY29taW5nIGZpbGVSZXByZXNlbnRhdGlvbiB0byBkaXNwbGF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIHN0aWxsSW1hZ2UgZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0U3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc0ZvckNvbXBvdW5kUmVzb3VyY2UocmVzMC5pZCwgMCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5jb21pbmdGaWxlczogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbmNvbWluZ0ZpbGVzJywgaW5jb21pbmdGaWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmNvbWluZ0ZpbGVzLnJlc291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ0ZpbGVzLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgY3VycmVudCBvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uQ3VycmVudE9mZnNldCA9IG9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBwcmVwZW5kaW5nIG9mIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgd2hlbiBtb3ZpbmcgdG8gdGhlIGxlZnQgKGdldHRpbmcgcHJldmlvdXMgcGFnZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYXBwZW5kIGV4aXN0aW5nIGltYWdlcyB0byByZXNwb25zZSBhbmQgdGhlbiBhc3NpZ24gcmVzcG9uc2UgdG8gYHRoaXMucmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG1heWJlIHdlIGhhdmUgdG8gc3VwcG9ydCBub24gY29uc2VjdXRpdmUgYXJyYXlzIChzcGFyc2UgYXJyYXlzKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXBwZW5kIGluY29taW5nSW1hZ2VSZXByZXNlbnRhdGlvbnMucmVzb3VyY2VzIHRvIHRoaXMucmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyZXMwLmluY29taW5nRmlsZVJlcHJlc2VudGF0aW9ucywgaW5jb21pbmdGaWxlcy5yZXNvdXJjZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlc1NlcS5yZXNvdXJjZXNbMF0uaW5jb21pbmdGaWxlUmVwcmVzZW50YXRpb25zLCBpbmNvbWluZ0ltYWdlUmVwcmVzZW50YXRpb25zLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ0ltZ1JlcHJlc2VudGF0aW9uczogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10gPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5SZXMgb2YgaW5jb21pbmdGaWxlcy5yZXNvdXJjZXMpIHtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdGaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gaW5SZXMucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ0ltYWdlc1RvRGlzcGxheTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IGluY29taW5nRmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWltYWdlLmlzUHJldmlldztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWcgb2YgaW5jb21pbmdJbWFnZXNUb0Rpc3BsYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogUmVnaW9uW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIGluUmVzLmluY29taW5nQW5ub3RhdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoYW5nZSByZXR1cm4gdHlwZSBpbiBSZWdpb24gZnJvbSBSZWFkUmVzb3VyY2UgaW50byBSZXNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlZ2lvbiA9IG5ldyBSZWdpb24oaW5jb21pbmdSZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVnaW9ucy5wdXNoKGluY29taW5nUmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZSA9IG5ldyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24oaW1nLCByZWdpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29taW5nSW1nUmVwcmVzZW50YXRpb25zLnB1c2goc3RpbGxJbWFnZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlczAuZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheS5zdGlsbEltYWdlID0gaW5jb21pbmdJbWdSZXByZXNlbnRhdGlvbnM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgYXR0YWNoZWQgaW1hZ2UgZmlsZXMgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmVvbFJlc291cmNlLmNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UodGhpcy5yZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIHRoZSBzYW1lIGZvciBhbGwgb3RoZXIgaW5jb21pbmcgZmlsZSByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBpbmNvbWluZyBtb3ZpbmdJbWFnZSBmaWxlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBnZXQgaW5jb21pbmcgYXVkaW8gZmlsZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGluY29taW5nIGRvY3VtZW50IGZpbGVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBpbmNvbWluZyB0ZXh0IGZpbGVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdldCBkZGQgaW1hZ2VzIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBsaW5rc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0SW5jb21pbmdMaW5rcyhyZXNTZXEucmVzb3VyY2VzWzBdLmlkLCAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW5jb21pbmdSZXM6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ1Jlcy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbGVtZW50cyBpbmNvbWluZ1Jlc291cmNlcyB0byB0aGlzLnNlcXVlbmNlLmluY29taW5nTGlua3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyZXNTZXEucmVzb3VyY2VzWzBdLmluY29taW5nTGlua3MsIGluY29taW5nUmVzLnJlc291cmNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIGFubm90YXRpb25zXG5cblxuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNTZXEgLS0gcmVzb3VyY2VTZXJ2aWUnLCByZXNTZXEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGxldCByZXNTZXE6IE9ic2VydmFibGU8UmVzb3VyY2VzU2VxdWVuY2U+O1xuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuZ2V0UmVzb3VyY2VzU2VxdWVuY2UoaXJpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoc2VxdWVuY2U6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXNTZXEgPSBzZXF1ZW5jZTtcblxuICAgICAgICAgICAgICAgIC8qIHBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cHNSZXNwb25zZSkuZ3JvdXBzKSxcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmVzU2VxLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcCgoc2VxOiBSZXNvdXJjZXNTZXF1ZW5jZSkgPT4gc2VxdWVuY2UpLFxuICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICAgICAgICAgICk7ICpcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBsaW5rc1xuICAgICAgICAgICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ0xpbmtzKHNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgMCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoaW5jb21pbmdSZXNvdXJjZXM6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ1Jlc291cmNlcy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIGluY29taW5nUmVzb3VyY2VzIHRvIHRoaXMuc2VxdWVuY2UuaW5jb21pbmdMaW5rc1xuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nTGlua3MsIGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGNhbGxiYWNrIGlzIGdpdmVuLCBleGVjdXRlIGZ1bmN0aW9uIHdpdGggdGhlIGFtb3VudCBvZiBpbmNvbWluZyByZXNvdXJjZXMgYXMgdGhlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLyogVE9ETzogd2hhdCBpcyBjYWxsYmFjaz8gRmluZCBhIHNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKlxuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgYW5ub3RhdGlvbnNcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyBmaWxlcmVwcmVzZW50YXRpb25zXG5cblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cblxuICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAqL1xuXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJlc291cmNlc1NlcXVlbmNlKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAocmVzb3VyY2VSZXNwb25zZTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzU2VxOiBSZXNvdXJjZXNTZXF1ZW5jZSA9IENvbnZlcnRKU09OTEQuY3JlYXRlUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBDb252ZXJ0SlNPTkxELmdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lDYWNoZVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzKS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbnRvSW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgb250b2xvZ3kgaW5mb3JtYXRpb24gdG8gUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzU2VxLm9udG9sb2d5SW5mb3JtYXRpb24udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihvbnRvSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNTZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIHJlcXVlc3RJbmNvbWluZ1Jlc291cmNlcyhzZXF1ZW5jZTogUmVzb3VyY2VzU2VxdWVuY2UpOiB2b2lkIHtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGlzLnNlcXVlbmNlIGhhcyBiZWVuIGluaXRpYWxpemVkIGNvcnJlY3RseVxuICAgICAgICBpZiAoc2VxdWVuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVxdWVzdCBpbmNvbWluZyBzZXF1ZW5jZXMgaW4gY2FzZSBvZiBtb3ZpbmdJbWFnZSBhbmQgYXVkaW9cblxuICAgICAgICAvLyByZXF1ZXN0IGluY29taW5nIHJlZ2lvbnMgaW4gY2FzZSBvZiBzdGlsbEltYWdlIGFuZCBkZGRJbWFnZVxuICAgICAgICBpZiAoc2VxdWVuY2UucmVzb3VyY2VzWzBdLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0pIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAvLyB0aGUgcmVzb3VyY2UgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24sIGNoZWNrIGlmIHRoZXJlIGFyZSByZWdpb25zIHBvaW50aW5nIHRvIGl0XG5cbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdSZWdpb25zKDApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIHJlc291cmNlIGlzIG5vdCBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZVxuXG4gICAgICAgICAgICAvLyB0aGlzIGdldHMgdGhlIGZpcnN0IHBhZ2Ugb2YgaW5jb21pbmcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1xuICAgICAgICAgICAgLy8gbW9yZSBwYWdlcyBtYXkgYmUgcmVxdWVzdGVkIGJ5IFtbdGhpcy52aWV3ZXJdXS5cbiAgICAgICAgICAgIC8vIFRPRE86IGZvciBub3csIHdlIGJlZ2luIHdpdGggb2Zmc2V0IDAuIFRoaXMgbWF5IGhhdmUgdG8gYmUgY2hhbmdlZCBsYXRlciAoYmVnaW5uaW5nIHNvbWV3aGVyZSBpbiBhIGNvbGxlY3Rpb24pXG4gICAgICAgICAgICAvLyB0aGlzLmdldEluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBpbmNvbWluZyBsaW5rcyBmb3IgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ0xpbmtzKDApO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgKipnZXRSZXNvdXJjZXNTZXF1ZW5jZSoqIGluc3RlYWRcbiAgICAgKlxuICAgICAqIEdpdmVuIHRoZSBJcmksIHJlcXVlc3RzIHRoZSByZXByZXNlbnRhdGlvbiBvZiBhIHJlc291cmNlIGFzIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPn1cbiAgICAgKi9cbiAgICBnZXRSZWFkUmVzb3VyY2UoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCByZXM6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4gPSB0aGlzLmh0dHBHZXQoJy92Mi9yZXNvdXJjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgY2FzZSBvZiBhbiBBcGlTZXJ2aWNlRXJyb3JcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gT2JzZXJ2YWJsZSBvZiBSZWFkUmVzb3VyY2VzU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAocmVzb3VyY2VSZXNwb25zZTogb2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgSlNPTi1MRCBpbnRvIGEgUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzU2VxOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgPSBDb252ZXJ0SlNPTkxELmNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVjdCByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IENvbnZlcnRKU09OTEQuZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZVJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5Q2FjaGVTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIG9udG9sb2d5IGluZm9ybWF0aW9uIHRvIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1NlcS5vbnRvbG9neUluZm9ybWF0aW9uLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b0luZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzU2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcG9zdCwgcHV0LCBkZWxldGVcbn1cbiJdfQ==