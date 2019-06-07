import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { GroupsResponse, UserResponse, UsersResponse } from '../../declarations/';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
/**
 * This service uses the Knora admin API and handles all user data.
 */
var UsersService = /** @class */ (function (_super) {
    tslib_1.__extends(UsersService, _super);
    function UsersService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    UsersService.prototype.getAllUsers = function () {
        return this.httpGet('/admin/users').pipe(map(function (result) { return result.getBody(UsersResponse).users; }), catchError(this.handleJsonError));
    };
    /**
     * Get user by username, email or by iri.
     * @ignore
     *
     * @param  {string} identifier username, email or by iri
     * @param  {String} identifierType
     * @returns Observable<User>
     */
    UsersService.prototype.getUser = function (identifier, identifierType) {
        var path = '/admin/users/' + identifierType + '/' + encodeURIComponent(identifier);
        return this.httpGet(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Get user by IRI
     *
     * @param  {string} iri
     * @returns Observable<User>
     */
    UsersService.prototype.getUserByIri = function (iri) {
        return this.getUser(iri, 'iri');
    };
    /**
     * Get user by email
     *
     * @param  {string} email
     * @returns Observable<User>
     */
    UsersService.prototype.getUserByEmail = function (email) {
        return this.getUser(email, 'email');
    };
    /**
     * Get user by username.
     *
     * @param  {string} username
     * @returns Observable<User>
     */
    UsersService.prototype.getUserByUsername = function (username) {
        return this.getUser(username, 'username');
    };
    /**
     * Get all groups, where the user is member of
     *
     * @param  {string} userIri
     * @returns Observable<Group[]>
     */
    UsersService.prototype.getUsersGroupMemberships = function (userIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/group-memberships';
        return this.httpGet(path).pipe(map(function (result) { return result.getBody(GroupsResponse).groups; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new user.
     *
     * @param {any} data
     * @returns Observable<User>
     */
    UsersService.prototype.createUser = function (data) {
        var path = '/admin/users';
        return this.httpPost(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProject = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-memberships/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Remove user from project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProject = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-memberships/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to the admin group of a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-admin-memberships/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Delete user from the admin group of a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/project-admin-memberships/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to project specific group
     *
     * @param {string} userIri
     * @param {string} groupIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToGroup = function (userIri, groupIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/group-memberships/' + encodeURIComponent(groupIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * remove user from project specific group
     *
     * @param {string} userIri
     * @param {string} groupIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromGroup = function (userIri, groupIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/group-memberships/' + encodeURIComponent(groupIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Add user to the admin system.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToSystemAdmin = function (userIri) {
        var data = {
            'systemAdmin': true
        };
        return this.updateUserSystemAdmin(userIri, data);
    };
    /**
     * Remove user from the admin system.
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromSystemAdmin = function (userIri) {
        var data = {
            'systemAdmin': false
        };
        return this.updateUserSystemAdmin(userIri, data);
    };
    /**
     * Update user system admin membership
     * @ignore
     *
     * @param {string} userIri
     * @param {any} data
     *
     * @returns Observable<User>
     */
    UsersService.prototype.updateUserSystemAdmin = function (userIri, data) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/SystemAdmin';
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Activate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.activateUser = function (userIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Status';
        var data = {
            status: true
        };
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Update own password.
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateOwnPassword = function (userIri, oldPassword, newPassword) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Password';
        var data = {
            newPassword: newPassword,
            requesterPassword: oldPassword
        };
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Update password of another user (not own).
     *
     * @param {string} userIri
     * @param {string} requesterPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateUsersPassword = function (userIri, requesterPassword, newPassword) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/Password';
        var data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Update basic user information: given name, family name
     * @param userIri
     * @param data
     * @returns Observable<User>
     */
    UsersService.prototype.updateBasicUserInformation = function (userIri, data) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri) + '/BasicUserInformation';
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete / deactivate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.deleteUser = function (userIri) {
        var path = '/admin/users/iri/' + encodeURIComponent(userIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    UsersService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    UsersService.ngInjectableDef = i0.defineInjectable({ factory: function UsersService_Factory() { return new UsersService(i0.inject(i1.HttpClient), i0.inject(i2.KuiCoreConfigToken)); }, token: UsersService, providedIn: "root" });
    return UsersService;
}(ApiService));
export { UsersService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUdILGNBQWMsRUFFZCxZQUFZLEVBQ1osYUFBYSxFQUNoQixNQUFNLHFCQUFxQixDQUFDOzs7O0FBRTdCOztHQUVHO0FBQ0g7SUFHa0Msd0NBQVU7SUFINUM7O0tBdVZDO0lBblZHLDJFQUEyRTtJQUMzRSxNQUFNO0lBQ04sMkVBQTJFO0lBRTNFOzs7O09BSUc7SUFDSCxrQ0FBVyxHQUFYO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDcEMsR0FBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFuQyxDQUFtQyxDQUFDLEVBQ3RFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLDhCQUFPLEdBQWYsVUFBZ0IsVUFBa0IsRUFBRSxjQUFzQjtRQUN0RCxJQUFNLElBQUksR0FBRyxlQUFlLEdBQUcsY0FBYyxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMxQixHQUFHLENBQUMsVUFBQyxNQUF3QixJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZ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QUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUdELDJFQUEyRTtJQUMzRSxTQUFTO0lBQ1QsMkVBQTJFO0lBRTNFOzs7OztPQUtHO0lBQ0gsaUNBQVUsR0FBVixVQUFXLE9BQWU7UUFDdEIsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDN0IsR0FBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFqQyxDQUFpQyxDQUFDLEVBQ3BFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFFTixDQUFDOztnQkFwVkosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7O3VCQWxCRDtDQXVXQyxBQXZWRCxDQUdrQyxVQUFVLEdBb1YzQztTQXBWWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gICAgQXBpU2VydmljZVJlc3VsdCxcbiAgICBHcm91cCxcbiAgICBHcm91cHNSZXNwb25zZSxcbiAgICBVc2VyLFxuICAgIFVzZXJSZXNwb25zZSxcbiAgICBVc2Vyc1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSB1c2VzIHRoZSBLbm9yYSBhZG1pbiBBUEkgYW5kIGhhbmRsZXMgYWxsIHVzZXIgZGF0YS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBVc2Vyc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB1c2Vycy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldEFsbFVzZXJzKCk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi91c2VycycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlcnNSZXNwb25zZSkudXNlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpLlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gaWRlbnRpZmllciB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZGVudGlmaWVyVHlwZVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nLCBpZGVudGlmaWVyVHlwZTogU3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBpZGVudGlmaWVyVHlwZSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGJ5IElSSVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgZ2V0VXNlckJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVzZXIoaXJpLCAnaXJpJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHVzZXIgYnkgZW1haWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gZW1haWxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKGVtYWlsLCAnZW1haWwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdXNlcm5hbWVcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgZ2V0VXNlckJ5VXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVc2VyKHVzZXJuYW1lLCAndXNlcm5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdyb3Vwcywgd2hlcmUgdGhlIHVzZXIgaXMgbWVtYmVyIG9mXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEdyb3VwW10+XG4gICAgICovXG4gICAgZ2V0VXNlcnNHcm91cE1lbWJlcnNoaXBzKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8R3JvdXBbXT4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvZ3JvdXAtbWVtYmVyc2hpcHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBzUmVzcG9uc2UpLmdyb3VwcyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgY3JlYXRlVXNlcihkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIGEgcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdCh1c2VySXJpOiBzdHJpbmcsIHByb2plY3RJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvcHJvamVjdC1tZW1iZXJzaGlwcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb2plY3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB1c2VyIGZyb20gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0KHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9wcm9qZWN0LW1lbWJlcnNoaXBzLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byB0aGUgYWRtaW4gZ3JvdXAgb2YgYSBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL3Byb2plY3QtYWRtaW4tbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgdXNlciBmcm9tIHRoZSBhZG1pbiBncm91cCBvZiBhIHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJGcm9tUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9wcm9qZWN0LWFkbWluLW1lbWJlcnNoaXBzLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdXNlciB0byBwcm9qZWN0IHNwZWNpZmljIGdyb3VwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Hcm91cCh1c2VySXJpOiBzdHJpbmcsIGdyb3VwSXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL2dyb3VwLW1lbWJlcnNoaXBzLycgKyBlbmNvZGVVUklDb21wb25lbnQoZ3JvdXBJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdChwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIHVzZXIgZnJvbSBwcm9qZWN0IHNwZWNpZmljIGdyb3VwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbUdyb3VwKHVzZXJJcmk6IHN0cmluZywgZ3JvdXBJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycy9pcmkvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvZ3JvdXAtbWVtYmVyc2hpcHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChncm91cElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBEZWxldGUocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcblxuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIHRoZSBhZG1pbiBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9TeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICdzeXN0ZW1BZG1pbic6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyU3lzdGVtQWRtaW4odXNlcklyaSwgZGF0YSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdXNlciBmcm9tIHRoZSBhZG1pbiBzeXN0ZW0uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21TeXN0ZW1BZG1pbih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICdzeXN0ZW1BZG1pbic6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlclN5c3RlbUFkbWluKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB1c2VyIHN5c3RlbSBhZG1pbiBtZW1iZXJzaGlwXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlVXNlclN5c3RlbUFkbWluKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9TeXN0ZW1BZG1pbic7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhY3RpdmF0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpICsgJy9TdGF0dXMnO1xuXG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBvd24gcGFzc3dvcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbGRQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVPd25QYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL1Bhc3N3b3JkJztcblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IG9sZFBhc3N3b3JkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBwYXNzd29yZCBvZiBhbm90aGVyIHVzZXIgKG5vdCBvd24pLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVyUGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlVXNlcnNQYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIHJlcXVlc3RlclBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL1Bhc3N3b3JkJztcblxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgbmV3UGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgICAgICAgICAgcmVxdWVzdGVyUGFzc3dvcmQ6IHJlcXVlc3RlclBhc3N3b3JkXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBiYXNpYyB1c2VyIGluZm9ybWF0aW9uOiBnaXZlbiBuYW1lLCBmYW1pbHkgbmFtZVxuICAgICAqIEBwYXJhbSB1c2VySXJpXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlQmFzaWNVc2VySW5mb3JtYXRpb24odXNlcklyaTogc3RyaW5nLCBkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvaXJpLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnL0Jhc2ljVXNlckluZm9ybWF0aW9uJztcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwUHV0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBERUxFVEVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSAvIGRlYWN0aXZhdGUgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGRlbGV0ZVVzZXIodXNlcklyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL2lyaS8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwRGVsZXRlKHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG5cblxufVxuIl19