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
export * from './api/admin/lists/list-node-response';
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
export * from './api/v2/representations/audio-representation';
export * from './api/v2/representations/fileRepresentation';
export * from './api/v2/representations/moving-image-representation';
export * from './api/v2/representations/still-image-representation';
export * from './api/v2/representations/region';
export * from './api/v2/representations/sequence';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxjQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGNBQWMsU0FBUyxDQUFDO0FBR3hCOztHQUVHO0FBQ0gsY0FBYyx1QkFBdUIsQ0FBQztBQUV0Qzs7R0FFRztBQUNILGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyxtQkFBbUIsQ0FBQztBQU1sQyxjQUFjLG9EQUFvRCxDQUFDO0FBRW5FOztHQUVHO0FBQ0gsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxjQUFjLG1DQUFtQyxDQUFDO0FBQ2xELGNBQWMsb0NBQW9DLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxjQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLGNBQWMsNkJBQTZCLENBQUM7QUFDNUMsY0FBYyxzQ0FBc0MsQ0FBQztBQUNyRCxjQUFjLDZCQUE2QixDQUFDO0FBQzVDLGNBQWMsa0NBQWtDLENBQUM7QUFDakQsY0FBYywyQ0FBMkMsQ0FBQztBQUUxRCxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsc0NBQXNDLENBQUM7QUFDckQsY0FBYyxrQ0FBa0MsQ0FBQztBQUlqRDs7R0FFRztBQUNILGNBQWMsNENBQTRDLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxjQUFjLHlDQUF5QyxDQUFDO0FBRXhEOztHQUVHO0FBQ0gsY0FBYyw4QkFBOEIsQ0FBQztBQUM3QyxjQUFjLCtDQUErQyxDQUFDO0FBQzlELGNBQWMsdUNBQXVDLENBQUM7QUFDdEQsY0FBYyx3Q0FBd0MsQ0FBQztBQVF2RDs7R0FFRztBQUVILGNBQWMsa0NBQWtDLENBQUM7QUFDakQsY0FBYyxpQ0FBaUMsQ0FBQztBQUNoRCxjQUFjLHdCQUF3QixDQUFDO0FBTXZDLGNBQWMsd0NBQXdDLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxjQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGNBQWMsNENBQTRDLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxjQUFjLHlDQUF5QyxDQUFDO0FBRXhEOztHQUVHO0FBQ0gsY0FBYywrQ0FBK0MsQ0FBQztBQUM5RCxjQUFjLDZDQUE2QyxDQUFDO0FBQzVELGNBQWMsc0RBQXNELENBQUM7QUFDckUsY0FBYyxxREFBcUQsQ0FBQztBQUNwRSxjQUFjLGlDQUFpQyxDQUFDO0FBQ2hELGNBQWMsbUNBQW1DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tICcuL2NvcmUuY29uZmlnJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpLXNlcnZpY2UtcmVzdWx0JztcbmV4cG9ydCAqIGZyb20gJy4vYXBpLXNlcnZpY2UtZXJyb3InO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscyc7XG5cblxuLyoqXG4gKiBJbnRlcmZhY2VzIGZvciBjb25zdGFudHMgYW5kIG9wZXJhdG9yc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIHNoYXJlZCBvYmplY3RzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL3NoYXJlZC9zdHJpbmdzJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL3NoYXJlZC9kYXRlJztcblxuLyoqXG4gKiBJbnRlcmZhY2VzIGZvciBhdXRoZW50aWNhdGlvblxuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXF1ZXN0LXBheWxvYWQnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24tcmVzcG9uc2UnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIGdyb3Vwc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLXJlc3BvbnNlJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgbGlzdHNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdCc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8nO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdC1pbmZvLXJlc3BvbnNlJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZSc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mbyc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtdXBkYXRlLXBheWxvYWQnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vbGlzdHMvbGlzdC1jcmVhdGUtcGF5bG9hZCc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tdXBkYXRlLXBheWxvYWQnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3Igb250b2xvZ2llc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9vbnRvbG9naWVzL29udG9sb2d5LWluZm8tc2hvcnQnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIHBlcm1pc3Npb25zXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL3Blcm1pc3Npb25zL3Blcm1pc3Npb24tZGF0YSc7XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3IgcHJvamVjdHNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdCc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC1yZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0cy1yZXNwb25zZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3Igc3RvcmVcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vc3RvcmUvcmRmLWRhdGEtb2JqZWN0JztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL2FkbWluL3N0b3JlL3Jlc2V0LXRyaXBsZXN0b3JlLWNvbnRlbnQtcmVzcG9uc2UnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIHVzZXJzXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vdXNlcnMvdXNlcnMtcmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvYWRtaW4vdXNlcnMvdXNlci1yZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL2FwaS9hZG1pbi91c2Vycy91c2VyJztcblxuLyoqXG4gKiBJbnRlcmZhY2VzIGZvciBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYXBpL3YyL3Byb3BlcnRpZXMvcmVhZC1wcm9wZXJ0aWVzJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL3YyL3Byb3BlcnRpZXMvcmVhZC1wcm9wZXJ0eS1pdGVtJztcblxuLyoqXG4gKiBJbnRlcmZhY2VzIGZvciByZXNvdXJjZXNcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2VzLXNlcXVlbmNlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvdW50IHF1ZXJ5IHJlc3BvbnNlLlxuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9jb3VudC1xdWVyeS9jb3VudC1xdWVyeS1yZXN1bHQnO1xuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIHJlc291cmNlc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9yZXByZXNlbnRhdGlvbnMvYXVkaW8tcmVwcmVzZW50YXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9hcGkvdjIvcmVwcmVzZW50YXRpb25zL2ZpbGVSZXByZXNlbnRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9yZXByZXNlbnRhdGlvbnMvbW92aW5nLWltYWdlLXJlcHJlc2VudGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL3YyL3JlcHJlc2VudGF0aW9ucy9zdGlsbC1pbWFnZS1yZXByZXNlbnRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9yZXByZXNlbnRhdGlvbnMvcmVnaW9uJztcbmV4cG9ydCAqIGZyb20gJy4vYXBpL3YyL3JlcHJlc2VudGF0aW9ucy9zZXF1ZW5jZSc7XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3Igb250b2xvZ2llc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS92Mi9vbnRvbG9neS9uZXctb250b2xvZ3knO1xuIl19