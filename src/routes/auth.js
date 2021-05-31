import express from "express";
import { loginView, loginPost } from "../controllers/auth/login";
import logout from "../controllers/auth/logout";
import { registerView, registerAction } from "../controllers/auth/register";
import changePassword from "../controllers/auth/changePassword";
const auth = express.Router();

auth.route("/login").get(loginView).post(loginPost);
auth.get("/logout", logout);
auth.route("/register").get(registerView).post(registerAction);
auth.post("/change-password", changePassword);

export default auth;
