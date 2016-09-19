import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Col, Panel} from 'react-bootstrap';
import Dimensions from 'react-dimensions';

import Layout from './components/layout';
import CodeEditor from './containers/code-editor';
import RunControls from './containers/run-controls';
import Logger from './containers/logger';

import store from './store/store';
import {actions} from './store/code';

const AppContent = ({containerHeight}) => (
  <div>
    <Col sm={6}>
      <Panel header={<h3>Code</h3>}>
        <CodeEditor height={containerHeight - 70} />
      </Panel>
    </Col>
    <Col sm={6}>
      <RunControls style={{marginBottom: '1ex'}} />
      <Panel header={<h3>Console</h3>}>
        <Logger style={{height: containerHeight - 130}} />
      </Panel>
    </Col>
  </div>
);
AppContent.propTypes = {
  containerHeight: React.PropTypes.number.isRequired,
};
const AppContentView = Dimensions()(AppContent);

// compile initial code
store.dispatch(actions.reset());

// render app
ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <AppContentView />
    </Layout>
  </Provider>,
  document.getElementById('app')
);
