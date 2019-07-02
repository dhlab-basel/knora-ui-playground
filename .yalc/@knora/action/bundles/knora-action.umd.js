(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router'), require('ts-md5'), require('@knora/core'), require('@angular/forms'), require('jdnconvertiblecalendardateadapter'), require('@angular/material/core'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/icon'), require('@angular/material/list'), require('@angular/material/menu'), require('@angular/platform-browser/animations'), require('@angular/material/dialog')) :
    typeof define === 'function' && define.amd ? define('@knora/action', ['exports', '@angular/core', '@angular/common', '@angular/router', 'ts-md5', '@knora/core', '@angular/forms', 'jdnconvertiblecalendardateadapter', '@angular/material/core', '@angular/material/button', '@angular/material/card', '@angular/material/icon', '@angular/material/list', '@angular/material/menu', '@angular/platform-browser/animations', '@angular/material/dialog'], factory) :
    (global = global || self, factory((global.knora = global.knora || {}, global.knora.action = {}), global.ng.core, global.ng.common, global.ng.router, global.tsMd5, global['@knora/core'], global.ng.forms, global.jdnconvertiblecalendardateadapter, global.ng.material.core, global.ng.material.button, global.ng.material.card, global.ng.material.icon, global.ng.material.list, global.ng.material.menu, global.ng.platformBrowser.animations, global.ng.material.dialog));
}(this, function (exports, core, common, router, tsMd5, core$1, forms, jdnconvertiblecalendardateadapter, core$2, button, card, icon, list, menu, animations, dialog) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * The progress indicator can be used to show the status of loading something.
     * This can be the simple loader or in case of submitting data it can show the status (not ready, loading, done or error).
     *
     */
    var ProgressIndicatorComponent = /** @class */ (function () {
        /**
         * @ignore
         */
        function ProgressIndicatorComponent() {
            /**
             * @param {string} [color=primary]
             *
             * Parameter to customize the appearance of the loader.
             * Hexadecimal color value e.g. #00ff00 or similar color values 'red', 'green' etc.
             */
            this.color = 'primary';
        }
        ProgressIndicatorComponent.prototype.ngOnInit = function () {
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], ProgressIndicatorComponent.prototype, "status", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ProgressIndicatorComponent.prototype, "color", void 0);
        ProgressIndicatorComponent = __decorate([
            core.Component({
                selector: 'kui-progress-indicator',
                template: "<!-- this is the progress indicator for forms -->\n<div class=\"kui-progress-indicator submit\" *ngIf=\"status !== undefined; else isLoading\">\n    <!-- spinner while on load / on submit -->\n    <div class=\"on-submit\" *ngIf=\"status === 0\">\n        <div class=\"spinner\" [style.border-top-color]=\"color\" [style.border-left-color]=\"color\"></div>\n    </div>\n\n    <div>\n        <!-- bullet point before submit -->\n        <mat-icon *ngIf=\"status === -1\" class=\"before-submit\">keyboard_arrow_right</mat-icon>\n        <!-- icon 'check' when done -->\n        <mat-icon *ngIf=\"status === 1\" class=\"after-submit\" [style.color]=\"color\">done</mat-icon>\n        <!-- in case of an error -->\n        <mat-icon *ngIf=\"status === 400\" class=\"submit-error\">not_interested</mat-icon>\n    </div>\n\n</div>\n\n<!-- default case: is loading -->\n<ng-template #isLoading>\n    <div class=\"kui-progress-indicator default\">\n        <div class=\"line\">\n            <div class=\"bounce1\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce2\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce3\" [style.background-color]=\"color\"></div>\n        </div>\n        <div class=\"line\">\n            <div class=\"bounce3\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce1\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce2\" [style.background-color]=\"color\"></div>\n        </div>\n    </div>\n</ng-template>\n\n\n<!-- another variety of isLoading (in one line) -->\n<!--\n<div class=\"loading-progress-indicator\">\n    <span class=\"text\">{{text}}</span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n</div>\n-->\n",
                styles: [".kui-progress-indicator.default{height:56px;margin-left:auto;margin-right:auto;padding:24px 36px;top:60px;width:96px}.kui-progress-indicator.default.page-center{left:50%;position:absolute;top:39%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.kui-progress-indicator.default h1,.kui-progress-indicator.default h2,.kui-progress-indicator.default h3,.kui-progress-indicator.default p{color:#555;text-align:center}.kui-progress-indicator.default .line{margin:0 auto;text-align:center;width:70px}.kui-progress-indicator.default .line>div{-webkit-animation:1.4s ease-in-out infinite both bounce-keyframes;animation:1.4s ease-in-out infinite both bounce-keyframes;background-color:#00695c;border-radius:6px;display:inline-block;height:18px;width:18px}.kui-progress-indicator.default .line .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.kui-progress-indicator.default .line .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes bounce-keyframes{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes bounce-keyframes{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.kui-progress-indicator.submit{height:32px;width:32px}.kui-progress-indicator.submit .on-submit{-webkit-animation:.7s linear infinite spinner-keyframes;animation:.7s linear infinite spinner-keyframes;height:32px;width:32px}.kui-progress-indicator.submit .on-submit .spinner{border:2px solid #00695c;border-bottom-color:transparent;border-radius:50%;border-right-color:transparent;height:28px;width:28px}.kui-progress-indicator.submit .before-submit{color:rgba(128,128,128,.8)}.kui-progress-indicator.submit .after-submit{color:#00695c}.kui-progress-indicator.submit .submit-error{color:#f44336}@-webkit-keyframes spinner-keyframes{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-keyframes{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.loading-progress-indicator{text-align:center;width:100%}.loading-progress-indicator .text{color:#00695c;font-size:12pt}.loading-progress-indicator .dot{-webkit-animation:1.4s ease-in-out infinite dot-keyframes;animation:1.4s ease-in-out infinite dot-keyframes;background-color:#00695c;border-radius:2px;display:inline-block;height:6px;margin:3px 6px 2px;width:6px}.loading-progress-indicator .dot:nth-child(2){-webkit-animation-delay:.16s;animation-delay:.16s}.loading-progress-indicator .dot:nth-child(3){-webkit-animation-delay:.32s;animation-delay:.32s}.loading-progress-indicator .dot:nth-child(4){-webkit-animation-delay:.48s;animation-delay:.48s}.loading-progress-indicator .dot:nth-child(5){-webkit-animation-delay:.64s;animation-delay:.64s}.loading-progress-indicator .dot:nth-child(6){-webkit-animation-delay:.8s;animation-delay:.8s}@-webkit-keyframes dot-keyframes{0%,100%{opacity:.4;-webkit-transform:scale(1,1);transform:scale(1,1)}50%{opacity:1;-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}}@keyframes dot-keyframes{0%,100%{opacity:.4;-webkit-transform:scale(1,1);transform:scale(1,1)}50%{opacity:1;-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}}"]
            }),
            __metadata("design:paramtypes", [])
        ], ProgressIndicatorComponent);
        return ProgressIndicatorComponent;
    }());

    /**
     * A component with a list of properties to sort a list by one of them.
     * It can be used together with the KuiSortBy pipe.
     */
    var SortButtonComponent = /** @class */ (function () {
        function SortButtonComponent() {
            /**
             * @ignore {string} sortKeyChange
             * @emits TODO: this would be the correct syntax for Output eventEmitter
             *
             * EventEmitter when a user selected a sort property;
             * This is the selected key
             */
            this.sortKeyChange = new core.EventEmitter();
            this.menuXPos = 'after';
            /**
             * @param {string} [position='left']
             * Optional position of the sort menu: right or left
             */
            this.position = 'left';
            /**
             * @param  {string} [icon='sort']
             * Default icon is "sort" from material design.
             * But you can replace it with another one
             * e.g. sort_by_alpha
             */
            this.icon = 'sort';
        }
        /**
         * @param {string} sortKey
         * set and get (two-way data binding) of current sort key
         */
        SortButtonComponent.prototype.sortKey = function (sortKey) {
            this.activeKey = sortKey;
        };
        SortButtonComponent.prototype.ngOnInit = function () {
            if (this.position === 'right') {
                this.menuXPos = 'before';
            }
        };
        /**
         * @ignore
         *
         * @param {string} key
         */
        SortButtonComponent.prototype.sortBy = function (key) {
            this.sortKeyChange.emit(key);
        };
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], SortButtonComponent.prototype, "sortKeyChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], SortButtonComponent.prototype, "sortProps", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SortButtonComponent.prototype, "position", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SortButtonComponent.prototype, "icon", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String]),
            __metadata("design:returntype", void 0)
        ], SortButtonComponent.prototype, "sortKey", null);
        SortButtonComponent = __decorate([
            core.Component({
                selector: 'kui-sort-button',
                template: "<span class=\"sort-button\" [class]=\"position + ' ' + icon\">\n    <button mat-icon-button [matMenuTriggerFor]=\"sortSelection\">\n        <mat-icon>{{icon}}</mat-icon>\n    </button>\n    <mat-menu #sortSelection=\"matMenu\" [xPosition]=\"menuXPos\">\n        <button mat-menu-item\n                *ngFor=\"let item of sortProps\"\n                (click)=\"sortBy(item.key)\"\n                [class.active]=\"activeKey === item.key\">\n            {{item.label}}\n        </button>\n    </mat-menu>\n</span>\n",
                styles: [".active{background:rgba(128,128,128,.8)}.right.sort{float:right}.right.sort .mat-icon{-webkit-transform:scale(-1,1);transform:scale(-1,1)}"]
            }),
            __metadata("design:paramtypes", [])
        ], SortButtonComponent);
        return SortButtonComponent;
    }());

    var StatusMsg = /** @class */ (function () {
        function StatusMsg() {
            this.default = {
                '100': {
                    'message': 'Continue',
                    'description': 'The server has received the request headers, and the client should proceed to send the request body'
                },
                '101': {
                    'message': 'Switching Protocols',
                    'description': 'The requester has asked the server to switch protocols'
                },
                '103': {
                    'message': 'Checkpoint',
                    'description': 'Used in the resumable requests proposal to resume aborted PUT or POST requests'
                },
                '200': {
                    'message': 'OK',
                    'description': 'The request is OK (this is the standard response for successful HTTP requests)'
                },
                '201': {
                    'message': 'Created',
                    'description': 'The request has been fulfilled, and a new resource is created'
                },
                '202': {
                    'message': 'Accepted',
                    'description': 'The request has been accepted for processing, but the processing has not been completed'
                },
                '203': {
                    'message': 'Non-Authoritative Information',
                    'description': 'The request has been successfully processed, but is returning information that may be from another source'
                },
                '204': {
                    'message': 'No Content',
                    'description': 'The request has been successfully processed, but is not returning any content'
                },
                '205': {
                    'message': 'Reset Content',
                    'description': 'The request has been successfully processed, but is not returning any content, and requires that the requester reset the document view'
                },
                '206': {
                    'message': 'Partial Content',
                    'description': 'The server is delivering only part of the resource due to a range header sent by the client'
                },
                '300': {
                    'message': 'Multiple Choices',
                    'description': 'A link list. The user can select a link and go to that location. Maximum five addresses'
                },
                '301': {
                    'message': 'Moved Permanently',
                    'description': 'The requested page has moved to a new URL'
                },
                '302': {
                    'message': 'Found',
                    'description': 'The requested page has moved temporarily to a new URL'
                },
                '303': {
                    'message': 'See Other',
                    'description': 'The requested page can be found under a different URL'
                },
                '304': {
                    'message': 'Not Modified',
                    'description': 'Indicates the requested page has not been modified since last requested'
                },
                '306': {
                    'message': 'Switch Proxy',
                    'description': '-- No longer used --'
                },
                '307': {
                    'message': 'Temporary Redirect',
                    'description': 'The requested page has moved temporarily to a new URL'
                },
                '308': {
                    'message': 'Resume Incomplete',
                    'description': 'Used in the resumable requests proposal to resume aborted PUT or POST requests'
                },
                '400': {
                    'message': 'Bad Request',
                    'description': 'The request cannot be fulfilled due to bad syntax'
                },
                '401': {
                    'message': 'Unauthorized',
                    'description': 'The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided'
                },
                '402': {
                    'message': 'Payment Required',
                    'description': '-- Reserved for future use --'
                },
                '403': {
                    'message': 'Forbidden',
                    'description': 'The request was a legal request, but the server is refusing to respond to it'
                },
                '404': {
                    'message': 'Not Found',
                    'description': 'The requested page could not be found but may be available again in the future'
                },
                '405': {
                    'message': 'Method Not Allowed',
                    'description': 'A request was made of a page using a request method not supported by that page'
                },
                '406': {
                    'message': 'Not Acceptable',
                    'description': 'The server can only generate a response that is not accepted by the client'
                },
                '407': {
                    'message': 'Proxy Authentication Required',
                    'description': 'The client must first authenticate itself with the proxy'
                },
                '408': {
                    'message': 'Request Timeout',
                    'description': 'The server timed out waiting for the request'
                },
                '409': {
                    'message': 'Conflict',
                    'description': 'The request could not be completed because of a conflict in the request'
                },
                '410': {
                    'message': 'Gone',
                    'description': 'The requested page is no longer available'
                },
                '411': {
                    'message': 'Length Required',
                    'description': 'The "Content-Length" is not defined. The server will not accept the request without it'
                },
                '412': {
                    'message': 'Precondition Failed',
                    'description': 'The precondition given in the request evaluated to false by the server'
                },
                '413': {
                    'message': 'Request Entity Too Large',
                    'description': 'The server will not accept the request, because the request entity is too large'
                },
                '414': {
                    'message': 'Request-URI Too Long',
                    'description': 'The server will not accept the request, because the URL is too long. Occurs when you convert a POST request to a GET request with a long query information'
                },
                '415': {
                    'message': 'Unsupported Media Type',
                    'description': 'The server will not accept the request, because the media type is not supported'
                },
                '416': {
                    'message': 'Requested Range Not Satisfiable',
                    'description': 'The client has asked for a portion of the file, but the server cannot supply that portion'
                },
                '417': {
                    'message': 'Expectation Failed',
                    'description': 'The server cannot meet the requirements of the Expect request-header field'
                },
                '418': {
                    'message': 'I\'m a teapot',
                    'description': 'Any attempt to brew coffee with a teapot should result in the error code "418 I\'m a teapot". The resulting entity body MAY be short and stout'
                },
                '421': {
                    'message': 'Misdirected Request',
                    'description': 'The request was directed at a server that is not able to produce a response (for example because a connection reuse)'
                },
                '422': {
                    'message': 'Unprocessable Entity',
                    'description': 'The request was well-formed but was unable to be followed due to semantic errors'
                },
                '423': {
                    'message': 'Locked',
                    'description': 'The resource that is being accessed is locked'
                },
                '424': {
                    'message': 'Failed Dependency',
                    'description': 'The request failed due to failure of a previous request (e.g., a PROPPATCH)'
                },
                '426': {
                    'message': 'Upgrade Required',
                    'description': 'The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field'
                },
                '428': {
                    'message': 'Precondition Required',
                    'description': 'The origin server requires the request to be conditional'
                },
                '429': {
                    'message': 'Too Many Requests',
                    'description': 'The user has sent too many requests in a given amount of time. Intended for use with rate limiting schemes'
                },
                '431': {
                    'message': 'Request Header Fields Too Large',
                    'description': 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large'
                },
                '451': {
                    'message': 'Unavailable For Legal Reasons',
                    'description': 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource'
                },
                '500': {
                    'message': 'Internal Server Error',
                    'description': 'An error has occured in a server side script, a no more specific message is suitable'
                },
                '501': {
                    'message': 'Not Implemented',
                    'description': 'The server either does not recognize the request method, or it lacks the ability to fulfill the request'
                },
                '502': {
                    'message': 'Bad Gateway',
                    'description': 'The server was acting as a gateway or proxy and received an invalid response from the upstream server'
                },
                '503': {
                    'message': 'Service Unavailable',
                    'description': 'The server is currently unavailable (overloaded or down)'
                },
                '504': {
                    'message': 'Gateway Timeout',
                    'description': 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server'
                },
                '505': {
                    'message': 'HTTP Version Not Supported',
                    'description': 'The server does not support the HTTP protocol version used in the request'
                },
                '511': {
                    'message': 'Network Authentication Required',
                    'description': 'The client needs to authenticate to gain network access'
                },
                'info': {
                    'lastUpdate': {
                        'date': '20160411',
                        'log': '4xx Codes updated via Wikipedia'
                    },
                    'references': {
                        'W3Schools': 'http://www.w3schools.com/tags/ref_httpmessages.asp',
                        'Wikipedia': 'https://en.wikipedia.org/wiki/List_of_HTTP_status_codes'
                    },
                    'codeLookup': {
                        'info': 'Use the \'code\' variable in the url to lookup and individual code',
                        'demoURL': '/statusMsg/?code=500'
                    },
                    'htmlDisplay': {
                        'info': 'Add the \'html\' variable to your code lookup to get the error displayed in a nice html template',
                        'demoURL': '/statusMsg/?code=404&html'
                    },
                    'invalidCode': 'If an invalid code is given, the site will just show the json list of all codes',
                    'credits': 'This site was crafted by Unreal Designs and is powered by UDCDN'
                },
                '1xx': {
                    'message': 'Information',
                    'description': ''
                },
                '2xx': {
                    'message': 'Successful',
                    'description': ''
                },
                '3xx': {
                    'message': 'Redirection',
                    'description': ''
                },
                '4xx': {
                    'message': 'Client Error',
                    'description': ''
                },
                '5xx': {
                    'message': 'Server Error',
                    'description': ''
                }
            };
        }
        StatusMsg.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function StatusMsg_Factory() { return new StatusMsg(); }, token: StatusMsg, providedIn: "root" });
        StatusMsg = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], StatusMsg);
        return StatusMsg;
    }());

    /**
     * @ignore
     * Data type for messages
     */
    var KuiMessageData = /** @class */ (function () {
        function KuiMessageData() {
        }
        return KuiMessageData;
    }());
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
        __decorate([
            core.Input(),
            __metadata("design:type", KuiMessageData)
        ], MessageComponent.prototype, "message", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], MessageComponent.prototype, "short", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], MessageComponent.prototype, "medium", void 0);
        MessageComponent = __decorate([
            core.Component({
                selector: 'kui-message',
                template: "<mat-card *ngIf=\"!short\" class=\"fix-width kui-message\" [ngClass]=\"'kui-' + message?.type\">\n\n    <mat-card-subtitle class=\"message-subtitle\">\n        <span class=\"left\">{{message?.type | uppercase }} {{message?.status}} | {{message?.statusMsg}}</span>\n        <mat-icon class=\"right\">{{message?.type}}</mat-icon>\n    </mat-card-subtitle>\n\n    <mat-card-title class=\"message-title\" [innerHtml]=\"message?.statusText\"></mat-card-title>\n\n    <mat-card-content class=\"message-content\">\n        <mat-list *ngIf=\"message?.route\">\n            <mat-list-item>\n                <a [href]=\"message?.route\" target=\"_blank\">\n                    &rarr; {{message?.route}}\n                </a>\n            </mat-list-item>\n        </mat-list>\n\n        <mat-list *ngIf=\"showLinks\">\n            <p>{{links.title}}</p>\n            <mat-list-item *ngFor=\"let item of links.list\" class=\"link\" (click)=\"goToLocation(item.route)\">\n                <mat-icon mat-list-icon>{{item.icon}}</mat-icon>\n                <p mat-line>{{item.label}}</p>\n            </mat-list-item>\n        </mat-list>\n\n    </mat-card-content>\n\n    <mat-card-footer *ngIf=\"!medium\" class=\"message-footnote\" [innerHtml]=\"message?.footnote\"></mat-card-footer>\n\n</mat-card>\n\n<mat-card *ngIf=\"short && !disable\" class=\"fix-width kui-short-message\" [ngClass]=\"'kui-' + message?.type\">\n\n    <div class=\"kui-panel\">\n        <span class=\"kui-short-message-text\">\n            {{message?.statusText}}\n        </span>\n        <span class=\"fill-remaining-space\"></span>\n        <button mat-icon-button (click)=\"closeMessage()\">\n            <mat-icon>close</mat-icon>\n        </button>\n    </div>\n\n</mat-card>\n",
                styles: [".kui-panel{display:-webkit-box;display:flex;box-sizing:border-box;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;white-space:nowrap}.fill-remaining-space{flex-basis:auto;-webkit-box-flex:1;flex-grow:1;flex-shrink:1}.kui-error{background-color:rgba(244,67,54,.5)}.kui-warning{background-color:rgba(255,196,0,.5)}.kui-hint,.kui-note{background-color:rgba(0,105,92,.4)}.kui-error,.kui-hint,.kui-note,.kui-warning{margin:12px auto;max-width:640px}.kui-error .message-subtitle,.kui-hint .message-subtitle,.kui-note .message-subtitle,.kui-warning .message-subtitle{padding-bottom:12px}.kui-error .message-subtitle .left,.kui-hint .message-subtitle .left,.kui-note .message-subtitle .left,.kui-warning .message-subtitle .left{float:left;left:16px;position:absolute;text-align:left}.kui-error .message-subtitle .right,.kui-hint .message-subtitle .right,.kui-note .message-subtitle .right,.kui-warning .message-subtitle .right{float:right;right:16px;position:absolute;text-align:right}.kui-error .message-title,.kui-hint .message-title,.kui-note .message-title,.kui-warning .message-title{padding-top:12px}.kui-error .message-content,.kui-hint .message-content,.kui-note .message-content,.kui-warning .message-content{margin-bottom:48px;margin-top:48px}.kui-error .message-content .link,.kui-hint .message-content .link,.kui-note .message-content .link,.kui-warning .message-content .link{cursor:pointer}.kui-error .message-footnote,.kui-hint .message-footnote,.kui-note .message-footnote,.kui-warning .message-footnote{padding:24px}.kui-short-message .kui-short-message-text{font-weight:bolder;text-align:center}"]
            }),
            __metadata("design:paramtypes", [router.Router,
                common.Location,
                router.ActivatedRoute,
                StatusMsg])
        ], MessageComponent);
        return MessageComponent;
    }());

    /**
     * @ignore
     */
    var AdminImageConfig = /** @class */ (function () {
        function AdminImageConfig() {
        }
        /**
         *  default-project-logo
         */
        AdminImageConfig.defaultProject = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAuUlEQVR4Ae2XP8rCUBAHp5F4gPxBsA45mpUgXkt4Se4Rkc97fIQkhVZrK+JbxGwhujN9Bh77K8IPsWTPkSsXOnYkGLPmjNx5YoUhCX/Igx0LzNgiT9zwBhU1AxLxQEpGQCJOtFT653tEMQUgRxR7LVEjqhkABaLaEGVAVAM5BQ2iOhJFjPSAXeBVPKADfqa+Aw/4Dr53Bx6wD/iZfkZgQgwcidIiBgb0H5CZ/lOClmgYZzxOoMRxjLkBL3E6cltSSnYAAAAASUVORK5CYII=';
        /**
         * default-user-avatar icon
         */
        AdminImageConfig.defaultUser = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA+klEQVR4Ae3SMUrDYBjG8X+n1kPoKg4l5g6Cu7jokaxbW5KhNxAcdZMiiOgB2iaXMChKO5jHrEr7Ncn7OSjf77/nScJLEAQNxKTkrKoyEiK82mGCvlWS0vP3+Hu0pqmviQnaUIIHMdpYSYRZihyNMcuRozlmK+Ro+QcGMuRohlmCHA0xiygdZ9qH3zzUEV70mKI13dEFXxMp5Y+fM6KLVxFj5iyrZgzpE/wre5xzyS0LCj6rChbcMOCMXYxiBuTIUcYFh7TQ4ZRnVLMnTujQwAGPqGEP7FPTMW+oRa8c1Xv7D9Sy9zpfcY0MXbFVgQy9sJWMNR8IA0EQfAFx/QsJxgdnsQAAAABJRU5ErkJggg==';
        /**
         *  default "not found" image in case of 404 error
         */
        AdminImageConfig.defaultNotFound = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAD8GlDQ1BJQ0MgUHJvZmlsZQAAOI2NVd1v21QUP4lvXKQWP6Cxjg4Vi69VU1u5GxqtxgZJk6XpQhq5zdgqpMl1bhpT1za2021Vn/YCbwz4A4CyBx6QeEIaDMT2su0BtElTQRXVJKQ9dNpAaJP2gqpwrq9Tu13GuJGvfznndz7v0TVAx1ea45hJGWDe8l01n5GPn5iWO1YhCc9BJ/RAp6Z7TrpcLgIuxoVH1sNfIcHeNwfa6/9zdVappwMknkJsVz19HvFpgJSpO64PIN5G+fAp30Hc8TziHS4miFhheJbjLMMzHB8POFPqKGKWi6TXtSriJcT9MzH5bAzzHIK1I08t6hq6zHpRdu2aYdJYuk9Q/881bzZa8Xrx6fLmJo/iu4/VXnfH1BB/rmu5ScQvI77m+BkmfxXxvcZcJY14L0DymZp7pML5yTcW61PvIN6JuGr4halQvmjNlCa4bXJ5zj6qhpxrujeKPYMXEd+q00KR5yNAlWZzrF+Ie+uNsdC/MO4tTOZafhbroyXuR3Df08bLiHsQf+ja6gTPWVimZl7l/oUrjl8OcxDWLbNU5D6JRL2gxkDu16fGuC054OMhclsyXTOOFEL+kmMGs4i5kfNuQ62EnBuam8tzP+Q+tSqhz9SuqpZlvR1EfBiOJTSgYMMM7jpYsAEyqJCHDL4dcFFTAwNMlFDUUpQYiadhDmXteeWAw3HEmA2s15k1RmnP4RHuhBybdBOF7MfnICmSQ2SYjIBM3iRvkcMki9IRcnDTthyLz2Ld2fTzPjTQK+Mdg8y5nkZfFO+se9LQr3/09xZr+5GcaSufeAfAww60mAPx+q8u/bAr8rFCLrx7s+vqEkw8qb+p26n11Aruq6m1iJH6PbWGv1VIY25mkNE8PkaQhxfLIF7DZXx80HD/A3l2jLclYs061xNpWCfoB6WHJTjbH0mV35Q/lRXlC+W8cndbl9t2SfhU+Fb4UfhO+F74GWThknBZ+Em4InwjXIyd1ePnY/Psg3pb1TJNu15TMKWMtFt6ScpKL0ivSMXIn9QtDUlj0h7U7N48t3i8eC0GnMC91dX2sTivgloDTgUVeEGHLTizbf5Da9JLhkhh29QOs1luMcScmBXTIIt7xRFxSBxnuJWfuAd1I7jntkyd/pgKaIwVr3MgmDo2q8x6IdB5QH162mcX7ajtnHGN2bov71OU1+U0fqqoXLD0wX5ZM005UHmySz3qLtDqILDvIL+iH6jB9y2x83ok898GOPQX3lk3Itl0A+BrD6D7tUjWh3fis58BXDigN9yF8M5PJH4B8Gr79/F/XRm8m241mw/wvur4BGDj42bzn+Vmc+NL9L8GcMn8F1kAcXgSteGGAAAACXBIWXMAAAsTAAALEwEAmpwYAABAAElEQVR4AeydB7xVxbm36Qc4wAEEpQgWqtiN3WiC3sSIEhUVRZqoiakmuTf1lsTc3JSb3HhvTMwXkijSwUaQiCkaTKzRGGMMiIAoSEd6Oxza97zHvbfrbPY+Z5c1q+3//v3WXm3KO8+sNf+ZWbNmNWumnwiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIgAiIQMgEmoccv6IXAREogcCCBQtabdy4sS1e2+zatatNy5Yt2/Brbfv79u1r07x5cztWv3/gwIE2dtyz34ztOo7VcW5fetv29+/fv69169b15w4dOlRXW1u7r7q6un5/0aJFtXfcccd+3OknAiIQQQIS9AhmikwSgYkTJ7bu0qXLEZDoisjWsK45ePBgDUJd06JFi05sdwiJ0k7i34bY1y9UBrZh33aOberZs+emoUOHSvBDyhhFKwISdF0DIhAigfvvv7/l3r17j8SEIxHF7gh2d8SyO9tdEO1Y3Z/YjOmHNrNstIU0baC3YCMt/I0jR448ECJmRS0CFUEgVgVGReSIEploAnPmzOm8Y8eOo1u1anU04t2bxPZEuFslOdEIvbXa15DeVWyvYns1Ar8tyWlW2kQgDAIS9DCoK86KIUALvGtdXV0/uqaPJ9F9QuwqjxRzxH0H4r6SZ/jLMWz56NGjt0TKQBkjAjEkIEGPYabJ5OgSQMDbYd1xPFfux7ofXc+do2ttpCzbjMC/gdAv37Nnz5sTJkyojZR1MkYEYkBAgh6DTJKJ0SYwbdq0TgjRYARpCJYeE7dn31GjC8uDVITeguciejYW0z2/M2o2yh4RiCIBCXoUc0U2RZ7ApEmTOldVVZ2A8JiI94m8wTE1EFEH8aGViPwiuudfGzNmzPaYJkVmi4BzAhJ054gVQVII3HXXXVW8SnYiInM6aZKIh5CxsH8LcX9527Zti2677bZ9IZigKEUgsgQk6JHNGhkWFQI8F+9LN/rptBRPZG2TtOgXMgFEfS8m/IP8eJlWu42c108EKp6ABL3iLwEByEWALvW2/M5AxN/HYhO86BdRAoj7BpaXmDnvb7fffrsJvX4iUJEEJOgVme1KdD4C06dP74KAn4tAWLe6WuP5QEXwOHlWS4v9r0yB+2e95x7BDJJJzglI0J0jVgRxIDBlypS+PJ89j1HVgxEF3RdxyLQ8NiLsB1kW8f7/c+PHj1+dx5kOi0DiCKjgSlyWKkHFEJg1a5a9K/5BRFyD3IoBFxO3NogOU58cNWqUrfUTgUQTkKAnOnuVuHwEaJEfx1fFhiLkffO50fHkEKDF/iaT/SwYN27cyuSkSikRgYYEJOgNeWgv4QR4Rn4MSRzKcmzCk6rk5SbwBj0yCzQyPjccHY03AQl6vPNP1hdIgFfPutNCu5TCvH+BXuQswQRosb/Ol+B+xzP2TQlOppJWYQQk6BWW4ZWWXJtbnW51e0Z+FmLeotLSr/TmJ8DzdSafO/BnhP1Pmjs+PyediQ8BCXp88kqWFkHgjjvuaDFgwIAzKbTtObl9MEU/EchJgNb6Lip7f1i6dOnLXDcHczrSQRGIAQEJegwySSYWRyA14G0YQt69OJ9yXckEqPytI/2PMiL+7UrmoLTHl4AEPb55J8uzCFj3Ol2oH0LIz8g6pV0RKIgAon6I6+fFTZs2PaFZ5wpCJkcRIiBBj1BmyJTSCfA++QmI+eWE0KH0UORTBN4lgLBvQ9h/PXr06KViIgJxISBBj0tOyc6cBO65556OfMZ0GM9BT8jpoEIOIkD7EaB9rOtsDY/6hWfDdbadPpba51DzNmy3Bo9Nb9sm1z5+WlUIvrzJhMurvB3xG95f35XXkU6IQEQISNAjkhEyo3gCtMpPQnSuQJjaFu87Xj5Sgr0VgbFlC/tb6ZGo3+7QocPW4cOH7/Y7RTaw8Oyzz269c+fOToTdFWHrStxdYd7V9tmugX3i3xwgncb2kRtvvHGx34wVngj4SUCC7idNhRUIAfsuebdu3S5DTE4LJMIAI0GoDxHdO4imfRJ0FfsbmF9+Cx8b2RmgGQVFxZiFlnv27OncqlWrrtjZlfywD9scyfbR2J+4D9uQtr/s2rXrt/oOe0GXhxyFQECCHgJ0RVk6AUSkNy3Ta1KtxNIDiohPa/0hFKtZm3ivQiBXx/2daBN6PozSE8Q2K98xpKsvaUxELwpp2UgF6yEqWDYiXj8RiBQBCXqkskPG5CNg3b+DBg26AGEYyhLbbl4EYQ9pXEL39XJrhVfCTGWWd0OGDDmSitgx5F29yLOuzpfXMTh+gArY47ze9jxr61HRTwQiQUCCHolskBGNEeC98mq6da9FBI5rzF1Uz1Ho72BZjIC/xgdhVtC6OxBVW4Oyi1Z8d1rx/WjtngyX3kHF62c8VM6WYP8c8tMqafqJQOgEJOihZ4EMaIzAzJkze3H+egr9msbcRe0cAr6JCshrLIt59cm61NWSy5NJiHtXWu+nwOpkliPyOIvkYUR9MzbPZsDc+kgaKKMqioAEvaKyO16J5ctop1FgXoGYx+L1KUR7K4RfpjdhEa22jfGiHQ1rrQKHQJq4n4RFsZhTgHzfxyOUubza9o9oUJQVlUpAgl6pOR/hdNugKlpsH0HIz4qwmRnTqHTYJzlfXMJPc4FnsJS1Yc/dBw8efBzXwMkEdAJ8q8oKMADP2PjssmXLHtc1EABsRZGTgAQ9JxYdDIvAvHnz2m/fvn0U8fcJy4ZC4qVVthch/xuC8yLdre8U4kduSiMwceLE1rxrfzrMz0c0O5cWSmC+ljM24P64v6kQGC1F5CsBCbqvOBVYOQRomdfwKcuxhNGtnHBc+kXENyIsL2zYsOHvmuvbJenDw7aeG64Pa7G/nyWy1wi2ra+trZ12yy237Dg8FToiAu4ISNDdsVXIRRCgsO7Oc8ixtMBsVrIo/pYzQv0pno2/GUXjKskmrpHms2fPHkyaL+TRjA2ajOJvC9fLVK6XzVE0TjYlk4AEPZn5GqtUMRDKutdvpPs6ct8tpzW+llb54zfccMMbsYJaIcYy/W8/BP5Crp1jo5Zkrp1dVDimjR07dm3UbJM9ySQgQU9mvsYmVYxkH0DBN5JC2T4UEqXfZgrjP1AYL8Q+vXIWpZzJYUuqUmjCPjDH6dAOce3sZZnJJDRvhWaEIq4YAhL0isnq6CV0xowZp2DVVYh5ZGZ+o/C1SWD+yIQhL9NdeiB61GRRYwSoIB7P+WEskXnGTg/Pfq6ph+jlea0x23VOBMolIEEvl6D8l0SArtJzaQF/pCTPDjxR4NayPIOQ/xkhr3MQhYIMiACvjbVimuDzqCheFJWeH0T9ENfXPET9rwFhUDQVSECCXoGZHnaS6R69hK7RC8O2Ix0/Be1LTAbzOEKuKTzTUBKwnjNnTmc+dmNf5RsUleQg7E/Q/f5UVOyRHckiIEFPVn5GOjU2WQgtJ5v57YyIGGojkR9ByDVyPSIZ4sKMqVOnDqLnxYQ9Eu+wU4F8HlH/LWuNzXCR4RUcpgS9gjM/yKQvWLCg1Zo1a64lTnvdKNSfdX/S3f9CmzZtnlD3eqhZEVjkNjlNdXX1RQj7+VQoWwYWcZ6IsOPvXIdzuf40TiMPIx0unoAEvXhm8lEkgdSEIDfgbUCRXl04fwcxf4R5t1e6CFxhRpsAAzFtsNzltNaPC9tSRH3h4sWLH9JUsWHnRHLil6AnJy8jmRIKzuYMgLuKVtGpYRpI9+ZBbHm2V69eTw4dOnR/mLYo7nAJ2DWJsF9IC3ko12WoZSA2vEj3+6PhElHsSSEQ6sWcFIhKR34CvEZ0KWfPy+/C/RlaQuspxOdScK5xH5tiiAsBBmcei6DbY6BQv+qGqD/JtflkXLjJzugSiMz7v9FFJMtKJUAryObcDlXMbQQ73Zq/kJiXmovJ9cc18RaDIn9GCpeHmUoqFR+kFysWXxYMk5PibpqAWuhNM5KLEgjQ+jmdgurKErz64oVWD1PD75/PTG9679cXoskNJPX2xUWk8ANhdcFzvdKJdOhBvty3MLmklTLXBCTorglXYPgMghvEwLMbwiocQb6NAnK2WuUVePGVkWSbZY4enWsQ1uoyginZK9fsAe6Z6aNHjw61x6DkBMhj6AQk6KFnQbIMoFA8hoJpLAVTq5BStrxTp04PDh8+fHdI8SvaGBO45557OrZt2/YaknBsGMng3uFz6nWTx48fvzqM+BVnvAnoGXq88y9S1k+aNKkHLZxRIYr500uXLp0mMY/UZRErY+wb5lxDU7iO/xSG4dw7bXiuPzr1el0YJijOGBNQCz3GmRcl02mZd8GeW1gCHzFM4buXls2v9PGLKF0R8beFGebOYErg4YhsGOXkNrr+7xkzZsz2+JNUCoIioBZ6UKQTHA/PzDtYNztJDFzMDSuCPlNinuALLKSk2YBKRHU213YY8xbUEO8Y7q12ISVf0caQgAQ9hpkWJZMpcNowmnw0rZiuYdlF3FdYpSKs+BVvcgkw6nwxqZtmvUBBp5LKxJH79u270b4eF3Tcii+eBCTo8cy3yFiNmA+n4OkZskHdGFU/XqIeci4kNHp7X52u90m0mHeGkMQ+AwcOvCyEeBVlDAlI0GOYaVExmYE79s3pk6NgD6307hL1KOREMm3gIyrrmHHwXlK3JegUco+9jzEq7ws6XsUXPwIS9PjlWSQsnjJlynEY8qFIGJMyQqIepdxIni2I+mZGoN9DS31dCKkbNm3atKNDiFdRxoiABD1GmRUVU+narqEL8jpaDpG7fiTqUblKkmkHor6ztrb2PkT9rYBT2JI4R+qxUsDUYxZd5ArkmPGrOHPtu+YM1LkeMW8f1cSnRd0mCYmqjbIrvgQmTJhQ26NHj2mkwAbMBfbjnuvEmJXrEPXQv+ceWKIVUVEEJOhF4ZLj9evXWzd7r6iTMFFv3779OLVoop5T8bTPPsHLBDQPYn2g07Qi6scwk9wH40lNVrsmIEF3TThB4TMwZwADz86JS5LSLXWJelxyLF528jrZ/k2bNs3G6kA/y8vgvPfbp1/jRUvWBkFAgh4E5QTEYaLIu7hXxS0pEvW45Vi87L399tv3Usmdzr2xKSjLuaab01IfwT2pSWeCgh6TeCToMcmosM3k2d1VFCKhfIWq3LRL1MslKP+NERg3btyuvXv3TkXUdzTmzs9zqefpw/0MU2HFn4AEPf556DwFvC5zLgVIf+cROYxAou4QroJuxkC5rVR6TdRrg8LBPTnE5psPKj7FE30CEvTo51GoFvK++ZEUUpF637xUICbqjNC/Sc/USyUof40RoKW+gXvFut/3NebOz3M8T7+M6zm0aZf9TIvCKp+ABL18hokNgUE/LXjf/KMkMEmvyWia2MReseEnjGli3+Z98QcQ9YNBWEMrvbVNvxxEXIoj+gQk6NHPo9AsHDx48NkUGImbnUrd76FdUhURMV/+W8JAublBJZZ79Dh1vQdFO9rxSNCjnT+hWTdnzpzOCN8loRngOGJ1vzsGXOHB8+nVV2ilPx4UBrreP6yJlIKiHd14JOjRzZtQLdu9e7d9Ra11qEa4j1zd7+4ZV2wMfHr1aRIfyGxy3Kttq6qqhlUsbCW8noAEXRfCYQRmzZp1Kgf7HXbCwQFaMasI9lc8dzzkIPgmg1T3e5OI5KAMAnzMZS7X+NYygijYK/GcwL17QsEe5DBxBCToicvS8hJkk1UgcpeWF0phvimA9tKyeGj06NF/Yz1Hol4YN7mKDwE+5rKHgaUPcG0fCMJq7t1h3MNtgohLcUSPgAQ9enkSqkWMmP0A4hrIh1cofH6NmNd/X5ruyb9L1EPNekXuiACivpqgf+co+AbBcg915B5+f4OD2qkYAhL0isnqphM6Y8aMbrg6u2mX5bugdf63MWPGvOoNSaLupaHtJBHgdbY/I7avBZEm7q3zJ02a1DmIuBRHtAhI0KOVH6FaQ4FzKYvza4ICZxPdkPNzJVainouKjiWBAJMa2ats9T1SLtNDz1erNm3aJGIyKJeckhi288I7idCSmCb7khrpssXpz54lIugP0Q1Zly8iiXo+MjoeZwL2HXWu/wdIQxDP00/knj4mzrxke/EEJOjFM0ucDwbR2ExwgQyEI54n6H5s8nOTEvXEXWZKEATs2ued8d8EAYOK80dstscg4lIc0SCgzI5GPoRqBV2Bp2GAPT93/XuDWbSeKzQSiXqhpOQuTgS4B15E1Be6tpnHZz379+9/out4FH50CEjQo5MXoVhCDb4V3YAXBRB5HQWMvZNb1PvmEvUAckZRBE6grq5uPveC8y+zEccH1EoPPHtDi1CCHhr6aEQ8YMCAMxhEU+PaGgqWBYxq315KPBL1UqjJT5QJ2DfUue+eCMDGbnyT4eQA4lEUESDQPAI2yISQCCxYsKDV2rVrP0fLuaNLE+heXE8vwM8ZCFfWYCBeqzuFisHVFIShXLekYSNpmUw6dpbDyyb+IA0D4W6DELuxPpJ1G9JWVO9FOTYE6JfkHdpJ2jYQ5xpGXy+65ppr1gYYf2SjspYzFepbMbCXSyO5bjdz3d5d7v3n0kaF7Q+BUApGf0xXKOUSmDZt2rkUtB8pN5ym/DP95b0UJiubclfI+TiLOryPhsX1CNzFLCdRyLaHvw1ItCXJ96JV5KjDHKzjK2RWuXue9M+rqal5fNiwYXsLyfekupk5c6aJ+cdcV1JhPpcBeS8nlaPS9S6BJBciyuNGCEycOLF1p06dPkdB0qERZ2WfQrD+Rpf5r8oOyBNA3ET92WefbbdixYqbScItvH9/PKJm0+tW5PScXA8HqMjUsd7MjGZ/gMnPEJpnPdlbcZuI+uVcD2e5TDi8t3Lt/VitdJeUww9bz9DDz4NQLKiurj4tADGvpdD+vd8JjNMz9cmTJ/dGzH9JV/N/UaiewhsFNSbmtFCbVeJC2ltyTbSDQ2+E/VqY3EsFbQIsKrZxAYc/wGGX3/eJNzz4doa7Rrx7oSRwW4KewExtKklWeNIFd25T7so9T+H9hA3+KTecXP7jIOr33Xdfv7Zt206nZTRi7969nWmZt0yLeK40VcqxNAMTdrYHIGjfnD179hfZrsjyiFbzHu7HIOZ6P69SrrFKTWdF3kCVmtnpdPMs1wZkHZHed7Res2zZspcchV0fbJRFnVm6uvC8/Ke0vC6gNdrWREy/hgSMCZW+FqyPhtNnEfUxDV1Uzh7vpr8CgxUuUwznnnTvH+syDoUdLgEJerj8Q4md1oDzmjqFx3xG8R50ncAoiDqCfRMj1zNjEf7yl7+0Jt3foZv9g7RCW5lw6ZefAD0XzRH23rj48pQpU87J7zLZZ7hWHkXUnd4zXIvO7/1k51K0UydBj3b++G7d1KlTexLosb4H3DDApbxzvqrhIXd7YYs6KevmFfXly5dXUTCfyFL/rNxdypMTMkLTAl79qWz+81133VWVnJQVnhIeT22gYvNi4T6KdwnnQQ8//LDr3rniDZMPXwhI0H3BGJ9Agmid09X8ZNBEoiDqtDTHW0udZ6I7mQlsAiL/Z1rpQaOIZXzWiwG/Knhd1K1btw/HMhH+GP0M92hZ8zU0ZQbjOZyPn2nKBp13Q0CC7oZrJEOdN29eewoL1yNdlyJoq8MAELao07rqnhb18ePHL6fFOZpuVIl6ERcDDO073tci8BU56j01m+IrRSArxempldoLUgqsOPmRoMcpt8q0ddu2badQYNokJs5+FMR/dBZ4AQFHRdQfeOCBagY6SdQLyLO0E2ulc33aY4oz6Ra2Z+oV+aN3x1rpzgZeGOPu3bsPqUi4CU+0BD3hGexNHq9Pne7d93ubFumyIJ+d57M/KqJO97tEPV8m5T/eguv0yN27d5+Z30myz9C7s4kUOv0aG6J+RrIpVmbqJOgVku82xSTdwUe5TC6CHmrr3Js2ibqXRry2eS+9FddSn3hZ7a+1tbW1T/sb4mGh9WFCnyA+mXxYxDrgjoAE3R3bqIXstHVOYt9gCs+3o5RoiXqUcqMoW1rS5VzRYjNhwoR1MFhSFLXiHbsuE4q3SD7KIlCRA0/KIhZDzzZve8eOHf+FZ5NtXZlP4XNP1AQ9ndYIzf2+a9asWceTDzZ73Dk8K02bqHWKAC3zZrTQ99CbNAtGdwQBhnw42L59+z2DBg3aceKJJ0YmU+hV60PX+C2uGHDP7oT1/2p+d1eEgw9Xgh4888BjRNBORESucxUxBcPbiPk9rsIvNFyeWfenAPwg7o/l1Zz/TT2LrPcuUS+UYiTccbkesulQtwZhDXHZZC67iG8L6zfZ/xWViWcWLVq0NojJkRpLI6J+E9f0sY25KfPc9NGjRy8tMwx5jwgBCXpEMsKlGbQKr6PF4+x1NQrCUD/N+OCDDw6mlfUJWndXUhAfRaujBYL+yJ49ez598803b0yzlainSWidTYBr2EaVH+LaOYig72VZzjKL/Zm0YN/Mdh/UPvduP+7dsQ7jexlBn+swfAUdIAEJeoCww4gq1d3+ZQonm47U9x8iuhcR/SGFXuBdlQsWLGi1Zs2aT1AY344NfZnIpYp01qexqqqK3X2/ipqoY9w7TLxzH7zU/e771ehPgNbtz3KQpY7r6a/WLU3Ij5Jne/yJobhQaKV/glZ6j+J8Fex6D9fj/5A2p5PZFGyNHJZFQIPiysIXfc81NTX9XYm5pR4xfTUMMZ8/f36ndevWfR/h/iZmDKCFnhFzs4sWOuVU66vatWt397333tvdjtkv7IFymNCNFpfNKKdX2upzJHp/VilEQFuwtEXUz2X/e+TZJ/gUbihTphL/Kw4p2adsj3EYvoIOkIAEPUDYYURFoeR0AgkKm78GnS7EvGrLli3/Tav8ZoS8K2nMaUJURR170zPK1Ys6053eaDPKUTnJmQ4dDIeACTtCbl+DO55W+r9wvU2YO3dux6Ctqa6u/kfqkYCTqEmb0zLCidEKNCcBCXpOLMk4yICeVqRkoKvU0HpZy2C4Na7CzxcuM959HhEcScuixgrdxn5xEPVrrrnmTViOJj2+TxNLuNZ9bD0p9QuFt40ir1/Sx+y8fvkJIOrNuc56we0WJry5KvU1vfwefD5z5ZVX7qAS6Ow5PmGfQFkhLfA538IITpkYBvWA4hwwYMBxFETOmn0UBIG3znmeeCEC9CnEr2tTYp7GHGVRJx326VVfut9NmGlFNrOWvi08crCu4wMc3wYrGxz4NuJkg72WsF7Beg3nN3N+p7GyD8mYP1ub6Ft4+r1LgB4UcDQfCJdRy5Yte1/QXOzRlqs4uQ6qKSsqeiIfV2yDDleCHjTxAOPjRu3vKjoKN7Ron7NCJpfd9kEJCtZPEfeRuc43diyqoo7NZT1TN+E1ETYhp9DfQp78mccQk1j+HdEezbEPMuvYhYwlsO9gX8Cx83bt2nUeYn8uHC+A53mI+oX4/wh+P4G/73PsYdy+zrLXxN0Wa81X+g92LVjOh8+Hg+56Jw9fIw/2u8oDroV+rsJWuMERsC5Z/RJKwPFNupDZrGqDRMcHJd6PgH2AArUtlZWiozZRR/yuMo8MlMu80mYD5XilzUTrasQt8GYpcdqgPRsoN5kBhst5Vcm+0jYdIc05+YyJqwk4buwVq9cQ4T9y7FnC+RsTCK0knfsZMHiQtB7s0qXLQR6L2IjtNC8vOOtKbvbNb36z+ZAhQ5rv2LGjRZ8+fVosXLiwVb9+/aoJZxAifxZhX4Dn86kE9DD3iFqzUvinDYjr2tLM9VcD+4t27tz5JOn4U1BpsXuNa9RmjnPyvDtVVvwhqPQoHjcEMne5m+AValgEpk2b1omb9J9dxU/hPg3xWeYq/Fzh0t3+AwrUTyBkHcoRFIQOnYreK20I50bSZ6Ke85U2ztV3hWP7BvL2MZY5iPjzCMx2BgnuX7t27QGeheYeIZgLaBPHCKsFQt9q48aNbXr27NmLisMVcP8o8Z6FLe3JB+vSbyKUZJ22yhS/NVRqvkWF6xfkVWCve1HRO4F4r3dBlHTZO/jfJz2hvJrnIk2VGKZa6AnNdW7Ofq4KWwr0fbSW3woSnb2mtnnz5guIu6TWudfWuLXU27Zte47lJYX5G6zvRdAfpAv9bWYy24foOuuGTVUObH4BW5ay/5NTTz31Xrrs7RnyOETgo1QmOleSsFtFksUmLzoRDtazso4lkN/ixYuXDhw4sJb4fZ/CmeuqOWk6joQsCiQxisQJAT0Yc4I1/EC56Y93ZQVhvzF06FBnQpLL7q1bt9qgnb4UPL5UQk3U+UXuPXXS1+CVNiowo2kZP4KYfw3uQ9evX//DcePGLbWWlEsxz5EHh4iv7uqrr97K8+MnEbPPwHA49v4SG7fAsiIG0ZEH9rgD7WvZm0qV068XZueB5TesnQkuFTM9R8+GHrN9CXrMMqwQcyl07FGKM0GnMLNneYH+KES70SL0dba7uIh6hw4dRpH2O3kWvur222/fS6HufQ4eaD5YZA888MCBW265Zce8efOe41nyPyPqV3PNzUt12wZuTxgRkt6OpDvwd9LpnXE2EJU0OSszwsijSoxTgp7AXKfA7cbNWe0qabTOAv+YA62HbrQCfb9e4yDqw4cP302L3Lq9QxXy7OspLexz5sx5mryZQC/CJ3CzuEJa6x1Iqy2B/pYvX76CCt1eR5F2YWBmjaOwFWwABHwvIAOwWVE0QYCC9egmnJRzeo21zsoJoBS/pMmm4XQyiDMl6tfxrHoSBVpkpon1dL8HLhzF5JEJ+4gRIzbxtsAvaLF/hMrkJFrriX7VjTS2gZGvPUaFMKfb3d5sWFmI2xLd9C7Rn7xFgIAEPQKZ4LcJ3PDOBJ2COvDuduODljttnSLq9r715fQESNRLvCAtj2699dYVsPwsQXyW/Xd4VFJiaNH25vp6bCz1xL2isfPlnKMS6azsKMcu+S2MgAS9ME6xcsUN77KWHYqgB5EBEnV/KDNobxfT807kee91VC7/YRPT6OcfAZeC7rIx4B8BhZSPgAQ9H5mYHqfL2EpPJ6NvKUh23HDDDWtjiqYgsyXqBWFq0tFtt922j/f9n8LhKHo9npOoN4msYAcMSl3DvbivYA9FOETQe1KGtCzCi5xGiIAEPUKZ4YcpPGvuRbeZk2fNdLfbR0Scdn37waDcMCTq5RJ81z8D+Q5cf/31C7lmxiLqv7HBcvqVT8C4Irxvlx/S4SEQbmuu/6KnVj48JB0Jg4AEPQzqDuNEdJ11t1MoB/5lNYeoGg1aot4onoJPWgWQXp3ltNA/RmXzMbXUC0bXqEO4OnuOTth6jt4o/eieTOaIlejydm4ZrXNntWu6+lY7T0CEIjBRp9v4ciZ2sYFyE2gZ2RfLmkVs7vf6L6Xlw2YfEWHkeXfrSmWAWieuj/a4bcP+bvZ3sb+Jito60rkp9WpcvqDKOX6IUfCrmY74dgKZjKifD9Nywqt4vybo5KETDtznzsoQJwYr0AwBCXoGRTI2uMmd3IwUIAe3b98e2DSXUcmNOIk6rzS1YGrQ7nRtn4pgXkhvzXl8cKU/6yPgWf/qG4V1/etkCHn9POysD3DevtK2lrnyX6UV/RSC+wzTyi60V6T8ygeuH5tpbjn2fZI4plOZOImKhF/BV1w43IurmXDI5pF38bw78+pmxYGNeYLV5R7zDPSaj5jbs/Nu3mN+bVMgb7CBTn6FF6dw4tL9fswxx9gHeX6EaP+WFve/s74E4TwG1vVijpDaF9qaWevY1ibquG+JoHfD7cm4vZF38f8f5/6M8D7Bx0A+Ravat+5XqyDwkZdFVB4+y7W6kXjjdBlEyla7F+HnpMeMvJGgRyq3CzdGd1ThrCLvks8rduZmdDXyqGKen+fK6DiI+k033bQNMf4Gtr7AddAM4WzyU6fmzoTdxN6E3tLJrx0C/0EE/iesn6Pl/m0eORyXi0uxx+wbALt3736BOO+gMuH9rGuxQVW8e/LMyXN0rolqpvW1RzP6xYyABD1mGdaYuRS+LmvWFS3oxj3qos6MbdVjx45dglDeiJi/UOoANBN5a8GTXuvxOZou/K8hwE9RYfzs3XffXfasdbQudxPHTJZJGvne2B3d+Dny19krpIy7cPLorvEU6Wy5BCTo5RKMkH8KcmeCTgHvpHsvQvgKMiXqok5LutpGldMdW5aop2FY692EHfHtjfj+T9euXefSDX9u+nyp69GjR2/lev0urcxX6QkoNZhK97fZFQDyxVlZ4spmhdusmQQ9QVcBouvk+TnisJ9nshsShKqspFSaqBssE3Za/W3oBRqKAD/E8/WP80y8nPLj0J49e1ZzzX6PyoJ9FrSsPKlQz84EHZ5OypIKzafAkl3ODRmYkYqoYAJOvpREYb7BJrMo2IoKcFiJoo7wmqib8vaikvfD/v37f3/BggVtS83uCRMm1NIS/C3hzlHXe/EU7TVD8qHR1xaLD/VdH1SwnJQlpdojf4URkKAXxikWrlzdhBQaLlsCsWCby0ivqE+ZMiXzuVp7T91ECm5uXhTOZYznGBWw7gjleL+739NRELY9Y+/AiPhPrl+//sd33XVXp/S5Ytft2rXbWltbeyfhadR7sfDede/k3nRVlpSWRPkqlIAEvVBS8XBXcsHaWPIQp22Nna/kc2lRpxt6WtRFHdH8c6kD5bLz2FrrjIpvT7pHH3HEET8staWe6vlZjIDYu+nZ0Wi/CQLkgxNBJ1onZUkTydHpMglI0MsEGBXvJibc3E5eWZOgN57LKVG/KuqijmiOLmf0ezaFlKi3o5Jww5o1a75Fj0BJk5xUV1fvIKzpVBA20auRHY32GyHAmAYngk5+VE+cONFJedJIcnSqTAK6e8oEGBXvFNbOatQUGlujks6o2hEXUUcwfRn9ns4HE3UqCR14Bn4L61vSx4tZWyud7vtl2Ha/WunFkGvWDP5OBN2sIE+clSnFpVKuCyUgQS+UVMTdIbrOBrHwTFZd7gXkv1fUaa12TXtJ+jN1E3Wukc5cg1+bPn362el0F7N+5ZVXbHDXNCoF26mcFuO1ot1yzW1xBYDKlbMyxZXNlR6uBD0hVwCFYNkTfuRD0blzZ7XQ88HJOm6izit+VzFw7GLvqaiIOo9m2vv5nno6jQi6qXBvrsP/9I4lSJ9vas0rcPt5jW0prfSn1UpvitZ75xlU6KyF7rJMeS8F2vKTgATdT5rhhtXGRfTc1LXDhg2rnw/URfhJC9OeATNqewOt1aez0xYFUadr/CYXop5qpRN863Msjuy0F7JP63wX7h6hclCIc7mBAI8r9rCyxfcf976TMsV3QxVghoAEPYMi9htObj4KanW3F3FppFqXj1LQ5vwyXdJFnZH0neid+NRDDz1U9EddPv7xj5sw/QlBX2UVI/0KI4DwOulB497XoLjCsiAyrnTXRCYryjOEQtSJoLsqLMpLbXR9kw+HWGY3ZmHURJ1KyA20jp9ktHrZkwchAi145NCHEeu3sF3Uw3CutUPMIb6e9RPqdm/sCmp4Ds6uetCclCkNrdeenwQk6H7SDDEsunid1KZpKe0IMVmxitpalYj5hm7duv21KcOjJOr0JryFgN6MqNu30MsSdcTFJp2phsO1Dz/8cO+mOGSfx18tHJ9nnX1K+3kIwLwuz6lyD0vQyyUYsH8JesDAHUbn5OajYK3Ib6CXkk9Uquz74i8z5mBjIf6jKOrktx+ibq303gwQvLwQDl43Xbp02UuXu820p9HuXjCNbHPdORF0rmUnZUojSdGpMglI0MsEGBXvFMRObj5uagl6gZlsLXTE6E8FOq93FjVRJw03+yHqcLCpcD9S7OQk9k46ArUC//ZeejEoK9mtE0GnUuWk16+SM8p12nXHuCYcUPiuatMS9MIzkC5rc/xC4T7edZk0Ubdud6tgsj6jpqZmULE8tm/fvgdR/7v1eOjXNAFYu6p0O2kkNJ0iuSiVgAS9VHIR80drxklt2mFhETGC5ZlDxcda57t5Fv1WKSElTdSNAc/jO3D9nFksj1Ql8s1i/VWweyctdMvCCmYay6RL0GOZbTmNdnLzqYWek/VhB1Pdwxvsq2GHnSzwQNJEnRa6fVq16Jnjtm3bth+/K2FZILnKdqZn6JWd/97US9C9NGK8TetQgh5i/lkLnd+qMWPGFP1WALOk2X1YH0AURJ1ehvE2+YyNfi/nmTqtc+s1Gjh//vwqg1Poj4+1oOX7V3NN16W4Fuq1Ut05aaFTqXLS61epmRREuiXoQVAOJg4ngk6B7ur5XDBUAorFWugsK4mu6G+gDx48+GTmfu+VNjVsUacgPzKXqDMDXMHvkhGGJaclgnwU30zvkk5bIeu1a9cegKV9H32bBL1pYlR+XN2jTsqUplMkF6USkKCXSi5i/ij4nNSmKVRdFRYRI1ieOSY8tEi3lxIK/sbgbzKi3j3tP4qijkg/V6SoW/liYp5JVzp9ja2/8Y1vHCKePbTQXU2Y0lj0sTtHvjhpoQNCgh6zq0GCHrMMy2cuguLk5mPktgQ9H/Ss4zzLtC+GFf2jQK7hU5WX0NKaFGVRx85PFiPquLX38lu1b9++qBY6fmzGuH2sXQlV0XkUZQ8MPnTFyUmZEmWWcbdNgh73HMR+ewZLa6aoaTYLTTYtdH0po0BY5EFJgg7j9qlPr14eRVG3j63YM/XFixcvKkbUEWQT9BbUCW1wXFG/Dh06WOu81sLQr0kCBT8KaTKkhg6kDw15RH5PGRb5LGraQATdRNfJTY1IOenKbzpVsXRhXwsr+gfjduYpqqKOfd3tmfrxxx/frlhRp7KCJjevT1+RYA5Qeagt0k9FOnd4j6p3LmZXlAQ9ZhnWiLlOut0ojNXt1gh07ynEqyRWMM4UnFEVdcS1fqBcsaKOv0NUBjLp8/JqbJtxBVYTaNWYG517l4BDQXdSpijf3BGQoLtjG2jIiImrm68kkQo08RGJDBHqWIopaN4uxCvjNUmiDpNDCM7uTOIK3GA8gol5O9gU6KNynbmqdHsrmpVLN14pl6DHK78as9aJoFOgqsu9Meqec4hQB89uwZtUxg77nnUSRN3EGDE/iDAU+yiiOd7suXvRz94Lhp4gh1x3ru5RJ2VKgtBHLikS9MhlSWkGUQAW3a1ZSEyuav+FxB03N+RBp1JsRvhyTnMad1Hn2jlEZWUHI/jXFcOFMSHWXdEGnq6EqhhzIu/WVaWbcCXokc/9hgZK0BvyiPOeq5tPXe4FXBWIj43oPrIAp4c5oeB8g67pw47bgbiKOiyMhyVq/erVq7fkTFz+g/b8vIbKQEfY5HelM/UEuHZc3aOuyhTlnCMCEnRHYIMOVs/QgybeMD4TdMTn2GKnObVQEK9lvNq120Qw1y+uos41aXOyr/j0pz9d1Ot8Z599dkt4HA2Lagl6riui4TE4O+nJ4Hp00uvX0Hrt+UlAgu4nzXDDclKbpkB1UliEi8r/2FPC02PdunVFt9IHDRr0FoXnYp6F5jUsjqJOemqp6LyYN1F5TjCpTGtGxvdlyeNCh7MIuLpHnZQpWbZr10cCEnQfYYYZFAWnk9o0QuOqOy9MXL7HnRL0Tsza1bvYwM8880zLu2cbE3QL0yvq8+bN65aOJyrTxHpfaaMb+HmunZ1VVVVFfx9+165dreB5HP7TSdS6EQKuWujkgQS9Ee5RPCVBj2KulGCTw5tPgl5AfpigI+YtWJ9agPNcTn5NN3OTs/KlRX379u0/jaqoIzCv1dXVfQxbZzLt6+JciW3sGLPl2dfZTjCm+jVNQM/Qm2ZUKS4k6AnJaVp3rmrTEvQirhHE7BKcF920pFB+GgF7talWupmSEvWracn+grnf+6bji0pLvba2tu24ceNeGzVq1FeuuOKKogbEXXfddS0ZFd8bFifCxJKrXxME6Mko6XXJJoK1sR1Oev2ailfnSycgQS+dXdR8OhF0Ctb2UUtoVO2hZWmmnfn73/++6NfXEMBdsL4fQW+ylW6R0AJuhdsreNTyI0S9D4fqKxFREPXU3O/VCELRTexhw4bhvfVJVIy62UBD/ZomAOfOTbsqyYWTMqUkS+SpIAIS9IIwRd8RrRkntWkK1qK+lBV9Uu4sRJCbIbJ9+P73SaXEAuupCPWaQlrpFn5URR0hrp/7nQ+6VJfAoS0CdTYMiu7lKCGu2HuZOHFia3g7aaHbJRZ7QBWWAAl6QjKcQtDJhywoLNpRaKiVXsB1YoLOyOxWCPPlBTg/zAld1G/jdxJiZrOrHXY+14Goijosjky31HPZnedY8+rq6i5UTi9K9XbkcabDaQJdunRx1TpvRj7oe/Rp0DFZS9BjklEFmLm9ADclOaHQUCu9QHImRIjZ1XSD1xTopYEzxHwig+OWIuwNjje2E1VRL7alzjv8bRgfcBZpH2yVI/2aJsC14kzQid1ZmdJ0yuSiFAKFlxqlhC4/gRFo167dNleRIRhdXYWdtHBtIBeN9IEMDLuolLSNHDlyNYL2HZaivgUeVVG3ljo8xhfS/Q6zDlRoLmdpLUEv+OpxVtmmcuWsTCk4dXJYFAEJelG4out448aNzmrTiIsEvYish1cLROlG5iQvaWYUvM9CoB9BCA8U2vVu5sVZ1GHVYs+ePX1I78Xqbi/8YuM6c9JC5xo8cPPNNxc1w1/hVsulKwISdFdkAw73tttu20dhWPRnKgsxk3Al6IWASrkxQaJAvOykk04aUoS3jFNa6XX0uHyZLutFFNhF9T3HVdS7du1qrfOPwu1o0p1hoY3GCXCtOWmhkwfbue+LuvYat1RngyAgQQ+CcnBxuOoik6AXkYcmSLSuaxDXz/AsPf98ro2Eec0116ygsP4CXc9rEbpGXB5+Km6ibq3zHj16HE1aR0vMD8/Pxo5QAXLVQndVljSWHJ0rk4AEvUyAUfJOgejkJiRcCXqRGW2tdFo4IxHXklrpFt2YMWOe4Jn8vxDOJgruoiyIk6gPGTKkPbyuJI0DJehFZbNdY04E3VroxVki11EgUFwpEQWLZUNeAtzcW/OeLOMEgl5dylfEyogy9l7TrXRE6nZa6SXPtjd69OhZiPpXCWejiTp5XDCbGIm68RlMr8beYtJXMIiEOuS66sB11s5R8oqa4c+RDQq2SAIS9CKBRdk5wrvRlX2bNm1SK71IuLxSZM/Sb0SQLyzSawPnzP72S1qwtyN29p56EgfKbSN9P2CU+1O8uy5Rb5D7+XdgZp+YdfLjMY+zssSJwQq0noAEPUEXAoX9BlfJoaA9wlXYSQ2XCpYJuk3K8805c+aU1TVqLXVeI7qZMF/mIzB7rCVbaGs26i11+LRbvnz5ItL2OSpBEvUCbwh4ORN0Wv4S9ALzIUrOJOhRyo0ybaGF4+wmpDVg84XrVySBVCv9gt27d9+6YMGCkl5jS0c5fvz4xylor0WgH6B7eguCXnBrPcqizrU1zj69umzZssWkT6KezvAm1lQWnQg619XBJUuWbGoiep2OIAEJegQzpVSTJkyYYJOR7CjVf2P+6II7prHzOpefACJlc7x/ecWKFefgqvCH4DmCpKW+omfPnrfQOvsief0KPSfbKdjrp4plP4eP9w5FWdSpoIyXqL+XV01t2ZsBXAO9m3JX4vkthF//paES/ctbSAQk6CGBdxUtN7mrVvpRkyZNauvK7iSHa4KO6Havqqq6c+bMmT3LTevQoUP38676pJ07d47g+fwPCe8fCPs24qj/QI8Jez5xj5Oo03L/E0Jfly8t5XKMs/9+/fodxb3e2kUaHJYhLsxVmB4CEnQPjCRsuroZEaXmTHbSNwmMwkiDdb0jTmeTP9+00cnl2oDIHbr11ltXXH/99d8irCsJ/1uI+58Q9Q3WaqdHwAaX1U8MYoLoXXCLKa3s06t3PfTQQ32ttWf2ROHTq9iVaamTns+zvMgxiXrWBUN+Oulut2gI29lYnKxkaNdnAhJ0n4GGHRw341pXNiAA6nYvA27qefrNtDw/6dcX7MjvQ3yl7S3E+IfdunW7kgrDSGu1E8fvOLcYgV+PwG+2FjyD6XYgjrtswV0tFbSLGHfx36ecckq3dLKiJurY9TWJejp33ltTYXMm6Nzn696LSVtxIlDWIJ04JbRSbKXgXm3C4egnQS8DLCJqX2Kzed6/1bFjxy08wphm4x7KCLKB10svvXQXB/5oi8UzderUo+nm74No9+W6OBph7Mi5apZWiH0t3e+7Of8Oo+dtJH7mZ6I+Y8YMe0xwtfXMZE4EtIHt9R904Zn65O3btz/fqVMnE/XvUhE5i4pKG+NY6T8YOBN02K6qdL5xTb8EPa45l8fu66677h2e09Zyw7t43t3LJkmxucbzRK/DTRBAIM1FFaL+Q1rM2xD1eX6Kejp6BNsiWplankkfL3QdFVGnF0GinpVp8+bNa09Fx8lrpFw32xl4qVnispjHZVdd7nHJqQLt5IY8xLK6QOdFOaOS0AJB0utrRVE73LGJOiw70eK8m5bzlX51vx8eU3lHotL9jqi3sZY6qVH3OxD4Kt2x5eVsft9cm07Kjvwx6oyfBCToftKMSFjclM66zAhb3e4+5DNdyCbq3RH0n3fu3Hm0HwPlfDDrsCAk6ochCf0Ajx1OcGiEs7LDoc0KOkVAgp7AS4HuXJe1bAm6T9eMiToVpE4I+08opL8+a9asfjwyKe7Taj7Z0lgwURJ1vsr2HM/+/xlmv+E630VvVGOmJ+4cbyTYY9KBrhIGTwm6K7gBhCtBDwBy0FFUV1c7uym54XvTRdw66DQlNT4E3VrqbRiAZhPFfA9BP3vKlCk2cC1SvyiIOr0ZN7399ttVffv2/SsD/b4NoCcqTdQHDBhwHNdLlYuLg+vvIIydvSXjwmaF2ZCABL0hj0TsDR8+fDcC4eTVEwSoVU1NzaBEgIpIIkzUWShPm1/LeiIidRUDG3thXqSan2GLOmy6M+5gfCWLOve1s+52rr9VGvAakUKhRDMk6CWCi7o3avFvuLKR7uFTXIVdqeGSX81S76mfTKH9YwrXLyHq76M3pCZKTMIWdTjVv9JWiaKemu7VWWXaZZkRpWs4ybZI0BOau4jCcldJI+z+UR2Z7SrNQYWbmkOgC4L+eTj/gnewx0yePHmgvaoUlA1NxSNRb4qQm/N0t/dBdJ09jqEHxFkjwA0RhZpNQIKeTSQh+9u2bVuJIDj5wAKFSgue05+YEFSRSwYFazN6Qcyu02D9v7y29YMdO3aMYNDcwKg8X5eoB3/ZUMlz2d1ey9fu1gSfKsXoJwEJup80IxTWbbfdZtPFrXBlEs95T3YVtsJ9l0BK1G0A4kcpzH9OBe1OniGPZBa3E1m6pUY8B4aLV+vaWbys60fiS9QDQ18fEZU7l4L+JtdT/axHwaZKsflJQILuJ82IhcVrUc663WlF9p0zZ07niCU5ceZQiNc/W2fdjsRdzvJTKlN3I/CfGDJkyEX33XdfP8sHm8HPReLvvPNOE/Gjpk2bdjIVjKvatm17y65du06257kWn0TdBfXDw0wNknQ5nkLd7Ydjj90Re6dRv4QSYGrRJTyT/ZCr5PHqkLXSn3IVvsJ9j0Ba2BHytiwfYLmIY6sR2OeouD1PPi9G1N9mRrXtPHffQd7sZUaxulRPzXsB5dkirOY//vGPrVJQxUde2tET0BH/XXmNqR89AyeyXMi5M6jItW7fvv35AwcO/A9E/R/WqjNRR/RDn/udgXKT7ZW2lStXfhsu9g36S2BTbezi/iO/z3CZBlgtdRm+wg6GQKReiwkmyZUVCzX7T1MId3eRagqZDRTmP3URdnaYtBBvpJC+i0lFjkhCAZ2dvlL2EVkTrWaIFkgObSE/liHE/4DRG6xX06LeyPIOomwfgDlgC+4OcD0c4lgL3FnXOUG0bMWxjvjpxvme7Pdkbd27J7LuSzztCdvisXfm7TOwe1n/lv3/WLJkSb2o47YZon4K7kL5oIvFb9cj6Z3cp0+fvYj6GVwv/8Zh30Wd9Ft0L5H+b3L9z7Mdlz/m+2/LR3T+BeZO5n8gf1fzxb5fuEyDwg6GgFrowXAOLRYKgdeI3ImgE/aRFDY9+LiIk3feQ4MWk4gRYXt/3axtTqHclcW+t352SuT3I3D2ydTNuNnK9h6O2zfSd+NmP8faIurWjW9fL+vAOaso2SMU+1a7hVcfNsfSA/Q4/O4P0axC1C61eNRST1Nxt0bMTycfnIi5WU1eL3JnvUIOkoCeoQdJO4S4+DSm05uVwkaD40LI1+woTdgR2vrn7daS5mefSD2CZQDiexbLRWzb45crWV+DGF/OcjHL+1lO41gfFvu8anNvOCbo2b+UyFfh3kT9W4j6SXqmnk3Jn31Yg7n5Wf6EljsUwrdKv34JICBBT0AmNpYEaz1TA9/cmJtyzlEYnKqpYMsh6Mavia6JvIl7WqDtHfdci503t7bkEvBcFkrUc1Hx/9js2bMHkC9d/Q/53RApG9YxO5yz8sGV3Qo3NwEJem4uiTpKgeCslU7YHZgK9rREAVNiCiIgUS8IU1mOuL/OLiuAJjyru70JQDE7LUGPWYaVYi6FwsJS/BXqh/AvSL+bXKgfuUsGAYm6u3x8+OGHbVxDf3cxNGvGOAqnZYNL2xX24QQk6IczSdyRsWPH2heU1rtKGIVOZ0T9JFfhW7g8A95HHC6jUNglEqhEUedRU/0bAyUiK8jb7t27XbfOV44YMWJTQcbIUSwISNBjkU3lG0mh+3L5oeQPgfDfz+LyNchthF8/2iu/FToTFgHyxp7VV8xAOdK7h+7q3a5433XXXVWE7/pRltMywRUbhZufgAQ9P5tEneE5999JkDNBpPXcnQE8gx1CewfB2G/CoV80CVSKqFs6aaFv55rf4SonjjrqqDOJp8pV+FQW6nhDQd3trgCHFK4EPSTwQUdr30jnBl7sMl5GVF/oKnxGZ6+lEN1IQaR+d1eQfQi3EkSdNB5ksWvRSXc141HaubyXLJupjCzUt899uOAjFoQEPWIZ4tIcCiDXXWy9+CJYPxdp4H33DRSiL5MGmxzFRRQK0ycCSRZ1rj9rnW+ls2gJFWQn41II2x5ftfUpO3IGQ4XBdVmQM14ddEtAgu6Wb6RCX7Ro0XIKpG0ujXLVsqA1YVOWPm5dnS7tV9j+EEiqqKcqk29wH/2Da3KPP7TeC4UpjjsRxznvHXGy9c64ceNWOglZgYZKQIIeKv5gI7cPaSC4LziO9Vjmj+/jIg5a6U/Q9b6IwnRfqmB1EY3C9IlAXEU9X/JT15wNhHue++iVfO7KOU4cQ6m4Op2Sm/vn+XJslN/oEpCgRzdvnFiGIL7EDV3nJPBUoBTkF7sInxbROrojv4P9yyj4DkrUXVD2N8y0qCNSl/Hq4c8HDx58VXpmwSh9erVdu3Yv8YW6L2Hvu+GdWAAAQABJREFUz7Bze/a1Zft0sdsc+E+yzBw9evRqf0k1a8az8+5c265Htu/hg3xOKiN+81B4xROQoBfPLNY+mAq21vXzMwrF43iW7uS99AEDBjyD/fdSwG6g8NOQ9xhcjSbqLK3JtzPIsy/zxsXwqIk6Yt4WUX+Dbx/8HKS/Qbwzop4Wd9KwEPtnI/ivcsz3a4/K9iVUFpwOEMHuFwv9pG4MLi2ZmEVAgp4FpBJ2uamfdy2GFEyXzp8/3/fXbs4///w9FHxTyKepLO9Q8NrXKyoh22KdxpiJ+k+BXS/q3Cf2NbJDLK9zbBKfnP0NPUU7/c6M1GMql699WjoO8I37F/22XeFFh4AEPTp5EZgldBduobXk9BU2CvCOW7duHeoiUQzosRHvPyUNP2W9HFE/YAWvftEmEBdR5zvqz9FS/ykVxd+ybMbulyD7Ex73PGTXniPK9iU8179/3HLLLc7enXdtvMJvmoBKwaYZJdIFLejnXCeMwvAc+166i3hGjRr1FvNQ303Y/50ueOkKPYS422tFLqJUmD4QiImotzZRpxv+bq6lH2LzD/iu/MwxY8as8gHBYUEwsv1k7se+h53w+QDpcX7P+2yygiuSgEq+IoElyfn06dPHkZ7jXaaJlvPbN9xwgz3z9v2Zo9m9YMGCtmvXrj2d8P8JgT+XVtQgWu72be821mpn7TJ5CrsMAlS+7G2Fl+kGvvP4449/xB6nWHAzZsw4heNXu36enM904t7AdTQZUd9HF3tbxHyfi1fULP4pU6ZUUxH9NJWG9vns8en4YnrmZvkUloKJKAGnr0dENM0yK0UA4XuSQtWpoFMo96EFcjpR/tUF+KFDh9YS7nOMEF5EC+T3pGcAy8kc60Yh2RFRb8e2eqJcwC8zTK4N+9rXfgT09FWrVlnrcaUFaaPfEXV75huKqHPdHInIjud6mkwXu9N5D6gsDOM+dC3mzaiYPGls9Us2ATVfkp2/TaaOgnMMBZjTTzRSYO/esWPHTxhd6+xjFt6E/vrXv+6ycePGGoS9A4JhM261ZCCd14m2I0IAMWvO6HIbA/EWreCNXrOi0lJH1Hd57fJrm4ruEO6NkX6Fly8c4lhEJen+fOd1PDkE1EJPTl6WlBJaSU9ywzsVdOtO7NSp0z9h4CMlGVmkpyuuuGILXmzRL8YEotJSp1vcWuq+ijqv7bWnEnM594bTHCKOQ1Rmn3QaiQKPDAF1RUYmK8IxxAb6cNMvcR07FYczXM0g59p2hR8egahMPmPPuv2k0LFjx8sQc1/DzGPfQocj8/NEqcNhEZCgh0U+QvEyAGhBQOZczah36wLXTwQKJpA0UWe8xyDE3MZ5OP3R82ZfhXvSaSQKPFIEJOiRyo5wjBk7duxaWunOp4Okld6V56XDw0mlYo0zgaSIun0alQr0FUHkBYL+EtzeCSIuxRENAhL0aORD6Fa0b9/+cUTd6RzvlkgGQZ3I63Jnh55gGRA7AkkQdcT8UlrNHV3DR8xrmbM9qJ4318lR+AUSkKAXCCrpzq688sodtKCfDiidl/I8vVdAcSmaBBGIs6hTkT0NMXf98ZX63EbQFwT1VkmCLq/YJ0WCHvss9C8BO3fufI6CYKt/IeYNqSWVh+v0PD0vH51ohEAcRd0qsPSABdLVDjr7xsFfGkGoUwklIEFPaMaWkqzUV5h+X4rfEvx0YSauK0vwJy8iUD/5DK3dOYik2/e+8rAm7vrJZwoZ/T5v3rz2VGCvZwnkNWHmXrAPyBzIY7oOJ5iABD3BmVtK0mj9LMTfW6X4LdYPBdwJfGb13GL9yb0IGIE4tNTvuOOOFjzLvhZza4LINXrYXkfMlwURl+KIHgEJevTyJHSLGLgzj5bP/iAMoaXzIWbMOjqIuBRH8ghEXdQHDhx4CdSPD4h8HVPWzg8oLkUTQQIS9AhmStgmjR8/fhNC+2QQdtBKb0nl4Vp7nSeI+BRH8ghEVdS5podwH10QIPHHaZ1vCzA+RRUxAhL0iGVIVMyhpm8D5NYGYQ+FXmd6BUbSPRnIM8Yg0qQ4giUQNVHn2fqRvKJ5VVAUqBSvhMGLQcWneKJJQIIezXwJ3SobVMPvEUT9YBDGIOrHDR48+Gp75hhEfIojeQSiIuq0zLtSIbZBcG0ConyA+8fu1VAGCAaURkVTAAEVngVAqlQnNoMcabfPWgbys0lnBg0adFkgkSmSRBKIgqhzHdv3zY8ICjCVhz+Sbs0IFxTwCMcjQY9w5kTBND57+iTdeQ0+a+nSLlo1ZzEBx1CXcSjsZBMIW9RtXEiAhNfQMn8mwPgUVYQJSNAjnDlRMM3eTae18WBQo95Taf6ApoeNQu7H14awRT0IctyTdYw9eUjvnAdBOx5xSNDjkU+hWknhuJ5uxMeDNILC6jIGFp0UZJyKK1kEKkDUH7M3UpKVa0pNOQQk6OXQqyC/fDf9eZK7NKgk023ZnBmvrmbimX5Bxal4kkcgqaLO1K4LR40a9XLyckwpKoeABL0cehXmF4Gdy/O6XUEl255F0t1//eTJk3sHFafiSR6BpIk6vVfbWH6dvJxSisolIEEvl2AF+edZ3U4E9ldBJhlRb0NFYvSMGTO6BRmv4koWgaSIOkJ+iHviYe7FPcnKIaXGDwISdD8oVlAYo0ePtm73PwaZZCoR7YlvwtSpU3sGGa/iShaBhIj677kHVyQrZ5QavwhI0P0iWUHhUDDaq2xLgkwyol7Nc8Ob+AzlsUHGq7iSRSDmom7PzZ9NVo4oNX4SkKD7SbNCwrIZqWprax8muZuDTDKiXkV341gGyp0QZLyKK1kE4ijq3HMbbAxLsnJCqfGbgATdb6IVEt6ECRNqeZVtFgXNvoCTbAPlRvKe+vsCjlfRJYhAnESde6yW2eBm8dy8LkFZoKQ4ICBBdwC1UoIcN27cBtIa6CA5Y0srvTmr4Yj6RbavnwiUQiAOom6D4FhsEFygvWGl8JSf8AlI0MPPg1hbQKG4kBbEgpAScTHfUr+MFrsJvH4iUDSBqIs61/bvbrjhhkDHqxQNUR4iQ0AFYWSyIt6GMFjtclrOZ4WRCioUr9Il+StaMQfCiF9xxp8Ar0WewnV0dar3JyoJepoR7YHO0BiVhMuO0giohV4aN/nKIvD6668/xqGFWYcD2aUVczJzWo/is5VBfa4ykHQpkuAIRLCl/rLEPLj8T0pMEvSk5GTI6eA75geXLl06BzOWh2EKot6fQXofQ9S7hxG/4ow/gaiIOj0Fr3MvzYs/UaUgaALqcg+aeMLju+uuu6qOOOKI8SSzVxhJpTDcxyCiX/Pc8ZUw4lec8SVgPTz79u27jBScHlYquH5X8MniafaVw7BsULzxJSBBj2/eRdZyvpJWzTPtm2k1HxGikS/v3LlzvgrGEHMgRlFPmjSpR5s2ba7F5DCnGF5fV1c3yV4JjRE6mRohAhL0CGVGkkyhgOxcVVV1C6LeMax00dqx1+rupyv1nbBsULzRJ8Drj2fTq/NhBsS1CtHaLUzWdO8tt9yyI0QbFHXMCUjQY56BUTaflvqRzG41gYKyXVh2UlDX8Wx9Hp9/fTUsGxRvNAlMnDixfceOHa+k0jkoTAupeO6iR+sevWseZi4kI24JejLyMbKp4HW2PhSY41hah2kkheZLPJv8jbrgw8yF6MRt3wTgmhzB0ilMq7gu91LhvG/s2LFrw7RDcSeDgAQ9GfkY6VTQpTmAgmsUhWeob1XQWl/HY4AHRowYsSnSwGScMwIMfGvJwLeLuBYuCvudc2zYT0Kn8cGVt5wlWAFXFAEJekVld3iJjcrEHalC9OkePXo8PXToUCtQ9asQAoh5X0T8clrER4WdZK7DA1RwH2B8x+KwbVH8ySEgQU9OXkY+JYj6YFrq11Kohjn4qJ4TBepmPsc6n+eWyyIPTgaWRWDevHntt2/f/iECCe11NG8CuPbquA9m82rlG97j2haBcglI0MslKP9FEaD7/RgKsxtpnVQV5dGRY2xZRAXjNwya2+4oCgUbEgGuseazZ88+nRa5iXloAzO9yed6280AuOlUJFd7j2tbBPwgIEH3g6LCKIpA6p3fMXjqUJRHR46txUTQT9Ji/zMFreaDd8Q5yGDtGmvbtq19X6BPkPE2FhfX2TYqGVP1GmVjlHSuHAIS9HLoyW/JBGipd6GAG0uB27XkQHz2SOtpAwXuo8yhvcLnoBVcQATmz59ftWXLlg+Sl+eQl6EOwvQmmWt9Iz0FU9UT5KWibb8JSND9JqrwCibAIKUOFHJjEPUeBXsKwCGF7yvY9YQK3wBg+xSFTdvKB3rOJrjzEfL2PgXrSzBULlalutn3+BKgAhGBPAQk6HnA6HAwBOgabcuUmzcQ27HBxFhwLAcoiP9GQfwM3fCbC/Ylh4ESMCFHwM+iAnZB1IQ8BWIpkys9wDVkj3X0EwGnBCToTvEq8EIILFiwoNW6deuuoaV+QiHug3RDax2dOPQP4nyaZ5/rg4xbceUnYELOvOdnkT9RFfJmjMn4O/bN1biM/PmoM/4SkKD7y1OhlUiAz6+2GDhw4OWI5/tKDMK5N2xbQiH9FBOBvO08MkWQk4BHyK1rvTqnowgcpHfnea6T37I+FAFzZEKFEJCgV0hGxyWZ06ZNu4RC8MKI2/uWCbveIw4ul+bMmdN5z549ZxDj+6Is5EaEVvkTiPlTwdFRTCLwLgEJuq6EyBGYNWvWGTwTvRzDWkbOuIYGrbGWGM/ZF+sZaUMwfuzRGm/JY5iBLO+Dcz/WkS6vsHEfNj6iDwH5kfsKoxQCkb5BSkmQ/CSDAC31o2npjKQ1FurHMwqhaQU57hZj76ssb+iZaSHU8ruxVxo5+z5YnoZARmKugvzWZs5s4Zn+bL5lvi5zRBsiEDABCXrAwBVd4QRooXXgVaTrEPVjCvcVrkvEfTfLQj4A8uq4ceNWhmtNfGLnU6at+ZTpQPLaxlAcHx/LmzUjv5fRS/MQFTm9lhanjEugrRL0BGZqkpJk3a6I+oco6M+NW7oo6LfSwnzVFsR9Q9zsd20vvTCdGIswkHhsOR5Ooc/xX2ya6UV46vXXX1/AoM6DxfqVexHwm4AE3W+iCs8JAQr/kyk8r0DYIzEHfAmJXI94vUEaVuB3ZSW25si75oyP6IlwD6KyY63xniVwjIQX8nEP9s/V19IikR0yIkVAgq5LITYE7NkqQnANBenRsTE6h6GIwSFEzVrsK0jPCrprVyDwO3M4jf2hyZMnH0FFphdpPpbEmIh3jH2imjV7i8li5pBn2xKQFiUhQQQk6AnKzEpIir2vPmDAgA8gEBchikm6ft8xcScPV+zdu3clg6u2xi0/586d23HXrl29yZfeJuKId2+WtnFLRz57yZ+DLAvoYn9GXez5KOl4mASSVCCGyVFxB0zAPsNKlCNYagKOOpDoqLDUIYxbEMTNbG+2Na/ybeYLYpuvu+667QhLKBOWWIXq1FNP7VRbW9sZG2qwqwt29mDbxDsJre+c+Wt5QCXFBr7ps6c5CelgFAhI0KOQC7KhJAIMmGuHyH0EQTm1pABi6glx2Y/p9WKfEvwd7NexXcc5e4Wuftv26c6v37djVAT2eSsCNrKc4627dOnSmoGHrWHZGj+tmVu/NUxtu9pEmzA7s1/Ddmfcd2K7osoN0v3SO++887vbb799L+nXTwQiS6CibszI5oIMK4vA1KlT+9N6sgFzJjj6NUIAcTKBt1etWlWaMDeCJd8p6x15hFnf3srnQMdFIEoEJOhRyg3ZUjIBWuv2sY5LEPazJVQlY5RHCFDZOUjl8NmdO3f+8bbbbquvAAmMCMSBgAQ9DrkkGwsmkJph7qMUyEcW7EkORSBFADFfy6OHR8aOHbtWUEQgbgQk6HHLMdnbJAGbjIZC+RxE/QMscX1vvcl0yoGvBGyWtwVLly79i0aw+8pVgQVIQIIeIGxFFSyBKVOmVDMo7GJaXWeoGz5Y9nGJzbrXeU7+IsuTlTjZT1zySXYWRkCCXhgnuYoxgUmTJvVg5PZHSMKxMU6GTPeZAGJuc7D/FiHf6HPQCk4EQiEgQQ8FuyINgwDTjp5AF/zFtNa7hxG/4owGAVrj67gGnhg9evTSaFgkK0TAHwISdH84KpSYELCJUfr3738irbMPYHK3mJgtM30gQJ5vQMifRMhfYzuUiXl8SIaCEIG8BCToedHoRJIJmLD369fvZLpcP0Ah3zXJaa30tNEi38jnbP/IyPWFEvJKvxqSnX4JerLzV6lrgoAJO3PDn0JBfz7d8XrVrQlecTptXeu87fDMsmXLFmrkepxyTraWSkCCXio5+UscAZtxDhE4j4T1S1ziKihBVMyW0OvyHN+gf7OCkq2kikAzCbouAhHIIsDrbkcy49x5iPvJCEOrrNPajSABelj2kVevkGfP843ydyJookwSAecEJOjOESuCuBKw99j57rV9+OV0xEIj46OZkesR8b9SAfu73iOPZgbJquAISNCDY62YYkzAppRFNM6gO/dEFs0+F2Je0hqvZXkVE17mwylrQjRFUYtApAhI0COVHTIm6gTsIzCMmB6CoJyErccj7i2ibnNC7DtAS/wNBrm9umvXrsX6aEpCclXJ8JWABN1XnAqskgjY99gR90GIugm8DaRrWUnpd51WBNy++74Uvq/t3bt3yYQJE2pdx6nwRSDOBCTocc492R4ZAvPnz6/avHnzQLrlTeCt5d4+MsbFyBAqRrswdznLYuYIWMpz8boYmS9TRSBUAhL0UPEr8iQSQMybM81sTxN20tePdV/War3nyOxUK3wFXenLmW//jeuuu249oq5Z3HKw0iERaIqABL0pQjovAmUSmDhxYuv27dsfg3j1YTkage/N0rbMYOPqfQ+CvZplFW8OrNy5c+fbeh4e16yU3VEjIEGPWo7InsQTQMybP/DAA914/t6bLvqjSXAvey2O460Tlvg6KjD2JbM1+/fvX1VdXb1qxIgRmxKWRiVHBCJDQIIemayQIZVMwER+xowZnRH47ohfd4SwO61Ye/e9K2LfLspssHM39m028SYdG7F3Y11d3UYGsW2Nst2yTQSSRkCCnrQcVXoSR8BelSNRNYz0rkE0a9juhIja2oS+Ddt2vk2qhV+/j6iWNMMd4e8nHBuIVr8Q9r70Pud286x7O2FvY8KdbbZm4Np2DVyDln4iEAECEvQIZIJMEAG/CdhHZ84+++zWdOu32bp1axvEuE1VVZV16behYtCM7XrB3rNnzz56BOp69uxZ98ILL+zTR0z8zgmFJwIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiUKEEmldoupVsEYgUgQULFrTauHFjp/3797c+4ogjdn74wx/e3bx580ORMlLGlEzg0KFDzR977LGOO3fubN+hQ4fdl1122U7y92DJAcqjCOQgIEHPASWuh+6///4hBw4caG/2U4DsvPHGGxcXmpaZM2f2GTBgwLozzzxzX6F+/HA3ffr040ePHr3cj7AaC2POnDmd9+7de8QNN9zwRmPugjhHPvXYt2/fRynQzyWfTmE9iHUHb9wcq+PYm6xfZ/1sixYtnsT2F9gvW+RnzJhxFOH08cZX7nZNTc2rw4YN21tuOGn/s2bNOuGoo45aOnTo0P3pY36uyYM23CunpMNs2bLlipEjR25M75e7NvsPHjw4gnDOJv/OYN2LpYUn3H3kwUr2F3H+GbYf4379u+d80Zvcw6fjqWXRHnN4wKaiyo8cQehQCARahRCnonREgNbdTG7E+kKKAuJZormg0Kjw990lS5Y8hfuJhfop1x3C8gHC+B+Ws8oNqyn/e/bs+R5pvJqW8DGIRG1T7v0+T9wtKORHsP4cYn4+4bdguz6a9NobJ8fasG9CP4j1RxGHZvBayTKjqqrq7muuuWaV132R26MI73+L9NOoc1qeA3CwrFFHRZxEbCevXbv2b3j5eBHeinHaGwYvejx8ku2fefaL3rReFmweS559AftPbiKA1rjrhxtbhrP9PbL2NbZ/0qpVq0lULvY04f+w06TnDxzsfNiJ0g48g7f3l+ZVvsIi4K0xhmWD4o0GgQEUKl/7y1/+0jpAc75OnP1dx/fQQw/1JI6bWI6kwL3ZdXzZ4SPkV9B6eo0C9wHSa4VkqfddX/x/tba2djk9G7+0ln52XEnaJ60fQ+S+Foc0YedVa9asWYLN92JvU2KeM0n4PYHlbirmy7hebszpSAdFoBECpRYsjQSpUzElYMJ6DK308UHYT4F1PoXXxcTVGWHq7jJOutq/QFxVFgfrLxJfS5fxpcN++OGHj0B4Z9Fam0e8A9PHvWt6Utax/xjrH7H+Jut/Zfkuy3SWVziW6zmrVbpuoaX/OkLyWcJO8qOzb5PGUaTX1x/sfGHGtVSDfdPIgzkYeFwOI7eTj39guZPFKiefZW15/H8sT7K/I9sPYfWi8selM/1XhN81+7z2RSAfAXW55yNTQccpOLpQiNQXHKz/la7D+1w9u0xjJZ6vp7dpkVhlwrfnl+lwbW3Pznfv3v0Jz7HjKMyvY3+W55jvm7TKB9LN/ygBH9YDQUG+huO/pGv1QbpWX20scivQ4XMpvMbi78OsvZWRTuzfhaBchrvxZTwD/jw2mE3l/Kxi4vuP9JHs5pOoAK4aNWrUU35F0Lp160NcB2UFh019yJvHsPHE7ICw+RGOWR7/lnypyz6f3iff2lj+sm89R1daetPnbB8bX8TNpYRRyOOM6xgLkLeHjYrldMLsYuFj30LGZXzJtvP8tuQ5rsMRJiBBj3DmBGjaAE9cx61bt24c+9Z16ORHBcIGClkhVv9j2+J/LrXr64ru6c8QYMesQL/CvjNBpwA+jYL4D8RRX3im46YQNdH7Dwr5KY0V8mn3tsbdZlYzbaGS0I+W21fZvglm3nv3MuL7K/EOw32jFQT8HvZDBB5jwN2Sw05E5ABprcIUa62eT/pej4JZiPmx2PU0S+8se/6EUH6eysfLWcdz7qaug3mcnEf6Tkbcf0iYH/I4Pp68fYa8/yB5ZM/Y8/4YXPp43pOcoOK3l7DTTjYT3mPpHa2TQUBd7snIx7JSQQHUoBXJTW+tdK9glBV+Ds//kXXMW6HIOlX67rx589qTlttzhHAalYpMhSLH+ZIP8bz+GArg+QTQQMzZv6ddu3YnMJL5l6lCvOg4KIDfwP/HqBCcQeXg2awAjibep2fPnl3wQMgs/5HeJR+tp+JRRM/p45lCIFivDxWrR7HJK+bW3P88+fPBQsU8Oy6rjOH/w+TtxzjnHbh5JK3r33FtHZ3tR/si4CUgQffSqNBtCqZsQe/H4LHRLnDQsjmdcK/whk0B1iB+77lythl5fStpyykAxGktXV9/iE0bntfPJdCenoDt9aRP0Hq69eqrr97qOV7yphX8iMaFhPufBHLQE9DrHGu0FedxG7tN8rIflZZH4NwuTON5lDKF+Id4bNgB98vJ4x+xzjSBPeeL2rRKH70mQwnL+xjqaHqbHgh40GpRdstx+AQk6OHnQegWZAu6GcSxf6fg9D6v9cVOws1unVtcvrfQreCjFfUvHqNN+DLdtcT5Qev695wve5MWpI3aP9UT0EEK5TEU0BM9x3zZJNyDhPsNCv4RbO8h0D8xYckliL110Sf5dy6iboPQQim7qJDeSNzDPYD30WNyJXnxe8+xsjfpjXmefLVepB2ewM5l0Oq/e/a1KQINCIRyUzSwQDtRIJBLUPvTzefrqzNUEOx1nquyE0zB5XsLfenSpdbD0DcdF3E8iPh9Jb2fWmfvZ50ufJfnk4Nx3SA8HmV8kYL+/sJDKd4lBf9c0nYBg7w+cuWVV3oL/+IDi6gP0rcX07Z7zBsBb5u/INAf128HxPxHWZF+5vrrr1+QdcyXXeu6J+3ZPWVfwQ7f7xdfDFYgoROQoIeeBeEbQKHhLSAyXbgUXr620mnB/jthekfx1ieeYzUUUjm7xkuhY3GwfNnrl1bUdyl4beTxIs/xq4h3kGe/5E3i+w+WVukAYPp7xPb/0vsu11bw0zK3VnpSfzuojF0H0/2eBH6B1vKnPfvON7l+P0Ued/NE9Du62X/u2fd9kwrhPNJ9bzpg4q+y+yi9X8wav2U/DigmPrkNnoAEPXjmkYrRBvh4CykKj7vTBnJ8IN2bN6T3y1lbC5bwrk2HQTwmrpkfvQG5egky54vZYGDY1cR1gsfPYwje34jT3oH6vud4C9L3Jc9+SZs2+hyPXk7WDXubxVdSgPJ0GAEqR7+D523eEzxSsVf2vN3f3tO+btsjHK6pBo9wqGR81tdI8gdmPT+70qex40Yqoj3S+4Wu4XdYZbpQv3IXDwIS9HjkkzMrGWjjbZ03Y1pRm9TktXSEbFur2o/rxFoV9eEQ5h6Wz7AcSMdDHL4JOpWDBgPe6Pr+bjqegQMHziDet9P7bI+lpdcrvV/KOvVoIsOIMO+lAvFmKWHJT34C9ETcS15+y+PCps+dyViI93mOOdl8/fXXP0TAR3oCf4BKRiCv+tFKf4dr6meeuFtTEb3es69NEagnkCmExKMyCdDK8Qr6LuYIXwuJTKFJgTmYVtDIcuiknvllWrCE+TMKZxPVjLByzGtHydEhzpfg+ax0ABSETxPXU+l9+/gMcf0wvc92Gxh8Ib1fypo4sgvXH5cSjvw0TYC8/DqupnpcVsP/1/a6oOeYi83rsgL9Zda+0116fDLd7qmIrnQaoQKPJQEJeiyzzT+js95BX24hU2jOppBc7InFng+XfK3Qmvg3/LdMhVfbtm3bH9g2x97wxOFLCx1x/ponTIsj0zpPH+/UqdMv2N6U3md9mz168OwXvGnTuxJHZqYwuP2dFtXCggOQw6IJMADwVjwtSHuEfw96muaXmofpcBpbk68fTJ9ne3OvXr2eTO8HsabHx8Z+ZN7SwIZz9QpbEOTjFUereJkra/0mQGHoFdJ6QaewOEhL91ucm56Kbwj79vy76BHbtM6PYxDPGMJKm/7zVC+A7ZugX5I64bUjdai4Fc+yz6L7Ox2eef4bg5bmZ4cyfPjw3aTnx4j/HalzHZke9lNsfyfbbVP7dXV12d29f2jKT9TOw2Ec3dbed56LMpFK4SEqgXcV5akMx4hbHeI9gvfBbaa2dGVqCPsPIXIf8fsTwLCxqZGPTZvM9p9dT42cjitr/Rz7g+wYNrRbvny53TMm9AX98JO5CQvyIEexIyBBj12W+W5wpqsbIc+0mBnwM5uC/uvEVl+AsLZW+gO4KapQQMy/hr/66wy/e+k6zAxKs/g8ZUzGjlJTmN06J/zDWufpsEmfCfqX2K+2Y7i9ndnx7iz206pUILyD7yyol+wvTj/y4N/KsRf/dk0EJuhmq03SQ2VxGL0/z7Pb045hxsW8p21d4eNt368f1+wQruNMcFwrr2R2Atyg4vR3rtlMjGwfz07Bgo7d9vZHxr82kkeg5G7U5KGozBRxg2eElPt9eZoCraAD7P9Xeh93J9ECvia9X8iaVnAf3GUKV8KwaU9Xe/xmKhAc60T39ZGec0VtYpsJa+Ydd2xfSqvxwXyBYIdNwJJ55QjbjmIO+5vyuW/keBfvOSoK3vR5T2nbZwLk4Up426yDu9JBk4/W23BHet+PNZW2rlnhlPshm6zgCttFwDd4XbJ/hHe/qW3YSM2bghTz8xL0mGdgOebPnz+/E/4zIsr97hXYZrRMZpowpuPgvLXSC371BbdfZWlj/gmnjhbGf6fDsjXhN4iP1lbJ3e4Ubl/Jsu37xPlec8YbcWqbZ/l3srkvfQr/RX9alThq0v5tTRjbvPvadkuAkeZ/JYaR5MMBT0zfYCBnpiLpOV7SJmE3GF8RVh5jx/asBNT3LmUdy7uL/4Lv3byB6ESkCdR3hUbaQhnnjMD27dszrXOLBMHNtNBt31rpqWfpU2yfguwUWsLWCp5j+4398NcL97ek3bB9L4PF3k7v25pX5N5AxDOHEGUT9GcyBwrcoOu1L+HcmHZOubWaykK9zeljudY8y19FwW/TiE6w86z70RqzsQKzc7nPc8wrJM1IQ/s87oo+jG02F/3RRXt818Nixg8U9EU5WrnnYfeyEuMJ3ZuNk4DVpzEk82oX3H7Bsbe55v5QroGE1aBlG5YwEm9Vlil15aZN/pNFQIKerPwsKjUU4l5BP4igv5UdAIX9DNx9neP1blPbTQo6Bc+XWapS4e2jNfy97LBtqlIK3Y24627nWHvtyXaed5/nm1/kZGuPg/+hMlJoYWct+ZuIu771wtom8ShG0Bu0mmBYVDeox+bDNrHFKkTnHnaisAOWhoIEHXeb7V3nwoKNpivsn0hX+3FYZ/lnP7seHub6uoBzZb11wPWxi7yoDzT1Zz1bYfyye4N2hmGE4owuAQl6dPMmCMsGeCJZlUsErZVOofhfFGj3pdyeRiv9Sro653r8NtjE/VEc+Hj6IAXifbSGV6T3vWvCtW73ekFn7bXH6yzvNq3z7rTOMz0BKYen2Cj2vJ6yTlBJ2cyheiHGntNJ34dtZrIsZ/l2G6SLFv4pOMzLJl8gfh+HeYOKht/hRzE8hPtr5Psx5GH9nAesTQDnc42cw3W8rlSbYbnK65dwreIQ+I94G1R4qTyuDNwIRRhpAhL0SGePW+OyCogGz7O9Mffs2XM6n1O15+f97DiiZS32vKKFO2sxtzO3FIb76f7OO9qc8zbSPd0KLVrQaZ1/jmgadHMT3gQWi76kHwJvrbyCBB37F3rjYj+dlpLi9noirFr293iPNbLdEjvqxyuYG7YbPN5oxF9iTsHrEONCbtq6dWtv0n9hKmH2OObXv/3tbz9w6aWXZgbPFZNoHg0t5bXGjBfiOT2zE+xGg3hJ45Jgo1dsUSegQXFRzyGH9lEweWv8DZ6fe6NNvXP7bc+xM2jF2ujiw360zrtx8JOeE1NoHb3p2c/ezFQkKKC89mS7O2x/7ty5HfFjz059/RHmxaTvrEICHTBgwCu4e6+05716vyY4ocU5lKV9IQs2/KvXXlpvGa7e40nfHjZsmL0aaeM8MpOwsP2+d955ZxYt9ZalpN9ekeNeec3j95x58+Y1qER6zjnZxPZ2XJfpSopVlJdyXcT6MYkTUBUeqAS9si+ATIuYAqJRAaCVPhVUGdGnFfuNPOj+meP1o28J8wDC8p087uoPU0h54+2Y6q5vzEvm3K5du6zi4B2BvIU4V5e4NOiSTbXSM3Hl27BJTIgv05onPVW05kblc+/w+Pu9YWP/i979StqmArmZ2eQuI83e17yuoKX+o1I5kMdPpP2Sx+0YUPrR9H4Qa3qihhFPphKBPY8HEa/iiBcBdbnHK798s5YafwcKOHvWXf+jgMiIdfqYd22tdJ5PfhuhuMeOU6idySCkYd6Z2Ni3GbU+4/E3jWfRXsH2nHp3015d807awVGrZKw/zGHWAbpWq+ha/UL6MPZb1/5pFOYlPVfE7uak71XWJ1qYrK+mlT4Q+5vs1iTu6bi3VmH691X43oMtdekDLtdMiNOWRyIXpePAnjW03jKvG6aPV9LaeoW4HoeT5gUsaSH8NBXGN2GTmcu/CCYzceu9tu1RT6GDDouIJrdTrq/MtW4uqCgHFndui3Q0igTUQo9irgRjU3b3dqPCayb16NFjCqtM9znC0aCVzv7nOd/R3LJ9gELI201vhw/74a5BvOxn23WYHzuwbds2e07ew3NyeqlibmEQ7yFW3/OE14LKy5c8+3k34fIrTq7yOOjLOIPbPftON5kQZzQsuqYjIS1z09uVvKay+QJvadwIg4MeDj9A1K/x7Be0ScXuORy+6nF8LuFYhcH5j4rJPxHJBemIyN+FXOtPpfe1FoE0AQl6mkSFrRGcBsJJwddoC93wWCudwiTThY6InE2h9hE7R4u0hn2viM2kQG2ylUjBtA7v3sFKmccAFm6uH3G1zBJbK7C9YpzLW5PHeKwwC0eZCgvbY/mKV/20oo15Ni60mP7T6wb7voWdQ7zHXGzn+E63VU4muYgrjmEixHPhYRXN+h/XaHM2pnL9n5c6VNCKMA6Rxw0qqIT1Y7vuCwqgREeE3w6v/8/rnXjtE8dWAdVPBBoQkKA3wFE5OxQKXuHcirBuLiT1fE98MoXJWx63X7dtCsjPsuqcOm4C26DwSx3Pt8pUJhBCr1053dNFP5ITx6dPYs8culEXp/dLXaeE+ftp/zCq2rt3b0YM0sdzrakQ3cvxlzzn2mLngxTImZaz55xvm8xd/p/YeUI6QFg8hYhV7PPzNAfvmmvDXmH83/QxeLXjOqt/dJQ+VsgarvfD92mP22PI4/sIz1k5Svg/Ib5M5Zv4nyM9Mzw2aFMEMgScXYiZGLQRVQKZQgIDM4LalLGpQWDeVvp5PGseQaGWecZHoTO7GIHFfabbnW2vXfnM+ar3BHHnfS3O666Q7ZqaGmvdrk27JexPFNIKo0J0AFG/Cfszr5nh9wTGKTxaiP90fMWs7U0D4vhy2g9xWysys58+rnWzZlyP9irlwx4WbT3bBW2m+H4cx5keJfhfVcycBwVFlHJEuN8g/JvTflLX1sfMjvQxrUXAS0CC7qVRQdsUFF7hzAhqIQh4Ves+3GUmVKF1boPC0i3RgwxO+69CwvG48cbfaAudQu5y4jrF4/d3dO17W8aeU8Vv2mtPiOKdHp+daCV90rOfd5MW3D+w7RNZDs7F//OIupd3lpPidxHzK2llPoTPzD1M3D/FhueLDy35PhDBg4x8H0NKy+ID39cIq0Eew/1TPHq6jzxu4wdJwmvBc/Mfkb93ZIX3aSomC7OOaVcEMgQyhUHmiDYqhYBXOAtuoRuc1PemM610DrVNQ6Owe5DW6qL0fiFrCrCMoLPdgYLRO9itQRAUcl/zHkB8fWudp8Olpf0z0uF9BPF5G0mePt/YmsrFFPw2sJE0DUbUX6aQ/pwV1o35b+qcPTNHPL4JhwcJyysgL/Xq1ctaofrlIcB1uYe8Gc7psuatR1Sncd39hzca8mI8vTFPk8fe+8rrpKBte7OCSusfcXy71wPxfYt4NTbCC0XbhxEoq3A5LDQdiAUBZs2y98Qzg70oLDKCWmgCaO3ch9uVXvcUlodKaJ03Q0AbxI/45WzNUtBdSHze0b7P8YnUJ702+LFNwb+TtNyVDovC+iheCxuf3m9qTcH7Pdz8m/FIuyWMDmz/H2l4BUEeQwWhVfpcIWv8N7cu9tdff/0Ftr/OkvFPPEvbtWs3jDEAtYWEVcluyBubjGUYy6ZyOHDd/Rf+v5kVxlnkxavk7/dZMq+EZrnJucvgy6Pxcxe9Xa+Qtw3mFCDM7xLf13N61EER8BDIFAqeY9pMOIEtW7b0z0piUS1084vo1SFO36Wl6B2B+zDHva/2ZEWTd7eBoOPKWjlPZ7vO0Tr39hJkOy9rn0rGjylYv8hiQmzvpdv2LyhcDxYSMC3171BAW0vwXharQNX/COMkNqauWbPmh5x/hO1HmVr05Vxz3dtsZDt27DgXPxfB+kbWh7X+sOcvfPjm8hEjRmx4N4bi/xGRR7Flb/E+3/OBUFq6YvGzty/g+VGupycwuKCel1wJI5w74LaKcz8hb6rMTWr9JfLlc5ybz3oex55lMOkbqZ6t+qCse574T4L9Obi5msGXQ3HXoDzmeB3LPyPmd9d70p8INEGgwQXUhFudTggBCpL+WUnJFtSs07l3Eb17KYT+laUPBY8NyPpWbpeNHz3qqKNW0ALe7ynQDhMuCsDT6NK8zBPSq9dff/2jPNP0HPJvk4rJZrpPf0aI6W7s/ojAtezfX2gsiBxm3/8iPQ6/JG0XZ/k7kmO3cuzW2traZhT+O9nfDMftHLNpPo9AzO1VQHvNyoTCVpmf8WbnJ507d/6SPffPnChto392+MUEk7KlGC+hu0UknyU/x5Lu+9OMSzGKPP4lefwX8ngy4WTGdrBtj0OuYn2VhcvbCAe4nmwK2VqOdcS9TVucM2/NPe5e4/xNhP+C7esnAoUQUJd7IZQS5oaCwivo+xDmt0tJorXS8Wfdy/abi7i+8u5mcf/2uhg2ebvvDxN0xPyr3lAp8Jy/i0vL907iyYglNn7Fa0Mh2zCymckuobJzBe7zvk5G2NYT0Jf1SSz92O7Mur7Az44Hm/7Acjbh3u6DmGcHXzH7iPqDJPZL5SaYPP4bj5rOII8/Q1ircoVHXrbk+BGse7Pu1EjeriNv/4UW/an0AEjMc8HUsbwEWuU9oxOxI0Ah8RSFQX2BwnbegWm42UHi5lsCcbeBAulAqYmlhXgPU7BeXMqzc2+c2GQt33QLp0GhyDSvnYijPefrbWa9nfjMvdMf3eBraVV9A9suSkdEa6w/vIoeVIV4PEoYj9IqPJ0ekrFsX8oyJB1uAes3cfMrKl+TS604peNAeN7EhjTL9OFy1g27D8oJKeUX5s+wuTG1a70WTn5Uin5IHneEh7dCWXRcqXvobgYt/pzW+NXcVzZD3T+xZB63NBJoLel9kmUGsw4+4HAsxOPE0TVlxz8asUenYkogZwsgpmmR2SIQKwJUDuxb7qdSyPZDAI5m3YG1VVzsgy+7WFaz/ybrl6gQrIlV4mRsMxv4uH79eqvADSEfjyMfrdelHeu9rLdRsXqLZXHHjh3/op4WXTAiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIxIdA8JnbKzIgQmDVr1hk33HDDX/0y5+GHHz5y7969fdPhtWzZctXIkSPXpff9Xs+cOfNYwuyWDrempmbJsGHDtqf3y13D59Sjjjpq4dChQ/eXG5bX/4IFC9quW7fupPSxqqqqlf+/vXOBt6qq8ziX9zMYBbWHRoBMNNKQg2lUKIiQFMlDQiQlCM0XCAlqNZ+mz0yDmZYPHvXxMWMgFDrgEIoyZpraYybTBi1lqPE1gIDIQ7kgyGW+/+Neu3U25567z9773HvOvb/9+Zy71n+t9f+v//rtff//9dprjx8/fpujo+E999xz1KFDh/q49M6dO28455xz3nR0U4Rg/z7ub1057m8Un2j7ampqDrZu3Xr/O++8s+P8889/PZqfhKY9x8N3rOOlbc/QtkOOThNG/y/SyHK8POvP8qy/7WiFzQ+Bts2vSWpRuRDAWY3ESaxbtmzZWVOmTPlZFvXs37//uMOHD//WySL+MPGRjs4yxMm1waA/Sh29A7l7d+7caUY5k2v58uUfBZ/f43gvRODSTIQGQrZv396nrq4uxGnfvn0zyVpYXx20cxTtXO7ya2trRxB/xNFNEaLPavTaS91nZF3/li1b+iI/xKeQfO5NLpn7tI/Ien6Ptm3bdilO+I+FyjeUxv2YQxn75S4ceg8iuwMyVcD9nYyAm1MJiTDzrPcnaWMkWWQzQqB1M2qLmlJmBDBgXwuquDarqhgtrWf09JgnbwQdhwEenVkUZzLWc+atGLEtoWOyM7MKWrXK4UMdV/PT7JcHLJ3AEWAymN/pjGxP9bIyieKYD8cVhA6d+J3K71qeiefQbQmdve5x+V05ntvYdToehUKgnAjIoZcT3WYkGyd7GgbwjKBJZ2IE/y6r5uFYFzhZ1FHDz0af5biudELNGHPd6ui0Ifj0RcZEk4Pck6BHp5XZnPjB23UGDZ9rKqVt6GIdrwtw7L/BqR9XKXpJDyGQBAFNuSdBrQXyeKNz13ozyl9wRJoQh76a6dBXkJFbS6euCzGuX2MqNJPpS9MNB3sydXza03MdswMveHSqKLKvRkAbJwRHYbMYDzi6JYd0/j4OHsM9DMYy7f3hLPHHIefNiNCB+B7P1ROuTupvza8L9DGEAwmtw3WMl/9hZKxiLX5o3P0PyMmr08kqR0h75lDfpjSy27VrtyUNv3grHwE59Mq/R02uIcb3b1BiTESRCTjdfjjdP0XSSyZtIxF1LMJgXR8wd8FBTid+U8nC6mFA3uxI1i0ROjG5cuXK97Kxbyr6hzKIf4qp5SGTJ0/+VZjYQiM4o2sj2JBUMw84vpwVJDblfvDgQV/c79i8udpP8OM8u7af4ivo9T3SO1oe8U+wFn8x0cVGN3TRBlj+cs8bKp8mn/Y9yP/JhjQyxNv8EdCUe/O/x1m00AxydDTSGgNqRjmTC4N1BwbSNivlLuq7nF8mz6dNpSJ7kpNN/AUc7TpHpw1x5jZ66hCVQ1rFTC1HdWssmpkR2w8xtkB9X+S+vL9AeqMkWSeSGYLFPAt5s0zcs6saRQFVIgTKgEAmBrMMeklkhSDAKLM3qpxXSB2M4VRzloXySk3DwL4Bz92OD8Pad8WKFZmsQzMSuxR57T3Zt6J7JkOr++67rweyL3GyI+EY8PlIJK1FkSyfXAM+0c6gjYbbc1/mNDUYOPU16PCgp0cf7plNyesSAlWHgBx61d2yxlUYwzuPX7g0gyN83mlAegdG6dGpbJddcsgoPdwcZ8w4g1klC4kwrF27tgN6+g53V8+ePZdEiiUmee3uCpi7OQERfGpwWra23iIvHOMJYH++azzYbCUevlVA3sXWIXL5aUJwPqLTEFcea+15ex14pj8ahxf9E9cZR77KCIFSEZBDLxWxFlTeDregudO8Ju/EKI+A3uXSoC/Bab7H0WlCRunPIu8xT8YI2zzl0SVHd+/ePRkma0fuQv7to0aN2uvoNOGaNWs6Y9T9nfMHOPDlbGS+7OSaQwsOIHFJLSbEyc6lse28Bn8f5+m/O9+N960v9/ITR20NPSkzz0TeZjF0jNXJgC9xnUl1FZ8QKIaAHHoxdFp4HqPP2TikTg4GM8asPW8mXOzSyO/OgRWXOjptiJEMXyVDto2AZqaRySjfd7iHcLiL0sjzed96660Z6BieOkfejyZMmPAybbCNVu5qR5mvOqKlhIzOe9HWGV57d3Xp0uUHYGH3t9alQ8+yU94c3RQhOuQ5cOi34uhBOY3Q4wClMo2GgBx6o0FdXRUFo+7LPK334gxzO8MtxGntc3nEZ9vUtqPThJy29VP4wxEucXuFrXsSmYzuT4dvkMf77+ZwPTpx9KmnnjJHbSPQ3AUGhxglfteIbt263QkdHi9KuYtow1HvlmwZfxmdX0m7w84grV5oR8+yZv062NzpoXDM5s2bp3l0omiaKXf0tOckvKDDZaUwUREhUAUIyKFXwU1qChV37dp1GYbNd6S3cXb4DtMlOEP8X51elDuOqW077jT1ZbuPMfjhKBrZXTHWSQ3+7IhCN0foxOTGjRunoNvxnoB70T33Ct+YMWNqybORqLu60AZba28R1+rVq7vRfn8qvZZ7Gr4mSMfnRmj/rPu5dHjCd/gbEyTqtXX+L3h1buN97d95tKJCoGoQkEOvmlvVeIoGU6ChM8T4HsDI+dPIrQKjfMhphVG0zXOZPE/IthFuOANAHVcgu8bVFSfEUH8Ins97ZZ9mdPikRyeOmi78rokIuC5CL6QN/tTtTFtzj5RpluTevXttCaaHaxw43G4jc0fT8XmF+HJHE/ZhI9pEjy45yjNT8nq23Q86Wj+msnDKn+WkBdapLFkBMQiBCkAgEwNcAe2QChkiwOEa03FYx3oil2Dk8k6pgn6RMitcGeIn8s7xeEenCZH9Bvx3OxnI7lvqUao4iJnw+893OEJ0cpOGvE43Dp3CzXo4rAdwWOt9ecEZ8be5NMr33LNnz3RHN9cwWHrxX0c7CD55ncGg7d8l3XfC0Q5SSRCVOuVOh28Q9+Nx7ssQVxH6PM+STyFdXRGFQqCiEWhb0dpJuUZHgNF5Wxz6PK/iOoxebm3YS8tFMYDXkxe+lkTcjPK/RcsloRlxLcApX+R4g1fYHnB0sdCmfNmwFp5Chp5bkfeTYjyl5KFLeC658SF/fiF+6vy+TbWDi3sHfi74/jDu0aKFZFZ6Gksv02hveDYB2CxlI+WrUb3pAP2BPQ72DribRRnEEbGj6AhldeDPB81pc0KgzewY/l25b6aXdcSG8Wx9kjC80PNV7tdn6UzuCxMrKEI7LgSfbWlUAtvMOrVp9BBv+RCQQy8ftlUpGWd+Hga5t6f8vRiCgp9ctFEpRnkt5UdbecLBvKJ1Jgb8EY8/URTD+iwG7FGYh5kADO5Z9gobdb7QkECmfL9EmfBVOnh/gLwDDfHFyUen3FfDvLKP095feXQYpc5NlF9KgutcfJANYJOgl4WFmlEEB9oGR5nXGWQK+/oiTfwOec6hWzHrECZy6DjjvKNfeRavQ5foMojVccTF87GWxOncr61HZBZJgI9q/EmGIoVTZtEZ+XpKEcYuh54BiJUswp+SrGQ9pVsjIIBxstHMtX5VrJ2b0a33wqjl5SPDjHImF7LDjWWmG78GN5YF5WY5BZDxNmk/dHTaEHl5o3PkFRydu3rA7wbidY4mzAwfT2ZFRBlFWmelj6fMSs5T/x+PzovSOfs1CY97icPoAH3co8se5X7a5rytdDxyHwYqe4WqQAiUEQE59DKCW22iWaceg/OzD7HkLozdWkYtv3d0oZDR6ROk/9LlwX8Wck52dJqQUdcadHjJySA+taFDbJgh+Bzl+zkewp/gOEoaeXm8eVFzNrRvuJf4dENTxOC3Ab3v83gGIic3o+GlNYsoo8i8ziBOssERMmvWeR1CgEjU4Sl1Dd0Bzv1sy28anZH/YgboIZ7d/i6voRC+kjZqNiRP+UIgLQJy6GkRbEb80bVhmtagQbbm47DyplWRk8goR6HEGdpu48UuHQPaldfppju6UEiZ8CAZy0e3zKYZkZU3Oo/jsEyHAtPOmeBjsivlwhFaR2qg0wesHqKz94yj6wsZwT9I2f/28scydf/XHp00eheMM5E9i98c7sE8ft8ibq8uruBnpxLmzZfz7IzCsT9diR0udB3Cr1eaH23W1cwR0Bp6M7/BcZvHyPYMHPFprjyG4wlGtk86uliI4XICcKsAAAvdSURBVL4f/ucwiCcF5SZg4PtirP9cjC9OHjLvoNy3+HW28tD2FTY72CbPGFsejmAg66ZnWjy4bH27QafiChcLac8A8DnHK7OB9q1CvpdUOEq53+IkbF+B020oo8FPBFPOhZmqLDXaGWTkHaszGDTTOoTLg7j7it+MUiCIrqHzfPwH+P64mAz77C2nIU6j7FU8U0cFZbsQruT+fAb+XxTjb8w82vcGHdzXG7NO1VV9CMihV989K4vGUYOMgTuMk877WEp9FePsLKvW5cPaBnm2OeoSl5Y0ZEp7J87wbvgvDmT0oz6bsj5ixzvOPG90jlPJbHROe/K+GoYTeBM9bgGjWE2DP282DIxslD42FnOFFwKDT9O+IZ6atdATSZ/opRWLtiHTHrncFDbYXgDvN+ksbS7GlDaPUwO3IGM+ztvOPVhB/acHMjsSX8J76gPskKD66oHHdK4vW+lCoNERkENvdMgrr0Ic08lMNY6MaDYUozw0khabxNBNxVD+A6Oc1OvXOOYF6Occull+e8c8z6FTV0/SpzgFMbYvMcW62tFpQkb+J7BGG8o2WdQ12H5J5aLf58F9AKP355PKqBQ+cIjuwO7Ms3NFUv2Q1x7e2fyuTiqjFD57RrnHZ9MhtBH5KQHvCbynfhXxfypFlsoKgaZEIG/U0JSKqO6mQwDjm7c2nJEmHZFjRjn1hdN7Dgf4c0/QyALrrF8h3+p018JgDd7RiUOc+VycTKadX+TV0ElpFIeVuOExGLkPg2jLZ2IULakIMi/J6tOqcSrmWdlHx3EqZcM3EnjmwnMQCsmwe1goXWlCoKkQkENvKuQrpF5Gif0xTOM9dfZjyDal+B3wZF3a0K50r2xD0XD63wwpoykbpecu+1AKkcsC0oK9nTp1utOjE0dxWL1gnuEEgMuBFNhsQs5+J4twCuu4H/DoqotyH/J2toPN1qT40PgdHgD2adVLPbpoNOkud1+ozZag+8MujefseJZ7TnS0QiFQ6QhkOuqo9MZKvyMRYHRua7lhx45p6rmsXS46smS8FKa+v03Jb1hpDGJ3dqXbyNnexU51odNPWVd9CZm9TRCG115h+/ro0aP38KGUiaS/z6vgrnHjxu3y6MRRHEX0q2E3MEX790kF4iBsKtp1TtqxKeur0ParuovOTj8c+kRP8Vf69+/fb/DgwQe9tNjRYNnkZRhyGyAJr+RkvZs4Wc/vBBWUF90UV7BQjESeqyd5lka5ooza+xHf6GiFQqCSEQgNeSUrKd3Kg0AwOvyiJ30bBuxfPDpJ9GaYwo1EGMc5wfneSWSFPBjaOn5hRwO5XfkO+zQrQKcknNqnzGEOc3EOM+RPEin01TDkWPsSX+hmMwfbnAD0vQgn/1eOrqaQzo4tGYQ2hLbcmNSZW7vpKNmnVW9zGHCPj33ttde+5OhiYRYjdJNPnW/49UD7yzh+luJCoOIQCP8ZK04zKVR2BGx0iMGyDUi5C2N6k60lOjpJGBjl2z3e9zJKv8CjE0dx3OYMw84C8Sv4UMonCU9xQmnPQ7Rhg6PThA19NSyJbMPXcHa86NuVWZHLHV0tIbMlNiNia865izZtZ5RsrximupBhn1YNl23AJ9anVW2EnqrigJm6e/lyqH+7T/txymZSpy9TcSGQBgE59DToVTHvqlWrjkb9cOc4xml3jx49FmfRpA4dOuQZZWRm8mlVe4UNPZd6OvZjZObTrZhhSDWCdrKDWYU5jias76thXpF40QDnXa40TmMW09edHF0NITrndQahb07bGbR2I8P2GfzIYYDcvmwePNfR5Q7pNA736+B5syWAghe61RTMUKIQaCIE5NCbCPimrpYNR7aprIvTA8O1yNajHZ0m5P3e/8PYhY6WeH9GdOPSyPR4o9PpH3J5tOH5SZMmPezoNGHcr4YlqSPAeaHjBZ9eOK3pjq70MFgisL0R7trDUkK4HOISk4aMtu3TqoccP/jYPo+yX2wQtZmeoa4idHiOvRuvOjoakq8RehQU0U2KgBx6k8LfNJUzGuyKMQp3iRO3V3YyGdl6LboeuZkbZab0/4Dcn3v1hFHSb+WX2siCjzsYx8muY1rcTjPL7ELPWxAWLh/gtGJNLWemQApB6D4Tfbs6EdCLGFnvdnTaEFl/QsY9Tg51fYwNc2c5ulCYdg3d3sagU3VXRPayCC1SCFQ0AnLoFX17yqMcxu9ijORRnvQ7MKL1rhV65WJHg0+u3usxnIJRHu7RiaM411sLMO/s2rXrkgLpJSdh2CfB1MdjLPrVMK9c7GiBDWC9g3pjy2iKguvWrevCs+N/zW5fx44ds+4MtmKUfl2kc5b3elyWbWf2qDf7PB5B5kecXOq276Nbp0uXEKgaBOTQq+ZWZaMoo0/bBOe/JmVrwzdkI/0IKdf5KTiCTKZOmVZfg9wXfdm04fZix3T6ZYvF0bGGddQ850EHIq8dxfhLycNh5O01oG7bNV7R144dOy5CQdt/kbvA/c7x48eHu/ZdetqQDuazyLjfyQGb4TjexCfzOTku5P+gOxsqhyFzAbL/yM+Xbf8T09Ch6AZReLSG7gBVWBEI6D30irgNjacEo/MLMUTvdzViuO4utk7oyiUJGYWuZ73VjPLnAv6RGNCPUV+qD6agcx2j/UW040aTC32I38KgjlQBRv6zCBjohCA31lfDXPlSQhzGJtphswozjI/2/C3ruGdzwMmDpciJU5ZOyk3UFW7Ei8NjZY4++uizR40atdfidoDPhg0brrK4XWDzTvv27XP34N2UbP/SkZrPrMUYJxV8rKN1rqMbCOfT3nmRMu2QYa+h9eT9+R6RvBwZPEtf5hm1EXtJF/9ba6kzXGaKw4w+rzKbNaWhsuh7P7LfbqhcsXz+H08qlq+86kdADr3672HsFmA8WuNQ/VFgHaPETNeGo8pgIOdTr3Po9s64jdLPi5YrlbaT4Gpra/8Rvs7IX4WxqnfzUimy0S/vGFzTvxT+Ussa/jiCabShjfEG+GTu0BE9kDpKVa8VmwNDG8EBPhcg4AOekGVsgKx3F7hXLlGUjs1v6BA+CvMwE4D+46BPDJZz8mSC42GcXphG2d4Q9ot9ca9fo/B5OPNfxGGiPNX8BVPiQ+Lw+WWQsdGni8T7+XUVKaesFoyAptxb0M3HmZ+LUTjRNRljsopRYibvbDuZ0RBH+2vqecylEz8Xo9zH0UlDOwkOWbmd9BjzTNY6GZ0P9Y0y8p/EuD+RVMc4fOBvG8DCvQbUfzr36dQ4vI1ZBr1a09kIO4NgY57sO42gg9+hak290VF3TgU6RTUpdLElg2/QSRzA8xrLmaeoS6xCoGwIhL3vstUgwZWEwCAM4lqnEFOa33bxcobU+U3k++vSn4L+37R1ov8tOJk2rKn/Mq0s42d691QfH3b+l2062deXdvwz7XiPSyN+GvH/dLSF6Pamrxs8L/n5BeKb/fIF8mMl4eRyw146OwOR92eY7GfXepzfC+9Gy/eX0fjPmGq+gxrsIBu7etoZAbz6lzf9TKfuTZvyfrdI0b/WEdlDW3bQSXmR8HHu8zN0rEqaKg9qsLPf49RZTKFNhTK5vy+iX1rZhUQrTQgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIARD4f8fcJLjgr+o5AAAAAElFTkSuQmCC';
        return AdminImageConfig;
    }());

    /**
     * You can use the admin image module for user avatar together with gravatar.com and for project logos.
     *
     * The feature of this module ist the error handling: In case of a 404 error of the image source (img src) the module shows a default image-not-found image. Or a default user profile icon (type=user), or a default project icon (type=project).
     *
     */
    var AdminImageDirective = /** @class */ (function () {
        /**
         * @ignore
         */
        function AdminImageDirective(_renderer, _ele) {
            this._renderer = _renderer;
            this._ele = _ele;
            /**
             * @ignore
             */
            this.onError = AdminImageConfig.defaultNotFound;
        }
        /**
         * @ignore
         */
        AdminImageDirective.prototype.ngOnChanges = function () {
            this.source = this.image;
            switch (this.type) {
                case 'user':
                    this.onError = AdminImageConfig.defaultUser;
                    if (this.image === null || this.image === undefined) {
                        this.source = AdminImageConfig.defaultUser;
                    }
                    else {
                        this.source = 'http://www.gravatar.com/avatar/' + tsMd5.Md5.hashStr(this.image) + '?d=mp&s=256';
                    }
                    break;
                case 'project':
                    this.onError = AdminImageConfig.defaultProject;
                    if (this.image === null || this.image === undefined) {
                        this.source = AdminImageConfig.defaultProject;
                    }
                    break;
                default:
                    this.source = this.image;
            }
            this._renderer.setAttribute(this._ele.nativeElement, 'src', this.source);
            this._renderer.setAttribute(this._ele.nativeElement, 'onError', 'this.src=\'' + this.onError + '\'');
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AdminImageDirective.prototype, "image", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AdminImageDirective.prototype, "type", void 0);
        AdminImageDirective = __decorate([
            core.Directive({
                selector: '[kuiAdminImage]'
            }),
            __metadata("design:paramtypes", [core.Renderer2,
                core.ElementRef])
        ], AdminImageDirective);
        return AdminImageDirective;
    }());

    /**
     * This directive renders a GND/IAF or a VIAF identifier as a link to the respective resolver.
     */
    var GndDirective = /** @class */ (function () {
        function GndDirective(el) {
            this.el = el;
        }
        Object.defineProperty(GndDirective.prototype, "kuiGnd", {
            get: function () {
                return this._gnd;
            },
            set: function (value) {
                this._gnd = value;
            },
            enumerable: true,
            configurable: true
        });
        GndDirective.prototype.ngOnChanges = function () {
            if (this._gnd.length < 30) {
                if (this._gnd.indexOf(core$1.KnoraConstants.GNDPrefix) === 0) {
                    // GND/IAF identifier
                    this.el.nativeElement.innerHTML = "<a href=\"" + (core$1.KnoraConstants.GNDResolver + this._gnd.replace(core$1.KnoraConstants.GNDPrefix, '')) + "\" target=\"_blank\">" + this._gnd + "</a>";
                }
                else if (this._gnd.indexOf(core$1.KnoraConstants.VIAFPrefix) === 0) {
                    // VIAF identifier
                    this.el.nativeElement.innerHTML = "<a href=\"" + (core$1.KnoraConstants.VIAFResolver + this._gnd.replace(core$1.KnoraConstants.VIAFPrefix, '')) + "\" target=\"_blank\">" + this._gnd + "</a>";
                }
                else {
                    // no identifier, leave unchanged
                    this.el.nativeElement.innerHTML = this._gnd;
                }
            }
            else {
                // no identifier, leave unchanged
                this.el.nativeElement.innerHTML = this._gnd;
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], GndDirective.prototype, "kuiGnd", null);
        GndDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line:directive-selector
                selector: '[kuiGnd]'
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], GndDirective);
        return GndDirective;
    }());

    var ExistingNameDirective = /** @class */ (function () {
        function ExistingNameDirective() {
            /**
             * @ignore
             */
            this.valFn = forms.Validators.nullValidator;
        }
        ExistingNameDirective_1 = ExistingNameDirective;
        /**
         * @ignore
         * @param changes
         */
        ExistingNameDirective.prototype.ngOnChanges = function (changes) {
            var change = changes['existingName'];
            if (change) {
                var val = change.currentValue;
                var re = val instanceof RegExp ? val : new RegExp(val);
                this.valFn = existingNameValidator(re);
            }
            else {
                this.valFn = forms.Validators.nullValidator;
            }
        };
        /**
         * @ignore
         * @param control
         */
        ExistingNameDirective.prototype.validate = function (control) {
            return this.valFn(control);
        };
        var ExistingNameDirective_1;
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ExistingNameDirective.prototype, "existingName", void 0);
        ExistingNameDirective = ExistingNameDirective_1 = __decorate([
            core.Directive({
                selector: '[kuiExistingName]',
                providers: [{ provide: forms.NG_VALIDATORS, useExisting: ExistingNameDirective_1, multi: true }]
            })
            /**
             * With the ExistingNameDirective we could prevent to use a name which has to be unique but already exists
             * e.g. get a list of all project shortnames, then we can use this list as existing names;
             * you can also use it for a list of blacklisted (not allowed) words
             */
        ], ExistingNameDirective);
        return ExistingNameDirective;
    }());
    /**
     * Validation of existing name value. String method (only one value);
     * Use it in a "formbuilder" group as a validator property
     *
     * @param {RegExp} valRegexp Only one regular expression value
     * @returns ValidatorFn
     */
    function existingNameValidator(valRegexp) {
        return function (control) {
            var name;
            if (control.value) {
                name = control.value.toLowerCase();
            }
            var no = valRegexp.test(name);
            return no ? { 'existingName': { name: name } } : null;
        };
    }
    /**
     * Validation of existing name values. Array method (list of values)
     * Use it in a "formbuilder" group as a validator property
     *
     *
     * @param {RegExp} valArrayRegexp List of regular expression values
     * @returns ValidatorFn
     */
    function existingNamesValidator(valArrayRegexp) {
        return function (control) {
            var e_1, _a;
            var name;
            if (control.value) {
                name = control.value.toLowerCase();
            }
            var no;
            try {
                for (var valArrayRegexp_1 = __values(valArrayRegexp), valArrayRegexp_1_1 = valArrayRegexp_1.next(); !valArrayRegexp_1_1.done; valArrayRegexp_1_1 = valArrayRegexp_1.next()) {
                    var existing = valArrayRegexp_1_1.value;
                    no = existing.test(name);
                    if (no) {
                        // console.log(no);
                        return no ? { 'existingName': { name: name } } : null;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (valArrayRegexp_1_1 && !valArrayRegexp_1_1.done && (_a = valArrayRegexp_1.return)) _a.call(valArrayRegexp_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return no ? { 'existingName': { name: name } } : null;
        };
    }
    /**
     * @ignore
     *
     * @param {RegExp} pattern
     * @param {string} regType
     * @returns ValidatorFn
     */
    function notAllowed(pattern, regType) {
        return function (control) {
            var name;
            // console.log(regType);
            if (control.value) {
                name = control.value.toLowerCase();
            }
            // console.log(name);
            var no = pattern.test(name);
            return no ? { regType: { name: name } } : null;
        };
    }

    /**
    * JdnDatepickerDirective creates a wrapper element that provides a new adapter with each instance of the datepicker.
    */
    var JdnDatepickerDirective = /** @class */ (function () {
        function JdnDatepickerDirective(adapter) {
            this.adapter = adapter;
        }
        JdnDatepickerDirective = __decorate([
            core.Directive({
                selector: 'kuiJdnDatepicker',
                providers: [
                    { provide: core$2.DateAdapter, useClass: jdnconvertiblecalendardateadapter.JDNConvertibleCalendarDateAdapter, deps: [core$2.MAT_DATE_LOCALE] }
                ]
            }),
            __metadata("design:paramtypes", [core$2.DateAdapter])
        ], JdnDatepickerDirective);
        return JdnDatepickerDirective;
    }());

    /**
     * This pipe can be used for "for loops", in the case of an array with non-numeric indexes.
     * It returns the key and the value(s). In the example below the {{item.key}} contains the index value
     * and the {{item.value}} contains the value(s).
     *
     * When the value is an object with name and label, you get them with:
     * {{item.value.name}} and {{item.value.label}}
     *
     */
    var KeyPipe = /** @class */ (function () {
        function KeyPipe() {
        }
        KeyPipe.prototype.transform = function (value, args) {
            var keys = [];
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    keys.push({ key: key, value: value[key] });
                }
            }
            return keys;
        };
        KeyPipe = __decorate([
            core.Pipe({
                name: 'kuiKey'
            })
        ], KeyPipe);
        return KeyPipe;
    }());

    var ReversePipe = /** @class */ (function () {
        function ReversePipe() {
        }
        /**
         * TODO: add description
         */
        ReversePipe.prototype.transform = function (value) {
            if (value) {
                return value.slice().reverse();
            }
        };
        ReversePipe = __decorate([
            core.Pipe({
                name: 'kuiReverse'
            })
        ], ReversePipe);
        return ReversePipe;
    }());

    var SortByPipe = /** @class */ (function () {
        function SortByPipe() {
        }
        /**
         * TODO: add description
         */
        SortByPipe.prototype.transform = function (array, args) {
            if (array !== undefined) {
                array.sort(function (a, b) {
                    if (args) {
                        a[args] = (a[args] === null ? '' : a[args]);
                        b[args] = (b[args] === null ? '' : b[args]);
                        if (a[args].toLowerCase() < b[args].toLowerCase()) {
                            return -1;
                        }
                        else if (a[args].toLowerCase() > b[args].toLowerCase()) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                });
            }
            return array;
        };
        SortByPipe = __decorate([
            core.Pipe({
                name: 'kuiSortBy'
            })
        ], SortByPipe);
        return SortByPipe;
    }());

    var ResourceDialogComponent = /** @class */ (function () {
        function ResourceDialogComponent(_dialogRef, data) {
            this._dialogRef = _dialogRef;
            this.data = data;
            this.fullSize = false;
        }
        /**
         * Creates a configuration object for `MatDialog`.
         *
         * @param resourceIri the Iri of the resource to be displayed in a dialog.
         * @param widthPct width of the dialog in percentage.
         * @param heightPct height of the dialog in percentage.
         * @returns
         */
        ResourceDialogComponent.createConfiguration = function (resourceIri, widthPct, heightPct) {
            if (widthPct === void 0) { widthPct = 60; }
            if (heightPct === void 0) { heightPct = 60; }
            var config = new dialog.MatDialogConfig();
            config.height = widthPct + "%";
            config.width = heightPct + "%";
            config.data = {
                iri: resourceIri
            };
            config.panelClass = 'resizable';
            return config;
        };
        ResourceDialogComponent.prototype.ngOnInit = function () {
            this.fullSize = (!this.data.fullSize);
            // start in full size
            if (this._dialogRef) {
                this.toggleFullSize();
            }
        };
        ResourceDialogComponent.prototype.toggleFullSize = function () {
            this.fullSize = (!this.fullSize);
            if (this.fullSize) {
                this._dialogRef.updateSize('100vw', '100vh');
                this._dialogRef.updatePosition();
            }
            else {
                this._dialogRef.updateSize('80vw', 'auto');
                this._dialogRef.updatePosition();
            }
        };
        ResourceDialogComponent = __decorate([
            core.Component({
                selector: 'kui-resource-dialog',
                template: "<div class=\"object-dialog\">\n  <!-- header with close (on the left hand side) and resize (on the right hand side) button\n      and with the title in the center -->\n  <div class=\"dialog-header\">\n    <span class=\"dialog-action-button\">\n      <button mat-icon-button class=\"resize-button\" (click)=\"toggleFullSize()\">\n        <mat-icon class=\"optimize-direction\" [innerHtml]=\"fullSize ? 'call_received' :'call_made'\"></mat-icon>\n      </button>\n    </span>\n    <span class=\"fill-remaining-space\"></span>\n    <span>\n      <h3 class=\"dialog-title\" mat-dialog-title>\n        Resource\n        <!--'salsahLabels.frameworkForListings.add.title' | translate -->\n      </h3>\n    </span>\n    <span class=\"fill-remaining-space\"></span>\n    <span class=\"dialog-action-button\">\n      <button mat-icon-button class=\"close-button\" (click)=\"_dialogRef.close()\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </span>\n  </div>\n\n  <!-- <mat-dialog-content class=\"dialog-content\" [class.fullsize]=\"fullSize\">\n\n      <salsah-resource-object [iri]=\"data.iri\"></salsah-resource-object>\n\n  </mat-dialog-content> -->\n\n</div>",
                styles: [""]
            }),
            __param(1, core.Inject(dialog.MAT_DIALOG_DATA)),
            __metadata("design:paramtypes", [dialog.MatDialogRef, Object])
        ], ResourceDialogComponent);
        return ResourceDialogComponent;
    }());

    var KuiActionModule = /** @class */ (function () {
        /**
         * export @dec class
         */
        function KuiActionModule() {
        }
        KuiActionModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    animations.BrowserAnimationsModule,
                    button.MatButtonModule,
                    card.MatCardModule,
                    icon.MatIconModule,
                    list.MatListModule,
                    menu.MatMenuModule
                ],
                declarations: [
                    ProgressIndicatorComponent,
                    SortButtonComponent,
                    SortByPipe,
                    AdminImageDirective,
                    ExistingNameDirective,
                    ReversePipe,
                    KeyPipe,
                    GndDirective,
                    ResourceDialogComponent,
                    JdnDatepickerDirective,
                    MessageComponent
                ],
                exports: [
                    ProgressIndicatorComponent,
                    SortButtonComponent,
                    SortByPipe,
                    AdminImageDirective,
                    ExistingNameDirective,
                    ReversePipe,
                    KeyPipe,
                    GndDirective,
                    JdnDatepickerDirective,
                    MessageComponent
                ]
            })
            /**
             * export @dec class
             */
        ], KuiActionModule);
        return KuiActionModule;
    }());

    exports.AdminImageDirective = AdminImageDirective;
    exports.ExistingNameDirective = ExistingNameDirective;
    exports.GndDirective = GndDirective;
    exports.JdnDatepickerDirective = JdnDatepickerDirective;
    exports.KeyPipe = KeyPipe;
    exports.KuiActionModule = KuiActionModule;
    exports.KuiMessageData = KuiMessageData;
    exports.MessageComponent = MessageComponent;
    exports.ProgressIndicatorComponent = ProgressIndicatorComponent;
    exports.ReversePipe = ReversePipe;
    exports.SortButtonComponent = SortButtonComponent;
    exports.SortByPipe = SortByPipe;
    exports.existingNameValidator = existingNameValidator;
    exports.existingNamesValidator = existingNamesValidator;
    exports.notAllowed = notAllowed;
    exports.ɵa = StatusMsg;
    exports.ɵb = ResourceDialogComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=knora-action.umd.js.map
