import { bindActionCreators } from 'redux';
import { message } from 'antd';

import { getSaves } from '../api/end-points';
import { api } from '../api';
import actions from './';
import statuses from '../constants/alertStatuses';

export const deleteSave = id => async dispatch => {
  const { saveFavorites } = bindActionCreators(actions, dispatch);
  const params = { id };

  const { data } = await api.delete( getSaves(), { params } );

  saveFavorites(data);
  message.success(statuses.SUCCESS_DELETE);
};
