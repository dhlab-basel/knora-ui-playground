import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthenticationPgComponent } from './authentication-pg/authentication-pg.component';
import { ViewerPgComponent } from './viewer-pg/viewer-pg.component';
import { OntologyPgComponent } from './ontology-pg/ontology-pg.component';
import { SearchPgComponent } from './search-pg/search-pg.component';
import { SearchResultsComponent } from '@knora/viewer';


const appRoutes: Routes = [
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
                component: SearchResultsComponent
            },
            {
                path: ':mode/:q',
                component: SearchResultsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting {
}
