import { OntologyInformation } from '../../../../services/v2/ontology-cache.service';
/**
 * @deprecated Use **ResourceSequence** instead
 *
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
export class ResourcesSequence {
    /**
     *
     * @param {Array<Resource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    constructor(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
        /**
         * Information about the entities used in the given collection of `Resource`.
         */
        this.ontologyInformation = new OntologyInformation({}, {}, {});
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3Jlc291cmNlcy9yZWFkLXJlc291cmNlcy1zZXF1ZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUVyRjs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQU85Qjs7OztPQUlHO0lBQ0gsWUFBNkIsU0FBOEIsRUFBa0IsaUJBQXlCO1FBQXpFLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQWtCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQVZ0Rzs7V0FFRztRQUNhLHdCQUFtQixHQUF3QixJQUFJLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFRL0YsQ0FBQztDQUVKO0FBRUQsTUFBTSxPQUFPLGlCQUFpQjtJQU8xQjs7OztPQUlHO0lBQ0gsWUFBNkIsU0FBMEIsRUFBa0IsaUJBQXlCO1FBQXJFLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQWtCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQVZsRzs7V0FFRztRQUNhLHdCQUFtQixHQUF3QixJQUFJLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFRL0YsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhZFJlc291cmNlLCBSZXNvdXJjZSB9IGZyb20gJy4vcmVhZC1yZXNvdXJjZSc7XG5pbXBvcnQgeyBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvdjIvb250b2xvZ3ktY2FjaGUuc2VydmljZSc7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlICoqUmVzb3VyY2VTZXF1ZW5jZSoqIGluc3RlYWRcbiAqXG4gKiBSZXByZXNlbnRzIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgIC8qKlxuICAgICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBlbnRpdGllcyB1c2VkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uIG9mIGBSZWFkUmVzb3VyY2VgLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBvbnRvbG9neUluZm9ybWF0aW9uOiBPbnRvbG9neUluZm9ybWF0aW9uID0gbmV3IE9udG9sb2d5SW5mb3JtYXRpb24oe30sIHt9LCB7fSk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gcmVzb3VyY2VzIGdpdmVuIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyT2ZSZXNvdXJjZXMgbnVtYmVyIG9mIGdpdmVuIHJlc291cmNlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIHJlYWRvbmx5IHJlc291cmNlczogQXJyYXk8UmVhZFJlc291cmNlPiwgcHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpIHtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgIC8qKlxuICAgICAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBlbnRpdGllcyB1c2VkIGluIHRoZSBnaXZlbiBjb2xsZWN0aW9uIG9mIGBSZXNvdXJjZWAuXG4gICAgICovXG4gICAgcHVibGljIHJlYWRvbmx5IG9udG9sb2d5SW5mb3JtYXRpb246IE9udG9sb2d5SW5mb3JtYXRpb24gPSBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbih7fSwge30sIHt9KTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxSZXNvdXJjZT59IHJlc291cmNlcyBnaXZlbiBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlck9mUmVzb3VyY2VzIG51bWJlciBvZiBnaXZlbiByZXNvdXJjZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyByZWFkb25seSByZXNvdXJjZXM6IEFycmF5PFJlc291cmNlPiwgcHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXIpIHtcbiAgICB9XG59XG4iXX0=