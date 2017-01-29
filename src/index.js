/**
 * Created by Yigit Yesilpinar on 28.01.2017.
 */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import reducers from "../shared/reducers";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from  '../shared/routes';
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware, syncHistoryWithStore } from "react-router-redux";
import '../shared/assets/styles/styles.css';

import * as initialState from '../shared/constants/initialState';
const store = createStore(reducers, initialState, applyMiddleware(thunk, routerMiddleware(browserHistory)));

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router children={routes} history={history}/>
  </Provider>,
  document.getElementById("app"));
