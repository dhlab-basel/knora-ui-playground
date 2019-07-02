import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * The search-panel contains the kui-fulltext-search and the kui-extended-search components.
 */
export declare class SearchPanelComponent {
    private _overlay;
    private _viewContainerRef;
    /**
     * @param  {string} route Route to navigate after search. This route path should contain a component for search results.
     */
    route: string;
    /**
     *@param  {boolean} [projectfilter] If true it shows the selection of projects to filter by one of them
     */
    projectfilter?: boolean;
    /**
     * @param  {string} [filterbyproject] If your full-text search should be filtered by one project, you can define it with project iri in the parameter filterbyproject.
     */
    filterbyproject?: string;
    /**
     * @param  {boolean} [advanced] Adds the extended / advanced search to the panel
     */
    advanced?: boolean;
    /**
     * @param  {boolean} [expert] Adds the expert search / gravsearch editor to the panel
     */
    expert?: boolean;
    searchPanel: ElementRef;
    searchMenu: TemplateRef<any>;
    overlayRef: OverlayRef;
    showAdvanced: boolean;
    constructor(_overlay: Overlay, _viewContainerRef: ViewContainerRef);
    openPanelWithBackdrop(type: string): void;
    getOverlayPosition(): PositionStrategy;
    closeMenu(): void;
}
