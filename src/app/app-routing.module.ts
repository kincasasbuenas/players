import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent} from "./components/players/players.component";
import { PlayerComponent} from "./components/player/player.component";
import { ConfirmationDeleteComponent} from "./components/confirmation-delete/confirmation-delete.component";
import { DetailsPlayerComponent} from "./components/details-player/details-player.component";

const routes: Routes = [
  {path:'players', component: PlayersComponent},
  {path:'player/:id', component: PlayerComponent},
  {path:'confirmation_delete/:id', component: ConfirmationDeleteComponent},
  {path:'view_player/:id', component: DetailsPlayerComponent},
  { path: '**', pathMatch:'full', redirectTo:'players'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
