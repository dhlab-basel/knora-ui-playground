import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiServiceError, KuiCoreConfig, KuiCoreConfigToken } from '@knora/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionService } from './session/session.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./session/session.service";
import * as i3 from "@knora/core";
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
     */
    logout() {
        return this.http.delete(this.config.api + '/v2/authentication').pipe(map((response) => {
            this._session.destroySession();
            return response;
        }), catchError((error) => {
            return this.handleRequestError(error);
        }));
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
AuthenticationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SessionService), i0.ɵɵinject(i3.KuiCoreConfigToken)); }, token: AuthenticationService, providedIn: "root" });
AuthenticationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(2, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [HttpClient,
        SessionService,
        KuiCoreConfig])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pGLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0FBRTNEOztHQUVHO0FBSUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFFOUIsWUFBb0IsSUFBZ0IsRUFDeEIsUUFBd0IsRUFDRyxNQUFxQjtRQUZ4QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBQ0csV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUV4RCxvRUFBb0U7SUFDeEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsYUFBYSxDQUFDLEdBQVcsRUFBRSxRQUFnQjtRQUN2QyxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUVwQyx5RUFBeUU7UUFFekUsSUFBSSxNQUFNLEdBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUU3RCxvRUFBb0U7UUFDcEUsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzVCLDRCQUE0QjtZQUM1QixNQUFNLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztTQUNwRDtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvRixHQUFHLENBQUMsQ0FBQyxRQUEyQixFQUFPLEVBQUU7WUFDckMsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLENBQUMsS0FBd0IsRUFBRSxFQUFFO1lBRXBDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTTtRQUVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQ2hFLEdBQUcsQ0FBQyxDQUFDLFFBQTJCLEVBQU8sRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQy9CLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRTtZQUVwQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBRU4sQ0FBQztJQUdEOzs7Ozs7T0FNRztJQUNPLGtCQUFrQixDQUFDLEtBQXdCO1FBQ2pELE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDM0MsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ2hFLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxZQUFZLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDM0MsWUFBWSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM3QixPQUFPLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0osQ0FBQTs7QUF0R1kscUJBQXFCO0lBSGpDLFVBQVUsQ0FBQztRQUNSLFVBQVUsRUFBRSxNQUFNO0tBQ3JCLENBQUM7SUFLTyxtQkFBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTs2Q0FGTCxVQUFVO1FBQ2QsY0FBYztRQUNXLGFBQWE7R0FKbkQscUJBQXFCLENBc0dqQztTQXRHWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEt1aUNvcmVDb25maWcsIEt1aUNvcmVDb25maWdUb2tlbiB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbi8qKlxuICogQXV0aGVudGljYXRpb24gc2VydmljZSBpbmNsdWRlcyB0aGUgbG9naW4sIGxvZ291dCBtZXRob2QgYW5kIGEgc2Vzc2lvbiBtZXRob2QgdG8gY2hlY2sgaWYgYSB1c2VyIGlzIGxvZ2dlZCBpbiBvciBub3QuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSBfc2Vzc2lvbjogU2Vzc2lvblNlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0F1dGhlbnRpY2F0aW9uU2VydmljZSBjb25zdHJ1Y3RvcjogY29uZmlnJywgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZSBpZiBhIHVzZXIgaXMgbG9nZ2VkIGluIG9yIG5vdFxuICAgICAqIHJldHVybnMgdHJ1ZSBpZiB0aGUgc2Vzc2lvbiBpcyBhY3RpdmVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICAgKi9cbiAgICBzZXNzaW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi52YWxpZGF0ZVNlc3Npb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIHNlc3Npb24gc3RvcmFnZVxuICAgICAqIEBwYXJhbSBqd3RcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICAgKi9cbiAgICB1cGRhdGVTZXNzaW9uKGp3dDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChqd3QgJiYgdXNlcm5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb24uc2V0U2Vzc2lvbihqd3QsIHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9naW4gcHJvY2VzcztcbiAgICAgKiBpdCdzIHVzZWQgYnkgdGhlIGxvZ2luIGNvbXBvbmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXIgZW1haWwgb3IgdXNlcm5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICAgKi9cbiAgICBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXV0aGVudGljYXRpb25TZXJ2aWNlIC0gbG9naW4gLSBhcGk6ICcsIHRoaXMuY29uZmlnLmFwaSk7XG5cbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0geyB1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCB9O1xuXG4gICAgICAgIC8vIHVzZXJuYW1lIGNhbiBiZSBlaXRoZXIgbmFtZSBvciBlbWFpbCBhZGRyZXNzLCBzbyB3aGF0IGRvIHdlIGhhdmU/XG4gICAgICAgIGlmICh1c2VybmFtZS5pbmRleE9mKCdAJykgPiAtMSkge1xuICAgICAgICAgICAgLy8gdXNlcm5hbWUgaXMgZW1haWwgYWRkcmVzc1xuICAgICAgICAgICAgcGFyYW1zID0geyBlbWFpbDogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaSArICcvdjIvYXV0aGVudGljYXRpb24nLCBwYXJhbXMsIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBhbnkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2dvdXQgdGhlIHVzZXIgYnkgZGVzdHJveWluZyB0aGUgc2Vzc2lvblxuICAgICAqXG4gICAgICovXG4gICAgbG9nb3V0KCk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpICsgJy92Mi9hdXRoZW50aWNhdGlvbicpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IGFueSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Vzc2lvbi5kZXN0cm95U2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIGhhbmRsZSByZXF1ZXN0IGVycm9yIGluIGNhc2Ugb2Ygc2VydmVyIGVycm9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyb3JcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBoYW5kbGVSZXF1ZXN0RXJyb3IoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZUVycm9yID0gbmV3IEFwaVNlcnZpY2VFcnJvcigpO1xuICAgICAgICBzZXJ2aWNlRXJyb3IuaGVhZGVyID0geyAnc2VydmVyJzogZXJyb3IuaGVhZGVycy5nZXQoJ1NlcnZlcicpIH07XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxufVxuIl19