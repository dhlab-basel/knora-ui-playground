import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { KnoraConstants, OntologyInformation, ReadTextValueAsHtml } from '@knora/core';
var TextValueAsHtmlComponent = /** @class */ (function () {
    function TextValueAsHtmlComponent(el) {
        this.el = el;
        this.referredResourceClicked = new EventEmitter();
    }
    Object.defineProperty(TextValueAsHtmlComponent.prototype, "ontologyInfo", {
        get: function () {
            return this._ontoInfo;
        },
        set: function (value) {
            this._ontoInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextValueAsHtmlComponent.prototype, "bindEvents", {
        get: function () {
            return this._bindEvents;
        },
        set: function (value) {
            this._bindEvents = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextValueAsHtmlComponent.prototype, "valueObject", {
        get: function () {
            return this._htmlValueObj;
        },
        set: function (value) {
            this._htmlValueObj = value;
            if (this.el.nativeElement.innerHTML) {
                this.el.nativeElement.innerHTML = this.valueObject.html;
            }
        },
        enumerable: true,
        configurable: true
    });
    TextValueAsHtmlComponent.prototype.refResClicked = function (refResourceIri) {
        this.referredResourceClicked.emit(refResourceIri);
    };
    /**
     * Binds a click event to standoff links that shows the referred resource.
     *
     * @param targetElement
     */
    TextValueAsHtmlComponent.prototype.onClick = function (targetElement) {
        if (this._bindEvents && targetElement.nodeName.toLowerCase() === 'a'
            && targetElement.className.toLowerCase().indexOf(KnoraConstants.SalsahLink) >= 0
            && targetElement.href !== undefined) {
            this.refResClicked(targetElement.href);
            // prevent propagation
            return false;
        }
        else if (this.bindEvents && targetElement.nodeName.toLowerCase() === 'a' && targetElement.href !== undefined) {
            // open link in a new window
            window.open(targetElement.href, '_blank');
            // prevent propagation
            return false;
        }
        else {
            // prevent propagation
            return false;
        }
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], TextValueAsHtmlComponent.prototype, "referredResourceClicked", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", OntologyInformation),
        tslib_1.__metadata("design:paramtypes", [OntologyInformation])
    ], TextValueAsHtmlComponent.prototype, "ontologyInfo", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], TextValueAsHtmlComponent.prototype, "bindEvents", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ReadTextValueAsHtml),
        tslib_1.__metadata("design:paramtypes", [ReadTextValueAsHtml])
    ], TextValueAsHtmlComponent.prototype, "valueObject", null);
    tslib_1.__decorate([
        HostListener('click', ['$event.target']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextValueAsHtmlComponent.prototype, "onClick", null);
    TextValueAsHtmlComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-text-value-as-html',
            template: "<div>{{valueObject.html}}</div>",
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], TextValueAsHtmlComponent);
    return TextValueAsHtmlComponent;
}());
export { TextValueAsHtmlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy1odG1sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvcHJvcGVydHkvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLWFzLWh0bWwvdGV4dC12YWx1ZS1hcy1odG1sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPdkY7SUF5Q0ksa0NBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBdENsQyw0QkFBdUIsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXVDbkUsQ0FBQztJQXBDRCxzQkFBSSxrREFBWTthQUloQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBTkQsVUFBaUIsS0FBMEI7WUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSxnREFBVTthQUlkO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7YUFORCxVQUFlLEtBQWM7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSxpREFBVzthQVFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7YUFWRCxVQUFnQixLQUEwQjtZQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUUzQixJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQzNEO1FBQ0wsQ0FBQzs7O09BQUE7SUFjRCxnREFBYSxHQUFiLFVBQWMsY0FBc0I7UUFDaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUVILDBDQUFPLEdBQVAsVUFBUSxhQUFhO1FBQ2pCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLEdBQUc7ZUFDN0QsYUFBYSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7ZUFDN0UsYUFBYSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsc0JBQXNCO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzVHLDRCQUE0QjtZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUMsc0JBQXNCO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxzQkFBc0I7WUFDdEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBbkVEO1FBREMsTUFBTSxFQUFFOzBDQUNnQixZQUFZOzZFQUE4QjtJQUduRTtRQURDLEtBQUssRUFBRTswQ0FDZ0IsbUJBQW1CO2lEQUFuQixtQkFBbUI7Z0VBRTFDO0lBT0Q7UUFEQyxLQUFLLEVBQUU7MENBQ2MsT0FBTztpREFBUCxPQUFPOzhEQUU1QjtJQU9EO1FBREMsS0FBSyxFQUFFOzBDQUNlLG1CQUFtQjtpREFBbkIsbUJBQW1COytEQU16QztJQXdCRDtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7OzsyREFpQnhDO0lBdEVRLHdCQUF3QjtRQUxwQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLDJDQUFrRDs7U0FFckQsQ0FBQztpREEwQzBCLFVBQVU7T0F6Q3pCLHdCQUF3QixDQXdFcEM7SUFBRCwrQkFBQztDQUFBLEFBeEVELElBd0VDO1NBeEVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBPbnRvbG9neUluZm9ybWF0aW9uLCBSZWFkVGV4dFZhbHVlQXNIdG1sIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS10ZXh0LXZhbHVlLWFzLWh0bWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90ZXh0LXZhbHVlLWFzLWh0bWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RleHQtdmFsdWUtYXMtaHRtbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRleHRWYWx1ZUFzSHRtbENvbXBvbmVudCB7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWZlcnJlZFJlc291cmNlQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBvbnRvbG9neUluZm8odmFsdWU6IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgdGhpcy5fb250b0luZm8gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgb250b2xvZ3lJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb250b0luZm87XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgYmluZEV2ZW50cyh2YWx1ZTogQm9vbGVhbikge1xuICAgICAgICB0aGlzLl9iaW5kRXZlbnRzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kRXZlbnRzO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlT2JqZWN0KHZhbHVlOiBSZWFkVGV4dFZhbHVlQXNIdG1sKSB7XG4gICAgICAgIHRoaXMuX2h0bWxWYWx1ZU9iaiA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy52YWx1ZU9iamVjdC5odG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHRtbFZhbHVlT2JqO1xuICAgIH1cblxuICAgIGh0bWw6IHN0cmluZztcbiAgICBwcml2YXRlIF9odG1sVmFsdWVPYmo6IFJlYWRUZXh0VmFsdWVBc0h0bWw7XG4gICAgcHJpdmF0ZSBfb250b0luZm86IE9udG9sb2d5SW5mb3JtYXRpb247XG4gICAgcHJpdmF0ZSBfYmluZEV2ZW50czogQm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICByZWZSZXNDbGlja2VkKHJlZlJlc291cmNlSXJpOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yZWZlcnJlZFJlc291cmNlQ2xpY2tlZC5lbWl0KHJlZlJlc291cmNlSXJpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBhIGNsaWNrIGV2ZW50IHRvIHN0YW5kb2ZmIGxpbmtzIHRoYXQgc2hvd3MgdGhlIHJlZmVycmVkIHJlc291cmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldEVsZW1lbnRcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxuICAgIG9uQ2xpY2sodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy5fYmluZEV2ZW50cyAmJiB0YXJnZXRFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJ1xuICAgICAgICAgICAgJiYgdGFyZ2V0RWxlbWVudC5jbGFzc05hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKEtub3JhQ29uc3RhbnRzLlNhbHNhaExpbmspID49IDBcbiAgICAgICAgICAgICYmIHRhcmdldEVsZW1lbnQuaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlZlJlc0NsaWNrZWQodGFyZ2V0RWxlbWVudC5ocmVmKTtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgcHJvcGFnYXRpb25cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpbmRFdmVudHMgJiYgdGFyZ2V0RWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScgJiYgdGFyZ2V0RWxlbWVudC5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIG9wZW4gbGluayBpbiBhIG5ldyB3aW5kb3dcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHRhcmdldEVsZW1lbnQuaHJlZiwgJ19ibGFuaycpO1xuICAgICAgICAgICAgLy8gcHJldmVudCBwcm9wYWdhdGlvblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcHJldmVudCBwcm9wYWdhdGlvblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=