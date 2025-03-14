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
    this.setupDrawPile()
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

  setupMarket() {
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.YellowEmptiness).moveItem({type:LocationType.Market})
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.GreenKnight).moveItem({type:LocationType.Market})
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.PinkAssassin).moveItem({type:LocationType.Market})
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.BlueVillager).moveItem({type:LocationType.Market})

    this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck().shuffle()


    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.PinkMerchant).moveItem({type:LocationType.DrawPile})
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.GreenAssassin).moveItem({type:LocationType.DrawPile})
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.GreenEmptiness).moveItem({type:LocationType.DrawPile})
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.YellowJester).moveItem({type:LocationType.DrawPile})
    this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).id(Subject.YellowMerchant).moveItem({type:LocationType.DrawPile})
  }

  private setupDrawPile(): void {
    this.material(MaterialType.SubjectCard).id(Subject.YellowMerchant).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.YellowJester).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})

    this.material(MaterialType.SubjectCard).id(Subject.YellowEmptiness).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.GreenKnight).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.PinkAssassin).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.BlueVillager).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})


    this.material(MaterialType.SubjectCard).id(Subject.GreenEmptiness).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.GreenAssassin).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})
    this.material(MaterialType.SubjectCard).id(Subject.PinkMerchant).moveItem({type:LocationType.ActionHand, player:NobleColor.Brown})
  }


  deal3CardsToPlayers() {
    return
  }
}