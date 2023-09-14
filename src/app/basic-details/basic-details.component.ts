import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {bonusType, Race} from "./player-race-data/raceDataDef";
import {map, Observable, startWith} from "rxjs";
import {RACE_DATA} from "./player-race-data/raceData"
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})

export class BasicDetailsComponent {

  playerSelectedBonus = false;
  selectedRace: string | null = null;
  Age: number | undefined = undefined;

  ngOnInit() {
    this.RaceOptions = this.raceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(Array.from(RACE_DATA.keys()), value || '')),
    );
  }

  valueBetweenZeroAndTwenty(control: AbstractControl) {
    const value = control.value; // Convert the control's value to a number
    if (isNaN(value) || value < 1 || value > 20) {
      return { invalidValue: true }; // Return an error object if the value is outside the valid range
    }
    return null; // Return null if the value is valid
  }

  valueIsSmallerThan1(control: AbstractControl) {
    const value = control.value; // Convert the control's value to a number
    if (isNaN(value) || value < 1) {
      return { invalidValue: true }; // Return an error object if the value is outside the valid range
    }
    return null; // Return null if the value is valid
  }

  constructor(private _formBuilder: FormBuilder) {}

  StandardArrayFormGroup = this._formBuilder.group({
    baseStr: ['', [Validators.required, this.valueBetweenZeroAndTwenty]],
    baseDex: ['', [Validators.required, this.valueBetweenZeroAndTwenty]],
    baseCon: ['', [Validators.required, this.valueBetweenZeroAndTwenty]],
    baseInt: ['', [Validators.required, this.valueBetweenZeroAndTwenty]],
    baseWis: ['', [Validators.required, this.valueBetweenZeroAndTwenty]],
    baseCha: ['', [Validators.required, this.valueBetweenZeroAndTwenty]],
  });

  BasicInformationFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    playerClass: ['', [Validators.required]],
    Age: ['', [Validators.required, this.valueIsSmallerThan1]],
    LawfulChaotic: ['', [Validators.required]],
    GoodEvil: ['', [Validators.required]],
  });

  PlayerRaceFormGroup = this._formBuilder.group({
    selectedRace: ['', Validators.required],
    selectedSubRace: ['', Validators.required],
    mainRaceBonus:['', null],
    secondaryRaceBonus:['', null],
  });

  raceControl = new FormControl('');

  RaceOptions!: Observable<string[]>;
  SubRaceOptions: Race | undefined;

  strength: number = 0;
  dexterity: number = 0;
  constitution: number = 0;
  intelligence: number = 0;
  wisdom: number = 0;
  charisma: number = 0;

  playerSubRace: string = "";
  playerClass: string = "";
  firstName: string = "";
  lastName: string = "";
  LawfulChaotic: string = "";
  GoodEvil: string = "";

  mainRaceBonus: string = "";
  secondaryRaceBonus: string = "";


  summarizeEntries() {
    this.playerSubRace = <string>this.PlayerRaceFormGroup.get("selectedSubRace")?.value;
    this.playerClass = <string> this.BasicInformationFormGroup?.get("playerClass")?.value;
    this.firstName = <string> this.BasicInformationFormGroup?.get("firstName")?.value;
    this.lastName = <string> this.BasicInformationFormGroup?.get("lastName")?.value;
    this.LawfulChaotic = <string> this.BasicInformationFormGroup?.get("LawfulChaotic")?.value;
    this.GoodEvil = <string> this.BasicInformationFormGroup?.get("GoodEvil")?.value;
    this.Age = <number> parseInt(<string>this.BasicInformationFormGroup!.get("Age")!.value);

    this.strength = parseInt(<string>this.StandardArrayFormGroup.get("baseStr")?.value);
    this.dexterity = parseInt(<string>this.StandardArrayFormGroup.get("baseDex")?.value);
    this.constitution = parseInt(<string>this.StandardArrayFormGroup.get("baseCon")?.value);
    this.intelligence = parseInt(<string>this.StandardArrayFormGroup.get("baseInt")?.value);
    this.wisdom = parseInt(<string>this.StandardArrayFormGroup.get("baseWis")?.value);
    this.charisma = parseInt(<string>this.StandardArrayFormGroup.get("baseCha")?.value);
    this.applyPrimaryRacialBonuses();
    this.applySecondaryRacialBonuses();
  }

  applyPrimaryRacialBonuses(){
    this.mainRaceBonus = <string> this.PlayerRaceFormGroup.get("mainRaceBonus")?.value;
    switch (this.mainRaceBonus) {
      case "Str":
        this.strength += 2;
        // console.log("Str: " + this.strength);
        break;
      case "Dex":
        this.dexterity += 2;
        // console.log("Dex: " + this.dexterity);
        break;
      case "Con":
        this.constitution += 2;
        // console.log("Con: " + this.constitution);
        break;
      case "Int":
        this.intelligence += 2;
        // console.log("Int: " + this.intelligence);
        break;
      case "Wis":
        this.wisdom += 2;
        // console.log("Wis: " + this.wisdom);
        break;
      case "Cha":
        this.charisma += 2;
        // console.log("Cha: " + this.charisma);
        break;
    }
  }

  applySecondaryRacialBonuses(){
    this.secondaryRaceBonus = <string> this.PlayerRaceFormGroup.get("secondaryRaceBonus")?.value;
    switch (this.secondaryRaceBonus) {
      case "Str":
        this.strength += 1;
        // console.log("Str: " + this.strength);
        break;
      case "Dex":
        this.dexterity += 1;
        // console.log("Dex: " + this.dexterity);
        break;
      case "Con":
        this.constitution += 1;
        // console.log("Con: " + this.constitution);
        break;
      case "Int":
        this.intelligence += 1;
        // console.log("Int: " + this.intelligence);
        break;
      case "Wis":
        this.wisdom += 1;
        // console.log("Wis: " + this.wisdom);
        break;
      case "Cha":
        this.charisma += 1;
        // console.log("Cha: " + this.charisma);
        break;
    }
  }


  private _filter(stringArray: string[], value: string): string[] {
    const filterValue = value.toLowerCase();

    return stringArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  onRaceSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedRace = event.option.viewValue;
    this.PlayerRaceFormGroup.get("selectedSubRace")?.reset();
    this.PlayerRaceFormGroup.get("mainRaceBonus")?.reset();
    this.PlayerRaceFormGroup.get("secondaryRaceBonus")?.reset();

    this.SubRaceOptions = RACE_DATA.get(this.selectedRace);

    if (RACE_DATA.get(this.selectedRace)?.bonuses?.[0] === bonusType.playerChoice){
      this.playerSelectedBonus = true;
      this.PlayerRaceFormGroup.get('mainRaceBonus')?.setValidators([Validators.required]);
      this.PlayerRaceFormGroup.get('secondaryRaceBonus')?.setValidators([Validators.required]);

      this.PlayerRaceFormGroup.get('mainRaceBonus')?.updateValueAndValidity();
      this.PlayerRaceFormGroup.get('secondaryRaceBonus')?.updateValueAndValidity();
    }
    else {
      this.playerSelectedBonus = false;
      this.PlayerRaceFormGroup.get('mainRaceBonus')?.setValidators(null);
      this.PlayerRaceFormGroup.get('secondaryRaceBonus')?.setValidators(null);


      this.PlayerRaceFormGroup.get("mainRaceBonus")?.setValue(<string>RACE_DATA.get(this.selectedRace)?.bonuses?.[0]);
      this.PlayerRaceFormGroup.get("secondaryRaceBonus")?.setValue(<string>RACE_DATA.get(this.selectedRace)?.bonuses?.[1]);

      this.PlayerRaceFormGroup.get('mainRaceBonus')?.updateValueAndValidity();
      this.PlayerRaceFormGroup.get('secondaryRaceBonus')?.updateValueAndValidity();
    }
  }
}
