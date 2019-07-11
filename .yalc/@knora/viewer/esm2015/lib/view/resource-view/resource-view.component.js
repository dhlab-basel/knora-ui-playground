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
            this.loading = false;
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
                template: "<div class=\"resource-view\">\n\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading && sequence.resources.length > 0\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list>\n\n            <!-- 1) show fileRepresentation first-->\n            <div *ngIf=\"resource?.fileRepresentationsToDisplay\">\n                <!-- show file representation -->\n                <div *ngIf=\"resource.fileRepresentationsToDisplay?.stillImage && resource.fileRepresentationsToDisplay?.stillImage.length > 0\"\n                     class=\"media\">\n                    <kui-still-image class=\"osd-viewer\" [images]=\"resource.fileRepresentationsToDisplay.stillImage\">\n                    </kui-still-image>\n                </div>\n                <!--\n                <div [ngSwitch]=\"resource.fileRepresentationsToDisplay[0].type\" class=\"media\">\n                    <div *ngSwitchCase=\"KnoraConstants.StillImageFileValue\">\n                        <!-- TODO: fix: this shows only the first image, not all stillImages from fileRepresentationsToDisplay --\n\n                        <!-- [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\" --\n                    </div>\n\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasMovingImageFileValue\" class=\"media\">\n                        <kui-moving-image></kui-moving-image>\n                    </div>\n\n                    <div *ngSwitchDefault>\n                        <p>This media type {{resource.fileRepresentationsToDisplay[0].type}} is not yet implemented</p>\n                    </div>\n                </div>\n                -->\n\n            </div>\n\n            <!--\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n                    <!-- <p>{{prop.key}}</p> -->\n\n            <!-- <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\"> -->\n            <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n\n\n            <!-- </div> -->\n\n\n            <!-- TODO: switch through all other media type -->\n            <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n\n                    <kui-collection></kui-collection>\n\n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n            <!--\n                    <div *ngSwitchDefault>\n                        <p>This media type ({{prop.key}}) is not yet implemented</p>\n                    </div>\n                </div>\n            </div>\n        -->\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <div class=\"data\">\n                <kui-properties-view [properties]=\"resource.properties\" [guiOrder]=\"guiOrder\"\n                                     [ontologyInfo]=\"sequence.ontologyInformation\"\n                                     [incomingLinks]=\"resource.incomingLinks\">\n                </kui-properties-view>\n            </div>\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.kui-link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:720px;margin:0 auto}.resource-view .resource .media{width:720px;height:calc(720px / (4 / 3))}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:'-    '}.property .property-value-item li.lastItem{margin-bottom:12px}.app-link:hover{background-color:#f1f1f1}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQTZCLGVBQWUsRUFBRSxjQUFjLEVBQThDLGVBQWUsRUFBcUIsTUFBTSxhQUFhLENBQUM7QUFLekssTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxxQkFBcUI7SUFrQjlCLFlBQXVCLE1BQXNCLEVBQy9CLE9BQWUsRUFDZixnQkFBaUMsRUFDakMsZ0JBQWlDO1FBSHhCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFSL0MsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFXaEMsQ0FBQztJQUVELFFBQVE7UUFDSiw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxFQUFVO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQy9ELENBQUMsTUFBeUIsRUFBRSxFQUFFO1lBRTFCLE9B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LENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDOzs7WUF6UkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDhpSUFBNkM7O2FBRWhEOzs7O1lBWlEsY0FBYztZQUFFLE1BQU07WUFDa0YsZUFBZTtZQUE1RixlQUFlOzs7a0JBaUI5QyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBHdWlPcmRlciwgSW5jb21pbmdTZXJ2aWNlLCBLbm9yYUNvbnN0YW50cywgT250b2xvZ3lJbmZvcm1hdGlvbiwgUmVhZFJlc291cmNlc1NlcXVlbmNlLCBSZXNvdXJjZVNlcnZpY2UsIFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG4vLyBpbXBvcnQgeyBSZWdpb24sIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uLy4uL3Jlc291cmNlJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXJlc291cmNlLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpcmldIFJlc291cmNlIGlyaVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGlyaT86IHN0cmluZztcblxuICAgIHNlcXVlbmNlOiBSZXNvdXJjZXNTZXF1ZW5jZTtcblxuICAgIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICBndWlPcmRlcjogR3VpT3JkZXJbXTtcbiAgICBsb2FkaW5nOiBib29sZWFuO1xuICAgIGVycm9yOiBhbnk7XG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcblxuICAgIC8vIGRvZXMgdGhlIHJlc291cmNlIGhhcyBhIGZpbGUgcmVwcmVzZW50YXRpb24gKG1lZGlhIGZpbGUpP1xuICAgIGZpbGVSZXByZXNlbnRhdGlvbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yIChwcm90ZWN0ZWQgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJvdGVjdGVkIF9yZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIF9pbmNvbWluZ1NlcnZpY2U6IEluY29taW5nU2VydmljZVxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMuZ2V0UmVzb3VyY2UodGhpcy5pcmkpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmdldFJlc291cmNlKHRoaXMuaXJpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSByZWFkIHJlc291cmNlIHNlcXVlbmNlIHdpdGggb250b2xvZ3kgaW5mb3JtYXRpb24gYW5kIGluY29taW5nIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBSZXNvdXJjZSBpcmlcbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZShpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZShkZWNvZGVVUklDb21wb25lbnQoaWQpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0OiBSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFJlc291cmNlIHJlc3VsdCcsIHJlc3VsdCk7XG5cblxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdCB3aXRoIHJlc291cmNlcyBvbmx5IGFuZCBXSVRIT1VUIGluY29taW5nIHN0dWZmXG4gICAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZSA9IHJlc3VsdDtcblxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbnRvbG9neUluZm8gPSByZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlc1R5cGUgPSB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS50eXBlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ndWlPcmRlciA9IHJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uLmdldFJlc291cmNlQ2xhc3NlcygpW3RoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnR5cGVdLmd1aU9yZGVyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IGFsbCBmaWxlcmVwcmVzZW50YXRpb25zIHRvIGRpc3BsYXkgaW5jbHVkaW5nIGFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgLy8gLS0+IGZvciB0aGUgZmlyc3QgcmVzb3VyY2Ugb25seS4uLlxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSB0aGlzLmNvbGxlY3RGaWxlUmVwcmVzZW50YXRpb25zQW5kRmlsZUFubm90YXRpb25zKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgaW1hZ2VzIGFuZCByZWdpb25zXG4gICAgICAgICAgICAgICAgLy8gLS0+IGZvciB0aGUgZmlyc3QgcmVzb3VyY2Ugb25seS4uLlxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SW5jb21pbmdSZXNvdXJjZXMoKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5maWxlUmVwcmVzZW50YXRpb24gPSB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5wcm9wZXJ0aWVzLmluZGV4T2YoS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSkgPiAtMTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmaWxlUmVwcmVzZW50YXRpb24nLCB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5zdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5WzBdLnN0aWxsSW1hZ2VGaWxlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2FpdCB1bnRpbCB0aGUgcmVzb3VyY2UgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZXF1ZW5jZSk7XG5cbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdCBhbGwgZmlsZSByZXByZXNlbnRhdGlvbnMgKHN0aWxsSW1hZ2UsIG1vdmluZ0ltYWdlLCBhdWRpbyBldGMuKSBhbmQgYW5ub3RhdGlvbnMgKHJlZ2lvbiwgc2VxdWVuY2UgZXRjLilcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZVxuICAgICAqL1xuICAgIC8qXG4gICAgY29sbGVjdEZpbGVSZXByZXNlbnRhdGlvbnNBbmRGaWxlQW5ub3RhdGlvbnMocmVzb3VyY2U6IFJlc291cmNlKTogRmlsZVJlcHJlc2VudGF0aW9uW10ge1xuICAgICAgICBjb25zdCBmaWxlUmVwcmVzZW50YXRpb25zOiBGaWxlUmVwcmVzZW50YXRpb25bXSA9IFtdO1xuXG4gICAgICAgIGlmIChyZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSByZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsZVJlcHJlc2VudGF0aW9ucztcbiAgICB9XG5cbiAgICAvKlxuXG4gICAgICAgIGNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UocmVzb3VyY2U6IFJlc291cmNlKTogdm9pZCB7XG5cbiAgICAgICAgICAgIGNvbnN0IGltZ1JlcHJlc2VudGF0aW9uczogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10gPSBbXTtcblxuICAgICAgICAgICAgaWYgKHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgLy8gcmVzb3VyY2UgaGFzIFN0aWxsSW1hZ2VGaWxlVmFsdWVzIHRoYXQgYXJlIGRpcmVjdGx5IGF0dGFjaGVkIHRvIGl0IChwcm9wZXJ0aWVzKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZXNUb0Rpc3BsYXk6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSBmaWxlVmFsdWVzLmZpbHRlcigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpbWFnZS5pc1ByZXZpZXc7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW1nIG9mIGltYWdlc1RvRGlzcGxheSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbmNvbWluZ1JlZ2lvbiBvZiByZXNvdXJjZS5pbmNvbWluZ0Fubm90YXRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbiA9IG5ldyBJbWFnZVJlZ2lvbihpbmNvbWluZ1JlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbnMucHVzaChyZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpbWdSZXByZXNlbnRhdGlvbnMucHVzaChzdGlsbEltYWdlKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc291cmNlLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgYXJlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSAoaW5jb21pbmcpXG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSByZXNvdXJjZS5pbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMubWFwKFxuICAgICAgICAgICAgICAgICAgICAoc3RpbGxJbWFnZVJlczogUmVhZFJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzID0gc3RpbGxJbWFnZVJlcy5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5ID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpbWFnZS5pc1ByZXZpZXc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2VzVG9EaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW11bXSB0byBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2LmNvbmNhdChjdXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW1nIG9mIHJlYWRTdGlsbEltYWdlRmlsZVZhbHVlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbmNvbWluZ1JlZ2lvbiBvZiByZXNvdXJjZS5pbmNvbWluZ1JlZ2lvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uID0gbmV3IEltYWdlUmVnaW9uKGluY29taW5nUmVnaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbnMucHVzaChyZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpbWdSZXByZXNlbnRhdGlvbnMucHVzaChzdGlsbEltYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb3VyY2Uuc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IGltZ1JlcHJlc2VudGF0aW9ucztcblxuICAgICAgICB9XG4gICAgICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5jb21pbmcgcmVzb3VyY2VzOiBpbmNvbWluZyBsaW5rcywgaW5jb21pbmcgcmVnaW9ucywgaW5jb21pbmcgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zLlxuICAgICAqL1xuICAgIHJlcXVlc3RJbmNvbWluZ1Jlc291cmNlcygpOiB2b2lkIHtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGlzLnNlcXVlbmNlIGhhcyBiZWVuIGluaXRpYWxpemVkIGNvcnJlY3RseVxuICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXF1ZXN0IGluY29taW5nIHJlZ2lvbnNcbiAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0pIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAvLyB0aGUgcmVzb3VyY2UgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24sIGNoZWNrIGlmIHRoZXJlIGFyZSByZWdpb25zIHBvaW50aW5nIHRvIGl0XG5cbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdSZWdpb25zKDApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIHJlc291cmNlIGlzIG5vdCBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZVxuXG4gICAgICAgICAgICAvLyB0aGlzIGdldHMgdGhlIGZpcnN0IHBhZ2Ugb2YgaW5jb21pbmcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1xuICAgICAgICAgICAgLy8gbW9yZSBwYWdlcyBtYXkgYmUgcmVxdWVzdGVkIGJ5IFtbdGhpcy52aWV3ZXJdXS5cbiAgICAgICAgICAgIC8vIFRPRE86IGZvciBub3csIHdlIGJlZ2luIHdpdGggb2Zmc2V0IDAuIFRoaXMgbWF5IGhhdmUgdG8gYmUgY2hhbmdlZCBsYXRlciAoYmVnaW5uaW5nIHNvbWV3aGVyZSBpbiBhIGNvbGxlY3Rpb24pXG4gICAgICAgICAgICAvLyB0aGlzLmdldEluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBpbmNvbWluZyBsaW5rcyBmb3IgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgdGhpcy5nZXRJbmNvbWluZ0xpbmtzKDApO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5jb21pbmcgcmVnaW9ucyBmb3IgdGhlIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9mZnNldFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqXG4gICAgZ2V0SW5jb21pbmdSZWdpb25zKG9mZnNldDogbnVtYmVyLCBjYWxsYmFjaz86IChudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ1JlZ2lvbnModGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaWQsIG9mZnNldCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlZ2lvbnM6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ocmVnaW9ucy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbGVtZW50cyBvZiByZWdpb25zLnJlc291cmNlcyB0byByZXNvdXJjZS5pbmNvbWluZ1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nUmVnaW9ucywgcmVnaW9ucy5yZXNvdXJjZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJlcGFyZSByZWdpb25zIHRvIGJlIGRpc3BsYXllZFxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgb3NkVmlld2VyXG4gICAgICAgICAgICAgICAgLyogaWYgKHRoaXMub3NkVmlld2VyKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9zZFZpZXdlci51cGRhdGVSZWdpb25zKCk7XG4gICAgICAgICAgICAgICAgfSAqXG5cbiAgICAgICAgICAgICAgICAvLyBpZiBjYWxsYmFjayBpcyBnaXZlbiwgZXhlY3V0ZSBmdW5jdGlvbiB3aXRoIHRoZSBhbW91bnQgb2YgbmV3IGltYWdlcyBhcyB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVnaW9ucy5yZXNvdXJjZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAqL1xuICAgIC8qKlxuICAgICAqIEdldCBpbmNvbWluZyBsaW5rcyBmb3IgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBnZXRJbmNvbWluZ0xpbmtzKG9mZnNldDogbnVtYmVyLCBjYWxsYmFjaz86IChudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0SW5jb21pbmdMaW5rc0ZvclJlc291cmNlKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmlkLCBvZmZzZXQpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChpbmNvbWluZ1Jlc291cmNlczogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ1Jlc291cmNlcy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbGVtZW50cyBpbmNvbWluZ1Jlc291cmNlcyB0byB0aGlzLnNlcXVlbmNlLmluY29taW5nTGlua3NcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pbmNvbWluZ0xpbmtzLCBpbmNvbWluZ1Jlc291cmNlcy5yZXNvdXJjZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgY2FsbGJhY2sgaXMgZ2l2ZW4sIGV4ZWN1dGUgZnVuY3Rpb24gd2l0aCB0aGUgYW1vdW50IG9mIGluY29taW5nIHJlc291cmNlcyBhcyB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxuXG5cblxufVxuIl19