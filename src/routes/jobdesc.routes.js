import { Router } from "express";
import { setcurrentRole,updatecurrentRole,setinterestedRole,removeinterestedRole } from "../controllers/jobdesc.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/setCurrent").post(verifyUser,setcurrentRole);
router.route("/updateCurrent").put(verifyUser,
    updatecurrentRole);
router.route("/setInterested").put(verifyUser,setinterestedRole);
router.route("/removeInterested").delete(verifyUser,removeinterestedRole);


export default router;