import {HasherAdapterInterface} from "../../interfaces/adapter/hash-adapter-interface";
import {HashComparerAdapterInterface} from "../../interfaces/adapter/hash-comparer-adapter-interface";

export const mockHasherAdapter = (): HasherAdapterInterface => {
  class BcryptAdapterStub implements HasherAdapterInterface {
    async hash(): Promise<string> {
      return Promise.resolve("hashed_value");
    }
  }

  return new BcryptAdapterStub()
}

export const mockHasherCompareAdapter = (): HashComparerAdapterInterface => {
  class BcryptAdapterStub implements HashComparerAdapterInterface {
    async compare(): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new BcryptAdapterStub()
}