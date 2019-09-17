import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { User } from './user';
let UserResponse = class UserResponse {
    constructor() {
        this.user = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('user', User),
    tslib_1.__metadata("design:type", User)
], UserResponse.prototype, "user", void 0);
UserResponse = tslib_1.__decorate([
    JsonObject('UserResponse')
], UserResponse);
export { UserResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vdXNlcnMvdXNlci1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRzlCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFEekI7UUFJVyxTQUFJLEdBQVMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7Q0FBQSxDQUFBO0FBREc7SUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztzQ0FDZCxJQUFJOzBDQUFhO0FBSHJCLFlBQVk7SUFEeEIsVUFBVSxDQUFDLGNBQWMsQ0FBQztHQUNkLFlBQVksQ0FJeEI7U0FKWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xuXG5ASnNvbk9iamVjdCgnVXNlclJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBVc2VyUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcicsIFVzZXIpXG4gICAgcHVibGljIHVzZXI6IFVzZXIgPSB1bmRlZmluZWQ7XG59XG4iXX0=