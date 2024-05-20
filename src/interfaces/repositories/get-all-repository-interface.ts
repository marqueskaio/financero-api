export interface GetAllRepository<T> {
    getAll(): Promise<T[] | []>;
}
