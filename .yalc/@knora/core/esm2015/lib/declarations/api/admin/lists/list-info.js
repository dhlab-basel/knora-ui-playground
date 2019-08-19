import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
let ListInfo = class ListInfo {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.projectIri = undefined;
        this.isRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('id', String, false),
    tslib_1.__metadata("design:type", String)
], ListInfo.prototype, "id", void 0);
tslib_1.__decorate([
    JsonProperty('name', String, true),
    tslib_1.__metadata("design:type", String)
], ListInfo.prototype, "name", void 0);
tslib_1.__decorate([
    JsonProperty('projectIri', String, true),
    tslib_1.__metadata("design:type", String)
], ListInfo.prototype, "projectIri", void 0);
tslib_1.__decorate([
    JsonProperty('isRootNode', Boolean, true),
    tslib_1.__metadata("design:type", Boolean)
], ListInfo.prototype, "isRootNode", void 0);
tslib_1.__decorate([
    JsonProperty('labels', [StringLiteral], true),
    tslib_1.__metadata("design:type", Array)
], ListInfo.prototype, "labels", void 0);
tslib_1.__decorate([
    JsonProperty('comments', [StringLiteral], true),
    tslib_1.__metadata("design:type", Array)
], ListInfo.prototype, "comments", void 0);
ListInfo = tslib_1.__decorate([
    JsonObject('ListInfo')
], ListInfo);
export { ListInfo };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pbmZvLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0lBR3hDLFFBQVEsU0FBUixRQUFRO0lBRHJCO1FBSVcsT0FBRSxHQUFXLFNBQVMsQ0FBQztRQUd2QixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBR3pCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFHL0IsZUFBVSxHQUFZLFNBQVMsQ0FBQztRQUdoQyxXQUFNLEdBQW9CLFNBQVMsQ0FBQztRQUdwQyxhQUFRLEdBQW9CLFNBQVMsQ0FBQztJQUNqRCxDQUFDO0NBQUEsQ0FBQTtBQWhCRztJQURDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQzs7b0NBQ0o7QUFHOUI7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3NDQUNIO0FBR2hDO0lBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs0Q0FDSDtBQUd0QztJQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQzs7NENBQ0g7QUFHdkM7SUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDOzt3Q0FDSDtBQUczQztJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLENBQUM7OzBDQUNIO0FBbEJwQyxRQUFRO0lBRHBCLFVBQVUsQ0FBQyxVQUFVLENBQUM7R0FDVixRQUFRLENBbUJwQjtTQW5CWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mbycpXG5leHBvcnQgY2xhc3MgTGlzdEluZm8ge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdElyaScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaXNSb290Tm9kZScsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljIGlzUm9vdE5vZGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iXX0=