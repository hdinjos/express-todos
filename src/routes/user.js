import { detailProfile, editProfile } from "../controllers/user";
import expres from "express";

const user = expres.Router();
user.get("/profile", detailProfile);
user.post("/profile/update", editProfile);

export default user;
