import {loginPath} from "./paths/login-path";
import {signUpPath} from "./paths/sign-up-path";
import {userPath} from "./paths/user-path";
import {userMePath} from "./paths/user-me-path";

export default {
  '/sign-in/admin': loginPath,
  '/sign-up/admin': signUpPath,
  '/user': userPath,
  '/user/me': userMePath,
}
