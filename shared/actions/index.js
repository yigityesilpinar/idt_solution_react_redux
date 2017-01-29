"use strict";

import * as types from "../constants/actionTypes";

export function sendMessage(socket, message) {
  return { type: types.SEND_MESSAGE_REQUEST, socket, message};
}
export function userConnected(newObject) {
  return { type: types.NEW_USER_CONNECTED, newObject};
}

