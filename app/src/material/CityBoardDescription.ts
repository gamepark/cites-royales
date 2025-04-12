/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import BeigeCity from '../images/boards/BeigeCity.jpg'
import BlackCity from '../images/boards/BlackCity.jpg'
import BrownCity from '../images/boards/BrownCity.jpg'
import CyanCity from '../images/boards/CyanCity.jpg'
import { CityBoardHelp } from './help/CityBoardHelp'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { cities } from '@gamepark/cites-royales/material/City'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'

class CityBoardDescription extends BoardDescription {
  height = 3.2
  width = 44.4
  images = {
    [NobleColor.Brown]: BrownCity,
    [NobleColor.Cyan]: CyanCity,
    [NobleColor.Black]: BlackCity,
    [NobleColor.Beige]: BeigeCity,
  }

  getStaticItems(context: MaterialContext){
    return context.rules.players.map(player => this.getPlayerBoard(player))
  }

  getPlayerBoard(player: NobleColor) {
    return {id:player, location:{type:LocationType.CityBoardSpot, player}}
  }

  getLocations(item: MaterialItem, context:MaterialContext) {
    if(!context.rules.game.rule || context.rules.game.rule.id >= RuleId.PurpleMajority) {
      return cities.map<Location>(city => ({type:LocationType.CityBoardCountSpot, id:city, player:item.id}))
    }
    return []
  }

  help= CityBoardHelp

  getHelpDisplayExtraCss = () => css`display: none;`
}

export const cityBoardDescription = new CityBoardDescription()
