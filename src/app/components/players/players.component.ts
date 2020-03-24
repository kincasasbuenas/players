import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {PlayersService} from '../../services/players.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlayerComponent} from "../../components/player/player.component";
import {ConfirmationDeleteComponent} from "../../components/confirmation-delete/confirmation-delete.component";
import { DetailsPlayerComponent } from '../../components/details-player/details-player.component';
import {MatTableDataSource} from '@angular/material/table';
import { Player } from '../../interfaces/player.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players:Player []=[];
  displayedColumns: string[] = ['first_name', 'last_name', 'position','height_feet','height_inches', 'weight_pounds','actions'];
  private dataSource;

  player:Player={
    id:null,
    first_name: '',
    last_name: '',
    position: '',
    height_feet: null,
    height_inches: null,
    weight_pounds:null,
  };


  constructor(public dialog: MatDialog, private router:Router,private _ps:PlayersService) {
    this.loadPlayers();
  }

  ngOnInit() {
  }

  // Get players list
  loadPlayers() {
    return this._ps.getAllPlayers().subscribe( data =>{
        this.players = data as any;
        this.dataSource = new MatTableDataSource(this.players);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  NewPlayer(): void {
    let dialogRef = this.dialog.open(PlayerComponent, {
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
      if(result!==''){
        this.loadPlayers();
      }else{
        console.log('The dialog was closed new player:'+this.player.first_name);
      }
    });
  }

  editPlayer(id) {
    let dialogRef = this.dialog.open(PlayerComponent, {
      width: '420px',
      height:'auto',
      data: {
            id: id,
            update:true
          }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadPlayers();
    });

  }

  // View player
  viewPlayer(id) {
    let dialogRef = this.dialog.open(DetailsPlayerComponent, {
      width: '400px',
      height:'auto',
      data:{
        id:id
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  // Delete player
  deletePlayer(id) {
    let dialogRef = this.dialog.open(ConfirmationDeleteComponent, {
      width: '350px',
      height:'auto',
      data:{
        id:id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let res = result;
      if(res > 0){
        this._ps.deletePlayer(id).subscribe(data => {
          this.loadPlayers();
        });
      }
    });
  }

}
