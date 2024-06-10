import {UsersModel} from "@prisma/client";

export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
  accountId?: number | string
  user?: UsersModel | null
}