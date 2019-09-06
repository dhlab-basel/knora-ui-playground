import { Component, OnInit, Inject } from '@angular/core';
import { StringLiteral } from '@knora/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'kuip-property-pg',
    templateUrl: './property-pg.component.html',
    styleUrls: ['./property-pg.component.scss']
})
export class PropertyPgComponent implements OnInit {

    loading: boolean = false;

    // some configurations to simulate the various views and @Inputs

    textarea: boolean = false;
    disabled: boolean = false;

    placeholder: string = 'Labels';

    language: string = 'de';

    predefinedValues: boolean = true;

    values: StringLiteral[];
    labels: StringLiteral[] = [
        {
            'language': 'en',
            'value': ''
        },
        {
            'language': 'de',
            'value': 'Konsole'
        },
        {
            'language': 'fr',
            'value': 'Console'
        },
        {
            'language': 'it',
            'value': ''
        }
    ];

    form: FormGroup;

    constructor (@Inject(FormBuilder) private fb: FormBuilder) { }

    ngOnInit() {

        this.values = (this.predefinedValues ? this.labels : []);

        this.form = this.fb.group({
            // selectSearch: [this.option, Validators.required],
            values: [this.predefinedValues],
            language: [this.language],
            textarea: [this.textarea],
            disabled: [this.disabled]
        });

        this.form.valueChanges.subscribe(data => {

            this.loading = true;
            // this.option = data.selectSearch;


            this.predefinedValues = data.values;
            this.values = (this.predefinedValues ? this.labels : []);
            console.log('pg form changed', this.values);

            this.textarea = data.textarea;
            this.disabled = data.disabled;

            setTimeout(x => this.loading = false);

        });
    }

    handleData(data: StringLiteral[]) {
        this.values = data;

        console.log('data from stringliteral input', data);
    }

}
