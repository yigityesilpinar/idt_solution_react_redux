"use strict";

import { combineReducers }      from "redux";
import { routerReducer }        from 'react-router-redux';

import chatReducer from  "./chatReducer";


export default combineReducers({
  routing: routerReducer,
  chatState: chatReducer
});
