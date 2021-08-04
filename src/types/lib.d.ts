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
