
import {USER, PASSWORD, API_URL} from '../conf';
import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from "angular2/http";
import {METHOD} from './method';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class RestResource {

  constructor(private _http:Http) {}

  request(method: METHOD, url: string, body?: any) {

    return Observable.fromPromise<Response>(this.authenticate().then(token => {
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        switch (method) {
          case METHOD.GET:
            return this.get(url, headers).toPromise();
          case METHOD.PUT:
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.put(url, headers, body).toPromise();
        }
    }));
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

  private authenticate() {
    return new Promise<string>((resolve, reject) => {
      let cookie = Cookie.getCookie('auth-token');
      if (cookie != null) {
        resolve(cookie);
      } else {
        var body = "user_id=" + USER + "&password=" + PASSWORD;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this._http.post(API_URL + '/authenticate', body, {
          headers: headers
        })
        .map(response => response.json())
        .subscribe(result => {
            Cookie.setCookie('auth-token', result.token);
            resolve(result.token);
        });
      }
    });
  }
}
