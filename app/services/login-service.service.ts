import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {


  constructor(private http : HttpClient) { }

  username : string;
  user_Pass : string;
  user_Pass_2 : string;
  first_Name : string;
  last_Name : string;
  email : string;

  login() {
    let url = "http://localhost:8082/users";
    console.log("this is login");
    return this.http.get(url);
   }

   checkLogin(l_user : string, l_pass : string){
     let url = "http://localhost:8082/login";
     console.log("Posty Post: " + l_user, l_pass);
     this.http.post(url, {"username" : l_user, "password" : l_pass}).subscribe( data => sessionStorage.setItem("User", JSON.stringify(data)));
    
   }


  // Attempt #567
  createTheAccount(username, user_Pass, first_Name, last_Name, email){
    let url = "http://localhost:8082/users";
    console.log("We be postin stuff");
    return this.http.post(url, {"firstName" : first_Name,  "lastName" : last_Name, "username" : username, "password" : user_Pass, "email" : email}).subscribe( data => {console.log("POST sent");})
  }

};
