import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private http : HttpClient) { }

  leaderboard = document.getElementById("leaderboard_");
  playGame = document.getElementById("play_game");

  disabled = true;

  ngOnInit() {
    this.validateLogin();
   // window.location.reload();
  }

  getLeaderboard(){
    console.log("Loading Table");
    // this.http.get(this.url).subscribe (data => {
    //   console.log(data);
    // });
  }

  validateLogin(){
    console.log(this.disabled);
    if (sessionStorage.getItem("User") !== null){
      this.disabled = false;
      console.log(this.disabled);
    } else {
      this.disabled = true;
      console.log(this.disabled);
    }
  };

  logOut() {
    sessionStorage.clear();
    //window.location.reload();
  }

  enabled(){
    this.disabled = false;
  }

  reloadPage(){
    window.location.reload();
  }

}
