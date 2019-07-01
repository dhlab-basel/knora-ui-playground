import { KnoraConstants } from '../../knora-constants';
/**
 * Represents an image including its regions.
 */
var StillImageRepresentation = /** @class */ (function () {
    /**
     *
     * @param {ReadStillImageFileValue} stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param {ImageRegion[]} regions the regions belonging to the image.
     */
    function StillImageRepresentation(stillImageFileValue, regions, type) {
        if (type === void 0) { type = KnoraConstants.StillImageFileValue; }
        this.stillImageFileValue = stillImageFileValue;
        this.regions = regions;
        this.type = type;
    }
    return StillImageRepresentation;
}());
export { StillImageRepresentation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL3N0aWxsLWltYWdlLXJlcHJlc2VudGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd2RDs7R0FFRztBQUVIO0lBRUk7Ozs7T0FJRztJQUNILGtDQUFzQixtQkFBNEMsRUFBVyxPQUFzQixFQUFXLElBQWlEO1FBQWpELHFCQUFBLEVBQUEsT0FBZSxjQUFjLENBQUMsbUJBQW1CO1FBQXpJLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBeUI7UUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQVcsU0FBSSxHQUFKLElBQUksQ0FBNkM7SUFFL0osQ0FBQztJQUVMLCtCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBJbWFnZVJlZ2lvbiB9IGZyb20gJy4vaW1hZ2UtcmVnaW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGltYWdlIGluY2x1ZGluZyBpdHMgcmVnaW9ucy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZX0gc3RpbGxJbWFnZUZpbGVWYWx1ZSBhIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXSByZXByZXNlbnRpbmcgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIHtJbWFnZVJlZ2lvbltdfSByZWdpb25zIHRoZSByZWdpb25zIGJlbG9uZ2luZyB0byB0aGUgaW1hZ2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKHJlYWRvbmx5IHN0aWxsSW1hZ2VGaWxlVmFsdWU6IFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlLCByZWFkb25seSByZWdpb25zOiBJbWFnZVJlZ2lvbltdLCByZWFkb25seSB0eXBlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlKSB7XG5cbiAgICB9XG5cbn1cbiJdfQ==