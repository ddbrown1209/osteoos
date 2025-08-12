# Deploy to GitHub Pages

This repository is preconfigured to deploy **OsteoOS** to GitHub Pages via Actions.

## One-time setup
1. Create a repo on GitHub (public or private). Name it either:
   - `yourname.github.io` for a user/org site, or
   - any name (e.g. `osteoos`) for a project site.
2. In the repo **Settings → Pages**, choose **"GitHub Actions"** as the source (the workflow does this automatically if available).

## Push code
```bash
git init
git add .
git commit -m "Initial commit: OsteoOS"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

## What the workflow does
- Installs dependencies and builds the site.
- Detects if you are deploying to a **user site** (`*.github.io`) or a **project site** and sets the correct `VITE_BASE` accordingly.
- Publishes the `dist/` build to GitHub Pages using the official `deploy-pages` action.

After the first push, wait for the workflow to finish. Your site will be live at:
- `https://<YOUR_GITHUB_USERNAME>.github.io/` (user site), or
- `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO>/` (project site).
