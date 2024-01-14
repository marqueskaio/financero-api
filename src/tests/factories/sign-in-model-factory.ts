import {SignInParamsInterface} from "../../interfaces/data/sign-in-interface";

export function mockSignInAdminParams(data: any = {}): SignInParamsInterface {
  return {
    email: 'any_email',
    password: 'any_password',
    ...data
  }
}