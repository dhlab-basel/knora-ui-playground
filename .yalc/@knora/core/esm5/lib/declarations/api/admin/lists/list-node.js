import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
var ListNode = /** @class */ (function () {
    function ListNode() {
        this.id = undefined;
        this.name = undefined;
        this.hasRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
        this.children = undefined;
        this.position = undefined;
    }
    ListNode_1 = ListNode;
    var ListNode_1;
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
    return ListNode;
}());
export { ListNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQUVyRDtRQUdXLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFHdkIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUd6QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUdoQyxXQUFNLEdBQW9CLFNBQVMsQ0FBQztRQUdwQyxhQUFRLEdBQW9CLFNBQVMsQ0FBQztRQUd0QyxhQUFRLEdBQWUsU0FBUyxDQUFDO1FBR2pDLGFBQVEsR0FBVyxTQUFTLENBQUM7SUFDeEMsQ0FBQztpQkFyQlksUUFBUTs7SUFFakI7UUFEQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7d0NBQ0c7SUFHOUI7UUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzBDQUNIO0lBR2hDO1FBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztpREFDSDtJQUd2QztRQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7NENBQ0c7SUFHM0M7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7OzhDQUNHO0lBRzdDO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQzs7OENBQ0g7SUFHeEM7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzhDQUNIO0lBcEIzQixRQUFRO1FBRHBCLFVBQVUsQ0FBQyxVQUFVLENBQUM7T0FDVixRQUFRLENBcUJwQjtJQUFELGVBQUM7Q0FBQSxJQUFBO1NBckJZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZSB7XG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdoYXNSb290Tm9kZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgaGFzUm9vdE5vZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVscycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgbGFiZWxzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjb21tZW50cycsIFtTdHJpbmdMaXRlcmFsXSlcbiAgICBwdWJsaWMgY29tbWVudHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY2hpbGRyZW46IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwb3NpdGlvbicsIE51bWJlciwgdHJ1ZSlcbiAgICBwdWJsaWMgcG9zaXRpb246IG51bWJlciA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==