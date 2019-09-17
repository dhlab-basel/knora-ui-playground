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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdyRCxJQUFhLFFBQVEsZ0JBQXJCLE1BQWEsUUFBUTtJQURyQjtRQUdXLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFHdkIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUd6QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUdoQyxXQUFNLEdBQW9CLFNBQVMsQ0FBQztRQUdwQyxhQUFRLEdBQW9CLFNBQVMsQ0FBQztRQUd0QyxhQUFRLEdBQWUsU0FBUyxDQUFDO1FBR2pDLGFBQVEsR0FBVyxTQUFTLENBQUM7SUFDeEMsQ0FBQztDQUFBLENBQUE7QUFuQkc7SUFEQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7b0NBQ0c7QUFHOUI7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3NDQUNIO0FBR2hDO0lBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs2Q0FDSDtBQUd2QztJQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7d0NBQ0c7QUFHM0M7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7OzBDQUNHO0FBRzdDO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQzs7MENBQ0g7QUFHeEM7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzBDQUNIO0FBcEIzQixRQUFRO0lBRHBCLFVBQVUsQ0FBQyxVQUFVLENBQUM7R0FDVixRQUFRLENBcUJwQjtTQXJCWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZScpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGUge1xuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaGFzUm9vdE5vZGUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGhhc1Jvb3ROb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjaGlsZHJlbicsIFtMaXN0Tm9kZV0sIHRydWUpXG4gICAgcHVibGljIGNoaWxkcmVuOiBMaXN0Tm9kZVtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncG9zaXRpb24nLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIHBvc2l0aW9uOiBudW1iZXIgPSB1bmRlZmluZWQ7XG59XG4iXX0=