import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
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
    WithCredentialsInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [SessionService])
    ], WithCredentialsInterceptor);
    return WithCredentialsInterceptor;
}());
export { WithCredentialsInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1jcmVkZW50aWFscy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hdXRoZW50aWNhdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmNlcHRvcnMvd2l0aC1jcmVkZW50aWFscy5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHNUQ7SUFFSSxvQ0FBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7SUFDNUMsQ0FBQztJQUVELDhDQUFTLEdBQVQsVUFBVSxPQUF5QixFQUFFLElBQWlCO1FBQ2xELHVEQUF1RDtRQUV2RCw4RUFBOEU7UUFFOUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDcEIsZUFBZSxFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFmUSwwQkFBMEI7UUFEdEMsVUFBVSxFQUFFO2lEQUdxQixjQUFjO09BRm5DLDBCQUEwQixDQWdCdEM7SUFBRCxpQ0FBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZXNzaW9uU2VydmljZSB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpdGhDcmVkZW50aWFsc0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Nlc3Npb246IFNlc3Npb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW4gaWYgYXZhaWxhYmxlXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1dpdGhDcmVkZW50aWFsc0ludGVyY2VwdG9yIC0gaW50ZXJjZXB0IC0gcmVxdWVzdDogJywgcmVxdWVzdCk7XG5cbiAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG59XG4iXX0=