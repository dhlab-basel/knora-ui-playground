import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { Project } from '../projects/project';
var Group = /** @class */ (function () {
    function Group() {
        this.id = undefined;
        this.name = undefined;
        this.description = undefined;
        this.project = undefined;
        this.status = undefined;
        this.selfjoin = undefined;
    }
    tslib_1.__decorate([
        JsonProperty('id', String),
        tslib_1.__metadata("design:type", String)
    ], Group.prototype, "id", void 0);
    tslib_1.__decorate([
        JsonProperty('name', String),
        tslib_1.__metadata("design:type", String)
    ], Group.prototype, "name", void 0);
    tslib_1.__decorate([
        JsonProperty('description', String),
        tslib_1.__metadata("design:type", String)
    ], Group.prototype, "description", void 0);
    tslib_1.__decorate([
        JsonProperty('project', Project, false),
        tslib_1.__metadata("design:type", Project)
    ], Group.prototype, "project", void 0);
    tslib_1.__decorate([
        JsonProperty('status', Boolean),
        tslib_1.__metadata("design:type", Boolean)
    ], Group.prototype, "status", void 0);
    tslib_1.__decorate([
        JsonProperty('selfjoin', Boolean),
        tslib_1.__metadata("design:type", Boolean)
    ], Group.prototype, "selfjoin", void 0);
    Group = tslib_1.__decorate([
        JsonObject('Group')
    ], Group);
    return Group;
}());
export { Group };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHOUM7SUFEQTtRQUlXLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFHdkIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUd6QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUdoQyxZQUFPLEdBQVksU0FBUyxDQUFDO1FBRzdCLFdBQU0sR0FBWSxTQUFTLENBQUM7UUFHNUIsYUFBUSxHQUFZLFNBQVMsQ0FBQztJQUV6QyxDQUFDO0lBakJHO1FBREMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7O3FDQUNHO0lBRzlCO1FBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7O3VDQUNHO0lBR2hDO1FBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7OzhDQUNHO0lBR3ZDO1FBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDOzBDQUN4QixPQUFPOzBDQUFhO0lBR3BDO1FBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7O3lDQUNHO0lBR25DO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7OzJDQUNHO0lBbEI1QixLQUFLO1FBRGpCLFVBQVUsQ0FBQyxPQUFPLENBQUM7T0FDUCxLQUFLLENBb0JqQjtJQUFELFlBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9wcm9qZWN0cy9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ0dyb3VwJylcbmV4cG9ydCBjbGFzcyBHcm91cCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2Rlc2NyaXB0aW9uJywgU3RyaW5nKVxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0OiBQcm9qZWN0ID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc3RhdHVzJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3RhdHVzOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2VsZmpvaW4nLCBCb29sZWFuKVxuICAgIHB1YmxpYyBzZWxmam9pbjogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxufVxuIl19