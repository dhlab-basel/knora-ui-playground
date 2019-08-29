import { OntologyInformation } from '../../../../services/v2/ontology-cache.service';
/**
 * @deprecated Use **ResourceSequence** instead
 *
 * Represents a sequence of resources.
 */
var ReadResourcesSequence = /** @class */ (function () {
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    function ReadResourcesSequence(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
        /**
         * Information about the entities used in the given collection of `ReadResource`.
         */
        this.ontologyInformation = new OntologyInformation({}, {}, {});
    }
    return ReadResourcesSequence;
}());
export { ReadResourcesSequence };
var ResourcesSequence = /** @class */ (function () {
    /**
     *
     * @param {Array<Resource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    function ResourcesSequence(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
        /**
         * Information about the entities used in the given collection of `Resource`.
         */
        this.ontologyInformation = new OntologyInformation({}, {}, {});
    }
    return ResourcesSequence;
}());
export { ResourcesSequence };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUVyRjs7OztHQUlHO0FBQ0g7SUFPSTs7OztPQUlHO0lBQ0gsK0JBQTZCLFNBQThCLEVBQWtCLGlCQUF5QjtRQUF6RSxjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUFrQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFWdEc7O1dBRUc7UUFDYSx3QkFBbUIsR0FBd0IsSUFBSSxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBUS9GLENBQUM7SUFFTCw0QkFBQztBQUFELENBQUMsQUFmRCxJQWVDOztBQUVEO0lBT0k7Ozs7T0FJRztJQUNILDJCQUE2QixTQUEwQixFQUFrQixpQkFBeUI7UUFBckUsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFBa0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1FBVmxHOztXQUVHO1FBQ2Esd0JBQW1CLEdBQXdCLElBQUksbUJBQW1CLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQVEvRixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRSZXNvdXJjZSwgUmVzb3VyY2UgfSBmcm9tICcuL3JlYWQtcmVzb3VyY2UnO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSAqKlJlc291cmNlU2VxdWVuY2UqKiBpbnN0ZWFkXG4gKlxuICogUmVwcmVzZW50cyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgZW50aXRpZXMgdXNlZCBpbiB0aGUgZ2l2ZW4gY29sbGVjdGlvbiBvZiBgUmVhZFJlc291cmNlYC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgb250b2xvZ3lJbmZvcm1hdGlvbjogT250b2xvZ3lJbmZvcm1hdGlvbiA9IG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKHt9LCB7fSwge30pO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IHJlc291cmNlcyBnaXZlbiBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUmVzb3VyY2VzIG51bWJlciBvZiBnaXZlbiByZXNvdXJjZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyByZWFkb25seSByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4sIHB1YmxpYyByZWFkb25seSBudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSB7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgZW50aXRpZXMgdXNlZCBpbiB0aGUgZ2l2ZW4gY29sbGVjdGlvbiBvZiBgUmVzb3VyY2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBvbnRvbG9neUluZm9ybWF0aW9uOiBPbnRvbG9neUluZm9ybWF0aW9uID0gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oe30sIHt9LCB7fSk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVzb3VyY2U+fSByZXNvdXJjZXMgZ2l2ZW4gc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZlJlc291cmNlcyBudW1iZXIgb2YgZ2l2ZW4gcmVzb3VyY2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgcmVhZG9ubHkgcmVzb3VyY2VzOiBBcnJheTxSZXNvdXJjZT4sIHB1YmxpYyByZWFkb25seSBudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSB7XG4gICAgfVxufVxuIl19