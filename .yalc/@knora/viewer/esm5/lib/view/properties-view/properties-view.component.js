import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GuiOrder, KnoraConstants, OntologyInformation } from '@knora/core';
/**
 * Shows all metadata (properties) in the resource viewer
 *
 */
var PropertiesViewComponent = /** @class */ (function () {
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
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    };
    PropertiesViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-properties-view',
                    template: "<mat-tab-group class=\"full-width\">\n    <mat-tab label=\"Metadata\">\n        <mat-list>\n            <div *ngFor=\"let prop of guiOrder; let last = last\" class=\"property\">\n                <div *ngIf=\"properties[prop?.property]\">\n                    <!-- label of the property -->\n                    <h3 mat-subheader class=\"property-label\">\n                        {{ontologyInfo.getLabelForProperty(prop?.property)}}\n                    </h3>\n                    <!-- the value(s) of the property -->\n                    <mat-list-item class=\"property-value-item\"\n                                   *ngFor=\"let val of properties[prop?.property]; let lastItem = last\">\n                        <li [ngSwitch]=\"val.getClassName()\" [class.list]=\"properties[prop?.property].length > 1\"\n                            [class.lastItem]=\"lastItem\">\n                            <kui-text-value-as-string *ngSwitchCase=\"KnoraConstants.ReadTextValueAsString\"\n                                                      [valueObject]=\"val\"></kui-text-value-as-string>\n                            <kui-text-value-as-xml *ngSwitchCase=\"KnoraConstants.ReadTextValueAsXml\"\n                                                   [valueObject]=\"val\"></kui-text-value-as-xml>\n                            <kui-date-value *ngSwitchCase=\"KnoraConstants.ReadDateValue\" [valueObject]=\"val\"\n                                            [calendar]=\"true\" [era]=\"true\">\n                            </kui-date-value>\n                            <kui-link-value class=\"app-link\" *ngSwitchCase=\"KnoraConstants.ReadLinkValue\"\n                                            [valueObject]=\"val\" [ontologyInfo]=\"ontologyInfo\"\n                                            (referredResourceClicked)=\"openLink(val.referredResourceIri)\">\n                            </kui-link-value>\n                            <kui-integer-value *ngSwitchCase=\"KnoraConstants.ReadIntegerValue\" [valueObject]=\"val\">\n                            </kui-integer-value>\n                            <kui-decimal-value *ngSwitchCase=\"KnoraConstants.ReadDecimalValue\" [valueObject]=\"val\">\n                            </kui-decimal-value>\n                            <kui-geometry-value *ngSwitchCase=\"KnoraConstants.ReadGeomValue\" [valueObject]=\"val\">\n                            </kui-geometry-value>\n                            <kui-color-value *ngSwitchCase=\"KnoraConstants.ReadColorValue\" [valueObject]=\"val\">\n                            </kui-color-value>\n                            <kui-uri-value *ngSwitchCase=\"KnoraConstants.ReadUriValue\" [valueObject]=\"val\">\n                            </kui-uri-value>\n                            <kui-boolean-value *ngSwitchCase=\"KnoraConstants.ReadBooleanValue\" [valueObject]=\"val\">\n                            </kui-boolean-value>\n                            <kui-interval-value *ngSwitchCase=\"KnoraConstants.ReadIntervalValue\" [valueObject]=\"val\">\n                            </kui-interval-value>\n                            <kui-list-value *ngSwitchCase=\"KnoraConstants.ReadListValue\" [valueObject]=\"val\">\n                            </kui-list-value>\n                            <kui-textfile-value *ngSwitchCase=\"KnoraConstants.TextFileValue\" [valueObject]=\"val\">\n                            </kui-textfile-value>\n                            <span *ngSwitchDefault>Not supported {{val.getClassName()}}</span>\n                        </li>\n                    </mat-list-item>\n                </div>\n            </div>\n        </mat-list>\n    </mat-tab>\n\n    <mat-tab label=\"Annotations\" *ngIf=\"annotations?.length > 0\">\n\n    </mat-tab>\n\n    <mat-tab label=\"Links / Connections\" *ngIf=\"incomingLinks?.length > 0\">\n        <div>\n            <mat-list *ngFor=\"let incoming of incomingLinks\">\n                <mat-list-item class=\"app-link\" (click)=\"openLink(incoming.id)\">\n                    <span>{{incoming.label}}</span>\n                </mat-list-item>\n            </mat-list>\n        </div>\n    </mat-tab>\n\n</mat-tab-group>\n",
                    styles: [".mat-form-field{width:320px}.fill-remaining-space{flex:1 1 auto}.center{text-align:center}.link{cursor:pointer}.lv-html-text{max-height:60px;position:relative;overflow:hidden}.lv-read-more{position:absolute;bottom:0;left:0;width:100%;text-align:center;margin:0;padding:30px 0;border-radius:3px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlldy9wcm9wZXJ0aWVzLXZpZXcvcHJvcGVydGllcy12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQWdDLE1BQU0sYUFBYSxDQUFDO0FBRTFHOzs7R0FHRztBQUNIO0lBa0JJLGlDQUF1QixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVh0QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0lBU1UsQ0FBQztJQUUzQzs7OztPQUlHO0lBQ0gsMENBQVEsR0FBUixVQUFTLEVBQVU7UUFFZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkUsQ0FBQzs7Z0JBOUJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiw2a0lBQStDOztpQkFFbEQ7Ozs7Z0JBWFEsTUFBTTs7OzJCQWtCVixLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQUVMLEtBQUs7O0lBZ0JWLDhCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7U0EzQlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEd1aU9yZGVyLCBLbm9yYUNvbnN0YW50cywgT250b2xvZ3lJbmZvcm1hdGlvbiwgUmVhZFByb3BlcnRpZXMsIFJlYWRSZXNvdXJjZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLyoqXG4gKiBTaG93cyBhbGwgbWV0YWRhdGEgKHByb3BlcnRpZXMpIGluIHRoZSByZXNvdXJjZSB2aWV3ZXJcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXByb3BlcnRpZXMtdmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb3BlcnRpZXMtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvcGVydGllcy12aWV3LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHJvcGVydGllc1ZpZXdDb21wb25lbnQge1xuXG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcblxuICAgIEBJbnB1dCgpIGd1aU9yZGVyOiBHdWlPcmRlcjtcbiAgICBASW5wdXQoKSBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcztcbiAgICBASW5wdXQoKSBhbm5vdGF0aW9uczogUmVhZFJlc291cmNlW107XG4gICAgQElucHV0KCkgaW5jb21pbmdMaW5rczogUmVhZFJlc291cmNlW107XG5cbiAgICBASW5wdXQoKSBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb247XG5cbiAgICBjb25zdHJ1Y3RvciAocHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlcikgeyB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZSB0byB0aGUgaW5jb21pbmcgcmVzb3VyY2Ugdmlldy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJbmNvbWluZyByZXNvdXJjZSBpcmlcbiAgICAgKi9cbiAgICBvcGVuTGluayhpZDogc3RyaW5nKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnL3Jlc291cmNlLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWQpXSk7XG5cbiAgICB9XG5cbn1cbiJdfQ==