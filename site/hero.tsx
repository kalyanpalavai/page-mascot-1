import { Mascot } from '../src/mascot'
import { sheets } from './mascots'

const LINKEDIN = 'https://www.linkedin.com/in/kalyan-harshavardhan-palavai-b08358105/'
const RESUME = 'https://drive.google.com/drive/folders/1cAp0hQetWcsACWSFky9KqBFIjJj9dQax?usp=sharing'

type HeroProps = {
  character: string
  title?: string
  subtitle?: string
}

export function Hero(props: HeroProps) {
  const { character, title = '/page-mascot', subtitle } = props

  return (
    <header className="flex flex-col items-start">
      <Mascot key={character} {...sheets(character)} label={character} size={200} className="-ml-4" />

      <h1 className="mt-2 font-mono text-5xl font-bold tracking-tighter sm:text-6xl">
        {title}
      </h1>
      <p className="mt-4 max-w-[50ch] text-xl leading-snug font-medium text-ink/60">
        {subtitle ?? (
          <>
            Skill to generate a character for the top of your page. It follows the reader&rsquo;s
            cursor and blinks when they poke it.
          </>
        )}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-ink px-4 py-3 text-base font-medium text-paper transition-opacity hover:opacity-85"
        >
          LinkedIn
        </a>
        <a
          href={RESUME}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-ink/15 px-4 py-3 text-base font-medium text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
        >
          Resume
        </a>
      </div>
    </header>
  )
}
