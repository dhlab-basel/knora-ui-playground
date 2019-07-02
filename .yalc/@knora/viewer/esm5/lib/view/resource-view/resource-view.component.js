import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageRegion, IncomingService, KnoraConstants, ResourceService, StillImageRepresentation } from '@knora/core';
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
        this.getResource(this.iri);
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
        this._resourceService.getReadResource(decodeURIComponent(id)).subscribe(function (result) {
            _this.sequence = result;
            _this.ontologyInfo = result.ontologyInformation;
            var resType = _this.sequence.resources[0].type;
            _this.guiOrder = result.ontologyInformation.getResourceClasses()[resType].guiOrder;
            // collect images and regions
            _this.collectImagesAndRegionsForResource(_this.sequence.resources[0]);
            // get incoming resources
            _this.requestIncomingResources();
            // this.fileRepresentation = this.sequence.resources[0].properties.indexOf(KnoraConstants.hasStillImageFileValue) > -1;
            // console.log(this.fileRepresentation);
            // wait until the resource is ready
            setTimeout(function () {
                // console.log(this.sequence);
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
    ResourceViewComponent.prototype.collectFileRepresentationsAndFileAnnotations = function (resource) {
        var fileRepresentations = [];
    };
    ResourceViewComponent.prototype.collectImagesAndRegionsForResource = function (resource) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        var imgRepresentations = [];
        if (resource.properties[KnoraConstants.hasStillImageFileValue] !== undefined) {
            // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // resource has StillImageFileValues that are directly attached to it (properties)
            var fileValues = resource.properties[KnoraConstants.hasStillImageFileValue];
            var imagesToDisplay = fileValues.filter(function (image) {
                return !image.isPreview;
            });
            try {
                for (var imagesToDisplay_1 = tslib_1.__values(imagesToDisplay), imagesToDisplay_1_1 = imagesToDisplay_1.next(); !imagesToDisplay_1_1.done; imagesToDisplay_1_1 = imagesToDisplay_1.next()) {
                    var img = imagesToDisplay_1_1.value;
                    var regions = [];
                    try {
                        for (var _e = tslib_1.__values(resource.incomingRegions), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var incomingRegion = _f.value;
                            var region = new ImageRegion(incomingRegion);
                            regions.push(region);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
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
        }
        else if (resource.incomingStillImageRepresentations.length > 0) {
            // there are StillImageRepresentations pointing to this resource (incoming)
            var readStillImageFileValues = resource.incomingStillImageRepresentations.map(function (stillImageRes) {
                var fileValues = stillImageRes.properties[KnoraConstants.hasStillImageFileValue];
                // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                var imagesToDisplay = fileValues.filter(function (image) {
                    return !image.isPreview;
                });
                return imagesToDisplay;
            }).reduce(function (prev, curr) {
                // transform ReadStillImageFileValue[][] to ReadStillImageFileValue[]
                return prev.concat(curr);
            });
            try {
                for (var readStillImageFileValues_1 = tslib_1.__values(readStillImageFileValues), readStillImageFileValues_1_1 = readStillImageFileValues_1.next(); !readStillImageFileValues_1_1.done; readStillImageFileValues_1_1 = readStillImageFileValues_1.next()) {
                    var img = readStillImageFileValues_1_1.value;
                    var regions = [];
                    try {
                        for (var _g = tslib_1.__values(resource.incomingRegions), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var incomingRegion = _h.value;
                            var region = new ImageRegion(incomingRegion);
                            regions.push(region);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    var stillImage = new StillImageRepresentation(img, regions);
                    imgRepresentations.push(stillImage);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (readStillImageFileValues_1_1 && !readStillImageFileValues_1_1.done && (_c = readStillImageFileValues_1.return)) _c.call(readStillImageFileValues_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        resource.stillImageRepresentationsToDisplay = imgRepresentations;
    };
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
            this.getIncomingRegions(0);
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
     */
    ResourceViewComponent.prototype.getIncomingRegions = function (offset, callback) {
        var _this = this;
        this._incomingService.getIncomingRegions(this.sequence.resources[0].id, offset).subscribe(function (regions) {
            // update ontology information
            _this.ontologyInfo.updateOntologyInformation(regions.ontologyInformation);
            // Append elements of regions.resources to resource.incoming
            Array.prototype.push.apply(_this.sequence.resources[0].incomingRegions, regions.resources);
            // prepare regions to be displayed
            _this.collectImagesAndRegionsForResource(_this.sequence.resources[0]);
            // TODO: implement osdViewer
            /* if (this.osdViewer) {
              this.osdViewer.updateRegions();
            } */
            // if callback is given, execute function with the amount of new images as the parameter
            if (callback !== undefined) {
                callback(regions.resources.length);
            }
        }, function (error) {
            console.error(error);
            _this.loading = false;
        });
    };
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
    /**
     * Navigate to the incoming resource view.
     *
     * @param {string} id Incoming resource iri
     */
    ResourceViewComponent.prototype.openLink = function (id) {
        this.loading = true;
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ResourceViewComponent.prototype, "iri", void 0);
    ResourceViewComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-resource-view',
            template: "<div class=\"resource-view\">\n\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list>\n\n            <!-- 1) show fileRepresentation first-->\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\">\n                        <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n                        <kui-still-image *ngIf=\"resource.stillImageRepresentationsToDisplay.length > 0\" class=\"osd-viewer\" [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\" [images]=\"resource.stillImageRepresentationsToDisplay\">\n                        </kui-still-image>\n                    </div>\n\n                    <!-- TODO: switch through all other media type -->\n                    <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n  \n                    <kui-collection></kui-collection>\n  \n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n\n                    <div *ngSwitchDefault class=\"hidden\">\n                        <!--<p>This media type ({{prop.key}}) is not yet implemented</p>-->\n                    </div>\n                </div>\n            </div>\n\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <div class=\"data\">\n\n                <mat-tab-group class=\"full-width\">\n                    <mat-tab label=\"Metadata\">\n                        <mat-list>\n                            <div *ngFor=\"let prop of guiOrder; let last = last\" class=\"property\">\n                                <div *ngIf=\"resource.properties[prop?.property]\">\n                                    <!-- label of the property -->\n                                    <h3 mat-subheader class=\"property-label\">\n                                        {{sequence.ontologyInformation.getLabelForProperty(prop?.property)}}\n                                    </h3>\n                                    <!-- the value(s) of the property -->\n                                    <mat-list-item class=\"property-value-item\" *ngFor=\"let val of resource.properties[prop?.property]; let lastItem = last\">\n                                        <li [ngSwitch]=\"val.getClassName()\" [class.list]=\"resource.properties[prop?.property].length > 1\" [class.lastItem]=\"lastItem\">\n                                            <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\" [valueObject]=\"val\"></kui-text-value-as-string>\n                                            <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\" [valueObject]=\"val\"></kui-text-value-as-xml>\n                                            <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n                                            <kui-link-value class=\"app-link\" *ngSwitchCase=\"KnoraConstants.ReadLinkValue\" [valueObject]=\"val\" [ontologyInfo]=\"ontologyInfo\" (referredResourceClicked)=\"openLink(val.referredResourceIri)\">\n                                            </kui-link-value>\n                                            <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\" [valueObject]=\"val\"></kui-integer-value>\n                                            <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\" [valueObject]=\"val\"></kui-decimal-value>\n                                            <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\" [valueObject]=\"val\"></kui-geometry-value>\n                                            <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\" [valueObject]=\"val\"></kui-color-value>\n                                            <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\"></kui-uri-value>\n                                            <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\" [valueObject]=\"val\"></kui-boolean-value>\n                                            <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\" [valueObject]=\"val\"></kui-interval-value>\n                                            <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\"></kui-list-value>\n                                            <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\" [valueObject]=\"val\"></kui-textfile-value>\n                                            <span *ngSwitchDefault>Not supported {{val.getClassName()}}</span>\n                                        </li>\n                                    </mat-list-item>\n                                </div>\n                            </div>\n                        </mat-list>\n                    </mat-tab>\n\n                    <mat-tab label=\"Annotations\" *ngIf=\"resource.annotations?.length > 0\">\n\n                    </mat-tab>\n\n                    <mat-tab label=\"Links / Connections\" *ngIf=\"resource.incomingLinks?.length > 0\">\n                        <div>\n                            <mat-list *ngFor=\"let incoming of resource.incomingLinks\">\n                                <mat-list-item class=\"app-link link\" (click)=\"openLink(incoming.id)\">\n                                    <span>{{incoming.label}}</span>\n                                </mat-list-item>\n                            </mat-list>\n                        </div>\n                    </mat-tab>\n\n                </mat-tab-group>\n\n            </div>\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n\n\n<!-- OLD / first template\n  <mat-card>\n  \n  \n    <h2>metadata for resource {{ resource?.label}} ({{ resource?.id }})</h2>\n    <h3>type: {{ontologyInfo?.getLabelForResourceClass(resource?.type)}}</h3>\n  \n    <div *ngFor=\"let prop of resource?.properties | kuiKey\">\n        <mat-list>\n            <span>{{ontologyInfo?.getLabelForProperty(prop.key)}}</span>\n            <mat-list-item *ngFor=\"let val of prop.value\">\n                <span [ngSwitch]=\"val.getClassName()\">\n                    <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\"\n                                     [valueObject]=\"val\"></kui-color-value>\n                    <kui-text-value-as-html *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\" [valueObject]=\"val\"\n                                            [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"true\"></kui-text-value-as-html>\n                    <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\"\n                                              [valueObject]=\"val\"></kui-text-value-as-string>\n                    <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\"\n                                           [valueObject]=\"val\"></kui-text-value-as-xml>\n                    <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\"></kui-date-value>\n                    <kui-link-value *ngSwitchCase=\"KnoraConstants.ReadLinkValue\" [valueObject]=\"val\"\n                                    [ontologyInfo]=\"ontologyInfo\"></kui-link-value>\n                    <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\"\n                                       [valueObject]=\"val\"></kui-integer-value>\n                    <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\"\n                                       [valueObject]=\"val\"></kui-decimal-value>\n                    <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\"\n                                        [valueObject]=\"val\"></kui-geometry-value>\n                    <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\"></kui-uri-value>\n                    <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\"\n                                       [valueObject]=\"val\"></kui-boolean-value>\n                    <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\"\n                                        [valueObject]=\"val\"></kui-interval-value>\n                    <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\"></kui-list-value>\n                    <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\"\n                                        [valueObject]=\"val\"></kui-textfile-value>\n                    <span *ngSwitchDefault=\"\">Not supported {{val.getClassName()}}</span>\n                </span>\n            </mat-list-item>\n        </mat-list>\n    </div>\n  \n  </mat-card>\n  -->\n",
            styles: [".mat-form-field{width:320px}.fill-remaining-space{-webkit-box-flex:1;flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:720px;margin:0 auto}.resource-view .resource .media{width:720px;height:calc(720px / (4 / 3))}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:'-    '}.property .property-value-item li.lastItem{margin-bottom:12px}.app-link:hover{background-color:#f1f1f1}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router,
            ResourceService,
            IncomingService])
    ], ResourceViewComponent);
    return ResourceViewComponent;
}());
export { ResourceViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvdmlld2VyLyIsInNvdXJjZXMiOlsibGliL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQThDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUdILFdBQVcsRUFDWCxlQUFlLEVBQ2YsY0FBYyxFQUtkLGVBQWUsRUFDZix3QkFBd0IsRUFDM0IsTUFBTSxhQUFhLENBQUM7QUFLckIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBT2pDO0lBa0JJLCtCQUFzQixNQUFzQixFQUM5QixPQUFlLEVBQ2YsZ0JBQWlDLEVBQ2pDLGdCQUFpQztRQUh6QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUM5QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBUi9DLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBV2hDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDJDQUFXLEdBQVgsVUFBWSxFQUFVO1FBQXRCLGlCQWdDQztRQS9CRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFD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SSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5FLENBQUM7SUFuUVE7UUFBUixLQUFLLEVBQUU7O3NEQUFjO0lBTGIscUJBQXFCO1FBTGpDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsNDJUQUE2Qzs7U0FFaEQsQ0FBQztpREFtQmdDLGNBQWM7WUFDckIsTUFBTTtZQUNHLGVBQWU7WUFDZixlQUFlO09BckJ0QyxxQkFBcUIsQ0EwUWpDO0lBQUQsNEJBQUM7Q0FBQSxBQTFRRCxJQTBRQztTQTFRWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlRXJyb3IsXG4gICAgR3VpT3JkZXIsXG4gICAgSW1hZ2VSZWdpb24sXG4gICAgSW5jb21pbmdTZXJ2aWNlLFxuICAgIEtub3JhQ29uc3RhbnRzLFxuICAgIE9udG9sb2d5SW5mb3JtYXRpb24sXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSxcbiAgICBSZXNvdXJjZVNlcnZpY2UsXG4gICAgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLy8gaW1wb3J0IHsgSW1hZ2VSZWdpb24sIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uLy4uL3Jlc291cmNlJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXJlc291cmNlLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZXNvdXJjZS12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtpcmldIFJlc291cmNlIGlyaVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGlyaT86IHN0cmluZztcblxuICAgIHNlcXVlbmNlOiBSZWFkUmVzb3VyY2VzU2VxdWVuY2U7XG5cbiAgICBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb247XG4gICAgZ3VpT3JkZXI6IEd1aU9yZGVyW107XG4gICAgbG9hZGluZzogYm9vbGVhbjtcbiAgICBlcnJvcjogYW55O1xuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgICAvLyBkb2VzIHRoZSByZXNvdXJjZSBoYXMgYSBmaWxlIHJlcHJlc2VudGF0aW9uIChtZWRpYSBmaWxlKT9cbiAgICBmaWxlUmVwcmVzZW50YXRpb246IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3JvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJvdGVjdGVkIF9yZXNvdXJjZVNlcnZpY2U6IFJlc291cmNlU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIF9pbmNvbWluZ1NlcnZpY2U6IEluY29taW5nU2VydmljZVxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0UmVzb3VyY2UodGhpcy5pcmkpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmdldFJlc291cmNlKHRoaXMuaXJpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSByZWFkIHJlc291cmNlIHNlcXVlbmNlIHdpdGggb250b2xvZ3kgaW5mb3JtYXRpb24gYW5kIGluY29taW5nIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBSZXNvdXJjZSBpcmlcbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZShpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Jlc291cmNlU2VydmljZS5nZXRSZWFkUmVzb3VyY2UoZGVjb2RlVVJJQ29tcG9uZW50KGlkKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3VsdDogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvID0gcmVzdWx0Lm9udG9sb2d5SW5mb3JtYXRpb247XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNUeXBlID0gdGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0udHlwZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ3VpT3JkZXIgPSByZXN1bHQub250b2xvZ3lJbmZvcm1hdGlvbi5nZXRSZXNvdXJjZUNsYXNzZXMoKVtyZXNUeXBlXS5ndWlPcmRlcjtcblxuICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgaW1hZ2VzIGFuZCByZWdpb25zXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCBpbmNvbWluZyByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RJbmNvbWluZ1Jlc291cmNlcygpO1xuXG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLmZpbGVSZXByZXNlbnRhdGlvbiA9IHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdLnByb3BlcnRpZXMuaW5kZXhPZihLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZmlsZVJlcHJlc2VudGF0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdW50aWwgdGhlIHJlc291cmNlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VxdWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3I6IEFwaVNlcnZpY2VFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdCBhbGwgZmlsZSByZXByZXNlbnRhdGlvbnMgKHN0aWxsSW1hZ2UsIG1vdmluZ0ltYWdlLCBhdWRpbyBldGMuKSBhbmQgYW5ub3RhdGlvbnMgKHJlZ2lvbiwgc2VxdWVuY2UgZXRjLilcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZVxuICAgICAqL1xuICAgIGNvbGxlY3RGaWxlUmVwcmVzZW50YXRpb25zQW5kRmlsZUFubm90YXRpb25zKHJlc291cmNlOiBSZWFkUmVzb3VyY2UpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmlsZVJlcHJlc2VudGF0aW9uczogYW55W10gPSBbXTtcbiAgICB9XG5cblxuICAgIGNvbGxlY3RJbWFnZXNBbmRSZWdpb25zRm9yUmVzb3VyY2UocmVzb3VyY2U6IFJlYWRSZXNvdXJjZSk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGltZ1JlcHJlc2VudGF0aW9uczogU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uW10gPSBbXTtcblxuICAgICAgICBpZiAocmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgLy8gcmVzb3VyY2UgaGFzIFN0aWxsSW1hZ2VGaWxlVmFsdWVzIHRoYXQgYXJlIGRpcmVjdGx5IGF0dGFjaGVkIHRvIGl0IChwcm9wZXJ0aWVzKVxuXG4gICAgICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UucHJvcGVydGllc1tLbm9yYUNvbnN0YW50cy5oYXNTdGlsbEltYWdlRmlsZVZhbHVlXSBhcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5OiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpbWFnZS5pc1ByZXZpZXc7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGltZyBvZiBpbWFnZXNUb0Rpc3BsYXkpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluY29taW5nUmVnaW9uIG9mIHJlc291cmNlLmluY29taW5nUmVnaW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbiA9IG5ldyBJbWFnZVJlZ2lvbihpbmNvbWluZ1JlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVnaW9ucy5wdXNoKHJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgIGltZ1JlcHJlc2VudGF0aW9ucy5wdXNoKHN0aWxsSW1hZ2UpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9IGVsc2UgaWYgKHJlc291cmNlLmluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyB0aGVyZSBhcmUgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlIChpbmNvbWluZylcblxuICAgICAgICAgICAgY29uc3QgcmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gcmVzb3VyY2UuaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zLm1hcChcbiAgICAgICAgICAgICAgICAoc3RpbGxJbWFnZVJlczogUmVhZFJlc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVWYWx1ZXMgPSBzdGlsbEltYWdlUmVzLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzU3RpbGxJbWFnZUZpbGVWYWx1ZV0gYXMgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVbXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgcmVzb3VyY2VzIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHVzaW5nIHRoZSBvbnRvbG9neSByZXNwb25kZXIgKHN1cHBvcnQgZm9yIHN1YmNsYXNzIHJlbGF0aW9ucyByZXF1aXJlZClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VzVG9EaXNwbGF5ID0gZmlsZVZhbHVlcy5maWx0ZXIoKGltYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWltYWdlLmlzUHJldmlldztcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1hZ2VzVG9EaXNwbGF5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBjdXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW11bXSB0byBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXYuY29uY2F0KGN1cnIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaW1nIG9mIHJlYWRTdGlsbEltYWdlRmlsZVZhbHVlcykge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uczogSW1hZ2VSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaW5jb21pbmdSZWdpb24gb2YgcmVzb3VyY2UuaW5jb21pbmdSZWdpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uID0gbmV3IEltYWdlUmVnaW9uKGluY29taW5nUmVnaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9ucy5wdXNoKHJlZ2lvbik7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlID0gbmV3IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbihpbWcsIHJlZ2lvbnMpO1xuICAgICAgICAgICAgICAgIGltZ1JlcHJlc2VudGF0aW9ucy5wdXNoKHN0aWxsSW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXNvdXJjZS5zdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5ID0gaW1nUmVwcmVzZW50YXRpb25zO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIHJlc291cmNlczogaW5jb21pbmcgbGlua3MsIGluY29taW5nIHJlZ2lvbnMsIGluY29taW5nIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKi9cbiAgICByZXF1ZXN0SW5jb21pbmdSZXNvdXJjZXMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhpcy5zZXF1ZW5jZSBoYXMgYmVlbiBpbml0aWFsaXplZCBjb3JyZWN0bHlcbiAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVxdWVzdCBpbmNvbWluZyByZWdpb25zXG4gICAgICAgIGlmICh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc1N0aWxsSW1hZ2VGaWxlVmFsdWVdKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiByZXNvdXJjZXMgaXMgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24gdXNpbmcgdGhlIG9udG9sb2d5IHJlc3BvbmRlciAoc3VwcG9ydCBmb3Igc3ViY2xhc3MgcmVsYXRpb25zIHJlcXVpcmVkKVxuICAgICAgICAgICAgLy8gdGhlIHJlc291cmNlIGlzIGEgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uLCBjaGVjayBpZiB0aGVyZSBhcmUgcmVnaW9ucyBwb2ludGluZyB0byBpdFxuXG4gICAgICAgICAgICB0aGlzLmdldEluY29taW5nUmVnaW9ucygwKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyByZXNvdXJjZSBpcyBub3QgYSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHBvaW50aW5nIHRvIHRoaXMgcmVzb3VyY2VcblxuICAgICAgICAgICAgLy8gdGhpcyBnZXRzIHRoZSBmaXJzdCBwYWdlIG9mIGluY29taW5nIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnNcbiAgICAgICAgICAgIC8vIG1vcmUgcGFnZXMgbWF5IGJlIHJlcXVlc3RlZCBieSBbW3RoaXMudmlld2VyXV0uXG4gICAgICAgICAgICAvLyBUT0RPOiBmb3Igbm93LCB3ZSBiZWdpbiB3aXRoIG9mZnNldCAwLiBUaGlzIG1heSBoYXZlIHRvIGJlIGNoYW5nZWQgbGF0ZXIgKGJlZ2lubmluZyBzb21ld2hlcmUgaW4gYSBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgLy8gdGhpcy5nZXRJbmNvbWluZ1N0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgaW5jb21pbmcgbGlua3MgZm9yIHRoZSBjdXJyZW50IHJlc291cmNlXG4gICAgICAgIHRoaXMuZ2V0SW5jb21pbmdMaW5rcygwKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGluY29taW5nIHJlZ2lvbnMgZm9yIHRoZSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBnZXRJbmNvbWluZ1JlZ2lvbnMob2Zmc2V0OiBudW1iZXIsIGNhbGxiYWNrPzogKG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nUmVnaW9ucyh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgb2Zmc2V0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVnaW9uczogUmVhZFJlc291cmNlc1NlcXVlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIG9udG9sb2d5IGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5vbnRvbG9neUluZm8udXBkYXRlT250b2xvZ3lJbmZvcm1hdGlvbihyZWdpb25zLm9udG9sb2d5SW5mb3JtYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIGVsZW1lbnRzIG9mIHJlZ2lvbnMucmVzb3VyY2VzIHRvIHJlc291cmNlLmluY29taW5nXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdSZWdpb25zLCByZWdpb25zLnJlc291cmNlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcmVwYXJlIHJlZ2lvbnMgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0SW1hZ2VzQW5kUmVnaW9uc0ZvclJlc291cmNlKHRoaXMuc2VxdWVuY2UucmVzb3VyY2VzWzBdKTtcblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBvc2RWaWV3ZXJcbiAgICAgICAgICAgICAgICAvKiBpZiAodGhpcy5vc2RWaWV3ZXIpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMub3NkVmlld2VyLnVwZGF0ZVJlZ2lvbnMoKTtcbiAgICAgICAgICAgICAgICB9ICovXG5cbiAgICAgICAgICAgICAgICAvLyBpZiBjYWxsYmFjayBpcyBnaXZlbiwgZXhlY3V0ZSBmdW5jdGlvbiB3aXRoIHRoZSBhbW91bnQgb2YgbmV3IGltYWdlcyBhcyB0aGUgcGFyYW1ldGVyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVnaW9ucy5yZXNvdXJjZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaW5jb21pbmcgbGlua3MgZm9yIGEgcmVzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgZ2V0SW5jb21pbmdMaW5rcyhvZmZzZXQ6IG51bWJlciwgY2FsbGJhY2s/OiAobnVtYmVyT2ZSZXNvdXJjZXM6IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5faW5jb21pbmdTZXJ2aWNlLmdldEluY29taW5nTGlua3NGb3JSZXNvdXJjZSh0aGlzLnNlcXVlbmNlLnJlc291cmNlc1swXS5pZCwgb2Zmc2V0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoaW5jb21pbmdSZXNvdXJjZXM6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBvbnRvbG9neSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHRoaXMub250b2xvZ3lJbmZvLnVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24oaW5jb21pbmdSZXNvdXJjZXMub250b2xvZ3lJbmZvcm1hdGlvbik7XG5cbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgaW5jb21pbmdSZXNvdXJjZXMgdG8gdGhpcy5zZXF1ZW5jZS5pbmNvbWluZ0xpbmtzXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5zZXF1ZW5jZS5yZXNvdXJjZXNbMF0uaW5jb21pbmdMaW5rcywgaW5jb21pbmdSZXNvdXJjZXMucmVzb3VyY2VzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGNhbGxiYWNrIGlzIGdpdmVuLCBleGVjdXRlIGZ1bmN0aW9uIHdpdGggdGhlIGFtb3VudCBvZiBpbmNvbWluZyByZXNvdXJjZXMgYXMgdGhlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGluY29taW5nUmVzb3VyY2VzLnJlc291cmNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gdGhlIGluY29taW5nIHJlc291cmNlIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSW5jb21pbmcgcmVzb3VyY2UgaXJpXG4gICAgICovXG4gICAgb3BlbkxpbmsoaWQ6IHN0cmluZykge1xuXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9yZXNvdXJjZS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkKV0pO1xuXG4gICAgfVxuXG59XG4iXX0=