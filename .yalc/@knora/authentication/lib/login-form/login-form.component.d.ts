import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SessionService } from '../session/session.service';
export declare class LoginFormComponent implements OnInit {
    private _auth;
    private _session;
    private _fb;
    private _route;
    private _router;
    /**
     * @param {string} [navigate]
     * navigate to the defined url after successful login
     */
    navigate?: string;
    /**
     * @param {string} [color]
     * set your theme color here,
     * it will be used in the progress-indicator
     */
    color?: string;
    returnUrl: string;
    loggedInUser: string;
    frm: FormGroup;
    loading: boolean;
    errorMessage: any;
    loginErrorUser: boolean;
    loginErrorPw: boolean;
    loginErrorServer: boolean;
    login: {
        title: string;
        name: string;
        pw: string;
        button: string;
        remember: string;
        forgot_pw: string;
        error: {
            failed: string;
            server: string;
        };
    };
    formErrors: {
        'username': string;
        'password': string;
    };
    validationMessages: {
        'username': {
            'required': string;
        };
        'password': {
            'required': string;
        };
    };
    constructor(_auth: AuthenticationService, _session: SessionService, _fb: FormBuilder, _route: ActivatedRoute, _router: Router);
    ngOnInit(): void;
    buildForm(): void;
    /**
     * @ignore
     *
     * check for errors while using the form
     * @param data
     */
    onValueChanged(data?: any): void;
    doLogin(): void;
    logout(): void;
}
