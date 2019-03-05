import { Injectable } from '@angular/core';
import { KuiCoreConfig } from '@knora/core';


export interface IAppConfig {
    ontologyIRI: string;
    apiURL: string;
    externalApiURL: string;
    iiifURL: string;
    appURL: string;
    appName: string;
    localData: string;
    pagingLimit: number;
    startComponent: string;
}

@Injectable()
export class AppInitService {

    static settings: IAppConfig;
    static coreConfig: KuiCoreConfig;

    constructor() {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            // console.log('AppInitService.init() called');
            // do your initialisation stuff here

            console.log('AppInitService - Init');

            const data = window['tempConfigStorage'] as IAppConfig;
            
            AppInitService.settings = data;

            console.log('AppInitService - Init - data: ', data);

            AppInitService.coreConfig = {
                name: AppInitService.settings.appName,
                api: AppInitService.settings.apiURL,
                media: AppInitService.settings.iiifURL,
                app: AppInitService.settings.appURL
            } as KuiCoreConfig;

            // console.log('AppInitService: finished');

            resolve();
        });
    }
}
