import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlayersService} from '../../services/players.service';

@Component({
  selector: 'app-details-player',
  templateUrl: './details-player.component.html',
  styleUrls: ['./details-player.component.css']
})
export class DetailsPlayerComponent implements OnInit {

  playerData: any = {};

  constructor(public dialogRef: MatDialogRef<DetailsPlayerComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _ps:PlayersService) {
    this.viewPlayer(data.id);
  }

  ngOnInit() {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

  viewPlayer(id){
    console.log('Detail Player:');
    this._ps.getPlayer(id).subscribe((data: {}) => {
      this.playerData = data;
      console.log(this.playerData);
    })
  }


}
