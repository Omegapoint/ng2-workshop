import {API_URL} from '../conf';

import {Movie} from './movie';
import {IRating} from './rating';
import {AuthHttp} from '../util/AuthHttp';
import {METHOD} from '../util/method';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/operator/toArray'
import {Injectable} from "@angular/core";

@Injectable()
export class MoviesService {
  constructor(private _authHttp:AuthHttp) {}

  private transformRating = (ratings) => {
      return ratings.map(rating => <IRating>{id: rating.id, comment: rating.comment, rating: rating.rating, user: rating.user});
  };

  private sortResult = (movies) => {
      let accFn = (rating) => {
          let rate = rating.reduce( (prev, cur) => { return {rating: prev.rating + cur.rating} }, {rating: 0});
          return rate.rating;
      };
      return movies.sort((e1, e2) => {
        let rate1 = accFn(e2.rating);
        let rate2 = accFn(e1.rating);
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
    let result = this._authHttp.request(METHOD.GET, API_URL + '/movies');
    return result
      .map(res => res.json())
      .mergeAll()
      .map(movie => <Movie>{id: movie.id, name: movie.name, description: movie.description, collapsed: true,
         rating: this.transformRating(movie.rating)})
      .toArray()
      .map(movies => this.sortResult(movies));
  }

  getMovieById(id: number) {
    let result = this._authHttp.request(METHOD.GET, `${API_URL}/movies/${id}`);
    return result.map(res => res.json());
  }

  addRating(id: number, rating: IRating) {
    var body = "comment=" + rating.comment + "&rating=" + rating.rating;
    return this._authHttp.request(METHOD.PUT, API_URL + '/movies/' + id + '/rating', body);
  }

  deleteRating(id: number, rating: IRating) {
    return this._authHttp.request(METHOD.DELETE, `${API_URL}/movies/${id}/rating/${rating.id}`);
  }
}
