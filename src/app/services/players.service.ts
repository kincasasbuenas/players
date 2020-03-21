import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playersURL:string ="https://www.balldontlie.io/api/v1/players";

  playersJSON:string = "https://players-976d7.firebaseio.com";
  playersJSON_URI:string = "https://players-976d7.firebaseio.com/players";

  constructor(private http:HttpClient) { }

  getAllPlayers(){
    return this.http.get(this.playersURL).pipe(map(res =>res));
  }

  setAllPlayers(player:any){
      console.log('List All Players');
      let body ='';
      let headers= new HttpHeaders({
        'Content-Type':'application/json'
      });

      player.forEach(function (value) {
        delete value.team;
        //console.log(value);
        body = JSON.stringify(value);
        console.log(body);
      });

      return this.http.post(`${this.playersJSON}/players.json`, body, {headers}).pipe(map(res => res));
    }

    newPlayer(player:Players){
        console.log('Add new Player');
        let body =JSON.stringify(player);;
        let headers= new HttpHeaders({
          'Content-Type':'application/json'
        });
        return this.http.post(`${this.playersJSON}/players.json`, body, {headers}).pipe(map(res => res));
    }

}

export interface Players {
  id:number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds:number;
}
