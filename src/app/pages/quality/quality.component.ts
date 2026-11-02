import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessService } from '../../core/business.service';

@Component({
  selector: 'aes-quality',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-shell">
      <div class="container">
        <div class="page-intro">
          <span class="eyebrow">WATER QUALITY</span><h1 class="page-title">Clear information. Nothing made up.</h1>
          <p>Water quality should be supported by evidence. We publish reports and test details here only when the business has provided verified documents.</p>
        </div>
        <div class="quality-grid">
          <section class="quality-card main-card"><span class="quality-icon"><i class="bi bi-file-earmark-medical"></i></span><span class="card-kicker">DOCUMENTS & REPORTS</span><h2>Available laboratory reports</h2>
            @if (business.config.qualityReports.length) { <p>Open the reports supplied by the business.</p><div class="report-list">@for (report of business.config.qualityReports; track report.url) { <a [href]="report.url" target="_blank" rel="noopener noreferrer"><span><i class="bi bi-file-earmark-pdf"></i>{{ report.title }}</span><i class="bi bi-download"></i></a> }</div> }
            @else { <p>No laboratory reports have been provided for publication yet. We won’t claim test results or certifications without supporting documents.</p><div class="report-status"><i class="bi bi-hourglass-split"></i><span><strong>Reports not yet available</strong><small>Verified documents can be added in business settings.</small></span></div> }
          </section>
          <section class="quality-card"><span class="quality-icon"><i class="bi bi-eyedropper"></i></span><span class="card-kicker">QUALITY INDICATORS</span><h2>Measured, not assumed.</h2><p>Indicators such as pH, TDS and microbiological results will be shown only alongside verified test details and dates.</p><div class="indicator-empty"><i class="bi bi-clipboard2-check"></i><span>No verified indicator data published.</span></div></section>
          <section class="quality-card"><span class="quality-icon"><i class="bi bi-info-square"></i></span><span class="card-kicker">ABOUT OUR PROCESS</span><h2>Purification information</h2><p>Specific purification methods have not been confirmed by the business. We’ll update this section when verified process information is available.</p><div class="indicator-empty"><i class="bi bi-shield-check"></i><span>No process claims have been added.</span></div></section>
        </div>
        <div class="quality-note"><i class="bi bi-chat-square-text"></i><p><strong>Have a question before ordering?</strong><br>Submit your 19L bottle request with your contact details and the business can confirm available product and delivery information directly.</p><a routerLink="/order">Start an order <i class="bi bi-arrow-right"></i></a></div>
      </div>
    </section>
  `,
  styles: [`
    .quality-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; }.quality-card { padding: 1.6rem; border: 1px solid var(--line); border-radius: 18px; background: #fff; }.main-card { grid-row: span 2; display: flex; flex-direction: column; align-items: flex-start; }.quality-icon { display: grid; width: 46px; height: 46px; place-items: center; border-radius: 14px; background: #e7f7f6; color: var(--blue); font-size: 1.15rem; }.card-kicker { margin-top: 1.3rem; color: #607780; font-size: .6rem; font-weight: 800; letter-spacing: .14em; }.quality-card h2 { margin: .55rem 0 .65rem; color: var(--navy); font-family: var(--font-display); font-size: 1.23rem; font-weight: 800; letter-spacing: -.035em; }.quality-card p { margin: 0; color: var(--muted); font-size: .85rem; line-height: 1.75; }.report-status { display: flex; align-items: center; gap: .8rem; width: 100%; margin-top: auto; padding: 1rem; border-radius: 12px; background: #f4f9fa; color: var(--blue); }.report-status > i { font-size: 1.2rem; }.report-status strong, .report-status small { display: block; }.report-status strong { color: var(--navy); font-size: .82rem; }.report-status small { margin-top: .2rem; color: var(--muted); font-size: .73rem; }.main-card > p { margin-bottom: 2rem; }.report-list { display: grid; width: 100%; gap: .6rem; }.report-list a, .report-list a span { display: flex; align-items: center; gap: .7rem; }.report-list a { justify-content: space-between; padding: .9rem; border: 1px solid var(--line); border-radius: 10px; color: var(--navy); font-size: .8rem; text-decoration: none; }.report-list a:hover { background: #f5fafb; }.report-list a i { color: var(--blue); }.indicator-empty { display: flex; align-items: center; gap: .6rem; margin-top: 1rem; padding-top: .9rem; border-top: 1px solid var(--line); color: #5d747d; font-size: .74rem; }.indicator-empty i { color: #287184; }.quality-note { display: flex; align-items: center; gap: 1rem; margin-top: 1.2rem; padding: 1.2rem 1.4rem; border: 1px solid #d9ecec; border-radius: 14px; background: #f3faf9; }.quality-note > i { color: var(--blue); font-size: 1.25rem; }.quality-note p { flex: 1; margin: 0; color: #5e777e; font-size: .8rem; line-height: 1.6; }.quality-note strong { color: var(--navy); }.quality-note a { flex: 0 0 auto; color: var(--blue); font-size: .8rem; font-weight: 700; text-decoration: none; }
    @media (max-width: 700px) { .quality-grid { grid-template-columns: 1fr; }.main-card { grid-row: auto; min-height: 270px; }.quality-note { align-items: flex-start; flex-wrap: wrap; }.quality-note a { margin-left: 2.2rem; } }
  `],
})
export class QualityComponent {
  readonly business = inject(BusinessService);
}
