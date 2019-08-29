import { ReadResource } from '../resources/read-resource';
import { OntologyInformation } from '../../../../services';
import { DateRangeSalsah, DateSalsah } from '../../shared/date';
/**
 * An abstract interface representing any value object.
 */
export interface ReadPropertyItem {
    /**
     * The value object's Iri.
     */
    readonly id: string;
    /**
     * The value object's type.
     */
    readonly type: string;
    /**
     * The property pointing to the value object.
     */
    readonly propIri: string;
    /**
     * Gets the class name of the class that implements this interface.
     *
     * @returns {string}
     */
    getClassName(): string;
    /**
     * Gets the value as a string (complexity of the value possibly reduced).
     *
     * @returns {string}
     */
    getContent(): string;
}
/**
 * Abstract class representing a text value object with or without markup.
 */
export declare abstract class ReadTextValue implements ReadPropertyItem {
    abstract id: string;
    readonly type: string;
    abstract propIri: string;
    abstract getClassName(): string;
    abstract getContent(): string;
}
/**
 * Represents a text value object without markup (mere character string).
 */
export declare class ReadTextValueAsString extends ReadTextValue {
    readonly id: string;
    readonly propIri: string;
    str: string;
    constructor(id: string, propIri: string, str: string);
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents resources referred to by standoff links.
 */
export declare class ReferredResourcesByStandoffLink {
    [index: string]: ReadResource;
}
/**
 * Represents a text value object with markup that has been turned into HTML.
 */
export declare class ReadTextValueAsHtml extends ReadTextValue {
    readonly id: string;
    readonly propIri: string;
    readonly html: string;
    readonly referredResources: ReferredResourcesByStandoffLink;
    constructor(id: string, propIri: string, html: string, referredResources: ReferredResourcesByStandoffLink);
    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    getReferredResourceInfo(resourceIri: string, ontologyInfo: OntologyInformation): string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a text value object with markup as XML.
 */
export declare class ReadTextValueAsXml extends ReadTextValue {
    readonly id: string;
    readonly propIri: string;
    readonly xml: string;
    readonly mappingIri: string;
    constructor(id: string, propIri: string, xml: string, mappingIri: string);
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a date value object.
 */
export declare class ReadDateValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly calendar: string;
    readonly startYear: number;
    readonly endYear: number;
    readonly startEra: string;
    readonly endEra: string;
    readonly startMonth?: number;
    readonly endMonth?: number;
    readonly startDay?: number;
    readonly endDay?: number;
    constructor(id: string, propIri: string, calendar: string, startYear: number, endYear: number, startEra: string, endEra: string, startMonth?: number, endMonth?: number, startDay?: number, endDay?: number);
    readonly type: string;
    private separator;
    getDateSalsah(): DateSalsah | DateRangeSalsah;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a link value object (reification).
 */
export declare class ReadLinkValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly referredResourceIri: string;
    readonly referredResource?: ReadResource;
    constructor(id: string, propIri: string, referredResourceIri: string, referredResource?: ReadResource);
    readonly type: string;
    getReferredResourceInfo(ontologyInfo: OntologyInformation): string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents an integer value object.
 */
export declare class ReadIntegerValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly integer: number;
    constructor(id: string, propIri: string, integer: number);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a decimal value object.
 */
export declare class ReadDecimalValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly decimal: number;
    constructor(id: string, propIri: string, decimal: number);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Abstract class for file representations like stillImage, movingImage, audio etc.
 */
export declare abstract class FileValue implements ReadPropertyItem {
    abstract id: string;
    readonly type: string;
    abstract propIri: string;
    abstract getClassName(): string;
    abstract getContent(): string;
}
/**
 * Represents a still image value object.
 */
export declare class ReadStillImageFileValue extends FileValue {
    readonly id: string;
    readonly propIri: string;
    readonly imageFilename: string;
    readonly imageServerIIIFBaseURL: string;
    readonly imagePath: string;
    readonly dimX: number;
    readonly dimY: number;
    constructor(id: string, propIri: string, imageFilename: string, imageServerIIIFBaseURL: string, imagePath: string, dimX: number, dimY: number);
    readonly type: string;
    readonly isPreview: boolean;
    makeIIIFUrl(reduceFactor: number): string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a moving image value object.
 */
export declare class ReadMovingImageFileValue extends FileValue {
    readonly id: string;
    readonly propIri: string;
    readonly filename: string;
    readonly path: string;
    readonly dimX: number;
    readonly dimY: number;
    readonly duration: number;
    readonly fps?: number;
    constructor(id: string, propIri: string, filename: string, path: string, dimX: number, dimY: number, duration: number, fps?: number);
    readonly type: string;
    readonly isPreview: boolean;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents an audio value object.
 */
export declare class ReadAudioFileValue extends FileValue {
    readonly id: string;
    readonly propIri: string;
    readonly filename: string;
    readonly path: string;
    readonly duration: number;
    constructor(id: string, propIri: string, filename: string, path: string, duration: number);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a DDD value object.
 */
export declare class ReadDDDFileValue extends FileValue {
    readonly id: string;
    readonly propIri: string;
    readonly filename: string;
    readonly path: string;
    constructor(id: string, propIri: string, filename: string, path: string);
    readonly type: string;
    readonly isPreview: boolean;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a Document value object.
 */
export declare class ReadDocumentFileValue extends FileValue {
    readonly id: string;
    readonly propIri: string;
    readonly filename: string;
    readonly path: string;
    constructor(id: string, propIri: string, filename: string, path: string);
    readonly type: string;
    readonly isPreview: boolean;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a text representation value object
 */
export declare class ReadTextFileValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly textFilename: string;
    readonly textFileURL: string;
    constructor(id: string, propIri: string, textFilename: string, textFileURL: string);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a color value object.
 */
export declare class ReadColorValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly colorHex: string;
    constructor(id: string, propIri: string, colorHex: string);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
export declare class Point2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
/**
 * Represents a geometry value parsed from JSON.
 */
export declare class RegionGeometry {
    status: string;
    lineColor: string;
    lineWidth: number;
    points: Point2D[];
    type: string;
    radius?: Point2D;
    constructor(status: string, lineColor: string, lineWidth: number, points: Point2D[], type: string, radius?: Point2D);
}
/**
 * Represents a geometry value object.
 */
export declare class ReadGeomValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly geometryString: string;
    constructor(id: string, propIri: string, geometryString: string);
    readonly geometry: RegionGeometry;
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a URI value object.
 */
export declare class ReadUriValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly uri: string;
    constructor(id: string, propIri: string, uri: string);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a Boolean value object.
 */
export declare class ReadBooleanValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly bool: boolean;
    constructor(id: string, propIri: string, bool: boolean);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents an interval value object.
 */
export declare class ReadIntervalValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly intervalStart: number;
    readonly intervalEnd: number;
    constructor(id: string, propIri: string, intervalStart: number, intervalEnd: number);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
/**
 * Represents a list value object.
 */
export declare class ReadListValue implements ReadPropertyItem {
    readonly id: string;
    readonly propIri: string;
    readonly listNodeIri: string;
    constructor(id: string, propIri: string, listNodeIri: string);
    readonly type: string;
    getClassName(): string;
    getContent(): string;
}
