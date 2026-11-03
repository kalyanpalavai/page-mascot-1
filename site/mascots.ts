export const MASCOTS = [
  // Animals
  'bear',
  'bunny',
  'cat',
  'deer',
  'dino',
  'fox',
  'frog',
  'hamster',
  'hedgehog',
  'koala',
  'mouse',
  'otter',
  'owl',
  'panda',
  'penguin',
  'pug',
  'raccoon',
  'redpanda',
  'sheep',
  'sloth',
  'tiger',

  // People
  'afro',
  'astronaut',
  'bald',
  'ballerina',
  'beard',
  'builder',
  'cap',
  'chef',
  'glasses',
  'grandpa',
  'granny',
  'hijabi',
  'kamran',
  'nurse',
  'pirate',
  'scientist',
  'sikh',
  'skater',
  'wizard',

  // Robots
  'clockwork',
  'crt',
  'cube',
  'drone',
  'gearbot',
  'knight',
  'lantern',
  'postbot',
  'radio',
  'rocket',
  'scout',
  'toaster',
  'tv',
] as const

export type MascotName = (typeof MASCOTS)[number]

export const MASCOT: string = 'designer-ink'

export function sheets(character: string) {
  return {
    directions: `${import.meta.env.BASE_URL}mascots/${character}-directions.webp`,
    reactions: `${import.meta.env.BASE_URL}mascots/${character}-reactions.webp`,
  }
}
