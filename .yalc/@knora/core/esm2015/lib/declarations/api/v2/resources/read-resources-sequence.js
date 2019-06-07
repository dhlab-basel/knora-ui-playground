import { OntologyInformation } from '../../../../services/v2/ontology-cache.service';
/**
 * Represents a sequence of resources.
 */
export class ReadResourcesSequence {
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    constructor(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
        /**
         * Information about the entities used in the given collection of `ReadResource`.
         */
        this.ontologyInformation = new OntologyInformation({}, {}, {});
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUVyRjs7R0FFRztBQUNILE1BQU0sT0FBTyxxQkFBcUI7SUFPOUI7Ozs7T0FJRztJQUNILFlBQTRCLFNBQThCLEVBQWtCLGlCQUF5QjtRQUF6RSxjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUFrQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFWckc7O1dBRUc7UUFDYSx3QkFBbUIsR0FBd0IsSUFBSSxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBUS9GLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWRSZXNvdXJjZSB9IGZyb20gJy4vcmVhZC1yZXNvdXJjZSc7XG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAvKipcbiAgICAgKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgZW50aXRpZXMgdXNlZCBpbiB0aGUgZ2l2ZW4gY29sbGVjdGlvbiBvZiBgUmVhZFJlc291cmNlYC5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgb250b2xvZ3lJbmZvcm1hdGlvbjogT250b2xvZ3lJbmZvcm1hdGlvbiA9IG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKHt9LCB7fSwge30pO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5PFJlYWRSZXNvdXJjZT59IHJlc291cmNlcyBnaXZlbiBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUmVzb3VyY2VzIG51bWJlciBvZiBnaXZlbiByZXNvdXJjZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiwgcHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpIHtcbiAgICB9XG5cbn1cbiJdfQ==