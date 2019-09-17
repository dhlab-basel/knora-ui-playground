import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Md5 } from 'ts-md5';
import { AdminImageConfig } from './admin-image.config';
/**
 * You can use the admin image module for user avatar together with gravatar.com and for project logos.
 *
 * The feature of this module ist the error handling: In case of a 404 error of the image source (img src) the module shows a default image-not-found image. Or a default user profile icon (type=user), or a default project icon (type=project).
 *
 */
let AdminImageDirective = class AdminImageDirective {
    /**
     * @ignore
     */
    constructor(_renderer, _ele) {
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
    ngOnChanges() {
        this.source = this.image;
        switch (this.type) {
            case 'user':
                this.onError = AdminImageConfig.defaultUser;
                if (this.image === null || this.image === undefined) {
                    this.source = AdminImageConfig.defaultUser;
                }
                else {
                    this.source = location.protocol + '//www.gravatar.com/avatar/' + Md5.hashStr(this.image) + '?d=mp&s=256';
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
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AdminImageDirective.prototype, "image", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AdminImageDirective.prototype, "type", void 0);
AdminImageDirective = tslib_1.__decorate([
    Directive({
        selector: '[kuiAdminImage]'
    }),
    tslib_1.__metadata("design:paramtypes", [Renderer2,
        ElementRef])
], AdminImageDirective);
export { AdminImageDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4taW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hZG1pbi1pbWFnZS9hZG1pbi1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM3QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RDs7Ozs7R0FLRztBQUlILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBaUM1Qjs7T0FFRztJQUNILFlBQXFCLFNBQW9CLEVBQzdCLElBQWdCO1FBRFAsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUM3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBVjVCOztXQUVHO1FBQ0gsWUFBTyxHQUFXLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztJQVFuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBRVAsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXpCLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUVmLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFFNUMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7aUJBQzlDO3FCQUFNO29CQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsR0FBRyw0QkFBNEIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLENBQUM7aUJBQzVHO2dCQUVELE1BQU07WUFFVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7Z0JBRS9DLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBRWpELElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO2lCQUNqRDtnQkFFRCxNQUFNO1lBRVY7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2hDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFFekcsQ0FBQztDQUVKLENBQUE7QUF0RVk7SUFBUixLQUFLLEVBQUU7O2tEQUFlO0FBU2Q7SUFBUixLQUFLLEVBQUU7O2lEQUFjO0FBbEJiLG1CQUFtQjtJQUgvQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO0tBQzlCLENBQUM7NkNBcUNrQyxTQUFTO1FBQ3ZCLFVBQVU7R0FyQ25CLG1CQUFtQixDQStFL0I7U0EvRVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcbmltcG9ydCB7IEFkbWluSW1hZ2VDb25maWcgfSBmcm9tICcuL2FkbWluLWltYWdlLmNvbmZpZyc7XG5cblxuLyoqXG4gKiBZb3UgY2FuIHVzZSB0aGUgYWRtaW4gaW1hZ2UgbW9kdWxlIGZvciB1c2VyIGF2YXRhciB0b2dldGhlciB3aXRoIGdyYXZhdGFyLmNvbSBhbmQgZm9yIHByb2plY3QgbG9nb3MuXG4gKlxuICogVGhlIGZlYXR1cmUgb2YgdGhpcyBtb2R1bGUgaXN0IHRoZSBlcnJvciBoYW5kbGluZzogSW4gY2FzZSBvZiBhIDQwNCBlcnJvciBvZiB0aGUgaW1hZ2Ugc291cmNlIChpbWcgc3JjKSB0aGUgbW9kdWxlIHNob3dzIGEgZGVmYXVsdCBpbWFnZS1ub3QtZm91bmQgaW1hZ2UuIE9yIGEgZGVmYXVsdCB1c2VyIHByb2ZpbGUgaWNvbiAodHlwZT11c2VyKSwgb3IgYSBkZWZhdWx0IHByb2plY3QgaWNvbiAodHlwZT1wcm9qZWN0KS5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2t1aUFkbWluSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZG1pbkltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVxuICAgICAqXG4gICAgICogc291cmNlIG9mIHRoZSBpbWFnZTtcbiAgICAgKiAtIGluIGNhc2Ugb2YgdXNlciAoZ3IpYXZhdGFyIGl0J3MgdGhlIGUtbWFpbCBhZGRyZXNzLFxuICAgICAqIC0gaW4gY2FzZSBvZiBwcm9qZWN0IGxvZ28gaXQncyB0aGUgaW1hZ2UgdXJsXG4gICAgICovXG4gICAgQElucHV0KCkgaW1hZ2U6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICpcbiAgICAgKiB0eXBlIG9mIGltYWdlOyB5b3UgY2FuIHVzZSBpdCB3aXRoXG4gICAgICogLSBwcm9qZWN0XG4gICAgICogLSB1c2VyXG4gICAgICovXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgc291cmNlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBvbkVycm9yOiBzdHJpbmcgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHROb3RGb3VuZDtcblxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIF9lbGU6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoKSB7XG5cbiAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmltYWdlO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvciA9IEFkbWluSW1hZ2VDb25maWcuZGVmYXVsdFVzZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gbnVsbCB8fCB0aGlzLmltYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHRVc2VyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8nICsgTWQ1Lmhhc2hTdHIodGhpcy5pbWFnZSkgKyAnP2Q9bXAmcz0yNTYnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdwcm9qZWN0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHRQcm9qZWN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IG51bGwgfHwgdGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHRQcm9qZWN0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGUubmF0aXZlRWxlbWVudCwgJ3NyYycsIHRoaXMuc291cmNlKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZS5uYXRpdmVFbGVtZW50LCAnb25FcnJvcicsICd0aGlzLnNyYz1cXCcnICsgdGhpcy5vbkVycm9yICsgJ1xcJycpO1xuXG4gICAgfVxuXG59XG4iXX0=