import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {FormControl, FormGroup} from 'react-bootstrap';

import CodeEditor from '../components/code-editor';
import {actions} from '../store/code';

class CodeEditorContainer extends React.Component {
  render() {
    const {code, compiled, error, dispatch, ...props} = this.props;
    return (
      <CodeEditor {...props}
                  value={code}
                  valid={compiled ? !error : null} message={error}
                  onChange={this._onChange.bind(this)} />
    );
  }

  _onChange(e) {
    this.props.dispatch(actions.updateCode(e.target.value));
  }
}
CodeEditorContainer.propTypes = {
  code: PropTypes.string.isRequired,
  error: PropTypes.string,
  compiled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  ({code: {code, error, compiled}}) => ({code, error, compiled})
)(CodeEditorContainer);
