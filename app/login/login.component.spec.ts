import {Http} from '@angular/http';
import {
    inject,
    TestBed, async
} from '@angular/core/testing';

import {
    BaseRequestOptions,
    Response,
    ResponseOptions
} from '@angular/http';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {Cookie} from 'ng2-cookies/ng2-cookies';

import {LoginComponent} from './login.component';

import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

class MockRouter {
  navigate() {

  }
}
describe('LoginComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
        {
          provide: Router,
          useClass: MockRouter
        }
      ]
    });
  });

  it('token should be set in cookie', async(inject([MockBackend], (mockBackend) => {

      //TODO: write a test which calls onSubmit and verifies the result
      // use TestBed to create an instance of the LoginComponent, TestBed.compileComponents()


      expect(true).toBe(true);
  })));

});
