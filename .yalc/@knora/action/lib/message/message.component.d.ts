import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusMsg } from '../../assets/i18n/statusMsg';
/**
 * @ignore
 * Data type for messages
 */
export declare class KuiMessageData {
    status: number;
    statusMsg?: string;
    statusText?: string;
    type?: string;
    route?: string;
    footnote?: string;
    errorInfo?: string;
    url?: string;
}
/**
 * Message component to handle notes, warning and error messages.
 * If you set the paramater `[short]="true"` it shows a smaller message. It can be used to give feedbacks in a form e.g. update process: show success or error message.
 *
 */
export declare class MessageComponent implements OnInit {
    private _router;
    private _location;
    private _activatedRoute;
    private _status;
    /**
     * Message type: KuiMessageData or ApiServiceError
     *
     * @param  {KuiMessageData | ApiServiceError} message This type needs at least a status number (0-511). In this case, or if type is ApiServiceError, it takes the default status messages from the list of HTTP status codes (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
     */
    message: KuiMessageData;
    /**
     * Show short message only: it can be used in form to show if a post was successfull or not.
     *
     * @param  {boolean} [short]
     */
    short?: boolean;
    /**
     * Show medium message: a message box without footnote and withou links.
     *
     * @param  {boolean} [medium]
     */
    medium?: boolean;
    statusMsg: any;
    isLoading: boolean;
    showLinks: boolean;
    disable: boolean;
    links: any;
    footnote: any;
    constructor(_router: Router, _location: Location, _activatedRoute: ActivatedRoute, _status: StatusMsg);
    ngOnInit(): void;
    setMessage(msg: KuiMessageData): KuiMessageData;
    goToLocation(route: string): void;
    closeMessage(): void;
}
