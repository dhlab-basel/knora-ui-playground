import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Selection {
  id: string;
  label: string;
}

@Component({
  selector: 'kuip-search-pg',
  templateUrl: './search-pg.component.html',
  styleUrls: ['./search-pg.component.scss']
})
export class SearchPgComponent implements OnInit {

  loading: boolean = false;

  form: FormGroup;

  projectIri: string = 'http://rdfh.ch/projects/0001';
  limitToProject: string;

  filterByProject: boolean = false;
  projectFilter: boolean = false;
  advancedSearch: boolean = false;
  expertSearch: boolean = false;

  constructor (@Inject(FormBuilder) private fb: FormBuilder) { }

  ngOnInit() {
    // set the default search view
    // this.option = this.selection[5];

    this.form = this.fb.group({
      // selectSearch: [this.option, Validators.required],
      filterbyproject: [this.filterByProject],
      projectfilter: [this.projectFilter],
      advancedsearch: [this.advancedSearch],
      expertsearch: [this.expertSearch]
    });

    this.form.valueChanges.subscribe(data => {
      // this.option = data.selectSearch;

      this.limitToProject = (data.filterbyproject ? this.projectIri : this.limitToProject = undefined);

      this.projectFilter = data.projectfilter;
      this.advancedSearch = data.advancedsearch;
      this.expertSearch = data.expertsearch;

      this.reload();
    });
  }

  /**
   * reload the search panel component tag
   * reset previous search and project filter
   */
  reload() {
    if (!this.limitToProject) {
      localStorage.removeItem('currentProject');
    }
    localStorage.removeItem('prevSearch')
    this.loading = true;
    setTimeout(x => this.loading = false);
  }
}
