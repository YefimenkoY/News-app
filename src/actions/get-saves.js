import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getSaves } from '../api/end-points';
import AC from './';

export const fetchSaves = () => async dispatch => {
  const {
    saveFavorites, startLoadingFav, stopLoadingFav
  } = bindActionCreators({
    saveFavorites: AC.saveFavorites,
    stopLoadingFav: AC.stopLoadingFav,
    startLoadingFav: AC.startLoadingFav,
  }, dispatch);
  
  startLoadingFav();
  
  const { data } = await axios.get( getSaves() );
  
  saveFavorites(data);
  stopLoadingFav()
};