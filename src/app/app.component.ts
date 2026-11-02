import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusinessService } from './core/business.service';
import { SiteFooterComponent } from './shared/site-footer.component';
import { SiteHeaderComponent } from './shared/site-header.component';

@Component({
  selector: 'aes-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <aes-site-header />
    <main id="main-content" tabindex="-1"><router-outlet /></main>
    <aes-site-footer />
    @if (business.whatsappContactUrl) { <a class="floating-whatsapp" [href]="business.whatsappContactUrl" target="_blank" rel="noopener noreferrer" aria-label="Chat with AAB E SINDH on WhatsApp"><i class="bi bi-whatsapp" aria-hidden="true"></i><span>Chat on WhatsApp</span></a> }
  `,
  styles: [`
    .skip-link { position: fixed; z-index: 100; top: .75rem; left: .75rem; transform: translateY(-160%); padding: .7rem 1rem; border-radius: 8px; background: var(--navy); color: #fff; font-weight: 700; text-decoration: none; }
    .skip-link:focus { transform: translateY(0); }
    .floating-whatsapp { position: fixed; z-index: 30; right: max(1.25rem, env(safe-area-inset-right)); bottom: max(1.25rem, env(safe-area-inset-bottom)); display: inline-flex; min-height: 54px; align-items: center; justify-content: center; gap: .65rem; padding: .8rem 1.1rem; border: 1px solid rgba(255,255,255,.32); border-radius: 999px; background: #16835d; color: #fff; box-shadow: 0 12px 30px rgba(9,65,48,.25); font-size: .84rem; font-weight: 700; text-decoration: none; transition: transform .2s ease, background .2s ease, box-shadow .2s ease; }
    .floating-whatsapp:hover { transform: translateY(-2px); background: #116f4f; color: #fff; box-shadow: 0 16px 34px rgba(9,65,48,.3); }
    .floating-whatsapp i { font-size: 1.35rem; }
    @media (max-width: 520px) { .floating-whatsapp { right: max(1rem, env(safe-area-inset-right)); bottom: max(1rem, env(safe-area-inset-bottom)); width: 54px; height: 54px; min-height: 54px; padding: 0; }.floating-whatsapp span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; } }
  `],
})
export class AppComponent {
  readonly business = inject(BusinessService);
}
