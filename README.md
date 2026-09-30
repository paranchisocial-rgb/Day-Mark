# Daymark

Offline daily discipline tracker. One HTML file, no backend, no accounts. Data is stored in the browser (`localStorage`, key `discipline_v1`).

## Publish on GitHub Pages
1. Upload all files to the repository root (no folders needed).
2. Settings > Pages > Deploy from branch > `main` / root.
3. Open the Pages link on Android in Chrome > menu > Install app.

## Updating later
Replace `index.html`, then change `VERSION` in `sw.js` (for example `daymark-v7`) so installed apps refresh.
Do not rename the storage key or the app loses saved data.

## Files
- `index.html` the app
- `manifest.webmanifest`, `sw.js` install and offline support
- `favicon.ico`, `icon-*.png`, `apple-touch-icon.png` all icon sizes (transparent "any" icons, full-bleed maskable icons, iOS icon)
