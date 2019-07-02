import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { User } from '../users/user';
var ProjectMembersResponse = /** @class */ (function () {
    function ProjectMembersResponse() {
        this.members = undefined;
    }
    tslib_1.__decorate([
        JsonProperty('members', [User]),
        tslib_1.__metadata("design:type", Array)
    ], ProjectMembersResponse.prototype, "members", void 0);
    ProjectMembersResponse = tslib_1.__decorate([
        JsonObject('ProjectMembersResponse')
    ], ProjectMembersResponse);
    return ProjectMembersResponse;
}());
export { ProjectMembersResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1tZW1iZXJzLXJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdyQztJQURBO1FBR1csWUFBTyxHQUFXLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBREc7UUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7OzJEQUNHO0lBRjFCLHNCQUFzQjtRQURsQyxVQUFVLENBQUMsd0JBQXdCLENBQUM7T0FDeEIsc0JBQXNCLENBR2xDO0lBQUQsNkJBQUM7Q0FBQSxBQUhELElBR0M7U0FIWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXJzL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnUHJvamVjdE1lbWJlcnNSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgUHJvamVjdE1lbWJlcnNSZXNwb25zZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnbWVtYmVycycsIFtVc2VyXSlcbiAgICBwdWJsaWMgbWVtYmVyczogVXNlcltdID0gdW5kZWZpbmVkO1xufVxuIl19