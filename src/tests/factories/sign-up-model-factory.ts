import {SignUpParamsInterface} from "../../interfaces/data/sign-up-interface";

export function mockSignUpAdminParams (data: any = {}): SignUpParamsInterface {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    ...data
  }
}