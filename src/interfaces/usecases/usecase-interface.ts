export interface UsecaseInterface {
  execute: (data?:any) => Promise<any>
}