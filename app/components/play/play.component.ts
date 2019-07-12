import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  modalRef: BsModalRef;
  gameCode: string = "";
  gc1: number;
  gc2: number;
  gc3: number;
  gc4: number;
  gc5: number;

  questions;

  // Set this url to the correct server side url
  url: string;


  constructor(private modalService: BsModalService, private http : HttpClient) { }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  generateGC() {
    this.gc1 = Math.floor(Math.random() * 9) + 1;
    this.gc2 = Math.floor(Math.random() * 9) + 1;  
    this.gc3 = Math.floor(Math.random() * 9) + 1;  
    this.gc4 = Math.floor(Math.random() * 9) + 1;  
    this.gc5 = Math.floor(Math.random() * 9) + 1;    
    this.gameCode = String(this.gc1) + String(this.gc2) + String(this.gc3) + String(this.gc4) + String(this.gc5);
    console.log(this.gameCode);
   // Throws -- ERROR TypeError: Cannot read property 'toLowerCase' of undefined
    // return this.http.post(this.url, {"HostToken" : this.gameCode}).subscribe( data => sessionStorage.setItem("HostToken", JSON.stringify(data)));

  }


  ngOnInit() {
    this.getToken();
  }

  getTokens(){
    let url = "http://localhost:8082/socket/ie";
    this.http.get(url).subscribe(data =>{
      console.log(data);
    })
  }

  reloadPage(){
    window.location.reload();
  }


  getToken(){
    if(sessionStorage.getItem("token") === null){
      let url ="http://localhost:8082/token";
      let user = JSON.parse(sessionStorage.getItem("User"));
     // console.log(user.userId);
      this.http.post(url, user.userId).subscribe(data =>{
      //  console.log(data);
        //logic for gettin that token shit
      });
    }
  }


}
