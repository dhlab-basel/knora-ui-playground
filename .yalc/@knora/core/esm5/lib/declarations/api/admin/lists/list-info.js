import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
var ListInfo = /** @class */ (function () {
    function ListInfo() {
        this.id = undefined;
        this.name = undefined;
        this.projectIri = undefined;
        this.isRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
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
    return ListInfo;
}());
export { ListInfo };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pbmZvLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3JEO0lBREE7UUFJVyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBR3ZCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFHekIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUcvQixlQUFVLEdBQVksU0FBUyxDQUFDO1FBR2hDLFdBQU0sR0FBb0IsU0FBUyxDQUFDO1FBR3BDLGFBQVEsR0FBb0IsU0FBUyxDQUFDO0lBQ2pELENBQUM7SUFoQkc7UUFEQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7O3dDQUNKO0lBRzlCO1FBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzswQ0FDSDtJQUdoQztRQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7Z0RBQ0g7SUFHdEM7UUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7O2dEQUNIO0lBR3ZDO1FBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQzs7NENBQ0g7SUFHM0M7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDOzs4Q0FDSDtJQWxCcEMsUUFBUTtRQURwQixVQUFVLENBQUMsVUFBVSxDQUFDO09BQ1YsUUFBUSxDQW1CcEI7SUFBRCxlQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lzUm9vdE5vZGUnLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBpc1Jvb3ROb2RlOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdLCB0cnVlKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIl19