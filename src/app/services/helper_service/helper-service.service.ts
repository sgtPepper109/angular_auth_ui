import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  authentication_details_form = new FormGroup({
    Email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    Password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    ])
  })

  constructor(private _snack_bar: MatSnackBar) { }

  open_snack_bar(message: string): void {
    this._snack_bar.open(message, '\u274c', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}
