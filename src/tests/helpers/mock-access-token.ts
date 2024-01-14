import DB from "../../databases";
import {sign} from "jsonwebtoken";

export const mockAccessToken = async (role: string): Promise<string> => {
  const result = await DB.usersModel.create({
    data: {
      name: 'Paulo Victor',
      email: 'paulo.telles@rockapps.com.br',
      password: 'paulo',
      role: role
    }
  })
  const accessToken = sign({ id: result.id }, 'secret')
  await DB.usersModel.update({
    where: { id: result.id },
    data: { accessToken }
  })
  return accessToken
}