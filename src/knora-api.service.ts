import { Injectable } from '@angular/core';
import { KnoraApiConnection, KnoraApiConfig } from '@knora/api';
import { V2Endpoint } from '@knora/api/src/api/v2/v2-endpoint';

@Injectable({
    providedIn: 'root'
})
export class KnoraApiService {

    knoraApiConnection: KnoraApiConnection;

    get v2(): V2Endpoint {
        return this.knoraApiConnection.v2;
    }

    constructor () {
        const knoraApiConfig = new KnoraApiConfig('http', '0.0.0.0', 3333);
        this.knoraApiConnection = new KnoraApiConnection(knoraApiConfig);
    }

}
