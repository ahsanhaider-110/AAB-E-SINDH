import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../../core/business.service';
import { BottleOrder } from '../../core/order.model';

@Component({
  selector: 'aes-order',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-shell">
      <div class="container">
        <div class="page-intro">
          <span class="eyebrow">AAB E SINDH · 19L BOTTLE</span>
          <h1 class="page-title">Start your order.</h1>
          <p>Tell us how many 19-litre bottles you need and where to deliver them. Price and availability are confirmed by the business before your order is final.</p>
          @if (business.config.phoneNumber && business.phoneHref) { <p class="phone-contact"><a [href]="'tel:' + business.phoneHref">Call us: {{ business.config.phoneNumber }}</a></p> }
        </div>

        <form class="order-layout" [formGroup]="form" (ngSubmit)="submitOrder()" novalidate>
          <div class="order-main">
            <section class="form-card">
              <div class="card-heading"><span class="step-badge">01</span><div><h2>Your bottle</h2><p>Choose a quantity to get started.</p></div></div>
              <div class="product-row">
                <div class="product-art" aria-hidden="true">
                  <svg viewBox="0 0 120 160"><defs><linearGradient id="mini-water" x1="0" x2="1"><stop stop-color="#dfffff"/><stop offset="1" stop-color="#4ab7cb"/></linearGradient></defs><path d="M45 18h30v15c0 8 8 11 14 18 7 8 11 15 11 27v59c0 9-7 16-16 16H36c-9 0-16-7-16-16V78c0-12 5-20 12-27 6-7 13-10 13-18V18Z" fill="url(#mini-water)" stroke="#fff" stroke-width="3"/><path d="M47 18h26v17H47z" fill="#49b7c8"/><path d="M44 9h32v13H44z" rx="4" fill="#0a6981"/><path d="M21 89c18-4 49 5 78-2v39c0 9-7 16-16 16H36c-9 0-16-7-16-16V89Z" fill="#dfffff" opacity=".55"/><rect x="27" y="88" width="66" height="32" rx="6" fill="#075a78"/><text x="60" y="102" fill="white" text-anchor="middle" font-family="Arial" font-size="7" font-weight="bold">AAB E SINDH</text><text x="60" y="113" fill="#c8f7f5" text-anchor="middle" font-family="Arial" font-size="6">19 LITRE</text></svg>
                </div>
                <div class="product-info"><span class="product-kicker">DRINKING WATER</span><h3>19-litre bottle</h3><p>One dedicated size. Made for regular home and workplace orders.</p>
                  @if (business.config.unitPricePkr !== null) { <strong class="product-price">PKR {{ business.config.unitPricePkr | number }}</strong> }
                  @else { <span class="price-pending"><i class="bi bi-info-circle"></i> Price to be confirmed</span> }
                </div>
                <div class="quantity-control"><label for="quantity">Quantity</label><div class="quantity-input"><button type="button" aria-label="Remove one bottle" (click)="adjustQuantity(-1)" [disabled]="business.quantity() <= 1"><i class="bi bi-dash"></i></button><input id="quantity" type="number" min="1" max="99" formControlName="quantity" (input)="syncQuantity()" aria-describedby="quantity-hint"><button type="button" aria-label="Add one bottle" (click)="adjustQuantity(1)" [disabled]="business.quantity() >= 99"><i class="bi bi-plus"></i></button></div><span id="quantity-hint" class="field-hint">1–99 bottles</span></div>
              </div>
            </section>

            <section class="form-card">
              <div class="card-heading"><span class="step-badge">02</span><div><h2>Delivery details</h2><p>We’ll use these details to confirm your request.</p></div></div>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label" for="customerName">Your name</label><input id="customerName" class="form-control" formControlName="customerName" autocomplete="name" required aria-describedby="customer-name-error" [attr.aria-invalid]="showError('customerName') ? 'true' : null" [class.is-invalid]="showError('customerName')" placeholder="Name for this order"><div id="customer-name-error" class="invalid-feedback">Enter your name.</div></div>
                <div class="col-md-6"><label class="form-label" for="contactNumber">Contact number</label><input id="contactNumber" class="form-control" type="tel" formControlName="contactNumber" autocomplete="tel" required aria-describedby="contact-number-error" [attr.aria-invalid]="showError('contactNumber') ? 'true' : null" [class.is-invalid]="showError('contactNumber')" placeholder="Number we can reach you on"><div id="contact-number-error" class="invalid-feedback">Enter a valid contact number.</div></div>
                <div class="col-12"><label class="form-label" for="deliveryAddress">Delivery address</label><textarea id="deliveryAddress" class="form-control" rows="3" formControlName="deliveryAddress" autocomplete="street-address" required aria-describedby="delivery-address-error" [attr.aria-invalid]="showError('deliveryAddress') ? 'true' : null" [class.is-invalid]="showError('deliveryAddress')" placeholder="House, street and any helpful directions"></textarea><div id="delivery-address-error" class="invalid-feedback">Enter your delivery address.</div></div>
                <div class="col-12"><label class="form-label" for="deliveryArea">Delivery area</label><select id="deliveryArea" class="form-select" formControlName="deliveryArea" [required]="business.config.serviceAreas.length > 0" [attr.aria-describedby]="business.config.serviceAreas.length > 0 ? 'delivery-area-error' : 'delivery-area-hint'" [attr.aria-invalid]="showError('deliveryArea') ? 'true' : null" [class.is-invalid]="showError('deliveryArea')"><option value="">Select an area</option>@for (area of business.config.serviceAreas; track area) { <option [value]="area">{{ area }}</option> }</select>
                  @if (business.config.serviceAreas.length === 0) { <span id="delivery-area-hint" class="field-hint">Verified delivery areas have not been added yet. Enter your area below so availability can be confirmed.</span> }
                  @else { <div id="delivery-area-error" class="invalid-feedback">Select a delivery area.</div> }
                </div>
                @if (business.config.serviceAreas.length === 0) { <div class="col-12"><label class="form-label" for="deliveryAreaText">Your area or neighbourhood</label><input id="deliveryAreaText" class="form-control" formControlName="deliveryAreaText" required aria-describedby="delivery-area-text-error" [attr.aria-invalid]="showError('deliveryAreaText') ? 'true' : null" [class.is-invalid]="showError('deliveryAreaText')" placeholder="Enter your neighbourhood"><div id="delivery-area-text-error" class="invalid-feedback">Enter your area for availability confirmation.</div></div> }
              </div>
            </section>
          </div>

          <aside class="summary-card">
            <span class="summary-kicker">ORDER SUMMARY</span><h2>Your request</h2>
            <div class="summary-product"><div class="summary-drop"><i class="bi bi-droplet-fill"></i></div><div><strong>19-litre bottle</strong><span>Quantity: {{ business.quantity() }}</span></div></div>
            <div class="summary-line"><span>Items</span><strong>{{ business.quantity() }} bottle{{ business.quantity() === 1 ? '' : 's' }}</strong></div>
            <div class="summary-line total-line"><span>Estimated total</span>@if (business.orderTotal() !== null) { <strong>PKR {{ business.orderTotal() | number }}</strong> } @else { <strong>To be confirmed</strong> }</div>
            <p class="summary-note"><i class="bi bi-info-circle"></i> {{ business.orderTotal() === null ? 'The business has not set a bottle price yet. Your total will be confirmed directly.' : 'Final amount and availability are confirmed by the business.' }}</p>
            <button type="submit" class="button-primary submit-button"><span>{{ business.config.whatsappNumber ? 'Continue with WhatsApp' : 'Review order details' }}</span><i class="bi bi-arrow-up-right"></i></button>
            @if (!business.config.whatsappNumber) { <span class="field-hint config-hint">WhatsApp ordering will activate when the verified business number is configured.</span> }
            @if (statusMessage()) { <div class="submit-status" role="status">{{ statusMessage() }}</div> }
            @if (whatsappUrl(); as url) { <a class="whatsapp-fallback" [href]="url" target="_blank" rel="noopener noreferrer">Open WhatsApp to send your order <i class="bi bi-arrow-up-right"></i></a> }
            <div class="secure-note"><i class="bi bi-lock"></i><span>Your details are only prepared for the order request. No account or database is connected.</span></div>
          </aside>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .page-intro { max-width: 670px; }.phone-contact { margin-top: .75rem; font-size: .88rem; font-weight: 700; }.phone-contact a { color: var(--blue); text-decoration: none; }.phone-contact a:hover { text-decoration: underline; text-underline-offset: 3px; }.order-layout { display: grid; grid-template-columns: minmax(0,1.55fr) minmax(275px,.75fr); align-items: start; gap: 1.25rem; }
    .order-main { display: grid; gap: 1.2rem; }.form-card, .summary-card { padding: 1.6rem; border: 1px solid var(--line); border-radius: 18px; background: #fff; box-shadow: 0 8px 26px rgba(13,61,78,.04); }
    .card-heading { display: flex; align-items: center; gap: .9rem; margin-bottom: 1.5rem; }.step-badge { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 13px; background: #e9f7f6; color: var(--blue); font-size: .82rem; font-weight: 800; }
    .card-heading h2, .summary-card h2 { margin: 0; color: var(--navy); font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; }.card-heading p { margin: .3rem 0 0; color: var(--muted); font-size: .8rem; }
    .product-row { display: grid; grid-template-columns: 105px 1fr auto; align-items: center; gap: 1rem; padding: 1.15rem; border: 1px solid #e8eff0; border-radius: 14px; background: #fbfdfd; }.product-art { display: grid; width: 94px; height: 116px; place-items: center; border-radius: 12px; background: #e9f7f7; }.product-art svg { width: 82px; height: 108px; }
    .product-kicker { color: #5f7780; font-size: .6rem; font-weight: 800; letter-spacing: .12em; }.product-info h3 { margin: .35rem 0; color: var(--navy); font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; }.product-info p { margin: 0; color: var(--muted); font-size: .76rem; line-height: 1.5; }.product-price { display: block; margin-top: .55rem; color: var(--navy); font-size: .85rem; }.price-pending { display: inline-flex; align-items: center; gap: .35rem; margin-top: .55rem; color: #5d747d; font-size: .72rem; }
    .quantity-control { min-width: 126px; text-align: center; }.quantity-control label { display: block; margin-bottom: .45rem; color: #294b59; font-size: .75rem; font-weight: 700; }.quantity-input { display: flex; height: 42px; align-items: center; border: 1px solid #dce8eb; border-radius: 10px; background: #fff; }.quantity-input button { display: grid; width: 36px; height: 40px; flex: 0 0 36px; place-items: center; border: 0; background: transparent; color: var(--blue); font-size: 1rem; }.quantity-input button:disabled { color: #b7c6ca; }.quantity-input input { width: 100%; min-width: 28px; border: 0; outline: 0; background: transparent; color: var(--navy); font-size: .86rem; font-weight: 700; text-align: center; appearance: textfield; }.quantity-input input::-webkit-inner-spin-button { appearance: none; }
    .summary-card { position: sticky; top: 98px; }.summary-kicker { display: block; margin-bottom: .45rem; color: #5f747d; font-size: .62rem; font-weight: 800; letter-spacing: .15em; }.summary-card h2 { margin-bottom: 1.35rem; font-size: 1.35rem; }.summary-product { display: flex; align-items: center; gap: .75rem; padding-bottom: 1.1rem; border-bottom: 1px solid var(--line); }.summary-drop { display: grid; width: 43px; height: 43px; place-items: center; border-radius: 12px; background: #e8f8f7; color: var(--blue); }.summary-product strong, .summary-product span { display: block; }.summary-product strong { color: var(--navy); font-size: .82rem; }.summary-product span { margin-top: .3rem; color: var(--muted); font-size: .74rem; }
    .summary-line { display: flex; justify-content: space-between; gap: .8rem; padding: .85rem 0; color: var(--muted); font-size: .8rem; }.summary-line strong { color: var(--navy); }.total-line { border-top: 1px dashed #dce7e9; color: var(--navy); font-weight: 700; }.total-line strong { text-align: right; }.summary-note { display: flex; gap: .5rem; margin: .5rem 0 1rem; color: #617b84; font-size: .73rem; line-height: 1.55; }.summary-note i { color: var(--blue); }
    .submit-button { width: 100%; border: 0; }.config-hint { line-height: 1.5; }.whatsapp-fallback { display: inline-flex; align-items: center; gap: .4rem; margin-top: .75rem; color: var(--blue); font-size: .78rem; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }.secure-note { display: flex; gap: .55rem; margin-top: 1rem; color: #5f747d; font-size: .68rem; line-height: 1.5; }.secure-note i { flex: 0 0 auto; color: #287184; }.submit-status { margin-top: .8rem; padding: .7rem; border-radius: 8px; background: #fff4e5; color: #805c1d; font-size: .78rem; }
    @media (max-width: 850px) { .order-layout { grid-template-columns: 1fr; }.summary-card { position: static; }.product-row { grid-template-columns: 88px 1fr; }.product-art { width: 82px; height: 104px; }.quantity-control { grid-column: 2; justify-self: start; display: flex; align-items: center; gap: .7rem; }.quantity-control label { margin: 0; }.quantity-input { width: 124px; }.quantity-control .field-hint { display: none; } }
    @media (max-width: 500px) { .form-card, .summary-card { padding: 1.15rem; }.product-row { grid-template-columns: 68px minmax(0,1fr); gap: .75rem; padding: .8rem; }.product-art { width: 66px; height: 90px; }.product-art svg { width: 62px; height: 85px; }.product-info h3 { font-size: .94rem; }.product-info p { font-size: .7rem; }.quantity-control { grid-column: 1 / -1; width: 100%; justify-content: space-between; }.quantity-input { width: 130px; } }
  `],
})
export class OrderComponent {
  readonly business = inject(BusinessService);
  readonly statusMessage = signal('');
  readonly whatsappUrl = signal<string | null>(null);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  readonly form = this.fb.nonNullable.group({
    customerName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    contactNumber: ['', [Validators.required, Validators.pattern(/^(?=(?:\D*\d){7,15}\D*$)[+()\d\s-]{7,24}$/)]],
    deliveryAddress: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(300)]],
    deliveryArea: ['', this.business.config.serviceAreas.length > 0 ? Validators.required : []],
    deliveryAreaText: ['', this.business.config.serviceAreas.length === 0 ? [Validators.required, Validators.pattern(/\S/)] : []],
    quantity: [1, [Validators.required, Validators.min(1), Validators.max(99)]],
  });

  constructor() {
    this.form.controls.quantity.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((quantity) => {
      if (quantity !== null) this.business.setQuantity(quantity);
    });
  }

  showError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  syncQuantity(): void {
    const control = this.form.controls.quantity;
    const quantity = control.value;
    if (quantity >= 1 && quantity <= 99) this.business.setQuantity(quantity);
  }

  adjustQuantity(delta: number): void {
    const quantity = this.business.quantity() + delta;
    this.business.setQuantity(quantity);
    this.form.controls.quantity.setValue(this.business.quantity());
  }

  submitOrder(): void {
    this.form.markAllAsTouched();
    this.statusMessage.set('');
    this.whatsappUrl.set(null);
    if (this.form.invalid) return;

    const values = this.form.getRawValue();
    const deliveryArea = (this.business.config.serviceAreas.length > 0
      ? values.deliveryArea
      : values.deliveryAreaText).trim();

    const order: BottleOrder = {
      customerName: values.customerName.trim(),
      contactNumber: values.contactNumber.trim(),
      quantity: values.quantity,
      deliveryAddress: values.deliveryAddress.trim(),
      deliveryArea,
      totalPkr: this.business.orderTotal(),
    };
    const url = this.business.createWhatsAppUrl(order);
    if (!url) {
      this.statusMessage.set('This order is not sent or stored. The business WhatsApp number has not been configured yet.');
      return;
    }
    this.whatsappUrl.set(url);
    this.statusMessage.set('Your order details are ready. Review and send the message in WhatsApp; use the link below if it did not open.');
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
