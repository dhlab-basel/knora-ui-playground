(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@knora/core'), require('@angular/router'), require('@angular/common'), require('@angular/forms'), require('@angular/flex-layout'), require('@angular/material/autocomplete'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/checkbox'), require('@angular/material/core'), require('@angular/material/expansion'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/list'), require('@angular/material/slide-toggle'), require('@angular/material/tabs'), require('@angular/material/toolbar'), require('@angular/material/tooltip'), require('@angular/material/datepicker'), require('@knora/action')) :
    typeof define === 'function' && define.amd ? define('@knora/viewer', ['exports', '@angular/core', '@knora/core', '@angular/router', '@angular/common', '@angular/forms', '@angular/flex-layout', '@angular/material/autocomplete', '@angular/material/button', '@angular/material/card', '@angular/material/checkbox', '@angular/material/core', '@angular/material/expansion', '@angular/material/form-field', '@angular/material/icon', '@angular/material/input', '@angular/material/list', '@angular/material/slide-toggle', '@angular/material/tabs', '@angular/material/toolbar', '@angular/material/tooltip', '@angular/material/datepicker', '@knora/action'], factory) :
    (global = global || self, factory((global.knora = global.knora || {}, global.knora.viewer = {}), global.ng.core, global['@knora/core'], global.ng.router, global.ng.common, global.ng.forms, global.ng['flex-layout'], global.ng.material.autocomplete, global.ng.material.button, global.ng.material.card, global.ng.material.checkbox, global.ng.material.core, global.ng.material.expansion, global.ng.material['form-field'], global.ng.material.icon, global.ng.material.input, global.ng.material.list, global.ng.material['slide-toggle'], global.ng.material.tabs, global.ng.material.toolbar, global.ng.material.tooltip, global.ng.material.datepicker, global['@knora/action']));
}(this, function (exports, core, core$1, router, common, forms, flexLayout, autocomplete, button, card, checkbox, core$2, expansion, formField, icon, input, list, slideToggle, tabs, toolbar, tooltip, datepicker, action) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    var AnnotationComponent = /** @class */ (function () {
        function AnnotationComponent() {
        }
        AnnotationComponent.prototype.ngOnInit = function () {
        };
        AnnotationComponent = __decorate([
            core.Component({
                selector: 'kui-annotation',
                template: "<p>\n  annotation works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], AnnotationComponent);
        return AnnotationComponent;
    }());

    var AudioComponent = /** @class */ (function () {
        function AudioComponent() {
        }
        AudioComponent.prototype.ngOnInit = function () {
        };
        AudioComponent = __decorate([
            core.Component({
                selector: 'kui-audio',
                template: "<p>\n  audio works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], AudioComponent);
        return AudioComponent;
    }());

    var CollectionComponent = /** @class */ (function () {
        function CollectionComponent() {
        }
        CollectionComponent.prototype.ngOnInit = function () {
        };
        CollectionComponent = __decorate([
            core.Component({
                selector: 'kui-collection',
                template: "<p>\n  collection works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], CollectionComponent);
        return CollectionComponent;
    }());

    var DddComponent = /** @class */ (function () {
        function DddComponent() {
        }
        DddComponent.prototype.ngOnInit = function () {
        };
        DddComponent = __decorate([
            core.Component({
                selector: 'kui-ddd',
                template: "<p>\n  ddd works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], DddComponent);
        return DddComponent;
    }());

    var DocumentComponent = /** @class */ (function () {
        function DocumentComponent() {
        }
        DocumentComponent.prototype.ngOnInit = function () {
        };
        DocumentComponent = __decorate([
            core.Component({
                selector: 'kui-document',
                template: "<p>\n  document works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], DocumentComponent);
        return DocumentComponent;
    }());

    var LinkObjComponent = /** @class */ (function () {
        function LinkObjComponent() {
        }
        LinkObjComponent.prototype.ngOnInit = function () {
        };
        LinkObjComponent = __decorate([
            core.Component({
                selector: 'kui-link-obj',
                template: "<p>\n  link-obj works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], LinkObjComponent);
        return LinkObjComponent;
    }());

    var MovingImageComponent = /** @class */ (function () {
        function MovingImageComponent() {
        }
        MovingImageComponent.prototype.ngOnInit = function () {
        };
        MovingImageComponent = __decorate([
            core.Component({
                selector: 'kui-moving-image',
                template: "<p>\n  moving-image works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], MovingImageComponent);
        return MovingImageComponent;
    }());

    var ObjectComponent = /** @class */ (function () {
        function ObjectComponent() {
        }
        ObjectComponent.prototype.ngOnInit = function () {
        };
        ObjectComponent = __decorate([
            core.Component({
                selector: 'kui-object',
                template: "<p>\n  object works!\n</p>",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], ObjectComponent);
        return ObjectComponent;
    }());

    var RegionComponent = /** @class */ (function () {
        function RegionComponent() {
        }
        RegionComponent.prototype.ngOnInit = function () {
        };
        RegionComponent = __decorate([
            core.Component({
                selector: 'kui-region',
                template: "<p>\n  region works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], RegionComponent);
        return RegionComponent;
    }());

    /**
     * Represents a region.
     * Contains a reference to the resource representing the region and its geometries.
     */
    var ImageRegion = /** @class */ (function () {
        /**
         *
         * @param regionResource a resource of type Region
         */
        function ImageRegion(regionResource) {
            this.regionResource = regionResource;
        }
        /**
         * Get all geometry information belonging to this region.
         *
         * @returns
         */
        ImageRegion.prototype.getGeometries = function () {
            return this.regionResource.properties[core$1.KnoraConstants.hasGeometry];
        };
        return ImageRegion;
    }());
    /**
     * Represents an image including its regions.
     */
    var StillImageRepresentation = /** @class */ (function () {
        /**
         *
         * @param stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
         * @param regions the regions belonging to the image.
         */
        function StillImageRepresentation(stillImageFileValue, regions) {
            this.stillImageFileValue = stillImageFileValue;
            this.regions = regions;
        }
        return StillImageRepresentation;
    }());
    /**
     * Represents a geometry belonging to a specific region.
     */
    var GeometryForRegion = /** @class */ (function () {
        /**
         *
         * @param geometry the geometrical information.
         * @param region the region the geometry belongs to.
         */
        function GeometryForRegion(geometry, region) {
            this.geometry = geometry;
            this.region = region;
        }
        return GeometryForRegion;
    }());
    /**
     * This component creates a OpenSeadragon viewer instance.
     * Accepts an array of ReadResource containing (among other resources) ReadStillImageFileValues to be rendered.
     * @member resources - resources containing (among other resources) the StillImageFileValues and incoming regions to be rendered. (Use as angular @Input data binding property.)
     */
    var StillImageComponent = /** @class */ (function () {
        function StillImageComponent(elementRef) {
            this.elementRef = elementRef;
            this.regionHovered = new core.EventEmitter();
            this.regions = {};
        }
        StillImageComponent_1 = StillImageComponent;
        /**
         * Calculates the surface of a rectangular region.
         *
         * @param geom the region's geometry.
         * @returns the surface.
         */
        StillImageComponent.surfaceOfRectangularRegion = function (geom) {
            if (geom.type !== 'rectangle') {
                console.log('expected rectangular region, but ' + geom.type + ' given');
                return 0;
            }
            var w = Math.max(geom.points[0].x, geom.points[1].x) - Math.min(geom.points[0].x, geom.points[1].x);
            var h = Math.max(geom.points[0].y, geom.points[1].y) - Math.min(geom.points[0].y, geom.points[1].y);
            return w * h;
        };
        /**
         * Prepare tile sources from the given sequence of [[ReadStillImageFileValue]].
         *
         * @param imagesToDisplay the given file values to de displayed.
         * @returns the tile sources to be passed to OSD viewer.
         */
        StillImageComponent.prepareTileSourcesFromFileValues = function (imagesToDisplay) {
            var e_1, _a;
            var imageXOffset = 0;
            var imageYOffset = 0;
            var tileSources = [];
            try {
                for (var imagesToDisplay_1 = __values(imagesToDisplay), imagesToDisplay_1_1 = imagesToDisplay_1.next(); !imagesToDisplay_1_1.done; imagesToDisplay_1_1 = imagesToDisplay_1.next()) {
                    var image = imagesToDisplay_1_1.value;
                    var sipiBasePath = image.imageServerIIIFBaseURL + '/' + image.imageFilename;
                    var width = image.dimX;
                    var height = image.dimY;
                    // construct OpenSeadragon tileSources according to https://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#open
                    tileSources.push({
                        // construct IIIF tileSource configuration according to
                        // http://iiif.io/api/image/2.1/#technical-properties
                        // see also http://iiif.io/api/image/2.0/#a-implementation-notes
                        'tileSource': {
                            '@context': 'http://iiif.io/api/image/2/context.json',
                            '@id': sipiBasePath,
                            'height': height,
                            'width': width,
                            'profile': ['http://iiif.io/api/image/2/level2.json'],
                            'protocol': 'http://iiif.io/api/image',
                            'tiles': [{
                                    'scaleFactors': [1, 2, 4, 8, 16, 32],
                                    'width': 1024
                                }]
                        },
                        'x': imageXOffset,
                        'y': imageYOffset
                    });
                    imageXOffset++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (imagesToDisplay_1_1 && !imagesToDisplay_1_1.done && (_a = imagesToDisplay_1.return)) _a.call(imagesToDisplay_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return tileSources;
        };
        StillImageComponent.prototype.ngOnChanges = function (changes) {
            if (changes['images'] && changes['images'].isFirstChange()) {
                this.setupViewer();
            }
            if (changes['images']) {
                this.openImages();
                this.renderRegions();
                this.unhighlightAllRegions();
                if (this.activateRegion !== undefined) {
                    this.highlightRegion(this.activateRegion);
                }
            }
            else if (changes['activateRegion']) {
                this.unhighlightAllRegions();
                if (this.activateRegion !== undefined) {
                    this.highlightRegion(this.activateRegion);
                }
            }
        };
        StillImageComponent.prototype.ngOnInit = function () {
            // initialisation is done on first run of ngOnChanges
        };
        StillImageComponent.prototype.ngOnDestroy = function () {
            if (this.viewer) {
                this.viewer.destroy();
                this.viewer = undefined;
            }
        };
        /**
         * Renders all ReadStillImageFileValues to be found in [[this.images]].
         * (Although this.images is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
         * Use this method if additional ReadStillImageFileValues were added to this.images after creation/assignment of the this.images array.)
         */
        StillImageComponent.prototype.updateImages = function () {
            if (!this.viewer) {
                this.setupViewer();
            }
            this.openImages();
        };
        /**
         * Renders all regions to be found in [[this.images]].
         * (Although this.images is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
         * Use this method if additional regions were added to the resources.images)
         */
        StillImageComponent.prototype.updateRegions = function () {
            if (!this.viewer) {
                this.setupViewer();
            }
            this.renderRegions();
        };
        /**
         * Highlights the polygon elements associated with the given region.
         *
         * @param regionIri the Iri of the region whose polygon elements should be highlighted..
         */
        StillImageComponent.prototype.highlightRegion = function (regionIri) {
            var e_2, _a;
            var activeRegion = this.regions[regionIri];
            if (activeRegion !== undefined) {
                try {
                    for (var activeRegion_1 = __values(activeRegion), activeRegion_1_1 = activeRegion_1.next(); !activeRegion_1_1.done; activeRegion_1_1 = activeRegion_1.next()) {
                        var pol = activeRegion_1_1.value;
                        pol.setAttribute('class', 'roi-svgoverlay active');
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (activeRegion_1_1 && !activeRegion_1_1.done && (_a = activeRegion_1.return)) _a.call(activeRegion_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        /**
         * Unhighlights the polygon elements of all regions.
         *
         */
        StillImageComponent.prototype.unhighlightAllRegions = function () {
            var e_3, _a;
            for (var reg in this.regions) {
                if (this.regions.hasOwnProperty(reg)) {
                    try {
                        for (var _b = __values(this.regions[reg]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var pol = _c.value;
                            pol.setAttribute('class', 'roi-svgoverlay');
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        };
        /**
         * Initializes the OpenSeadragon viewer
         */
        StillImageComponent.prototype.setupViewer = function () {
            var viewerContainer = this.elementRef.nativeElement.getElementsByClassName('osd-container')[0];
            var osdOptions = {
                element: viewerContainer,
                sequenceMode: true,
                showReferenceStrip: true,
                showNavigator: true,
                zoomInButton: 'KUI_OSD_ZOOM_IN',
                zoomOutButton: 'KUI_OSD_ZOOM_OUT',
                previousButton: 'KUI_OSD_PREV_PAGE',
                nextButton: 'KUI_OSD_NEXT_PAGE',
                homeButton: 'KUI_OSD_HOME',
                fullPageButton: 'KUI_OSD_FULL_PAGE',
                rotateLeftButton: 'KUI_OSD_ROTATE_LEFT',
                rotateRightButton: 'KUI_OSD_ROTATE_RIGHT' // doesn't work yet
            };
            this.viewer = new OpenSeadragon.Viewer(osdOptions);
            this.viewer.addHandler('full-screen', function (args) {
                if (args.fullScreen) {
                    viewerContainer.classList.add('fullscreen');
                }
                else {
                    viewerContainer.classList.remove('fullscreen');
                }
            });
            this.viewer.addHandler('resize', function (args) {
                args.eventSource.svgOverlay().resize();
            });
        };
        /**
         * Adds all images in this.images to the viewer.
         * Images are positioned in a horizontal row next to each other.
         */
        StillImageComponent.prototype.openImages = function () {
            // imageXOffset controls the x coordinate of the left side of each image in the OpenSeadragon viewport coordinate system.
            // The first image has its left side at x = 0, and all images are scaled to have a width of 1 in viewport coordinates.
            // see also: https://openseadragon.github.io/examples/viewport-coordinates/
            var fileValues = this.images.map(function (img) {
                return img.stillImageFileValue;
            });
            // display only the defined range of this.images
            var tileSources = StillImageComponent_1.prepareTileSourcesFromFileValues(fileValues);
            this.removeOverlays();
            this.viewer.open(tileSources);
        };
        /**
         * Removes SVG overlays from the DOM.
         */
        StillImageComponent.prototype.removeOverlays = function () {
            var e_4, _a;
            for (var reg in this.regions) {
                if (this.regions.hasOwnProperty(reg)) {
                    try {
                        for (var _b = __values(this.regions[reg]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var pol = _c.value;
                            if (pol instanceof SVGPolygonElement) {
                                pol.remove();
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            this.regions = {};
            // TODO: make this work by using osdviewer's addOverlay method
            this.viewer.clearOverlays();
        };
        /**
         * Adds a ROI-overlay to the viewer for every region of every image in this.images
         */
        StillImageComponent.prototype.renderRegions = function () {
            var _this = this;
            var e_5, _a;
            this.removeOverlays();
            var imageXOffset = 0; // see documentation in this.openImages() for the usage of imageXOffset
            var _loop_1 = function (image) {
                var e_6, _a;
                var aspectRatio = (image.stillImageFileValue.dimY / image.stillImageFileValue.dimX);
                // collect all geometries belonging to this page
                var geometries = [];
                image.regions.map(function (reg) {
                    _this.regions[reg.regionResource.id] = [];
                    var geoms = reg.getGeometries();
                    geoms.map(function (geom) {
                        var geomForReg = new GeometryForRegion(geom.geometry, reg.regionResource);
                        geometries.push(geomForReg);
                    });
                });
                // sort all geometries belonging to this page
                geometries.sort(function (geom1, geom2) {
                    if (geom1.geometry.type === 'rectangle' && geom2.geometry.type === 'rectangle') {
                        var surf1 = StillImageComponent_1.surfaceOfRectangularRegion(geom1.geometry);
                        var surf2 = StillImageComponent_1.surfaceOfRectangularRegion(geom2.geometry);
                        // if reg1 is smaller than reg2, return 1
                        // reg1 then comes after reg2 and thus is rendered later
                        if (surf1 < surf2) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                    else {
                        return 0;
                    }
                });
                try {
                    // render all geometries for this page
                    for (var geometries_1 = __values(geometries), geometries_1_1 = geometries_1.next(); !geometries_1_1.done; geometries_1_1 = geometries_1.next()) {
                        var geom = geometries_1_1.value;
                        var geometry = geom.geometry;
                        this_1.createSVGOverlay(geom.region.id, geometry, aspectRatio, imageXOffset, geom.region.label);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (geometries_1_1 && !geometries_1_1.done && (_a = geometries_1.return)) _a.call(geometries_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                imageXOffset++;
            };
            var this_1 = this;
            try {
                for (var _b = __values(this.images), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var image = _c.value;
                    _loop_1(image);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        };
        /**
         * Creates and adds a ROI-overlay to the viewer
         * @param regionIri the Iri of the region.
         * @param geometry - the geometry describing the ROI
         * @param aspectRatio -  the aspectRatio (h/w) of the image on which the geometry should be placed
         * @param xOffset -  the x-offset in Openseadragon viewport coordinates of the image on which the geometry should be placed
         * @param toolTip -  the tooltip which should be displayed on mousehover of the svg element
         */
        StillImageComponent.prototype.createSVGOverlay = function (regionIri, geometry, aspectRatio, xOffset, toolTip) {
            var _this = this;
            var lineColor = geometry.lineColor;
            var lineWidth = geometry.lineWidth;
            var svgElement;
            switch (geometry.type) {
                case 'rectangle':
                    svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); // yes, we render rectangles as svg polygon elements
                    this.addSVGAttributesRectangle(svgElement, geometry, aspectRatio, xOffset);
                    break;
                case 'polygon':
                    svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    this.addSVGAttributesPolygon(svgElement, geometry, aspectRatio, xOffset);
                    break;
                case 'circle':
                    svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    this.addSVGAttributesCircle(svgElement, geometry, aspectRatio, xOffset);
                    break;
                default:
                    console.log('ERROR: StillImageOSDViewerComponent.createSVGOverlay: unknown geometryType: ' + geometry.type);
                    return;
            }
            svgElement.id = 'roi-svgoverlay-' + Math.random() * 10000;
            svgElement.setAttribute('class', 'roi-svgoverlay');
            svgElement.setAttribute('style', 'stroke: ' + lineColor + '; stroke-width: ' + lineWidth + 'px;');
            // event when a region is clicked (output)
            svgElement.addEventListener('click', function () {
                _this.regionHovered.emit(regionIri);
            }, false);
            var svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            svgTitle.textContent = toolTip;
            var svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.appendChild(svgTitle);
            svgGroup.appendChild(svgElement);
            var overlay = this.viewer.svgOverlay();
            overlay.node().appendChild(svgGroup); // TODO: use method osdviewer's method addOverlay
            this.regions[regionIri].push(svgElement);
        };
        /**
         * Adds the necessary attributes to create a ROI-overlay of type 'rectangle' to a SVGElement
         * @param svgElement - an SVGElement (should have type 'polygon' (sic))
         * @param geometry - the geometry describing the rectangle
         * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
         * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
         */
        StillImageComponent.prototype.addSVGAttributesRectangle = function (svgElement, geometry, aspectRatio, xOffset) {
            var pointA = geometry.points[0];
            var pointB = geometry.points[1];
            // geometry.points contains two diagonally opposed corners of the rectangle, but the order of the corners is arbitrary.
            // We therefore construct the upperleft (UL), lowerright (LR), upperright (UR) and lowerleft (LL) positions of the corners with min and max operations.
            var positionUL = new core$1.Point2D(Math.min(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
            var positionLR = new core$1.Point2D(Math.max(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
            var positionUR = new core$1.Point2D(Math.max(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
            var positionLL = new core$1.Point2D(Math.min(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
            var points = [positionUL, positionUR, positionLR, positionLL];
            var viewCoordPoints = this.image2ViewPortCoords(points, aspectRatio, xOffset);
            var pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
            svgElement.setAttribute('points', pointsString);
        };
        /**
         * Adds the necessary attributes to create a ROI-overlay of type 'polygon' to a SVGElement
         * @param svgElement - an SVGElement (should have type 'polygon')
         * @param geometry - the geometry describing the polygon
         * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
         * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
         */
        StillImageComponent.prototype.addSVGAttributesPolygon = function (svgElement, geometry, aspectRatio, xOffset) {
            var viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
            var pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
            svgElement.setAttribute('points', pointsString);
        };
        /**
         * Adds the necessary attributes to create a ROI-overlay of type 'circle' to a SVGElement
         * @param svgElement - an SVGElement (should have type 'circle')
         * @param geometry - the geometry describing the circle
         * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
         * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
         */
        StillImageComponent.prototype.addSVGAttributesCircle = function (svgElement, geometry, aspectRatio, xOffset) {
            var viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
            var cx = String(viewCoordPoints[0].x);
            var cy = String(viewCoordPoints[0].y);
            // geometry.radius contains not the radius itself, but the coordinates of a (arbitrary) point on the circle.
            // We therefore have to calculate the length of the vector geometry.radius to get the actual radius. -> sqrt(x^2 + y^2)
            // Since geometry.radius has its y coordinate scaled to the height of the image,
            // we need to multiply it with the aspectRatio to get to the scale used by Openseadragon, analoguous to this.image2ViewPortCoords()
            var radius = String(Math.sqrt(geometry.radius.x * geometry.radius.x + aspectRatio * aspectRatio * geometry.radius.y * geometry.radius.y));
            svgElement.setAttribute('cx', cx);
            svgElement.setAttribute('cy', cy);
            svgElement.setAttribute('r', radius);
        };
        /**
         * Maps a Point2D[] with coordinates relative to an image to a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
         * see also: https://openseadragon.github.io/examples/viewport-coordinates/
         * @param points - an array of points in coordinate system relative to an image
         * @param aspectRatio - the aspectRatio (h/w) of the image
         * @param xOffset - the x-offset in viewport coordinates of the image
         * @returns - a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
         */
        StillImageComponent.prototype.image2ViewPortCoords = function (points, aspectRatio, xOffset) {
            return points.map(function (point) {
                return new core$1.Point2D(point.x + xOffset, point.y * aspectRatio);
            });
        };
        /**
         * Returns a string in the format expected by the 'points' attribute of a SVGElement
         * @param points - an array of points to be serialized to a string
         * @returns - the points serialized to a string in the format expected by the 'points' attribute of a SVGElement
         */
        StillImageComponent.prototype.createSVGPolygonPointsAttribute = function (points) {
            var pointsString = '';
            for (var i in points) {
                if (points.hasOwnProperty(i)) {
                    pointsString += points[i].x;
                    pointsString += ',';
                    pointsString += points[i].y;
                    pointsString += ' ';
                }
            }
            return pointsString;
        };
        var StillImageComponent_1;
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], StillImageComponent.prototype, "images", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], StillImageComponent.prototype, "imageCaption", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], StillImageComponent.prototype, "activateRegion", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], StillImageComponent.prototype, "regionHovered", void 0);
        StillImageComponent = StillImageComponent_1 = __decorate([
            core.Component({
                selector: 'kui-still-image',
                template: "<div class=\"still-image-viewer\">\n    <div class=\"navigation left\">\n        <button mat-button class=\"full-size\" id=\"KUI_OSD_PREV_PAGE\">\n            <mat-icon>keyboard_arrow_left</mat-icon>\n        </button>\n    </div>\n\n    <!-- main content with navigation and osd viewer -->\n    <div class=\"content\">\n\n        <!-- openseadragon (osd) viewer -->\n        <div class=\"osd-container\"></div>\n        <!-- /openseadragon (osd) -->\n\n        <!-- footer with image caption e.g. copyright information -->\n        <div class=\"footer\">\n            <p class=\"mat-caption\" [innerHtml]=\"imageCaption\"></p>\n        </div>\n\n        <!-- action panel with tools for image -->\n        <mat-toolbar class=\"action\">\n            <mat-toolbar-row>\n                <!-- home button -->\n                <span>\n                <button mat-icon-button id=\"KUI_OSD_HOME\"><mat-icon>home</mat-icon></button>\n            </span>\n                <!-- zoom buttons -->\n                <span class=\"fill-remaining-space\"></span>\n                <span>\n                <button mat-icon-button id=\"KUI_OSD_ZOOM_IN\"><mat-icon>add</mat-icon></button>\n                <button mat-icon-button id=\"KUI_OSD_ZOOM_OUT\"><mat-icon>remove</mat-icon></button>\n            </span>\n                <!-- window button -->\n                <span class=\"fill-remaining-space\"></span>\n                <span>\n                <button mat-icon-button id=\"KUI_OSD_FULL_PAGE\"><mat-icon>fullscreen</mat-icon></button>\n            </span>\n            </mat-toolbar-row>\n        </mat-toolbar>\n\n    </div>\n\n    <div class=\"navigation right\">\n        <button mat-button class=\"full-size\" id=\"KUI_OSD_NEXT_PAGE\">\n            <mat-icon>keyboard_arrow_right</mat-icon>\n        </button>\n    </div>\n\n</div>\n\n<!-- simple image viewer e.g. as a preview -->\n<!-- TODO: handle images array -->\n<!--<img *ngIf=\"simple && images?.length === 1; else osdViewer\" [src]=\"simpleImageExample\">-->\n\n\n<!--\n    <div>\n        <span *ngIf=\"images.length > 1\" (click)=\"gotoLeft()\">&lt;&lt;</span>\n        <span *ngIf=\"images.length > 1\" (click)=\"gotoRight()\">&gt;&gt;</span>\n    </div>\n-->\n\n\n\n",
                styles: [".still-image-viewer{display:inline-flex;height:400px;max-width:800px;width:100%}@media (max-height:636px){.still-image-viewer{height:300px}}.still-image-viewer .navigation{height:calc(400px + 64px + 24px);width:36px}.still-image-viewer .navigation .mat-button.full-size{height:100%!important;width:36px!important;padding:0!important;min-width:36px!important}.still-image-viewer .content{height:calc(400px + 64px + 24px);max-width:calc(800px - (2 * 36px));width:calc(100% - (2 * 36px))}.still-image-viewer .content .osd-container{color:#ccc;background-color:#000;height:400px}.still-image-viewer .content .osd-container.fullscreen{max-width:100vw}.still-image-viewer .content .footer p{color:#ccc;background-color:#000;height:24px;margin:0;padding:0 16px}::ng-deep .roi-svgoverlay{opacity:.4;fill:transparent;stroke:#00695c;stroke-width:2px;vector-effect:non-scaling-stroke}.roi-svgoverlay:focus,::ng-deep .roi-svgoverlay:hover{opacity:1}::ng-deep .roi-svgoverlay.active{opacity:1}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], StillImageComponent);
        return StillImageComponent;
    }());

    var TextComponent = /** @class */ (function () {
        function TextComponent() {
        }
        TextComponent.prototype.ngOnInit = function () {
        };
        TextComponent = __decorate([
            core.Component({
                selector: 'kui-text',
                template: "<p>\n  text works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], TextComponent);
        return TextComponent;
    }());

    var BooleanValueComponent = /** @class */ (function () {
        function BooleanValueComponent() {
        }
        Object.defineProperty(BooleanValueComponent.prototype, "valueObject", {
            get: function () {
                return this._booleanValueObj;
            },
            set: function (value) {
                this._booleanValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadBooleanValue),
            __metadata("design:paramtypes", [core$1.ReadBooleanValue])
        ], BooleanValueComponent.prototype, "valueObject", null);
        BooleanValueComponent = __decorate([
            core.Component({
                selector: 'kui-boolean-value',
                template: "<mat-checkbox [checked]=\"valueObject.bool\" disabled=\"true\"></mat-checkbox>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], BooleanValueComponent);
        return BooleanValueComponent;
    }());

    var ColorValueComponent = /** @class */ (function () {
        function ColorValueComponent() {
        }
        Object.defineProperty(ColorValueComponent.prototype, "valueObject", {
            get: function () {
                return this._colorValueObj;
            },
            set: function (value) {
                this._colorValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadColorValue),
            __metadata("design:paramtypes", [core$1.ReadColorValue])
        ], ColorValueComponent.prototype, "valueObject", null);
        ColorValueComponent = __decorate([
            core.Component({
                selector: 'kui-color-value',
                template: "<span [style.background-color]=\"valueObject.colorHex\">{{valueObject.colorHex}}</span>",
                styles: [".fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.mat-form-field{width:36px;overflow-x:visible}"]
            }),
            __metadata("design:paramtypes", [])
        ], ColorValueComponent);
        return ColorValueComponent;
    }());

    var DateValueComponent = /** @class */ (function () {
        function DateValueComponent() {
        }
        Object.defineProperty(DateValueComponent.prototype, "calendar", {
            get: function () {
                return this._calendar;
            },
            set: function (value) {
                this._calendar = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateValueComponent.prototype, "era", {
            get: function () {
                return this._era;
            },
            set: function (value) {
                this._era = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateValueComponent.prototype, "valueObject", {
            get: function () {
                return this._dateValueObj;
            },
            set: function (value) {
                this._dateValueObj = value;
                var dateOrRange = this.valueObject.getDateSalsah();
                if (dateOrRange instanceof core$1.DateRangeSalsah) {
                    // period (start and end dates)
                    this.period = true;
                    this.dates = [this.getJSDate(dateOrRange.start), this.getJSDate(dateOrRange.end)];
                }
                else {
                    // single date
                    this.period = false;
                    this.dates = [this.getJSDate(dateOrRange)];
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Converts a `DateSalsah` to a JS Date, providing necessary formatting information.
         * JULIAN and GREGORIAN calendar are the only available for the moment.
         *
         * @param date the date to be converted.
         * @return DateFormatter.
         */
        DateValueComponent.prototype.getJSDate = function (date) {
            if (date.precision === core$1.Precision.yearPrecision) {
                return {
                    format: 'yyyy',
                    date: new Date(date.year.toString()),
                    era: date.era,
                    calendar: date.calendar
                };
            }
            else if (date.precision === core$1.Precision.monthPrecision) {
                return {
                    format: 'MMMM ' + 'yyyy',
                    date: new Date(date.year, date.month - 1, 1),
                    era: date.era,
                    calendar: date.calendar
                };
            }
            else if (date.precision === core$1.Precision.dayPrecision) {
                return {
                    format: 'longDate',
                    date: new Date(date.year, date.month - 1, date.day),
                    era: date.era,
                    calendar: date.calendar
                };
            }
            else {
                console.error('Error: incorrect precision for date');
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], DateValueComponent.prototype, "calendar", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], DateValueComponent.prototype, "era", null);
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadDateValue),
            __metadata("design:paramtypes", [core$1.ReadDateValue])
        ], DateValueComponent.prototype, "valueObject", null);
        DateValueComponent = __decorate([
            core.Component({
                selector: 'kui-date-value',
                template: "<span *ngIf=\"period; else preciseDate\">\n    {{dates[0].date | date: dates[0].format}}\n    <span *ngIf=\"era\">\n        {{dates[0].era}}\n    </span>\n    - {{dates[1].date | date: dates[1].format}}\n    <span *ngIf=\"era\">\n        {{dates[1].era}}\n    </span>\n\n    <span *ngIf=\"calendar\">\n        ({{dates[0].calendar}})\n    </span>\n</span>\n\n<ng-template #preciseDate>\n\n    <span>\n        {{dates[0].date | date: dates[0].format}}\n        <span *ngIf=\"era\">\n            {{dates[0].era}}\n        </span>\n        <span *ngIf=\"calendar\">\n            ({{dates[0].calendar}})\n        </span>\n    </span>\n\n</ng-template>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], DateValueComponent);
        return DateValueComponent;
    }());

    var DecimalValueComponent = /** @class */ (function () {
        function DecimalValueComponent() {
        }
        Object.defineProperty(DecimalValueComponent.prototype, "valueObject", {
            get: function () {
                return this._decimalValueObj;
            },
            set: function (value) {
                this._decimalValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadDecimalValue),
            __metadata("design:paramtypes", [core$1.ReadDecimalValue])
        ], DecimalValueComponent.prototype, "valueObject", null);
        DecimalValueComponent = __decorate([
            core.Component({
                selector: 'kui-decimal-value',
                template: "<span>{{valueObject.decimal}}</span>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], DecimalValueComponent);
        return DecimalValueComponent;
    }());

    var ExternalResValueComponent = /** @class */ (function () {
        function ExternalResValueComponent() {
        }
        ExternalResValueComponent.prototype.ngOnInit = function () {
        };
        ExternalResValueComponent = __decorate([
            core.Component({
                selector: 'kui-external-res-value',
                template: "<p>\n  external-res-value works!\n</p>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], ExternalResValueComponent);
        return ExternalResValueComponent;
    }());

    var GeometryValueComponent = /** @class */ (function () {
        function GeometryValueComponent() {
        }
        Object.defineProperty(GeometryValueComponent.prototype, "valueObject", {
            get: function () {
                return this._geomValueObj;
            },
            set: function (value) {
                this._geomValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadGeomValue),
            __metadata("design:paramtypes", [core$1.ReadGeomValue])
        ], GeometryValueComponent.prototype, "valueObject", null);
        GeometryValueComponent = __decorate([
            core.Component({
                selector: 'kui-geometry-value',
                template: "<span>{{valueObject.geometryString}}</span>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], GeometryValueComponent);
        return GeometryValueComponent;
    }());

    var GeonameValueComponent = /** @class */ (function () {
        function GeonameValueComponent() {
        }
        GeonameValueComponent.prototype.ngOnInit = function () {
        };
        GeonameValueComponent = __decorate([
            core.Component({
                selector: 'kui-geoname-value',
                template: "<p>\n  geoname-value works!\n</p>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], GeonameValueComponent);
        return GeonameValueComponent;
    }());

    var IntegerValueComponent = /** @class */ (function () {
        function IntegerValueComponent() {
        }
        Object.defineProperty(IntegerValueComponent.prototype, "valueObject", {
            get: function () {
                return this._integerValueObj;
            },
            set: function (value) {
                this._integerValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadIntegerValue),
            __metadata("design:paramtypes", [core$1.ReadIntegerValue])
        ], IntegerValueComponent.prototype, "valueObject", null);
        IntegerValueComponent = __decorate([
            core.Component({
                selector: 'kui-integer-value',
                template: "<span>{{valueObject.integer}}</span>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], IntegerValueComponent);
        return IntegerValueComponent;
    }());

    var IntervalValueComponent = /** @class */ (function () {
        function IntervalValueComponent() {
        }
        Object.defineProperty(IntervalValueComponent.prototype, "valueObject", {
            get: function () {
                return this._intervalValueObj;
            },
            set: function (value) {
                this._intervalValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadIntervalValue),
            __metadata("design:paramtypes", [core$1.ReadIntervalValue])
        ], IntervalValueComponent.prototype, "valueObject", null);
        IntervalValueComponent = __decorate([
            core.Component({
                selector: 'kui-interval-value',
                template: "<span>{{valueObject.intervalStart}} - {{valueObject.intervalEnd}}</span>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], IntervalValueComponent);
        return IntervalValueComponent;
    }());

    var LinkValueComponent = /** @class */ (function () {
        function LinkValueComponent() {
            this.referredResourceClicked = new core.EventEmitter();
        }
        Object.defineProperty(LinkValueComponent.prototype, "ontologyInfo", {
            get: function () {
                return this._ontoInfo;
            },
            set: function (value) {
                this._ontoInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinkValueComponent.prototype, "valueObject", {
            get: function () {
                return this._linkValueObj;
            },
            set: function (value) {
                this._linkValueObj = value;
                if (this.valueObject.referredResource !== undefined) {
                    this.referredResource = this.valueObject.referredResource.label;
                }
                else {
                    this.referredResource = this.valueObject.referredResourceIri;
                }
            },
            enumerable: true,
            configurable: true
        });
        LinkValueComponent.prototype.refResClicked = function () {
            this.referredResourceClicked.emit(this._linkValueObj);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.OntologyInformation),
            __metadata("design:paramtypes", [core$1.OntologyInformation])
        ], LinkValueComponent.prototype, "ontologyInfo", null);
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadLinkValue),
            __metadata("design:paramtypes", [core$1.ReadLinkValue])
        ], LinkValueComponent.prototype, "valueObject", null);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LinkValueComponent.prototype, "referredResourceClicked", void 0);
        LinkValueComponent = __decorate([
            core.Component({
                selector: 'kui-link-value',
                template: "<a class=\"salsah-link\" (click)=\"refResClicked()\">{{referredResource}}</a>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], LinkValueComponent);
        return LinkValueComponent;
    }());

    var ListValueComponent = /** @class */ (function () {
        function ListValueComponent(_listCacheService) {
            this._listCacheService = _listCacheService;
        }
        Object.defineProperty(ListValueComponent.prototype, "valueObject", {
            get: function () {
                return this._listValueObj;
            },
            set: function (value) {
                this._listValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        ListValueComponent.prototype.ngOnChanges = function () {
            // given the node's Iri, ask the list cache service
            this.node = this._listCacheService.getListNode(this._listValueObj.listNodeIri);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadListValue),
            __metadata("design:paramtypes", [core$1.ReadListValue])
        ], ListValueComponent.prototype, "valueObject", null);
        ListValueComponent = __decorate([
            core.Component({
                selector: 'kui-list-value',
                template: "<span *ngIf=\"node | async\">{{(node | async )?.label}}</span>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [core$1.ListCacheService])
        ], ListValueComponent);
        return ListValueComponent;
    }());

    var TextValueAsHtmlComponent = /** @class */ (function () {
        function TextValueAsHtmlComponent(el) {
            this.el = el;
            this.referredResourceClicked = new core.EventEmitter();
        }
        Object.defineProperty(TextValueAsHtmlComponent.prototype, "ontologyInfo", {
            get: function () {
                return this._ontoInfo;
            },
            set: function (value) {
                this._ontoInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextValueAsHtmlComponent.prototype, "bindEvents", {
            get: function () {
                return this._bindEvents;
            },
            set: function (value) {
                this._bindEvents = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextValueAsHtmlComponent.prototype, "valueObject", {
            get: function () {
                return this._htmlValueObj;
            },
            set: function (value) {
                this._htmlValueObj = value;
                if (this.el.nativeElement.innerHTML) {
                    this.el.nativeElement.innerHTML = this.valueObject.html;
                }
            },
            enumerable: true,
            configurable: true
        });
        TextValueAsHtmlComponent.prototype.refResClicked = function (refResourceIri) {
            this.referredResourceClicked.emit(refResourceIri);
        };
        /**
         * Binds a click event to standoff links that shows the referred resource.
         *
         * @param targetElement
         */
        TextValueAsHtmlComponent.prototype.onClick = function (targetElement) {
            if (this._bindEvents && targetElement.nodeName.toLowerCase() === 'a'
                && targetElement.className.toLowerCase().indexOf(core$1.KnoraConstants.SalsahLink) >= 0
                && targetElement.href !== undefined) {
                this.refResClicked(targetElement.href);
                // prevent propagation
                return false;
            }
            else if (this.bindEvents && targetElement.nodeName.toLowerCase() === 'a' && targetElement.href !== undefined) {
                // open link in a new window
                window.open(targetElement.href, '_blank');
                // prevent propagation
                return false;
            }
            else {
                // prevent propagation
                return false;
            }
        };
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TextValueAsHtmlComponent.prototype, "referredResourceClicked", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.OntologyInformation),
            __metadata("design:paramtypes", [core$1.OntologyInformation])
        ], TextValueAsHtmlComponent.prototype, "ontologyInfo", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], TextValueAsHtmlComponent.prototype, "bindEvents", null);
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadTextValueAsHtml),
            __metadata("design:paramtypes", [core$1.ReadTextValueAsHtml])
        ], TextValueAsHtmlComponent.prototype, "valueObject", null);
        __decorate([
            core.HostListener('click', ['$event.target']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], TextValueAsHtmlComponent.prototype, "onClick", null);
        TextValueAsHtmlComponent = __decorate([
            core.Component({
                selector: 'kui-text-value-as-html',
                template: "<div>{{valueObject.html}}</div>",
                styles: [""]
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], TextValueAsHtmlComponent);
        return TextValueAsHtmlComponent;
    }());

    var TextValueAsStringComponent = /** @class */ (function () {
        function TextValueAsStringComponent() {
        }
        Object.defineProperty(TextValueAsStringComponent.prototype, "valueObject", {
            get: function () {
                return this._textStringValueObj;
            },
            set: function (value) {
                this._textStringValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadTextValueAsString),
            __metadata("design:paramtypes", [core$1.ReadTextValueAsString])
        ], TextValueAsStringComponent.prototype, "valueObject", null);
        TextValueAsStringComponent = __decorate([
            core.Component({
                selector: 'kui-text-value-as-string',
                template: "<span>{{valueObject.str}}</span>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], TextValueAsStringComponent);
        return TextValueAsStringComponent;
    }());

    var TextValueAsXmlComponent = /** @class */ (function () {
        function TextValueAsXmlComponent() {
        }
        Object.defineProperty(TextValueAsXmlComponent.prototype, "valueObject", {
            get: function () {
                return this._xmlValueObj;
            },
            set: function (value) {
                this._xmlValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadTextValueAsXml),
            __metadata("design:paramtypes", [core$1.ReadTextValueAsXml])
        ], TextValueAsXmlComponent.prototype, "valueObject", null);
        TextValueAsXmlComponent = __decorate([
            core.Component({
                selector: 'kui-text-value-as-xml',
                template: "<span>{{valueObject.xml}}</span>",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], TextValueAsXmlComponent);
        return TextValueAsXmlComponent;
    }());

    var TextfileValueComponent = /** @class */ (function () {
        function TextfileValueComponent() {
        }
        Object.defineProperty(TextfileValueComponent.prototype, "valueObject", {
            get: function () {
                return this._textfileValueObj;
            },
            set: function (value) {
                this._textfileValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadTextFileValue),
            __metadata("design:paramtypes", [core$1.ReadTextFileValue])
        ], TextfileValueComponent.prototype, "valueObject", null);
        TextfileValueComponent = __decorate([
            core.Component({
                selector: 'kui-textfile-value',
                template: "<a target=\"_blank\" href=\"{{valueObject.textFileURL}}\">{{valueObject.textFilename}}</a>",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], TextfileValueComponent);
        return TextfileValueComponent;
    }());

    var UriValueComponent = /** @class */ (function () {
        function UriValueComponent() {
        }
        Object.defineProperty(UriValueComponent.prototype, "valueObject", {
            get: function () {
                return this.__uriValueObj;
            },
            set: function (value) {
                this.__uriValueObj = value;
            },
            enumerable: true,
            configurable: true
        });
        UriValueComponent.prototype.ngOnChanges = function () {
            if (this.label === undefined) {
                this.displayString = this.__uriValueObj.uri;
            }
            else {
                this.displayString = this.label;
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.ReadUriValue),
            __metadata("design:paramtypes", [core$1.ReadUriValue])
        ], UriValueComponent.prototype, "valueObject", null);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], UriValueComponent.prototype, "label", void 0);
        UriValueComponent = __decorate([
            core.Component({
                selector: '   kui-uri-value',
                template: "<a href=\"{{valueObject.uri}}\" target=\"_blank\">{{displayString}}</a>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], UriValueComponent);
        return UriValueComponent;
    }());

    var CompareViewComponent = /** @class */ (function () {
        function CompareViewComponent() {
        }
        CompareViewComponent.prototype.ngOnInit = function () {
        };
        CompareViewComponent = __decorate([
            core.Component({
                selector: 'kui-compare-view',
                template: "<p>\n  compare-view works!\n</p>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], CompareViewComponent);
        return CompareViewComponent;
    }());

    var GraphViewComponent = /** @class */ (function () {
        function GraphViewComponent() {
        }
        GraphViewComponent.prototype.ngOnInit = function () {
        };
        GraphViewComponent = __decorate([
            core.Component({
                selector: 'kui-graph-view',
                template: "<p>This is the GraphView component to visualize the connection of a resource. This view will implement the d3js library</p>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], GraphViewComponent);
        return GraphViewComponent;
    }());

    var GridViewComponent = /** @class */ (function () {
        function GridViewComponent(_router) {
            this._router = _router;
            // @Input() isLoading: boolean;
            this.KnoraConstants = core$1.KnoraConstants;
        }
        GridViewComponent.prototype.ngOnInit = function () {
        };
        /**
         * Navigate to the resource viewer when clicking on one resource of the search result grid
         * @param {string} id
         */
        GridViewComponent.prototype.openResource = function (id) {
            var url = '/resource/' + encodeURIComponent(id);
            this._router.navigate([url]);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], GridViewComponent.prototype, "result", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.OntologyInformation)
        ], GridViewComponent.prototype, "ontologyInfo", void 0);
        GridViewComponent = __decorate([
            core.Component({
                selector: 'kui-grid-view',
                template: "<div>\n  <!-- <kui-progress-indicator *ngIf=\"isLoading\" [color]=\"'#D88958'\"></kui-progress-indicator> -->\n\n  <div fxLayout=\"row wrap\" fxLayout.xs=\"column\" fxLayoutGap=\"grid\">\n\n    <div fxFlex.sm=\"50\" fxFlex.md=\"33.3\" fxFlex.lg=\"20\" fxFlex.xl=\"16.6\" fxFlex=\"16.6\" *ngFor=\"let res of result\" class=\"gv-preview\">\n      <mat-card class=\"link\" (click)=\"openResource(res.id)\">\n\n        <mat-card-subtitle>{{ontologyInfo?.getLabelForResourceClass(res.type)}}</mat-card-subtitle>\n        <mat-card-title>{{res.label}}</mat-card-title>\n\n\n        <mat-card-content *ngFor=\"let prop of res.properties | kuiKey\">\n          <!-- description -->\n          <div *ngFor=\"let val of prop.value | kuiKey\">\n            <div [ngSwitch]=\"val.value.getClassName()\">\n              <div class=\"lv-html-text\" *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\">\n                <kui-text-value-as-html [valueObject]=\"val.value\" [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"false\"></kui-text-value-as-html>\n                <p class=\"lv-read-more\"></p>\n              </div>\n              <div>\n                <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val.value\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n                <span *ngSwitchDefault=\"\">{{val.value.getContent()}}</span>\n              </div>\n              <br>\n              <span *ngIf=\"ontologyInfo?.getLabelForProperty(prop.key) !== 'Text'\">\n                {{ontologyInfo?.getLabelForProperty(prop.key)}}\n              </span>\n            </div>\n          </div>\n        </mat-card-content>\n\n      </mat-card>\n    </div>\n  </div>\n\n\n</div>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.gv-preview{margin:6px 0;padding:24px;word-wrap:break-word;border-radius:5px}.gv-preview .mat-card{height:160px;color:rgba(0,0,0,.81);overflow:hidden;padding-bottom:25px}.gv-preview .mat-card:hover{background:rgba(0,105,92,.39);color:#000}.gv-preview .mat-card:active{background:rgba(0,105,92,.61)}.gv-preview .mat-card .mat-card-title{font-size:12pt;font-weight:600}"]
            }),
            __metadata("design:paramtypes", [router.Router])
        ], GridViewComponent);
        return GridViewComponent;
    }());

    var ListViewComponent = /** @class */ (function () {
        function ListViewComponent(_router) {
            this._router = _router;
            // @Input() isLoading: boolean;
            this.KnoraConstants = core$1.KnoraConstants;
        }
        /**
         * Navigate to the resource viewer when clicking on one resource of the search result list
         * @param {string} id
         */
        ListViewComponent.prototype.openResource = function (id) {
            var url = '/resource/' + encodeURIComponent(id);
            this._router.navigate([url]);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ListViewComponent.prototype, "result", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core$1.OntologyInformation)
        ], ListViewComponent.prototype, "ontologyInfo", void 0);
        ListViewComponent = __decorate([
            core.Component({
                selector: 'kui-list-view',
                template: "<div>\n    <!-- <kui-progress-indicator *ngIf=\"isLoading\" [color]=\"'#D88958'\"></kui-progress-indicator> -->\n\n    <mat-list class=\"list-view lv-items\" *ngFor=\"let res of result; let i = index; let last = last;\">\n        <mat-list-item class=\"link\" (click)=\"openResource(res.id)\">\n            <mat-icon matListIcon>image_search</mat-icon>\n            <p matLine class=\"lv-res-label\">{{ontologyInfo?.getLabelForResourceClass(res.type)}}</p>\n            <h3 matLine class=\"lv-label\">{{res.label}}</h3>\n\n            <div matLine *ngFor=\"let prop of res.properties | kuiKey\">\n\n                <div matLine *ngFor=\"let val of prop.value | kuiKey\">\n\n                    <div [ngSwitch]=\"val.value.getClassName()\">\n                        <span *ngIf=\"ontologyInfo?.getLabelForProperty(prop.key) !== 'Text'\" class=\"lv-prop-label\">\n                            {{ontologyInfo?.getLabelForProperty(prop.key)}}:&nbsp;\n                        </span>\n\n                        <div class=\"lv-html-text\">\n\n                            <div *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\">\n                                <kui-text-value-as-html [valueObject]=\"val.value\" [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"false\"></kui-text-value-as-html>\n                            </div>\n\n                            <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val.value\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n\n                            <span *ngSwitchDefault=\"\">{{val.value.getContent()}}</span>\n\n                            <!-- slice the end of long texts -->\n                            <p class=\"lv-read-more\"></p>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </mat-list-item>\n\n        <mat-divider *ngIf=\"!last\"></mat-divider>\n\n    </mat-list>\n</div>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.mat-list .mat-list-item .mat-line{white-space:normal!important}.list-view .mat-list-item{height:auto;min-height:40px;padding:8px 0}.lv-label{font-weight:700!important;font-size:16px!important;line-height:1.5}.lv-res-label{color:rgba(0,0,0,.54);font-size:14px!important}.lv-prop-label{font-style:italic}"]
            }),
            __metadata("design:paramtypes", [router.Router])
        ], ListViewComponent);
        return ListViewComponent;
    }());

    /**
     * Deprecated!?
     */
    var PropertiesViewComponent = /** @class */ (function () {
        function PropertiesViewComponent() {
        }
        PropertiesViewComponent = __decorate([
            core.Component({
                selector: 'kui-properties-view',
                template: "<p>\n    properties-view works!\n</p>",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
            }),
            __metadata("design:paramtypes", [])
        ], PropertiesViewComponent);
        return PropertiesViewComponent;
    }());

    var jsonld = require('jsonld');
    var ResourceViewComponent = /** @class */ (function () {
        function ResourceViewComponent(_route, _router, _resourceService, _incomingService) {
            this._route = _route;
            this._router = _router;
            this._resourceService = _resourceService;
            this._incomingService = _incomingService;
            this.KnoraConstants = core$1.KnoraConstants;
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
        };
        ResourceViewComponent.prototype.collectImagesAndRegionsForResource = function (resource) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
            var imgRepresentations = [];
            if (resource.properties[core$1.KnoraConstants.hasStillImageFileValue] !== undefined) {
                // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                // resource has StillImageFileValues that are directly attached to it (properties)
                var fileValues = resource.properties[core$1.KnoraConstants.hasStillImageFileValue];
                var imagesToDisplay = fileValues.filter(function (image) {
                    return !image.isPreview;
                });
                try {
                    for (var imagesToDisplay_1 = __values(imagesToDisplay), imagesToDisplay_1_1 = imagesToDisplay_1.next(); !imagesToDisplay_1_1.done; imagesToDisplay_1_1 = imagesToDisplay_1.next()) {
                        var img = imagesToDisplay_1_1.value;
                        var regions = [];
                        try {
                            for (var _e = __values(resource.incomingRegions), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var incomingRegion = _f.value;
                                var region = new core$1.ImageRegion(incomingRegion);
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
                        var stillImage = new core$1.StillImageRepresentation(img, regions);
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
                    var fileValues = stillImageRes.properties[core$1.KnoraConstants.hasStillImageFileValue];
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
                    for (var readStillImageFileValues_1 = __values(readStillImageFileValues), readStillImageFileValues_1_1 = readStillImageFileValues_1.next(); !readStillImageFileValues_1_1.done; readStillImageFileValues_1_1 = readStillImageFileValues_1.next()) {
                        var img = readStillImageFileValues_1_1.value;
                        var regions = [];
                        try {
                            for (var _g = __values(resource.incomingRegions), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var incomingRegion = _h.value;
                                var region = new core$1.ImageRegion(incomingRegion);
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
                        var stillImage = new core$1.StillImageRepresentation(img, regions);
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
            if (this.sequence.resources[0].properties[core$1.KnoraConstants.hasStillImageFileValue]) {
                // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                // the resource is a StillImageRepresentation, check if there are regions pointing to it
                this.getIncomingRegions(0);
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
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ResourceViewComponent.prototype, "iri", void 0);
        ResourceViewComponent = __decorate([
            core.Component({
                selector: 'kui-resource-view',
                template: "<div class=\"resource-view\">\n\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list>\n\n            <!-- 1) show fileRepresentation first-->\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\">\n                        <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n                        <kui-still-image *ngIf=\"resource.stillImageRepresentationsToDisplay.length > 0\" class=\"osd-viewer\" [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\" [images]=\"resource.stillImageRepresentationsToDisplay\">\n                        </kui-still-image>\n                    </div>\n\n                    <!-- TODO: switch through all other media type -->\n                    <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n  \n                    <kui-collection></kui-collection>\n  \n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n\n                    <div *ngSwitchDefault class=\"hidden\">\n                        <!--<p>This media type ({{prop.key}}) is not yet implemented</p>-->\n                    </div>\n                </div>\n            </div>\n\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <div class=\"data\">\n\n                <mat-tab-group class=\"full-width\">\n                    <mat-tab label=\"Metadata\">\n                        <mat-list>\n                            <div *ngFor=\"let prop of guiOrder; let last = last\" class=\"property\">\n                                <div *ngIf=\"resource.properties[prop?.property]\">\n                                    <!-- label of the property -->\n                                    <h3 mat-subheader class=\"property-label\">\n                                        {{sequence.ontologyInformation.getLabelForProperty(prop?.property)}}\n                                    </h3>\n                                    <!-- the value(s) of the property -->\n                                    <mat-list-item class=\"property-value-item\" *ngFor=\"let val of resource.properties[prop?.property]; let lastItem = last\">\n                                        <li [ngSwitch]=\"val.getClassName()\" [class.list]=\"resource.properties[prop?.property].length > 1\" [class.lastItem]=\"lastItem\">\n                                            <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\" [valueObject]=\"val\"></kui-text-value-as-string>\n                                            <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\" [valueObject]=\"val\"></kui-text-value-as-xml>\n                                            <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n                                            <kui-link-value class=\"app-link\" *ngSwitchCase=\"KnoraConstants.ReadLinkValue\" [valueObject]=\"val\" [ontologyInfo]=\"ontologyInfo\" (referredResourceClicked)=\"openLink(val.referredResourceIri)\">\n                                            </kui-link-value>\n                                            <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\" [valueObject]=\"val\"></kui-integer-value>\n                                            <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\" [valueObject]=\"val\"></kui-decimal-value>\n                                            <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\" [valueObject]=\"val\"></kui-geometry-value>\n                                            <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\" [valueObject]=\"val\"></kui-color-value>\n                                            <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\"></kui-uri-value>\n                                            <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\" [valueObject]=\"val\"></kui-boolean-value>\n                                            <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\" [valueObject]=\"val\"></kui-interval-value>\n                                            <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\"></kui-list-value>\n                                            <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\" [valueObject]=\"val\"></kui-textfile-value>\n                                            <span *ngSwitchDefault>Not supported {{val.getClassName()}}</span>\n                                        </li>\n                                    </mat-list-item>\n                                </div>\n                            </div>\n                        </mat-list>\n                    </mat-tab>\n\n                    <mat-tab label=\"Annotations\" *ngIf=\"resource.annotations?.length > 0\">\n\n                    </mat-tab>\n\n                    <mat-tab label=\"Links / Connections\" *ngIf=\"resource.incomingLinks?.length > 0\">\n                        <div>\n                            <mat-list *ngFor=\"let incoming of resource.incomingLinks\">\n                                <mat-list-item class=\"app-link link\" (click)=\"openLink(incoming.id)\">\n                                    <span>{{incoming.label}}</span>\n                                </mat-list-item>\n                            </mat-list>\n                        </div>\n                    </mat-tab>\n\n                </mat-tab-group>\n\n            </div>\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n\n\n<!-- OLD / first template\n  <mat-card>\n  \n  \n    <h2>metadata for resource {{ resource?.label}} ({{ resource?.id }})</h2>\n    <h3>type: {{ontologyInfo?.getLabelForResourceClass(resource?.type)}}</h3>\n  \n    <div *ngFor=\"let prop of resource?.properties | kuiKey\">\n        <mat-list>\n            <span>{{ontologyInfo?.getLabelForProperty(prop.key)}}</span>\n            <mat-list-item *ngFor=\"let val of prop.value\">\n                <span [ngSwitch]=\"val.getClassName()\">\n                    <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\"\n                                     [valueObject]=\"val\"></kui-color-value>\n                    <kui-text-value-as-html *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\" [valueObject]=\"val\"\n                                            [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"true\"></kui-text-value-as-html>\n                    <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\"\n                                              [valueObject]=\"val\"></kui-text-value-as-string>\n                    <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\"\n                                           [valueObject]=\"val\"></kui-text-value-as-xml>\n                    <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\"></kui-date-value>\n                    <kui-link-value *ngSwitchCase=\"KnoraConstants.ReadLinkValue\" [valueObject]=\"val\"\n                                    [ontologyInfo]=\"ontologyInfo\"></kui-link-value>\n                    <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\"\n                                       [valueObject]=\"val\"></kui-integer-value>\n                    <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\"\n                                       [valueObject]=\"val\"></kui-decimal-value>\n                    <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\"\n                                        [valueObject]=\"val\"></kui-geometry-value>\n                    <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\"></kui-uri-value>\n                    <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\"\n                                       [valueObject]=\"val\"></kui-boolean-value>\n                    <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\"\n                                        [valueObject]=\"val\"></kui-interval-value>\n                    <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\"></kui-list-value>\n                    <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\"\n                                        [valueObject]=\"val\"></kui-textfile-value>\n                    <span *ngSwitchDefault=\"\">Not supported {{val.getClassName()}}</span>\n                </span>\n            </mat-list-item>\n        </mat-list>\n    </div>\n  \n  </mat-card>\n  -->\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:720px;margin:0 auto}.resource-view .resource .media{width:720px;height:calc(720px / (4 / 3))}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:'-    '}.property .property-value-item li.lastItem{margin-bottom:12px}.app-link:hover{background-color:#f1f1f1}@media (max-width:576px){.resource-view .resource .media{width:auto}}"]
            }),
            __metadata("design:paramtypes", [router.ActivatedRoute,
                router.Router,
                core$1.ResourceService,
                core$1.IncomingService])
        ], ResourceViewComponent);
        return ResourceViewComponent;
    }());

    var TableViewComponent = /** @class */ (function () {
        function TableViewComponent() {
            this.KnoraConstants = core$1.KnoraConstants;
        }
        TableViewComponent.prototype.ngOnInit = function () {
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TableViewComponent.prototype, "result", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TableViewComponent.prototype, "ontologyInfo", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TableViewComponent.prototype, "isLoading", void 0);
        TableViewComponent = __decorate([
            core.Component({
                selector: 'kui-table-view',
                template: "<p>\n  table-view works!\n</p>\n",
                styles: [""]
            }),
            __metadata("design:paramtypes", [])
        ], TableViewComponent);
        return TableViewComponent;
    }());

    /**
     * The search-results gets the search mode and parameters from routes or inputs,
     * and returns the corresponding resources that are displayed in a list or a grid.
     * The results can be filtered by project.
     */
    var SearchResultsComponent = /** @class */ (function () {
        function SearchResultsComponent(_route, _searchService, _searchParamsService, _router) {
            var _this = this;
            this._route = _route;
            this._searchService = _searchService;
            this._searchParamsService = _searchParamsService;
            this._router = _router;
            /**
             *
             * @param  {boolean} [complexView] If true it shows 2 ways to display the search results: list or grid.
             *
             */
            this.complexView = false;
            this.KnoraConstants = core$1.KnoraConstants;
            this.offset = 0;
            this.maxOffset = 0;
            this.result = [];
            // rerender: boolean = false;
            this.badRequest = false;
            this.loading = true;
            this.errorMessage = new core$1.ApiServiceError();
            this.pagingLimit = 25;
            /**
             *
             * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
             * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
             * @ignore
             *
             * @param {ReadResourcesSequence} searchResult the answer to a search request.
             */
            this.processSearchResults = function (searchResult) {
                // assign ontology information to a variable so it can be used in the component's template
                if (_this.ontologyInfo === undefined) {
                    // init ontology information
                    _this.ontologyInfo = searchResult.ontologyInformation;
                }
                else {
                    // update ontology information
                    _this.ontologyInfo.updateOntologyInformation(searchResult.ontologyInformation);
                }
                // append results to search results
                _this.result = _this.result.concat(searchResult.resources);
                // console.log('search results', this.result);
                _this.loading = false;
                // this.rerender = false;
            };
            /**
             * Shows total number of results returned by a count query.
             * @ignore
             *
             * @param {ApiServiceResult} countQueryResult the response to a count query.
             */
            this.showNumberOfAllResults = function (countQueryResult) {
                _this.numberOfAllResults = countQueryResult.numberOfResults;
                if (_this.numberOfAllResults > 0) {
                    // offset is 0-based
                    // if numberOfAllResults equals the pagingLimit, the max. offset is 0
                    _this.maxOffset = Math.floor((_this.numberOfAllResults - 1) / _this.pagingLimit);
                }
                else {
                    _this.maxOffset = 0;
                }
            };
        }
        SearchResultsComponent.prototype.ngOnInit = function () {
        };
        SearchResultsComponent.prototype.ngOnChanges = function () {
            var _this = this;
            this._route.paramMap.subscribe(function (params) {
                // get the search mode
                if (!_this.searchMode) {
                    _this.searchMode = params.get('mode');
                }
                // get the project iri
                if (params.get('project') && (_this.projectIri !== decodeURIComponent(params.get('project')))) {
                    _this.projectIri = decodeURIComponent(params.get('project'));
                }
                // init offset  and result
                _this.offset = 0;
                _this.result = [];
                // get query params depending on the search mode
                if (_this.searchMode === 'fulltext') {
                    _this.searchQuery = params.get('q');
                    _this.badRequest = _this.searchQuery.length < 3;
                }
                else if (_this.searchMode === 'extended') {
                    _this.gravsearchGenerator = _this._searchParamsService.getSearchParams();
                    if (!_this.searchQuery) {
                        _this.generateGravsearchQuery();
                    }
                    else {
                        _this.gravSearchQuery = _this.searchQuery;
                    }
                }
                // get results
                // this.rerender = true;
                _this.getResult();
            });
        };
        /**
         * Generates the Gravsearch query for the current offset.
         * @ignore
         */
        SearchResultsComponent.prototype.generateGravsearchQuery = function () {
            var gravsearch = this.gravsearchGenerator.generateGravsearch(this.offset);
            if (gravsearch === false) {
                // no valid search params (application has been reloaded)
                // go to root
                this._router.navigate([''], { relativeTo: this._route });
                return;
            }
            else {
                this.gravSearchQuery = gravsearch;
            }
        };
        /**
         * Get search result from Knora - 2 cases: simple search and extended search
         * @ignore
         */
        SearchResultsComponent.prototype.getResult = function () {
            var _this = this;
            this.loading = true;
            // reset the error message
            this.errorMessage = undefined;
            // FULLTEXT SEARCH
            if (this.searchMode === 'fulltext') {
                // this.rerender = true;
                if (this.badRequest) {
                    this.errorMessage = new core$1.ApiServiceError();
                    this.errorMessage.errorInfo =
                        'A search value is expected to have at least length of 3 characters.';
                    this.loading = false;
                    // this.rerender = false;
                }
                else {
                    var searchParams = void 0;
                    if (this.projectIri !== undefined) {
                        searchParams = { limitToProject: this.projectIri };
                    }
                    if (this.offset === 0) {
                        // perform count query
                        this._searchService
                            .doFullTextSearchCountQueryCountQueryResult(this.searchQuery, searchParams)
                            .subscribe(this.showNumberOfAllResults, function (error) {
                            _this.errorMessage = error;
                        });
                    }
                    // perform full text search
                    this._searchService
                        .doFullTextSearchReadResourceSequence(this.searchQuery, this.offset, searchParams)
                        .subscribe(this.processSearchResults, // function pointer
                    function (error) {
                        _this.errorMessage = error;
                        console.log('error', error);
                        console.log('message', _this.errorMessage);
                    });
                }
                // EXTENDED SEARCH
            }
            else if (this.searchMode === 'extended') {
                // perform count query
                if (this.offset === 0) {
                    this._searchService
                        .doExtendedSearchCountQueryCountQueryResult(this.gravSearchQuery)
                        .subscribe(this.showNumberOfAllResults, function (error) {
                        _this.errorMessage = error;
                    });
                }
                this._searchService
                    .doExtendedSearchReadResourceSequence(this.gravSearchQuery)
                    .subscribe(this.processSearchResults, // function pointer
                function (error) {
                    _this.errorMessage = error;
                });
            }
            else {
                this.errorMessage = new core$1.ApiServiceError();
                this.errorMessage.errorInfo = "search mode invalid: " + this.searchMode;
            }
        };
        /**
         * Loads the next page of results.
         * The results will be appended to the existing ones.
         * @ignore
         *
         * @param {number} offset
         * @returns void
         */
        SearchResultsComponent.prototype.loadMore = function (offset) {
            // update the page offset when the end of scroll is reached to get the next page of search results
            if (this.offset < this.maxOffset) {
                this.offset++;
            }
            else {
                return;
            }
            if (this.searchMode === 'extended') {
                this.generateGravsearchQuery();
            }
            this.getResult();
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SearchResultsComponent.prototype, "complexView", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SearchResultsComponent.prototype, "searchQuery", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SearchResultsComponent.prototype, "searchMode", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SearchResultsComponent.prototype, "projectIri", void 0);
        SearchResultsComponent = __decorate([
            core.Component({
                selector: 'kui-search-results',
                template: "<kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n<div *ngIf=\"!loading && !badRequest\">\n\n    <div *ngIf=\"numberOfAllResults !== 0 && result; else noResult\">\n\n        <mat-tab-group animationDuration=\"0ms\" [selectedIndex]=\"1\">\n            <mat-tab disabled>\n                <ng-template mat-tab-label>\n                    <!-- <mat-icon class=\"tab-icon\">hashtag</mat-icon> -->\n                    <h4 class=\"search-results-title\">Results: {{numberOfAllResults}}</h4>\n                </ng-template>\n            </mat-tab>\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_list</mat-icon>\n                    List\n                </ng-template>\n                <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-list-view>\n            </mat-tab>\n\n            <!-- in caase of complexView: show tab to switch to grid view -->\n            <mat-tab *ngIf=\"complexView\">\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_module</mat-icon>\n                    Grid\n                </ng-template>\n                <kui-grid-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-grid-view>\n            </mat-tab>\n            <!-- not yet implemented! --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">table_chart</mat-icon>\n                    Table\n                </ng-template>\n                <kui-table-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\">\n                </kui-table-view>\n            </mat-tab>\n            -->\n\n            <!-- the following tab we don't need anymore? The GravSearch view will be part of the export menu --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">code</mat-icon>\n                    Gravsearch\n                </ng-template>\n                <kui-gravsearch-view></kui-gravsearch-view>\n            </mat-tab>\n            -->\n\n        </mat-tab-group>\n        <!-- <div>\n            <p>List view n\u00B02</p>\n            <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\" *ngIf=\"!complexView\"></kui-list-view>\n        </div> -->\n\n        <div class=\"load-panel\" *ngIf=\"result.length > 0\">\n            <button mat-flat-button color=\"primary\" class=\"link center\" (click)=\"loadMore(offset)\"\n                    *ngIf=\"offset < maxOffset\">Load more\n                <mat-icon>keyboard_arrow_down</mat-icon>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- In case of 0 result -->\n    <ng-template #noResult>\n        <kui-message [message]=\"{status: 404, statusMsg: 'No results', statusText: 'Sorry, but we couldn\\'t find any results matching your search'}\"\n                     [medium]=\"true\"></kui-message>\n        <!-- <p><strong>No result</strong></p> -->\n    </ng-template>\n\n</div>\n\n<!-- Error message -->\n<kui-message *ngIf=\"errorMessage\" [message]=\"{status: 400, statusText: errorMessage.errorInfo}\" [medium]=\"true\">\n</kui-message>\n",
                styles: [".load-panel{width:100%}.load-panel .center{display:block;line-height:24px;margin:12px auto}.tab-icon{margin-right:8px}"]
            }),
            __metadata("design:paramtypes", [router.ActivatedRoute,
                core$1.SearchService,
                core$1.SearchParamsService,
                router.Router])
        ], SearchResultsComponent);
        return SearchResultsComponent;
    }());

    var KuiViewerModule = /** @class */ (function () {
        function KuiViewerModule() {
        }
        KuiViewerModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    core$1.KuiCoreModule,
                    action.KuiActionModule,
                    autocomplete.MatAutocompleteModule,
                    button.MatButtonModule,
                    card.MatCardModule,
                    checkbox.MatCheckboxModule,
                    datepicker.MatDatepickerModule,
                    expansion.MatExpansionModule,
                    formField.MatFormFieldModule,
                    input.MatInputModule,
                    icon.MatIconModule,
                    list.MatListModule,
                    core$2.MatNativeDateModule,
                    slideToggle.MatSlideToggleModule,
                    tabs.MatTabsModule,
                    toolbar.MatToolbarModule,
                    tooltip.MatTooltipModule,
                    forms.ReactiveFormsModule,
                    flexLayout.FlexLayoutModule
                ],
                declarations: [
                    AnnotationComponent,
                    AudioComponent,
                    CollectionComponent,
                    DddComponent,
                    DocumentComponent,
                    LinkObjComponent,
                    MovingImageComponent,
                    ObjectComponent,
                    RegionComponent,
                    StillImageComponent,
                    TextComponent,
                    TextValueAsHtmlComponent,
                    TextValueAsStringComponent,
                    TextValueAsXmlComponent,
                    TextfileValueComponent,
                    DateValueComponent,
                    IntegerValueComponent,
                    ColorValueComponent,
                    DecimalValueComponent,
                    UriValueComponent,
                    BooleanValueComponent,
                    GeometryValueComponent,
                    GeonameValueComponent,
                    IntervalValueComponent,
                    ListValueComponent,
                    LinkValueComponent,
                    ExternalResValueComponent,
                    ListViewComponent,
                    GridViewComponent,
                    TableViewComponent,
                    ResourceViewComponent,
                    CompareViewComponent,
                    GraphViewComponent,
                    PropertiesViewComponent,
                    SearchResultsComponent
                ],
                exports: [
                    AnnotationComponent,
                    AudioComponent,
                    CollectionComponent,
                    DddComponent,
                    DocumentComponent,
                    LinkObjComponent,
                    MovingImageComponent,
                    ObjectComponent,
                    RegionComponent,
                    StillImageComponent,
                    TextComponent,
                    TextValueAsHtmlComponent,
                    TextValueAsStringComponent,
                    TextValueAsXmlComponent,
                    TextfileValueComponent,
                    DateValueComponent,
                    IntegerValueComponent,
                    ColorValueComponent,
                    DecimalValueComponent,
                    UriValueComponent,
                    BooleanValueComponent,
                    GeometryValueComponent,
                    GeonameValueComponent,
                    IntervalValueComponent,
                    ListValueComponent,
                    LinkValueComponent,
                    ExternalResValueComponent,
                    ListViewComponent,
                    GridViewComponent,
                    TableViewComponent,
                    ResourceViewComponent,
                    CompareViewComponent,
                    GraphViewComponent,
                    PropertiesViewComponent,
                    SearchResultsComponent
                ]
            })
        ], KuiViewerModule);
        return KuiViewerModule;
    }());

    exports.AnnotationComponent = AnnotationComponent;
    exports.AudioComponent = AudioComponent;
    exports.BooleanValueComponent = BooleanValueComponent;
    exports.CollectionComponent = CollectionComponent;
    exports.ColorValueComponent = ColorValueComponent;
    exports.CompareViewComponent = CompareViewComponent;
    exports.DateValueComponent = DateValueComponent;
    exports.DddComponent = DddComponent;
    exports.DecimalValueComponent = DecimalValueComponent;
    exports.DocumentComponent = DocumentComponent;
    exports.ExternalResValueComponent = ExternalResValueComponent;
    exports.GeometryForRegion = GeometryForRegion;
    exports.GeometryValueComponent = GeometryValueComponent;
    exports.GeonameValueComponent = GeonameValueComponent;
    exports.GraphViewComponent = GraphViewComponent;
    exports.GridViewComponent = GridViewComponent;
    exports.ImageRegion = ImageRegion;
    exports.IntegerValueComponent = IntegerValueComponent;
    exports.IntervalValueComponent = IntervalValueComponent;
    exports.KuiViewerModule = KuiViewerModule;
    exports.LinkObjComponent = LinkObjComponent;
    exports.LinkValueComponent = LinkValueComponent;
    exports.ListValueComponent = ListValueComponent;
    exports.ListViewComponent = ListViewComponent;
    exports.MovingImageComponent = MovingImageComponent;
    exports.ObjectComponent = ObjectComponent;
    exports.PropertiesViewComponent = PropertiesViewComponent;
    exports.RegionComponent = RegionComponent;
    exports.ResourceViewComponent = ResourceViewComponent;
    exports.SearchResultsComponent = SearchResultsComponent;
    exports.StillImageComponent = StillImageComponent;
    exports.StillImageRepresentation = StillImageRepresentation;
    exports.TableViewComponent = TableViewComponent;
    exports.TextComponent = TextComponent;
    exports.TextValueAsHtmlComponent = TextValueAsHtmlComponent;
    exports.TextValueAsStringComponent = TextValueAsStringComponent;
    exports.TextValueAsXmlComponent = TextValueAsXmlComponent;
    exports.TextfileValueComponent = TextfileValueComponent;
    exports.UriValueComponent = UriValueComponent;
    exports.ɵa = AnnotationComponent;
    exports.ɵb = AudioComponent;
    exports.ɵba = ExternalResValueComponent;
    exports.ɵbb = ListViewComponent;
    exports.ɵbc = GridViewComponent;
    exports.ɵbd = TableViewComponent;
    exports.ɵbe = ResourceViewComponent;
    exports.ɵbf = CompareViewComponent;
    exports.ɵbg = GraphViewComponent;
    exports.ɵbh = PropertiesViewComponent;
    exports.ɵbi = SearchResultsComponent;
    exports.ɵc = CollectionComponent;
    exports.ɵd = DddComponent;
    exports.ɵe = DocumentComponent;
    exports.ɵf = LinkObjComponent;
    exports.ɵg = MovingImageComponent;
    exports.ɵh = ObjectComponent;
    exports.ɵi = RegionComponent;
    exports.ɵj = StillImageComponent;
    exports.ɵk = TextComponent;
    exports.ɵl = TextValueAsHtmlComponent;
    exports.ɵm = TextValueAsStringComponent;
    exports.ɵn = TextValueAsXmlComponent;
    exports.ɵo = TextfileValueComponent;
    exports.ɵp = DateValueComponent;
    exports.ɵq = IntegerValueComponent;
    exports.ɵr = ColorValueComponent;
    exports.ɵs = DecimalValueComponent;
    exports.ɵt = UriValueComponent;
    exports.ɵu = BooleanValueComponent;
    exports.ɵv = GeometryValueComponent;
    exports.ɵw = GeonameValueComponent;
    exports.ɵx = IntervalValueComponent;
    exports.ɵy = ListValueComponent;
    exports.ɵz = LinkValueComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=knora-viewer.umd.js.map
