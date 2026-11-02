# AAB E SINDH

Standalone Angular 20 application for AAB E SINDH, a 19-litre drinking water delivery business in Karachi. The app uses TypeScript, SCSS, Bootstrap 5, and Angular standalone components.

## Run locally

Use Node.js 22 (or another version supported by Angular 20), then run:

```powershell
npm install
npm start
```

Open the local URL printed by Angular CLI (usually `http://localhost:4200`). Create a production build with `npm run build`.

## Configure business details

Edit `src/app/core/business-config.ts`:

- `unitPricePkr` is set to `70`.
- `serviceAreas` lists the configured areas: L-14 Market, L-8 Market, Double Road, and Extension.
- Set `phoneNumber` to the verified 11-digit Pakistani mobile number beginning with `03`. The footer and order page show a `Call us` link only when this value is set.
- Set `whatsappNumber` to the same verified number in international format: remove the leading `0`, prefix with `92`, and include digits only. WhatsApp ordering stays disabled while this is `null`.
- Keep `qualityReports` empty unless verified report URLs are available.

The order form prepares a WhatsApp message but does not store or send orders to a backend. Customers can use the fallback WhatsApp link if the app cannot open WhatsApp automatically.

## Deploy to Netlify

Connect the GitHub repository to Netlify and deploy. The root `netlify.toml` configures the production build command (`npm run build`), Angular publish directory (`dist/aab-e-sindh/browser`), Node.js 22, and SPA route fallback. Netlify will install dependencies from the lockfile during the build.

## Current integrations

- `/account` redirects to `/order`; there is no account or order-history backend.
- There is no admin route.
- `/delivery-areas` uses Leaflet and OpenStreetMap for general Karachi map orientation only; it does not show confirmed delivery coverage.
- `/water-quality` lists only reports added to business settings and makes no unverified water-quality, health, or certification claims.
