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

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {}

  ngOnInit() {
    // set the default search view
    this.option = this.selection[1];


    this.form = this.fb.group({
      selectSearch: [this.option, Validators.required]
    });

    this.form.valueChanges.subscribe((data) => {
      this.option = data.selectSearch;
    });
  }
}
