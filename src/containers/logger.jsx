import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {actions} from '../store/code';

function combineMessages(messages) {
  let r = [];
  messages.forEach((nodeMessages, nodeId) => {
    nodeMessages.forEach(n => {
      r.push([nodeId].concat(n))
    });
  });
  return r;
}

class LoggerContainer extends React.Component {
  render() {
    const {dispatch, messages, ...props} = this.props;
    return (
      <div {...props} style={{overflowY: 'scroll', minHeight: '15ex', ...props.style}} ref='container'>
        {messages.filter(m => m.message !== '').map(({nodeId, message, timestamp}, i)=> (
          <div key={i} style={{whiteSpace: 'nowrap'}}>
            <div style={{display: 'inline-block', width: 20, textAlign: 'right', verticalAlign: 'top'}}>{nodeId}</div>
            <pre style={{display: 'inline-block', padding: 1, margin: '0 5px'}}>{message}</pre>
          </div>
        ))}
      </div>
    );
  }

  componentDidUpdate() {
    // scroll last message into view
    this.refs.container.scrollTop = this.refs.container.scrollHeight;
  }
}
LoggerContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
  ({code: {messages}}) => ({messages})
)(LoggerContainer);
