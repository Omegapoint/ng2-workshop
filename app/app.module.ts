import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent }  from './app.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LoginModule} from "./login/login.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        Ng2BootstrapModule,
        HttpModule,
        LoginModule,
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent},
           /* { path: 'movies', component: MoviesComponent},
            { path: 'movies/:id', component: MovieShowRatingComponent}*/
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ])
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: []
})
export class AppModule {

}