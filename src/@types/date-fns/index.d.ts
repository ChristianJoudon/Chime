declare module 'date-fns' {
  export function format(date: any, fmt: string): string;
  export function addDays(date: any, amount: number): any;
  export function startOfWeek(date: any, options?: any): any;
}
