import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { ListNode } from './list-node';
var ListsResponse = /** @class */ (function () {
    function ListsResponse() {
        this.lists = undefined;
    }
    tslib_1.__decorate([
        JsonProperty('lists', [ListNode], false),
        tslib_1.__metadata("design:type", Array)
    ], ListsResponse.prototype, "lists", void 0);
    ListsResponse = tslib_1.__decorate([
        JsonObject('ListsResponse')
    ], ListsResponse);
    return ListsResponse;
}());
export { ListsResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdHMtcmVzcG9uc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3RzLXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHdkM7SUFEQTtRQUlXLFVBQUssR0FBZSxTQUFTLENBQUM7SUFDekMsQ0FBQztJQURHO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQzs7Z0RBQ0o7SUFINUIsYUFBYTtRQUR6QixVQUFVLENBQUMsZUFBZSxDQUFDO09BQ2YsYUFBYSxDQUl6QjtJQUFELG9CQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0Tm9kZSB9IGZyb20gJy4vbGlzdC1ub2RlJztcblxuQEpzb25PYmplY3QoJ0xpc3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdHMnLCBbTGlzdE5vZGVdLCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdHM6IExpc3ROb2RlW10gPSB1bmRlZmluZWQ7XG59XG5cblxuIl19