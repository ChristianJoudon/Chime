declare module 'react' {
  export function useState<S>(initialState: S): [S, (value: S | ((prev: S) => S)) => void];
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useEffect(effect: () => void, deps?: any[]): void;
  export type FC<P = any> = (props: P) => any;
  export type ReactNode = any;
  export type Key = string | number;
  const React: any;
  export default React;
}
