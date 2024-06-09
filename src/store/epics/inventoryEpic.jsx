// epic.js
import { createEpicMiddleware, ofType, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  fetchLatestDetectionRequest,
  fetchLatestDetectionSuccess,
  fetchLatestDetectionFailure,
  fetchHistoryRequest,
  fetchHistorySuccess,
  fetchHistoryFailure,
  fetchImageRequest,
  fetchImageSuccess,
  fetchImageFailure,
} from '../stateSlice/inventorySlice';

const API_URL = 'http://172.20.10.3:8080';
const GETIMAGE_URL = `${API_URL}/getImage`;
const GETHISTORY_URL = `${API_URL}/history`;
const GETLATEST_URL = `${API_URL}/latest`;

// Epic to fetch latest detection
export const fetchLatestDetectionEpic = action$ =>
  action$.pipe(
    ofType(fetchLatestDetectionRequest.type),
    mergeMap(() =>
      ajax.getJSON(GETLATEST_URL).pipe(
        // tap(action => console.log('Action received:', action)),
        map(response => {
          console.log('fetchLatestDetectionEpic');
          console.log(response.results[0].count);
          console.log('fetchLatestDetectionEpicfinish');

          return fetchLatestDetectionSuccess(response);
        }),
        catchError(error => of(fetchLatestDetectionFailure(error.message))),
      ),
    ),
  );

// Epic to fetch history
export const fetchHistoryEpic = action$ =>
  action$.pipe(
    ofType(fetchHistoryRequest.type),
    mergeMap(action =>
      ajax
        .getJSON(`${GETHISTORY_URL}?timestamp=${encodeURIComponent(action.payload)}`)
        .pipe(
          map(response => fetchHistorySuccess(JSON.parse(response))),
          catchError(error => of(fetchHistoryFailure(error.message))),
        ),
    ),
  );

// New epic to fetch image and then trigger fetchLatestDetectionRequest
export const fetchImageEpic = action$ =>
  action$.pipe(
    ofType(fetchImageRequest.type),
    mergeMap(() =>
      ajax.getJSON(GETIMAGE_URL).pipe(
        map(response => fetchImageSuccess(response)),
        switchMap(() => of(fetchLatestDetectionRequest())), // Trigger fetchLatestDetectionRequest after successful image fetch
        catchError(error => of(fetchImageFailure(error.message))),
      ),
    ),
  );

export const inventoryEpic = combineEpics(
  fetchLatestDetectionEpic,
  fetchHistoryEpic,
  fetchImageEpic,
);

export default inventoryEpic;
