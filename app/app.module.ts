import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent }  from './app.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LoginModule} from "./login/login.module";

import {LecturesModule} from "./lectures/lectures.module";
import {LecturesComponent} from "./lectures/lectures.component";
import {LectureShowRatingComponent} from "./lectures/rating/lecture-show-rating.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        Ng2BootstrapModule,
        HttpModule,
        LoginModule,
        LecturesModule,
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent},
            { path: 'lectures', component: LecturesComponent},
            { path: 'lecture/:id', component: LectureShowRatingComponent},
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ])
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: []
})
export class AppModule {

}