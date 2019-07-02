import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ReversePipe = /** @class */ (function () {
    function ReversePipe() {
    }
    /**
     * TODO: add description
     */
    ReversePipe.prototype.transform = function (value) {
        if (value) {
            return value.slice().reverse();
        }
    };
    ReversePipe = tslib_1.__decorate([
        Pipe({
            name: 'kuiReverse'
        })
    ], ReversePipe);
    return ReversePipe;
}());
export { ReversePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2ZXJzZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9yZXZlcnNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BEO0lBQUE7SUFZQSxDQUFDO0lBVkc7O09BRUc7SUFFSCwrQkFBUyxHQUFULFVBQVUsS0FBVTtRQUNoQixJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQVZRLFdBQVc7UUFIdkIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQztPQUNXLFdBQVcsQ0FZdkI7SUFBRCxrQkFBQztDQUFBLEFBWkQsSUFZQztTQVpZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAna3VpUmV2ZXJzZSdcbn0pXG5leHBvcnQgY2xhc3MgUmV2ZXJzZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIC8qKlxuICAgICAqIFRPRE86IGFkZCBkZXNjcmlwdGlvblxuICAgICAqL1xuXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgpLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19