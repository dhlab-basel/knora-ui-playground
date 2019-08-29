import { ReadResource, Resource } from './read-resource';
import { OntologyInformation } from '../../../../services/v2/ontology-cache.service';
/**
 * @deprecated Use **ResourceSequence** instead
 *
 * Represents a sequence of resources.
 */
export declare class ReadResourcesSequence {
    readonly resources: Array<ReadResource>;
    readonly numberOfResources: number;
    /**
     * Information about the entities used in the given collection of `ReadResource`.
     */
    readonly ontologyInformation: OntologyInformation;
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    constructor(resources: Array<ReadResource>, numberOfResources: number);
}
export declare class ResourcesSequence {
    readonly resources: Array<Resource>;
    readonly numberOfResources: number;
    /**
     * Information about the entities used in the given collection of `Resource`.
     */
    readonly ontologyInformation: OntologyInformation;
    /**
     *
     * @param {Array<Resource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    constructor(resources: Array<Resource>, numberOfResources: number);
}
