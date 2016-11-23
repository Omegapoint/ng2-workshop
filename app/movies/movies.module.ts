import { NgModule }      from '@angular/core';
import {MoviesComponent} from "./movies.component";
import {MoviesService} from "./movies.service";
import {HttpModule} from "@angular/http";
import {AccordionModule, RatingModule, CollapseModule} from "ng2-bootstrap";
import {CommonModule} from "@angular/common";
import {AuthHttp} from "../util/AuthHttp";
import {MovieRatingComponent} from "./rating/movie-rating.component";
import {MovieShowRatingComponent} from "./rating/movie-show-rating.component";

@NgModule({
    imports: [CommonModule, HttpModule, AccordionModule, RatingModule, CollapseModule],
    declarations: [MoviesComponent, MovieRatingComponent, MovieShowRatingComponent],
    exports: [MoviesComponent, MovieRatingComponent, MovieShowRatingComponent],
    providers: [MoviesService, AuthHttp]
})
export class MoviesModule {

}