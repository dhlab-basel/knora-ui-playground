import * as tslib_1 from "tslib";
import { KnoraConstants } from '../../knora-constants';
import { DateRangeSalsah, DateSalsah } from '../../shared/date';
/**
 * Abstract class representing a text value object with or without markup.
 */
var ReadTextValue = /** @class */ (function () {
    function ReadTextValue() {
        this.type = KnoraConstants.TextValue;
    }
    return ReadTextValue;
}());
export { ReadTextValue };
/**
 * Represents a text value object without markup (mere character string).
 */
var ReadTextValueAsString = /** @class */ (function (_super) {
    tslib_1.__extends(ReadTextValueAsString, _super);
    function ReadTextValueAsString(id, propIri, str) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.str = str;
        return _this;
    }
    ReadTextValueAsString.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsString;
    };
    ReadTextValueAsString.prototype.getContent = function () {
        return this.str;
    };
    return ReadTextValueAsString;
}(ReadTextValue));
export { ReadTextValueAsString };
/**
 * Represents resources referred to by standoff links.
 */
var ReferredResourcesByStandoffLink = /** @class */ (function () {
    function ReferredResourcesByStandoffLink() {
    }
    return ReferredResourcesByStandoffLink;
}());
export { ReferredResourcesByStandoffLink };
/**
 * Represents a text value object with markup that has been turned into HTML.
 */
var ReadTextValueAsHtml = /** @class */ (function (_super) {
    tslib_1.__extends(ReadTextValueAsHtml, _super);
    function ReadTextValueAsHtml(id, propIri, html, referredResources) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.html = html;
        _this.referredResources = referredResources;
        return _this;
    }
    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    ReadTextValueAsHtml.prototype.getReferredResourceInfo = function (resourceIri, ontologyInfo) {
        if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {
            var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);
            return this.referredResources[resourceIri].label + (" (" + resClassLabel + ")");
        }
        else {
            return 'no information found about referred resource (target of standoff link)';
        }
    };
    ReadTextValueAsHtml.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsHtml;
    };
    ReadTextValueAsHtml.prototype.getContent = function () {
        return this.html;
    };
    return ReadTextValueAsHtml;
}(ReadTextValue));
export { ReadTextValueAsHtml };
/**
 * Represents a text value object with markup as XML.
 */
var ReadTextValueAsXml = /** @class */ (function (_super) {
    tslib_1.__extends(ReadTextValueAsXml, _super);
    function ReadTextValueAsXml(id, propIri, xml, mappingIri) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.xml = xml;
        _this.mappingIri = mappingIri;
        return _this;
    }
    ReadTextValueAsXml.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsXml;
    };
    ReadTextValueAsXml.prototype.getContent = function () {
        return this.xml;
    };
    return ReadTextValueAsXml;
}(ReadTextValue));
export { ReadTextValueAsXml };
/**
 * Represents a date value object.
 */
var ReadDateValue = /** @class */ (function () {
    function ReadDateValue(id, propIri, calendar, startYear, endYear, startEra, endEra, startMonth, endMonth, startDay, endDay) {
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
    ReadDateValue.prototype.getDateSalsah = function () {
        if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
            // precise date
            return new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
        }
        else {
            // date period
            return new DateRangeSalsah(new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new DateSalsah(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
        }
    };
    ReadDateValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDateValue;
    };
    ReadDateValue.prototype.getContent = function () {
        return this.getDateSalsah().getDateAsString();
    };
    return ReadDateValue;
}());
export { ReadDateValue };
/**
 * Represents a link value object (reification).
 */
var ReadLinkValue = /** @class */ (function () {
    function ReadLinkValue(id, propIri, referredResourceIri, referredResource) {
        this.id = id;
        this.propIri = propIri;
        this.referredResourceIri = referredResourceIri;
        this.referredResource = referredResource;
        this.type = KnoraConstants.LinkValue;
    }
    ReadLinkValue.prototype.getReferredResourceInfo = function (ontologyInfo) {
        if (this.referredResource !== undefined) {
            var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);
            return this.referredResource.label + (" (" + resClassLabel + ")");
        }
        else {
            return this.referredResourceIri;
        }
    };
    ReadLinkValue.prototype.getClassName = function () {
        return KnoraConstants.ReadLinkValue;
    };
    ReadLinkValue.prototype.getContent = function () {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        }
        else {
            return this.referredResourceIri;
        }
    };
    return ReadLinkValue;
}());
export { ReadLinkValue };
/**
 * Represents an integer value object.
 */
var ReadIntegerValue = /** @class */ (function () {
    function ReadIntegerValue(id, propIri, integer) {
        this.id = id;
        this.propIri = propIri;
        this.integer = integer;
        this.type = KnoraConstants.IntValue;
    }
    ReadIntegerValue.prototype.getClassName = function () {
        return KnoraConstants.ReadIntegerValue;
    };
    ReadIntegerValue.prototype.getContent = function () {
        return this.integer.toString();
    };
    return ReadIntegerValue;
}());
export { ReadIntegerValue };
/**
 * Represents a decimal value object.
 */
var ReadDecimalValue = /** @class */ (function () {
    function ReadDecimalValue(id, propIri, decimal) {
        this.id = id;
        this.propIri = propIri;
        this.decimal = decimal;
        this.type = KnoraConstants.DecimalValue;
    }
    ReadDecimalValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDecimalValue;
    };
    ReadDecimalValue.prototype.getContent = function () {
        return this.decimal.toString();
    };
    return ReadDecimalValue;
}());
export { ReadDecimalValue };
/**
 * Abstract class for file representations like stillImage, movingImage, audio etc.
 */
var FileValue = /** @class */ (function () {
    function FileValue() {
    }
    return FileValue;
}());
export { FileValue };
/**
 * Represents a still image value object.
 */
var ReadStillImageFileValue = /** @class */ (function (_super) {
    tslib_1.__extends(ReadStillImageFileValue, _super);
    function ReadStillImageFileValue(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.imageFilename = imageFilename;
        _this.imageServerIIIFBaseURL = imageServerIIIFBaseURL;
        _this.imagePath = imagePath;
        _this.dimX = dimX;
        _this.dimY = dimY;
        _this.type = KnoraConstants.StillImageFileValue;
        // if the image is a jpeg, it is a preview image
        _this.isPreview = imageFilename.endsWith('.jpg');
        return _this;
    }
    ReadStillImageFileValue.prototype.makeIIIFUrl = function (reduceFactor) {
        if (this.isPreview) {
            return this.imagePath;
        }
        else {
            var percentage = Math.floor(100 / reduceFactor);
            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;
            return this.imageServerIIIFBaseURL + '/' + this.imageFilename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
        }
    };
    ReadStillImageFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadStillImageFileValue;
    };
    ReadStillImageFileValue.prototype.getContent = function () {
        return this.imagePath;
    };
    return ReadStillImageFileValue;
}(FileValue));
export { ReadStillImageFileValue };
/**
 * Represents a moving image value object.
 */
var ReadMovingImageFileValue = /** @class */ (function (_super) {
    tslib_1.__extends(ReadMovingImageFileValue, _super);
    function ReadMovingImageFileValue(id, propIri, filename, path, dimX, dimY, duration, fps) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.filename = filename;
        _this.path = path;
        _this.dimX = dimX;
        _this.dimY = dimY;
        _this.duration = duration;
        _this.fps = fps;
        _this.type = KnoraConstants.MovingImageFileValue;
        return _this;
    }
    ReadMovingImageFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadMovingImageFileValue;
    };
    ReadMovingImageFileValue.prototype.getContent = function () {
        return this.path;
    };
    return ReadMovingImageFileValue;
}(FileValue));
export { ReadMovingImageFileValue };
/**
 * Represents an audio value object.
 */
var ReadAudioFileValue = /** @class */ (function (_super) {
    tslib_1.__extends(ReadAudioFileValue, _super);
    function ReadAudioFileValue(id, propIri, filename, path, duration) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.filename = filename;
        _this.path = path;
        _this.duration = duration;
        _this.type = KnoraConstants.AudioFileValue;
        return _this;
    }
    ReadAudioFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadAudioFileValue;
    };
    ReadAudioFileValue.prototype.getContent = function () {
        return this.path;
    };
    return ReadAudioFileValue;
}(FileValue));
export { ReadAudioFileValue };
/**
 * Represents a DDD value object.
 */
var ReadDDDFileValue = /** @class */ (function (_super) {
    tslib_1.__extends(ReadDDDFileValue, _super);
    function ReadDDDFileValue(id, propIri, filename, path) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.filename = filename;
        _this.path = path;
        _this.type = KnoraConstants.DDDFileValue;
        return _this;
    }
    ReadDDDFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDDDFileValue;
    };
    ReadDDDFileValue.prototype.getContent = function () {
        return this.path;
    };
    return ReadDDDFileValue;
}(FileValue));
export { ReadDDDFileValue };
/**
 * Represents a Document value object.
 */
var ReadDocumentFileValue = /** @class */ (function (_super) {
    tslib_1.__extends(ReadDocumentFileValue, _super);
    function ReadDocumentFileValue(id, propIri, filename, path) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.filename = filename;
        _this.path = path;
        _this.type = KnoraConstants.DocumentFileValue;
        return _this;
    }
    ReadDocumentFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDocumentFileValue;
    };
    ReadDocumentFileValue.prototype.getContent = function () {
        return this.path;
    };
    return ReadDocumentFileValue;
}(FileValue));
export { ReadDocumentFileValue };
/**
 * Represents a text representation value object
 */
var ReadTextFileValue = /** @class */ (function () {
    function ReadTextFileValue(id, propIri, textFilename, textFileURL) {
        this.id = id;
        this.propIri = propIri;
        this.textFilename = textFilename;
        this.textFileURL = textFileURL;
        this.type = KnoraConstants.TextFileValue;
    }
    ReadTextFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadTextFileValue;
    };
    ReadTextFileValue.prototype.getContent = function () {
        return this.textFileURL;
    };
    return ReadTextFileValue;
}());
export { ReadTextFileValue };
/**
 * Represents a color value object.
 */
var ReadColorValue = /** @class */ (function () {
    function ReadColorValue(id, propIri, colorHex) {
        this.id = id;
        this.propIri = propIri;
        this.colorHex = colorHex;
        this.type = KnoraConstants.ColorValue;
    }
    ReadColorValue.prototype.getClassName = function () {
        return KnoraConstants.ReadColorValue;
    };
    ReadColorValue.prototype.getContent = function () {
        return this.colorHex;
    };
    return ReadColorValue;
}());
export { ReadColorValue };
/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2D;
}());
export { Point2D };
/**
 * Represents a geometry value parsed from JSON.
 */
var RegionGeometry = /** @class */ (function () {
    function RegionGeometry(status, lineColor, lineWidth, points, type, radius) {
        this.status = status;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.points = points;
        this.type = type;
        this.radius = radius;
    }
    return RegionGeometry;
}());
export { RegionGeometry };
/**
 * Represents a geometry value object.
 */
var ReadGeomValue = /** @class */ (function () {
    function ReadGeomValue(id, propIri, geometryString) {
        var e_1, _a;
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        var geometryJSON = JSON.parse(geometryString);
        var points = [];
        try {
            for (var _b = tslib_1.__values(geometryJSON.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                points.push(new Point2D(point.x, point.y));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
    }
    ReadGeomValue.prototype.getClassName = function () {
        return KnoraConstants.ReadGeomValue;
    };
    ReadGeomValue.prototype.getContent = function () {
        return this.geometryString;
    };
    return ReadGeomValue;
}());
export { ReadGeomValue };
/**
 * Represents a URI value object.
 */
var ReadUriValue = /** @class */ (function () {
    function ReadUriValue(id, propIri, uri) {
        this.id = id;
        this.propIri = propIri;
        this.uri = uri;
        this.type = KnoraConstants.UriValue;
    }
    ReadUriValue.prototype.getClassName = function () {
        return KnoraConstants.ReadUriValue;
    };
    ReadUriValue.prototype.getContent = function () {
        return this.uri;
    };
    return ReadUriValue;
}());
export { ReadUriValue };
/**
 * Represents a Boolean value object.
 */
var ReadBooleanValue = /** @class */ (function () {
    function ReadBooleanValue(id, propIri, bool) {
        this.id = id;
        this.propIri = propIri;
        this.bool = bool;
        this.type = KnoraConstants.BooleanValue;
    }
    ReadBooleanValue.prototype.getClassName = function () {
        return KnoraConstants.ReadBooleanValue;
    };
    ReadBooleanValue.prototype.getContent = function () {
        return this.bool.toString();
    };
    return ReadBooleanValue;
}());
export { ReadBooleanValue };
/**
 * Represents an interval value object.
 */
var ReadIntervalValue = /** @class */ (function () {
    function ReadIntervalValue(id, propIri, intervalStart, intervalEnd) {
        this.id = id;
        this.propIri = propIri;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.type = KnoraConstants.IntervalValue;
    }
    ReadIntervalValue.prototype.getClassName = function () {
        return KnoraConstants.ReadIntervalValue;
    };
    ReadIntervalValue.prototype.getContent = function () {
        return this.intervalStart.toString() + '-' + this.intervalEnd;
    };
    return ReadIntervalValue;
}());
export { ReadIntervalValue };
/**
 * Represents a list value object.
 */
var ReadListValue = /** @class */ (function () {
    function ReadListValue(id, propIri, listNodeIri) {
        this.id = id;
        this.propIri = propIri;
        this.listNodeIri = listNodeIri;
        this.type = KnoraConstants.ListValue;
    }
    ReadListValue.prototype.getClassName = function () {
        return KnoraConstants.ReadListValue;
    };
    ReadListValue.prototype.getContent = function () {
        return this.listNodeIri;
    };
    return ReadListValue;
}());
export { ReadListValue };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1wcm9wZXJ0eS1pdGVtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFxQ2hFOztHQUVHO0FBQ0g7SUFBQTtRQUlhLFNBQUksR0FBVyxjQUFjLENBQUMsU0FBUyxDQUFDO0lBT3JELENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFYRCxJQVdDOztBQUVEOztHQUVHO0FBQ0g7SUFBMkMsaURBQWE7SUFFcEQsK0JBQXNCLEVBQVUsRUFBVyxPQUFlLEVBQVMsR0FBVztRQUE5RSxZQUNJLGlCQUFPLFNBQ1Y7UUFGcUIsUUFBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLGFBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFROztJQUU5RSxDQUFDO0lBRUQsNENBQVksR0FBWjtRQUNJLE9BQU8sY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ2hELENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFiRCxDQUEyQyxhQUFhLEdBYXZEOztBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCxzQ0FBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUVEOztHQUVHO0FBQ0g7SUFBeUMsK0NBQWE7SUFFbEQsNkJBQXNCLEVBQVUsRUFBVyxPQUFlLEVBQVcsSUFBWSxFQUFXLGlCQUFrRDtRQUE5SSxZQUNJLGlCQUFPLFNBQ1Y7UUFGcUIsUUFBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLGFB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LEdBQVo7UUFDSSxPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uL3Jlc291cmNlcy9yZWFkLXJlc291cmNlJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWggfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF0ZSc7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhbnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIElyaS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIHR5cGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB2YWx1ZSBvYmplY3QuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXMgYSBzdHJpbmcgKGNvbXBsZXhpdHkgb2YgdGhlIHZhbHVlIHBvc3NpYmx5IHJlZHVjZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG9yIHdpdGhvdXQgbWFya3VwLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhZFRleHRWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTtcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aG91dCBtYXJrdXAgKG1lcmUgY2hhcmFjdGVyIHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHB1YmxpYyBzdHI6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzU3RyaW5nO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyByZXNvdXJjZXMgcmVmZXJyZWQgdG8gYnkgc3RhbmRvZmYgbGlua3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlYWRSZXNvdXJjZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgdGhhdCBoYXMgYmVlbiB0dXJuZWQgaW50byBIVE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzSHRtbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgaHRtbDogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluaykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaW5mb3JtYXRpb24gYWJvdXQgYSByZXNvdXJjZSByZWZlcnJlZCB0byBieSBhIHN0YW5kb2ZmIGxpbmsgZnJvbSBhIHRleHQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2VJcmkgdGhlIElyaSBvZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UuXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gb250b2xvZ3kgaW5mb3JtYXRpb24uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlZmVycmVkIHJlc291cmNlJ3MgY2xhc3MgYW5kIGl0cyBsYWJlbC5cbiAgICAgKi9cblxuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ocmVzb3VyY2VJcmk6IHN0cmluZywgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2VzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXS50eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdubyBpbmZvcm1hdGlvbiBmb3VuZCBhYm91dCByZWZlcnJlZCByZXNvdXJjZSAodGFyZ2V0IG9mIHN0YW5kb2ZmIGxpbmspJztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNIdG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgdmFsdWUgb2JqZWN0IHdpdGggbWFya3VwIGFzIFhNTC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRUZXh0VmFsdWVBc1htbCBleHRlbmRzIFJlYWRUZXh0VmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgeG1sOiBzdHJpbmcsIHJlYWRvbmx5IG1hcHBpbmdJcmk6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRWYWx1ZUFzWG1sO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnhtbDtcbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBkYXRlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREYXRlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjYWxlbmRhcjogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydFllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kWWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBzdGFydEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBlbmRFcmE6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3RhcnRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZW5kTW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RGF5PzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmREYXk/OiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlO1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3IgPSAnLyc7XG5cbiAgICBnZXREYXRlU2Fsc2FoKCk6IERhdGVTYWxzYWggfCBEYXRlUmFuZ2VTYWxzYWgge1xuICAgICAgICBpZiAodGhpcy5zdGFydFllYXIgPT09IHRoaXMuZW5kWWVhciAmJiB0aGlzLnN0YXJ0TW9udGggPT09IHRoaXMuZW5kTW9udGggJiYgdGhpcy5zdGFydERheSA9PT0gdGhpcy5lbmREYXkgJiYgdGhpcy5zdGFydEVyYSA9PT0gdGhpcy5lbmRFcmEpIHtcbiAgICAgICAgICAgIC8vIHByZWNpc2UgZGF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF0ZSBwZXJpb2RcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZVJhbmdlU2Fsc2FoKG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuc3RhcnRFcmEsIHRoaXMuc3RhcnRZZWFyLCB0aGlzLnN0YXJ0TW9udGgsIHRoaXMuc3RhcnREYXkpLCBuZXcgRGF0ZVNhbHNhaCh0aGlzLmNhbGVuZGFyLCB0aGlzLmVuZEVyYSwgdGhpcy5lbmRZZWFyLCB0aGlzLmVuZE1vbnRoLCB0aGlzLmVuZERheSkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREYXRlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZVNhbHNhaCgpLmdldERhdGVBc1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbGluayB2YWx1ZSBvYmplY3QgKHJlaWZpY2F0aW9uKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaW5rVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VJcmk6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZT86IFJlYWRSZXNvdXJjZSkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTtcblxuICAgIGdldFJlZmVycmVkUmVzb3VyY2VJbmZvKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbikge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NMYWJlbCA9IG9udG9sb2d5SW5mby5nZXRMYWJlbEZvclJlc291cmNlQ2xhc3ModGhpcy5yZWZlcnJlZFJlc291cmNlLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlLmxhYmVsICsgYCAoJHtyZXNDbGFzc0xhYmVsfSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZUlyaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpbmtWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5yZWZlcnJlZFJlc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZWdlciB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZWdlclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlZ2VyOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVnZXJWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRlY2ltYWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERlY2ltYWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgZGVjaW1hbDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRGVjaW1hbFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY2ltYWwudG9TdHJpbmcoKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBmb3IgZmlsZSByZXByZXNlbnRhdGlvbnMgbGlrZSBzdGlsbEltYWdlLCBtb3ZpbmdJbWFnZSwgYXVkaW8gZXRjLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmlsZVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBhYnN0cmFjdCBpZDogc3RyaW5nO1xuXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgYWJzdHJhY3QgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLy8gYWJzdHJhY3QgdHlwZVNwZWNpZmljUHJvcHM6IGFueTtcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RpbGwgaW1hZ2UgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgZXh0ZW5kcyBGaWxlVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlRmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZGltWDogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkaW1ZOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBpZiB0aGUgaW1hZ2UgaXMgYSBqcGVnLCBpdCBpcyBhIHByZXZpZXcgaW1hZ2VcbiAgICAgICAgdGhpcy5pc1ByZXZpZXcgPSBpbWFnZUZpbGVuYW1lLmVuZHNXaXRoKCcuanBnJyk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuU3RpbGxJbWFnZUZpbGVWYWx1ZTtcblxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIG1ha2VJSUlGVXJsKHJlZHVjZUZhY3RvcjogbnVtYmVyKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5pc1ByZXZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gTWF0aC5mbG9vcigxMDAgLyByZWR1Y2VGYWN0b3IpO1xuXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gKHBlcmNlbnRhZ2UgPiAwICYmIHBlcmNlbnRhZ2UgPD0gMTAwKSA/IHBlcmNlbnRhZ2UgOiA1MDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VTZXJ2ZXJJSUlGQmFzZVVSTCArICcvJyArIHRoaXMuaW1hZ2VGaWxlbmFtZSArICcvZnVsbC9wY3Q6JyArIHBlcmNlbnRhZ2UudG9TdHJpbmcoKSArICcvMC9kZWZhdWx0LmpwZyc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbW92aW5nIGltYWdlIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRNb3ZpbmdJbWFnZUZpbGVWYWx1ZSBleHRlbmRzIEZpbGVWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZHVyYXRpb246IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZnBzPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk1vdmluZ0ltYWdlRmlsZVZhbHVlO1xuXG4gICAgLy8gcHJldmlldyBkb2Vzbid0IGluY2x1ZGUgdGhlIHZpZGVvIGZpbGUgaXRzZWxmXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTW92aW5nSW1hZ2VGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBhdWRpbyB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQXVkaW9GaWxlVmFsdWUgZXh0ZW5kcyBGaWxlVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZHVyYXRpb246IG51bWJlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5BdWRpb0ZpbGVWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEF1ZGlvRmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBEREQgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEREREZpbGVWYWx1ZSBleHRlbmRzIEZpbGVWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkREREZpbGVWYWx1ZTtcblxuICAgIC8vIHByZXZpZXcgZG9lc24ndCBpbmNsdWRlIHRoZSBEREQgZmlsZSBpdHNlbGZcbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRERERGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIERvY3VtZW50IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWREb2N1bWVudEZpbGVWYWx1ZSBleHRlbmRzIEZpbGVWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkRvY3VtZW50RmlsZVZhbHVlO1xuXG4gICAgLy8gcHJldmlldyBkb2Vzbid0IGluY2x1ZGUgdGhlIERERCBmaWxlIGl0c2VsZlxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERvY3VtZW50RmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHJlcHJlc2VudGF0aW9uIHZhbHVlIG9iamVjdFxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlbmFtZTogc3RyaW5nLCByZWFkb25seSB0ZXh0RmlsZVVSTDogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFRleHRGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dEZpbGVVUkw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbG9yIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRDb2xvclZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBjb2xvckhleDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRDb2xvclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9ySGV4O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgaW4gYSAyRC1jb29yZGluYXRlIHN5c3RlbSAoZm9yIGdlb21ldHJ5IHZhbHVlcykuXG4gKi9cbmV4cG9ydCBjbGFzcyBQb2ludDJEIHtcbiAgICBjb25zdHJ1Y3RvciAocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlcikge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgcGFyc2VkIGZyb20gSlNPTi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZ2lvbkdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvciAocHVibGljIHN0YXR1czogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZUNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHBvaW50czogUG9pbnQyRFtdLFxuICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmFkaXVzPzogUG9pbnQyRFxuICAgICkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEdlb21WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgZ2VvbWV0cnlTdHJpbmc6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5SlNPTiA9IEpTT04ucGFyc2UoZ2VvbWV0cnlTdHJpbmcpO1xuXG4gICAgICAgIGNvbnN0IHBvaW50czogUG9pbnQyRFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgb2YgZ2VvbWV0cnlKU09OLnBvaW50cykge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFBvaW50MkQocG9pbnQueCwgcG9pbnQueSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhZGl1cztcbiAgICAgICAgaWYgKGdlb21ldHJ5SlNPTi5yYWRpdXMpIHtcbiAgICAgICAgICAgIHJhZGl1cyA9IG5ldyBQb2ludDJEKGdlb21ldHJ5SlNPTi5yYWRpdXMueCwgZ2VvbWV0cnlKU09OLnJhZGl1cy55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUmVnaW9uR2VvbWV0cnkoXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04uc3RhdHVzLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVDb2xvcixcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5saW5lV2lkdGgsXG4gICAgICAgICAgICBwb2ludHMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04udHlwZSxcbiAgICAgICAgICAgIHJhZGl1c1xuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZ2VvbWV0cnk6IFJlZ2lvbkdlb21ldHJ5O1xuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEdlb21WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW9tZXRyeVN0cmluZztcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIFVSSSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVXJpVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHVyaTogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuVXJpVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRVcmlWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cmk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIEJvb2xlYW4gdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEJvb2xlYW5WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgYm9vbDogYm9vbGVhbikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEJvb2xlYW5WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib29sLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZXJ2YWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgaW50ZXJ2YWxTdGFydDogbnVtYmVyLCByZWFkb25seSBpbnRlcnZhbEVuZDogbnVtYmVyKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEludGVydmFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWxTdGFydC50b1N0cmluZygpICsgJy0nICsgdGhpcy5pbnRlcnZhbEVuZDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbGlzdCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkTGlzdFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUlyaTogc3RyaW5nKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlzdFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlzdFZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3ROb2RlSXJpO1xuICAgIH1cblxufVxuIl19