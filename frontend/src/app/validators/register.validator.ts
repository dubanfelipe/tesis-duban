import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const verifyPasswords: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
  return form.get('Password').value === form.get('PasswordConfirm').value ? null : {'notEquals': true};
};