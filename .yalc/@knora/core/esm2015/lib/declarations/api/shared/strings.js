import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
let StringLiteral = class StringLiteral {
    constructor() {
        this.value = undefined;
        this.language = '';
    }
};
tslib_1.__decorate([
    JsonProperty('value', String, false),
    tslib_1.__metadata("design:type", String)
], StringLiteral.prototype, "value", void 0);
tslib_1.__decorate([
    JsonProperty('language', String, true),
    tslib_1.__metadata("design:type", String)
], StringLiteral.prototype, "language", void 0);
StringLiteral = tslib_1.__decorate([
    JsonObject('StringLiteral')
], StringLiteral);
export { StringLiteral };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0QsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUQxQjtRQUlXLFVBQUssR0FBVyxTQUFTLENBQUM7UUFHMUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQUEsQ0FBQTtBQUpHO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDOzs0Q0FDSjtBQUdqQztJQURDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7K0NBQ1Y7QUFOcEIsYUFBYTtJQUR6QixVQUFVLENBQUMsZUFBZSxDQUFDO0dBQ2YsYUFBYSxDQU96QjtTQVBZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnU3RyaW5nTGl0ZXJhbCcpXG5leHBvcnQgY2xhc3MgU3RyaW5nTGl0ZXJhbCB7XG5cbiAgICBASnNvblByb3BlcnR5KCd2YWx1ZScsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5ndWFnZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xufVxuIl19