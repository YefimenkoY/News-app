import { get } from '../api';
import { getSources } from '../api/end-points';

export const fetchSources = params => async dispatch => {
  const { data } = await get(
    getSources(),
    params
  );
};