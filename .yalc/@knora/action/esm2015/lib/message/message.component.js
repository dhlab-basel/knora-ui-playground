import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
// import defaultMsgs from '../../assets/i18n/statusMsg.json';
import { StatusMsg } from '../../assets/i18n/statusMsg';
/**
 * @ignore
 * Data type for messages
 */
export class KuiMessageData {
}
/**
 * Message component to handle notes, warning and error messages.
 * If you set the paramater `[short]="true"` it shows a smaller message. It can be used to give feedbacks in a form e.g. update process: show success or error message.
 *
 */
let MessageComponent = class MessageComponent {
    constructor(_router, _location, _activatedRoute, _status) {
        this._router = _router;
        this._location = _location;
        this._activatedRoute = _activatedRoute;
        this._status = _status;
        /**
         * Message type: KuiMessageData or ApiServiceError
         *
         * @param  {KuiMessageData | ApiServiceError} message This type needs at least a status number (0-511). In this case, or if type is ApiServiceError, it takes the default status messages from the list of HTTP status codes (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
         */
        this.message = new KuiMessageData();
        /**
         * Show short message only: it can be used in form to show if a post was successfull or not.
         *
         * @param  {boolean} [short]
         */
        this.short = false;
        /**
         * Show medium message: a message box without footnote and withou links.
         *
         * @param  {boolean} [medium]
         */
        this.medium = false;
        this.isLoading = true;
        this.showLinks = false;
        // disable message
        this.disable = false;
        /*
         * @ignore
         * default link list, which will be used in message content to give a user some possibilities
         * what he can do in the case of an error
         *
         */
        this.links = {
            title: 'You have the following possibilities now',
            list: [
                {
                    label: 'go to the start page',
                    route: '/',
                    icon: 'keyboard_arrow_right'
                },
                {
                    label: 'try to login',
                    route: '/login',
                    icon: 'keyboard_arrow_right'
                },
                {
                    label: 'go back',
                    route: '<--',
                    icon: 'keyboard_arrow_left'
                }
            ]
        };
        this.footnote = {
            text: 'If you think it\'s a mistake, please',
            team: {
                knora: '<a href=\'https://github.com/dhlab-basel/knora\' target=\'_blank\'> inform the Knora team </a>',
                salsah: '<a href=\'https://github.com/dhlab-basel/salsah\' target=\'_blank\'> inform the Salsah developers </a>'
            }
        };
    }
    ngOnInit() {
        this.statusMsg = this._status.default;
        if (!this.message) {
            this._activatedRoute.data.subscribe((data) => {
                this.message.status = data.status;
            });
        }
        this.message = this.setMessage(this.message);
        this.isLoading = false;
    }
    setMessage(msg) {
        const tmpMsg = {};
        const s = msg.status === 0 ? 503 : msg.status;
        tmpMsg.status = s;
        tmpMsg.route = msg.route;
        tmpMsg.statusMsg = msg.statusMsg;
        tmpMsg.statusText = msg.statusText;
        tmpMsg.route = msg.route;
        tmpMsg.footnote = msg.footnote;
        switch (true) {
            case s > 0 && s < 300:
                // the message is a note
                tmpMsg.type = 'note';
                tmpMsg.statusMsg =
                    msg.statusMsg !== undefined
                        ? msg.statusMsg
                        : this.statusMsg[s].message;
                tmpMsg.statusText =
                    msg.statusText !== undefined
                        ? msg.statusText
                        : this.statusMsg[s].description;
                // console.log('the message is a note');
                break;
            case s >= 300 && s < 400:
                // the message is a warning
                tmpMsg.type = 'warning';
                tmpMsg.statusMsg =
                    msg.statusMsg !== undefined
                        ? msg.statusMsg
                        : this.statusMsg[s].message;
                tmpMsg.statusText =
                    msg.statusText !== undefined
                        ? msg.statusText
                        : this.statusMsg[s].description;
                // console.log('the message is a warning');
                break;
            case s >= 400 && s < 500:
                // the message is a client side (app) error
                // console.error('the message is a client side (app) error', s);
                tmpMsg.type = 'error';
                tmpMsg.statusMsg =
                    msg.statusMsg !== undefined
                        ? msg.statusMsg
                        : this.statusMsg[s].message;
                tmpMsg.statusText =
                    msg.statusText !== undefined
                        ? msg.statusText
                        : this.statusMsg[s].description;
                tmpMsg.footnote =
                    msg.footnote !== undefined
                        ? msg.footnote
                        : this.footnote.text + ' ' + this.footnote.team.knora;
                this.showLinks = !this.medium;
                break;
            case s >= 500 && s < 600:
                // the message is a server side (api) error
                // console.error('the message is a server side (api) error');
                tmpMsg.type = 'error';
                tmpMsg.statusMsg =
                    msg.statusMsg !== undefined
                        ? msg.statusMsg
                        : this.statusMsg[s].message;
                tmpMsg.statusText =
                    msg.statusText !== undefined
                        ? msg.statusText
                        : this.statusMsg[s].description;
                tmpMsg.footnote =
                    this.footnote.text + ' ' + this.footnote.team.knora;
                this.showLinks = false;
                break;
            default:
                // no default configuration?
                break;
        }
        return tmpMsg;
    }
    goToLocation(route) {
        if (route === '<--') {
            this._location.back();
        }
        else {
            this._router.navigate([route]);
        }
    }
    closeMessage() {
        this.disable = !this.disable;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", KuiMessageData)
], MessageComponent.prototype, "message", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], MessageComponent.prototype, "short", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], MessageComponent.prototype, "medium", void 0);
MessageComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-message',
        template: "<mat-card *ngIf=\"!short\" class=\"fix-width kui-message\" [ngClass]=\"'kui-' + message?.type\">\n\n    <mat-card-subtitle class=\"message-subtitle\">\n        <span class=\"left\">{{message?.type | uppercase }} {{message?.status}} | {{message?.statusMsg}}</span>\n        <mat-icon class=\"right\">{{message?.type}}</mat-icon>\n    </mat-card-subtitle>\n\n    <mat-card-title class=\"message-title\" [innerHtml]=\"message?.statusText\"></mat-card-title>\n\n    <mat-card-content class=\"message-content\">\n        <mat-list *ngIf=\"message?.route\">\n            <mat-list-item>\n                <a [href]=\"message?.route\" target=\"_blank\">\n                    &rarr; {{message?.route}}\n                </a>\n            </mat-list-item>\n        </mat-list>\n\n        <mat-list *ngIf=\"showLinks\">\n            <p>{{links.title}}</p>\n            <mat-list-item *ngFor=\"let item of links.list\" class=\"link\" (click)=\"goToLocation(item.route)\">\n                <mat-icon mat-list-icon>{{item.icon}}</mat-icon>\n                <p mat-line>{{item.label}}</p>\n            </mat-list-item>\n        </mat-list>\n\n    </mat-card-content>\n\n    <mat-card-footer *ngIf=\"!medium\" class=\"message-footnote\" [innerHtml]=\"message?.footnote\"></mat-card-footer>\n\n</mat-card>\n\n<mat-card *ngIf=\"short && !disable\" class=\"fix-width kui-short-message\" [ngClass]=\"'kui-' + message?.type\">\n\n    <div class=\"kui-panel\">\n        <span class=\"kui-short-message-text\">\n            {{message?.statusText}}\n        </span>\n        <span class=\"fill-remaining-space\"></span>\n        <button mat-icon-button (click)=\"closeMessage()\">\n            <mat-icon>close</mat-icon>\n        </button>\n    </div>\n\n</mat-card>\n",
        styles: [".kui-panel{display:flex;box-sizing:border-box;flex-direction:row;white-space:nowrap}.fill-remaining-space{flex-basis:auto;flex-grow:1;flex-shrink:1}.kui-error{background-color:rgba(244,67,54,.5)}.kui-warning{background-color:rgba(255,196,0,.5)}.kui-hint,.kui-note{background-color:rgba(0,105,92,.4)}.kui-error,.kui-hint,.kui-note,.kui-warning{margin:12px auto;max-width:640px}.kui-error .message-subtitle,.kui-hint .message-subtitle,.kui-note .message-subtitle,.kui-warning .message-subtitle{padding-bottom:12px}.kui-error .message-subtitle .left,.kui-hint .message-subtitle .left,.kui-note .message-subtitle .left,.kui-warning .message-subtitle .left{float:left;left:16px;position:absolute;text-align:left}.kui-error .message-subtitle .right,.kui-hint .message-subtitle .right,.kui-note .message-subtitle .right,.kui-warning .message-subtitle .right{float:right;right:16px;position:absolute;text-align:right}.kui-error .message-title,.kui-hint .message-title,.kui-note .message-title,.kui-warning .message-title{padding-top:12px}.kui-error .message-content,.kui-hint .message-content,.kui-note .message-content,.kui-warning .message-content{margin-bottom:48px;margin-top:48px}.kui-error .message-content .link,.kui-hint .message-content .link,.kui-note .message-content .link,.kui-warning .message-content .link{cursor:pointer}.kui-error .message-footnote,.kui-hint .message-footnote,.kui-note .message-footnote,.kui-warning .message-footnote{padding:24px}.kui-short-message .kui-short-message-text{font-weight:bolder;text-align:center}@media (max-width:576px){.kui-panel{white-space:normal}.kui-short-message .kui-short-message-text{text-align:left}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        Location,
        ActivatedRoute,
        StatusMsg])
], MessageComponent);
export { MessageComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvYWN0aW9uLyIsInNvdXJjZXMiOlsibGliL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpELDhEQUE4RDtBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFeEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7Q0FTMUI7QUFFRDs7OztHQUlHO0FBTUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUF1RXpCLFlBQ1ksT0FBZSxFQUNmLFNBQW1CLEVBQ25CLGVBQStCLEVBQy9CLE9BQWtCO1FBSGxCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBMUU5Qjs7OztXQUlHO1FBQ00sWUFBTyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBRXhEOzs7O1dBSUc7UUFDTSxVQUFLLEdBQWEsS0FBSyxDQUFDO1FBRWpDOzs7O1dBSUc7UUFDTSxXQUFNLEdBQWEsS0FBSyxDQUFDO1FBT2xDLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixrQkFBa0I7UUFDbEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6Qjs7Ozs7V0FLRztRQUNILFVBQUssR0FBUTtZQUNULEtBQUssRUFBRSwwQ0FBMEM7WUFDakQsSUFBSSxFQUFFO2dCQUNGO29CQUNJLEtBQUss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QjtBQU94QjtJQUFSLEtBQUssRUFBRTs7Z0RBQTBCO0FBcEJ6QixnQkFBZ0I7SUFMNUIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGFBQWE7UUFDdkIsMnREQUF1Qzs7S0FFMUMsQ0FBQzs2Q0F5RXVCLE1BQU07UUFDSixRQUFRO1FBQ0YsY0FBYztRQUN0QixTQUFTO0dBM0VyQixnQkFBZ0IsQ0EwTDVCO1NBMUxZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbi8vIGltcG9ydCBkZWZhdWx0TXNncyBmcm9tICcuLi8uLi9hc3NldHMvaTE4bi9zdGF0dXNNc2cuanNvbic7XG5pbXBvcnQgeyBTdGF0dXNNc2cgfSBmcm9tICcuLi8uLi9hc3NldHMvaTE4bi9zdGF0dXNNc2cnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqIERhdGEgdHlwZSBmb3IgbWVzc2FnZXNcbiAqL1xuZXhwb3J0IGNsYXNzIEt1aU1lc3NhZ2VEYXRhIHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBzdGF0dXNNc2c/OiBzdHJpbmc7XG4gICAgc3RhdHVzVGV4dD86IHN0cmluZztcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIHJvdXRlPzogc3RyaW5nO1xuICAgIGZvb3Rub3RlPzogc3RyaW5nO1xuICAgIGVycm9ySW5mbz86IHN0cmluZztcbiAgICB1cmw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogTWVzc2FnZSBjb21wb25lbnQgdG8gaGFuZGxlIG5vdGVzLCB3YXJuaW5nIGFuZCBlcnJvciBtZXNzYWdlcy5cbiAqIElmIHlvdSBzZXQgdGhlIHBhcmFtYXRlciBgW3Nob3J0XT1cInRydWVcImAgaXQgc2hvd3MgYSBzbWFsbGVyIG1lc3NhZ2UuIEl0IGNhbiBiZSB1c2VkIHRvIGdpdmUgZmVlZGJhY2tzIGluIGEgZm9ybSBlLmcuIHVwZGF0ZSBwcm9jZXNzOiBzaG93IHN1Y2Nlc3Mgb3IgZXJyb3IgbWVzc2FnZS5cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tZXNzYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tZXNzYWdlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqXG4gICAgICogTWVzc2FnZSB0eXBlOiBLdWlNZXNzYWdlRGF0YSBvciBBcGlTZXJ2aWNlRXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0t1aU1lc3NhZ2VEYXRhIHwgQXBpU2VydmljZUVycm9yfSBtZXNzYWdlIFRoaXMgdHlwZSBuZWVkcyBhdCBsZWFzdCBhIHN0YXR1cyBudW1iZXIgKDAtNTExKS4gSW4gdGhpcyBjYXNlLCBvciBpZiB0eXBlIGlzIEFwaVNlcnZpY2VFcnJvciwgaXQgdGFrZXMgdGhlIGRlZmF1bHQgc3RhdHVzIG1lc3NhZ2VzIGZyb20gdGhlIGxpc3Qgb2YgSFRUUCBzdGF0dXMgY29kZXMgKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpc3Rfb2ZfSFRUUF9zdGF0dXNfY29kZXMpXG4gICAgICovXG4gICAgQElucHV0KCkgbWVzc2FnZTogS3VpTWVzc2FnZURhdGEgPSBuZXcgS3VpTWVzc2FnZURhdGEoKTtcblxuICAgIC8qKlxuICAgICAqIFNob3cgc2hvcnQgbWVzc2FnZSBvbmx5OiBpdCBjYW4gYmUgdXNlZCBpbiBmb3JtIHRvIHNob3cgaWYgYSBwb3N0IHdhcyBzdWNjZXNzZnVsbCBvciBub3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBbc2hvcnRdXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvcnQ/OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBTaG93IG1lZGl1bSBtZXNzYWdlOiBhIG1lc3NhZ2UgYm94IHdpdGhvdXQgZm9vdG5vdGUgYW5kIHdpdGhvdSBsaW5rcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IFttZWRpdW1dXG4gICAgICovXG4gICAgQElucHV0KCkgbWVkaXVtPzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gICAgbWVzc2FnZTogTWVzc2FnZURhdGE7XG5cbiAgICAvLyBzdGF0dXNNc2c6IGFueSA9IGRlZmF1bHRNc2dzO1xuICAgIHN0YXR1c01zZzogYW55O1xuXG4gICAgaXNMb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHNob3dMaW5rczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gZGlzYWJsZSBtZXNzYWdlXG4gICAgZGlzYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgKiBAaWdub3JlXG4gICAgICogZGVmYXVsdCBsaW5rIGxpc3QsIHdoaWNoIHdpbGwgYmUgdXNlZCBpbiBtZXNzYWdlIGNvbnRlbnQgdG8gZ2l2ZSBhIHVzZXIgc29tZSBwb3NzaWJpbGl0aWVzXG4gICAgICogd2hhdCBoZSBjYW4gZG8gaW4gdGhlIGNhc2Ugb2YgYW4gZXJyb3JcbiAgICAgKlxuICAgICAqL1xuICAgIGxpbmtzOiBhbnkgPSB7XG4gICAgICAgIHRpdGxlOiAnWW91IGhhdmUgdGhlIGZvbGxvd2luZyBwb3NzaWJpbGl0aWVzIG5vdycsXG4gICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2dvIHRvIHRoZSBzdGFydCBwYWdlJyxcbiAgICAgICAgICAgICAgICByb3V0ZTogJy8nLFxuICAgICAgICAgICAgICAgIGljb246ICdrZXlib2FyZF9hcnJvd19yaWdodCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0cnkgdG8gbG9naW4nLFxuICAgICAgICAgICAgICAgIHJvdXRlOiAnL2xvZ2luJyxcbiAgICAgICAgICAgICAgICBpY29uOiAna2V5Ym9hcmRfYXJyb3dfcmlnaHQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnZ28gYmFjaycsXG4gICAgICAgICAgICAgICAgcm91dGU6ICc8LS0nLFxuICAgICAgICAgICAgICAgIGljb246ICdrZXlib2FyZF9hcnJvd19sZWZ0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGZvb3Rub3RlOiBhbnkgPSB7XG4gICAgICAgIHRleHQ6ICdJZiB5b3UgdGhpbmsgaXRcXCdzIGEgbWlzdGFrZSwgcGxlYXNlJyxcbiAgICAgICAgdGVhbToge1xuICAgICAgICAgICAga25vcmE6XG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XFwnaHR0cHM6Ly9naXRodWIuY29tL2RobGFiLWJhc2VsL2tub3JhXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+IGluZm9ybSB0aGUgS25vcmEgdGVhbSA8L2E+JyxcbiAgICAgICAgICAgIHNhbHNhaDpcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cXCdodHRwczovL2dpdGh1Yi5jb20vZGhsYWItYmFzZWwvc2Fsc2FoXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+IGluZm9ybSB0aGUgU2Fsc2FoIGRldmVsb3BlcnMgPC9hPidcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIF9sb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfc3RhdHVzOiBTdGF0dXNNc2dcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzTXNnID0gdGhpcy5fc3RhdHVzLmRlZmF1bHQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlLmRhdGEuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2Uuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuc2V0TWVzc2FnZSh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgc2V0TWVzc2FnZShtc2c6IEt1aU1lc3NhZ2VEYXRhKSB7XG4gICAgICAgIGNvbnN0IHRtcE1zZzogS3VpTWVzc2FnZURhdGEgPSA8S3VpTWVzc2FnZURhdGE+e307XG5cbiAgICAgICAgY29uc3QgczogbnVtYmVyID0gbXNnLnN0YXR1cyA9PT0gMCA/IDUwMyA6IG1zZy5zdGF0dXM7XG5cbiAgICAgICAgdG1wTXNnLnN0YXR1cyA9IHM7XG4gICAgICAgIHRtcE1zZy5yb3V0ZSA9IG1zZy5yb3V0ZTtcbiAgICAgICAgdG1wTXNnLnN0YXR1c01zZyA9IG1zZy5zdGF0dXNNc2c7XG4gICAgICAgIHRtcE1zZy5zdGF0dXNUZXh0ID0gbXNnLnN0YXR1c1RleHQ7XG4gICAgICAgIHRtcE1zZy5yb3V0ZSA9IG1zZy5yb3V0ZTtcbiAgICAgICAgdG1wTXNnLmZvb3Rub3RlID0gbXNnLmZvb3Rub3RlO1xuXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgICAgY2FzZSBzID4gMCAmJiBzIDwgMzAwOlxuICAgICAgICAgICAgICAgIC8vIHRoZSBtZXNzYWdlIGlzIGEgbm90ZVxuICAgICAgICAgICAgICAgIHRtcE1zZy50eXBlID0gJ25vdGUnO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNNc2cgPVxuICAgICAgICAgICAgICAgICAgICBtc2cuc3RhdHVzTXNnICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbXNnLnN0YXR1c01zZ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgbXNnLnN0YXR1c1RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtc2cuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndGhlIG1lc3NhZ2UgaXMgYSBub3RlJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHMgPj0gMzAwICYmIHMgPCA0MDA6XG4gICAgICAgICAgICAgICAgLy8gdGhlIG1lc3NhZ2UgaXMgYSB3YXJuaW5nXG4gICAgICAgICAgICAgICAgdG1wTXNnLnR5cGUgPSAnd2FybmluZyc7XG4gICAgICAgICAgICAgICAgdG1wTXNnLnN0YXR1c01zZyA9XG4gICAgICAgICAgICAgICAgICAgIG1zZy5zdGF0dXNNc2cgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtc2cuc3RhdHVzTXNnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc3RhdHVzTXNnW3NdLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgdG1wTXNnLnN0YXR1c1RleHQgPVxuICAgICAgICAgICAgICAgICAgICBtc2cuc3RhdHVzVGV4dCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1zZy5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc3RhdHVzTXNnW3NdLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGUgbWVzc2FnZSBpcyBhIHdhcm5pbmcnKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzID49IDQwMCAmJiBzIDwgNTAwOlxuICAgICAgICAgICAgICAgIC8vIHRoZSBtZXNzYWdlIGlzIGEgY2xpZW50IHNpZGUgKGFwcCkgZXJyb3JcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCd0aGUgbWVzc2FnZSBpcyBhIGNsaWVudCBzaWRlIChhcHApIGVycm9yJywgcyk7XG4gICAgICAgICAgICAgICAgdG1wTXNnLnR5cGUgPSAnZXJyb3InO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNNc2cgPVxuICAgICAgICAgICAgICAgICAgICBtc2cuc3RhdHVzTXNnICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbXNnLnN0YXR1c01zZ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgbXNnLnN0YXR1c1RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtc2cuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB0bXBNc2cuZm9vdG5vdGUgPVxuICAgICAgICAgICAgICAgICAgICBtc2cuZm9vdG5vdGUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtc2cuZm9vdG5vdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5mb290bm90ZS50ZXh0ICsgJyAnICsgdGhpcy5mb290bm90ZS50ZWFtLmtub3JhO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xpbmtzID0gIXRoaXMubWVkaXVtO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHMgPj0gNTAwICYmIHMgPCA2MDA6XG4gICAgICAgICAgICAgICAgLy8gdGhlIG1lc3NhZ2UgaXMgYSBzZXJ2ZXIgc2lkZSAoYXBpKSBlcnJvclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ3RoZSBtZXNzYWdlIGlzIGEgc2VydmVyIHNpZGUgKGFwaSkgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB0bXBNc2cudHlwZSA9ICdlcnJvcic7XG4gICAgICAgICAgICAgICAgdG1wTXNnLnN0YXR1c01zZyA9XG4gICAgICAgICAgICAgICAgICAgIG1zZy5zdGF0dXNNc2cgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtc2cuc3RhdHVzTXNnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc3RhdHVzTXNnW3NdLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgdG1wTXNnLnN0YXR1c1RleHQgPVxuICAgICAgICAgICAgICAgICAgICBtc2cuc3RhdHVzVGV4dCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1zZy5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc3RhdHVzTXNnW3NdLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5mb290bm90ZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdG5vdGUudGV4dCArICcgJyArIHRoaXMuZm9vdG5vdGUudGVhbS5rbm9yYTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMaW5rcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBubyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24/XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG1wTXNnO1xuICAgIH1cblxuICAgIGdvVG9Mb2NhdGlvbihyb3V0ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChyb3V0ZSA9PT0gJzwtLScpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uLmJhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbcm91dGVdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlTWVzc2FnZSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlID0gIXRoaXMuZGlzYWJsZTtcbiAgICB9XG59XG4iXX0=