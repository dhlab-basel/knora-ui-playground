import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
let PermissionData = class PermissionData {
    constructor() {
        this.groupsPerProject = undefined;
        this.administrativePermissionsPerProject = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('groupsPerProject', Object),
    tslib_1.__metadata("design:type", Object)
], PermissionData.prototype, "groupsPerProject", void 0);
tslib_1.__decorate([
    JsonProperty('administrativePermissionsPerProject', Object),
    tslib_1.__metadata("design:type", Object)
], PermissionData.prototype, "administrativePermissionsPerProject", void 0);
PermissionData = tslib_1.__decorate([
    JsonObject('PermissionData')
], PermissionData);
export { PermissionData };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1kYXRhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUQzQjtRQUlXLHFCQUFnQixHQUFRLFNBQVMsQ0FBQztRQUdsQyx3Q0FBbUMsR0FBUSxTQUFTLENBQUM7SUFDaEUsQ0FBQztDQUFBLENBQUE7QUFKRztJQURDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUM7O3dEQUNBO0FBR3pDO0lBREMsWUFBWSxDQUFDLHFDQUFxQyxFQUFFLE1BQU0sQ0FBQzs7MkVBQ0E7QUFObkQsY0FBYztJQUQxQixVQUFVLENBQUMsZ0JBQWdCLENBQUM7R0FDaEIsY0FBYyxDQU8xQjtTQVBZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnUGVybWlzc2lvbkRhdGEnKVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25EYXRhIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3Vwc1BlclByb2plY3QnLCBPYmplY3QpXG4gICAgcHVibGljIGdyb3Vwc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2FkbWluaXN0cmF0aXZlUGVybWlzc2lvbnNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdDogYW55ID0gdW5kZWZpbmVkO1xufVxuIl19