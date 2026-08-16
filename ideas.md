# AnimeWave Player — Design Direction

## Ground-truth reference
The attached reference image is the visual source of truth. Preserve its immersive, full-screen composition: a cinematic illustrated background, a warm sunset/amber atmosphere, large expressive title typography, a small status pill, compact glassmorphism controls, and a bottom-centered audio player that floats over the scene. The implementation should feel like a focused music ritual rather than a conventional dashboard.

## Chosen Approach: Cinematic Amber Afterglow

### Design Movement
Contemporary editorial music UI fused with anime film title cards and translucent glass interface design.

### Core Principles
- **Scene first:** the background image/video owns the emotional field; interface surfaces sit lightly above it.
- **Warm contrast:** amber, burnt sienna, charcoal, and moonlit cream create a nocturnal-but-human atmosphere.
- **Asymmetric calm:** large type and offset clusters create a cinematic composition instead of a centered app shell.
- **Quiet utility:** controls stay legible, compact, and tactile without competing with the artwork.

### Color Philosophy
The palette should feel like the last five minutes of daylight: burnt orange for energy and memory, deep espresso for grounding, and pale cream for lyric-like clarity. A muted sage status green is reserved for presence and playback health so it reads as information rather than decoration.

### Layout Paradigm
A full-viewport stage with edge-anchored utility controls, a left-leaning title lockup, a small top-center announcement strip, a right-side listening queue, and a bottom floating player. The composition should breathe and keep the center open for the background video.

### Signature Elements
- A soft amber glow and fine film-grain veil over the visual backdrop.
- Frosted charcoal glass surfaces with hairline cream borders.
- Large brush-like display typography paired with small mono utility labels.

### Interaction Philosophy
Everything should respond like a physical audio object: subtle lift on hover, a 0.97 scale press state, and progress movement that feels continuous. Secondary actions reveal themselves through gentle opacity and border changes, not loud color shifts.

### Animation
Use short 160–240ms transitions for buttons and queue states. Let the hero title and status pill drift in with small vertical offsets. Keep the background media visually alive through a slow scale/position drift, but respect `prefers-reduced-motion`. The active queue item gets a restrained amber pulse instead of a constant glow.

### Typography System
Use **Bodoni Moda** for the oversized title and track name, with **DM Sans** for interface copy and **IBM Plex Mono** for metadata, timestamps, and small status labels. Display type should be italic or high-contrast where possible; utility text should be compact, uppercase, and letter-spaced.

### Brand Essence
AnimeWave is a cinematic listening room for anime songs, made for people who want the atmosphere of a scene before the first note lands. Personality: **nostalgic, intimate, transportive**.

### Brand Voice
Headlines are evocative and short. CTAs are direct but understated. Microcopy feels like a radio host who knows when to stay quiet.

Example lines:
- “Soundtrack the scene in your head.”
- “Stay a little longer.”

### Wordmark & Logo
Use a compact wave-and-star symbol: two offset crescent strokes forming an audio wave, with a four-point star cut through the center. It should work as a standalone mark in the header and favicon, never as a default-font wordmark.

### Signature Brand Color
**Afterglow Amber — #E58A4F.** It is warm enough to feel human, distinctive against charcoal glass, and visually tied to sunset anime title cards.

### File-level reminder
Every edited CSS/component/page file should reinforce Cinematic Amber Afterglow: scene-first composition, warm contrast, asymmetric calm, quiet utility, frosted charcoal glass, expressive display typography, and tactile micro-interactions.
