import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getSaves } from '../api/end-points';
import AC from './';
import { selectBook } from '../selectors';

export const sendSaves = id => async (dispatch, getState) => {
  const {
    saveFavorites, startLoadingFav, stopLoadingFav
  } = bindActionCreators({
    saveFavorites: AC.saveFavorites,
    stopLoadingFav: AC.stopLoadingFav,
    startLoadingFav: AC.startLoadingFav,
  }, dispatch);
  
  const book = selectBook(id)(getState());
  
  startLoadingFav();
  
  const { data } = await axios.post( getSaves(), book );
  
  saveFavorites(data);
  stopLoadingFav()
};