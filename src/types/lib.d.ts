declare interface MainStorage {
  auth: {
    userToken: string;
    dateLogin: string;
    userType: string;
    loader: boolean;
    dataUser: {
      id: string;
      points: number;
      email: string;
      name: string;
      language: 'EN' | 'ES';
      plan: 'BASIC' | 'MEDIUM' | 'PREMIUN';
    }
  };
  app: InAppState;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare interface PromiseAcc {
  res: (value: unknown) => void;
  rej: (value: unknown) => void;
}
