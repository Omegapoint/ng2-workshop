import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent }  from './app.component';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        Ng2BootstrapModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: '/foo', pathMatch: 'full' }
        ])
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers: []
})
export class AppModule {

}