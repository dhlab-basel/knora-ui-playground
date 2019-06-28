import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
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
    ListDisplayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'list-display',
                    template: "<mat-menu #childMenu=\"matMenu\" [overlapTrigger]=\"false\">\n    <span *ngFor=\"let child of children\">\n        <span *ngIf=\"child.children && child.children.length > 0\">\n            <button mat-menu-item [matMenuTriggerFor]=\"menu.childMenu\" (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n            <list-display #menu [children]=\"child.children\" (selectedNode)=\"setValue($event)\"></list-display>\n        </span>\n\n        <span *ngIf=\"!child.children || child.children.length === 0\">\n            <button mat-menu-item (click)=\"setValue(child)\" type=\"button\">\n                {{child.label}}\n            </button>\n        </span>\n    </span>\n</mat-menu>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ListDisplayComponent.ctorParameters = function () { return []; };
    ListDisplayComponent.propDecorators = {
        children: [{ type: Input }],
        selectedNode: [{ type: Output }],
        childMenu: [{ type: ViewChild, args: ['childMenu',] }]
    };
    return ListDisplayComponent;
}());
export { ListDisplayComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1kaXNwbGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9zZWFyY2gvIiwic291cmNlcyI6WyJsaWIvZXh0ZW5kZWQtc2VhcmNoL3NlbGVjdC1wcm9wZXJ0eS9zcGVjaWZ5LXByb3BlcnR5LXZhbHVlL2xpc3QtdmFsdWUvbGlzdC1kaXNwbGF5L2xpc3QtZGlzcGxheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5EO0lBYUk7UUFKVSxpQkFBWSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO0lBS2xGLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQ0ksNkJBQTZCO0lBQ2pDLENBQUM7SUFFRCx1Q0FBUSxHQUFSLFVBQVMsSUFBZ0I7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0JBdEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsOHVCQUE0Qzs7aUJBRS9DOzs7OzsyQkFHSSxLQUFLOytCQUVMLE1BQU07NEJBRU4sU0FBUyxTQUFDLFdBQVc7O0lBYTFCLDJCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0FuQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaXN0Tm9kZVYyIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGlzdC1kaXNwbGF5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1kaXNwbGF5LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saXN0LWRpc3BsYXkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0RGlzcGxheUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBjaGlsZHJlbjogTGlzdE5vZGVWMltdO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkTm9kZTogRXZlbnRFbWl0dGVyPExpc3ROb2RlVjI+ID0gbmV3IEV2ZW50RW1pdHRlcjxMaXN0Tm9kZVYyPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY2hpbGRNZW51JykgcHVibGljIGNoaWxkTWVudTogTWF0TWVudVRyaWdnZXI7XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY2hpbGRyZW4pXG4gICAgfVxuXG4gICAgc2V0VmFsdWUoaXRlbTogTGlzdE5vZGVWMikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5lbWl0KGl0ZW0pO1xuICAgIH1cblxufVxuIl19