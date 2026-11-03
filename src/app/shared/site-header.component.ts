import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BusinessService } from '../core/business.service';
import { BrandMarkComponent } from './brand-mark.component';

@Component({
  selector: 'aes-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <nav class="container header-inner" aria-label="Main navigation" (keydown.escape)="closeMenu()">
        <aes-brand-mark />
        <button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-controls="primary-navigation" [attr.aria-expanded]="menuOpen()" (click)="toggleMenu()">
          <i class="bi" [class.bi-list]="!menuOpen()" [class.bi-x-lg]="menuOpen()"></i>
        </button>
        <div id="primary-navigation" class="nav-links" [class.is-open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">Home</a>
          <a routerLink="/delivery-areas" routerLinkActive="active" (click)="closeMenu()">Delivery areas</a>
          <a routerLink="/water-quality" routerLinkActive="active" (click)="closeMenu()">Our standards</a>
          @if (business.whatsappContactUrl) { <a class="nav-whatsapp" [href]="business.whatsappContactUrl" target="_blank" rel="noopener noreferrer" aria-label="Chat with AAB E SINDH on WhatsApp"><i class="bi bi-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a> }
          <a class="nav-order" routerLink="/order" (click)="closeMenu()">Order a 19L bottle <i class="bi bi-arrow-up-right"></i></a>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .site-header { position: sticky; z-index: 20; top: 0; border-bottom: 1px solid rgba(15, 61, 79, .07); background: rgba(255,255,255,.92); backdrop-filter: blur(16px); }
    .header-inner { position: relative; display: flex; min-height: 78px; align-items: center; justify-content: space-between; }
    .nav-links { display: flex; align-items: center; gap: clamp(1.15rem, 2.4vw, 2rem); }
    .nav-links a { color: #536873; font-size: .87rem; font-weight: 600; text-decoration: none; transition: color .2s ease; }
    .nav-links a:hover, .nav-links a.active { color: var(--blue); }
    .nav-links .nav-order { display: inline-flex; align-items: center; gap: .65rem; padding: .8rem 1.1rem; border-radius: 12px; background: var(--navy); color: #fff; }
    .nav-links .nav-order:hover { background: var(--blue); color: #fff; }
    .nav-links .nav-whatsapp { display: inline-flex; align-items: center; gap: .45rem; color: #197a56; white-space: nowrap; }
    .nav-links .nav-whatsapp i { font-size: 1.08rem; }
    .menu-toggle { display: none; border: 0; background: transparent; color: var(--navy); font-size: 1.5rem; }
    @media (max-width: 760px) {
      .header-inner { min-height: 70px; }
      .menu-toggle { display: grid; width: 44px; height: 44px; place-items: center; }
      .nav-links { position: absolute; top: calc(100% - 1px); right: 12px; left: 12px; display: none; align-items: stretch; gap: 0; padding: .55rem; border: 1px solid var(--line); border-radius: 16px; background: #fff; box-shadow: var(--shadow-card); }
      .nav-links.is-open { display: grid; }
      .nav-links a { padding: .85rem .8rem; }
      .nav-links .nav-order { justify-content: space-between; margin-top: .35rem; }
    }
  `],
})
export class SiteHeaderComponent {
  readonly business = inject(BusinessService);
  readonly menuOpen = signal(false);
  toggleMenu(): void { this.menuOpen.update((value) => !value); }
  closeMenu(): void { this.menuOpen.set(false); }
}
