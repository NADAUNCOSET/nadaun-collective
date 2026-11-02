# Collective Cloudflare build

This package builds the current NAS source. It does not reuse an older deployment or replace the existing macOS `node_modules` link placeholder. Source, dependency staging, temporary files and build output stay under this NAS project.

Preparation, dependency install and build:

On this Windows PC, run these commands through the existing `Z:\_Site\nadaun-collective` NAS mapping. UNC config resolution failed; using Y: reached transformation but Windows real-path resolution returned Z:, causing a mixed-drive output error. Use the existing Z: spelling consistently. This is the same NAS source/output, with no local copy or new drive mapping. macOS/Linux and Cloudflare Builds use their normal project path.

```powershell
node cloudflare/build.mjs --prepare
# Set TMP, TEMP and npm cache to cloudflare/.build/tmp and .build/npm-cache.
# On Windows UNC paths, invoke npm's JavaScript CLI with node, not npm.cmd.
npm ci --prefix cloudflare/.build/source --ignore-scripts --no-audit --no-fund
node cloudflare/build.mjs
node --test cloudflare/routing.test.mjs
wrangler deploy --dry-run --config cloudflare/wrangler.jsonc
```

Wrangler publishes only `.build/public`. Existing Cloudflare media manifest mappings and public asset/security headers are retained. Unknown API paths and dotfiles return 404 instead of the SPA shell. Browser Gemini key injection is disabled and the existing no-key fallback remains; this public portfolio does not contain a provider credential.

Ordinary compiled files use Cloudflare's asset-first delivery and generated `_headers`; they do not run this Worker. Only the two fixed manifest overrides are forced through the Worker. Unmatched requests reach the Worker, where API/dotfiles return 404 and extensionless application navigation receives the compiled SPA. Public build validation rejects private/source files and an `api/` asset tree. This optimization does not apply to the private AIO application, whose complete authentication gate remains required.

Cloudflare documents direct static-asset requests as free/unlimited; Worker code invocations remain subject to the account's plan, including the Free plan's shared 100,000 requests/day. This configuration minimizes code invocations rather than promising unlimited API traffic. No paid-plan change is included. References: [static asset billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

`preparation-proof.json` records current source and public output hashes/bytes after an actual successful build. A successful build or dry run is not a live deployment or domain verification. The parent operator owns deployment, canonical hostname attachment and public verification.

For Cloudflare Git integration, the build command must perform these preparation/install/build steps before `wrangler deploy --config cloudflare/wrangler.jsonc`. Account authorization and a successful Git-triggered deployment must be checked separately; adding this configuration does not establish Git integration.
