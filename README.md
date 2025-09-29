# Black-bla.github.io

One-page personal portfolio site with:

- Dark / light theme toggle (persisted)
- Animated hero (glitch title, typewriter subtitle, particle background)
- Section reveal on scroll (IntersectionObserver)
- Project cards with hover lift + glass morphism aesthetic
- Stats counters (animated)
- Responsive mobile navigation
- Accessible semantic HTML and reduced-motion respect

## Structure

```
index.html              # Main single-page document
assets/css/style.css    # Core styles (themes, layout, animations)
assets/js/app.js        # Interactivity + animations + theming
assets/img/             # (placeholder for images)
```

## Local Preview

You can use any static server. Example with Python:

```
python3 -m http.server 8000
```

Then open: http://localhost:8000

## Customization Tips

- Replace placeholder project cards in the `#projects` section.
- Adjust accent gradient via `--gradient-accent` in `style.css`.
- Add real form handling (currently a demo) by wiring a backend or service (Netlify Forms, Formspree, etc.).
- Update stats counts in the `data-count` attributes inside `index.html`.

## Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Theme Switching**: Dark/light mode with localStorage persistence
- **Performance Optimized**: Vanilla JavaScript, no heavy frameworks
- **Accessibility**: Proper ARIA labels, semantic HTML, and reduced motion support
- **Modern CSS**: Uses CSS custom properties, flexbox, and grid
- **Interactive Elements**: Hover effects, scroll animations, and particle background

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties
- ES6 Modules
- Intersection Observer API
- CSS Grid and Flexbox
4. (Optional) Enable Email Verification for better security.
5. In `assets/js/appwriteClient.js` update:
	- `APPWRITE_ENDPOINT` (e.g. https://cloud.appwrite.io/v1)
	- `APPWRITE_PROJECT_ID`
6. Deploy / serve. Registration & login will now create sessions stored via cookies.
7. The homepage silently checks `account.get()` to toggle nav state.

### Adding OAuth Providers
If you enable OAuth (GitHub, Google, etc.), add buttons invoking `account.createOAuth2Session('provider', 'account.html')`.

### Security Notes
- Never embed API keys (Appwrite uses client SDK safely for auth flows).
- For database or storage operations requiring rules, configure permissions server-side or via Appwrite's console.
- Consider adding a serverless function if you later need privileged actions.

## License

MIT (add a LICENSE file if you want to formalize it).

---
Built for a sleek, performant, and visually rich personal brand presence.