import * as tslib_1 from "tslib";
var ListNode_1;
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
let ListNode = ListNode_1 = class ListNode {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.hasRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
        this.children = undefined;
        this.position = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('id', String),
    tslib_1.__metadata("design:type", String)
], ListNode.prototype, "id", void 0);
tslib_1.__decorate([
    JsonProperty('name', String, true),
    tslib_1.__metadata("design:type", String)
], ListNode.prototype, "name", void 0);
tslib_1.__decorate([
    JsonProperty('hasRootNode', String, true),
    tslib_1.__metadata("design:type", String)
], ListNode.prototype, "hasRootNode", void 0);
tslib_1.__decorate([
    JsonProperty('labels', [StringLiteral]),
    tslib_1.__metadata("design:type", Array)
], ListNode.prototype, "labels", void 0);
tslib_1.__decorate([
    JsonProperty('comments', [StringLiteral]),
    tslib_1.__metadata("design:type", Array)
], ListNode.prototype, "comments", void 0);
tslib_1.__decorate([
    JsonProperty('children', [ListNode_1], true),
    tslib_1.__metadata("design:type", Array)
], ListNode.prototype, "children", void 0);
tslib_1.__decorate([
    JsonProperty('position', Number, true),
    tslib_1.__metadata("design:type", Number)
], ListNode.prototype, "position", void 0);
ListNode = ListNode_1 = tslib_1.__decorate([
    JsonObject('ListNode')
], ListNode);
export { ListNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztJQUd4QyxRQUFRLHNCQUFSLFFBQVE7SUFEckI7UUFHVyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBR3ZCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFHekIsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFHaEMsV0FBTSxHQUFvQixTQUFTLENBQUM7UUFHcEMsYUFBUSxHQUFvQixTQUFTLENBQUM7UUFHdEMsYUFBUSxHQUFlLFNBQVMsQ0FBQztRQUdqQyxhQUFRLEdBQVcsU0FBUyxDQUFDO0lBQ3hDLENBQUM7Q0FBQSxDQUFBO0FBbkJHO0lBREMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7O29DQUNHO0FBRzlCO0lBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztzQ0FDSDtBQUdoQztJQURDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7NkNBQ0g7QUFHdkM7SUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7O3dDQUNHO0FBRzNDO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzswQ0FDRztBQUc3QztJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7OzBDQUNIO0FBR3hDO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzswQ0FDSDtBQXBCM0IsUUFBUTtJQURwQixVQUFVLENBQUMsVUFBVSxDQUFDO0dBQ1YsUUFBUSxDQXFCcEI7U0FyQlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdE5vZGUnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlIHtcbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2hhc1Jvb3ROb2RlJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBoYXNSb290Tm9kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCB0cnVlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Bvc2l0aW9uJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBwb3NpdGlvbjogbnVtYmVyID0gdW5kZWZpbmVkO1xufVxuIl19