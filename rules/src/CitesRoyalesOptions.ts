import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
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
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const CitesRoyalesOptionsSpec: OptionsSpec<CitesRoyalesOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Noble color'),
      values: playerColors,
      valueSpec: color => ({ label: t => getPlayerName(color, t) })
    }
  }
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