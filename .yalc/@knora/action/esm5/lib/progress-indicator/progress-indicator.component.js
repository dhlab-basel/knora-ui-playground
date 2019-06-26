import { Component, Input } from '@angular/core';
/**
 * The progress indicator can be used to show the status of loading something.
 * This can be the simple loader or in case of submitting data it can show the status (not ready, loading, done or error).
 *
 */
var ProgressIndicatorComponent = /** @class */ (function () {
    /**
     * @ignore
     */
    function ProgressIndicatorComponent() {
        /**
         * @param {string} [color=primary]
         *
         * Parameter to customize the appearance of the loader.
         * Hexadecimal color value e.g. #00ff00 or similar color values 'red', 'green' etc.
         */
        this.color = 'primary';
    }
    ProgressIndicatorComponent.prototype.ngOnInit = function () {
    };
    ProgressIndicatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kui-progress-indicator',
                    template: "<!-- this is the progress indicator for forms -->\n<div class=\"kui-progress-indicator submit\" *ngIf=\"status !== undefined; else isLoading\">\n    <!-- spinner while on load / on submit -->\n    <div class=\"on-submit\" *ngIf=\"status === 0\">\n        <div class=\"spinner\" [style.border-top-color]=\"color\" [style.border-left-color]=\"color\"></div>\n    </div>\n\n    <div>\n        <!-- bullet point before submit -->\n        <mat-icon *ngIf=\"status === -1\" class=\"before-submit\">keyboard_arrow_right</mat-icon>\n        <!-- icon 'check' when done -->\n        <mat-icon *ngIf=\"status === 1\" class=\"after-submit\" [style.color]=\"color\">done</mat-icon>\n        <!-- in case of an error -->\n        <mat-icon *ngIf=\"status === 400\" class=\"submit-error\">not_interested</mat-icon>\n    </div>\n\n</div>\n\n<!-- default case: is loading -->\n<ng-template #isLoading>\n    <div class=\"kui-progress-indicator default\">\n        <div class=\"line\">\n            <div class=\"bounce1\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce2\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce3\" [style.background-color]=\"color\"></div>\n        </div>\n        <div class=\"line\">\n            <div class=\"bounce3\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce1\" [style.background-color]=\"color\"></div>\n            <div class=\"bounce2\" [style.background-color]=\"color\"></div>\n        </div>\n    </div>\n</ng-template>\n\n\n<!-- another variety of isLoading (in one line) -->\n<!--\n<div class=\"loading-progress-indicator\">\n    <span class=\"text\">{{text}}</span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n    <span class=\"dot\"></span>\n</div>\n-->\n",
                    styles: [".kui-progress-indicator.default{height:56px;margin-left:auto;margin-right:auto;padding:24px 36px;top:60px;width:96px}.kui-progress-indicator.default.page-center{left:50%;position:absolute;top:39%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.kui-progress-indicator.default h1,.kui-progress-indicator.default h2,.kui-progress-indicator.default h3,.kui-progress-indicator.default p{color:#555;text-align:center}.kui-progress-indicator.default .line{margin:0 auto;text-align:center;width:70px}.kui-progress-indicator.default .line>div{-webkit-animation:1.4s ease-in-out infinite both bounce-keyframes;animation:1.4s ease-in-out infinite both bounce-keyframes;background-color:#00695c;border-radius:6px;display:inline-block;height:18px;width:18px}.kui-progress-indicator.default .line .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.kui-progress-indicator.default .line .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes bounce-keyframes{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes bounce-keyframes{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.kui-progress-indicator.submit{height:32px;width:32px}.kui-progress-indicator.submit .on-submit{-webkit-animation:.7s linear infinite spinner-keyframes;animation:.7s linear infinite spinner-keyframes;height:32px;width:32px}.kui-progress-indicator.submit .on-submit .spinner{border:2px solid #00695c;border-bottom-color:transparent;border-radius:50%;border-right-color:transparent;height:28px;width:28px}.kui-progress-indicator.submit .before-submit{color:rgba(128,128,128,.8)}.kui-progress-indicator.submit .after-submit{color:#00695c}.kui-progress-indicator.submit .submit-error{color:#f44336}@-webkit-keyframes spinner-keyframes{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-keyframes{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.loading-progress-indicator{text-align:center;width:100%}.loading-progress-indicator .text{color:#00695c;font-size:12pt}.loading-progress-indicator .dot{-webkit-animation:1.4s ease-in-out infinite dot-keyframes;animation:1.4s ease-in-out infinite dot-keyframes;background-color:#00695c;border-radius:2px;display:inline-block;height:6px;margin:3px 6px 2px;width:6px}.loading-progress-indicator .dot:nth-child(2){-webkit-animation-delay:.16s;animation-delay:.16s}.loading-progress-indicator .dot:nth-child(3){-webkit-animation-delay:.32s;animation-delay:.32s}.loading-progress-indicator .dot:nth-child(4){-webkit-animation-delay:.48s;animation-delay:.48s}.loading-progress-indicator .dot:nth-child(5){-webkit-animation-delay:.64s;animation-delay:.64s}.loading-progress-indicator .dot:nth-child(6){-webkit-animation-delay:.8s;animation-delay:.8s}@-webkit-keyframes dot-keyframes{0%,100%{opacity:.4;-webkit-transform:scale(1,1);transform:scale(1,1)}50%{opacity:1;-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}}@keyframes dot-keyframes{0%,100%{opacity:.4;-webkit-transform:scale(1,1);transform:scale(1,1)}50%{opacity:1;-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}}"]
                }] }
    ];
    /** @nocollapse */
    ProgressIndicatorComponent.ctorParameters = function () { return []; };
    ProgressIndicatorComponent.propDecorators = {
        status: [{ type: Input }],
        color: [{ type: Input }]
    };
    return ProgressIndicatorComponent;
}());
export { ProgressIndicatorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtaW5kaWNhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQ7Ozs7R0FJRztBQUNIO0lBNkJJOztPQUVHO0lBQ0g7UUFaQTs7Ozs7V0FLRztRQUNNLFVBQUssR0FBWSxTQUFTLENBQUM7SUFPcEMsQ0FBQztJQUVELDZDQUFRLEdBQVI7SUFDQSxDQUFDOztnQkFwQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLDQyREFBa0Q7O2lCQUVyRDs7Ozs7eUJBY0ksS0FBSzt3QkFRTCxLQUFLOztJQVlWLGlDQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7U0FqQ1ksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIHByb2dyZXNzIGluZGljYXRvciBjYW4gYmUgdXNlZCB0byBzaG93IHRoZSBzdGF0dXMgb2YgbG9hZGluZyBzb21ldGhpbmcuXG4gKiBUaGlzIGNhbiBiZSB0aGUgc2ltcGxlIGxvYWRlciBvciBpbiBjYXNlIG9mIHN1Ym1pdHRpbmcgZGF0YSBpdCBjYW4gc2hvdyB0aGUgc3RhdHVzIChub3QgcmVhZHksIGxvYWRpbmcsIGRvbmUgb3IgZXJyb3IpLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktcHJvZ3Jlc3MtaW5kaWNhdG9yJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3MtaW5kaWNhdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzcy1pbmRpY2F0b3IuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0luZGljYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXR1c11cbiAgICAgKlxuICAgICAqIFtzdGF0dXNdIGlzIGEgbnVtYmVyIGFuZCBjYW4gYmUgdXNlZCB3aGVuIHN1Ym1pdHRpbmcgZm9ybSBkYXRhOlxuICAgICAqXG4gICAgICogLSBub3QgcmVhZHk6ICAgIC0xXG4gICAgICogLSBsb2FkaW5nOiAgICAgICAwXG4gICAgICogLSBkb25lOiAgICAgICAgICAxXG4gICAgICpcbiAgICAgKiAtIGVycm9yOiAgICAgICA0MDBcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdGF0dXM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbG9yPXByaW1hcnldXG4gICAgICpcbiAgICAgKiBQYXJhbWV0ZXIgdG8gY3VzdG9taXplIHRoZSBhcHBlYXJhbmNlIG9mIHRoZSBsb2FkZXIuXG4gICAgICogSGV4YWRlY2ltYWwgY29sb3IgdmFsdWUgZS5nLiAjMDBmZjAwIG9yIHNpbWlsYXIgY29sb3IgdmFsdWVzICdyZWQnLCAnZ3JlZW4nIGV0Yy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2xvcj86IHN0cmluZyA9ICdwcmltYXJ5JztcblxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxufVxuIl19