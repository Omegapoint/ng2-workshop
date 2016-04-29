import {HTTP_PROVIDERS} from 'angular2/http';
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

import {MoviesService} from './movies.service';
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS,
                     TEST_BROWSER_APPLICATION_PROVIDERS);

describe('MoviesService', () => {
  beforeEachProviders(() => [HTTP_PROVIDERS, MoviesService]);

  it('getMovies should return null', inject([MoviesService], (moviesService: MoviesService) => {
    expect(moviesService.getMovies()).toBeNull()
  }));
});
