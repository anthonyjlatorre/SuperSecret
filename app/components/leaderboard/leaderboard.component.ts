import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  url = "";

users = [{
  rank : 0,
  username : "",
  totPoints : 0
}];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getLeaderboard(){
    console.log("Loading Table");
    // this.http.get(this.url).subscribe (data => {
    //   console.log(data);
    // });
  }

}
