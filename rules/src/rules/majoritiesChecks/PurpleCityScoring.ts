import { sumBy } from 'lodash'
import { City } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity, getSubjectType, Subject, SubjectType } from '../../material/Subject'
import { NobleColor } from '../../NobleColor'
import { CityScoring } from './CityScoring'
import { RuleId } from '../RuleId'

export class PurpleCityScoring extends CityScoring {
  city = City.Purple

  getPlayerVictoryPoints(player: NobleColor) {
    const subjectTypes = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)
      .id<Subject>(id => getSubjectCity(id) === City.Purple)
      .sort(item => -item.location.x!).getItems<Subject>().map(card => getSubjectType(card.id))

    return (this.hasTopCrown(subjectTypes[0]) ? 1 : 0)
      + sumBy(subjectTypes, subjectType => this.hasBottomCrown(subjectType) ? 1 : 0)
  }

  goToNextRule() {
    return this.startRule(RuleId.YellowMajority)
  }

  hasTopCrown(type:SubjectType):boolean {
    return type === SubjectType.Villager || type === SubjectType.Knight || type === SubjectType.Astrologer
  }

  hasBottomCrown(type:SubjectType):boolean {
    return type === SubjectType.Emptiness ||
      type === SubjectType.Jester ||
      type === SubjectType.Assassin ||
      type === SubjectType.Merchant ||
      type === SubjectType.Knight ||
      type === SubjectType.Astrologer;
  }
}