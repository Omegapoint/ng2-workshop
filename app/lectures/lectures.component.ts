import { Component, OnInit } from '@angular/core';
//noinspection TypeScriptCheckImport
import template from './lectures.component.html';
import './lectures.component.scss!';
import {LecturesService} from "./lectures.service";
import {Lecture} from "./lecture";

@Component({
  selector: 'lectures',
  template: template,
})
export class LecturesComponent implements OnInit {
  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  lectures: Lecture[] = [];

  constructor(private lecturesService: LecturesService) { }

  ngOnInit() {
    this.getLectures();
  }

  getRating(lecture: Lecture) {
      return this.lecturesService.getRatingForLecture(lecture);
  }

  getLectures() {
    this.lecturesService.getLectures()
      .subscribe(lectures => this.lectures = lectures);
  }
}
