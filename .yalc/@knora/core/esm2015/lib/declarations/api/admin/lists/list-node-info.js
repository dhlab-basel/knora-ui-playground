import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
/**
 * @deprecated You should use ListNode instead
 */
let ListNodeInfo = class ListNodeInfo {
    /**
     * @deprecated You should use ListNode instead
     */
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
    JsonProperty('id', String),
    tslib_1.__metadata("design:type", String)
], ListNodeInfo.prototype, "id", void 0);
tslib_1.__decorate([
    JsonProperty('name', String, true),
    tslib_1.__metadata("design:type", String)
], ListNodeInfo.prototype, "name", void 0);
tslib_1.__decorate([
    JsonProperty('projectIri', String, true),
    tslib_1.__metadata("design:type", String)
], ListNodeInfo.prototype, "projectIri", void 0);
tslib_1.__decorate([
    JsonProperty('isRootNode', Boolean, true),
    tslib_1.__metadata("design:type", Boolean)
], ListNodeInfo.prototype, "isRootNode", void 0);
tslib_1.__decorate([
    JsonProperty('labels', [StringLiteral]),
    tslib_1.__metadata("design:type", Array)
], ListNodeInfo.prototype, "labels", void 0);
tslib_1.__decorate([
    JsonProperty('comments', [StringLiteral]),
    tslib_1.__metadata("design:type", Array)
], ListNodeInfo.prototype, "comments", void 0);
ListNodeInfo = tslib_1.__decorate([
    JsonObject('ListNodeInfo')
], ListNodeInfo);
export { ListNodeInfo };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLWluZm8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRDs7R0FFRztBQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFKekI7O09BRUc7SUFDSDtRQUlXLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFHdkIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUd6QixlQUFVLEdBQVcsU0FBUyxDQUFDO1FBRy9CLGVBQVUsR0FBWSxTQUFTLENBQUM7UUFHaEMsV0FBTSxHQUFvQixTQUFTLENBQUM7UUFHcEMsYUFBUSxHQUFvQixTQUFTLENBQUM7SUFDakQsQ0FBQztDQUFBLENBQUE7QUFoQkc7SUFEQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7d0NBQ0c7QUFHOUI7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzBDQUNIO0FBR2hDO0lBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztnREFDSDtBQUd0QztJQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQzs7Z0RBQ0g7QUFHdkM7SUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7OzRDQUNHO0FBRzNDO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs4Q0FDRztBQWxCcEMsWUFBWTtJQUR4QixVQUFVLENBQUMsY0FBYyxDQUFDO0dBQ2QsWUFBWSxDQW1CeEI7U0FuQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgdXNlIExpc3ROb2RlIGluc3RlYWRcbiAqL1xuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mbycpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGVJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdElyaScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaXNSb290Tm9kZScsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljIGlzUm9vdE5vZGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iXX0=