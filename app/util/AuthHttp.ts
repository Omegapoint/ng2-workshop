
import {Cookie} from 'ng2-cookies/ng2-cookies';


import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {METHOD} from "./method";

@Injectable()
export class AuthHttp {

  constructor(private _http:Http) {}

  request(method: METHOD, url: string, body?: any) {
    let token = Cookie.get('auth-token');
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
    return this._http.delete(url, {
      headers: headers
    });
  }

}
