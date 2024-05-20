
export interface IncomesRepositoryInterface<T, U> {
    create(data: Omit<T, 'id'>): Promise<U | null>;
    update(id: number, data: Omit<T, 'id'>): Promise<U | null>;
    delete(id: number): Promise<U | null>;
    getAll(): Promise<U[] | []>;
    getById(id: number): Promise<U | null>;
}




