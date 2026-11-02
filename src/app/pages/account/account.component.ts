import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'aes-account',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-shell">
      <div class="container">
        <div class="page-intro"><span class="eyebrow">CUSTOMER ORDERS</span><h1 class="page-title">Your orders, in one place.</h1><p>Order history and delivery status will be available when a customer account and order service are connected.</p></div>
        <section class="account-card">
          <div class="account-icon"><i class="bi bi-person-lines-fill"></i></div><span class="account-kicker">ORDER HISTORY</span><h2>No connected order history yet.</h2><p>This website does not currently have an account system or database. Order requests are prepared for WhatsApp only when the business has configured its number.</p>
          <div class="account-features"><span><i class="bi bi-clock-history"></i> Previous orders</span><span><i class="bi bi-arrow-repeat"></i> Repeat an order</span><span><i class="bi bi-truck"></i> Delivery status</span></div>
          <a routerLink="/order" class="button-primary">Start a new 19L order <i class="bi bi-arrow-right"></i></a>
        </section>
        <p class="account-footnote"><i class="bi bi-info-circle"></i> Account sign-in, customer records, order history and status tracking require a secure backend integration.</p>
      </div>
    </section>
  `,
  styles: [`
    .account-card { display: grid; max-width: 700px; justify-items: center; margin: 0 auto; padding: 3rem 2rem; border: 1px solid var(--line); border-radius: 22px; background: linear-gradient(145deg,#fff,#f8fcfc); text-align: center; box-shadow: 0 15px 44px rgba(13,61,78,.05); }.account-icon { display: grid; width: 66px; height: 66px; place-items: center; border-radius: 20px; background: #e8f7f6; color: var(--blue); font-size: 1.65rem; }.account-kicker { margin-top: 1.3rem; color: #5d747d; font-size: .63rem; font-weight: 800; letter-spacing: .16em; }.account-card h2 { margin: .55rem 0; color: var(--navy); font-family: var(--font-display); font-size: clamp(1.45rem,3vw,2rem); font-weight: 800; letter-spacing: -.05em; }.account-card > p { max-width: 510px; margin: 0; color: var(--muted); font-size: .9rem; line-height: 1.75; }.account-features { display: flex; flex-wrap: wrap; justify-content: center; gap: .6rem; margin: 1.5rem 0; }.account-features span { display: inline-flex; align-items: center; gap: .45rem; padding: .55rem .7rem; border-radius: 20px; background: #f0f7f8; color: #537079; font-size: .72rem; font-weight: 600; }.account-features i { color: var(--blue); }.account-footnote { display: flex; justify-content: center; gap: .5rem; max-width: 700px; margin: 1.2rem auto 0; color: #596f78; font-size: .75rem; line-height: 1.6; text-align: center; }.account-footnote i { flex: 0 0 auto; color: var(--blue); }
    @media (max-width: 520px) { .account-card { padding: 2rem 1.15rem; }.account-features { display: grid; justify-items: start; } }
  `],
})
export class AccountComponent {}
