import {API_URL} from '../conf';
import {Injectable} from 'angular2/core';
import {Http, Headers, Response, HTTP_PROVIDERS} from "angular2/http";
import {Movie} from './movie';

import 'rxjs/add/operator/map';

@Injectable()
export class MoviesService {
  constructor(private _http:Http) {}

  getMovies() {
    return null;
  }

}
