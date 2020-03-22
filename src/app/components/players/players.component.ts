import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {PlayersService} from '../../services/players.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlayerComponent} from "../../components/player/player.component";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players:any  []=[];
  displayedColumns: string[] = ['first_name', 'last_name', 'position','height_feet','height_inches', 'weight_pounds','actions'];
  private dataSource;

  player:Player={
    first_name: '',
    last_name: '',
    position: '',
    height_feet: null,
    height_inches: null,
    weight_pounds:null,
  };


  constructor(public dialog: MatDialog, private router:Router,private _ps:PlayersService) {
    this._ps.getAllPlayers().subscribe( data =>{
      console.log('List Players');
      this.players = data['data'];
      //console.log(this.players);
      this.dataSource = new MatTableDataSource(this.players);
      if(this.player)
        this._ps.setAllPlayers(this.players);
    });


  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  NewPlayer(): void {
    const dialogRef = this.dialog.open(PlayerComponent, {
      width: '420px',
      height:'auto',
      data: {
            first_name: this.player.first_name,
            last_name: this.player.last_name,
            position: this.player.position,
            height_feet: this.player.height_feet,
            height_inches: this.player.height_inches,
            weight_pounds:this.player.weight_pounds
          }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.player.first_name = result;
      console.log('The dialog was closed new player:'+this.player.first_name);
    });

  }

}

export interface Player {
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds:number;
}
