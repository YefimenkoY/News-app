import AT from '../actions/types';
import AC from '../actions';
import alertStatuses from '../constants/alertStatuses';
import Modals from '../common/Modals';

const alerts = store => next => action => {
  switch(action.type) {
    case AT.SHOW_ALERT:
      const modal = new Modals().setModal(action.alert, alertStatuses.NOT_FOUND);
      store.dispatch(AC.setModal(modal));
      break;
    
    default: next(action);
  }
};

export default alerts;