import { EventEmitter, OnInit } from '@angular/core';
import { ListNodeV2 } from '@knora/core';
import { MatMenuTrigger } from '@angular/material';
export declare class ListDisplayComponent implements OnInit {
    children: ListNodeV2[];
    selectedNode: EventEmitter<ListNodeV2>;
    childMenu: MatMenuTrigger;
    constructor();
    ngOnInit(): void;
    setValue(item: ListNodeV2): void;
}
