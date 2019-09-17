import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { KuiActionModule } from '@knora/action';
import { LoginFormComponent } from './login-form/login-form.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
var KuiAuthenticationModule = /** @class */ (function () {
    function KuiAuthenticationModule() {
    }
    KuiAuthenticationModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                KuiActionModule,
                MatCardModule,
                MatIconModule,
                MatInputModule,
                MatButtonModule,
                MatDialogModule,
                MatFormFieldModule,
                ReactiveFormsModule,
                HttpClientModule
            ],
            declarations: [
                LoginFormComponent
            ],
            exports: [
                LoginFormComponent
            ],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true }
            ]
        })
    ], KuiAuthenticationModule);
    return KuiAuthenticationModule;
}());
export { KuiAuthenticationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2F1dGhlbnRpY2F0aW9uLyIsInNvdXJjZXMiOlsibGliL2F1dGhlbnRpY2F0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQTBCekY7SUFBQTtJQUNBLENBQUM7SUFEWSx1QkFBdUI7UUF4Qm5DLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixnQkFBZ0I7YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysa0JBQWtCO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGtCQUFrQjthQUNyQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7Z0JBQ3JFLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2FBQ25GO1NBQ0osQ0FBQztPQUNXLHVCQUF1QixDQUNuQztJQUFELDhCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTLCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBLdWlBY3Rpb25Nb2R1bGUgfSBmcm9tICdAa25vcmEvYWN0aW9uJztcblxuaW1wb3J0IHsgTG9naW5Gb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi1mb3JtL2xvZ2luLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEp3dEludGVyY2VwdG9yIH0gZnJvbSAnLi9pbnRlcmNlcHRvcnMvand0LmludGVyY2VwdG9yJztcbmltcG9ydCB7IFdpdGhDcmVkZW50aWFsc0ludGVyY2VwdG9yIH0gZnJvbSAnLi9pbnRlcmNlcHRvcnMvd2l0aC1jcmVkZW50aWFscy5pbnRlcmNlcHRvcic7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEt1aUFjdGlvbk1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMb2dpbkZvcm1Db21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTG9naW5Gb3JtQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEp3dEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogV2l0aENyZWRlbnRpYWxzSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgS3VpQXV0aGVudGljYXRpb25Nb2R1bGUge1xufVxuIl19