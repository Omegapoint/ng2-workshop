import {API_URL} from '../conf';
import {Injectable} from 'angular2/core';
import {Http, Headers, Response, HTTP_PROVIDERS} from "angular2/http";
import {Movie} from './movie';
import {IRating} from './rating';
import {RestResource} from '../util/RestResource';
import {METHOD} from '../util/method';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/operator/toArray'

@Injectable()
export class MoviesService {
  constructor(private _http:Http, private _restResource:RestResource) {}

  private transformRating = (rating) => {
      if (!rating) {
        return <IRating>{rating: 1};
      } else {
        return <IRating>{comment: rating.comment, rating: rating.rating};
      }
  };

  private sortResult = (movies) => {
      return movies.sort((e1, e2) => e2.rating.rating - e1.rating.rating);
  };

  getMovies() {
    let result = this._restResource.request(METHOD.GET, API_URL + '/movies');
    return result
      .map(res => res.json())
      .mergeAll()
      .map(movie => <Movie>{id: movie.id, name: movie.name, description: movie.description, collapsed: true,
         rating: this.transformRating(movie.rating)})
      .toArray()
      .map(movies => this.sortResult(movies));
  }

  addRating(id: number, rating: IRating) {
    var body = "comment=" + rating.comment + "&rating=" + rating.rating;
    /*var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(API_URL + '/movies/' + id + '/rating', body, {
      headers: headers
    });*/
    return this._restResource.request(METHOD.PUT, API_URL + '/movies/' + id + '/rating', body);
  }
}
