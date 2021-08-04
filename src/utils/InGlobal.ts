export interface PromiseAcc {
  res: (value: unknown) => void;
  rej: (value: unknown) => void;
}