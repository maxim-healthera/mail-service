function userAddedToProjectEmail(payload) {
  const { projectTitle, userFullName, userEmail } = payload;
  console.log({
    message: `hey ${userFullName}! You were added to the new project ${projectTitle}! Let\'s start greblya!`,
    to: userEmail,
  });
}

module.exports = { userAddedToProjectEmail };
