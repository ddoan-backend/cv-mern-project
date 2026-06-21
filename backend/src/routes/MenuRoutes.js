import { VerifyAdmin , protectdRoute } from "../middlewares/authMiddlewares.js";
import express from 'express'
import { GetMenu , createMenu ,DeleteMenu , UpdateMenu} from "../controllers/MenuController.js";
import { upload } from "../lib/multer.js";
const router = express.Router()

router.post("/" , protectdRoute , VerifyAdmin,upload.single("image") , createMenu)
router.get("/" ,protectdRoute,VerifyAdmin,GetMenu)
router.delete("/:id" , protectdRoute , VerifyAdmin,DeleteMenu)
router.put("/:id",protectdRoute,VerifyAdmin,upload.single("image"),UpdateMenu)

export default router