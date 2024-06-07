import {combineReducers} from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';
import shoppingPlanReducer from './shoppingPlanSlice';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  shoppingPlan: shoppingPlanReducer,
});

export default rootReducer;
