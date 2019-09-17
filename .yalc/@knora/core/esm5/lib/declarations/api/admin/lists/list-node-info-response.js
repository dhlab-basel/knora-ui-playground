import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { ListNode } from './list-node';
/**
 * @deprecated You should use ListNodeResponse instead
 */
var ListNodeInfoResponse = /** @class */ (function () {
    function ListNodeInfoResponse() {
        this.nodeinfo = undefined;
    }
    tslib_1.__decorate([
        JsonProperty('nodeinfo', ListNode, false),
        tslib_1.__metadata("design:type", ListNode)
    ], ListNodeInfoResponse.prototype, "nodeinfo", void 0);
    ListNodeInfoResponse = tslib_1.__decorate([
        JsonObject('ListNodeInfoResponse')
    ], ListNodeInfoResponse);
    return ListNodeInfoResponse;
}());
export { ListNodeInfoResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLWluZm8tcmVzcG9uc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkM7O0dBRUc7QUFFSDtJQURBO1FBSVcsYUFBUSxHQUFhLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0lBREc7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7MENBQ3pCLFFBQVE7MERBQWE7SUFIN0Isb0JBQW9CO1FBRGhDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztPQUN0QixvQkFBb0IsQ0FJaEM7SUFBRCwyQkFBQztDQUFBLEFBSkQsSUFJQztTQUpZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZSB9IGZyb20gJy4vbGlzdC1ub2RlJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHVzZSBMaXN0Tm9kZVJlc3BvbnNlIGluc3RlYWRcbiAqL1xuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mb1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0Tm9kZUluZm9SZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdub2RlaW5mbycsIExpc3ROb2RlLCBmYWxzZSlcbiAgICBwdWJsaWMgbm9kZWluZm86IExpc3ROb2RlID0gdW5kZWZpbmVkO1xufVxuXG5cbiJdfQ==