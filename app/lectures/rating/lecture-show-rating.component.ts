import { Component } from '@angular/core';
import { IRating } from '../rating';
//noinspection TypeScriptCheckImport
import template from './lecture-show-rating.component.html';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {LecturesService} from "../lectures.service";
import {Lecture} from "../lecture";

@Component({
  selector: 'show-rating',
  template: template,
  providers: [LecturesService]
})
export class LectureShowRatingComponent {
  lecture: Lecture;

  constructor(private _router: Router, private _route: ActivatedRoute, private lecturesService: LecturesService) {}

  private fetchLecture() {
    //TODO: extract the id for the lecture and fetch it using lecturesService
  }

  back() {
    this._router.navigate(['lectures']);
  }

  formatUser(user:string) {
      let first:string = user.charAt(0);
      return first.toUpperCase() + user.substring(1);
  }

  deleteRating(rating:IRating) {
    this.lecturesService.deleteRating(this.lecture.id, rating)
    .subscribe(
      () => this.fetchLecture()
    );
  }
}
