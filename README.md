<img src=".github/fox.png" width="160" alt="">

# page-mascot

An interactive character that watches the cursor and blinks when you poke it.

**[See the fifty-two &rarr;](https://koboyo.com/page-mascot)**

## Install

```bash
npm i page-mascot
```

## Use existing mascots

Pick a character on the [demo page](https://koboyo.com/page-mascot) and download its two
sheets into `public/mascots`, then point the component at them:

```tsx
import { Mascot } from 'page-mascot'

<Mascot
  directions="/mascots/fox-directions.webp"
  reactions="/mascots/fox-reactions.webp"
/>
```

The paths are whatever your app serves, so imported images work too.

Or let an agent do it, once the skill below is installed:

```
/page-mascot put the fox on my page
```

## Draw your own

Install the skill:

```bash
npx skills add nilbuild/page-mascot --skill page-mascot --global --yes
```

Then ask your agent:

```
/page-mascot a chibi otter with chocolate-brown fur
/page-mascot make one that looks like me        [attach a photo]
/page-mascot a chibi fox, in the riso style
```

It draws the nine directions and nine expressions, builds them into two aligned sheets,
checks the character does not jump between them, and puts the component on your page, with
the same two props as above.

Drawing needs an image tool. Codex has its own; Claude Code goes through the OpenAI images
API:

```bash
export OPENAI_API_KEY=sk-...
```

If your image tool cannot make transparent backgrounds, the skill asks for a solid chroma-key
colour instead and removes it with `scripts/key.py`.

Building the sheets needs Python 3 (`pip install -r skills/page-mascot/scripts/requirements.txt`).
Using the component does not.

Or take the [prompts](skills/page-mascot/reference/prompts.md) and use them in any chat
UI.

## Props

| prop | default | |
| --- | --- | --- |
| `directions` | none | path to the directions sheet |
| `reactions` | none | path to the reactions sheet |
| `size` | `140` | px, square |
| `label` | `'mascot'` | what a screen reader calls it |
| `className` | | |

Tracking switches off without a fine pointer, and the click squash honours
`prefers-reduced-motion`.

## How it works

Each character is two 3×3 sprite sheets: nine head directions, and nine expressions.

![the two sheets that make up one character](.github/sheets.png)

The pointer's angle picks a cell on the directions sheet, with a dead zone so the head
settles when the cursor is close. A click shows a cell from the reactions sheet for half a
second.

The same character can be drawn in six styles: colour, ink, sketch, riso, paper and pixel.
Only the rendering changes, so the alignment holds.

![the same fox drawn in six styles](.github/styles.png)

## Repository

| path | what |
| --- | --- |
| `src/` | the `Mascot` component, published as `page-mascot` |
| `skills/page-mascot/` | the agent skill: instructions, prompts, and the Python build scripts |
| `characters/` | source sheets (PNG) for each character |
| `public/mascots/` | the same sheets as WebP, served by the demo site |
| `site/` | the demo page (Vite + Tailwind) |

## Development

```bash
npm install
npm run dev         # demo site
npm run typecheck
npm run lint
npm run build       # compile the package and sync the skill's copy of mascot.tsx
```

`skills/page-mascot/mascot.tsx` is a copy of `src/mascot.tsx`. Edit the source, then run
`npm run sync:skill`; `npm run check:skill` fails if they drift.

## License

MIT © [Kamran Ahmed](https://kamran.fyi)
