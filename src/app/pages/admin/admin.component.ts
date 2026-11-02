import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

@Component({
  selector: 'aes-admin',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-shell admin-shell">
      <div class="container">
        <div class="admin-heading"><div><span class="eyebrow">AAB E SINDH · OPERATIONS</span><h1 class="page-title">Dashboard preview</h1><p>Illustrative interface only. No live orders or database are connected.</p></div><span class="demo-badge"><i class="bi bi-info-circle"></i> DEMO DATA</span></div>
        <div class="demo-notice"><i class="bi bi-exclamation-circle"></i><span><strong>All analytics below are illustrative demo data.</strong> They are not actual AAB E SINDH sales, customers or order records. Dashboard actions do not update a backend.</span></div>
        <section class="metric-grid" aria-label="Illustrative order metrics">
          <article class="metric-card"><span class="metric-label">Total orders <i class="bi bi-three-dots"></i></span><strong>248</strong><span class="metric-foot"><i class="bi bi-bar-chart"></i> Demo metric · not live</span></article>
          <article class="metric-card"><span class="metric-label">Pending <i class="bi bi-three-dots"></i></span><strong>36</strong><span class="metric-foot"><i class="bi bi-hourglass-split"></i> Demo metric · not live</span></article>
          <article class="metric-card"><span class="metric-label">Completed <i class="bi bi-three-dots"></i></span><strong>197</strong><span class="metric-foot"><i class="bi bi-check2-circle"></i> Demo metric · not live</span></article>
          <article class="metric-card"><span class="metric-label">Customers <i class="bi bi-three-dots"></i></span><strong>—</strong><span class="metric-foot">No customer records connected</span></article>
        </section>
        <div class="admin-grid">
          <section class="admin-card chart-card"><div class="card-title-row"><div><span class="card-overline">ORDER ACTIVITY · DEMO</span><h2>Monthly orders</h2></div><span class="chart-label">Illustrative</span></div><div class="chart-wrap"><canvas #ordersChart aria-label="Illustrative monthly orders chart" role="img"></canvas></div><p class="chart-note">Sample chart data is illustrative and does not represent actual order volume.</p></section>
          <section class="admin-card settings-card"><div class="card-title-row"><div><span class="card-overline">BUSINESS SETTINGS</span><h2>Product & delivery</h2></div><i class="bi bi-sliders settings-icon"></i></div>
            <div class="setting-row"><span><i class="bi bi-droplet"></i> 19L bottle price</span><strong class="not-set">Not configured</strong></div>
            <div class="setting-row"><span><i class="bi bi-whatsapp"></i> WhatsApp number</span><strong class="not-set">Not configured</strong></div>
            <div class="setting-row"><span><i class="bi bi-geo-alt"></i> Verified areas</span><strong class="not-set">Not configured</strong></div>
            <div class="setting-row"><span><i class="bi bi-file-earmark-check"></i> Quality reports</span><strong class="not-set">Not configured</strong></div>
            <p class="setting-hint">Update verified business details in <code>src/app/core/business-config.ts</code>. This preview has no authentication or persistent admin controls.</p>
          </section>
        </div>
        <div class="admin-lower">
          <section class="admin-card orders-card"><div class="card-title-row"><div><span class="card-overline">ORDER MANAGEMENT</span><h2>Recent orders</h2></div><span class="demo-pill">DEMO PREVIEW</span></div>
            <div class="empty-orders"><i class="bi bi-inboxes"></i><strong>No live orders</strong><span>Order management and status changes become available after connecting a backend.</span></div>
          </section>
          <section class="admin-card customer-card"><div class="card-title-row"><div><span class="card-overline">CUSTOMER RECORDS</span><h2>Customers</h2></div><i class="bi bi-people customer-icon"></i></div>
            <div class="empty-orders compact-empty"><i class="bi bi-person-lock"></i><strong>No customer data connected</strong><span>Customer records are not stored by this frontend.</span></div>
          </section>
        </div>
        <div class="backend-note"><i class="bi bi-plug"></i><span><strong>Backend integration point</strong> — Connect authenticated admin APIs for real orders, customers, pricing, service areas, reports and status updates. Do not treat this public preview as a production admin system.</span></div>
      </div>
    </section>
  `,
  styles: [`
    .admin-shell { background: #f7fafb; }.admin-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }.admin-heading .page-title { font-size: clamp(2.2rem,4vw,3rem); }.admin-heading p { margin: .75rem 0 0; color: var(--muted); font-size: .9rem; }.demo-badge, .demo-pill { display: inline-flex; align-items: center; gap: .4rem; padding: .55rem .7rem; border: 1px solid #f0ddb4; border-radius: 20px; background: #fff9eb; color: #8d6b27; font-size: .62rem; font-weight: 800; letter-spacing: .06em; white-space: nowrap; }.demo-notice { display: flex; gap: .7rem; margin-bottom: 1.2rem; padding: .9rem 1rem; border: 1px solid #f0ddb4; border-radius: 12px; background: #fffaf0; color: #796238; font-size: .78rem; line-height: 1.55; }.demo-notice > i { flex: 0 0 auto; margin-top: .1rem; color: #b38326; }.demo-notice strong { color: #6d511f; }
    .metric-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: .9rem; }.metric-card, .admin-card { border: 1px solid var(--line); border-radius: 15px; background: #fff; }.metric-card { padding: 1.15rem; }.metric-label { display: flex; align-items: center; justify-content: space-between; color: #5f747d; font-size: .75rem; font-weight: 600; }.metric-label i { color: #a4b4b8; }.metric-card > strong { display: block; margin: .7rem 0; color: var(--navy); font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; }.metric-foot { color: #5f747d; font-size: .67rem; }.metric-foot i { margin-right: .25rem; color: #287184; }
    .admin-grid { display: grid; grid-template-columns: 1.35fr .9fr; gap: .9rem; margin-top: .9rem; }.admin-grid > *, .admin-lower > * { min-width: 0; }.admin-card { padding: 1.25rem; }.card-title-row { display: flex; align-items: center; justify-content: space-between; gap: .8rem; }.card-overline { color: #607780; font-size: .59rem; font-weight: 800; letter-spacing: .13em; }.card-title-row h2 { margin: .35rem 0 0; color: var(--navy); font-family: var(--font-display); font-size: 1.08rem; font-weight: 800; }.chart-label { padding: .38rem .55rem; border: 1px solid var(--line); border-radius: 7px; color: #5f747d; font-size: .65rem; }.chart-wrap { height: 220px; min-width: 0; margin-top: 1rem; }.chart-wrap canvas { max-width: 100%; }.chart-note { margin: .5rem 0 0; color: #607780; font-size: .67rem; }.settings-icon, .customer-icon { color: var(--blue); font-size: 1.1rem; }.setting-row { display: flex; justify-content: space-between; gap: .5rem; padding: .8rem 0; border-bottom: 1px solid #edf2f3; color: #526e77; font-size: .76rem; }.setting-row:first-of-type { margin-top: .7rem; }.setting-row span { display: inline-flex; align-items: center; gap: .5rem; }.setting-row span i { color: #4994a1; }.setting-row strong { text-align: right; }.not-set { color: #795d30; font-size: .68rem; font-weight: 600; }.setting-hint { margin: .85rem 0 0; color: #5f747d; font-size: .7rem; line-height: 1.6; }.setting-hint code { color: #087c9c; overflow-wrap: anywhere; }
    .admin-lower { display: grid; grid-template-columns: 1.35fr .9fr; gap: .9rem; margin-top: .9rem; }.orders-card, .customer-card { min-height: 230px; }.empty-orders { display: grid; justify-items: center; gap: .5rem; padding: 2rem 1rem 1rem; color: #5f747d; text-align: center; }.empty-orders > i { color: #287184; font-size: 1.5rem; }.empty-orders strong { color: #486771; font-size: .82rem; }.empty-orders span { max-width: 330px; font-size: .72rem; line-height: 1.5; }.compact-empty { padding-top: 1.5rem; }.backend-note { display: flex; gap: .7rem; margin-top: 1rem; padding: .9rem 1rem; border: 1px solid #d6e9eb; border-radius: 11px; background: #f1f9f9; color: #607c84; font-size: .74rem; line-height: 1.6; }.backend-note > i { flex: 0 0 auto; color: var(--blue); }.backend-note strong { color: var(--navy); }
    @media (max-width: 850px) { .metric-grid { grid-template-columns: repeat(2,1fr); }.admin-grid, .admin-lower { grid-template-columns: 1fr; } }
    @media (max-width: 480px) { .metric-card { padding: .9rem; }.metric-card > strong { font-size: 1.5rem; }.admin-card { padding: 1rem; }.admin-heading { flex-direction: column; } }
  `],
})
export class AdminComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ordersChart', { static: true }) private chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Illustrative orders',
          data: [38, 45, 41, 58, 52, 68, 61, 74, 63, 81, 72, 90],
          backgroundColor: '#98dedc',
          hoverBackgroundColor: '#087c9c',
          borderRadius: 5,
          maxBarThickness: 22,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (context) => `Demo orders: ${context.parsed.y}` } },
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { color: '#80939a', font: { size: 10 } } },
          y: { beginAtZero: true, border: { display: false }, grid: { color: '#edf2f3' }, ticks: { stepSize: 20, color: '#80939a', font: { size: 10 } } },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
