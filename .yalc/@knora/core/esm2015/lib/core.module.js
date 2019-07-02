import * as tslib_1 from "tslib";
var KuiCoreModule_1;
import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
export const KuiCoreConfigToken = new InjectionToken('KuiCoreConfigToken (knora.core.config)');
let KuiCoreModule = KuiCoreModule_1 = class KuiCoreModule {
    /**
     *
     * @param {KuiCoreConfig} config
     * @returns {ModuleWithProviders}
     */
    static forRoot(config) {
        // get the app environment configuration here
        // console.log('KuiCoreModule - forRoot - config: ', config);
        return {
            ngModule: KuiCoreModule_1,
            providers: [
                { provide: KuiCoreConfigToken, useValue: config }
            ]
        };
    }
};
KuiCoreModule = KuiCoreModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            HttpClientModule
        ],
        declarations: [],
        exports: [
            HttpClientModule
        ]
    })
], KuiCoreModule);
export { KuiCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQWdCLHdDQUF3QyxDQUFDLENBQUM7QUFZOUcsSUFBYSxhQUFhLHFCQUExQixNQUFhLGFBQWE7SUFDdEI7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDaEMsNkNBQTZDO1FBQzdDLDZEQUE2RDtRQUM3RCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGVBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNQLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7YUFDbEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUE7QUFoQlksYUFBYTtJQVZ6QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osZ0JBQWdCO1NBQ25CO1FBQ0QsWUFBWSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxFQUFFO1lBQ0wsZ0JBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLGFBQWEsQ0FnQnpCO1NBaEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGNvbnN0IEt1aUNvcmVDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxLdWlDb3JlQ29uZmlnPignS3VpQ29yZUNvbmZpZ1Rva2VuIChrbm9yYS5jb3JlLmNvbmZpZyknKTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEt1aUNvcmVNb2R1bGUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtLdWlDb3JlQ29uZmlnfSBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7TW9kdWxlV2l0aFByb3ZpZGVyc31cbiAgICAgKi9cbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEt1aUNvcmVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBhcHAgZW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBoZXJlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdLdWlDb3JlTW9kdWxlIC0gZm9yUm9vdCAtIGNvbmZpZzogJywgY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBLdWlDb3JlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IEt1aUNvcmVDb25maWdUb2tlbiwgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=