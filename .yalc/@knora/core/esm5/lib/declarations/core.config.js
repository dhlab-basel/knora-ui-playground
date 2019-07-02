import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
/**
 * Knora-ui core configuration with the server definitions of:
 *  - api: URL of data service e.g. knora: http://localhost:3333
 *  - media: URL of media server service e.g. sipi: http://localhost:1024
 *  - app: URL of the app e.g. salsah: http://localhost:4200
 */
var KuiCoreConfig = /** @class */ (function () {
    function KuiCoreConfig() {
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
    }
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
    KuiCoreConfig = tslib_1.__decorate([
        JsonObject('KuiCoreConfig')
    ], KuiCoreConfig);
    return KuiCoreConfig;
}());
export { KuiCoreConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvY29yZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0Q7Ozs7O0dBS0c7QUFFSDtJQURBO1FBR0k7OztXQUdHO1FBRUksU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUVoQzs7O1dBR0c7UUFFSSxRQUFHLEdBQVcsU0FBUyxDQUFDO1FBRS9COzs7V0FHRztRQUVJLFFBQUcsR0FBVyxTQUFTLENBQUM7UUFFL0I7OztXQUdHO1FBRUksVUFBSyxHQUFXLFNBQVMsQ0FBQztJQUVyQyxDQUFDO0lBdkJHO1FBREMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7OytDQUNHO0lBT2hDO1FBREMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7OzhDQUNHO0lBTy9CO1FBREMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7OzhDQUNHO0lBTy9CO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7O2dEQUNHO0lBNUJ4QixhQUFhO1FBRHpCLFVBQVUsQ0FBQyxlQUFlLENBQUM7T0FDZixhQUFhLENBOEJ6QjtJQUFELG9CQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0E5QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogS25vcmEtdWkgY29yZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIHNlcnZlciBkZWZpbml0aW9ucyBvZjpcbiAqICAtIGFwaTogVVJMIG9mIGRhdGEgc2VydmljZSBlLmcuIGtub3JhOiBodHRwOi8vbG9jYWxob3N0OjMzMzNcbiAqICAtIG1lZGlhOiBVUkwgb2YgbWVkaWEgc2VydmVyIHNlcnZpY2UgZS5nLiBzaXBpOiBodHRwOi8vbG9jYWxob3N0OjEwMjRcbiAqICAtIGFwcDogVVJMIG9mIHRoZSBhcHAgZS5nLiBzYWxzYWg6IGh0dHA6Ly9sb2NhbGhvc3Q6NDIwMFxuICovXG5ASnNvbk9iamVjdCgnS3VpQ29yZUNvbmZpZycpXG5leHBvcnQgY2xhc3MgS3VpQ29yZUNvbmZpZyB7XG5cbiAgICAvKipcbiAgICAgKiBuYW1lIG9mIHRoZSBhcHAgZS5nLiAnU0FMU0FIJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIHRoZSBhcHAgZS5nLiAnaHR0cHM6Ly9zYWxzYWgub3JnJ1xuICAgICAqIEB0eXBlIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBwJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcHA6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiB0aGUgYXBpIGUuZy4gJ2h0dHBzOi8vYXBpLmtub3JhLm9yZydcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ2FwaScsIFN0cmluZylcbiAgICBwdWJsaWMgYXBpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgbWVkaWEvZmlsZSBzZXJ2ZXIgZS5nLiAnaHR0cHM6Ly9paWlmLnNpcGkuaW8nXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdtZWRpYScsIFN0cmluZylcbiAgICBwdWJsaWMgbWVkaWE6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxufVxuIl19