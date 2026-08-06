import { TFunction, OptionsSpecV2 } from '@gamepark/rules-api'
import { NobleColor, playerColors } from './NobleColor'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: NobleColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type CitesRoyalesOptions = {
  players: PlayerOptions[]
}

/**
 * The option space of cites-royales: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 */
export const CitesRoyalesOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 4 },
  identities: { values: playerColors }
}

export function getPlayerName(playerId: NobleColor, t: TFunction) {
  switch (playerId) {
    case NobleColor.Cyan:
      return t('Cyan')
    case NobleColor.Brown:
      return t('Brown')
    case NobleColor.Black:
      return t('Black')
    case NobleColor.Beige:
      return t('Beige')
  }
}