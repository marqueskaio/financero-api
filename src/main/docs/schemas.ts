import {loginParamsSchema} from "./schemas/login-params-schema";
import {userSchema} from "./schemas/user-schema";
import {errorSchema} from "./schemas/error-schema";
import {serverErrorSchema} from "./schemas/server-error-schema";
import {unauthorizedSchema} from "./schemas/unauthorized";
import {signupParamsSchema} from "./schemas/signup-params-schema";
import {userParamsSchema} from "./schemas/user-params-schema";
import {usersSchema} from "./schemas/users-schema";

export default {
  loginParams: loginParamsSchema,
  signUpParams: signupParamsSchema,
  userParams: userParamsSchema,
  user: userSchema,
  users: usersSchema,
  error: errorSchema,
  serverError: serverErrorSchema,
  unauthorized: unauthorizedSchema,
}
