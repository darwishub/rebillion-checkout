export type IconsId =
  | "angle-down"
  | "angle-left"
  | "angle-right"
  | "arrow-left"
  | "arrow-right"
  | "credit-card"
  | "envelope"
  | "home-location"
  | "location-alt"
  | "lock"
  | "minus"
  | "plus"
  | "user";

export type IconsKey =
  | "AngleDown"
  | "AngleLeft"
  | "AngleRight"
  | "ArrowLeft"
  | "ArrowRight"
  | "CreditCard"
  | "Envelope"
  | "HomeLocation"
  | "LocationAlt"
  | "Lock"
  | "Minus"
  | "Plus"
  | "User";

export enum Icons {
  AngleDown = "angle-down",
  AngleLeft = "angle-left",
  AngleRight = "angle-right",
  ArrowLeft = "arrow-left",
  ArrowRight = "arrow-right",
  CreditCard = "credit-card",
  Envelope = "envelope",
  HomeLocation = "home-location",
  LocationAlt = "location-alt",
  Lock = "lock",
  Minus = "minus",
  Plus = "plus",
  User = "user",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.AngleDown]: "61697",
  [Icons.AngleLeft]: "61698",
  [Icons.AngleRight]: "61699",
  [Icons.ArrowLeft]: "61700",
  [Icons.ArrowRight]: "61701",
  [Icons.CreditCard]: "61702",
  [Icons.Envelope]: "61703",
  [Icons.HomeLocation]: "61704",
  [Icons.LocationAlt]: "61705",
  [Icons.Lock]: "61706",
  [Icons.Minus]: "61707",
  [Icons.Plus]: "61708",
  [Icons.User]: "61709",
};
