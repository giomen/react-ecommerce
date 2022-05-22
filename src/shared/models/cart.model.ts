export interface Shipping {
  id: number;
  label: string;
  price: number;
  active: boolean;
}

export interface LogInfo {
  logged: boolean;
  remember?: boolean;
}
