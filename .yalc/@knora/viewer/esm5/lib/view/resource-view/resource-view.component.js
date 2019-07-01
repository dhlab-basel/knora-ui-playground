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
                console.log('sequence', _this.sequence);
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
    ResourceViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-resource-view',
                    template: "<div class=\"resource-view\">\n\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list>\n\n            <!-- 1) show fileRepresentation first-->\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n                    <p>{{prop.key}}</p>\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\">\n                        <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n                        <kui-still-image *ngIf=\"prop.value.length > 0\" class=\"osd-viewer\"\n                                         [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\"\n                                         [images]=\"prop.value\">\n                        </kui-still-image>\n\n                    </div>\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasMovingImageFileValue\" class=\"media\">\n                        <kui-moving-image></kui-moving-image>\n                    </div>\n\n                    <!-- TODO: switch through all other media type -->\n                    <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n\n                    <kui-collection></kui-collection>\n\n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n\n                    <div *ngSwitchDefault>\n                        <p>This media type ({{prop.key}}) is not yet implemented</p>\n                    </div>\n                </div>\n            </div>\n\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <div class=\"data\">\n                <kui-properties-view [properties]=\"resource.properties\" [guiOrder]=\"guiOrder\"\n                                     [ontologyInfo]=\"sequence.ontologyInformation\"\n                                     [incomingLinks]=\"resource.incomingLinks\">\n                </kui-properties-view>\n            </div>\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:720px;margin:0 auto}.resource-view .resource .media{width:720px;height:calc(720px / (4 / 3))}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:'-    '}.property .property-value-item li.lastItem{margin-bottom:12px}.app-link:hover{background-color:#f1f1f1}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQTZCLGVBQWUsRUFBRSxjQUFjLEVBQThDLGVBQWUsRUFBcUIsTUFBTSxhQUFhLENBQUM7QUFLekssSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDO0lBdUJJLCtCQUF1QixNQUFzQixFQUMvQixPQUFlLEVBQ2YsZ0JBQWlDLEVBQ2pDLGdCQUFpQztRQUh4QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUMvQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBUi9DLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBV2hDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksOEJBQThCO0lBQ2xDLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUF0QixpQkE4Q0M7UUE3Q0csSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDL0QsVUFBQyxNQUF5QjtZQUV0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SyxDQUFDO1FBQ3pCLENBQUMsRUFDRCxVQUFDLEtBQVU7WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQzs7Z0JBelJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixxbUdBQTZDOztpQkFFaEQ7Ozs7Z0JBWlEsY0FBYztnQkFBRSxNQUFNO2dCQUNrRixlQUFlO2dCQUE1RixlQUFlOzs7c0JBaUI5QyxLQUFLOztJQXFSViw0QkFBQztDQUFBLEFBL1JELElBK1JDO1NBMVJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwaVNlcnZpY2VFcnJvciwgR3VpT3JkZXIsIEluY29taW5nU2VydmljZSwgS25vcmFDb25zdGFudHMsIE9udG9sb2d5SW5mb3JtYXRpb24sIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSwgUmVzb3VyY2VTZXJ2aWNlLCBSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLy8gaW1wb3J0IHsgSW1hZ2VSZWdpb24sIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uLy4uL3Jlc291cmNlJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXJlc291cmNlLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpcmldIFJlc291cmNlIGlyaVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGlyaT86IHN0cmluZztcblxuICAgIHNlcXVlbmNlOiBSZXNvdXJjZXNTZXF1ZW5jZTtcblxuICAgIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgICBndWlPcmRlcjogR3VpT3JkZXJbXTtcbiAgICBsb2FkaW5nOiBib29sZWFuO1xuICAgIGVycm9yOiBhbnk7XG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcblxuICAgIC8vIGRvZXMgdGhlIHJlc291cmNlIGhhcyBhIGZpbGUgcmVwcmVzZW50YXRpb24gKG1lZGlhIGZpbGUpP1xuICAgIGZpbGVSZXByZXNlbnRhdGlvbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yIChwcm90ZWN0ZWQgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJvdGVjdGVkIF9yZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIF9pbmNvbWluZ1NlcnZpY2U6IEluY29taW5nU2VydmljZVxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIHRoaXMuZ2V0UmVzb3VyY2UodGhpcy5pcmkpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmdldFJlc291cmNlKHRoaXMuaXJpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSByZWFkIHJlc291cmNlIHNlcXVlbmNlIHdpdGggb250b2xvZ3kgaW5mb3JtYXRpb24gYW5kIGluY29taW5nIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBSZXNvdXJjZSBpcmlcbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZShpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlU2VydmljZS5nZXRSZXNvdXJjZShkZWNvZGVVUklDb21wb25lbnQoaWQpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0OiBSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFJlc291cmNlIHJlc3VsdCcsIHJlc3VsdCk7XG5cblxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdCB3aXRoIHJlc291cmNlcyBvbmx5IGFuZCBXSVRIT1VUIGluY29taW5nIHN0dWZmXG4gICAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgIC8vIHRoaXMub250b2xvZ3lJbmZvID0gcmVzdWx0Lm9udG9sb2d5SW5mb3JtYXRpb247XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zdCByZXNUeXBlID0gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0udHlwZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ3VpT3JkZXIgPSByZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbi5nZXRSZXNvdXJjZUNsYXNzZXMoKVt0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS50eXBlXS5ndWlPcmRlcjtcblxuXG5cbiAgICAgICAgICAgICAgICAvLyBjb2xsZWN0IGFsbCBmaWxlcmVwcmVzZW50YXRpb25zIHRvIGRpc3BsYXkgaW5jbHVkaW5nIGFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgLy8gLS0+IGZvciB0aGUgZmlyc3QgcmVzb3VyY2Ugb25seS4uLlxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmZpbGVSZXByZXNlbnRhdGlvbnNUb0Rpc3BsYXkgPSB0aGlzLmNvbGxlY3RGaWxlUmVwcmVzZW50YXRpb25zQW5kRmlsZUFubm90YXRpb25zKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgaW1hZ2VzIGFuZCByZWdpb25zXG4gICAgICAgICAgICAgICAgLy8gLS0+IGZvciB0aGUgZmlyc3QgcmVzb3VyY2Ugb25seS4uLlxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgaW5jb21pbmcgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SW5jb21pbmdSZXNvdXJjZXMoKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5maWxlUmVwcmVzZW50YXRpb24gPSB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5wcm9wZXJ0aWVzLmluZGV4T2YoS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZSkgPiAtMTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdmaWxlUmVwcmVzZW50YXRpb24nLCB0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5zdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5WzBdLnN0aWxsSW1hZ2VGaWxlVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2FpdCB1bnRpbCB0aGUgcmVzb3VyY2UgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZXF1ZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXF1ZW5jZScsIHRoaXMuc2VxdWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdCBhbGwgZmlsZSByZXByZXNlbnRhdGlvbnMgKHN0aWxsSW1hZ2UsIG1vdmluZ0ltYWdlLCBhdWRpbyBldGMuKSBhbmQgYW5ub3RhdGlvbnMgKHJlZ2lvbiwgc2VxdWVuY2UgZXRjLilcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZVxuICAgICAqL1xuICAgIC8qXG4gICAgY29sbGVjdEZpbGVSZXByZXNlbnRhdGlvbnNBbmRGaWxlQW5ub3RhdGlvbnMocmVzb3VyY2U6IFJlc291cmNlKTogRmlsZVJlcHJlc2VudGF0aW9uW10ge1xuICAgICAgICBjb25zdCBmaWxlUmVwcmVzZW50YXRpb25zOiBGaWxlUmVwcmVzZW50YXRpb25bXSA9IFtdO1xuXG4gICAgICAgIGlmIChyZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSByZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmlsZVJlcHJlc2VudGF0aW9ucztcbiAgICB9XG5cbiAgICAvKlxuXG4gICAgICAgIGNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UocmVzb3VyY2U6IFJlc291cmNlKTogdm9pZCB7XG5cbiAgICAgICAgICAgIGNvbnN0IGltZ1JlcHJlc2VudGF0aW9uczogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10gPSBbXTtcblxuICAgICAgICAgICAgaWYgKHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAgICAgLy8gcmVzb3VyY2UgaGFzIFN0aWxsSW1hZ2VGaWxlVmFsdWVzIHRoYXQgYXJlIGRpcmVjdGx5IGF0dGFjaGVkIHRvIGl0IChwcm9wZXJ0aWVzKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVZhbHVlczogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXSA9IHJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZXNUb0Rpc3BsYXk6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSBmaWxlVmFsdWVzLmZpbHRlcigoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpbWFnZS5pc1ByZXZpZXc7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW1nIG9mIGltYWdlc1RvRGlzcGxheSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbmNvbWluZ1JlZ2lvbiBvZiByZXNvdXJjZS5pbmNvbWluZ0Fubm90YXRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbiA9IG5ldyBJbWFnZVJlZ2lvbihpbmNvbWluZ1JlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbnMucHVzaChyZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpbWdSZXByZXNlbnRhdGlvbnMucHVzaChzdGlsbEltYWdlKTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc291cmNlLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgYXJlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSAoaW5jb21pbmcpXG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSByZXNvdXJjZS5pbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMubWFwKFxuICAgICAgICAgICAgICAgICAgICAoc3RpbGxJbWFnZVJlczogUmVhZFJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzID0gc3RpbGxJbWFnZVJlcy5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdIGFzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW107XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5ID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpbWFnZS5pc1ByZXZpZXc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2VzVG9EaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW11bXSB0byBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2LmNvbmNhdChjdXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW1nIG9mIHJlYWRTdGlsbEltYWdlRmlsZVZhbHVlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbmNvbWluZ1JlZ2lvbiBvZiByZXNvdXJjZS5pbmNvbWluZ1JlZ2lvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uID0gbmV3IEltYWdlUmVnaW9uKGluY29taW5nUmVnaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbnMucHVzaChyZWdpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpbWdSZXByZXNlbnRhdGlvbnMucHVzaChzdGlsbEltYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb3VyY2Uuc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSA9IGltZ1JlcHJlc2VudGF0aW9ucztcblxuICAgICAgICB9XG4gICAgICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5jb21pbmcgcmVzb3VyY2VzOiBpbmNvbWluZyBsaW5rcywgaW5jb21pbmcgcmVnaW9ucywgaW5jb21pbmcgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zLlxuICAgICAqL1xuICAgIHJlcXVlc3RJbmNvbWluZ1Jlc291cmNlcygpOiB2b2lkIHtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGlzLnNlcXVlbmNlIGhhcyBiZWVuIGluaXRpYWxpemVkIGNvcnJlY3RseVxuICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXF1ZXN0IGluY29taW5nIHJlZ2lvbnNcbiAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0pIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHJlc291cmNlcyBpcyBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB1c2luZyB0aGUgb250b2xvZ3kgcmVzcG9uZGVyIChzdXBwb3J0IGZvciBzdWJjbGFzcyByZWxhdGlvbnMgcmVxdWlyZWQpXG4gICAgICAgICAgICAvLyB0aGUgcmVzb3VyY2UgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24sIGNoZWNrIGlmIHRoZXJlIGFyZSByZWdpb25zIHBvaW50aW5nIHRvIGl0XG5cbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW5jb21pbmdSZWdpb25zKDApO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzIHJlc291cmNlIGlzIG5vdCBhIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZVxuXG4gICAgICAgICAgICAvLyB0aGlzIGdldHMgdGhlIGZpcnN0IHBhZ2Ugb2YgaW5jb21pbmcgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1xuICAgICAgICAgICAgLy8gbW9yZSBwYWdlcyBtYXkgYmUgcmVxdWVzdGVkIGJ5IFtbdGhpcy52aWV3ZXJdXS5cbiAgICAgICAgICAgIC8vIFRPRE86IGZvciBub3csIHdlIGJlZ2luIHdpdGggb2Zmc2V0IDAuIFRoaXMgbWF5IGhhdmUgdG8gYmUgY2hhbmdlZCBsYXRlciAoYmVnaW5uaW5nIHNvbWV3aGVyZSBpbiBhIGNvbGxlY3Rpb24pXG4gICAgICAgICAgICAvLyB0aGlzLmdldEluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBpbmNvbWluZyBsaW5rcyBmb3IgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgdGhpcy5nZXRJbmNvbWluZ0xpbmtzKDApO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5jb21pbmcgcmVnaW9ucyBmb3IgdGhlIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9mZnNldFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqXG4gICAgZ2V0SW5jb21pbmdSZWdpb25zKG9mZnNldDogbnVtYmVyLCBjYWxsYmFjaz86IChudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2luY29taW5nU2VydmljZS5nZXRJbmNvbWluZ1JlZ2lvbnModGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaWQsIG9mZnNldCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlZ2lvbnM6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ocmVnaW9ucy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbGVtZW50cyBvZiByZWdpb25zLnJlc291cmNlcyB0byByZXNvdXJjZS5pbmNvbWluZ1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmluY29taW5nUmVnaW9ucywgcmVnaW9ucy5yZXNvdXJjZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJlcGFyZSByZWdpb25zIHRvIGJlIGRpc3BsYXllZFxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdEltYWdlc0FuZFJlZ2lvbnNGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnQgb3NkVmlld2VyXG4gICAgICAgICAgICAgICAgLyogaWYgKHRoaXMub3NkVmlld2VyKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9zZFZpZXdlci51cGRhdGVSZWdpb25zKCk7XG4gICAgICAgICAgICAgICAgfSAqXG5cbiAgICAgICAgICAgICAgICAvLyBpZiBjYWxsYmFjayBpcyBnaXZlbiwgZXhlY3V0ZSBmdW5jdGlvbiB3aXRoIHRoZSBhbW91bnQgb2YgbmV3IGltYWdlcyBhcyB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVnaW9ucy5yZXNvdXJjZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAqL1xuICAgIC8qKlxuICAgICAqIEdldCBpbmNvbWluZyBsaW5rcyBmb3IgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBnZXRJbmNvbWluZ0xpbmtzKG9mZnNldDogbnVtYmVyLCBjYWxsYmFjaz86IChudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9pbmNvbWluZ1NlcnZpY2UuZ2V0SW5jb21pbmdMaW5rc0ZvclJlc291cmNlKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLmlkLCBvZmZzZXQpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChpbmNvbWluZ1Jlc291cmNlczogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihpbmNvbWluZ1Jlc291cmNlcy5vbnRvbG9neUluZm9ybWF0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbGVtZW50cyBpbmNvbWluZ1Jlc291cmNlcyB0byB0aGlzLnNlcXVlbmNlLmluY29taW5nTGlua3NcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pbmNvbWluZ0xpbmtzLCBpbmNvbWluZ1Jlc291cmNlcy5yZXNvdXJjZXMpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgY2FsbGJhY2sgaXMgZ2l2ZW4sIGV4ZWN1dGUgZnVuY3Rpb24gd2l0aCB0aGUgYW1vdW50IG9mIGluY29taW5nIHJlc291cmNlcyBhcyB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxuXG5cblxufVxuIl19