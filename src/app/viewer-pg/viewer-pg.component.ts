import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'kuip-viewer-pg',
    templateUrl: './viewer-pg.component.html',
    styleUrls: ['./viewer-pg.component.scss']
})
export class ViewerPgComponent implements OnInit {

    @ViewChild('group') group: any;

    resourceExamples: any = [
        {
            type: 'Book',
            icon: 'book',
            id: 'http%3A%2F%2Frdfh.ch%2F0803%2F21abac2162',
            disabled: false
        },
        {
            type: 'Page',
            icon: 'chrome_reader',
            id: 'http%3A%2F%2Frdfh.ch%2F0803%2F6ad3e2c47501',
            disabled: false
        },
        {
            type: 'Movie',
            icon: 'movie',
            id: '',
            disabled: true
        },
        {
            type: 'Audio',
            icon: 'audiotrack',
            id: '',
            disabled: true
        },
    ];

    pageResourceIri: string = 'http%3A%2F%2Frdfh.ch%2F0803%2F6ad3e2c47501';
    // bookResourceIri: string = 'http%3A%2F%2Frdfh.ch%2F0803%2F2a6221216701';
    bookResourceIri: string = 'http%3A%2F%2Frdfh.ch%2F0803%2F21abac2162';
    testResourceIri: string;

    resourceIri: string;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this._route.paramMap.subscribe(
            (params: Params) => {
                this.resourceIri = (decodeURIComponent(params.get('id')) === null) ? this.testResourceIri : decodeURIComponent(params.get('id'));

                // console.log(this.resourceIri)
            }
        );
    }

    ngOnInit() {

        this.openRes(this.resourceExamples[0].id);


    }

    openRes(id: string) {
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    }
}
