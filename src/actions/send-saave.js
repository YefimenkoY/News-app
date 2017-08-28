import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getSaves } from '../api/end-points';
import actions from './';
import { selectBook } from '../selectors';

export const sendSaves = id => async (dispatch, getState) => {
  const {
    saveFavorites, showModal
  } = bindActionCreators(actions, dispatch);
  
  const book = selectBook(id)(getState());
  
  const { data } = await axios.post( getSaves(), book );
  
  saveFavorites(data);
  showModal('success');
};