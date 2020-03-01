
const User = require('../models/user.model');
const jwtHelper = require("../../helpers/jwt.helper");
const debug = console.log.bind(console);
const bcrypt = require('bcrypt');

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-kntrieumemoapp.com-green-cat-a@";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-kntrieumemoapp.com-green-cat-a@";

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async (req, res) => {
    try {

        let email = req.body.email;
        let password = req.body.password;

        const user = await User.findOne({email});
        if (user && bcrypt.compareSync(password, user.password)) {
            
            const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
            tokenList[refreshToken] = { accessToken, refreshToken };
            let userInfo = {
                email: user.email,
                fullname: user.fullname,
                _id: user._id
            }
            return res.status(200).json({ accessToken, refreshToken, userInfo });
        } else {
            return res.status(403).json({ "error": "Email or password is incorrect" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}


/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;
    
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
      try {
        const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
        const userFakeData = decoded.data;
        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
        return res.status(200).json({accessToken});
      } catch (error) {
        debug(error);
        res.status(403).json({
          message: 'Invalid refresh token.',
        });
      }
    } else {
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
  };


module.exports = {
    login: login,
    refreshToken: refreshToken,
}  