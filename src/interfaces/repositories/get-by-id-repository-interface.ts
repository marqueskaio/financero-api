export interface GetByIdRepository<T> {
    getById(id: number): Promise<T | null>;
}
