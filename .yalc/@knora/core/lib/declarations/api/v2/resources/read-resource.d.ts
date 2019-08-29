import { ReadProperties } from '../properties/read-properties';
import { FileRepresentation } from '../representations/fileRepresentation';
import { StillImageRepresentation } from '../representations/still-image-representation';
/**
 * @deprecated Use **Resource** instead
 *
 * Represents a resource and its properties.
 */
export declare class ReadResource {
    readonly id: string;
    readonly type: string;
    readonly label: string;
    incomingRegions: Array<ReadResource>;
    incomingStillImageRepresentations: Array<ReadResource>;
    incomingLinks: Array<ReadResource>;
    stillImageRepresentationsToDisplay: StillImageRepresentation[];
    readonly properties?: ReadProperties;
    /**
     *
     * @param {string} id the resource's Iri.
     * @param {string} type the resource's type (class).
     * @param {string} label the resource's rdfs:label.
     * @param {Array<ReadResource>} incomingRegions regions pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {Array<ReadResource>} incomingStillImageRepresentations still image representations pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {Array<ReadResource>} incomingLinks resources pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {StillImageRepresentation[]} stillImageRepresentationsToDisplay  still image representations to be displayed for this resource, if any (possibly to be queried by additional requests).
     * @param {ReadProperties} properties the resources's properties.
     */
    constructor(id: string, type: string, label: string, incomingRegions: Array<ReadResource>, incomingStillImageRepresentations: Array<ReadResource>, incomingLinks: Array<ReadResource>, stillImageRepresentationsToDisplay: StillImageRepresentation[], properties?: ReadProperties);
}
/**
 * This is a temporary class, to test a new resource setup.
 * When it works, we will replace the ReadResource object
 */
export declare class Resource {
    readonly id: string;
    readonly type: string;
    readonly label: string;
    incomingAnnotations: Array<Resource>;
    incomingFileRepresentations: Array<ReadResource>;
    incomingLinks: Array<Resource>;
    fileRepresentationsToDisplay: FileRepresentation;
    readonly properties?: ReadProperties;
    constructor(id: string, type: string, label: string, incomingAnnotations: Array<Resource>, // = incomingRegions in ReadResource
    incomingFileRepresentations: Array<ReadResource>, // = incomingStillImageRepresentations in ReadResource
    incomingLinks: Array<Resource>, fileRepresentationsToDisplay: FileRepresentation, // = stillImageRepresentationsToDisplay in ReadResource
    properties?: ReadProperties);
}
