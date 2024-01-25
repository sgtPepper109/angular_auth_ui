import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user_form_fields_interface } from 'src/app/interfaces/all_interfaces';
import { environment_dev } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  _env = environment_dev
  constructor(private _http: HttpClient) { }

  authenticate_user(userObj: Object): Observable<Object> {
    return this._http.post<user_form_fields_interface>(`${this._env.base_api_url}/api/User/authenticate`, userObj);
  }

  signup_user(userObj: Object): Observable<Object> {
    return this._http.post<user_form_fields_interface>(`${this._env.base_api_url}/api/User/register`, userObj)
  }
}
