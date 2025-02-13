import { Subject } from "@gamepark/cites-royales/material/Subject";
import { CardDescription } from "@gamepark/react-game";
import BlueAssassin from "../images/cards/subjects/BlueAssassin.jpg";
import BlueAstrologer from "../images/cards/subjects/BlueAstrologer.jpg";
import BlueEmptiness from "../images/cards/subjects/BlueEmptiness.jpg";
import BlueJester from "../images/cards/subjects/BlueJester.jpg";
import BlueKnight from "../images/cards/subjects/BlueKnight.jpg";
import BlueMerchant from "../images/cards/subjects/BlueMerchant.jpg";
import BlueVillager from "../images/cards/subjects/BlueVillager.jpg";
import GreenAssassin from "../images/cards/subjects/GreenAssassin.jpg";
import GreenAstrologer from "../images/cards/subjects/GreenAstrologer.jpg";
import GreenEmptiness from "../images/cards/subjects/GreenEmptiness.jpg";
import GreenJester from "../images/cards/subjects/GreenJester.jpg";
import GreenKnight from "../images/cards/subjects/GreenKnight.jpg";
import GreenMerchant from "../images/cards/subjects/GreenMerchant.jpg";
import GreenVillager from "../images/cards/subjects/GreenVillager.jpg";
import PinkAssassin from "../images/cards/subjects/PinkAssassin.jpg";
import PinkAstrologer from "../images/cards/subjects/PinkAstrologer.jpg";
import PinkEmptiness from "../images/cards/subjects/PinkEmptiness.jpg";
import PinkJester from "../images/cards/subjects/PinkJester.jpg";
import PinkKnight from "../images/cards/subjects/PinkKnight.jpg";
import PinkMerchant from "../images/cards/subjects/PinkMerchant.jpg";
import PinkVillager from "../images/cards/subjects/PinkVillager.jpg";
import PurpleAssassin from "../images/cards/subjects/PurpleAssassin.jpg";
import PurpleAstrologer from "../images/cards/subjects/PurpleAstrologer.jpg";
import PurpleEmptiness from "../images/cards/subjects/PurpleEmptiness.jpg";
import PurpleJester from "../images/cards/subjects/PurpleJester.jpg";
import PurpleKnight from "../images/cards/subjects/PurpleKnight.jpg";
import PurpleMerchant from "../images/cards/subjects/PurpleMerchant.jpg";
import PurpleVillager from "../images/cards/subjects/PurpleVillager.jpg";
import RedAssassin from "../images/cards/subjects/RedAssassin.jpg";
import RedAstrologer from "../images/cards/subjects/RedAstrologer.jpg";
import RedEmptiness from "../images/cards/subjects/RedEmptiness.jpg";
import RedJester from "../images/cards/subjects/RedJester.jpg";
import RedKnight from "../images/cards/subjects/RedKnight.jpg";
import RedMerchant from "../images/cards/subjects/RedMerchant.jpg";
import RedVillager from "../images/cards/subjects/RedVillager.jpg";
import WhiteAssassin from "../images/cards/subjects/WhiteAssassin.jpg";
import WhiteAstrologer from "../images/cards/subjects/WhiteAstrologer.jpg";
import WhiteEmptiness from "../images/cards/subjects/WhiteEmptiness.jpg";
import WhiteJester from "../images/cards/subjects/WhiteJester.jpg";
import WhiteKnight from "../images/cards/subjects/WhiteKnight.jpg";
import WhiteMerchant from "../images/cards/subjects/WhiteMerchant.jpg";
import WhiteVillager from "../images/cards/subjects/WhiteVillager.jpg";
import YellowAssassin from "../images/cards/subjects/YellowAssassin.jpg";
import YellowAstrologer from "../images/cards/subjects/YellowAstrologer.jpg";
import YellowEmptiness from "../images/cards/subjects/YellowEmptiness.jpg";
import YellowJester from "../images/cards/subjects/YellowJester.jpg";
import YellowKnight from "../images/cards/subjects/YellowKnight.jpg";
import YellowMerchant from "../images/cards/subjects/YellowMerchant.jpg";
import YellowVillager from "../images/cards/subjects/YellowVillager.jpg";

import Back from "../images/cards/subjects/SubjectCardBack.jpg";
import { SubjectCardHelp } from './help/SubjectCardHelp'

class SubjectCardDescription extends CardDescription {
  backImage = Back;

  images = {
    [Subject.PurpleEmptiness]: PurpleEmptiness,
    [Subject.PurpleVillager]: PurpleVillager,
    [Subject.PurpleJester]: PurpleJester,
    [Subject.PurpleAssassin]: PurpleAssassin,
    [Subject.PurpleMerchant]: PurpleMerchant,
    [Subject.PurpleKnight]: PurpleKnight,
    [Subject.PurpleAstrologer]: PurpleAstrologer,
    [Subject.YellowEmptiness]: YellowEmptiness,
    [Subject.YellowVillager]: YellowVillager,
    [Subject.YellowJester]: YellowJester,
    [Subject.YellowAssassin]: YellowAssassin,
    [Subject.YellowMerchant]: YellowMerchant,
    [Subject.YellowKnight]: YellowKnight,
    [Subject.YellowAstrologer]: YellowAstrologer,
    [Subject.PinkEmptiness]: PinkEmptiness,
    [Subject.PinkVillager]: PinkVillager,
    [Subject.PinkJester]: PinkJester,
    [Subject.PinkAssassin]: PinkAssassin,
    [Subject.PinkMerchant]: PinkMerchant,
    [Subject.PinkKnight]: PinkKnight,
    [Subject.PinkAstrologer]: PinkAstrologer,
    [Subject.BlueEmptiness]: BlueEmptiness,
    [Subject.BlueVillager]: BlueVillager,
    [Subject.BlueJester]: BlueJester,
    [Subject.BlueAssassin]: BlueAssassin,
    [Subject.BlueMerchant]: BlueMerchant,
    [Subject.BlueKnight]: BlueKnight,
    [Subject.BlueAstrologer]: BlueAstrologer,
    [Subject.RedEmptiness]: RedEmptiness,
    [Subject.RedVillager]: RedVillager,
    [Subject.RedJester]: RedJester,
    [Subject.RedAssassin]: RedAssassin,
    [Subject.RedMerchant]: RedMerchant,
    [Subject.RedKnight]: RedKnight,
    [Subject.RedAstrologer]: RedAstrologer,
    [Subject.GreenEmptiness]: GreenEmptiness,
    [Subject.GreenVillager]: GreenVillager,
    [Subject.GreenJester]: GreenJester,
    [Subject.GreenAssassin]: GreenAssassin,
    [Subject.GreenMerchant]: GreenMerchant,
    [Subject.GreenKnight]: GreenKnight,
    [Subject.GreenAstrologer]: GreenAstrologer,
    [Subject.WhiteEmptiness]: WhiteEmptiness,
    [Subject.WhiteVillager]: WhiteVillager,
    [Subject.WhiteJester]: WhiteJester,
    [Subject.WhiteAssassin]: WhiteAssassin,
    [Subject.WhiteMerchant]: WhiteMerchant,
    [Subject.WhiteKnight]: WhiteKnight,
    [Subject.WhiteAstrologer]: WhiteAstrologer,
  };

  help = SubjectCardHelp
}

export const subjectCardDescription = new SubjectCardDescription();
