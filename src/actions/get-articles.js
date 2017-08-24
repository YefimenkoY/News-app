import { bindActionCreators } from 'redux';
import { get } from '../api';
import { getArticles } from '../api/end-points';
import STATUSES from '../constants/statuses';
import AC from './';

export const fetchArticles = params => async dispatch => {
  const {
    saveArticles
  } = bindActionCreators({
    saveArticles: AC.saveArticles,
  }, dispatch);
  const { data, statusText } = await get(
    getArticles(),
    params
  );
  
  if (statusText === STATUSES.STATUS_OK)
    saveArticles(data.articles);
};