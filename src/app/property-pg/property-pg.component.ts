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
     * disable the input field
     */
    @Input() disabled?: boolean = false;

    /**
     * returns an array of StringLiteral
     */
    @Output() dataChanged: EventEmitter<StringLiteral[]> = new EventEmitter<StringLiteral[]>();

    @ViewChild('textInput', { static: true }) textInput: ElementRef;

    @ViewChild('btnToSelectLanguage', { static: true }) btnToSelectLanguage: MatMenuTrigger;

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

    }

    ngOnInit() {


        let gaga = [
            // this.value = [
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

        // reset stringLiterals if they have empty values
        this.value = this.initValues(this.value);

        // build the form
        this.form = this._fb.group({
            text: new FormControl(
                {
                    value: '',
                    disabled: this.disabled
                },
                {
                    updateOn: 'blur'
                }
            )
        });
        // update values on form change
        this.form.valueChanges.subscribe(data => this.onValueChanged());

        this.updateValues(this.language);

    }

    onValueChanged() {
        if (!this.form) {
            return;
        }

        const index: number = this.value.findIndex(i => i.language === this.language);
        if (this.form.controls['text'].value !== null && index > -1) {
            // does the input field has a valid value?
            if (this.form.controls['text'].value.length > 0) {
                // yes
                this.value[index].value = this.form.controls['text'].value;

            } else {
                // no, the value is empty
                this.value.splice(index, 1);
            }
            // console.log('emit data', this.value);
            this.dataChanged.emit(this.value);
        }
    }



    toggleAll() {
        // TODO: open/show all languages with their values
    }

    setLanguage(lang: string) {
        // do we have a value in the input field?
        if (!this.form.controls['text'].value) {
            const index = this.value.findIndex(i => i.language === lang);
            this.value.splice(index, 1);
        }

        if (lang === this.language) {
            // clicked on the same language again
            // do we have a value for the re-selected language?
            this.updateValues(lang);
        } else {


            // update current language
            this.language = lang;

            this.updateValues(lang);

            // close the menu?
            if (this.btnToSelectLanguage.menuOpened) {
                this.btnToSelectLanguage.closeMenu();
            }

        }
        // focus on input field if it isn't readonly (disabled = true);
        if (!this.disabled) {
            this.form.controls['text'].enable();
            this.textInput.nativeElement.focus();
        }


    }

    updateValues(lang: string) {
        // get value from stringLiterals
        const index = this.value.findIndex(i => i.language === lang);

        // does a value for this language exist?
        if (index > -1 && this.value[index].value.length > 0) {
            // yes: update field value
            this.form.controls['text'].setValue(this.value[index].value);

        } else {
            // no: add new StringLiteral to the values
            this.value.push(
                {
                    language: lang,
                    value: ''
                }
            );
            // reset form field
            this.form.controls['text'].reset();
        }
    }

    initValues(stringLiterals: StringLiteral[]): StringLiteral[] {
        const length: number = stringLiterals.length;
        if (length > 0) {
            let index = length - 1;
            while (index >= 0) {
                // remove items with empty value
                if (!stringLiterals[index].value.length) {
                    stringLiterals.splice(index, 1);
                }
                index--;
            }

            // does an item for selected lanuage exists
            if (stringLiterals.findIndex(i => i.language === this.language) === -1) {
                this.language = stringLiterals[0].language;
            }

        } else {
            stringLiterals = [];
        }

        return stringLiterals;
    }

    initLanguageAndValue() {

    }

    existingValue(lang: string): boolean {
        return (this.value.findIndex(i => i.language === lang) > -1);
    }

}
