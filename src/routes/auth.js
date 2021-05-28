import express from "express";
import { loginView, loginPost } from "../controllers/auth/login";
import logout from "../controllers/auth/logout";
import { registerView, registerAction } from "../controllers/auth/register";
const auth = express.Router();

auth.route("/login").get(loginView).post(loginPost);
auth.get("/logout", logout);
auth.route("/register").get(registerView).post(registerAction);

export default auth;
