import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getSaves } from '../api/end-points';
import { api } from '../api';
import actions from './';

export const fetchSaves = () => async dispatch => {
  const {
    saveFavorites, startLoadingFav, stopLoadingFav
  } = bindActionCreators(actions, dispatch);

  startLoadingFav();

  const { data } = await api.get(getSaves());

  saveFavorites(data);
  stopLoadingFav();
};
