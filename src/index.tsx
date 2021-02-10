import React from 'react';
import ReactDOM from 'react-dom';
import './reset.less'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from "react-redux";
import store from "store/root"
import { createBrowserHistory } from 'history';
const history = createBrowserHistory({

});
// export const history = createBrowserHistory({
//   basename: ROOT
// });

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <ConnectedRouter history={history}> */}
      <App />
      {/* </ConnectedRouter > */}
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
reportWebVitals();
