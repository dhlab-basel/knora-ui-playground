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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1wcm9wZXJ0eS1pdGVtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQXFDaEU7O0dBRUc7QUFDSCxNQUFNLE9BQWdCLGFBQWE7SUFBbkM7UUFJYSxTQUFJLEdBQVcsY0FBYyxDQUFDLFNBQVMsQ0FBQztJQU9yRCxDQUFDO0NBQUE7QUFFRDs7R0FFRztBQUNILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxhQUFhO0lBRXBELFlBQXNCLEVBQVUsRUFBVyxPQUFlLEVBQVcsR0FBVztRQUM1RSxLQUFLLEVBQUUsQ0FBQztRQURVLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVcsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUVoRixDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ2hELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjtDQUUzQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFFbEQsWUFBc0IsRUFBVSxFQUFXLE9BQWUsRUFBVyxJQUFZLEVBQVcsaUJBQWtEO1FBQzFJLEtBQUssRUFBRSxDQUFDO1FBRFUsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVcsc0JBQWlCLEdBQWpCLGlC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YTtJQUV0QixZQUFzQixFQUFVLEVBQVcsT0FBZSxFQUFXLFdBQW1CO1FBQWxFLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVcsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFJL0UsU0FBSSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFGekMsQ0FBQztJQUlELFlBQVk7UUFDUixPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWggfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF0ZSc7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhbnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIElyaS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIHR5cGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB2YWx1ZSBvYmplY3QuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXMgYSBzdHJpbmcgKGNvbXBsZXhpdHkgb2YgdGhlIHZhbHVlIHBvc3NpYmx5IHJlZHVjZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG9yIHdpdGhvdXQgbWFya3VwLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhZFRleHRWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTtcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aG91dCBtYXJrdXAgKG1lcmUgY2hhcmFjdGVyIHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNTdHJpbmc7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHJlc291cmNlcyByZWZlcnJlZCB0byBieSBzdGFuZG9mZiBsaW5rcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVhZFJlc291cmNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCB0aGF0IGhhcyBiZWVuIHR1cm5lZCBpbnRvIEhUTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNIdG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBodG1sOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCBhIHJlc291cmNlIHJlZmVycmVkIHRvIGJ5IGEgc3RhbmRvZmYgbGluayBmcm9tIGEgdGV4dCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZWZlcnJlZCByZXNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyBvbnRvbG9neSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UncyBjbGFzcyBhbmQgaXRzIGxhYmVsLlxuICAgICAqL1xuXG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhyZXNvdXJjZUlyaTogc3RyaW5nLCBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0ubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ25vIGluZm9ybWF0aW9uIGZvdW5kIGFib3V0IHJlZmVycmVkIHJlc291cmNlICh0YXJnZXQgb2Ygc3RhbmRvZmYgbGluayknO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc0h0bWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgYXMgWE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzWG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB4bWw6IHN0cmluZywgcmVhZG9ubHkgbWFwcGluZ0lyaTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNYbWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueG1sO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRhdGUgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERhdGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0WWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVuZEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnREYXk/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZERheT86IG51bWJlcikge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvciA9ICcvJztcblxuICAgIGdldERhdGVTYWxzYWgoKTogRGF0ZVNhbHNhaCB8IERhdGVSYW5nZVNhbHNhaCB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdGhpcy5lbmRZZWFyICYmIHRoaXMuc3RhcnRNb250aCA9PT0gdGhpcy5lbmRNb250aCAmJiB0aGlzLnN0YXJ0RGF5ID09PSB0aGlzLmVuZERheSAmJiB0aGlzLnN0YXJ0RXJhID09PSB0aGlzLmVuZEVyYSkge1xuICAgICAgICAgICAgLy8gcHJlY2lzZSBkYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXRlIHBlcmlvZFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUmFuZ2VTYWxzYWgobmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSksIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuZW5kRXJhLCB0aGlzLmVuZFllYXIsIHRoaXMuZW5kTW9udGgsIHRoaXMuZW5kRGF5KSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlU2Fsc2FoKCkuZ2V0RGF0ZUFzU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5rIHZhbHVlIG9iamVjdCAocmVpZmljYXRpb24pLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpbmtWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZUlyaTogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlPzogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2UudHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlua1ZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlZ2VyIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlZ2VyVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGludGVnZXI6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZWdlclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVnZXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGVjaW1hbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGVjaW1hbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBkZWNpbWFsOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREZWNpbWFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbC50b1N0cmluZygpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBmaWxlIHJlcHJlc2VudGF0aW9ucyBsaWtlIHN0aWxsSW1hZ2UsIG1vdmluZ0ltYWdlLCBhdWRpbyBldGMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGFic3RyYWN0IGlkOiBzdHJpbmc7XG5cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICAvLyBhYnN0cmFjdCB0eXBlU3BlY2lmaWNQcm9wczogYW55O1xuXG4gICAgYWJzdHJhY3QgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdGlsbCBpbWFnZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSBleHRlbmRzIEZpbGVWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VGaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVNlcnZlcklJSUZCYXNlVVJMOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlUGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBpbWFnZSBpcyBhIGpwZWcsIGl0IGlzIGEgcHJldmlldyBpbWFnZVxuICAgICAgICB0aGlzLmlzUHJldmlldyA9IGltYWdlRmlsZW5hbWUuZW5kc1dpdGgoJy5qcGcnKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgbWFrZUlJSUZVcmwocmVkdWNlRmFjdG9yOiBudW1iZXIpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKDEwMCAvIHJlZHVjZUZhY3Rvcik7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAocGVyY2VudGFnZSA+IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApID8gcGVyY2VudGFnZSA6IDUwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVNlcnZlcklJSUZCYXNlVVJMICsgJy8nICsgdGhpcy5pbWFnZUZpbGVuYW1lICsgJy9mdWxsL3BjdDonICsgcGVyY2VudGFnZS50b1N0cmluZygpICsgJy8wL2RlZmF1bHQuanBnJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtb3ZpbmcgaW1hZ2UgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZE1vdmluZ0ltYWdlRmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGRpbVg6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGltWTogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkdXJhdGlvbjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBmcHM/OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTW92aW5nSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICAvLyBwcmV2aWV3IGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmlkZW8gZmlsZSBpdHNlbGZcbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRNb3ZpbmdJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGF1ZGlvIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRBdWRpb0ZpbGVWYWx1ZSBleHRlbmRzIEZpbGVWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkF1ZGlvRmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQXVkaW9GaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIERERCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRERERmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRERERmlsZVZhbHVlO1xuXG4gICAgLy8gcHJldmlldyBkb2Vzbid0IGluY2x1ZGUgdGhlIERERCBmaWxlIGl0c2VsZlxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEREREZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgRG9jdW1lbnQgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERvY3VtZW50RmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRG9jdW1lbnRGaWxlVmFsdWU7XG5cbiAgICAvLyBwcmV2aWV3IGRvZXNuJ3QgaW5jbHVkZSB0aGUgREREIGZpbGUgaXRzZWxmXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRG9jdW1lbnRGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgcmVwcmVzZW50YXRpb24gdmFsdWUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdGV4dEZpbGVuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlVVJMOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RmlsZVVSTDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sb3IgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZENvbG9yVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbG9ySGV4OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JIZXg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCBpbiBhIDJELWNvb3JkaW5hdGUgc3lzdGVtIChmb3IgZ2VvbWV0cnkgdmFsdWVzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBwYXJzZWQgZnJvbSBKU09OLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaW9uR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgc3RhdHVzOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lQ29sb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcG9pbnRzOiBQb2ludDJEW10sXG4gICAgICAgIHB1YmxpYyB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByYWRpdXM/OiBQb2ludDJEXG4gICAgKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkR2VvbVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBnZW9tZXRyeVN0cmluZzogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnlKU09OID0gSlNPTi5wYXJzZShnZW9tZXRyeVN0cmluZyk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludDJEW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBnZW9tZXRyeUpTT04ucG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQyRChwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFkaXVzO1xuICAgICAgICBpZiAoZ2VvbWV0cnlKU09OLnJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzID0gbmV3IFBvaW50MkQoZ2VvbWV0cnlKU09OLnJhZGl1cy54LCBnZW9tZXRyeUpTT04ucmFkaXVzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBSZWdpb25HZW9tZXRyeShcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5zdGF0dXMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZUNvbG9yLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi50eXBlLFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnk7XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuR2VvbVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlb21ldHJ5U3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVVJJIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRVcmlWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFVyaVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVyaTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQm9vbGVhbiB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQm9vbGVhblZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBib29sOiBib29sZWFuKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQm9vbGVhblZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2wudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlcnZhbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlcnZhbFN0YXJ0OiBudW1iZXIsIHJlYWRvbmx5IGludGVydmFsRW5kOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbFN0YXJ0LnRvU3RyaW5nKCkgKyAnLScgKyB0aGlzLmludGVydmFsRW5kO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaXN0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlSXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaXN0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE5vZGVJcmk7XG4gICAgfVxuXG59XG4iXX0=