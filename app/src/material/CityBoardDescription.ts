/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { BoardDescription } from '@gamepark/react-game'
import BeigeCity from '../images/boards/BeigeCity.jpg'
import BlackCity from '../images/boards/BlackCity.jpg'
import BrownCity from '../images/boards/BrownCity.jpg'
import CyanCity from '../images/boards/CyanCity.jpg'
import { CityBoardHelp } from './help/CityBoardHelp'

class CityBoardDescription extends BoardDescription {
  height = 3.2
  width = 44.4
  images = {
    [NobleColor.Brown]: BrownCity,
    [NobleColor.Cyan]: CyanCity,
    [NobleColor.Black]: BlackCity,
    [NobleColor.Beige]: BeigeCity,
  }

  help= CityBoardHelp

  getHelpDisplayExtraCss = () => css`display: none;`
}

export const cityBoardDescription = new CityBoardDescription()
