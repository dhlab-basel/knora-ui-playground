import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
var PermissionData = /** @class */ (function () {
    function PermissionData() {
        this.groupsPerProject = undefined;
        this.administrativePermissionsPerProject = undefined;
    }
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
    return PermissionData;
}());
export { PermissionData };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1kYXRhLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0Q7SUFEQTtRQUlXLHFCQUFnQixHQUFRLFNBQVMsQ0FBQztRQUdsQyx3Q0FBbUMsR0FBUSxTQUFTLENBQUM7SUFDaEUsQ0FBQztJQUpHO1FBREMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQzs7NERBQ0E7SUFHekM7UUFEQyxZQUFZLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDOzsrRUFDQTtJQU5uRCxjQUFjO1FBRDFCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztPQUNoQixjQUFjLENBTzFCO0lBQUQscUJBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ1Blcm1pc3Npb25EYXRhJylcbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRGF0YSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHNQZXJQcm9qZWN0JywgT2JqZWN0KVxuICAgIHB1YmxpYyBncm91cHNQZXJQcm9qZWN0OiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdhZG1pbmlzdHJhdGl2ZVBlcm1pc3Npb25zUGVyUHJvamVjdCcsIE9iamVjdClcbiAgICBwdWJsaWMgYWRtaW5pc3RyYXRpdmVQZXJtaXNzaW9uc1BlclByb2plY3Q6IGFueSA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==