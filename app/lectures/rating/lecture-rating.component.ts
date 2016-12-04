import {Component, Input, Output, EventEmitter} from '@angular/core';


//noinspection TypeScriptCheckImport
import template from './lecture-rating.component.html';
import {Router} from "@angular/router";
import {LecturesService} from "../lectures.service";

import {IRating, Lecture, LecturesStore} from "../lectures.store";


@Component({
  selector: 'lecture-rating',
  template: template
})
export class LectureRatingComponent {
  @Input()
  lecture: Lecture;
  @Output()
  newRating: EventEmitter<any>;

  lectureRating: IRating = {id: -1, comment: '', rating: 1, user:''};

  private x:number = 5;
  private y:number = 2;
  private max:number = 10;
  private isReadonly:boolean = false;

  private overStar:number;
  private percent:number;

  private ratingStates:any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

  constructor(private _router: Router, private lecturesService: LecturesService, private store: LecturesStore) {
    this.newRating = new EventEmitter<any>();
  }

  hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  resetStar() {
    this.overStar = null;
  }

  addRating() {
    let id = this.lecture.id;
    this.lecturesService.addRating(id, this.lectureRating)
    .subscribe(
      () => {
        this.store.addRating(this.lecture, this.lectureRating);
        this.lectureRating = {id: -1, comment: '', rating: 1, user:''};
      }
    );
  }

  showRatings() {
    this._router.navigate(['lecture', this.lecture.id]);
  }
}
