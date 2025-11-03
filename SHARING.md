# Calendar Link Sharing Configuration

## Overview

The OnePlace Interview Calendar now has proper Open Graph and Twitter Card meta tags for beautiful link previews when shared on social media, messaging apps, and other platforms.

## What's Configured

### Meta Tags
- **Open Graph (Facebook, LinkedIn, WhatsApp)**
  - Title: "OnePlace Interview Calendar - Schedule Your Interview"
  - Description: "Schedule your interview time conveniently. Select a time slot that works best for you from our available calendar."
  - Image: Custom calendar illustration (1200x630px)

- **Twitter Card**
  - Card Type: Large Image Summary
  - Same title, description, and image as Open Graph

- **Primary Meta Tags**
  - Updated title and description
  - Theme color: #324D72 (OnePlace brand blue)

### Sharing Image

The sharing image (`og-image.svg`) features:
- OnePlace brand gradient background (#324D72 to #4A6B8A)
- Professional calendar icon illustration
- Clear title and subtitle
- OnePlace HR branding

**Current Format**: SVG (1200x630px)

### Files Modified

1. **`public/index.html`**
   - Added Open Graph meta tags
   - Added Twitter Card meta tags
   - Updated title and description
   - Changed theme color to brand color

2. **`public/manifest.json`**
   - Updated app name to "OnePlace Interview Calendar"
   - Updated short name to "OnePlace Calendar"
   - Added proper description
   - Updated theme color to #324D72

3. **`public/og-image.svg`** (NEW)
   - Custom sharing image for social platforms
   - Optimized size: 1200x630px (standard OG size)

## Platform Compatibility

### Fully Supported
- ✅ Facebook
- ✅ LinkedIn
- ✅ Twitter/X
- ✅ Telegram
- ✅ Slack
- ✅ Discord

### May Need PNG Conversion
- ⚠️ WhatsApp (prefers PNG/JPEG)
- ⚠️ iMessage (sometimes)

## Optional: Convert SVG to PNG

For maximum compatibility with all platforms (especially WhatsApp), you may want to convert the SVG to PNG:

### Using Online Tools
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `public/og-image.svg`
3. Set dimensions to 1200x630px
4. Download as `og-image.png`
5. Update `index.html` to reference the PNG file instead

### Using Command Line (requires ImageMagick)
```bash
convert -background none -resize 1200x630 public/og-image.svg public/og-image.png
```

Then update `index.html`:
```html
<!-- Change from -->
<meta property="og:image" content="https://calendar.oneplace.hr/og-image.svg" />

<!-- To -->
<meta property="og:image" content="https://calendar.oneplace.hr/og-image.png" />
```

## Testing Link Previews

### Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/
- Paste your calendar URL
- Click "Scrape Again" to refresh cache
- View how your link appears on Facebook

### Twitter Card Validator
https://cards-dev.twitter.com/validator
- Paste your calendar URL
- View how your link appears on Twitter

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/
- Paste your calendar URL
- View how your link appears on LinkedIn

### WhatsApp Preview
- Simply send the link to yourself or a test group
- The preview should appear automatically

## Deployment Notes

After deploying these changes:

1. **Clear Social Media Caches**
   - Use the debugging tools above to force platforms to re-scrape your link
   - This is necessary as platforms cache link preview data

2. **Verify Image Loads**
   - Ensure `https://calendar.oneplace.hr/og-image.svg` is accessible
   - Check that there are no CORS issues

3. **Test on Multiple Platforms**
   - Test sharing on Facebook, WhatsApp, Telegram, etc.
   - Verify the preview looks correct on each platform

## Customization

To customize the sharing image:

1. Edit `public/og-image.svg`
2. Modify colors, text, or layout as needed
3. Keep dimensions at 1200x630px for optimal compatibility
4. Redeploy and clear social media caches

## Questions?

For issues with link sharing previews, check:
- Meta tags are properly closed
- Image URL is absolute (not relative)
- Image is accessible publicly (no auth required)
- Image size is within platform limits (usually <8MB)
