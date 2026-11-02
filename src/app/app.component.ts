import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  `,
  styles: [`
    .skip-link { position: fixed; z-index: 100; top: .75rem; left: .75rem; transform: translateY(-160%); padding: .7rem 1rem; border-radius: 8px; background: var(--navy); color: #fff; font-weight: 700; text-decoration: none; }
    .skip-link:focus { transform: translateY(0); }
  `],
})
export class AppComponent {}
