import jwt from 'jsonwebtoken'
import {EncrypterAdapterInterface} from "../../interfaces/adapter/encrypter-adapter-interface";

export class JwtAdapter implements EncrypterAdapterInterface {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }
}
