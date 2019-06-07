import { OnChanges } from '@angular/core';
import { ReadListValue } from '@knora/core';
import { ListCacheService, ListNodeV2 } from '@knora/core';
import { Observable } from 'rxjs';
export declare class ListValueComponent implements OnChanges {
    private _listCacheService;
    valueObject: ReadListValue;
    private _listValueObj;
    node: Observable<ListNodeV2>;
    constructor(_listCacheService: ListCacheService);
    ngOnChanges(): void;
}
