export interface BottleOrder {
  readonly customerName: string;
  readonly contactNumber: string;
  readonly quantity: number;
  readonly deliveryAddress: string;
  readonly deliveryArea: string;
  readonly totalPkr: number | null;
}
