import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
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
    tslib_1.__decorate([
        JsonProperty('name', String),
        tslib_1.__metadata("design:type", String)
    ], CurrentUser.prototype, "name", void 0);
    tslib_1.__decorate([
        JsonProperty('jwt', String, true),
        tslib_1.__metadata("design:type", String)
    ], CurrentUser.prototype, "jwt", void 0);
    tslib_1.__decorate([
        JsonProperty('lang', String, true),
        tslib_1.__metadata("design:type", String)
    ], CurrentUser.prototype, "lang", void 0);
    tslib_1.__decorate([
        JsonProperty('sysAdmin', Boolean),
        tslib_1.__metadata("design:type", Boolean)
    ], CurrentUser.prototype, "sysAdmin", void 0);
    tslib_1.__decorate([
        JsonProperty('projectAdmin', [String], true),
        tslib_1.__metadata("design:type", Array)
    ], CurrentUser.prototype, "projectAdmin", void 0);
    CurrentUser = tslib_1.__decorate([
        JsonObject
    ], CurrentUser);
    return CurrentUser;
}());
export { CurrentUser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11c2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9jdXJyZW50LXVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0Q7O0dBRUc7QUFFSDtJQURBO1FBR0k7O1dBRUc7UUFFSSxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRWhDOztXQUVHO1FBRUksUUFBRyxHQUFXLFNBQVMsQ0FBQztRQUUvQjs7V0FFRztRQUVJLFNBQUksR0FBVyxTQUFTLENBQUM7UUFFaEM7O1dBRUc7UUFFSSxhQUFRLEdBQVksU0FBUyxDQUFDO1FBRXJDOztXQUVHO1FBRUksaUJBQVksR0FBYSxTQUFTLENBQUM7SUFFOUMsQ0FBQztJQTFCRztRQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzs2Q0FDRztJQU1oQztRQURDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7NENBQ0g7SUFNL0I7UUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzZDQUNIO0lBTWhDO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7O2lEQUNHO0lBTXJDO1FBREMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQzs7cURBQ0g7SUE5QmpDLFdBQVc7UUFEdkIsVUFBVTtPQUNFLFdBQVcsQ0FnQ3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQWhDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBjdXJyZW50bHkgbG9nZ2VkLWluIHVzZXJcbiAqL1xuQEpzb25PYmplY3RcbmV4cG9ydCBjbGFzcyBDdXJyZW50VXNlciB7XG5cbiAgICAvKipcbiAgICAgKiB1c2VybmFtZVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIGpzb24gd2ViIHRva2VuXG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnand0JywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBqd3Q6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIGxhbmd1YWdlIGZvciB0aGUgdXNlciBpbnRlcmZhY2VcbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdsYW5nJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBpcyBzeXN0ZW0gYWRtaW5pc3RyYXRvcj9cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdzeXNBZG1pbicsIEJvb2xlYW4pXG4gICAgcHVibGljIHN5c0FkbWluOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogbGlzdCBvZiBwcm9qZWN0IHNob3J0Y29kZXMsIHdoZXJlIHRoZSB1c2VyIGlzIHByb2plY3QgYWRtaW5cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdwcm9qZWN0QWRtaW4nLCBbU3RyaW5nXSwgdHJ1ZSlcbiAgICBwdWJsaWMgcHJvamVjdEFkbWluOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxufVxuIl19