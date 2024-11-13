import { getEnumValues } from "@gamepark/rules-api";

export enum MarketHalfSizedCard {
  row1,
  row2,
  row3,
  row4,
  row5,
}

export const marketHalfSizedCards = getEnumValues(MarketHalfSizedCard);
