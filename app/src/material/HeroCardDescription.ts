import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CardDescription } from '@gamepark/react-game'
import BeigeHeroBack from '../images/cards/heroes/BeigeHeroBack.jpg'
import BeigeHeroFront from '../images/cards/heroes/BeigeHeroFront.jpg'
import BlackHeroBack from '../images/cards/heroes/BlackHeroBack.jpg'
import BlackHeroFront from '../images/cards/heroes/BlackHeroFront.jpg'
import BrownHeroBack from '../images/cards/heroes/BrownHeroBack.jpg'
import BrownHeroFront from '../images/cards/heroes/BrownHeroFront.jpg'
import CyanHeroBack from '../images/cards/heroes/CyanHeroBack.jpg'
import CyanHeroFront from '../images/cards/heroes/CyanHeroFront.jpg'
import { MaterialItem } from '@gamepark/rules-api'
import { HeroCardHelp } from './help/HeroCardHelp'

class HeroCardDescription extends CardDescription {
  isFlipped = (item: MaterialItem) => item.location.rotation

  backImages = {
    [NobleColor.Cyan]: CyanHeroFront,
    [NobleColor.Brown]: BrownHeroFront,
    [NobleColor.Black]: BlackHeroFront,
    [NobleColor.Beige]: BeigeHeroFront,
  }
  images = {
    [NobleColor.Cyan]: CyanHeroBack,
    [NobleColor.Brown]: BrownHeroBack,
    [NobleColor.Black]: BlackHeroBack,
    [NobleColor.Beige]: BeigeHeroBack,
  }

  help = HeroCardHelp
}

export const heroCardDescription = new HeroCardDescription()
