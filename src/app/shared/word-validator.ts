import { AbstractControl, ValidatorFn } from "@angular/forms";


//validatore per contare le parole 
export function WordCountValidator(maxWords: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null; // Se il campo è vuoto, il validatore non fa nulla
        }

        const wordCount = control.value.trim().split(/\s+/).length; // Conta le parole

        return wordCount > maxWords ? { 'maxWordsExceeded': { value: control.value } } : null;
    };
}