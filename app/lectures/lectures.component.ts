import { Component, OnInit } from '@angular/core';
//noinspection TypeScriptCheckImport
import template from './lectures.component.html';
import './lectures.component.scss!';
import {LecturesService} from "./lectures.service";
import {LecturesStore, Lecture} from "./lectures.store";

@Component({
  selector: 'lectures',
  template: template,
})
export class LecturesComponent implements OnInit {
  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  constructor(private lecturesService: LecturesService, private store: LecturesStore) { }

  ngOnInit() {
    this.getLectures();
  }

  getRating(lecture: Lecture) {
      return this.lecturesService.getRatingForLecture(lecture);
  }

  getLectures() {
    this.store.lectures = [];
    this.lecturesService.getLectures()
      .subscribe(lectures => {
        lectures.forEach(lecture => {
          let addedLecture:Lecture = this.store.addLecture(lecture.id, lecture.name, lecture.description);
          lecture.rating.forEach(rating => {
            this.store.addRating(addedLecture, {
              id: rating.id,
              comment: rating.comment,
              rating: rating.rating,
              user: rating.user
            });
          });
        });
        this.sort();
      });
  }

  sort() {
    //TODO: call sortLectures in lecturesService to sort the list
  }
}
