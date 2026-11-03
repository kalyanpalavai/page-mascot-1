export const MASCOT = 'designer-ink'

export function sheets(character: string) {
  return {
    directions: `${import.meta.env.BASE_URL}mascots/${character}-directions.webp`,
    reactions: `${import.meta.env.BASE_URL}mascots/${character}-reactions.webp`,
  }
}
