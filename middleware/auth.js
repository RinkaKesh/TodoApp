
const jwt = require('jsonwebtoken');
const { TokenModel } = require('../model/tokenModel.js');

const auth = async (req, res, next) => {
  
  try {
    // const cookies = req.cookies;
    const accessToken = req.cookies["access-Token"];
  const refreshToken = req.cookies["refresh-Token"];

  // console.log("accessToken:", accessToken);
  // console.log("refreshToken:", refreshToken);
   
    // if(!accessToken) throw new Error
   console.log(req.cookies);
    if (accessToken) {
      try {
        const blacklistedToken = await TokenModel.findOne({ token: accessToken });

        if (blacklistedToken) {
          res.status(403).send("Token expired, login again");
          console.log("Token is blacklisted");
          return;
        }

        jwt.verify(accessToken, "k", async function (err, decoded) {
          if (err) {
            console.error("Error in accessToken verification:", err);

            if (err.name === "TokenExpiredError") {

              jwt.verify(refreshToken, "rk", async function (err, decoded) {
                if (err) {
                  console.error("Error verifying refreshToken:", err);
                  res.status(401).send("Login again");
                } else {
                  const newAccessToken = jwt.sign(
                    { userId: decoded.userId, user: decoded.user },
                    "k",
                    { expiresIn: 600 }
                  );
                  res.cookie("access-Token", newAccessToken, {
                    maxAge: 1000 * 700,
                  });
                  console.log("Refresh token in work");
                  req.accessToken = newAccessToken;
                  req.body.userId=decoded.userId;
                  req.body.user=decoded.user
                   next();
                }
              });
            } else {
              res.status(400).send("Login Again");
            }
          } else {
                 req.body.userId=decoded.userId;
                  req.body.user=decoded.user
             next();
          }
        });
      } catch (error) {
        console.error("Error checking blacklisted token:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(403).send("Login first");

    }
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { auth };