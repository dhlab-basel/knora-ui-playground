import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Md5 } from 'ts-md5';
import { AdminImageConfig } from './admin-image.config';
/**
 * You can use the admin image module for user avatar together with gravatar.com and for project logos.
 *
 * The feature of this module ist the error handling: In case of a 404 error of the image source (img src) the module shows a default image-not-found image. Or a default user profile icon (type=user), or a default project icon (type=project).
 *
 */
var AdminImageDirective = /** @class */ (function () {
    /**
     * @ignore
     */
    function AdminImageDirective(_renderer, _ele) {
        this._renderer = _renderer;
        this._ele = _ele;
        /**
         * @ignore
         */
        this.onError = AdminImageConfig.defaultNotFound;
    }
    /**
     * @ignore
     */
    AdminImageDirective.prototype.ngOnChanges = function () {
        this.source = this.image;
        switch (this.type) {
            case 'user':
                this.onError = AdminImageConfig.defaultUser;
                if (this.image === null || this.image === undefined) {
                    this.source = AdminImageConfig.defaultUser;
                }
                else {
                    this.source = 'http://www.gravatar.com/avatar/' + Md5.hashStr(this.image) + '?d=mp&s=256';
                }
                break;
            case 'project':
                this.onError = AdminImageConfig.defaultProject;
                if (this.image === null || this.image === undefined) {
                    this.source = AdminImageConfig.defaultProject;
                }
                break;
            default:
                this.source = this.image;
        }
        this._renderer.setAttribute(this._ele.nativeElement, 'src', this.source);
        this._renderer.setAttribute(this._ele.nativeElement, 'onError', 'this.src=\'' + this.onError + '\'');
    };
    AdminImageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kuiAdminImage]'
                },] }
    ];
    /** @nocollapse */
    AdminImageDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    AdminImageDirective.propDecorators = {
        image: [{ type: Input }],
        type: [{ type: Input }]
    };
    return AdminImageDirective;
}());
export { AdminImageDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4taW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hZG1pbi1pbWFnZS9hZG1pbi1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3hEOzs7OztHQUtHO0FBQ0g7SUFvQ0k7O09BRUc7SUFDSCw2QkFBcUIsU0FBb0IsRUFDN0IsSUFBZ0I7UUFEUCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQVk7UUFWNUI7O1dBRUc7UUFDSCxZQUFPLEdBQVcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO0lBUW5ELENBQUM7SUFFRDs7T0FFRztJQUNILHlDQUFXLEdBQVg7UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFekIsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBRWYsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO2dCQUU1QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztpQkFDOUM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQ0FBaUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLENBQUM7aUJBQzdGO2dCQUVELE1BQU07WUFFVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7Z0JBRS9DLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBRWpELElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO2lCQUNqRDtnQkFFRCxNQUFNO1lBRVY7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFFekcsQ0FBQzs7Z0JBaEZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OztnQkFkaUQsU0FBUztnQkFBdkMsVUFBVTs7O3dCQXdCekIsS0FBSzt1QkFTTCxLQUFLOztJQTZEViwwQkFBQztDQUFBLEFBbEZELElBa0ZDO1NBL0VZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1kNSB9IGZyb20gJ3RzLW1kNSc7XG5pbXBvcnQgeyBBZG1pbkltYWdlQ29uZmlnIH0gZnJvbSAnLi9hZG1pbi1pbWFnZS5jb25maWcnO1xuXG5cbi8qKlxuICogWW91IGNhbiB1c2UgdGhlIGFkbWluIGltYWdlIG1vZHVsZSBmb3IgdXNlciBhdmF0YXIgdG9nZXRoZXIgd2l0aCBncmF2YXRhci5jb20gYW5kIGZvciBwcm9qZWN0IGxvZ29zLlxuICpcbiAqIFRoZSBmZWF0dXJlIG9mIHRoaXMgbW9kdWxlIGlzdCB0aGUgZXJyb3IgaGFuZGxpbmc6IEluIGNhc2Ugb2YgYSA0MDQgZXJyb3Igb2YgdGhlIGltYWdlIHNvdXJjZSAoaW1nIHNyYykgdGhlIG1vZHVsZSBzaG93cyBhIGRlZmF1bHQgaW1hZ2Utbm90LWZvdW5kIGltYWdlLiBPciBhIGRlZmF1bHQgdXNlciBwcm9maWxlIGljb24gKHR5cGU9dXNlciksIG9yIGEgZGVmYXVsdCBwcm9qZWN0IGljb24gKHR5cGU9cHJvamVjdCkuXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1trdWlBZG1pbkltYWdlXSdcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5JbWFnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VcbiAgICAgKlxuICAgICAqIHNvdXJjZSBvZiB0aGUgaW1hZ2U7XG4gICAgICogLSBpbiBjYXNlIG9mIHVzZXIgKGdyKWF2YXRhciBpdCdzIHRoZSBlLW1haWwgYWRkcmVzcyxcbiAgICAgKiAtIGluIGNhc2Ugb2YgcHJvamVjdCBsb2dvIGl0J3MgdGhlIGltYWdlIHVybFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGltYWdlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqXG4gICAgICogdHlwZSBvZiBpbWFnZTsgeW91IGNhbiB1c2UgaXQgd2l0aFxuICAgICAqIC0gcHJvamVjdFxuICAgICAqIC0gdXNlclxuICAgICAqL1xuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHNvdXJjZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgb25FcnJvcjogc3RyaW5nID0gQWRtaW5JbWFnZUNvbmZpZy5kZWZhdWx0Tm90Rm91bmQ7XG5cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfZWxlOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKCkge1xuXG4gICAgICAgIHRoaXMuc291cmNlID0gdGhpcy5pbWFnZTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuXG4gICAgICAgICAgICBjYXNlICd1c2VyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHRVc2VyO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IG51bGwgfHwgdGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gQWRtaW5JbWFnZUNvbmZpZy5kZWZhdWx0VXNlcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZSA9ICdodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvJyArIE1kNS5oYXNoU3RyKHRoaXMuaW1hZ2UpICsgJz9kPW1wJnM9MjU2JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAncHJvamVjdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yID0gQWRtaW5JbWFnZUNvbmZpZy5kZWZhdWx0UHJvamVjdDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmltYWdlID09PSBudWxsIHx8IHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gQWRtaW5JbWFnZUNvbmZpZy5kZWZhdWx0UHJvamVjdDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZSA9IHRoaXMuaW1hZ2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlLm5hdGl2ZUVsZW1lbnQsICdzcmMnLCB0aGlzLnNvdXJjZSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGUubmF0aXZlRWxlbWVudCwgJ29uRXJyb3InLCAndGhpcy5zcmM9XFwnJyArIHRoaXMub25FcnJvciArICdcXCcnKTtcblxuICAgIH1cblxufVxuIl19