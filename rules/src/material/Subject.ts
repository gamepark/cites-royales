import { getEnumValues } from '@gamepark/rules-api'
import { City } from './City'
import { RuleId } from '../rules/RuleId'

export enum SubjectType {
  Emptiness,
  Villager,
  Jester,
  Assassin,
  Merchant,
  Knight,
  Astrologer,
}

export enum Subject {
  WhiteEmptiness = 0,
  WhiteVillager,
  WhiteJester,
  WhiteAssassin,
  WhiteMerchant,
  WhiteKnight,
  WhiteAstrologer,
  PurpleEmptiness = 10,
  PurpleVillager,
  PurpleJester,
  PurpleAssassin,
  PurpleMerchant,
  PurpleKnight,
  PurpleAstrologer,
  YellowEmptiness = 20,
  YellowVillager,
  YellowJester,
  YellowAssassin,
  YellowMerchant,
  YellowKnight,
  YellowAstrologer,
  PinkEmptiness = 30,
  PinkVillager,
  PinkJester,
  PinkAssassin,
  PinkMerchant,
  PinkKnight,
  PinkAstrologer,
  RedEmptiness = 40,
  RedVillager,
  RedJester,
  RedAssassin,
  RedMerchant,
  RedKnight,
  RedAstrologer,
  BlueEmptiness = 50,
  BlueVillager,
  BlueJester,
  BlueAssassin,
  BlueMerchant,
  BlueKnight,
  BlueAstrologer,
  GreenEmptiness = 60,
  GreenVillager,
  GreenJester,
  GreenAssassin,
  GreenMerchant,
  GreenKnight,
  GreenAstrologer,
}

export const subjects = getEnumValues(Subject)
export const getSubjectCity = (subject: Subject): City | undefined => Math.floor(subject / 10) || undefined
export const getSubjectType = (subject: Subject): SubjectType => subject % 10
export const isWhite = (subject: Subject) => subject < 10
export const isEmptiness = (subject: Subject) => getSubjectType(subject) === SubjectType.Emptiness

export function getSubjectRule(subject:Subject){
  switch (getSubjectType(subject)) {
    case SubjectType.Emptiness:
      return RuleId.PlayEmptiness
    case SubjectType.Villager:
      return RuleId.PlayVillager
    case SubjectType.Jester:
      return RuleId.PlayJester
    case SubjectType.Assassin:
      return RuleId.PlayAssassin
    case SubjectType.Merchant:
      return RuleId.PlayMerchant
    case SubjectType.Knight:
      return RuleId.PlayKnight
    case SubjectType.Astrologer:
      return RuleId.PlayAstrologer
  }
}