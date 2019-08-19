import { OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiOrder, IncomingService, KnoraConstants, OntologyInformation, ReadResource, ResourceService, ResourcesSequence } from '@knora/core';
import { StillImageComponent } from '../../resource';
export declare class ResourceViewComponent implements OnInit, OnChanges {
    protected _route: ActivatedRoute;
    protected _router: Router;
    protected _resourceService: ResourceService;
    protected _incomingService: IncomingService;
    /**
     * @param {string} [iri] Resource iri
     */
    iri?: string;
    kuiStillImage: StillImageComponent;
    sequence: ResourcesSequence;
    ontologyInfo: OntologyInformation;
    guiOrder: GuiOrder[];
    loading: boolean;
    error: any;
    KnoraConstants: typeof KnoraConstants;
    fileRepresentation: boolean;
    currentResource: ReadResource;
    constructor(_route: ActivatedRoute, _router: Router, _resourceService: ResourceService, _incomingService: IncomingService);
    ngOnInit(): void;
    ngOnChanges(): void;
    /**
     * Get a read resource sequence with ontology information and incoming resources.
     *
     * @param {string} id Resource iri
     */
    getResource(id: string): void;
    /**
     * Collect all file representations (stillImage, movingImage, audio etc.) and annotations (region, sequence etc.)
     *
     * @param resource
     */
    /**
     * Get incoming resources: incoming links, incoming regions, incoming still image representations.
     */
    requestIncomingResources(): void;
    /**
     * Get incoming regions for the resource.
     *
     * @param offset
     * @param callback
     *
    getIncomingRegions(offset: number, callback?: (numberOfResources: number) => void): void {
        this._incomingService.getIncomingRegions(this.sequence.resources[0].id, offset).subscribe(
            (regions: ReadResourcesSequence) => {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(regions.ontologyInformation);

                // Append elements of regions.resources to resource.incoming
                Array.prototype.push.apply(this.sequence.resources[0].incomingRegions, regions.resources);

                // prepare regions to be displayed
                this.collectImagesAndRegionsForResource(this.sequence.resources[0]);

                // TODO: implement osdViewer
                /* if (this.osdViewer) {
                  this.osdViewer.updateRegions();
                } *

                // if callback is given, execute function with the amount of new images as the parameter
                if (callback !== undefined) {
                    callback(regions.resources.length);
                }
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    */
    /**
     * Get incoming links for a resource.
     *
     * @param offset
     * @param callback
     */
    getIncomingLinks(offset: number, callback?: (numberOfResources: number) => void): void;
    openLink(id: string): void;
    refreshProperties(index: number): void;
}
