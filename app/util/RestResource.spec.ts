import {HTTP_PROVIDERS} from "angular2/http";
import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  setBaseTestProviders
} from 'angular2/testing';
import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';

import {RestResource} from './RestResource';
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS,
                     TEST_BROWSER_APPLICATION_PROVIDERS);

describe('RestResource', () => {
  beforeEachProviders(() => [HTTP_PROVIDERS, RestResource]);

  it('request should be undefined with faulty parameters', inject([RestResource], (restResource: RestResource) => {
    expect(restResource.request(null, null)).toBeUndefined();
  }));
});
