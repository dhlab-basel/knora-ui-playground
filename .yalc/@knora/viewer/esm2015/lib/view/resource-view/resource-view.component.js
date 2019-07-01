import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomingService, KnoraConstants, ResourceService } from '@knora/core';
const jsonld = require('jsonld');
export class ResourceViewComponent {
    constructor(_route, _router, _resourceService, _incomingService) {
        this._route = _route;
        this._router = _router;
        this._resourceService = _resourceService;
        this._incomingService = _incomingService;
        this.KnoraConstants = KnoraConstants;
    }
    ngOnInit() {
        // this.getResource(this.iri);
    }
    ngOnChanges() {
        this.getResource(this.iri);
    }
    /**
     * Get a read resource sequence with ontology information and incoming resources.
     *
     * @param {string} id Resource iri
     */
    getResource(id) {
        this.loading = true;
        this._resourceService.getResource(decodeURIComponent(id)).subscribe((result) => {
            console.log('getResource result', result);
            // result with resources only and WITHOUT incoming stuff
            this.sequence = result;
            // this.ontologyInfo = result.ontologyInformation;
            // const resType = this.sequence.resources[0].type;
            this.guiOrder = result.ontologyInformation.getResourceClasses()[this.sequence.resources[0].type].guiOrder;
            // collect all filerepresentations to display including annotations
            // --> for the first resource only...
            // this.sequence.resources[0].fileRepresentationsToDisplay = this.collectFileRepresentationsAndFileAnnotations(this.sequence.resources[0]);
            // collect images and regions
            // --> for the first resource only...
            // this.collectImagesAndRegionsForResource(this.sequence.resources[0]);
            // get incoming resources
            //                this.requestIncomingResources();
            // this.fileRepresentation = this.sequence.resources[0].properties.indexOf(KnoraConstants.hasStillImageFileValue) > -1;
            // console.log('fileRepresentation', this.sequence.resources[0].stillImageRepresentationsToDisplay[0].stillImageFileValue);
            // wait until the resource is ready
            setTimeout(() => {
                // console.log(this.sequence);
                console.log('sequence', this.sequence);
                this.loading = false;
            }, 1000);
        }, (error) => {
            console.error(error);
        });
    }
    /**
     * Collect all file representations (stillImage, movingImage, audio etc.) and annotations (region, sequence etc.)
     *
     * @param resource
     */
    /*
    collectFileRepresentationsAndFileAnnotations(resource: Resource): FileRepresentation[] {
        const fileRepresentations: FileRepresentation[] = [];

        if (resource.properties[KnoraConstants.hasStillImageFileValue] !== undefined) {
            const fileValues: ReadStillImageFileValue[] = resource.properties[KnoraConstants.hasStillImageFileValue] as ReadStillImageFileValue[];
        }

        return fileRepresentations;
    }

    /*

        collectImagesAndRegionsForResource(resource: Resource): void {

            const imgRepresentations: StillImageRepresentation[] = [];

            if (resource.properties[KnoraConstants.hasStillImageFileValue] !== undefined) {
                // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                // resource has StillImageFileValues that are directly attached to it (properties)

                const fileValues: ReadStillImageFileValue[] = resource.properties[KnoraConstants.hasStillImageFileValue] as ReadStillImageFileValue[];
                const imagesToDisplay: ReadStillImageFileValue[] = fileValues.filter((image) => {
                    return !image.isPreview;
                });


                for (const img of imagesToDisplay) {

                    const regions: ImageRegion[] = [];
                    for (const incomingRegion of resource.incomingAnnotations) {

                        const region = new ImageRegion(incomingRegion);

                        regions.push(region);

                    }

                    const stillImage = new StillImageRepresentation(img, regions);
                    imgRepresentations.push(stillImage);

                }


            } else if (resource.incomingStillImageRepresentations.length > 0) {
                // there are StillImageRepresentations pointing to this resource (incoming)

                const readStillImageFileValues: ReadStillImageFileValue[] = resource.incomingStillImageRepresentations.map(
                    (stillImageRes: ReadResource) => {
                        const fileValues = stillImageRes.properties[KnoraConstants.hasStillImageFileValue] as ReadStillImageFileValue[];
                        // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                        const imagesToDisplay = fileValues.filter((image) => {
                            return !image.isPreview;

                        });

                        return imagesToDisplay;
                    }
                ).reduce(function (prev, curr) {
                    // transform ReadStillImageFileValue[][] to ReadStillImageFileValue[]
                    return prev.concat(curr);
                });

                for (const img of readStillImageFileValues) {

                    const regions: ImageRegion[] = [];
                    for (const incomingRegion of resource.incomingRegions) {

                        const region = new ImageRegion(incomingRegion);
                        regions.push(region);

                    }

                    const stillImage = new StillImageRepresentation(img, regions);
                    imgRepresentations.push(stillImage);
                }

            }

            resource.stillImageRepresentationsToDisplay = imgRepresentations;

        }
        */
    /**
     * Get incoming resources: incoming links, incoming regions, incoming still image representations.
     */
    requestIncomingResources() {
        // make sure that this.sequence has been initialized correctly
        if (this.sequence === undefined) {
            return;
        }
        // request incoming regions
        if (this.sequence.resources[0].properties[KnoraConstants.hasStillImageFileValue]) {
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
        this.getIncomingLinks(0);
    }
    /**
     * Get incoming regions for the resource.
     *
     * @param offset
     * @param callback
     *
    getIncomingRegions(offset: number, callback?: (numberOfResources: number) => void): void {
        this._incomingService.getIncomingRegions(this.sequence.resources[0].id, offset).subscribe(
            (regions: ReadResourcesSequence) => {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(regions.ontologyInformation);

                // Append elements of regions.resources to resource.incoming
                Array.prototype.push.apply(this.sequence.resources[0].incomingRegions, regions.resources);

                // prepare regions to be displayed
                this.collectImagesAndRegionsForResource(this.sequence.resources[0]);

                // TODO: implement osdViewer
                /* if (this.osdViewer) {
                  this.osdViewer.updateRegions();
                } *

                // if callback is given, execute function with the amount of new images as the parameter
                if (callback !== undefined) {
                    callback(regions.resources.length);
                }
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    */
    /**
     * Get incoming links for a resource.
     *
     * @param offset
     * @param callback
     */
    getIncomingLinks(offset, callback) {
        this.loading = true;
        this._incomingService.getIncomingLinksForResource(this.sequence.resources[0].id, offset).subscribe((incomingResources) => {
            // update ontology information
            this.ontologyInfo.updateOntologyInformation(incomingResources.ontologyInformation);
            // Append elements incomingResources to this.sequence.incomingLinks
            Array.prototype.push.apply(this.sequence.resources[0].incomingLinks, incomingResources.resources);
            // if callback is given, execute function with the amount of incoming resources as the parameter
            if (callback !== undefined) {
                callback(incomingResources.resources.length);
            }
            this.loading = false;
        }, (error) => {
            console.error(error);
            this.loading = false;
        });
    }
}
ResourceViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-resource-view',
                template: "<div class=\"resource-view\">\n\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list>\n\n            <!-- 1) show fileRepresentation first-->\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n                    <p>{{prop.key}}</p>\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\">\n                        <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n                        <kui-still-image *ngIf=\"prop.value.length > 0\" class=\"osd-viewer\"\n                                         [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\"\n                                         [images]=\"prop.value\">\n                        </kui-still-image>\n\n                    </div>\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasMovingImageFileValue\" class=\"media\">\n                        <kui-moving-image></kui-moving-image>\n                    </div>\n\n                    <!-- TODO: switch through all other media type -->\n                    <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n\n                    <kui-collection></kui-collection>\n\n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n\n                    <div *ngSwitchDefault>\n                        <p>This media type ({{prop.key}}) is not yet implemented</p>\n                    </div>\n                </div>\n            </div>\n\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <div class=\"data\">\n                <kui-properties-view [properties]=\"resource.properties\" [guiOrder]=\"guiOrder\"\n                                     [ontologyInfo]=\"sequence.ontologyInformation\"\n                                     [incomingLinks]=\"resource.incomingLinks\">\n                </kui-properties-view>\n            </div>\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:720px;margin:0 auto}.resource-view .resource .media{width:720px;height:calc(720px / (4 / 3))}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:'-    '}.property .property-value-item li.lastItem{margin-bottom:12px}.app-link:hover{background-color:#f1f1f1}"]
            }] }
];
/** @nocollapse */
ResourceViewComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: ResourceService },
    { type: IncomingService }
];
ResourceViewComponent.propDecorators = {
    iri: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQTZCLGVBQWUsRUFBRSxjQUFjLEVBQThDLGVBQWUsRUFBcUIsTUFBTSxhQUFhLENBQUM7QUFLekssTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxxQkFBcUI7SUFrQjlCLFlBQXVCLE1BQXNCLEVBQy9CLE9BQWUsRUFDZixnQkFBaUMsRUFDakMsZ0JBQWlDO1FBSHhCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFSL0MsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFXaEMsQ0FBQztJQUVELFFBQVE7UUFDSiw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxFQUFVO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQy9ELENBQUMsTUFBeUIsRUFBRSxFQUFFO1lBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFHMUMsd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBRXZCLGtEQUFrRDtZQUVsRCxtREFBbUQ7WUFFbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFJMUcsbUVBQW1FO1lBQ25FLHFDQUFxQztZQUNyQywySUFBMkk7WUFFM0ksNkJBQTZCO1lBQzdCLHFDQUFxQztZQUNyQyx1RUFBdUU7WUFFdkUseUJBQXlCO1lBQ3pCLGtEQUFrRDtZQUdsRCx1SEFBdUg7WUFFdkgsMkhBQTJIO1lBRTNILG1DQUFtQztZQUNuQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLDhCQUE4QjtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDLEVBQ0QsQ0FBQyxLQUFzQixFQUFFLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFHRDs7OztPQUlHO0lBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFrRk07SUFFTjs7T0FFRztJQUNILHdCQUF3QjtRQUVwQiw4REFBOEQ7UUFDOUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUM3QixPQUFPO1NBQ1Y7UUFFRCwyQkFBMkI7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDOUUsZ0lBQWdJO1lBQ2hJLHdGQUF3RjtZQUV4Riw4QkFBOEI7U0FFakM7YUFBTTtZQUNILGtEQUFrRDtZQUNsRCx5RUFBeUU7WUFFekUsaUVBQWlFO1lBQ2pFLGtEQUFrRDtZQUNsRCxpSEFBaUg7WUFDakgsZ0RBQWdEO1NBQ25EO1FBRUQsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUc3QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUNFO0lBQ0Y7Ozs7O09BS0c7SUFDSCxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsUUFBOEM7UUFFM0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQzlGLENBQUMsaUJBQXdDLEVBQUUsRUFBRTtZQUN6Qyw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRW5GLG1FQUFtRTtZQUNuRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWxHLGdHQUFnRztZQUNoRyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBQ3hCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEQ7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLEVBQ0QsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDOzs7WUF6UkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLHFtR0FBNkM7O2FBRWhEOzs7O1lBWlEsY0FBYztZQUFFLE1BQU07WUFDa0YsZUFBZTtZQUE1RixlQUFlOzs7a0JBaUI5QyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBHdWlPcmRlciwgSW5jb21pbmdTZXJ2aWNlLCBLbm9yYUNvbnN0YW50cywgT250b2xvZ3lJbmZvcm1hdGlvbiwgUmVhZFJlc291cmNlc1NlcXVlbmNlLCBSZXNvdXJjZVNlcnZpY2UsIFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBJbWFnZVJlZ2lvbiwgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vLi4vcmVzb3VyY2UnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktcmVzb3VyY2UtdmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Jlc291cmNlLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Jlc291cmNlLXZpZXcuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2lyaV0gUmVzb3VyY2UgaXJpXG4gICAgICovXG4gICAgQElucHV0KCkgaXJpPzogc3RyaW5nO1xuXG4gICAgc2VxdWVuY2U6IFJlc291cmNlc1NlcXVlbmNlO1xuXG4gICAgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIGd1aU9yZGVyOiBHdWlPcmRlcltdO1xuICAgIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgZXJyb3I6IGFueTtcbiAgICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuXG4gICAgLy8gZG9lcyB0aGUgcmVzb3VyY2UgaGFzIGEgZmlsZSByZXByZXNlbnRhdGlvbiAobWVkaWEgZmlsZSk/XG4gICAgZmlsZVJlcHJlc2VudGF0aW9uOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IgKHByb3RlY3RlZCBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcm90ZWN0ZWQgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBwcm90ZWN0ZWQgX3Jlc291cmNlU2VydmljZTogUmVzb3VyY2VTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgX2luY29taW5nU2VydmljZTogSW5jb21pbmdTZXJ2aWNlXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy5nZXRSZXNvdXJjZSh0aGlzLmlyaSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuZ2V0UmVzb3VyY2UodGhpcy5pcmkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHJlYWQgcmVzb3VyY2Ugc2VxdWVuY2Ugd2l0aCBvbnRvbG9neSBpbmZvcm1hdGlvbiBhbmQgaW5jb21pbmcgcmVzb3VyY2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFJlc291cmNlIGlyaVxuICAgICAqL1xuICAgIGdldFJlc291cmNlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlKGRlY29kZVVSSUNvbXBvbmVudChpZCkpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQ6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0UmVzb3VyY2UgcmVzdWx0JywgcmVzdWx0KTtcblxuXG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0IHdpdGggcmVzb3VyY2VzIG9ubHkgYW5kIFdJVEhPVVQgaW5jb21pbmcgc3R1ZmZcbiAgICAgICAgICAgICAgICB0aGlzLnNlcXVlbmNlID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbnRvbG9neUluZm8gPSByZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlc1R5cGUgPSB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS50eXBlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ndWlPcmRlciA9IHJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uLmdldFJlc291cmNlQ2xhc3NlcygpW3RoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnR5cGVdLmd1aU9yZGVyO1xuXG5cblxuICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgYWxsIGZpbGVyZXByZXNlbnRhdGlvbnMgdG8gZGlzcGxheSBpbmNsdWRpbmcgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICAvLyAtLT4gZm9yIHRoZSBmaXJzdCByZXNvdXJjZSBvbmx5Li4uXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uZmlsZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IHRoaXMuY29sbGVjdEZpbGVSZXByZXNlbnRhdGlvbnNBbmRGaWxlQW5ub3RhdGlvbnModGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0pO1xuXG4gICAgICAgICAgICAgICAgLy8gY29sbGVjdCBpbWFnZXMgYW5kIHJlZ2lvbnNcbiAgICAgICAgICAgICAgICAvLyAtLT4gZm9yIHRoZSBmaXJzdCByZXNvdXJjZSBvbmx5Li4uXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RJbmNvbWluZ1Jlc291cmNlcygpO1xuXG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLmZpbGVSZXByZXNlbnRhdGlvbiA9IHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnByb3BlcnRpZXMuaW5kZXhPZihLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlKSA+IC0xO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2ZpbGVSZXByZXNlbnRhdGlvbicsIHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXlbMF0uc3RpbGxJbWFnZUZpbGVWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyB3YWl0IHVudGlsIHRoZSByZXNvdXJjZSBpcyByZWFkeVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlcXVlbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlcXVlbmNlJywgdGhpcy5zZXF1ZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGFsbCBmaWxlIHJlcHJlc2VudGF0aW9ucyAoc3RpbGxJbWFnZSwgbW92aW5nSW1hZ2UsIGF1ZGlvIGV0Yy4pIGFuZCBhbm5vdGF0aW9ucyAocmVnaW9uLCBzZXF1ZW5jZSBldGMuKVxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlXG4gICAgICovXG4gICAgLypcbiAgICBjb2xsZWN0RmlsZVJlcHJlc2VudGF0aW9uc0FuZEZpbGVBbm5vdGF0aW9ucyhyZXNvdXJjZTogUmVzb3VyY2UpOiBGaWxlUmVwcmVzZW50YXRpb25bXSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZXByZXNlbnRhdGlvbnM6IEZpbGVSZXByZXNlbnRhdGlvbltdID0gW107XG5cbiAgICAgICAgaWYgKHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWxlUmVwcmVzZW50YXRpb25zO1xuICAgIH1cblxuICAgIC8qXG5cbiAgICAgICAgY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcblxuICAgICAgICAgICAgY29uc3QgaW1nUmVwcmVzZW50YXRpb25zOiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAvLyByZXNvdXJjZSBoYXMgU3RpbGxJbWFnZUZpbGVWYWx1ZXMgdGhhdCBhcmUgZGlyZWN0bHkgYXR0YWNoZWQgdG8gaXQgKHByb3BlcnRpZXMpXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlc1RvRGlzcGxheTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IGZpbGVWYWx1ZXMuZmlsdGVyKChpbWFnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWltYWdlLmlzUHJldmlldztcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWcgb2YgaW1hZ2VzVG9EaXNwbGF5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogSW1hZ2VSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIHJlc291cmNlLmluY29taW5nQW5ub3RhdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uID0gbmV3IEltYWdlUmVnaW9uKGluY29taW5nUmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9ucy5wdXNoKHJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2UgPSBuZXcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uKGltZywgcmVnaW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGltZ1JlcHJlc2VudGF0aW9ucy5wdXNoKHN0aWxsSW1hZ2UpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBhcmUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlIChpbmNvbWluZylcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRTdGlsbEltYWdlRmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHJlc291cmNlLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucy5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChzdGlsbEltYWdlUmVzOiBSZWFkUmVzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXMgPSBzdGlsbEltYWdlUmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZXNUb0Rpc3BsYXkgPSBmaWxlVmFsdWVzLmZpbHRlcigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWltYWdlLmlzUHJldmlldztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZXNUb0Rpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3Vycikge1xuICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm0gUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXVtdIHRvIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW11cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXYuY29uY2F0KGN1cnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWcgb2YgcmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogSW1hZ2VSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIHJlc291cmNlLmluY29taW5nUmVnaW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb24gPSBuZXcgSW1hZ2VSZWdpb24oaW5jb21pbmdSZWdpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9ucy5wdXNoKHJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2UgPSBuZXcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uKGltZywgcmVnaW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGltZ1JlcHJlc2VudGF0aW9ucy5wdXNoKHN0aWxsSW1hZ2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvdXJjZS5zdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gaW1nUmVwcmVzZW50YXRpb25zO1xuXG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCBpbmNvbWluZyByZXNvdXJjZXM6IGluY29taW5nIGxpbmtzLCBpbmNvbWluZyByZWdpb25zLCBpbmNvbWluZyBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMuXG4gICAgICovXG4gICAgcmVxdWVzdEluY29taW5nUmVzb3VyY2VzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoaXMuc2VxdWVuY2UgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgY29ycmVjdGx5XG4gICAgICAgIGlmICh0aGlzLnNlcXVlbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlcXVlc3QgaW5jb21pbmcgcmVnaW9uc1xuICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0ucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSkge1xuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgIC8vIHRoZSByZXNvdXJjZSBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiwgY2hlY2sgaWYgdGhlcmUgYXJlIHJlZ2lvbnMgcG9pbnRpbmcgdG8gaXRcblxuICAgICAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ1JlZ2lvbnMoMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgcmVzb3VyY2UgaXMgbm90IGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlXG5cbiAgICAgICAgICAgIC8vIHRoaXMgZ2V0cyB0aGUgZmlyc3QgcGFnZSBvZiBpbmNvbWluZyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAvLyBtb3JlIHBhZ2VzIG1heSBiZSByZXF1ZXN0ZWQgYnkgW1t0aGlzLnZpZXdlcl1dLlxuICAgICAgICAgICAgLy8gVE9ETzogZm9yIG5vdywgd2UgYmVnaW4gd2l0aCBvZmZzZXQgMC4gVGhpcyBtYXkgaGF2ZSB0byBiZSBjaGFuZ2VkIGxhdGVyIChiZWdpbm5pbmcgc29tZXdoZXJlIGluIGEgY29sbGVjdGlvbilcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGluY29taW5nIGxpbmtzIGZvciB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICB0aGlzLmdldEluY29taW5nTGlua3MoMCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpbmNvbWluZyByZWdpb25zIGZvciB0aGUgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICpcbiAgICBnZXRJbmNvbWluZ1JlZ2lvbnMob2Zmc2V0OiBudW1iZXIsIGNhbGxiYWNrPzogKG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nUmVnaW9ucyh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgb2Zmc2V0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVnaW9uczogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihyZWdpb25zLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIG9mIHJlZ2lvbnMucmVzb3VyY2VzIHRvIHJlc291cmNlLmluY29taW5nXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdSZWdpb25zLCByZWdpb25zLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIHJlZ2lvbnMgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBvc2RWaWV3ZXJcbiAgICAgICAgICAgICAgICAvKiBpZiAodGhpcy5vc2RWaWV3ZXIpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMub3NkVmlld2VyLnVwZGF0ZVJlZ2lvbnMoKTtcbiAgICAgICAgICAgICAgICB9ICpcblxuICAgICAgICAgICAgICAgIC8vIGlmIGNhbGxiYWNrIGlzIGdpdmVuLCBleGVjdXRlIGZ1bmN0aW9uIHdpdGggdGhlIGFtb3VudCBvZiBuZXcgaW1hZ2VzIGFzIHRoZSBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZWdpb25zLnJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgICovXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIGxpbmtzIGZvciBhIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9mZnNldFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3Mob2Zmc2V0OiBudW1iZXIsIGNhbGxiYWNrPzogKG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ0xpbmtzRm9yUmVzb3VyY2UodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaWQsIG9mZnNldCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGluY29taW5nUmVzb3VyY2VzOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mby51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nUmVzb3VyY2VzLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIGluY29taW5nUmVzb3VyY2VzIHRvIHRoaXMuc2VxdWVuY2UuaW5jb21pbmdMaW5rc1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nTGlua3MsIGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBjYWxsYmFjayBpcyBnaXZlbiwgZXhlY3V0ZSBmdW5jdGlvbiB3aXRoIHRoZSBhbW91bnQgb2YgaW5jb21pbmcgcmVzb3VyY2VzIGFzIHRoZSBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpbmNvbWluZ1Jlc291cmNlcy5yZXNvdXJjZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG5cblxuXG59XG4iXX0=