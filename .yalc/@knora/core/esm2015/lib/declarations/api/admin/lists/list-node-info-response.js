import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { ListNode } from './list-node';
/**
 * @deprecated You should use ListNodeResponse instead
 */
let ListNodeInfoResponse = class ListNodeInfoResponse {
    /**
     * @deprecated You should use ListNodeResponse instead
     */
    constructor() {
        this.nodeinfo = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('nodeinfo', ListNode, false),
    tslib_1.__metadata("design:type", ListNode)
], ListNodeInfoResponse.prototype, "nodeinfo", void 0);
ListNodeInfoResponse = tslib_1.__decorate([
    JsonObject('ListNodeInfoResponse')
], ListNodeInfoResponse);
export { ListNodeInfoResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLWluZm8tcmVzcG9uc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkM7O0dBRUc7QUFFSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUpqQzs7T0FFRztJQUNIO1FBSVcsYUFBUSxHQUFhLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0NBQUEsQ0FBQTtBQURHO0lBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO3NDQUN6QixRQUFRO3NEQUFhO0FBSDdCLG9CQUFvQjtJQURoQyxVQUFVLENBQUMsc0JBQXNCLENBQUM7R0FDdEIsb0JBQW9CLENBSWhDO1NBSlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IExpc3ROb2RlIH0gZnJvbSAnLi9saXN0LW5vZGUnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgdXNlIExpc3ROb2RlUmVzcG9uc2UgaW5zdGVhZFxuICovXG5ASnNvbk9iamVjdCgnTGlzdE5vZGVJbmZvUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mb1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ25vZGVpbmZvJywgTGlzdE5vZGUsIGZhbHNlKVxuICAgIHB1YmxpYyBub2RlaW5mbzogTGlzdE5vZGUgPSB1bmRlZmluZWQ7XG59XG5cblxuIl19