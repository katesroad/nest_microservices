export interface Message {
  address: string;
  asset: string;
  type: 'balance' | 'tl_balance';
}
