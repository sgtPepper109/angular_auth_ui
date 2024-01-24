import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { environment_dev } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _http: HttpClient) { }
  _env = environment_dev

  authenticate_user(userObj: Object) {
    return this._http.post<user_form_fields_interface>(`${this._env.base_api_url}/api/User/authenticate`, userObj);
  }

  signup_user(userObj: user_form_fields_interface) {
    this.authenticate_user(userObj).subscribe({
      next: (response) => {
        console.log('response, ', response);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error, ', error)
      },
      complete: () => {
        console.log('completed, ');
        return this._http.post<user_form_fields_interface>(`${this._env.base_api_url}/api/User/register`, userObj)
      }
    });
  }
}
