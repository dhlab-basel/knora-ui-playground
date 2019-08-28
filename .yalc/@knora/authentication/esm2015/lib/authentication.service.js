import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiServiceError, KuiCoreConfigToken } from '@knora/core';
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
AuthenticationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SessionService), i0.ɵɵinject(i3.KuiCoreConfigToken)); }, token: AuthenticationService, providedIn: "root" });
AuthenticationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(2, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [HttpClient,
        SessionService, Object])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEUsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFFM0Q7O0dBRUc7QUFJSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUU5QixZQUFvQixJQUFnQixFQUN4QixRQUF3QixFQUNHLE1BQU07UUFGekIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUNHLFdBQU0sR0FBTixNQUFNLENBQUE7UUFFekMsb0VBQW9FO0lBQ3hFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxHQUFXLEVBQUUsUUFBZ0I7UUFDdkMsSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN4QyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFFcEMseUVBQXlFO1FBRXpFLElBQUksTUFBTSxHQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFFN0Qsb0VBQW9FO1FBQ3BFLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM1Qiw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7U0FDcEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxvQkFBb0IsRUFDdEMsTUFBTSxFQUNOLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUN6QixHQUFHLENBQUMsQ0FBQyxRQUEyQixFQUFPLEVBQUU7WUFDckMsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLENBQUMsS0FBd0IsRUFBRSxFQUFFO1lBRXBDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU07UUFDRixzQkFBc0I7UUFDdEIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBR0Q7Ozs7OztPQU1HO0lBQ08sa0JBQWtCLENBQUMsS0FBd0I7UUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUMzQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDaEUsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25DLFlBQVksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMzQyxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdkMsWUFBWSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzdCLE9BQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDSixDQUFBOztBQWhHWSxxQkFBcUI7SUFIakMsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUtPLG1CQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBOzZDQUZMLFVBQVU7UUFDZCxjQUFjO0dBSDNCLHFCQUFxQixDQWdHakM7U0FoR1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBLdWlDb3JlQ29uZmlnVG9rZW4gfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIHNlcnZpY2UgaW5jbHVkZXMgdGhlIGxvZ2luLCBsb2dvdXQgbWV0aG9kIGFuZCBhIHNlc3Npb24gbWV0aG9kIHRvIGNoZWNrIGlmIGEgdXNlciBpcyBsb2dnZWQgaW4gb3Igbm90LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgX3Nlc3Npb246IFNlc3Npb25TZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZykge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBdXRoZW50aWNhdGlvblNlcnZpY2UgY29uc3RydWN0b3I6IGNvbmZpZycsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGUgaWYgYSB1c2VyIGlzIGxvZ2dlZCBpbiBvciBub3RcbiAgICAgKiByZXR1cm5zIHRydWUgaWYgdGhlIHNlc3Npb24gaXMgYWN0aXZlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAgICovXG4gICAgc2Vzc2lvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24udmFsaWRhdGVTZXNzaW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSBzZXNzaW9uIHN0b3JhZ2VcbiAgICAgKiBAcGFyYW0gand0XG4gICAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAgICovXG4gICAgdXBkYXRlU2Vzc2lvbihqd3Q6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoand0ICYmIHVzZXJuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXNzaW9uLnNldFNlc3Npb24oand0LCB1c2VybmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvZ2luIHByb2Nlc3M7XG4gICAgICogaXQncyB1c2VkIGJ5IHRoZSBsb2dpbiBjb21wb25lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyIGVtYWlsIG9yIHVzZXJuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxhbnk+XG4gICAgICovXG4gICAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0F1dGhlbnRpY2F0aW9uU2VydmljZSAtIGxvZ2luIC0gYXBpOiAnLCB0aGlzLmNvbmZpZy5hcGkpO1xuXG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfTtcblxuICAgICAgICAvLyB1c2VybmFtZSBjYW4gYmUgZWl0aGVyIG5hbWUgb3IgZW1haWwgYWRkcmVzcywgc28gd2hhdCBkbyB3ZSBoYXZlP1xuICAgICAgICBpZiAodXNlcm5hbWUuaW5kZXhPZignQCcpID4gLTEpIHtcbiAgICAgICAgICAgIC8vIHVzZXJuYW1lIGlzIGVtYWlsIGFkZHJlc3NcbiAgICAgICAgICAgIHBhcmFtcyA9IHsgZW1haWw6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFwaSArICcvdjIvYXV0aGVudGljYXRpb24nLFxuICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgeyBvYnNlcnZlOiAncmVzcG9uc2UnIH0pLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBhbnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2dvdXQgdGhlIHVzZXIgYnkgZGVzdHJveWluZyB0aGUgc2Vzc2lvblxuICAgICAqXG4gICAgICogQHBhcmFtXG4gICAgICovXG4gICAgbG9nb3V0KCkge1xuICAgICAgICAvLyBkZXN0cm95IHRoZSBzZXNzaW9uXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlcnJvclxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5oZWFkZXIgPSB7ICdzZXJ2ZXInOiBlcnJvci5oZWFkZXJzLmdldCgnU2VydmVyJykgfTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSBlcnJvci5zdGF0dXNUZXh0O1xuICAgICAgICBzZXJ2aWNlRXJyb3IuZXJyb3JJbmZvID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgc2VydmljZUVycm9yLnVybCA9IGVycm9yLnVybDtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioc2VydmljZUVycm9yKTtcbiAgICB9XG59XG4iXX0=