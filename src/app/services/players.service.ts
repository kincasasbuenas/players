import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playersURL:string ="https://www.balldontlie.io/api/v1/players";
  apiURL = 'http://localhost:3000';



  constructor(private http:HttpClient) { }

    // HttpClient API get() method => Get players list
    getAllPlayers(): Observable<Player> {
      return this.http.get<Player>(this.apiURL + '/data').pipe(map(res =>res));
    }

    // HttpClient API post() method => Add new player
    newPlayer(player:Player): Observable<Player> {
      let body =JSON.stringify(player);
      let headers= new HttpHeaders({
        'Content-Type':'application/json'
      });
      return this.http.post<Player>(this.apiURL + '/data', body, {headers}).pipe(map(res => res));
    }

    // HttpClient API delete() method => Delete player
    deletePlayer(id){
      let headers= new HttpHeaders({
        'Content-Type':'application/json'
      });
      return this.http.delete<Player>(this.apiURL + '/data/' + id,{headers}).pipe(map(res => res));
    }

    // HttpClient API put() method => Update player
    UpdatePlayer(id, player): Observable<Player> {
      let body =JSON.stringify(player);
      let headers= new HttpHeaders({
        'Content-Type':'application/json'
      });
      return this.http.put<Player>(this.apiURL + '/data/' + id, body, {headers}).pipe(map(res => res));
    }

    // HttpClient API get() method => Get player
    getPlayer(id): Observable<Player> {
      return this.http.get<Player>(this.apiURL + '/data/' + id).pipe(map(res => res));
    }

}
