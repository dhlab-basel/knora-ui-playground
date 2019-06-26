import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ActionPgComponent } from './action-pg/action-pg.component';
import { AuthenticationPgComponent } from './authentication-pg/authentication-pg.component';
import { ViewerPgComponent } from './viewer-pg/viewer-pg.component';
import { OntologyPgComponent } from './ontology-pg/ontology-pg.component';
import { SearchPgComponent } from './search-pg/search-pg.component';
// import { SearchResultsComponent } from '@knora/viewer';
import { SearchResultComponent } from './search-pg/search-result/search-result.component';
import { NewSearchPgComponent } from './new-search-pg/new-search-pg.component';


const appRoutes: Routes = [
    {
        path: 'action',
        component: ActionPgComponent
    },
    {
        path: 'authentication',
        component: AuthenticationPgComponent
    },
    {
        path: 'resource/:id',
        component: ViewerPgComponent
    },
    {
        path: 'search',
        component: SearchPgComponent,
        children: [
            {
                path: ':mode/:q/:project',
                component: SearchResultComponent
            },
            {
                path: ':mode/:q',
                component: SearchResultComponent
            }
        ]
    },
    {
        path: 'authentication',
        component: AuthenticationPgComponent
    },
    {
        path: 'viewer',
        component: ViewerPgComponent
    },
    {
        path: 'ontology',
        component: OntologyPgComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})

export class AppRouting {
}
