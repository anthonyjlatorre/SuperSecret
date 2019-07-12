import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ModalModule } from 'ngx-bootstrap/modal'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginServiceService } from './services/login-service.service';
import { QuestionService } from './services/question.service';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayComponent } from './components/play/play.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { GameComponent } from './components/game/game.component';
import { ChatDemoComponent } from './components/chat-demo/chat-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    LeaderboardComponent,
    PlayComponent,
    LobbyComponent,
    GameComponent,
    ChatDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [LoginServiceService, QuestionService, NavComponent, LobbyComponent, PlayComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
