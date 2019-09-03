import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { StringLiteral } from '@knora/core';

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


        // let gaga = [
        this.value = [
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
        this.resetValues();

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

        // get value from stringLiterals
        const val = this.getValueFromStringLiteral(this.language);
        this.updateFormField(val);

        // this.setLanguage(this.language);
        //        this.updateValues(this.language);

    }

    onValueChanged() {
        if (!this.form) {
            return;
        }

        this.updateStringLiterals(this.language, this.form.controls['text'].value);

        this.dataChanged.emit(this.value);

        /*
        const val = this.existingValue(this.language);

        if (val) {
            // item exists in stringLiterals
            console.log('update value?');
            console.log(this.value);
            const index: number = this.value.findIndex(i => i.language === this.language);
            if (this.form.controls['text'].value && index > -1) {
                this.value[index].value = this.form.controls['text'].value;
            }
        } {
            // item doesn't exist in stringLiterals
            console.log('no val');
            console.log(this.value);
            this.value.push({
                language: this.language,
                value: this.form.controls['text'].value
            });
        }


        const index: number = this.value.findIndex(i => i.language === this.language);
        if (this.form.controls['text'].value && index > -1) {
            console.log('input has value and item exists');
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
        } else {
            // this.value = this.initValues(this.value);
            this.resetValues();
            this.value.push({
                language: this.language,
                value: ''
            });
            //            console.log('input doesnt have value and item doesnt exist');
        }
        */
    }



    toggleAll() {
        // TODO: open/show all languages with their values
    }

    setLanguage(lang: string) {

        this.language = lang;

        // update form field value / reset in case of no value

        /* let val = this.existingValue(lang);

        console.log(val);


        if (!val) {
            val = '';
            this.value.push({
                language: lang,
                value: val
            });
        }

        this.form.controls['text'].setValue(val); */

        // update value or field name here?
        // this.updateValues(this.language, this.form.controls['text'].value);



        // clean up stringLiterals where value is empty
        // this.value = this.initValues(this.value);


        //        this.value = this.initValues(this.value);
        // set current language

        /*
        if (this.language !== lang) {
            console.log(this.value);
            this.language = lang;
            // this.updateValues(lang);
        }


        /*
                if (lang === this.language) {
                    // clicked on the same language again
                    // do we have a value for the re-selected language?
                    this.updateValues(lang);
                    console.log('do we have to update the stringLiterals?');
                } else {
                    // set current language
                    this.language = lang;

                    this.updateValues(lang);

                    // close the menu?
                    if (this.btnToSelectLanguage.menuOpened) {
                        this.btnToSelectLanguage.closeMenu();
                    }


                }
                */
        // focus on input field if it isn't readonly (disabled = true);
        /* if (!this.disabled) {
            this.form.controls['text'].enable();
            this.textInput.nativeElement.focus();
        } */


    }

    switchFocus() {
        // close the menu
        if (this.btnToSelectLanguage.menuOpen) {
            this.btnToSelectLanguage.closeMenu();
        }

        if (!this.disabled) {
            this.form.controls['text'].enable();
            this.textInput.nativeElement.focus();
        }
    }

    updateFormField(value: string) {
        if (!value) {
            value = '';
        }
        this.form.controls['text'].setValue(value);
    }

    updateStringLiterals(lang: string, value?: string) {
        const index = this.value.findIndex(i => i.language === lang);

        console.log('update value for ' + lang + ' (' + value + ') on position ' + index + ' in ' + JSON.stringify(this.value));

        /*
        if (value && index > 0) {
            console.log('update value');
            this.value[index].value = value;
        } else if (value && index < 0) {
            console.log('add stringLiteral');
            this.value.push({
                language: lang,
                value: value

            });
        } else {
            console.log('delete stringLiteral');
            this.value.splice(index, 1);
        }
        */
    }

    updateValuesDepr(lang: string) {
        // get value from stringLiterals
        const value: string = this.getValueFromStringLiteral(lang);

        // does a value for this language exist?
        if (value) {
            this.form.controls['text'].setValue(value);
        } else {
            if (this.value.findIndex(i => i.language === lang) < 0) {
                this.value.push(
                    {
                        language: lang,
                        value: ''
                    }
                );
            } else {
                console.log('no value for this language');
            }
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

    resetValues() {
        const length: number = this.value.length;

        if (length > 0) {
            let index = length - 1;
            while (index >= 0) {
                // remove items with empty value
                if (!this.value[index].value.length) {
                    this.value.splice(index, 1);
                }
                index--;
            }

            // does an item for selected lanuage exists
            if (this.value.findIndex(i => i.language === this.language) === -1) {
                this.language = this.value[0].language;
            }

        } else {
            this.value = [];
        }
    }

    getValueFromStringLiteral(lang: string): string {

        // console.log('existing value in', this.value);
        // get index for this language
        const index = this.value.findIndex(i => i.language === lang);

        if (this.value[index] && this.value[index].value.length > 0) {
            return this.value[index].value;
        } else {
            return undefined;
        }

    }

}
