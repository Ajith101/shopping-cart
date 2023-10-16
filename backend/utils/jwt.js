const sendToken = (user, res) => {
  const token = user.getJwtToken();
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 72 * 60 * 60 * 1000,
  };
  res
    .cookie("token", token, options)
    .status(200)
    .json({ success: true, token, user });
};

module.exports = sendToken;
