import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { KnoraConstants, KuiCoreConfigToken, UsersService } from '@knora/core';
import * as momentImported from 'moment';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@knora/core";
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
SessionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken), i0.ɵɵinject(i2.UsersService)); }, token: SessionService, providedIn: "root" });
SessionService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object, UsersService])
], SessionService);
export { SessionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFtQixjQUFjLEVBQUUsa0JBQWtCLEVBQVEsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3RHLE9BQU8sS0FBSyxjQUFjLE1BQU0sUUFBUSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVyQyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFNOUIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQVd2QixZQUNZLEtBQWlCLEVBQ1UsTUFBTSxFQUNqQyxNQUFvQjtRQUZwQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ1UsV0FBTSxHQUFOLE1BQU0sQ0FBQTtRQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBVmhDOzs7O1dBSUc7UUFDTSxxQkFBZ0IsR0FBVyxRQUFRLENBQUMsQ0FBQywyQkFBMkI7SUFNekUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFVBQVUsQ0FBQyxHQUFXLEVBQUUsUUFBZ0I7UUFFcEMsb0VBQW9FO1FBQ3BFLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckY7Ozs7Ozs7Ozs7Ozs7VUFhRTtRQUVGLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFR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QUFDO2lCQUNoQjthQUVKO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFHTyxZQUFZO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQzlELEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1lBRWhCLDBFQUEwRTtZQUMxRSx1QkFBdUI7WUFDdkIsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELGNBQWM7UUFDVixZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FHSixDQUFBOztBQXJKWSxjQUFjO0lBSDFCLFVBQVUsQ0FBQztRQUNSLFVBQVUsRUFBRSxNQUFNO0tBQ3JCLENBQUM7SUFjTyxtQkFBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTs2Q0FEWixVQUFVLFVBRVQsWUFBWTtHQWR2QixjQUFjLENBcUoxQjtTQXJKWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBLbm9yYUNvbnN0YW50cywgS3VpQ29yZUNvbmZpZ1Rva2VuLCBVc2VyLCBVc2Vyc1NlcnZpY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0ICogYXMgbW9tZW50SW1wb3J0ZWQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50SW1wb3J0ZWQ7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZXNzaW9uU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc2Vzc2lvbjogU2Vzc2lvbjtcblxuICAgIC8qKlxuICAgICAqIG1heCBzZXNzaW9uIHRpbWUgaW4gbWlsbGlzZWNvbmRzXG4gICAgICogZGVmYXVsdCB2YWx1ZSAoMjRoKTogODY0MDAwMDBcbiAgICAgKlxuICAgICAqL1xuICAgIHJlYWRvbmx5IE1BWF9TRVNTSU9OX1RJTUU6IG51bWJlciA9IDg2NDAwMDAwOyAvLyAxZCA9IDI0ICogNjAgKiA2MCAqIDEwMDBcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdChLdWlDb3JlQ29uZmlnVG9rZW4pIHB1YmxpYyBjb25maWcsXG4gICAgICAgIHByaXZhdGUgX3VzZXJzOiBVc2Vyc1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHNlc3Npb24gYnkgdXNpbmcgdGhlIGpzb24gd2ViIHRva2VuIChqd3QpIGFuZCB0aGUgdXNlciBvYmplY3Q7XG4gICAgICogaXQgd2lsbCBiZSB1c2VkIGluIHRoZSBsb2dpbiBwcm9jZXNzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gand0XG4gICAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAgICovXG4gICAgc2V0U2Vzc2lvbihqd3Q6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHVzZXJuYW1lIGNhbiBiZSBlaXRoZXIgbmFtZSBvciBlbWFpbCBhZGRyZXNzLCBzbyB3aGF0IGRvIHdlIGhhdmU/XG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXJUeXBlOiBzdHJpbmcgPSAoKHVzZXJuYW1lLmluZGV4T2YoJ0AnKSA+IC0xKSA/ICdlbWFpbCcgOiAndXNlcm5hbWUnKTtcblxuICAgICAgICAvKlxuICAgICAgICB0aGlzLnNlc3Npb24gPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5zZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBqd3Q6IGp3dCxcbiAgICAgICAgICAgICAgICBsYW5nOiAnZW4nLFxuICAgICAgICAgICAgICAgIHN5c0FkbWluOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0QWRtaW46IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIHN0b3JlIGluIHRoZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcbiAgICAgICAgKi9cblxuICAgICAgICAvLyBnZXQgdXNlciBpbmZvcm1hdGlvblxuICAgICAgICB0aGlzLl91c2Vycy5nZXRVc2VyKHVzZXJuYW1lLCBpZGVudGlmaWVyVHlwZSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3VsdDogVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzeXNBZG1pbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RBZG1pbjogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3Vwc1BlclByb2plY3RLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKHJlc3VsdC5wZXJtaXNzaW9ucy5ncm91cHNQZXJQcm9qZWN0KTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGdyb3Vwc1BlclByb2plY3RLZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IEtub3JhQ29uc3RhbnRzLlN5c3RlbVByb2plY3RJUkkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5c0FkbWluID0gcmVzdWx0LnBlcm1pc3Npb25zLmdyb3Vwc1BlclByb2plY3Rba2V5XS5pbmRleE9mKEtub3JhQ29uc3RhbnRzLlN5c3RlbUFkbWluR3JvdXBJUkkpID4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnBlcm1pc3Npb25zLmdyb3Vwc1BlclByb2plY3Rba2V5XS5pbmRleE9mKEtub3JhQ29uc3RhbnRzLlByb2plY3RBZG1pbkdyb3VwSVJJKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0QWRtaW4ucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGVmaW5lIGEgc2Vzc2lvbiBpZCwgd2hpY2ggaXMgdGhlIHRpbWVzdGFtcCBvZiBsb2dpblxuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuc2V0VGltZXN0YW1wKCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3VsdC51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp3dDogand0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogcmVzdWx0LmxhbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXNBZG1pbjogc3lzQWRtaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0QWRtaW46IHByb2plY3RBZG1pblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBpbiB0aGUgbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUaW1lc3RhbXAoKSB7XG4gICAgICAgIHJldHVybiAobW9tZW50KCkuYWRkKDAsICdzZWNvbmQnKSkudmFsdWVPZigpO1xuICAgIH1cblxuICAgIGdldFNlc3Npb24oKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVTZXNzaW9uKCkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGVTZXNzaW9uKCkge1xuICAgICAgICAvLyBtaXggb2YgY2hlY2tzIHdpdGggc2Vzc2lvbi52YWxpZGF0aW9uIGFuZCB0aGlzLmF1dGhlbnRpY2F0ZVxuICAgICAgICB0aGlzLnNlc3Npb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uJykpO1xuXG4gICAgICAgIGNvbnN0IHRzTm93OiBudW1iZXIgPSB0aGlzLnNldFRpbWVzdGFtcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIHRoZSBzZXNzaW9uIGV4aXN0c1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNlc3Npb24gaXMgc3RpbGwgdmFsaWQ6XG4gICAgICAgICAgICAvLyBpZiBzZXNzaW9uLmlkICsgTUFYX1NFU1NJT05fVElNRSA+IG5vdzogX3Nlc3Npb24udmFsaWRhdGVTZXNzaW9uKClcbiAgICAgICAgICAgIGlmICh0aGlzLnNlc3Npb24uaWQgKyB0aGlzLk1BWF9TRVNTSU9OX1RJTUUgPCB0c05vdykge1xuICAgICAgICAgICAgICAgIC8vIHRoZSBpbnRlcm5hbCBzZXNzaW9uIGhhcyBleHBpcmVkXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGFwaSB2Mi9hdXRoZW50aWNhdGlvbiBpcyBzdGlsbCB2YWxpZFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFwaSBhdXRoZW50aWNhdGlvbiBpcyB2YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzZXNzaW9uLmlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5pZCA9IHRzTm93O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zZXNzaW9uKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignc2Vzc2lvbi5zZXJ2aWNlIC0tIHZhbGlkYXRlU2Vzc2lvbiAtLSBhdXRoZW50aWNhdGU6IHRoZSBzZXNzaW9uIGV4cGlyZWQgb24gQVBJIHNpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYSB1c2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkIGFueW1vcmUhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGF1dGhlbnRpY2F0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArICcvdjIvYXV0aGVudGljYXRpb24nKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0F1dGhlbnRpY2F0aW9uU2VydmljZSAtIGF1dGhlbnRpY2F0ZSAtIHJlc3VsdDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZSB8fCBmYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3RhdHVzID09PSAyMDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlc3Ryb3lTZXNzaW9uKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvbicpO1xuICAgIH1cblxuXG59XG4iXX0=