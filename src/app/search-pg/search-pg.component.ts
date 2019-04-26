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
  form: FormGroup;

  projectIri: string = 'http://rdfh.ch/projects/0001';

  option: Selection;

  gravsearchQuery: string;

  selection: Selection[] = [
    {
      id: 'fulltext',
      label: 'Full-text search'
    },
    {
      id: 'fulltext-projects-filter',
      label: 'Full-text search with project filter'
    },
    {
      id: 'fulltext-filter-by',
      label: 'Full-text search, filter by anything project'
    },
    {
      id: 'fulltext-combination',
      label: 'Full-text search combination'
    },
    {
      id: 'extended-search',
      label: 'Extended search'
    },
    {
      id: 'search-panel',
      label: 'Full search panel'
    }
  ];

  searchQuery: string = `PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
  CONSTRUCT {
  ?mainRes knora-api:isMainResource true .
  } WHERE {
  ?mainRes a knora-api:Resource .
  ?mainRes a <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#BlueThing> .
  }
  OFFSET 0`;

  constructor (@Inject(FormBuilder) private fb: FormBuilder) { }

  ngOnInit() {
    // set the default search view
    this.option = this.selection[4];

    this.form = this.fb.group({
      selectSearch: [this.option, Validators.required]
    });

    this.form.valueChanges.subscribe(data => {
      this.option = data.selectSearch;
    });
  }

  setGravsearch(query: string) {
    this.gravsearchQuery = query;
  }
}
