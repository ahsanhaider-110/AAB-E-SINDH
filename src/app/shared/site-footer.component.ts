import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessService } from '../core/business.service';
import { BrandMarkComponent } from './brand-mark.component';

@Component({
  selector: 'aes-site-footer',
  standalone: true,
  imports: [RouterLink, BrandMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-brand">
            <aes-brand-mark [light]="true" />
            <p>A simpler way to keep your home supplied with 19-litre drinking water bottles.</p>
          </div>
          <div class="footer-column"><span class="footer-title">Explore</span><a routerLink="/order">Order a bottle</a><a routerLink="/delivery-areas">Delivery areas</a><a routerLink="/water-quality">Water quality</a></div>
          <div class="footer-column"><span class="footer-title">Get in touch</span>
            @if (business.config.phoneNumber && business.phoneHref) { <a [href]="'tel:' + business.phoneHref">Call us: {{ business.config.phoneNumber }}</a> }
            @if (business.whatsappContactUrl) { <a class="whatsapp-contact" href="https://wa.me/923314288435" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp" aria-hidden="true"></i> WhatsApp: +92 331 4288435</a> }
            @else if (!business.config.phoneNumber) { <span class="muted">Contact details to be confirmed</span> }
          </div>
        </div>
        <div class="footer-bottom"><span>© {{ year }} AAB E SINDH</span><span>Made for everyday hydration.</span></div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer { margin-top: 6rem; padding: 4.5rem 0 1.4rem; background: #062f42; color: #c4d6dc; }
    .footer-main { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; padding-bottom: 3.2rem; }
    .footer-brand p { max-width: 290px; margin: 1.25rem 0 0; color: #a7c0c9; font-size: .9rem; line-height: 1.7; }
    .footer-column { display: grid; align-content: start; gap: .8rem; font-size: .88rem; }
    .footer-title { margin-bottom: .2rem; color: #fff; font-weight: 700; }
    .footer-column a, .footer-bottom a { color: #c4d6dc; text-decoration: none; }
    .footer-column a:hover, .footer-bottom a:hover { color: var(--aqua); }
    .footer-column .whatsapp-contact { display: inline-flex; align-items: center; gap: .4rem; }
    .muted { color: #a7c0c9; }
    .footer-bottom { display: flex; justify-content: space-between; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,.14); color: #9ab5bf; font-size: .78rem; }
    @media (max-width: 650px) { .footer-main { grid-template-columns: 1fr 1fr; gap: 2rem 1rem; } .footer-brand { grid-column: 1 / -1; } .footer-bottom { flex-wrap: wrap; } }
  `],
})
export class SiteFooterComponent {
  readonly business = inject(BusinessService);
  readonly year = new Date().getFullYear();
}
