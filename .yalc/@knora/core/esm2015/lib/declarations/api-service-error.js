/**
 * Error class used as API response in ApiService
 */
export class ApiServiceError {
    constructor() {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXNlcnZpY2UtZXJyb3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZUFBZTtJQUE1QjtRQVFJOztXQUVHO1FBQ0gsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUVYOztXQUVHO1FBQ0gsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVoQjs7V0FFRztRQUNILFFBQUcsR0FBRyxFQUFFLENBQUM7UUFFVDs7V0FFRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7SUFFbkIsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIEVycm9yIGNsYXNzIHVzZWQgYXMgQVBJIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VFcnJvciB7XG5cblxuICAgIC8qKlxuICAgICAqIEhlYWRlciBjb250YWlucyB0aGUgS25vcmEgLyBTZXJ2ZXIgdmVyc2lvblxuICAgICAqL1xuICAgIGhlYWRlcj86IGFueTtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0dXMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogU3RhdHVzIHRleHRcbiAgICAgKi9cbiAgICBzdGF0dXNUZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBUEkgdXJsXG4gICAgICovXG4gICAgdXJsID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGVycm9yIGluZm9cbiAgICAgKi9cbiAgICBlcnJvckluZm8gPSAnJztcblxufVxuIl19