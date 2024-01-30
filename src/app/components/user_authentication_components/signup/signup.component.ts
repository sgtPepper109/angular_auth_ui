import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper_service/helper.service';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password_visible: boolean = false;
  password_visibility_switch_icon: string = 'visibility';
  signup_form: FormGroup = this.helper_service.authentication_details_form;
  signup_success: boolean = false;
  fetching_signup_form_response: boolean = false;

  constructor(
    private _router: Router,
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
    this.fetching_signup_form_response = true;
    if (this.helper_service.is_valid_form(this.signup_form)) {
      this.authentication_service.signup_user(this.signup_form.value).subscribe({
        next: (response) => {
          this.fetching_signup_form_response = false;
          console.log('response, ', response);
          this.signup_form.reset();
          this.signup_success = true;
          this._router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          this.fetching_signup_form_response = false;
          console.log('error, ', error)
        },
        complete: () => {
          this.fetching_signup_form_response = false;
          console.log('completed, ');
        }
      })
    }
  }

  ngOnInit(): void {
    this.signup_form.reset();
  }

}
