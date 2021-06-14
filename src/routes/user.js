import { detailProfile, editProfile } from "../controllers/user";
import { manageView, manageRoleAct } from "../controllers/user/manage";
import expres from "express";

const user = expres.Router();
user.get("/profile", detailProfile);
user.post("/profile/update", editProfile);
user.get("/manage", manageView);
user.post("/manage/role", manageRoleAct);

export default user;
