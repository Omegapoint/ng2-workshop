
import {USER, PASSWORD, API_URL} from '../conf';
import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from "angular2/http";
import {METHOD} from './method';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthHttp {

  constructor(private _http:Http) {}

  request(method: METHOD, url: string, body?: any) {
    let token = Cookie.getCookie('auth-token');
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    switch (method) {
      case METHOD.GET:
        return this.get(url, headers);
      case METHOD.PUT:
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.put(url, headers, body);
      case METHOD.DELETE:
        return this.delete(url, headers);
    }
  }

  private get(url, headers) {
      return this._http.get(url, {
        headers: headers
      });
  }

  private put(url, headers, body) {
      return this._http.put(url, body, {
        headers: headers
      });
  }

  private delete(url, headers) {
    this._http.delete
    return this._http.delete(url, {
      headers: headers
    });
  }

}
