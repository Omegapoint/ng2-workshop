import {API_URL} from '../conf';

import {AuthHttp} from '../util/AuthHttp';
import {METHOD} from '../util/method';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll'
import 'rxjs/add/operator/toArray'
import {Injectable} from "@angular/core";
import {LecturesStore, IRating, Lecture} from "./lectures.store";

@Injectable()
export class LecturesService {
  constructor(private _authHttp:AuthHttp) {}

  private transformRating = (ratings) => {
      return ratings.map(rating => <IRating>{id: rating.id, comment: rating.comment, rating: rating.rating, user: rating.user});
  };

  private sortResult = (lectures) => {
      let accFn = (rating) => {
          let rate = rating.reduce( (prev, cur) => { return {rating: prev.rating + cur.rating} }, {rating: 0});
          return rate.rating;
      };
      return lectures.sort((e1, e2) => {
        let rate1 = accFn(e2.rating);
        let rate2 = accFn(e1.rating);
        let rate1_length = e2.rating.length;
        let rate2_length = e1.rating.length;
        rate1 = rate1_length > 0 ? rate1/rate1_length : rate1;
        rate2 = rate2_length > 0 ? rate2/rate2_length : rate2;
        return rate1 - rate2;
      });
  };

  getRatingForLecture(lecture: Lecture) {
    let accFn = (rating) => {
        let rate = rating.reduce( (prev, cur) => { return {rating: prev.rating + cur.rating} }, {rating: 0});
        return rate.rating;
    };
    let rate1 = accFn(lecture.rating);
    return lecture.rating.length > 0 ? rate1/lecture.rating.length : rate1;
  }

  getLectures() {
    let result = this._authHttp.request(METHOD.GET, API_URL + '/lectures');
    return result
      .map(res => res.json());
      //.mergeAll()
      //.map(lecture => {
          //<Lecture>{id: lecture.id, name: lecture.name, description: lecture.description, collapsed: true,
          //    rating: this.transformRating(lecture.rating)}


      //})
      //.toArray()
      //.map(lectures => this.sortResult(lectures));
  }

  getLectureById(id: number) {
    let result = this._authHttp.request(METHOD.GET, `${API_URL}/lectures/${id}`);
    return result.map(res => res.json());
  }

  addRating(id: number, rating: IRating) {
    var body = "comment=" + rating.comment + "&rating=" + rating.rating;
    return this._authHttp.request(METHOD.PUT, API_URL + '/lectures/' + id + '/rating', body);
  }

  deleteRating(id: number, rating: IRating) {
    return this._authHttp.request(METHOD.DELETE, `${API_URL}/lectures/${id}/rating/${rating.id}`);
  }

  sortLectures(lectures) {
      return this.sortResult(lectures);
  }
}
