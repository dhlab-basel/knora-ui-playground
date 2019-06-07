import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { KnoraConstants } from '../../declarations/api/knora-constants';
import { Utils } from '../../declarations/utils';
import { OntologyService } from './ontology.service';
import { forkJoin, from, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./ontology.service";
var jsonld = require('jsonld');
/**
 * Represents an error occurred in OntologyCacheService.
 */
var OntologyCacheError = /** @class */ (function (_super) {
    tslib_1.__extends(OntologyCacheError, _super);
    function OntologyCacheError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    return OntologyCacheError;
}(Error));
/**
 * Represents an ontology's metadata.
 */
var OntologyMetadata = /** @class */ (function () {
    /**
     * @hideconstructor
     *
     * @param {string} id Iri identifying the ontology.
     * @param {string} label a label describing the ontology.
     */
    function OntologyMetadata(id, label) {
        this.id = id;
        this.label = label;
    }
    return OntologyMetadata;
}());
export { OntologyMetadata };
/**
 * Occurrence of a property for a resource class (its cardinality).
 */
export var CardinalityOccurrence;
(function (CardinalityOccurrence) {
    CardinalityOccurrence[CardinalityOccurrence["minCard"] = 0] = "minCard";
    CardinalityOccurrence[CardinalityOccurrence["card"] = 1] = "card";
    CardinalityOccurrence[CardinalityOccurrence["maxCard"] = 2] = "maxCard";
})(CardinalityOccurrence || (CardinalityOccurrence = {}));
/**
 * Cardinality of a property for the given resource class.
 */
var Cardinality = /** @class */ (function () {
    /**
     * @param {CardinalityOccurrence} occurrence type of given occurrence.
     * @param {number} value numerical value of given occurrence.
     * @param {string} property the property the given occurrence applies to.
     */
    function Cardinality(occurrence, value, property) {
        this.occurrence = occurrence;
        this.value = value;
        this.property = property;
    }
    return Cardinality;
}());
export { Cardinality };
/**
 * Property gui order
 */
var GuiOrder = /** @class */ (function () {
    /**
     * @param  {number} value
     * @param  {string} property
     */
    function GuiOrder(value, property) {
        this.value = value;
        this.property = property;
    }
    return GuiOrder;
}());
export { GuiOrder };
/**
 * A resource class definition.
 */
var ResourceClass = /** @class */ (function () {
    /**
     * @param {string} id Iri identifying the resource class.
     * @param {string} icon path to an icon representing the resource class.
     * @param {string} comment comment on the resource class.
     * @param {string} label label describing the resource class.
     * @param {Cardinality[]} cardinalities the resource class's properties.
     * @param {GuiOrder[]} guiOrder the resource class's gui-order properties.
     */
    function ResourceClass(id, icon, comment, label, cardinalities, guiOrder) {
        this.id = id;
        this.icon = icon;
        this.comment = comment;
        this.label = label;
        this.cardinalities = cardinalities;
        this.guiOrder = guiOrder;
    }
    return ResourceClass;
}());
export { ResourceClass };
/**
 * A map of resource class Iris to resource class definitions.
 */
var ResourceClasses = /** @class */ (function () {
    function ResourceClasses() {
    }
    return ResourceClasses;
}());
export { ResourceClasses };
/**
 * A property definition.
 */
var Property = /** @class */ (function () {
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
    function Property(id, objectType, comment, label, subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty, guiAttribute) {
        this.id = id;
        this.objectType = objectType;
        this.comment = comment;
        this.label = label;
        this.subPropertyOf = subPropertyOf;
        this.isEditable = isEditable;
        this.isLinkProperty = isLinkProperty;
        this.isLinkValueProperty = isLinkValueProperty;
        this.guiAttribute = guiAttribute;
    }
    return Property;
}());
export { Property };
/**
 * A map of property Iris to property definitions.
 */
var Properties = /** @class */ (function () {
    function Properties() {
    }
    return Properties;
}());
export { Properties };
/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
var ResourceClassIrisForOntology = /** @class */ (function () {
    function ResourceClassIrisForOntology() {
    }
    return ResourceClassIrisForOntology;
}());
export { ResourceClassIrisForOntology };
/**
 * Represents cached ontology information (only used by this service internally).
 * This cache is updated whenever new definitions are requested from Knora.
 *
 * Requested ontology information by a service is represented by [[OntologyInformation]].
 */
var OntologyCache = /** @class */ (function () {
    function OntologyCache() {
        this.ontologies = [];
        this.resourceClassIrisForOntology = new ResourceClassIrisForOntology();
        this.resourceClasses = new ResourceClasses();
        this.properties = new Properties();
    }
    return OntologyCache;
}());
/**
 * Represents ontology information requested from this service.
 *
 * For every request, an instance of this class is returned containing the requested information.
 */
var OntologyInformation = /** @class */ (function () {
    /**
     * @param {ResourceClassIrisForOntology} resourceClassesForOntology all resource class Iris for a given ontology.
     * @param {ResourceClasses} resourceClasses resource class definitions.
     * @param {Properties} properties property definitions.
     */
    function OntologyInformation(resourceClassesForOntology, resourceClasses, properties) {
        this.resourceClassesForOntology = resourceClassesForOntology;
        this.resourceClasses = resourceClasses;
        this.properties = properties;
    }
    /**
     * Sorts an array of `ResourceClass` or `Property` by label.
     *
     * @param a first element
     * @param b second element
     * @return negative -1 if the first element is considered lower than the second, 1 if the second element is considered bigger, 0 if they are equal
     */
    OntologyInformation.sortFunc = function (a, b) {
        // dealing with 'undefined' labels
        if (a.label === undefined) {
            return 1;
        }
        else if (b.label === undefined) {
            return -1;
        }
        var labelA = a.label.toLowerCase();
        var labelB = b.label.toLowerCase();
        if (labelA < labelB) {
            return -1;
        }
        else if (labelA > labelB) {
            return 1;
        }
        else {
            return 0;
        }
    };
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
    OntologyInformation.prototype.updateOntologyInformation = function (ontologyInfo) {
        // get new resourceClassIrisForOntology
        var newResourceClassesForOntology = ontologyInfo.getResourceClassForOntology();
        // update new resourceClassIrisForOntology
        // tslint:disable-next-line:forin
        for (var newResClassForOntology in newResourceClassesForOntology) {
            this.resourceClassesForOntology[newResClassForOntology] = newResourceClassesForOntology[newResClassForOntology];
        }
        // get new resource class definitions
        var newResourceClasses = ontologyInfo.getResourceClasses();
        // update resourceClasses
        // tslint:disable-next-line:forin
        for (var newResClass in newResourceClasses) {
            this.resourceClasses[newResClass] = newResourceClasses[newResClass];
        }
        // get new property definitions
        var newProperties = ontologyInfo.getProperties();
        // update properties
        // tslint:disable-next-line:forin
        for (var newProp in newProperties) {
            this.properties[newProp] = newProperties[newProp];
        }
    };
    /**
     * Returns resource class definitions for ontologies.
     *
     * @returns ResourceClassIrisForOntology - all resource class definitions grouped by ontologies.
     */
    OntologyInformation.prototype.getResourceClassForOntology = function () {
        return this.resourceClassesForOntology;
    };
    /**
     * Returns all resource classes as an object.
     *
     * @returns ResourceClasses - all resource class definitions as an object.
     */
    OntologyInformation.prototype.getResourceClasses = function () {
        return this.resourceClasses;
    };
    /**
     * Returns all resource classes as an array.
     *
     * @param {boolean} sortAsc sort resource classes by label in ascending order by default
     * @returns ResourceClass[]
     */
    OntologyInformation.prototype.getResourceClassesAsArray = function (sortAsc) {
        if (sortAsc === void 0) { sortAsc = true; }
        var resClasses = [];
        // tslint:disable-next-line:forin
        for (var resClassIri in this.resourceClasses) {
            var resClass = this.resourceClasses[resClassIri];
            resClasses.push(resClass);
        }
        // resourceClasses order by label in ascending order
        resClasses.sort(OntologyInformation.sortFunc);
        // resourceClasses order by label in descending order
        if (!sortAsc) {
            resClasses.reverse();
        }
        return resClasses;
    };
    /**
     * Returns a resource class's label.
     *
     * @param {string} resClass resource class to query for.
     * @returns string - the resource class's label.
     */
    OntologyInformation.prototype.getLabelForResourceClass = function (resClass) {
        if (resClass !== undefined) {
            var resClassDef = this.resourceClasses[resClass];
            if (resClassDef !== undefined && resClassDef.label !== undefined) {
                return resClassDef.label;
            }
            else {
                console.log("cannot get label for " + resClass);
            }
        }
        else {
            console.log('call of OntologyInformation.getLabelForResourceClass without argument resClass');
        }
    };
    /**
     * Returns all properties as an object.
     *
     * @returns Properties - all properties as an object.
     */
    OntologyInformation.prototype.getProperties = function () {
        return this.properties;
    };
    /**
     * Returns all properties as an array.
     *
     * @param {boolean} sortAsc sort properties by label in ascending order by default
     * @returns Property[] - all properties as an array.
     */
    OntologyInformation.prototype.getPropertiesAsArray = function (sortAsc) {
        if (sortAsc === void 0) { sortAsc = true; }
        var properties = [];
        // tslint:disable-next-line:forin
        for (var propIri in this.properties) {
            var prop = this.properties[propIri];
            properties.push(prop);
        }
        // properties order by label in ascending order
        properties.sort(OntologyInformation.sortFunc);
        // properties order by label in descending order
        if (!sortAsc) {
            properties.reverse();
        }
        return properties;
    };
    /**
     * Returns a property's label.
     *
     * @param {string} property to query for.
     * @returns string - the property's label.
     */
    OntologyInformation.prototype.getLabelForProperty = function (property) {
        if (property !== undefined) {
            var propDef = this.properties[property];
            if (propDef !== undefined && propDef.label !== undefined) {
                return propDef.label;
            }
            else {
                console.log("cannot get label for " + property);
            }
        }
        else {
            console.log('call of OntologyInformation.getLabelForProperty without argument property');
        }
    };
    return OntologyInformation;
}());
export { OntologyInformation };
/**
 * Requests ontology information from Knora and caches it.
 * Other components or services obtain ontology information through this service.
 */
var OntologyCacheService = /** @class */ (function () {
    function OntologyCacheService(_ontologyService) {
        this._ontologyService = _ontologyService;
        /**
         * Ontologies ingored by this service.
         * @param {string[]} excludedOntologies
         */
        this.excludedOntologies = [KnoraConstants.SalsahGuiOntology, KnoraConstants.StandoffOntology];
        /**
         * @param {string[]} excludedProperties properties that Knora is not responsible for and that have to be ignored because they cannot be resolved at the moment.
         */
        this.excludedProperties = [KnoraConstants.RdfsLabel];
        /**
         * @param {string[]} nonResourceClasses class definitions that are not be treated as Knora resource classes
         */
        this.nonResourceClasses = [KnoraConstants.ForbiddenResource, KnoraConstants.XMLToStandoffMapping, KnoraConstants.ListNode];
        /**
         * @param {OntologyCache} cacheOntology central instance that caches all definitions
         */
        this.cacheOntology = new OntologyCache();
    }
    /**
     * Requests the metadata of all ontologies from Knora.
     *
     * @returns Observable<object> - metadata for all ontologies as JSON-LD (no prefixes, all Iris fully expanded).
     */
    OntologyCacheService.prototype.getOntologiesMetadataFromKnora = function () {
        return this._ontologyService.getOntologiesMetadata().pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        function (ontRes) {
            var ontPromises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            var ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    };
    /**
     * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
     *
     * @param {string} ontologyIri the Iri of the requested ontology.
     * @returns Observable<object> - metadata for all entity definitions for ontology from Knora.
     */
    OntologyCacheService.prototype.getAllEntityDefinitionsForOntologyFromKnora = function (ontologyIri) {
        return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIri).pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        function (ontRes) {
            var ontPromises = jsonld.promises;
            // compact JSON-LD using an empty context: expands all Iris
            var ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    };
    /**
     * Writes all the ontologies' metadata returned by Knora to the cache.
     *
     * @param {object[]} ontologies metadata of all existing ontologies as JSON-LD.
     * @returns a new OntologyMetadata object
     */
    OntologyCacheService.prototype.convertAndWriteOntologiesMetadataToCache = function (ontologies) {
        this.cacheOntology.ontologies = ontologies.map(function (ontology) {
            return new OntologyMetadata(ontology['@id'], ontology[KnoraConstants.RdfsLabel]);
        });
    };
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns Array<OntologyMetadata> - metadata of all existing ontologies.
     */
    OntologyCacheService.prototype.getAllOntologiesMetadataFromCache = function () {
        return this.cacheOntology.ontologies;
    };
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param {Array<object>} classDefinitions the class definitions in an ontology response.
     * @returns string[] - resource class Iris from the given class definitions.
     */
    OntologyCacheService.prototype.getResourceClassIrisFromOntologyResponse = function (classDefinitions) {
        var e_1, _a;
        var resourceClassIris = [];
        try {
            for (var classDefinitions_1 = tslib_1.__values(classDefinitions), classDefinitions_1_1 = classDefinitions_1.next(); !classDefinitions_1_1.done; classDefinitions_1_1 = classDefinitions_1.next()) {
                var classDef = classDefinitions_1_1.value;
                var classIri = classDef['@id'];
                // check that class name is not listed as a non resource class and that the isResourceClass flag is present and set to true
                if (classIri !== KnoraConstants.Resource && this.nonResourceClasses.indexOf(classIri)
                    === -1 && (classDef[KnoraConstants.IsResourceClass] !== undefined && classDef[KnoraConstants.IsResourceClass] === true)) {
                    // it is not a value class, but a resource class definition
                    resourceClassIris.push(classIri);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (classDefinitions_1_1 && !classDefinitions_1_1.done && (_a = classDefinitions_1.return)) _a.call(classDefinitions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return resourceClassIris;
    };
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
    OntologyCacheService.prototype.convertAndWriteAllEntityDefinitionsForOntologyToCache = function (ontology) {
        var graph = ontology['@graph'];
        // get all class definitions
        var classDefs = graph.filter(function (entity) {
            var entityType = entity['@type'];
            return entityType === KnoraConstants.OwlClass;
        });
        // get all property definitions
        var propertyDefs = graph.filter(function (entity) {
            var entityType = entity['@type'];
            return entityType === KnoraConstants.OwlObjectProperty ||
                entityType === KnoraConstants.OwlDatatypeProperty ||
                entityType === KnoraConstants.OwlAnnotationProperty ||
                entityType === KnoraConstants.RdfProperty;
        });
        // cache all resource class Iris belonging to the current ontology
        this.cacheOntology.resourceClassIrisForOntology[ontology['@id']] = this.getResourceClassIrisFromOntologyResponse(classDefs);
        // write class and property defintions to cache
        this.convertAndWriteEntityDefinitionsToCache(classDefs, propertyDefs);
    };
    /**
     * Returns definitions for the requested ontologies from the cache.
     *
     * @param {string[]} ontologyIris the ontologies for which definitions should be returned.
     * @returns Observable<OntologyInformation> - the definitions for the requested ontologies.
     */
    OntologyCacheService.prototype.getOntologyInformationFromCache = function (ontologyIris) {
        var e_2, _a;
        var resourceClassesForOntology = new ResourceClassIrisForOntology();
        // collect resource class Iris for all requested named graphs
        var allResourceClassIris = [];
        try {
            for (var ontologyIris_1 = tslib_1.__values(ontologyIris), ontologyIris_1_1 = ontologyIris_1.next(); !ontologyIris_1_1.done; ontologyIris_1_1 = ontologyIris_1.next()) {
                var ontologyIri = ontologyIris_1_1.value;
                if (this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined) {
                    throw new OntologyCacheError("getResourceClassesForOntologiesFromCache: ontology not found in cache: " + ontologyIri);
                }
                // add information for the given ontology
                resourceClassesForOntology[ontologyIri] = this.cacheOntology.resourceClassIrisForOntology[ontologyIri];
                // add all resource class Iris of this ontology
                allResourceClassIris = allResourceClassIris.concat(this.cacheOntology.resourceClassIrisForOntology[ontologyIri]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (ontologyIris_1_1 && !ontologyIris_1_1.done && (_a = ontologyIris_1.return)) _a.call(ontologyIris_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // get resource class definitions for all requested ontologies
        return this.getResourceClassDefinitions(allResourceClassIris).pipe(map(function (resClassDefs) {
            return new OntologyInformation(resourceClassesForOntology, resClassDefs.getResourceClasses(), resClassDefs.getProperties());
        }));
    };
    /**
     * Converts a Knora ontology response into an internal representation and caches it.
     *
     * @param {object[]} resourceClassDefinitions the resource class definitions returned by Knora.
     * @param {object[]} propertyClassDefinitions the property definitions returned by Knora.
     * @returns void
     */
    OntologyCacheService.prototype.convertAndWriteEntityDefinitionsToCache = function (resourceClassDefinitions, propertyClassDefinitions) {
        var e_3, _a, e_4, _b;
        try {
            // convert and cache each given resource class definition
            for (var resourceClassDefinitions_1 = tslib_1.__values(resourceClassDefinitions), resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next(); !resourceClassDefinitions_1_1.done; resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next()) {
                var resClass = resourceClassDefinitions_1_1.value;
                var resClassIri = resClass['@id'];
                // represents all cardinalities of this resource class
                var cardinalities = [];
                var guiOrder = [];
                if (resClass[KnoraConstants.RdfsSubclassOf] !== undefined) {
                    var subclassOfCollection = void 0;
                    // check if it is a single object or a collection
                    if (!Array.isArray(resClass[KnoraConstants.RdfsSubclassOf])) {
                        subclassOfCollection = [resClass[KnoraConstants.RdfsSubclassOf]];
                    }
                    else {
                        subclassOfCollection = resClass[KnoraConstants.RdfsSubclassOf];
                    }
                    try {
                        // get cardinalities for the properties of a resource class
                        for (var subclassOfCollection_1 = tslib_1.__values(subclassOfCollection), subclassOfCollection_1_1 = subclassOfCollection_1.next(); !subclassOfCollection_1_1.done; subclassOfCollection_1_1 = subclassOfCollection_1.next()) {
                            var curCard = subclassOfCollection_1_1.value;
                            // make sure it is a cardinality (it could also be an Iri of a superclass)
                            if (curCard instanceof Object && curCard['@type'] !== undefined && curCard['@type'] === KnoraConstants.OwlRestriction) {
                                var newCard = void 0;
                                // get occurrence
                                if (curCard[KnoraConstants.OwlMinCardinality] !== undefined) {
                                    newCard = new Cardinality(CardinalityOccurrence.minCard, curCard[KnoraConstants.OwlMinCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                }
                                else if (curCard[KnoraConstants.OwlCardinality] !== undefined) {
                                    newCard = new Cardinality(CardinalityOccurrence.card, curCard[KnoraConstants.OwlCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                }
                                else if (curCard[KnoraConstants.OwlMaxCardinality] !== undefined) {
                                    newCard = new Cardinality(CardinalityOccurrence.maxCard, curCard[KnoraConstants.OwlMaxCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                }
                                else {
                                    // no known occurrence found
                                    throw new TypeError("cardinality type invalid for " + resClass['@id'] + " " + curCard[KnoraConstants.OwlOnProperty]);
                                }
                                // add cardinality
                                cardinalities.push(newCard);
                                // get gui order
                                var newGuiOrder = void 0;
                                if (curCard[KnoraConstants.SalsahGuiOrder] !== undefined) {
                                    newGuiOrder = new GuiOrder(curCard[KnoraConstants.SalsahGuiOrder], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                    // add gui order
                                    guiOrder.push(newGuiOrder);
                                }
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (subclassOfCollection_1_1 && !subclassOfCollection_1_1.done && (_b = subclassOfCollection_1.return)) _b.call(subclassOfCollection_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                var resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities, guiOrder);
                // write this resource class definition to the cache object
                this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (resourceClassDefinitions_1_1 && !resourceClassDefinitions_1_1.done && (_a = resourceClassDefinitions_1.return)) _a.call(resourceClassDefinitions_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // cache the property definitions
        this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyClassDefinitions);
    };
    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
     *
     * @param {string[]} resClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - an [[OntologyCache]] representing the requested resource classes.
     */
    OntologyCacheService.prototype.getResourceClassDefinitionsFromCache = function (resClassIris) {
        // collect the definitions for each resource class from the cache
        var _this = this;
        var resClassDefs = new ResourceClasses();
        // collect the properties from the cardinalities of the given resource classes
        var propertyIris = [];
        resClassIris.forEach(function (resClassIri) {
            resClassDefs[resClassIri] = _this.cacheOntology.resourceClasses[resClassIri];
            _this.cacheOntology.resourceClasses[resClassIri].cardinalities.forEach(function (card) {
                // get property definition for each cardinality
                propertyIris.push(card.property);
            });
        });
        return this.getPropertyDefinitions(propertyIris).pipe(map(function (propDefs) {
            return new OntologyInformation(new ResourceClassIrisForOntology(), resClassDefs, propDefs.getProperties());
        }));
    };
    /**
     * Converts a Knora response for ontology information about properties
     * into an internal representation and cache it.
     *
     * @param {object[]} propertyDefinitionsFromKnora the property definitions returned by Knora
     * @returns void
     */
    OntologyCacheService.prototype.convertAndWriteKnoraPropertyDefinitionsToOntologyCache = function (propertyDefinitionsFromKnora) {
        var e_5, _a, e_6, _b;
        try {
            // convert and cache each given property definition
            for (var propertyDefinitionsFromKnora_1 = tslib_1.__values(propertyDefinitionsFromKnora), propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next(); !propertyDefinitionsFromKnora_1_1.done; propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next()) {
                var propDef = propertyDefinitionsFromKnora_1_1.value;
                var propIri = propDef['@id'];
                var isEditable = false;
                if (propDef[KnoraConstants.isEditable] !== undefined && propDef[KnoraConstants.isEditable] === true) {
                    isEditable = true;
                }
                var isLinkProperty = false;
                if (propDef[KnoraConstants.isLinkProperty] !== undefined && propDef[KnoraConstants.isLinkProperty] === true) {
                    isLinkProperty = true;
                }
                var isLinkValueProperty = false;
                if (propDef[KnoraConstants.isLinkValueProperty] !== undefined && propDef[KnoraConstants.isLinkValueProperty] === true) {
                    isLinkValueProperty = true;
                }
                var subPropertyOf = [];
                if (propDef[KnoraConstants.subPropertyOf] !== undefined && Array.isArray(propDef[KnoraConstants.subPropertyOf])) {
                    subPropertyOf = propDef[KnoraConstants.subPropertyOf].map(function (superProp) { return superProp['@id']; });
                }
                else if (propDef[KnoraConstants.subPropertyOf] !== undefined) {
                    subPropertyOf.push(propDef[KnoraConstants.subPropertyOf]['@id']);
                }
                var objectType = void 0;
                if (propDef[KnoraConstants.ObjectType] !== undefined) {
                    objectType = propDef[KnoraConstants.ObjectType]['@id'];
                }
                var guiAttribute = [];
                if (propDef[KnoraConstants.SalsahGuiAttribute] !== undefined) {
                    if (Array.isArray(propDef[KnoraConstants.SalsahGuiAttribute])) {
                        try {
                            for (var _c = tslib_1.__values(propDef[KnoraConstants.SalsahGuiAttribute]), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var attr = _d.value;
                                guiAttribute.push(attr);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                    }
                    else {
                        guiAttribute.push(propDef[KnoraConstants.SalsahGuiAttribute]);
                    }
                }
                // cache property definition
                this.cacheOntology.properties[propIri] = new Property(propIri, objectType, propDef[KnoraConstants.RdfsComment], propDef[KnoraConstants.RdfsLabel], subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty, guiAttribute);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (propertyDefinitionsFromKnora_1_1 && !propertyDefinitionsFromKnora_1_1.done && (_a = propertyDefinitionsFromKnora_1.return)) _a.call(propertyDefinitionsFromKnora_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    /**
     * Returns property definitions from the cache.
     *
     * @param {string[]} propertyIris the property definitions to be returned.
     * @returns OntologyInformation - requested property defintions.
     */
    OntologyCacheService.prototype.getPropertyDefinitionsFromCache = function (propertyIris) {
        var _this = this;
        var propertyDefs = new Properties();
        propertyIris.forEach(function (propIri) {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (_this.excludedProperties.indexOf(propIri) > -1) {
                return;
            }
            if (_this.cacheOntology.properties[propIri] === undefined) {
                throw new OntologyCacheError("getPropertyDefinitionsFromCache: property not found in cache: " + propIri);
            }
            propertyDefs[propIri] = _this.cacheOntology.properties[propIri];
        });
        return new OntologyInformation(new ResourceClassIrisForOntology(), new ResourceClasses(), propertyDefs);
    };
    /**
     * Returns metadata about all ontologies.
     *
     * @returns Observable<Array<OntologyMetadata>> - metadata about all ontologies.
     */
    OntologyCacheService.prototype.getOntologiesMetadata = function () {
        var _this = this;
        if (this.cacheOntology.ontologies.length === 0) {
            // nothing in cache yet, get metadata from Knora
            return this.getOntologiesMetadataFromKnora().pipe(map(function (metadata) {
                _this.convertAndWriteOntologiesMetadataToCache(metadata['@graph'].filter(function (onto) {
                    // ignore excluded ontologies
                    return _this.excludedOntologies.indexOf(onto['@id']) === -1;
                }));
                return _this.getAllOntologiesMetadataFromCache();
            }));
        }
        else {
            // return metadata from cache
            return of(this.getAllOntologiesMetadataFromCache());
        }
    };
    /**
     * Requests the requested ontologies from Knora, adding them to the cache.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be requested.
     * @returns Observable<any[]>
     */
    OntologyCacheService.prototype.getAndCacheOntologies = function (ontologyIris) {
        var _this = this;
        // array to be populated with Observables
        var observables = [];
        // do a request for each ontology
        ontologyIris.forEach(function (ontologyIri) {
            // push an Observable onto `observables`
            observables.push(_this.getAllEntityDefinitionsForOntologyFromKnora(ontologyIri).pipe(map(function (ontology) {
                // write response to cache
                _this.convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology);
            })));
        });
        // forkJoin returns an Observable of an array of results
        // returned by each Observable contained in `observables`
        // a subscription to the Observable returned by forkJoin is executed
        // once all Observables have been completed
        return forkJoin(observables);
    };
    /**
     * Returns the entity definitions for the requested ontologies.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be queried.
     * @returns Observable<OntologyInformation> - all ontology metadata from the cache
     */
    OntologyCacheService.prototype.getEntityDefinitionsForOntologies = function (ontologyIris) {
        var _this = this;
        var ontologyIrisToQuery = ontologyIris.filter(function (ontologyIri) {
            // return the ontology Iris that are not cached yet
            return _this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined;
        });
        // get ontologies that are mot cached yet
        if (ontologyIrisToQuery.length > 0) {
            return this.getAndCacheOntologies(ontologyIrisToQuery).pipe(mergeMap(function () {
                // executed once all ontologies have been cached
                return _this.getOntologyInformationFromCache(ontologyIris);
            }));
        }
        else {
            return this.getOntologyInformationFromCache(ontologyIris);
        }
    };
    /**
     * Returns the definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * Properties contained in the cardinalities will be returned too.
     *
     * @param {string[]} resourceClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - the requested resource classes (including properties).
     */
    OntologyCacheService.prototype.getResourceClassDefinitions = function (resourceClassIris) {
        var _this = this;
        var resClassIrisToQueryFor = resourceClassIris.filter(function (resClassIri) {
            // return the resource class Iris that are not cached yet
            return _this.cacheOntology.resourceClasses[resClassIri] === undefined;
        });
        if (resClassIrisToQueryFor.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing resource classes
            var ontologyIris = resClassIrisToQueryFor.map(function (resClassIri) {
                return Utils.getOntologyIriFromEntityIri(resClassIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(mergeMap(function () {
                return _this.getResourceClassDefinitionsFromCache(resourceClassIris);
            }));
        }
        else {
            return this.getResourceClassDefinitionsFromCache(resourceClassIris);
        }
    };
    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the Iris of the properties to be returned .
     * @returns Observable<OntologyInformation> - the requested property definitions.
     */
    OntologyCacheService.prototype.getPropertyDefinitions = function (propertyIris) {
        var _this = this;
        var propertiesToQuery = propertyIris.filter(function (propIri) {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (_this.excludedProperties.indexOf(propIri) > -1) {
                return false;
            }
            // return the property Iris that are not cached yet
            return _this.cacheOntology.properties[propIri] === undefined;
        });
        if (propertiesToQuery.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing properties
            var ontologyIris = propertiesToQuery.map(function (propIri) {
                return Utils.getOntologyIriFromEntityIri(propIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(map(function (results) {
                if (results) {
                    return _this.getPropertyDefinitionsFromCache(propertyIris);
                }
                else {
                    throw new Error('Problem with: return this.getPropertyDefinitionsFromCache(propertyIris);');
                }
            }));
        }
        else {
            return of(this.getPropertyDefinitionsFromCache(propertyIris));
        }
    };
    OntologyCacheService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    OntologyCacheService.ctorParameters = function () { return [
        { type: OntologyService }
    ]; };
    OntologyCacheService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(i0.inject(i1.OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
    return OntologyCacheService;
}());
export { OntologyCacheService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3ktY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUcvQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakM7O0dBRUc7QUFDSDtJQUFpQyw4Q0FBSztJQUVsQyw0QkFBcUIsT0FBZTtRQUFwQyxZQUNJLGtCQUFNLE9BQU8sQ0FBQyxTQUNqQjtRQUZvQixhQUFPLEdBQVAsT0FBTyxDQUFROztJQUVwQyxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBaUMsS0FBSyxHQUtyQztBQUdEOztHQUVHO0FBQ0g7SUFFSTs7Ozs7T0FLRztJQUNILDBCQUFxQixFQUFVLEVBQ2xCLEtBQWE7UUFETCxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQVE7SUFFMUIsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7O0FBR0Q7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxxQkFJWDtBQUpELFdBQVkscUJBQXFCO0lBQzdCLHVFQUFXLENBQUE7SUFDWCxpRUFBUSxDQUFBO0lBQ1IsdUVB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QUU7WUFFOUIsc0ZBQXNGO1lBQ3RGLElBQU0sWUFBWSxHQUFhLGlCQUFpQixDQUFDLEdBQUcsQ0FDaEQsVUFBQSxPQUFPO2dCQUNILE9BQU8sS0FBSyxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FDSixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVwQyw0Q0FBNEM7WUFDNUMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUNoRCxHQUFHLENBQ0MsVUFBQSxPQUFPO2dCQUNILElBQUksT0FBTyxFQUFFO29CQUNULE9BQU8sS0FBSSxDQUFDLCtCQUErQixDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM3RDtxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7aUJBQy9GO1lBQ0wsQ0FBQyxDQUNKLENBQ0osQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNqRTtJQUNMLENBQUM7O2dCQXZtQkosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFqYVEsZUFBZTs7OytCQUp4QjtDQTRnQ0MsQUF6bUJELElBeW1CQztTQXRtQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy91dGlscyc7XG5pbXBvcnQgeyBPbnRvbG9neVNlcnZpY2UgfSBmcm9tICcuL29udG9sb2d5LnNlcnZpY2UnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQ3MzAwMTAvYW5ndWxhcjItNS1taW51dGUtaW5zdGFsbC1idWctcmVxdWlyZS1pcy1ub3QtZGVmaW5lZFxuY29uc3QganNvbmxkID0gcmVxdWlyZSgnanNvbmxkJyk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBlcnJvciBvY2N1cnJlZCBpbiBPbnRvbG9neUNhY2hlU2VydmljZS5cbiAqL1xuY2xhc3MgT250b2xvZ3lDYWNoZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gb250b2xvZ3kncyBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5TWV0YWRhdGEge1xuXG4gICAgLyoqXG4gICAgICogQGhpZGVjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElyaSBpZGVudGlmeWluZyB0aGUgb250b2xvZ3kuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGEgbGFiZWwgZGVzY3JpYmluZyB0aGUgb250b2xvZ3kuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuXG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBPY2N1cnJlbmNlIG9mIGEgcHJvcGVydHkgZm9yIGEgcmVzb3VyY2UgY2xhc3MgKGl0cyBjYXJkaW5hbGl0eSkuXG4gKi9cbmV4cG9ydCBlbnVtIENhcmRpbmFsaXR5T2NjdXJyZW5jZSB7XG4gICAgbWluQ2FyZCA9IDAsXG4gICAgY2FyZCA9IDEsXG4gICAgbWF4Q2FyZCA9IDJcbn1cblxuXG4vKipcbiAqIENhcmRpbmFsaXR5IG9mIGEgcHJvcGVydHkgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENhcmRpbmFsaXR5IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q2FyZGluYWxpdHlPY2N1cnJlbmNlfSBvY2N1cnJlbmNlIHR5cGUgb2YgZ2l2ZW4gb2NjdXJyZW5jZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgbnVtZXJpY2FsIHZhbHVlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IHRoZSBwcm9wZXJ0eSB0aGUgZ2l2ZW4gb2NjdXJyZW5jZSBhcHBsaWVzIHRvLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG9jY3VycmVuY2U6IENhcmRpbmFsaXR5T2NjdXJyZW5jZSxcbiAgICAgICAgcmVhZG9ubHkgdmFsdWU6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgcHJvcGVydHk6IHN0cmluZykge1xuICAgIH1cbn1cbi8qKlxuICogUHJvcGVydHkgZ3VpIG9yZGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBHdWlPcmRlciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogc3RyaW5nXG4gICAgKSB7XG5cbiAgICB9XG59XG5cbi8qKlxuICogQSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbiBwYXRoIHRvIGFuIGljb24gcmVwcmVzZW50aW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudCBjb21tZW50IG9uIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgbGFiZWwgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtDYXJkaW5hbGl0eVtdfSBjYXJkaW5hbGl0aWVzIHRoZSByZXNvdXJjZSBjbGFzcydzIHByb3BlcnRpZXMuXG4gICAgICogQHBhcmFtIHtHdWlPcmRlcltdfSBndWlPcmRlciB0aGUgcmVzb3VyY2UgY2xhc3MncyBndWktb3JkZXIgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpY29uOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY2FyZGluYWxpdGllczogQXJyYXk8Q2FyZGluYWxpdHk+LFxuICAgICAgICByZWFkb25seSBndWlPcmRlcjogQXJyYXk8R3VpT3JkZXI+KSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIHRvIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc2VzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlc291cmNlQ2xhc3M7XG59XG5cblxuLyoqXG4gKiBBIHByb3BlcnR5IGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvYmplY3RUeXBlIHRoZSBwcm9wZXJ0eSdzIG9iamVjdCBjb25zdHJhaW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc3ViUHJvcGVydHlPZiBJcmlzIG9mIHByb3BlcnRpZXMgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgc3VicHJvcGVydHkgb2YuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0VkaXRhYmxlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBjYW4gYmUgZWRpdGVkIGJ5IHRoZSBjbGllbnQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xpbmtQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBsaW5raW5nIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMaW5rVmFsdWVQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgcmVmZXJzIHRvIGEgbGluayB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3VpQXR0cmlidXRlIHRoZSBndWkgYXR0cmlidXRlIGFzc2lnbmVkIHRvIHRoaXMgcHJvcGVydHksIGlmIGFueS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IG9iamVjdFR5cGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBjb21tZW50OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkb25seSBzdWJQcm9wZXJ0eU9mOiBBcnJheTxzdHJpbmc+LFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5IGlzRWRpdGFibGU6IEJvb2xlYW4sXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgaXNMaW5rUHJvcGVydHk6IEJvb2xlYW4sXG4gICAgICAgICAgICAgICAgcmVhZG9ubHkgaXNMaW5rVmFsdWVQcm9wZXJ0eTogQm9vbGVhbixcbiAgICAgICAgICAgICAgICByZWFkb25seSBndWlBdHRyaWJ1dGU6IHN0cmluZ1tdKSB7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBtYXAgb2YgcHJvcGVydHkgSXJpcyB0byBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnRpZXMge1xuICAgIFtpbmRleDogc3RyaW5nXTogUHJvcGVydHk7XG59XG5cblxuLyoqXG4gKiBHcm91cHMgcmVzb3VyY2UgY2xhc3NlcyBieSB0aGUgb250b2xvZ3kgdGhleSBhcmUgZGVmaW5lZCBpbi5cbiAqXG4gKiBBIG1hcCBvZiBvbnRvbG9neSBJcmlzIHRvIGFuIGFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IEFycmF5PHN0cmluZz47XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGNhY2hlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiAob25seSB1c2VkIGJ5IHRoaXMgc2VydmljZSBpbnRlcm5hbGx5KS5cbiAqIFRoaXMgY2FjaGUgaXMgdXBkYXRlZCB3aGVuZXZlciBuZXcgZGVmaW5pdGlvbnMgYXJlIHJlcXVlc3RlZCBmcm9tIEtub3JhLlxuICpcbiAqIFJlcXVlc3RlZCBvbnRvbG9neSBpbmZvcm1hdGlvbiBieSBhIHNlcnZpY2UgaXMgcmVwcmVzZW50ZWQgYnkgW1tPbnRvbG9neUluZm9ybWF0aW9uXV0uXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neU1ldGFkYXRhW119IG9udG9sb2dpZXMgQW4gYXJyYXkgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgb250b2xvZ2llczogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT47XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3l9IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgbGlzdCBvZiBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBuYW1lZCBncmFwaC5cbiAgICAgKi9cbiAgICByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzZXN9IHJlc291cmNlQ2xhc3NlcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllcyBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub250b2xvZ2llcyA9IFtdO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCk7XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXMgPSBuZXcgUmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IFByb3BlcnRpZXMoKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBvbnRvbG9neSBpbmZvcm1hdGlvbiByZXF1ZXN0ZWQgZnJvbSB0aGlzIHNlcnZpY2UuXG4gKlxuICogRm9yIGV2ZXJ5IHJlcXVlc3QsIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MgaXMgcmV0dXJuZWQgY29udGFpbmluZyB0aGUgcmVxdWVzdGVkIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3l9IHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5IGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGZvciBhIGdpdmVuIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc2VzfSByZXNvdXJjZUNsYXNzZXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0aWVzfSBwcm9wZXJ0aWVzIHByb3BlcnR5IGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5LFxuICAgICAgICBwcml2YXRlIHJlc291cmNlQ2xhc3NlczogUmVzb3VyY2VDbGFzc2VzLFxuICAgICAgICBwcml2YXRlIHByb3BlcnRpZXM6IFByb3BlcnRpZXMpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTb3J0cyBhbiBhcnJheSBvZiBgUmVzb3VyY2VDbGFzc2Agb3IgYFByb3BlcnR5YCBieSBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIGZpcnN0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gYiBzZWNvbmQgZWxlbWVudFxuICAgICAqIEByZXR1cm4gbmVnYXRpdmUgLTEgaWYgdGhlIGZpcnN0IGVsZW1lbnQgaXMgY29uc2lkZXJlZCBsb3dlciB0aGFuIHRoZSBzZWNvbmQsIDEgaWYgdGhlIHNlY29uZCBlbGVtZW50IGlzIGNvbnNpZGVyZWQgYmlnZ2VyLCAwIGlmIHRoZXkgYXJlIGVxdWFsXG4gICAgICovXG4gICAgc3RhdGljIHNvcnRGdW5jKGE6IFJlc291cmNlQ2xhc3MgfCBQcm9wZXJ0eSwgYjogUmVzb3VyY2VDbGFzcyB8IFByb3BlcnR5KSB7XG4gICAgICAgIC8vIGRlYWxpbmcgd2l0aCAndW5kZWZpbmVkJyBsYWJlbHNcbiAgICAgICAgaWYgKGEubGFiZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoYi5sYWJlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYWJlbEEgPSBhLmxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxhYmVsQiA9IGIubGFiZWwudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAobGFiZWxBIDwgbGFiZWxCKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWxBID4gbGFiZWxCKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGdpdmVuIFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dIGludG8gdGhlIGN1cnJlbnQgaW5zdGFuY2UsXG4gICAgICogdXBkYXRpbmcgdGhlIGV4aXN0aW5nIGluZm9ybWF0aW9uLlxuICAgICAqIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gYSBzZXJ2aWNlIGxpa2UgdGhlIHNlYXJjaCBmZXRjaGVzIG5ldyByZXN1bHRzXG4gICAgICogdGhhdCBoYXZlIHRvIGJlIGFkZGVkIHRvIGFuIGV4aXN0aW5nIGNvbGxlY3Rpb24uXG4gICAgICogVGhlIGV4aXN0aW5nIG9udG9sb2d5IGluZm9ybWF0aW9uIG11c3Qgbm90IGJlIGxvc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyB0aGUgZ2l2ZW4gZGVmaW5pdGlvbnMgdGhhdCBoYXZlIHRvIGJlIGludGVncmF0ZWQuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHVwZGF0ZU9udG9sb2d5SW5mb3JtYXRpb24ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5XG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5OiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5ID0gb250b2xvZ3lJbmZvLmdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzc0Zvck9udG9sb2d5IGluIG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5KSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldID0gbmV3UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbbmV3UmVzQ2xhc3NGb3JPbnRvbG9neV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Jlc291cmNlQ2xhc3NlcyA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgcmVzb3VyY2VDbGFzc2VzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Jlc0NsYXNzIGluIG5ld1Jlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNbbmV3UmVzQ2xhc3NdID0gbmV3UmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBuZXcgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgbmV3UHJvcGVydGllcyA9IG9udG9sb2d5SW5mby5nZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHByb3BlcnRpZXNcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UHJvcCBpbiBuZXdQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXNbbmV3UHJvcF0gPSBuZXdQcm9wZXJ0aWVzW25ld1Byb3BdO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIGZvciBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSAtIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBncm91cGVkIGJ5IG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc0Zvck9udG9sb2d5KCk6IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NlcyAtIGFsbCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKCk6IFJlc291cmNlQ2xhc3NlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlQ2xhc3NlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCByZXNvdXJjZSBjbGFzc2VzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzb3J0QXNjIHNvcnQgcmVzb3VyY2UgY2xhc3NlcyBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgZGVmYXVsdFxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NbXVxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3Nlc0FzQXJyYXkoc29ydEFzYzogYm9vbGVhbiA9IHRydWUpOiBBcnJheTxSZXNvdXJjZUNsYXNzPiB7XG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NlczogQXJyYXk8UmVzb3VyY2VDbGFzcz4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCByZXNDbGFzc0lyaSBpbiB0aGlzLnJlc291cmNlQ2xhc3Nlcykge1xuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3M6IFJlc291cmNlQ2xhc3MgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG4gICAgICAgICAgICByZXNDbGFzc2VzLnB1c2gocmVzQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzb3VyY2VDbGFzc2VzIG9yZGVyIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlclxuICAgICAgICByZXNDbGFzc2VzLnNvcnQoT250b2xvZ3lJbmZvcm1hdGlvbi5zb3J0RnVuYyk7XG5cbiAgICAgICAgLy8gcmVzb3VyY2VDbGFzc2VzIG9yZGVyIGJ5IGxhYmVsIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgaWYgKCFzb3J0QXNjKSB7XG4gICAgICAgICAgICByZXNDbGFzc2VzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlc291cmNlIGNsYXNzJ3MgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzQ2xhc3MgcmVzb3VyY2UgY2xhc3MgdG8gcXVlcnkgZm9yLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqL1xuICAgIGdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyhyZXNDbGFzczogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocmVzQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0RlZjogUmVzb3VyY2VDbGFzcyA9IHRoaXMucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzXTtcblxuICAgICAgICAgICAgaWYgKHJlc0NsYXNzRGVmICE9PSB1bmRlZmluZWQgJiYgcmVzQ2xhc3NEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5sYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGNhbm5vdCBnZXQgbGFiZWwgZm9yICR7cmVzQ2xhc3N9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FsbCBvZiBPbnRvbG9neUluZm9ybWF0aW9uLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyB3aXRob3V0IGFyZ3VtZW50IHJlc0NsYXNzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFByb3BlcnRpZXMgLSBhbGwgcHJvcGVydGllcyBhcyBhbiBvYmplY3QuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcygpOiBQcm9wZXJ0aWVzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzb3J0QXNjIHNvcnQgcHJvcGVydGllcyBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgZGVmYXVsdFxuICAgICAqIEByZXR1cm5zIFByb3BlcnR5W10gLSBhbGwgcHJvcGVydGllcyBhcyBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzQXNBcnJheShzb3J0QXNjOiBib29sZWFuID0gdHJ1ZSk6IEFycmF5PFByb3BlcnR5PiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogQXJyYXk8UHJvcGVydHk+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcHJvcElyaSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3A6IFByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHByb3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJvcGVydGllcyBvcmRlciBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgcHJvcGVydGllcy5zb3J0KE9udG9sb2d5SW5mb3JtYXRpb24uc29ydEZ1bmMpO1xuXG4gICAgICAgIC8vIHByb3BlcnRpZXMgb3JkZXIgYnkgbGFiZWwgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgICAgICBpZiAoIXNvcnRBc2MpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSB0byBxdWVyeSBmb3IuXG4gICAgICogQHJldHVybnMgc3RyaW5nIC0gdGhlIHByb3BlcnR5J3MgbGFiZWwuXG4gICAgICovXG4gICAgZ2V0TGFiZWxGb3JQcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wRGVmOiBQcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1twcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmIChwcm9wRGVmICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZi5sYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBjYW5ub3QgZ2V0IGxhYmVsIGZvciAke3Byb3BlcnR5fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGwgb2YgT250b2xvZ3lJbmZvcm1hdGlvbi5nZXRMYWJlbEZvclByb3BlcnR5IHdpdGhvdXQgYXJndW1lbnQgcHJvcGVydHknKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYSBhbmQgY2FjaGVzIGl0LlxuICogT3RoZXIgY29tcG9uZW50cyBvciBzZXJ2aWNlcyBvYnRhaW4gb250b2xvZ3kgaW5mb3JtYXRpb24gdGhyb3VnaCB0aGlzIHNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lDYWNoZVNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogT250b2xvZ2llcyBpbmdvcmVkIGJ5IHRoaXMgc2VydmljZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZE9udG9sb2dpZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkT250b2xvZ2llczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5TYWxzYWhHdWlPbnRvbG9neSwgS25vcmFDb25zdGFudHMuU3RhbmRvZmZPbnRvbG9neV07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBleGNsdWRlZFByb3BlcnRpZXMgcHJvcGVydGllcyB0aGF0IEtub3JhIGlzIG5vdCByZXNwb25zaWJsZSBmb3IgYW5kIHRoYXQgaGF2ZSB0byBiZSBpZ25vcmVkIGJlY2F1c2UgdGhleSBjYW5ub3QgYmUgcmVzb2x2ZWQgYXQgdGhlIG1vbWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGV4Y2x1ZGVkUHJvcGVydGllczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gbm9uUmVzb3VyY2VDbGFzc2VzIGNsYXNzIGRlZmluaXRpb25zIHRoYXQgYXJlIG5vdCBiZSB0cmVhdGVkIGFzIEtub3JhIHJlc291cmNlIGNsYXNzZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIG5vblJlc291cmNlQ2xhc3NlczogQXJyYXk8c3RyaW5nPiA9IFtLbm9yYUNvbnN0YW50cy5Gb3JiaWRkZW5SZXNvdXJjZSwgS25vcmFDb25zdGFudHMuWE1MVG9TdGFuZG9mZk1hcHBpbmcsIEtub3JhQ29uc3RhbnRzLkxpc3ROb2RlXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lDYWNoZX0gY2FjaGVPbnRvbG9neSBjZW50cmFsIGluc3RhbmNlIHRoYXQgY2FjaGVzIGFsbCBkZWZpbml0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgY2FjaGVPbnRvbG9neTogT250b2xvZ3lDYWNoZSA9IG5ldyBPbnRvbG9neUNhY2hlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vbnRvbG9neVNlcnZpY2U6IE9udG9sb2d5U2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcyBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxvYmplY3Q+IC0gbWV0YWRhdGEgZm9yIGFsbCBvbnRvbG9naWVzIGFzIEpTT04tTEQgKG5vIHByZWZpeGVzLCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZCkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKTogT2JzZXJ2YWJsZTxvYmplY3Q+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fb250b2xvZ3lTZXJ2aWNlLmdldE9udG9sb2dpZXNNZXRhZGF0YSgpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyAocmVzb3VyY2UgY2xhc3NlcyBhbmQgcHJvcGVydGllcykgZm9yIHRoZSBnaXZlbiBvbnRvbG9neSBmcm9tIEtub3JhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmkgb2YgdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPG9iamVjdD4gLSBtZXRhZGF0YSBmb3IgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3Igb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHdvdWxkIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIGEgUHJvbWlzZU9ic2VydmFibGUgLT4gY29tYmluZSB0aGVtIGludG8gb25lIE9ic2VydmFibGVcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL2RvY3VtZW50YXRpb24vb3BlcmF0b3JzL2ZsYXRtYXAuaHRtbFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9yZWFjdGl2ZXguaW8vcnhqcy9jbGFzcy9lczYvT2JzZXJ2YWJsZS5qc35PYnNlcnZhYmxlLmh0bWwjaW5zdGFuY2UtbWV0aG9kLW1lcmdlTWFwXG4gICAgICAgICAgICAgICAgKG9udFJlczogQXBpU2VydmljZVJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbnRQcm9taXNlcyA9IGpzb25sZC5wcm9taXNlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFjdCBKU09OLUxEIHVzaW5nIGFuIGVtcHR5IGNvbnRleHQ6IGV4cGFuZHMgYWxsIElyaXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZSA9IG9udFByb21pc2VzLmNvbXBhY3Qob250UmVzLmJvZHksIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHByb21pc2UgdG8gT2JzZXJ2YWJsZSBhbmQgcmV0dXJuIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmxlYXJucnhqcy5pby9vcGVyYXRvcnMvY3JlYXRpb24vZnJvbXByb21pc2UuaHRtbFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJvbShvbnRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIGFsbCB0aGUgb250b2xvZ2llcycgbWV0YWRhdGEgcmV0dXJuZWQgYnkgS25vcmEgdG8gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gb250b2xvZ2llcyBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIGEgbmV3IE9udG9sb2d5TWV0YWRhdGEgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG9udG9sb2dpZXM6IG9iamVjdFtdKSB7XG5cbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMgPSBvbnRvbG9naWVzLm1hcChcbiAgICAgICAgICAgIG9udG9sb2d5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5TWV0YWRhdGEob250b2xvZ3lbJ0BpZCddLCBvbnRvbG9neVtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBvbnRvbG9naWVzJyBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZSBhbmQgcmV0dXJucyB0aGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4gLSBtZXRhZGF0YSBvZiBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpOiBBcnJheTxPbnRvbG9neU1ldGFkYXRhPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBJcmlzIGZyb20gdGhlIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIGBrbm9yYS1hcGk6UmVzb3VyY2VgIHdpbGwgYmUgZXhjbHVkZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PG9iamVjdD59IGNsYXNzRGVmaW5pdGlvbnMgdGhlIGNsYXNzIGRlZmluaXRpb25zIGluIGFuIG9udG9sb2d5IHJlc3BvbnNlLlxuICAgICAqIEByZXR1cm5zIHN0cmluZ1tdIC0gcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBnaXZlbiBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NJcmlzRnJvbU9udG9sb2d5UmVzcG9uc2UoY2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc0lyaXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBjbGFzc0RlZiBvZiBjbGFzc0RlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc0lyaSA9IGNsYXNzRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgdGhhdCBjbGFzcyBuYW1lIGlzIG5vdCBsaXN0ZWQgYXMgYSBub24gcmVzb3VyY2UgY2xhc3MgYW5kIHRoYXQgdGhlIGlzUmVzb3VyY2VDbGFzcyBmbGFnIGlzIHByZXNlbnQgYW5kIHNldCB0byB0cnVlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2xhc3NJcmkgIT09IEtub3JhQ29uc3RhbnRzLlJlc291cmNlICYmIHRoaXMubm9uUmVzb3VyY2VDbGFzc2VzLmluZGV4T2YoY2xhc3NJcmkpXG4gICAgICAgICAgICAgICAgPT09IC0xICYmIChjbGFzc0RlZltLbm9yYUNvbnN0YW50cy5Jc1Jlc291cmNlQ2xhc3NdICE9PSB1bmRlZmluZWQgJiYgY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBpcyBub3QgYSB2YWx1ZSBjbGFzcywgYnV0IGEgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLnB1c2goY2xhc3NJcmkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3NJcmlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgcmVzcG9uc2UgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3lcbiAgICAgKiBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBLbm9yYSBhdXRvbWF0aWNhbGx5IGluY2x1ZGVzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZWZlcnJlZCB0byBpbiB0aGUgY2FyZGluYWxpdGllcyBvZiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqIElmIHRoZXkgYXJlIGRlZmluZWQgaW4gYW5vdGhlciBvbnRvbG9neSwgdGhhdCBvbnRvbG9neSBpcyByZXF1ZXN0ZWQgZnJvbSBLbm9yYSB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb250b2xvZ3kgdGhlIG9udG9sb2d5IHRvIGJlIGNhY2hlZC5cbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5VG9DYWNoZShvbnRvbG9neTogb2JqZWN0KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JhcGggPSBvbnRvbG9neVsnQGdyYXBoJ107XG5cbiAgICAgICAgLy8gZ2V0IGFsbCBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBjbGFzc0RlZnMgPSBncmFwaC5maWx0ZXIoXG4gICAgICAgICAgICAoZW50aXR5OiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlUeXBlID0gZW50aXR5WydAdHlwZSddO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xDbGFzcztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBhbGwgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsT2JqZWN0UHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsRGF0YXR5cGVQcm9wZXJ0eSB8fFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlUeXBlID09PSBLbm9yYUNvbnN0YW50cy5Pd2xBbm5vdGF0aW9uUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuUmRmUHJvcGVydHk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIGNhY2hlIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIGJlbG9uZ2luZyB0byB0aGUgY3VycmVudCBvbnRvbG9neVxuICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neVsnQGlkJ11dID0gdGhpcy5nZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmcyk7XG5cbiAgICAgICAgLy8gd3JpdGUgY2xhc3MgYW5kIHByb3BlcnR5IGRlZmludGlvbnMgdG8gY2FjaGVcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVFbnRpdHlEZWZpbml0aW9uc1RvQ2FjaGUoY2xhc3NEZWZzLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gb250b2xvZ3lJcmlzIHRoZSBvbnRvbG9naWVzIGZvciB3aGljaCBkZWZpbml0aW9ucyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ3lJbmZvcm1hdGlvbkZyb21DYWNoZShvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYWxsIHJlcXVlc3RlZCBuYW1lZCBncmFwaHNcbiAgICAgICAgbGV0IGFsbFJlc291cmNlQ2xhc3NJcmlzID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBvbnRvbG9neUlyaSBvZiBvbnRvbG9neUlyaXMpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE9udG9sb2d5Q2FjaGVFcnJvcihgZ2V0UmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ2llc0Zyb21DYWNoZTogb250b2xvZ3kgbm90IGZvdW5kIGluIGNhY2hlOiAke29udG9sb2d5SXJpfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBvbnRvbG9neVxuICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldO1xuXG4gICAgICAgICAgICAvLyBhZGQgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgb2YgdGhpcyBvbnRvbG9neVxuICAgICAgICAgICAgYWxsUmVzb3VyY2VDbGFzc0lyaXMgPSBhbGxSZXNvdXJjZUNsYXNzSXJpcy5jb25jYXQodGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3IgYWxsIHJlcXVlc3RlZCBvbnRvbG9naWVzXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhhbGxSZXNvdXJjZUNsYXNzSXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSwgcmVzQ2xhc3NEZWZzLmdldFJlc291cmNlQ2xhc3NlcygpLCByZXNDbGFzc0RlZnMuZ2V0UHJvcGVydGllcygpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSBvbnRvbG9neSByZXNwb25zZSBpbnRvIGFuIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFuZCBjYWNoZXMgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSByZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMgdGhlIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKHJlc291cmNlQ2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0PiwgcHJvcGVydHlDbGFzc0RlZmluaXRpb25zOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3Mgb2YgcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpID0gcmVzQ2xhc3NbJ0BpZCddO1xuXG4gICAgICAgICAgICAvLyByZXByZXNlbnRzIGFsbCBjYXJkaW5hbGl0aWVzIG9mIHRoaXMgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXRpZXM6IENhcmRpbmFsaXR5W10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGd1aU9yZGVyOiBHdWlPcmRlcltdID0gW107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHN1YmNsYXNzT2ZDb2xsZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBzaW5nbGUgb2JqZWN0IG9yIGEgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gW3Jlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl07XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIC8vIGdldCBjYXJkaW5hbGl0aWVzIGZvciB0aGUgcHJvcGVydGllcyBvZiBhIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjdXJDYXJkIG9mIHN1YmNsYXNzT2ZDb2xsZWN0aW9uKSB7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdCBpcyBhIGNhcmRpbmFsaXR5IChpdCBjb3VsZCBhbHNvIGJlIGFuIElyaSBvZiBhIHN1cGVyY2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkIGluc3RhbmNlb2YgT2JqZWN0ICYmIGN1ckNhcmRbJ0B0eXBlJ10gIT09IHVuZGVmaW5lZCAmJiBjdXJDYXJkWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5Pd2xSZXN0cmljdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q2FyZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IG9jY3VycmVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1pbkNhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWluQ2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xDYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLmNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWF4Q2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5tYXhDYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBubyBrbm93biBvY2N1cnJlbmNlIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgY2FyZGluYWxpdHkgdHlwZSBpbnZhbGlkIGZvciAke3Jlc0NsYXNzWydAaWQnXX0gJHtjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXMucHVzaChuZXdDYXJkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGd1aSBvcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0d1aU9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT3JkZXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHdWlPcmRlciA9IG5ldyBHdWlPcmRlcihjdXJDYXJkW0tub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9yZGVyXSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBndWkgb3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWlPcmRlci5wdXNoKG5ld0d1aU9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc09iaiA9IG5ldyBSZXNvdXJjZUNsYXNzKFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzSXJpLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJlc291cmNlSWNvbl0sXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNMYWJlbF0sXG4gICAgICAgICAgICAgICAgY2FyZGluYWxpdGllcyxcbiAgICAgICAgICAgICAgICBndWlPcmRlclxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gd3JpdGUgdGhpcyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uIHRvIHRoZSBjYWNoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID0gcmVzQ2xhc3NPYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnNcbiAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlDbGFzc0RlZmluaXRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGluZm9ybWF0aW9uIGFib3V0IHJlc291cmNlIGNsYXNzZXMgZnJvbSB0aGUgY2FjaGUuXG4gICAgICogVGhlIGFuc3dlciBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gYnkgdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gYW4gW1tPbnRvbG9neUNhY2hlXV0gcmVwcmVzZW50aW5nIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9uc0Zyb21DYWNoZShyZXNDbGFzc0lyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiB7XG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIGRlZmluaXRpb25zIGZvciBlYWNoIHJlc291cmNlIGNsYXNzIGZyb20gdGhlIGNhY2hlXG5cbiAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWZzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgdGhlIHByb3BlcnRpZXMgZnJvbSB0aGUgY2FyZGluYWxpdGllcyBvZiB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3Nlc1xuICAgICAgICBjb25zdCBwcm9wZXJ0eUlyaXMgPSBbXTtcblxuICAgICAgICByZXNDbGFzc0lyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcbiAgICAgICAgICAgICAgICByZXNDbGFzc0RlZnNbcmVzQ2xhc3NJcmldID0gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXS5jYXJkaW5hbGl0aWVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgIGNhcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHByb3BlcnR5IGRlZmluaXRpb24gZm9yIGVhY2ggY2FyZGluYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5SXJpcy5wdXNoKGNhcmQucHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHByb3BEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKG5ldyBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5KCksIHJlc0NsYXNzRGVmcywgcHJvcERlZnMuZ2V0UHJvcGVydGllcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBvbnRvbG9neSBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzXG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGUgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUtub3JhUHJvcGVydHlEZWZpbml0aW9uc1RvT250b2xvZ3lDYWNoZShwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhOiBBcnJheTxvYmplY3Q+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhbmQgY2FjaGUgZWFjaCBnaXZlbiBwcm9wZXJ0eSBkZWZpbml0aW9uXG4gICAgICAgIGZvciAoY29uc3QgcHJvcERlZiBvZiBwcm9wZXJ0eURlZmluaXRpb25zRnJvbUtub3JhKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BJcmkgPSBwcm9wRGVmWydAaWQnXTtcblxuICAgICAgICAgICAgbGV0IGlzRWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzRWRpdGFibGVdICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNMaW5rVmFsdWVQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzdWJQcm9wZXJ0eU9mID0gW107XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSkpIHtcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mID0gcHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXS5tYXAoKHN1cGVyUHJvcDogT2JqZWN0KSA9PiBzdXBlclByb3BbJ0BpZCddKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5zdWJQcm9wZXJ0eU9mXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZi5wdXNoKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl1bJ0BpZCddKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9iamVjdFR5cGU7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5PYmplY3RUeXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VHlwZSA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV1bJ0BpZCddO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBndWlBdHRyaWJ1dGUgPSBbXTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlNhbHNhaEd1aUF0dHJpYnV0ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BEZWZbS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpQXR0cmlidXRlXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHByb3BEZWZbS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpQXR0cmlidXRlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpQXR0cmlidXRlLnB1c2goYXR0cik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBndWlBdHRyaWJ1dGUucHVzaChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLlNhbHNhaEd1aUF0dHJpYnV0ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FjaGUgcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPSBuZXcgUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLFxuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUsXG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHksXG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBndWlBdHRyaWJ1dGVcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwcm9wZXJ0eSBkZWZpbml0aW9ucyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT250b2xvZ3lJbmZvcm1hdGlvbiAtIHJlcXVlc3RlZCBwcm9wZXJ0eSBkZWZpbnRpb25zLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT250b2xvZ3lJbmZvcm1hdGlvbiB7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHlEZWZzID0gbmV3IFByb3BlcnRpZXMoKTtcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChcbiAgICAgICAgICAgIHByb3BJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgT250b2xvZ3lDYWNoZUVycm9yKGBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlOiBwcm9wZXJ0eSBub3QgZm91bmQgaW4gY2FjaGU6ICR7cHJvcElyaX1gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0eURlZnNbcHJvcElyaV0gPSB0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24obmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKSwgbmV3IFJlc291cmNlQ2xhc3NlcygpLCBwcm9wZXJ0eURlZnMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IC0gbWV0YWRhdGEgYWJvdXQgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHVibGljIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFycmF5PE9udG9sb2d5TWV0YWRhdGE+PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyBpbiBjYWNoZSB5ZXQsIGdldCBtZXRhZGF0YSBmcm9tIEtub3JhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9naWVzTWV0YWRhdGFGcm9tS25vcmEoKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0QW5kV3JpdGVPbnRvbG9naWVzTWV0YWRhdGFUb0NhY2hlKG1ldGFkYXRhWydAZ3JhcGgnXS5maWx0ZXIoKG9udG8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZXhjbHVkZWQgb250b2xvZ2llc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4Y2x1ZGVkT250b2xvZ2llcy5pbmRleE9mKG9udG9bJ0BpZCddKSA9PT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbWV0YWRhdGEgZnJvbSBjYWNoZVxuICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0QWxsT250b2xvZ2llc01ldGFkYXRhRnJvbUNhY2hlKCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIEtub3JhLCBhZGRpbmcgdGhlbSB0byB0aGUgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSByZXF1ZXN0ZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnlbXT5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuXG4gICAgICAgIC8vIGFycmF5IHRvIGJlIHBvcHVsYXRlZCB3aXRoIE9ic2VydmFibGVzXG4gICAgICAgIGNvbnN0IG9ic2VydmFibGVzID0gW107XG5cbiAgICAgICAgLy8gZG8gYSByZXF1ZXN0IGZvciBlYWNoIG9udG9sb2d5XG4gICAgICAgIG9udG9sb2d5SXJpcy5mb3JFYWNoKG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgIC8vIHB1c2ggYW4gT2JzZXJ2YWJsZSBvbnRvIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgICAgIG9ic2VydmFibGVzLnB1c2godGhpcy5nZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgKG9udG9sb2d5OiBvYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdyaXRlIHJlc3BvbnNlIHRvIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZUFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lUb0NhY2hlKG9udG9sb2d5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JrSm9pbiByZXR1cm5zIGFuIE9ic2VydmFibGUgb2YgYW4gYXJyYXkgb2YgcmVzdWx0c1xuICAgICAgICAvLyByZXR1cm5lZCBieSBlYWNoIE9ic2VydmFibGUgY29udGFpbmVkIGluIGBvYnNlcnZhYmxlc2BcbiAgICAgICAgLy8gYSBzdWJzY3JpcHRpb24gdG8gdGhlIE9ic2VydmFibGUgcmV0dXJuZWQgYnkgZm9ya0pvaW4gaXMgZXhlY3V0ZWRcbiAgICAgICAgLy8gb25jZSBhbGwgT2JzZXJ2YWJsZXMgaGF2ZSBiZWVuIGNvbXBsZXRlZFxuICAgICAgICByZXR1cm4gZm9ya0pvaW4ob2JzZXJ2YWJsZXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2dpZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvbnRvbG9neUlyaXMgSXJpcyBvZiB0aGUgb250b2xvZ2llcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSBhbGwgb250b2xvZ3kgbWV0YWRhdGEgZnJvbSB0aGUgY2FjaGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCBvbnRvbG9neUlyaXNUb1F1ZXJ5ID0gb250b2xvZ3lJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIG9udG9sb2d5SXJpID0+IHtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9udG9sb2d5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lJcmldID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgb250b2xvZ2llcyB0aGF0IGFyZSBtb3QgY2FjaGVkIHlldFxuICAgICAgICBpZiAob250b2xvZ3lJcmlzVG9RdWVyeS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXNUb1F1ZXJ5KS5waXBlKFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlZCBvbmNlIGFsbCBvbnRvbG9naWVzIGhhdmUgYmVlbiBjYWNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICAgICAqIElmIHRoZSBkZWZpbml0aW9ucyBhcmUgbm90IGFscmVhZHkgaW4gdGhlIGNhY2hlLCB0aGUgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbSBLbm9yYSBhbmQgY2FjaGVkLlxuICAgICAqXG4gICAgICogUHJvcGVydGllcyBjb250YWluZWQgaW4gdGhlIGNhcmRpbmFsaXRpZXMgd2lsbCBiZSByZXR1cm5lZCB0b28uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMgKGluY2x1ZGluZyBwcm9wZXJ0aWVzKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zKHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzSXJpc1RvUXVlcnlGb3I6IHN0cmluZ1tdID0gcmVzb3VyY2VDbGFzc0lyaXMuZmlsdGVyKFxuICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzIHRoYXQgYXJlIG5vdCBjYWNoZWQgeWV0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldID09PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIG9udG9sb2d5IElyaXMgdGhhdCBoYXZlIHRvIGJlIHF1ZXJpZWQgdG8gb2J0YWluIHRoZSBtaXNzaW5nIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgICAgIGNvbnN0IG9udG9sb2d5SXJpczogc3RyaW5nW10gPSByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yLm1hcChcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5nZXRPbnRvbG9neUlyaUZyb21FbnRpdHlJcmkocmVzQ2xhc3NJcmkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuZmlsdGVyKFV0aWxzLmZpbHRlck91dER1cGxpY2F0ZXMpO1xuXG4gICAgICAgICAgICAvLyBvYnRhaW4gbWlzc2luZyByZXNvdXJjZSBjbGFzcyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpcykucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSByZXR1cm5lZCAuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHVibGljIGdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXNUb1F1ZXJ5OiBzdHJpbmdbXSA9IHByb3BlcnR5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHByb3BlcnR5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocHJvcGVydGllc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcHJvcGVydGllc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHByb3BlcnRpZXNUb1F1ZXJ5Lm1hcChcbiAgICAgICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShwcm9wSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2JsZW0gd2l0aDogcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==