import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A component with a list of properties to sort a list by one of them.
 * It can be used together with the KuiSortBy pipe.
 */
var SortButtonComponent = /** @class */ (function () {
    function SortButtonComponent() {
        /**
         * @emits {string} sortKeyChange
         *
         * EventEmitter when a user selected a sort property;
         * This is the selected key
         */
        this.sortKeyChange = new EventEmitter();
        this.menuXPos = 'after';
        /**
         * @param {string} [position='left']
         * Optional position of the sort menu: right or left
         */
        this.position = 'left';
        /**
         * @param  {string} [icon='sort']
         * Default icon is "sort" from material design.
         * But you can replace it with another one
         * e.g. sort_by_alpha
         */
        this.icon = 'sort';
    }
    /**
     * @param {string} sortKey
     * set and get (two-way data binding) of current sort key
     */
    SortButtonComponent.prototype.sortKey = function (sortKey) {
        this.activeKey = sortKey;
    };
    SortButtonComponent.prototype.ngOnInit = function () {
        if (this.position === 'right') {
            this.menuXPos = 'before';
        }
    };
    /**
     * @ignore
     *
     * @param {string} key
     */
    SortButtonComponent.prototype.sortBy = function (key) {
        this.sortKeyChange.emit(key);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], SortButtonComponent.prototype, "sortKeyChange", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], SortButtonComponent.prototype, "sortProps", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SortButtonComponent.prototype, "position", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SortButtonComponent.prototype, "icon", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SortButtonComponent.prototype, "sortKey", null);
    SortButtonComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-sort-button',
            template: "<span class=\"sort-button\" [class]=\"position + ' ' + icon\">\n    <button mat-icon-button [matMenuTriggerFor]=\"sortSelection\">\n        <mat-icon>{{icon}}</mat-icon>\n    </button>\n    <mat-menu #sortSelection=\"matMenu\" [xPosition]=\"menuXPos\">\n        <button mat-menu-item\n                *ngFor=\"let item of sortProps\"\n                (click)=\"sortBy(item.key)\"\n                [class.active]=\"activeKey === item.key\">\n            {{item.label}}\n        </button>\n    </mat-menu>\n</span>\n",
            styles: [".active{background:rgba(128,128,128,.8)}.right.sort{float:right}.right.sort .mat-icon{-webkit-transform:scale(-1,1);transform:scale(-1,1)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SortButtonComponent);
    return SortButtonComponent;
}());
export { SortButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPL0U7OztHQUdHO0FBTUg7SUE0Q0k7UUExQ0E7Ozs7O1dBS0c7UUFDTyxrQkFBYSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTNFLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFXM0I7OztXQUdHO1FBQ00sYUFBUSxHQUFZLE1BQU0sQ0FBQztRQUdwQzs7Ozs7V0FLRztRQUNNLFNBQUksR0FBWSxNQUFNLENBQUM7SUFXaEMsQ0FBQztJQVREOzs7T0FHRztJQUNNLHFDQUFPLEdBQVAsVUFBUSxPQUFlO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFLRCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUM1QjtJQUVMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0NBQU0sR0FBTixVQUFPLEdBQVc7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBckRTO1FBQVQsTUFBTSxFQUFFOzBDQUFnQixZQUFZOzhEQUFzQztJQVdsRTtRQUFSLEtBQUssRUFBRTs7MERBQXVCO0lBTXRCO1FBQVIsS0FBSyxFQUFFOzt5REFBNEI7SUFTM0I7UUFBUixLQUFLLEVBQUU7O3FEQUF3QjtJQU12QjtRQUFSLEtBQUssRUFBRTs7OztzREFFUDtJQTFDUSxtQkFBbUI7UUFML0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQiw4Z0JBQTJDOztTQUU5QyxDQUFDOztPQUNXLG1CQUFtQixDQStEL0I7SUFBRCwwQkFBQztDQUFBLEFBL0RELElBK0RDO1NBL0RZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBTb3J0UHJvcCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCB3aXRoIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIHRvIHNvcnQgYSBsaXN0IGJ5IG9uZSBvZiB0aGVtLlxuICogSXQgY2FuIGJlIHVzZWQgdG9nZXRoZXIgd2l0aCB0aGUgS3VpU29ydEJ5IHBpcGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAna3VpLXNvcnQtYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc29ydC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU29ydEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBAZW1pdHMge3N0cmluZ30gc29ydEtleUNoYW5nZVxuICAgICAqXG4gICAgICogRXZlbnRFbWl0dGVyIHdoZW4gYSB1c2VyIHNlbGVjdGVkIGEgc29ydCBwcm9wZXJ0eTtcbiAgICAgKiBUaGlzIGlzIHRoZSBzZWxlY3RlZCBrZXlcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgc29ydEtleUNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIG1lbnVYUG9zOiBzdHJpbmcgPSAnYWZ0ZXInO1xuXG4gICAgYWN0aXZlS2V5OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1NvcnRQcm9wW119IHNvcnRQcm9wc1xuICAgICAqIEFuIGFycmF5IG9mIFNvcnRQcm9wIG9iamVjdHMgZm9yIHRoZSBzZWxlY3Rpb24gbWVudTpcbiAgICAgKiBTb3J0UHJvcDogeyBrZXk6IHN0cmluZywgbGFiZWw6IHN0cmluZyB9XG4gICAgICovXG4gICAgQElucHV0KCkgc29ydFByb3BzOiBTb3J0UHJvcFtdO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwb3NpdGlvbj0nbGVmdCddXG4gICAgICogT3B0aW9uYWwgcG9zaXRpb24gb2YgdGhlIHNvcnQgbWVudTogcmlnaHQgb3IgbGVmdFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHBvc2l0aW9uPzogc3RyaW5nID0gJ2xlZnQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtpY29uPSdzb3J0J11cbiAgICAgKiBEZWZhdWx0IGljb24gaXMgXCJzb3J0XCIgZnJvbSBtYXRlcmlhbCBkZXNpZ24uXG4gICAgICogQnV0IHlvdSBjYW4gcmVwbGFjZSBpdCB3aXRoIGFub3RoZXIgb25lXG4gICAgICogZS5nLiBzb3J0X2J5X2FscGhhXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbj86IHN0cmluZyA9ICdzb3J0JztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3J0S2V5XG4gICAgICogc2V0IGFuZCBnZXQgKHR3by13YXkgZGF0YSBiaW5kaW5nKSBvZiBjdXJyZW50IHNvcnQga2V5XG4gICAgICovXG4gICAgQElucHV0KCkgc29ydEtleShzb3J0S2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVLZXkgPSBzb3J0S2V5O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMubWVudVhQb3MgPSAnYmVmb3JlJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqL1xuICAgIHNvcnRCeShrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNvcnRLZXlDaGFuZ2UuZW1pdChrZXkpO1xuICAgIH1cblxufVxuIl19