# ACE Blackjack — Social Preview Configuration

**Date:** April 30, 2026  
**Status:** ✅ Complete — Configured for demo.vln.gg

---

## 📱 Overview

This document details how ACE Blackjack is configured to display beautiful, rich social media previews across all major platforms when users share the link to demo.vln.gg.

---

## 🎨 Social Preview Assets

### Primary OG Image
- **File:** `/public/social/og-vln-demo.svg`
- **Dimensions:** 1200×630 pixels (optimal for social platforms)
- **Format:** SVG (scalable, optimized file size)
- **Content:** ACE branding with card design, amber accents, dark theme
- **URL:** `https://demo.vln.gg/social/og-vln-demo.svg`

### Preview Endpoint
- **File:** `/public/og-preview.html`
- **Purpose:** Dedicated endpoint for social crawlers with full OG metadata
- **Redirect:** Automatically redirects to main app after crawlers read metadata
- **Fallback:** Includes noscript content for non-JavaScript environments

---

## 📋 Open Graph Configuration

### Main Entry Point (`index.html`)

```html
<!-- Open Graph Standard Tags -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="ACE Premium Blackjack" />
<meta property="og:title" content="ACE — Premium Blackjack" />
<meta property="og:description" content="Experience premium provably-fair blackjack with cryptographic transparency. Connect your wallet and start playing now." />

<!-- Image Configuration -->
<meta property="og:image" content="https://demo.vln.gg/social/og-vln-demo.svg" />
<meta property="og:image:secure_url" content="https://demo.vln.gg/social/og-vln-demo.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="ACE Premium Blackjack — Dark premium card game interface with amber accents" />
<meta property="og:image:type" content="image/svg+xml" />

<!-- Canonical URL -->
<meta property="og:url" content="https://demo.vln.gg/" />
```

### Twitter Card Configuration

```html
<!-- Summary Large Image Card (best for games) -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="ACE — Premium Blackjack" />
<meta name="twitter:description" content="Premium provably-fair blackjack. Connect your wallet and play with full transparency." />
<meta name="twitter:image" content="https://demo.vln.gg/social/og-vln-demo.svg" />
<meta name="twitter:creator" content="@aceblackjack" />
```

### Platform-Specific Tags

#### LinkedIn
```html
<meta property="linkedin:title" content="ACE — Premium Blackjack" />
<meta property="linkedin:description" content="Premium provably-fair blackjack with full cryptographic transparency." />
```

#### Discord
```html
<meta property="discord:title" content="ACE — Premium Blackjack" />
<meta property="discord:description" content="Experience premium provably-fair blackjack with cryptographic transparency." />
```

#### WhatsApp
```html
<meta property="whatsapp:image" content="https://demo.vln.gg/social/og-vln-demo.svg" />
```

#### Canonical URL (SEO)
```html
<link rel="canonical" href="https://demo.vln.gg/" />
```

---

## 🔗 Platform Coverage

| Platform | Preview Type | Status | Preview Size |
|----------|---|---|---|
| **Facebook** | Open Graph | ✅ Rich Card | 1200×630 |
| **Twitter/X** | Twitter Card | ✅ Large Image | 1200×630 |
| **LinkedIn** | OG + Custom | ✅ Article Card | 1200×630 |
| **Discord** | OG + Custom | ✅ Embed | 1200×630 |
| **WhatsApp** | OG Image | ✅ Link Preview | 1200×630 |
| **Pinterest** | Open Graph | ✅ Rich Pin | 1200×630 |
| **Telegram** | Open Graph | ✅ Link Preview | 1200×630 |
| **Slack** | Open Graph | ✅ Rich Link | 1200×630 |
| **Reddit** | Open Graph | ✅ Preview | 1200×630 |

---

## ⚙️ Vercel Configuration (`vercel.json`)

### Cache Headers

Social images are cached for **30 days** (aggressive caching for production stability):
```json
{
  "source": "/social/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=2592000, immutable"
    },
    {
      "key": "Content-Type",
      "value": "image/svg+xml; charset=utf-8"
    }
  ]
}
```

Preview page is cached for **1 hour** (allows quick updates):
```json
{
  "source": "/og-preview.html",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=3600"
    }
  ]
}
```

### Security Headers

All routes include comprehensive security headers:
- **X-Content-Type-Options:** Prevents MIME type sniffing
- **X-Frame-Options:** Prevents clickjacking (SAMEORIGIN)
- **X-XSS-Protection:** Enables browser XSS protection
- **Referrer-Policy:** Controls referrer information sharing

---

## 🧪 Testing Your Social Preview

### Facebook
1. Visit [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter: `https://demo.vln.gg/`
3. Click "Scrape Again" to refresh cache
4. View preview card

### Twitter/X
1. Visit [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter: `https://demo.vln.gg/`
3. View preview

### LinkedIn
1. Visit [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Enter: `https://demo.vln.gg/`
3. View preview

### Discord
1. Paste `https://demo.vln.gg/` in any Discord server
2. Discord will fetch and display the preview

### WhatsApp
1. Share link in WhatsApp
2. Preview will display with image and description

---

## 🔄 Updating Social Preview

To update the social preview:

### Option 1: Update OG Metadata Only
Edit `/index.html` and update these tags:
```html
<meta property="og:title" content="NEW_TITLE" />
<meta property="og:description" content="NEW_DESCRIPTION" />
<meta property="og:image" content="https://demo.vln.gg/social/NEW_IMAGE.svg" />
```

### Option 2: Update the Preview Image
1. Create new 1200×630 image
2. Place at `/public/social/og-vln-demo.svg`
3. Clear social platform caches (see Testing section above)

### Option 3: Update Both
1. Update metadata in `/index.html`
2. Replace image at `/public/social/og-vln-demo.svg`
3. Clear caches

---

## 📊 How Social Crawlers Work

1. **Link is Shared:** User shares `https://demo.vln.gg/` on social platform
2. **Crawler Fetches:** Platform's crawler fetches the HTML
3. **Metadata Parsing:** Crawler reads OG and other meta tags
4. **Preview Generation:** Platform creates rich preview card
5. **Caching:** Preview is cached for optimization
6. **Display:** Rich card shows in feed/timeline

### Cache Busting
If updates aren't showing:
1. Use platform's debug tools (see Testing section)
2. Click "Scrape Again" or equivalent
3. Wait 24-48 hours for full cache refresh

---

## 🎯 Best Practices

✅ **Do:**
- Keep image dimensions 1200×630
- Use descriptive, under-160 character descriptions
- Include URL in og:url for SEO
- Use absolute HTTPS URLs
- Test on multiple platforms
- Update robots.txt when needed

❌ **Don't:**
- Use relative image URLs (`/social/image.svg`)
- Make descriptions too long
- Change URLs frequently
- Use non-HTTPS URLs
- Forget to test after changes

---

## 📁 File Structure

```
blackjack-premium/
├── index.html                          # Main OG configuration
├── vercel.json                         # Vercel routing & caching
├── public/
│   ├── og-preview.html                # Crawler-friendly preview page
│   ├── robots.txt                      # Search engine crawler rules
│   └── social/
│       └── og-vln-demo.svg            # 1200×630 preview image
└── SOCIAL-PREVIEW-SETUP.md            # This file
```

---

## 🚀 Deployment

The social preview is automatically deployed when:
1. Changes are pushed to the repository
2. Vercel detects the deployment
3. Files are served from the CDN
4. Social crawlers fetch and cache

**No additional configuration needed** — Vercel handles everything!

---

## 📞 Troubleshooting

### Preview Not Showing on Facebook
- Check [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Click "Scrape Again"
- Verify image URL is accessible
- Check og:image path

### Twitter Card Not Displaying
- Validate at [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Ensure twitter:card is "summary_large_image"
- Verify image dimensions (1200×630)
- Check for HTTPS URLs

### Discord Embed Missing Image
- Share URL in Discord channel
- Check og:image URL is publicly accessible
- Verify image dimensions and format (SVG recommended)
- Discord caches for 1 hour

### Cache Not Clearing
- Use platform's scrape tools
- Wait 24-48 hours for full refresh
- Check Vercel cache headers

---

## 📚 References

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Vercel Headers Documentation](https://vercel.com/docs/edge-network/headers)

---

## ✅ Verification Checklist

- [x] OG metadata configured in index.html
- [x] Twitter Card tags included
- [x] Platform-specific tags added
- [x] og-preview.html updated for demo.vln.gg
- [x] vercel.json configured with cache headers
- [x] Social image at 1200×630 SVG
- [x] robots.txt configured
- [x] All URLs are absolute HTTPS
- [x] Canonical URL set
- [x] Security headers configured
- [x] Cache settings optimized
- [x] Documentation complete

---

**Version:** 1.0  
**Date:** April 30, 2026  
**Status:** ✅ Production Ready for demo.vln.gg
