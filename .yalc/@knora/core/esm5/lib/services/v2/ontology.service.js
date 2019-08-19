import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { KnoraConstants } from '../../declarations/api/knora-constants';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
/**
 * Requests ontology information from Knora.
 */
var OntologyService = /** @class */ (function (_super) {
    tslib_1.__extends(OntologyService, _super);
    function OntologyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET list of ontologies
    // ------------------------------------------------------------------------
    /**
     * DEPRECATED: You should use getAllOntologies()
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    OntologyService.prototype.getOntologiesMetadata = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    OntologyService.prototype.getAllOntologies = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests the ontologies of a specific project
     *
     * @param projectIri
     * @returns Observable<ApiServiceResult> - the metadata of project ontologies.
     */
    OntologyService.prototype.getProjectOntologies = function (projectIri) {
        return this.httpGet('/v2/ontologies/metadata/' + encodeURIComponent(projectIri));
    };
    // ------------------------------------------------------------------------
    // GET ontology
    // ------------------------------------------------------------------------
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param {string} ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns Observable<ApiServiceResult> - the requested ontology.
     */
    OntologyService.prototype.getAllEntityDefinitionsForOntologies = function (ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    };
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param {string[]} resourceClassIris the Iris of the resource classes to be queried.
     * @returns Observable<ApiServiceResult> - the requested resource class definitions.
     */
    OntologyService.prototype.getResourceClasses = function (resourceClassIris) {
        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'); });
        }
        var resClassUriEnc = '';
        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    };
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param {string[]} propertyIris the Iris of the properties to be queried.
     * @returns Observable<ApiServiceResult> - the requested properties.
     */
    OntologyService.prototype.getProperties = function (propertyIris) {
        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No property Iris given for call of OntologyService.getProperties'); });
        }
        var propertiesUriEnc = '';
        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new ontology.
     *
     * @param {NewOntology} data Data contains: projectIri, name, label
     * @returns Observable<ApiServiceResult> incl. ontolog iri and knora-api:lastModificationDate
     */
    OntologyService.prototype.createOntology = function (data) {
        var path = '/v2/ontologies';
        var ontology = {
            'knora-api:ontologyName': data.name,
            'knora-api:attachedToProject': {
                '@id': data.projectIri,
            },
            'rdfs:label': data.label,
            '@context': {
                'rdfs': KnoraConstants.RdfsSchema,
                'knora-api': KnoraConstants.KnoraApiV2WithValueObjectPath
            }
        };
        return this.httpPost(path, ontology).pipe(map(function (result) { return result.body; }), catchError(this.handleJsonError));
    };
    OntologyService.prototype.createResourceClass = function (data) {
        var path = '/v2/ontologies/classes';
        // TODO: add the following values to parameter
        var onto_iri;
        var onto_name;
        var last_onto_date;
        var resourceClass = {
            '@id': onto_iri,
            '@type': 'owl:Ontology',
            'knora-api:lastModificationDate': last_onto_date,
            '@graph': [{
                    '@id': onto_name + ':' + data.name,
                    '@type': 'owl:Class',
                    'rdfs:label': data.labels,
                    'rdfs:comment': data.comments,
                    'rdfs:subClassOf': {
                        '@id': data.subClassOf
                    }
                }],
            '@context': {
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'knora-api': 'http://api.knora.org/ontology/knora-api/v2#',
                'owl': 'http://www.w3.org/2002/07/owl#',
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'xsd': 'http://www.w3.org/2001/XMLSchema#',
                onto_name: onto_iri + '#'
            }
        };
        return this.httpPost(path, resourceClass).pipe(map(function (result) { return result.body; }), catchError(this.handleJsonError));
    };
    OntologyService.prototype.createProperty = function (data) {
        var e_1, _a;
        var path = '/v2/ontologies/properties';
        // TODO: add the following values to parameter
        var onto_iri;
        var onto_name;
        var last_onto_date;
        var graph = [];
        try {
            for (var data_1 = tslib_1.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var prop = data_1_1.value;
                var prop_obj = {
                    '@id': onto_name + ':' + prop.name,
                    '@type': 'owl:ObjectProperty',
                    'rdfs:label': prop.labels,
                    'rdfs:comment': prop.comments,
                    'rdfs:subPropertyOf': prop.subPropertyOf,
                    'salsah-gui:guiElement': {
                        '@id': prop.guiElement
                    }
                };
                graph.push(prop_obj);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var property = {
            '@id': onto_iri,
            '@type': 'owl:Ontology',
            'knora-api:lastModificationDate': last_onto_date,
            '@graph': [
                graph
            ],
            '@context': {
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'knora-api': 'http://api.knora.org/ontology/knora-api/v2#',
                'salsah-gui': 'http://api.knora.org/ontology/salsah-gui/v2#',
                'owl': 'http://www.w3.org/2002/07/owl#',
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'xsd': 'http://www.w3.org/2001/XMLSchema#',
                onto_name: onto_iri + '#'
            }
        };
        return this.httpPost(path, property).pipe(map(function (result) { return result.body; }), catchError(this.handleJsonError));
    };
    OntologyService.prototype.setCardinality = function (data) {
        var path = '/v2/ontologies/cardinalities';
        // TODO: add the following values to parameter
        var class_iri;
        var prop_iri;
        var onto_iri;
        var onto_name;
        var last_onto_date;
        // TODO: find a way with typescript for the following python construct
        /*
        let switcher = {
            '1': ('owl:cardinality', 1),
            '0-1': ('owl:maxCardinality', 1),
            '0-n': ('owl:minCardinality', 0),
            '1-n': ('owl:minCardinality', 1)
        };

        let occurrence: any = switcher.get(data.occurrence);
        */
        var cardinality = {
            '@id': onto_iri,
            '@type': 'owl:Ontology',
            'knora-api:lastModificationDate': last_onto_date,
            '@graph': [{
                    '@id': class_iri,
                    '@type': 'owl:Class',
                    'rdfs:subClassOf': {
                        '@type': 'owl:Restriction',
                        // occurrence[0]: occurrence[1],
                        'owl:onProperty': {
                            '@id': prop_iri
                        }
                    }
                }],
            '@context': {
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'knora-api': 'http://api.knora.org/ontology/knora-api/v2#',
                'owl': 'http://www.w3.org/2002/07/owl#',
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'xsd': 'http://www.w3.org/2001/XMLSchema#',
                onto_name: onto_iri + '#'
            }
        };
        return this.httpPost(path, cardinality).pipe(map(function (result) { return result.body; }), catchError(this.handleJsonError));
    };
    OntologyService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    OntologyService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken)); }, token: OntologyService, providedIn: "root" });
    return OntologyService;
}(ApiService));
export { OntologyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUd4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJNUM7O0dBRUc7QUFDSDtJQUdxQywyQ0FBVTtJQUgvQzs7S0FpUkM7SUEzUUcsMkVBQTJFO0lBQzNFLHlCQUF5QjtJQUN6QiwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCwrQ0FBcUIsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBDQUFnQixHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDhDQUFvQixHQUFwQixVQUFxQixVQUFrQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBR0QsMkVBQTJFO0lBQzNFLGVBQWU7SUFDZiwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCw4REFBb0MsR0FBcEMsVUFBcUMsV0FBbUI7UUFDcEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixHQUFHLGtCQUFrQixDQUFDLFdB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T0FBTyxFQUFFLGNBQWM7WUFDdkIsZ0NBQWdDLEVBQUUsY0FBYztZQUNoRCxRQUFRLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLGlCQUFpQixFQUFFO3dCQUNmLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLGdDQUFnQzt3QkFDaEMsZ0JBQWdCLEVBQUU7NEJBQ2QsS0FBSyxFQUFFLFFBQVE7eUJBQ2xCO3FCQUNKO2lCQUNKLENBQUM7WUFDRixVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDZDQUE2QztnQkFDcEQsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsS0FBSyxFQUFFLGdDQUFnQztnQkFDdkMsTUFBTSxFQUFFLHVDQUF1QztnQkFDL0MsS0FBSyxFQUFFLG1DQUFtQztnQkFDMUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxHQUFHO2FBQzVCO1NBQ0osQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN4QyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBWCxDQUFXLENBQUMsRUFDOUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7O2dCQS9RSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7MEJBZkQ7Q0E4UkMsQUFqUkQsQ0FHcUMsVUFBVSxHQThROUM7U0E5UVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQnO1xuaW1wb3J0IHsgTmV3T250b2xvZ3kgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL3YyL29udG9sb2d5L25ldy1vbnRvbG9neSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmV3UmVzb3VyY2VDbGFzcyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvdjIvb250b2xvZ3kvbmV3LXJlc291cmNlLWNsYXNzJztcbmltcG9ydCB7IE5ld1Byb3BlcnR5IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS92Mi9vbnRvbG9neS9uZXctcHJvcGVydHknO1xuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5U2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVQgbGlzdCBvZiBvbnRvbG9naWVzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBERVBSRUNBVEVEOiBZb3Ugc2hvdWxkIHVzZSBnZXRBbGxPbnRvbG9naWVzKClcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgYWJvdXQgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldE9udG9sb2dpZXNNZXRhZGF0YSgpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgYWJvdXQgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIGFsbCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldEFsbE9udG9sb2dpZXMoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG9udG9sb2dpZXMgb2YgYSBzcGVjaWZpYyBwcm9qZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgbWV0YWRhdGEgb2YgcHJvamVjdCBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFByb2plY3RPbnRvbG9naWVzKHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVCBvbnRvbG9neVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYWxsIGVudGl0eSBkZWZpbml0aW9ucyBmb3IgdGhlIGdpdmVuIG9udG9sb2dpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb250b2xvZ3lJcmkgdGhlIElyaXMgb2YgdGhlIG5hbWVkIGdyYXBocyB3aG9zZSByZXNvdXJjZSBjbGFzc2VzIGFyZSB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCBvbnRvbG9neS5cbiAgICAgKi9cbiAgICBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9hbGxlbnRpdGllcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9udG9sb2d5SXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXNvdXJjZUNsYXNzSXJpcyB0aGUgSXJpcyBvZiB0aGUgcmVzb3VyY2UgY2xhc3NlcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUNsYXNzSXJpczogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHJlc291cmNlIGNsYXNzIElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFJlc291cmNlQ2xhc3NlcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNDbGFzc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHJlc291cmNlQ2xhc3NJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICByZXNDbGFzc1VyaUVuYyA9IHJlc0NsYXNzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9jbGFzc2VzJyArIHJlc0NsYXNzVXJpRW5jKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBwcm9wZXJ0aWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBJcmlzIG9mIHRoZSBwcm9wZXJ0aWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocHJvcGVydHlJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcHJvcGVydHkgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UHJvcGVydGllcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcHJvcGVydHlJcmlzLmZvckVhY2goZnVuY3Rpb24gKHJlc0NsYXNzSXJpKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzVXJpRW5jID0gcHJvcGVydGllc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvcHJvcGVydGllcycgKyBwcm9wZXJ0aWVzVXJpRW5jKTtcblxuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBPU1RcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBuZXcgb250b2xvZ3kuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05ld09udG9sb2d5fSBkYXRhIERhdGEgY29udGFpbnM6IHByb2plY3RJcmksIG5hbWUsIGxhYmVsXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiBpbmNsLiBvbnRvbG9nIGlyaSBhbmQga25vcmEtYXBpOmxhc3RNb2RpZmljYXRpb25EYXRlXG4gICAgICovXG4gICAgY3JlYXRlT250b2xvZ3koZGF0YTogTmV3T250b2xvZ3kpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvdjIvb250b2xvZ2llcyc7XG5cbiAgICAgICAgY29uc3Qgb250b2xvZ3kgPSB7XG4gICAgICAgICAgICAna25vcmEtYXBpOm9udG9sb2d5TmFtZSc6IGRhdGEubmFtZSxcbiAgICAgICAgICAgICdrbm9yYS1hcGk6YXR0YWNoZWRUb1Byb2plY3QnOiB7XG4gICAgICAgICAgICAgICAgJ0BpZCc6IGRhdGEucHJvamVjdElyaSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncmRmczpsYWJlbCc6IGRhdGEubGFiZWwsXG4gICAgICAgICAgICAnQGNvbnRleHQnOiB7XG4gICAgICAgICAgICAgICAgJ3JkZnMnOiBLbm9yYUNvbnN0YW50cy5SZGZzU2NoZW1hLFxuICAgICAgICAgICAgICAgICdrbm9yYS1hcGknOiBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIG9udG9sb2d5KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5ib2R5KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY3JlYXRlUmVzb3VyY2VDbGFzcyhkYXRhOiBOZXdSZXNvdXJjZUNsYXNzKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL3YyL29udG9sb2dpZXMvY2xhc3Nlcyc7XG5cbiAgICAgICAgLy8gVE9ETzogYWRkIHRoZSBmb2xsb3dpbmcgdmFsdWVzIHRvIHBhcmFtZXRlclxuICAgICAgICBsZXQgb250b19pcmk6IHN0cmluZztcbiAgICAgICAgbGV0IG9udG9fbmFtZTogc3RyaW5nO1xuICAgICAgICBsZXQgbGFzdF9vbnRvX2RhdGU6IHN0cmluZztcblxuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzID0ge1xuICAgICAgICAgICAgJ0BpZCc6IG9udG9faXJpLFxuICAgICAgICAgICAgJ0B0eXBlJzogJ293bDpPbnRvbG9neScsXG4gICAgICAgICAgICAna25vcmEtYXBpOmxhc3RNb2RpZmljYXRpb25EYXRlJzogbGFzdF9vbnRvX2RhdGUsXG4gICAgICAgICAgICAnQGdyYXBoJzogW3tcbiAgICAgICAgICAgICAgICAnQGlkJzogb250b19uYW1lICsgJzonICsgZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICdAdHlwZSc6ICdvd2w6Q2xhc3MnLFxuICAgICAgICAgICAgICAgICdyZGZzOmxhYmVsJzogZGF0YS5sYWJlbHMsXG4gICAgICAgICAgICAgICAgJ3JkZnM6Y29tbWVudCc6IGRhdGEuY29tbWVudHMsXG4gICAgICAgICAgICAgICAgJ3JkZnM6c3ViQ2xhc3NPZic6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0BpZCc6IGRhdGEuc3ViQ2xhc3NPZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgJ0Bjb250ZXh0Jzoge1xuICAgICAgICAgICAgICAgICdyZGYnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIycsXG4gICAgICAgICAgICAgICAgJ2tub3JhLWFwaSc6ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjJyxcbiAgICAgICAgICAgICAgICAnb3dsJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIycsXG4gICAgICAgICAgICAgICAgJ3JkZnMnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIycsXG4gICAgICAgICAgICAgICAgJ3hzZCc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnLFxuICAgICAgICAgICAgICAgIG9udG9fbmFtZTogb250b19pcmkgKyAnIydcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIHJlc291cmNlQ2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmJvZHkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGNyZWF0ZVByb3BlcnR5KGRhdGE6IE5ld1Byb3BlcnR5W10pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvdjIvb250b2xvZ2llcy9wcm9wZXJ0aWVzJztcblxuICAgICAgICAvLyBUT0RPOiBhZGQgdGhlIGZvbGxvd2luZyB2YWx1ZXMgdG8gcGFyYW1ldGVyXG4gICAgICAgIGxldCBvbnRvX2lyaTogc3RyaW5nO1xuICAgICAgICBsZXQgb250b19uYW1lOiBzdHJpbmc7XG4gICAgICAgIGxldCBsYXN0X29udG9fZGF0ZTogc3RyaW5nO1xuXG4gICAgICAgIGNvbnN0IGdyYXBoID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3Bfb2JqID0ge1xuICAgICAgICAgICAgICAgICdAaWQnOiBvbnRvX25hbWUgKyAnOicgKyBwcm9wLm5hbWUsXG4gICAgICAgICAgICAgICAgJ0B0eXBlJzogJ293bDpPYmplY3RQcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgJ3JkZnM6bGFiZWwnOiBwcm9wLmxhYmVscyxcbiAgICAgICAgICAgICAgICAncmRmczpjb21tZW50JzogcHJvcC5jb21tZW50cyxcbiAgICAgICAgICAgICAgICAncmRmczpzdWJQcm9wZXJ0eU9mJzogcHJvcC5zdWJQcm9wZXJ0eU9mLFxuICAgICAgICAgICAgICAgICdzYWxzYWgtZ3VpOmd1aUVsZW1lbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgICdAaWQnOiBwcm9wLmd1aUVsZW1lbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ3JhcGgucHVzaChwcm9wX29iaik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICdAaWQnOiBvbnRvX2lyaSxcbiAgICAgICAgICAgICdAdHlwZSc6ICdvd2w6T250b2xvZ3knLFxuICAgICAgICAgICAgJ2tub3JhLWFwaTpsYXN0TW9kaWZpY2F0aW9uRGF0ZSc6IGxhc3Rfb250b19kYXRlLFxuICAgICAgICAgICAgJ0BncmFwaCc6IFtcbiAgICAgICAgICAgICAgICBncmFwaFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICdAY29udGV4dCc6IHtcbiAgICAgICAgICAgICAgICAncmRmJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnLFxuICAgICAgICAgICAgICAgICdrbm9yYS1hcGknOiAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyIycsXG4gICAgICAgICAgICAgICAgJ3NhbHNhaC1ndWknOiAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kvc2Fsc2FoLWd1aS92MiMnLFxuICAgICAgICAgICAgICAgICdvd2wnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjJyxcbiAgICAgICAgICAgICAgICAncmRmcyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjJyxcbiAgICAgICAgICAgICAgICAneHNkJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIycsXG4gICAgICAgICAgICAgICAgb250b19uYW1lOiBvbnRvX2lyaSArICcjJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgcHJvcGVydHkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmJvZHkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIHNldENhcmRpbmFsaXR5KGRhdGE6IGFueSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy92Mi9vbnRvbG9naWVzL2NhcmRpbmFsaXRpZXMnO1xuXG4gICAgICAgIC8vIFRPRE86IGFkZCB0aGUgZm9sbG93aW5nIHZhbHVlcyB0byBwYXJhbWV0ZXJcbiAgICAgICAgbGV0IGNsYXNzX2lyaTogc3RyaW5nO1xuICAgICAgICBsZXQgcHJvcF9pcmk6IHN0cmluZztcblxuICAgICAgICBsZXQgb250b19pcmk6IHN0cmluZztcbiAgICAgICAgbGV0IG9udG9fbmFtZTogc3RyaW5nO1xuICAgICAgICBsZXQgbGFzdF9vbnRvX2RhdGU6IHN0cmluZztcblxuICAgICAgICAvLyBUT0RPOiBmaW5kIGEgd2F5IHdpdGggdHlwZXNjcmlwdCBmb3IgdGhlIGZvbGxvd2luZyBweXRob24gY29uc3RydWN0XG4gICAgICAgIC8qXG4gICAgICAgIGxldCBzd2l0Y2hlciA9IHtcbiAgICAgICAgICAgICcxJzogKCdvd2w6Y2FyZGluYWxpdHknLCAxKSxcbiAgICAgICAgICAgICcwLTEnOiAoJ293bDptYXhDYXJkaW5hbGl0eScsIDEpLFxuICAgICAgICAgICAgJzAtbic6ICgnb3dsOm1pbkNhcmRpbmFsaXR5JywgMCksXG4gICAgICAgICAgICAnMS1uJzogKCdvd2w6bWluQ2FyZGluYWxpdHknLCAxKVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBvY2N1cnJlbmNlOiBhbnkgPSBzd2l0Y2hlci5nZXQoZGF0YS5vY2N1cnJlbmNlKTtcbiAgICAgICAgKi9cblxuICAgICAgICBjb25zdCBjYXJkaW5hbGl0eSA9IHtcbiAgICAgICAgICAgICdAaWQnOiBvbnRvX2lyaSxcbiAgICAgICAgICAgICdAdHlwZSc6ICdvd2w6T250b2xvZ3knLFxuICAgICAgICAgICAgJ2tub3JhLWFwaTpsYXN0TW9kaWZpY2F0aW9uRGF0ZSc6IGxhc3Rfb250b19kYXRlLFxuICAgICAgICAgICAgJ0BncmFwaCc6IFt7XG4gICAgICAgICAgICAgICAgJ0BpZCc6IGNsYXNzX2lyaSxcbiAgICAgICAgICAgICAgICAnQHR5cGUnOiAnb3dsOkNsYXNzJyxcbiAgICAgICAgICAgICAgICAncmRmczpzdWJDbGFzc09mJzoge1xuICAgICAgICAgICAgICAgICAgICAnQHR5cGUnOiAnb3dsOlJlc3RyaWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gb2NjdXJyZW5jZVswXTogb2NjdXJyZW5jZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgJ293bDpvblByb3BlcnR5Jzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BpZCc6IHByb3BfaXJpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdAY29udGV4dCc6IHtcbiAgICAgICAgICAgICAgICAncmRmJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnLFxuICAgICAgICAgICAgICAgICdrbm9yYS1hcGknOiAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyIycsXG4gICAgICAgICAgICAgICAgJ293bCc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCMnLFxuICAgICAgICAgICAgICAgICdyZGZzJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSMnLFxuICAgICAgICAgICAgICAgICd4c2QnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjJyxcbiAgICAgICAgICAgICAgICBvbnRvX25hbWU6IG9udG9faXJpICsgJyMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgY2FyZGluYWxpdHkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmJvZHkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiJdfQ==