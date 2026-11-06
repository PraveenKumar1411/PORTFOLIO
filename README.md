# Praveen Kumar Portfolio

A static HTML, CSS, and JavaScript portfolio site. The page stays at the repository root for direct hosting; local assets are grouped under `assets/`.

## Project layout

```text
index.html
vercel.json
netlify.toml
README.md
assets/
  certificates/  Certificate PDFs
  css/style.css
  documents/     Resume PDF
  images/        Profile, campus, and background images
  js/script.js
```

## Run locally

From the project root:

```powershell
py -m http.server 5500
```

Open `http://localhost:5500`.

## Deploy

Netlify publishes the repository root (`publish = "."`). Vercel uses the root as its output directory through `vercel.json`. This is a static site, so no build or install command is needed.

To deploy on Vercel, import this repository and keep the project root as the Root Directory. Choose the `Other` framework preset if Vercel asks; `vercel.json` sets the output directory to `.`. Then deploy.

The resume is available at `assets/documents/Praveen_Kumar_Resume.pdf`; certificates and images live in `assets/certificates/` and `assets/images/`.
