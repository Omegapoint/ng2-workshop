import {NgModule}      from '@angular/core';
import {LoginComponent} from "./login.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [ LoginComponent ],
    exports: [LoginComponent],
    providers: []
})
export class LoginModule {

}