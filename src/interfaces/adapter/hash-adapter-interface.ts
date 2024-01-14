export interface HasherAdapterInterface {
  hash: (value: string) => Promise<string>
}