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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1wcm9wZXJ0eS1pdGVtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFxQ2hFOztHQUVHO0FBQ0g7SUFBQTtRQUlhLFNBQUksR0FBVyxjQUFjLENBQUMsU0FBUyxDQUFDO0lBT3JELENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFYRCxJQVdDOztBQUVEOztHQUVHO0FBQ0g7SUFBMkMsaURBQWE7SUFFcEQsK0JBQXNCLEVBQVUsRUFBVyxPQUFlLEVBQVcsR0FBVztRQUFoRixZQUNJLGlCQUFPLFNBQ1Y7UUFGcUIsUUFBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLGFBQU8sR0FBUCxPQUFPLENBQVE7UUFBVyxTQUFHLEdBQUgsR0FBRyxDQUFROztJQUVoRixDQUFDO0lBRUQsNENBQVksR0FBWjtRQUNJLE9BQU8sY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBQ2hELENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFiRCxDQUEyQyxhQUFhLEdBYXZEOztBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCxzQ0FBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUVEOztHQUVHO0FBQ0g7SUFBeUMsK0NBQWE7SUFFbEQsNkJBQXNCLEVBQVUsRUFBVyxPQUFlLEVBQVcsSUFBWSxFQUFXLGlCQUFrRDtRQUE5SSxZQUNJLGlCQUFPLFNBQ1Y7UUFGcUIsUUFBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLGFB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LEdBQVo7UUFDSSxPQUFPLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4uL3Jlc291cmNlcy9yZWFkLXJlc291cmNlJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWggfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF0ZSc7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhbnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIElyaS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIHR5cGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB2YWx1ZSBvYmplY3QuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXMgYSBzdHJpbmcgKGNvbXBsZXhpdHkgb2YgdGhlIHZhbHVlIHBvc3NpYmx5IHJlZHVjZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG9yIHdpdGhvdXQgbWFya3VwLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhZFRleHRWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTtcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aG91dCBtYXJrdXAgKG1lcmUgY2hhcmFjdGVyIHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNTdHJpbmc7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHJlc291cmNlcyByZWZlcnJlZCB0byBieSBzdGFuZG9mZiBsaW5rcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVhZFJlc291cmNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCB0aGF0IGhhcyBiZWVuIHR1cm5lZCBpbnRvIEhUTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNIdG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBodG1sOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCBhIHJlc291cmNlIHJlZmVycmVkIHRvIGJ5IGEgc3RhbmRvZmYgbGluayBmcm9tIGEgdGV4dCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZWZlcnJlZCByZXNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyBvbnRvbG9neSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UncyBjbGFzcyBhbmQgaXRzIGxhYmVsLlxuICAgICAqL1xuXG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhyZXNvdXJjZUlyaTogc3RyaW5nLCBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0ubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ25vIGluZm9ybWF0aW9uIGZvdW5kIGFib3V0IHJlZmVycmVkIHJlc291cmNlICh0YXJnZXQgb2Ygc3RhbmRvZmYgbGluayknO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc0h0bWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgYXMgWE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzWG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB4bWw6IHN0cmluZywgcmVhZG9ubHkgbWFwcGluZ0lyaTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNYbWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueG1sO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRhdGUgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERhdGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0WWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVuZEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnREYXk/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZERheT86IG51bWJlcikge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvciA9ICcvJztcblxuICAgIGdldERhdGVTYWxzYWgoKTogRGF0ZVNhbHNhaCB8IERhdGVSYW5nZVNhbHNhaCB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdGhpcy5lbmRZZWFyICYmIHRoaXMuc3RhcnRNb250aCA9PT0gdGhpcy5lbmRNb250aCAmJiB0aGlzLnN0YXJ0RGF5ID09PSB0aGlzLmVuZERheSAmJiB0aGlzLnN0YXJ0RXJhID09PSB0aGlzLmVuZEVyYSkge1xuICAgICAgICAgICAgLy8gcHJlY2lzZSBkYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXRlIHBlcmlvZFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUmFuZ2VTYWxzYWgobmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSksIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuZW5kRXJhLCB0aGlzLmVuZFllYXIsIHRoaXMuZW5kTW9udGgsIHRoaXMuZW5kRGF5KSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlU2Fsc2FoKCkuZ2V0RGF0ZUFzU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5rIHZhbHVlIG9iamVjdCAocmVpZmljYXRpb24pLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpbmtWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZUlyaTogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlPzogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2UudHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlua1ZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlZ2VyIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlZ2VyVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGludGVnZXI6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZWdlclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVnZXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGVjaW1hbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGVjaW1hbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBkZWNpbWFsOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREZWNpbWFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbC50b1N0cmluZygpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBmaWxlIHJlcHJlc2VudGF0aW9ucyBsaWtlIHN0aWxsSW1hZ2UsIG1vdmluZ0ltYWdlLCBhdWRpbyBldGMuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGFic3RyYWN0IGlkOiBzdHJpbmc7XG5cbiAgICByZWFkb25seSB0eXBlOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBwcm9wSXJpOiBzdHJpbmc7XG5cbiAgICAvLyBhYnN0cmFjdCB0eXBlU3BlY2lmaWNQcm9wczogYW55O1xuXG4gICAgYWJzdHJhY3QgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENvbnRlbnQoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdGlsbCBpbWFnZSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSBleHRlbmRzIEZpbGVWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VGaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpbWFnZVNlcnZlcklJSUZCYXNlVVJMOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlUGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkaW1YOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRpbVk6IG51bWJlcikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBpbWFnZSBpcyBhIGpwZWcsIGl0IGlzIGEgcHJldmlldyBpbWFnZVxuICAgICAgICB0aGlzLmlzUHJldmlldyA9IGltYWdlRmlsZW5hbWUuZW5kc1dpdGgoJy5qcGcnKTtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgbWFrZUlJSUZVcmwocmVkdWNlRmFjdG9yOiBudW1iZXIpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VQYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLmZsb29yKDEwMCAvIHJlZHVjZUZhY3Rvcik7XG5cbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAocGVyY2VudGFnZSA+IDAgJiYgcGVyY2VudGFnZSA8PSAxMDApID8gcGVyY2VudGFnZSA6IDUwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVNlcnZlcklJSUZCYXNlVVJMICsgJy8nICsgdGhpcy5pbWFnZUZpbGVuYW1lICsgJy9mdWxsL3BjdDonICsgcGVyY2VudGFnZS50b1N0cmluZygpICsgJy8wL2RlZmF1bHQuanBnJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtb3ZpbmcgaW1hZ2UgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZE1vdmluZ0ltYWdlRmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGRpbVg6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGltWTogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkdXJhdGlvbjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBmcHM/OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTW92aW5nSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICAvLyBwcmV2aWV3IGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmlkZW8gZmlsZSBpdHNlbGZcbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRNb3ZpbmdJbWFnZUZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGF1ZGlvIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRBdWRpb0ZpbGVWYWx1ZSBleHRlbmRzIEZpbGVWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZmlsZW5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcGF0aDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBkdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkF1ZGlvRmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQXVkaW9GaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIERERCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRERERmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRERERmlsZVZhbHVlO1xuXG4gICAgLy8gcHJldmlldyBkb2Vzbid0IGluY2x1ZGUgdGhlIERERCBmaWxlIGl0c2VsZlxuICAgIHJlYWRvbmx5IGlzUHJldmlldzogYm9vbGVhbjtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEREREZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgRG9jdW1lbnQgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERvY3VtZW50RmlsZVZhbHVlIGV4dGVuZHMgRmlsZVZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuRG9jdW1lbnRGaWxlVmFsdWU7XG5cbiAgICAvLyBwcmV2aWV3IGRvZXNuJ3QgaW5jbHVkZSB0aGUgREREIGZpbGUgaXRzZWxmXG4gICAgcmVhZG9ubHkgaXNQcmV2aWV3OiBib29sZWFuO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkRG9jdW1lbnRGaWxlVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgcmVwcmVzZW50YXRpb24gdmFsdWUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdGV4dEZpbGVuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlVVJMOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RmlsZVVSTDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sb3IgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZENvbG9yVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbG9ySGV4OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JIZXg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCBpbiBhIDJELWNvb3JkaW5hdGUgc3lzdGVtIChmb3IgZ2VvbWV0cnkgdmFsdWVzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBwYXJzZWQgZnJvbSBKU09OLlxuICovXG5leHBvcnQgY2xhc3MgUmVnaW9uR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgc3RhdHVzOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lQ29sb3I6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcG9pbnRzOiBQb2ludDJEW10sXG4gICAgICAgIHB1YmxpYyB0eXBlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyByYWRpdXM/OiBQb2ludDJEXG4gICAgKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnZW9tZXRyeSB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkR2VvbVZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBnZW9tZXRyeVN0cmluZzogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnlKU09OID0gSlNPTi5wYXJzZShnZW9tZXRyeVN0cmluZyk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludDJEW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBnZW9tZXRyeUpTT04ucG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQyRChwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFkaXVzO1xuICAgICAgICBpZiAoZ2VvbWV0cnlKU09OLnJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzID0gbmV3IFBvaW50MkQoZ2VvbWV0cnlKU09OLnJhZGl1cy54LCBnZW9tZXRyeUpTT04ucmFkaXVzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBSZWdpb25HZW9tZXRyeShcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5zdGF0dXMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZUNvbG9yLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi50eXBlLFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnk7XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuR2VvbVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlb21ldHJ5U3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVVJJIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRVcmlWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgdXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZFVyaVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVyaTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQm9vbGVhbiB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkQm9vbGVhblZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBib29sOiBib29sZWFuKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQm9vbGVhblZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkQm9vbGVhblZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2wudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVydmFsIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlcnZhbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlcnZhbFN0YXJ0OiBudW1iZXIsIHJlYWRvbmx5IGludGVydmFsRW5kOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbFN0YXJ0LnRvU3RyaW5nKCkgKyAnLScgKyB0aGlzLmludGVydmFsRW5kO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRMaXN0VmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yIChyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpOiBzdHJpbmcsIHJlYWRvbmx5IGxpc3ROb2RlSXJpOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRMaXN0VmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdE5vZGVJcmk7XG4gICAgfVxuXG59XG4iXX0=