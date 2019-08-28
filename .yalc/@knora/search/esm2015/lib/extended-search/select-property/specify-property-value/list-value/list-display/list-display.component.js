import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
let ListDisplayComponent = class ListDisplayComponent {
    constructor() {
        this.selectedNode = new EventEmitter();
    }
    ngOnInit() {
        // console.log(this.children)
    }
    setValue(item) {
        this.selectedNode.emit(item);
    }
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
    ViewChild('childMenu', { static: true }),
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
export { ListDisplayComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1kaXNwbGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2xpc3QtdmFsdWUvbGlzdC1kaXNwbGF5L2xpc3QtZGlzcGxheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU94RCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQVE3QjtRQUpVLGlCQUFZLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7SUFLbEYsQ0FBQztJQUVELFFBQVE7UUFDSiw2QkFBNkI7SUFDakMsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFnQjtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBRUosQ0FBQTtBQWpCWTtJQUFSLEtBQUssRUFBRTs7c0RBQXdCO0FBRXRCO0lBQVQsTUFBTSxFQUFFO3NDQUFlLFlBQVk7MERBQThDO0FBRXhDO0lBQXpDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7c0NBQW1CLGNBQWM7dURBQUM7QUFObEUsb0JBQW9CO0lBTGhDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLDh1QkFBNEM7O0tBRS9DLENBQUM7O0dBQ1csb0JBQW9CLENBbUJoQztTQW5CWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3ROb2RlVjIgfSBmcm9tICdAa25vcmEvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpc3QtZGlzcGxheScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtZGlzcGxheS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC1kaXNwbGF5LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlzdERpc3BsYXlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgY2hpbGRyZW46IExpc3ROb2RlVjJbXTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZE5vZGU6IEV2ZW50RW1pdHRlcjxMaXN0Tm9kZVYyPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdE5vZGVWMj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NoaWxkTWVudScsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBjaGlsZE1lbnU6IE1hdE1lbnVUcmlnZ2VyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY2hpbGRyZW4pXG4gICAgfVxuXG4gICAgc2V0VmFsdWUoaXRlbTogTGlzdE5vZGVWMikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5lbWl0KGl0ZW0pO1xuICAgIH1cblxufVxuIl19