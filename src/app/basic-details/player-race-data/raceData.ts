import {bonusType, Race} from "./raceDataDef";

//Primary Bonus First

const Elf: Race = {
  name: 'Elf',
  children: [
    { name: 'Astral Elf'},
    { name: 'Eladrin Elf'},
  ],
  bonuses: [bonusType.playerChoice]
}

const Dragonborn: Race = {
  name: 'Dragonborn',
  children: [
    { name: 'Red Dragonborn'},
    { name: 'Gold Dragonborn'}
  ],
  bonuses: [bonusType.Str, bonusType.Cha]
}

export const RACE_DATA = new Map<string, Race>([
  ["Elf", Elf],
  ["Dragonborn", Dragonborn]
]);
