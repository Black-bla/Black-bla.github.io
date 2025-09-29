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

## License

MIT (add a LICENSE file if you want to formalize it).

---
Built for a sleek, performant, and visually rich personal brand presence.