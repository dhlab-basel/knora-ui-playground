import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
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
export { CurrentUser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC11c2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9jdXJyZW50LXVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0Q7O0dBRUc7QUFFSCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBSnhCOztPQUVHO0lBQ0g7UUFHSTs7V0FFRztRQUVJLFNBQUksR0FBVyxTQUFTLENBQUM7UUFFaEM7O1dBRUc7UUFFSSxRQUFHLEdBQVcsU0FBUyxDQUFDO1FBRS9COztXQUVHO1FBRUksU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUVoQzs7V0FFRztRQUVJLGFBQVEsR0FBWSxTQUFTLENBQUM7UUFFckM7O1dBRUc7UUFFSSxpQkFBWSxHQUFhLFNBQVMsQ0FBQztJQUU5QyxDQUFDO0NBQUEsQ0FBQTtBQTFCRztJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzt5Q0FDRztBQU1oQztJQURDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7d0NBQ0g7QUFNL0I7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3lDQUNIO0FBTWhDO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7OzZDQUNHO0FBTXJDO0lBREMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQzs7aURBQ0g7QUE5QmpDLFdBQVc7SUFEdkIsVUFBVTtHQUNFLFdBQVcsQ0FnQ3ZCO1NBaENZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG4vKipcbiAqIGN1cnJlbnRseSBsb2dnZWQtaW4gdXNlclxuICovXG5ASnNvbk9iamVjdFxuZXhwb3J0IGNsYXNzIEN1cnJlbnRVc2VyIHtcblxuICAgIC8qKlxuICAgICAqIHVzZXJuYW1lXG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICoganNvbiB3ZWIgdG9rZW5cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdqd3QnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGp3dDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogbGFuZ3VhZ2UgZm9yIHRoZSB1c2VyIGludGVyZmFjZVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIGlzIHN5c3RlbSBhZG1pbmlzdHJhdG9yP1xuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ3N5c0FkbWluJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3lzQWRtaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBsaXN0IG9mIHByb2plY3Qgc2hvcnRjb2Rlcywgd2hlcmUgdGhlIHVzZXIgaXMgcHJvamVjdCBhZG1pblxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RBZG1pbicsIFtTdHJpbmddLCB0cnVlKVxuICAgIHB1YmxpYyBwcm9qZWN0QWRtaW46IHN0cmluZ1tdID0gdW5kZWZpbmVkO1xuXG59XG4iXX0=