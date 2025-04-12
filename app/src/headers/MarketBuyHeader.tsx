import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import {
  PlayMoveButton,
  UndoMovesButton,
  useLegalMove,
  usePlayerId,
  usePlayerName,
  useRules
} from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { MarketBuyRule } from '@gamepark/cites-royales/rules/MarketBuyRule'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'

export const MarketBuyHeader = () => {
  const me = usePlayerId<NobleColor>();
  const rules = useRules<CitesRoyalesRules>()!;
  const rule = new MarketBuyRule(rules.game);
  const purchasingPower = rule.getPurchasingPower();
  const playerCanBuy = rule.cardsPlayerCanBuy;
  const isRevolt = rule.isRevolt;
  const activePlayer = rules.getActivePlayer();
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass));
  const marketCards = rules.material(MaterialType.SubjectCard).location(LocationType.Market);
  const notEnoughCardsInMarket = marketCards.length < 4;
  const hasBought = rule.hasBought
  const player = usePlayerName(activePlayer);


  const isActivePlayer = me === activePlayer;

  // TODO : Header Trop long voir avec Romain
  if (notEnoughCardsInMarket && !playerCanBuy) {
    return (
      <Trans
        defaults={isActivePlayer ? "header.market-buy.cannot.you" : "header.market-buy.cannot.player"}
        values={{ player }}
        components={{ pass: <PlayMoveButton move={pass} /> }}
      />
    )
  }

  if (isActivePlayer) {
    if (playerCanBuy) {
      if(isRevolt) {
        return (
          <Trans
          defaults={hasBought ? "header.revolt.you.has-bought" : "header.revolt.you"}
          values={{ value: purchasingPower }}
          components={hasBought ? { pass: <PlayMoveButton move={pass} /> } : {}}
          />
        )
      } else {
        return (
          <Trans
            defaults={"header.market-buy.you"}
            values={{ value: purchasingPower }}
            components={{ pass: <PlayMoveButton move={pass} /> }}
          />
        )
      }
    } else {
      return (
        <Trans
          defaults="header.market-buy.validate"
          components={{
            validate: <PlayMoveButton move={pass} />,
            undo: <UndoMovesButton moves={1} />,
          }}
        />
      )
    }
  }

  return (
    <Trans
      defaults={isRevolt ? "header.revolt.player" : "header.market-buy.player"}
      values={{ player, value: purchasingPower }}
    />
  )
}

