const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { Medecin } = require("../models/medecinModel");
const jwt = require("jsonwebtoken");
const { vall } = require("../middleware/vall");
// const checkDuplicateEmail = require("../utils/utils");
// const randomString = require("../utils/utils");

const validate = (data) => {
  const schema = Joi.object({
    sex: Joi.string().required().label("Sex"),
    First_Name: Joi.string().required().label("First_name"),
    Last_Name: Joi.string().required().label("Last_name"),
    phone: Joi.number().required().label("phone"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = {
  authentification: async function (req, res) {
    try {
      const { error } = vall(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const medecin = await Medecin.findOne({ email: req.body.email });
      if (!medecin)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        medecin.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const token = medecin.generateAuthToken();
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
  
      res.status(200).send({
        data: token,
        _id: decoded._id,
        First_Name: medecin.First_Name,

        message: "logged in successfully",
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  signup: async function (req, res) {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      const user = await Medecin.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .send({ message: "User with given email already Exist!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new Medecin({ ...req.body, password: hashPassword }).save();
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  ResetPassword: async (req, res, next) => {
    try {
      const password = randomString(
        16,
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{};':\"\\|,.<>/?"
      );
      console.log(password);
      let email = {};
      email["email"] = req.body.email;
      let medecinFinded = await medecin.findOne(email);
      console.log("medecinfind===>", medecinFinded);
      if (medecinFinded !== null) {
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password, salt);
        medecinFinded.password = hashedPassword;

        // const token = jwt.sign(
        //   { _id: medecinFinded._id },
        //   process.env.RESET_PASSWORD_KEY,
        //   { expiresIn: "20m" }
        // );
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.MAIL_USERNAME, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
          },
        });
        const email_content =
          "Hello " +
          medecinFinded.name +
          ",<br><br>You have requested to reset your password<br><br>" +
          password +
          "<br><br>Sincerely,<br>The customer service department of SkillApp";
        const mailOptions = {
          from: "Openjavascript <test@openjavascript.info>",
          to: medecinFinded.email,
          subject: "Reset your password SkillApp",
          html: email_content,
        };
        medecinFinded
          .save()
          .then(async (savedmedecin) => {
            console.log(
              "🚀 ~ file: medecinControlles.js:223 ~ .then ~ savedmedecin:",
              savedmedecin
            );
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                res.status(500).json({ message: "Problem sending e-mail" });
              } else {
                console.log("Email sent: " + info.response);
                res.json(savedmedecin.toJSON());
              }
            });
          })
          .catch((e) =>
            checkDuplicateEmail(e, (result) => {
              if (result) {
                res.status(400).json({ message: "Duplicate e-mail address" });
              } else {
                next(e);
              }
            })
          );
      } else {
        res.status(404).json({ message: "No medecinistrator found " });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
