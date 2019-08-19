import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StringLiteral } from '@knora/core';

@Component({
    selector: 'kuip-property-pg',
    templateUrl: './property-pg.component.html',
    styleUrls: ['./property-pg.component.scss']
})
export class PropertyPgComponent implements OnInit {

    @Input() placeholder?: string = 'Label';

    @Output() stringLiteral: EventEmitter<StringLiteral[]> = new EventEmitter<StringLiteral[]>();

    focus: boolean = false;

    languages: string[] = [
        'de',
        'fr',
        'it',
        'en'
    ];

    selectedLang: string = this.languages[0];

    values: StringLiteral[] = [];

    form: FormGroup;

    constructor (
        private _fb: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this._fb.group({
            text: new FormControl(
                {
                    value: '',
                    disabled: false
                }
            )
        });

        this.form.valueChanges.subscribe(data => this.onValueChanged());

    }

    onValueChanged() {
        if (!this.form) {
            return;
        }

        const form = this.form;

        // console.log(this.form.controls['input'].value);
        /* Object.keys(this.formErrors).map(field => {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                Object.keys(control.errors).map(key => {
                    this.formErrors[field] += messages[key] + ' ';
                });
            }
        }); */
    }

    setLanguage(lang: string) {
        // this.selectedLang = lang;
        console.log(lang);
    }

    switchFocus() {
        this.focus = true;
        console.log('focus', this.focus);

    }

    toggleAll() {
        // open all languages with their values
    }

}
