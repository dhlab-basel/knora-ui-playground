import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
var ExistingNameDirective = /** @class */ (function () {
    function ExistingNameDirective() {
        /**
         * @ignore
         */
        this.valFn = Validators.nullValidator;
    }
    ExistingNameDirective_1 = ExistingNameDirective;
    /**
     * @ignore
     * @param changes
     */
    ExistingNameDirective.prototype.ngOnChanges = function (changes) {
        var change = changes['existingName'];
        if (change) {
            var val = change.currentValue;
            var re = val instanceof RegExp ? val : new RegExp(val);
            this.valFn = existingNameValidator(re);
        }
        else {
            this.valFn = Validators.nullValidator;
        }
    };
    /**
     * @ignore
     * @param control
     */
    ExistingNameDirective.prototype.validate = function (control) {
        return this.valFn(control);
    };
    var ExistingNameDirective_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ExistingNameDirective.prototype, "existingName", void 0);
    ExistingNameDirective = ExistingNameDirective_1 = tslib_1.__decorate([
        Directive({
            selector: '[kuiExistingName]',
            providers: [{ provide: NG_VALIDATORS, useExisting: ExistingNameDirective_1, multi: true }]
        })
        /**
         * With the ExistingNameDirective we could prevent to use a name which has to be unique but already exists
         * e.g. get a list of all project shortnames, then we can use this list as existing names;
         * you can also use it for a list of blacklisted (not allowed) words
         */
    ], ExistingNameDirective);
    return ExistingNameDirective;
}());
export { ExistingNameDirective };
/**
 * Validation of existing name value. String method (only one value);
 * Use it in a "formbuilder" group as a validator property
 *
 * @param {RegExp} valRegexp Only one regular expression value
 * @returns ValidatorFn
 */
export function existingNameValidator(valRegexp) {
    return function (control) {
        var name;
        if (control.value) {
            name = control.value.toLowerCase();
        }
        var no = valRegexp.test(name);
        return no ? { 'existingName': { name: name } } : null;
    };
}
/**
 * Validation of existing name values. Array method (list of values)
 * Use it in a "formbuilder" group as a validator property
 *
 *
 * @param {RegExp} valArrayRegexp List of regular expression values
 * @returns ValidatorFn
 */
export function existingNamesValidator(valArrayRegexp) {
    return function (control) {
        var e_1, _a;
        var name;
        if (control.value) {
            name = control.value.toLowerCase();
        }
        var no;
        try {
            for (var valArrayRegexp_1 = tslib_1.__values(valArrayRegexp), valArrayRegexp_1_1 = valArrayRegexp_1.next(); !valArrayRegexp_1_1.done; valArrayRegexp_1_1 = valArrayRegexp_1.next()) {
                var existing = valArrayRegexp_1_1.value;
                no = existing.test(name);
                if (no) {
                    // console.log(no);
                    return no ? { 'existingName': { name: name } } : null;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (valArrayRegexp_1_1 && !valArrayRegexp_1_1.done && (_a = valArrayRegexp_1.return)) _a.call(valArrayRegexp_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return no ? { 'existingName': { name: name } } : null;
    };
}
/**
 * @ignore
 *
 * @param {RegExp} pattern
 * @param {string} regType
 * @returns ValidatorFn
 */
export function notAllowed(pattern, regType) {
    return function (control) {
        var name;
        // console.log(regType);
        if (control.value) {
            name = control.value.toLowerCase();
        }
        // console.log(name);
        var no = pattern.test(name);
        return no ? { regType: { name: name } } : null;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RpbmctbmFtZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvYWN0aW9uLyIsInNvdXJjZXMiOlsibGliL2V4aXN0aW5nLW5hbWUvZXhpc3RpbmctbmFtZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQW1CLGFBQWEsRUFBZSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVd6RjtJQVRBO1FBZ0JJOztXQUVHO1FBQ0ssVUFBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUF3QjdDLENBQUM7OEJBbENZLHFCQUFxQjtJQVk5Qjs7O09BR0c7SUFDSCwyQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBTSxHQUFHLEdBQW9CLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDakQsSUFBTSxFQUFFLEdBQUcsR0FBRyxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0NBQVEsR0FBUixVQUFTLE9BQXdCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDOztJQTVCUTtRQUFSLEtBQUssRUFBRTs7K0RBQXNCO0lBTHJCLHFCQUFxQjtRQVRqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsdUJBQXFCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzNGLENBQUM7UUFDRjs7OztXQUlHO09BQ1UscUJBQXFCLENBa0NqQztJQUFELDRCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0FsQ1kscUJBQXFCO0FBb0NsQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsU0FBaUI7SUFDbkQsT0FBTyxVQUFDLE9BQXdCO1FBQzVCLElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEM7UUFFRCxJQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLGNBQXdCO0lBRTNELE9BQU8sVUFBQyxPQUF3Qjs7UUFFNUIsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QztRQUVELElBQUksRUFBRSxDQUFDOztZQUNQLEtBQXVCLElBQUEsbUJBQUEsaUJBQUEsY0FBYyxDQUFBLDhDQUFBLDBFQUFFO2dCQUFsQyxJQUFNLFFBQVEsMkJBQUE7Z0JBQ2YsRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxFQUFFO29CQUNKLG1CQUFtQjtvQkFDbkIsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQ25EO2FBQ0o7Ozs7Ozs7OztRQUNELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLE9BQWUsRUFBRSxPQUFlO0lBQ3ZELE9BQU8sVUFBQyxPQUF3QjtRQUM1QixJQUFJLElBQUksQ0FBQztRQUVULHdCQUF3QjtRQUV4QixJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QztRQUVELHFCQUFxQjtRQUVyQixJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdDLENBQUMsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUywgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2t1aUV4aXN0aW5nTmFtZV0nLFxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IEV4aXN0aW5nTmFtZURpcmVjdGl2ZSwgbXVsdGk6IHRydWUgfV1cbn0pXG4vKipcbiAqIFdpdGggdGhlIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSB3ZSBjb3VsZCBwcmV2ZW50IHRvIHVzZSBhIG5hbWUgd2hpY2ggaGFzIHRvIGJlIHVuaXF1ZSBidXQgYWxyZWFkeSBleGlzdHNcbiAqIGUuZy4gZ2V0IGEgbGlzdCBvZiBhbGwgcHJvamVjdCBzaG9ydG5hbWVzLCB0aGVuIHdlIGNhbiB1c2UgdGhpcyBsaXN0IGFzIGV4aXN0aW5nIG5hbWVzO1xuICogeW91IGNhbiBhbHNvIHVzZSBpdCBmb3IgYSBsaXN0IG9mIGJsYWNrbGlzdGVkIChub3QgYWxsb3dlZCkgd29yZHNcbiAqL1xuZXhwb3J0IGNsYXNzIEV4aXN0aW5nTmFtZURpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvcnMsIE9uQ2hhbmdlcyB7XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgQElucHV0KCkgZXhpc3RpbmdOYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxGbiA9IFZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjtcblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBAcGFyYW0gY2hhbmdlc1xuICAgICAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1snZXhpc3RpbmdOYW1lJ107XG4gICAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbDogc3RyaW5nIHwgUmVnRXhwID0gY2hhbmdlLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlID0gdmFsIGluc3RhbmNlb2YgUmVnRXhwID8gdmFsIDogbmV3IFJlZ0V4cCh2YWwpO1xuICAgICAgICAgICAgdGhpcy52YWxGbiA9IGV4aXN0aW5nTmFtZVZhbGlkYXRvcihyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbEZuID0gVmFsaWRhdG9ycy5udWxsVmFsaWRhdG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEBwYXJhbSBjb250cm9sXG4gICAgICovXG4gICAgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbEZuKGNvbnRyb2wpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0aW9uIG9mIGV4aXN0aW5nIG5hbWUgdmFsdWUuIFN0cmluZyBtZXRob2QgKG9ubHkgb25lIHZhbHVlKTtcbiAqIFVzZSBpdCBpbiBhIFwiZm9ybWJ1aWxkZXJcIiBncm91cCBhcyBhIHZhbGlkYXRvciBwcm9wZXJ0eVxuICpcbiAqIEBwYXJhbSB7UmVnRXhwfSB2YWxSZWdleHAgT25seSBvbmUgcmVndWxhciBleHByZXNzaW9uIHZhbHVlXG4gKiBAcmV0dXJucyBWYWxpZGF0b3JGblxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpc3RpbmdOYW1lVmFsaWRhdG9yKHZhbFJlZ2V4cDogUmVnRXhwKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG4gICAgICAgIGxldCBuYW1lO1xuXG4gICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICBuYW1lID0gY29udHJvbC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm8gPSB2YWxSZWdleHAudGVzdChuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5vID8geyAnZXhpc3RpbmdOYW1lJzogeyBuYW1lIH0gfSA6IG51bGw7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0aW9uIG9mIGV4aXN0aW5nIG5hbWUgdmFsdWVzLiBBcnJheSBtZXRob2QgKGxpc3Qgb2YgdmFsdWVzKVxuICogVXNlIGl0IGluIGEgXCJmb3JtYnVpbGRlclwiIGdyb3VwIGFzIGEgdmFsaWRhdG9yIHByb3BlcnR5XG4gKlxuICpcbiAqIEBwYXJhbSB7UmVnRXhwfSB2YWxBcnJheVJlZ2V4cCBMaXN0IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbiB2YWx1ZXNcbiAqIEByZXR1cm5zIFZhbGlkYXRvckZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGlzdGluZ05hbWVzVmFsaWRhdG9yKHZhbEFycmF5UmVnZXhwOiBbUmVnRXhwXSk6IFZhbGlkYXRvckZuIHtcblxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG5cbiAgICAgICAgbGV0IG5hbWU7XG5cbiAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSBjb250cm9sLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm87XG4gICAgICAgIGZvciAoY29uc3QgZXhpc3Rpbmcgb2YgdmFsQXJyYXlSZWdleHApIHtcbiAgICAgICAgICAgIG5vID0gZXhpc3RpbmcudGVzdChuYW1lKTtcbiAgICAgICAgICAgIGlmIChubykge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5vKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm8gPyB7ICdleGlzdGluZ05hbWUnOiB7IG5hbWUgfSB9IDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm8gPyB7ICdleGlzdGluZ05hbWUnOiB7IG5hbWUgfSB9IDogbnVsbDtcbiAgICB9O1xufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuICogQHBhcmFtIHtzdHJpbmd9IHJlZ1R5cGVcbiAqIEByZXR1cm5zIFZhbGlkYXRvckZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RBbGxvd2VkKHBhdHRlcm46IFJlZ0V4cCwgcmVnVHlwZTogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9PiB7XG4gICAgICAgIGxldCBuYW1lO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlZ1R5cGUpO1xuXG4gICAgICAgIGlmIChjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICBuYW1lID0gY29udHJvbC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSk7XG5cbiAgICAgICAgY29uc3Qgbm8gPSBwYXR0ZXJuLnRlc3QobmFtZSk7XG4gICAgICAgIHJldHVybiBubyA/IHsgcmVnVHlwZTogeyBuYW1lIH0gfSA6IG51bGw7XG4gICAgfTtcbn1cbiJdfQ==