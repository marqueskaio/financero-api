export interface HashComparerAdapterInterface {
  compare: (value: string, hash: string) => Promise<boolean>
}
