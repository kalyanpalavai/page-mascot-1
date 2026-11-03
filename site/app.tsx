import { Hero } from './hero'
import { MASCOT } from './mascots'

function App(props: { title?: string; subtitle?: string }) {
  return (
    <div className="mx-auto w-full max-w-[960px] px-6 pt-20 pb-28 sm:px-10 sm:pt-28">
      <Hero character={MASCOT} title={props.title} subtitle={props.subtitle} />
    </div>
  )
}

export default App
