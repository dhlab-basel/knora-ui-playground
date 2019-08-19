import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { KnoraConstants, Point2D } from '@knora/core';
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
        return this.regionResource.properties[KnoraConstants.hasGeometry];
    };
    return ImageRegion;
}());
export { ImageRegion };
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
export { StillImageRepresentation };
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
export { GeometryForRegion };
/**
 * This component creates a OpenSeadragon viewer instance.
 * Accepts an array of ReadResource containing (among other resources) ReadStillImageFileValues to be rendered.
 * @member resources - resources containing (among other resources) the StillImageFileValues and incoming regions to be rendered. (Use as angular @Input data binding property.)
 */
var StillImageComponent = /** @class */ (function () {
    function StillImageComponent(elementRef) {
        this.elementRef = elementRef;
        this.currentImageIndex = new EventEmitter();
        this.regionHovered = new EventEmitter();
        this.regions = {};
    }
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
            for (var imagesToDisplay_1 = tslib_1.__values(imagesToDisplay), imagesToDisplay_1_1 = imagesToDisplay_1.next(); !imagesToDisplay_1_1.done; imagesToDisplay_1_1 = imagesToDisplay_1.next()) {
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
            // this.currentImageIri.emit(this.images[this.viewer.currentPage()].stillImageFileValue.id);
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
        if (this.viewer) {
            // console.log(this.viewer);
            //            this.currentImageIndex.emit(this.viewer.currentPage());
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
                for (var activeRegion_1 = tslib_1.__values(activeRegion), activeRegion_1_1 = activeRegion_1.next(); !activeRegion_1_1.done; activeRegion_1_1 = activeRegion_1.next()) {
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
                    for (var _b = tslib_1.__values(this.regions[reg]), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        var fileValues = this.images.map(function (img) {
            return img.stillImageFileValue;
        });
        this.viewer.addHandler('page', function (event) {
            console.log('event on page', event);
            console.log('Now on page', event.page);
            var index = event.page;
            console.log('= id', fileValues[index].id);
            var id = fileValues[index].id;
            // return id;
        });
        //
        // this.currentImageIri.emit(this.viewer.getCurrentImage());
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
        var tileSources = StillImageComponent.prepareTileSourcesFromFileValues(fileValues);
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
                    for (var _b = tslib_1.__values(this.regions[reg]), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                    var surf1 = StillImageComponent.surfaceOfRectangularRegion(geom1.geometry);
                    var surf2 = StillImageComponent.surfaceOfRectangularRegion(geom2.geometry);
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
                for (var geometries_1 = tslib_1.__values(geometries), geometries_1_1 = geometries_1.next(); !geometries_1_1.done; geometries_1_1 = geometries_1.next()) {
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
            for (var _b = tslib_1.__values(this.images), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        var positionUL = new Point2D(Math.min(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        var positionLR = new Point2D(Math.max(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
        var positionUR = new Point2D(Math.max(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        var positionLL = new Point2D(Math.min(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
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
            return new Point2D(point.x + xOffset, point.y * aspectRatio);
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
    StillImageComponent.prototype.getCurrentImage = function () {
    };
    StillImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-still-image',
                    template: "<div class=\"still-image-viewer\">\n    <div class=\"navigation left\">\n        <button mat-button class=\"full-size\" id=\"KUI_OSD_PREV_PAGE\">\n            <mat-icon>keyboard_arrow_left</mat-icon>\n        </button>\n    </div>\n\n    <!-- main content with navigation and osd viewer -->\n    <div class=\"content\">\n\n        <!-- openseadragon (osd) viewer -->\n        <div class=\"osd-container\"></div>\n        <!-- /openseadragon (osd) -->\n\n        <!-- footer with image caption e.g. copyright information -->\n        <div class=\"footer\">\n            <p class=\"mat-caption\" [innerHtml]=\"imageCaption\"></p>\n        </div>\n\n        <!-- action panel with tools for image -->\n        <mat-toolbar class=\"action\">\n            <mat-toolbar-row>\n                <!-- home button -->\n                <span>\n                    <button mat-icon-button id=\"KUI_OSD_HOME\">\n                        <mat-icon>home</mat-icon>\n                    </button>\n                </span>\n                <!-- zoom buttons -->\n                <span class=\"fill-remaining-space\"></span>\n                <span>\n                    <button mat-icon-button id=\"KUI_OSD_ZOOM_IN\">\n                        <mat-icon>add</mat-icon>\n                    </button>\n                    <button mat-icon-button id=\"KUI_OSD_ZOOM_OUT\">\n                        <mat-icon>remove</mat-icon>\n                    </button>\n                </span>\n                <!-- window button -->\n                <span class=\"fill-remaining-space\"></span>\n                <span>\n                    <button mat-icon-button id=\"KUI_OSD_FULL_PAGE\">\n                        <mat-icon>fullscreen</mat-icon>\n                    </button>\n                </span>\n            </mat-toolbar-row>\n        </mat-toolbar>\n\n    </div>\n\n    <div class=\"navigation\">\n        <button mat-button class=\"full-size\" id=\"KUI_OSD_NEXT_PAGE\" (click)=\"getCurrentImage()\">\n            <mat-icon>keyboard_arrow_right</mat-icon>\n        </button>\n    </div>\n\n</div>\n\n<!-- simple image viewer e.g. as a preview -->\n<!-- TODO: handle images array -->\n<!--<img *ngIf=\"simple && images?.length === 1; else osdViewer\" [src]=\"simpleImageExample\">-->\n\n\n<!--\n    <div>\n        <span *ngIf=\"images.length > 1\" (click)=\"gotoLeft()\">&lt;&lt;</span>\n        <span *ngIf=\"images.length > 1\" (click)=\"gotoRight()\">&gt;&gt;</span>\n    </div>\n-->\n",
                    styles: [".still-image-viewer{display:inline-flex;height:400px;max-width:800px;width:100%}@media (max-height:636px){.still-image-viewer{height:300px}}.still-image-viewer .navigation{height:calc(400px + 64px + 24px);width:36px}.still-image-viewer .navigation .mat-button.full-size{height:100%!important;width:36px!important;padding:0!important;min-width:36px!important}.still-image-viewer .content{height:calc(400px + 64px + 24px);max-width:calc(800px - (2 * 36px));width:calc(100% - (2 * 36px))}.still-image-viewer .content .osd-container{color:#ccc;background-color:#000;height:400px}.still-image-viewer .content .osd-container.fullscreen{max-width:100vw}.still-image-viewer .content .footer p{color:#ccc;background-color:#000;height:24px;margin:0;padding:0 16px}/deep/ .roi-svgoverlay{opacity:.4;fill:transparent;stroke:#00695c;stroke-width:2px;vector-effect:non-scaling-stroke}.roi-svgoverlay:focus,/deep/ .roi-svgoverlay:hover{opacity:1}/deep/ .roi-svgoverlay.active{opacity:1}"]
                }] }
    ];
    /** @nocollapse */
    StillImageComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    StillImageComponent.propDecorators = {
        images: [{ type: Input }],
        imageCaption: [{ type: Input }],
        activateRegion: [{ type: Input }],
        currentImageIndex: [{ type: Output }],
        regionHovered: [{ type: Output }]
    };
    return StillImageComponent;
}());
export { StillImageComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpbGwtaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9yZXNvdXJjZS9zdGlsbC1pbWFnZS9zdGlsbC1pbWFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQWdGLE1BQU0sYUFBYSxDQUFDO0FBV3BJOzs7R0FHRztBQUNIO0lBRUk7OztPQUdHO0lBQ0gscUJBQXNCLGNBQTRCO1FBQTVCLG1CQUFjLEdBQWQsY0FBYyxDQUFjO0lBRWxELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsbUNBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBb0IsQ0FBQztJQUN6RixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDOztBQUVEOztHQUVHO0FBQ0g7SUFFSTs7OztPQUlHO0lBQ0gsa0NBQXNCLG1CQUE0QyxFQUFXLE9BQWlCO1FBQXhFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBeUI7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFVO0lBRTlGLENBQUM7SUFFTCwrQkFBQztBQUFELENBQUMsQUFYRCxJQVdDOztBQUVEOztHQUVHO0FBQ0g7SUFFSTs7OztPQUlHO0lBQ0gsMkJBQXNCLFFBQXdCLEVBQVcsTUFBb0I7UUFBdkQsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFBVyxXQUFNLEdBQU4sTUFBTSxDQUFjO0lBQzdFLENBQUM7SUFFTCx3QkFBQztBQUFELENBQUMsQUFWRCxJQVVDOztBQVdEOzs7O0dBSUc7QUFDSDtJQWdGSSw2QkFBcUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXJFakMsc0JBQWlCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDckUsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRzdDLFlBQU8sR0FBc0IsRUFBRSxDQUFDO0lBa0V4QyxDQUFDO0lBaEVEOzs7OztPQUtHO0lBQ1ksOENBQTBCLEdBQXpDLFVBQTBDLElBQW9CO1FBRTFELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ3hFLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFFRCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RHLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNZLG9EQUFnQyxHQUEvQyxVQUFnRCxlQUEwQzs7UUFDdEYsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7O1lBRXZCLEtBQW9CLElBQUEsb0JBQUEsaUJBQUEsZUFBZSxDQUFBLGdEQUFBLDZFQUFFO2dCQUFoQyxJQUFNLEtBQUssNEJBQUE7Z0JBQ1osSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO2dCQUM5RSxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUN6QixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUUxQix1SEFBdUg7Z0JBQ3ZILFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ2IsdURBQXVEO29CQUN2RCxxREFBcUQ7b0JBQ3JELGdFQUFnRTtvQkFDaEUsWUFBWSxFQUFFO3dCQUNWLFVBQVUsRUFBRSx5Q0FBeUM7d0JBQ3JELEtBQUssRUFBRSxZQUFZO3dCQUNuQixRQUFRLEVBQUUsTUFBTTt3QkFDaEIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsU0FBUyxFQUFFLENBQUMsd0NBQXdDLENBQUM7d0JBQ3JELFVBQVUsRUFBRSwwQkFBMEI7d0JBQ3RDLE9BQU8sRUFBRSxDQUFDO2dDQUNOLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2dDQUNwQyxPQUFPLEVBQUUsSUFBSTs2QkFDaEIsQ0FBQztxQkFDTDtvQkFDRCxHQUFHLEVBQUUsWUFBWTtvQkFDakIsR0FBRyxFQUFFLFlBQVk7aUJBQ3BCLENBQUMsQ0FBQztnQkFFSCxZQUFZLEVBQUUsQ0FBQzthQUNsQjs7Ozs7Ozs7O1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUtELHlDQUFXLEdBQVgsVUFBWSxPQUF3QztRQUNoRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLDRGQUE0RjtTQUMvRjtRQUNELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDN0M7U0FDSjthQUFNLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDN0M7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLDRCQUE0QjtZQUM1QixxRUFBcUU7U0FDeEU7SUFDTCxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLHFEQUFxRDtJQUN6RCxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDJDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDZDQUFlLEdBQXZCLFVBQXdCLFNBQVM7O1FBRTdCLElBQU0sWUFBWSxHQUF3QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTs7Z0JBQzVCLEtBQWtCLElBQUEsaUJBQUEsaUJBQUEsWUFBWSxDQUFBLDBDQUFBLG9FQUFFO29CQUEzQixJQUFNLEdBQUcseUJBQUE7b0JBQ1YsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztpQkFDdEQ7Ozs7Ozs7OztTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNLLG1EQUFxQixHQUE3Qjs7UUFFSSxLQUFLLElBQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7b0JBQ2xDLEtBQWtCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO3dCQUFoQyxJQUFNLEdBQUcsV0FBQTt3QkFDVixHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO3FCQUMvQzs7Ozs7Ozs7O2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLHlDQUFXLEdBQW5CO1FBQ0ksSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsSUFBTSxVQUFVLEdBQUc7WUFDZixPQUFPLEVBQUUsZUFBZTtZQUN4QixZQUFZLEVBQUUsSUFBSTtZQUNsQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsYUFBYSxFQUFFLGtCQUFrQjtZQUNqQyxjQUFjLEVBQUUsbUJBQW1CO1lBQ25DLFVBQVUsRUFBRSxtQkFBbUI7WUFDL0IsVUFBVSxFQUFFLGNBQWM7WUFDMUIsY0FBYyxFQUFFLG1CQUFtQjtZQUNuQyxnQkFBZ0IsRUFBRSxxQkFBcUI7WUFDdkMsaUJBQWlCLEVBQUUsc0JBQXNCLENBQU8sbUJBQW1CO1NBQ3RFLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxJQUFJO1lBQ2hELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0gsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQUk7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQU0sVUFBVSxHQUE4QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDekQsVUFBQyxHQUFHO1lBQ0EsT0FBTyxHQUFHLENBQUMsbUJBQW1CLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxLQUFLO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFNLEtBQUssR0FBVyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRWhDLGFBQWE7UUFFakIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFO1FBRUYsNERBQTREO0lBR2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSyx3Q0FBVSxHQUFsQjtRQUNJLHlIQUF5SDtRQUN6SCxzSEFBc0g7UUFDdEgsMkVBQTJFO1FBRTNFLElBQU0sVUFBVSxHQUE4QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDekQsVUFBQyxHQUFHO1lBQ0EsT0FBTyxHQUFHLENBQUMsbUJBQW1CLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFUCxnREFBZ0Q7UUFDaEQsSUFBTSxXQUFXLEdBQWEsbUJBQW1CLENBQUMsZ0NBQWdDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWxDLENBQUM7SUFFRDs7T0FFRztJQUNLLDRDQUFjLEdBQXRCOztRQUVJLEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztvQkFDbEMsS0FBa0IsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7d0JBQWhDLElBQU0sR0FBRyxXQUFBO3dCQUNWLElBQUksR0FBRyxZQUFZLGlCQUFpQixFQUFFOzRCQUNsQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7eUJBQ2hCO3FCQUNKOzs7Ozs7Ozs7YUFDSjtTQUNKO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbEIsOERBQThEO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssMkNBQWEsR0FBckI7UUFBQSxpQkF5REM7O1FBdkRHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyx1RUFBdUU7Z0NBRWxGLEtBQUs7O1lBQ1osSUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0RixnREFBZ0Q7WUFDaEQsSUFBTSxVQUFVLEdBQXdCLEVBQUUsQ0FBQztZQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7Z0JBRWxCLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3pDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7b0JBQ1gsSUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFFNUUsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILDZDQUE2QztZQUM3QyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUs7Z0JBRXpCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtvQkFFNUUsSUFBTSxLQUFLLEdBQUcsbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3RSxJQUFNLEtBQUssR0FBRyxtQkFBbUIsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRTdFLHlDQUF5QztvQkFDekMsd0RBQXdEO29CQUN4RCxJQUFJLEtBQUssR0FBRyxLQUFLLEVBQUU7d0JBQ2YsT0FBTyxDQUFDLENBQUM7cUJBQ1o7eUJBQU07d0JBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDYjtpQkFFSjtxQkFBTTtvQkFDSCxPQUFPLENBQUMsQ0FBQztpQkFDWjtZQUdMLENBQUMsQ0FBQyxDQUFDOztnQkFFSCxzQ0FBc0M7Z0JBQ3RDLEtBQW1CLElBQUEsZUFBQSxpQkFBQSxVQUFVLENBQUEsc0NBQUEsOERBQUU7b0JBQTFCLElBQU0sSUFBSSx1QkFBQTtvQkFFWCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUMvQixPQUFLLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBRWpHOzs7Ozs7Ozs7WUFFRCxZQUFZLEVBQUUsQ0FBQzs7OztZQWhEbkIsS0FBb0IsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxNQUFNLENBQUEsZ0JBQUE7Z0JBQTFCLElBQU0sS0FBSyxXQUFBO3dCQUFMLEtBQUs7YUFpRGY7Ozs7Ozs7OztJQUVMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssOENBQWdCLEdBQXhCLFVBQXlCLFNBQWlCLEVBQUUsUUFBd0IsRUFBRSxXQUFtQixFQUFFLE9BQWUsRUFBRSxPQUFlO1FBQTNILGlCQTBDQztRQXpDRyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3JDLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFFckMsSUFBSSxVQUFVLENBQUM7UUFDZixRQUFRLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSyxXQUFXO2dCQUNaLFVBQVUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLDRCQUE0QixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUUsb0RBQW9EO2dCQUNySSxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNFLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsVUFBVSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQy9FLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDekUsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxVQUFVLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDOUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RSxNQUFNO1lBQ1Y7Z0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyw4RUFBOEUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVHLE9BQU87U0FDZDtRQUNELFVBQVUsQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUMxRCxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25ELFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxTQUFTLEdBQUcsa0JBQWtCLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBRWxHLDBDQUEwQztRQUMxQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQ2pDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVWLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakYsUUFBUSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFL0IsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RSxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFakMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaURBQWlEO1FBRXZGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyx1REFBeUIsR0FBakMsVUFBa0MsVUFBc0IsRUFBRSxRQUF3QixFQUFFLFdBQW1CLEVBQUUsT0FBZTtRQUNwSCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsdUhBQXVIO1FBQ3ZILHVKQUF1SjtRQUN2SixJQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFNLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzRixJQUFNLE1BQU0sR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hGLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzRSxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0sscURBQXVCLEdBQS9CLFVBQWdDLFVBQXNCLEVBQUUsUUFBd0IsRUFBRSxXQUFtQixFQUFFLE9BQWU7UUFDbEgsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pGLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzRSxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssb0RBQXNCLEdBQTlCLFVBQStCLFVBQXNCLEVBQUUsUUFBd0IsRUFBRSxXQUFtQixFQUFFLE9BQWU7UUFDakgsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pGLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4Qyw0R0FBNEc7UUFDNUcsdUhBQXVIO1FBQ3ZILGdGQUFnRjtRQUNoRixtSUFBbUk7UUFDbkksSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxHQUFHLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUksVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyxrREFBb0IsR0FBNUIsVUFBNkIsTUFBaUIsRUFBRSxXQUFtQixFQUFFLE9BQWU7UUFDaEYsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztZQUNwQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDZEQUErQixHQUF2QyxVQUF3QyxNQUFpQjtRQUNyRCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxJQUFNLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDcEIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxQixZQUFZLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsWUFBWSxJQUFJLEdBQUcsQ0FBQztnQkFDcEIsWUFBWSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLFlBQVksSUFBSSxHQUFHLENBQUM7YUFDdkI7U0FDSjtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCw2Q0FBZSxHQUFmO0lBRUEsQ0FBQzs7Z0JBNWRKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQiwwNkVBQTJDOztpQkFFOUM7Ozs7Z0JBckZtQixVQUFVOzs7eUJBd0Z6QixLQUFLOytCQUNMLEtBQUs7aUNBQ0wsS0FBSztvQ0FFTCxNQUFNO2dDQUNOLE1BQU07O0lBaWRYLDBCQUFDO0NBQUEsQUE3ZEQsSUE2ZEM7U0F4ZFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMsIFBvaW50MkQsIFJlYWRHZW9tVmFsdWUsIFJlYWRSZXNvdXJjZSwgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsIFJlZ2lvbiwgUmVnaW9uR2VvbWV0cnkgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cblxuLy8gVGhpcyBjb21wb25lbnQgbmVlZHMgdGhlIG9wZW5zZWFkcmFnb24gbGlicmFyeSBpdHNlbGYsIGFzIHdlbGwgYXMgdGhlIG9wZW5zZWFkcmFnb24gcGx1Z2luIG9wZW5zZWFkcmFnb24tc3ZnLW92ZXJsYXlcbi8vIEJvdGggbGlicmFyaWVzIGFyZSBpbnN0YWxsZWQgdmlhIHBhY2thZ2UuanNvbiwgYW5kIGxvYWRlZCBnbG9iYWxseSB2aWEgdGhlIHNjcmlwdCB0YWcgaW4gLmFuZ3VsYXItY2xpLmpzb25cblxuLy8gT3BlblNlYWRyYWdvbiBkb2VzIG5vdCBleHBvcnQgaXRzZWxmIGFzIEVTNi9FQ01BMjAxNSBtb2R1bGUsXG4vLyBpdCBpcyBsb2FkZWQgZ2xvYmFsbHkgaW4gc2NyaXB0cyB0YWcgb2YgYW5ndWxhci1jbGkuanNvbixcbi8vIHdlIHN0aWxsIG5lZWQgdG8gZGVjbGFyZSB0aGUgbmFtZXNwYWNlIHRvIG1ha2UgVHlwZVNjcmlwdCBjb21waWxlciBoYXBweS5cbmRlY2xhcmUgbGV0IE9wZW5TZWFkcmFnb246IGFueTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVnaW9uLlxuICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIHJlc291cmNlIHJlcHJlc2VudGluZyB0aGUgcmVnaW9uIGFuZCBpdHMgZ2VvbWV0cmllcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEltYWdlUmVnaW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlZ2lvblJlc291cmNlIGEgcmVzb3VyY2Ugb2YgdHlwZSBSZWdpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgcmVnaW9uUmVzb3VyY2U6IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW9tZXRyeSBpbmZvcm1hdGlvbiBiZWxvbmdpbmcgdG8gdGhpcyByZWdpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGdldEdlb21ldHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lvblJlc291cmNlLnByb3BlcnRpZXNbS25vcmFDb25zdGFudHMuaGFzR2VvbWV0cnldIGFzIFJlYWRHZW9tVmFsdWVbXTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbWFnZSBpbmNsdWRpbmcgaXRzIHJlZ2lvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGlsbEltYWdlUmVwcmVzZW50YXRpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RpbGxJbWFnZUZpbGVWYWx1ZSBhIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXSByZXByZXNlbnRpbmcgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIHJlZ2lvbnMgdGhlIHJlZ2lvbnMgYmVsb25naW5nIHRvIHRoZSBpbWFnZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsIHJlYWRvbmx5IHJlZ2lvbnM6IFJlZ2lvbltdKSB7XG5cbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgYmVsb25naW5nIHRvIGEgc3BlY2lmaWMgcmVnaW9uLlxuICovXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlGb3JSZWdpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnkgdGhlIGdlb21ldHJpY2FsIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSByZWdpb24gdGhlIHJlZ2lvbiB0aGUgZ2VvbWV0cnkgYmVsb25ncyB0by5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5LCByZWFkb25seSByZWdpb246IFJlYWRSZXNvdXJjZSkge1xuICAgIH1cblxufVxuXG4vKipcbiAqIENvbGxlY3Rpb24gb2YgYFNWR1BvbHlnb25FbGVtZW50YCBmb3IgaW5kaXZpZHVhbCByZWdpb25zLlxuICovXG5pbnRlcmZhY2UgUG9seWdvbnNGb3JSZWdpb24ge1xuXG4gICAgW2tleTogc3RyaW5nXTogU1ZHUG9seWdvbkVsZW1lbnRbXTtcblxufVxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGNyZWF0ZXMgYSBPcGVuU2VhZHJhZ29uIHZpZXdlciBpbnN0YW5jZS5cbiAqIEFjY2VwdHMgYW4gYXJyYXkgb2YgUmVhZFJlc291cmNlIGNvbnRhaW5pbmcgKGFtb25nIG90aGVyIHJlc291cmNlcykgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzIHRvIGJlIHJlbmRlcmVkLlxuICogQG1lbWJlciByZXNvdXJjZXMgLSByZXNvdXJjZXMgY29udGFpbmluZyAoYW1vbmcgb3RoZXIgcmVzb3VyY2VzKSB0aGUgU3RpbGxJbWFnZUZpbGVWYWx1ZXMgYW5kIGluY29taW5nIHJlZ2lvbnMgdG8gYmUgcmVuZGVyZWQuIChVc2UgYXMgYW5ndWxhciBASW5wdXQgZGF0YSBiaW5kaW5nIHByb3BlcnR5LilcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktc3RpbGwtaW1hZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zdGlsbC1pbWFnZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3RpbGwtaW1hZ2UuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTdGlsbEltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpbWFnZXM6IFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbltdO1xuICAgIEBJbnB1dCgpIGltYWdlQ2FwdGlvbj86IHN0cmluZztcbiAgICBASW5wdXQoKSBhY3RpdmF0ZVJlZ2lvbjogc3RyaW5nOyAvLyBoaWdobGlnaHQgYSByZWdpb25cblxuICAgIEBPdXRwdXQoKSBjdXJyZW50SW1hZ2VJbmRleDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgcmVnaW9uSG92ZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgcHJpdmF0ZSB2aWV3ZXI7XG4gICAgcHJpdmF0ZSByZWdpb25zOiBQb2x5Z29uc0ZvclJlZ2lvbiA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgc3VyZmFjZSBvZiBhIHJlY3Rhbmd1bGFyIHJlZ2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBnZW9tIHRoZSByZWdpb24ncyBnZW9tZXRyeS5cbiAgICAgKiBAcmV0dXJucyB0aGUgc3VyZmFjZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBzdXJmYWNlT2ZSZWN0YW5ndWxhclJlZ2lvbihnZW9tOiBSZWdpb25HZW9tZXRyeSk6IG51bWJlciB7XG5cbiAgICAgICAgaWYgKGdlb20udHlwZSAhPT0gJ3JlY3RhbmdsZScpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdleHBlY3RlZCByZWN0YW5ndWxhciByZWdpb24sIGJ1dCAnICsgZ2VvbS50eXBlICsgJyBnaXZlbicpO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3ID0gTWF0aC5tYXgoZ2VvbS5wb2ludHNbMF0ueCwgZ2VvbS5wb2ludHNbMV0ueCkgLSBNYXRoLm1pbihnZW9tLnBvaW50c1swXS54LCBnZW9tLnBvaW50c1sxXS54KTtcbiAgICAgICAgY29uc3QgaCA9IE1hdGgubWF4KGdlb20ucG9pbnRzWzBdLnksIGdlb20ucG9pbnRzWzFdLnkpIC0gTWF0aC5taW4oZ2VvbS5wb2ludHNbMF0ueSwgZ2VvbS5wb2ludHNbMV0ueSk7XG5cbiAgICAgICAgcmV0dXJuIHcgKiBoO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZSB0aWxlIHNvdXJjZXMgZnJvbSB0aGUgZ2l2ZW4gc2VxdWVuY2Ugb2YgW1tSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZV1dLlxuICAgICAqXG4gICAgICogQHBhcmFtIGltYWdlc1RvRGlzcGxheSB0aGUgZ2l2ZW4gZmlsZSB2YWx1ZXMgdG8gZGUgZGlzcGxheWVkLlxuICAgICAqIEByZXR1cm5zIHRoZSB0aWxlIHNvdXJjZXMgdG8gYmUgcGFzc2VkIHRvIE9TRCB2aWV3ZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJlcGFyZVRpbGVTb3VyY2VzRnJvbUZpbGVWYWx1ZXMoaW1hZ2VzVG9EaXNwbGF5OiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdKTogT2JqZWN0W10ge1xuICAgICAgICBsZXQgaW1hZ2VYT2Zmc2V0ID0gMDtcbiAgICAgICAgY29uc3QgaW1hZ2VZT2Zmc2V0ID0gMDtcbiAgICAgICAgY29uc3QgdGlsZVNvdXJjZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGltYWdlIG9mIGltYWdlc1RvRGlzcGxheSkge1xuICAgICAgICAgICAgY29uc3Qgc2lwaUJhc2VQYXRoID0gaW1hZ2UuaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTCArICcvJyArIGltYWdlLmltYWdlRmlsZW5hbWU7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGltYWdlLmRpbVg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBpbWFnZS5kaW1ZO1xuXG4gICAgICAgICAgICAvLyBjb25zdHJ1Y3QgT3BlblNlYWRyYWdvbiB0aWxlU291cmNlcyBhY2NvcmRpbmcgdG8gaHR0cHM6Ly9vcGVuc2VhZHJhZ29uLmdpdGh1Yi5pby9kb2NzL09wZW5TZWFkcmFnb24uVmlld2VyLmh0bWwjb3BlblxuICAgICAgICAgICAgdGlsZVNvdXJjZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgLy8gY29uc3RydWN0IElJSUYgdGlsZVNvdXJjZSBjb25maWd1cmF0aW9uIGFjY29yZGluZyB0b1xuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9paWlmLmlvL2FwaS9pbWFnZS8yLjEvI3RlY2huaWNhbC1wcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgLy8gc2VlIGFsc28gaHR0cDovL2lpaWYuaW8vYXBpL2ltYWdlLzIuMC8jYS1pbXBsZW1lbnRhdGlvbi1ub3Rlc1xuICAgICAgICAgICAgICAgICd0aWxlU291cmNlJzoge1xuICAgICAgICAgICAgICAgICAgICAnQGNvbnRleHQnOiAnaHR0cDovL2lpaWYuaW8vYXBpL2ltYWdlLzIvY29udGV4dC5qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgJ0BpZCc6IHNpcGlCYXNlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6IGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICdwcm9maWxlJzogWydodHRwOi8vaWlpZi5pby9hcGkvaW1hZ2UvMi9sZXZlbDIuanNvbiddLFxuICAgICAgICAgICAgICAgICAgICAncHJvdG9jb2wnOiAnaHR0cDovL2lpaWYuaW8vYXBpL2ltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RpbGVzJzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICdzY2FsZUZhY3RvcnMnOiBbMSwgMiwgNCwgOCwgMTYsIDMyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IDEwMjRcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd4JzogaW1hZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICd5JzogaW1hZ2VZT2Zmc2V0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaW1hZ2VYT2Zmc2V0Kys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGlsZVNvdXJjZXM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2ltYWdlcyddICYmIGNoYW5nZXNbJ2ltYWdlcyddLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXdlcigpO1xuICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50SW1hZ2VJcmkuZW1pdCh0aGlzLmltYWdlc1t0aGlzLnZpZXdlci5jdXJyZW50UGFnZSgpXS5zdGlsbEltYWdlRmlsZVZhbHVlLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snaW1hZ2VzJ10pIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkltYWdlcygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSZWdpb25zKCk7XG4gICAgICAgICAgICB0aGlzLnVuaGlnaGxpZ2h0QWxsUmVnaW9ucygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZhdGVSZWdpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0UmVnaW9uKHRoaXMuYWN0aXZhdGVSZWdpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZXNbJ2FjdGl2YXRlUmVnaW9uJ10pIHtcbiAgICAgICAgICAgIHRoaXMudW5oaWdobGlnaHRBbGxSZWdpb25zKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmF0ZVJlZ2lvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSZWdpb24odGhpcy5hY3RpdmF0ZVJlZ2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52aWV3ZXIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudmlld2VyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleC5lbWl0KHRoaXMudmlld2VyLmN1cnJlbnRQYWdlKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIGluaXRpYWxpc2F0aW9uIGlzIGRvbmUgb24gZmlyc3QgcnVuIG9mIG5nT25DaGFuZ2VzXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdlcikge1xuICAgICAgICAgICAgdGhpcy52aWV3ZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGFsbCBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZXMgdG8gYmUgZm91bmQgaW4gW1t0aGlzLmltYWdlc11dLlxuICAgICAqIChBbHRob3VnaCB0aGlzLmltYWdlcyBpcyBhIEFuZ3VsYXIgSW5wdXQgcHJvcGVydHksIHRoZSBidWlsdC1pbiBjaGFuZ2UgZGV0ZWN0aW9uIG9mIEFuZ3VsYXIgZG9lcyBub3QgZGV0ZWN0IGNoYW5nZXMgaW4gY29tcGxleCBvYmplY3RzIG9yIGFycmF5cywgb25seSByZWFzc2lnbm1lbnQgb2Ygb2JqZWN0cy9hcnJheXMuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIGlmIGFkZGl0aW9uYWwgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVzIHdlcmUgYWRkZWQgdG8gdGhpcy5pbWFnZXMgYWZ0ZXIgY3JlYXRpb24vYXNzaWdubWVudCBvZiB0aGUgdGhpcy5pbWFnZXMgYXJyYXkuKVxuICAgICAqL1xuICAgIHVwZGF0ZUltYWdlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdlcikge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFZpZXdlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbkltYWdlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYWxsIHJlZ2lvbnMgdG8gYmUgZm91bmQgaW4gW1t0aGlzLmltYWdlc11dLlxuICAgICAqIChBbHRob3VnaCB0aGlzLmltYWdlcyBpcyBhIEFuZ3VsYXIgSW5wdXQgcHJvcGVydHksIHRoZSBidWlsdC1pbiBjaGFuZ2UgZGV0ZWN0aW9uIG9mIEFuZ3VsYXIgZG9lcyBub3QgZGV0ZWN0IGNoYW5nZXMgaW4gY29tcGxleCBvYmplY3RzIG9yIGFycmF5cywgb25seSByZWFzc2lnbm1lbnQgb2Ygb2JqZWN0cy9hcnJheXMuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIGlmIGFkZGl0aW9uYWwgcmVnaW9ucyB3ZXJlIGFkZGVkIHRvIHRoZSByZXNvdXJjZXMuaW1hZ2VzKVxuICAgICAqL1xuICAgIHVwZGF0ZVJlZ2lvbnMoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBWaWV3ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclJlZ2lvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWdobGlnaHRzIHRoZSBwb2x5Z29uIGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gcmVnaW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlZ2lvbklyaSB0aGUgSXJpIG9mIHRoZSByZWdpb24gd2hvc2UgcG9seWdvbiBlbGVtZW50cyBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0UmVnaW9uKHJlZ2lvbklyaSkge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJlZ2lvbjogU1ZHUG9seWdvbkVsZW1lbnRbXSA9IHRoaXMucmVnaW9uc1tyZWdpb25JcmldO1xuXG4gICAgICAgIGlmIChhY3RpdmVSZWdpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwb2wgb2YgYWN0aXZlUmVnaW9uKSB7XG4gICAgICAgICAgICAgICAgcG9sLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncm9pLXN2Z292ZXJsYXkgYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmhpZ2hsaWdodHMgdGhlIHBvbHlnb24gZWxlbWVudHMgb2YgYWxsIHJlZ2lvbnMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHVuaGlnaGxpZ2h0QWxsUmVnaW9ucygpIHtcblxuICAgICAgICBmb3IgKGNvbnN0IHJlZyBpbiB0aGlzLnJlZ2lvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZ2lvbnMuaGFzT3duUHJvcGVydHkocmVnKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcG9sIG9mIHRoaXMucmVnaW9uc1tyZWddKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3JvaS1zdmdvdmVybGF5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIE9wZW5TZWFkcmFnb24gdmlld2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXR1cFZpZXdlcigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgdmlld2VyQ29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3NkLWNvbnRhaW5lcicpWzBdO1xuICAgICAgICBjb25zdCBvc2RPcHRpb25zID0ge1xuICAgICAgICAgICAgZWxlbWVudDogdmlld2VyQ29udGFpbmVyLFxuICAgICAgICAgICAgc2VxdWVuY2VNb2RlOiB0cnVlLFxuICAgICAgICAgICAgc2hvd1JlZmVyZW5jZVN0cmlwOiB0cnVlLFxuICAgICAgICAgICAgc2hvd05hdmlnYXRvcjogdHJ1ZSxcbiAgICAgICAgICAgIHpvb21JbkJ1dHRvbjogJ0tVSV9PU0RfWk9PTV9JTicsXG4gICAgICAgICAgICB6b29tT3V0QnV0dG9uOiAnS1VJX09TRF9aT09NX09VVCcsXG4gICAgICAgICAgICBwcmV2aW91c0J1dHRvbjogJ0tVSV9PU0RfUFJFVl9QQUdFJyxcbiAgICAgICAgICAgIG5leHRCdXR0b246ICdLVUlfT1NEX05FWFRfUEFHRScsXG4gICAgICAgICAgICBob21lQnV0dG9uOiAnS1VJX09TRF9IT01FJyxcbiAgICAgICAgICAgIGZ1bGxQYWdlQnV0dG9uOiAnS1VJX09TRF9GVUxMX1BBR0UnLFxuICAgICAgICAgICAgcm90YXRlTGVmdEJ1dHRvbjogJ0tVSV9PU0RfUk9UQVRFX0xFRlQnLCAgICAgICAgLy8gZG9lc24ndCB3b3JrIHlldFxuICAgICAgICAgICAgcm90YXRlUmlnaHRCdXR0b246ICdLVUlfT1NEX1JPVEFURV9SSUdIVCcgICAgICAgLy8gZG9lc24ndCB3b3JrIHlldFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnZpZXdlciA9IG5ldyBPcGVuU2VhZHJhZ29uLlZpZXdlcihvc2RPcHRpb25zKTtcbiAgICAgICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignZnVsbC1zY3JlZW4nLCBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgaWYgKGFyZ3MuZnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIHZpZXdlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmdWxsc2NyZWVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZpZXdlckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsc2NyZWVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdyZXNpemUnLCBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICAgICAgYXJncy5ldmVudFNvdXJjZS5zdmdPdmVybGF5KCkucmVzaXplKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGZpbGVWYWx1ZXM6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlW10gPSB0aGlzLmltYWdlcy5tYXAoXG4gICAgICAgICAgICAoaW1nKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGltZy5zdGlsbEltYWdlRmlsZVZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcigncGFnZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50IG9uIHBhZ2UnLCBldmVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm93IG9uIHBhZ2UnLCBldmVudC5wYWdlKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSBldmVudC5wYWdlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJz0gaWQnLCBmaWxlVmFsdWVzW2luZGV4XS5pZCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGZpbGVWYWx1ZXNbaW5kZXhdLmlkO1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gaWQ7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIC8vXG5cbiAgICAgICAgLy8gdGhpcy5jdXJyZW50SW1hZ2VJcmkuZW1pdCh0aGlzLnZpZXdlci5nZXRDdXJyZW50SW1hZ2UoKSk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIGltYWdlcyBpbiB0aGlzLmltYWdlcyB0byB0aGUgdmlld2VyLlxuICAgICAqIEltYWdlcyBhcmUgcG9zaXRpb25lZCBpbiBhIGhvcml6b250YWwgcm93IG5leHQgdG8gZWFjaCBvdGhlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIG9wZW5JbWFnZXMoKTogdm9pZCB7XG4gICAgICAgIC8vIGltYWdlWE9mZnNldCBjb250cm9scyB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBsZWZ0IHNpZGUgb2YgZWFjaCBpbWFnZSBpbiB0aGUgT3BlblNlYWRyYWdvbiB2aWV3cG9ydCBjb29yZGluYXRlIHN5c3RlbS5cbiAgICAgICAgLy8gVGhlIGZpcnN0IGltYWdlIGhhcyBpdHMgbGVmdCBzaWRlIGF0IHggPSAwLCBhbmQgYWxsIGltYWdlcyBhcmUgc2NhbGVkIHRvIGhhdmUgYSB3aWR0aCBvZiAxIGluIHZpZXdwb3J0IGNvb3JkaW5hdGVzLlxuICAgICAgICAvLyBzZWUgYWxzbzogaHR0cHM6Ly9vcGVuc2VhZHJhZ29uLmdpdGh1Yi5pby9leGFtcGxlcy92aWV3cG9ydC1jb29yZGluYXRlcy9cblxuICAgICAgICBjb25zdCBmaWxlVmFsdWVzOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZVtdID0gdGhpcy5pbWFnZXMubWFwKFxuICAgICAgICAgICAgKGltZykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbWcuc3RpbGxJbWFnZUZpbGVWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRpc3BsYXkgb25seSB0aGUgZGVmaW5lZCByYW5nZSBvZiB0aGlzLmltYWdlc1xuICAgICAgICBjb25zdCB0aWxlU291cmNlczogT2JqZWN0W10gPSBTdGlsbEltYWdlQ29tcG9uZW50LnByZXBhcmVUaWxlU291cmNlc0Zyb21GaWxlVmFsdWVzKGZpbGVWYWx1ZXMpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheXMoKTtcbiAgICAgICAgdGhpcy52aWV3ZXIub3Blbih0aWxlU291cmNlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIFNWRyBvdmVybGF5cyBmcm9tIHRoZSBET00uXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVPdmVybGF5cygpIHtcblxuICAgICAgICBmb3IgKGNvbnN0IHJlZyBpbiB0aGlzLnJlZ2lvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZ2lvbnMuaGFzT3duUHJvcGVydHkocmVnKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcG9sIG9mIHRoaXMucmVnaW9uc1tyZWddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2wgaW5zdGFuY2VvZiBTVkdQb2x5Z29uRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9sLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWdpb25zID0ge307XG5cbiAgICAgICAgLy8gVE9ETzogbWFrZSB0aGlzIHdvcmsgYnkgdXNpbmcgb3Nkdmlld2VyJ3MgYWRkT3ZlcmxheSBtZXRob2RcbiAgICAgICAgdGhpcy52aWV3ZXIuY2xlYXJPdmVybGF5cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBST0ktb3ZlcmxheSB0byB0aGUgdmlld2VyIGZvciBldmVyeSByZWdpb24gb2YgZXZlcnkgaW1hZ2UgaW4gdGhpcy5pbWFnZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbmRlclJlZ2lvbnMoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVPdmVybGF5cygpO1xuXG4gICAgICAgIGxldCBpbWFnZVhPZmZzZXQgPSAwOyAvLyBzZWUgZG9jdW1lbnRhdGlvbiBpbiB0aGlzLm9wZW5JbWFnZXMoKSBmb3IgdGhlIHVzYWdlIG9mIGltYWdlWE9mZnNldFxuXG4gICAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2YgdGhpcy5pbWFnZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGFzcGVjdFJhdGlvID0gKGltYWdlLnN0aWxsSW1hZ2VGaWxlVmFsdWUuZGltWSAvIGltYWdlLnN0aWxsSW1hZ2VGaWxlVmFsdWUuZGltWCk7XG5cbiAgICAgICAgICAgIC8vIGNvbGxlY3QgYWxsIGdlb21ldHJpZXMgYmVsb25naW5nIHRvIHRoaXMgcGFnZVxuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cmllczogR2VvbWV0cnlGb3JSZWdpb25bXSA9IFtdO1xuICAgICAgICAgICAgaW1hZ2UucmVnaW9ucy5tYXAoKHJlZykgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpb25zW3JlZy5yZWdpb25SZXNvdXJjZS5pZF0gPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBnZW9tcyA9IHJlZy5nZXRHZW9tZXRyaWVzKCk7XG5cbiAgICAgICAgICAgICAgICBnZW9tcy5tYXAoKGdlb20pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VvbUZvclJlZyA9IG5ldyBHZW9tZXRyeUZvclJlZ2lvbihnZW9tLmdlb21ldHJ5LCByZWcucmVnaW9uUmVzb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJpZXMucHVzaChnZW9tRm9yUmVnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzb3J0IGFsbCBnZW9tZXRyaWVzIGJlbG9uZ2luZyB0byB0aGlzIHBhZ2VcbiAgICAgICAgICAgIGdlb21ldHJpZXMuc29ydCgoZ2VvbTEsIGdlb20yKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZ2VvbTEuZ2VvbWV0cnkudHlwZSA9PT0gJ3JlY3RhbmdsZScgJiYgZ2VvbTIuZ2VvbWV0cnkudHlwZSA9PT0gJ3JlY3RhbmdsZScpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXJmMSA9IFN0aWxsSW1hZ2VDb21wb25lbnQuc3VyZmFjZU9mUmVjdGFuZ3VsYXJSZWdpb24oZ2VvbTEuZ2VvbWV0cnkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXJmMiA9IFN0aWxsSW1hZ2VDb21wb25lbnQuc3VyZmFjZU9mUmVjdGFuZ3VsYXJSZWdpb24oZ2VvbTIuZ2VvbWV0cnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHJlZzEgaXMgc21hbGxlciB0aGFuIHJlZzIsIHJldHVybiAxXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlZzEgdGhlbiBjb21lcyBhZnRlciByZWcyIGFuZCB0aHVzIGlzIHJlbmRlcmVkIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXJmMSA8IHN1cmYyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByZW5kZXIgYWxsIGdlb21ldHJpZXMgZm9yIHRoaXMgcGFnZVxuICAgICAgICAgICAgZm9yIChjb25zdCBnZW9tIG9mIGdlb21ldHJpZXMpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZ2VvbS5nZW9tZXRyeTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNWR092ZXJsYXkoZ2VvbS5yZWdpb24uaWQsIGdlb21ldHJ5LCBhc3BlY3RSYXRpbywgaW1hZ2VYT2Zmc2V0LCBnZW9tLnJlZ2lvbi5sYWJlbCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW1hZ2VYT2Zmc2V0Kys7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIGFkZHMgYSBST0ktb3ZlcmxheSB0byB0aGUgdmlld2VyXG4gICAgICogQHBhcmFtIHJlZ2lvbklyaSB0aGUgSXJpIG9mIHRoZSByZWdpb24uXG4gICAgICogQHBhcmFtIGdlb21ldHJ5IC0gdGhlIGdlb21ldHJ5IGRlc2NyaWJpbmcgdGhlIFJPSVxuICAgICAqIEBwYXJhbSBhc3BlY3RSYXRpbyAtICB0aGUgYXNwZWN0UmF0aW8gKGgvdykgb2YgdGhlIGltYWdlIG9uIHdoaWNoIHRoZSBnZW9tZXRyeSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICogQHBhcmFtIHhPZmZzZXQgLSAgdGhlIHgtb2Zmc2V0IGluIE9wZW5zZWFkcmFnb24gdmlld3BvcnQgY29vcmRpbmF0ZXMgb2YgdGhlIGltYWdlIG9uIHdoaWNoIHRoZSBnZW9tZXRyeSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICogQHBhcmFtIHRvb2xUaXAgLSAgdGhlIHRvb2x0aXAgd2hpY2ggc2hvdWxkIGJlIGRpc3BsYXllZCBvbiBtb3VzZWhvdmVyIG9mIHRoZSBzdmcgZWxlbWVudFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlU1ZHT3ZlcmxheShyZWdpb25Jcmk6IHN0cmluZywgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5LCBhc3BlY3RSYXRpbzogbnVtYmVyLCB4T2Zmc2V0OiBudW1iZXIsIHRvb2xUaXA6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBsaW5lQ29sb3IgPSBnZW9tZXRyeS5saW5lQ29sb3I7XG4gICAgICAgIGNvbnN0IGxpbmVXaWR0aCA9IGdlb21ldHJ5LmxpbmVXaWR0aDtcblxuICAgICAgICBsZXQgc3ZnRWxlbWVudDtcbiAgICAgICAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdyZWN0YW5nbGUnOlxuICAgICAgICAgICAgICAgIHN2Z0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3BvbHlnb24nKTsgIC8vIHllcywgd2UgcmVuZGVyIHJlY3RhbmdsZXMgYXMgc3ZnIHBvbHlnb24gZWxlbWVudHNcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNWR0F0dHJpYnV0ZXNSZWN0YW5nbGUoc3ZnRWxlbWVudCwgZ2VvbWV0cnksIGFzcGVjdFJhdGlvLCB4T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3BvbHlnb24nOlxuICAgICAgICAgICAgICAgIHN2Z0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3BvbHlnb24nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNWR0F0dHJpYnV0ZXNQb2x5Z29uKHN2Z0VsZW1lbnQsIGdlb21ldHJ5LCBhc3BlY3RSYXRpbywgeE9mZnNldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjaXJjbGUnOlxuICAgICAgICAgICAgICAgIHN2Z0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2NpcmNsZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU1ZHQXR0cmlidXRlc0NpcmNsZShzdmdFbGVtZW50LCBnZW9tZXRyeSwgYXNwZWN0UmF0aW8sIHhPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRVJST1I6IFN0aWxsSW1hZ2VPU0RWaWV3ZXJDb21wb25lbnQuY3JlYXRlU1ZHT3ZlcmxheTogdW5rbm93biBnZW9tZXRyeVR5cGU6ICcgKyBnZW9tZXRyeS50eXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3ZnRWxlbWVudC5pZCA9ICdyb2ktc3Znb3ZlcmxheS0nICsgTWF0aC5yYW5kb20oKSAqIDEwMDAwO1xuICAgICAgICBzdmdFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncm9pLXN2Z292ZXJsYXknKTtcbiAgICAgICAgc3ZnRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3N0cm9rZTogJyArIGxpbmVDb2xvciArICc7IHN0cm9rZS13aWR0aDogJyArIGxpbmVXaWR0aCArICdweDsnKTtcblxuICAgICAgICAvLyBldmVudCB3aGVuIGEgcmVnaW9uIGlzIGNsaWNrZWQgKG91dHB1dClcbiAgICAgICAgc3ZnRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVnaW9uSG92ZXJlZC5lbWl0KHJlZ2lvbklyaSk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBjb25zdCBzdmdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAndGl0bGUnKTtcbiAgICAgICAgc3ZnVGl0bGUudGV4dENvbnRlbnQgPSB0b29sVGlwO1xuXG4gICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJyk7XG4gICAgICAgIHN2Z0dyb3VwLmFwcGVuZENoaWxkKHN2Z1RpdGxlKTtcbiAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQoc3ZnRWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMudmlld2VyLnN2Z092ZXJsYXkoKTtcbiAgICAgICAgb3ZlcmxheS5ub2RlKCkuYXBwZW5kQ2hpbGQoc3ZnR3JvdXApOyAvLyBUT0RPOiB1c2UgbWV0aG9kIG9zZHZpZXdlcidzIG1ldGhvZCBhZGRPdmVybGF5XG5cbiAgICAgICAgdGhpcy5yZWdpb25zW3JlZ2lvbklyaV0ucHVzaChzdmdFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBuZWNlc3NhcnkgYXR0cmlidXRlcyB0byBjcmVhdGUgYSBST0ktb3ZlcmxheSBvZiB0eXBlICdyZWN0YW5nbGUnIHRvIGEgU1ZHRWxlbWVudFxuICAgICAqIEBwYXJhbSBzdmdFbGVtZW50IC0gYW4gU1ZHRWxlbWVudCAoc2hvdWxkIGhhdmUgdHlwZSAncG9seWdvbicgKHNpYykpXG4gICAgICogQHBhcmFtIGdlb21ldHJ5IC0gdGhlIGdlb21ldHJ5IGRlc2NyaWJpbmcgdGhlIHJlY3RhbmdsZVxuICAgICAqIEBwYXJhbSBhc3BlY3RSYXRpbyAtIHRoZSBhc3BlY3RSYXRpbyAoaC93KSBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGNpcmNsZSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICogQHBhcmFtIHhPZmZzZXQgLSB0aGUgeC1vZmZzZXQgaW4gT3BlbnNlYWRyYWdvbiB2aWV3cG9ydCBjb29yZGluYXRlcyBvZiB0aGUgaW1hZ2Ugb24gd2hpY2ggdGhlIGNpcmNsZSBzaG91bGQgYmUgcGxhY2VkXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRTVkdBdHRyaWJ1dGVzUmVjdGFuZ2xlKHN2Z0VsZW1lbnQ6IFNWR0VsZW1lbnQsIGdlb21ldHJ5OiBSZWdpb25HZW9tZXRyeSwgYXNwZWN0UmF0aW86IG51bWJlciwgeE9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBvaW50QSA9IGdlb21ldHJ5LnBvaW50c1swXTtcbiAgICAgICAgY29uc3QgcG9pbnRCID0gZ2VvbWV0cnkucG9pbnRzWzFdO1xuXG4gICAgICAgIC8vIGdlb21ldHJ5LnBvaW50cyBjb250YWlucyB0d28gZGlhZ29uYWxseSBvcHBvc2VkIGNvcm5lcnMgb2YgdGhlIHJlY3RhbmdsZSwgYnV0IHRoZSBvcmRlciBvZiB0aGUgY29ybmVycyBpcyBhcmJpdHJhcnkuXG4gICAgICAgIC8vIFdlIHRoZXJlZm9yZSBjb25zdHJ1Y3QgdGhlIHVwcGVybGVmdCAoVUwpLCBsb3dlcnJpZ2h0IChMUiksIHVwcGVycmlnaHQgKFVSKSBhbmQgbG93ZXJsZWZ0IChMTCkgcG9zaXRpb25zIG9mIHRoZSBjb3JuZXJzIHdpdGggbWluIGFuZCBtYXggb3BlcmF0aW9ucy5cbiAgICAgICAgY29uc3QgcG9zaXRpb25VTCA9IG5ldyBQb2ludDJEKE1hdGgubWluKHBvaW50QS54LCBwb2ludEIueCksIE1hdGgubWluKHBvaW50QS55LCBwb2ludEIueSkpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkxSID0gbmV3IFBvaW50MkQoTWF0aC5tYXgocG9pbnRBLngsIHBvaW50Qi54KSwgTWF0aC5tYXgocG9pbnRBLnksIHBvaW50Qi55KSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uVVIgPSBuZXcgUG9pbnQyRChNYXRoLm1heChwb2ludEEueCwgcG9pbnRCLngpLCBNYXRoLm1pbihwb2ludEEueSwgcG9pbnRCLnkpKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25MTCA9IG5ldyBQb2ludDJEKE1hdGgubWluKHBvaW50QS54LCBwb2ludEIueCksIE1hdGgubWF4KHBvaW50QS55LCBwb2ludEIueSkpO1xuXG4gICAgICAgIGNvbnN0IHBvaW50cyA9IFtwb3NpdGlvblVMLCBwb3NpdGlvblVSLCBwb3NpdGlvbkxSLCBwb3NpdGlvbkxMXTtcbiAgICAgICAgY29uc3Qgdmlld0Nvb3JkUG9pbnRzID0gdGhpcy5pbWFnZTJWaWV3UG9ydENvb3Jkcyhwb2ludHMsIGFzcGVjdFJhdGlvLCB4T2Zmc2V0KTtcbiAgICAgICAgY29uc3QgcG9pbnRzU3RyaW5nID0gdGhpcy5jcmVhdGVTVkdQb2x5Z29uUG9pbnRzQXR0cmlidXRlKHZpZXdDb29yZFBvaW50cyk7XG4gICAgICAgIHN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBwb2ludHNTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIG5lY2Vzc2FyeSBhdHRyaWJ1dGVzIHRvIGNyZWF0ZSBhIFJPSS1vdmVybGF5IG9mIHR5cGUgJ3BvbHlnb24nIHRvIGEgU1ZHRWxlbWVudFxuICAgICAqIEBwYXJhbSBzdmdFbGVtZW50IC0gYW4gU1ZHRWxlbWVudCAoc2hvdWxkIGhhdmUgdHlwZSAncG9seWdvbicpXG4gICAgICogQHBhcmFtIGdlb21ldHJ5IC0gdGhlIGdlb21ldHJ5IGRlc2NyaWJpbmcgdGhlIHBvbHlnb25cbiAgICAgKiBAcGFyYW0gYXNwZWN0UmF0aW8gLSB0aGUgYXNwZWN0UmF0aW8gKGgvdykgb2YgdGhlIGltYWdlIG9uIHdoaWNoIHRoZSBjaXJjbGUgc2hvdWxkIGJlIHBsYWNlZFxuICAgICAqIEBwYXJhbSB4T2Zmc2V0IC0gdGhlIHgtb2Zmc2V0IGluIE9wZW5zZWFkcmFnb24gdmlld3BvcnQgY29vcmRpbmF0ZXMgb2YgdGhlIGltYWdlIG9uIHdoaWNoIHRoZSBjaXJjbGUgc2hvdWxkIGJlIHBsYWNlZFxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkU1ZHQXR0cmlidXRlc1BvbHlnb24oc3ZnRWxlbWVudDogU1ZHRWxlbWVudCwgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5LCBhc3BlY3RSYXRpbzogbnVtYmVyLCB4T2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgdmlld0Nvb3JkUG9pbnRzID0gdGhpcy5pbWFnZTJWaWV3UG9ydENvb3JkcyhnZW9tZXRyeS5wb2ludHMsIGFzcGVjdFJhdGlvLCB4T2Zmc2V0KTtcbiAgICAgICAgY29uc3QgcG9pbnRzU3RyaW5nID0gdGhpcy5jcmVhdGVTVkdQb2x5Z29uUG9pbnRzQXR0cmlidXRlKHZpZXdDb29yZFBvaW50cyk7XG4gICAgICAgIHN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwb2ludHMnLCBwb2ludHNTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIG5lY2Vzc2FyeSBhdHRyaWJ1dGVzIHRvIGNyZWF0ZSBhIFJPSS1vdmVybGF5IG9mIHR5cGUgJ2NpcmNsZScgdG8gYSBTVkdFbGVtZW50XG4gICAgICogQHBhcmFtIHN2Z0VsZW1lbnQgLSBhbiBTVkdFbGVtZW50IChzaG91bGQgaGF2ZSB0eXBlICdjaXJjbGUnKVxuICAgICAqIEBwYXJhbSBnZW9tZXRyeSAtIHRoZSBnZW9tZXRyeSBkZXNjcmliaW5nIHRoZSBjaXJjbGVcbiAgICAgKiBAcGFyYW0gYXNwZWN0UmF0aW8gLSB0aGUgYXNwZWN0UmF0aW8gKGgvdykgb2YgdGhlIGltYWdlIG9uIHdoaWNoIHRoZSBjaXJjbGUgc2hvdWxkIGJlIHBsYWNlZFxuICAgICAqIEBwYXJhbSB4T2Zmc2V0IC0gdGhlIHgtb2Zmc2V0IGluIE9wZW5zZWFkcmFnb24gdmlld3BvcnQgY29vcmRpbmF0ZXMgb2YgdGhlIGltYWdlIG9uIHdoaWNoIHRoZSBjaXJjbGUgc2hvdWxkIGJlIHBsYWNlZFxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkU1ZHQXR0cmlidXRlc0NpcmNsZShzdmdFbGVtZW50OiBTVkdFbGVtZW50LCBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnksIGFzcGVjdFJhdGlvOiBudW1iZXIsIHhPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCB2aWV3Q29vcmRQb2ludHMgPSB0aGlzLmltYWdlMlZpZXdQb3J0Q29vcmRzKGdlb21ldHJ5LnBvaW50cywgYXNwZWN0UmF0aW8sIHhPZmZzZXQpO1xuICAgICAgICBjb25zdCBjeCA9IFN0cmluZyh2aWV3Q29vcmRQb2ludHNbMF0ueCk7XG4gICAgICAgIGNvbnN0IGN5ID0gU3RyaW5nKHZpZXdDb29yZFBvaW50c1swXS55KTtcbiAgICAgICAgLy8gZ2VvbWV0cnkucmFkaXVzIGNvbnRhaW5zIG5vdCB0aGUgcmFkaXVzIGl0c2VsZiwgYnV0IHRoZSBjb29yZGluYXRlcyBvZiBhIChhcmJpdHJhcnkpIHBvaW50IG9uIHRoZSBjaXJjbGUuXG4gICAgICAgIC8vIFdlIHRoZXJlZm9yZSBoYXZlIHRvIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSB2ZWN0b3IgZ2VvbWV0cnkucmFkaXVzIHRvIGdldCB0aGUgYWN0dWFsIHJhZGl1cy4gLT4gc3FydCh4XjIgKyB5XjIpXG4gICAgICAgIC8vIFNpbmNlIGdlb21ldHJ5LnJhZGl1cyBoYXMgaXRzIHkgY29vcmRpbmF0ZSBzY2FsZWQgdG8gdGhlIGhlaWdodCBvZiB0aGUgaW1hZ2UsXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gbXVsdGlwbHkgaXQgd2l0aCB0aGUgYXNwZWN0UmF0aW8gdG8gZ2V0IHRvIHRoZSBzY2FsZSB1c2VkIGJ5IE9wZW5zZWFkcmFnb24sIGFuYWxvZ3VvdXMgdG8gdGhpcy5pbWFnZTJWaWV3UG9ydENvb3JkcygpXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IFN0cmluZyhNYXRoLnNxcnQoZ2VvbWV0cnkucmFkaXVzLnggKiBnZW9tZXRyeS5yYWRpdXMueCArIGFzcGVjdFJhdGlvICogYXNwZWN0UmF0aW8gKiBnZW9tZXRyeS5yYWRpdXMueSAqIGdlb21ldHJ5LnJhZGl1cy55KSk7XG4gICAgICAgIHN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsIGN4KTtcbiAgICAgICAgc3ZnRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgY3kpO1xuICAgICAgICBzdmdFbGVtZW50LnNldEF0dHJpYnV0ZSgncicsIHJhZGl1cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFwcyBhIFBvaW50MkRbXSB3aXRoIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIGFuIGltYWdlIHRvIGEgbmV3IFBvaW50MkRbXSB3aXRoIGNvb3JkaW5hdGVzIGluIHRoZSB2aWV3cG9ydCBjb29yZGluYXRlIHN5c3RlbSBvZiBPcGVuc2VhZHJhZ29uXG4gICAgICogc2VlIGFsc286IGh0dHBzOi8vb3BlbnNlYWRyYWdvbi5naXRodWIuaW8vZXhhbXBsZXMvdmlld3BvcnQtY29vcmRpbmF0ZXMvXG4gICAgICogQHBhcmFtIHBvaW50cyAtIGFuIGFycmF5IG9mIHBvaW50cyBpbiBjb29yZGluYXRlIHN5c3RlbSByZWxhdGl2ZSB0byBhbiBpbWFnZVxuICAgICAqIEBwYXJhbSBhc3BlY3RSYXRpbyAtIHRoZSBhc3BlY3RSYXRpbyAoaC93KSBvZiB0aGUgaW1hZ2VcbiAgICAgKiBAcGFyYW0geE9mZnNldCAtIHRoZSB4LW9mZnNldCBpbiB2aWV3cG9ydCBjb29yZGluYXRlcyBvZiB0aGUgaW1hZ2VcbiAgICAgKiBAcmV0dXJucyAtIGEgbmV3IFBvaW50MkRbXSB3aXRoIGNvb3JkaW5hdGVzIGluIHRoZSB2aWV3cG9ydCBjb29yZGluYXRlIHN5c3RlbSBvZiBPcGVuc2VhZHJhZ29uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbWFnZTJWaWV3UG9ydENvb3Jkcyhwb2ludHM6IFBvaW50MkRbXSwgYXNwZWN0UmF0aW86IG51bWJlciwgeE9mZnNldDogbnVtYmVyKTogUG9pbnQyRFtdIHtcbiAgICAgICAgcmV0dXJuIHBvaW50cy5tYXAoKHBvaW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50MkQocG9pbnQueCArIHhPZmZzZXQsIHBvaW50LnkgKiBhc3BlY3RSYXRpbyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgaW4gdGhlIGZvcm1hdCBleHBlY3RlZCBieSB0aGUgJ3BvaW50cycgYXR0cmlidXRlIG9mIGEgU1ZHRWxlbWVudFxuICAgICAqIEBwYXJhbSBwb2ludHMgLSBhbiBhcnJheSBvZiBwb2ludHMgdG8gYmUgc2VyaWFsaXplZCB0byBhIHN0cmluZ1xuICAgICAqIEByZXR1cm5zIC0gdGhlIHBvaW50cyBzZXJpYWxpemVkIHRvIGEgc3RyaW5nIGluIHRoZSBmb3JtYXQgZXhwZWN0ZWQgYnkgdGhlICdwb2ludHMnIGF0dHJpYnV0ZSBvZiBhIFNWR0VsZW1lbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVNWR1BvbHlnb25Qb2ludHNBdHRyaWJ1dGUocG9pbnRzOiBQb2ludDJEW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgcG9pbnRzU3RyaW5nID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiBwb2ludHMpIHtcbiAgICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICBwb2ludHNTdHJpbmcgKz0gcG9pbnRzW2ldLng7XG4gICAgICAgICAgICAgICAgcG9pbnRzU3RyaW5nICs9ICcsJztcbiAgICAgICAgICAgICAgICBwb2ludHNTdHJpbmcgKz0gcG9pbnRzW2ldLnk7XG4gICAgICAgICAgICAgICAgcG9pbnRzU3RyaW5nICs9ICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9pbnRzU3RyaW5nO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRJbWFnZSgpIHtcblxuICAgIH1cbn1cbiJdfQ==