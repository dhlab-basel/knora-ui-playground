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
export class OntologyService extends ApiService {
    // ------------------------------------------------------------------------
    // GET list of ontologies
    // ------------------------------------------------------------------------
    /**
     * DEPRECATED: You should use getAllOntologies()
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    getOntologiesMetadata() {
        return this.httpGet('/v2/ontologies/metadata');
    }
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    getAllOntologies() {
        return this.httpGet('/v2/ontologies/metadata');
    }
    /**
     * Requests the ontologies of a specific project
     *
     * @param projectIri
     * @returns Observable<ApiServiceResult> - the metadata of project ontologies.
     */
    getProjectOntologies(projectIri) {
        return this.httpGet('/v2/ontologies/metadata/' + encodeURIComponent(projectIri));
    }
    // ------------------------------------------------------------------------
    // GET ontology
    // ------------------------------------------------------------------------
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param {string} ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns Observable<ApiServiceResult> - the requested ontology.
     */
    getAllEntityDefinitionsForOntologies(ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    }
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param {string[]} resourceClassIris the Iris of the resource classes to be queried.
     * @returns Observable<ApiServiceResult> - the requested resource class definitions.
     */
    getResourceClasses(resourceClassIris) {
        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'));
        }
        let resClassUriEnc = '';
        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    }
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param {string[]} propertyIris the Iris of the properties to be queried.
     * @returns Observable<ApiServiceResult> - the requested properties.
     */
    getProperties(propertyIris) {
        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No property Iris given for call of OntologyService.getProperties'));
        }
        let propertiesUriEnc = '';
        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
    }
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new ontology.
     *
     * @param {NewOntology} data Data contains: projectIri, name, label
     * @returns Observable<ApiServiceResult> incl. ontolog iri and knora-api:lastModificationDate
     */
    createOntology(data) {
        const path = '/v2/ontologies';
        const ontology = {
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
        return this.httpPost(path, ontology).pipe(map((result) => result.body), catchError(this.handleJsonError));
    }
    createResourceClass(data) {
        const path = '/v2/ontologies/classes';
        // TODO: add the following values to parameter
        let onto_iri;
        let onto_name;
        let last_onto_date;
        const resourceClass = {
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
        return this.httpPost(path, resourceClass).pipe(map((result) => result.body), catchError(this.handleJsonError));
    }
    createProperty(data) {
        const path = '/v2/ontologies/properties';
        // TODO: add the following values to parameter
        let onto_iri;
        let onto_name;
        let last_onto_date;
        const graph = [];
        for (const prop of data) {
            const prop_obj = {
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
        const property = {
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
        return this.httpPost(path, property).pipe(map((result) => result.body), catchError(this.handleJsonError));
    }
    setCardinality(data) {
        const path = '/v2/ontologies/cardinalities';
        // TODO: add the following values to parameter
        let class_iri;
        let prop_iri;
        let onto_iri;
        let onto_name;
        let last_onto_date;
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
        const cardinality = {
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
        return this.httpPost(path, cardinality).pipe(map((result) => result.body), catchError(this.handleJsonError));
    }
}
OntologyService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
OntologyService.ngInjectableDef = i0.defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken)); }, token: OntologyService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib250b2xvZ3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUk1Qzs7R0FFRztBQUlILE1BQU0sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFHM0MsMkVBQTJFO0lBQzNFLHlCQUF5QjtJQUN6QiwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxvQkFBb0IsQ0FBQyxVQUFrQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBR0QsMkVBQTJFO0lBQzNFLGVBQWU7SUFDZiwyRUFBMkU7SUFFM0U7Ozs7O09BS0c7SUFDSCxvQ0FBb0MsQ0FBQyxXQUFtQjtRQUNwRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN6RixD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Z0NBQWdDO3dCQUNoQyxnQkFBZ0IsRUFBRTs0QkFDZCxLQUFLLEVBQUUsUUFBUTt5QkFDbEI7cUJBQ0o7aUJBQ0osQ0FBQztZQUNGLFVBQVUsRUFBRTtnQkFDUixLQUFLLEVBQUUsNkNBQTZDO2dCQUNwRCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxLQUFLLEVBQUUsZ0NBQWdDO2dCQUN2QyxNQUFNLEVBQUUsdUNBQXVDO2dCQUMvQyxLQUFLLEVBQUUsbUNBQW1DO2dCQUMxQyxTQUFTLEVBQUUsUUFBUSxHQUFHLEdBQUc7YUFDNUI7U0FDSixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3hDLEdBQUcsQ0FBQyxDQUFDLE1BQXdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDOUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNOLENBQUM7OztZQS9RSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkva25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtcmVzdWx0JztcbmltcG9ydCB7IE5ld09udG9sb2d5IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS92Mi9vbnRvbG9neS9uZXctb250b2xvZ3knO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE5ld1Jlc291cmNlQ2xhc3MgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpL3YyL29udG9sb2d5L25ldy1yZXNvdXJjZS1jbGFzcyc7XG5pbXBvcnQgeyBOZXdQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvdjIvb250b2xvZ3kvbmV3LXByb3BlcnR5JztcblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUIGxpc3Qgb2Ygb250b2xvZ2llc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogREVQUkVDQVRFRDogWW91IHNob3VsZCB1c2UgZ2V0QWxsT250b2xvZ2llcygpXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRBbGxPbnRvbG9naWVzKCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBvbnRvbG9naWVzIG9mIGEgc3BlY2lmaWMgcHJvamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIHByb2plY3Qgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0T250b2xvZ2llcyhwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVQgb250b2xvZ3lcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmlzIG9mIHRoZSBuYW1lZCBncmFwaHMgd2hvc2UgcmVzb3VyY2UgY2xhc3NlcyBhcmUgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvYWxsZW50aXRpZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvbnRvbG9neUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIElyaXMgb2YgdGhlIHJlc291cmNlIGNsYXNzZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VDbGFzc0lyaXM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyByZXNvdXJjZSBjbGFzcyBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRSZXNvdXJjZUNsYXNzZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzQ2xhc3NVcmlFbmMgPSAnJztcblxuICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcmVzQ2xhc3NVcmlFbmMgPSByZXNDbGFzc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvY2xhc3NlcycgKyByZXNDbGFzc1VyaUVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgcHJvcGVydGllcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHByb3BlcnR5IElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFByb3BlcnRpZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydGllc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcHJvcGVydGllc1VyaUVuYyA9IHByb3BlcnRpZXNVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnICsgcHJvcGVydGllc1VyaUVuYyk7XG5cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IG9udG9sb2d5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOZXdPbnRvbG9neX0gZGF0YSBEYXRhIGNvbnRhaW5zOiBwcm9qZWN0SXJpLCBuYW1lLCBsYWJlbFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gaW5jbC4gb250b2xvZyBpcmkgYW5kIGtub3JhLWFwaTpsYXN0TW9kaWZpY2F0aW9uRGF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZU9udG9sb2d5KGRhdGE6IE5ld09udG9sb2d5KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL3YyL29udG9sb2dpZXMnO1xuXG4gICAgICAgIGNvbnN0IG9udG9sb2d5ID0ge1xuICAgICAgICAgICAgJ2tub3JhLWFwaTpvbnRvbG9neU5hbWUnOiBkYXRhLm5hbWUsXG4gICAgICAgICAgICAna25vcmEtYXBpOmF0dGFjaGVkVG9Qcm9qZWN0Jzoge1xuICAgICAgICAgICAgICAgICdAaWQnOiBkYXRhLnByb2plY3RJcmksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3JkZnM6bGFiZWwnOiBkYXRhLmxhYmVsLFxuICAgICAgICAgICAgJ0Bjb250ZXh0Jzoge1xuICAgICAgICAgICAgICAgICdyZGZzJzogS25vcmFDb25zdGFudHMuUmRmc1NjaGVtYSxcbiAgICAgICAgICAgICAgICAna25vcmEtYXBpJzogS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCBvbnRvbG9neSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuYm9keSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNyZWF0ZVJlc291cmNlQ2xhc3MoZGF0YTogTmV3UmVzb3VyY2VDbGFzcyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy92Mi9vbnRvbG9naWVzL2NsYXNzZXMnO1xuXG4gICAgICAgIC8vIFRPRE86IGFkZCB0aGUgZm9sbG93aW5nIHZhbHVlcyB0byBwYXJhbWV0ZXJcbiAgICAgICAgbGV0IG9udG9faXJpOiBzdHJpbmc7XG4gICAgICAgIGxldCBvbnRvX25hbWU6IHN0cmluZztcbiAgICAgICAgbGV0IGxhc3Rfb250b19kYXRlOiBzdHJpbmc7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VDbGFzcyA9IHtcbiAgICAgICAgICAgICdAaWQnOiBvbnRvX2lyaSxcbiAgICAgICAgICAgICdAdHlwZSc6ICdvd2w6T250b2xvZ3knLFxuICAgICAgICAgICAgJ2tub3JhLWFwaTpsYXN0TW9kaWZpY2F0aW9uRGF0ZSc6IGxhc3Rfb250b19kYXRlLFxuICAgICAgICAgICAgJ0BncmFwaCc6IFt7XG4gICAgICAgICAgICAgICAgJ0BpZCc6IG9udG9fbmFtZSArICc6JyArIGRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICAnQHR5cGUnOiAnb3dsOkNsYXNzJyxcbiAgICAgICAgICAgICAgICAncmRmczpsYWJlbCc6IGRhdGEubGFiZWxzLFxuICAgICAgICAgICAgICAgICdyZGZzOmNvbW1lbnQnOiBkYXRhLmNvbW1lbnRzLFxuICAgICAgICAgICAgICAgICdyZGZzOnN1YkNsYXNzT2YnOiB7XG4gICAgICAgICAgICAgICAgICAgICdAaWQnOiBkYXRhLnN1YkNsYXNzT2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdAY29udGV4dCc6IHtcbiAgICAgICAgICAgICAgICAncmRmJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnLFxuICAgICAgICAgICAgICAgICdrbm9yYS1hcGknOiAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyIycsXG4gICAgICAgICAgICAgICAgJ293bCc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAyLzA3L293bCMnLFxuICAgICAgICAgICAgICAgICdyZGZzJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSMnLFxuICAgICAgICAgICAgICAgICd4c2QnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEjJyxcbiAgICAgICAgICAgICAgICBvbnRvX25hbWU6IG9udG9faXJpICsgJyMnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCByZXNvdXJjZUNsYXNzKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5ib2R5KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBjcmVhdGVQcm9wZXJ0eShkYXRhOiBOZXdQcm9wZXJ0eVtdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL3YyL29udG9sb2dpZXMvcHJvcGVydGllcyc7XG5cbiAgICAgICAgLy8gVE9ETzogYWRkIHRoZSBmb2xsb3dpbmcgdmFsdWVzIHRvIHBhcmFtZXRlclxuICAgICAgICBsZXQgb250b19pcmk6IHN0cmluZztcbiAgICAgICAgbGV0IG9udG9fbmFtZTogc3RyaW5nO1xuICAgICAgICBsZXQgbGFzdF9vbnRvX2RhdGU6IHN0cmluZztcblxuICAgICAgICBjb25zdCBncmFwaCA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBkYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wX29iaiA9IHtcbiAgICAgICAgICAgICAgICAnQGlkJzogb250b19uYW1lICsgJzonICsgcHJvcC5uYW1lLFxuICAgICAgICAgICAgICAgICdAdHlwZSc6ICdvd2w6T2JqZWN0UHJvcGVydHknLFxuICAgICAgICAgICAgICAgICdyZGZzOmxhYmVsJzogcHJvcC5sYWJlbHMsXG4gICAgICAgICAgICAgICAgJ3JkZnM6Y29tbWVudCc6IHByb3AuY29tbWVudHMsXG4gICAgICAgICAgICAgICAgJ3JkZnM6c3ViUHJvcGVydHlPZic6IHByb3Auc3ViUHJvcGVydHlPZixcbiAgICAgICAgICAgICAgICAnc2Fsc2FoLWd1aTpndWlFbGVtZW50Jzoge1xuICAgICAgICAgICAgICAgICAgICAnQGlkJzogcHJvcC5ndWlFbGVtZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdyYXBoLnB1c2gocHJvcF9vYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSB7XG4gICAgICAgICAgICAnQGlkJzogb250b19pcmksXG4gICAgICAgICAgICAnQHR5cGUnOiAnb3dsOk9udG9sb2d5JyxcbiAgICAgICAgICAgICdrbm9yYS1hcGk6bGFzdE1vZGlmaWNhdGlvbkRhdGUnOiBsYXN0X29udG9fZGF0ZSxcbiAgICAgICAgICAgICdAZ3JhcGgnOiBbXG4gICAgICAgICAgICAgICAgZ3JhcGhcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAnQGNvbnRleHQnOiB7XG4gICAgICAgICAgICAgICAgJ3JkZic6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJyxcbiAgICAgICAgICAgICAgICAna25vcmEtYXBpJzogJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiMnLFxuICAgICAgICAgICAgICAgICdzYWxzYWgtZ3VpJzogJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L3NhbHNhaC1ndWkvdjIjJyxcbiAgICAgICAgICAgICAgICAnb3dsJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsIycsXG4gICAgICAgICAgICAgICAgJ3JkZnMnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hIycsXG4gICAgICAgICAgICAgICAgJ3hzZCc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnLFxuICAgICAgICAgICAgICAgIG9udG9fbmFtZTogb250b19pcmkgKyAnIydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIHByb3BlcnR5KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5ib2R5KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBzZXRDYXJkaW5hbGl0eShkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvdjIvb250b2xvZ2llcy9jYXJkaW5hbGl0aWVzJztcblxuICAgICAgICAvLyBUT0RPOiBhZGQgdGhlIGZvbGxvd2luZyB2YWx1ZXMgdG8gcGFyYW1ldGVyXG4gICAgICAgIGxldCBjbGFzc19pcmk6IHN0cmluZztcbiAgICAgICAgbGV0IHByb3BfaXJpOiBzdHJpbmc7XG5cbiAgICAgICAgbGV0IG9udG9faXJpOiBzdHJpbmc7XG4gICAgICAgIGxldCBvbnRvX25hbWU6IHN0cmluZztcbiAgICAgICAgbGV0IGxhc3Rfb250b19kYXRlOiBzdHJpbmc7XG5cbiAgICAgICAgLy8gVE9ETzogZmluZCBhIHdheSB3aXRoIHR5cGVzY3JpcHQgZm9yIHRoZSBmb2xsb3dpbmcgcHl0aG9uIGNvbnN0cnVjdFxuICAgICAgICAvKlxuICAgICAgICBsZXQgc3dpdGNoZXIgPSB7XG4gICAgICAgICAgICAnMSc6ICgnb3dsOmNhcmRpbmFsaXR5JywgMSksXG4gICAgICAgICAgICAnMC0xJzogKCdvd2w6bWF4Q2FyZGluYWxpdHknLCAxKSxcbiAgICAgICAgICAgICcwLW4nOiAoJ293bDptaW5DYXJkaW5hbGl0eScsIDApLFxuICAgICAgICAgICAgJzEtbic6ICgnb3dsOm1pbkNhcmRpbmFsaXR5JywgMSlcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgb2NjdXJyZW5jZTogYW55ID0gc3dpdGNoZXIuZ2V0KGRhdGEub2NjdXJyZW5jZSk7XG4gICAgICAgICovXG5cbiAgICAgICAgY29uc3QgY2FyZGluYWxpdHkgPSB7XG4gICAgICAgICAgICAnQGlkJzogb250b19pcmksXG4gICAgICAgICAgICAnQHR5cGUnOiAnb3dsOk9udG9sb2d5JyxcbiAgICAgICAgICAgICdrbm9yYS1hcGk6bGFzdE1vZGlmaWNhdGlvbkRhdGUnOiBsYXN0X29udG9fZGF0ZSxcbiAgICAgICAgICAgICdAZ3JhcGgnOiBbe1xuICAgICAgICAgICAgICAgICdAaWQnOiBjbGFzc19pcmksXG4gICAgICAgICAgICAgICAgJ0B0eXBlJzogJ293bDpDbGFzcycsXG4gICAgICAgICAgICAgICAgJ3JkZnM6c3ViQ2xhc3NPZic6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0B0eXBlJzogJ293bDpSZXN0cmljdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIC8vIG9jY3VycmVuY2VbMF06IG9jY3VycmVuY2VbMV0sXG4gICAgICAgICAgICAgICAgICAgICdvd2w6b25Qcm9wZXJ0eSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAaWQnOiBwcm9wX2lyaVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAnQGNvbnRleHQnOiB7XG4gICAgICAgICAgICAgICAgJ3JkZic6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJyxcbiAgICAgICAgICAgICAgICAna25vcmEtYXBpJzogJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiMnLFxuICAgICAgICAgICAgICAgICdvd2wnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjJyxcbiAgICAgICAgICAgICAgICAncmRmcyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjJyxcbiAgICAgICAgICAgICAgICAneHNkJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIycsXG4gICAgICAgICAgICAgICAgb250b19uYW1lOiBvbnRvX2lyaSArICcjJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIGNhcmRpbmFsaXR5KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5ib2R5KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=