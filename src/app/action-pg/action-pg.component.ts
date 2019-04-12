import { Component, OnInit } from '@angular/core';
import { KuiMessageData } from '@knora/action';
import { ApiServiceError } from '@knora/core';

@Component({
  selector: 'kuip-action-pg',
  templateUrl: './action-pg.component.html',
  styleUrls: ['./action-pg.component.scss']
})
export class ActionPgComponent implements OnInit {
  shortMessage: KuiMessageData;

  noteMessage: KuiMessageData;
  warningMessage: KuiMessageData;
  errorMessage: ApiServiceError;

  constructor() {}

  ngOnInit() {
    // short message
    this.shortMessage = {
      status: 200,
      statusMsg: 'status message',
      statusText: 'status text',
      type: 'Note',
      footnote: 'Just a footnote'
    };

    // note
    this.noteMessage = {
      status: 200,
      statusMsg: 'status message',
      statusText: 'status text',
      type: 'Note',
      footnote: 'Just a footnote'
    };

    // warning
    this.warningMessage = {
      status: 300,
      statusMsg: 'status message',
      statusText: 'status text',
      type: 'Warning',
      footnote: 'Just a footnote'
    };

    // error message from API
    this.errorMessage = {
      status: 400,
      errorInfo:
        'Http failure response for http://0.0.0.0:3333/admin/projects/shortcode/001/members: 400 Bad Request',
      statusText: 'Bad Request',
      url: 'http://0.0.0.0:3333/admin/projects/shortcode/001/members'
    };
  }
}
