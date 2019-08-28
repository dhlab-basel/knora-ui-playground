import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { Project } from './project';
let ProjectResponse = class ProjectResponse {
    constructor() {
        this.project = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('project', Project),
    tslib_1.__metadata("design:type", Project)
], ProjectResponse.prototype, "project", void 0);
ProjectResponse = tslib_1.__decorate([
    JsonObject('ProjectResponse')
], ProjectResponse);
export { ProjectResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBSXBDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFENUI7UUFJVyxZQUFPLEdBQVksU0FBUyxDQUFDO0lBRXhDLENBQUM7Q0FBQSxDQUFBO0FBRkc7SUFEQyxZQUFZLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztzQ0FDakIsT0FBTztnREFBYTtBQUgzQixlQUFlO0lBRDNCLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztHQUNqQixlQUFlLENBSzNCO1NBTFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuXG5ASnNvbk9iamVjdCgnUHJvamVjdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbn1cbiJdfQ==