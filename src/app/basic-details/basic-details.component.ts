import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
})
export class BasicDetailsComponent {
  constructor(private _snackBar: MatSnackBar) {}

  baseStr = -1;
  baseDex = -1;
  baseCon = -1;
  baseInt = -1;
  baseWis = -1;
  baseCha = -1;
  baseArrayCompleted = false;

  OnClick(baseStr: number, baseDex: number, baseCon: number, baseInt: number, baseWis: number, baseCha: number) {
    if (baseStr < 0 || baseStr > 20 || isNaN(baseStr)){
      this._snackBar.open("Check Base Strength Input");
    }
    else if (baseDex <= 0 || baseDex > 20|| isNaN(baseDex)){
      this._snackBar.open("Check Base Dexterity Input");
    }
    else if (baseCon <= 0 || baseCon > 20|| isNaN(baseCon) ){
      this._snackBar.open("Check Base Constitution Input");
    }
    else if (baseInt <= 0 || baseInt > 20|| isNaN(baseInt)){
      this._snackBar.open("Check Base Intelligence Input");
    }
    else if (baseWis <= 0 || baseWis > 20|| isNaN(baseWis)){
      this._snackBar.open("Check Base Wisdom Input");
    }
    else if (baseCha <= 0 || baseCha > 20|| isNaN(baseCha)){
      this._snackBar.open("Check Base Charisma Input");
    }
    else {
      this._snackBar.open("Successful Input");
      this.baseStr = baseStr;
      this.baseDex = baseDex;
      this.baseCon = baseCon;
      this.baseInt = baseInt;
      this.baseWis = baseWis;
      this.baseCha = baseCha;

      this.baseArrayCompleted = true;
    }
  }
}
