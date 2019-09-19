import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kuip-authentication-pg',
    templateUrl: './authentication-pg.component.html',
    styleUrls: ['./authentication-pg.component.scss']
})
export class AuthenticationPgComponent implements OnInit {

    resourceIri: string = 'http://rdfh.ch/0001/a-thing-with-text-values';

    constructor () { }

    ngOnInit() {
    }

    refresh(thing: any) {
        console.log(thing);
        if (thing === true) {
            window.location.reload();
        }
    }
}
