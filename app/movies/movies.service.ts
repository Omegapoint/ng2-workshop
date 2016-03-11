import {API_URL} from '../conf';
import {Injectable} from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from "angular2/http";
import {Movie} from './movie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/operator/toArray'

@Injectable()
export class MoviesService {
  constructor(private _http:Http) {}

  getMovies() {
    let result = this._http.get(API_URL + '/movies');
    return result
      .map(res => res.json())
      .mergeAll()
      .map(movie => <Movie>{id: movie.id, name: movie.name, description: movie.description, collapsed: true})
      .toArray()
  }

}
