import {createEpicMiddleware, ofType, combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/ajax';
import {map, mergeMap, catchError, switchMap, tap} from 'rxjs/operators';
import {of, concat, Observable} from 'rxjs';
import {Action} from '@reduxjs/toolkit';

import {
  fetchLatestDetectionRequest,
  fetchLatestDetectionSuccess,
  fetchLatestDetectionFailure,
  fetchHistoryRequest,
  fetchHistorySuccess,
  fetchHistoryFailure,
} from '../stateSlice/inventorySlice';

const API_URL = 'http://172.20.10.3:8080';
const GETIMAGE_URL = `${API_URL}/getImage`;
const GETHISTORY_URL = `${API_URL}/history`;
const GETLATEST_URL = `${API_URL}/latest`;

// Epic to fetch latest detection
export const fetchLatestDetectionEpic = action$ =>
  action$.pipe(
    ofType(fetchLatestDetectionRequest.type),
    tap(action => console.log('11111rAction received:', action)),
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

export const inventoryEpic = combineEpics(
  fetchLatestDetectionEpic,
  fetchHistoryEpic,
);

export default inventoryEpic;
