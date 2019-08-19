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
 * Represents a still image value object.
 */
export class ReadStillImageFileValue {
    constructor(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
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
export class ReadMovingImageFileValue {
    constructor(id, propIri, filename, mediaServerIIIFBaseURL, path, dimX, dimY, duration, fps, aspectRatio) {
        this.id = id;
        this.propIri = propIri;
        this.filename = filename;
        this.mediaServerIIIFBaseURL = mediaServerIIIFBaseURL;
        this.path = path;
        this.dimX = dimX;
        this.dimY = dimY;
        this.duration = duration;
        this.fps = fps;
        this.aspectRatio = aspectRatio;
        this.type = KnoraConstants.MovingImageFileValue;
    }
    /*
    makeIIIFUrl(reduceFactor: number): string {

        if (this.isPreview) {
            return this.path;
        } else {
            let percentage = Math.floor(100 / reduceFactor);

            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;

            return this.mediaServerIIIFBaseURL + '/' + this.filename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
        }

    }
    */
    getClassName() {
        return KnoraConstants.ReadMovingImageFileValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1wcm9wZXJ0eS1pdGVtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQXFDaEU7O0dBRUc7QUFDSCxNQUFNLE9BQWdCLGFBQWE7SUFBbkM7UUFJYSxTQUFJLEdBQVcsY0FBYyxDQUFDLFNBQVMsQ0FBQztJQU9yRCxDQUFDO0NBQUE7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxhQUFhO0lBRXBELFlBQXFCLEVBQVUsRUFBVyxPQUFPLEVBQVcsR0FBVztRQUNuRSxLQUFLLEVBQUUsQ0FBQztRQURTLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQVcsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUV2RSxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ2hELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjtDQUUzQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFFbEQsWUFBcUIsRUFBVSxFQUFXLE9BQU8sRUFBVyxJQUFZLEVBQVcsaUJBQWtEO1FBQ2pJLEtBQUssRUFBRSxDQUFDO1FBRFMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQUE7UUFBVyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVcsc0JBQWlCLEdBQWpCLGlC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Q0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UnO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IERhdGVSYW5nZVNhbHNhaCwgRGF0ZVNhbHNhaCB9IGZyb20gJy4uLy4uL3NoYXJlZC9kYXRlJztcblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGFueSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgSXJpLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2JqZWN0J3MgdHlwZS5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvcGVydHkgcG9pbnRpbmcgdG8gdGhlIHZhbHVlIG9iamVjdC5cbiAgICAgKi9cbiAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjbGFzcyBuYW1lIG9mIHRoZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhpcyBpbnRlcmZhY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBhcyBhIHN0cmluZyAoY29tcGxleGl0eSBvZiB0aGUgdmFsdWUgcG9zc2libHkgcmVkdWNlZCkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHJlcHJlc2VudGluZyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggb3Igd2l0aG91dCBtYXJrdXAuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWFkVGV4dFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBhYnN0cmFjdCBpZDogc3RyaW5nO1xuXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuVGV4dFZhbHVlO1xuXG4gICAgYWJzdHJhY3QgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRob3V0IG1hcmt1cCAobWVyZSBjaGFyYWN0ZXIgc3RyaW5nKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1N0cmluZyBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1N0cmluZztcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHI7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgcmVzb3VyY2VzIHJlZmVycmVkIHRvIGJ5IHN0YW5kb2ZmIGxpbmtzLlxuICovXG5leHBvcnQgY2xhc3MgUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBSZWFkUmVzb3VyY2U7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIHRoYXQgaGFzIGJlZW4gdHVybmVkIGludG8gSFRNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc0h0bWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGh0bWw6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZXM6IFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmspIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IGEgcmVzb3VyY2UgcmVmZXJyZWQgdG8gYnkgYSBzdGFuZG9mZiBsaW5rIGZyb20gYSB0ZXh0IHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlZmVycmVkIHJlc291cmNlLlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lJbmZvcm1hdGlvbn0gb250b2xvZ3lJbmZvIG9udG9sb2d5IGluZm9ybWF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSdzIGNsYXNzIGFuZCBpdHMgbGFiZWwuXG4gICAgICovXG5cblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKHJlc291cmNlSXJpOiBzdHJpbmcsIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0udHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbm8gaW5mb3JtYXRpb24gZm91bmQgYWJvdXQgcmVmZXJyZWQgcmVzb3VyY2UgKHRhcmdldCBvZiBzdGFuZG9mZiBsaW5rKSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzSHRtbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCBhcyBYTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNYbWwgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHhtbDogc3RyaW5nLCByZWFkb25seSBtYXBwaW5nSXJpOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc1htbDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54bWw7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGF0ZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGF0ZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaSxcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZW5kRXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0TW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydERheT86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kRGF5PzogbnVtYmVyKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTtcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yID0gJy8nO1xuXG4gICAgZ2V0RGF0ZVNhbHNhaCgpOiBEYXRlU2Fsc2FoIHwgRGF0ZVJhbmdlU2Fsc2FoIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRZZWFyID09PSB0aGlzLmVuZFllYXIgJiYgdGhpcy5zdGFydE1vbnRoID09PSB0aGlzLmVuZE1vbnRoICYmIHRoaXMuc3RhcnREYXkgPT09IHRoaXMuZW5kRGF5ICYmIHRoaXMuc3RhcnRFcmEgPT09IHRoaXMuZW5kRXJhKSB7XG4gICAgICAgICAgICAvLyBwcmVjaXNlIGRhdGVcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRhdGUgcGVyaW9kXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVSYW5nZVNhbHNhaChuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLnN0YXJ0RXJhLCB0aGlzLnN0YXJ0WWVhciwgdGhpcy5zdGFydE1vbnRoLCB0aGlzLnN0YXJ0RGF5KSwgbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5lbmRFcmEsIHRoaXMuZW5kWWVhciwgdGhpcy5lbmRNb250aCwgdGhpcy5lbmREYXkpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGF0ZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhdGVTYWxzYWgoKS5nZXREYXRlQXNTdHJpbmcoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxpbmsgdmFsdWUgb2JqZWN0IChyZWlmaWNhdGlvbikuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlua1ZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2U/OiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU7XG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbCArIGAgKCR7cmVzQ2xhc3NMYWJlbH0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaW5rVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVnZXIgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEludGVnZXJWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgaW50ZWdlcjogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRJbnRlZ2VyVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZWdlci50b1N0cmluZygpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkZWNpbWFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREZWNpbWFsVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGRlY2ltYWw6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRlY2ltYWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERlY2ltYWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNpbWFsLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdGlsbCBpbWFnZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGltYWdlRmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZGltWDogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkaW1ZOiBudW1iZXIpIHtcblxuICAgICAgICAvLyBpZiB0aGUgaW1hZ2UgaXMgYSBqcGVnLCBpdCBpcyBhIHByZXZpZXcgaW1hZ2VcbiAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSBpbWFnZUZpbGVuYW1lLmVuZHNXaXRoKCcuanBnJyk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIG1ha2VJSUlGVXJsKHJlZHVjZUZhY3RvcjogbnVtYmVyKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5pc1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5mbG9vcigxMDAgLyByZWR1Y2VGYWN0b3IpO1xuXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gKHBlcmNlbnRhZ2UgPiAwICYmIHBlcmNlbnRhZ2UgPD0gMTAwKSA/IHBlcmNlbnRhZ2UgOiA1MDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTCArICcvJyArIHRoaXMuaW1hZ2VGaWxlbmFtZSArICcvZnVsbC9wY3Q6JyArIHBlcmNlbnRhZ2UudG9TdHJpbmcoKSArICcvMC9kZWZhdWx0LmpwZyc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbW92aW5nIGltYWdlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRNb3ZpbmdJbWFnZUZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IG1lZGlhU2VydmVySUlJRkJhc2VVUkw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZHVyYXRpb246IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZnBzPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBhc3BlY3RSYXRpbz86IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk1vdmluZ0ltYWdlRmlsZVZhbHVlO1xuXG4gICAgLy8gcHJldmlldyBkb2Vzbid0IGluY2x1ZGUgdGhlIHZpZGVvIGZpbGUgaXRzZWxmXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgLypcbiAgICBtYWtlSUlJRlVybChyZWR1Y2VGYWN0b3I6IG51bWJlcik6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKDEwMCAvIHJlZHVjZUZhY3Rvcik7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAocGVyY2VudGFnZSA+IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApID8gcGVyY2VudGFnZSA6IDUwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZWRpYVNlcnZlcklJSUZCYXNlVVJMICsgJy8nICsgdGhpcy5maWxlbmFtZSArICcvZnVsbC9wY3Q6JyArIHBlcmNlbnRhZ2UudG9TdHJpbmcoKSArICcvMC9kZWZhdWx0LmpwZyc7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAqL1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTW92aW5nSW1hZ2VGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgcmVwcmVzZW50YXRpb24gdmFsdWUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgdGV4dEZpbGVuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlVVJMOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RmlsZVVSTDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sb3IgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZENvbG9yVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNvbG9ySGV4OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JIZXg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCBpbiBhIDJELWNvb3JkaW5hdGUgc3lzdGVtIChmb3IgZ2VvbWV0cnkgdmFsdWVzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIHBhcnNlZCBmcm9tIEpTT04uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpb25HZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHN0YXR1czogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZUNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHBvaW50czogUG9pbnQyRFtdLFxuICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmFkaXVzPzogUG9pbnQyRFxuICAgICkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEdlb21WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBnZW9tZXRyeVN0cmluZzogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnlKU09OID0gSlNPTi5wYXJzZShnZW9tZXRyeVN0cmluZyk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludDJEW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBnZW9tZXRyeUpTT04ucG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQyRChwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFkaXVzO1xuICAgICAgICBpZiAoZ2VvbWV0cnlKU09OLnJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzID0gbmV3IFBvaW50MkQoZ2VvbWV0cnlKU09OLnJhZGl1cy54LCBnZW9tZXRyeUpTT04ucmFkaXVzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBSZWdpb25HZW9tZXRyeShcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5zdGF0dXMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZUNvbG9yLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi50eXBlLFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnk7XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuR2VvbVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlb21ldHJ5U3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVVJJIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRVcmlWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB1cmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVXJpVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBCb29sZWFuIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRCb29sZWFuVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgYm9vbDogYm9vbGVhbikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEJvb2xlYW5WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib29sLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZXJ2YWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlcnZhbFN0YXJ0OiBudW1iZXIsIHJlYWRvbmx5IGludGVydmFsRW5kOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbFN0YXJ0LnRvU3RyaW5nKCkgKyAnLScgKyB0aGlzLmludGVydmFsRW5kO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaXN0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgbGlzdE5vZGVJcmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpc3RWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Tm9kZUlyaTtcbiAgICB9XG5cbn1cbiJdfQ==