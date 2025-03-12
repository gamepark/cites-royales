import { CitesRoyalesSetup } from '@gamepark/cites-royales/CitesRoyalesSetup'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { isEmptiness, isWhite, Subject, subjects } from '@gamepark/cites-royales/material/Subject'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'

export class CitesRoyalesTutorialSetup extends CitesRoyalesSetup {
  setupSubjectCards() {
    this.material(MaterialType.SubjectCard).createItems(
      subjects
        .concat(subjects.filter((s) => !isWhite(s) && !isEmptiness(s)))
        .map((subject) => ({ id: subject, location: { type: LocationType.DrawPile } }))
    )
    this.setupPlayerHand()
    this.setupOpponentHand()
    this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).shuffle()
  }

  private setupPlayerHand(): void {
    this.material(MaterialType.SubjectCard).id(Subject.PurpleVillager).moveItem({type:LocationType.PlayerHand, player: NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.BlueKnight).moveItem({type:LocationType.PlayerHand, player: NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.YellowAssassin).moveItem({type:LocationType.PlayerHand, player: NobleColor.Brown})
  }

  private setupOpponentHand(): void {
    this.material(MaterialType.SubjectCard).id(Subject.BlueJester).moveItem({type:LocationType.PlayerHand, player: NobleColor.Black})
    this.material(MaterialType.SubjectCard).id(Subject.RedEmptiness).moveItem({type:LocationType.PlayerHand, player: NobleColor.Black})
    this.material(MaterialType.SubjectCard).id(Subject.WhiteAstrologer).moveItem({type:LocationType.PlayerHand, player: NobleColor.Black})
  }

  deal3CardsToPlayers() {
    return
  }
}