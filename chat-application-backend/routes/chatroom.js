const router =require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const chatroomController = require("../controllers/chatroomControllers")

const auth = require("../middleware/auth");

router.get("/", catchErrors(chatroomController.getAllchatrooms));
router.post("/", catchErrors(chatroomController.createchatroom));
 

module.exports =router;