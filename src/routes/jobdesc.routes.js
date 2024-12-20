import { Router } from "express";
import { setcurrentRole,updatecurrentRole,setinterestedRole,removeinterestedRole, getJob } from "../controllers/jobdesc.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getJob").post(verifyUser,getJob)
router.route("/setCurrent").post(verifyUser,setcurrentRole);
router.route("/updateCurrent").put(verifyUser,
    updatecurrentRole);
router.route("/setInterested").put(verifyUser,setinterestedRole);
router.route("/removeInterested").delete(verifyUser,removeinterestedRole);


export default router;