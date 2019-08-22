import { hospital_model } from '../sequelize';
import bcrypt from 'bcrypt';
import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';
import res_help from '../helper/res';
import constant from '../helper/constant';
let Validator = require('validatorjs');
const BCRYPT_SALT_ROUNDS = constant.bcrypt_solt_text;
module.exports = app => {
  /**
   * @method :- login
   * @requires : - for the used the default Docter login
   * @return :- Login User Response
   */
  app.post('/login', (req, res) => {
    hospital_model.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then(user => {
        if (req.body.password == false) {
          res
            .status(200)
            .json(res_help.notFound(constant.password_required));
        } else if (user === null) {
          res.status(200).json(res_help.notFound(constant.invalid_credential_msg));
        } else {

          bcrypt.compare(req.body.password, user.password).then(response => {
            if (response === true) {
              const token = jwt.sign({ id: user.id }, jwtSecret.jwtSecret, {
                expiresIn: 86400,
              });
              user.access_token = token;
              user.password = undefined;
              res.json(res_help.success(constant.signup_success, user));
            } else {
              res
                .status(200)
                .json(res_help.notFound(constant.password_not_match));
            }
          });
        }
      })
      .catch(err => {
        console.log('problem communicating with db');
        res.status(500).json(err);
      });
  });

  /**
    * @method :- signup
    * @requires : - for the used the default Docter signup
    * @return :-  User Response Send
    */
  app.post('/signup', (req, res) => {
    const reqData = {
      first_name: "",
      last_name: "",
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      hospital_name: req.body.hospital_name,
      hospital_branch_name: req.body.hospital_branch_name,
      user_type: req.body.user_type,
    };

    let rules = {
      username: 'required',
      password: 'required',
      email: 'required|email'
    };
    let validation = new Validator(reqData, rules);
    if (validation.fails()) {
      res.status(200).json(res_help.notFound(constant.common_required));
    }
    isExists(hospital_model, 'username', reqData.username, (res_status, response) => {
      if (res_status) {
        res.json(res_help.success(constant.username_alreay_taken_msg, [], constant.username_alreay_taken_status));
      } else {
        isExists(hospital_model, 'email', reqData.email, (res_status, response) => {
          if (res_status) {
            res.json(res_help.success(constant.email_alreay_taken_msg, [], constant.username_alreay_taken_status));
          } else {
            bcrypt
              .hash(reqData.password, BCRYPT_SALT_ROUNDS)
              .then(function (hashedPassword) {
                reqData.password = hashedPassword;
                hospital_model.create(reqData).then((response) => {
                  res.json(res_help.success(constant.signup_success, response));
                });
              });
          }
        });
      }
    });
  });

  app.post('/forgot_password', (req, res) => {
    const whereObj = {
      email: req.body.email
    }
    hospital_model.findOne({
      where: whereObj
    })
      .then(response => {
        if (req.body.type == 1) {
          if (response) {
            res.status(200).json({ "status": true, "message": "email exist" });
          } else {
            res.status(200).json({ "status": false, "message": "email not exist, please create account first this email." });
          }
        }
        if (req.body.type == 2) {
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(function (hashedPassword) {
              hospital_model.update({
                password: hashedPassword
              }, {
                  where: whereObj
                })
                .then(function (result) {
                  res.json(res_help.success(response));
                }).catch(function (err) {

                });
            });
        }
      })
      .catch(err => {
        console.log('problem communicating with db');
        res.status(500).json(err);
      });
  });
};




/**
 * 
 * @param {*} schmea 
 * @param {*} col_name 
 * @param {*} col_value 
 * @param {*} cb 
 */

let isExists = (schmea, col_name_text, col_value, cb) => {
  const whereObj = {
  }
  whereObj[col_name_text] = col_value;
  schmea.findOne({
    where: whereObj,
  })
    .then(response => {
      if (response != null) {
        cb(true, response);
      } else {
        cb(false, []);
      }
    }).catch(err => {
      cb(false, [])
    });
}



