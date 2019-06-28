import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'kuip-viewer-pg',
    templateUrl: './viewer-pg.component.html',
    styleUrls: ['./viewer-pg.component.scss']
})
export class ViewerPgComponent implements OnInit {

    pageResourceIri: string = 'http%3A%2F%2Frdfh.ch%2F0803%2F6ad3e2c47501';
    bookResourceIri: string = 'http%3A%2F%2Frdfh.ch%2F0803%2F2a6221216701';
    testResourceIri: string;

    resourceIri: string;

    constructor (
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.resourceIri = this.pageResourceIri;
        this._route.paramMap.subscribe(
            (params: Params) => {
                this.resourceIri = (decodeURIComponent(params.get('id')) === null) ? this.testResourceIri : decodeURIComponent(params.get('id'));

                // console.log(this.resourceIri)
            }
        );
    }

}
