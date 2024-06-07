// store/configureStore.js

import {configureStore} from '@reduxjs/toolkit';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import rootReducer from './stateSlice/rootReducer';
import inventoryEpic from './epics/inventoryEpic';
import manuallyEpic from './epics/manuallyEpic';
import inventoryReducer from './stateSlice/inventorySlice';
import manuallyReducer from './stateSlice/manuallySlice';

const epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(inventoryEpic, manuallyEpic);

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    manually: manuallyReducer,
  },
  middleware: getDefaultMiddlemare =>
    getDefaultMiddlemare().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;
