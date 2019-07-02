import { OntologyService } from './ontology.service';
import { Observable } from 'rxjs';
/**
 * Represents an ontology's metadata.
 */
export declare class OntologyMetadata {
    readonly id: string;
    readonly label: string;
    /**
     * @hideconstructor
     *
     * @param {string} id Iri identifying the ontology.
     * @param {string} label a label describing the ontology.
     */
    constructor(id: string, label: string);
}
/**
 * Occurrence of a property for a resource class (its cardinality).
 */
export declare enum CardinalityOccurrence {
    minCard = 0,
    card = 1,
    maxCard = 2
}
/**
 * Cardinality of a property for the given resource class.
 */
export declare class Cardinality {
    readonly occurrence: CardinalityOccurrence;
    readonly value: number;
    readonly property: string;
    /**
     * @param {CardinalityOccurrence} occurrence type of given occurrence.
     * @param {number} value numerical value of given occurrence.
     * @param {string} property the property the given occurrence applies to.
     */
    constructor(occurrence: CardinalityOccurrence, value: number, property: string);
}
/**
 * Property gui order
 */
export declare class GuiOrder {
    readonly value: number;
    readonly property: string;
    /**
     * @param  {number} value
     * @param  {string} property
     */
    constructor(value: number, property: string);
}
/**
 * A resource class definition.
 */
export declare class ResourceClass {
    readonly id: string;
    readonly icon: string;
    readonly comment: string;
    readonly label: string;
    readonly cardinalities: Array<Cardinality>;
    readonly guiOrder: Array<GuiOrder>;
    /**
     * @param {string} id Iri identifying the resource class.
     * @param {string} icon path to an icon representing the resource class.
     * @param {string} comment comment on the resource class.
     * @param {string} label label describing the resource class.
     * @param {Cardinality[]} cardinalities the resource class's properties.
     * @param {GuiOrder[]} guiOrder the resource class's gui-order properties.
     */
    constructor(id: string, icon: string, comment: string, label: string, cardinalities: Array<Cardinality>, guiOrder: Array<GuiOrder>);
}
/**
 * A map of resource class Iris to resource class definitions.
 */
export declare class ResourceClasses {
    [index: string]: ResourceClass;
}
/**
 * A property definition.
 */
export declare class Property {
    readonly id: string;
    readonly objectType: string;
    readonly comment: string;
    readonly label: string;
    readonly subPropertyOf: Array<string>;
    readonly isEditable: Boolean;
    readonly isLinkProperty: Boolean;
    readonly isLinkValueProperty: Boolean;
    readonly guiAttribute: string[];
    /**
     * @param {string} id Iri identifying the property definition.
     * @param {string} objectType the property's object constraint.
     * @param {string} comment comment on the property definition.
     * @param {string} label label describing the property definition.
     * @param {string[]} subPropertyOf Iris of properties the given property is a subproperty of.
     * @param {boolean} isEditable indicates whether the given property can be edited by the client.
     * @param {boolean} isLinkProperty indicates whether the given property is a linking property.
     * @param {boolean} isLinkValueProperty indicates whether the given property refers to a link value.
     * @param {string} guiAttribute the gui attribute assigned to this property, if any.
     */
    constructor(id: string, objectType: string, comment: string, label: string, subPropertyOf: Array<string>, isEditable: Boolean, isLinkProperty: Boolean, isLinkValueProperty: Boolean, guiAttribute: string[]);
}
/**
 * A map of property Iris to property definitions.
 */
export declare class Properties {
    [index: string]: Property;
}
/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
export declare class ResourceClassIrisForOntology {
    [index: string]: Array<string>;
}
/**
 * Represents ontology information requested from this service.
 *
 * For every request, an instance of this class is returned containing the requested information.
 */
export declare class OntologyInformation {
    private resourceClassesForOntology;
    private resourceClasses;
    private properties;
    /**
     * @param {ResourceClassIrisForOntology} resourceClassesForOntology all resource class Iris for a given ontology.
     * @param {ResourceClasses} resourceClasses resource class definitions.
     * @param {Properties} properties property definitions.
     */
    constructor(resourceClassesForOntology: ResourceClassIrisForOntology, resourceClasses: ResourceClasses, properties: Properties);
    /**
     * Sorts an array of `ResourceClass` or `Property` by label.
     *
     * @param a first element
     * @param b second element
     * @return negative -1 if the first element is considered lower than the second, 1 if the second element is considered bigger, 0 if they are equal
     */
    static sortFunc(a: ResourceClass | Property, b: ResourceClass | Property): 1 | 0 | -1;
    /**
     * Merge the given [[OntologyInformation]] into the current instance,
     * updating the existing information.
     * This is necessary when a service like the search fetches new results
     * that have to be added to an existing collection.
     * The existing ontology information must not be lost.
     *
     * @param {OntologyInformation} ontologyInfo the given definitions that have to be integrated.
     * @returns void
     */
    updateOntologyInformation(ontologyInfo: OntologyInformation): void;
    /**
     * Returns resource class definitions for ontologies.
     *
     * @returns ResourceClassIrisForOntology - all resource class definitions grouped by ontologies.
     */
    getResourceClassForOntology(): ResourceClassIrisForOntology;
    /**
     * Returns all resource classes as an object.
     *
     * @returns ResourceClasses - all resource class definitions as an object.
     */
    getResourceClasses(): ResourceClasses;
    /**
     * Returns all resource classes as an array.
     *
     * @param {boolean} sortAsc sort resource classes by label in ascending order by default
     * @returns ResourceClass[]
     */
    getResourceClassesAsArray(sortAsc?: boolean): Array<ResourceClass>;
    /**
     * Returns a resource class's label.
     *
     * @param {string} resClass resource class to query for.
     * @returns string - the resource class's label.
     */
    getLabelForResourceClass(resClass: string): string;
    /**
     * Returns all properties as an object.
     *
     * @returns Properties - all properties as an object.
     */
    getProperties(): Properties;
    /**
     * Returns all properties as an array.
     *
     * @param {boolean} sortAsc sort properties by label in ascending order by default
     * @returns Property[] - all properties as an array.
     */
    getPropertiesAsArray(sortAsc?: boolean): Array<Property>;
    /**
     * Returns a property's label.
     *
     * @param {string} property to query for.
     * @returns string - the property's label.
     */
    getLabelForProperty(property: string): string;
}
/**
 * Requests ontology information from Knora and caches it.
 * Other components or services obtain ontology information through this service.
 */
export declare class OntologyCacheService {
    private _ontologyService;
    /**
     * Ontologies ingored by this service.
     * @param {string[]} excludedOntologies
     */
    private excludedOntologies;
    /**
     * @param {string[]} excludedProperties properties that Knora is not responsible for and that have to be ignored because they cannot be resolved at the moment.
     */
    private excludedProperties;
    /**
     * @param {string[]} nonResourceClasses class definitions that are not be treated as Knora resource classes
     */
    private nonResourceClasses;
    /**
     * @param {OntologyCache} cacheOntology central instance that caches all definitions
     */
    private cacheOntology;
    constructor(_ontologyService: OntologyService);
    /**
     * Requests the metadata of all ontologies from Knora.
     *
     * @returns Observable<object> - metadata for all ontologies as JSON-LD (no prefixes, all Iris fully expanded).
     */
    private getOntologiesMetadataFromKnora;
    /**
     * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
     *
     * @param {string} ontologyIri the Iri of the requested ontology.
     * @returns Observable<object> - metadata for all entity definitions for ontology from Knora.
     */
    private getAllEntityDefinitionsForOntologyFromKnora;
    /**
     * Writes all the ontologies' metadata returned by Knora to the cache.
     *
     * @param {object[]} ontologies metadata of all existing ontologies as JSON-LD.
     * @returns a new OntologyMetadata object
     */
    private convertAndWriteOntologiesMetadataToCache;
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns Array<OntologyMetadata> - metadata of all existing ontologies.
     */
    private getAllOntologiesMetadataFromCache;
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param {Array<object>} classDefinitions the class definitions in an ontology response.
     * @returns string[] - resource class Iris from the given class definitions.
     */
    private getResourceClassIrisFromOntologyResponse;
    /**
     * Converts a Knora response for all entity definitions for the requested ontology
     * into an internal representation and caches it.
     *
     * Knora automatically includes the property definitions referred to in the cardinalities of resource classes.
     * If they are defined in another ontology, that ontology is requested from Knora too.
     *
     * @param {Object} ontology the ontology to be cached.
     * @returns void
     */
    private convertAndWriteAllEntityDefinitionsForOntologyToCache;
    /**
     * Returns definitions for the requested ontologies from the cache.
     *
     * @param {string[]} ontologyIris the ontologies for which definitions should be returned.
     * @returns Observable<OntologyInformation> - the definitions for the requested ontologies.
     */
    private getOntologyInformationFromCache;
    /**
     * Converts a Knora ontology response into an internal representation and caches it.
     *
     * @param {object[]} resourceClassDefinitions the resource class definitions returned by Knora.
     * @param {object[]} propertyClassDefinitions the property definitions returned by Knora.
     * @returns void
     */
    private convertAndWriteEntityDefinitionsToCache;
    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
     *
     * @param {string[]} resClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - an [[OntologyCache]] representing the requested resource classes.
     */
    private getResourceClassDefinitionsFromCache;
    /**
     * Converts a Knora response for ontology information about properties
     * into an internal representation and cache it.
     *
     * @param {object[]} propertyDefinitionsFromKnora the property definitions returned by Knora
     * @returns void
     */
    private convertAndWriteKnoraPropertyDefinitionsToOntologyCache;
    /**
     * Returns property definitions from the cache.
     *
     * @param {string[]} propertyIris the property definitions to be returned.
     * @returns OntologyInformation - requested property defintions.
     */
    private getPropertyDefinitionsFromCache;
    /**
     * Returns metadata about all ontologies.
     *
     * @returns Observable<Array<OntologyMetadata>> - metadata about all ontologies.
     */
    getOntologiesMetadata(): Observable<Array<OntologyMetadata>>;
    /**
     * Requests the requested ontologies from Knora, adding them to the cache.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be requested.
     * @returns Observable<any[]>
     */
    private getAndCacheOntologies;
    /**
     * Returns the entity definitions for the requested ontologies.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be queried.
     * @returns Observable<OntologyInformation> - all ontology metadata from the cache
     */
    getEntityDefinitionsForOntologies(ontologyIris: string[]): Observable<OntologyInformation>;
    /**
     * Returns the definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * Properties contained in the cardinalities will be returned too.
     *
     * @param {string[]} resourceClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - the requested resource classes (including properties).
     */
    getResourceClassDefinitions(resourceClassIris: string[]): Observable<OntologyInformation>;
    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the Iris of the properties to be returned .
     * @returns Observable<OntologyInformation> - the requested property definitions.
     */
    getPropertyDefinitions(propertyIris: string[]): Observable<OntologyInformation>;
}
