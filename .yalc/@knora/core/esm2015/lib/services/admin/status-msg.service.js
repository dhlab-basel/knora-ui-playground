import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KuiCoreConfigToken } from '../../core.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../core.module";
let StatusMsgService = class StatusMsgService {
    constructor(_http, config) {
        this._http = _http;
        this.config = config;
    }
    /**
    * this method get the status messages from the statusMsg.json file
    * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
    *
    */
    getStatusMsg() {
        return this._http.get(this.config.app + '/assets/i18n/statusMsg.json')
            .pipe(map((res) => {
            return res;
        }, err => {
            console.error(err);
        }));
    }
};
StatusMsgService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.KuiCoreConfigToken)); }, token: StatusMsgService, providedIn: "root" });
StatusMsgService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(KuiCoreConfigToken)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], StatusMsgService);
export { StatusMsgService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLW1zZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBS3ZELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRTNCLFlBQW9CLEtBQWlCLEVBQ0EsTUFBTTtRQUR2QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ0EsV0FBTSxHQUFOLE1BQU0sQ0FBQTtJQUMzQyxDQUFDO0lBRUQ7Ozs7O01BS0U7SUFDRixZQUFZO1FBRVYsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyw2QkFBNkIsQ0FBQzthQUNuRSxJQUFJLENBQUMsR0FBRyxDQUNQLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDWCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtZQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUNGLENBQ0EsQ0FBQztJQUVOLENBQUM7Q0FDRixDQUFBOztBQTFCWSxnQkFBZ0I7SUFINUIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztJQUlHLG1CQUFBLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBOzZDQURGLFVBQVU7R0FGMUIsZ0JBQWdCLENBMEI1QjtTQTFCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZ1Rva2VuIH0gZnJvbSAnLi4vLi4vY29yZS5tb2R1bGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNNc2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoS3VpQ29yZUNvbmZpZ1Rva2VuKSBwdWJsaWMgY29uZmlnKSB7XG4gIH1cblxuICAvKipcbiAgKiB0aGlzIG1ldGhvZCBnZXQgdGhlIHN0YXR1cyBtZXNzYWdlcyBmcm9tIHRoZSBzdGF0dXNNc2cuanNvbiBmaWxlXG4gICogd2hpY2ggYXJlIGRlZmluZWQgaGVyZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9IVFRQX3N0YXR1c19jb2Rlc1xuICAqIGFuZCBoZXJlOiBodHRwOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9yZWZfaHR0cG1lc3NhZ2VzLmFzcFxuICAqXG4gICovXG4gIGdldFN0YXR1c01zZygpOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuY29uZmlnLmFwcCArICcvYXNzZXRzL2kxOG4vc3RhdHVzTXNnLmpzb24nKVxuICAgICAgLnBpcGUobWFwKFxuICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgKTtcblxuICB9XG59XG4iXX0=