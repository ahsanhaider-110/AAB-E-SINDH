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
          <section class="map-card" aria-label="General area map, not a delivery coverage map"><div #mapHost class="map-canvas" role="application" aria-label="Interactive map for general location reference"></div><div class="map-disclaimer"><i class="bi bi-info-circle"></i><span>This map is for general orientation only. It does not show confirmed delivery coverage.</span></div></section>
          <aside class="area-panel">
            <div class="area-panel-heading">
              <span class="panel-kicker"><i class="bi bi-geo-alt"></i> SERVICE AREAS</span>
              <span class="delivery-status"><span class="status-dot"></span>Delivery Available</span>
            </div>
            <div class="location-hierarchy">
              <div class="location-level city-level"><span class="location-icon"><i class="bi bi-buildings"></i></span><div><span class="location-label">City</span><strong>Karachi, Pakistan</strong></div></div>
              <div class="hierarchy-connector" aria-hidden="true"></div>
              <div class="location-level area-level"><span class="location-icon"><i class="bi bi-geo-alt"></i></span><div><span class="location-label">Area</span><strong>Gulshan-e-Hadeed Phase 2</strong></div></div>
            </div>
            <div class="markets-heading"><h2>Available Delivery Markets</h2><span>2 markets</span></div>
            <ul class="area-list">@for (area of business.config.serviceAreas; track area) { <li><span class="market-icon"><i class="bi bi-shop"></i></span><strong>{{ area }}</strong><i class="bi bi-check-circle-fill market-check" aria-label="Delivery available"></i></li> }</ul>
            <div class="panel-divider"></div><h3>Not on the list?</h3><p>Leave your area with your order request so delivery availability can be checked directly.</p><a routerLink="/order" class="button-primary">Share your delivery area <i class="bi bi-arrow-right"></i></a>
            <span class="areas-config"><i class="bi bi-sliders"></i> Delivery locations are managed in business settings.</span>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .delivery-layout { display: grid; grid-template-columns: minmax(0,1.45fr) minmax(290px,.8fr); gap: 1.2rem; align-items: stretch; }.map-card { position: relative; min-height: 480px; overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: #eaf2f0; }.map-canvas { width: 100%; height: 100%; min-height: 480px; }.map-disclaimer { position: absolute; z-index: 400; right: 12px; bottom: 12px; left: 12px; display: flex; gap: .5rem; padding: .75rem .85rem; border: 1px solid rgba(220,232,235,.9); border-radius: 10px; background: rgba(255,255,255,.94); color: #526b73; font-size: .72rem; line-height: 1.5; }.map-disclaimer i { color: var(--blue); }
    .area-panel { position: relative; overflow: hidden; padding: 1.5rem; border: 1px solid #dcebed; border-radius: 20px; background: linear-gradient(155deg,#fff 5%,#f7fbfc 100%); box-shadow: 0 18px 42px rgba(13,61,78,.07); }.area-panel::before { position: absolute; top: 0; right: 0; left: 0; height: 4px; background: linear-gradient(90deg,var(--blue),#61c5c6); content: ''; }.area-panel-heading { display: flex; align-items: center; justify-content: space-between; gap: .8rem; }.panel-kicker { color: #64828b; font-size: .62rem; font-weight: 800; letter-spacing: .12em; }.panel-kicker i { margin-right: .4rem; color: var(--blue); }.delivery-status { display: inline-flex; align-items: center; gap: .4rem; padding: .45rem .6rem; border: 1px solid #cce9df; border-radius: 999px; background: #effaf5; color: #176f5e; font-size: .65rem; font-weight: 800; white-space: nowrap; }.status-dot { width: 7px; height: 7px; border-radius: 50%; background: #2e9b72; box-shadow: 0 0 0 3px rgba(46,155,114,.12); }.location-hierarchy { margin-top: 1.25rem; padding: 1rem; border: 1px solid #e4eef0; border-radius: 15px; background: rgba(255,255,255,.8); }.location-level { display: flex; align-items: center; gap: .75rem; }.location-icon { display: grid; width: 38px; height: 38px; flex: 0 0 38px; place-items: center; border-radius: 12px; background: #e8f7f6; color: var(--blue); }.location-level div { display: grid; gap: .18rem; min-width: 0; }.location-label { color: #6a838a; font-size: .62rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }.location-level strong { color: var(--navy); font-family: var(--font-display); font-size: .88rem; font-weight: 800; line-height: 1.35; }.hierarchy-connector { height: 18px; margin-left: 18px; border-left: 1px dashed #9cc9ce; }.area-level { padding-top: .1rem; }.markets-heading { display: flex; align-items: baseline; justify-content: space-between; gap: .5rem; margin: 1.2rem 0 .7rem; }.markets-heading h2 { margin: 0; color: var(--navy); font-family: var(--font-display); font-size: 1rem; font-weight: 800; letter-spacing: -.025em; }.markets-heading > span { color: #70858c; font-size: .65rem; white-space: nowrap; }.area-list { display: grid; gap: .6rem; padding: 0; list-style: none; }.area-list li { display: flex; min-height: 54px; align-items: center; gap: .7rem; padding: .7rem .8rem; border: 1px solid #e4eef0; border-radius: 12px; background: #fff; color: var(--navy); font-size: .82rem; box-shadow: 0 5px 14px rgba(13,61,78,.035); }.area-list li strong { flex: 1; font-weight: 700; }.market-icon { display: grid; width: 34px; height: 34px; flex: 0 0 34px; place-items: center; border-radius: 10px; background: #edf8f8; color: var(--blue); }.market-check { color: #18735f; font-size: .9rem; }.area-panel > p { margin: .5rem 0 0; color: var(--muted); font-size: .8rem; line-height: 1.7; }.panel-divider { margin: 1.2rem 0; border-top: 1px solid var(--line); }.area-panel h3 { color: var(--navy); font-family: var(--font-display); font-size: .9rem; font-weight: 800; }.area-panel .button-primary { width: 100%; margin-top: 1rem; }.areas-config { display: block; margin-top: 1rem; color: #5f747d; font-size: .68rem; }.areas-config i { margin-right: .3rem; }
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
