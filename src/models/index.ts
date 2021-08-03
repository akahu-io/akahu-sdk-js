export * from './accounts';
export * from './auth';
export * from './connections';
export * from './identity';
export * from './transactions';
export * from './users';


export interface Paginated<T> {
  items: T[],
  cursor: { next?: string },
}
