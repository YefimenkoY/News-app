import { all } from 'redux-saga/effects';
import { watchFetchSaves } from './fetchSave';
import { watchFetchBooks } from './getBooksSaga'
import { watchDeleteSave } from './deleteSaveSaga'
import { sendSaveWatch } from './sendSaveSaga'


export default function* root(){
  yield all([
    watchFetchSaves(),
    watchFetchBooks(),
    watchDeleteSave(),
    sendSaveWatch(),
  ])
}