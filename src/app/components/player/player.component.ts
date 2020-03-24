import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlayersService} from '../../services/players.service';
import { Player } from '../../interfaces/player.interface';

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
    {value: 'C-F', viewValue: 'C-F'},
    {value: 'F-C', viewValue: 'F-C'},
    {value: 'G-F', viewValue: 'G-F'},
  ];

  update=false;

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
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.f = fb.group({
        first_name : this.first_name,
        last_name: this.last_name,
        position : this.position,
        height_feet : this.height_feet,
        height_inches : this.height_inches,
        weight_pounds : this.weight_pounds
      });

      if(data.update){
        this.updatePlayerLoading(data.id);
        this.update=true;
      }
    }

    Save(){
      this.player.first_name = this.f.value.first_name,
      this.player.last_name= this.f.value.last_name,
      this.player.position = this.f.value.position,
      this.player.height_feet = this.f.value.height_feet,
      this.player.height_inches = this.f.value.height_inches,
      this.player.weight_pounds = this.f.value.weight_pounds

      //UPDATA OR CREATE
      if(this.update){
        this._ps.UpdatePlayer(this.data.id,this.player).subscribe(data =>
        {
            //console.log('save new player'+data);
            this._snackBar.open('Player updated!!!', 'success', {
              duration: 2000,
            });
            this.dialogRef.close();
        },error => console.log('Error editing player!!!: '+error));
      }else{
        this._ps.newPlayer(this.player).subscribe(data =>
        {
            this._snackBar.open('New player saved.', 'success', {
              duration: 2000,
            });
            this.dialogRef.close();
        },error => console.log('Error add new player: '+error));
      }
    }

    Cancel(): void {
      this.dialogRef.close();
    }

    updatePlayerLoading(id){
      this._ps.getPlayer(id).subscribe(data=>{
        this.f.reset({
          first_name : data.first_name,
          last_name : data.last_name,
          position : data.position,
          height_feet : data.height_feet,
          height_inches : data.height_inches,
          weight_pounds : data.weight_pounds,
        });

      })
    }

    ngOnInit() {
    }

}

interface OptionPosition {
  value: string;
  viewValue: string;
}
