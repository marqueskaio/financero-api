export interface EncrypterAdapterInterface {
  encrypt: (value: string) => Promise<string>
}
