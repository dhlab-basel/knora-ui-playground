import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
export class ListDisplayComponent {
    constructor() {
        this.selectedNode = new EventEmitter();
    }
    ngOnInit() {
        // console.log(this.children)
    }
    setValue(item) {
        this.selectedNode.emit(item);
    }
}
ListDisplayComponent.decorators = [
    { type: Component, args: [{
                selector: 'list-display',
                template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n    <span *ngFor=\"let child of children\">\n        <span *ngIf=\"child.children && child.children.length > 0\">\n            <button mat-menu-item [matMenuTriggerFor]=\"menu.childMenu\" (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n            <list-display #menu [children]=\"child.children\" (selectedNode)=\"setValue($event)\"></list-display>\n        </span>\n\n        <span *ngIf=\"!child.children || child.children.length === 0\">\n            <button mat-menu-item (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n        </span>\n    </span>\n</mat-menu>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ListDisplayComponent.ctorParameters = () => [];
ListDisplayComponent.propDecorators = {
    children: [{ type: Input }],
    selectedNode: [{ type: Output }],
    childMenu: [{ type: ViewChild, args: ['childMenu',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1kaXNwbGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2xpc3QtdmFsdWUvbGlzdC1kaXNwbGF5L2xpc3QtZGlzcGxheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBT25ELE1BQU0sT0FBTyxvQkFBb0I7SUFRN0I7UUFKVSxpQkFBWSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO0lBS2xGLENBQUM7SUFFRCxRQUFRO1FBQ0osNkJBQTZCO0lBQ2pDLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBZ0I7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7O1lBdEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsOHVCQUE0Qzs7YUFFL0M7Ozs7O3VCQUdJLEtBQUs7MkJBRUwsTUFBTTt3QkFFTixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlzdE5vZGVWMiB9IGZyb20gJ0Brbm9yYS9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpc3QtZGlzcGxheScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtZGlzcGxheS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbGlzdC1kaXNwbGF5LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlzdERpc3BsYXlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgY2hpbGRyZW46IExpc3ROb2RlVjJbXTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZE5vZGU6IEV2ZW50RW1pdHRlcjxMaXN0Tm9kZVYyPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGlzdE5vZGVWMj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NoaWxkTWVudScpIHB1YmxpYyBjaGlsZE1lbnU6IE1hdE1lbnVUcmlnZ2VyO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNoaWxkcmVuKVxuICAgIH1cblxuICAgIHNldFZhbHVlKGl0ZW06IExpc3ROb2RlVjIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUuZW1pdChpdGVtKTtcbiAgICB9XG5cbn1cbiJdfQ==