import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getSaves } from '../api/end-points';
import actions from './';
import { message } from 'antd';
import statuses from '../constants/alertStatuses';

export const deleteSave = id => async dispatch => {
  const { saveFavorites } = bindActionCreators(actions, dispatch);
  const params = { id };
  
  const { data } = await axios.delete( getSaves(), { params } );
  
  saveFavorites(data);
  message.success(statuses.SUCCESS_DELETE);
};