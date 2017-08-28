import React from 'react';
import { Alert } from 'antd';
import { PropTypes } from 'prop-types';
import { createAlert } from 'react-redux-alerts';

@createAlert({ alertName: 'not-found' })
export class ErrorAlert extends React.Component {
  render() {
    const { message, close } = this.props;

    return (
      <Alert
        message={message}
        type="error"
        closable
        onClose={close}
      />
    );
  }
}

@createAlert({
  alertName: 'Success'
})
export class SuccessAlert extends React.Component {
  render() {
    const { message, close } = this.props;

    return (
      <Alert
        message={message}
        type="success"
        closable
        onClose={close}
      />
    );
  }
}

ErrorAlert.propTypes = {
  message: PropTypes.string,
  close: PropTypes.func,
};

SuccessAlert.propTypes = {
  message: PropTypes.string,
  close: PropTypes.func,
};
