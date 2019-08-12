import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ListCacheService, ReadListValue} from '@knora/core';

@Component({
  selector: 'kuip-viewer-pg',
  templateUrl: './viewer-pg.component.html',
  styleUrls: ['./viewer-pg.component.scss']
})
export class ViewerPgComponent implements OnInit {

  // testResourceIri: string = 'http%3A%2F%2Frdfh.ch%2F0803%2F6ad3e2c47501';
  listValue1: ReadListValue;
  listValue2: ReadListValue;
  listValue3: ReadListValue;

  ready = false;

  resourceIri: string;

  constructor(
    private _route: ActivatedRoute,
    private _listCacheService: ListCacheService
  ) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: Params) => {
        // this.resourceIri = (decodeURIComponent(params.get('id')) === null) ? this.testResourceIri : decodeURIComponent(params.get('id'));

        this._listCacheService.getList('http://rdfh.ch/lists/0001/treeList').subscribe(
          (list) => {

            this.listValue1 = new ReadListValue('http://rdfh.ch/0001/thing_with_list_value', 'http://api.dasch.swiss:443/ontology/0001/anything/v2#hasListItem', 'http://rdfh.ch/lists/0001/treeList01');
            this.listValue2 = new ReadListValue('http://rdfh.ch/0001/thing_with_list_value', 'http://api.dasch.swiss:443/ontology/0001/anything/v2#hasListItem', 'http://rdfh.ch/lists/0001/treeList02');
            this.listValue3 = new ReadListValue('http://rdfh.ch/0001/thing_with_list_value', 'http://api.dasch.swiss:443/ontology/0001/anything/v2#hasListItem', 'http://rdfh.ch/lists/0001/treeList03');

            // this.ready = true;
          }
        );


        // console.log(this.resourceIri)
      }
    );
  }

}
