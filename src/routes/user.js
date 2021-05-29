import { detailProfile } from "../controllers/user";
import expres from "express";

const user = expres.Router();
user.get("/profile", detailProfile);

export default user;
