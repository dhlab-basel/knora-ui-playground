import { __decorate, __metadata, __values, __param } from 'tslib';
import { JsonProperty, JsonObject } from 'json2typescript';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, Inject, Input, Component, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KnoraConstants, KuiCoreConfigToken, UsersService, ApiServiceError } from '@knora/core';
import * as momentImported from 'moment';
import { map, catchError } from 'rxjs/operators';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { KuiActionModule } from '@knora/action';

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
        JsonProperty('name', String),
        __metadata("design:type", String)
    ], CurrentUser.prototype, "name", void 0);
    __decorate([
        JsonProperty('jwt', String, true),
        __metadata("design:type", String)
    ], CurrentUser.prototype, "jwt", void 0);
    __decorate([
        JsonProperty('lang', String, true),
        __metadata("design:type", String)
    ], CurrentUser.prototype, "lang", void 0);
    __decorate([
        JsonProperty('sysAdmin', Boolean),
        __metadata("design:type", Boolean)
    ], CurrentUser.prototype, "sysAdmin", void 0);
    __decorate([
        JsonProperty('projectAdmin', [String], true),
        __metadata("design:type", Array)
    ], CurrentUser.prototype, "projectAdmin", void 0);
    CurrentUser = __decorate([
        JsonObject
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
        // username can be either name or email address, so what do we have?
        var identifierType = ((username.indexOf('@') > -1) ? 'email' : 'username');
        /*
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
        */
        // get user information
        this._users.getUser(username, identifierType).subscribe(function (result) {
            var e_1, _a;
            var sysAdmin = false;
            var projectAdmin = [];
            var groupsPerProjectKeys = Object.keys(result.permissions.groupsPerProject);
            try {
                for (var groupsPerProjectKeys_1 = __values(groupsPerProjectKeys), groupsPerProjectKeys_1_1 = groupsPerProjectKeys_1.next(); !groupsPerProjectKeys_1_1.done; groupsPerProjectKeys_1_1 = groupsPerProjectKeys_1.next()) {
                    var key = groupsPerProjectKeys_1_1.value;
                    if (key === KnoraConstants.SystemProjectIRI) {
                        sysAdmin = result.permissions.groupsPerProject[key].indexOf(KnoraConstants.SystemAdminGroupIRI) > -1;
                    }
                    if (result.permissions.groupsPerProject[key].indexOf(KnoraConstants.ProjectAdminGroupIRI) > -1) {
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
        return this._http.get(this.config.api + '/v2/authentication').pipe(map(function (result) {
            // console.log('AuthenticationService - authenticate - result: ', result);
            // return true || false
            return result.status === 200;
        }));
    };
    SessionService.prototype.destroySession = function () {
        localStorage.removeItem('session');
    };
    SessionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(ɵɵinject(HttpClient), ɵɵinject(KuiCoreConfigToken), ɵɵinject(UsersService)); }, token: SessionService, providedIn: "root" });
    SessionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(KuiCoreConfigToken)),
        __metadata("design:paramtypes", [HttpClient, Object, UsersService])
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
    AuthGuard.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(ɵɵinject(SessionService), ɵɵinject(Router)); }, token: AuthGuard, providedIn: "root" });
    AuthGuard = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [SessionService,
            Router])
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
        var params = { username: username, password: password };
        // username can be either name or email address, so what do we have?
        if (username.indexOf('@') > -1) {
            // username is email address
            params = { email: username, password: password };
        }
        return this.http.post(this.config.api + '/v2/authentication', params, { observe: 'response' }).pipe(map(function (response) {
            return response;
        }), catchError(function (error) {
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
        var serviceError = new ApiServiceError();
        serviceError.header = { 'server': error.headers.get('Server') };
        serviceError.status = error.status;
        serviceError.statusText = error.statusText;
        serviceError.errorInfo = error.message;
        serviceError.url = error.url;
        return throwError(serviceError);
    };
    AuthenticationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(ɵɵinject(HttpClient), ɵɵinject(SessionService), ɵɵinject(KuiCoreConfigToken)); }, token: AuthenticationService, providedIn: "root" });
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(2, Inject(KuiCoreConfigToken)),
        __metadata("design:paramtypes", [HttpClient,
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
            username: ['', Validators.required],
            password: ['', Validators.required]
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
        Input(),
        __metadata("design:type", String)
    ], LoginFormComponent.prototype, "navigate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LoginFormComponent.prototype, "color", void 0);
    LoginFormComponent = __decorate([
        Component({
            selector: 'kui-login-form',
            template: "<div class=\"login-form\" *ngIf=\"!loggedInUser\">\n    <div class=\"login-form-header\">\n        <h3 mat-subheader>{{login.title}}</h3>\n    </div>\n    <div class=\"login-form-content\">\n        <!-- This is the login form -->\n        <form class=\"login-form\" [formGroup]=\"frm\" (ngSubmit)=\"doLogin()\">\n            <!-- Error message -->\n            <mat-hint *ngIf=\"errorMessage !== undefined\" class=\"full-width\">\n                <span *ngIf=\"loginErrorUser || loginErrorPw\">{{login.error.failed}}</span>\n                <span *ngIf=\"loginErrorServer\">{{login.error.server}}</span>\n            </mat-hint>\n\n            <!-- Username -->\n            <mat-form-field class=\"full-width login-field\">\n                <mat-icon matPrefix>person</mat-icon>\n                <input matInput autofocus [placeholder]=\"login.name\" autocomplete=\"username\" formControlName=\"username\"\n                       #username cdkFocusInitial>\n                <mat-hint *ngIf=\"formErrors.username\" class=\"login-error\">{{login.error.failed}}</mat-hint>\n            </mat-form-field>\n\n            <!-- Password -->\n            <mat-form-field class=\"full-width login-field\">\n                <mat-icon matPrefix>lock</mat-icon>\n                <input matInput type=\"password\" [placeholder]=\"login.pw\" autocomplete=\"current-password\"\n                       formControlName=\"password\">\n                <mat-hint *ngIf=\"formErrors.password\" class=\"login-error\">{{login.error.failed}}</mat-hint>\n            </mat-form-field>\n\n            <!-- Button: Login -->\n            <div class=\"button-row full-width\">\n                <button mat-raised-button type=\"submit\" *ngIf=\"!loading\" [disabled]=\"!frm.valid\"\n                        class=\"full-width submit-button mat-primary\">\n                    {{login.button}}\n                </button>\n                <kui-progress-indicator *ngIf=\"loading\" [color]=\"color\"></kui-progress-indicator>\n            </div>\n        </form>\n    </div>\n</div>\n\n<!-- a user is already logged in; show who it is and a logout button -->\n\n<div class=\"logout-form\" *ngIf=\"loggedInUser\">\n    <p>A user is already logged in:</p>\n    <p>{{loggedInUser}}</p>\n    <br>\n    <p>If it's not you, please logout!</p>\n    <div class=\"button-row full-width\">\n        <button mat-raised-button (click)=\"logout()\" *ngIf=\"!loading\" class=\"full-width mat-warn\">\n            LOGOUT\n        </button>\n        <kui-progress-indicator *ngIf=\"loading\"></kui-progress-indicator>\n    </div>\n</div>\n",
            styles: [".full-width{width:100%}.button-row,.mat-form-field,.mat-hint{margin-top:24px}.mat-hint{background:rgba(239,83,80,.39);display:block;margin-left:-16px;padding:16px;text-align:center;width:280px}.login-form,.logout-form{margin-left:auto;margin-right:auto;position:relative;width:280px}.login-form .login-form-header,.logout-form .login-form-header{margin-bottom:24px}.login-form .login-field .mat-icon,.logout-form .login-field .mat-icon{font-size:20px;margin-right:12px}.login-form .button-row,.logout-form .button-row{margin-top:48px}.sign-up{margin-top:24px}"]
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            SessionService,
            FormBuilder,
            ActivatedRoute,
            Router])
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
        Injectable(),
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
        Injectable(),
        __metadata("design:paramtypes", [SessionService])
    ], WithCredentialsInterceptor);
    return WithCredentialsInterceptor;
}());

var KuiAuthenticationModule = /** @class */ (function () {
    function KuiAuthenticationModule() {
    }
    KuiAuthenticationModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                KuiActionModule,
                MatCardModule,
                MatIconModule,
                MatInputModule,
                MatButtonModule,
                MatDialogModule,
                MatFormFieldModule,
                ReactiveFormsModule,
                HttpClientModule
            ],
            declarations: [
                LoginFormComponent
            ],
            exports: [
                LoginFormComponent
            ],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true }
            ]
        })
    ], KuiAuthenticationModule);
    return KuiAuthenticationModule;
}());

export { AuthGuard, AuthenticationService, CurrentUser, KuiAuthenticationModule, LoginFormComponent, SessionService as ɵa, JwtInterceptor as ɵb, WithCredentialsInterceptor as ɵc };
//# sourceMappingURL=knora-authentication.js.map
