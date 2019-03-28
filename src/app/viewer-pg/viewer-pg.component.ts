import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kuip-viewer-pg',
  templateUrl: './viewer-pg.component.html',
  styleUrls: ['./viewer-pg.component.scss']
})
export class ViewerPgComponent implements OnInit {

  resourceIri: string;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: Params) => {
          this.resourceIri = decodeURIComponent(params.get('id'));
      }
    );
  }

}
