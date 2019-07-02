import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'kuip-viewer-pg',
    templateUrl: './viewer-pg.component.html',
    styleUrls: ['./viewer-pg.component.scss']
})
export class ViewerPgComponent {

    resourceExamples: any = [
        {
            type: 'Book',
            icon: 'book',
            id: 'http%3A%2F%2Frdfh.ch%2F0803%2F21abac2162',
            disabled: false
        },
        {
            type: 'Page',
            icon: 'chrome_reader_mode',
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

    resourceIri: string;

    constructor (
        private _route: ActivatedRoute,
        private _router: Router
    ) {

        this.resourceIri = ((!this._route.snapshot.params.id) ? this.resourceExamples[0].id : decodeURIComponent(this._route.snapshot.params.id));

    }


    openRes(id: string) {
        this.resourceIri = id;
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    }
}
