import { Router } from '@angular/router';
import { GuiOrder, KnoraConstants, OntologyInformation, ReadProperties, ReadResource } from '@knora/core';
/**
 * Shows all metadata (properties) in the resource viewer
 *
 */
export declare class PropertiesViewComponent {
    protected _router: Router;
    loading: boolean;
    KnoraConstants: typeof KnoraConstants;
    guiOrder: GuiOrder;
    properties: ReadProperties;
    annotations: ReadResource[];
    incomingLinks: ReadResource[];
    ontologyInfo: OntologyInformation;
    constructor(_router: Router);
    /**
     * Navigate to the incoming resource view.
     *
     * @param {string} id Incoming resource iri
     */
    openLink(id: string): void;
}
