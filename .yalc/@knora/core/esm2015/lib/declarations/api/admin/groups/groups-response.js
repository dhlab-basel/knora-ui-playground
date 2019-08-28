import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { Group } from './group';
let GroupsResponse = class GroupsResponse {
    constructor() {
        this.groups = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('groups', [Group]),
    tslib_1.__metadata("design:type", Array)
], GroupsResponse.prototype, "groups", void 0);
GroupsResponse = tslib_1.__decorate([
    JsonObject('GroupsResponse')
], GroupsResponse);
export { GroupsResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLXJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXBzLXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHaEMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUQzQjtRQUlXLFdBQU0sR0FBWSxTQUFTLENBQUM7SUFFdkMsQ0FBQztDQUFBLENBQUE7QUFGRztJQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OENBQ0c7QUFIMUIsY0FBYztJQUQxQixVQUFVLENBQUMsZ0JBQWdCLENBQUM7R0FDaEIsY0FBYyxDQUsxQjtTQUxZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL2dyb3VwJztcblxuQEpzb25PYmplY3QoJ0dyb3Vwc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cHNSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cHMnLCBbR3JvdXBdKVxuICAgIHB1YmxpYyBncm91cHM6IEdyb3VwW10gPSB1bmRlZmluZWQ7XG5cbn1cbiJdfQ==