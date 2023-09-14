export interface Race {
  name: string;
  bonuses?: bonusType[];
  children?: subRace[];
  isFinal?: boolean;
}

export enum bonusType {
  playerChoice="playerChoice",
  Str = "Str",
  Dex = "Dex",
  Con = "Con",
  Int = "Int",
  Wis = "Wis",
  Cha = "Cha"
}

export interface subRace {
  name: string;
  bonuses?: bonusType[];
}
