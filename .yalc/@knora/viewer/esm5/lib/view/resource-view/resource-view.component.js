import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomingService, KnoraConstants, ResourceService } from '@knora/core';
import { StillImageComponent } from '../../resource';
var jsonld = require('jsonld');
var ResourceViewComponent = /** @class */ (function () {
    function ResourceViewComponent(_route, _router, _resourceService, _incomingService) {
        this._route = _route;
        this._router = _router;
        this._resourceService = _resourceService;
        this._incomingService = _incomingService;
        this.KnoraConstants = KnoraConstants;
    }
    ResourceViewComponent.prototype.ngOnInit = function () {
        // this.getResource(this.iri);
    };
    ResourceViewComponent.prototype.ngOnChanges = function () {
        this.getResource(this.iri);
        // console.log(this.kuiStillImage.k;
    };
    /**
     * Get a read resource sequence with ontology information and incoming resources.
     *
     * @param {string} id Resource iri
     */
    ResourceViewComponent.prototype.getResource = function (id) {
        var _this = this;
        this.loading = true;
        this._resourceService.getResource(decodeURIComponent(id)).subscribe(function (result) {
            console.log('getResource result', result);
            // result with resources only and WITHOUT incoming stuff
            _this.sequence = result;
            // this.ontologyInfo = result.ontologyInformation;
            // const resType = this.sequence.resources[0].type;
            _this.guiOrder = result.ontologyInformation.getResourceClasses()[_this.sequence.resources[0].type].guiOrder;
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
            setTimeout(function () {
                // console.log(this.sequence);
                _this.currentResource = _this.sequence.resources[0].incomingFileRepresentations[0];
                console.log('currentResource', _this.sequence.resources[0].incomingFileRepresentations[0]);
                _this.loading = false;
            }, 1000);
        }, function (error) {
            console.error(error);
        });
    };
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
    ResourceViewComponent.prototype.requestIncomingResources = function () {
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
    };
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
    ResourceViewComponent.prototype.getIncomingLinks = function (offset, callback) {
        var _this = this;
        this.loading = true;
        this._incomingService.getIncomingLinksForResource(this.sequence.resources[0].id, offset).subscribe(function (incomingResources) {
            // update ontology information
            _this.ontologyInfo.updateOntologyInformation(incomingResources.ontologyInformation);
            // Append elements incomingResources to this.sequence.incomingLinks
            Array.prototype.push.apply(_this.sequence.resources[0].incomingLinks, incomingResources.resources);
            // if callback is given, execute function with the amount of incoming resources as the parameter
            if (callback !== undefined) {
                callback(incomingResources.resources.length);
            }
            _this.loading = false;
        }, function (error) {
            console.error(error);
            _this.loading = false;
        });
    };
    ResourceViewComponent.prototype.openLink = function (id) {
        this.loading = true;
        // this.routeChanged.emit(id);
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    };
    ResourceViewComponent.prototype.refreshProperties = function (index) {
        console.log('from still-image-component: ', index);
        this.currentResource = this.sequence.resources[0].incomingFileRepresentations[index];
        console.log(this.currentResource);
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
    return ResourceViewComponent;
}());
export { ResourceViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBNkIsZUFBZSxFQUFFLGNBQWMsRUFBNEQsZUFBZSxFQUFxQixNQUFNLGFBQWEsQ0FBQztBQUN2TCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtyRCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFPakM7SUF1QkksK0JBQXVCLE1BQXNCLEVBQy9CLE9BQWUsRUFDZixnQkFBaUMsRUFDakMsZ0JBQWlDO1FBSHhCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFYL0MsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFjaEMsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSw4QkFBOEI7SUFDbEMsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQixvQ0FBb0M7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUF0QixpQkFpREM7UUFoREcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFD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UUFMakMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3Qiw4bExBQTZDOztTQUVoRCxDQUFDO2lEQXdCaUMsY0FBYztZQUN0QixNQUFNO1lBQ0csZUFBZTtZQUNmLGVBQWU7T0ExQnRDLHFCQUFxQixDQWtUakM7SUFBRCw0QkFBQztDQUFBLEFBbFRELElBa1RDO1NBbFRZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBHdWlPcmRlciwgSW5jb21pbmdTZXJ2aWNlLCBLbm9yYUNvbnN0YW50cywgT250b2xvZ3lJbmZvcm1hdGlvbiwgUmVhZFJlc291cmNlLCBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsIFJlc291cmNlU2VydmljZSwgUmVzb3VyY2VzU2VxdWVuY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBTdGlsbEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcmVzb3VyY2UnO1xuXG4vLyBpbXBvcnQgeyBSZWdpb24sIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uLy4uL3Jlc291cmNlJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXJlc291cmNlLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpcmldIFJlc291cmNlIGlyaVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGlyaT86IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2t1aVN0aWxsSW1hZ2UnLCB7IHN0YXRpYzogZmFsc2UgfSkga3VpU3RpbGxJbWFnZTogU3RpbGxJbWFnZUNvbXBvbmVudDtcblxuICAgIHNlcXVlbmNlOiBSZXNvdXJjZXNTZXF1ZW5jZTtcblxuICAgIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICBndWlPcmRlcjogR3VpT3JkZXJbXTtcbiAgICBsb2FkaW5nOiBib29sZWFuO1xuICAgIGVycm9yOiBhbnk7XG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcblxuICAgIC8vIGRvZXMgdGhlIHJlc291cmNlIGhhcyBhIGZpbGUgcmVwcmVzZW50YXRpb24gKG1lZGlhIGZpbGUpP1xuICAgIGZpbGVSZXByZXNlbnRhdGlvbjogYm9vbGVhbjtcblxuICAgIC8vIGN1cnJlbnQgcmVzb3VyY2UgaW4gY2FzZSBvZiBjb21wb3VuZCBvYmplY3RcbiAgICBjdXJyZW50UmVzb3VyY2U6IFJlYWRSZXNvdXJjZTtcblxuICAgIGNvbnN0cnVjdG9yIChwcm90ZWN0ZWQgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJvdGVjdGVkIF9yZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIF9pbmNvbWluZ1NlcnZpY2U6IEluY29taW5nU2VydmljZVxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMuZ2V0UmVzb3VyY2UodGhpcy5pcmkpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmdldFJlc291cmNlKHRoaXMuaXJpKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmt1aVN0aWxsSW1hZ2UuaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSByZWFkIHJlc291cmNlIHNlcXVlbmNlIHdpdGggb250b2xvZ3kgaW5mb3JtYXRpb24gYW5kIGluY29taW5nIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBSZXNvdXJjZSBpcmlcbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZShpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZShkZWNvZGVVUklDb21wb25lbnQoaWQpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0OiBSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFJlc291cmNlIHJlc3VsdCcsIHJlc3VsdCk7XG5cblxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdCB3aXRoIHJlc291cmNlcyBvbmx5IGFuZCBXSVRIT1VUIGluY29taW5nIHN0dWZmXG4gICAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZSA9IHJlc3VsdDtcblxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbnRvbG9neUluZm8gPSByZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbjtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlc1R5cGUgPSB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS50eXBlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ndWlPcmRlciA9IHJlc3VsdC5vbnRvbG9neUluZm9ybWF0aW9uLmdldFJlc291cmNlQ2xhc3NlcygpW3RoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnR5cGVdLmd1aU9yZGVyO1xuXG5cblxuXG4gICAgICAgICAgICAgICAgLy8gY29sbGVjdCBhbGwgZmlsZXJlcHJlc2VudGF0aW9ucyB0byBkaXNwbGF5IGluY2x1ZGluZyBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIC8vIC0tPiBmb3IgdGhlIGZpcnN0IHJlc291cmNlIG9ubHkuLi5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gdGhpcy5jb2xsZWN0RmlsZVJlcHJlc2VudGF0aW9uc0FuZEZpbGVBbm5vdGF0aW9ucyh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IGltYWdlcyBhbmQgcmVnaW9uc1xuICAgICAgICAgICAgICAgIC8vIC0tPiBmb3IgdGhlIGZpcnN0IHJlc291cmNlIG9ubHkuLi5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLmNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEluY29taW5nUmVzb3VyY2VzKCk7XG5cblxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlsZVJlcHJlc2VudGF0aW9uID0gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0ucHJvcGVydGllcy5pbmRleE9mKEtub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWUpID4gLTE7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZmlsZVJlcHJlc2VudGF0aW9uJywgdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheVswXS5zdGlsbEltYWdlRmlsZVZhbHVlKTtcblxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdW50aWwgdGhlIHJlc291cmNlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VxdWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXNvdXJjZSA9IHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nRmlsZVJlcHJlc2VudGF0aW9uc1swXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1cnJlbnRSZXNvdXJjZScsIHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nRmlsZVJlcHJlc2VudGF0aW9uc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGFsbCBmaWxlIHJlcHJlc2VudGF0aW9ucyAoc3RpbGxJbWFnZSwgbW92aW5nSW1hZ2UsIGF1ZGlvIGV0Yy4pIGFuZCBhbm5vdGF0aW9ucyAocmVnaW9uLCBzZXF1ZW5jZSBldGMuKVxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc291cmNlXG4gICAgICovXG4gICAgLypcbiAgICBjb2xsZWN0RmlsZVJlcHJlc2VudGF0aW9uc0FuZEZpbGVBbm5vdGF0aW9ucyhyZXNvdXJjZTogUmVzb3VyY2UpOiBGaWxlUmVwcmVzZW50YXRpb25bXSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZXByZXNlbnRhdGlvbnM6IEZpbGVSZXByZXNlbnRhdGlvbltdID0gW107XG5cbiAgICAgICAgaWYgKHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgZmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaWxlUmVwcmVzZW50YXRpb25zO1xuICAgIH1cblxuICAgIC8qXG5cbiAgICAgICAgY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiB2b2lkIHtcblxuICAgICAgICAgICAgY29uc3QgaW1nUmVwcmVzZW50YXRpb25zOiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAvLyByZXNvdXJjZSBoYXMgU3RpbGxJbWFnZUZpbGVWYWx1ZXMgdGhhdCBhcmUgZGlyZWN0bHkgYXR0YWNoZWQgdG8gaXQgKHByb3BlcnRpZXMpXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlc1RvRGlzcGxheTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IGZpbGVWYWx1ZXMuZmlsdGVyKChpbWFnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWltYWdlLmlzUHJldmlldztcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWcgb2YgaW1hZ2VzVG9EaXNwbGF5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogSW1hZ2VSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIHJlc291cmNlLmluY29taW5nQW5ub3RhdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uID0gbmV3IEltYWdlUmVnaW9uKGluY29taW5nUmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9ucy5wdXNoKHJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2UgPSBuZXcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uKGltZywgcmVnaW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGltZ1JlcHJlc2VudGF0aW9ucy5wdXNoKHN0aWxsSW1hZ2UpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBhcmUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlIChpbmNvbWluZylcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRTdGlsbEltYWdlRmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHJlc291cmNlLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucy5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChzdGlsbEltYWdlUmVzOiBSZWFkUmVzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXMgPSBzdGlsbEltYWdlUmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZXNUb0Rpc3BsYXkgPSBmaWxlVmFsdWVzLmZpbHRlcigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWltYWdlLmlzUHJldmlldztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbWFnZXNUb0Rpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3Vycikge1xuICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm0gUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXVtdIHRvIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW11cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXYuY29uY2F0KGN1cnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbWcgb2YgcmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogSW1hZ2VSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIHJlc291cmNlLmluY29taW5nUmVnaW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb24gPSBuZXcgSW1hZ2VSZWdpb24oaW5jb21pbmdSZWdpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaW9ucy5wdXNoKHJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0aWxsSW1hZ2UgPSBuZXcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uKGltZywgcmVnaW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGltZ1JlcHJlc2VudGF0aW9ucy5wdXNoKHN0aWxsSW1hZ2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvdXJjZS5zdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gaW1nUmVwcmVzZW50YXRpb25zO1xuXG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEdldCBpbmNvbWluZyByZXNvdXJjZXM6IGluY29taW5nIGxpbmtzLCBpbmNvbWluZyByZWdpb25zLCBpbmNvbWluZyBzdGlsbCBpbWFnZSByZXByZXNlbnRhdGlvbnMuXG4gICAgICovXG4gICAgcmVxdWVzdEluY29taW5nUmVzb3VyY2VzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoaXMuc2VxdWVuY2UgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgY29ycmVjdGx5XG4gICAgICAgIGlmICh0aGlzLnNlcXVlbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlcXVlc3QgaW5jb21pbmcgcmVnaW9uc1xuICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0ucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSkge1xuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgIC8vIHRoZSByZXNvdXJjZSBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiwgY2hlY2sgaWYgdGhlcmUgYXJlIHJlZ2lvbnMgcG9pbnRpbmcgdG8gaXRcblxuICAgICAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ1JlZ2lvbnMoMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgcmVzb3VyY2UgaXMgbm90IGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlXG5cbiAgICAgICAgICAgIC8vIHRoaXMgZ2V0cyB0aGUgZmlyc3QgcGFnZSBvZiBpbmNvbWluZyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAvLyBtb3JlIHBhZ2VzIG1heSBiZSByZXF1ZXN0ZWQgYnkgW1t0aGlzLnZpZXdlcl1dLlxuICAgICAgICAgICAgLy8gVE9ETzogZm9yIG5vdywgd2UgYmVnaW4gd2l0aCBvZmZzZXQgMC4gVGhpcyBtYXkgaGF2ZSB0byBiZSBjaGFuZ2VkIGxhdGVyIChiZWdpbm5pbmcgc29tZXdoZXJlIGluIGEgY29sbGVjdGlvbilcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGluY29taW5nIGxpbmtzIGZvciB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICB0aGlzLmdldEluY29taW5nTGlua3MoMCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBpbmNvbWluZyByZWdpb25zIGZvciB0aGUgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICpcbiAgICBnZXRJbmNvbWluZ1JlZ2lvbnMob2Zmc2V0OiBudW1iZXIsIGNhbGxiYWNrPzogKG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nUmVnaW9ucyh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgb2Zmc2V0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVnaW9uczogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihyZWdpb25zLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIG9mIHJlZ2lvbnMucmVzb3VyY2VzIHRvIHJlc291cmNlLmluY29taW5nXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdSZWdpb25zLCByZWdpb25zLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIHJlZ2lvbnMgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBvc2RWaWV3ZXJcbiAgICAgICAgICAgICAgICAvKiBpZiAodGhpcy5vc2RWaWV3ZXIpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMub3NkVmlld2VyLnVwZGF0ZVJlZ2lvbnMoKTtcbiAgICAgICAgICAgICAgICB9ICpcblxuICAgICAgICAgICAgICAgIC8vIGlmIGNhbGxiYWNrIGlzIGdpdmVuLCBleGVjdXRlIGZ1bmN0aW9uIHdpdGggdGhlIGFtb3VudCBvZiBuZXcgaW1hZ2VzIGFzIHRoZSBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZWdpb25zLnJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgICovXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIGxpbmtzIGZvciBhIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9mZnNldFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqL1xuICAgIGdldEluY29taW5nTGlua3Mob2Zmc2V0OiBudW1iZXIsIGNhbGxiYWNrPzogKG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ0xpbmtzRm9yUmVzb3VyY2UodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaWQsIG9mZnNldCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGluY29taW5nUmVzb3VyY2VzOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mby51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKGluY29taW5nUmVzb3VyY2VzLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIGluY29taW5nUmVzb3VyY2VzIHRvIHRoaXMuc2VxdWVuY2UuaW5jb21pbmdMaW5rc1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nTGlua3MsIGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBjYWxsYmFjayBpcyBnaXZlbiwgZXhlY3V0ZSBmdW5jdGlvbiB3aXRoIHRoZSBhbW91bnQgb2YgaW5jb21pbmcgcmVzb3VyY2VzIGFzIHRoZSBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpbmNvbWluZ1Jlc291cmNlcy5yZXNvdXJjZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9wZW5MaW5rKGlkOiBzdHJpbmcpIHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLnJvdXRlQ2hhbmdlZC5lbWl0KGlkKTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3Jlc291cmNlLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpXSk7XG5cbiAgICB9XG5cbiAgICByZWZyZXNoUHJvcGVydGllcyhpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmcm9tIHN0aWxsLWltYWdlLWNvbXBvbmVudDogJywgaW5kZXgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRSZXNvdXJjZSA9IHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nRmlsZVJlcHJlc2VudGF0aW9uc1tpbmRleF07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFJlc291cmNlKTtcbiAgICB9XG5cblxuXG5cblxufVxuIl19