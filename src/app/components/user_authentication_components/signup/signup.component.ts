import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper_service/helper-service.service';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signup_email_ngmodel: string = '';
  signup_password_ngmodel: string = '';
  error_in_email: boolean = false;
  error_in_password: boolean = false;
  password_visible: boolean = false;
  password_visibility_switch_icon: string = 'visibility';

  signup_form = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    ])
  })

  constructor(private helper_service: HelperService) { }

  toggle_password_visibility() {
    if (this.password_visible) {
      this.password_visible = false;
      this.password_visibility_switch_icon = 'visibility';
    } else {
      this.password_visible = true;
      this.password_visibility_switch_icon = 'visibility_off';
    }
  }

  validate_signup_form(signup_form_data: user_form_fields_interface): void {
    this.signup_form.patchValue(Object(signup_form_data));
    if (this.signup_form.controls.email.invalid) {
      this.error_in_email = true;
      this.helper_service.open_snack_bar('Invalid form details!');
    } else this.error_in_email = false;
    if (this.signup_form.controls.password.invalid) {
      this.error_in_password = true;
      this.helper_service.open_snack_bar('Invalid form details!');
    } else this.error_in_password = false;
  }

  signup_form_submit(): void {
    let signup_form_data: user_form_fields_interface = {
      email: this.signup_email_ngmodel,
      password: this.signup_password_ngmodel
    }
    this.validate_signup_form(signup_form_data);
  }
}
