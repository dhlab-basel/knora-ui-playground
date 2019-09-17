import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { KnoraConstants, KuiCoreConfigToken, UsersService } from '@knora/core';
import * as momentImported from 'moment';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@knora/core";
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
                for (var groupsPerProjectKeys_1 = tslib_1.__values(groupsPerProjectKeys), groupsPerProjectKeys_1_1 = groupsPerProjectKeys_1.next(); !groupsPerProjectKeys_1_1.done; groupsPerProjectKeys_1_1 = groupsPerProjectKeys_1.next()) {
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
    SessionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SessionService_Factory() { return new SessionService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken), i0.ɵɵinject(i2.UsersService)); }, token: SessionService, providedIn: "root" });
    SessionService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(KuiCoreConfigToken)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object, UsersService])
    ], SessionService);
    return SessionService;
}());
export { SessionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBbUIsY0FBYyxFQUFFLGtCQUFrQixFQUFRLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUd0RyxPQUFPLEtBQUssY0FBYyxNQUFNLFFBQVEsQ0FBQztBQUV6QyxPQUFPLEVBQUUsR0FBRyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFakQsSUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBTTlCO0lBV0ksd0JBQ1ksS0FBaUIsRUFDVSxNQUFNLEVBQ2pDLE1BQW9CO1FBRnBCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDVSxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFWaEM7Ozs7V0FJRztRQUNNLHFCQUFnQixHQUFXLFFBQVEsQ0FBQyxDQUFDLDJCQUEyQjtJQU16RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsbUNBQVUsR0FBVixVQUFXLEdBQVcsRUFBRSxRQUFnQjtRQUF4QyxpQkF5REM7UUF2REcsb0VBQW9FO1FBQ3BFLElBQU0sY0FBYyxHQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckY7Ozs7Ozs7Ozs7Ozs7VUFhRTtRQUVGLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUs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Q3ZDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEIsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2FBRUo7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUdPLHFDQUFZLEdBQXBCO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FDOUQsR0FBRyxDQUFDLFVBQUMsTUFBVztZQUVaLDBFQUEwRTtZQUMxRSx1QkFBdUI7WUFDdkIsT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDSSxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O0lBbEpRLGNBQWM7UUFIMUIsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQWNPLG1CQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO2lEQURaLFVBQVUsVUFFVCxZQUFZO09BZHZCLGNBQWMsQ0FxSjFCO3lCQXBLRDtDQW9LQyxBQXJKRCxJQXFKQztTQXJKWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlLCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZUVycm9yLCBLbm9yYUNvbnN0YW50cywgS3VpQ29yZUNvbmZpZ1Rva2VuLCBVc2VyLCBVc2Vyc1NlcnZpY2UgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0ICogYXMgbW9tZW50SW1wb3J0ZWQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50SW1wb3J0ZWQ7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZXNzaW9uU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc2Vzc2lvbjogU2Vzc2lvbjtcblxuICAgIC8qKlxuICAgICAqIG1heCBzZXNzaW9uIHRpbWUgaW4gbWlsbGlzZWNvbmRzXG4gICAgICogZGVmYXVsdCB2YWx1ZSAoMjRoKTogODY0MDAwMDBcbiAgICAgKlxuICAgICAqL1xuICAgIHJlYWRvbmx5IE1BWF9TRVNTSU9OX1RJTUU6IG51bWJlciA9IDg2NDAwMDAwOyAvLyAxZCA9IDI0ICogNjAgKiA2MCAqIDEwMDBcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgQEluamVjdChLdWlDb3JlQ29uZmlnVG9rZW4pIHB1YmxpYyBjb25maWcsXG4gICAgICAgIHByaXZhdGUgX3VzZXJzOiBVc2Vyc1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHNlc3Npb24gYnkgdXNpbmcgdGhlIGpzb24gd2ViIHRva2VuIChqd3QpIGFuZCB0aGUgdXNlciBvYmplY3Q7XG4gICAgICogaXQgd2lsbCBiZSB1c2VkIGluIHRoZSBsb2dpbiBwcm9jZXNzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gand0XG4gICAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAgICovXG4gICAgc2V0U2Vzc2lvbihqd3Q6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHVzZXJuYW1lIGNhbiBiZSBlaXRoZXIgbmFtZSBvciBlbWFpbCBhZGRyZXNzLCBzbyB3aGF0IGRvIHdlIGhhdmU/XG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXJUeXBlOiBzdHJpbmcgPSAoKHVzZXJuYW1lLmluZGV4T2YoJ0AnKSA+IC0xKSA/ICdlbWFpbCcgOiAndXNlcm5hbWUnKTtcblxuICAgICAgICAvKlxuICAgICAgICB0aGlzLnNlc3Npb24gPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5zZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBqd3Q6IGp3dCxcbiAgICAgICAgICAgICAgICBsYW5nOiAnZW4nLFxuICAgICAgICAgICAgICAgIHN5c0FkbWluOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0QWRtaW46IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIHN0b3JlIGluIHRoZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcbiAgICAgICAgKi9cblxuICAgICAgICAvLyBnZXQgdXNlciBpbmZvcm1hdGlvblxuICAgICAgICB0aGlzLl91c2Vycy5nZXRVc2VyKHVzZXJuYW1lLCBpZGVudGlmaWVyVHlwZSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlc3VsdDogVXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzeXNBZG1pbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RBZG1pbjogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3Vwc1BlclByb2plY3RLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKHJlc3VsdC5wZXJtaXNzaW9ucy5ncm91cHNQZXJQcm9qZWN0KTtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGdyb3Vwc1BlclByb2plY3RLZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IEtub3JhQ29uc3RhbnRzLlN5c3RlbVByb2plY3RJUkkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5c0FkbWluID0gcmVzdWx0LnBlcm1pc3Npb25zLmdyb3Vwc1BlclByb2plY3Rba2V5XS5pbmRleE9mKEtub3JhQ29uc3RhbnRzLlN5c3RlbUFkbWluR3JvdXBJUkkpID4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnBlcm1pc3Npb25zLmdyb3Vwc1BlclByb2plY3Rba2V5XS5pbmRleE9mKEtub3JhQ29uc3RhbnRzLlByb2plY3RBZG1pbkdyb3VwSVJJKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0QWRtaW4ucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGVmaW5lIGEgc2Vzc2lvbiBpZCwgd2hpY2ggaXMgdGhlIHRpbWVzdGFtcCBvZiBsb2dpblxuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuc2V0VGltZXN0YW1wKCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3VsdC51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp3dDogand0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogcmVzdWx0LmxhbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXNBZG1pbjogc3lzQWRtaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0QWRtaW46IHByb2plY3RBZG1pblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBpbiB0aGUgbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcjogQXBpU2VydmljZUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRUaW1lc3RhbXAoKSB7XG4gICAgICAgIHJldHVybiAobW9tZW50KCkuYWRkKDAsICdzZWNvbmQnKSkudmFsdWVPZigpO1xuICAgIH1cblxuICAgIGdldFNlc3Npb24oKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVTZXNzaW9uKCkge1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGVTZXNzaW9uKCkge1xuICAgICAgICAvLyBtaXggb2YgY2hlY2tzIHdpdGggc2Vzc2lvbi52YWxpZGF0aW9uIGFuZCB0aGlzLmF1dGhlbnRpY2F0ZVxuICAgICAgICB0aGlzLnNlc3Npb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uJykpO1xuXG4gICAgICAgIGNvbnN0IHRzTm93OiBudW1iZXIgPSB0aGlzLnNldFRpbWVzdGFtcCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlc3Npb24pIHtcbiAgICAgICAgICAgIC8vIHRoZSBzZXNzaW9uIGV4aXN0c1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNlc3Npb24gaXMgc3RpbGwgdmFsaWQ6XG4gICAgICAgICAgICAvLyBpZiBzZXNzaW9uLmlkICsgTUFYX1NFU1NJT05fVElNRSA+IG5vdzogX3Nlc3Npb24udmFsaWRhdGVTZXNzaW9uKClcbiAgICAgICAgICAgIGlmICh0aGlzLnNlc3Npb24uaWQgKyB0aGlzLk1BWF9TRVNTSU9OX1RJTUUgPCB0c05vdykge1xuICAgICAgICAgICAgICAgIC8vIHRoZSBpbnRlcm5hbCBzZXNzaW9uIGhhcyBleHBpcmVkXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGFwaSB2Mi9hdXRoZW50aWNhdGlvbiBpcyBzdGlsbCB2YWxpZFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFwaSBhdXRoZW50aWNhdGlvbiBpcyB2YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzZXNzaW9uLmlkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5pZCA9IHRzTm93O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zZXNzaW9uKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignc2Vzc2lvbi5zZXJ2aWNlIC0tIHZhbGlkYXRlU2Vzc2lvbiAtLSBhdXRoZW50aWNhdGU6IHRoZSBzZXNzaW9uIGV4cGlyZWQgb24gQVBJIHNpZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYSB1c2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkIGFueW1vcmUhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGF1dGhlbnRpY2F0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArICcvdjIvYXV0aGVudGljYXRpb24nKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0F1dGhlbnRpY2F0aW9uU2VydmljZSAtIGF1dGhlbnRpY2F0ZSAtIHJlc3VsdDogJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZSB8fCBmYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuc3RhdHVzID09PSAyMDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlc3Ryb3lTZXNzaW9uKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvbicpO1xuICAgIH1cblxuXG59XG4iXX0=