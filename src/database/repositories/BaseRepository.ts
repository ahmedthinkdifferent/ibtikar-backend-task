export interface BaseRepository<T> {

  findOne(whereClause: Record<string, unknown>, columns: string[], raw: boolean): Promise<T>;

  findOneOrThrowException(whereClause: Record<string, unknown>, columns: string[], raw: boolean): Promise<T>;
}