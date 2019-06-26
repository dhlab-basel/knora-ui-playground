import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListNodeV2, Property, PropertyValue, Value } from '@knora/core';
import { ListCacheService } from '@knora/core';
import { MatMenuTrigger } from '@angular/material';
export declare class ListValueComponent implements OnInit, OnDestroy, PropertyValue {
    private fb;
    private _listCacheService;
    formGroup?: FormGroup;
    type: string;
    form: FormGroup;
    property?: Property;
    listRootNode: ListNodeV2;
    selectedNode: ListNodeV2;
    menuTrigger: MatMenuTrigger;
    constructor(fb: FormBuilder, _listCacheService: ListCacheService);
    private getRootNodeIri;
    ngOnInit(): void;
    ngOnDestroy(): void;
    getValue(): Value;
    getSelectedNode(item: ListNodeV2): void;
}
