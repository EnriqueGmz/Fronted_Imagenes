import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static passwordCheck(password: string, confirmPassword: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(password);
      const checkControl = controls.get(confirmPassword);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(confirmPassword)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
