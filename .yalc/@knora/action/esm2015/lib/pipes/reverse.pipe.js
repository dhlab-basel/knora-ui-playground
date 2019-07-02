import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let ReversePipe = class ReversePipe {
    /**
     * TODO: add description
     */
    transform(value) {
        if (value) {
            return value.slice().reverse();
        }
    }
};
ReversePipe = tslib_1.__decorate([
    Pipe({
        name: 'kuiReverse'
    })
], ReversePipe);
export { ReversePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2ZXJzZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9yZXZlcnNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFcEI7O09BRUc7SUFFSCxTQUFTLENBQUMsS0FBVTtRQUNoQixJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztDQUVKLENBQUE7QUFaWSxXQUFXO0lBSHZCLElBQUksQ0FBQztRQUNGLElBQUksRUFBRSxZQUFZO0tBQ3JCLENBQUM7R0FDVyxXQUFXLENBWXZCO1NBWlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdrdWlSZXZlcnNlJ1xufSlcbmV4cG9ydCBjbGFzcyBSZXZlcnNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgLyoqXG4gICAgICogVE9ETzogYWRkIGRlc2NyaXB0aW9uXG4gICAgICovXG5cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSk6IGFueSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=