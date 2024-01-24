import { Component } from '@angular/core';
import { HelperService } from 'src/app/services/helper_service/helper.service';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  password_visible: boolean = false;
  password_visibility_switch_icon: string = 'visibility';
  signup_form = this.helper_service.authentication_details_form;

  constructor(
    private helper_service: HelperService,
    private authentication_service: AuthenticationService
  ) {}

  get Email() {
    return this.signup_form.get('Email');
  }

  get Password() {
    return this.signup_form.get('Password');
  }


  toggle_password_visibility() {
    if (this.password_visible) {
      this.password_visible = false;
      this.password_visibility_switch_icon = 'visibility';
    } else {
      this.password_visible = true;
      this.password_visibility_switch_icon = 'visibility_off';
    }
  }
  signup_form_submit(): void {
    if (this.helper_service.is_valid_form(this.signup_form)) {
      this.authentication_service.authenticate_user(this.signup_form.value).subscribe({
        next: (response) => { console.log('response, ', response); },
        error: (error: HttpErrorResponse) => { console.log('error, ', error) },
        complete: () => { console.log('completed, '); }
      })
    }
    // let signup_form_data: user_form_fields_interface = {
    //   Email: this.signup_email_ngmodel,
    //   Password: this.signup_password_ngmodel
    // }
    // if (this.valid_signup_form(signup_form_data)) {
    //   this.authentication_service.signup_user(signup_form_data);
    // }
  }
}
