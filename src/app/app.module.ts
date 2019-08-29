import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// import the knora-ui modules
import { KuiActionModule } from '@knora/action';
import { KuiAuthenticationModule } from '@knora/authentication';
import { KuiCoreConfigToken, KuiCoreModule } from '@knora/core';
import { KuiSearchModule } from '@knora/search';
import { KuiViewerModule } from '@knora/viewer';
import { MarkdownModule } from 'ngx-markdown';
import { ActionPgComponent } from './action-pg/action-pg.component';
import { AppInitService } from './app-init.service';
import { AppRouting } from './app-routing';
import { AppComponent } from './app.component';
import { AuthenticationPgComponent } from './authentication-pg/authentication-pg.component';
import { MaterialModule } from './material-module';
import { NewSearchPgComponent } from './new-search-pg/new-search-pg.component';
import { OntologyPgComponent } from './ontology-pg/ontology-pg.component';
import { SearchPgComponent } from './search-pg/search-pg.component';
import { SearchResultComponent } from './search-pg/search-result/search-result.component';
import { ViewerPgComponent } from './viewer-pg/viewer-pg.component';
import { PropertyPgComponent } from './property-pg/property-pg.component';

export function initializeApp(appInitService: AppInitService) {
    return (): Promise<any> => {
        return appInitService.Init();
    };
}

@NgModule({
    declarations: [
        AppComponent,
        ViewerPgComponent,
        SearchPgComponent,
        SearchResultComponent,
        OntologyPgComponent,
        AuthenticationPgComponent,
        ActionPgComponent,
        NewSearchPgComponent,
        PropertyPgComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRouting,
        MaterialModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        KuiActionModule,
        KuiCoreModule,
        KuiSearchModule,
        KuiViewerModule,
        KuiAuthenticationModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        OverlayModule
    ],
    entryComponents: [

    ],
    providers: [
        AppInitService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppInitService],
            multi: true
        },
        {
            provide: KuiCoreConfigToken,
            useFactory: () => AppInitService.coreConfig
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                hasBackdrop: false
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
