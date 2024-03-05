import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private _snack_bar: MatSnackBar,
    private _formbuilder: FormBuilder
  ) {}

  authentication_details_form = this._formbuilder.group({
    Email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    Password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$")
    ])
  })

  is_valid_form(_form: FormGroup): boolean {
    if (_form.controls['Email'].invalid || _form.controls['Password'].invalid) {
        this.open_snack_bar('Invalid form details!');
        return false;
    }
    return true;
  }

  open_snack_bar(message: string): void {
    this._snack_bar.open(message, '\u274c', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}
