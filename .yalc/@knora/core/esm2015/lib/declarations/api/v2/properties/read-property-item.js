import { KnoraConstants } from '../../knora-constants';
import { DateRangeSalsah, DateSalsah } from '../../shared/date';
/**
 * Abstract class representing a text value object with or without markup.
 */
export class ReadTextValue {
    constructor() {
        this.type = KnoraConstants.TextValue;
    }
}
/**
 * Represents a text value object without markup (mere character string).
 */
export class ReadTextValueAsString extends ReadTextValue {
    constructor(id, propIri, str) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.str = str;
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsString;
    }
    getContent() {
        return this.str;
    }
}
/**
 * Represents resources referred to by standoff links.
 */
export class ReferredResourcesByStandoffLink {
}
/**
 * Represents a text value object with markup that has been turned into HTML.
 */
export class ReadTextValueAsHtml extends ReadTextValue {
    constructor(id, propIri, html, referredResources) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.html = html;
        this.referredResources = referredResources;
    }
    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    getReferredResourceInfo(resourceIri, ontologyInfo) {
        if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {
            const resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);
            return this.referredResources[resourceIri].label + ` (${resClassLabel})`;
        }
        else {
            return 'no information found about referred resource (target of standoff link)';
        }
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsHtml;
    }
    getContent() {
        return this.html;
    }
}
/**
 * Represents a text value object with markup as XML.
 */
export class ReadTextValueAsXml extends ReadTextValue {
    constructor(id, propIri, xml, mappingIri) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.xml = xml;
        this.mappingIri = mappingIri;
    }
    getClassName() {
        return KnoraConstants.ReadTextValueAsXml;
    }
    getContent() {
        return this.xml;
    }
}
/**
 * Represents a date value object.
 */
export class ReadDateValue {
    constructor(id, propIri, calendar, startYear, endYear, startEra, endEra, startMonth, endMonth, startDay, endDay) {
        this.id = id;
        this.propIri = propIri;
        this.calendar = calendar;
        this.startYear = startYear;
        this.endYear = endYear;
        this.startEra = startEra;
        this.endEra = endEra;
        this.startMonth = startMonth;
        this.endMonth = endMonth;
        this.startDay = startDay;
        this.endDay = endDay;
        this.type = KnoraConstants.DateValue;
        this.separator = '/';
    }
    getDateSalsah() {
        if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
            // precise date
            return new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
        }
        else {
            // date period
            return new DateRangeSalsah(new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new DateSalsah(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
        }
    }
    getClassName() {
        return KnoraConstants.ReadDateValue;
    }
    getContent() {
        return this.getDateSalsah().getDateAsString();
    }
}
/**
 * Represents a link value object (reification).
 */
export class ReadLinkValue {
    constructor(id, propIri, referredResourceIri, referredResource) {
        this.id = id;
        this.propIri = propIri;
        this.referredResourceIri = referredResourceIri;
        this.referredResource = referredResource;
        this.type = KnoraConstants.LinkValue;
    }
    getReferredResourceInfo(ontologyInfo) {
        if (this.referredResource !== undefined) {
            const resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);
            return this.referredResource.label + ` (${resClassLabel})`;
        }
        else {
            return this.referredResourceIri;
        }
    }
    getClassName() {
        return KnoraConstants.ReadLinkValue;
    }
    getContent() {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        }
        else {
            return this.referredResourceIri;
        }
    }
}
/**
 * Represents an integer value object.
 */
export class ReadIntegerValue {
    constructor(id, propIri, integer) {
        this.id = id;
        this.propIri = propIri;
        this.integer = integer;
        this.type = KnoraConstants.IntValue;
    }
    getClassName() {
        return KnoraConstants.ReadIntegerValue;
    }
    getContent() {
        return this.integer.toString();
    }
}
/**
 * Represents a decimal value object.
 */
export class ReadDecimalValue {
    constructor(id, propIri, decimal) {
        this.id = id;
        this.propIri = propIri;
        this.decimal = decimal;
        this.type = KnoraConstants.DecimalValue;
    }
    getClassName() {
        return KnoraConstants.ReadDecimalValue;
    }
    getContent() {
        return this.decimal.toString();
    }
}
/**
 * Abstract class for file representations like stillImage, movingImage, audio etc.
 */
export class FileValue {
}
/**
 * Represents a still image value object.
 */
export class ReadStillImageFileValue extends FileValue {
    constructor(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.imageFilename = imageFilename;
        this.imageServerIIIFBaseURL = imageServerIIIFBaseURL;
        this.imagePath = imagePath;
        this.dimX = dimX;
        this.dimY = dimY;
        this.type = KnoraConstants.StillImageFileValue;
        // if the image is a jpeg, it is a preview image
        this.isPreview = imageFilename.endsWith('.jpg');
    }
    makeIIIFUrl(reduceFactor) {
        if (this.isPreview) {
            return this.imagePath;
        }
        else {
            let percentage = Math.floor(100 / reduceFactor);
            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;
            return this.imageServerIIIFBaseURL + '/' + this.imageFilename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
        }
    }
    getClassName() {
        return KnoraConstants.ReadStillImageFileValue;
    }
    getContent() {
        return this.imagePath;
    }
}
/**
 * Represents a moving image value object.
 */
export class ReadMovingImageFileValue extends FileValue {
    constructor(id, propIri, filename, path, dimX, dimY, duration, fps) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.filename = filename;
        this.path = path;
        this.dimX = dimX;
        this.dimY = dimY;
        this.duration = duration;
        this.fps = fps;
        this.type = KnoraConstants.MovingImageFileValue;
    }
    getClassName() {
        return KnoraConstants.ReadMovingImageFileValue;
    }
    getContent() {
        return this.path;
    }
}
/**
 * Represents an audio value object.
 */
export class ReadAudioFileValue extends FileValue {
    constructor(id, propIri, filename, path, duration) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.filename = filename;
        this.path = path;
        this.duration = duration;
        this.type = KnoraConstants.AudioFileValue;
    }
    getClassName() {
        return KnoraConstants.ReadAudioFileValue;
    }
    getContent() {
        return this.path;
    }
}
/**
 * Represents a DDD value object.
 */
export class ReadDDDFileValue extends FileValue {
    constructor(id, propIri, filename, path) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.filename = filename;
        this.path = path;
        this.type = KnoraConstants.DDDFileValue;
    }
    getClassName() {
        return KnoraConstants.ReadDDDFileValue;
    }
    getContent() {
        return this.path;
    }
}
/**
 * Represents a Document value object.
 */
export class ReadDocumentFileValue extends FileValue {
    constructor(id, propIri, filename, path) {
        super();
        this.id = id;
        this.propIri = propIri;
        this.filename = filename;
        this.path = path;
        this.type = KnoraConstants.DocumentFileValue;
    }
    getClassName() {
        return KnoraConstants.ReadDocumentFileValue;
    }
    getContent() {
        return this.path;
    }
}
/**
 * Represents a text representation value object
 */
export class ReadTextFileValue {
    constructor(id, propIri, textFilename, textFileURL) {
        this.id = id;
        this.propIri = propIri;
        this.textFilename = textFilename;
        this.textFileURL = textFileURL;
        this.type = KnoraConstants.TextFileValue;
    }
    getClassName() {
        return KnoraConstants.ReadTextFileValue;
    }
    getContent() {
        return this.textFileURL;
    }
}
/**
 * Represents a color value object.
 */
export class ReadColorValue {
    constructor(id, propIri, colorHex) {
        this.id = id;
        this.propIri = propIri;
        this.colorHex = colorHex;
        this.type = KnoraConstants.ColorValue;
    }
    getClassName() {
        return KnoraConstants.ReadColorValue;
    }
    getContent() {
        return this.colorHex;
    }
}
/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
export class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/**
 * Represents a geometry value parsed from JSON.
 */
export class RegionGeometry {
    constructor(status, lineColor, lineWidth, points, type, radius) {
        this.status = status;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.points = points;
        this.type = type;
        this.radius = radius;
    }
}
/**
 * Represents a geometry value object.
 */
export class ReadGeomValue {
    constructor(id, propIri, geometryString) {
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        const geometryJSON = JSON.parse(geometryString);
        const points = [];
        for (const point of geometryJSON.points) {
            points.push(new Point2D(point.x, point.y));
        }
        let radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
    }
    getClassName() {
        return KnoraConstants.ReadGeomValue;
    }
    getContent() {
        return this.geometryString;
    }
}
/**
 * Represents a URI value object.
 */
export class ReadUriValue {
    constructor(id, propIri, uri) {
        this.id = id;
        this.propIri = propIri;
        this.uri = uri;
        this.type = KnoraConstants.UriValue;
    }
    getClassName() {
        return KnoraConstants.ReadUriValue;
    }
    getContent() {
        return this.uri;
    }
}
/**
 * Represents a Boolean value object.
 */
export class ReadBooleanValue {
    constructor(id, propIri, bool) {
        this.id = id;
        this.propIri = propIri;
        this.bool = bool;
        this.type = KnoraConstants.BooleanValue;
    }
    getClassName() {
        return KnoraConstants.ReadBooleanValue;
    }
    getContent() {
        return this.bool.toString();
    }
}
/**
 * Represents an interval value object.
 */
export class ReadIntervalValue {
    constructor(id, propIri, intervalStart, intervalEnd) {
        this.id = id;
        this.propIri = propIri;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.type = KnoraConstants.IntervalValue;
    }
    getClassName() {
        return KnoraConstants.ReadIntervalValue;
    }
    getContent() {
        return this.intervalStart.toString() + '-' + this.intervalEnd;
    }
}
/**
 * Represents a list value object.
 */
export class ReadListValue {
    constructor(id, propIri, listNodeIri) {
        this.id = id;
        this.propIri = propIri;
        this.listNodeIri = listNodeIri;
        this.type = KnoraConstants.ListValue;
    }
    getClassName() {
        return KnoraConstants.ReadListValue;
    }
    getContent() {
        return this.listNodeIri;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1wcm9wZXJ0eS1pdGVtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQXFDaEU7O0dBRUc7QUFDSCxNQUFNLE9BQWdCLGFBQWE7SUFBbkM7UUFJYSxTQUFJLEdBQVcsY0FBYyxDQUFDLFNBQVMsQ0FBQztJQU9yRCxDQUFDO0NBQUE7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxhQUFhO0lBRXBELFlBQXNCLEVBQVUsRUFBVyxPQUFlLEVBQVcsR0FBVztRQUM1RSxLQUFLLEVBQUUsQ0FBQztRQURVLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVcsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUVoRixDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ2hELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjtDQUUzQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFFbEQsWUFBc0IsRUFBVSxFQUFXLE9BQWUsRUFBVyxJQUFZLEVBQVcsaUJBQWtEO1FBQzFJLEtBQUssRUFBRSxDQUFDO1FBRFUsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVcsc0JBQWlCLEdBQWpCLGlC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YTtJQUV0QixZQUFzQixFQUFVLEVBQVcsT0FBZSxFQUFXLFdBQW1CO1FBQWxFLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVcsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFJL0UsU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFGekMsQ0FBQztJQUlELFlBQVk7UUFDUixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UnO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGVSYW5nZVNhbHNhaCwgRGF0ZVNhbHNhaCB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXRlJztcblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGFueSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgSXJpLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgdHlwZS5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvcGVydHkgcG9pbnRpbmcgdG8gdGhlIHZhbHVlIG9iamVjdC5cbiAgICAgKi9cbiAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjbGFzcyBuYW1lIG9mIHRoZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhpcyBpbnRlcmZhY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBhcyBhIHN0cmluZyAoY29tcGxleGl0eSBvZiB0aGUgdmFsdWUgcG9zc2libHkgcmVkdWNlZCkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHJlcHJlc2VudGluZyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggb3Igd2l0aG91dCBtYXJrdXAuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWFkVGV4dFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBhYnN0cmFjdCBpZDogc3RyaW5nO1xuXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuVGV4dFZhbHVlO1xuXG4gICAgYWJzdHJhY3QgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRob3V0IG1hcmt1cCAobWVyZSBjaGFyYWN0ZXIgc3RyaW5nKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1N0cmluZyBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1N0cmluZztcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgcmVzb3VyY2VzIHJlZmVycmVkIHRvIGJ5IHN0YW5kb2ZmIGxpbmtzLlxuICovXG5leHBvcnQgY2xhc3MgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZWFkUmVzb3VyY2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIHRoYXQgaGFzIGJlZW4gdHVybmVkIGludG8gSFRNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc0h0bWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGh0bWw6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmspIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IGEgcmVzb3VyY2UgcmVmZXJyZWQgdG8gYnkgYSBzdGFuZG9mZiBsaW5rIGZyb20gYSB0ZXh0IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlZmVycmVkIHJlc291cmNlLlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lJbmZvcm1hdGlvbn0gb250b2xvZ3lJbmZvIG9udG9sb2d5IGluZm9ybWF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSdzIGNsYXNzIGFuZCBpdHMgbGFiZWwuXG4gICAgICovXG5cblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKHJlc291cmNlSXJpOiBzdHJpbmcsIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0udHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbm8gaW5mb3JtYXRpb24gZm91bmQgYWJvdXQgcmVmZXJyZWQgcmVzb3VyY2UgKHRhcmdldCBvZiBzdGFuZG9mZiBsaW5rKSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCBhcyBYTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNYbWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHhtbDogc3RyaW5nLCByZWFkb25seSBtYXBwaW5nSXJpOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1htbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54bWw7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGF0ZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGF0ZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZW5kRXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0TW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydERheT86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kRGF5PzogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTtcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yID0gJy8nO1xuXG4gICAgZ2V0RGF0ZVNhbHNhaCgpOiBEYXRlU2Fsc2FoIHwgRGF0ZVJhbmdlU2Fsc2FoIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB0aGlzLmVuZFllYXIgJiYgdGhpcy5zdGFydE1vbnRoID09PSB0aGlzLmVuZE1vbnRoICYmIHRoaXMuc3RhcnREYXkgPT09IHRoaXMuZW5kRGF5ICYmIHRoaXMuc3RhcnRFcmEgPT09IHRoaXMuZW5kRXJhKSB7XG4gICAgICAgICAgICAvLyBwcmVjaXNlIGRhdGVcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRhdGUgcGVyaW9kXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVSYW5nZVNhbHNhaChuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KSwgbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5lbmRFcmEsIHRoaXMuZW5kWWVhciwgdGhpcy5lbmRNb250aCwgdGhpcy5lbmREYXkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVTYWxzYWgoKS5nZXREYXRlQXNTdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpbmsgdmFsdWUgb2JqZWN0IChyZWlmaWNhdGlvbikuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlua1ZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2U/OiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU7XG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaW5rVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVnZXIgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVnZXJWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgaW50ZWdlcjogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlZ2VyVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZWdlci50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkZWNpbWFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREZWNpbWFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGRlY2ltYWw6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERlY2ltYWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNpbWFsLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGZpbGUgcmVwcmVzZW50YXRpb25zIGxpa2Ugc3RpbGxJbWFnZSwgbW92aW5nSW1hZ2UsIGF1ZGlvIGV0Yy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIC8vIGFic3RyYWN0IHR5cGVTcGVjaWZpY1Byb3BzOiBhbnk7XG5cbiAgICBhYnN0cmFjdCBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q29udGVudCgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0aWxsIGltYWdlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZUZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlU2VydmVySUlJRkJhc2VVUkw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VQYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGRpbVg6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGltWTogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIGltYWdlIGlzIGEganBlZywgaXQgaXMgYSBwcmV2aWV3IGltYWdlXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gaW1hZ2VGaWxlbmFtZS5lbmRzV2l0aCgnLmpwZycpO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBtYWtlSUlJRlVybChyZWR1Y2VGYWN0b3I6IG51bWJlcik6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguZmxvb3IoMTAwIC8gcmVkdWNlRmFjdG9yKTtcblxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IChwZXJjZW50YWdlID4gMCAmJiBwZXJjZW50YWdlIDw9IDEwMCkgPyBwZXJjZW50YWdlIDogNTA7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlU2VydmVySUlJRkJhc2VVUkwgKyAnLycgKyB0aGlzLmltYWdlRmlsZW5hbWUgKyAnL2Z1bGwvcGN0OicgKyBwZXJjZW50YWdlLnRvU3RyaW5nKCkgKyAnLzAvZGVmYXVsdC5qcGcnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRTdGlsbEltYWdlRmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1vdmluZyBpbWFnZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTW92aW5nSW1hZ2VGaWxlVmFsdWUgZXh0ZW5kcyBGaWxlVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZGltWDogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkaW1ZOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGR1cmF0aW9uOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGZwcz86IG51bWJlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Nb3ZpbmdJbWFnZUZpbGVWYWx1ZTtcblxuICAgIC8vIHByZXZpZXcgZG9lc24ndCBpbmNsdWRlIHRoZSB2aWRlbyBmaWxlIGl0c2VsZlxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZE1vdmluZ0ltYWdlRmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gYXVkaW8gdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEF1ZGlvRmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGR1cmF0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQXVkaW9GaWxlVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRBdWRpb0ZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgREREIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRERERGaWxlVmFsdWUgZXh0ZW5kcyBGaWxlVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHBhdGg6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5ERERGaWxlVmFsdWU7XG5cbiAgICAvLyBwcmV2aWV3IGRvZXNuJ3QgaW5jbHVkZSB0aGUgREREIGZpbGUgaXRzZWxmXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRERERmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBEb2N1bWVudCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRG9jdW1lbnRGaWxlVmFsdWUgZXh0ZW5kcyBGaWxlVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHBhdGg6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Eb2N1bWVudEZpbGVWYWx1ZTtcblxuICAgIC8vIHByZXZpZXcgZG9lc24ndCBpbmNsdWRlIHRoZSBEREQgZmlsZSBpdHNlbGZcbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREb2N1bWVudEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCByZXByZXNlbnRhdGlvbiB2YWx1ZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0RmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB0ZXh0RmlsZW5hbWU6IHN0cmluZywgcmVhZG9ubHkgdGV4dEZpbGVVUkw6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlRleHRGaWxlVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0RmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRGaWxlVVJMO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xvciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQ29sb3JWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY29sb3JIZXg6IHN0cmluZykge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Db2xvclZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQ29sb3JWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvckhleDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBvaW50IGluIGEgMkQtY29vcmRpbmF0ZSBzeXN0ZW0gKGZvciBnZW9tZXRyeSB2YWx1ZXMpLlxuICovXG5leHBvcnQgY2xhc3MgUG9pbnQyRCB7XG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIHBhcnNlZCBmcm9tIEpTT04uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpb25HZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBzdGF0dXM6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVDb2xvcjogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBwb2ludHM6IFBvaW50MkRbXSxcbiAgICAgICAgcHVibGljIHR5cGU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJhZGl1cz86IFBvaW50MkRcbiAgICApIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRHZW9tVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGdlb21ldHJ5U3RyaW5nOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBnZW9tZXRyeUpTT04gPSBKU09OLnBhcnNlKGdlb21ldHJ5U3RyaW5nKTtcblxuICAgICAgICBjb25zdCBwb2ludHM6IFBvaW50MkRbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHBvaW50IG9mIGdlb21ldHJ5SlNPTi5wb2ludHMpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBQb2ludDJEKHBvaW50LngsIHBvaW50LnkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByYWRpdXM7XG4gICAgICAgIGlmIChnZW9tZXRyeUpTT04ucmFkaXVzKSB7XG4gICAgICAgICAgICByYWRpdXMgPSBuZXcgUG9pbnQyRChnZW9tZXRyeUpTT04ucmFkaXVzLngsIGdlb21ldHJ5SlNPTi5yYWRpdXMueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFJlZ2lvbkdlb21ldHJ5KFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnN0YXR1cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lQ29sb3IsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZVdpZHRoLFxuICAgICAgICAgICAgcG9pbnRzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLnR5cGUsXG4gICAgICAgICAgICByYWRpdXNcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IGdlb21ldHJ5OiBSZWdpb25HZW9tZXRyeTtcblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HZW9tVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRHZW9tVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvbWV0cnlTdHJpbmc7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBVUkkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFVyaVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB1cmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVXJpVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBCb29sZWFuIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRCb29sZWFuVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGJvb2w6IGJvb2xlYW4pIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRCb29sZWFuVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbC50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVydmFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGludGVydmFsU3RhcnQ6IG51bWJlciwgcmVhZG9ubHkgaW50ZXJ2YWxFbmQ6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlcnZhbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVydmFsU3RhcnQudG9TdHJpbmcoKSArICctJyArIHRoaXMuaW50ZXJ2YWxFbmQ7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpc3QgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpc3RWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVJcmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpc3RWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Tm9kZUlyaTtcbiAgICB9XG5cbn1cbiJdfQ==