import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A component with a list of properties to sort a list by one of them.
 * It can be used together with the KuiSortBy pipe.
 */
var SortButtonComponent = /** @class */ (function () {
    function SortButtonComponent() {
        /**
         * @ignore {string} sortKeyChange
         * @emits TODO: this would be the correct syntax for Output eventEmitter
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImxpYi9zb3J0LWJ1dHRvbi9zb3J0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPL0U7OztHQUdHO0FBTUg7SUE4Q0k7UUE1Q0E7Ozs7OztXQU1HO1FBQ08sa0JBQWEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUczRSxhQUFRLEdBQVcsT0FBTyxDQUFDO1FBVzNCOzs7V0FHRztRQUNNLGFBQVEsR0FBWSxNQUFNLENBQUM7UUFHcEM7Ozs7O1dBS0c7UUFDTSxTQUFJLEdBQVksTUFBTSxDQUFDO0lBV2hDLENBQUM7SUFURDs7O09BR0c7SUFDTSxxQ0FBTyxHQUFQLFVBQVEsT0FBZTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBS0Qsc0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDNUI7SUFFTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG9DQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQXREUztRQUFULE1BQU0sRUFBRTswQ0FBZ0IsWUFBWTs4REFBc0M7SUFZbEU7UUFBUixLQUFLLEVBQUU7OzBEQUF1QjtJQU10QjtRQUFSLEtBQUssRUFBRTs7eURBQTRCO0lBUzNCO1FBQVIsS0FBSyxFQUFFOztxREFBd0I7SUFNdkI7UUFBUixLQUFLLEVBQUU7Ozs7c0RBRVA7SUE1Q1EsbUJBQW1CO1FBTC9CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsOGdCQUEyQzs7U0FFOUMsQ0FBQzs7T0FDVyxtQkFBbUIsQ0FpRS9CO0lBQUQsMEJBQUM7Q0FBQSxBQWpFRCxJQWlFQztTQWpFWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydFByb3Age1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgd2l0aCBhIGxpc3Qgb2YgcHJvcGVydGllcyB0byBzb3J0IGEgbGlzdCBieSBvbmUgb2YgdGhlbS5cbiAqIEl0IGNhbiBiZSB1c2VkIHRvZ2V0aGVyIHdpdGggdGhlIEt1aVNvcnRCeSBwaXBlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1zb3J0LWJ1dHRvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zb3J0LWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNvcnRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZSB7c3RyaW5nfSBzb3J0S2V5Q2hhbmdlXG4gICAgICogQGVtaXRzIFRPRE86IHRoaXMgd291bGQgYmUgdGhlIGNvcnJlY3Qgc3ludGF4IGZvciBPdXRwdXQgZXZlbnRFbWl0dGVyXG4gICAgICpcbiAgICAgKiBFdmVudEVtaXR0ZXIgd2hlbiBhIHVzZXIgc2VsZWN0ZWQgYSBzb3J0IHByb3BlcnR5O1xuICAgICAqIFRoaXMgaXMgdGhlIHNlbGVjdGVkIGtleVxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBzb3J0S2V5Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG5cbiAgICBtZW51WFBvczogc3RyaW5nID0gJ2FmdGVyJztcblxuICAgIGFjdGl2ZUtleTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTb3J0UHJvcFtdfSBzb3J0UHJvcHNcbiAgICAgKiBBbiBhcnJheSBvZiBTb3J0UHJvcCBvYmplY3RzIGZvciB0aGUgc2VsZWN0aW9uIG1lbnU6XG4gICAgICogU29ydFByb3A6IHsga2V5OiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcgfVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRQcm9wczogU29ydFByb3BbXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcG9zaXRpb249J2xlZnQnXVxuICAgICAqIE9wdGlvbmFsIHBvc2l0aW9uIG9mIHRoZSBzb3J0IG1lbnU6IHJpZ2h0IG9yIGxlZnRcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwb3NpdGlvbj86IHN0cmluZyA9ICdsZWZ0JztcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBbaWNvbj0nc29ydCddXG4gICAgICogRGVmYXVsdCBpY29uIGlzIFwic29ydFwiIGZyb20gbWF0ZXJpYWwgZGVzaWduLlxuICAgICAqIEJ1dCB5b3UgY2FuIHJlcGxhY2UgaXQgd2l0aCBhbm90aGVyIG9uZVxuICAgICAqIGUuZy4gc29ydF9ieV9hbHBoYVxuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb24/OiBzdHJpbmcgPSAnc29ydCc7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc29ydEtleVxuICAgICAqIHNldCBhbmQgZ2V0ICh0d28td2F5IGRhdGEgYmluZGluZykgb2YgY3VycmVudCBzb3J0IGtleVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRLZXkoc29ydEtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlS2V5ID0gc29ydEtleTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMubWVudVhQb3MgPSAnYmVmb3JlJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqL1xuICAgIHNvcnRCeShrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNvcnRLZXlDaGFuZ2UuZW1pdChrZXkpO1xuICAgIH1cblxufVxuIl19