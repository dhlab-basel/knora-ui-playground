import { OnChanges } from '@angular/core';
import { ReadUriValue } from '@knora/core';
export declare class UriValueComponent implements OnChanges {
    valueObject: ReadUriValue;
    label?: string;
    private __uriValueObj;
    displayString: string;
    constructor();
    ngOnChanges(): void;
}
