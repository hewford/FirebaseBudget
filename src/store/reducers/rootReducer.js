import auth from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

// the key name will be the data property on the state object