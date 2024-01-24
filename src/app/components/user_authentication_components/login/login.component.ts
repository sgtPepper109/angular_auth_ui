import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper_service/helper-service.service';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_email_ngmodel: string = '';
  login_password_ngmodel: string = '';
  error_in_email: boolean = false;
  error_in_password: boolean = false;
  password_visible: boolean = true;
  password_visibility_switch_icon: string = 'visibility';
  login_form = this.helper_service.authentication_details_form;

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

  validate_login_form(login_form_data: user_form_fields_interface): void {
    this.login_form.patchValue(Object(login_form_data));
    if (this.login_form.controls.Email.invalid) {
      this.error_in_email = true;
      this.helper_service.open_snack_bar('Invalid form details!');
    } else this.error_in_email = false;
    if (this.login_form.controls.Password.invalid) {
      this.error_in_password = true;
      this.helper_service.open_snack_bar('Invalid form details!');
    } else this.error_in_password = false;
  }

  login_form_submit(): void {
    let login_form_data: user_form_fields_interface = {
      Email: this.login_email_ngmodel,
      Password: this.login_password_ngmodel
    }
    this.validate_login_form(login_form_data);
  }
}
