import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
var ListNode = /** @class */ (function () {
    function ListNode() {
        this.id = undefined;
        this.name = undefined;
        this.label = undefined;
        this.children = undefined;
        this.level = undefined;
        this.position = undefined;
    }
    ListNode_1 = ListNode;
    var ListNode_1;
    tslib_1.__decorate([
        JsonProperty('id', String, false),
        tslib_1.__metadata("design:type", String)
    ], ListNode.prototype, "id", void 0);
    tslib_1.__decorate([
        JsonProperty('name', String, true),
        tslib_1.__metadata("design:type", String)
    ], ListNode.prototype, "name", void 0);
    tslib_1.__decorate([
        JsonProperty('label', String, true),
        tslib_1.__metadata("design:type", String)
    ], ListNode.prototype, "label", void 0);
    tslib_1.__decorate([
        JsonProperty('children', [ListNode_1], true),
        tslib_1.__metadata("design:type", Array)
    ], ListNode.prototype, "children", void 0);
    tslib_1.__decorate([
        JsonProperty('level', Number, true),
        tslib_1.__metadata("design:type", Number)
    ], ListNode.prototype, "level", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0Q7SUFEQTtRQUdXLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFHdkIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUd6QixVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRzFCLGFBQVEsR0FBZSxTQUFTLENBQUM7UUFHakMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUcxQixhQUFRLEdBQVcsU0FBUyxDQUFDO0lBQ3hDLENBQUM7aUJBbEJZLFFBQVE7O0lBRWpCO1FBREMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDOzt3Q0FDSjtJQUc5QjtRQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7MENBQ0g7SUFHaEM7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzJDQUNIO0lBR2pDO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQzs7OENBQ0g7SUFHeEM7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzJDQUNIO0lBR2pDO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs4Q0FDSDtJQWpCM0IsUUFBUTtRQURwQixVQUFVLENBQUMsVUFBVSxDQUFDO09BQ1YsUUFBUSxDQWtCcEI7SUFBRCxlQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FsQlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZScpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGUge1xuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVsJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCB0cnVlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xldmVsJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBsZXZlbDogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncG9zaXRpb24nLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIHBvc2l0aW9uOiBudW1iZXIgPSB1bmRlZmluZWQ7XG59XG4iXX0=