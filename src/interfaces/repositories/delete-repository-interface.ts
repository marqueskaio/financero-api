export interface DeleteRepository<T> {
    delete(id: number): Promise<T | null>;
}
