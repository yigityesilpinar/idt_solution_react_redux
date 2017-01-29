"use strict";

import * as types               from "../constants/actionTypes";
import {chatState}          from "../constants/initialState";

export default function projectReducer(state = chatState, action) {
  switch (action.type) {
    case types.SEND_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        message: action.message,
        socket: action.socket
      });
    case types.NEW_USER_CONNECTED:

      return Object.assign({}, state, {
        userName:action.newObject[Object.keys(action.newObject)[0]]
      });

    default:
      return state;
  }
}
