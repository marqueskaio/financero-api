import bcrypt from 'bcrypt'
import {HasherAdapterInterface} from "../../interfaces/adapter/hash-adapter-interface";
import {HashComparerAdapterInterface} from "../../interfaces/adapter/hash-comparer-adapter-interface";

export class BcryptAdapter implements HasherAdapterInterface, HashComparerAdapterInterface {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }

}