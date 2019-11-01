import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'kuip-viewer-pg',
    templateUrl: './viewer-pg.component.html',
    styleUrls: ['./viewer-pg.component.scss']
})
export class ViewerPgComponent implements OnInit, OnDestroy {

    loading: boolean = true;


    navigationSubscription: Subscription;

    resourceExamples: any = [
        {
            type: 'Book',
            icon: 'book',
            id: 'http://rdfh.ch/0803/21abac2162',
            disabled: false
        },
        {
            type: 'Page',
            icon: 'chrome_reader_mode',
            id: 'http://rdfh.ch/0803/6ad3e2c47501',
            disabled: false
        },
        {
            type: 'Ding',
            icon: 'chrome_reader_mode',
            id: 'http://rdfh.ch/0001/a-thing-with-text-valuesLanguage',
            disabled: false
        },
        {
            type: 'Film',
            icon: 'camera_roll',
            id: 'http://rdfh.ch/0815/6BUOOKNnRFeoTheBAM4CHQ',
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

    constructor(
        private _route: ActivatedRoute,
        private _router: Router) {

        this._route.paramMap.subscribe((params: Params) => {
            this.resourceIri = ((!params.get('id')) ? this.resourceExamples[0].id : decodeURIComponent(params.get('id')));
        });

        this._router.events.subscribe((event) => {

            if (event instanceof NavigationStart) {
                // show loading indicator
                // console.log('NavigationStart', this.resourceIri);
            }

            if (event instanceof NavigationEnd) {
                // hide loading indicator
                this.loading = true;
                // console.log('NavigationEnd', this.resourceIri);
                this.loading = false;
            }

            if (event instanceof NavigationError) {
                // hide loading indicator

                // present error to user
                console.error(event.error);
            }
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    }

    openRes(id: string) {
        this._router.navigate(['/resource/' + encodeURIComponent(id)]);
    }

    deleteResource(id: string) {
        // this._resourceService.deleteResource(id, undefined, true);


    }
}
