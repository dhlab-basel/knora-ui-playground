import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GuiOrder, KnoraConstants, OntologyInformation } from '@knora/core';
/**
 * Shows all metadata (properties) in the resource viewer
 *
 */
export class PropertiesViewComponent {
    // @Output() routeChanged: EventEmitter<string> = new EventEmitter<string>();
    constructor(_router) {
        this._router = _router;
        this.loading = false;
        this.KnoraConstants = KnoraConstants;
    }
    /**
     * Navigate to the incoming resource view.
     *
     * @param {string} id Incoming resource iri
     */
    openLink(id) {
        this.loading = true;
        // this.routeChanged.emit(id);
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    }
}
PropertiesViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-properties-view',
                template: "<!-- properties -->\n<div class=\"properties\">\n    <div *ngFor=\"let prop of guiOrder; let last = last\">\n        <div *ngIf=\"properties[prop?.property]\" class=\"property\">\n            <div class=\"property-label\">\n                <!-- label of the property -->\n                <h3 class=\"label mat-subheading-1\">\n                    {{ontologyInfo.getLabelForProperty(prop?.property)}}\n                </h3>\n            </div>\n            <div class=\"property-value\">\n\n                <!-- the value(s) of the property -->\n                <div class=\"property-value-item\" *ngFor=\"let val of properties[prop?.property]; let lastItem = last\">\n                    <span [ngSwitch]=\"val.getClassName()\" [class.list]=\"properties[prop?.property].length > 1\"\n                          [class.lastItem]=\"lastItem\">\n                        <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\"\n                                                  [valueObject]=\"val\">\n                        </kui-text-value-as-string>\n                        <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\" [valueObject]=\"val\">\n                        </kui-text-value-as-xml>\n                        <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\"\n                                        [calendar]=\"true\" [era]=\"true\">\n                        </kui-date-value>\n                        <kui-link-value class=\"app-link\" *ngSwitchCase=\"KnoraConstants.ReadLinkValue\"\n                                        [valueObject]=\"val\" [ontologyInfo]=\"ontologyInfo\"\n                                        (referredResourceClicked)=\"openLink(val.referredResourceIri)\">\n                        </kui-link-value>\n                        <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\" [valueObject]=\"val\">\n                        </kui-integer-value>\n                        <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\" [valueObject]=\"val\">\n                        </kui-decimal-value>\n                        <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\" [valueObject]=\"val\">\n                        </kui-geometry-value>\n                        <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\" [valueObject]=\"val\">\n                        </kui-color-value>\n                        <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\">\n                        </kui-uri-value>\n                        <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\" [valueObject]=\"val\">\n                        </kui-boolean-value>\n                        <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\" [valueObject]=\"val\">\n                        </kui-interval-value>\n                        <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\">\n                        </kui-list-value>\n                        <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\" [valueObject]=\"val\">\n                        </kui-textfile-value>\n                        <span *ngSwitchDefault>Not supported {{val.getClassName()}}</span>\n                        <br>\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div class=\"incoming\">\n\n    <!-- annotations are resources like region, sequence etc. -->\n    <!-- TODO: we can't display incoming annotations as expected\n    <div class=\"annotations\">\n        <!-- *ngIf=\"annotations?.length > 0\"> --\n        <h3 class=\"label mat-subheading-1\">\n            Annotations\n        </h3>\n        <mat-list *ngFor=\"let annotation of annotations\">\n            <mat-list-item class=\"kui-link\" (click)=\"openLink(annotation.id)\">\n                <span>{{annotation.label}}</span>\n            </mat-list-item>\n        </mat-list>\n    </div>\n    -->\n\n    <!-- incoming links -->\n    <div class=\"links\" *ngIf=\"incomingLinks?.length > 0\">\n        <h3 class=\"label mat-subheading-1\">\n            Links\n        </h3>\n        <ul>\n            <li *ngFor=\"let incoming of incomingLinks\" class=\"kui-link\" (click)=\"openLink(incoming.id)\">\n                {{incoming.label}}\n            </li>\n        </ul>\n    </div>\n</div>\n",
                styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}a{text-decoration:none;color:inherit}.kui-link{cursor:pointer;border-bottom:2px solid rgba(0,105,92,.25)}.kui-link:hover{box-shadow:0 -10px 0 rgba(0,105,92,.25) inset}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}:host{display:-ms-grid;display:grid;-ms-grid-columns:(1fr)[6];grid-template-columns:repeat(6,1fr);gap:16px}:host .incoming,:host .properties{margin-top:16px}:host .properties{-ms-grid-column:1;-ms-grid-column-span:4;grid-column:1/span 4}:host .properties .property{-ms-grid-row:1;grid-row:1/1;display:-ms-grid;display:grid;-ms-grid-columns:(1fr)[4];grid-template-columns:repeat(4,1fr);gap:16px}:host .properties .property .property-label,:host .properties .property .property-value{padding:2px;overflow-wrap:break-word}:host .properties .property .property-label{-ms-grid-column:1;-ms-grid-column-span:1;grid-column:1/span 1}:host .properties .property .property-label .label{text-align:right}:host .properties .property .property-value{padding-top:5px;-ms-grid-column:2;-ms-grid-column-span:3;grid-column:2/span 3}:host .incoming{-ms-grid-column:5;-ms-grid-column-span:2;grid-column:5/span 2;display:-ms-grid;display:grid;gap:16px;-ms-grid-columns:1fr 1fr;grid-template-columns:1fr 1fr;-ms-grid-rows:(minmax(60px,auto))[6];grid-template-rows:repeat(6,minmax(60px,auto))}:host .incoming .annotations,:host .incoming .links{padding:16px;-ms-grid-column:1;-ms-grid-column-span:2;grid-column:1/span 2;border-radius:6px}:host .incoming .annotations ul,:host .incoming .links ul{-webkit-padding-start:5px;padding-inline-start:5px;list-style-type:none}:host .incoming .annotations ul li,:host .incoming .links ul li{margin-bottom:10px;text-indent:-8px}:host .incoming .annotations ul li:before,:host .incoming .links ul li:before{content:\"- \"}:host .incoming .annotations{background:rgba(245,222,179,.39)}:host .incoming .links{background:rgba(222,184,135,.39)}.label{color:rgba(0,0,0,.54)}@media screen and (max-width:768px){.incoming,.properties{-ms-grid-column:1!important;-ms-grid-column-span:6!important;grid-column:1/span 6!important;gap:0!important}.incoming .property,.properties .property{gap:0!important}.incoming .annotations,.incoming .links,.incoming .property-label,.incoming .property-value,.properties .annotations,.properties .links,.properties .property-label,.properties .property-value{-ms-grid-column:1!important;-ms-grid-column-span:4!important;grid-column:1/span 4!important}h3.label{text-align:left!important;margin:16px 0 0!important}}"]
            }] }
];
/** @nocollapse */
PropertiesViewComponent.ctorParameters = () => [
    { type: Router }
];
PropertiesViewComponent.propDecorators = {
    guiOrder: [{ type: Input }],
    properties: [{ type: Input }],
    annotations: [{ type: Input }],
    incomingLinks: [{ type: Input }],
    ontologyInfo: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlldy9wcm9wZXJ0aWVzLXZpZXcvcHJvcGVydGllcy12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnQixLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFnQyxNQUFNLGFBQWEsQ0FBQztBQUUxRzs7O0dBR0c7QUFNSCxNQUFNLE9BQU8sdUJBQXVCO0lBYWhDLDZFQUE2RTtJQUU3RSxZQUF1QixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWJ0QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBV1UsQ0FBQztJQUUzQzs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLEVBQVU7UUFFZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5FLENBQUM7OztZQWpDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsMjVJQUErQzs7YUFFbEQ7Ozs7WUFYUSxNQUFNOzs7dUJBa0JWLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgR3VpT3JkZXIsIEtub3JhQ29uc3RhbnRzLCBPbnRvbG9neUluZm9ybWF0aW9uLCBSZWFkUHJvcGVydGllcywgUmVhZFJlc291cmNlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG4vKipcbiAqIFNob3dzIGFsbCBtZXRhZGF0YSAocHJvcGVydGllcykgaW4gdGhlIHJlc291cmNlIHZpZXdlclxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktcHJvcGVydGllcy12aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvcGVydGllcy12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9wZXJ0aWVzLXZpZXcuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9wZXJ0aWVzVmlld0NvbXBvbmVudCB7XG5cbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBLbm9yYUNvbnN0YW50cyA9IEtub3JhQ29uc3RhbnRzO1xuXG4gICAgQElucHV0KCkgZ3VpT3JkZXI6IEd1aU9yZGVyO1xuICAgIEBJbnB1dCgpIHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzO1xuICAgIEBJbnB1dCgpIGFubm90YXRpb25zOiBSZWFkUmVzb3VyY2VbXTtcbiAgICBASW5wdXQoKSBpbmNvbWluZ0xpbmtzOiBSZWFkUmVzb3VyY2VbXTtcblxuICAgIEBJbnB1dCgpIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbjtcblxuICAgIC8vIEBPdXRwdXQoKSByb3V0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBjb25zdHJ1Y3RvciAocHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZSB0byB0aGUgaW5jb21pbmcgcmVzb3VyY2Ugdmlldy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJbmNvbWluZyByZXNvdXJjZSBpcmlcbiAgICAgKi9cbiAgICBvcGVuTGluayhpZDogc3RyaW5nKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gdGhpcy5yb3V0ZUNoYW5nZWQuZW1pdChpZCk7XG4gICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJy9yZXNvdXJjZS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkKV0pO1xuXG4gICAgfVxuXG59XG4iXX0=