/** @jsxImportSource @emotion/react */
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { SetupDraftRule } from '@gamepark/cites-royales/rules/SetupDraftRule'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const SetupDraftHeader = () => {
  const { t } = useTranslation()
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const rule = new SetupDraftRule(rules.game)
  if (me !== undefined && rules.isTurnToPlay(me)) {
    const players = rule.getNeighborsToGiveCard(me)
    if (players.length === 2) {
      return <SetupDraftHeaderMeTwoPlayers players={players}/>
    } else {
      return <SetupDraftHeaderMeOnePlayer players={players}/>
    }
  } else {
    const activePlayers = rules.game.rule!.players!
    if (activePlayers.length > 1) {
      return <>{t('header.setup-draft.players', { cards: rule.cardsToGive })}</>
    }
    return <SetupDraftHeaderPlayer player={activePlayers[0]}/>
  }
}

type SetupDraftHeaderMePlayersProps = {
  players: NobleColor[]
}

const SetupDraftHeaderMeTwoPlayers = ({ players }: SetupDraftHeaderMePlayersProps) => {
  const { t } = useTranslation()
  const player1 = usePlayerName(players[0])
  const player2 = usePlayerName(players[1])
  return <>{t('header.setup-draft.you.2', { player1, player2 })}</>
}

const SetupDraftHeaderMeOnePlayer = ({ players }: SetupDraftHeaderMePlayersProps) => {
  const { t } = useTranslation()
  const me = usePlayerId<NobleColor>()!
  const rules = useRules<CitesRoyalesRules>()!
  const rule = new SetupDraftRule(rules.game)
  const player = usePlayerName(players[0])
  const cards = rule.cardsToGive - rule.getNumberOfCardsReceivedFromMe(players[0], me)
  return <>{t('header.setup-draft.you.1', { player, cards })}</>
}

const SetupDraftHeaderPlayer = ({ player }: { player: NobleColor }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  const rules = useRules<CitesRoyalesRules>()!
  const rule = new SetupDraftRule(rules.game)
  const neighbors = rule.getNeighborsToGiveCard(player)
  const neighbor = usePlayerName(neighbors[0])
  const me = usePlayerId<NobleColor>()!
  if (neighbors.length === 2) {
    return <>{t('header.setup-draft.player.2', { player: playerName })}</>
  } else {
    const cards = rule.cardsToGive - rule.getNumberOfCardsReceivedFromMe(neighbors[0], player)
    if (me === neighbors[0]) {
      return <>{t('header.setup-draft.player.you', { player: playerName, cards })}</>
    } else {
      return <>{t('header.setup-draft.player.1', { player: playerName, neighbor, cards })}</>
    }
  }
}
