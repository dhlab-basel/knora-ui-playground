import { __decorate, __metadata, __param } from 'tslib';
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
let CurrentUser = class CurrentUser {
    /**
     * currently logged-in user
     */
    constructor() {
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
};
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

const moment = momentImported;
let SessionService = class SessionService {
    constructor(_http, config, _users) {
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
    setSession(jwt, username) {
        // username can be either name or email address, so what do we have?
        const identifierType = ((username.indexOf('@') > -1) ? 'email' : 'username');
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
        this._users.getUser(username, identifierType).subscribe((result) => {
            let sysAdmin = false;
            const projectAdmin = [];
            const groupsPerProjectKeys = Object.keys(result.permissions.groupsPerProject);
            for (const key of groupsPerProjectKeys) {
                if (key === KnoraConstants.SystemProjectIRI) {
                    sysAdmin = result.permissions.groupsPerProject[key].indexOf(KnoraConstants.SystemAdminGroupIRI) > -1;
                }
                if (result.permissions.groupsPerProject[key].indexOf(KnoraConstants.ProjectAdminGroupIRI) > -1) {
                    projectAdmin.push(key);
                }
            }
            // define a session id, which is the timestamp of login
            this.session = {
                id: this.setTimestamp(),
                user: {
                    name: result.username,
                    jwt: jwt,
                    lang: result.lang,
                    sysAdmin: sysAdmin,
                    projectAdmin: projectAdmin
                }
            };
            // store in the localStorage
            localStorage.setItem('session', JSON.stringify(this.session));
        }, (error) => {
            console.error(error);
        });
    }
    setTimestamp() {
        return (moment().add(0, 'second')).valueOf();
    }
    getSession() {
    }
    updateSession() {
    }
    validateSession() {
        // mix of checks with session.validation and this.authenticate
        this.session = JSON.parse(localStorage.getItem('session'));
        const tsNow = this.setTimestamp();
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
    }
    authenticate() {
        return this._http.get(this.config.api + '/v2/authentication').pipe(map((result) => {
            // console.log('AuthenticationService - authenticate - result: ', result);
            // return true || false
            return result.status === 200;
        }));
    }
    destroySession() {
        localStorage.removeItem('session');
    }
};
SessionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(ɵɵinject(HttpClient), ɵɵinject(KuiCoreConfigToken), ɵɵinject(UsersService)); }, token: SessionService, providedIn: "root" });
SessionService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(KuiCoreConfigToken)),
    __metadata("design:paramtypes", [HttpClient, Object, UsersService])
], SessionService);

let AuthGuard = class AuthGuard {
    constructor(_session, _router) {
        this._session = _session;
        this._router = _router;
    }
    canActivate(next, state) {
        if (!this._session.validateSession()) {
            this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;
    }
};
AuthGuard.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(ɵɵinject(SessionService), ɵɵinject(Router)); }, token: AuthGuard, providedIn: "root" });
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [SessionService,
        Router])
], AuthGuard);

/**
 * Authentication service includes the login, logout method and a session method to check if a user is logged in or not.
 */
let AuthenticationService = class AuthenticationService {
    constructor(http, _session, config) {
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
    session() {
        return this._session.validateSession();
    }
    /**
     * update the session storage
     * @param jwt
     * @param username
     *
     * @returns boolean
     */
    updateSession(jwt, username) {
        if (jwt && username) {
            this._session.setSession(jwt, username);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * login process;
     * it's used by the login component
     *
     * @param {string} identifier email or username
     * @param {string} password
     * @returns Observable<any>
     */
    login(username, password) {
        // console.log('AuthenticationService - login - api: ', this.config.api);
        let params = { username: username, password: password };
        // username can be either name or email address, so what do we have?
        if (username.indexOf('@') > -1) {
            // username is email address
            params = { email: username, password: password };
        }
        return this.http.post(this.config.api + '/v2/authentication', params, { observe: 'response' }).pipe(map((response) => {
            return response;
        }), catchError((error) => {
            return this.handleRequestError(error);
        }));
    }
    /**
     * logout the user by destroying the session
     *
     * @param
     */
    logout() {
        // destroy the session
        localStorage.removeItem('session');
    }
    /**
     * @ignore
     * handle request error in case of server error
     *
     * @param error
     * @returns
     */
    handleRequestError(error) {
        const serviceError = new ApiServiceError();
        serviceError.header = { 'server': error.headers.get('Server') };
        serviceError.status = error.status;
        serviceError.statusText = error.statusText;
        serviceError.errorInfo = error.message;
        serviceError.url = error.url;
        return throwError(serviceError);
    }
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

let LoginFormComponent = class LoginFormComponent {
    constructor(_auth, _session, _fb, _route, _router) {
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
    ngOnInit() {
        // check if a user is already logged in
        if (this._session.validateSession()) {
            this.loggedInUser = JSON.parse(localStorage.getItem('session')).user.name;
        }
        else {
            this.buildForm();
        }
    }
    buildForm() {
        this.frm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.frm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }
    /**
     * @ignore
     *
     * check for errors while using the form
     * @param data
     */
    onValueChanged(data) {
        if (!this.frm) {
            return;
        }
        const form = this.frm;
        Object.keys(this.formErrors).map(field => {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                Object.keys(control.errors).map(key => {
                    this.formErrors[field] += messages[key] + ' ';
                });
            }
        });
    }
    doLogin() {
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
        const username = this.frm.get('username').value;
        const password = this.frm.get('password').value;
        this._auth.login(username, password)
            .subscribe((response) => {
            // we have a token; set the session now
            this._session.setSession(response.body.token, username);
            setTimeout(() => {
                // get return url from route parameters or default to '/'
                this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
                // go back to the previous route or to the route defined in the @Input if navigate exists
                if (!this.navigate) {
                    this._router.navigate([this.returnUrl]);
                }
                else {
                    this._router.navigate([this.navigate]);
                }
                this.loading = false;
            }, 2000);
        }, (error) => {
            // error handling
            if (error.status === 0) {
                this.loginErrorUser = false;
                this.loginErrorPw = false;
                this.loginErrorServer = true;
            }
            if (error.status === 401) {
                this.loginErrorUser = false;
                this.loginErrorPw = true;
                this.loginErrorServer = false;
            }
            if (error.status === 404) {
                this.loginErrorUser = true;
                this.loginErrorPw = false;
                this.loginErrorServer = false;
            }
            this.errorMessage = error;
            this.loading = false;
        });
    }
    logout() {
        this._auth.logout();
        location.reload(true);
    }
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

let JwtInterceptor = class JwtInterceptor {
    constructor(_session) {
        this._session = _session;
    }
    intercept(request, next) {
        // add authorization header with jwt token if available
        if (this._session.validateSession()) {
            // the session is valid (and up to date)
            const jwt = JSON.parse(localStorage.getItem('session')).user.jwt;
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        }
        else {
            this._session.destroySession();
        }
        return next.handle(request);
    }
};
JwtInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [SessionService])
], JwtInterceptor);

let WithCredentialsInterceptor = class WithCredentialsInterceptor {
    constructor(_session) {
        this._session = _session;
    }
    intercept(request, next) {
        // add authorization header with jwt token if available
        // console.log('WithCredentialsInterceptor - intercept - request: ', request);
        request = request.clone({
            withCredentials: true
        });
        return next.handle(request);
    }
};
WithCredentialsInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [SessionService])
], WithCredentialsInterceptor);

let KuiAuthenticationModule = class KuiAuthenticationModule {
};
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

export { AuthGuard, AuthenticationService, CurrentUser, KuiAuthenticationModule, LoginFormComponent, SessionService as ɵa, JwtInterceptor as ɵb, WithCredentialsInterceptor as ɵc };
//# sourceMappingURL=knora-authentication.js.map
