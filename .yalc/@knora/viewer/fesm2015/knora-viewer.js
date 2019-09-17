import { __decorate, __metadata } from 'tslib';
import { Component, EventEmitter, Input, Output, ElementRef, HostListener, NgModule } from '@angular/core';
import { KnoraConstants, Point2D, ReadBooleanValue, ReadColorValue, DateRangeSalsah, Precision, ReadDateValue, ReadDecimalValue, ReadGeomValue, ReadIntegerValue, ReadIntervalValue, OntologyInformation, ReadLinkValue, ReadListValue, ListCacheService, ReadTextValueAsHtml, ReadTextValueAsString, ReadTextValueAsXml, ReadTextFileValue, ReadUriValue, ImageRegion as ImageRegion$1, StillImageRepresentation as StillImageRepresentation$1, ResourceService, IncomingService, ApiServiceError, SearchService, SearchParamsService, KuiCoreModule } from '@knora/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KuiActionModule } from '@knora/action';

let AnnotationComponent = class AnnotationComponent {
    constructor() { }
    ngOnInit() {
    }
};
AnnotationComponent = __decorate([
    Component({
        selector: 'kui-annotation',
        template: "<p>\n  annotation works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], AnnotationComponent);

let AudioComponent = class AudioComponent {
    constructor() { }
    ngOnInit() {
    }
};
AudioComponent = __decorate([
    Component({
        selector: 'kui-audio',
        template: "<p>\n  audio works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], AudioComponent);

let CollectionComponent = class CollectionComponent {
    constructor() { }
    ngOnInit() {
    }
};
CollectionComponent = __decorate([
    Component({
        selector: 'kui-collection',
        template: "<p>\n  collection works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], CollectionComponent);

let DddComponent = class DddComponent {
    constructor() { }
    ngOnInit() {
    }
};
DddComponent = __decorate([
    Component({
        selector: 'kui-ddd',
        template: "<p>\n  ddd works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], DddComponent);

let DocumentComponent = class DocumentComponent {
    constructor() { }
    ngOnInit() {
    }
};
DocumentComponent = __decorate([
    Component({
        selector: 'kui-document',
        template: "<p>\n  document works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], DocumentComponent);

let LinkObjComponent = class LinkObjComponent {
    constructor() { }
    ngOnInit() {
    }
};
LinkObjComponent = __decorate([
    Component({
        selector: 'kui-link-obj',
        template: "<p>\n  link-obj works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], LinkObjComponent);

let MovingImageComponent = class MovingImageComponent {
    constructor() { }
    ngOnInit() {
    }
};
MovingImageComponent = __decorate([
    Component({
        selector: 'kui-moving-image',
        template: "<p>\n  moving-image works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], MovingImageComponent);

let ObjectComponent = class ObjectComponent {
    constructor() { }
    ngOnInit() {
    }
};
ObjectComponent = __decorate([
    Component({
        selector: 'kui-object',
        template: "<p>\n  object works!\n</p>",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], ObjectComponent);

let RegionComponent = class RegionComponent {
    constructor() { }
    ngOnInit() {
    }
};
RegionComponent = __decorate([
    Component({
        selector: 'kui-region',
        template: "<p>\n  region works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], RegionComponent);

var StillImageComponent_1;
/**
 * Represents a region.
 * Contains a reference to the resource representing the region and its geometries.
 */
class ImageRegion {
    /**
     *
     * @param regionResource a resource of type Region
     */
    constructor(regionResource) {
        this.regionResource = regionResource;
    }
    /**
     * Get all geometry information belonging to this region.
     *
     * @returns
     */
    getGeometries() {
        return this.regionResource.properties[KnoraConstants.hasGeometry];
    }
}
/**
 * Represents an image including its regions.
 */
class StillImageRepresentation {
    /**
     *
     * @param stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param regions the regions belonging to the image.
     */
    constructor(stillImageFileValue, regions) {
        this.stillImageFileValue = stillImageFileValue;
        this.regions = regions;
    }
}
/**
 * Represents a geometry belonging to a specific region.
 */
class GeometryForRegion {
    /**
     *
     * @param geometry the geometrical information.
     * @param region the region the geometry belongs to.
     */
    constructor(geometry, region) {
        this.geometry = geometry;
        this.region = region;
    }
}
/**
 * This component creates a OpenSeadragon viewer instance.
 * Accepts an array of ReadResource containing (among other resources) ReadStillImageFileValues to be rendered.
 * @member resources - resources containing (among other resources) the StillImageFileValues and incoming regions to be rendered. (Use as angular @Input data binding property.)
 */
let StillImageComponent = StillImageComponent_1 = class StillImageComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.regionHovered = new EventEmitter();
        this.regions = {};
    }
    /**
     * Calculates the surface of a rectangular region.
     *
     * @param geom the region's geometry.
     * @returns the surface.
     */
    static surfaceOfRectangularRegion(geom) {
        if (geom.type !== 'rectangle') {
            console.log('expected rectangular region, but ' + geom.type + ' given');
            return 0;
        }
        const w = Math.max(geom.points[0].x, geom.points[1].x) - Math.min(geom.points[0].x, geom.points[1].x);
        const h = Math.max(geom.points[0].y, geom.points[1].y) - Math.min(geom.points[0].y, geom.points[1].y);
        return w * h;
    }
    /**
     * Prepare tile sources from the given sequence of [[ReadStillImageFileValue]].
     *
     * @param imagesToDisplay the given file values to de displayed.
     * @returns the tile sources to be passed to OSD viewer.
     */
    static prepareTileSourcesFromFileValues(imagesToDisplay) {
        let imageXOffset = 0;
        const imageYOffset = 0;
        const tileSources = [];
        for (const image of imagesToDisplay) {
            const sipiBasePath = image.imageServerIIIFBaseURL + '/' + image.imageFilename;
            const width = image.dimX;
            const height = image.dimY;
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
        return tileSources;
    }
    ngOnChanges(changes) {
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
    }
    ngOnInit() {
        // initialisation is done on first run of ngOnChanges
    }
    ngOnDestroy() {
        if (this.viewer) {
            this.viewer.destroy();
            this.viewer = undefined;
        }
    }
    /**
     * Renders all ReadStillImageFileValues to be found in [[this.images]].
     * (Although this.images is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
     * Use this method if additional ReadStillImageFileValues were added to this.images after creation/assignment of the this.images array.)
     */
    updateImages() {
        if (!this.viewer) {
            this.setupViewer();
        }
        this.openImages();
    }
    /**
     * Renders all regions to be found in [[this.images]].
     * (Although this.images is a Angular Input property, the built-in change detection of Angular does not detect changes in complex objects or arrays, only reassignment of objects/arrays.
     * Use this method if additional regions were added to the resources.images)
     */
    updateRegions() {
        if (!this.viewer) {
            this.setupViewer();
        }
        this.renderRegions();
    }
    /**
     * Highlights the polygon elements associated with the given region.
     *
     * @param regionIri the Iri of the region whose polygon elements should be highlighted..
     */
    highlightRegion(regionIri) {
        const activeRegion = this.regions[regionIri];
        if (activeRegion !== undefined) {
            for (const pol of activeRegion) {
                pol.setAttribute('class', 'roi-svgoverlay active');
            }
        }
    }
    /**
     * Unhighlights the polygon elements of all regions.
     *
     */
    unhighlightAllRegions() {
        for (const reg in this.regions) {
            if (this.regions.hasOwnProperty(reg)) {
                for (const pol of this.regions[reg]) {
                    pol.setAttribute('class', 'roi-svgoverlay');
                }
            }
        }
    }
    /**
     * Initializes the OpenSeadragon viewer
     */
    setupViewer() {
        const viewerContainer = this.elementRef.nativeElement.getElementsByClassName('osd-container')[0];
        const osdOptions = {
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
    }
    /**
     * Adds all images in this.images to the viewer.
     * Images are positioned in a horizontal row next to each other.
     */
    openImages() {
        // imageXOffset controls the x coordinate of the left side of each image in the OpenSeadragon viewport coordinate system.
        // The first image has its left side at x = 0, and all images are scaled to have a width of 1 in viewport coordinates.
        // see also: https://openseadragon.github.io/examples/viewport-coordinates/
        const fileValues = this.images.map((img) => {
            return img.stillImageFileValue;
        });
        // display only the defined range of this.images
        const tileSources = StillImageComponent_1.prepareTileSourcesFromFileValues(fileValues);
        this.removeOverlays();
        this.viewer.open(tileSources);
    }
    /**
     * Removes SVG overlays from the DOM.
     */
    removeOverlays() {
        for (const reg in this.regions) {
            if (this.regions.hasOwnProperty(reg)) {
                for (const pol of this.regions[reg]) {
                    if (pol instanceof SVGPolygonElement) {
                        pol.remove();
                    }
                }
            }
        }
        this.regions = {};
        // TODO: make this work by using osdviewer's addOverlay method
        this.viewer.clearOverlays();
    }
    /**
     * Adds a ROI-overlay to the viewer for every region of every image in this.images
     */
    renderRegions() {
        this.removeOverlays();
        let imageXOffset = 0; // see documentation in this.openImages() for the usage of imageXOffset
        for (const image of this.images) {
            const aspectRatio = (image.stillImageFileValue.dimY / image.stillImageFileValue.dimX);
            // collect all geometries belonging to this page
            const geometries = [];
            image.regions.map((reg) => {
                this.regions[reg.regionResource.id] = [];
                const geoms = reg.getGeometries();
                geoms.map((geom) => {
                    const geomForReg = new GeometryForRegion(geom.geometry, reg.regionResource);
                    geometries.push(geomForReg);
                });
            });
            // sort all geometries belonging to this page
            geometries.sort((geom1, geom2) => {
                if (geom1.geometry.type === 'rectangle' && geom2.geometry.type === 'rectangle') {
                    const surf1 = StillImageComponent_1.surfaceOfRectangularRegion(geom1.geometry);
                    const surf2 = StillImageComponent_1.surfaceOfRectangularRegion(geom2.geometry);
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
            // render all geometries for this page
            for (const geom of geometries) {
                const geometry = geom.geometry;
                this.createSVGOverlay(geom.region.id, geometry, aspectRatio, imageXOffset, geom.region.label);
            }
            imageXOffset++;
        }
    }
    /**
     * Creates and adds a ROI-overlay to the viewer
     * @param regionIri the Iri of the region.
     * @param geometry - the geometry describing the ROI
     * @param aspectRatio -  the aspectRatio (h/w) of the image on which the geometry should be placed
     * @param xOffset -  the x-offset in Openseadragon viewport coordinates of the image on which the geometry should be placed
     * @param toolTip -  the tooltip which should be displayed on mousehover of the svg element
     */
    createSVGOverlay(regionIri, geometry, aspectRatio, xOffset, toolTip) {
        const lineColor = geometry.lineColor;
        const lineWidth = geometry.lineWidth;
        let svgElement;
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
        svgElement.addEventListener('click', () => {
            this.regionHovered.emit(regionIri);
        }, false);
        const svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        svgTitle.textContent = toolTip;
        const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        svgGroup.appendChild(svgTitle);
        svgGroup.appendChild(svgElement);
        const overlay = this.viewer.svgOverlay();
        overlay.node().appendChild(svgGroup); // TODO: use method osdviewer's method addOverlay
        this.regions[regionIri].push(svgElement);
    }
    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'rectangle' to a SVGElement
     * @param svgElement - an SVGElement (should have type 'polygon' (sic))
     * @param geometry - the geometry describing the rectangle
     * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    addSVGAttributesRectangle(svgElement, geometry, aspectRatio, xOffset) {
        const pointA = geometry.points[0];
        const pointB = geometry.points[1];
        // geometry.points contains two diagonally opposed corners of the rectangle, but the order of the corners is arbitrary.
        // We therefore construct the upperleft (UL), lowerright (LR), upperright (UR) and lowerleft (LL) positions of the corners with min and max operations.
        const positionUL = new Point2D(Math.min(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        const positionLR = new Point2D(Math.max(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
        const positionUR = new Point2D(Math.max(pointA.x, pointB.x), Math.min(pointA.y, pointB.y));
        const positionLL = new Point2D(Math.min(pointA.x, pointB.x), Math.max(pointA.y, pointB.y));
        const points = [positionUL, positionUR, positionLR, positionLL];
        const viewCoordPoints = this.image2ViewPortCoords(points, aspectRatio, xOffset);
        const pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
        svgElement.setAttribute('points', pointsString);
    }
    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'polygon' to a SVGElement
     * @param svgElement - an SVGElement (should have type 'polygon')
     * @param geometry - the geometry describing the polygon
     * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    addSVGAttributesPolygon(svgElement, geometry, aspectRatio, xOffset) {
        const viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
        const pointsString = this.createSVGPolygonPointsAttribute(viewCoordPoints);
        svgElement.setAttribute('points', pointsString);
    }
    /**
     * Adds the necessary attributes to create a ROI-overlay of type 'circle' to a SVGElement
     * @param svgElement - an SVGElement (should have type 'circle')
     * @param geometry - the geometry describing the circle
     * @param aspectRatio - the aspectRatio (h/w) of the image on which the circle should be placed
     * @param xOffset - the x-offset in Openseadragon viewport coordinates of the image on which the circle should be placed
     */
    addSVGAttributesCircle(svgElement, geometry, aspectRatio, xOffset) {
        const viewCoordPoints = this.image2ViewPortCoords(geometry.points, aspectRatio, xOffset);
        const cx = String(viewCoordPoints[0].x);
        const cy = String(viewCoordPoints[0].y);
        // geometry.radius contains not the radius itself, but the coordinates of a (arbitrary) point on the circle.
        // We therefore have to calculate the length of the vector geometry.radius to get the actual radius. -> sqrt(x^2 + y^2)
        // Since geometry.radius has its y coordinate scaled to the height of the image,
        // we need to multiply it with the aspectRatio to get to the scale used by Openseadragon, analoguous to this.image2ViewPortCoords()
        const radius = String(Math.sqrt(geometry.radius.x * geometry.radius.x + aspectRatio * aspectRatio * geometry.radius.y * geometry.radius.y));
        svgElement.setAttribute('cx', cx);
        svgElement.setAttribute('cy', cy);
        svgElement.setAttribute('r', radius);
    }
    /**
     * Maps a Point2D[] with coordinates relative to an image to a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
     * see also: https://openseadragon.github.io/examples/viewport-coordinates/
     * @param points - an array of points in coordinate system relative to an image
     * @param aspectRatio - the aspectRatio (h/w) of the image
     * @param xOffset - the x-offset in viewport coordinates of the image
     * @returns - a new Point2D[] with coordinates in the viewport coordinate system of Openseadragon
     */
    image2ViewPortCoords(points, aspectRatio, xOffset) {
        return points.map((point) => {
            return new Point2D(point.x + xOffset, point.y * aspectRatio);
        });
    }
    /**
     * Returns a string in the format expected by the 'points' attribute of a SVGElement
     * @param points - an array of points to be serialized to a string
     * @returns - the points serialized to a string in the format expected by the 'points' attribute of a SVGElement
     */
    createSVGPolygonPointsAttribute(points) {
        let pointsString = '';
        for (const i in points) {
            if (points.hasOwnProperty(i)) {
                pointsString += points[i].x;
                pointsString += ',';
                pointsString += points[i].y;
                pointsString += ' ';
            }
        }
        return pointsString;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], StillImageComponent.prototype, "images", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StillImageComponent.prototype, "imageCaption", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], StillImageComponent.prototype, "activateRegion", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], StillImageComponent.prototype, "regionHovered", void 0);
StillImageComponent = StillImageComponent_1 = __decorate([
    Component({
        selector: 'kui-still-image',
        template: "<div class=\"still-image-viewer\">\n    <div class=\"navigation left\">\n        <button mat-button class=\"full-size\" id=\"KUI_OSD_PREV_PAGE\">\n            <mat-icon>keyboard_arrow_left</mat-icon>\n        </button>\n    </div>\n\n    <!-- main content with navigation and osd viewer -->\n    <div class=\"content\">\n\n        <!-- openseadragon (osd) viewer -->\n        <div class=\"osd-container\"></div>\n        <!-- /openseadragon (osd) -->\n\n        <!-- footer with image caption e.g. copyright information -->\n        <div class=\"footer\">\n            <p class=\"mat-caption\" [innerHtml]=\"imageCaption\"></p>\n        </div>\n\n        <!-- action panel with tools for image -->\n        <mat-toolbar class=\"action\">\n            <mat-toolbar-row>\n                <!-- home button -->\n                <span>\n                <button mat-icon-button id=\"KUI_OSD_HOME\"><mat-icon>home</mat-icon></button>\n            </span>\n                <!-- zoom buttons -->\n                <span class=\"fill-remaining-space\"></span>\n                <span>\n                <button mat-icon-button id=\"KUI_OSD_ZOOM_IN\"><mat-icon>add</mat-icon></button>\n                <button mat-icon-button id=\"KUI_OSD_ZOOM_OUT\"><mat-icon>remove</mat-icon></button>\n            </span>\n                <!-- window button -->\n                <span class=\"fill-remaining-space\"></span>\n                <span>\n                <button mat-icon-button id=\"KUI_OSD_FULL_PAGE\"><mat-icon>fullscreen</mat-icon></button>\n            </span>\n            </mat-toolbar-row>\n        </mat-toolbar>\n\n    </div>\n\n    <div class=\"navigation right\">\n        <button mat-button class=\"full-size\" id=\"KUI_OSD_NEXT_PAGE\">\n            <mat-icon>keyboard_arrow_right</mat-icon>\n        </button>\n    </div>\n\n</div>\n\n<!-- simple image viewer e.g. as a preview -->\n<!-- TODO: handle images array -->\n<!--<img *ngIf=\"simple && images?.length === 1; else osdViewer\" [src]=\"simpleImageExample\">-->\n\n\n<!--\n    <div>\n        <span *ngIf=\"images.length > 1\" (click)=\"gotoLeft()\">&lt;&lt;</span>\n        <span *ngIf=\"images.length > 1\" (click)=\"gotoRight()\">&gt;&gt;</span>\n    </div>\n-->\n\n\n\n",
        styles: [".still-image-viewer{display:inline-flex;height:400px;max-width:800px;width:100%}@media (max-height:636px){.still-image-viewer{height:300px}}.still-image-viewer .navigation{height:calc(400px + 64px + 24px);width:36px}.still-image-viewer .navigation .mat-button.full-size{height:100%!important;width:36px!important;padding:0!important;min-width:36px!important}.still-image-viewer .content{height:calc(400px + 64px + 24px);max-width:calc(800px - (2 * 36px));width:calc(100% - (2 * 36px))}.still-image-viewer .content .osd-container{color:#ccc;background-color:#000;height:400px}.still-image-viewer .content .osd-container.fullscreen{max-width:100vw}.still-image-viewer .content .footer p{color:#ccc;background-color:#000;height:24px;margin:0;padding:0 16px}::ng-deep .roi-svgoverlay{opacity:.4;fill:transparent;stroke:#00695c;stroke-width:2px;vector-effect:non-scaling-stroke}.roi-svgoverlay:focus,::ng-deep .roi-svgoverlay:hover{opacity:1}::ng-deep .roi-svgoverlay.active{opacity:1}"]
    }),
    __metadata("design:paramtypes", [ElementRef])
], StillImageComponent);

let TextComponent = class TextComponent {
    constructor() { }
    ngOnInit() {
    }
};
TextComponent = __decorate([
    Component({
        selector: 'kui-text',
        template: "<p>\n  text works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], TextComponent);

let BooleanValueComponent = class BooleanValueComponent {
    constructor() { }
    set valueObject(value) {
        this._booleanValueObj = value;
    }
    get valueObject() {
        return this._booleanValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadBooleanValue),
    __metadata("design:paramtypes", [ReadBooleanValue])
], BooleanValueComponent.prototype, "valueObject", null);
BooleanValueComponent = __decorate([
    Component({
        selector: 'kui-boolean-value',
        template: "<mat-checkbox [checked]=\"valueObject.bool\" disabled=\"true\"></mat-checkbox>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], BooleanValueComponent);

let ColorValueComponent = class ColorValueComponent {
    constructor() {
    }
    set valueObject(value) {
        this._colorValueObj = value;
    }
    get valueObject() {
        return this._colorValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadColorValue),
    __metadata("design:paramtypes", [ReadColorValue])
], ColorValueComponent.prototype, "valueObject", null);
ColorValueComponent = __decorate([
    Component({
        selector: 'kui-color-value',
        template: "<span [style.background-color]=\"valueObject.colorHex\">{{valueObject.colorHex}}</span>",
        styles: [".fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.mat-form-field{width:36px;overflow-x:visible}"]
    }),
    __metadata("design:paramtypes", [])
], ColorValueComponent);

let DateValueComponent = class DateValueComponent {
    constructor() { }
    set calendar(value) {
        this._calendar = value;
    }
    get calendar() {
        return this._calendar;
    }
    set era(value) {
        this._era = value;
    }
    get era() {
        return this._era;
    }
    set valueObject(value) {
        this._dateValueObj = value;
        const dateOrRange = this.valueObject.getDateSalsah();
        if (dateOrRange instanceof DateRangeSalsah) {
            // period (start and end dates)
            this.period = true;
            this.dates = [this.getJSDate(dateOrRange.start), this.getJSDate(dateOrRange.end)];
        }
        else {
            // single date
            this.period = false;
            this.dates = [this.getJSDate(dateOrRange)];
        }
    }
    get valueObject() {
        return this._dateValueObj;
    }
    /**
     * Converts a `DateSalsah` to a JS Date, providing necessary formatting information.
     * JULIAN and GREGORIAN calendar are the only available for the moment.
     *
     * @param date the date to be converted.
     * @return DateFormatter.
     */
    getJSDate(date) {
        if (date.precision === Precision.yearPrecision) {
            return {
                format: 'yyyy',
                date: new Date(date.year.toString()),
                era: date.era,
                calendar: date.calendar
            };
        }
        else if (date.precision === Precision.monthPrecision) {
            return {
                format: 'MMMM ' + 'yyyy',
                date: new Date(date.year, date.month - 1, 1),
                era: date.era,
                calendar: date.calendar
            };
        }
        else if (date.precision === Precision.dayPrecision) {
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
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DateValueComponent.prototype, "calendar", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DateValueComponent.prototype, "era", null);
__decorate([
    Input(),
    __metadata("design:type", ReadDateValue),
    __metadata("design:paramtypes", [ReadDateValue])
], DateValueComponent.prototype, "valueObject", null);
DateValueComponent = __decorate([
    Component({
        selector: 'kui-date-value',
        template: "<span *ngIf=\"period; else preciseDate\">\n    {{dates[0].date | date: dates[0].format}}\n    <span *ngIf=\"era\">\n        {{dates[0].era}}\n    </span>\n    - {{dates[1].date | date: dates[1].format}}\n    <span *ngIf=\"era\">\n        {{dates[1].era}}\n    </span>\n\n    <span *ngIf=\"calendar\">\n        ({{dates[0].calendar}})\n    </span>\n</span>\n\n<ng-template #preciseDate>\n\n    <span>\n        {{dates[0].date | date: dates[0].format}}\n        <span *ngIf=\"era\">\n            {{dates[0].era}}\n        </span>\n        <span *ngIf=\"calendar\">\n            ({{dates[0].calendar}})\n        </span>\n    </span>\n\n</ng-template>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], DateValueComponent);

let DecimalValueComponent = class DecimalValueComponent {
    constructor() { }
    set valueObject(value) {
        this._decimalValueObj = value;
    }
    get valueObject() {
        return this._decimalValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadDecimalValue),
    __metadata("design:paramtypes", [ReadDecimalValue])
], DecimalValueComponent.prototype, "valueObject", null);
DecimalValueComponent = __decorate([
    Component({
        selector: 'kui-decimal-value',
        template: "<span>{{valueObject.decimal}}</span>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], DecimalValueComponent);

let ExternalResValueComponent = class ExternalResValueComponent {
    constructor() { }
    ngOnInit() {
    }
};
ExternalResValueComponent = __decorate([
    Component({
        selector: 'kui-external-res-value',
        template: "<p>\n  external-res-value works!\n</p>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], ExternalResValueComponent);

let GeometryValueComponent = class GeometryValueComponent {
    constructor() { }
    set valueObject(value) {
        this._geomValueObj = value;
    }
    get valueObject() {
        return this._geomValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadGeomValue),
    __metadata("design:paramtypes", [ReadGeomValue])
], GeometryValueComponent.prototype, "valueObject", null);
GeometryValueComponent = __decorate([
    Component({
        selector: 'kui-geometry-value',
        template: "<span>{{valueObject.geometryString}}</span>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], GeometryValueComponent);

let GeonameValueComponent = class GeonameValueComponent {
    constructor() { }
    ngOnInit() {
    }
};
GeonameValueComponent = __decorate([
    Component({
        selector: 'kui-geoname-value',
        template: "<p>\n  geoname-value works!\n</p>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], GeonameValueComponent);

let IntegerValueComponent = class IntegerValueComponent {
    constructor() {
    }
    set valueObject(value) {
        this._integerValueObj = value;
    }
    get valueObject() {
        return this._integerValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadIntegerValue),
    __metadata("design:paramtypes", [ReadIntegerValue])
], IntegerValueComponent.prototype, "valueObject", null);
IntegerValueComponent = __decorate([
    Component({
        selector: 'kui-integer-value',
        template: "<span>{{valueObject.integer}}</span>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], IntegerValueComponent);

let IntervalValueComponent = class IntervalValueComponent {
    constructor() { }
    set valueObject(value) {
        this._intervalValueObj = value;
    }
    get valueObject() {
        return this._intervalValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadIntervalValue),
    __metadata("design:paramtypes", [ReadIntervalValue])
], IntervalValueComponent.prototype, "valueObject", null);
IntervalValueComponent = __decorate([
    Component({
        selector: 'kui-interval-value',
        template: "<span>{{valueObject.intervalStart}} - {{valueObject.intervalEnd}}</span>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], IntervalValueComponent);

let LinkValueComponent = class LinkValueComponent {
    constructor() {
        this.referredResourceClicked = new EventEmitter();
    }
    set ontologyInfo(value) {
        this._ontoInfo = value;
    }
    get ontologyInfo() {
        return this._ontoInfo;
    }
    set valueObject(value) {
        this._linkValueObj = value;
        if (this.valueObject.referredResource !== undefined) {
            this.referredResource = this.valueObject.referredResource.label;
        }
        else {
            this.referredResource = this.valueObject.referredResourceIri;
        }
    }
    get valueObject() {
        return this._linkValueObj;
    }
    refResClicked() {
        this.referredResourceClicked.emit(this._linkValueObj);
    }
};
__decorate([
    Input(),
    __metadata("design:type", OntologyInformation),
    __metadata("design:paramtypes", [OntologyInformation])
], LinkValueComponent.prototype, "ontologyInfo", null);
__decorate([
    Input(),
    __metadata("design:type", ReadLinkValue),
    __metadata("design:paramtypes", [ReadLinkValue])
], LinkValueComponent.prototype, "valueObject", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LinkValueComponent.prototype, "referredResourceClicked", void 0);
LinkValueComponent = __decorate([
    Component({
        selector: 'kui-link-value',
        template: "<a class=\"salsah-link\" (click)=\"refResClicked()\">{{referredResource}}</a>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], LinkValueComponent);

let ListValueComponent = class ListValueComponent {
    constructor(_listCacheService) {
        this._listCacheService = _listCacheService;
    }
    set valueObject(value) {
        this._listValueObj = value;
    }
    get valueObject() {
        return this._listValueObj;
    }
    ngOnChanges() {
        // given the node's Iri, ask the list cache service
        this.node = this._listCacheService.getListNode(this._listValueObj.listNodeIri);
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadListValue),
    __metadata("design:paramtypes", [ReadListValue])
], ListValueComponent.prototype, "valueObject", null);
ListValueComponent = __decorate([
    Component({
        selector: 'kui-list-value',
        template: "<span *ngIf=\"node | async\">{{(node | async )?.label}}</span>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [ListCacheService])
], ListValueComponent);

let TextValueAsHtmlComponent = class TextValueAsHtmlComponent {
    constructor(el) {
        this.el = el;
        this.referredResourceClicked = new EventEmitter();
    }
    set ontologyInfo(value) {
        this._ontoInfo = value;
    }
    get ontologyInfo() {
        return this._ontoInfo;
    }
    set bindEvents(value) {
        this._bindEvents = value;
    }
    get bindEvents() {
        return this._bindEvents;
    }
    set valueObject(value) {
        this._htmlValueObj = value;
        if (this.el.nativeElement.innerHTML) {
            this.el.nativeElement.innerHTML = this.valueObject.html;
        }
    }
    get valueObject() {
        return this._htmlValueObj;
    }
    refResClicked(refResourceIri) {
        this.referredResourceClicked.emit(refResourceIri);
    }
    /**
     * Binds a click event to standoff links that shows the referred resource.
     *
     * @param targetElement
     */
    onClick(targetElement) {
        if (this._bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0
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
    }
};
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TextValueAsHtmlComponent.prototype, "referredResourceClicked", void 0);
__decorate([
    Input(),
    __metadata("design:type", OntologyInformation),
    __metadata("design:paramtypes", [OntologyInformation])
], TextValueAsHtmlComponent.prototype, "ontologyInfo", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TextValueAsHtmlComponent.prototype, "bindEvents", null);
__decorate([
    Input(),
    __metadata("design:type", ReadTextValueAsHtml),
    __metadata("design:paramtypes", [ReadTextValueAsHtml])
], TextValueAsHtmlComponent.prototype, "valueObject", null);
__decorate([
    HostListener('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TextValueAsHtmlComponent.prototype, "onClick", null);
TextValueAsHtmlComponent = __decorate([
    Component({
        selector: 'kui-text-value-as-html',
        template: "<div>{{valueObject.html}}</div>",
        styles: [""]
    }),
    __metadata("design:paramtypes", [ElementRef])
], TextValueAsHtmlComponent);

let TextValueAsStringComponent = class TextValueAsStringComponent {
    constructor() {
    }
    set valueObject(value) {
        this._textStringValueObj = value;
    }
    get valueObject() {
        return this._textStringValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadTextValueAsString),
    __metadata("design:paramtypes", [ReadTextValueAsString])
], TextValueAsStringComponent.prototype, "valueObject", null);
TextValueAsStringComponent = __decorate([
    Component({
        selector: 'kui-text-value-as-string',
        template: "<span>{{valueObject.str}}</span>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], TextValueAsStringComponent);

let TextValueAsXmlComponent = class TextValueAsXmlComponent {
    constructor() {
    }
    set valueObject(value) {
        this._xmlValueObj = value;
    }
    get valueObject() {
        return this._xmlValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadTextValueAsXml),
    __metadata("design:paramtypes", [ReadTextValueAsXml])
], TextValueAsXmlComponent.prototype, "valueObject", null);
TextValueAsXmlComponent = __decorate([
    Component({
        selector: 'kui-text-value-as-xml',
        template: "<span>{{valueObject.xml}}</span>",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], TextValueAsXmlComponent);

let TextfileValueComponent = class TextfileValueComponent {
    constructor() { }
    set valueObject(value) {
        this._textfileValueObj = value;
    }
    get valueObject() {
        return this._textfileValueObj;
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadTextFileValue),
    __metadata("design:paramtypes", [ReadTextFileValue])
], TextfileValueComponent.prototype, "valueObject", null);
TextfileValueComponent = __decorate([
    Component({
        selector: 'kui-textfile-value',
        template: "<a target=\"_blank\" href=\"{{valueObject.textFileURL}}\">{{valueObject.textFilename}}</a>",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], TextfileValueComponent);

let UriValueComponent = class UriValueComponent {
    constructor() { }
    set valueObject(value) {
        this.__uriValueObj = value;
    }
    get valueObject() {
        return this.__uriValueObj;
    }
    ngOnChanges() {
        if (this.label === undefined) {
            this.displayString = this.__uriValueObj.uri;
        }
        else {
            this.displayString = this.label;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", ReadUriValue),
    __metadata("design:paramtypes", [ReadUriValue])
], UriValueComponent.prototype, "valueObject", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], UriValueComponent.prototype, "label", void 0);
UriValueComponent = __decorate([
    Component({
        selector: '   kui-uri-value',
        template: "<a href=\"{{valueObject.uri}}\" target=\"_blank\">{{displayString}}</a>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], UriValueComponent);

let CompareViewComponent = class CompareViewComponent {
    constructor() { }
    ngOnInit() {
    }
};
CompareViewComponent = __decorate([
    Component({
        selector: 'kui-compare-view',
        template: "<p>\n  compare-view works!\n</p>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], CompareViewComponent);

let GraphViewComponent = class GraphViewComponent {
    constructor() { }
    ngOnInit() {
    }
};
GraphViewComponent = __decorate([
    Component({
        selector: 'kui-graph-view',
        template: "<p>This is the GraphView component to visualize the connection of a resource. This view will implement the d3js library</p>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], GraphViewComponent);

let GridViewComponent = class GridViewComponent {
    constructor(_router) {
        this._router = _router;
        // @Input() isLoading: boolean;
        this.KnoraConstants = KnoraConstants;
    }
    ngOnInit() {
    }
    /**
     * Navigate to the resource viewer when clicking on one resource of the search result grid
     * @param {string} id
     */
    openResource(id) {
        const url = '/resource/' + encodeURIComponent(id);
        this._router.navigate([url]);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], GridViewComponent.prototype, "result", void 0);
__decorate([
    Input(),
    __metadata("design:type", OntologyInformation)
], GridViewComponent.prototype, "ontologyInfo", void 0);
GridViewComponent = __decorate([
    Component({
        selector: 'kui-grid-view',
        template: "<div>\n  <!-- <kui-progress-indicator *ngIf=\"isLoading\" [color]=\"'#D88958'\"></kui-progress-indicator> -->\n\n  <div fxLayout=\"row wrap\" fxLayout.xs=\"column\" fxLayoutGap=\"grid\">\n\n    <div fxFlex.sm=\"50\" fxFlex.md=\"33.3\" fxFlex.lg=\"20\" fxFlex.xl=\"16.6\" fxFlex=\"16.6\" *ngFor=\"let res of result\" class=\"gv-preview\">\n      <mat-card class=\"link\" (click)=\"openResource(res.id)\">\n\n        <mat-card-subtitle>{{ontologyInfo?.getLabelForResourceClass(res.type)}}</mat-card-subtitle>\n        <mat-card-title>{{res.label}}</mat-card-title>\n\n\n        <mat-card-content *ngFor=\"let prop of res.properties | kuiKey\">\n          <!-- description -->\n          <div *ngFor=\"let val of prop.value | kuiKey\">\n            <div [ngSwitch]=\"val.value.getClassName()\">\n              <div class=\"lv-html-text\" *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\">\n                <kui-text-value-as-html [valueObject]=\"val.value\" [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"false\"></kui-text-value-as-html>\n                <p class=\"lv-read-more\"></p>\n              </div>\n              <div>\n                <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val.value\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n                <span *ngSwitchDefault=\"\">{{val.value.getContent()}}</span>\n              </div>\n              <br>\n              <span *ngIf=\"ontologyInfo?.getLabelForProperty(prop.key) !== 'Text'\">\n                {{ontologyInfo?.getLabelForProperty(prop.key)}}\n              </span>\n            </div>\n          </div>\n        </mat-card-content>\n\n      </mat-card>\n    </div>\n  </div>\n\n\n</div>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.gv-preview{margin:6px 0;padding:24px;word-wrap:break-word;border-radius:5px}.gv-preview .mat-card{height:160px;color:rgba(0,0,0,.81);overflow:hidden;padding-bottom:25px}.gv-preview .mat-card:hover{background:rgba(0,105,92,.39);color:#000}.gv-preview .mat-card:active{background:rgba(0,105,92,.61)}.gv-preview .mat-card .mat-card-title{font-size:12pt;font-weight:600}"]
    }),
    __metadata("design:paramtypes", [Router])
], GridViewComponent);

let ListViewComponent = class ListViewComponent {
    constructor(_router) {
        this._router = _router;
        // @Input() isLoading: boolean;
        this.KnoraConstants = KnoraConstants;
    }
    /**
     * Navigate to the resource viewer when clicking on one resource of the search result list
     * @param {string} id
     */
    openResource(id) {
        const url = '/resource/' + encodeURIComponent(id);
        this._router.navigate([url]);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "result", void 0);
__decorate([
    Input(),
    __metadata("design:type", OntologyInformation)
], ListViewComponent.prototype, "ontologyInfo", void 0);
ListViewComponent = __decorate([
    Component({
        selector: 'kui-list-view',
        template: "<div>\n    <!-- <kui-progress-indicator *ngIf=\"isLoading\" [color]=\"'#D88958'\"></kui-progress-indicator> -->\n\n    <mat-list class=\"list-view lv-items\" *ngFor=\"let res of result; let i = index; let last = last;\">\n        <mat-list-item class=\"link\" (click)=\"openResource(res.id)\">\n            <mat-icon matListIcon>image_search</mat-icon>\n            <p matLine class=\"lv-res-label\">{{ontologyInfo?.getLabelForResourceClass(res.type)}}</p>\n            <h3 matLine class=\"lv-label\">{{res.label}}</h3>\n\n            <div matLine *ngFor=\"let prop of res.properties | kuiKey\">\n\n                <div matLine *ngFor=\"let val of prop.value | kuiKey\">\n\n                    <div [ngSwitch]=\"val.value.getClassName()\">\n                        <span *ngIf=\"ontologyInfo?.getLabelForProperty(prop.key) !== 'Text'\" class=\"lv-prop-label\">\n                            {{ontologyInfo?.getLabelForProperty(prop.key)}}:&nbsp;\n                        </span>\n\n                        <div class=\"lv-html-text\">\n\n                            <div *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\">\n                                <kui-text-value-as-html [valueObject]=\"val.value\" [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"false\"></kui-text-value-as-html>\n                            </div>\n\n                            <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val.value\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n\n                            <span *ngSwitchDefault=\"\">{{val.value.getContent()}}</span>\n\n                            <!-- slice the end of long texts -->\n                            <p class=\"lv-read-more\"></p>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n        </mat-list-item>\n\n        <mat-divider *ngIf=\"!last\"></mat-divider>\n\n    </mat-list>\n</div>\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.mat-list .mat-list-item .mat-line{white-space:normal!important}.list-view .mat-list-item{height:auto;min-height:40px;padding:8px 0}.lv-label{font-weight:700!important;font-size:16px!important;line-height:1.5}.lv-res-label{color:rgba(0,0,0,.54);font-size:14px!important}.lv-prop-label{font-style:italic}"]
    }),
    __metadata("design:paramtypes", [Router])
], ListViewComponent);

/**
 * Deprecated!?
 */
let PropertiesViewComponent = class PropertiesViewComponent {
    constructor() { }
};
PropertiesViewComponent = __decorate([
    Component({
        selector: 'kui-properties-view',
        template: "<p>\n    properties-view works!\n</p>",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
    }),
    __metadata("design:paramtypes", [])
], PropertiesViewComponent);

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
        this.getResource(this.iri);
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
        this._resourceService.getReadResource(decodeURIComponent(id)).subscribe((result) => {
            this.sequence = result;
            this.ontologyInfo = result.ontologyInformation;
            const resType = this.sequence.resources[0].type;
            this.guiOrder = result.ontologyInformation.getResourceClasses()[resType].guiOrder;
            // collect images and regions
            this.collectImagesAndRegionsForResource(this.sequence.resources[0]);
            // get incoming resources
            this.requestIncomingResources();
            // this.fileRepresentation = this.sequence.resources[0].properties.indexOf(KnoraConstants.hasStillImageFileValue) > -1;
            // console.log(this.fileRepresentation);
            // wait until the resource is ready
            setTimeout(() => {
                // console.log(this.sequence);
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
    collectFileRepresentationsAndFileAnnotations(resource) {
    }
    collectImagesAndRegionsForResource(resource) {
        const imgRepresentations = [];
        if (resource.properties[KnoraConstants.hasStillImageFileValue] !== undefined) {
            // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // resource has StillImageFileValues that are directly attached to it (properties)
            const fileValues = resource.properties[KnoraConstants.hasStillImageFileValue];
            const imagesToDisplay = fileValues.filter((image) => {
                return !image.isPreview;
            });
            for (const img of imagesToDisplay) {
                const regions = [];
                for (const incomingRegion of resource.incomingRegions) {
                    const region = new ImageRegion$1(incomingRegion);
                    regions.push(region);
                }
                const stillImage = new StillImageRepresentation$1(img, regions);
                imgRepresentations.push(stillImage);
            }
        }
        else if (resource.incomingStillImageRepresentations.length > 0) {
            // there are StillImageRepresentations pointing to this resource (incoming)
            const readStillImageFileValues = resource.incomingStillImageRepresentations.map((stillImageRes) => {
                const fileValues = stillImageRes.properties[KnoraConstants.hasStillImageFileValue];
                // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                const imagesToDisplay = fileValues.filter((image) => {
                    return !image.isPreview;
                });
                return imagesToDisplay;
            }).reduce(function (prev, curr) {
                // transform ReadStillImageFileValue[][] to ReadStillImageFileValue[]
                return prev.concat(curr);
            });
            for (const img of readStillImageFileValues) {
                const regions = [];
                for (const incomingRegion of resource.incomingRegions) {
                    const region = new ImageRegion$1(incomingRegion);
                    regions.push(region);
                }
                const stillImage = new StillImageRepresentation$1(img, regions);
                imgRepresentations.push(stillImage);
            }
        }
        resource.stillImageRepresentationsToDisplay = imgRepresentations;
    }
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
            this.getIncomingRegions(0);
        }
        // check for incoming links for the current resource
        this.getIncomingLinks(0);
    }
    /**
     * Get incoming regions for the resource.
     *
     * @param offset
     * @param callback
     */
    getIncomingRegions(offset, callback) {
        this._incomingService.getIncomingRegions(this.sequence.resources[0].id, offset).subscribe((regions) => {
            // update ontology information
            this.ontologyInfo.updateOntologyInformation(regions.ontologyInformation);
            // Append elements of regions.resources to resource.incoming
            Array.prototype.push.apply(this.sequence.resources[0].incomingRegions, regions.resources);
            // prepare regions to be displayed
            this.collectImagesAndRegionsForResource(this.sequence.resources[0]);
            // TODO: implement osdViewer
            /* if (this.osdViewer) {
              this.osdViewer.updateRegions();
            } */
            // if callback is given, execute function with the amount of new images as the parameter
            if (callback !== undefined) {
                callback(regions.resources.length);
            }
        }, (error) => {
            console.error(error);
            this.loading = false;
        });
    }
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
    /**
     * Navigate to the incoming resource view.
     *
     * @param {string} id Incoming resource iri
     */
    openLink(id) {
        this.loading = true;
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ResourceViewComponent.prototype, "iri", void 0);
ResourceViewComponent = __decorate([
    Component({
        selector: 'kui-resource-view',
        template: "<div class=\"resource-view\">\n\n    <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n    <div *ngIf=\"!loading\">\n\n        <div class=\"resource\" *ngFor=\"let resource of sequence.resources; let last = last\">\n\n            <!-- 0) Title first? -->\n            <mat-list>\n\n                <h3 class=\"mat-subheader\">\n                    {{sequence.ontologyInformation.getLabelForResourceClass(resource.type)}}\n                </h3>\n\n                <mat-list-item>\n                    <h2 class=\"mat-headline\">{{resource.label}}</h2>\n                </mat-list-item>\n\n            </mat-list>\n\n            <!-- 1) show fileRepresentation first-->\n            <div *ngFor=\"let prop of resource.properties | kuiKey\">\n                <div [ngSwitch]=\"prop.key\">\n\n                    <div *ngSwitchCase=\"KnoraConstants.hasStillImageFileValue\" class=\"media\">\n                        <!-- if the property is of type stillImageFileValue, show the image with osd viewer from @knora/viewer TODO: the fileValue will be part of an own resource property -->\n                        <kui-still-image *ngIf=\"resource.stillImageRepresentationsToDisplay.length > 0\" class=\"osd-viewer\" [imageCaption]=\"sequence.ontologyInformation.getLabelForProperty(prop.key)\" [images]=\"resource.stillImageRepresentationsToDisplay\">\n                        </kui-still-image>\n                    </div>\n\n                    <!-- TODO: switch through all other media type -->\n                    <!--\n                    <kui-moving-image></kui-moving-image>\n                    <kui-audio></kui-audio>\n                    <kui-ddd></kui-ddd>\n                    <kui-document></kui-document>\n  \n                    <kui-collection></kui-collection>\n  \n                    <kui-annotation></kui-annotation>\n                    <kui-link-obj></kui-link-obj>\n                    <kui-object></kui-object>\n                    <kui-region></kui-region>\n                    <kui-text></kui-text>\n                    -->\n\n                    <div *ngSwitchDefault class=\"hidden\">\n                        <!--<p>This media type ({{prop.key}}) is not yet implemented</p>-->\n                    </div>\n                </div>\n            </div>\n\n            <!-- 2) show properties, annotations (list of regions, sequences etc.), incomming resources (links, files) -->\n            <div class=\"data\">\n\n                <mat-tab-group class=\"full-width\">\n                    <mat-tab label=\"Metadata\">\n                        <mat-list>\n                            <div *ngFor=\"let prop of guiOrder; let last = last\" class=\"property\">\n                                <div *ngIf=\"resource.properties[prop?.property]\">\n                                    <!-- label of the property -->\n                                    <h3 mat-subheader class=\"property-label\">\n                                        {{sequence.ontologyInformation.getLabelForProperty(prop?.property)}}\n                                    </h3>\n                                    <!-- the value(s) of the property -->\n                                    <mat-list-item class=\"property-value-item\" *ngFor=\"let val of resource.properties[prop?.property]; let lastItem = last\">\n                                        <li [ngSwitch]=\"val.getClassName()\" [class.list]=\"resource.properties[prop?.property].length > 1\" [class.lastItem]=\"lastItem\">\n                                            <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\" [valueObject]=\"val\"></kui-text-value-as-string>\n                                            <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\" [valueObject]=\"val\"></kui-text-value-as-xml>\n                                            <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\" [calendar]=\"true\" [era]=\"true\"></kui-date-value>\n                                            <kui-link-value class=\"app-link\" *ngSwitchCase=\"KnoraConstants.ReadLinkValue\" [valueObject]=\"val\" [ontologyInfo]=\"ontologyInfo\" (referredResourceClicked)=\"openLink(val.referredResourceIri)\">\n                                            </kui-link-value>\n                                            <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\" [valueObject]=\"val\"></kui-integer-value>\n                                            <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\" [valueObject]=\"val\"></kui-decimal-value>\n                                            <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\" [valueObject]=\"val\"></kui-geometry-value>\n                                            <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\" [valueObject]=\"val\"></kui-color-value>\n                                            <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\"></kui-uri-value>\n                                            <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\" [valueObject]=\"val\"></kui-boolean-value>\n                                            <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\" [valueObject]=\"val\"></kui-interval-value>\n                                            <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\"></kui-list-value>\n                                            <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\" [valueObject]=\"val\"></kui-textfile-value>\n                                            <span *ngSwitchDefault>Not supported {{val.getClassName()}}</span>\n                                        </li>\n                                    </mat-list-item>\n                                </div>\n                            </div>\n                        </mat-list>\n                    </mat-tab>\n\n                    <mat-tab label=\"Annotations\" *ngIf=\"resource.annotations?.length > 0\">\n\n                    </mat-tab>\n\n                    <mat-tab label=\"Links / Connections\" *ngIf=\"resource.incomingLinks?.length > 0\">\n                        <div>\n                            <mat-list *ngFor=\"let incoming of resource.incomingLinks\">\n                                <mat-list-item class=\"app-link link\" (click)=\"openLink(incoming.id)\">\n                                    <span>{{incoming.label}}</span>\n                                </mat-list-item>\n                            </mat-list>\n                        </div>\n                    </mat-tab>\n\n                </mat-tab-group>\n\n            </div>\n\n            <!-- in case of more than one resource -->\n            <mat-divider *ngIf=\"!last\"></mat-divider>\n\n        </div>\n\n    </div>\n</div>\n\n\n<!-- OLD / first template\n  <mat-card>\n  \n  \n    <h2>metadata for resource {{ resource?.label}} ({{ resource?.id }})</h2>\n    <h3>type: {{ontologyInfo?.getLabelForResourceClass(resource?.type)}}</h3>\n  \n    <div *ngFor=\"let prop of resource?.properties | kuiKey\">\n        <mat-list>\n            <span>{{ontologyInfo?.getLabelForProperty(prop.key)}}</span>\n            <mat-list-item *ngFor=\"let val of prop.value\">\n                <span [ngSwitch]=\"val.getClassName()\">\n                    <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\"\n                                     [valueObject]=\"val\"></kui-color-value>\n                    <kui-text-value-as-html *ngSwitchCase=\"KnoraConstants.ReadTextValueAsHtml\" [valueObject]=\"val\"\n                                            [ontologyInfo]=\"ontologyInfo\" [bindEvents]=\"true\"></kui-text-value-as-html>\n                    <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\"\n                                              [valueObject]=\"val\"></kui-text-value-as-string>\n                    <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\"\n                                           [valueObject]=\"val\"></kui-text-value-as-xml>\n                    <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\"></kui-date-value>\n                    <kui-link-value *ngSwitchCase=\"KnoraConstants.ReadLinkValue\" [valueObject]=\"val\"\n                                    [ontologyInfo]=\"ontologyInfo\"></kui-link-value>\n                    <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\"\n                                       [valueObject]=\"val\"></kui-integer-value>\n                    <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\"\n                                       [valueObject]=\"val\"></kui-decimal-value>\n                    <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\"\n                                        [valueObject]=\"val\"></kui-geometry-value>\n                    <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\"></kui-uri-value>\n                    <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\"\n                                       [valueObject]=\"val\"></kui-boolean-value>\n                    <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\"\n                                        [valueObject]=\"val\"></kui-interval-value>\n                    <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\"></kui-list-value>\n                    <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\"\n                                        [valueObject]=\"val\"></kui-textfile-value>\n                    <span *ngSwitchDefault=\"\">Not supported {{val.getClassName()}}</span>\n                </span>\n            </mat-list-item>\n        </mat-list>\n    </div>\n  \n  </mat-card>\n  -->\n",
        styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}.resource-view{max-width:720px;margin:0 auto}.resource-view .resource .media{width:720px;height:calc(720px / (4 / 3))}.resource-view .resource .data{min-height:700px;padding:24px 36px}.hidden{display:none}.property{margin-bottom:12px}.property .property-value-item{min-height:48px;height:auto}.property .property-value-item li{list-style-type:none}.property .property-value-item li.list:before{content:'-    '}.property .property-value-item li.lastItem{margin-bottom:12px}.app-link:hover{background-color:#f1f1f1}@media (max-width:576px){.resource-view .resource .media{width:auto}}"]
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        ResourceService,
        IncomingService])
], ResourceViewComponent);

let TableViewComponent = class TableViewComponent {
    constructor() {
        this.KnoraConstants = KnoraConstants;
    }
    ngOnInit() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TableViewComponent.prototype, "result", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TableViewComponent.prototype, "ontologyInfo", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TableViewComponent.prototype, "isLoading", void 0);
TableViewComponent = __decorate([
    Component({
        selector: 'kui-table-view',
        template: "<p>\n  table-view works!\n</p>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], TableViewComponent);

/**
 * The search-results gets the search mode and parameters from routes or inputs,
 * and returns the corresponding resources that are displayed in a list or a grid.
 * The results can be filtered by project.
 */
let SearchResultsComponent = class SearchResultsComponent {
    constructor(_route, _searchService, _searchParamsService, _router) {
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
        this.KnoraConstants = KnoraConstants;
        this.offset = 0;
        this.maxOffset = 0;
        this.result = [];
        // rerender: boolean = false;
        this.badRequest = false;
        this.loading = true;
        this.errorMessage = new ApiServiceError();
        this.pagingLimit = 25;
        /**
         *
         * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
         * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
         * @ignore
         *
         * @param {ReadResourcesSequence} searchResult the answer to a search request.
         */
        this.processSearchResults = (searchResult) => {
            // assign ontology information to a variable so it can be used in the component's template
            if (this.ontologyInfo === undefined) {
                // init ontology information
                this.ontologyInfo = searchResult.ontologyInformation;
            }
            else {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(searchResult.ontologyInformation);
            }
            // append results to search results
            this.result = this.result.concat(searchResult.resources);
            // console.log('search results', this.result);
            this.loading = false;
            // this.rerender = false;
        };
        /**
         * Shows total number of results returned by a count query.
         * @ignore
         *
         * @param {ApiServiceResult} countQueryResult the response to a count query.
         */
        this.showNumberOfAllResults = (countQueryResult) => {
            this.numberOfAllResults = countQueryResult.numberOfResults;
            if (this.numberOfAllResults > 0) {
                // offset is 0-based
                // if numberOfAllResults equals the pagingLimit, the max. offset is 0
                this.maxOffset = Math.floor((this.numberOfAllResults - 1) / this.pagingLimit);
            }
            else {
                this.maxOffset = 0;
            }
        };
    }
    ngOnInit() {
    }
    ngOnChanges() {
        this._route.paramMap.subscribe((params) => {
            // get the search mode
            if (!this.searchMode) {
                this.searchMode = params.get('mode');
            }
            // get the project iri
            if (params.get('project') && (this.projectIri !== decodeURIComponent(params.get('project')))) {
                this.projectIri = decodeURIComponent(params.get('project'));
            }
            // init offset  and result
            this.offset = 0;
            this.result = [];
            // get query params depending on the search mode
            if (this.searchMode === 'fulltext') {
                this.searchQuery = params.get('q');
                this.badRequest = this.searchQuery.length < 3;
            }
            else if (this.searchMode === 'extended') {
                this.gravsearchGenerator = this._searchParamsService.getSearchParams();
                if (!this.searchQuery) {
                    this.generateGravsearchQuery();
                }
                else {
                    this.gravSearchQuery = this.searchQuery;
                }
            }
            // get results
            // this.rerender = true;
            this.getResult();
        });
    }
    /**
     * Generates the Gravsearch query for the current offset.
     * @ignore
     */
    generateGravsearchQuery() {
        const gravsearch = this.gravsearchGenerator.generateGravsearch(this.offset);
        if (gravsearch === false) {
            // no valid search params (application has been reloaded)
            // go to root
            this._router.navigate([''], { relativeTo: this._route });
            return;
        }
        else {
            this.gravSearchQuery = gravsearch;
        }
    }
    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     * @ignore
     */
    getResult() {
        this.loading = true;
        // reset the error message
        this.errorMessage = undefined;
        // FULLTEXT SEARCH
        if (this.searchMode === 'fulltext') {
            // this.rerender = true;
            if (this.badRequest) {
                this.errorMessage = new ApiServiceError();
                this.errorMessage.errorInfo =
                    'A search value is expected to have at least length of 3 characters.';
                this.loading = false;
                // this.rerender = false;
            }
            else {
                let searchParams;
                if (this.projectIri !== undefined) {
                    searchParams = { limitToProject: this.projectIri };
                }
                if (this.offset === 0) {
                    // perform count query
                    this._searchService
                        .doFullTextSearchCountQueryCountQueryResult(this.searchQuery, searchParams)
                        .subscribe(this.showNumberOfAllResults, (error) => {
                        this.errorMessage = error;
                    });
                }
                // perform full text search
                this._searchService
                    .doFullTextSearchReadResourceSequence(this.searchQuery, this.offset, searchParams)
                    .subscribe(this.processSearchResults, // function pointer
                (error) => {
                    this.errorMessage = error;
                    console.log('error', error);
                    console.log('message', this.errorMessage);
                });
            }
            // EXTENDED SEARCH
        }
        else if (this.searchMode === 'extended') {
            // perform count query
            if (this.offset === 0) {
                this._searchService
                    .doExtendedSearchCountQueryCountQueryResult(this.gravSearchQuery)
                    .subscribe(this.showNumberOfAllResults, (error) => {
                    this.errorMessage = error;
                });
            }
            this._searchService
                .doExtendedSearchReadResourceSequence(this.gravSearchQuery)
                .subscribe(this.processSearchResults, // function pointer
            (error) => {
                this.errorMessage = error;
            });
        }
        else {
            this.errorMessage = new ApiServiceError();
            this.errorMessage.errorInfo = `search mode invalid: ${this.searchMode}`;
        }
    }
    /**
     * Loads the next page of results.
     * The results will be appended to the existing ones.
     * @ignore
     *
     * @param {number} offset
     * @returns void
     */
    loadMore(offset) {
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
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SearchResultsComponent.prototype, "complexView", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SearchResultsComponent.prototype, "searchQuery", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SearchResultsComponent.prototype, "searchMode", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SearchResultsComponent.prototype, "projectIri", void 0);
SearchResultsComponent = __decorate([
    Component({
        selector: 'kui-search-results',
        template: "<kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n\n<div *ngIf=\"!loading && !badRequest\">\n\n    <div *ngIf=\"numberOfAllResults !== 0 && result; else noResult\">\n\n        <mat-tab-group animationDuration=\"0ms\" [selectedIndex]=\"1\">\n            <mat-tab disabled>\n                <ng-template mat-tab-label>\n                    <!-- <mat-icon class=\"tab-icon\">hashtag</mat-icon> -->\n                    <h4 class=\"search-results-title\">Results: {{numberOfAllResults}}</h4>\n                </ng-template>\n            </mat-tab>\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_list</mat-icon>\n                    List\n                </ng-template>\n                <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-list-view>\n            </mat-tab>\n\n            <!-- in caase of complexView: show tab to switch to grid view -->\n            <mat-tab *ngIf=\"complexView\">\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">view_module</mat-icon>\n                    Grid\n                </ng-template>\n                <kui-grid-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\"></kui-grid-view>\n            </mat-tab>\n            <!-- not yet implemented! --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">table_chart</mat-icon>\n                    Table\n                </ng-template>\n                <kui-table-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\">\n                </kui-table-view>\n            </mat-tab>\n            -->\n\n            <!-- the following tab we don't need anymore? The GravSearch view will be part of the export menu --\n            <mat-tab>\n                <ng-template mat-tab-label>\n                    <mat-icon class=\"tab-icon\">code</mat-icon>\n                    Gravsearch\n                </ng-template>\n                <kui-gravsearch-view></kui-gravsearch-view>\n            </mat-tab>\n            -->\n\n        </mat-tab-group>\n        <!-- <div>\n            <p>List view n\u00B02</p>\n            <kui-list-view [result]=\"result\" [ontologyInfo]=\"ontologyInfo\" *ngIf=\"!complexView\"></kui-list-view>\n        </div> -->\n\n        <div class=\"load-panel\" *ngIf=\"result.length > 0\">\n            <button mat-flat-button color=\"primary\" class=\"link center\" (click)=\"loadMore(offset)\"\n                    *ngIf=\"offset < maxOffset\">Load more\n                <mat-icon>keyboard_arrow_down</mat-icon>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- In case of 0 result -->\n    <ng-template #noResult>\n        <kui-message [message]=\"{status: 404, statusMsg: 'No results', statusText: 'Sorry, but we couldn\\'t find any results matching your search'}\"\n                     [medium]=\"true\"></kui-message>\n        <!-- <p><strong>No result</strong></p> -->\n    </ng-template>\n\n</div>\n\n<!-- Error message -->\n<kui-message *ngIf=\"errorMessage\" [message]=\"{status: 400, statusText: errorMessage.errorInfo}\" [medium]=\"true\">\n</kui-message>\n",
        styles: [".load-panel{width:100%}.load-panel .center{display:block;line-height:24px;margin:12px auto}.tab-icon{margin-right:8px}"]
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        SearchService,
        SearchParamsService,
        Router])
], SearchResultsComponent);

let KuiViewerModule = class KuiViewerModule {
};
KuiViewerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            KuiCoreModule,
            KuiActionModule,
            MatAutocompleteModule,
            MatButtonModule,
            MatCardModule,
            MatCheckboxModule,
            MatDatepickerModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatListModule,
            MatNativeDateModule,
            MatSlideToggleModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule,
            ReactiveFormsModule,
            FlexLayoutModule
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

export { AnnotationComponent, AudioComponent, BooleanValueComponent, CollectionComponent, ColorValueComponent, CompareViewComponent, DateValueComponent, DddComponent, DecimalValueComponent, DocumentComponent, ExternalResValueComponent, GeometryForRegion, GeometryValueComponent, GeonameValueComponent, GraphViewComponent, GridViewComponent, ImageRegion, IntegerValueComponent, IntervalValueComponent, KuiViewerModule, LinkObjComponent, LinkValueComponent, ListValueComponent, ListViewComponent, MovingImageComponent, ObjectComponent, PropertiesViewComponent, RegionComponent, ResourceViewComponent, SearchResultsComponent, StillImageComponent, StillImageRepresentation, TableViewComponent, TextComponent, TextValueAsHtmlComponent, TextValueAsStringComponent, TextValueAsXmlComponent, TextfileValueComponent, UriValueComponent, AnnotationComponent as ɵa, AudioComponent as ɵb, ExternalResValueComponent as ɵba, ListViewComponent as ɵbb, GridViewComponent as ɵbc, TableViewComponent as ɵbd, ResourceViewComponent as ɵbe, CompareViewComponent as ɵbf, GraphViewComponent as ɵbg, PropertiesViewComponent as ɵbh, SearchResultsComponent as ɵbi, CollectionComponent as ɵc, DddComponent as ɵd, DocumentComponent as ɵe, LinkObjComponent as ɵf, MovingImageComponent as ɵg, ObjectComponent as ɵh, RegionComponent as ɵi, StillImageComponent as ɵj, TextComponent as ɵk, TextValueAsHtmlComponent as ɵl, TextValueAsStringComponent as ɵm, TextValueAsXmlComponent as ɵn, TextfileValueComponent as ɵo, DateValueComponent as ɵp, IntegerValueComponent as ɵq, ColorValueComponent as ɵr, DecimalValueComponent as ɵs, UriValueComponent as ɵt, BooleanValueComponent as ɵu, GeometryValueComponent as ɵv, GeonameValueComponent as ɵw, IntervalValueComponent as ɵx, ListValueComponent as ɵy, LinkValueComponent as ɵz };
//# sourceMappingURL=knora-viewer.js.map
