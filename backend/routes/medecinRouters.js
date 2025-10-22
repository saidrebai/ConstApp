const router = require("express").Router();
const medecinControlles = require("../Controlles/medecinControlles");

router.post("/signin", medecinControlles.authentification);
router.post("/signup", medecinControlles.signup);
router.post("/ResetPassword", medecinControlles.ResetPassword);

module.exports = router;