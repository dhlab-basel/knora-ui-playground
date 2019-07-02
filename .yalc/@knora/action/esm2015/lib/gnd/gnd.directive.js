import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { KnoraConstants } from '@knora/core';
/**
 * This directive renders a GND/IAF or a VIAF identifier as a link to the respective resolver.
 */
let GndDirective = class GndDirective {
    constructor(el) {
        this.el = el;
    }
    set kuiGnd(value) {
        this._gnd = value;
    }
    get kuiGnd() {
        return this._gnd;
    }
    ngOnChanges() {
        if (this._gnd.length < 30) {
            if (this._gnd.indexOf(KnoraConstants.GNDPrefix) === 0) {
                // GND/IAF identifier
                this.el.nativeElement.innerHTML = `<a href="${KnoraConstants.GNDResolver + this._gnd.replace(KnoraConstants.GNDPrefix, '')}" target="_blank">${this._gnd}</a>`;
            }
            else if (this._gnd.indexOf(KnoraConstants.VIAFPrefix) === 0) {
                // VIAF identifier
                this.el.nativeElement.innerHTML = `<a href="${KnoraConstants.VIAFResolver + this._gnd.replace(KnoraConstants.VIAFPrefix, '')}" target="_blank">${this._gnd}</a>`;
            }
            else {
                // no identifier, leave unchanged
                this.el.nativeElement.innerHTML = this._gnd;
            }
        }
        else {
            // no identifier, leave unchanged
            this.el.nativeElement.innerHTML = this._gnd;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], GndDirective.prototype, "kuiGnd", null);
GndDirective = tslib_1.__decorate([
    Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[kuiGnd]'
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], GndDirective);
export { GndDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ25kLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvZ25kL2duZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU3Qzs7R0FFRztBQUtILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFlckIsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFFbEMsQ0FBQztJQWRELElBQUksTUFBTSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBVUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO1lBRXZCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbkQscUJBQXFCO2dCQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsWUFBWSxjQUFjLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLHFCQUFxQixJQUFJLENBQUMsSUFBSSxNQUFNLENBQUM7YUFDbEs7aUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzRCxrQkFBa0I7Z0JBQ2xCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxZQUFZLGNBQWMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMscUJBQXFCLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQzthQUNwSztpQkFBTTtnQkFDSCxpQ0FBaUM7Z0JBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQy9DO1NBRUo7YUFBTTtZQUNILGlDQUFpQztZQUNqQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMvQztJQUVMLENBQUM7Q0FHSixDQUFBO0FBdENHO0lBREMsS0FBSyxFQUFFOzs7MENBR1A7QUFMUSxZQUFZO0lBSnhCLFNBQVMsQ0FBQztRQUNQLDhDQUE4QztRQUM5QyxRQUFRLEVBQUUsVUFBVTtLQUN2QixDQUFDOzZDQWdCMEIsVUFBVTtHQWZ6QixZQUFZLENBeUN4QjtTQXpDWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSByZW5kZXJzIGEgR05EL0lBRiBvciBhIFZJQUYgaWRlbnRpZmllciBhcyBhIGxpbmsgdG8gdGhlIHJlc3BlY3RpdmUgcmVzb2x2ZXIuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1trdWlHbmRdJ1xufSlcbmV4cG9ydCBjbGFzcyBHbmREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KClcbiAgICBzZXQga3VpR25kKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZ25kID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGt1aUduZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2duZDtcbiAgICB9XG5cblxuICAgIC8vIHRoZSBHTkQgaWRlbnRpZmllciB0byBiZSByZW5kZXJlZFxuICAgIHByaXZhdGUgX2duZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuXG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9nbmQubGVuZ3RoIDwgMzApIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2duZC5pbmRleE9mKEtub3JhQ29uc3RhbnRzLkdORFByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBHTkQvSUFGIGlkZW50aWZpZXJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIke0tub3JhQ29uc3RhbnRzLkdORFJlc29sdmVyICsgdGhpcy5fZ25kLnJlcGxhY2UoS25vcmFDb25zdGFudHMuR05EUHJlZml4LCAnJyl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHt0aGlzLl9nbmR9PC9hPmA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2duZC5pbmRleE9mKEtub3JhQ29uc3RhbnRzLlZJQUZQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gVklBRiBpZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IGA8YSBocmVmPVwiJHtLbm9yYUNvbnN0YW50cy5WSUFGUmVzb2x2ZXIgKyB0aGlzLl9nbmQucmVwbGFjZShLbm9yYUNvbnN0YW50cy5WSUFGUHJlZml4LCAnJyl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHt0aGlzLl9nbmR9PC9hPmA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vIGlkZW50aWZpZXIsIGxlYXZlIHVuY2hhbmdlZFxuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9nbmQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG5vIGlkZW50aWZpZXIsIGxlYXZlIHVuY2hhbmdlZFxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX2duZDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbn1cbiJdfQ==