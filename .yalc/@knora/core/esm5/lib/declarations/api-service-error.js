/**
 * Error class used as API response in ApiService
 */
var ApiServiceError = /** @class */ (function () {
    function ApiServiceError() {
        /**
         * Status number
         */
        this.status = 0;
        /**
         * Status text
         */
        this.statusText = '';
        /**
         * API url
         */
        this.url = '';
        /**
         * Additional error info
         */
        this.errorInfo = '';
    }
    return ApiServiceError;
}());
export { ApiServiceError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXNlcnZpY2UtZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7O0dBRUc7QUFDSDtJQUFBO1FBUUk7O1dBRUc7UUFDSCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVg7O1dBRUc7UUFDSCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWhCOztXQUVHO1FBQ0gsUUFBRyxHQUFHLEVBQUUsQ0FBQztRQUVUOztXQUVHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIEVycm9yIGNsYXNzIHVzZWQgYXMgQVBJIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VFcnJvciB7XG5cblxuICAgIC8qKlxuICAgICAqIEhlYWRlciBjb250YWlucyB0aGUgS25vcmEgLyBTZXJ2ZXIgdmVyc2lvblxuICAgICAqL1xuICAgIGhlYWRlcj86IGFueTtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGVycm9yIGluZm9cbiAgICAgKi9cbiAgICBlcnJvckluZm8gPSAnJztcblxufVxuIl19