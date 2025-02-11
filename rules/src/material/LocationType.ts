export enum LocationType {
  VictoryPointsTrackSpot = 1,
  SeasonsCardsStack,
  DrawPile, // of Subject cards
  Discard, // of Subject cards
  Reserve, // of Subject cards
  Market, // of Subject cards
  MarketLineBeginning, // for Market half-sized cards
  VictoryPointsSpace, // on the track
  MarketTokenSpot, // in front of a player
  OnSeasonCards, // used Market tokens
  CityBoardSpot,
  HeroSpot,
  PlayerHand,
  PlayerArea, // For cards face-down in front of a player waiting to be revealed
  ActionHand,
  InCity, // Built cards
}
