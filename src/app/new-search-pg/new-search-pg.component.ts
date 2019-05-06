import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceError, Project, ProjectsService } from '@knora/core';

export interface PrevSearchItem {
  projectIri?: string;
  projectLabel?: string;
  query: string;
}

@Component({
  selector: 'kuip-new-search-pg',
  templateUrl: './new-search-pg.component.html',
  styleUrls: ['./new-search-pg.component.scss']
})
export class NewSearchPgComponent implements OnInit {

  /**
   *
   * @param  {string} route Route to navigate after search.
   * This route path should contain a component for search results.
   */
  @Input() route: string = '/search';

  /**
   *
   * @param  {boolean} [projectfilter] If true it shows the selection
   * of projects to filter by one of them
   */
  @Input() projectfilter?: boolean = true;

  /**
   *
   * @param  {string} [filterbyproject] If the full-text search should be
   * filtered by one project, you can define it with project iri.
   */
  @Input() filterbyproject?: string;

  @ViewChild('fulltextSearchPanel') searchPanel: ElementRef;
  @ViewChild('fulltextSearchInput') searchInput: ElementRef;
  @ViewChild('fulltextSearchMenu') searchMenu: TemplateRef<any>;

  // search query
  searchQuery: string;

  // previous search = full-text search history
  prevSearch: PrevSearchItem[] = JSON.parse(localStorage.getItem('prevSearch'));

  // list of projects, in case of filterproject is true
  projects: Project[];

  // selected project, in case of filterbyproject and/or projectfilter is true
  project: Project;
  projectLabel: string = 'Filter project';
  projectIri: string;

  // in case of an (api) error
  error: any;

  // is search panel focused?
  searchPanelFocus: boolean = false;

  // overlay reference
  overlayRef: OverlayRef;

  constructor (
    private _overlay: Overlay,
    private _router: Router,
    private _viewContainerRef: ViewContainerRef,
    private _projectsService: ProjectsService
  ) { }

  ngOnInit() {

    // this.setFocus();

    if (this.filterbyproject) {
      this.getProject(this.filterbyproject);
    }

    if (this.projectfilter) {
      this.getAllProjects();

      if (localStorage.getItem('currentProject') !== null) {
        this.setProject(
          JSON.parse(localStorage.getItem('currentProject'))
        );
      }
    }
  }

  openPanelWithBackdrop() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this._overlay.scrollStrategies.block()
      // positionStrategy: this._overlay.position().global().centerHorizontally()
    });

    this.overlayRef = this._overlay.create(config);
    // overlayRef.attach(this.searchMenu);
    this.overlayRef.attach(new TemplatePortal(this.searchMenu, this._viewContainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
      new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
    ];

    const overlayPosition = this._overlay.position().flexibleConnectedTo(this.searchPanel).withPositions(positions).withLockedPosition(false);
    // .global().centerHorizontally().centerVertically();
    // .flexibleConnectedTo(this.searchPanel.nativeElement.position.withDefaultOffsetX(0));

    return overlayPosition;
  }

  getAllProjects(): void {
    this._projectsService.getAllProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        // this.loadSystem = false;
        if (localStorage.getItem('currentProject') !== null) {
          this.project = JSON.parse(
            localStorage.getItem('currentProject')
          );
        }
      },
      (error: ApiServiceError) => {
        console.error(error);
        this.error = error;
      }
    );
  }

  getProject(id: string): void {
    this._projectsService.getProjectByIri(id).subscribe(
      (project: Project) => {
        this.setProject(project);
      },
      (error: ApiServiceError) => {
        console.error(error);
      }
    );
  }

  // set current project and switch focus to input field
  setProject(project?: Project): void {
    if (!project) {
      // set default project: all
      this.projectLabel = 'Filter project';
      this.projectIri = undefined;
      localStorage.removeItem('currentProject');
    } else {
      // set current project shortname and id
      this.projectLabel = project.shortname;
      this.projectIri = project.id;
      localStorage.setItem('currentProject', JSON.stringify(project));
    }
  }

  /*   onKey(search_ele: HTMLElement, event: any): void {
      this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
      if (this.searchQuery && (event.key === 'Enter' || event.keyCode === 13 || event.which === 13)) {
        this.doSearch();
      }
      if (event.key === 'Escape' || event.keyCode === 27 || event.which === 27) {

        this.resetSearch();
      }
    } */

  doSearch(): void {
    if (this.searchQuery !== undefined && this.searchQuery !== null) {
      if (this.projectIri !== undefined) {
        this._router.navigate([
          this.route +
          '/fulltext/' +
          this.searchQuery +
          '/' +
          encodeURIComponent(this.projectIri)
        ]);
      } else {
        this._router.navigate([
          this.route + '/fulltext/' + this.searchQuery
        ]);
      }
      // push the search query into the local storage prevSearch array (previous search)
      // to have a list of recent search requests
      let existingPrevSearch: PrevSearchItem[] = JSON.parse(
        localStorage.getItem('prevSearch')
      );
      if (existingPrevSearch === null) {
        existingPrevSearch = [];
      }
      let i: number = 0;
      for (const entry of existingPrevSearch) {
        // remove entry, if exists already
        if (this.searchQuery === entry.query && this.projectIri === entry.projectIri) {
          existingPrevSearch.splice(i, 1);
        }
        i++;
      }
      // TODO: reload the menu with the new search queries in exising prev search



      // A search value is expected to have at least length of 3
      if (this.searchQuery.length > 2) {
        let currentQuery: PrevSearchItem = {
          query: this.searchQuery
        };

        if (this.projectIri) {
          currentQuery = {
            projectIri: this.projectIri,
            projectLabel: this.projectLabel,
            query: this.searchQuery
          };
        }

        existingPrevSearch.push(currentQuery);

        localStorage.setItem(
          'prevSearch',
          JSON.stringify(existingPrevSearch)
        );
      }
    }
    this.resetSearch();
    this.overlayRef.detach();
  }

  resetSearch(): void {
    this.searchPanelFocus = false;
    this.searchInput.nativeElement.blur();
    this.overlayRef.detach();
  }

  setFocus(): void {
    console.log('setFocus and open Backdrop');

    this.searchPanelFocus = true;
    setTimeout(() => {
      this.openPanelWithBackdrop();
    }, 500);
  }

  doPrevSearch(prevSearch: PrevSearchItem): void {
    this.searchQuery = prevSearch.query;

    if (prevSearch.projectIri !== undefined) {
      this.projectIri = prevSearch.projectIri;
      this.projectLabel = prevSearch.projectLabel;
      this._router.navigate([this.route + '/fulltext/' + this.searchQuery + '/' + encodeURIComponent(prevSearch.projectIri)]);
    } else {
      this.projectIri = undefined;
      this.projectLabel = 'Filter project';
      this._router.navigate([this.route + '/fulltext/' + this.searchQuery]);
    }

    this.resetSearch();
    this.overlayRef.detach();
  }

  resetPrevSearch(prevSearch?: PrevSearchItem): void {
    if (prevSearch) {
      // delete only this item with the name ...
      const i: number = this.prevSearch.indexOf(prevSearch);
      this.prevSearch.splice(i, 1);
      localStorage.setItem('prevSearch', JSON.stringify(this.prevSearch));
    } else {
      // delete the whole "previous search" array
      localStorage.removeItem('prevSearch');
    }
    this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
  }

}
