import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as socketIO from "socket.io-client";

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss']
})
export class SocketComponent implements OnInit {

  // Equivalent of document.getElementById
 
  @ViewChild("direction", {static: false}) private direct: ElementRef;
  @ViewChild("hi", {static: false}) private hello: ElementRef;

  private socket: any;
  title = 'ByteSizeGames';


  // Initialize connection          
  ngOnInit(){

    this.socket = socketIO('http://localhost:3000');
    //this.socket.on("hello", (data) => console.log(data.msg));

  }

  // This function allows for socket function after page has loaded
  public ngAfterViewInit() {

    this.socket.on("hello", function(data) {
      console.log(data);
    });

    this.socket.on("printDirection", (data) => {
        //this.direct.nativeElemt.innerHTML = data.direction;
        console.log("Data in app is " + data);

        // Change h3 element value to data
        this.direct.nativeElement.innerHTML = data;
      });
  }

  // When a button is pressed, this function is called
public move(direction : string) {
  this.socket.emit("move", direction)
}

}
