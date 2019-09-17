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
    OntologyService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken)); }, token: OntologyService, providedIn: "root" });
    OntologyService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        })
    ], OntologyService);
    return OntologyService;
}(ApiService));
export { OntologyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUd4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJNUM7O0dBRUc7QUFJSDtJQUFxQywyQ0FBVTtJQUEvQzs7S0E4UUM7SUEzUUcsMkVBQTJFO0lBQzNFLHlCQUF5QjtJQUN6QiwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCwrQ0FBcUIsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBDQUFnQixHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDhDQUFvQixHQUFwQixVQUFxQixVQUFrQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBR0QsMkVBQTJFO0lBQzNFLGVBQWU7SUFDZiwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCw4REFBb0MsR0FBcEMsVUFBcUMsV0FBbUI7UUFDcEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixHQUFHLGtCQUFrQixDQUFDLFdB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T0FBTyxFQUFFLGNBQWM7WUFDdkIsZ0NBQWdDLEVBQUUsY0FBYztZQUNoRCxRQUFRLEVBQUUsQ0FBQztvQkFDUCxLQUFLLEVBQUUsU0FBUztvQkFDaEIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLGlCQUFpQixFQUFFO3dCQUNmLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLGdDQUFnQzt3QkFDaEMsZ0JBQWdCLEVBQUU7NEJBQ2QsS0FBSyxFQUFFLFFBQVE7eUJBQ2xCO3FCQUNKO2lCQUNKLENBQUM7WUFDRixVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDZDQUE2QztnQkFDcEQsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsS0FBSyxFQUFFLGdDQUFnQztnQkFDdkMsTUFBTSxFQUFFLHVDQUF1QztnQkFDL0MsS0FBSyxFQUFFLG1DQUFtQztnQkFDMUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxHQUFHO2FBQzVCO1NBQ0osQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN4QyxHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksRUFBWCxDQUFXLENBQUMsRUFDOUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7O0lBNVFRLGVBQWU7UUFIM0IsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztPQUNXLGVBQWUsQ0E4UTNCOzBCQTlSRDtDQThSQyxBQTlRRCxDQUFxQyxVQUFVLEdBOFE5QztTQTlRWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS1zZXJ2aWNlLXJlc3VsdCc7XG5pbXBvcnQgeyBOZXdPbnRvbG9neSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvdjIvb250b2xvZ3kvbmV3LW9udG9sb2d5JztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBOZXdSZXNvdXJjZUNsYXNzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS92Mi9vbnRvbG9neS9uZXctcmVzb3VyY2UtY2xhc3MnO1xuaW1wb3J0IHsgTmV3UHJvcGVydHkgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL3YyL29udG9sb2d5L25ldy1wcm9wZXJ0eSc7XG5cbi8qKlxuICogUmVxdWVzdHMgb250b2xvZ3kgaW5mb3JtYXRpb24gZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT250b2xvZ3lTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVCBsaXN0IG9mIG9udG9sb2dpZXNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERFUFJFQ0FURUQ6IFlvdSBzaG91bGQgdXNlIGdldEFsbE9udG9sb2dpZXMoKVxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBhYm91dCBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBtZXRhZGF0YSBhYm91dCBhbGwgZXhpc3Rpbmcgb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0QWxsT250b2xvZ2llcygpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgb250b2xvZ2llcyBvZiBhIHNwZWNpZmljIHByb2plY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBwcm9qZWN0IG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvamVjdE9udG9sb2dpZXMocHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUIG9udG9sb2d5XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gb250b2xvZ2llcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbnRvbG9neUlyaSB0aGUgSXJpcyBvZiB0aGUgbmFtZWQgZ3JhcGhzIHdob3NlIHJlc291cmNlIGNsYXNzZXMgYXJlIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ2llcyhvbnRvbG9neUlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2FsbGVudGl0aWVzLycgKyBlbmNvZGVVUklDb21wb25lbnQob250b2xvZ3lJcmkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3NlcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHJlc291cmNlQ2xhc3NJcmlzIHRoZSBJcmlzIG9mIHRoZSByZXNvdXJjZSBjbGFzc2VzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgZ2V0UmVzb3VyY2VDbGFzc2VzKHJlc291cmNlQ2xhc3NJcmlzOiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJcmlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBhcmUgZ2l2ZW4gdG8gcXVlcnkgZm9yLCByZXR1cm4gYSBmYWlsZWQgT2JzZXJ2ZXJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gcmVzb3VyY2UgY2xhc3MgSXJpcyBnaXZlbiBmb3IgY2FsbCBvZiBPbnRvbG9neVNlcnZpY2UuZ2V0UmVzb3VyY2VDbGFzc2VzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc0NsYXNzVXJpRW5jID0gJyc7XG5cbiAgICAgICAgcmVzb3VyY2VDbGFzc0lyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHJlc0NsYXNzVXJpRW5jID0gcmVzQ2xhc3NVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL2NsYXNzZXMnICsgcmVzQ2xhc3NVcmlFbmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHByb3BlcnRpZXMgZnJvbSBLbm9yYSdzIG9udG9sb2dpZXMgcm91dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wZXJ0eUlyaXMgdGhlIElyaXMgb2YgdGhlIHByb3BlcnRpZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eUlyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBwcm9wZXJ0eSBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRQcm9wZXJ0aWVzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BlcnRpZXNVcmlFbmMgPSAnJztcblxuICAgICAgICBwcm9wZXJ0eUlyaXMuZm9yRWFjaChmdW5jdGlvbiAocmVzQ2xhc3NJcmkpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXNVcmlFbmMgPSBwcm9wZXJ0aWVzVXJpRW5jICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlc0NsYXNzSXJpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9wcm9wZXJ0aWVzJyArIHByb3BlcnRpZXNVcmlFbmMpO1xuXG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBvbnRvbG9neS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmV3T250b2xvZ3l9IGRhdGEgRGF0YSBjb250YWluczogcHJvamVjdElyaSwgbmFtZSwgbGFiZWxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IGluY2wuIG9udG9sb2cgaXJpIGFuZCBrbm9yYS1hcGk6bGFzdE1vZGlmaWNhdGlvbkRhdGVcbiAgICAgKi9cbiAgICBjcmVhdGVPbnRvbG9neShkYXRhOiBOZXdPbnRvbG9neSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy92Mi9vbnRvbG9naWVzJztcblxuICAgICAgICBjb25zdCBvbnRvbG9neSA9IHtcbiAgICAgICAgICAgICdrbm9yYS1hcGk6b250b2xvZ3lOYW1lJzogZGF0YS5uYW1lLFxuICAgICAgICAgICAgJ2tub3JhLWFwaTphdHRhY2hlZFRvUHJvamVjdCc6IHtcbiAgICAgICAgICAgICAgICAnQGlkJzogZGF0YS5wcm9qZWN0SXJpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdyZGZzOmxhYmVsJzogZGF0YS5sYWJlbCxcbiAgICAgICAgICAgICdAY29udGV4dCc6IHtcbiAgICAgICAgICAgICAgICAncmRmcyc6IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEsXG4gICAgICAgICAgICAgICAgJ2tub3JhLWFwaSc6IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgb250b2xvZ3kpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmJvZHkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjcmVhdGVSZXNvdXJjZUNsYXNzKGRhdGE6IE5ld1Jlc291cmNlQ2xhc3MpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvdjIvb250b2xvZ2llcy9jbGFzc2VzJztcblxuICAgICAgICAvLyBUT0RPOiBhZGQgdGhlIGZvbGxvd2luZyB2YWx1ZXMgdG8gcGFyYW1ldGVyXG4gICAgICAgIGxldCBvbnRvX2lyaTogc3RyaW5nO1xuICAgICAgICBsZXQgb250b19uYW1lOiBzdHJpbmc7XG4gICAgICAgIGxldCBsYXN0X29udG9fZGF0ZTogc3RyaW5nO1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3MgPSB7XG4gICAgICAgICAgICAnQGlkJzogb250b19pcmksXG4gICAgICAgICAgICAnQHR5cGUnOiAnb3dsOk9udG9sb2d5JyxcbiAgICAgICAgICAgICdrbm9yYS1hcGk6bGFzdE1vZGlmaWNhdGlvbkRhdGUnOiBsYXN0X29udG9fZGF0ZSxcbiAgICAgICAgICAgICdAZ3JhcGgnOiBbe1xuICAgICAgICAgICAgICAgICdAaWQnOiBvbnRvX25hbWUgKyAnOicgKyBkYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgJ0B0eXBlJzogJ293bDpDbGFzcycsXG4gICAgICAgICAgICAgICAgJ3JkZnM6bGFiZWwnOiBkYXRhLmxhYmVscyxcbiAgICAgICAgICAgICAgICAncmRmczpjb21tZW50JzogZGF0YS5jb21tZW50cyxcbiAgICAgICAgICAgICAgICAncmRmczpzdWJDbGFzc09mJzoge1xuICAgICAgICAgICAgICAgICAgICAnQGlkJzogZGF0YS5zdWJDbGFzc09mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAnQGNvbnRleHQnOiB7XG4gICAgICAgICAgICAgICAgJ3JkZic6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJyxcbiAgICAgICAgICAgICAgICAna25vcmEtYXBpJzogJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiMnLFxuICAgICAgICAgICAgICAgICdvd2wnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjJyxcbiAgICAgICAgICAgICAgICAncmRmcyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjJyxcbiAgICAgICAgICAgICAgICAneHNkJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIycsXG4gICAgICAgICAgICAgICAgb250b19uYW1lOiBvbnRvX2lyaSArICcjJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgcmVzb3VyY2VDbGFzcykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuYm9keSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlUHJvcGVydHkoZGF0YTogTmV3UHJvcGVydHlbXSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnO1xuXG4gICAgICAgIC8vIFRPRE86IGFkZCB0aGUgZm9sbG93aW5nIHZhbHVlcyB0byBwYXJhbWV0ZXJcbiAgICAgICAgbGV0IG9udG9faXJpOiBzdHJpbmc7XG4gICAgICAgIGxldCBvbnRvX25hbWU6IHN0cmluZztcbiAgICAgICAgbGV0IGxhc3Rfb250b19kYXRlOiBzdHJpbmc7XG5cbiAgICAgICAgY29uc3QgZ3JhcGggPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgcHJvcF9vYmogPSB7XG4gICAgICAgICAgICAgICAgJ0BpZCc6IG9udG9fbmFtZSArICc6JyArIHByb3AubmFtZSxcbiAgICAgICAgICAgICAgICAnQHR5cGUnOiAnb3dsOk9iamVjdFByb3BlcnR5JyxcbiAgICAgICAgICAgICAgICAncmRmczpsYWJlbCc6IHByb3AubGFiZWxzLFxuICAgICAgICAgICAgICAgICdyZGZzOmNvbW1lbnQnOiBwcm9wLmNvbW1lbnRzLFxuICAgICAgICAgICAgICAgICdyZGZzOnN1YlByb3BlcnR5T2YnOiBwcm9wLnN1YlByb3BlcnR5T2YsXG4gICAgICAgICAgICAgICAgJ3NhbHNhaC1ndWk6Z3VpRWxlbWVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0BpZCc6IHByb3AuZ3VpRWxlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBncmFwaC5wdXNoKHByb3Bfb2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0ge1xuICAgICAgICAgICAgJ0BpZCc6IG9udG9faXJpLFxuICAgICAgICAgICAgJ0B0eXBlJzogJ293bDpPbnRvbG9neScsXG4gICAgICAgICAgICAna25vcmEtYXBpOmxhc3RNb2RpZmljYXRpb25EYXRlJzogbGFzdF9vbnRvX2RhdGUsXG4gICAgICAgICAgICAnQGdyYXBoJzogW1xuICAgICAgICAgICAgICAgIGdyYXBoXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJ0Bjb250ZXh0Jzoge1xuICAgICAgICAgICAgICAgICdyZGYnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIycsXG4gICAgICAgICAgICAgICAgJ2tub3JhLWFwaSc6ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjJyxcbiAgICAgICAgICAgICAgICAnc2Fsc2FoLWd1aSc6ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zYWxzYWgtZ3VpL3YyIycsXG4gICAgICAgICAgICAgICAgJ293bCc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCMnLFxuICAgICAgICAgICAgICAgICdyZGZzJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSMnLFxuICAgICAgICAgICAgICAgICd4c2QnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjJyxcbiAgICAgICAgICAgICAgICBvbnRvX25hbWU6IG9udG9faXJpICsgJyMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCBwcm9wZXJ0eSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuYm9keSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgc2V0Q2FyZGluYWxpdHkoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL3YyL29udG9sb2dpZXMvY2FyZGluYWxpdGllcyc7XG5cbiAgICAgICAgLy8gVE9ETzogYWRkIHRoZSBmb2xsb3dpbmcgdmFsdWVzIHRvIHBhcmFtZXRlclxuICAgICAgICBsZXQgY2xhc3NfaXJpOiBzdHJpbmc7XG4gICAgICAgIGxldCBwcm9wX2lyaTogc3RyaW5nO1xuXG4gICAgICAgIGxldCBvbnRvX2lyaTogc3RyaW5nO1xuICAgICAgICBsZXQgb250b19uYW1lOiBzdHJpbmc7XG4gICAgICAgIGxldCBsYXN0X29udG9fZGF0ZTogc3RyaW5nO1xuXG4gICAgICAgIC8vIFRPRE86IGZpbmQgYSB3YXkgd2l0aCB0eXBlc2NyaXB0IGZvciB0aGUgZm9sbG93aW5nIHB5dGhvbiBjb25zdHJ1Y3RcbiAgICAgICAgLypcbiAgICAgICAgbGV0IHN3aXRjaGVyID0ge1xuICAgICAgICAgICAgJzEnOiAoJ293bDpjYXJkaW5hbGl0eScsIDEpLFxuICAgICAgICAgICAgJzAtMSc6ICgnb3dsOm1heENhcmRpbmFsaXR5JywgMSksXG4gICAgICAgICAgICAnMC1uJzogKCdvd2w6bWluQ2FyZGluYWxpdHknLCAwKSxcbiAgICAgICAgICAgICcxLW4nOiAoJ293bDptaW5DYXJkaW5hbGl0eScsIDEpXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG9jY3VycmVuY2U6IGFueSA9IHN3aXRjaGVyLmdldChkYXRhLm9jY3VycmVuY2UpO1xuICAgICAgICAqL1xuXG4gICAgICAgIGNvbnN0IGNhcmRpbmFsaXR5ID0ge1xuICAgICAgICAgICAgJ0BpZCc6IG9udG9faXJpLFxuICAgICAgICAgICAgJ0B0eXBlJzogJ293bDpPbnRvbG9neScsXG4gICAgICAgICAgICAna25vcmEtYXBpOmxhc3RNb2RpZmljYXRpb25EYXRlJzogbGFzdF9vbnRvX2RhdGUsXG4gICAgICAgICAgICAnQGdyYXBoJzogW3tcbiAgICAgICAgICAgICAgICAnQGlkJzogY2xhc3NfaXJpLFxuICAgICAgICAgICAgICAgICdAdHlwZSc6ICdvd2w6Q2xhc3MnLFxuICAgICAgICAgICAgICAgICdyZGZzOnN1YkNsYXNzT2YnOiB7XG4gICAgICAgICAgICAgICAgICAgICdAdHlwZSc6ICdvd2w6UmVzdHJpY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICAvLyBvY2N1cnJlbmNlWzBdOiBvY2N1cnJlbmNlWzFdLFxuICAgICAgICAgICAgICAgICAgICAnb3dsOm9uUHJvcGVydHknOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQGlkJzogcHJvcF9pcmlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgJ0Bjb250ZXh0Jzoge1xuICAgICAgICAgICAgICAgICdyZGYnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIycsXG4gICAgICAgICAgICAgICAgJ2tub3JhLWFwaSc6ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjJyxcbiAgICAgICAgICAgICAgICAnb3dsJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIycsXG4gICAgICAgICAgICAgICAgJ3JkZnMnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIycsXG4gICAgICAgICAgICAgICAgJ3hzZCc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnLFxuICAgICAgICAgICAgICAgIG9udG9fbmFtZTogb250b19pcmkgKyAnIydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCBjYXJkaW5hbGl0eSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuYm9keSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19