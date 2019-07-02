import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ReadTextFileValue } from '@knora/core';
let TextfileValueComponent = class TextfileValueComponent {
    constructor() { }
    set valueObject(value) {
        this._textfileValueObj = value;
    }
    get valueObject() {
        return this._textfileValueObj;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ReadTextFileValue),
    tslib_1.__metadata("design:paramtypes", [ReadTextFileValue])
], TextfileValueComponent.prototype, "valueObject", null);
TextfileValueComponent = tslib_1.__decorate([
    Component({
        selector: 'kui-textfile-value',
        template: "<a target=\"_blank\" href=\"{{valueObject.textFileURL}}\">{{valueObject.textFilename}}</a>",
        styles: [""]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TextfileValueComponent);
export { TextfileValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpbGUtdmFsdWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0ZmlsZS12YWx1ZS90ZXh0ZmlsZS12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU9oRCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQWFqQyxnQkFBZ0IsQ0FBQztJQVZqQixJQUFJLFdBQVcsQ0FBQyxLQUF3QjtRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0NBTUYsQ0FBQTtBQVpDO0lBREMsS0FBSyxFQUFFO3NDQUNlLGlCQUFpQjs2Q0FBakIsaUJBQWlCO3lEQUV2QztBQUxVLHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLHNHQUE4Qzs7S0FFL0MsQ0FBQzs7R0FDVyxzQkFBc0IsQ0FlbEM7U0FmWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFkVGV4dEZpbGVWYWx1ZSB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXRleHRmaWxlLXZhbHVlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHRmaWxlLXZhbHVlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dGZpbGUtdmFsdWUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0ZmlsZVZhbHVlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVPYmplY3QodmFsdWU6IFJlYWRUZXh0RmlsZVZhbHVlKSB7XG4gICAgdGhpcy5fdGV4dGZpbGVWYWx1ZU9iaiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl90ZXh0ZmlsZVZhbHVlT2JqO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGV4dGZpbGVWYWx1ZU9iajogUmVhZFRleHRGaWxlVmFsdWU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIl19