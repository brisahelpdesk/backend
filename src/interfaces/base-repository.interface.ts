export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    findByUUID(uuid: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(uuid: string, data: Partial<T>): Promise<T>;
    delete(uuid: string): Promise<T>;
}
