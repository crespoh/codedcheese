# Progress — 2026-08-14

**Live:** https://www.codedcheese.com · `main` in sync with origin, tree clean.

Everything below is deployed and verified live.

---

## What shipped today

Started from `ade29b8` (marketing site + Supabase auth). Merged the redesign
branch and built on it.

| Commit | What |
|---|---|
| `1061563`, `64647b6` | Redesign (from `claude/coded-cheese-redesign-3a0xvp`) — apps-first layout, `AppsSection`, dropped `Services`/`ContactSection` |
| `5f8a62f` | Renamed brand token `--accent` → `--brand` (it was silently breaking shadcn) |
| `b4fb4e7` | Adopted the logo; warmed the palette to match; favicon + real OG image |
| `699df42` | Capped content column at 896px; styled the auth pages |
| `33fdd3e` | Fixed unreadable privacy text (dark-on-dark) |
| `d6c325b` | Fixed the magic-link callback race |
| `bbb93da` | Header theme toggle |
| — | SpellingAssist copy now leads with the photo-of-the-list hook |
| — | Fixed the apex domain at Namecheap (DNS, no commit) — `codedcheese.com` resolves again |

### Notes on the less obvious ones

**`--accent` collision (`5f8a62f`).** The redesign defined `--accent` as a hex in
`:root`, but shadcn already defines it there as an HSL triplet consumed via
`hsl(var(--accent))`. Same specificity, brand block last, so every accent
utility compiled to the invalid `hsl(#EFB520)` and got dropped. Renamed to
`--brand`/`--brand-ink`.

**Palette (`b4fb4e7`).** Logo is `#7C5755` on `#F8F2E7` cream and only reached
2.78:1 on the old dark background. Neutrals were warmed to the logo's cream,
the logo brown became `--ink-soft`, and `--logo` lightens to `#BDA09E` on dark
(7.2:1). `Logo.tsx` is cropped to the artwork (the source SVG was ~48% empty
canvas) and draws in `currentColor`.

**896px column (`699df42`).** Text measures are 455–576px but the container was
still the old 1400px, so rules ran to 1368px with the copy filling ~42%. Note
the container lists *every* breakpoint — it defaults each to the breakpoint's
own width, so setting only `2xl` leaves it wider at 1280px than at 1600px.

**Privacy contrast (`33fdd3e`).** Measured **1.04:1**. The route rendered with no
wrapper, so text fell through to `body`'s shadcn `--foreground`, which is frozen
at the light value (nothing applies `.dark`), while the card's `bg-surface` did
follow `prefers-color-scheme`. Fixed at the root: `body` now uses `--paper`/`--ink`.

**Callback race (`d6c325b`).** supabase-js defaults to `flowType: 'implicit'`, so
magic-link tokens arrive in the URL *fragment* and are consumed asynchronously
inside `_initialize()`. The old code only handled `?code=` and navigated to
`/app` immediately, handing `RequireAuth` a null session → bounced to `/login`
on a valid link. Now subscribes to `onAuthStateChange` before reading the
session and only navigates once one exists. Also reads error fragments directly,
since the client swallows them (an expired link used to hang forever).

**Theme toggle (`bbb93da`).** Dark palette is three-state so a choice can override
the OS *both ways*: `@media (dark) { :root:not([data-theme="light"]) }` plus
`:root[data-theme="dark"]`. Without the `:not()` guard, forcing light on a
dark-mode device silently does nothing.

**Apex domain (DNS, no commit).** `codedcheese.com` had stopped resolving —
`NOERROR` with zero address records, so the bare domain was dead while `www`
(and therefore every deploy check) was fine. The cause was **not** a missing
record: the ALIAS row at Namecheap had Host `codedcheese.com` instead of `@`,
and **Namecheap appends the domain to whatever is in that field**, so it had
built `codedcheese.com.codedcheese.com` — a working record at a name nobody
visits. Changing the Host to `@` was the entire fix; the target
(`apex-loadbalancer.netlify.com`) was correct all along. Apex now returns
`301 → www`, and the Zoho MX/SPF records are unaffected because ALIAS is
flattened rather than a true CNAME. This also explains the old intermittent
apex-TLS symptom recorded in `SpellingApp/APP_STORE_READINESS.md`.

---

## Next up

### 1. Test a real magic-link sign-in ← start here
The only path never exercised for real. All three sub-paths were verified in the
browser (expired fragment, no session, seeded valid session), and the mechanism
was checked against the library source, but an actual email round trip was not
possible. Request a link, click it, confirm you land on `/app`.

### 2. `supabaseClient.ts:10` — env vars can white-screen the whole site
`createClient` runs at module top level with no guard. supabase-js throws
`supabaseUrl is required.` on a falsy URL, and this module is imported
transitively from `main.tsx` — so if `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
ever go missing from the Netlify build env, the marketing pages go blank too,
not just auth. Both vars *are* currently set (verified in the live bundle).
Fix: lazy-init, or render a fallback instead of throwing.

### 3. `RequireAuth.tsx:19` — protected content paints before the redirect
Once `loading` is false it returns `children` unconditionally; the redirect
happens afterwards in `useAuthGuard`'s effect (`useAuthGuard.ts:10`). `/app`
renders for one frame for signed-out visitors. Low impact today (AppHome only
shows a null user) but it's the wrong shape for a guard — gate on `session` too.

### 4. Spelling Assist launch follow-ups
Released 2026-08-14, Apple ID `6746328054`, free, Education, 4+, iOS 17.6+.
The site now links to the **SG storefront** canonical URL.

- **Availability is SG / MY / HK / TW / CN only.** US, GB, AU, CA, JP, IN, DE
  all 404. Confirmed intentional. If that ever widens, switch the `href` in
  `AppsSection.tsx` to the country-less `https://apps.apple.com/app/id6746328054`,
  which auto-routes each visitor to their own storefront.
- **App Store listing work belongs in the `SpellingApp` repo, not here** — see
  its `APP_STORE_READINESS.md` → "Post-launch". That's where the open Chinese
  listing localization is tracked, along with what was already verified on the
  live listing (Chinese keywords are present; Promotional Text is filled).
- **The origin story is still unpublished.** The "every week my daughter's school
  sends home a spelling list, and every app made me retype it" copy is the most
  persuasive thing written about the app and lives nowhere on the site. It's
  what a `/apps/spelling-assist` detail page would be for.

### 5. Smaller / optional
- **Privacy policy content** — headed "Privacy Policy for Spelling App" but linked
  as the site-wide policy, and it's what the App Store listing would point at.
  Decide: site-wide, or one per app.
- **Delete the merged branch** — `origin/claude/coded-cheese-redesign-3a0xvp` is
  fully merged (6 behind, 0 ahead). `git push origin --delete claude/coded-cheese-redesign-3a0xvp`
- **Theme toggle has no "back to system"** once clicked (clearing site data resets
  it). A three-way cycle light → dark → system is a small change.
- **Internal links use `<a href>`** in `Header.tsx` / `Footer.tsx` (`/apps`,
  `/privacy-policy`), forcing full reloads instead of client-side nav. `Link` is
  already imported in Header.
- **Lint baseline is 3 errors, 8 warnings**, all pre-existing: `ui/command.tsx:24`,
  `ui/textarea.tsx:5` (`no-empty-object-type`), `tailwind.config.ts:121`
  (`no-require-imports`).

---

## Working notes

```bash
npm ci                                      # node_modules is not checked in
npm run dev
npm run build                               # vite build -> dist/
npm run lint
./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

**Local build needs the env vars**, or the bundle carries `undefined` and throws
at runtime (see item 2):

```bash
VITE_SUPABASE_URL=... VITE_SUPABASE_ANON_KEY=... npm run build
```

**Deploying:** Netlify auto-builds from `main` via the GitHub App. A push
publishes in roughly 30s.

**Verifying a deploy:** Netlify posts *no* GitHub commit status for this repo, so
`gh api .../status` stays `pending` forever — that is not a failure. Diff the
`etag` on the live site before and after the push instead; it changes per
published deploy:

```bash
curl -sI https://www.codedcheese.com | grep -i '^etag'
```

The Netlify deploys page is authoritative when it matters.

**Gotcha:** the dark palette values in `src/index.css` are duplicated across the
media query and the `[data-theme="dark"]` rule — CSS can't share a declaration
block across a media boundary. Keep the two lists in sync.

**Supabase project ref:** `droyecamihyazodenamj`. Magic links use the implicit
flow (client sets no `flowType`); switching to PKCE would break links opened in
a different browser from the one that requested them.
