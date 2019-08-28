import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { User } from './user';
let UsersResponse = class UsersResponse {
    constructor() {
        this.users = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('users', [User]),
    tslib_1.__metadata("design:type", Array)
], UsersResponse.prototype, "users", void 0);
UsersResponse = tslib_1.__decorate([
    JsonObject('UsersResponse')
], UsersResponse);
export { UsersResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMtcmVzcG9uc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHOUIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUQxQjtRQUlXLFVBQUssR0FBVyxTQUFTLENBQUM7SUFFckMsQ0FBQztDQUFBLENBQUE7QUFGRztJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7NENBQ0c7QUFIeEIsYUFBYTtJQUR6QixVQUFVLENBQUMsZUFBZSxDQUFDO0dBQ2YsYUFBYSxDQUt6QjtTQUxZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XG5cbkBKc29uT2JqZWN0KCdVc2Vyc1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2Vyc1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXJzJywgW1VzZXJdKVxuICAgIHB1YmxpYyB1c2VyczogVXNlcltdID0gdW5kZWZpbmVkO1xuXG59XG4iXX0=