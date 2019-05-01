import { ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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
  @ViewChild('fulltextSearchMenu') searchMenu: TemplateRef<any>;

  // search query
  searchQuery: string;

  // previous search = full-text search history
  prevSearch: PrevSearchItem[] = JSON.parse(localStorage.getItem('prevSearch'));

  // list of projects, in case of filterproject is true
  projects: Project[];

  // selected project, in case of filterbyproject and/or projectfilter is true
  project: Project;

  // in case of an (api) error
  error: any;

  // is search panel focused?
  searchPanelFocus: boolean = false;

  // overlay reference
  overlayRef: OverlayRef;

  constructor (
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _projectsService: ProjectsService
  ) { }

  ngOnInit() {
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
      this.openPanelWithBackdrop();
    }
  }

  openPanelWithBackdrop() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.getOverlayPosition()
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
      this.project = new Project();
      this.project.shortname = 'Filter project';
      this.project.id = undefined;
      localStorage.removeItem('currentProject');
    } else {
      // set current project shortname and id
      localStorage.setItem('currentProject', JSON.stringify(project));
    }
  }

  doSearch(): void {

    this.overlayRef.dispose();
  }

  resetSearch(): void {

  }

  doPrevSearch(prevSearch: PrevSearchItem): void {

  }

  resetPrevSearch(prevSearch?: PrevSearchItem): void {

  }

}
