import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {ControlLabel, ButtonGroup, Button, Form, FormControl, FormGroup, Glyphicon, OverlayTrigger, Tooltip, Well} from 'react-bootstrap';

import {actions as code} from '../store/code';
import {actions as settings} from '../store/settings';

const tt = (id, msg, children) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{msg}</Tooltip>} placement='bottom' delayShow={1000}>
    {children}
  </OverlayTrigger>
);

const RunControls = ({dispatch, compiled, running, nodeCount, loopTime, ...props}) => (
  <Well bsSize='small' {...props}>
    <ButtonGroup style={{float: 'right'}}>
      {tt('play', <span>Start running <tt>loop()</tt></span>,
        <Button disabled={!compiled || running}
                onClick={e => dispatch(code.start())}><Glyphicon glyph='play' /></Button> )}
      {tt('pause', <span>Stop the <tt>loop()</tt></span>,
        <Button disabled={!compiled || !running}
                onClick={e => dispatch(code.stop())}><Glyphicon glyph='pause' /></Button> )}
      {tt('restart', 'Stop and restart the program',
        <Button disabled={!compiled}
                onClick={e => dispatch(code.reset())}><Glyphicon glyph='refresh' /></Button> )}
    </ButtonGroup>
    <Form inline>
      {tt('nodes', <div><div>number of nodes to run simultaneously</div><div>please restart after changing this</div></div>,
        <FormGroup controlId='nodeCount' style={{marginRight: 10}}>
          <ControlLabel>nodes&nbsp;</ControlLabel>
          <FormControl type='number' min={0} max={16} step={1}
                       value={nodeCount} style={{width: 60}} bsSize='small'
                       onChange={e => dispatch(settings.update({nodeCount: parseInt(e.target.value)}))} />
        </FormGroup>
      )}
      {tt('loopTime', <div><div>code loop runs every this many ms</div><div>please restart after changing this</div></div>,
        <FormGroup controlId='loopTime'>
          <ControlLabel>loop (ms)&nbsp;</ControlLabel>
          <FormControl type='number' min={0} max={950} step={50}
                       value={loopTime} style={{width: 80}} bsSize='small'
                       onChange={e => dispatch(settings.update({loopTime: parseInt(e.target.value)}))} />
        </FormGroup>
      )}
    </Form>
  </Well>
);
RunControls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  compiled: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  nodeCount: PropTypes.number.isRequired,
  loopTime: PropTypes.number.isRequired,
};

export default connect(
  ({code: {compiled, running}, settings: {nodeCount, loopTime}}) => ({compiled, running, nodeCount, loopTime})
)(RunControls);
