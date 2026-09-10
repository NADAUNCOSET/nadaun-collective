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
