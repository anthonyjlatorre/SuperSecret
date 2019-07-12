import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as socketIO from "socket.io-client";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  private socket: any;

  curUserId;
  curUser;


  constructor (private router: Router, private http : HttpClient) {}

  ngOnInit() {
    this.curUser = JSON.parse(sessionStorage.getItem("User"));
    this.curUserId = this.curUser.userId;
    this.socket = socketIO('http://localhost:3000');
  }

  public ngAfterViewInit() {
    console.log("NgAfter Running");
    this.socket.on('start_game', (data) =>{
      console.log(data);
      this.router.navigate([data])
  });
  }

  startGame() {
    this.socket.emit("start_pushed", "holder");
    let url = "http://localhost:8082/token/" + this.curUserId;
        this.http.put(url, {"userId" : this.curUserId}).subscribe(data => {
          console.log("DATA: " + data);
          sessionStorage.setItem("Host", data.toString());
        })
}


}
