import { Component, OnInit } from '@angular/core';

//noinspection TypeScriptCheckImport
import template from './lecture-show-rating.component.html';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {LecturesService} from "../lectures.service";
import {Lecture, IRating} from "../lectures.store";


@Component({
  selector: 'show-rating',
  template: template,
  providers: [LecturesService]
})
export class LectureShowRatingComponent implements OnInit {
  lecture: Lecture;

  constructor(private _router: Router, private _route: ActivatedRoute, private lecturesService: LecturesService) {}

  ngOnInit() {
    this.fetchLecture();
  }

  private fetchLecture() {
    this._route.params.subscribe(
        (params:Params) => {
          let id = params['id'];
          this.lecturesService.getLectureById(id)
              .subscribe(lecture => this.lecture = lecture);
        }
    );
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
