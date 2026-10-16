# Divine Jireh Fellowship Church (DJFC) - Prayer Website

A static website (HTML, CSS, JavaScript). No PHP, MySQL or server needed.

## Pages
Home, About, Submit Prayer, Prayer Wall, Bible Verses, Devotionals.

## Folder structure
- `index.html`, `about.html`, `submit.html`, `wall.html`, `verses.html`, `devotionals.html`
- `css/style.css` - styling
- `js/common.js` (storage, menu, footer, sample data), `js/pages.js` (page features)
- `assets/` - logo and images

## Run locally
Unzip and double-click `index.html` to open it in Google Chrome.

## Upload to GitHub and publish
1. Create a free account at https://github.com.
2. Click **+** > **New repository**, name it (e.g. `djfc-prayer-site`), choose **Public**, click **Create repository**.
3. Click **uploading an existing file**, drag in ALL files and folders (keep `index.html` at the top level), then **Commit changes**.
4. Go to **Settings > Pages**, set Source to **Deploy from a branch**, Branch **main**, folder **/(root)**, then **Save**.
5. After 1-2 minutes your site is at `https://YOUR-USERNAME.github.io/djfc-prayer-site/`.

## Customize
Edit placeholder text in the HTML files. Sample prayers, verses and devotionals are in the `SEED` object in `js/common.js`.

## Limitations
- Data is saved with **localStorage**: only in the visitor's browser, never shared between users or devices.
- Submitted prayers do not reach church leaders and **no email is sent**.
- Private requests are **not securely confidential**.
