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

  private transformRating = (ratings) => {
      return ratings.map(rating => <IRating>{comment: rating.comment, rating: rating.rating});
  };

  private sortResult = (movies) => {
      let accFn = (rating) => {
          let rate = rating.reduce( (prev, cur) => { return {rating: prev.rating + cur.rating} }, {rating: 0});
          return rate.rating;
      };
      return movies.sort((e1, e2) => {
        let rate1 = accFn(e2.rating);
        let rate2 = accFn(e1.rating)
        let rate1_length = e2.rating.length;
        let rate2_length = e1.rating.length;
        rate1 = rate1_length > 0 ? rate1/rate1_length : rate1;
        rate2 = rate2_length > 0 ? rate2/rate2_length : rate2;
        return rate1 - rate2;
      });
  };

  getRatingForMovie(movie: Movie) {
    let accFn = (rating) => {
        let rate = rating.reduce( (prev, cur) => { return {rating: prev.rating + cur.rating} }, {rating: 0});
        return rate.rating;
    };
    let rate1 = accFn(movie.rating);
    return movie.rating.length > 0 ? rate1/movie.rating.length : rate1;
  }

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
