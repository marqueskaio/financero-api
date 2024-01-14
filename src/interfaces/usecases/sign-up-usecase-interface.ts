import {SignUpParamsInterface} from "../data/sign-up-interface";
import {UsersModel} from "@prisma/client";

export interface SignUpUsecaseInterface {
  execute: (data: SignUpParamsInterface) => Promise<UsersModel | null>
}