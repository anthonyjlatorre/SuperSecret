import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { async, timeout } from 'q';
import { timer } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { NavComponent } from '../nav/nav.component';
import { PlayComponent } from '../play/play.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalRef: BsModalRef;
  users : object; 


  username : string;
  user_Pass : string;
  user_Pass_2 : string;
  first_Name : string;
  last_Name : string;
  email : string;
  add_border : string;
  path_ : string;
  //user;
  createAccountError : string;

  counter = 5;

  constructor(private modalService: BsModalService, private LoginService: LoginServiceService, private router: Router,
    private route: ActivatedRoute, private http : HttpClient, private navComp : NavComponent, private play : PlayComponent) {}
 
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit() {
    if(sessionStorage.getItem("User")!== null){
      this.router.navigateByUrl('/play');

    }
  }



   doLogin(username_ : string, password_ : string){
    let url = "http://localhost:8082/login";
    this.http.post(url, {"username" : username_, "password" : password_}).subscribe(data => {
    sessionStorage.setItem("User", JSON.stringify(data));
    let user = JSON.parse(sessionStorage.getItem("User"));
    if (user === null || user.firstName === null ||user.lastName === null) {
      sessionStorage.removeItem("User");
      this.path_ = '/login';
      console.log(sessionStorage.length)
      window.sessionStorage.clear();
      localStorage.clear();
      }
    else{
      this.navComp.validateLogin();
      this.path_ = '/play';
      console.log(this.path_);
      this.router.navigateByUrl('/play');
      //this.play.reloadPage();
      this.navComp.reloadPage();
    }
    });
  }
  submitForm(username : string, user_Pass : string, first_Name : string, last_Name, email : string) {
    console.log("Form submitted" + "Login.components.ts  out of sub");
    if (username === "" || user_Pass === "" || first_Name === "" || last_Name === "" || email === ""){
      console.log("You done messed up");
      this.createAccountError = "Please enter valid information";
    } else {
    this.LoginService.createTheAccount(username, user_Pass, first_Name, last_Name, email);
    console.log("Yo these null? " + username, user_Pass, first_Name, last_Name, email);
    }
  }
  
   
  
}

  


