import { Injectable, computed, signal } from '@angular/core';
import { BUSINESS_CONFIG } from './business-config';
import { BottleOrder } from './order.model';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  readonly config = BUSINESS_CONFIG;
  readonly phoneHref = this.config.phoneNumber?.replace(/\s/g, '') ?? null;
  readonly whatsappContactUrl = this.createWhatsAppContactUrl();
  private readonly orderQuantity = signal(1);
  readonly quantity = this.orderQuantity.asReadonly();
  readonly orderTotal = computed(() => {
    const price = this.config.unitPricePkr;
    return price === null ? null : price * this.orderQuantity();
  });

  setQuantity(quantity: number): void {
    this.orderQuantity.set(Math.min(99, Math.max(1, Math.floor(quantity) || 1)));
  }

  private createWhatsAppContactUrl(): string | null {
    const number = this.config.whatsappNumber?.replace(/[\s()+-]/g, '');
    if (!number || !/^\d{8,15}$/.test(number)) return null;

    const message = 'Assalam-o-Alaikum, I want to order water from AAB-E-SINDH.';
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  createWhatsAppUrl(order: BottleOrder): string | null {
    const number = this.config.whatsappNumber?.replace(/[\s()+-]/g, '');
    if (!number || !/^\d{8,15}$/.test(number)) return null;

    const lines = [
      'Assalam-o-Alaikum, I want to order water from AAB-E-SINDH.',
      `Name: ${order.customerName}`,
      `Contact number: ${order.contactNumber}`,
      `19L bottles: ${order.quantity}`,
      `Delivery address: ${order.deliveryAddress}`,
      `Delivery area: ${order.deliveryArea}`,
    ];
    if (order.totalPkr !== null) lines.push(`Order total: PKR ${order.totalPkr.toLocaleString('en-PK')}`);
    return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
  }
}
