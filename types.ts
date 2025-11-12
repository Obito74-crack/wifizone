
export interface TariffPlan {
  id: number;
  name: string;
  price: number;
  duration: string;
  speed: string;
  data?: string;
  color: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export enum View {
  Buy,
  Login,
}

export enum PaymentStatus {
  Idle,
  Processing,
  Success,
  Error,
}

export enum PaymentMethod {
  OrangeMoney,
  MoMo,
}
