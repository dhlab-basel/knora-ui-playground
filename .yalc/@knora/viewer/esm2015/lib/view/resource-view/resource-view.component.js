import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomingService, KnoraConstants, ResourceService } from '@knora/core';
import { StillImageComponent } from '../../resource';
const jsonld = require('jsonld');
let ResourceViewComponent = class ResourceViewComponent {
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
        // console.log(this.kuiStillImage.k;
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
                this.currentResource = this.sequence.resources[0].incomingFileRepresentations[0];
                console.log('currentResource', this.sequence.resources[0].incomingFileRepresentations[0]);
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
    openLink(id) {
        this.loading = true;
        // this.routeChanged.emit(id);
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    }
    refreshProperties(index) {
        console.log('from still-image-component: ', index);
        this.currentResource = this.sequence.resources[0].incomingFileRepresentations[index];
        console.log(this.currentResource);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ResourceViewComponent.prototype, "iri", void 0);
tslib_1.__decorate([
    ViewChild('kuiStillImage', { static: false }),
    tslib_1.__metadata("design:type", StillImageComponent)
], ResourceViewComponent.prototype, "kuiStillImage", void 0);
ResourceViewComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-resource-view',
        template: "<div class=\"resource-view\">\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading && sequence?.resources.length > 0\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <!--             <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list> -->\n\n            <!-- 1) show fileRepresentation first-->\n\n            <!-- show file representation -->\n            <div *ngIf=\"resource.fileRepresentationsToDisplay?.stillImage && resource.fileRepresentationsToDisplay?.stillImage.length > 0\"\n                 class=\"media\">\n                <kui-still-image #kuiStillImage class=\"osd-viewer\"\n                                 [images]=\"resource.fileRepresentationsToDisplay.stillImage\">\n                </kui-still-image>\n            </div>\n            <!--\n                <div [ngSwitch]=\"resource.fileRepresentationsToDisplay[0].type\" class=\"media\">\n                    <div *ngSwitchCase=\"KnoraConstants.StillImageFileValue\">\n                        <!-- TODO: fix: this shows only the first image, not all stillImages from fileRepresentationsToDisplay --\n\n                        <!-- [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\" --\n                    </div>\n\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasMovingImageFileValue\" class=\"media\">\n                        <kui-moving-image></kui-moving-image>\n                    </div>\n\n                    <div *ngSwitchDefault>\n                        <p>This media type {{resource.fileRepresentationsToDisplay[0].type}} is not yet implemented</p>\n                    </div>\n                </div>\n                -->\n\n\n\n            <!--\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n                    <!-- <p>{{prop.key}}</p> -->\n\n            <!-- <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\"> -->\n            <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n\n\n            <!-- </div> -->\n\n\n            <!-- TODO: switch through all other media type -->\n            <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n\n                    <kui-collection></kui-collection>\n\n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n            <!--\n                    <div *ngSwitchDefault>\n                        <p>This media type ({{prop.key}}) is not yet implemented</p>\n                    </div>\n                </div>\n            </div>\n            -->\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <mat-tab-group animationDuration=\"0ms\" class=\"full-width data\">\n                <!-- first tab for the main resource e.g. book -->\n                <mat-tab [label]=\"sequence.ontologyInformation.getLabelForResourceClass(resource.type)\">\n                    <kui-properties-view [properties]=\"resource.properties\" [guiOrder]=\"guiOrder\"\n                                         [ontologyInfo]=\"sequence.ontologyInformation\"\n                                         [incomingLinks]=\"resource.incomingLinks\">\n                    </kui-properties-view>\n                </mat-tab>\n                <!-- TODO: second tab for a \"part-of\"-resource e.g. book page -->\n\n                <mat-tab *ngIf=\"resource.incomingFileRepresentations.length > 0 && currentResource\"\n                         [label]=\"sequence.ontologyInformation.getLabelForResourceClass(currentResource.type)\">\n                    <kui-properties-view [properties]=\"currentResource?.properties\"\n                                         [guiOrder]=\"sequence.ontologyInformation.getResourceClasses()[currentResource.type].guiOrder\"\n                                         [ontologyInfo]=\"sequence.ontologyInformation\">\n                    </kui-properties-view>\n                    <!--\n                    <kui-properties-view [properties]=\"resource.incomingFileRepresentations[0].resource.properties\"\n                                         [guiOrder]=\"sequence.ontologyInformation.getResourceClasses()[resource.incomingFileRepresentations[0].type].guiOrder\"\n                                         [ontologyInfo]=\"sequence.ontologyInformation\"\n                                         [incomingLinks]=\"resource.incomingFileRepresentations[0].incomingLinks\">\n                    </kui-properties-view>\n                -->\n                </mat-tab>\n                <!-- TODO: third tab for a \"region\"-resource -->\n            </mat-tab-group>\n\n\n\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:960px;margin:0 auto}.resource-view .resource .media{width:800px;height:500px;display:block;margin:0 auto}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:\"-    \"}.property .property-value-item li.lastItem{margin-bottom:12px}@media (max-width:576px){.resource-view .resource .media{width:auto}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        Router,
        ResourceService,
        IncomingService])
], ResourceViewComponent);
export { ResourceViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBNkIsZUFBZSxFQUFFLGNBQWMsRUFBNEQsZUFBZSxFQUFxQixNQUFNLGFBQWEsQ0FBQztBQUN2TCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtyRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFPakMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUF1QjlCLFlBQXVCLE1BQXNCLEVBQy9CLE9BQWUsRUFDZixnQkFBaUMsRUFDakMsZ0JBQWlDO1FBSHhCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFYL0MsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFjaEMsQ0FBQztJQUVELFFBQVE7UUFDSiw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQixvQ0FBb0M7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsRUFBVTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMs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Qjs0REFBQztBQVB6RSxxQkFBcUI7SUFMakMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG1CQUFtQjtRQUM3Qiw4bExBQTZDOztLQUVoRCxDQUFDOzZDQXdCaUMsY0FBYztRQUN0QixNQUFNO1FBQ0csZUFBZTtRQUNmLGVBQWU7R0ExQnRDLHFCQUFxQixDQWtUakM7U0FsVFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEd1aU9yZGVyLCBJbmNvbWluZ1NlcnZpY2UsIEtub3JhQ29uc3RhbnRzLCBPbnRvbG9neUluZm9ybWF0aW9uLCBSZWFkUmVzb3VyY2UsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSwgUmVzb3VyY2VTZXJ2aWNlLCBSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IFN0aWxsSW1hZ2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9yZXNvdXJjZSc7XG5cbi8vIGltcG9ydCB7IFJlZ2lvbiwgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIH0gZnJvbSAnLi4vLi4vcmVzb3VyY2UnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktcmVzb3VyY2UtdmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Jlc291cmNlLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Jlc291cmNlLXZpZXcuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2lyaV0gUmVzb3VyY2UgaXJpXG4gICAgICovXG4gICAgQElucHV0KCkgaXJpPzogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgna3VpU3RpbGxJbWFnZScsIHsgc3RhdGljOiBmYWxzZSB9KSBrdWlTdGlsbEltYWdlOiBTdGlsbEltYWdlQ29tcG9uZW50O1xuXG4gICAgc2VxdWVuY2U6IFJlc291cmNlc1NlcXVlbmNlO1xuXG4gICAgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuICAgIGd1aU9yZGVyOiBHdWlPcmRlcltdO1xuICAgIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgZXJyb3I6IGFueTtcbiAgICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuXG4gICAgLy8gZG9lcyB0aGUgcmVzb3VyY2UgaGFzIGEgZmlsZSByZXByZXNlbnRhdGlvbiAobWVkaWEgZmlsZSk/XG4gICAgZmlsZVJlcHJlc2VudGF0aW9uOiBib29sZWFuO1xuXG4gICAgLy8gY3VycmVudCByZXNvdXJjZSBpbiBjYXNlIG9mIGNvbXBvdW5kIG9iamVjdFxuICAgIGN1cnJlbnRSZXNvdXJjZTogUmVhZFJlc291cmNlO1xuXG4gICAgY29uc3RydWN0b3IgKHByb3RlY3RlZCBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcm90ZWN0ZWQgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBwcm90ZWN0ZWQgX3Jlc291cmNlU2VydmljZTogUmVzb3VyY2VTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgX2luY29taW5nU2VydmljZTogSW5jb21pbmdTZXJ2aWNlXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gdGhpcy5nZXRSZXNvdXJjZSh0aGlzLmlyaSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuZ2V0UmVzb3VyY2UodGhpcy5pcmkpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMua3VpU3RpbGxJbWFnZS5rO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHJlYWQgcmVzb3VyY2Ugc2VxdWVuY2Ugd2l0aCBvbnRvbG9neSBpbmZvcm1hdGlvbiBhbmQgaW5jb21pbmcgcmVzb3VyY2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFJlc291cmNlIGlyaVxuICAgICAqL1xuICAgIGdldFJlc291cmNlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VTZXJ2aWNlLmdldFJlc291cmNlKGRlY29kZVVSSUNvbXBvbmVudChpZCkpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXN1bHQ6IFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0UmVzb3VyY2UgcmVzdWx0JywgcmVzdWx0KTtcblxuXG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0IHdpdGggcmVzb3VyY2VzIG9ubHkgYW5kIFdJVEhPVVQgaW5jb21pbmcgc3R1ZmZcbiAgICAgICAgICAgICAgICB0aGlzLnNlcXVlbmNlID0gcmVzdWx0O1xuXG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLm9udG9sb2d5SW5mbyA9IHJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmVzVHlwZSA9IHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnR5cGU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmd1aU9yZGVyID0gcmVzdWx0Lm9udG9sb2d5SW5mb3JtYXRpb24uZ2V0UmVzb3VyY2VDbGFzc2VzKClbdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0udHlwZV0uZ3VpT3JkZXI7XG5cblxuXG5cbiAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IGFsbCBmaWxlcmVwcmVzZW50YXRpb25zIHRvIGRpc3BsYXkgaW5jbHVkaW5nIGFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgLy8gLS0+IGZvciB0aGUgZmlyc3QgcmVzb3VyY2Ugb25seS4uLlxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSB0aGlzLmNvbGxlY3RGaWxlUmVwcmVzZW50YXRpb25zQW5kRmlsZUFubm90YXRpb25zKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgaW1hZ2VzIGFuZCByZWdpb25zXG4gICAgICAgICAgICAgICAgLy8gLS0+IGZvciB0aGUgZmlyc3QgcmVzb3VyY2Ugb25seS4uLlxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SW5jb21pbmdSZXNvdXJjZXMoKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5maWxlUmVwcmVzZW50YXRpb24gPSB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5wcm9wZXJ0aWVzLmluZGV4T2YoS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSkgPiAtMTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmaWxlUmVwcmVzZW50YXRpb24nLCB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5zdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5WzBdLnN0aWxsSW1hZ2VGaWxlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2FpdCB1bnRpbCB0aGUgcmVzb3VyY2UgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZXF1ZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc291cmNlID0gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdGaWxlUmVwcmVzZW50YXRpb25zWzBdO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3VycmVudFJlc291cmNlJywgdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdGaWxlUmVwcmVzZW50YXRpb25zWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3QgYWxsIGZpbGUgcmVwcmVzZW50YXRpb25zIChzdGlsbEltYWdlLCBtb3ZpbmdJbWFnZSwgYXVkaW8gZXRjLikgYW5kIGFubm90YXRpb25zIChyZWdpb24sIHNlcXVlbmNlIGV0Yy4pXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VcbiAgICAgKi9cbiAgICAvKlxuICAgIGNvbGxlY3RGaWxlUmVwcmVzZW50YXRpb25zQW5kRmlsZUFubm90YXRpb25zKHJlc291cmNlOiBSZXNvdXJjZSk6IEZpbGVSZXByZXNlbnRhdGlvbltdIHtcbiAgICAgICAgY29uc3QgZmlsZVJlcHJlc2VudGF0aW9uczogRmlsZVJlcHJlc2VudGF0aW9uW10gPSBbXTtcblxuICAgICAgICBpZiAocmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbGVSZXByZXNlbnRhdGlvbnM7XG4gICAgfVxuXG4gICAgLypcblxuICAgICAgICBjb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHJlc291cmNlOiBSZXNvdXJjZSk6IHZvaWQge1xuXG4gICAgICAgICAgICBjb25zdCBpbWdSZXByZXNlbnRhdGlvbnM6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdID0gW107XG5cbiAgICAgICAgICAgIGlmIChyZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgICAgIC8vIHJlc291cmNlIGhhcyBTdGlsbEltYWdlRmlsZVZhbHVlcyB0aGF0IGFyZSBkaXJlY3RseSBhdHRhY2hlZCB0byBpdCAocHJvcGVydGllcylcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSByZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5OiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaW1hZ2UuaXNQcmV2aWV3O1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiBpbWFnZXNUb0Rpc3BsYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25zOiBJbWFnZVJlZ2lvbltdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5jb21pbmdSZWdpb24gb2YgcmVzb3VyY2UuaW5jb21pbmdBbm5vdGF0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb24gPSBuZXcgSW1hZ2VSZWdpb24oaW5jb21pbmdSZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpb25zLnB1c2gocmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZSA9IG5ldyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24oaW1nLCByZWdpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nUmVwcmVzZW50YXRpb25zLnB1c2goc3RpbGxJbWFnZSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNvdXJjZS5pbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGFyZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UgKGluY29taW5nKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHN0aWxsSW1hZ2VSZXM6IFJlYWRSZXNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZVZhbHVlcyA9IHN0aWxsSW1hZ2VSZXMucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlc1RvRGlzcGxheSA9IGZpbGVWYWx1ZXMuZmlsdGVyKChpbWFnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaW1hZ2UuaXNQcmV2aWV3O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGltYWdlc1RvRGlzcGxheTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBjdXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zZm9ybSBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdW10gdG8gUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldi5jb25jYXQoY3Vycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiByZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25zOiBJbWFnZVJlZ2lvbltdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5jb21pbmdSZWdpb24gb2YgcmVzb3VyY2UuaW5jb21pbmdSZWdpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbiA9IG5ldyBJbWFnZVJlZ2lvbihpbmNvbWluZ1JlZ2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpb25zLnB1c2gocmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZSA9IG5ldyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24oaW1nLCByZWdpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nUmVwcmVzZW50YXRpb25zLnB1c2goc3RpbGxJbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc291cmNlLnN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSBpbWdSZXByZXNlbnRhdGlvbnM7XG5cbiAgICAgICAgfVxuICAgICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIHJlc291cmNlczogaW5jb21pbmcgbGlua3MsIGluY29taW5nIHJlZ2lvbnMsIGluY29taW5nIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKi9cbiAgICByZXF1ZXN0SW5jb21pbmdSZXNvdXJjZXMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhpcy5zZXF1ZW5jZSBoYXMgYmVlbiBpbml0aWFsaXplZCBjb3JyZWN0bHlcbiAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVxdWVzdCBpbmNvbWluZyByZWdpb25zXG4gICAgICAgIGlmICh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgLy8gdGhlIHJlc291cmNlIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uLCBjaGVjayBpZiB0aGVyZSBhcmUgcmVnaW9ucyBwb2ludGluZyB0byBpdFxuXG4gICAgICAgICAgICAvLyB0aGlzLmdldEluY29taW5nUmVnaW9ucygwKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyByZXNvdXJjZSBpcyBub3QgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2VcblxuICAgICAgICAgICAgLy8gdGhpcyBnZXRzIHRoZSBmaXJzdCBwYWdlIG9mIGluY29taW5nIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNcbiAgICAgICAgICAgIC8vIG1vcmUgcGFnZXMgbWF5IGJlIHJlcXVlc3RlZCBieSBbW3RoaXMudmlld2VyXV0uXG4gICAgICAgICAgICAvLyBUT0RPOiBmb3Igbm93LCB3ZSBiZWdpbiB3aXRoIG9mZnNldCAwLiBUaGlzIG1heSBoYXZlIHRvIGJlIGNoYW5nZWQgbGF0ZXIgKGJlZ2lubmluZyBzb21ld2hlcmUgaW4gYSBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBjdXJyZW50IHJlc291cmNlXG4gICAgICAgIHRoaXMuZ2V0SW5jb21pbmdMaW5rcygwKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIHJlZ2lvbnMgZm9yIHRoZSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKlxuICAgIGdldEluY29taW5nUmVnaW9ucyhvZmZzZXQ6IG51bWJlciwgY2FsbGJhY2s/OiAobnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0SW5jb21pbmdSZWdpb25zKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmlkLCBvZmZzZXQpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZWdpb25zOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mby51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKHJlZ2lvbnMub250b2xvZ3lJbmZvcm1hdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgb2YgcmVnaW9ucy5yZXNvdXJjZXMgdG8gcmVzb3VyY2UuaW5jb21pbmdcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pbmNvbWluZ1JlZ2lvbnMsIHJlZ2lvbnMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgcmVnaW9ucyB0byBiZSBkaXNwbGF5ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0pO1xuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IG9zZFZpZXdlclxuICAgICAgICAgICAgICAgIC8qIGlmICh0aGlzLm9zZFZpZXdlcikge1xuICAgICAgICAgICAgICAgICAgdGhpcy5vc2RWaWV3ZXIudXBkYXRlUmVnaW9ucygpO1xuICAgICAgICAgICAgICAgIH0gKlxuXG4gICAgICAgICAgICAgICAgLy8gaWYgY2FsbGJhY2sgaXMgZ2l2ZW4sIGV4ZWN1dGUgZnVuY3Rpb24gd2l0aCB0aGUgYW1vdW50IG9mIG5ldyBpbWFnZXMgYXMgdGhlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlZ2lvbnMucmVzb3VyY2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgKi9cbiAgICAvKipcbiAgICAgKiBHZXQgaW5jb21pbmcgbGlua3MgZm9yIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgZ2V0SW5jb21pbmdMaW5rcyhvZmZzZXQ6IG51bWJlciwgY2FsbGJhY2s/OiAobnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgb2Zmc2V0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoaW5jb21pbmdSZXNvdXJjZXM6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24oaW5jb21pbmdSZXNvdXJjZXMub250b2xvZ3lJbmZvcm1hdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgaW5jb21pbmdSZXNvdXJjZXMgdG8gdGhpcy5zZXF1ZW5jZS5pbmNvbWluZ0xpbmtzXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdMaW5rcywgaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGNhbGxiYWNrIGlzIGdpdmVuLCBleGVjdXRlIGZ1bmN0aW9uIHdpdGggdGhlIGFtb3VudCBvZiBpbmNvbWluZyByZXNvdXJjZXMgYXMgdGhlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb3BlbkxpbmsoaWQ6IHN0cmluZykge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMucm91dGVDaGFuZ2VkLmVtaXQoaWQpO1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvcmVzb3VyY2UvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZCldKTtcblxuICAgIH1cblxuICAgIHJlZnJlc2hQcm9wZXJ0aWVzKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Zyb20gc3RpbGwtaW1hZ2UtY29tcG9uZW50OiAnLCBpbmRleCk7XG4gICAgICAgIHRoaXMuY3VycmVudFJlc291cmNlID0gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdGaWxlUmVwcmVzZW50YXRpb25zW2luZGV4XTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50UmVzb3VyY2UpO1xuICAgIH1cblxuXG5cblxuXG59XG4iXX0=