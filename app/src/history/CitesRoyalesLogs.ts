import { css } from '@emotion/react'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import { Memory } from '@gamepark/cites-royales/rules/Memory'
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'
import { linkButtonCss, LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isStartPlayerTurn, isStartRule, MaterialMove } from '@gamepark/rules-api'
import { MarketDrawAddCardLog } from './entry/add-card-in-market/MarketDrawAddCardLog'
import { MarketDrawBoughtLog } from './entry/add-card-in-market/MarketDrawBoughtLog'
import { MarketDrawNoRevoltLog } from './entry/add-card-in-market/MarketDrawNoRevoltLog'
import { MarketDrawRevoltLog } from './entry/add-card-in-market/MarketDrawRevoltLog'
import { MarketDrawUseHeroLog } from './entry/add-card-in-market/MarketDrawUseHeroLog'
import { CatchupHistory } from './entry/CatchupHistory'
import { CitiesConstructionHistory } from './entry/CitiesConstructionHistory'
import { CityScoringHistory } from './entry/CityScoringHistory'
import { EndOfGameHeroLog } from './entry/end/EndOfGameHeroLog'
import { MarketBuyHistory } from './entry/MarketBuyHistory'
import { PlayAssassinHistory } from './entry/PlayAssassinHistory'
import { PlayAstrologerHistory } from './entry/PlayAstrologerHistory'
import { getPlayerColor, PlayCardHistory } from './entry/PlayCardHistory'
import { PlayEmptinessHistory } from './entry/PlayEmptinessHistory'
import { PlayJesterHistory } from './entry/PlayJesterHistory'
import { PlayKnightHistory } from './entry/PlayKnightHistory'
import { PlayMerchantHistory } from './entry/PlayMerchantHistory'
import { PlayVillagerHistory } from './entry/PlayVillagerHistory'
import { SeasonEndHistory } from './entry/SeasonEndHistory'

export class CitesRoyalesLogs implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext): MovePlayedLogDescription | undefined {
    const game = context.game
    const actionPlayer = context.action.playerId
    const color = getPlayerColor(actionPlayer)

    if (game.rule?.id === RuleId.PlayEmptiness && isMoveItemType(MaterialType.SubjectCard)(move)) {
      return {
        Component: PlayEmptinessHistory,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }

    if (game.rule?.id === RuleId.PlayVillager && isMoveItemType(MaterialType.SubjectCard)(move)) {
      return {
        Component: PlayVillagerHistory,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }

    if (game.rule?.id === RuleId.PlayJester && isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerHand) {
      return {
        Component: PlayJesterHistory,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }

    if (game.rule?.id === RuleId.PlayAssassin && isMoveItemType(MaterialType.SubjectCard)(move)) {
      return {
        Component: PlayAssassinHistory,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }

    if (game.rule?.id === RuleId.PlayMerchant && isMoveItemType(MaterialType.SubjectCard)(move)) {
      return {
        Component: PlayMerchantHistory,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }

    if (game.rule?.id === RuleId.PlayKnight && isMoveItemType(MaterialType.SubjectCard)(move)) {
      return {
        Component: PlayKnightHistory,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }
    if (game.rule?.id === RuleId.PlayAstrologer) {
      return this.getPlayAstrologerLog(move, context)
    }

    if (game.rule?.id === RuleId.PlayCard && isMoveItemType(MaterialType.SubjectCard)(move)) {
      return {
        Component: PlayCardHistory,
        player: actionPlayer,
        css: withBackgroundColor(color)
      }
    }

    if (game.rule?.id === RuleId.MarketBuy) {
      return this.getMarketBuyLog(move, context)
    }

    if (game.rule?.id === RuleId.AddCardInMarket) {
      return this.getAddCardInMarketLog(move, context)
    }

    if (game.rule?.id === RuleId.CitiesConstruction && isStartPlayerTurn(move)) {
      return {
        Component: CitiesConstructionHistory,
        css: withBackgroundColor(color)
      }
    }

    if (game.rule && isCityScoringRule(game.rule.id)) {
      return this.getScoringLog(move, context)
    }

    if (game.rule?.id === RuleId.CatchupBonus) {
      return this.getCatchUpBonusLog(move, context)
    }

    if (game.rule?.id === RuleId.EndSeason && isStartRule(move)) {
      return {
        Component: SeasonEndHistory,
        css: withBackgroundColor('transparent', '#002448')
      }
    }

    if (game.rule?.id === RuleId.EndGame) {
      return this.getEndGameLog(move, context)
    }

    return
  }

  getAddCardInMarketLog(move: MaterialMove, context: MoveComponentContext) {
    const actionPlayer = context.action.playerId
    const rules = new CitesRoyalesRules(context.game)
    const isRevolt = rules.remind(Memory.Revolution)
    const color = getPlayerColor(actionPlayer)

    if (isMoveItemType(MaterialType.HeroCard)(move)) {
      return {
        Component: MarketDrawUseHeroLog,
        player: actionPlayer,
        css: withBackgroundColor(color)
      }
    } else if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      return {
        Component: MarketDrawAddCardLog,
        player: actionPlayer,
        css: withBackgroundColor(color)
      }
    } else if (isStartRule(move)) {
      if (isRevolt) {
        const playerHasAlreadyBought = rules.material(MaterialType.MarketToken)
          .id(actionPlayer)
          .location(location => location.type === LocationType.OnSeasonCards).length > 0

        if (playerHasAlreadyBought) {
          return {
            Component: MarketDrawBoughtLog,
            player: actionPlayer,
            css: withBackgroundColor(color),
            depth: 1
          }
        } else {
          return {
            Component: MarketDrawRevoltLog,
            player: actionPlayer,
            css: withBackgroundColor(color),
            depth: 1
          }
        }
      }
    } else if (isMoveItemType(MaterialType.NobleToken)(move) && move.location.type === LocationType.VictoryPointsSpace && !isRevolt) {
      return {
        Component: MarketDrawNoRevoltLog,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }

    return
  }

  private getCatchUpBonusLog(move: MaterialMove, context: MoveComponentContext) {
    const cardsDrawn = context.action.consequences.filter(consequence => consequence.location?.type === LocationType.PlayerHand).length
    if (isStartPlayerTurn(move) && cardsDrawn > 0) {
      return { Component: CatchupHistory }
    }

    return
  }

  private getMarketBuyLog(move: MaterialMove, context: MoveComponentContext) {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      const actionPlayer = context.action.playerId
      return {
        Component: MarketBuyHistory,
        player: actionPlayer,
        css: withBackgroundColor(getPlayerColor(actionPlayer))
      }
    }

    return
  }

  private getPlayAstrologerLog(move: MaterialMove, context: MoveComponentContext) {
    const cardsInActionHand = new CitesRoyalesRules(context.game).material(MaterialType.SubjectCard).location(LocationType.ActionHand).length === 0
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Discard && cardsInActionHand) {
      const actionPlayer = context.action.playerId
      const color = getPlayerColor(actionPlayer)

      return {
        Component: PlayAstrologerHistory,
        player: actionPlayer,
        css: withBackgroundColor(color),
        depth: 1
      }
    }

    return
  }

  private getEndGameLog(move: MaterialMove, context: MoveComponentContext) {
    const actionPlayer = context.action.playerId
    const color = getPlayerColor(actionPlayer)
    if (isMoveItemType(MaterialType.NobleToken)(move)) {
      return {
        Component: EndOfGameHeroLog,
        player: actionPlayer,
        css: withBackgroundColor(color)
      }
    }

    return
  }

  private getScoringLog(move: MaterialMove, context: MoveComponentContext) {
    if (isMoveItemType(MaterialType.NobleToken)(move)) {
      const rules = new CitesRoyalesRules(context.game)
      const nobleTokenPlayer = rules.material(MaterialType.NobleToken).index(move.itemIndex).getItem()?.id
      const color = getPlayerColor(nobleTokenPlayer)
      return {
        Component: CityScoringHistory,
        player: nobleTokenPlayer,
        css: withBackgroundColor(color)
      }
    }

    return
  }
}

function isCityScoringRule(rule: RuleId): boolean {
  return rule >= RuleId.PurpleMajority && rule <= RuleId.GreenMajority
}

const withBackgroundColor = (bgColor: string = 'initial', color: string = 'black') => css`
    color: ${color};
    background-color: ${bgColor};
`

export const rulesLinkButton = [linkButtonCss, css`
    color: inherit;
    background-color: transparent;
    font-style: italic;
`]
