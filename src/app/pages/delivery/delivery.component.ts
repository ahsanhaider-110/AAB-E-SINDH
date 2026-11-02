import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessService } from '../../core/business.service';

@Component({
  selector: 'aes-delivery',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-shell">
      <div class="container">
        <div class="page-intro">
          <span class="eyebrow">DELIVERY INFORMATION</span><h1 class="page-title">Check before you order.</h1>
          <p>We’ll only show delivery areas when the business has confirmed them. No neighbourhoods or delivery promises have been assumed.</p>
        </div>
        <div class="delivery-layout">
          <section class="map-card" aria-label="General Karachi map, not a delivery coverage map"><div #mapHost class="map-canvas" role="application" aria-label="Interactive map for general location reference"></div><div class="map-disclaimer"><i class="bi bi-info-circle"></i><span>This map is for general orientation only. It does not show confirmed delivery coverage.</span></div></section>
          <aside class="area-panel"><span class="panel-kicker"><i class="bi bi-geo-alt"></i> CONFIRMED SERVICE AREAS</span><h2>Coverage, clearly stated.</h2>
            @if (business.config.serviceAreas.length) { <ul class="area-list">@for (area of business.config.serviceAreas; track area) { <li><i class="bi bi-check-circle-fill"></i><span>{{ area }}</span><span class="available">Available</span></li> }</ul> }
            @else { <div class="empty-areas"><span class="empty-icon"><i class="bi bi-map"></i></span><strong>Areas are being confirmed</strong><p>There are no verified delivery locations published yet. Please share your neighbourhood with the business for a direct availability check.</p></div> }
            <div class="panel-divider"></div><h3>Not on the list?</h3><p>Delivery availability can only be confirmed by the business. Leave your area with your order request so it can be checked.</p><a routerLink="/order" class="button-primary">Share your delivery area <i class="bi bi-arrow-right"></i></a>
            <span class="areas-config"><i class="bi bi-sliders"></i> Delivery locations are managed in business settings.</span>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .delivery-layout { display: grid; grid-template-columns: minmax(0,1.45fr) minmax(290px,.8fr); gap: 1.2rem; align-items: stretch; }.map-card { position: relative; min-height: 480px; overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: #eaf2f0; }.map-canvas { width: 100%; height: 100%; min-height: 480px; }.map-disclaimer { position: absolute; z-index: 400; right: 12px; bottom: 12px; left: 12px; display: flex; gap: .5rem; padding: .75rem .85rem; border: 1px solid rgba(220,232,235,.9); border-radius: 10px; background: rgba(255,255,255,.94); color: #526b73; font-size: .72rem; line-height: 1.5; }.map-disclaimer i { color: var(--blue); }
    .area-panel { padding: 1.6rem; border: 1px solid var(--line); border-radius: 18px; background: #fff; }.panel-kicker { color: #64828b; font-size: .62rem; font-weight: 800; letter-spacing: .12em; }.panel-kicker i { margin-right: .4rem; color: var(--blue); }.area-panel h2 { margin: .85rem 0 1.2rem; color: var(--navy); font-family: var(--font-display); font-size: 1.45rem; font-weight: 800; letter-spacing: -.045em; }.empty-areas { display: grid; justify-items: start; padding: 1.2rem; border-radius: 13px; background: #f5fafb; }.empty-icon { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 12px; background: #e2f5f4; color: var(--blue); }.empty-areas strong { margin-top: 1rem; color: var(--navy); font-size: .9rem; }.empty-areas p, .area-panel > p { margin: .5rem 0 0; color: var(--muted); font-size: .8rem; line-height: 1.7; }.panel-divider { margin: 1.3rem 0; border-top: 1px solid var(--line); }.area-panel h3 { color: var(--navy); font-family: var(--font-display); font-size: .95rem; font-weight: 800; }.area-panel .button-primary { width: 100%; margin-top: 1.2rem; }.areas-config { display: block; margin-top: 1rem; color: #5f747d; font-size: .68rem; }.areas-config i { margin-right: .3rem; }.area-list { display: grid; gap: .7rem; padding: 0; list-style: none; }.area-list li { display: flex; align-items: center; gap: .55rem; color: var(--navy); font-size: .82rem; }.area-list li > i { color: #18735f; }.available { margin-left: auto; color: #176f5e; font-size: .7rem; font-weight: 700; }
    @media (max-width: 800px) { .delivery-layout { grid-template-columns: 1fr; }.map-card, .map-canvas { min-height: 360px; height: 360px; } }
  `],
})
export class DeliveryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapHost', { static: true }) private mapHost!: ElementRef<HTMLDivElement>;
  readonly business = inject(BusinessService);
  private map?: import('leaflet').Map;
  private resizeFrame?: number;

  async ngAfterViewInit(): Promise<void> {
    try {
      const leaflet = await import('leaflet');
      if (!this.mapHost.nativeElement.isConnected) return;
      this.map = leaflet.map(this.mapHost.nativeElement, { scrollWheelZoom: false, zoomControl: true })
        .setView([24.8607, 67.0011], 10);
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
      this.resizeFrame = requestAnimationFrame(() => this.map?.invalidateSize());
    } catch (error) {
      console.error('Unable to initialize the delivery-area map.', error);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeFrame !== undefined) cancelAnimationFrame(this.resizeFrame);
    this.map?.remove();
    this.map = undefined;
  }
}
