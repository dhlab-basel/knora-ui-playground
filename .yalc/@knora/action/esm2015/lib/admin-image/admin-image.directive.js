import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Md5 } from 'ts-md5';
import { AdminImageConfig } from './admin-image.config';
/**
 * You can use the admin image module for user avatar together with gravatar.com and for project logos.
 *
 * The feature of this module ist the error handling: In case of a 404 error of the image source (img src) the module shows a default image-not-found image. Or a default user profile icon (type=user), or a default project icon (type=project).
 *
 */
export class AdminImageDirective {
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
    }
}
AdminImageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kuiAdminImage]'
            },] }
];
/** @nocollapse */
AdminImageDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
AdminImageDirective.propDecorators = {
    image: [{ type: Input }],
    type: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4taW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9hZG1pbi1pbWFnZS9hZG1pbi1pbWFnZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3hEOzs7OztHQUtHO0FBSUgsTUFBTSxPQUFPLG1CQUFtQjtJQWlDNUI7O09BRUc7SUFDSCxZQUFxQixTQUFvQixFQUM3QixJQUFnQjtRQURQLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDN0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVY1Qjs7V0FFRztRQUNILFlBQU8sR0FBVyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7SUFRbkQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUVQLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV6QixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFFZixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7Z0JBRTVDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLGlDQUFpQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQWEsQ0FBQztpQkFDN0Y7Z0JBRUQsTUFBTTtZQUVWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztnQkFFL0MsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFFakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7aUJBQ2pEO2dCQUVELE1BQU07WUFFVjtnQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDaEM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUV6RyxDQUFDOzs7WUFoRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7YUFDOUI7Ozs7WUFkaUQsU0FBUztZQUF2QyxVQUFVOzs7b0JBd0J6QixLQUFLO21CQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNZDUgfSBmcm9tICd0cy1tZDUnO1xuaW1wb3J0IHsgQWRtaW5JbWFnZUNvbmZpZyB9IGZyb20gJy4vYWRtaW4taW1hZ2UuY29uZmlnJztcblxuXG4vKipcbiAqIFlvdSBjYW4gdXNlIHRoZSBhZG1pbiBpbWFnZSBtb2R1bGUgZm9yIHVzZXIgYXZhdGFyIHRvZ2V0aGVyIHdpdGggZ3JhdmF0YXIuY29tIGFuZCBmb3IgcHJvamVjdCBsb2dvcy5cbiAqXG4gKiBUaGUgZmVhdHVyZSBvZiB0aGlzIG1vZHVsZSBpc3QgdGhlIGVycm9yIGhhbmRsaW5nOiBJbiBjYXNlIG9mIGEgNDA0IGVycm9yIG9mIHRoZSBpbWFnZSBzb3VyY2UgKGltZyBzcmMpIHRoZSBtb2R1bGUgc2hvd3MgYSBkZWZhdWx0IGltYWdlLW5vdC1mb3VuZCBpbWFnZS4gT3IgYSBkZWZhdWx0IHVzZXIgcHJvZmlsZSBpY29uICh0eXBlPXVzZXIpLCBvciBhIGRlZmF1bHQgcHJvamVjdCBpY29uICh0eXBlPXByb2plY3QpLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdba3VpQWRtaW5JbWFnZV0nXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluSW1hZ2VEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlXG4gICAgICpcbiAgICAgKiBzb3VyY2Ugb2YgdGhlIGltYWdlO1xuICAgICAqIC0gaW4gY2FzZSBvZiB1c2VyIChncilhdmF0YXIgaXQncyB0aGUgZS1tYWlsIGFkZHJlc3MsXG4gICAgICogLSBpbiBjYXNlIG9mIHByb2plY3QgbG9nbyBpdCdzIHRoZSBpbWFnZSB1cmxcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbWFnZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKlxuICAgICAqIHR5cGUgb2YgaW1hZ2U7IHlvdSBjYW4gdXNlIGl0IHdpdGhcbiAgICAgKiAtIHByb2plY3RcbiAgICAgKiAtIHVzZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBzb3VyY2U6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIG9uRXJyb3I6IHN0cmluZyA9IEFkbWluSW1hZ2VDb25maWcuZGVmYXVsdE5vdEZvdW5kO1xuXG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgX2VsZTogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcygpIHtcblxuICAgICAgICB0aGlzLnNvdXJjZSA9IHRoaXMuaW1hZ2U7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcblxuICAgICAgICAgICAgY2FzZSAndXNlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yID0gQWRtaW5JbWFnZUNvbmZpZy5kZWZhdWx0VXNlcjtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmltYWdlID09PSBudWxsIHx8IHRoaXMuaW1hZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZSA9IEFkbWluSW1hZ2VDb25maWcuZGVmYXVsdFVzZXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSAnaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLycgKyBNZDUuaGFzaFN0cih0aGlzLmltYWdlKSArICc/ZD1tcCZzPTI1Nic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Byb2plY3QnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvciA9IEFkbWluSW1hZ2VDb25maWcuZGVmYXVsdFByb2plY3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbWFnZSA9PT0gbnVsbCB8fCB0aGlzLmltYWdlID09PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZSA9IEFkbWluSW1hZ2VDb25maWcuZGVmYXVsdFByb2plY3Q7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmltYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZS5uYXRpdmVFbGVtZW50LCAnc3JjJywgdGhpcy5zb3VyY2UpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlLm5hdGl2ZUVsZW1lbnQsICdvbkVycm9yJywgJ3RoaXMuc3JjPVxcJycgKyB0aGlzLm9uRXJyb3IgKyAnXFwnJyk7XG5cbiAgICB9XG5cbn1cbiJdfQ==