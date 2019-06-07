import { Injectable } from '@angular/core';
import { ExtendedSearchParams, SearchParamsService } from './search-params.service';
import { KnoraConstants, KnoraSchema } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "./search-params.service";
/**
 * Create GravSearch queries from provided parameters.
 */
var GravsearchGenerationService = /** @class */ (function () {
    function GravsearchGenerationService(_searchParamsService) {
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
    GravsearchGenerationService.prototype.createGravsearchQuery = function (properties, mainResourceClassOption, offset) {
        if (offset === void 0) { offset = 0; }
        // class restriction for the resource searched for
        var mainResourceClass = '';
        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = "?mainRes a <" + mainResourceClassOption + "> .";
        }
        // criteria for the order by statement
        var orderByCriteria = [];
        // statements to be returned in query results
        var returnStatements = [];
        // loop over given properties and create statements and filters from them
        var props = properties.map(function (propWithVal, index) {
            // represents the object of a statement
            var propValue;
            if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                propValue = "?propVal" + index;
            }
            else {
                // it is a linking property and the comparison operator is not Exists, use its IRI
                propValue = propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex);
            }
            // generate statement
            var statement = "?mainRes <" + propWithVal.property.id + "> " + propValue + " .";
            // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
            if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                // do not include statement in results, because the query checks for the absence of this statement
                statement = "FILTER NOT EXISTS {\n" + statement + "\n\n\n}";
            }
            else {
                // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                returnStatements.push(statement);
                statement = "\n" + statement + "\n\n\n";
            }
            // generate restricting expression (e.g., a FILTER) if comparison operator is not Exists
            var restriction = '';
            // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
            if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                // generate variable for value literal
                var propValueLiteral = propValue + "Literal";
                if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                    // generate statement to value literal
                    restriction = propValue + " <" + GravsearchGenerationService.complexTypeToProp[propWithVal.property.objectType] + "> " + propValueLiteral + '\n';
                    // use regex function for LIKE
                    restriction += "FILTER regex(" + propValueLiteral + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex) + ", \"i\")";
                }
                else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                    // generate statement to value literal
                    restriction = propValue + " <" + GravsearchGenerationService.complexTypeToProp[propWithVal.property.objectType] + "> " + propValueLiteral + '\n';
                    // use contains function for MATCH
                    restriction += "FILTER <" + KnoraConstants.matchFunction + ">(" + propValueLiteral + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex) + ")";
                }
                else if (propWithVal.property.objectType === KnoraConstants.DateValue) {
                    // handle date property
                    restriction = "FILTER(knora-api:toSimpleDate(" + propValue + ") " + propWithVal.valueLiteral.comparisonOperator.type + " " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex) + ")";
                }
                else if (propWithVal.property.objectType === KnoraConstants.ListValue) {
                    // handle list node
                    restriction = propValue + " <" + GravsearchGenerationService.complexTypeToProp[propWithVal.property.objectType] + "> " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex) + '\n';
                    // check for comparison operator "not equals"
                    if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                        restriction = "FILTER NOT EXISTS {\n                                " + restriction + "\n                            }";
                    }
                }
                else {
                    // generate statement to value literal
                    restriction = propValue + " <" + GravsearchGenerationService.complexTypeToProp[propWithVal.property.objectType] + "> " + propValueLiteral + '\n';
                    // generate filter expression
                    restriction += "FILTER(" + propValueLiteral + " " + propWithVal.valueLiteral.comparisonOperator.type + " " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.complex) + ")";
                }
            }
            // check if current value is a sort criterion
            if (propWithVal.isSortCriterion)
                orderByCriteria.push(propValue);
            return statement + "\n" + restriction + "\n";
        });
        var orderByStatement = '';
        if (orderByCriteria.length > 0) {
            orderByStatement = "\nORDER BY " + orderByCriteria.join(' ') + "\n";
        }
        // template of the Gravsearch query with dynamic components
        var gravsearchTemplate = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>\nCONSTRUCT {\n\n?mainRes knora-api:isMainResource true .\n\n" + returnStatements.join('\n') + "\n\n} WHERE {\n\n?mainRes a knora-api:Resource .\n\n" + mainResourceClass + "\n\n" + props.join('') + "\n\n}\n" + orderByStatement;
        // offset component of the Gravsearch query
        var offsetTemplate = "\nOFFSET " + offset + "\n";
        // function that generates the same KnarQL query with the given offset
        var generateGravsearchQueryWithCustomOffset = function (localOffset) {
            var offsetCustomTemplate = "\nOFFSET " + localOffset + "\n";
            return gravsearchTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
        }
        return gravsearchTemplate + offsetTemplate;
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
    GravsearchGenerationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GravsearchGenerationService.ctorParameters = function () { return [
        { type: SearchParamsService }
    ]; };
    GravsearchGenerationService.ngInjectableDef = i0.defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(i0.inject(i1.SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
    return GravsearchGenerationService;
}());
export { GravsearchGenerationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jhdi1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3YyL2dyYXYtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7QUFHakU7O0dBRUc7QUFDSDtJQXlDSSxxQ0FBb0Isb0JBQXlDO1FBQXpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7SUFBSSxDQUFDO0lBRWxFOzs7Ozs7O09BT0c7SUFDSCwyREFBcUIsR0FBckIsVUFBc0IsVUFBK0IsRUFBRSx1QkFBZ0MsRUFBRSxNQUFrQjtRQUFsQix1QkFBQSxFQUFBLFVBQWtCO1FBRXZHLGtEQUFrRDtRQUNsRCxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUUzQiwrREFBK0Q7UUFDL0QsSUFBSSx1QkFBdUIsS0FBSyxTQUFTLEVBQUU7WUFDdkMsaUJBQWlCLEdBQUcsaUJBQWUsdUJBQXVCLFFBQUssQ0FBQztTQUNuRTtRQUVELHNDQUFzQztRQUN0QyxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFFM0IsNkNBQTZDO1FBQzdDLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTVCLHlFQUF5RTtRQUN6RSxJQUFNLEtBQUssR0FBYSxVQUFVLENBQUMsR0FBRyxDQUNsQyxVQUFDLFdBQThCLEVBQUUsS0FBYTtZQUUxQyx1Q0FBdUM7WUFDdkMsSUFBSSxTQUFTLENBQUM7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVB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QTJELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDdEYsOERBQThELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDekYsMERBQTBELEVBQUUsY0FBYyxDQUFDLFVBQVU7UUFDckYsc0RBQXNELEVBQUUsY0FBYyxDQUFDLGNBQWM7S0FDeEYsQ0FBQztJQUVZLDZDQUFpQixHQUFHO1FBQzlCLHFEQUFxRCxFQUFFLGNBQWMsQ0FBQyxxQkFBcUI7UUFDM0YseURBQXlELEVBQUUsY0FBYyxDQUFDLHFCQUFxQjtRQUMvRix5REFBeUQsRUFBRSxjQUFjLENBQUMscUJBQXFCO1FBQy9GLHNEQUFzRCxFQUFFLGNBQWMsQ0FBQyxhQUFhO1FBQ3BGLHFEQUFxRCxFQUFFLGNBQWMsQ0FBQyxhQUFhO1FBQ25GLHNEQUFzRCxFQUFFLGNBQWMsQ0FBQyxtQkFBbUI7S0FDN0YsQ0FBQzs7Z0JBdkNMLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0JBVDhCLG1CQUFtQjs7O3NDQURsRDtDQWlOQyxBQXpNRCxJQXlNQztTQXRNWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFeHRlbmRlZFNlYXJjaFBhcmFtcywgU2VhcmNoUGFyYW1zU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLXBhcmFtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBQcm9wZXJ0eVdpdGhWYWx1ZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBDcmVhdGUgR3JhdlNlYXJjaCBxdWVyaWVzIGZyb20gcHJvdmlkZWQgcGFyYW1ldGVycy5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogTWFwIG9mIGNvbXBsZXgga25vcmEtYXBpIHZhbHVlIHR5cGVzIHRvIHNpbXBsZSBvbmVzLlxuICAgICAqIFVzZSBjb21wdXRlZCBwcm9wZXJ0eSBuYW1lOiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LWluaXRpYWxpemVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGUgPSB7XG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RJbnRlZ2VyLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RlY2ltYWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZERlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMueHNkQm9vbGVhbixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNUZXh0VmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRGF0ZVZhbHVlJzogS25vcmFDb25zdGFudHMuZGF0ZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRlcnZhbFZhbHVlJzogS25vcmFDb25zdGFudHMuaW50ZXJ2YWxTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNDb2xvclZhbHVlJzogS25vcmFDb25zdGFudHMuY29sb3JTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjR2VvbmFtZVZhbHVlJzogS25vcmFDb25zdGFudHMuZ2VvbmFtZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNVcmlWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFVyaSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNTdGlsbEltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI01vdmluZ0ltYWdlRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNERERGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0F1ZGlvRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEb2N1bWVudEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dEZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjTGlzdFZhbHVlJzogS25vcmFDb25zdGFudHMubGlzdE5vZGVTaW1wbGVcbiAgICB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBjb21wbGV4VHlwZVRvUHJvcCA9IHtcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNJbnRWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVnZXJWYWx1ZUFzSW50ZWdlcixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5kZWNpbWFsVmFsdWVBc0RlY2ltYWwsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQm9vbGVhblZhbHVlJzogS25vcmFDb25zdGFudHMuYm9vbGVhblZhbHVlQXNCb29sZWFuLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmcsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy51cmlWYWx1ZUFzVXJpLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VhcmNoUGFyYW1zU2VydmljZTogU2VhcmNoUGFyYW1zU2VydmljZSkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBHcmF2c2VhcmNoIHF1ZXJ5IGZyb20gdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHlXaXRoVmFsdWVbXX0gcHJvcGVydGllcyB0aGUgcHJvcGVydGllcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFttYWluUmVzb3VyY2VDbGFzc09wdGlvbl0gdGhlIGNsYXNzIG9mIHRoZSBtYWluIHJlc291cmNlLCBpZiBzcGVjaWZpZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKG50aCBwYWdlIG9mIHJlc3VsdHMpLlxuICAgICAqIEByZXR1cm5zIHN0cmluZyAtIGEgS25hclFMIHF1ZXJ5IHN0cmluZy5cbiAgICAgKi9cbiAgICBjcmVhdGVHcmF2c2VhcmNoUXVlcnkocHJvcGVydGllczogUHJvcGVydHlXaXRoVmFsdWVbXSwgbWFpblJlc291cmNlQ2xhc3NPcHRpb24/OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cbiAgICAgICAgLy8gY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSByZXNvdXJjZSBzZWFyY2hlZCBmb3JcbiAgICAgICAgbGV0IG1haW5SZXNvdXJjZUNsYXNzID0gJyc7XG5cbiAgICAgICAgLy8gaWYgZ2l2ZW4sIGNyZWF0ZSB0aGUgY2xhc3MgcmVzdHJpY3Rpb24gZm9yIHRoZSBtYWluIHJlc291cmNlXG4gICAgICAgIGlmIChtYWluUmVzb3VyY2VDbGFzc09wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYWluUmVzb3VyY2VDbGFzcyA9IGA/bWFpblJlcyBhIDwke21haW5SZXNvdXJjZUNsYXNzT3B0aW9ufT4gLmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcml0ZXJpYSBmb3IgdGhlIG9yZGVyIGJ5IHN0YXRlbWVudFxuICAgICAgICBjb25zdCBvcmRlckJ5Q3JpdGVyaWEgPSBbXTtcblxuICAgICAgICAvLyBzdGF0ZW1lbnRzIHRvIGJlIHJldHVybmVkIGluIHF1ZXJ5IHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmV0dXJuU3RhdGVtZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBnaXZlbiBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgc3RhdGVtZW50cyBhbmQgZmlsdGVycyBmcm9tIHRoZW1cbiAgICAgICAgY29uc3QgcHJvcHM6IHN0cmluZ1tdID0gcHJvcGVydGllcy5tYXAoXG4gICAgICAgICAgICAocHJvcFdpdGhWYWw6IFByb3BlcnR5V2l0aFZhbHVlLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBvYmplY3Qgb2YgYSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgfHwgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eSwgY3JlYXRlIGEgdmFyaWFibGUgZm9yIHRoZSB2YWx1ZSAodG8gYmUgdXNlZCBieSBhIHN1YnNlcXVlbnQgRklMVEVSKVxuICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBFeGlzdHMgaXMgdXNlZCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIHNwZWNpZnkgdGhlIG9iamVjdCBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBgP3Byb3BWYWwke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IGFuZCB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzLCB1c2UgaXRzIElSSVxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuY29tcGxleCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlbWVudDogc3RyaW5nID0gYD9tYWluUmVzIDwke3Byb3BXaXRoVmFsLnByb3BlcnR5LmlkfT4gJHtwcm9wVmFsdWV9IC5gO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IHRoYXQgaGFzIHRvIGJlIHdyYXBwZWQgaW4gYSBGSUxURVIgTk9UIEVYSVNUUyAoY29tcGFyaXNvbiBvcGVyYXRvciBOT1RfRVFVQUxTKSB0byBuZWdhdGUgaXRcbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgJiYgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ05vdEVxdWFscycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGluY2x1ZGUgc3RhdGVtZW50IGluIHJlc3VsdHMsIGJlY2F1c2UgdGhlIHF1ZXJ5IGNoZWNrcyBmb3IgdGhlIGFic2VuY2Ugb2YgdGhpcyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gYEZJTFRFUiBOT1QgRVhJU1RTIHtcbiR7c3RhdGVtZW50fVxuXG5cbn1gO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIHN0YXRlbWVudCBzaG91bGQgYmUgcmV0dXJuZWQgcmV0dXJuZWQgaW4gcmVzdWx0cyAoQm9vbGVhbiBmbGFnIGZyb20gY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSBgXG4ke3N0YXRlbWVudH1cblxuXG5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHJlc3RyaWN0aW5nIGV4cHJlc3Npb24gKGUuZy4sIGEgRklMVEVSKSBpZiBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgcmVzdHJpY3Rpb246IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgY3JlYXRlIGEgRklMVEVSIGlmIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFWElTVFMgYW5kIGl0IGlzIG5vdCBhIGxpbmtpbmcgcHJvcGVydHlcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgIT09ICdFeGlzdHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIHZhcmlhYmxlIGZvciB2YWx1ZSBsaXRlcmFsXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZUxpdGVyYWwgPSBgJHtwcm9wVmFsdWV9TGl0ZXJhbGA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdMaWtlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50IHRvIHZhbHVlIGxpdGVyYWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gYCR7cHJvcFZhbHVlfSA8JHtHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UuY29tcGxleFR5cGVUb1Byb3BbcHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZV19PiAke3Byb3BWYWx1ZUxpdGVyYWx9YCArICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHJlZ2V4IGZ1bmN0aW9uIGZvciBMSUtFXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiArPSBgRklMVEVSIHJlZ2V4KCR7cHJvcFZhbHVlTGl0ZXJhbH0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLmNvbXBsZXgpfSwgXCJpXCIpYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTWF0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBzdGF0ZW1lbnQgdG8gdmFsdWUgbGl0ZXJhbFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSBgJHtwcm9wVmFsdWV9IDwke0dyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS5jb21wbGV4VHlwZVRvUHJvcFtwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlXX0+ICR7cHJvcFZhbHVlTGl0ZXJhbH1gICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgY29udGFpbnMgZnVuY3Rpb24gZm9yIE1BVENIXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiArPSBgRklMVEVSIDwke0tub3JhQ29uc3RhbnRzLm1hdGNoRnVuY3Rpb259Pigke3Byb3BWYWx1ZUxpdGVyYWx9LCAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5jb21wbGV4KX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlID09PSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBkYXRlIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0cmljdGlvbiA9IGBGSUxURVIoa25vcmEtYXBpOnRvU2ltcGxlRGF0ZSgke3Byb3BWYWx1ZX0pICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci50eXBlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5jb21wbGV4KX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wV2l0aFZhbC5wcm9wZXJ0eS5vYmplY3RUeXBlID09PSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBsaXN0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gYCR7cHJvcFZhbHVlfSA8JHtHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UuY29tcGxleFR5cGVUb1Byb3BbcHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZV19PiAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5jb21wbGV4KX1gICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgY29tcGFyaXNvbiBvcGVyYXRvciBcIm5vdCBlcXVhbHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdOb3RFcXVhbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb24gPSBgRklMVEVSIE5PVCBFWElTVFMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3RyaWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgc3RhdGVtZW50IHRvIHZhbHVlIGxpdGVyYWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uID0gYCR7cHJvcFZhbHVlfSA8JHtHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UuY29tcGxleFR5cGVUb1Byb3BbcHJvcFdpdGhWYWwucHJvcGVydHkub2JqZWN0VHlwZV19PiAke3Byb3BWYWx1ZUxpdGVyYWx9YCArICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgZmlsdGVyIGV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uICs9IGBGSUxURVIoJHtwcm9wVmFsdWVMaXRlcmFsfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IudHlwZX0gJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuY29tcGxleCl9KWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHZhbHVlIGlzIGEgc29ydCBjcml0ZXJpb25cbiAgICAgICAgICAgICAgICBpZiAocHJvcFdpdGhWYWwuaXNTb3J0Q3JpdGVyaW9uKSBvcmRlckJ5Q3JpdGVyaWEucHVzaChwcm9wVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N0YXRlbWVudH1cbiR7cmVzdHJpY3Rpb259XG5gO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb3JkZXJCeVN0YXRlbWVudCA9ICcnO1xuXG4gICAgICAgIGlmIChvcmRlckJ5Q3JpdGVyaWEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3JkZXJCeVN0YXRlbWVudCA9IGBcbk9SREVSIEJZICR7b3JkZXJCeUNyaXRlcmlhLmpvaW4oJyAnKX1cbmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0ZW1wbGF0ZSBvZiB0aGUgR3JhdnNlYXJjaCBxdWVyeSB3aXRoIGR5bmFtaWMgY29tcG9uZW50c1xuICAgICAgICBjb25zdCBncmF2c2VhcmNoVGVtcGxhdGUgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyIz5cbkNPTlNUUlVDVCB7XG5cbj9tYWluUmVzIGtub3JhLWFwaTppc01haW5SZXNvdXJjZSB0cnVlIC5cblxuJHtyZXR1cm5TdGF0ZW1lbnRzLmpvaW4oJ1xcbicpfVxuXG59IFdIRVJFIHtcblxuP21haW5SZXMgYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4ke21haW5SZXNvdXJjZUNsYXNzfVxuXG4ke3Byb3BzLmpvaW4oJycpfVxuXG59XG4ke29yZGVyQnlTdGF0ZW1lbnR9YDtcblxuICAgICAgICAvLyBvZmZzZXQgY29tcG9uZW50IG9mIHRoZSBHcmF2c2VhcmNoIHF1ZXJ5XG4gICAgICAgIGNvbnN0IG9mZnNldFRlbXBsYXRlID0gYFxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICAvLyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgc2FtZSBLbmFyUUwgcXVlcnkgd2l0aCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCA9IChsb2NhbE9mZnNldDogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEN1c3RvbVRlbXBsYXRlID0gYFxuT0ZGU0VUICR7bG9jYWxPZmZzZXR9XG5gO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0Q3VzdG9tVGVtcGxhdGU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGZ1bmN0aW9uIHNvIGFub3RoZXIgS25hclFMIHF1ZXJ5IGNhbiBiZSBjcmVhdGVkIHdpdGggYW4gaW5jcmVhc2VkIG9mZnNldFxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUGFyYW1zU2VydmljZS5jaGFuZ2VTZWFyY2hQYXJhbXNNc2cobmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKGdlbmVyYXRlR3JhdnNlYXJjaFF1ZXJ5V2l0aEN1c3RvbU9mZnNldCkpO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gZ3JhdnNlYXJjaFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGU7XG5cbiAgICB9XG5cbn1cbiJdfQ==