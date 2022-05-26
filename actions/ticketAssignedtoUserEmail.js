function ticketAssignedtoUserEmail(payload) {
  const { ticketTitle, userEmail, userFullName } = payload;
  console.log({
    message: `hey ${userFullName}! new ticket "${ticketTitle}" was assigned to you! Check your Jira board`,
    to: userEmail,
  });
}

module.exports = { ticketAssignedtoUserEmail };
