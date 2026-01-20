## Black-bla.github.io

Current version: A clean, fast, single‑page personal portfolio built with plain HTML, CSS, and a little vanilla JavaScript.

### 🔥 Key Visual Elements
* Fullscreen diagonal split hero (left: branded image, right: intro content)
* Floating logo over the image side
* Horizontal nav (About / Projects / Contact)
* Subscription funnel (Subscribe buttons linking to payment page)
* Animated hero content fade / slide
* Red "About Me" emphasis section for personal story
* Image‑background project cards with dark gradient overlays + hover zoom
* Responsive layout: stacks gracefully on mobile

### ✅ What Was Removed (Legacy Features No Longer Present)
* Authentication / account pages
* Theme toggle (light/dark)
* Glitch / typewriter / particle experimental effects
* Stats counters & scroll reveal utilities

### 📁 Structure
```
index.html               # Main page
assets/css/style.css     # All styling (layout, hero, cards, responsiveness)
assets/js/app.js         # Minor interaction hooks / future expansion
assets/images/           # Hero + project images (1.jpeg,2.jpeg,3.jpeg,image.jpeg)
 payment.html            # Subscription & simulated M-Pesa style payment flow
```

### 🚀 Run Locally
Any static server works. Examples:

Python:
```
python -m http.server 8000
```
Node (npx serve):
```
npx serve .
```
Then open: http://localhost:8000

### 🛠 Customize
| Area | How |
|------|-----|
| Hero background | Replace `assets/images/image.jpeg` or adjust `.hero-bg-image` CSS |
| Logo text | Edit the `.hero-logo` div in `index.html` |
| Diagonal shape | Tweak `clip-path` in `.hero-image-side` |
| Project images | Replace `assets/images/1.jpeg` etc. |
| Project copy | Edit each `.project-card-content` block |
| About section color | Change `#about { background: #dc2626; }` in CSS |
| Accent gradients | Modify linear-gradient in `.hero-title` / `.hero-btn` |
| Subscription button | Update text or link in nav / hero (`.nav-subscribe`, `.secondary-btn`) |
| Payment amount | Default amount in `payment.html` input `#amount` |
| Reference format | Change default `#ref` value in `payment.html` |

### 📐 Notable CSS Techniques
* `clip-path: polygon(...)` for diagonal hero boundary
* CSS custom properties for theme tokens (colors, spacing, shadow)
* Layered background image + overlay gradients for project cards
* Keyframe animations for hero entrance
* Responsive grid with `repeat(auto-fit, minmax())`

### 🧪 Suggested Next Enhancements
* Add a lightweight accessibility pass (skip link, focus styles refinement)
* Lazy‑load project images (`loading="lazy"`)
* Add Open Graph / Twitter meta tags
* Integrate a real contact endpoint (Formspree / Netlify Forms / backend)
* Fallback system font stack already in place—optionally introduce a display font
* Hook real M-Pesa STK backend (e.g., Django/Node server calling Daraja API) replacing front-end simulation

### 🗂 Deployment Notes
* Designed for GitHub Pages root (repo name matches user domain)
* If styles appear missing after deploy: hard reload (Ctrl+F5) or append `?v=1` to stylesheet URL due to page caching

### 📄 License
MIT (feel free to adapt). Add a LICENSE file if you want explicit redistribution terms.

---
Built lean on purpose: no framework, minimal JS, strong visuals.