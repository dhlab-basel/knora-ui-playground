import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { User } from '../users/user';
let ProjectMembersResponse = class ProjectMembersResponse {
    constructor() {
        this.members = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('members', [User]),
    tslib_1.__metadata("design:type", Array)
], ProjectMembersResponse.prototype, "members", void 0);
ProjectMembersResponse = tslib_1.__decorate([
    JsonObject('ProjectMembersResponse')
], ProjectMembersResponse);
export { ProjectMembersResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1tZW1iZXJzLXJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztJQUd4QixzQkFBc0IsU0FBdEIsc0JBQXNCO0lBRG5DO1FBR1csWUFBTyxHQUFXLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0NBQUEsQ0FBQTtBQURHO0lBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDOzt1REFDRztBQUYxQixzQkFBc0I7SUFEbEMsVUFBVSxDQUFDLHdCQUF3QixDQUFDO0dBQ3hCLHNCQUFzQixDQUdsQztTQUhZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlcnMvdXNlcic7XG5cbkBKc29uT2JqZWN0KCdQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlIHtcbiAgICBASnNvblByb3BlcnR5KCdtZW1iZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyBtZW1iZXJzOiBVc2VyW10gPSB1bmRlZmluZWQ7XG59XG4iXX0=