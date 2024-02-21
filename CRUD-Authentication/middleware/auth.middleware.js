const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "masai", function (err, decoded) {
      if (err) {
        res.send("Token is wrong or expired");
      } else {
        console.log(decoded, req.body);
        req.body.userId = decoded.userId;
        req.body.user = decoded.user;
        next();
      }
    });
  } else {
    res.send({ msg: "Login Please" });
  }
};

module.exports = {
  auth,
};
