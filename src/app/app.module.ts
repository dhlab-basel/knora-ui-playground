import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MarkdownModule } from 'ngx-markdown';

import { RouterModule } from '@angular/router';
import { AppRouting } from './app-routing';
import { AppComponent } from './app.component';

import { ViewerPgComponent } from './viewer-pg/viewer-pg.component';
import { SearchPgComponent } from './search-pg/search-pg.component';
import { SearchResultComponent } from './search-pg/search-result/search-result.component';
import { OntologyPgComponent } from './ontology-pg/ontology-pg.component';
import { AuthenticationPgComponent } from './authentication-pg/authentication-pg.component';

// import the knora-ui modules
import { KuiActionModule } from '@knora/action';
import { KuiCoreModule, KuiCoreConfigToken } from '@knora/core';
import { KuiSearchModule } from '@knora/search';
import { KuiViewerModule, SearchResultsComponent } from '@knora/viewer';
import { KuiAuthenticationModule } from '@knora/authentication';

import { AppInitService } from './app-init.service';
import { ActionPgComponent } from './action-pg/action-pg.component';
import { NewSearchPgComponent } from './new-search-pg/new-search-pg.component';

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    ViewerPgComponent,
    SearchPgComponent,
    SearchResultComponent,
    OntologyPgComponent,
    AuthenticationPgComponent,
    ActionPgComponent,
    NewSearchPgComponent
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
      provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true
    },
    {
      provide: KuiCoreConfigToken, useFactory: () => AppInitService.coreConfig
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
