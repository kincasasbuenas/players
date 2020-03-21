import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {PlayersService} from '../../services/players.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlayerComponent} from "../../components/player/player.component";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players:any  []=[];
  displayedColumns: string[] = ['first_name', 'last_name', 'position','height_feet','height_inches', 'weight_pounds'];
  dataSource:any []=[];

  player:Players={
    first_name: '',
    last_name: '',
    position: '',
    height_feet: null,
    height_inches: null,
    weight_pounds:null,
  };

  //data new player
  name: string;
  lastname: string;

  constructor(public dialog: MatDialog, private router:Router,private _ps:PlayersService) {
    this._ps.getAllPlayers().subscribe( data =>{
      console.log('List Players');
      this.players = data['data'];
      //console.log(this.players);
      this.dataSource = this.players;
      if(this.player)
        this._ps.setAllPlayers(this.players);
    });


  }

  ngOnInit() {
  }

  NewPlayer(): void {
    const dialogRef = this.dialog.open(PlayerComponent, {
      width: '350px',
      data: {name: this.name, lastname: this.lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

}

export interface DialogData {
  name: string;
  lastname: string;
}

export interface Players {
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds:number;
}
