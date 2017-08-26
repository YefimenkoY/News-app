import { Modal } from 'antd';

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


