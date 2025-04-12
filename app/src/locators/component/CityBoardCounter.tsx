import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { Picture, useRules } from '@gamepark/react-game'
import { Location, MaterialGame } from '@gamepark/rules-api'
import { css } from '@emotion/react'
import Laurier from '../../images/panels/Laurier.png'
import { City } from '@gamepark/cites-royales/material/City'
import { PurpleCityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/PurpleCityScoring'
import { YellowCityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/YellowCityScoring'
import { GreenCityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/GreenCityScoring'
import { PinkCityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/PinkCityScoring'
import { RedCityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/RedCityScoring'
import { BlueCityScoring } from '@gamepark/cites-royales/rules/majoritiesChecks/BlueCityScoring'

export const CityBoardCounter = ({ location }: { location: Location }) => {
  const rules = useRules<CitesRoyalesRules>()!

  const CityScoring = getCityScoring(location.id, rules.game)

  const count = CityScoring.getMajorityWinners().includes(location.player!) ? CityScoring.getPlayerVictoryPoints(location.player!) : 0

  if (count === 0) return null
  return <span css={spanCss}>
    <Picture css={pictureCss} src={Laurier} />
    <span >{count}</span>
  </span>
}

const spanCss = css(`
  filter: drop-shadow(0.1em 0.1em black);`
)

const pictureCss = css(`
  position:absolute;
  top:14px;
  left:30.5%;
`)

function getCityScoring(city:City, game:MaterialGame) {
  switch(city) {
    case City.Purple:
      return new PurpleCityScoring(game)
    case City.Yellow:
      return new YellowCityScoring(game)
    case City.Pink:
      return new PinkCityScoring(game)
    case City.Red:
      return new RedCityScoring(game)
    case City.Blue:
      return new BlueCityScoring(game)
    case City.Green:
      return new GreenCityScoring(game)
  }
}