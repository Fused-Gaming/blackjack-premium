# Design Asset Prompts for Blackjack Premium

## Automation Options

### Automated Generation (Recommended)

**Unofficial Python API**: [eeemoon/perchance](https://github.com/eeemoon/perchance)
- Python library with async/await support
- Programmatic text-to-image generation
- No watermarks, unlimited generations

**Installation**:
```bash
pip install perchance
```

**Example Usage**:
```python
import asyncio
from perchance import TextToImage

async def generate_asset(prompt, filename):
    generator = TextToImage()
    image = await generator.generate(prompt)
    await image.save(f"public/assets/{filename}")

# Batch generation
prompts = {
    "card-back": "Elegant playing card back design...",
    "poker-chip-red": "Red poker chip, casino style...",
}

for name, prompt in prompts.items():
    asyncio.run(generate_asset(prompt, f"{name}.png"))
```

**.NET Desktop Client**: [Perchance-T2I-Desktop](https://github.com/manh9011/Perchance-T2I-Desktop)
- User-friendly desktop application
- Batch processing support
- Local storage management

### Manual Generation (Human-in-the-Middle)

If automation is not feasible, use the web interface at [https://perchance.org/ai-text-to-image-generator](https://perchance.org/ai-text-to-image-generator) with the prompts below.

---

## Asset Requirements & Prompts

### 1. Playing Cards

#### Card Back Design
**Type**: Card Back
**Dimensions**: 500 x 726 px (standard poker card ratio)
**Style**: Luxury casino aesthetic
**Color Palette**: Deep burgundy, gold accents, black
**Format**: PNG with transparency

**Prompt**:
```
Luxury casino playing card back design, deep burgundy background with intricate gold geometric patterns, art deco style, symmetrical ornate border, subtle texture, premium feel, high contrast, centered design, professional casino quality, elegant and sophisticated, 4k resolution
```

#### Card Faces
**Note**: Use CSS/SVG for card faces (suits and ranks) for better scalability and performance. Only generate custom artwork if needed for special editions.

### 2. Poker Chips

#### Red Chip ($5)
**Type**: Casino Chip
**Dimensions**: 512 x 512 px (square, chip centered)
**Style**: Professional casino chip
**Color Palette**: Bright red, white accents
**Format**: PNG with transparency

**Prompt**:
```
Professional casino poker chip, bright red color, white edge spots, "$5" denomination in center with white text, small diamond pattern on face, subtle 3D depth, realistic lighting, top-down view, sharp details, casino-grade quality, isolated on transparent background, 4k resolution
```

#### Blue Chip ($10)
**Type**: Casino Chip
**Dimensions**: 512 x 512 px
**Color Palette**: Royal blue, white accents

**Prompt**:
```
Professional casino poker chip, royal blue color, white edge spots, "$10" denomination in center with white text, small diamond pattern on face, subtle 3D depth, realistic lighting, top-down view, sharp details, casino-grade quality, isolated on transparent background, 4k resolution
```

#### Green Chip ($25)
**Type**: Casino Chip
**Dimensions**: 512 x 512 px
**Color Palette**: Forest green, white accents

**Prompt**:
```
Professional casino poker chip, forest green color, white edge spots, "$25" denomination in center with white text, small diamond pattern on face, subtle 3D depth, realistic lighting, top-down view, sharp details, casino-grade quality, isolated on transparent background, 4k resolution
```

#### Black Chip ($100)
**Type**: Casino Chip
**Dimensions**: 512 x 512 px
**Color Palette**: Black, gold accents

**Prompt**:
```
Professional casino poker chip, black color with gold edge spots, "$100" denomination in center with gold text, premium design, subtle diamond pattern, 3D depth, realistic lighting, top-down view, luxury feel, casino-grade quality, isolated on transparent background, 4k resolution
```

#### Purple Chip ($500)
**Type**: Casino Chip
**Dimensions**: 512 x 512 px
**Color Palette**: Deep purple, gold accents

**Prompt**:
```
Professional casino poker chip, deep purple color with gold edge spots, "$500" denomination in center with gold text, premium luxury design, intricate pattern, 3D depth, realistic lighting, top-down view, high-end casino quality, isolated on transparent background, 4k resolution
```

### 3. Table Background

#### Green Felt Table
**Type**: Background Texture
**Dimensions**: 1920 x 1080 px (16:9 aspect ratio)
**Style**: Casino table felt
**Color Palette**: Rich green (RGB: 0, 106, 78)
**Format**: JPG (background, no transparency needed)

**Prompt**:
```
Professional casino blackjack table felt texture, rich green color (RGB 0, 106, 78), subtle fabric weave texture, even lighting, clean surface, high-end casino quality, no markings, smooth gradient from center to edges, realistic felt material, 4k resolution, wide shot
```

#### Premium Table Surface
**Type**: Background Texture
**Dimensions**: 1920 x 1080 px
**Style**: Luxury casino table with subtle markings
**Format**: PNG with transparent markings

**Prompt**:
```
Luxury casino blackjack table surface, premium green felt with subtle gold accents at edges, elegant betting circle outlines in gold, "BLACKJACK PAYS 3:2" text in gold at top center, art deco border pattern, professional casino quality, sophisticated design, 4k resolution
```

### 4. UI Elements

#### Dealer Placeholder
**Type**: Character/Avatar
**Dimensions**: 400 x 400 px
**Style**: Professional casino dealer
**Format**: PNG with transparency

**Prompt**:
```
Professional casino dealer avatar, business formal attire, black vest and white shirt, neutral friendly expression, from chest up, centered composition, soft lighting, casino background blur, professional photography style, high quality portrait, isolated subject, 4k resolution
```

#### Win/Loss Badge Icons
**Type**: Icon/Badge
**Dimensions**: 256 x 256 px
**Format**: PNG with transparency

**Win Badge Prompt**:
```
Gold trophy icon with star burst effect, "WIN" text, celebratory design, bright and energetic, glowing effect, 3D appearance, casino theme, exciting visual, transparent background, 4k resolution
```

**Loss Badge Prompt**:
```
Simple "BUST" text badge, red and black color scheme, subtle design, clear typography, professional look, slightly 3D, casino theme, transparent background, 4k resolution
```

#### Blackjack Badge
**Dimensions**: 256 x 256 px
**Format**: PNG with transparency

**Prompt**:
```
Premium "BLACKJACK!" badge design, gold and black color scheme, playing card Ace and King silhouettes, elegant typography, celebratory but sophisticated, subtle glow effect, 3D appearance, luxury casino aesthetic, transparent background, 4k resolution
```

### 5. Button Backgrounds

#### Primary Action Button
**Type**: UI Button Background
**Dimensions**: 300 x 80 px
**Style**: Modern gradient button
**Color Palette**: Green gradient
**Format**: PNG with transparency

**Prompt**:
```
Modern casino button background, green gradient from bright to deep green, subtle shine effect on top edge, slightly rounded corners, 3D appearance with subtle shadow, professional UI design, casino theme, transparent background, 4k resolution
```

#### Secondary Action Button
**Color Palette**: Blue gradient

**Prompt**:
```
Modern casino button background, blue gradient from bright to deep blue, subtle shine effect on top edge, slightly rounded corners, 3D appearance with subtle shadow, professional UI design, casino theme, transparent background, 4k resolution
```

#### Danger/Cancel Button
**Color Palette**: Red gradient

**Prompt**:
```
Modern casino button background, red gradient from bright to deep red, subtle shine effect on top edge, slightly rounded corners, 3D appearance with subtle shadow, professional UI design, casino theme, transparent background, 4k resolution
```

---

## Asset Organization

All generated assets should be saved in the following directory structure:

```
public/assets/
├── cards/
│   ├── back.png
│   └── [suits/ranks if custom]
├── chips/
│   ├── chip-5.png
│   ├── chip-10.png
│   ├── chip-25.png
│   ├── chip-100.png
│   └── chip-500.png
├── backgrounds/
│   ├── table-felt.jpg
│   └── table-premium.png
├── ui/
│   ├── dealer-avatar.png
│   ├── badge-win.png
│   ├── badge-loss.png
│   ├── badge-blackjack.png
│   ├── button-primary.png
│   ├── button-secondary.png
│   └── button-danger.png
└── icons/
    └── [any additional icons]
```

## Generation Workflow

### Automated Batch Generation

1. Install Python API: `pip install perchance`
2. Create generation script (`scripts/generate-assets.py`):

```python
import asyncio
from perchance import TextToImage

ASSETS = {
    "cards/back.png": "Luxury casino playing card back design...",
    "chips/chip-5.png": "Professional casino poker chip, bright red color...",
    # Add all prompts
}

async def generate_all():
    generator = TextToImage()
    for filepath, prompt in ASSETS.items():
        print(f"Generating {filepath}...")
        image = await generator.generate(prompt)
        await image.save(f"public/assets/{filepath}")
        print(f"✓ {filepath}")

asyncio.run(generate_all())
```

3. Run: `python scripts/generate-assets.py`

### Manual Generation Checklist

- [ ] Visit [Perchance AI Generator](https://perchance.org/ai-text-to-image-generator)
- [ ] Copy prompt for each asset
- [ ] Generate and download
- [ ] Rename to match asset organization structure
- [ ] Save to `public/assets/` directory
- [ ] Verify quality and consistency
- [ ] Document any modifications made

---

## Quality Guidelines

- **Resolution**: Minimum 4k for scalability
- **Format**: PNG for transparency needs, JPG for solid backgrounds
- **Consistency**: Maintain similar lighting and style across related assets
- **Accessibility**: Ensure sufficient contrast for UI elements
- **Performance**: Optimize file sizes after generation (use tools like TinyPNG)

## References

- [Perchance AI Generator](https://perchance.org/ai-text-to-image-generator)
- [Unofficial Python API](https://github.com/eeemoon/perchance)
- [.NET Desktop Client](https://github.com/manh9011/Perchance-T2I-Desktop)
- [Perchance Text-to-Image Plugin](https://perchance.org/text-to-image-plugin)

---

**Last Updated**: 2026-01-24
