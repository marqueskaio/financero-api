import {SignInParamsInterface} from "../data/sign-in-interface";
import {UsersModel} from "@prisma/client";

export interface SignInUsecaseInterface {
  execute: (data: SignInParamsInterface) => Promise<UsersModel | null>
}