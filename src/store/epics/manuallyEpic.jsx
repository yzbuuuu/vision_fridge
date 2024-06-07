import {ofType, combineEpics} from 'redux-observable';
import {ajax} from 'rxjs/ajax';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
} from '../stateSlice/manuallySlice';

// Epic to add item
export const addItemEpic = action$ =>
  action$.pipe(
    ofType(addItemRequest.type),
    mergeMap(action =>
      ajax
        .post('/manually', action.payload, {'Content-Type': 'application/json'})
        .pipe(
          map(response => addItemSuccess(response.response)),
          catchError(error => of(addItemFailure(error.message))),
        ),
    ),
  );

// Epic to fetch items
export const fetchItemsEpic = action$ =>
  action$.pipe(
    ofType(fetchItemsRequest.type),
    mergeMap(() =>
      ajax.getJSON('/manually').pipe(
        map(response => fetchItemsSuccess(response)),
        catchError(error => of(fetchItemsFailure(error.message))),
      ),
    ),
  );

export const manuallyEpic = combineEpics(addItemEpic, fetchItemsEpic);

export default manuallyEpic;
