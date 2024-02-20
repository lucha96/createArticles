import { AbstractControl, ValidatorFn } from '@angular/forms';

//validatore per controllare che si possa inserire solo 1 immagine
export function SingleImageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const files: File[] = control.value;
        
        if (!files || files.length !== 1) {
            return { 'singleImageError': true };
        }
        
        return null;
    };
}