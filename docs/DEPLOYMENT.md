# Deployment

The website is a static site. The `site/` directory is the deployment artifact and does not require a build command.

## GitHub Pages

1. Create a public repository for the portfolio under the `myhls` account.
2. Add it as the `origin` remote and push the `main` branch.
3. Open the repository settings, then `Pages`.
4. Under `Build and deployment`, select `GitHub Actions` as the source.
5. Run the `Deploy portfolio to GitHub Pages` workflow or push a new commit to `main`.

The expected interim URL is:

```text
https://myhls.github.io/<repository-name>/
```

The workflow uploads only `site/`, so local source notes and the content workbook are not exposed through GitHub Pages. GitHub Pages must be enabled once in repository settings before using the workflow.

## Local Preview

```powershell
node server.mjs
```

Open `http://127.0.0.1:4173`.

## Custom Domain

When a domain is purchased:

1. Add the domain in GitHub Pages settings.
2. Configure the DNS records GitHub provides.
3. Enable HTTPS after DNS verification.
4. Add a `site/CNAME` file containing the domain.
5. Update the canonical URL, Open Graph URL, `robots.txt` and sitemap with the final domain.

Do not commit access tokens, passwords or private account recovery information.
