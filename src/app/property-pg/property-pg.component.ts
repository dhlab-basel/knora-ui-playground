import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { StringLiteral } from '@knora/core';
import { Session } from '@knora/authentication';

@Component({
    selector: 'kuip-property-pg',
    templateUrl: './property-pg.component.html',
    styleUrls: ['./property-pg.component.scss']
})
export class PropertyPgComponent implements OnInit {

    languages: string[] = ['de', 'fr', 'it', 'en'];

    /**
     * placeholder label
     */
    @Input() placeholder?: string = 'Label';

    /**
     * predefined (selected) language
     */
    @Input() language?: string;

    /**
     * form field type: 'input' or 'textarea'
     */
    @Input() type?: string = 'input';

    /**
     * form field value of type StringLiteral[]
     */
    @Input() value?: StringLiteral[] = [];

    /**
     * returns an array of StringLiteral
     */
    @Output() dataChanged: EventEmitter<StringLiteral[]> = new EventEmitter<StringLiteral[]>();

    @ViewChild('textInput', { static: true }) textInput: ElementRef;

    @ViewChild('btnToSelectLanguage', { static: true }) selectLanguage: MatMenuTrigger;

    form: FormGroup;

    constructor (
        private _fb: FormBuilder
    ) {


        // set selected language, if it's not defined yet
        if (!this.language) {
            if (localStorage.getItem('session') !== null) {
                // get language from the logged-in user profile data
                this.language = JSON.parse(localStorage.getItem('session')).user.lang;
            } else {
                // get default language from browser
                this.language = navigator.language.substr(0, 2);
            }
        }

        // does the defined language exists in our supported languages list?
        if (this.languages.indexOf(this.language) === -1) {
            // if not, select the first language from our list of supported languages
            this.language = this.languages[0];
        }

        /*         if (this.value.length === 0) {
                    this.value.push(
                        {
                            language: this.language,
                            value: ''
                        }
                    );
                } */


    }

    ngOnInit() {

        let currentValue: string = '';

        // get value for selected language
        if (this.value.length === 0) {
            // init value
            this.value.push(
                {
                    language: this.language,
                    value: ''
                }
            );
        } else {
            const index = this.value.findIndex(i => i.language === this.language);
            if (index > -1) {
                currentValue = this.value[index].value;
            }
        }

        // build the form
        this.form = this._fb.group({
            text: new FormControl(
                {
                    value: currentValue,
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


        const index: number = this.value.findIndex(i => i.language === this.language);

        console.log('onValueChanged', this.language + ' - ' + index);

        if (index > 0) {

        }

        if (this.form.controls['text'].value !== '') {
            this.value[index].value = this.form.controls['text'].value;
        }
        /*
        else {
            this.value.splice(index);
        }
        */

        this.dataChanged.emit(this.value);


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

    setValueForLanguage(lang: string) {

        // set value depending on selected language
        const index = this.value.findIndex(i => i.language === lang);

        console.log('setValueForLanguage', lang + ' - ' + index);

        if (index > -1) {
            // value exist for this language --> set value in input field
            this.form.controls['text'].setValue(this.value[index].value);
        } else {
            // add new stringLiteral to value
            this.value.push(
                {
                    language: lang,
                    value: ''
                }
            );
            this.form.controls['text'].setValue('');
        }
    }

    switchFocus(lang: string) {

        // this.resetEmptyValues();

        this.language = lang;


        this.setValueForLanguage(lang);

        // set focus
        this.selectLanguage.closeMenu();
        this.textInput.nativeElement.focus();

        console.log(this.value);
    }

    toggleAll() {
        // open all languages with their values
    }

}
