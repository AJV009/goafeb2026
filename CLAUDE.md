# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A standalone Goa travel guide web app (vanilla HTML/CSS/JS, no build step, no frameworks). Used by a group of friends to explore and plan a Goa trip. Serves static files — open `index.html` directly or via any HTTP server. Persistent storage via JSONBin.io for user-created lists.

## Development

```bash
# Serve locally
cd /home/alphons/project/goa_idea_board
python -m http.server 8000
# Then open http://localhost:8000
```

No build, lint, or test tooling exists. Changes are live on reload.

### Config setup

Copy `config.example.js` to `config.js` and fill in JSONBin credentials. `config.js` is gitignored. The app works without it (lists feature is hidden), but lists require valid JSONBin credentials.

## Architecture

**Data-driven rendering**: `js/data.js` defines a global `GOA_DATA` object. The app auto-discovers all keys in `GOA_DATA` and renders them — adding a new category key to the data file automatically creates a new tab, cards, and filters with no other code changes.

**Component-based structure**: JS and CSS are split into focused component files under `components/`. A `GoaApp` global namespace connects them.

**JSONBin persistence**: Lists are stored in a shared JSONBin. The API module uses read-modify-write with retry for safe concurrent access. LocalStorage caching (30s TTL) reduces API calls.

### File structure

```
config.js               — JSONBin credentials (gitignored)
config.example.js       — Template with placeholders (checked in)
css/
  base.css              — Variables, reset, body, content layout, animations
js/
  data.js               — All content (GOA_DATA object, expected to be large)
  state.js              — GoaApp namespace, shared state, utilities
  app.js                — Orchestrator: renderContent() with view routing, init()
components/
  api/
    api.js              — JSONBin fetch/save/cache module
  toast/
    toast.css + toast.js — Toast notification system
  hero/
    hero.css + hero.js  — Hero section rendering and styles
  nav/
    nav.css + nav.js    — Category navigation + "My Lists" tab
  cards/
    cards.css + cards.js — Card grid, card rendering, "Add to List" button
  filters/
    filters.css + filters.js — Search, area buttons, add-to-list dropdown events
  lists/
    lists.css + lists.js — Lists overview, detail view, CRUD, save/auto-save, share
  footer/
    footer.css + footer.js — Footer rendering and styles
```

### Load order (index.html)

CSS: `base.css` → component CSS files (hero, nav, cards, filters, footer, toast, lists)
JS: `config.js` → `data.js` → `state.js` → `toast.js` → `api.js` → component JS files → `lists.js` → `app.js` (orchestrator, loaded last)

### Key patterns

- **GoaApp namespace**: `js/state.js` creates `window.GoaApp` with shared state and utilities. Each component IIFE receives `GoaApp` and registers its functions onto it. `app.js` orchestrates by calling these functions.
- **View routing**: `GoaApp.state.viewMode` controls what `renderContent()` renders: `'browse'` (GOA_DATA categories), `'lists'` (all lists overview), `'listDetail'` (single list view).
- **State → render cycle**: `GoaApp.state` holds `activeCategory`, `areaFilter`, `searchQuery`, `expandedCard`, plus list-related state (`viewMode`, `lists`, `activeListId`, `listsDirty`, `listsLastSaved`). Any state change calls `GoaApp.renderContent()` which rebuilds the content area.
- **Lists persistence**: Lists use a read-modify-write pattern: fetch latest bin → merge local changes → PUT back. Auto-save fires 30s after last mutation. Manual save button also available.
- **Shareable lists**: `?list=<id>` URL parameter opens a specific list on load.
- **Area filtering**: Areas are dynamically computed per category from item data (`getAvailableAreas()`), not hardcoded.
- **Card expansion**: Clicking a card toggles `expandedCard` state, which reveals Maps links, GPS copy, and "Add to List" button.

## Planned Features

See `workbench/ideas.txt` for the roadmap. Key upcoming work:
1. ~~JSONBin integration~~ (done)
2. ~~Personal wishlist/list creation~~ (done)
3. Google Maps multi-stop route links (no API key — URL-based only)
4. ~~Shareable lists via unique links~~ (done)
5. Voting system with browser-session-based identity
6. Notes per place from multiple users
7. Time-to-spend estimates per place
8. Sorting by distance, popularity, ratings, votes

## Code Guidelines

- **File size limit**: Keep each JS and CSS file under 200–250 lines. `data.js` is the exception — it's expected to be large since it holds all site content.
- **Composability & reusability**: Design new features as self-contained, reusable modules. Prefer small focused functions over monolithic ones.
- **Component pattern**: New features get their own directory under `components/` with dedicated JS and CSS files. Register functions onto the `GoaApp` namespace. Add corresponding `<script>` / `<link>` tags to `index.html`.

## Adding Content

Add a new category to `js/data.js`:
```js
newCategory: {
  icon: "🎯",
  title: "Category Name",
  color: "#hexcolor",
  items: [
    { name: "Place", area: "North", desc: "Description", lat: 15.0, lng: 74.0, tags: ["tag1"] }
  ]
}
```
No other files need changes — the app discovers it automatically.
