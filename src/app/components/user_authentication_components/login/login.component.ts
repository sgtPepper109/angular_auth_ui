import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper_service/helper.service';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { AuthenticationService } from 'src/app/services/authentication_service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password_visible: boolean = false;
  password_visibility_switch_icon: string = 'visibility';
  login_form = this.helper_service.authentication_details_form;
  fetching_login_form_response: boolean = false;

  constructor(
    private _router: Router,
    private helper_service: HelperService,
    private authentication_service: AuthenticationService,
  ) {}

  get Email() {
    return this.login_form.get('Email');
  }

  get Password() {
    return this.login_form.get('Password');
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

  login_form_submit(): void {
    this.fetching_login_form_response = true;
    if (this.helper_service.is_valid_form(this.login_form)) {
      this.authentication_service.authenticate_user(this.login_form.value).subscribe({
        next: (response) => {
          console.log('response: ', response);
          this.fetching_login_form_response = false;
          this.login_form.reset();
          this._router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          this.fetching_login_form_response = false;
          console.log('error, ', error)
        },
        complete: () => {
          this.fetching_login_form_response = false;
          console.log('completed, ');
        }
      })
    }
  }

  ngOnInit(): void {
    this.login_form.reset();
  }

}
