import React, {PropTypes} from 'react';
import {HelpBlock, FormControl, FormGroup} from 'react-bootstrap';
import Dimensions from 'react-dimensions';

const CodeEditor = ({message, value, valid, onChange, height}) => (
  <FormGroup controlId='code' style={styles.group}
             validationState={valid === true ? 'success' : (valid === false ? 'error' : null)}>
    <FormControl componentClass='textarea'
                 value={value}
                 onChange={onChange}
                 style={{...styles.editor, height: height}} />
    {message
      ? <div style={styles.helpContainer}>
          <HelpBlock style={styles.helpText}>{message}</HelpBlock>
        </div>
      : null}
  </FormGroup>
);
CodeEditor.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func,
  valid: PropTypes.bool,
  value: PropTypes.string.isRequired,
  height: PropTypes.number,
};

const styles = {
  editor: {
    fontFamily: 'monospace',
    minHeight: '25ex',
  },
  group: {
    marginBottom: 0,
  },
  helpContainer: {
    position: 'relative',
  },
  helpText: {
    margin: 0,
    padding: 4,
    position: 'absolute',
    bottom: 1,
    left: 1,
    right: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTop: '1px solid #ccc',
  }
};

export default CodeEditor;
