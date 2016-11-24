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
    let mockResponseBody = {
      token: "abc"
    };
    const baseResponse = new Response(new ResponseOptions(
        {body: JSON.stringify(mockResponseBody)}
    ));
    mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(LoginComponent);

      // Access the dependency injected component instance
      const app = fixture.componentInstance;

      app.onSubmit();

      expect(Cookie.get('auth-token')).toBe('abc');
    });
  })));

  it('authentication failure should result in an update of authFailure', async(inject([MockBackend], (mockBackend) => {
    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new ResponseOptions({status: 403}));
    });

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(LoginComponent);

      // Access the dependency injected component instance
      const app = fixture.componentInstance;

      app.onSubmit();
      expect(app.authFailure).toBeTruthy();
    });

  })));

});
