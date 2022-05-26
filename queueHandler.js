const actions = require('./actions');

const allowedActions = new Set([
  'ticketAssignedtoUserEmail',
  'userAddedToProjectEmail',
]);

function queueHandler(receivedData) {
  const payloadJSON = receivedData.content.toString();
  const payload = JSON.parse(payloadJSON);
  const { action, data } = payload;

  if (!allowedActions.has(action)) {
    throw new Error(`Invalid action type was provided: ${action}`);
  }
  return actions[action](data);
}

module.exports = { queueHandler };
