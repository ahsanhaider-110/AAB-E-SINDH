# AAB E SINDH

Standalone Angular application for a 19-litre drinking water delivery business. No original application source was present in the workspace; this project is a new implementation in the supplied folder.

## Run locally

```powershell
npm install
npm start
```

Create a production build with `npm run build`.

## Configure verified business details

Edit `src/app/core/business-config.ts` before enabling real customer orders:

- Set `unitPricePkr` to the actual 19L bottle price, or leave it `null` until confirmed.
- Set `whatsappNumber` to the business's verified international-format WhatsApp number (digits only, including country code), or leave it `null` to keep WhatsApp ordering disabled.
- Set `phoneNumber` to a verified contact number, or leave it `null`.
- Add only confirmed `serviceAreas`.
- Add laboratory reports only after verifying the documents and their URLs.

The order form requests customer name, contact number, quantity, address, and delivery area. It calculates totals when a price is configured and builds an encoded WhatsApp order message when a verified WhatsApp number is configured. The frontend does not persist or send orders to a server.

## Integration boundaries

- `BusinessService` centralizes product pricing, quantity totals, and WhatsApp message generation.
- `src/app/core/order.model.ts` defines the order request contract for a future backend.
- `/account` is an explicit no-backend state. Accounts, order history, repeat orders, and status tracking require authenticated backend APIs.
- `/admin` is a frontend-only preview. Its clearly labelled chart and summary metrics are illustrative demo data, not business records. It has no authentication, persistent settings, or live order-status updates.
- `/delivery-areas` uses Leaflet and OpenStreetMap tiles for general Karachi map orientation only. It displays no invented delivery zones; configure verified areas separately.
- `/water-quality` lists only reports added to business settings and makes no unverified water-quality, health, or certification claims.

Before deploying, configure the verified business details, connect secure backend APIs, and review the external map-tile and font providers against the deployment's privacy and network requirements.
