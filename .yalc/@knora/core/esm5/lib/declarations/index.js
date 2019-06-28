export * from './core.config';
export * from './api-service-result';
export * from './api-service-error';
export * from './utils';
/**
 * Interfaces for constants and operators
 */
export * from './api/knora-constants';
/**
 * Interfaces for shared objects
 */
export * from './api/shared/strings';
export * from './api/shared/date';
export * from './api/admin/authentication/authentication-response';
/**
 * Interfaces for groups
 */
export * from './api/admin/groups/group';
export * from './api/admin/groups/group-response';
export * from './api/admin/groups/groups-response';
/**
 * Interface for lists
 */
export * from './api/admin/lists/list';
export * from './api/admin/lists/list-info';
export * from './api/admin/lists/list-info-response';
export * from './api/admin/lists/list-node';
export * from './api/admin/lists/list-node-info';
export * from './api/admin/lists/list-node-info-response';
export * from './api/admin/lists/list-response';
export * from './api/admin/lists/lists-response';
/**
 * Interface for ontologies
 */
export * from './api/admin/ontologies/ontology-info-short';
/**
 * Interfaces for permissions
 */
export * from './api/admin/permissions/permission-data';
/**
 * Interfaces for projects
 */
export * from './api/admin/projects/project';
export * from './api/admin/projects/project-members-response';
export * from './api/admin/projects/project-response';
export * from './api/admin/projects/projects-response';
/**
 * Interfaces for users
 */
export * from './api/admin/users/users-response';
export * from './api/admin/users/user-response';
export * from './api/admin/users/user';
export * from './api/v2/properties/read-property-item';
/**
 * Interfaces for resources
 */
export * from './api/v2/resources/read-resource';
export * from './api/v2/resources/read-resources-sequence';
/**
 * Interface for count query response.
 */
export * from './api/v2/count-query/count-query-result';
/**
 * Interfaces for resources
 */
export * from './api/v2/still-image/still-image-representation';
export * from './api/v2/still-image/image-region';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxjQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGNBQWMsU0FBUyxDQUFDO0FBR3hCOztHQUVHO0FBQ0gsY0FBYyx1QkFBdUIsQ0FBQztBQUV0Qzs7R0FFRztBQUNILGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyxtQkFBbUIsQ0FBQztBQU1sQyxjQUFjLG9EQUFvRCxDQUFDO0FBRW5FOztHQUVHO0FBQ0gsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxjQUFjLG1DQUFtQyxDQUFDO0FBQ2xELGNBQWMsb0NBQW9DLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxjQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLGNBQWMsNkJBQTZCLENBQUM7QUFDNUMsY0FBYyxzQ0FBc0MsQ0FBQztBQUNyRCxjQUFjLDZCQUE2QixDQUFDO0FBQzVDLGNBQWMsa0NBQWtDLENBQUM7QUFDakQsY0FBYywyQ0FBMkMsQ0FBQztBQUMxRCxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsa0NBQWtDLENBQUM7QUFJakQ7O0dBRUc7QUFDSCxjQUFjLDRDQUE0QyxDQUFDO0FBRTNEOztHQUVHO0FBQ0gsY0FBYyx5Q0FBeUMsQ0FBQztBQUV4RDs7R0FFRztBQUNILGNBQWMsOEJBQThCLENBQUM7QUFDN0MsY0FBYywrQ0FBK0MsQ0FBQztBQUM5RCxjQUFjLHVDQUF1QyxDQUFDO0FBQ3RELGNBQWMsd0NBQXdDLENBQUM7QUFRdkQ7O0dBRUc7QUFFSCxjQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGNBQWMsaUNBQWlDLENBQUM7QUFDaEQsY0FBYyx3QkFBd0IsQ0FBQztBQU12QyxjQUFjLHdDQUF3QyxDQUFDO0FBRXZEOztHQUVHO0FBQ0gsY0FBYyxrQ0FBa0MsQ0FBQztBQUNqRCxjQUFjLDRDQUE0QyxDQUFDO0FBRTNEOztHQUVHO0FBQ0gsY0FBYyx5Q0FBeUMsQ0FBQztBQUV4RDs7R0FFRztBQUNILGNBQWMsaURBQWlELENBQUM7QUFDaEUsY0FBYyxtQ0FBbUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vY29yZS5jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGktc2VydmljZS1yZXN1bHQnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGktc2VydmljZS1lcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJztcblxuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIGNvbnN0YW50cyBhbmQgb3BlcmF0b3JzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL2tub3JhLWNvbnN0YW50cyc7XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3Igc2hhcmVkIG9iamVjdHNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvc2hhcmVkL3N0cmluZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvc2hhcmVkL2RhdGUnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIGF1dGhlbnRpY2F0aW9uXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLXJlcXVlc3QtcGF5bG9hZCc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3IgZ3JvdXBzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2dyb3Vwcy9ncm91cCc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vZ3JvdXBzL2dyb3Vwcy1yZXNwb25zZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBsaXN0c1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0JztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mbyc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLXJlc3BvbnNlJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2xpc3RzL2xpc3QtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdC1jcmVhdGUtcGF5bG9hZCc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tdXBkYXRlLXBheWxvYWQnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3Igb250b2xvZ2llc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9vbnRvbG9naWVzL29udG9sb2d5LWluZm8tc2hvcnQnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIHBlcm1pc3Npb25zXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL3Blcm1pc3Npb25zL3Blcm1pc3Npb24tZGF0YSc7XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3IgcHJvamVjdHNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdCc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC1yZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0cy1yZXNwb25zZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3Igc3RvcmVcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vc3RvcmUvcmRmLWRhdGEtb2JqZWN0JztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL3N0b3JlL3Jlc2V0LXRyaXBsZXN0b3JlLWNvbnRlbnQtcmVzcG9uc2UnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIHVzZXJzXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vdXNlcnMvdXNlcnMtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vdXNlcnMvdXNlci1yZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi91c2Vycy91c2VyJztcblxuLyoqXG4gKiBJbnRlcmZhY2VzIGZvciBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL3YyL3Byb3BlcnRpZXMvcmVhZC1wcm9wZXJ0aWVzJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL3YyL3Byb3BlcnRpZXMvcmVhZC1wcm9wZXJ0eS1pdGVtJztcblxuLyoqXG4gKiBJbnRlcmZhY2VzIGZvciByZXNvdXJjZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2VzLXNlcXVlbmNlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvdW50IHF1ZXJ5IHJlc3BvbnNlLlxuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9jb3VudC1xdWVyeS9jb3VudC1xdWVyeS1yZXN1bHQnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIHJlc291cmNlc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9zdGlsbC1pbWFnZS9zdGlsbC1pbWFnZS1yZXByZXNlbnRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9zdGlsbC1pbWFnZS9pbWFnZS1yZWdpb24nO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIG9udG9sb2dpZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvdjIvb250b2xvZ3kvbmV3LW9udG9sb2d5JztcbiJdfQ==