import { all } from 'redux-saga/effects';
import { watchFetchSaves } from './fetchSave';


export default function* root(){
  yield all([
    watchFetchSaves(),
  ])
}