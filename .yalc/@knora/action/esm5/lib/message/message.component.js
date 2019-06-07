import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
// import defaultMsgs from '../../assets/i18n/statusMsg.json';
import { StatusMsg } from '../../assets/i18n/statusMsg';
/**
 * @ignore
 * Data type for messages
 */
var KuiMessageData = /** @class */ (function () {
    function KuiMessageData() {
    }
    return KuiMessageData;
}());
export { KuiMessageData };
/**
 * Message component to handle notes, warning and error messages.
 * If you set the paramater `[short]="true"` it shows a smaller message. It can be used to give feedbacks in a form e.g. update process: show success or error message.
 *
 */
var MessageComponent = /** @class */ (function () {
    function MessageComponent(_router, _location, _activatedRoute, _status) {
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
    MessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.statusMsg = this._status.default;
        if (!this.message) {
            this._activatedRoute.data.subscribe(function (data) {
                _this.message.status = data.status;
            });
        }
        this.message = this.setMessage(this.message);
        this.isLoading = false;
    };
    MessageComponent.prototype.setMessage = function (msg) {
        var tmpMsg = {};
        var s = msg.status === 0 ? 503 : msg.status;
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
    };
    MessageComponent.prototype.goToLocation = function (route) {
        if (route === '<--') {
            this._location.back();
        }
        else {
            this._router.navigate([route]);
        }
    };
    MessageComponent.prototype.closeMessage = function () {
        this.disable = !this.disable;
    };
    MessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-message',
                    template: "<mat-card *ngIf=\"!short\" class=\"fix-width kui-message\" [ngClass]=\"'kui-' + message?.type\">\n\n    <mat-card-subtitle class=\"message-subtitle\">\n        <span class=\"left\">{{message?.type | uppercase }} {{message?.status}} | {{message?.statusMsg}}</span>\n        <mat-icon class=\"right\">{{message?.type}}</mat-icon>\n    </mat-card-subtitle>\n\n    <mat-card-title class=\"message-title\" [innerHtml]=\"message?.statusText\"></mat-card-title>\n\n    <mat-card-content class=\"message-content\">\n        <mat-list *ngIf=\"message?.route\">\n            <mat-list-item>\n                <a [href]=\"message?.route\" target=\"_blank\">\n                    &rarr; {{message?.route}}\n                </a>\n            </mat-list-item>\n        </mat-list>\n\n        <mat-list *ngIf=\"showLinks\">\n            <p>{{links.title}}</p>\n            <mat-list-item *ngFor=\"let item of links.list\" class=\"link\" (click)=\"goToLocation(item.route)\">\n                <mat-icon mat-list-icon>{{item.icon}}</mat-icon>\n                <p mat-line>{{item.label}}</p>\n            </mat-list-item>\n        </mat-list>\n\n    </mat-card-content>\n\n    <mat-card-footer *ngIf=\"!medium\" class=\"message-footnote\" [innerHtml]=\"message?.footnote\"></mat-card-footer>\n\n</mat-card>\n\n<mat-card *ngIf=\"short && !disable\" class=\"fix-width kui-short-message\" [ngClass]=\"'kui-' + message?.type\">\n\n    <div class=\"kui-panel\">\n        <span class=\"kui-short-message-text\">\n            {{message?.statusText}}\n        </span>\n        <span class=\"fill-remaining-space\"></span>\n        <button mat-icon-button (click)=\"closeMessage()\">\n            <mat-icon>close</mat-icon>\n        </button>\n    </div>\n\n</mat-card>\n",
                    styles: [".kui-panel{display:flex;box-sizing:border-box;flex-direction:row;white-space:nowrap}.fill-remaining-space{flex-basis:auto;flex-grow:1;flex-shrink:1}.kui-error{background-color:rgba(244,67,54,.5)}.kui-warning{background-color:rgba(255,196,0,.5)}.kui-hint,.kui-note{background-color:rgba(0,105,92,.4)}.kui-error,.kui-hint,.kui-note,.kui-warning{margin:12px auto;max-width:640px}.kui-error .message-subtitle,.kui-hint .message-subtitle,.kui-note .message-subtitle,.kui-warning .message-subtitle{padding-bottom:12px}.kui-error .message-subtitle .left,.kui-hint .message-subtitle .left,.kui-note .message-subtitle .left,.kui-warning .message-subtitle .left{float:left;left:16px;position:absolute;text-align:left}.kui-error .message-subtitle .right,.kui-hint .message-subtitle .right,.kui-note .message-subtitle .right,.kui-warning .message-subtitle .right{float:right;right:16px;position:absolute;text-align:right}.kui-error .message-title,.kui-hint .message-title,.kui-note .message-title,.kui-warning .message-title{padding-top:12px}.kui-error .message-content,.kui-hint .message-content,.kui-note .message-content,.kui-warning .message-content{margin-bottom:48px;margin-top:48px}.kui-error .message-content .link,.kui-hint .message-content .link,.kui-note .message-content .link,.kui-warning .message-content .link{cursor:pointer}.kui-error .message-footnote,.kui-hint .message-footnote,.kui-note .message-footnote,.kui-warning .message-footnote{padding:24px}.kui-short-message .kui-short-message-text{font-weight:bolder;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    MessageComponent.ctorParameters = function () { return [
        { type: Router },
        { type: Location },
        { type: ActivatedRoute },
        { type: StatusMsg }
    ]; };
    MessageComponent.propDecorators = {
        message: [{ type: Input }],
        short: [{ type: Input }],
        medium: [{ type: Input }]
    };
    return MessageComponent;
}());
export { MessageComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvYWN0aW9uLyIsInNvdXJjZXMiOlsibGliL21lc3NhZ2UvbWVzc2FnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekQsOERBQThEO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV4RDs7O0dBR0c7QUFDSDtJQUFBO0lBU0EsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7O0FBRUQ7Ozs7R0FJRztBQUNIO0lBNEVJLDBCQUNZLE9BQWUsRUFDZixTQUFtQixFQUNuQixlQUErQixFQUMvQixPQUFrQjtRQUhsQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQTFFOUI7Ozs7V0FJRztRQUNNLFlBQU8sR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUV4RDs7OztXQUlHO1FBQ00sVUFBSyxHQUFhLEtBQUssQ0FBQztRQUVqQzs7OztXQUlHO1FBQ00sV0FBTSxHQUFhLEtBQUssQ0FBQztRQU9sQyxjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0Isa0JBQWtCO1FBQ2xCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekI7Ozs7O1dBS0c7UUFDSCxVQUFLLEdBQVE7WUFDVCxLQUFLLEVBQUUsMENBQTBDO1lBQ2pELElBQUksRUFBRTtnQkFDRjtvQkFDSSxLQUFLLEVBQUUs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QkFFMUM7Ozs7Z0JBN0J3QixNQUFNO2dCQUR0QixRQUFRO2dCQUNSLGNBQWM7Z0JBR2QsU0FBUzs7OzBCQWlDYixLQUFLO3dCQU9MLEtBQUs7eUJBT0wsS0FBSzs7SUFzS1YsdUJBQUM7Q0FBQSxBQS9MRCxJQStMQztTQTFMWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG4vLyBpbXBvcnQgZGVmYXVsdE1zZ3MgZnJvbSAnLi4vLi4vYXNzZXRzL2kxOG4vc3RhdHVzTXNnLmpzb24nO1xuaW1wb3J0IHsgU3RhdHVzTXNnIH0gZnJvbSAnLi4vLi4vYXNzZXRzL2kxOG4vc3RhdHVzTXNnJztcblxuLyoqXG4gKiBAaWdub3JlXG4gKiBEYXRhIHR5cGUgZm9yIG1lc3NhZ2VzXG4gKi9cbmV4cG9ydCBjbGFzcyBLdWlNZXNzYWdlRGF0YSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgc3RhdHVzTXNnPzogc3RyaW5nO1xuICAgIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICByb3V0ZT86IHN0cmluZztcbiAgICBmb290bm90ZT86IHN0cmluZztcbiAgICBlcnJvckluZm8/OiBzdHJpbmc7XG4gICAgdXJsPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIE1lc3NhZ2UgY29tcG9uZW50IHRvIGhhbmRsZSBub3Rlcywgd2FybmluZyBhbmQgZXJyb3IgbWVzc2FnZXMuXG4gKiBJZiB5b3Ugc2V0IHRoZSBwYXJhbWF0ZXIgYFtzaG9ydF09XCJ0cnVlXCJgIGl0IHNob3dzIGEgc21hbGxlciBtZXNzYWdlLiBJdCBjYW4gYmUgdXNlZCB0byBnaXZlIGZlZWRiYWNrcyBpbiBhIGZvcm0gZS5nLiB1cGRhdGUgcHJvY2Vzczogc2hvdyBzdWNjZXNzIG9yIGVycm9yIG1lc3NhZ2UuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1tZXNzYWdlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgdHlwZTogS3VpTWVzc2FnZURhdGEgb3IgQXBpU2VydmljZUVycm9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtLdWlNZXNzYWdlRGF0YSB8IEFwaVNlcnZpY2VFcnJvcn0gbWVzc2FnZSBUaGlzIHR5cGUgbmVlZHMgYXQgbGVhc3QgYSBzdGF0dXMgbnVtYmVyICgwLTUxMSkuIEluIHRoaXMgY2FzZSwgb3IgaWYgdHlwZSBpcyBBcGlTZXJ2aWNlRXJyb3IsIGl0IHRha2VzIHRoZSBkZWZhdWx0IHN0YXR1cyBtZXNzYWdlcyBmcm9tIHRoZSBsaXN0IG9mIEhUVFAgc3RhdHVzIGNvZGVzIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX0hUVFBfc3RhdHVzX2NvZGVzKVxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1lc3NhZ2U6IEt1aU1lc3NhZ2VEYXRhID0gbmV3IEt1aU1lc3NhZ2VEYXRhKCk7XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHNob3J0IG1lc3NhZ2Ugb25seTogaXQgY2FuIGJlIHVzZWQgaW4gZm9ybSB0byBzaG93IGlmIGEgcG9zdCB3YXMgc3VjY2Vzc2Z1bGwgb3Igbm90LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gW3Nob3J0XVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3J0PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogU2hvdyBtZWRpdW0gbWVzc2FnZTogYSBtZXNzYWdlIGJveCB3aXRob3V0IGZvb3Rub3RlIGFuZCB3aXRob3UgbGlua3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBbbWVkaXVtXVxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1lZGl1bT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vICAgIG1lc3NhZ2U6IE1lc3NhZ2VEYXRhO1xuXG4gICAgLy8gc3RhdHVzTXNnOiBhbnkgPSBkZWZhdWx0TXNncztcbiAgICBzdGF0dXNNc2c6IGFueTtcblxuICAgIGlzTG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBzaG93TGlua3M6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIGRpc2FibGUgbWVzc2FnZVxuICAgIGRpc2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qXG4gICAgICogQGlnbm9yZVxuICAgICAqIGRlZmF1bHQgbGluayBsaXN0LCB3aGljaCB3aWxsIGJlIHVzZWQgaW4gbWVzc2FnZSBjb250ZW50IHRvIGdpdmUgYSB1c2VyIHNvbWUgcG9zc2liaWxpdGllc1xuICAgICAqIHdoYXQgaGUgY2FuIGRvIGluIHRoZSBjYXNlIG9mIGFuIGVycm9yXG4gICAgICpcbiAgICAgKi9cbiAgICBsaW5rczogYW55ID0ge1xuICAgICAgICB0aXRsZTogJ1lvdSBoYXZlIHRoZSBmb2xsb3dpbmcgcG9zc2liaWxpdGllcyBub3cnLFxuICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdnbyB0byB0aGUgc3RhcnQgcGFnZScsXG4gICAgICAgICAgICAgICAgcm91dGU6ICcvJyxcbiAgICAgICAgICAgICAgICBpY29uOiAna2V5Ym9hcmRfYXJyb3dfcmlnaHQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAndHJ5IHRvIGxvZ2luJyxcbiAgICAgICAgICAgICAgICByb3V0ZTogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2tleWJvYXJkX2Fycm93X3JpZ2h0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2dvIGJhY2snLFxuICAgICAgICAgICAgICAgIHJvdXRlOiAnPC0tJyxcbiAgICAgICAgICAgICAgICBpY29uOiAna2V5Ym9hcmRfYXJyb3dfbGVmdCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBmb290bm90ZTogYW55ID0ge1xuICAgICAgICB0ZXh0OiAnSWYgeW91IHRoaW5rIGl0XFwncyBhIG1pc3Rha2UsIHBsZWFzZScsXG4gICAgICAgIHRlYW06IHtcbiAgICAgICAgICAgIGtub3JhOlxuICAgICAgICAgICAgICAgICc8YSBocmVmPVxcJ2h0dHBzOi8vZ2l0aHViLmNvbS9kaGxhYi1iYXNlbC9rbm9yYVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPiBpbmZvcm0gdGhlIEtub3JhIHRlYW0gPC9hPicsXG4gICAgICAgICAgICBzYWxzYWg6XG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XFwnaHR0cHM6Ly9naXRodWIuY29tL2RobGFiLWJhc2VsL3NhbHNhaFxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPiBpbmZvcm0gdGhlIFNhbHNhaCBkZXZlbG9wZXJzIDwvYT4nXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3N0YXR1czogU3RhdHVzTXNnXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnN0YXR1c01zZyA9IHRoaXMuX3N0YXR1cy5kZWZhdWx0O1xuXG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5kYXRhLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLnNldE1lc3NhZ2UodGhpcy5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIHNldE1lc3NhZ2UobXNnOiBLdWlNZXNzYWdlRGF0YSkge1xuICAgICAgICBjb25zdCB0bXBNc2c6IEt1aU1lc3NhZ2VEYXRhID0gPEt1aU1lc3NhZ2VEYXRhPnt9O1xuXG4gICAgICAgIGNvbnN0IHM6IG51bWJlciA9IG1zZy5zdGF0dXMgPT09IDAgPyA1MDMgOiBtc2cuc3RhdHVzO1xuXG4gICAgICAgIHRtcE1zZy5zdGF0dXMgPSBzO1xuICAgICAgICB0bXBNc2cucm91dGUgPSBtc2cucm91dGU7XG4gICAgICAgIHRtcE1zZy5zdGF0dXNNc2cgPSBtc2cuc3RhdHVzTXNnO1xuICAgICAgICB0bXBNc2cuc3RhdHVzVGV4dCA9IG1zZy5zdGF0dXNUZXh0O1xuICAgICAgICB0bXBNc2cucm91dGUgPSBtc2cucm91dGU7XG4gICAgICAgIHRtcE1zZy5mb290bm90ZSA9IG1zZy5mb290bm90ZTtcblxuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgcyA+IDAgJiYgcyA8IDMwMDpcbiAgICAgICAgICAgICAgICAvLyB0aGUgbWVzc2FnZSBpcyBhIG5vdGVcbiAgICAgICAgICAgICAgICB0bXBNc2cudHlwZSA9ICdub3RlJztcbiAgICAgICAgICAgICAgICB0bXBNc2cuc3RhdHVzTXNnID1cbiAgICAgICAgICAgICAgICAgICAgbXNnLnN0YXR1c01zZyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1zZy5zdGF0dXNNc2dcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5zdGF0dXNNc2dbc10ubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0bXBNc2cuc3RhdHVzVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgIG1zZy5zdGF0dXNUZXh0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbXNnLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5zdGF0dXNNc2dbc10uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoZSBtZXNzYWdlIGlzIGEgbm90ZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzID49IDMwMCAmJiBzIDwgNDAwOlxuICAgICAgICAgICAgICAgIC8vIHRoZSBtZXNzYWdlIGlzIGEgd2FybmluZ1xuICAgICAgICAgICAgICAgIHRtcE1zZy50eXBlID0gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNNc2cgPVxuICAgICAgICAgICAgICAgICAgICBtc2cuc3RhdHVzTXNnICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbXNnLnN0YXR1c01zZ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgbXNnLnN0YXR1c1RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtc2cuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndGhlIG1lc3NhZ2UgaXMgYSB3YXJuaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgcyA+PSA0MDAgJiYgcyA8IDUwMDpcbiAgICAgICAgICAgICAgICAvLyB0aGUgbWVzc2FnZSBpcyBhIGNsaWVudCBzaWRlIChhcHApIGVycm9yXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcigndGhlIG1lc3NhZ2UgaXMgYSBjbGllbnQgc2lkZSAoYXBwKSBlcnJvcicsIHMpO1xuICAgICAgICAgICAgICAgIHRtcE1zZy50eXBlID0gJ2Vycm9yJztcbiAgICAgICAgICAgICAgICB0bXBNc2cuc3RhdHVzTXNnID1cbiAgICAgICAgICAgICAgICAgICAgbXNnLnN0YXR1c01zZyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1zZy5zdGF0dXNNc2dcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5zdGF0dXNNc2dbc10ubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0bXBNc2cuc3RhdHVzVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgIG1zZy5zdGF0dXNUZXh0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbXNnLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5zdGF0dXNNc2dbc10uZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgdG1wTXNnLmZvb3Rub3RlID1cbiAgICAgICAgICAgICAgICAgICAgbXNnLmZvb3Rub3RlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbXNnLmZvb3Rub3RlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZm9vdG5vdGUudGV4dCArICcgJyArIHRoaXMuZm9vdG5vdGUudGVhbS5rbm9yYTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMaW5rcyA9ICF0aGlzLm1lZGl1bTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzID49IDUwMCAmJiBzIDwgNjAwOlxuICAgICAgICAgICAgICAgIC8vIHRoZSBtZXNzYWdlIGlzIGEgc2VydmVyIHNpZGUgKGFwaSkgZXJyb3JcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCd0aGUgbWVzc2FnZSBpcyBhIHNlcnZlciBzaWRlIChhcGkpIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgdG1wTXNnLnR5cGUgPSAnZXJyb3InO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNNc2cgPVxuICAgICAgICAgICAgICAgICAgICBtc2cuc3RhdHVzTXNnICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbXNnLnN0YXR1c01zZ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHRtcE1zZy5zdGF0dXNUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgbXNnLnN0YXR1c1RleHQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtc2cuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnN0YXR1c01zZ1tzXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICB0bXBNc2cuZm9vdG5vdGUgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3Rub3RlLnRleHQgKyAnICcgKyB0aGlzLmZvb3Rub3RlLnRlYW0ua25vcmE7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TGlua3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gbm8gZGVmYXVsdCBjb25maWd1cmF0aW9uP1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRtcE1zZztcbiAgICB9XG5cbiAgICBnb1RvTG9jYXRpb24ocm91dGU6IHN0cmluZykge1xuICAgICAgICBpZiAocm91dGUgPT09ICc8LS0nKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbi5iYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW3JvdXRlXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZU1lc3NhZ2UoKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSA9ICF0aGlzLmRpc2FibGU7XG4gICAgfVxufVxuIl19