import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { List } from './list';
let ListResponse = class ListResponse {
    constructor() {
        this.list = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('list', List, false),
    tslib_1.__metadata("design:type", List)
], ListResponse.prototype, "list", void 0);
ListResponse = tslib_1.__decorate([
    JsonObject('ListResponse')
], ListResponse);
export { ListResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRzlCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFEekI7UUFJVyxTQUFJLEdBQVMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7Q0FBQSxDQUFBO0FBREc7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7c0NBQ3JCLElBQUk7MENBQWE7QUFIckIsWUFBWTtJQUR4QixVQUFVLENBQUMsY0FBYyxDQUFDO0dBQ2QsWUFBWSxDQUl4QjtTQUpZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0UmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdsaXN0JywgTGlzdCwgZmFsc2UpXG4gICAgcHVibGljIGxpc3Q6IExpc3QgPSB1bmRlZmluZWQ7XG59XG5cblxuIl19