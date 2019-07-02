import * as tslib_1 from "tslib";
var GravsearchGenerationService_1;
import { Injectable } from '@angular/core';
import { ExtendedSearchParams, SearchParamsService } from './search-params.service';
import { KnoraConstants, KnoraSchema } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "./search-params.service";
/**
 * Create GravSearch queries from provided parameters.
 */
let GravsearchGenerationService = GravsearchGenerationService_1 = class GravsearchGenerationService {
    constructor(_searchParamsService) {
        this._searchParamsService = _searchParamsService;
    }
    /**
     * Generates a Gravsearch query from the provided arguments.
     *
     * @param {PropertyWithValue[]} properties the properties specified by the user.
     * @param {string} [mainResourceClassOption] the class of the main resource, if specified.
     * @param {number} offset the offset to be used (nth page of results).
     * @returns string - a KnarQL query string.
     */
    createGravsearchQuery(properties, mainResourceClassOption, offset = 0) {
        // class restriction for the resource searched for
        let mainResourceClass = '';
        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = `?mainRes a <${mainResourceClassOption}> .`;
        }
        // criteria for the order by statement
        const orderByCriteria = [];
        // statements to be returned in query results
        const returnStatements = [];
        // loop over given properties and create statements and filters from them
        const props = properties.map((propWithVal, index) => {
            // represents the object of a statement
            let propValue;
            if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                propValue = `?propVal${index}`;
            }
            else {
                // it is a linking property and the comparison operator is not Exists, use its IRI
                propValue = propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex);
            }
            // generate statement
            let statement = `?mainRes <${propWithVal.property.id}> ${propValue} .`;
            // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
            if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                // do not include statement in results, because the query checks for the absence of this statement
                statement = `FILTER NOT EXISTS {
${statement}


}`;
            }
            else {
                // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                returnStatements.push(statement);
                statement = `
${statement}


`;
            }
            // generate restricting expression (e.g., a FILTER) if comparison operator is not Exists
            let restriction = '';
            // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
            if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                // generate variable for value literal
                const propValueLiteral = `${propValue}Literal`;
                if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                    // generate statement to value literal
                    restriction = `${propValue} <${GravsearchGenerationService_1.complexTypeToProp[propWithVal.property.objectType]}> ${propValueLiteral}` + '\n';
                    // use regex function for LIKE
                    restriction += `FILTER regex(${propValueLiteral}, ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex)}, "i")`;
                }
                else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                    // generate statement to value literal
                    restriction = `${propValue} <${GravsearchGenerationService_1.complexTypeToProp[propWithVal.property.objectType]}> ${propValueLiteral}` + '\n';
                    // use contains function for MATCH
                    restriction += `FILTER <${KnoraConstants.matchFunction}>(${propValueLiteral}, ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex)})`;
                }
                else if (propWithVal.property.objectType === KnoraConstants.DateValue) {
                    // handle date property
                    restriction = `FILTER(knora-api:toSimpleDate(${propValue}) ${propWithVal.valueLiteral.comparisonOperator.type} ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex)})`;
                }
                else if (propWithVal.property.objectType === KnoraConstants.ListValue) {
                    // handle list node
                    restriction = `${propValue} <${GravsearchGenerationService_1.complexTypeToProp[propWithVal.property.objectType]}> ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex)}` + '\n';
                    // check for comparison operator "not equals"
                    if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                        restriction = `FILTER NOT EXISTS {
                                ${restriction}
                            }`;
                    }
                }
                else {
                    // generate statement to value literal
                    restriction = `${propValue} <${GravsearchGenerationService_1.complexTypeToProp[propWithVal.property.objectType]}> ${propValueLiteral}` + '\n';
                    // generate filter expression
                    restriction += `FILTER(${propValueLiteral} ${propWithVal.valueLiteral.comparisonOperator.type} ${propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex)})`;
                }
            }
            // check if current value is a sort criterion
            if (propWithVal.isSortCriterion)
                orderByCriteria.push(propValue);
            return `${statement}
${restriction}
`;
        });
        let orderByStatement = '';
        if (orderByCriteria.length > 0) {
            orderByStatement = `
ORDER BY ${orderByCriteria.join(' ')}
`;
        }
        // template of the Gravsearch query with dynamic components
        const gravsearchTemplate = `
PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
CONSTRUCT {

?mainRes knora-api:isMainResource true .

${returnStatements.join('\n')}

} WHERE {

?mainRes a knora-api:Resource .

${mainResourceClass}

${props.join('')}

}
${orderByStatement}`;
        // offset component of the Gravsearch query
        const offsetTemplate = `
OFFSET ${offset}
`;
        // function that generates the same KnarQL query with the given offset
        const generateGravsearchQueryWithCustomOffset = (localOffset) => {
            const offsetCustomTemplate = `
OFFSET ${localOffset}
`;
            return gravsearchTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
        }
        return gravsearchTemplate + offsetTemplate;
    }
};
/**
 * @ignore
 *
 * Map of complex knora-api value types to simple ones.
 * Use computed property name: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer.
 */
GravsearchGenerationService.typeConversionComplexToSimple = {
    'http://api.knora.org/ontology/knora-api/v2#IntValue': KnoraConstants.xsdInteger,
    'http://api.knora.org/ontology/knora-api/v2#DecimalValue': KnoraConstants.xsdDecimal,
    'http://api.knora.org/ontology/knora-api/v2#BooleanValue': KnoraConstants.xsdBoolean,
    'http://api.knora.org/ontology/knora-api/v2#TextValue': KnoraConstants.xsdString,
    'http://api.knora.org/ontology/knora-api/v2#DateValue': KnoraConstants.dateSimple,
    'http://api.knora.org/ontology/knora-api/v2#IntervalValue': KnoraConstants.intervalSimple,
    'http://api.knora.org/ontology/knora-api/v2#GeomValue': KnoraConstants.geomSimple,
    'http://api.knora.org/ontology/knora-api/v2#ColorValue': KnoraConstants.colorSimple,
    'http://api.knora.org/ontology/knora-api/v2#GeonameValue': KnoraConstants.geonameSimple,
    'http://api.knora.org/ontology/knora-api/v2#UriValue': KnoraConstants.xsdUri,
    'http://api.knora.org/ontology/knora-api/v2#StillImageFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#FileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#DDDFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#AudioFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#DocumentFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#TextFileValue': KnoraConstants.fileSimple,
    'http://api.knora.org/ontology/knora-api/v2#ListValue': KnoraConstants.listNodeSimple
};
GravsearchGenerationService.complexTypeToProp = {
    'http://api.knora.org/ontology/knora-api/v2#IntValue': KnoraConstants.integerValueAsInteger,
    'http://api.knora.org/ontology/knora-api/v2#DecimalValue': KnoraConstants.decimalValueAsDecimal,
    'http://api.knora.org/ontology/knora-api/v2#BooleanValue': KnoraConstants.booleanValueAsBoolean,
    'http://api.knora.org/ontology/knora-api/v2#TextValue': KnoraConstants.valueAsString,
    'http://api.knora.org/ontology/knora-api/v2#UriValue': KnoraConstants.uriValueAsUri,
    'http://api.knora.org/ontology/knora-api/v2#ListValue': KnoraConstants.listValueAsListNode
};
GravsearchGenerationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.ɵɵinject(i1.SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
GravsearchGenerationService = GravsearchGenerationService_1 = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [SearchParamsService])
], GravsearchGenerationService);
export { GravsearchGenerationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdi1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUdqRTs7R0FFRztBQUlILElBQWEsMkJBQTJCLG1DQUF4QyxNQUFhLDJCQUEyQjtJQXNDcEMsWUFBb0Isb0JBQXlDO1FBQXpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7SUFBSSxDQUFDO0lBRWxFOzs7Ozs7O09BT0c7SUFDSCxxQkFBcUIsQ0FBQyxVQUErQixFQUFFLHVCQUFnQyxFQUFFLFNBQWlCLENBQUM7UUFFdkcsa0RBQWtEO1FBQ2xELElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBRTNCLCtEQUErRDtRQUMvRCxJQUFJLHVCQUF1QixLQUFLLFNBQVMsRUFBRTtZQUN2QyxpQkFBaUIsR0FBRyxlQUFlLHVCQUF1QixLQUFLLENBQUM7U0FDbkU7UUFFRCxzQ0FBc0M7UUFDdEMsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBRTNCLDZDQUE2QztRQUM3QyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUU1Qix5RUFBeUU7UUFDekUsTUFBTSxLQUFLLEdBQWEsVUFBVSxDQUFDLEdBQUcsQ0FDbEMsQ0FBQyxXQUE4QixFQUFFLEtBQWEsRUFBRSxFQUFFO1lBRTlDLHVDQUF1QztZQUN2QyxJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLGtC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VTtJQUMzRixzREFBc0QsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUNqRixpRUFBaUUsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUM1Rix5REFBeUQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUNwRiwyREFBMkQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUN0Riw4REFBOEQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUN6RiwwREFBMEQsRUFBRSxjQUFjLENBQUMsVUFBVTtJQUNyRixzREFBc0QsRUFBRSxjQUFjLENBQUMsY0FBYztDQUN4RixDQUFDO0FBRVksNkNBQWlCLEdBQUc7SUFDOUIscURBQXFELEVBQUUsY0FBYyxDQUFDLHFCQUFxQjtJQUMzRix5REFBeUQsRUFBRSxjQUFjLENBQUMscUJBQXFCO0lBQy9GLHlEQUF5RCxFQUFFLGNBQWMsQ0FBQyxxQkFBcUI7SUFDL0Ysc0RBQXNELEVBQUUsY0FBYyxDQUFDLGFBQWE7SUFDcEYscURBQXFELEVBQUUsY0FBYyxDQUFDLGFBQWE7SUFDbkYsc0RBQXNELEVBQUUsY0FBYyxDQUFDLG1CQUFtQjtDQUM3RixDQUFDOztBQXBDTywyQkFBMkI7SUFIdkMsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQzs2Q0F1QzRDLG1CQUFtQjtHQXRDcEQsMkJBQTJCLENBc012QztTQXRNWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgU2VhcmNoUGFyYW1zU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBQcm9wZXJ0eVdpdGhWYWx1ZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBDcmVhdGUgR3JhdlNlYXJjaCBxdWVyaWVzIGZyb20gcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogTWFwIG9mIGNvbXBsZXgga25vcmEtYXBpIHZhbHVlIHR5cGVzIHRvIHNpbXBsZSBvbmVzLlxuICAgICAqIFVzZSBjb21wdXRlZCBwcm9wZXJ0eSBuYW1lOiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LWluaXRpYWxpemVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMubGlzdE5vZGVTaW1wbGVcbiAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBjb21wbGV4VHlwZVRvUHJvcCA9IHtcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVnZXJWYWx1ZUFzSW50ZWdlcixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5kZWNpbWFsVmFsdWVBc0RlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMuYm9vbGVhblZhbHVlQXNCb29sZWFuLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy51cmlWYWx1ZUFzVXJpLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VhcmNoUGFyYW1zU2VydmljZTogU2VhcmNoUGFyYW1zU2VydmljZSkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5IGZyb20gdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttYWluUmVzb3VyY2VDbGFzc09wdGlvbl0gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKG50aCBwYWdlIG9mIHJlc3VsdHMpLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgKi9cbiAgICBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke21haW5SZXNvdXJjZUNsYXNzT3B0aW9ufT4gLmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcml0ZXJpYSBmb3IgdGhlIG9yZGVyIGJ5IHN0YXRlbWVudFxuICAgICAgICBjb25zdCBvcmRlckJ5Q3JpdGVyaWEgPSBbXTtcblxuICAgICAgICAvLyBzdGF0ZW1lbnRzIHRvIGJlIHJldHVybmVkIGluIHF1ZXJ5IHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmV0dXJuU3RhdGVtZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBnaXZlbiBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgc3RhdGVtZW50cyBhbmQgZmlsdGVycyBmcm9tIHRoZW1cbiAgICAgICAgY29uc3QgcHJvcHM6IHN0cmluZ1tdID0gcHJvcGVydGllcy5tYXAoXG4gICAgICAgICAgICAocHJvcFdpdGhWYWw6IFByb3BlcnR5V2l0aFZhbHVlLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBvYmplY3Qgb2YgYSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgfHwgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eSwgY3JlYXRlIGEgdmFyaWFibGUgZm9yIHRoZSB2YWx1ZSAodG8gYmUgdXNlZCBieSBhIHN1YnNlcXVlbnQgRklMVEVSKVxuICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBFeGlzdHMgaXMgdXNlZCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIHNwZWNpZnkgdGhlIG9iamVjdCBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBgP3Byb3BWYWwke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IGFuZCB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzLCB1c2UgaXRzIElSSVxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuY29tcGxleCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlbWVudDogc3RyaW5nID0gYD9tYWluUmVzIDwke3Byb3BXaXRoVmFsLnByb3BlcnR5LmlkfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuXG5cbn1gO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHN0YXRlbWVudCBzaG91bGQgYmUgcmV0dXJuZWQgcmV0dXJuZWQgaW4gcmVzdWx0cyAoQm9vbGVhbiBmbGFnIGZyb20gY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSBgXG4ke3N0YXRlbWVudH1cblxuXG5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHJlc3RyaWN0aW5nIGV4cHJlc3Npb24gKGUuZy4sIGEgRklMVEVSKSBpZiBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgcmVzdHJpY3Rpb246IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHZhcmlhYmxlIGZvciB2YWx1ZSBsaXRlcmFsXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUxpdGVyYWwgPSBgJHtwcm9wVmFsdWV9TGl0ZXJhbGA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50IHRvIHZhbHVlIGxpdGVyYWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gYCR7cHJvcFZhbHVlfSA8JHtHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UuY29tcGxleFR5cGVUb1Byb3BbcHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZV19PiAke3Byb3BWYWx1ZUxpdGVyYWx9YCArICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiArPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlTGl0ZXJhbH0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLmNvbXBsZXgpfSwgXCJpXCIpYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTWF0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBzdGF0ZW1lbnQgdG8gdmFsdWUgbGl0ZXJhbFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSBgJHtwcm9wVmFsdWV9IDwke0dyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS5jb21wbGV4VHlwZVRvUHJvcFtwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlXX0+ICR7cHJvcFZhbHVlTGl0ZXJhbH1gICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgY29udGFpbnMgZnVuY3Rpb24gZm9yIE1BVENIXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiArPSBgRklMVEVSIDwke0tub3JhQ29uc3RhbnRzLm1hdGNoRnVuY3Rpb259Pigke3Byb3BWYWx1ZUxpdGVyYWx9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5jb21wbGV4KX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlID09PSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBkYXRlIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiA9IGBGSUxURVIoa25vcmEtYXBpOnRvU2ltcGxlRGF0ZSgke3Byb3BWYWx1ZX0pICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci50eXBlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5jb21wbGV4KX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlID09PSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBsaXN0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gYCR7cHJvcFZhbHVlfSA8JHtHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UuY29tcGxleFR5cGVUb1Byb3BbcHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZV19PiAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5jb21wbGV4KX1gICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgY29tcGFyaXNvbiBvcGVyYXRvciBcIm5vdCBlcXVhbHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdOb3RFcXVhbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSBgRklMVEVSIE5PVCBFWElTVFMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3RyaWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50IHRvIHZhbHVlIGxpdGVyYWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gYCR7cHJvcFZhbHVlfSA8JHtHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UuY29tcGxleFR5cGVUb1Byb3BbcHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZV19PiAke3Byb3BWYWx1ZUxpdGVyYWx9YCArICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uICs9IGBGSUxURVIoJHtwcm9wVmFsdWVMaXRlcmFsfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IudHlwZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuY29tcGxleCl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7cmVzdHJpY3Rpb259XG5gO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb3JkZXJCeVN0YXRlbWVudCA9ICcnO1xuXG4gICAgICAgIGlmIChvcmRlckJ5Q3JpdGVyaWEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3JkZXJCeVN0YXRlbWVudCA9IGBcbk9SREVSIEJZICR7b3JkZXJCeUNyaXRlcmlhLmpvaW4oJyAnKX1cbmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0ZW1wbGF0ZSBvZiB0aGUgR3JhdnNlYXJjaCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyIz5cbkNPTlNUUlVDVCB7XG5cbj9tYWluUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuJHtyZXR1cm5TdGF0ZW1lbnRzLmpvaW4oJ1xcbicpfVxuXG59IFdIRVJFIHtcblxuP21haW5SZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4ke21haW5SZXNvdXJjZUNsYXNzfVxuXG4ke3Byb3BzLmpvaW4oJycpfVxuXG59XG4ke29yZGVyQnlTdGF0ZW1lbnR9YDtcblxuICAgICAgICAvLyBvZmZzZXQgY29tcG9uZW50IG9mIHRoZSBHcmF2c2VhcmNoIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGU7XG5cbiAgICB9XG5cbn1cbiJdfQ==