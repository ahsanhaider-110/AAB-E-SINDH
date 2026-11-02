import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessService } from '../../core/business.service';

@Component({
  selector: 'aes-home',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow"><span class="live-dot"></span> A better way to order water</span>
          <h1>Good water.<br><span>Right to your door.</span></h1>
          <p class="hero-lede">Your everyday 19-litre bottle, ordered simply. AAB E SINDH makes getting drinking water delivered feel effortless.</p>
          <div class="hero-actions">
            <a class="button-primary" routerLink="/order">Order your 19L bottle <i class="bi bi-arrow-up-right"></i></a>
            @if (business.whatsappContactUrl) { <a class="button-whatsapp" [href]="business.whatsappContactUrl" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp" aria-hidden="true"></i> Order on WhatsApp</a> }
            <a class="text-action" routerLink="/delivery-areas"><span class="play-icon"><i class="bi bi-geo-alt"></i></span> Check delivery areas</a>
          </div>
          <div class="hero-assurance"><span><i class="bi bi-droplet"></i> One bottle size. No guesswork.</span><span><i class="bi bi-chat-dots"></i> Clear order details</span></div>
        </div>
        <div class="hero-visual" aria-label="Illustration of a 19-litre water bottle">
          <div class="visual-orbit orbit-one"></div><div class="visual-orbit orbit-two"></div>
          <div class="hero-disc"></div>
          <svg class="bottle-illustration" viewBox="0 0 300 440" role="img" aria-labelledby="bottle-title">
            <title id="bottle-title">AAB E SINDH 19-litre water bottle</title>
            <defs>
              <linearGradient id="jug" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f8ffff" stop-opacity=".96"/><stop offset=".35" stop-color="#a8e8ed" stop-opacity=".78"/><stop offset=".72" stop-color="#49b4ca" stop-opacity=".82"/><stop offset="1" stop-color="#e4ffff" stop-opacity=".94"/></linearGradient>
              <linearGradient id="label" x1="0" x2="1"><stop stop-color="#07394f"/><stop offset="1" stop-color="#087c9c"/></linearGradient>
              <linearGradient id="water" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#65d6df" stop-opacity=".72"/></linearGradient>
              <filter id="jugShadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="20" stdDeviation="14" flood-color="#0b526a" flood-opacity=".22"/></filter>
            </defs>
            <ellipse cx="149" cy="414" rx="91" ry="15" fill="#0c526a" opacity=".14"/>
            <g filter="url(#jugShadow)">
              <path d="M119 37h62v31c0 12 4 22 17 33 21 18 42 39 42 75v181c0 23-19 42-42 42H99c-23 0-42-19-42-42V176c0-36 21-57 42-75 13-11 20-21 20-33V37Z" fill="url(#jug)" stroke="#fff" stroke-opacity=".86" stroke-width="4"/>
              <path d="M63 249c25-8 43-6 69-2 26 5 54 7 110-2v112c0 22-18 40-40 40h-99c-22 0-40-18-40-40V249Z" fill="url(#water)" opacity=".72"/>
              <path d="M197 117c19 16 31 33 31 62v41c0 9-7 16-16 16h-11c-8 0-14-6-14-14v-24c0-17-7-26-18-35" fill="none" stroke="#f4ffff" stroke-opacity=".88" stroke-width="12" stroke-linecap="round"/>
              <path d="M122 37h57v35h-57z" fill="#59bdcc" stroke="#eaffff" stroke-width="3"/>
              <path d="M116 22h69c6 0 11 5 11 11v13h-91V33c0-6 5-11 11-11Z" fill="#0c6480"/>
              <path d="M110 27h80M108 34h84M108 41h84" stroke="#a9eced" stroke-opacity=".8" stroke-width="3"/>
              <path d="M65 199c0-17 10-34 25-48M77 324c0 18 7 31 18 37" fill="none" stroke="#fff" stroke-opacity=".8" stroke-linecap="round" stroke-width="7"/>
              <rect x="76" y="249" width="151" height="78" rx="12" fill="url(#label)"/>
              <path d="M93 263h119" stroke="#91e5e3" stroke-width="2" opacity=".7"/>
              <path d="M98 270h14l-7 13h-14l7-13Z" fill="#91e5e3"/>
              <text x="119" y="284" fill="#fff" font-family="Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="1">AAB E SINDH</text>
              <text x="96" y="306" fill="#d9ffff" font-family="Arial,sans-serif" font-size="9" letter-spacing="2">19 LITRE BOTTLE</text>
              <path d="M84 357h135" stroke="#d7ffff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>
            </g>
            <circle cx="221" cy="126" r="20" fill="#fff"/><path d="M221 115c-5 7-9 12-9 17a9 9 0 1 0 18 0c0-5-4-10-9-17Z" fill="#36b8c5"/>
          </svg>
          <div class="floating-note note-top"><span class="note-icon"><i class="bi bi-box-seam"></i></span><span><strong>Made simple</strong><small>One dedicated bottle size</small></span></div>
          <div class="floating-note note-bottom"><span class="tiny-stars"><i class="bi bi-droplet-fill"></i></span><span><strong>19 litres</strong><small>For your everyday routine</small></span></div>
          <span class="visual-caption">THE 19L BOTTLE, REIMAGINED</span>
        </div>
      </div>
      <div class="container hero-bottom"><span>JUST WHAT YOU NEED</span><span class="hero-line"></span><span>19-LITRE DRINKING WATER DELIVERY</span></div>
    </section>

    <section class="benefits-section">
      <div class="container">
        <div class="section-heading centered">
          <span class="eyebrow">A little more thoughtful</span>
          <h2>Water ordering,<br>without the fuss.</h2>
          <p>One clear product, a straightforward order, and the details you need before you place it.</p>
        </div>
        <div class="benefit-grid">
          <article class="benefit-card"><span class="benefit-icon"><i class="bi bi-droplet"></i></span><span class="card-number">01 / THE PRODUCT</span><h3>Only the 19L bottle</h3><p>Focused on the drinking water bottle your home or workplace actually orders.</p></article>
          <article class="benefit-card"><span class="benefit-icon"><i class="bi bi-list-check"></i></span><span class="card-number">02 / YOUR ORDER</span><h3>Every detail, up front</h3><p>Add your quantity, contact information and delivery address in one clear request.</p></article>
          <article class="benefit-card"><span class="benefit-icon"><i class="bi bi-shield-check"></i></span><span class="card-number">03 / OUR STANDARDS</span><h3>Facts, not assumptions</h3><p>Published delivery areas and water documents appear only when verified by the business.</p></article>
        </div>
      </div>
    </section>

    <section class="order-strip">
      <div class="container order-strip-inner">
        <div><span class="eyebrow">Your next refill</span><h2>One bottle. A few quick details.</h2><p>Request the AAB E SINDH 19-litre bottle for your home or workplace.</p></div>
        <a class="button-primary" routerLink="/order">Start your order <i class="bi bi-arrow-right"></i></a>
      </div>
    </section>

    <section class="process-section">
      <div class="container process-layout">
        <div class="section-heading">
          <span class="eyebrow">Simple by design</span><h2>A clearer way from request to delivery.</h2>
          <p>We keep the steps straightforward. Availability and delivery details are confirmed with you before an order is final.</p>
          <a class="inline-link" routerLink="/delivery-areas">See delivery information <i class="bi bi-arrow-right"></i></a>
        </div>
        <div class="steps">
          <article class="step"><span>01</span><div><h3>Tell us what you need</h3><p>Choose your 19L bottle quantity and add your delivery details.</p></div></article>
          <article class="step"><span>02</span><div><h3>Confirm the details</h3><p>Your request is shared for confirmation of price and delivery availability.</p></div></article>
          <article class="step"><span>03</span><div><h3>Arrange your delivery</h3><p>Once details are confirmed, your delivery can be arranged directly.</p></div></article>
        </div>
      </div>
    </section>

    <section class="trust-section">
      <div class="container trust-inner">
        <div class="trust-copy"><span class="eyebrow">Straight answers matter</span><h2>Know what’s confirmed.<br>Know what isn’t.</h2><p>We won’t publish unverified service locations, water test results or customer testimonials. Check the latest confirmed details before ordering.</p>
          <div class="trust-links"><a routerLink="/delivery-areas"><i class="bi bi-geo-alt"></i> Delivery coverage</a><a routerLink="/water-quality"><i class="bi bi-file-earmark-check"></i> Quality information</a></div>
        </div>
        <div class="trust-visual" aria-hidden="true"><div class="water-ripple ripple-a"></div><div class="water-ripple ripple-b"></div><div class="water-ripple ripple-c"></div><div class="trust-drop"><i class="bi bi-droplet-fill"></i></div><div class="trust-foot">AAB E SINDH <span>·</span> 19L</div></div>
      </div>
    </section>

    <section class="reviews-section">
      <div class="container reviews-layout">
        <div class="section-heading"><span class="eyebrow">CUSTOMER FEEDBACK</span><h2>Good service should speak for itself.</h2><p>We share real customer experiences only with permission. No verified reviews have been supplied for publication yet.</p></div>
        <div class="review-empty" role="status"><span class="quote-icon"><i class="bi bi-chat-quote"></i></span><div><span class="review-kicker">VERIFIED CUSTOMER REVIEWS</span><h3>No reviews published yet.</h3><p>When genuine customer feedback is approved for sharing, it will appear here. We won’t invent testimonials.</p></div></div>
      </div>
    </section>

    <section class="faq-section">
      <div class="container faq-layout">
        <div class="section-heading"><span class="eyebrow">Good to know</span><h2>Questions, answered.</h2><p>Need something else? Start an order and share your details for confirmation.</p><a class="inline-link" routerLink="/order">Go to ordering <i class="bi bi-arrow-right"></i></a></div>
        <div class="faq-list">
          <details><summary>What does AAB E SINDH deliver?<i class="bi bi-plus"></i></summary><p>AAB E SINDH focuses exclusively on 19-litre drinking water bottles.</p></details>
          <details><summary>How much does a bottle cost?<i class="bi bi-plus"></i></summary><p>The business price has not been configured on this website yet, so we don’t display an estimated or invented price.</p></details>
          <details><summary>Do you deliver to my area?<i class="bi bi-plus"></i></summary><p>Only confirmed locations will be listed. Current verified delivery-area information has not yet been provided.</p></details>
          <details><summary>Can I order on WhatsApp?<i class="bi bi-plus"></i></summary><p>Yes. Use any WhatsApp contact button to start a chat with AAB E SINDH.</p></details>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero { position: relative; overflow: hidden; background: linear-gradient(110deg,#f5fbfc 0%,#f4fafb 56%,#e9f7f7 100%); }
    .hero::before { position: absolute; top: -290px; right: -260px; width: 720px; height: 720px; border: 1px solid rgba(8,124,156,.1); border-radius: 50%; content: ''; }
    .hero-grid { position: relative; display: grid; min-height: 610px; grid-template-columns: 1.03fr .97fr; align-items: center; gap: 2rem; padding-top: 2.2rem; padding-bottom: 2rem; }
    .hero-copy { position: relative; z-index: 1; padding: 2rem 0 2.4rem; }
    .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #35b6ad; box-shadow: 0 0 0 4px rgba(53,182,173,.12); }
    h1 { margin: 1.4rem 0 1.3rem; color: var(--navy); font-family: var(--font-display); font-size: clamp(3.2rem,6.1vw,5.2rem); font-weight: 800; letter-spacing: -.075em; line-height: 1.02; }
    h1 span { color: var(--blue); }
    .hero-lede { max-width: 495px; color: #5b727b; font-size: 1.08rem; line-height: 1.8; }
    .hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.35rem; margin-top: 2rem; }
    .button-whatsapp { display: inline-flex; min-height: 50px; align-items: center; justify-content: center; gap: .6rem; padding: .8rem 1.1rem; border: 1px solid #cce8dc; border-radius: 12px; background: #effaf5; color: #176f50; font-size: .88rem; font-weight: 700; text-decoration: none; transition: background .2s ease, border-color .2s ease, transform .2s ease; }.button-whatsapp:hover { transform: translateY(-2px); border-color: #9bd3ba; background: #e3f6ec; color: #125c42; }.button-whatsapp i { font-size: 1.1rem; }
    .text-action, .inline-link { display: inline-flex; align-items: center; gap: .65rem; color: var(--navy); font-size: .88rem; font-weight: 700; text-decoration: none; }
    .text-action:hover, .inline-link:hover { color: var(--blue); }
    .play-icon { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid #d5e7e9; border-radius: 50%; background: #fff; color: var(--blue); }
    .hero-assurance { display: flex; flex-wrap: wrap; gap: 1.35rem; margin-top: 3rem; color: #566d77; font-size: .78rem; font-weight: 600; }
    .hero-assurance span { display: flex; align-items: center; gap: .45rem; }
    .hero-assurance i { color: var(--blue); font-size: 1rem; }
    .hero-visual { position: relative; display: grid; min-height: 510px; place-items: center; }
    .hero-disc { position: absolute; width: min(390px,78%); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 42% 34%,#efffff 0%,#d7f3f2 54%,#b4e2e4 100%); box-shadow: inset 0 0 0 1px rgba(255,255,255,.9),0 30px 70px rgba(20,103,120,.08); }
    .hero-disc::after { position: absolute; inset: 12%; border: 1px solid rgba(8,124,156,.14); border-radius: 50%; content: ''; }
    .bottle-illustration { position: relative; z-index: 1; width: min(285px,70%); height: 435px; filter: drop-shadow(0 22px 18px rgba(13,73,91,.12)); animation: bottle-float 5s ease-in-out infinite; }
    .visual-orbit { position: absolute; z-index: 0; border: 1px dashed rgba(8,124,156,.2); border-radius: 50%; }
    .orbit-one { width: min(480px,95%); aspect-ratio: 1; transform: rotate(-20deg) scaleY(.63); }
    .orbit-two { width: min(410px,82%); aspect-ratio: 1; transform: rotate(38deg) scaleY(.7); }
    .floating-note { position: absolute; z-index: 2; display: flex; align-items: center; gap: .7rem; padding: .8rem 1rem; border: 1px solid rgba(224,239,240,.9); border-radius: 14px; background: rgba(255,255,255,.94); box-shadow: 0 14px 36px rgba(12,65,81,.12); }
    .note-top { top: 21%; right: -1%; }.note-bottom { bottom: 17%; left: -1%; }
    .note-icon { display: grid; width: 38px; height: 38px; place-items: center; border-radius: 11px; background: #e8f8f6; color: var(--blue); }
    .floating-note strong, .floating-note small { display: block; }.floating-note strong { color: var(--navy); font-size: .75rem; }.floating-note small { margin-top: .2rem; color: var(--muted); font-size: .66rem; }
    .tiny-stars { color: #26aabd; font-size: 1rem; }
    .visual-caption { position: absolute; right: 0; bottom: 1.5rem; color: #527780; font-size: .6rem; font-weight: 800; letter-spacing: .2em; }
    .hero-bottom { display: flex; align-items: center; gap: 1rem; padding: 0 0 1.2rem; color: #5a7680; font-size: .6rem; font-weight: 800; letter-spacing: .17em; }
    .hero-line { width: 55px; height: 1px; background: #a7c7cb; }
    .benefits-section, .process-section, .faq-section { padding: 6rem 0; }
    .centered { margin: 0 auto 2.6rem; text-align: center; }.centered .eyebrow { justify-content: center; }.centered p { margin-right: auto; margin-left: auto; }
    .benefit-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.1rem; }
    .benefit-card { min-height: 245px; padding: 1.7rem; border: 1px solid var(--line); border-radius: 18px; background: #fff; transition: transform .2s ease, box-shadow .2s ease; }
    .benefit-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
    .benefit-icon { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 14px; background: var(--aqua-soft); color: var(--blue); font-size: 1.1rem; }
    .card-number { display: block; margin-top: 1.4rem; color: #5f7881; font-size: .62rem; font-weight: 800; letter-spacing: .13em; }
    .benefit-card h3, .step h3 { margin: .6rem 0; color: var(--navy); font-family: var(--font-display); font-size: 1.12rem; font-weight: 800; letter-spacing: -.025em; }
    .benefit-card p, .step p { margin: 0; color: var(--muted); font-size: .86rem; line-height: 1.7; }
    .order-strip { padding: 3rem 0; background: #eaf7f7; }
    .order-strip-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
    .order-strip h2 { margin: .6rem 0 .45rem; color: var(--navy); font-family: var(--font-display); font-size: clamp(1.7rem,3vw,2.4rem); font-weight: 800; letter-spacing: -.05em; }
    .order-strip p { margin: 0; color: var(--muted); font-size: .9rem; }
    .process-layout { display: grid; grid-template-columns: .9fr 1.1fr; gap: 5rem; align-items: center; }
    .process-layout .section-heading { margin: 0; }.process-layout .inline-link { margin-top: 1.6rem; }
    .steps { display: grid; }.step { display: grid; grid-template-columns: 48px 1fr; gap: 1rem; padding: 1.35rem 0; border-bottom: 1px solid var(--line); }.step:first-child { padding-top: 0; }.step:last-child { padding-bottom: 0; border-bottom: 0; }
    .step > span { display: grid; width: 40px; height: 40px; place-items: center; border: 1px solid #dbeaec; border-radius: 50%; color: var(--blue); font-family: var(--font-display); font-size: .8rem; font-weight: 800; }
    .step h3 { margin: .2rem 0 .4rem; }
    .trust-section { padding: 5.5rem 0; background: #f3f9fa; }
    .trust-inner { display: grid; grid-template-columns: 1fr .85fr; align-items: center; gap: 4rem; }
    .trust-copy h2 { margin: .85rem 0 1rem; color: var(--navy); font-family: var(--font-display); font-size: clamp(2rem,4vw,3rem); font-weight: 800; letter-spacing: -.06em; line-height: 1.12; }
    .trust-copy p { max-width: 510px; color: var(--muted); line-height: 1.8; }
    .trust-links { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 1.5rem; }.trust-links a { display: inline-flex; align-items: center; gap: .55rem; padding: .7rem .85rem; border: 1px solid var(--line); border-radius: 10px; background: #fff; color: var(--navy); font-size: .8rem; font-weight: 700; text-decoration: none; }
    .trust-visual { position: relative; display: grid; min-height: 300px; place-items: center; overflow: hidden; border-radius: 24px; background: linear-gradient(145deg,#dff5f4,#bce7e8); }
    .trust-drop { position: relative; z-index: 1; display: grid; width: 100px; height: 100px; place-items: center; border: 1px solid rgba(255,255,255,.7); border-radius: 50%; background: rgba(255,255,255,.48); color: #1683a0; font-size: 2.5rem; box-shadow: 0 12px 40px rgba(22,112,128,.1); }
    .water-ripple { position: absolute; width: 240px; height: 90px; border: 1px solid rgba(8,124,156,.24); border-radius: 50%; transform: rotate(-20deg); }.ripple-a { width: 260px; }.ripple-b { width: 350px; }.ripple-c { width: 450px; }
    .trust-foot { position: absolute; right: 1.2rem; bottom: 1rem; color: #57919b; font-size: .62rem; font-weight: 800; letter-spacing: .16em; }.trust-foot span { padding: 0 .3rem; color: var(--blue); }
    .reviews-section { padding: 5rem 0 1rem; }.reviews-layout { display: grid; grid-template-columns: .8fr 1.2fr; align-items: center; gap: 5rem; }.reviews-layout .section-heading { margin: 0; }.review-empty { display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem; border: 1px solid var(--line); border-radius: 17px; background: #fbfdfd; }.quote-icon { display: grid; width: 44px; height: 44px; flex: 0 0 44px; place-items: center; border-radius: 13px; background: #e8f7f6; color: var(--blue); font-size: 1.05rem; }.review-kicker { color: #607780; font-size: .59rem; font-weight: 800; letter-spacing: .13em; }.review-empty h3 { margin: .55rem 0 .4rem; color: var(--navy); font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; }.review-empty p { max-width: 470px; margin: 0; color: var(--muted); font-size: .82rem; line-height: 1.7; }
    .faq-layout { display: grid; grid-template-columns: .8fr 1.2fr; gap: 5rem; }.faq-layout .section-heading { margin: 0; }.faq-layout .inline-link { margin-top: 1rem; }
    .faq-list details { border-bottom: 1px solid var(--line); }.faq-list details:first-child { border-top: 1px solid var(--line); }
    .faq-list summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem 0; color: var(--navy); font-family: var(--font-display); font-size: .96rem; font-weight: 700; list-style: none; cursor: pointer; }
    .faq-list summary::-webkit-details-marker { display: none; }.faq-list summary i { color: var(--blue); transition: transform .2s ease; }.faq-list details[open] summary i { transform: rotate(45deg); }
    .faq-list details p { max-width: 540px; margin: -.25rem 0 1.2rem; color: var(--muted); font-size: .88rem; line-height: 1.7; }
    @keyframes bottle-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
    @media (max-width: 900px) { .hero-grid { min-height: 550px; grid-template-columns: 1fr .85fr; gap: 0; } h1 { font-size: clamp(3rem,7vw,4.2rem); }.hero-visual { min-height: 440px; }.bottle-illustration { height: 365px; }.note-top { right: -3%; }.process-layout, .faq-layout, .reviews-layout { gap: 2.5rem; }.trust-inner { gap: 2rem; } }
    @media (max-width: 680px) { .hero-grid { grid-template-columns: 1fr; padding-top: 2.5rem; }.hero-copy { padding: 1rem 0 0; }.hero-visual { min-height: 390px; margin-top: -.5rem; }.hero-disc { width: 300px; }.bottle-illustration { width: 225px; height: 345px; }.orbit-one { width: 360px; }.orbit-two { width: 310px; }.note-top { top: 17%; right: 0; }.note-bottom { bottom: 12%; left: 0; }.visual-caption { bottom: .1rem; }.hero-assurance { margin-top: 2rem; }.hero-bottom { font-size: .52rem; letter-spacing: .11em; }.benefit-grid { grid-template-columns: 1fr; }.benefit-card { min-height: auto; }.order-strip-inner { align-items: flex-start; flex-direction: column; }.process-layout, .faq-layout, .trust-inner, .reviews-layout { grid-template-columns: 1fr; gap: 2.5rem; }.trust-visual { min-height: 245px; } }
    @media (prefers-reduced-motion: reduce) { .bottle-illustration { animation: none; } }
  `],
})
export class HomeComponent {
  readonly business = inject(BusinessService);
}
