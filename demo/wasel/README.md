# Wasel — وصل
### Connect with Your Community

A prototype social meeting app for the Swedish market with focus on Middle Eastern communities.
Clean, genuine, respectful — not a dating app.

---

## Getting Started

Simply open `pages/index.html` in your browser. No build step required.

**Start here:** `pages/index.html`

Or try the demo directly from `pages/login.html` → "Continue as Demo User"

---

## File Structure

```
wasel/
├── pages/
│   ├── index.html       ← Splash / landing page
│   ├── signup.html      ← 3-step registration
│   ├── login.html       ← Sign in
│   ├── discover.html    ← Browse & filter people
│   ├── messages.html    ← Conversation list
│   ├── chat.html        ← Chat window (pass ?id=N)
│   ├── games.html       ← 6 ice-breaker games
│   └── profile.html     ← View & edit your profile
├── css/
│   ├── variables.css    ← Design tokens, global styles, buttons, forms
│   └── components.css   ← Shared UI: profile sheet, modals, game overlay
├── js/
│   ├── state.js         ← App state, seed data, sessionStorage persistence
│   └── nav.js           ← Bottom nav injection, profile sheet logic
└── README.md
```

---

## Features

### People & Discovery
- Grid of people with avatar, age, city, community/interest tags
- Community filter chips: Arabic, Muslim, Christian, Swedish, Kurdish, Persian, Somali
- Advanced filters: age range, gender, city
- Online strip showing active users
- Full profile sheet with details + message/challenge buttons

### Segments Supported
- Arabic, Muslim, Christian, Swedish, Kurdish, Persian, Somali, Turkish, Secular

### Messaging
- Conversation list with unread badges
- Real-time-feeling chat with auto-replies
- Game challenge share from chat
- Chat share button (Web Share API / clipboard fallback)
- Offline message storage via sessionStorage

### Ice-Breaker Games (6 games)
1. **Tic-Tac-Toe** — vs AI with win detection
2. **Chess** — Full board, basic AI opponent
3. **Memory Match** — Flip & match emoji pairs
4. **Word Guess** — Hangman with community words
5. **Trivia** — Swedish/Arabic culture questions
6. **Rock Paper Scissors** — Best of 5

### Profile
- 3-step sign-up (Basic info → Community → Account)
- Avatar picker (30 emoji options)
- Editable name, age, gender, city, bio
- Community & interest tags
- Games played & connections stats
- Settings (language, visibility, notifications)

---

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Zero dependencies, zero build step
- sessionStorage for cross-page state persistence
- Google Fonts: Playfair Display, DM Sans, Noto Naskh Arabic

---

## MVP Target Market

🇸🇪 Sweden — Middle Eastern diaspora communities  
Language: English UI (Swedish & Arabic locale stubs included)

---

## Next Steps for Production

- [ ] Real auth backend (Firebase / Supabase)
- [ ] WebSocket real-time chat
- [ ] Push notifications
- [ ] Photo upload (replace emoji avatars)
- [ ] Geolocation matching
- [ ] Multiplayer games (Socket.io)
- [ ] Swedish & Arabic full localization
- [ ] Moderation & reporting tools
- [ ] Mobile app (React Native / PWA)
