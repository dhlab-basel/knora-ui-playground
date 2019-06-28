import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ElementRef, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectsService } from '@knora/core';
import { MatMenuTrigger } from '@angular/material';
export interface PrevSearchItem {
    projectIri?: string;
    projectLabel?: string;
    query: string;
}
/**
 * @deprecated
 */
export declare class FulltextSearchComponent implements OnInit {
    private _overlay;
    private _router;
    private _viewContainerRef;
    private _projectsService;
    /**
     *
     * @param  {string} route Route to navigate after search.
     * This route path should contain a component for search results.
     */
    route: string;
    /**
     *
     * @param  {boolean} [projectfilter] If true it shows the selection
     * of projects to filter by one of them
     */
    projectfilter?: boolean;
    /**
     *
     * @param  {string} [filterbyproject] If the full-text search should be
     * filtered by one project, you can define it with project iri.
     */
    filterbyproject?: string;
    searchPanel: ElementRef;
    searchInput: ElementRef;
    searchMenu: TemplateRef<any>;
    selectProject: MatMenuTrigger;
    searchQuery: string;
    prevSearch: PrevSearchItem[];
    projects: Project[];
    project: Project;
    defaultProjectLabel: string;
    projectLabel: string;
    projectIri: string;
    error: any;
    searchPanelFocus: boolean;
    overlayRef: OverlayRef;
    constructor(_overlay: Overlay, _router: Router, _viewContainerRef: ViewContainerRef, _projectsService: ProjectsService);
    ngOnInit(): void;
    openPanelWithBackdrop(): void;
    getOverlayPosition(): PositionStrategy;
    getAllProjects(): void;
    getProject(id: string): void;
    setProject(project?: Project): void;
    doSearch(): void;
    resetSearch(): void;
    setFocus(): void;
    doPrevSearch(prevSearch: PrevSearchItem): void;
    resetPrevSearch(prevSearch?: PrevSearchItem): void;
    changeFocus(): void;
}
