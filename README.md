# After the Courtroom

Public career-map site for laylimajnunmustgo.com. Nineteen directions for a veteran court reporter — keep the machine, stay near the law, or leave the field.

React + TypeScript + Vite single-page app. React Router v7 runs in the browser only (no SSR).

## Local development

From this folder:

```
npm install
npm run dev
```

Then open the localhost URL Vite prints.

```
npm test
npm run build
```

`npm run build` typechecks and writes a static site to `dist/`.

## Deploy on Netlify

1. Connect this GitHub repository (JMIHC/laylimajnunmustgo) to Netlify.
2. Publish directory: `dist` (already set in netlify.toml).
3. Build command: npm run build.
4. SPA fallback is already configured (`public/_redirects` and netlify.toml) so `/role/:slug` loads index.html.

## Point the Squarespace domain at Netlify

The domain laylimajnunmustgo.com is registered at Squarespace. After the Netlify site is live:

1. In Netlify: Domain settings, add laylimajnunmustgo.com (and www if you want it).
2. In Squarespace: DNS, point the apex (and www) at Netlify using the records Netlify shows (typically an A/AAAA or ALIAS for the apex, plus a CNAME for www).
3. Wait for DNS and Netlify HTTPS to finish.

Do not scrape LinkedIn. Avatar and Find people on LinkedIn links open LinkedIn people search (United States geoUrn) in a new tab.

## Optional photos

Drop generated images into `public/avatars/` named by scene (depo.png, cart.png, and so on). They overlay the SVG drawings; a missing file is hidden.
