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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFtQixjQUFjLEVBQUUsa0JBQWtCLEVBQVEsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3RHLE9BQU8sS0FBSyxjQUFjLE1BQU0sUUFBUSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVyQyxJQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFNOUI7SUFXSSx3QkFDWSxLQUFpQixFQUNVLE1BQU0sRUFDakMsTUFBb0I7UUFGcEIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNVLFdBQU0sR0FBTixNQUFNLENBQUE7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQVZoQzs7OztXQUlHO1FBQ00scUJBQWdCLEdBQVcsUUFBUSxDQUFDLENBQUMsMkJBQTJCO0lBTXpFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxtQ0FBVSxHQUFWLFVBQVcsR0FBVyxFQUFFLFFBQWdCO1FBQXhDLGlCQXlEQztRQXZERyxvRUFBb0U7UUFDcEUsSUFBTSxjQUFjLEdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyRjs7Ozs7Ozs7Ozs7OztVQWFFO1FBRUYsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQ25ELFVBQUMsTUFBWTs7WUFDVCxJQUFJLFFBQVEsR0FBWSxLQUFLLENBQUM7WUFDOUIsSUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1lBRWxDLElBQU0sb0JBQW9CLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O2dCQUV4RixLQUFrQixJQUFBLHlCQUFBLGlCQUFBLG9CQUFvQixDQUFBLDBEQUFBLDRGQUFFO29CQUFuQyxJQUFNLEdBQUcsaUNBQUE7b0JBQ1YsSUFBSSxHQUFHLEtBQUssY0FBYyxDQUFDLGdCQUFnQixFQUFFO3dCQUN6QyxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3hHO29CQUVELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzVGLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzFCO2lCQUNKOzs7Ozs7Ozs7WUFFRCx1REFBdUQ7WUFDdkQsS0FBSSxDQUFDLE9BQU8sR0FBRztnQkFDWCxFQUFFLEVBQUUsS0FBSSxDQUFDLFlBQVksRUFBRTtnQkFDdkIsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUTtvQkFDckIsR0FBRyxFQUFFLEdBQUc7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO29CQUNqQixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsWUFBWSxFQUFFLFlBQVk7aUJBQzdCO2FBQ0osQ0FBQztZQUNGLDRCQUE0QjtZQUM1QixZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRWxFLENBQUMsRUFDRCxVQUFDLEtBQXNCO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRU8scUNBQVksR0FBcEI7UUFDSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxtQ0FBVSxHQUFWO0lBRUEsQ0FBQztJQUVELHNDQUFhLEdBQWI7SUFFQSxDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUNJLDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTNELElBQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUxQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxxQkFBcUI7WUFDckIsdUNBQXVDO1lBQ3ZDLHFFQUFxRTtZQUNyRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLEVBQUU7Z0JBQ2pELG1DQUFtQztnQkFDbkMsb0RBQW9EO2dCQUVwRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtvQkFDckIsbUNBQW1DO29CQUNuQyx3QkFBd0I7b0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztvQkFFeEIsc0NBQXNDO29CQUN0QyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM5RCxPQUFPLElBQUksQ0FBQztpQkFFZjtxQkFBTTtvQkFDSCx3R0FBd0c7b0JBQ3hHLHVDQUF1QztvQkFDdkMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN0QixPQUFPLEtBQUssQ0FBQztpQkFDaEI7YUFFSjtpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR08scUNBQVksR0FBcEI7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUM5RCxHQUFHLENBQUMsVUFBQyxNQUFXO1lBRVosMEVBQTBFO1lBQzFFLHVCQUF1QjtZQUN2QixPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsdUNBQWMsR0FBZDtRQUNJLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7SUFsSlEsY0FBYztRQUgxQixVQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBY08sbUJBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7aURBRFosVUFBVSxVQUVULFlBQVk7T0FkdkIsY0FBYyxDQXFKMUI7eUJBcEtEO0NBb0tDLEFBckpELElBcUpDO1NBckpZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEtub3JhQ29uc3RhbnRzLCBLdWlDb3JlQ29uZmlnVG9rZW4sIFVzZXIsIFVzZXJzU2VydmljZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9kZWNsYXJhdGlvbnMnO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRJbXBvcnRlZCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRJbXBvcnRlZDtcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlc3Npb25TZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBzZXNzaW9uOiBTZXNzaW9uO1xuXG4gICAgLyoqXG4gICAgICogbWF4IHNlc3Npb24gdGltZSBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiBkZWZhdWx0IHZhbHVlICgyNGgpOiA4NjQwMDAwMFxuICAgICAqXG4gICAgICovXG4gICAgcmVhZG9ubHkgTUFYX1NFU1NJT05fVElNRTogbnVtYmVyID0gODY0MDAwMDA7IC8vIDFkID0gMjQgKiA2MCAqIDYwICogMTAwMFxuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBASW5qZWN0KEt1aUNvcmVDb25maWdUb2tlbikgcHVibGljIGNvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBfdXNlcnM6IFVzZXJzU2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldCB0aGUgc2Vzc2lvbiBieSB1c2luZyB0aGUganNvbiB3ZWIgdG9rZW4gKGp3dCkgYW5kIHRoZSB1c2VyIG9iamVjdDtcbiAgICAgKiBpdCB3aWxsIGJlIHVzZWQgaW4gdGhlIGxvZ2luIHByb2Nlc3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSBqd3RcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWVcbiAgICAgKi9cbiAgICBzZXRTZXNzaW9uKGp3dDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gdXNlcm5hbWUgY2FuIGJlIGVpdGhlciBuYW1lIG9yIGVtYWlsIGFkZHJlc3MsIHNvIHdoYXQgZG8gd2UgaGF2ZT9cbiAgICAgICAgY29uc3QgaWRlbnRpZmllclR5cGU6IHN0cmluZyA9ICgodXNlcm5hbWUuaW5kZXhPZignQCcpID4gLTEpID8gJ2VtYWlsJyA6ICd1c2VybmFtZScpO1xuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnNldFRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIGp3dDogand0LFxuICAgICAgICAgICAgICAgIGxhbmc6ICdlbicsXG4gICAgICAgICAgICAgICAgc3lzQWRtaW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByb2plY3RBZG1pbjogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gc3RvcmUgaW4gdGhlIGxvY2FsU3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvbicsIEpTT04uc3RyaW5naWZ5KHRoaXMuc2Vzc2lvbikpO1xuICAgICAgICAqL1xuXG4gICAgICAgIC8vIGdldCB1c2VyIGluZm9ybWF0aW9uXG4gICAgICAgIHRoaXMuX3VzZXJzLmdldFVzZXIodXNlcm5hbWUsIGlkZW50aWZpZXJUeXBlKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzdWx0OiBVc2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN5c0FkbWluOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdEFkbWluOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBzUGVyUHJvamVjdEtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMocmVzdWx0LnBlcm1pc3Npb25zLmdyb3Vwc1BlclByb2plY3QpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZ3JvdXBzUGVyUHJvamVjdEtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gS25vcmFDb25zdGFudHMuU3lzdGVtUHJvamVjdElSSSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3lzQWRtaW4gPSByZXN1bHQucGVybWlzc2lvbnMuZ3JvdXBzUGVyUHJvamVjdFtrZXldLmluZGV4T2YoS25vcmFDb25zdGFudHMuU3lzdGVtQWRtaW5Hcm91cElSSSkgPiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucGVybWlzc2lvbnMuZ3JvdXBzUGVyUHJvamVjdFtrZXldLmluZGV4T2YoS25vcmFDb25zdGFudHMuUHJvamVjdEFkbWluR3JvdXBJUkkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RBZG1pbi5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkZWZpbmUgYSBzZXNzaW9uIGlkLCB3aGljaCBpcyB0aGUgdGltZXN0YW1wIG9mIGxvZ2luXG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5zZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzdWx0LnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgand0OiBqd3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5nOiByZXN1bHQubGFuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5c0FkbWluOiBzeXNBZG1pbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RBZG1pbjogcHJvamVjdEFkbWluXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIHN0b3JlIGluIHRoZSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvbicsIEpTT04uc3RyaW5naWZ5KHRoaXMuc2Vzc2lvbikpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yOiBBcGlTZXJ2aWNlRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRpbWVzdGFtcCgpIHtcbiAgICAgICAgcmV0dXJuIChtb21lbnQoKS5hZGQoMCwgJ3NlY29uZCcpKS52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgZ2V0U2Vzc2lvbigpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZVNlc3Npb24oKSB7XG5cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVNlc3Npb24oKSB7XG4gICAgICAgIC8vIG1peCBvZiBjaGVja3Mgd2l0aCBzZXNzaW9uLnZhbGlkYXRpb24gYW5kIHRoaXMuYXV0aGVudGljYXRlXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb24nKSk7XG5cbiAgICAgICAgY29uc3QgdHNOb3c6IG51bWJlciA9IHRoaXMuc2V0VGltZXN0YW1wKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Vzc2lvbikge1xuICAgICAgICAgICAgLy8gdGhlIHNlc3Npb24gZXhpc3RzXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgc2Vzc2lvbiBpcyBzdGlsbCB2YWxpZDpcbiAgICAgICAgICAgIC8vIGlmIHNlc3Npb24uaWQgKyBNQVhfU0VTU0lPTl9USU1FID4gbm93OiBfc2Vzc2lvbi52YWxpZGF0ZVNlc3Npb24oKVxuICAgICAgICAgICAgaWYgKHRoaXMuc2Vzc2lvbi5pZCArIHRoaXMuTUFYX1NFU1NJT05fVElNRSA8IHRzTm93KSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIGludGVybmFsIHNlc3Npb24gaGFzIGV4cGlyZWRcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgYXBpIHYyL2F1dGhlbnRpY2F0aW9uIGlzIHN0aWxsIHZhbGlkXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYXBpIGF1dGhlbnRpY2F0aW9uIGlzIHZhbGlkO1xuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNlc3Npb24uaWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uLmlkID0gdHNOb3c7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb24nKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb24nLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNlc3Npb24pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdzZXNzaW9uLnNlcnZpY2UgLS0gdmFsaWRhdGVTZXNzaW9uIC0tIGF1dGhlbnRpY2F0ZTogdGhlIHNlc3Npb24gZXhwaXJlZCBvbiBBUEkgc2lkZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyBhIHVzZXIgaXMgbm90IGF1dGhlbnRpY2F0ZWQgYW55bW9yZSFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYXV0aGVudGljYXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBpICsgJy92Mi9hdXRoZW50aWNhdGlvbicpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogYW55KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQXV0aGVudGljYXRpb25TZXJ2aWNlIC0gYXV0aGVudGljYXRlIC0gcmVzdWx0OiAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlIHx8IGZhbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zdGF0dXMgPT09IDIwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVzdHJveVNlc3Npb24oKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uJyk7XG4gICAgfVxuXG5cbn1cbiJdfQ==