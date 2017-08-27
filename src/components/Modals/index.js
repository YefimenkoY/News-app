import React from 'react';
import { Alert } from 'antd';


import { createAlert } from 'react-redux-alerts';
/*

function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

function success() {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
    okText: 'Ok'
  });
}

export const errorModal = (text) => {
  Modal.error({
    title: 'Error!',
    content: text,
    okText: 'ok',
  });
}

function warning() {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
}
*/

@createAlert({
  alertName: 'not-found'
})
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
    )
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
    )
  }
}





