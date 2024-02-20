import { AbstractControl, ValidatorFn } from '@angular/forms';

export function imageSizeValidator(maxWidth: number, maxHeight: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null; // Se il campo è vuoto, il validatore non fa nulla
        }

        const img = new Image();
        img.onload = () => {
            const imageWidth = img.width;
            const imageHeight = img.height;

            if (imageWidth > maxWidth || imageHeight > maxHeight) {
                control.setErrors({ 'imageSizeExceeded': true });
               console.log('Errore di validazione:  le dimensioni dell\'immagine non devono superare 1600x1000.');
            } else {
                control.setErrors(null);
            }
        };
        img.src = control.value;

        return null; // Il validatore è asincrono, quindi non restituiamo errori qui
    };
}