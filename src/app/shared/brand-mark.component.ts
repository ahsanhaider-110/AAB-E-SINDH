import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'aes-brand-mark',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="brand-mark" [class.brand-mark-light]="light()" routerLink="/" aria-label="AAB E SINDH home">
      <span class="brand-icon" aria-hidden="true"><i class="bi bi-droplet-fill"></i></span>
      <span class="brand-type"><strong>AAB E SINDH</strong><small>WATER, DELIVERED</small></span>
    </a>
  `,
  styles: [`
    :host { display: inline-flex; }
    .brand-mark { display: inline-flex; align-items: center; gap: .72rem; color: var(--ink); text-decoration: none; }
    .brand-mark-light { color: #fff; }
    .brand-mark-light .brand-type small { color: #b5cbd1; }
    .brand-icon { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 14px; background: var(--navy); color: var(--aqua); font-size: 1.15rem; }
    .brand-type { display: grid; line-height: 1.05; }
    .brand-type strong { font-family: var(--font-display); font-size: .99rem; font-weight: 800; letter-spacing: -.035em; }
    .brand-type small { margin-top: .33rem; color: var(--muted); font-size: .57rem; font-weight: 700; letter-spacing: .16em; }
  `],
})
export class BrandMarkComponent {
  readonly light = input(false);
}
