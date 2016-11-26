import { NgModule }      from '@angular/core';
import {LecturesComponent} from "./lectures.component";
import {LecturesService} from "./lectures.service";
import {HttpModule} from "@angular/http";
import {AccordionModule, RatingModule, CollapseModule} from "ng2-bootstrap";
import {CommonModule} from "@angular/common";
import {AuthHttp} from "../util/AuthHttp";
import {LectureShowRatingComponent} from "./rating/lecture-show-rating.component";
import {LectureRatingComponent} from "./rating/lecture-rating.component";

@NgModule({
    imports: [CommonModule, HttpModule, AccordionModule, RatingModule, CollapseModule],
    declarations: [LecturesComponent, LectureRatingComponent, LectureShowRatingComponent],
    exports: [LecturesComponent, LectureRatingComponent, LectureShowRatingComponent],
    providers: [LecturesService, AuthHttp]
})
export class LecturesModule {

}