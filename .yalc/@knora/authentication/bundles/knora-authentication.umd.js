(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('json2typescript'), require('@angular/core'), require('@angular/router'), require('@angular/common/http'), require('@knora/core'), require('moment'), require('rxjs/operators'), require('@angular/forms'), require('rxjs'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/dialog'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/input'), require('@knora/action')) :
    typeof define === 'function' && define.amd ? define('@knora/authentication', ['exports', 'json2typescript', '@angular/core', '@angular/router', '@angular/common/http', '@knora/core', 'moment', 'rxjs/operators', '@angular/forms', 'rxjs', '@angular/common', '@angular/material/button', '@angular/material/card', '@angular/material/dialog', '@angular/material/form-field', '@angular/material/icon', '@angular/material/input', '@knora/action'], factory) :
    (global = global || self, factory((global.knora = global.knora || {}, global.knora.authentication = {}), global.json2typescript, global.ng.core, global.ng.router, global.ng.common.http, global['@knora/core'], global.moment, global.rxjs.operators, global.ng.forms, global.rxjs, global.ng.common, global.ng.material.button, global.ng.material.card, global.ng.material.dialog, global.ng.material['form-field'], global.ng.material.icon, global.ng.material.input, global['@knora/action']));
}(this, function (exports, json2typescript, core, router, http, core$1, momentImported, operators, forms, rxjs, common, button, card, dialog, formField, icon, input, action) { 'use strict';

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
     * currently logged-in user
     */
    var CurrentUser = /** @class */ (function () {
        function CurrentUser() {
            /**
             * username
             */
            this.name = undefined;
            /**
             * json web token
             */
            this.jwt = undefined;
            /**
             * language for the user interface
             */
            this.lang = undefined;
            /**
             * is system administrator?
             */
            this.sysAdmin = undefined;
            /**
             * list of project shortcodes, where the user is project admin
             */
            this.projectAdmin = undefined;
        }
        __decorate([
            json2typescript.JsonProperty('name', String),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "name", void 0);
        __decorate([
            json2typescript.JsonProperty('jwt', String, true),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "jwt", void 0);
        __decorate([
            json2typescript.JsonProperty('lang', String, true),
            __metadata("design:type", String)
        ], CurrentUser.prototype, "lang", void 0);
        __decorate([
            json2typescript.JsonProperty('sysAdmin', Boolean),
            __metadata("design:type", Boolean)
        ], CurrentUser.prototype, "sysAdmin", void 0);
        __decorate([
            json2typescript.JsonProperty('projectAdmin', [String], true),
            __metadata("design:type", Array)
        ], CurrentUser.prototype, "projectAdmin", void 0);
        CurrentUser = __decorate([
            json2typescript.JsonObject
        ], CurrentUser);
        return CurrentUser;
    }());

    var moment = momentImported;
    var SessionService = /** @class */ (function () {
        function SessionService(_http, config, _users) {
            this._http = _http;
            this.config = config;
            this._users = _users;
            /**
             * max session time in milliseconds
             * default value (24h): 86400000
             *
             */
            this.MAX_SESSION_TIME = 86400000; // 1d = 24 * 60 * 60 * 1000
        }
        /**
         * set the session by using the json web token (jwt) and the user object;
         * it will be used in the login process
         *
         * @param jwt
         * @param username
         */
        SessionService.prototype.setSession = function (jwt, username) {
            var _this = this;
            this.session = {
                id: this.setTimestamp(),
                user: {
                    name: username,
                    jwt: jwt,
                    lang: 'en',
                    sysAdmin: false,
                    projectAdmin: []
                }
            };
            // store in the localStorage
            localStorage.setItem('session', JSON.stringify(this.session));
            // get user information
            this._users.getUserByUsername(username).subscribe(function (result) {
                var e_1, _a;
                var sysAdmin = false;
                var projectAdmin = [];
                var groupsPerProjectKeys = Object.keys(result.permissions.groupsPerProject);
                try {
                    for (var groupsPerProjectKeys_1 = __values(groupsPerProjectKeys), groupsPerProjectKeys_1_1 = groupsPerProjectKeys_1.next(); !groupsPerProjectKeys_1_1.done; groupsPerProjectKeys_1_1 = groupsPerProjectKeys_1.next()) {
                        var key = groupsPerProjectKeys_1_1.value;
                        if (key === core$1.KnoraConstants.SystemProjectIRI) {
                            sysAdmin = result.permissions.groupsPerProject[key].indexOf(core$1.KnoraConstants.SystemAdminGroupIRI) > -1;
                        }
                        if (result.permissions.groupsPerProject[key].indexOf(core$1.KnoraConstants.ProjectAdminGroupIRI) > -1) {
                            projectAdmin.push(key);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (groupsPerProjectKeys_1_1 && !groupsPerProjectKeys_1_1.done && (_a = groupsPerProjectKeys_1.return)) _a.call(groupsPerProjectKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // define a session id, which is the timestamp of login
                _this.session = {
                    id: _this.setTimestamp(),
                    user: {
                        name: result.username,
                        jwt: jwt,
                        lang: result.lang,
                        sysAdmin: sysAdmin,
                        projectAdmin: projectAdmin
                    }
                };
                // store in the localStorage
                localStorage.setItem('session', JSON.stringify(_this.session));
            }, function (error) {
                console.error(error);
            });
        };
        SessionService.prototype.setTimestamp = function () {
            return (moment().add(0, 'second')).valueOf();
        };
        SessionService.prototype.getSession = function () {
        };
        SessionService.prototype.updateSession = function () {
        };
        SessionService.prototype.validateSession = function () {
            // mix of checks with session.validation and this.authenticate
            this.session = JSON.parse(localStorage.getItem('session'));
            var tsNow = this.setTimestamp();
            if (this.session) {
                // the session exists
                // check if the session is still valid:
                // if session.id + MAX_SESSION_TIME > now: _session.validateSession()
                if (this.session.id + this.MAX_SESSION_TIME < tsNow) {
                    // the internal session has expired
                    // check if the api v2/authentication is still valid
                    if (this.authenticate()) {
                        // the api authentication is valid;
                        // update the session.id
                        this.session.id = tsNow;
                        // localStorage.removeItem('session');
                        localStorage.setItem('session', JSON.stringify(this.session));
                        return true;
                    }
                    else {
                        // console.error('session.service -- validateSession -- authenticate: the session expired on API side');
                        // a user is not authenticated anymore!
                        this.destroySession();
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
            return false;
        };
        SessionService.prototype.authenticate = function () {
            return this._http.get(this.config.api + '/v2/authentication').pipe(operators.map(function (result) {
                // console.log('AuthenticationService - authenticate - result: ', result);
                // return true || false
                return result.status === 200;
            }));
        };
        SessionService.prototype.destroySession = function () {
            localStorage.removeItem('session');
        };
        SessionService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(core$1.KuiCoreConfigToken), core.ɵɵinject(core$1.UsersService)); }, token: SessionService, providedIn: "root" });
        SessionService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Inject(core$1.KuiCoreConfigToken)),
            __metadata("design:paramtypes", [http.HttpClient, Object, core$1.UsersService])
        ], SessionService);
        return SessionService;
    }());

    var AuthGuard = /** @class */ (function () {
        function AuthGuard(_session, _router) {
            this._session = _session;
            this._router = _router;
        }
        AuthGuard.prototype.canActivate = function (next, state) {
            if (!this._session.validateSession()) {
                this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            return true;
        };
        AuthGuard.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(core.ɵɵinject(SessionService), core.ɵɵinject(router.Router)); }, token: AuthGuard, providedIn: "root" });
        AuthGuard = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __metadata("design:paramtypes", [SessionService,
                router.Router])
        ], AuthGuard);
        return AuthGuard;
    }());

    /**
     * Authentication service includes the login, logout method and a session method to check if a user is logged in or not.
     */
    var AuthenticationService = /** @class */ (function () {
        function AuthenticationService(http, _session, config) {
            this.http = http;
            this._session = _session;
            this.config = config;
            // console.log('AuthenticationService constructor: config', config);
        }
        /**
         * validate if a user is logged in or not
         * returns true if the session is active
         *
         * @returns boolean
         */
        AuthenticationService.prototype.session = function () {
            return this._session.validateSession();
        };
        /**
         * update the session storage
         * @param jwt
         * @param username
         *
         * @returns boolean
         */
        AuthenticationService.prototype.updateSession = function (jwt, username) {
            if (jwt && username) {
                this._session.setSession(jwt, username);
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * login process;
         * it's used by the login component
         *
         * @param {string} identifier email or username
         * @param {string} password
         * @returns Observable<any>
         */
        AuthenticationService.prototype.login = function (username, password) {
            // console.log('AuthenticationService - login - api: ', this.config.api);
            var _this = this;
            return this.http.post(this.config.api + '/v2/authentication', { username: username, password: password }, { observe: 'response' }).pipe(operators.map(function (response) {
                return response;
            }), operators.catchError(function (error) {
                return _this.handleRequestError(error);
            }));
        };
        /**
         * logout the user by destroying the session
         *
         * @param
         */
        AuthenticationService.prototype.logout = function () {
            // destroy the session
            localStorage.removeItem('session');
        };
        /**
         * @ignore
         * handle request error in case of server error
         *
         * @param error
         * @returns
         */
        AuthenticationService.prototype.handleRequestError = function (error) {
            var serviceError = new core$1.ApiServiceError();
            serviceError.header = { 'server': error.headers.get('Server') };
            serviceError.status = error.status;
            serviceError.statusText = error.statusText;
            serviceError.errorInfo = error.message;
            serviceError.url = error.url;
            return rxjs.throwError(serviceError);
        };
        AuthenticationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(SessionService), core.ɵɵinject(core$1.KuiCoreConfigToken)); }, token: AuthenticationService, providedIn: "root" });
        AuthenticationService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(2, core.Inject(core$1.KuiCoreConfigToken)),
            __metadata("design:paramtypes", [http.HttpClient,
                SessionService, Object])
        ], AuthenticationService);
        return AuthenticationService;
    }());

    var LoginFormComponent = /** @class */ (function () {
        function LoginFormComponent(_auth, _session, _fb, _route, _router) {
            this._auth = _auth;
            this._session = _session;
            this._fb = _fb;
            this._route = _route;
            this._router = _router;
            this.loading = false;
            // specific error messages
            this.loginErrorUser = false;
            this.loginErrorPw = false;
            this.loginErrorServer = false;
            // labels for the login form
            this.login = {
                title: 'Login',
                name: 'Username',
                pw: 'Password',
                button: 'Login',
                remember: 'Remember me',
                forgot_pw: 'Forgot password?',
                error: {
                    failed: 'Password or username is wrong',
                    server: 'There\'s an error with the server connection. Try it again later or inform the Knora Team'
                }
            };
            // error definitions for the following form fields
            this.formErrors = {
                'username': '',
                'password': ''
            };
            // error messages for the form fields defined in formErrors
            this.validationMessages = {
                'username': {
                    'required': 'user name is required.'
                },
                'password': {
                    'required': 'password is required'
                }
            };
        }
        LoginFormComponent.prototype.ngOnInit = function () {
            // check if a user is already logged in
            if (this._session.validateSession()) {
                this.loggedInUser = JSON.parse(localStorage.getItem('session')).user.name;
            }
            else {
                this.buildForm();
            }
        };
        LoginFormComponent.prototype.buildForm = function () {
            var _this = this;
            this.frm = this._fb.group({
                username: ['', forms.Validators.required],
                password: ['', forms.Validators.required]
            });
            this.frm.valueChanges
                .subscribe(function (data) { return _this.onValueChanged(data); });
        };
        /**
         * @ignore
         *
         * check for errors while using the form
         * @param data
         */
        LoginFormComponent.prototype.onValueChanged = function (data) {
            var _this = this;
            if (!this.frm) {
                return;
            }
            var form = this.frm;
            Object.keys(this.formErrors).map(function (field) {
                _this.formErrors[field] = '';
                var control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages_1 = _this.validationMessages[field];
                    Object.keys(control.errors).map(function (key) {
                        _this.formErrors[field] += messages_1[key] + ' ';
                    });
                }
            });
        };
        LoginFormComponent.prototype.doLogin = function () {
            var _this = this;
            // reset the error messages
            this.errorMessage = undefined;
            this.loginErrorUser = false;
            this.loginErrorPw = false;
            this.loginErrorServer = false;
            // make sure form values are valid
            if (this.frm.invalid) {
                this.loginErrorPw = true;
                this.loginErrorUser = true;
                return;
            }
            // Reset status
            this.loading = true;
            // Grab values from form
            var username = this.frm.get('username').value;
            var password = this.frm.get('password').value;
            this._auth.login(username, password)
                .subscribe(function (response) {
                // we have a token; set the session now
                _this._session.setSession(response.body.token, username);
                setTimeout(function () {
                    // get return url from route parameters or default to '/'
                    _this.returnUrl = _this._route.snapshot.queryParams['returnUrl'] || '/';
                    // go back to the previous route or to the route defined in the @Input if navigate exists
                    if (!_this.navigate) {
                        _this._router.navigate([_this.returnUrl]);
                    }
                    else {
                        _this._router.navigate([_this.navigate]);
                    }
                    _this.loading = false;
                }, 2000);
            }, function (error) {
                // error handling
                if (error.status === 0) {
                    _this.loginErrorUser = false;
                    _this.loginErrorPw = false;
                    _this.loginErrorServer = true;
                }
                if (error.status === 401) {
                    _this.loginErrorUser = false;
                    _this.loginErrorPw = true;
                    _this.loginErrorServer = false;
                }
                if (error.status === 404) {
                    _this.loginErrorUser = true;
                    _this.loginErrorPw = false;
                    _this.loginErrorServer = false;
                }
                _this.errorMessage = error;
                _this.loading = false;
            });
        };
        LoginFormComponent.prototype.logout = function () {
            this._auth.logout();
            location.reload(true);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LoginFormComponent.prototype, "navigate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LoginFormComponent.prototype, "color", void 0);
        LoginFormComponent = __decorate([
            core.Component({
                selector: 'kui-login-form',
                template: "<div class=\"login-form\" *ngIf=\"!loggedInUser\">\n    <div class=\"login-form-header\">\n        <h3 mat-subheader>{{login.title}}</h3>\n    </div>\n    <div class=\"login-form-content\">\n        <!-- This is the login form -->\n        <form class=\"login-form\" [formGroup]=\"frm\" (ngSubmit)=\"doLogin()\">\n            <!-- Error message -->\n            <mat-hint *ngIf=\"errorMessage !== undefined\" class=\"full-width\">\n                <span *ngIf=\"loginErrorUser || loginErrorPw\">{{login.error.failed}}</span>\n                <span *ngIf=\"loginErrorServer\">{{login.error.server}}</span>\n            </mat-hint>\n\n            <!-- Username -->\n            <mat-form-field class=\"full-width login-field\">\n                <mat-icon matPrefix>person</mat-icon>\n                <input matInput autofocus [placeholder]=\"login.name\" autocomplete=\"username\" formControlName=\"username\">\n                <mat-hint *ngIf=\"formErrors.username\" class=\"login-error\">{{login.error.failed}}</mat-hint>\n            </mat-form-field>\n\n            <!-- Password -->\n            <mat-form-field class=\"full-width login-field\">\n                <mat-icon matPrefix>lock</mat-icon>\n                <input matInput type=\"password\" [placeholder]=\"login.pw\" autocomplete=\"current-password\" formControlName=\"password\">\n                <mat-hint *ngIf=\"formErrors.password\" class=\"login-error\">{{login.error.failed}}</mat-hint>\n            </mat-form-field>\n\n            <!-- Button: Login -->\n            <div class=\"button-row full-width\">\n                <button mat-raised-button type=\"submit\"\n                        *ngIf=\"!loading\"\n                        [disabled]=\"!frm.valid\"\n                        class=\"full-width submit-button mat-primary\">\n                    {{login.button}}\n                </button>\n                <kui-progress-indicator *ngIf=\"loading\" [color]=\"color\"></kui-progress-indicator>\n            </div>\n        </form>\n    </div>\n</div>\n\n<!-- a user is already logged in; show who it is and a logout button -->\n\n<div class=\"logout-form\" *ngIf=\"loggedInUser\">\n    <p>A user is already logged in:</p>\n    <p>{{loggedInUser}}</p>\n    <br>\n    <p>If it's not you, please logout!</p>\n    <div class=\"button-row full-width\">\n        <button mat-raised-button\n                (click)=\"logout()\"\n                *ngIf=\"!loading\"\n                class=\"full-width mat-warn\">\n            LOGOUT\n        </button>\n        <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n    </div>\n</div>\n",
                styles: [".full-width{width:100%}.button-row,.mat-form-field,.mat-hint{margin-top:24px}.mat-hint{background:rgba(239,83,80,.39);display:block;margin-left:-16px;padding:16px;text-align:center;width:280px}.login-form,.logout-form{margin-left:auto;margin-right:auto;position:relative;width:280px}.login-form .login-form-header,.logout-form .login-form-header{margin-bottom:24px}.login-form .login-field .mat-icon,.logout-form .login-field .mat-icon{font-size:20px;margin-right:12px}.login-form .button-row,.logout-form .button-row{margin-top:48px}.sign-up{margin-top:24px}"]
            }),
            __metadata("design:paramtypes", [AuthenticationService,
                SessionService,
                forms.FormBuilder,
                router.ActivatedRoute,
                router.Router])
        ], LoginFormComponent);
        return LoginFormComponent;
    }());

    var JwtInterceptor = /** @class */ (function () {
        function JwtInterceptor(_session) {
            this._session = _session;
        }
        JwtInterceptor.prototype.intercept = function (request, next) {
            // add authorization header with jwt token if available
            if (this._session.validateSession()) {
                // the session is valid (and up to date)
                var jwt = JSON.parse(localStorage.getItem('session')).user.jwt;
                request = request.clone({
                    setHeaders: {
                        Authorization: "Bearer " + jwt
                    }
                });
            }
            else {
                this._session.destroySession();
            }
            return next.handle(request);
        };
        JwtInterceptor = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [SessionService])
        ], JwtInterceptor);
        return JwtInterceptor;
    }());

    var WithCredentialsInterceptor = /** @class */ (function () {
        function WithCredentialsInterceptor(_session) {
            this._session = _session;
        }
        WithCredentialsInterceptor.prototype.intercept = function (request, next) {
            // add authorization header with jwt token if available
            // console.log('WithCredentialsInterceptor - intercept - request: ', request);
            request = request.clone({
                withCredentials: true
            });
            return next.handle(request);
        };
        WithCredentialsInterceptor = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [SessionService])
        ], WithCredentialsInterceptor);
        return WithCredentialsInterceptor;
    }());

    var KuiAuthenticationModule = /** @class */ (function () {
        function KuiAuthenticationModule() {
        }
        KuiAuthenticationModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    action.KuiActionModule,
                    card.MatCardModule,
                    icon.MatIconModule,
                    input.MatInputModule,
                    button.MatButtonModule,
                    dialog.MatDialogModule,
                    formField.MatFormFieldModule,
                    forms.ReactiveFormsModule,
                    http.HttpClientModule
                ],
                declarations: [
                    LoginFormComponent
                ],
                exports: [
                    LoginFormComponent
                ],
                providers: [
                    { provide: http.HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                    { provide: http.HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true }
                ]
            })
        ], KuiAuthenticationModule);
        return KuiAuthenticationModule;
    }());

    exports.AuthGuard = AuthGuard;
    exports.AuthenticationService = AuthenticationService;
    exports.CurrentUser = CurrentUser;
    exports.KuiAuthenticationModule = KuiAuthenticationModule;
    exports.LoginFormComponent = LoginFormComponent;
    exports.ɵa = SessionService;
    exports.ɵb = JwtInterceptor;
    exports.ɵc = WithCredentialsInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=knora-authentication.umd.js.map
