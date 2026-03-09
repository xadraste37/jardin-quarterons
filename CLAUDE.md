# Jardin des Quarterons — Developer Reference

## Project Overview

Standalone Next.js 14 PWA for a gamified outdoor discovery experience at **Clos des Quarterons** vineyard. Deployed on a subdomain of `mercigabin.com`. Not part of VineVoice.

- **Supabase project**: `blkzckjwlpuxqckduypi.supabase.co` (shared with VineVoice)
- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS with custom brand tokens
- **Interactivity**: @dnd-kit (drag & drop), Framer Motion (rotation gesture)
- **PWA**: next-pwa, manifest.json, offline cache

---

## Brand Tokens

| Token | Value |
|-------|-------|
| Primary blue | `#1B2A3E` (`brand-blue`) |
| Gold/amber | `#D4A017` (`brand-gold`) |
| Background | `#ffffff` |
| Font | Nunito (Google Fonts) |
| Button radius | `999px` (pill) |

### UI Patterns
- **Back button**: gold circle `←` top-left
- **Images**: always in circles (`rounded-full`)
- **Primary CTA**: gold pill button (`btn-gold`)
- **Secondary CTA**: dark blue pill button (`btn-blue`)
- **Success**: dark blue card with white text OR circle image on white
- **Error**: white bg + friendly message + "Je continue" gold button

---

## Database Schema (Supabase)

### Tables
- `qj_parcours` — top-level journey/experience
- `qj_chapitre` — chapters within a parcours
- `qj_ecran` — individual screens within a chapitre

All tables have **public read RLS** (`anon` role can SELECT).

Run schema: `supabase/schema.sql`
Run seed: `node scripts/seed-quarterons.mjs`

---

## Screen Type System

Screens are stored in `qj_ecran.type` (string) + `qj_ecran.data` (JSONB).
The `ScreenRenderer` component routes to the correct screen component.

### `intro`
**File**: `components/screens/IntroScreen.tsx`
**Data shape**:
```json
{
  "cover_image_url": "string",
  "title": "string",
  "subtitle": "string",
  "body_text": "string",
  "cta_label": "string"
}
```
**UI**: Circular top image → title → body → gold CTA button.

---

### `chapter_menu`
**File**: `components/screens/ChapterMenuScreen.tsx`
**Data shape**:
```json
{
  "chapters": [
    { "number": 1, "title": "string", "subtitle": "string", "chapitre_id": "uuid" }
  ]
}
```
**UI**: Numbered gold circles + title + italic subtitle. Tapping navigates to `/chapitre/[id]`.

---

### `chapter_intro`
**File**: `components/screens/ChapterIntroScreen.tsx`
**Data shape**:
```json
{
  "title": "string",
  "instruction_text": "string",
  "sub_items": [{ "label": "string", "icon": "emoji" }]
}
```
**UI**: Dark blue card, white text, optional icon grid.

---

### `editorial`
**File**: `components/screens/EditorialScreen.tsx`
**Data shape**:
```json
{
  "title": "string",
  "paragraphs": [{ "text": "string", "bold_words": ["word"] }],
  "images": [{ "url": "string", "caption": "string" }],
  "audio_url": "string",
  "audio_narrator_name": "string",
  "audio_narrator_photo_url": "string",
  "cta_missions": [{ "label": "string", "type": "continue|bonus" }],
  "bonus_content": { "title": "string", "paragraphs": [...], "images": [...] }
}
```
**UI**: Scrollable article with circle photos, inline bold text, narrator audio strip, bonus modal via bottom sheet.

---

### `code_hunt`
**File**: `components/screens/CodeHuntScreen.tsx`
**Data shape**:
```json
{
  "question": "string",
  "hint_text": "string",
  "correct_code": "1234",
  "error_message": "string",
  "error_hint": "string"
}
```
**UI**: Custom numeric keypad (0–9, shift, `_`, erase). Error screen if wrong code.

---

### `drag_drop_objects`
**File**: `components/screens/DragDropObjectsScreen.tsx`
**Data shape**:
```json
{
  "instruction": "string",
  "target_image_url": "string",
  "target_label": "string",
  "draggable_items": [{ "id": "string", "image_url": "string", "label": "string" }],
  "success_text": "string",
  "success_image_url": "string"
}
```
**UI**: Circle drop target top, draggable circle items below (@dnd-kit). Success dark card on correct drop.

---

### `rotation_gesture`
**File**: `components/screens/RotationGestureScreen.tsx`
**Data shape**:
```json
{
  "instruction": "string",
  "image_url": "string",
  "min_rotation_degrees": 90,
  "success_text": "string",
  "success_audio_url": "string",
  "success_image_url": "string"
}
```
**UI**: Circular image, detect two-finger rotation via touch events + Framer Motion. Triggers success after threshold.

---

### `narrator_quiz_prep`
**File**: `components/screens/NarratorQuizPrepScreen.tsx`
**Data shape**:
```json
{
  "narrator_name": "string",
  "narrator_photo_url": "string",
  "instruction_text": "string",
  "audio_url": "string",
  "cta_label": "string",
  "quiz_count": 2
}
```
**UI**: Narrator circle photo + play overlay, dot progress indicators for quiz count, gold CTA.

---

### `quiz_qcm`
**File**: `components/screens/QuizQcmScreen.tsx`
**Data shape**:
```json
{
  "questions": [{
    "number": 1,
    "question_text": "string",
    "options": [{ "id": "a", "label": "string", "is_correct": true }],
    "next_cta_label": "string"
  }]
}
```
**UI**: Progress bar, 3 dark blue pill answers, green/red highlight on tap, CTA after answer. Supports 1–N sequential questions.

---

### `riddle`
**File**: `components/screens/RiddleScreen.tsx`
**Data shape**:
```json
{
  "title": "Qui suis-je ?",
  "clue_text": "string with **bold** markdown",
  "hint_text": "string",
  "answer_text": "string",
  "answer_image_url": "string",
  "answer_label": "string"
}
```
**UI**: Clue with bold keywords (`**word**`), gold "Indice" circle button → hint modal, "Voir la réponse" → reveal screen.

---

### `defis_grid`
**File**: `components/screens/DefisGridScreen.tsx`
**Data shape**:
```json
{
  "defis": [{ "number": 1, "title": "string", "subtitle": "string", "ecran_ids": ["uuid"] }]
}
```
**UI**: 2-column grid of dark blue circles. Tapping navigates to `/defi/[ecran_id]`.

---

### `drag_drop_map`
**File**: `components/screens/DragDropMapScreen.tsx`
**Data shape**:
```json
{
  "instruction": "string",
  "map_image_url": "string",
  "drop_zones": [{ "id": "string", "x_percent": 30, "y_percent": 40, "label": "string" }],
  "draggable_items": [{
    "id": "string",
    "image_url": "string",
    "correct_zone_id": "string",
    "reveal_text": "string",
    "cta_label": "string"
  }]
}
```
**UI**: Map image with absolute-positioned drop zones (x/y as % of image), draggable circle item below. Success card on correct drop.

---

### `success`
**File**: `components/screens/SuccessScreen.tsx`
**Data shape**:
```json
{
  "title": "string",
  "body_text": "string",
  "image_url": "string (optional)",
  "cta_label": "string",
  "cta_target": "string (optional route)"
}
```
**UI**: If `image_url` present → white bg + circle image. Else → dark blue card with white text.

---

### `conclusion`
**File**: `components/screens/ConclusionScreen.tsx`
**Data shape**:
```json
{
  "team_image_url": "string",
  "audio_url": "string",
  "audio_duration_seconds": 120,
  "quote": "string",
  "quote_author": "string",
  "btn_merci_label": "string",
  "btn_accueil_label": "string"
}
```
**UI**: Team circle photo, play button + duration, italic quote + author, 2 CTA buttons.

---

## App Routes

| Route | Description |
|-------|-------------|
| `/` | Intro screens (fetches first parcours + first chapitre) |
| `/chapitre/[id]` | Sequential screens of a chapter |
| `/defi/[id]` | Individual defi screens (id = first ecran_id) |
| `/guide-plantes` | Plant guide (bonus static content) |

## Navigation Logic

- Linear: `onNext` advances to next ecran, then next chapitre, then `/`
- Back: `onBack` goes to prev ecran or `router.back()`
- Chapter menu: tap → `router.push('/chapitre/[id]')`
- Defis grid: tap → `router.push('/defi/[ecran_id]')`

---

## Key Files

```
app/
  layout.tsx              — Root layout, Nunito font, PWA meta
  page.tsx                — Fetches first parcours → renders intro screens
  IntroPageClient.tsx     — Client state for intro screen flow
  chapitre/[id]/
    page.tsx              — Fetches chapter + screens (server)
    ChapitreClient.tsx    — Client state for chapter screen flow
  defi/[id]/
    page.tsx              — Fetches defi screens (server)
    DefiClient.tsx        — Client state for defi screen flow
  guide-plantes/page.tsx  — Static plant guide

components/
  ScreenRenderer.tsx      — Routes ecran.type → correct screen component
  screens/                — One file per screen type (14 types)
  ui/
    BackButton.tsx        — Gold circle ← button
    GoldButton.tsx        — Gold pill CTA
    BlueButton.tsx        — Dark blue pill CTA
    PlayButton.tsx        — Audio play/pause gold circle

lib/
  supabase.ts             — Supabase client
  types.ts                — All TypeScript types for DB + screen data

supabase/
  schema.sql              — CREATE TABLE + RLS policies

scripts/
  seed-quarterons.mjs     — Inserts sample parcours/chapitres/écrans

public/
  manifest.json           — PWA manifest
```
