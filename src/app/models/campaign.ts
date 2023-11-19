export interface Campaign {
  id: string;
  name: string;
  tags: string;
  bidAmount: number;
  campaignFund: number;
  status: boolean;
  town: string;
  radius: number;
}
