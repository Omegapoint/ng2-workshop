import { NgModule }      from '@angular/core';
import {MoviesComponent} from "./movies.component";
import {MoviesService} from "./movies.service";
import {HttpModule} from "@angular/http";
import {AccordionModule} from "ng2-bootstrap";
import {CommonModule} from "@angular/common";
import {AuthHttp} from "../util/AuthHttp";

@NgModule({
    imports: [CommonModule, HttpModule, AccordionModule],
    declarations: [MoviesComponent],
    exports: [MoviesComponent],
    providers: [MoviesService, AuthHttp]
})
export class MoviesModule {

}