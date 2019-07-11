import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomingService, KnoraConstants, ResourceService } from '@knora/core';
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
            _this.loading = false;
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
    ResourceViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-resource-view',
                    template: "<div class=\"resource-view\">\n\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading && sequence.resources.length > 0\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list>\n\n            <!-- 1) show fileRepresentation first-->\n            <div *ngIf=\"resource?.fileRepresentationsToDisplay\">\n                <!-- show file representation -->\n                <div *ngIf=\"resource.fileRepresentationsToDisplay?.stillImage && resource.fileRepresentationsToDisplay?.stillImage.length > 0\"\n                     class=\"media\">\n                    <kui-still-image class=\"osd-viewer\" [images]=\"resource.fileRepresentationsToDisplay.stillImage\">\n                    </kui-still-image>\n                </div>\n                <!--\n                <div [ngSwitch]=\"resource.fileRepresentationsToDisplay[0].type\" class=\"media\">\n                    <div *ngSwitchCase=\"KnoraConstants.StillImageFileValue\">\n                        <!-- TODO: fix: this shows only the first image, not all stillImages from fileRepresentationsToDisplay --\n\n                        <!-- [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\" --\n                    </div>\n\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasMovingImageFileValue\" class=\"media\">\n                        <kui-moving-image></kui-moving-image>\n                    </div>\n\n                    <div *ngSwitchDefault>\n                        <p>This media type {{resource.fileRepresentationsToDisplay[0].type}} is not yet implemented</p>\n                    </div>\n                </div>\n                -->\n\n            </div>\n\n            <!--\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n                    <!-- <p>{{prop.key}}</p> -->\n\n            <!-- <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\"> -->\n            <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n\n\n            <!-- </div> -->\n\n\n            <!-- TODO: switch through all other media type -->\n            <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n\n                    <kui-collection></kui-collection>\n\n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n            <!--\n                    <div *ngSwitchDefault>\n                        <p>This media type ({{prop.key}}) is not yet implemented</p>\n                    </div>\n                </div>\n            </div>\n        -->\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <div class=\"data\">\n                <kui-properties-view [properties]=\"resource.properties\" [guiOrder]=\"guiOrder\"\n                                     [ontologyInfo]=\"sequence.ontologyInformation\"\n                                     [incomingLinks]=\"resource.incomingLinks\">\n                </kui-properties-view>\n            </div>\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.kui-link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:720px;margin:0 auto}.resource-view .resource .media{width:720px;height:calc(720px / (4 / 3))}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:'-    '}.property .property-value-item li.lastItem{margin-bottom:12px}.app-link:hover{background-color:#f1f1f1}"]
                }] }
    ];
    /** @nocollapse */
    ResourceViewComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router },
        { type: ResourceService },
        { type: IncomingService }
    ]; };
    ResourceViewComponent.propDecorators = {
        iri: [{ type: Input }]
    };
    return ResourceViewComponent;
}());
export { ResourceViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQTZCLGVBQWUsRUFBRSxjQUFjLEVBQThDLGVBQWUsRUFBcUIsTUFBTSxhQUFhLENBQUM7QUFLekssSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDO0lBdUJJLCtCQUF1QixNQUFzQixFQUMvQixPQUFlLEVBQ2YsZ0JBQWlDLEVBQ2pDLGdCQUFpQztRQUh4QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUMvQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBUi9DLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBV2hDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksOEJBQThCO0lBQ2xDLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUF0QixpQkE4Q0M7UUE3Q0csSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDL0QsVUFBQyxNQUF5QjtZQUV0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Q0FBQyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQzs7Z0JBelJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3Qiw4aUlBQTZDOztpQkFFaEQ7Ozs7Z0JBWlEsY0FBYztnQkFBRSxNQUFNO2dCQUNrRixlQUFlO2dCQUE1RixlQUFlOzs7c0JBaUI5QyxLQUFLOztJQXFSViw0QkFBQztDQUFBLEFBL1JELElBK1JDO1NBMVJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgR3VpT3JkZXIsIEluY29taW5nU2VydmljZSwgS25vcmFDb25zdGFudHMsIE9udG9sb2d5SW5mb3JtYXRpb24sIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSwgUmVzb3VyY2VTZXJ2aWNlLCBSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLy8gaW1wb3J0IHsgUmVnaW9uLCBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gfSBmcm9tICcuLi8uLi9yZXNvdXJjZSc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1yZXNvdXJjZS12aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmVzb3VyY2Utdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVzb3VyY2Utdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbaXJpXSBSZXNvdXJjZSBpcmlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpcmk/OiBzdHJpbmc7XG5cbiAgICBzZXF1ZW5jZTogUmVzb3VyY2VzU2VxdWVuY2U7XG5cbiAgICBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb247XG4gICAgZ3VpT3JkZXI6IEd1aU9yZGVyW107XG4gICAgbG9hZGluZzogYm9vbGVhbjtcbiAgICBlcnJvcjogYW55O1xuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgICAvLyBkb2VzIHRoZSByZXNvdXJjZSBoYXMgYSBmaWxlIHJlcHJlc2VudGF0aW9uIChtZWRpYSBmaWxlKT9cbiAgICBmaWxlUmVwcmVzZW50YXRpb246IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvciAocHJvdGVjdGVkIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByb3RlY3RlZCBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByb3RlY3RlZCBfcmVzb3VyY2VTZXJ2aWNlOiBSZXNvdXJjZVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBfaW5jb21pbmdTZXJ2aWNlOiBJbmNvbWluZ1NlcnZpY2VcbiAgICApIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyB0aGlzLmdldFJlc291cmNlKHRoaXMuaXJpKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5nZXRSZXNvdXJjZSh0aGlzLmlyaSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgcmVhZCByZXNvdXJjZSBzZXF1ZW5jZSB3aXRoIG9udG9sb2d5IGluZm9ybWF0aW9uIGFuZCBpbmNvbWluZyByZXNvdXJjZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgUmVzb3VyY2UgaXJpXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2UoaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZVNlcnZpY2UuZ2V0UmVzb3VyY2UoZGVjb2RlVVJJQ29tcG9uZW50KGlkKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3VsdDogUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRSZXNvdXJjZSByZXN1bHQnLCByZXN1bHQpO1xuXG5cbiAgICAgICAgICAgICAgICAvLyByZXN1bHQgd2l0aCByZXNvdXJjZXMgb25seSBhbmQgV0lUSE9VVCBpbmNvbWluZyBzdHVmZlxuICAgICAgICAgICAgICAgIHRoaXMuc2VxdWVuY2UgPSByZXN1bHQ7XG5cblxuICAgICAgICAgICAgICAgIC8vIHRoaXMub250b2xvZ3lJbmZvID0gcmVzdWx0Lm9udG9sb2d5SW5mb3JtYXRpb247XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zdCByZXNUeXBlID0gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0udHlwZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ3VpT3JkZXIgPSByZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbi5nZXRSZXNvdXJjZUNsYXNzZXMoKVt0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS50eXBlXS5ndWlPcmRlcjtcblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY29sbGVjdCBhbGwgZmlsZXJlcHJlc2VudGF0aW9ucyB0byBkaXNwbGF5IGluY2x1ZGluZyBhbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIC8vIC0tPiBmb3IgdGhlIGZpcnN0IHJlc291cmNlIG9ubHkuLi5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5maWxlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gdGhpcy5jb2xsZWN0RmlsZVJlcHJlc2VudGF0aW9uc0FuZEZpbGVBbm5vdGF0aW9ucyh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IGltYWdlcyBhbmQgcmVnaW9uc1xuICAgICAgICAgICAgICAgIC8vIC0tPiBmb3IgdGhlIGZpcnN0IHJlc291cmNlIG9ubHkuLi5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLmNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGluY29taW5nIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEluY29taW5nUmVzb3VyY2VzKCk7XG5cblxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZmlsZVJlcHJlc2VudGF0aW9uID0gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0ucHJvcGVydGllcy5pbmRleE9mKEtub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWUpID4gLTE7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZmlsZVJlcHJlc2VudGF0aW9uJywgdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheVswXS5zdGlsbEltYWdlRmlsZVZhbHVlKTtcblxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdW50aWwgdGhlIHJlc291cmNlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VxdWVuY2UpO1xuXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3QgYWxsIGZpbGUgcmVwcmVzZW50YXRpb25zIChzdGlsbEltYWdlLCBtb3ZpbmdJbWFnZSwgYXVkaW8gZXRjLikgYW5kIGFubm90YXRpb25zIChyZWdpb24sIHNlcXVlbmNlIGV0Yy4pXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VcbiAgICAgKi9cbiAgICAvKlxuICAgIGNvbGxlY3RGaWxlUmVwcmVzZW50YXRpb25zQW5kRmlsZUFubm90YXRpb25zKHJlc291cmNlOiBSZXNvdXJjZSk6IEZpbGVSZXByZXNlbnRhdGlvbltdIHtcbiAgICAgICAgY29uc3QgZmlsZVJlcHJlc2VudGF0aW9uczogRmlsZVJlcHJlc2VudGF0aW9uW10gPSBbXTtcblxuICAgICAgICBpZiAocmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbGVSZXByZXNlbnRhdGlvbnM7XG4gICAgfVxuXG4gICAgLypcblxuICAgICAgICBjb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHJlc291cmNlOiBSZXNvdXJjZSk6IHZvaWQge1xuXG4gICAgICAgICAgICBjb25zdCBpbWdSZXByZXNlbnRhdGlvbnM6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdID0gW107XG5cbiAgICAgICAgICAgIGlmIChyZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgICAgIC8vIHJlc291cmNlIGhhcyBTdGlsbEltYWdlRmlsZVZhbHVlcyB0aGF0IGFyZSBkaXJlY3RseSBhdHRhY2hlZCB0byBpdCAocHJvcGVydGllcylcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSByZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5OiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaW1hZ2UuaXNQcmV2aWV3O1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiBpbWFnZXNUb0Rpc3BsYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25zOiBJbWFnZVJlZ2lvbltdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5jb21pbmdSZWdpb24gb2YgcmVzb3VyY2UuaW5jb21pbmdBbm5vdGF0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb24gPSBuZXcgSW1hZ2VSZWdpb24oaW5jb21pbmdSZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpb25zLnB1c2gocmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZSA9IG5ldyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24oaW1nLCByZWdpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nUmVwcmVzZW50YXRpb25zLnB1c2goc3RpbGxJbWFnZSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNvdXJjZS5pbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGFyZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2UgKGluY29taW5nKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHN0aWxsSW1hZ2VSZXM6IFJlYWRSZXNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZVZhbHVlcyA9IHN0aWxsSW1hZ2VSZXMucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlc1RvRGlzcGxheSA9IGZpbGVWYWx1ZXMuZmlsdGVyKChpbWFnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaW1hZ2UuaXNQcmV2aWV3O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGltYWdlc1RvRGlzcGxheTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBjdXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zZm9ybSBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdW10gdG8gUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldi5jb25jYXQoY3Vycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiByZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25zOiBJbWFnZVJlZ2lvbltdID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5jb21pbmdSZWdpb24gb2YgcmVzb3VyY2UuaW5jb21pbmdSZWdpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbiA9IG5ldyBJbWFnZVJlZ2lvbihpbmNvbWluZ1JlZ2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpb25zLnB1c2gocmVnaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZSA9IG5ldyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24oaW1nLCByZWdpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nUmVwcmVzZW50YXRpb25zLnB1c2goc3RpbGxJbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc291cmNlLnN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSBpbWdSZXByZXNlbnRhdGlvbnM7XG5cbiAgICAgICAgfVxuICAgICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIHJlc291cmNlczogaW5jb21pbmcgbGlua3MsIGluY29taW5nIHJlZ2lvbnMsIGluY29taW5nIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKi9cbiAgICByZXF1ZXN0SW5jb21pbmdSZXNvdXJjZXMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhpcy5zZXF1ZW5jZSBoYXMgYmVlbiBpbml0aWFsaXplZCBjb3JyZWN0bHlcbiAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVxdWVzdCBpbmNvbWluZyByZWdpb25zXG4gICAgICAgIGlmICh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgLy8gdGhlIHJlc291cmNlIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uLCBjaGVjayBpZiB0aGVyZSBhcmUgcmVnaW9ucyBwb2ludGluZyB0byBpdFxuXG4gICAgICAgICAgICAvLyB0aGlzLmdldEluY29taW5nUmVnaW9ucygwKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyByZXNvdXJjZSBpcyBub3QgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2VcblxuICAgICAgICAgICAgLy8gdGhpcyBnZXRzIHRoZSBmaXJzdCBwYWdlIG9mIGluY29taW5nIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNcbiAgICAgICAgICAgIC8vIG1vcmUgcGFnZXMgbWF5IGJlIHJlcXVlc3RlZCBieSBbW3RoaXMudmlld2VyXV0uXG4gICAgICAgICAgICAvLyBUT0RPOiBmb3Igbm93LCB3ZSBiZWdpbiB3aXRoIG9mZnNldCAwLiBUaGlzIG1heSBoYXZlIHRvIGJlIGNoYW5nZWQgbGF0ZXIgKGJlZ2lubmluZyBzb21ld2hlcmUgaW4gYSBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBjdXJyZW50IHJlc291cmNlXG4gICAgICAgIHRoaXMuZ2V0SW5jb21pbmdMaW5rcygwKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIHJlZ2lvbnMgZm9yIHRoZSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKlxuICAgIGdldEluY29taW5nUmVnaW9ucyhvZmZzZXQ6IG51bWJlciwgY2FsbGJhY2s/OiAobnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0SW5jb21pbmdSZWdpb25zKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmlkLCBvZmZzZXQpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZWdpb25zOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgb250b2xvZ3kgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLm9udG9sb2d5SW5mby51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKHJlZ2lvbnMub250b2xvZ3lJbmZvcm1hdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgb2YgcmVnaW9ucy5yZXNvdXJjZXMgdG8gcmVzb3VyY2UuaW5jb21pbmdcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pbmNvbWluZ1JlZ2lvbnMsIHJlZ2lvbnMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgIC8vIHByZXBhcmUgcmVnaW9ucyB0byBiZSBkaXNwbGF5ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0pO1xuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IG9zZFZpZXdlclxuICAgICAgICAgICAgICAgIC8qIGlmICh0aGlzLm9zZFZpZXdlcikge1xuICAgICAgICAgICAgICAgICAgdGhpcy5vc2RWaWV3ZXIudXBkYXRlUmVnaW9ucygpO1xuICAgICAgICAgICAgICAgIH0gKlxuXG4gICAgICAgICAgICAgICAgLy8gaWYgY2FsbGJhY2sgaXMgZ2l2ZW4sIGV4ZWN1dGUgZnVuY3Rpb24gd2l0aCB0aGUgYW1vdW50IG9mIG5ldyBpbWFnZXMgYXMgdGhlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlZ2lvbnMucmVzb3VyY2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgKi9cbiAgICAvKipcbiAgICAgKiBHZXQgaW5jb21pbmcgbGlua3MgZm9yIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgZ2V0SW5jb21pbmdMaW5rcyhvZmZzZXQ6IG51bWJlciwgY2FsbGJhY2s/OiAobnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgb2Zmc2V0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoaW5jb21pbmdSZXNvdXJjZXM6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24oaW5jb21pbmdSZXNvdXJjZXMub250b2xvZ3lJbmZvcm1hdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgaW5jb21pbmdSZXNvdXJjZXMgdG8gdGhpcy5zZXF1ZW5jZS5pbmNvbWluZ0xpbmtzXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdMaW5rcywgaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGNhbGxiYWNrIGlzIGdpdmVuLCBleGVjdXRlIGZ1bmN0aW9uIHdpdGggdGhlIGFtb3VudCBvZiBpbmNvbWluZyByZXNvdXJjZXMgYXMgdGhlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cblxuXG5cbn1cbiJdfQ==