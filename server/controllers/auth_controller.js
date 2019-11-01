const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const db = req.app.get("db");
  const { username, firstName, lastName, password } = req.body;

  const checkedUser = await db.get_user([username]);
  if (checkedUser.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await db.register_user([
      username,
      firstName,
      lastName,
      hashedPassword
    ]);
    console.log(user);
    req.session.user = {
      id: user[0].id,
      username,
      firstName,
      lastName
    };
    res.status(200).json(user);
  } else {
    res.status(409).json({ error: "Username taken, please try another." });
  }
};

const login = async (req, res) => {
  const db = req.app.get("db");
  const { username, password } = req.body;

  const checkedUser = await db.get_user([username]);
  if (checkedUser.length === 0) {
    res.status(401).json({ error: "Wrong username or password, idiot" });
  }

  const isMatching = await bcrypt.compare(password, checkedUser[0].password);
  if (isMatching) {
    req.session.user = {
      id: checkedUser[0].id,
      username: checkedUser[0].username,
      firstName: checkedUser[0].firstName,
      lastName: checkedUser[0].lastName
    };
    return res.json(req.session.user);
  } else {
    return res
      .status(403)
      .json({ error: "Wrong username or password, idiot." });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

module.exports = {
  register,
  login,
  logout
};
