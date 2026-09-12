<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b1a71b86-266e-42b0-9a0f-0b3051513017

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## NADAUN UI · performance (2026-09-10)

Compact navigation follows video.nadaun.co: small line icons, Contact, 44px controls, restrained charcoal/gold UI. Detailed overlays load on demand. The heavy 3D bundle loads only with the About view; shared React helpers remain in the initial runtime chunk. Tailwind CSS is compiled during build rather than generated in the visitor browser.

The film reel waits until its section approaches the viewport. Playback pauses offscreen, in a hidden tab, while an overlay is open, or when paused by the visitor. Watch films opens the shared NADAUN portfolio/player. Desktop and 320/390px layouts should be reviewed after changes.

Source, Git and backups stay on NAS. Platform-specific build dependencies may be local. Build: `npm run build`; type check: `npm run lint`. `backups` is excluded from TypeScript source checks and deployment.

Shared style instructions: NAS `_claude/.agents/skills/nadaun-web-ui/SKILL.md`.

## Collective navigation and motion — 2026-09-12

The main menu is ABOUT / PORTFOLIO / CONTACT. INSIGHTS opens from the MARKETING tile (both hub layouts) and its About business detail. It contains cumulative impact, LIVERNOVO campaign delivery, the channel report, the attributed STARLOGIN launch case and an inquiry link.

The visual hub contains six tiles: NADAUN MOMENT → NADAUN SPACE → MARKETING → ALL IN ONE SOLUTION → STARLOGIN → NADAUN WEDDING. DIGITAL SIGNAGE is an option inside MARKETING alongside the integrated solution, media network and INSIGHTS. Both hub layouts use the same catalogue.

About places seven animated benefits beside VISUAL CONTENT SOLUTION. Each opens a scroll-driven introduction with masked media, a description handoff and individual scope rows. Returning restores About's scroll position and the selected button's focus. The original history and globe remain mounted. Production previews and STARLOGIN's 2022 archive keep their attribution.

About is the baseline motion language for every Collective detail. Its 200/30 scroll response also drives the benefits, production solution, signage, STARLOGIN and marketing pages. Pinned text/media handoffs alternate with naturally scrolling scope and media rows. Portfolio keeps its selection UI and adds continuous scroll-driven title/media movement. The choreography must remain active regardless of the host OS reduced-motion flag, per the owner's explicit direction. Do not introduce a static replacement or a motion-enable button. One 200/30 spring drives text travel, figure expansion, image coverage, report bars and the handoffs; outgoing copy clears before incoming copy. About's Seoul routes, globe rotation and expansion also remain scroll-driven. See the NAS web skill reference `collective-motion-2026-09-12.md` for the accepted instructions and verification record.

Verify actual slow, fast and reverse scrolling, all five result scenes, all seven benefit selections and six hub tiles, top-level navigation while a detail is open, and 320/390px layouts. Check both host motion preference values to prevent another silent replacement of the choreography.

On macOS, platform-specific dependencies live under `~/.node_modules_local/nadaun-collective/node_modules`, linked from NAS. Vite's cache uses `os.tmpdir()`. If SMB prevents emptying an old `dist`, use a fresh local output directory with `npm run build -- --outDir <local-scratch>`; source, commits and backups stay on NAS. Windows must use its own platform dependencies rather than the Mac symlink target.
