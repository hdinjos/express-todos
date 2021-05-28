import express from "express";
import { loginView, loginPost } from "../controllers/auth/login";
import logout from "../controllers/auth/logout";
const auth = express.Router();

auth.route("/login").get(loginView).post(loginPost);
auth.get("/logout", logout);

export default auth;
