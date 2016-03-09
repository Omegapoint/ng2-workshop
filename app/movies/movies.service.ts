import {API_URL} from '../conf';
import {Injectable} from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from "angular2/http";

import 'rxjs/add/operator/map';

@Injectable()
export class MoviesService {
  constructor(private _http:Http) {}

  getMovies() {
    let result = this._http.get(API_URL + '/movies');
    return result.map(res => res.json());
  }

}
