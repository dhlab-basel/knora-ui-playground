import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GuiOrder, KnoraConstants, OntologyInformation } from '@knora/core';
/**
 * Shows all metadata (properties) in the resource viewer
 *
 */
var PropertiesViewComponent = /** @class */ (function () {
    // @Output() routeChanged: EventEmitter<string> = new EventEmitter<string>();
    function PropertiesViewComponent(_router) {
        this._router = _router;
        this.loading = false;
        this.KnoraConstants = KnoraConstants;
    }
    /**
     * Navigate to the incoming resource view.
     *
     * @param {string} id Incoming resource iri
     */
    PropertiesViewComponent.prototype.openLink = function (id) {
        this.loading = true;
        // this.routeChanged.emit(id);
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    };
    PropertiesViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-properties-view',
                    template: "<!-- properties -->\n<div class=\"properties\">\n    <div *ngFor=\"let prop of guiOrder; let last = last\">\n        <div *ngIf=\"properties[prop?.property]\" class=\"property\">\n            <div class=\"property-label\">\n                <!-- label of the property -->\n                <h3 class=\"label mat-subheading-1\">\n                    {{ontologyInfo.getLabelForProperty(prop?.property)}}\n                </h3>\n            </div>\n            <div class=\"property-value\">\n\n                <!-- the value(s) of the property -->\n                <div class=\"property-value-item\" *ngFor=\"let val of properties[prop?.property]; let lastItem = last\">\n                    <span [ngSwitch]=\"val.getClassName()\" [class.list]=\"properties[prop?.property].length > 1\"\n                          [class.lastItem]=\"lastItem\">\n                        <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\"\n                                                  [valueObject]=\"val\">\n                        </kui-text-value-as-string>\n                        <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\" [valueObject]=\"val\">\n                        </kui-text-value-as-xml>\n                        <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\"\n                                        [calendar]=\"true\" [era]=\"true\">\n                        </kui-date-value>\n                        <kui-link-value class=\"app-link\" *ngSwitchCase=\"KnoraConstants.ReadLinkValue\"\n                                        [valueObject]=\"val\" [ontologyInfo]=\"ontologyInfo\"\n                                        (referredResourceClicked)=\"openLink(val.referredResourceIri)\">\n                        </kui-link-value>\n                        <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\" [valueObject]=\"val\">\n                        </kui-integer-value>\n                        <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\" [valueObject]=\"val\">\n                        </kui-decimal-value>\n                        <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\" [valueObject]=\"val\">\n                        </kui-geometry-value>\n                        <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\" [valueObject]=\"val\">\n                        </kui-color-value>\n                        <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\">\n                        </kui-uri-value>\n                        <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\" [valueObject]=\"val\">\n                        </kui-boolean-value>\n                        <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\" [valueObject]=\"val\">\n                        </kui-interval-value>\n                        <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\">\n                        </kui-list-value>\n                        <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\" [valueObject]=\"val\">\n                        </kui-textfile-value>\n                        <span *ngSwitchDefault>Not supported {{val.getClassName()}}</span>\n                        <br>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div class=\"incoming\">\n\n    <!-- annotations are resources like region, sequence etc. -->\n    <!-- TODO: we can't display incoming annotations as expected\n    <div class=\"annotations\">\n        <!-- *ngIf=\"annotations?.length > 0\"> --\n        <h3 class=\"label mat-subheading-1\">\n            Annotations\n        </h3>\n        <mat-list *ngFor=\"let annotation of annotations\">\n            <mat-list-item class=\"kui-link\" (click)=\"openLink(annotation.id)\">\n                <span>{{annotation.label}}</span>\n            </mat-list-item>\n        </mat-list>\n    </div>\n    -->\n\n    <!-- incoming links -->\n    <div class=\"links\" *ngIf=\"incomingLinks?.length > 0\">\n        <h3 class=\"label mat-subheading-1\">\n            Links\n        </h3>\n        <ul>\n            <li *ngFor=\"let incoming of incomingLinks\" class=\"kui-link\" (click)=\"openLink(incoming.id)\">\n                {{incoming.label}}\n            </li>\n        </ul>\n    </div>\n</div>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}:host{display:-ms-grid;display:grid;-ms-grid-columns:(1fr)[6];grid-template-columns:repeat(6,1fr);gap:16px}:host .incoming,:host .properties{margin-top:16px}:host .properties{-ms-grid-column:1;-ms-grid-column-span:4;grid-column:1/span 4}:host .properties .property{-ms-grid-row:1;grid-row:1/1;display:-ms-grid;display:grid;-ms-grid-columns:(1fr)[4];grid-template-columns:repeat(4,1fr);gap:16px}:host .properties .property .property-label,:host .properties .property .property-value{padding:2px;overflow-wrap:break-word}:host .properties .property .property-label{-ms-grid-column:1;-ms-grid-column-span:1;grid-column:1/span 1}:host .properties .property .property-label .label{text-align:right}:host .properties .property .property-value{padding-top:5px;-ms-grid-column:2;-ms-grid-column-span:3;grid-column:2/span 3}:host .incoming{-ms-grid-column:5;-ms-grid-column-span:2;grid-column:5/span 2;display:-ms-grid;display:grid;gap:16px;-ms-grid-columns:1fr 1fr;grid-template-columns:1fr 1fr;-ms-grid-rows:(minmax(60px,auto))[6];grid-template-rows:repeat(6,minmax(60px,auto))}:host .incoming .annotations,:host .incoming .links{padding:16px;-ms-grid-column:1;-ms-grid-column-span:2;grid-column:1/span 2;border-radius:6px}:host .incoming .annotations ul,:host .incoming .links ul{-webkit-padding-start:5px;padding-inline-start:5px;list-style-type:none}:host .incoming .annotations ul li,:host .incoming .links ul li{margin-bottom:10px;text-indent:-8px}:host .incoming .annotations ul li:before,:host .incoming .links ul li:before{content:\"- \"}:host .incoming .annotations{background:rgba(245,222,179,.39)}:host .incoming .links{background:rgba(222,184,135,.39)}.label{color:rgba(0,0,0,.54)}@media screen and (max-width:768px){.incoming,.properties{-ms-grid-column:1!important;-ms-grid-column-span:6!important;grid-column:1/span 6!important;gap:0!important}.incoming .property,.properties .property{gap:0!important}.incoming .annotations,.incoming .links,.incoming .property-label,.incoming .property-value,.properties .annotations,.properties .links,.properties .property-label,.properties .property-value{-ms-grid-column:1!important;-ms-grid-column-span:4!important;grid-column:1/span 4!important}h3.label{text-align:left!important;margin:16px 0 0!important}}"]
                }] }
    ];
    /** @nocollapse */
    PropertiesViewComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    PropertiesViewComponent.propDecorators = {
        guiOrder: [{ type: Input }],
        properties: [{ type: Input }],
        annotations: [{ type: Input }],
        incomingLinks: [{ type: Input }],
        ontologyInfo: [{ type: Input }]
    };
    return PropertiesViewComponent;
}());
export { PropertiesViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlldy9wcm9wZXJ0aWVzLXZpZXcvcHJvcGVydGllcy12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnQixLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFnQyxNQUFNLGFBQWEsQ0FBQztBQUUxRzs7O0dBR0c7QUFDSDtJQWtCSSw2RUFBNkU7SUFFN0UsaUNBQXVCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBYnRDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFXVSxDQUFDO0lBRTNDOzs7O09BSUc7SUFDSCwwQ0FBUSxHQUFSLFVBQVMsRUFBVTtRQUVmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkUsQ0FBQzs7Z0JBakNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiwyNUlBQStDOztpQkFFbEQ7Ozs7Z0JBWFEsTUFBTTs7OzJCQWtCVixLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQUVMLEtBQUs7O0lBbUJWLDhCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0E5QlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBHdWlPcmRlciwgS25vcmFDb25zdGFudHMsIE9udG9sb2d5SW5mb3JtYXRpb24sIFJlYWRQcm9wZXJ0aWVzLCBSZWFkUmVzb3VyY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbi8qKlxuICogU2hvd3MgYWxsIG1ldGFkYXRhIChwcm9wZXJ0aWVzKSBpbiB0aGUgcmVzb3VyY2Ugdmlld2VyXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1wcm9wZXJ0aWVzLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9wZXJ0aWVzLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Byb3BlcnRpZXMtdmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFByb3BlcnRpZXNWaWV3Q29tcG9uZW50IHtcblxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEtub3JhQ29uc3RhbnRzID0gS25vcmFDb25zdGFudHM7XG5cbiAgICBASW5wdXQoKSBndWlPcmRlcjogR3VpT3JkZXI7XG4gICAgQElucHV0KCkgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXM7XG4gICAgQElucHV0KCkgYW5ub3RhdGlvbnM6IFJlYWRSZXNvdXJjZVtdO1xuICAgIEBJbnB1dCgpIGluY29taW5nTGlua3M6IFJlYWRSZXNvdXJjZVtdO1xuXG4gICAgQElucHV0KCkgb250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uO1xuXG4gICAgLy8gQE91dHB1dCgpIHJvdXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIGNvbnN0cnVjdG9yIChwcm90ZWN0ZWQgX3JvdXRlcjogUm91dGVyKSB7IH1cblxuICAgIC8qKlxuICAgICAqIE5hdmlnYXRlIHRvIHRoZSBpbmNvbWluZyByZXNvdXJjZSB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIEluY29taW5nIHJlc291cmNlIGlyaVxuICAgICAqL1xuICAgIG9wZW5MaW5rKGlkOiBzdHJpbmcpIHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLnJvdXRlQ2hhbmdlZC5lbWl0KGlkKTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3Jlc291cmNlLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpXSk7XG5cbiAgICB9XG5cbn1cbiJdfQ==