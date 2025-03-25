import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CitesRoyalesTutorialSetup } from './CitesRoyalesTutorialSetup'
import { Trans } from 'react-i18next'
import { Subject } from '@gamepark/cites-royales/material/Subject'
import { isCustomMove, isCustomMoveType, isMoveItemType, isStartRule } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import { MarketHalfSizedCard } from '@gamepark/cites-royales/material/MarketHalfSizedCard'
import { victoryPointsTrackDescription } from '../material/VictoryPointsTrackDescription'
import { City } from '@gamepark/cites-royales/material/City'

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
        },
        interrupt: (move) => isMoveItemType(MaterialType.SubjectCard)(move),
      }
    },
    {
      popup: {
        text:() => <Trans defaults="tuto.add-card" components={{ bold: <strong/> }} />
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.add-card.risk" components={{ bold: <strong/> }} />
      },
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent-turn" />
      },
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move) => {
          return isStartRule(move)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.add-card" />,
        position: {y: 12}
      },
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move) => {
          return isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)(move)
        },
        interrupt: (move) => isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Discard,
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.revolt" />,
        position: {y: 18}
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.discard-cards" />,
        position: {y: 25}
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.Market)
          .id<Subject>(id => [Subject.YellowEmptiness, Subject.YellowMerchant].includes(id))],
        scale:0.30,
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.give-points-revolt" />,
        position: {x: 30}
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.MarketHalfSizedCard).id(id => id === MarketHalfSizedCard.row3),
          this.material(game, MaterialType.NobleToken).id(NobleColor.Brown)
        ],
        scale:0.5,
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.score-board" />,
        position: {x:15}
      },
      focus: (game, context) => ({
        staticItems: {
          [MaterialType.VictoryPointsTrack]: victoryPointsTrackDescription.getStaticItems(context),
        },
        materials: [this.material(game, MaterialType.NobleToken)],
        scale:0.5
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.buy-cards" components={{ bold: <strong /> }} />,
        position: {y:25}
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.SubjectCard).id<Subject>(id => [Subject.GreenKnight, Subject.PinkAssassin].includes(id))],
        scale:0.35
      }),
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id === Subject.GreenKnight
        }
      }
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id === Subject.PinkAssassin
        }
      }
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move) => {
          return isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)(move)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play-jester" />,
      },
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id === Subject.BlueJester
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.still-play" components={{ bold:<strong/> }}/>,
      },
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move) => {
          return isStartRule(move)
        }
      }
    },
    {
      move: {
        player: NobleColor.Black,
        filter: (move) => {
          return isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)(move)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play-card.pass" components={{ bold:<strong/> }} />,
      },
      move: {
        filter: (move) => {
          return isStartRule(move)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buy-cards.buy" />,
        position:{x:-10, y:10}
      },
      focus: (game, _context) => ({
        materials: [this.material(game, MaterialType.SubjectCard).location(LocationType.Market).id<Subject>(id => [Subject.GreenAssassin, Subject.PinkMerchant, Subject.BlueVillager].includes(id))],
        scale: 0.20
      }),
      move:{
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerHand && [Subject.GreenAssassin, Subject.PinkMerchant, Subject.BlueVillager].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move:{
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerHand && [Subject.GreenAssassin, Subject.PinkMerchant, Subject.BlueVillager].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move:{
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerHand && [Subject.GreenAssassin, Subject.PinkMerchant, Subject.BlueVillager].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        filter: (move) => {
          return isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)(move)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.build.start" components={{ bold: <strong/> }}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.build.details" components={{ bold: <strong/> }}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.build.play" />
      },
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.PinkMerchant].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.WhiteAstrologer].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.GreenEmptiness].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.GreenAssassin].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.BlueVillager].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.build.confirm" components={{ bold: <strong/> }} />
      },
      move: {
        filter: (move, _game) => {
          return isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)(move)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.build.reveal" />
      }
    },
    {
      move: {
        player:NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.RedEmptiness, Subject.BlueKnight, Subject.GreenKnight, Subject.PinkAssassin].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        player:NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.RedEmptiness, Subject.BlueKnight, Subject.GreenKnight, Subject.PinkAssassin].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        player:NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.RedEmptiness, Subject.BlueKnight, Subject.GreenKnight, Subject.PinkAssassin].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        }
      }
    },
    {
      move: {
        player:NobleColor.Black,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity && [Subject.RedEmptiness, Subject.BlueKnight, Subject.GreenKnight, Subject.PinkAssassin].includes(this.material(game, MaterialType.SubjectCard).getItem(move.itemIndex).id)
        },
      }
    },
    {
      move: {
        player:NobleColor.Black,
        filter: (move) => {
          return isCustomMove(move) && isCustomMoveType(CustomMoveType.Pass)(move)

        },
        interrupt: (move) => isMoveItemType(MaterialType.NobleToken)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.start" components={{ italic: <i/> }}/>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.details" components={{ bold: <strong/> }}/>
      },
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.NobleToken)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.purple" components={{ bold: <strong/> }}/>
      },
      focus: (game, _context) => ({
        materials: [this.material(game, MaterialType.SubjectCard).player(NobleColor.Brown).location(location => location.type === LocationType.InCity && location.id === City.Purple)],
        scale:0.25
      }),
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.NobleToken)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.yellow"  components={{ bold: <strong/> }}/>
      },
      focus: (game, _context) => ({
        materials: [this.material(game, MaterialType.SubjectCard).player(NobleColor.Black).location(location => location.type === LocationType.InCity && location.id === City.Yellow)],
        scale:0.25
      }),
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.NobleToken)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.pink"  components={{ bold: <strong/> }}/>
      },
      focus: (game, _context) => ({
        materials: [this.material(game, MaterialType.SubjectCard).player(NobleColor.Brown).location(location => location.type === LocationType.InCity && location.id === City.Pink)],
        scale:0.25
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.red"  components={{ bold: <strong/> }}/>
      },
      focus: (game, _context) => ({
        materials: [this.material(game, MaterialType.SubjectCard).player(NobleColor.Black).location(location => location.type === LocationType.InCity && location.id === City.Red)],
        scale:0.25
      }),
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.NobleToken)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.blue"  components={{ bold: <strong/> }}/>
      },
      focus: (game, _context) => ({
        materials: [this.material(game, MaterialType.SubjectCard).player(NobleColor.Black).location(location => location.type === LocationType.InCity && location.id === City.Blue)],
        scale:0.25
      }),
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.SeasonCard)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.majorities.green"  components={{ bold: <strong/> }}/>
      },
      focus: (game, _context) => ({
        materials: [this.material(game, MaterialType.SubjectCard).player(NobleColor.Black).location(location => location.type === LocationType.InCity && location.id === City.Green)],
        scale:0.25
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.history" />
      },
      move:{}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.catchup" />,
        position: {x:15}
      },
      focus: (_game, context) => ({
        staticItems: {
          [MaterialType.VictoryPointsTrack]: victoryPointsTrackDescription.getStaticItems(context),
        },
        scale:0.5
      }),
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hero" components={{ bold: <strong/> }}/>
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.HeroCard).id(NobleColor.Black)]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.end" />
      },
    }
  ]
}