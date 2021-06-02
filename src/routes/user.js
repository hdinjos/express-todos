import { detailProfile, editProfile } from "../controllers/user";
import manage from "../controllers/user/manage";
import expres from "express";

const user = expres.Router();
user.get("/profile", detailProfile);
user.post("/profile/update", editProfile);
user.get("/manage", manage);

export default user;
