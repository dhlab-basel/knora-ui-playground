import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A component with a list of properties to sort a list by one of them.
 * It can be used together with the KuiSortBy pipe.
 */
let SortButtonComponent = class SortButtonComponent {
    constructor() {
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
    sortKey(sortKey) {
        this.activeKey = sortKey;
    }
    ngOnInit() {
        if (this.position === 'right') {
            this.menuXPos = 'before';
        }
    }
    /**
     * @ignore
     *
     * @param {string} key
     */
    sortBy(key) {
        this.sortKeyChange.emit(key);
    }
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
export { SortButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPL0U7OztHQUdHO0FBTUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUE0QzVCO1FBMUNBOzs7OztXQUtHO1FBQ08sa0JBQWEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUUzRSxhQUFRLEdBQVcsT0FBTyxDQUFDO1FBVzNCOzs7V0FHRztRQUNNLGFBQVEsR0FBWSxNQUFNLENBQUM7UUFHcEM7Ozs7O1dBS0c7UUFDTSxTQUFJLEdBQVksTUFBTSxDQUFDO0lBV2hDLENBQUM7SUFURDs7O09BR0c7SUFDTSxPQUFPLENBQUMsT0FBZTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBS0QsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDNUI7SUFFTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxHQUFXO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUVKLENBQUE7QUF2RGE7SUFBVCxNQUFNLEVBQUU7c0NBQWdCLFlBQVk7MERBQXNDO0FBV2xFO0lBQVIsS0FBSyxFQUFFOztzREFBdUI7QUFNdEI7SUFBUixLQUFLLEVBQUU7O3FEQUE0QjtBQVMzQjtJQUFSLEtBQUssRUFBRTs7aURBQXdCO0FBTXZCO0lBQVIsS0FBSyxFQUFFOzs7O2tEQUVQO0FBMUNRLG1CQUFtQjtJQUwvQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLDhnQkFBMkM7O0tBRTlDLENBQUM7O0dBQ1csbUJBQW1CLENBK0QvQjtTQS9EWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydFByb3Age1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgd2l0aCBhIGxpc3Qgb2YgcHJvcGVydGllcyB0byBzb3J0IGEgbGlzdCBieSBvbmUgb2YgdGhlbS5cbiAqIEl0IGNhbiBiZSB1c2VkIHRvZ2V0aGVyIHdpdGggdGhlIEt1aVNvcnRCeSBwaXBlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1zb3J0LWJ1dHRvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zb3J0LWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNvcnRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICogQGVtaXRzIHtzdHJpbmd9IHNvcnRLZXlDaGFuZ2VcbiAgICAgKlxuICAgICAqIEV2ZW50RW1pdHRlciB3aGVuIGEgdXNlciBzZWxlY3RlZCBhIHNvcnQgcHJvcGVydHk7XG4gICAgICogVGhpcyBpcyB0aGUgc2VsZWN0ZWQga2V5XG4gICAgICovXG4gICAgQE91dHB1dCgpIHNvcnRLZXlDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBtZW51WFBvczogc3RyaW5nID0gJ2FmdGVyJztcblxuICAgIGFjdGl2ZUtleTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTb3J0UHJvcFtdfSBzb3J0UHJvcHNcbiAgICAgKiBBbiBhcnJheSBvZiBTb3J0UHJvcCBvYmplY3RzIGZvciB0aGUgc2VsZWN0aW9uIG1lbnU6XG4gICAgICogU29ydFByb3A6IHsga2V5OiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcgfVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRQcm9wczogU29ydFByb3BbXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcG9zaXRpb249J2xlZnQnXVxuICAgICAqIE9wdGlvbmFsIHBvc2l0aW9uIG9mIHRoZSBzb3J0IG1lbnU6IHJpZ2h0IG9yIGxlZnRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwb3NpdGlvbj86IHN0cmluZyA9ICdsZWZ0JztcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbaWNvbj0nc29ydCddXG4gICAgICogRGVmYXVsdCBpY29uIGlzIFwic29ydFwiIGZyb20gbWF0ZXJpYWwgZGVzaWduLlxuICAgICAqIEJ1dCB5b3UgY2FuIHJlcGxhY2UgaXQgd2l0aCBhbm90aGVyIG9uZVxuICAgICAqIGUuZy4gc29ydF9ieV9hbHBoYVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb24/OiBzdHJpbmcgPSAnc29ydCc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydEtleVxuICAgICAqIHNldCBhbmQgZ2V0ICh0d28td2F5IGRhdGEgYmluZGluZykgb2YgY3VycmVudCBzb3J0IGtleVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRLZXkoc29ydEtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlS2V5ID0gc29ydEtleTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVYUG9zID0gJ2JlZm9yZSc7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKi9cbiAgICBzb3J0Qnkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zb3J0S2V5Q2hhbmdlLmVtaXQoa2V5KTtcbiAgICB9XG5cbn1cbiJdfQ==