import * as tslib_1 from "tslib";
import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
export var KuiCoreConfigToken = new InjectionToken('KuiCoreConfigToken (knora.core.config)');
var KuiCoreModule = /** @class */ (function () {
    function KuiCoreModule() {
    }
    KuiCoreModule_1 = KuiCoreModule;
    /**
     *
     * @param {KuiCoreConfig} config
     * @returns {ModuleWithProviders}
     */
    KuiCoreModule.forRoot = function (config) {
        // get the app environment configuration here
        // console.log('KuiCoreModule - forRoot - config: ', config);
        return {
            ngModule: KuiCoreModule_1,
            providers: [
                { provide: KuiCoreConfigToken, useValue: config }
            ]
        };
    };
    var KuiCoreModule_1;
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
    return KuiCoreModule;
}());
export { KuiCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLGNBQWMsQ0FBZ0Isd0NBQXdDLENBQUMsQ0FBQztBQVk5RztJQUFBO0lBZ0JBLENBQUM7c0JBaEJZLGFBQWE7SUFDdEI7Ozs7T0FJRztJQUNJLHFCQUFPLEdBQWQsVUFBZSxNQUFxQjtRQUNoQyw2Q0FBNkM7UUFDN0MsNkRBQTZEO1FBQzdELE9BQU87WUFDSCxRQUFRLEVBQUUsZUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1AsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQzthQUNsRDtTQUNKLENBQUM7SUFDTixDQUFDOztJQWZRLGFBQWE7UUFWekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osZ0JBQWdCO2FBQ25CO1lBQ0QsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFFO2dCQUNMLGdCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxhQUFhLENBZ0J6QjtJQUFELG9CQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FoQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5leHBvcnQgY29uc3QgS3VpQ29yZUNvbmZpZ1Rva2VuID0gbmV3IEluamVjdGlvblRva2VuPEt1aUNvcmVDb25maWc+KCdLdWlDb3JlQ29uZmlnVG9rZW4gKGtub3JhLmNvcmUuY29uZmlnKScpO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgS3VpQ29yZU1vZHVsZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0t1aUNvcmVDb25maWd9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtNb2R1bGVXaXRoUHJvdmlkZXJzfVxuICAgICAqL1xuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogS3VpQ29yZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICAvLyBnZXQgdGhlIGFwcCBlbnZpcm9ubWVudCBjb25maWd1cmF0aW9uIGhlcmVcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0t1aUNvcmVNb2R1bGUgLSBmb3JSb290IC0gY29uZmlnOiAnLCBjb25maWcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEt1aUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogS3VpQ29yZUNvbmZpZ1Rva2VuLCB1c2VWYWx1ZTogY29uZmlnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==