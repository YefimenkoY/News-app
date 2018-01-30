import { all } from 'redux-saga/effects';
import { watchFetchSaves } from './fetchSave';
import { watchFetchBooks } from './getBooksSaga'


export default function* root(){
  yield all([
    watchFetchSaves(),
    watchFetchBooks(),
  ])
}