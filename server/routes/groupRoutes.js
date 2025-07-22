import { getGroupById ,getAllGroups} from "../controllers/groupController.js";
import express from "express";

const grouprouter = express.Router();

grouprouter.get("/:id",getGroupById);
grouprouter.get("/",getAllGroups);

export default grouprouter;