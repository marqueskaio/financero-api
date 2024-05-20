export interface UpdateRepository<T> {
    update(id: number, data: Omit<T, 'id'>): Promise<T | null>;
}
