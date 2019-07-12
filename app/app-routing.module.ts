import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayComponent } from './components/play/play.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [ {
  path: 'home',
  component: HomeComponent
},{
  path: 'login',
  component: LoginComponent
}, {
  path: 'leaderboard',
  component: LeaderboardComponent
}, {
  path: 'play',
  component: PlayComponent
}, {
  path: 'lobby',
  component: LobbyComponent
}, {
  path: 'game',
  component: GameComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
