import { configureStore } from '@reduxjs/toolkit';
import omnisafeReducer from './redux-slice';

export default configureStore({
  reducer: {
    omnisafeReducer: omnisafeReducer
  }
});
