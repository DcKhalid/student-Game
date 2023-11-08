import { Router } from "express";
import {
  createKidData,
  viewKidsData,
  viewsortData,
} from "../controller/bookController";

const router: Router = Router();

router.route("/create-data").post(createKidData);
router.route("/get-data").get(viewKidsData);
router.route("/sort-data").get(viewsortData);

export default router;
