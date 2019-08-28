import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
/**
 * Knora-ui core configuration with the server definitions of:
 *  - api: URL of data service e.g. knora: http://localhost:3333
 *  - media: URL of media server service e.g. sipi: http://localhost:1024
 *  - app: URL of the app e.g. salsah: http://localhost:4200
 */
let KuiCoreConfig = class KuiCoreConfig {
    /**
     * Knora-ui core configuration with the server definitions of:
     *  - api: URL of data service e.g. knora: http://localhost:3333
     *  - media: URL of media server service e.g. sipi: http://localhost:1024
     *  - app: URL of the app e.g. salsah: http://localhost:4200
     */
    constructor() {
        /**
         * name of the app e.g. 'SALSAH'
         * @type {string}
         */
        this.name = undefined;
        /**
         * url of the app e.g. 'https://salsah.org'
         * @type {undefined}
         */
        this.app = undefined;
        /**
         * url of the api e.g. 'https://api.knora.org'
         * @type {string}
         */
        this.api = undefined;
        /**
         * url of media/file server e.g. 'https://iiif.sipi.io'
         * @type {string}
         */
        this.media = undefined;
        /**
         * url of the ontology e.g. 'http://api.02.unibas.dasch.swiss'
         * @type {string}
         */
        this.ontologyIRI = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('name', String),
    tslib_1.__metadata("design:type", String)
], KuiCoreConfig.prototype, "name", void 0);
tslib_1.__decorate([
    JsonProperty('app', String),
    tslib_1.__metadata("design:type", String)
], KuiCoreConfig.prototype, "app", void 0);
tslib_1.__decorate([
    JsonProperty('api', String),
    tslib_1.__metadata("design:type", String)
], KuiCoreConfig.prototype, "api", void 0);
tslib_1.__decorate([
    JsonProperty('media', String),
    tslib_1.__metadata("design:type", String)
], KuiCoreConfig.prototype, "media", void 0);
tslib_1.__decorate([
    JsonProperty('ontologyIRI', String),
    tslib_1.__metadata("design:type", String)
], KuiCoreConfig.prototype, "ontologyIRI", void 0);
KuiCoreConfig = tslib_1.__decorate([
    JsonObject('KuiCoreConfig')
], KuiCoreConfig);
export { KuiCoreConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvY29yZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0Q7Ozs7O0dBS0c7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBUDFCOzs7OztPQUtHO0lBQ0g7UUFHSTs7O1dBR0c7UUFFSSxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRWhDOzs7V0FHRztRQUVJLFFBQUcsR0FBVyxTQUFTLENBQUM7UUFFL0I7OztXQUdHO1FBRUksUUFBRyxHQUFXLFNBQVMsQ0FBQztRQUUvQjs7O1dBR0c7UUFFSSxVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRWpDOzs7V0FHRztRQUVJLGdCQUFXLEdBQVcsU0FBUyxDQUFDO0lBRTNDLENBQUM7Q0FBQSxDQUFBO0FBOUJHO0lBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7OzJDQUNHO0FBT2hDO0lBREMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7OzBDQUNHO0FBTy9CO0lBREMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7OzBDQUNHO0FBTy9CO0lBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7OzRDQUNHO0FBT2pDO0lBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7O2tEQUNHO0FBbkM5QixhQUFhO0lBRHpCLFVBQVUsQ0FBQyxlQUFlLENBQUM7R0FDZixhQUFhLENBcUN6QjtTQXJDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBLbm9yYS11aSBjb3JlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgc2VydmVyIGRlZmluaXRpb25zIG9mOlxuICogIC0gYXBpOiBVUkwgb2YgZGF0YSBzZXJ2aWNlIGUuZy4ga25vcmE6IGh0dHA6Ly9sb2NhbGhvc3Q6MzMzM1xuICogIC0gbWVkaWE6IFVSTCBvZiBtZWRpYSBzZXJ2ZXIgc2VydmljZSBlLmcuIHNpcGk6IGh0dHA6Ly9sb2NhbGhvc3Q6MTAyNFxuICogIC0gYXBwOiBVUkwgb2YgdGhlIGFwcCBlLmcuIHNhbHNhaDogaHR0cDovL2xvY2FsaG9zdDo0MjAwXG4gKi9cbkBKc29uT2JqZWN0KCdLdWlDb3JlQ29uZmlnJylcbmV4cG9ydCBjbGFzcyBLdWlDb3JlQ29uZmlnIHtcblxuICAgIC8qKlxuICAgICAqIG5hbWUgb2YgdGhlIGFwcCBlLmcuICdTQUxTQUgnXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgdGhlIGFwcCBlLmcuICdodHRwczovL3NhbHNhaC5vcmcnXG4gICAgICogQHR5cGUge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcHAnLCBTdHJpbmcpXG4gICAgcHVibGljIGFwcDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIHRoZSBhcGkgZS5nLiAnaHR0cHM6Ly9hcGkua25vcmEub3JnJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcGk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiBtZWRpYS9maWxlIHNlcnZlciBlLmcuICdodHRwczovL2lpaWYuc2lwaS5pbydcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ21lZGlhJywgU3RyaW5nKVxuICAgIHB1YmxpYyBtZWRpYTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIHRoZSBvbnRvbG9neSBlLmcuICdodHRwOi8vYXBpLjAyLnVuaWJhcy5kYXNjaC5zd2lzcydcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5SVJJJywgU3RyaW5nKVxuICAgIHB1YmxpYyBvbnRvbG9neUlSSTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG59XG4iXX0=