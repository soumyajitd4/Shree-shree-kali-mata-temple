# Shree Shree Kali Mata Temple Trust

A responsive, static temple website with construction photographs, the Trust's story, donor recognition, and bank/UPI donation details. No build tools, paid libraries, analytics, or payment gateway are required.

Opening `index.html` directly previews the design, but YouTube cannot play reliably from a `file://` page (error 153: missing website referrer). For video testing, run `python -m http.server 8765 --bind 127.0.0.1` from this repository directory and open `http://127.0.0.1:8765/index.html#community`. Python is required only for this local preview. The preview binds only to this computer. Stop it with Ctrl+C.

Deploy the website files to static hosting, keeping the `assets` directory alongside the HTML, CSS and JavaScript. The official website address is https://shreeshreekalimatatempletrust.github.io/temple/ . Embedded playback still depends on YouTube allowing the video and the browser not blocking its requests.

## Editing

- Content: `index.html`
- Main design: `styles.css`
- Responsive refinements and photo viewer: `refinements.css`
- Interaction: `script.js`
- YouTube and automatic Instagram preview: `community.js`

The Instagram section automatically embeds one selected public post, not a live feed of new posts. Keep Website embeds enabled in the Trust's Instagram account, and change the post permalink in `community.js` when a different post should be featured. Browser privacy controls can still prevent third-party embeds from loading.

Photographs and illustrations were supplied by the Trust. Payment details must be checked with the Trust before publication. The construction photos are arranged by apparent construction stage; exact dates have not been verified.

## Repository workflow

Requested repository name: `Shree-shree-kali-mata-temple`.
Future approved website edits should be committed and pushed to this repository once GitHub authentication and the remote are connected. Never commit credentials or unrelated source documents.

## One-way sync to the live website

`.github/workflows/sync-temple.yml` copies website files from this repository's `main` branch to `shreeshreekalimatatempletrust/temple`, also on `main`. The destination's existing GitHub Pages configuration handles deployment. Make website edits here, not in both repositories.

- Store a destination-scoped token as the source repository's Actions secret `TEMPLE_SYNC_TOKEN`. It needs Contents read/write on `shreeshreekalimatatempletrust/temple`. Replace it before it expires; never commit it.
- Keep the source repository's Actions variable `TEMPLE_SYNC_ENABLED` set to `false` until local changes are approved. A missing variable also disables publishing.
- To preview, open Actions → Sync temple website → Run workflow on `main`, leaving `dry_run` checked. This checks out both repositories and reports proposed file changes, without writing to the destination. It does not prove that the token has push permission.
- After approval, set `TEMPLE_SYNC_ENABLED` to `true` and manually run with `dry_run` unchecked for the first sync. Changing the variable alone does not start a run. Later pushes touching the listed website files sync automatically.
- To pause, set the variable back to `false`. Even a manual run with `dry_run` unchecked cannot publish while paused.

The workflow copies the six listed HTML/CSS/JS files and adds or updates `assets/`. It preserves the destination's `.git`, `.github`, `CNAME`, README and other settings, and does not delete destination-only assets. New root-level website files must be added to both the workflow's path filters and its file list. Direct edits to the destination's managed website files can be overwritten by the next sync. Commits preserve history and pushes are never forced; branch protection may require a different, pull-request-based workflow.
