import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { Group } from './group';
let GroupResponse = class GroupResponse {
    constructor() {
        this.group = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('group', Group),
    tslib_1.__metadata("design:type", Group)
], GroupResponse.prototype, "group", void 0);
GroupResponse = tslib_1.__decorate([
    JsonObject('GroupResponse')
], GroupResponse);
export { GroupResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtcmVzcG9uc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cC1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2hDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFEMUI7UUFJVyxVQUFLLEdBQVUsU0FBUyxDQUFDO0lBRXBDLENBQUM7Q0FBQSxDQUFBO0FBRkc7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztzQ0FDZixLQUFLOzRDQUFhO0FBSHZCLGFBQWE7SUFEekIsVUFBVSxDQUFDLGVBQWUsQ0FBQztHQUNmLGFBQWEsQ0FLekI7U0FMWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9ncm91cCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBHcm91cFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwJywgR3JvdXApXG4gICAgcHVibGljIGdyb3VwOiBHcm91cCA9IHVuZGVmaW5lZDtcblxufVxuIl19