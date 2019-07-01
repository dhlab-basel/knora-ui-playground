import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4taW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hZG1pbi1pbWFnZS9hZG1pbi1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHeEQ7Ozs7O0dBS0c7QUFDSDtJQW9DSTs7T0FFRztJQUNILDZCQUFxQixTQUFvQixFQUM3QixJQUFnQjtRQURQLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDN0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVY1Qjs7V0FFRztRQUNILFlBQU8sR0FBVyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7SUFRbkQsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUNBQVcsR0FBWDtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV6QixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFFZixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBRTVDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLGlDQUFpQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQWEsQ0FBQztpQkFDN0Y7Z0JBRUQsTUFBTTtZQUVWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztnQkFFL0MsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFFakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7aUJBQ2pEO2dCQUVELE1BQU07WUFFVjtnQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDaEM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUV6RyxDQUFDOztnQkFoRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzlCOzs7O2dCQWRpRCxTQUFTO2dCQUF2QyxVQUFVOzs7d0JBd0J6QixLQUFLO3VCQVNMLEtBQUs7O0lBNkRWLDBCQUFDO0NBQUEsQUFsRkQsSUFrRkM7U0EvRVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1L2Rpc3QvbWQ1JztcbmltcG9ydCB7IEFkbWluSW1hZ2VDb25maWcgfSBmcm9tICcuL2FkbWluLWltYWdlLmNvbmZpZyc7XG5cblxuLyoqXG4gKiBZb3UgY2FuIHVzZSB0aGUgYWRtaW4gaW1hZ2UgbW9kdWxlIGZvciB1c2VyIGF2YXRhciB0b2dldGhlciB3aXRoIGdyYXZhdGFyLmNvbSBhbmQgZm9yIHByb2plY3QgbG9nb3MuXG4gKlxuICogVGhlIGZlYXR1cmUgb2YgdGhpcyBtb2R1bGUgaXN0IHRoZSBlcnJvciBoYW5kbGluZzogSW4gY2FzZSBvZiBhIDQwNCBlcnJvciBvZiB0aGUgaW1hZ2Ugc291cmNlIChpbWcgc3JjKSB0aGUgbW9kdWxlIHNob3dzIGEgZGVmYXVsdCBpbWFnZS1ub3QtZm91bmQgaW1hZ2UuIE9yIGEgZGVmYXVsdCB1c2VyIHByb2ZpbGUgaWNvbiAodHlwZT11c2VyKSwgb3IgYSBkZWZhdWx0IHByb2plY3QgaWNvbiAodHlwZT1wcm9qZWN0KS5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2t1aUFkbWluSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZG1pbkltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVxuICAgICAqXG4gICAgICogc291cmNlIG9mIHRoZSBpbWFnZTtcbiAgICAgKiAtIGluIGNhc2Ugb2YgdXNlciAoZ3IpYXZhdGFyIGl0J3MgdGhlIGUtbWFpbCBhZGRyZXNzLFxuICAgICAqIC0gaW4gY2FzZSBvZiBwcm9qZWN0IGxvZ28gaXQncyB0aGUgaW1hZ2UgdXJsXG4gICAgICovXG4gICAgQElucHV0KCkgaW1hZ2U6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICpcbiAgICAgKiB0eXBlIG9mIGltYWdlOyB5b3UgY2FuIHVzZSBpdCB3aXRoXG4gICAgICogLSBwcm9qZWN0XG4gICAgICogLSB1c2VyXG4gICAgICovXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgc291cmNlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBvbkVycm9yOiBzdHJpbmcgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHROb3RGb3VuZDtcblxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIF9lbGU6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoKSB7XG5cbiAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmltYWdlO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG5cbiAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvciA9IEFkbWluSW1hZ2VDb25maWcuZGVmYXVsdFVzZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gbnVsbCB8fCB0aGlzLmltYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHRVc2VyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gJ2h0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8nICsgTWQ1Lmhhc2hTdHIodGhpcy5pbWFnZSkgKyAnP2Q9bXAmcz0yNTYnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdwcm9qZWN0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHRQcm9qZWN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2UgPT09IG51bGwgfHwgdGhpcy5pbWFnZSA9PT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBBZG1pbkltYWdlQ29uZmlnLmRlZmF1bHRQcm9qZWN0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGUubmF0aXZlRWxlbWVudCwgJ3NyYycsIHRoaXMuc291cmNlKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZS5uYXRpdmVFbGVtZW50LCAnb25FcnJvcicsICd0aGlzLnNyYz1cXCcnICsgdGhpcy5vbkVycm9yICsgJ1xcJycpO1xuXG4gICAgfVxuXG59XG4iXX0=