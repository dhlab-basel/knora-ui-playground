import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
var ListDisplayComponent = /** @class */ (function () {
    function ListDisplayComponent() {
        this.selectedNode = new EventEmitter();
    }
    ListDisplayComponent.prototype.ngOnInit = function () {
        // console.log(this.children)
    };
    ListDisplayComponent.prototype.setValue = function (item) {
        this.selectedNode.emit(item);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ListDisplayComponent.prototype, "children", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ListDisplayComponent.prototype, "selectedNode", void 0);
    tslib_1.__decorate([
        ViewChild('childMenu', { static: false }),
        tslib_1.__metadata("design:type", MatMenuTrigger)
    ], ListDisplayComponent.prototype, "childMenu", void 0);
    ListDisplayComponent = tslib_1.__decorate([
        Component({
            selector: 'list-display',
            template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n    <span *ngFor=\"let child of children\">\n        <span *ngIf=\"child.children && child.children.length > 0\">\n            <button mat-menu-item [matMenuTriggerFor]=\"menu.childMenu\" (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n            <list-display #menu [children]=\"child.children\" (selectedNode)=\"setValue($event)\"></list-display>\n        </span>\n\n        <span *ngIf=\"!child.children || child.children.length === 0\">\n            <button mat-menu-item (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n        </span>\n    </span>\n</mat-menu>\n",
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ListDisplayComponent);
    return ListDisplayComponent;
}());
export { ListDisplayComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1kaXNwbGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2xpc3QtdmFsdWUvbGlzdC1kaXNwbGF5L2xpc3QtZGlzcGxheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU94RDtJQVFJO1FBSlUsaUJBQVksR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUtsRixDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNJLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLElBQWdCO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFmUTtRQUFSLEtBQUssRUFBRTs7MERBQXdCO0lBRXRCO1FBQVQsTUFBTSxFQUFFOzBDQUFlLFlBQVk7OERBQThDO0lBRXZDO1FBQTFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQW1CLGNBQWM7MkRBQUM7SUFObkUsb0JBQW9CO1FBTGhDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLDh1QkFBNEM7O1NBRS9DLENBQUM7O09BQ1csb0JBQW9CLENBbUJoQztJQUFELDJCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaXN0Tm9kZVYyIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsaXN0LWRpc3BsYXknLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saXN0LWRpc3BsYXkuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2xpc3QtZGlzcGxheS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpc3REaXNwbGF5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGNoaWxkcmVuOiBMaXN0Tm9kZVYyW107XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWROb2RlOiBFdmVudEVtaXR0ZXI8TGlzdE5vZGVWMj4gPSBuZXcgRXZlbnRFbWl0dGVyPExpc3ROb2RlVjI+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdjaGlsZE1lbnUnLCB7IHN0YXRpYzogZmFsc2UgfSkgcHVibGljIGNoaWxkTWVudTogTWF0TWVudVRyaWdnZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jaGlsZHJlbilcbiAgICB9XG5cbiAgICBzZXRWYWx1ZShpdGVtOiBMaXN0Tm9kZVYyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlLmVtaXQoaXRlbSk7XG4gICAgfVxuXG59XG4iXX0=