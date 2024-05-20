export interface DeleteByIdIncomesUseCaseInterface {
    execute(id: number): Promise<void>;
}
