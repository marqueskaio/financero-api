import {EncrypterAdapterInterface} from "../../interfaces/adapter/encrypter-adapter-interface";

export const mockEncrypterAdapter = (): EncrypterAdapterInterface => {
  class EncrypterAdapterStub implements EncrypterAdapterInterface {
    encrypt(): Promise<string> {
      return Promise.resolve("encrypter_access_token");
    }
  }

  return new EncrypterAdapterStub()
}