import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CitesRoyalesTutorialSetup } from './CitesRoyalesTutorialSetup'
import { Trans } from 'react-i18next'
import { Subject } from '@gamepark/cites-royales/material/Subject'
import { isCustomMove, isCustomMoveType, isMoveItemType, isStartRule } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'

export class CitesRoyalesTutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 1
  options = {
    players: [
      {id: NobleColor.Brown},
      {id: NobleColor.Black}
    ]
  }
  players = [
    {id: NobleColor.Brown},
    {id: NobleColor.Black}
  ]
  setup = new CitesRoyalesTutorialSetup()
  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={{ bold: <strong /> }} />,
      },
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.goal" />,
      },
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.city-board" components={{ bold: <strong/> }}/>,
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.CityBoard).id(NobleColor.Brown)],
        scale:0.75
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.subject-cards" components={{ bold: <strong/> }} />,
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.PlayerHand).player(NobleColor.Brown)],
        scale:0.35
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.give-cards" components={{ bold: <strong/> }} />,
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.PlayerHand).id(id => id !== Subject.PurpleVillager).player(NobleColor.Brown)],
        scale:0.25
      }),
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && [Subject.BlueKnight, Subject.YellowAssassin].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && [Subject.BlueKnight, Subject.YellowAssassin].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && [Subject.BlueJester, Subject.WhiteAstrologer].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && [Subject.BlueJester, Subject.WhiteAstrologer].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.setup-build.players" />
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.PlayerHand).player(NobleColor.Brown)],
        scale:0.35
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.setup-build.build" />
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.PlayerHand).player(NobleColor.Brown).id(Subject.PurpleVillager)],
        scale:0.35
      }),
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id === Subject.PurpleVillager
        }
      }
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id === Subject.YellowAssassin
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.setup-build.first-player" />,
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.InCity)],
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.seasons" components={{ bold:<strong/> }}/>,
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SeasonCard)],
        scale:0.25
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play-card.details" components={{ bold:<strong/> }} />,
      },
      move: {
        filter: (move) => {
          return isStartRule(move)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buy-cards.details"  components={{ bold:<strong/> }} />,
        position:{x:-10,y:30}
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.Market)],
        scale:0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buy-cards.purchasing-power" components={{ bold:<strong/>, italic: <i/> }} />,
        position:{x:-10,y:20}
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.Market)],
        scale:0.30
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buy-cards.pass" components={{ bold: <strong/> }} />,
        position:{y:15}
      },
      move: {
        filter: (move) => {
          return isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)(move)
        }
      }
    }
  ]
}