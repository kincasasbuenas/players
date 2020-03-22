import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlayersService} from '../../services/players.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player:Player={
    id:null,
    first_name: '',
    last_name: '',
    position: '',
    height_feet: null,
    height_inches: null,
    weight_pounds:null,
  }

  selectedValue: string;
  selectedCar: string;

  optionsp: OptionPosition[] = [
    {value: 'G', viewValue: 'G'},
    {value: 'F', viewValue: 'F'},
    {value: 'CF', viewValue: 'C-F'}
  ];

  f:FormGroup;
  first_name = new FormControl('', [Validators.required,]);
  last_name = new FormControl('', [Validators.required,]);
  position = new FormControl('', Validators.required);
  height_feet = new FormControl('');
  height_inches = new FormControl('');
  weight_pounds = new FormControl('');

  constructor(
    private _snackBar: MatSnackBar,
    private _ps:PlayersService,
    fb: FormBuilder,
    public dialogRef: MatDialogRef<PlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player) {
      this.f = fb.group({
        first_name : this.first_name,
        last_name: this.last_name,
        position : this.position,
        height_feet : this.height_feet,
        height_inches : this.height_inches,
        weight_pounds : this.weight_pounds
      });
    }

    Save(){
      console.log('Formulario enviado');
      //console.log("valores: ", this.f.value);
      this.player.first_name = this.f.value.first_name,
      this.player.last_name= this.f.value.last_name,
      this.player.position = this.f.value.position,
      this.player.height_feet = this.f.value.height_feet,
      this.player.height_inches = this.f.value.height_inches,
      this.player.weight_pounds = this.f.value.weight_pounds
      //console.log(this.player);
      this._ps.newPlayer(this.player).subscribe(data =>
      {
          //console.log('save new player'+data);
          this._snackBar.open('New player saved.', 'success', {
            duration: 2000,
          });
          this.dialogRef.close();
      },error => console.log('Error add new player: '+error));
      //this.dialogRef.close();
    }

    Cancel(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
    }

}

export interface Player {
  id:number,
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds:number;
}

interface OptionPosition {
  value: string;
  viewValue: string;
}
