import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/Question';
import { Result } from 'src/app/models/Question';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ElementRef, ViewChild } from '@angular/core';
import * as socketIO from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { noConflict } from 'q';
import { LobbyComponent } from '../lobby/lobby.component';
import { Router } from '@angular/router';


export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 60});
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild("message", {static: false})  message: ElementRef;
  
  @ViewChild("chat", {static: false})  chat: ElementRef;
  @ViewChild("username", {static: false})  username: ElementRef;
  @ViewChild("send", {static: false})  send_Btn: ElementRef;
  @ViewChild("output", {static: false})  output: ElementRef;
  @ViewChild("feedback", {static: false})  feedback: ElementRef;
  
  private socket: any;
  title = 'ByteSizeGames';

  res_ : Result[] = [{  
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correctAnswer: ""}];

  question_: Question = {results: this.res_};
  modalRef: BsModalRef;
  questions_: Question[] = [];
  question_Asked: boolean = false;

  q_ : Result = { category: "",
  type: "",
  difficulty: "",
  question: "",
  correctAnswer: ""};

  counter = 5;
  round = 0;
  show_answer : boolean = false;
  user_answer : string;
  answers : string[];
 
  theQuestions : string[];
  theQuestion : string;

  btnOne;
  btnTwo;
  btnThree;
  btnFour;

  correctAnswer;
  arrayItem;

  curUser;
  curUserId;
  curUserAnswer : string;
  answerBelongsTo;
  allUsernames;
  allAnswers;

  hostIsConnected : boolean;
  allUsers;
  numOfUsers;
  disabled: boolean;
  choicemade: boolean;

  questionCounter = 0;


  constructor(private modalService: BsModalService, private questionService: QuestionService, private http : HttpClient, private lobby : LobbyComponent, private router : Router) { }

  userKey : any = {};

  fisherYates(array) {
    let count = array.length,
      randomnumber,
      temp;
    while (count) {
      randomnumber = (Math.random() * count--) | 0;
      temp = array[count];
      array[count] = array[randomnumber];
      array[randomnumber] = temp;
    }
  }

  ngOnInit() {
    this.timer();
    this.progressBarType = "";
    this.socket = socketIO('http://localhost:3000');
    this.getTokens();
    this.curUser = JSON.parse(sessionStorage.getItem("User"));
    this.curUserId = this.curUser.userId;
    this.getUsers();
    if (sessionStorage.getItem("Host") !== null) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    this.answerBelongsTo = this.curUser.username;
    this.allUsernames = [];
    this.allAnswers = [];
    this.choicemade = false;
  }

  public ngAfterViewInit() { 
    // Listen for events
    this.socket.on('chat', (data) => {
    this.feedback.nativeElement.innerHTML = '';
    this.user_answer = this.output.nativeElement.innerHTML += data.msg + "_$%";
   // this.userKey[this.curUserId] = data.msg;
    });
 
    this.socket.on('typing', (data) => {
      this.feedback.nativeElement.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });

    this.socket.on('broadcast', (data) => {
      console.log("CLIENTS: " + data);
   });

   this.socket.on('back_to_lobby', (data) =>{
    console.log(data);
    this.router.navigate([data])
});

  }

  isTyping() {
      this.socket.emit('typing', this.username.nativeElement.value);
  }

  assignHost() {
    console.log("This is dumb");
    this.socket.emit('broadcast',function(data) {
      console.log("ASSIGN HOST DATA: " + data);
   });
  }
  

  getUsers(){
    let url = "http://localhost:8082/token";
    this.http.get(url).subscribe(data => {
      console.log("ALL USERS DATA: " + data);
     // this.allUsers.push(data);
     this.allUsers = data;
     let counter = 0;
     for(let varName in this.allUsers){
      this.allUsernames.push(varName);
      counter++;
      console.log("User: " + varName);
    };
    console.log("COUNTER: " + counter);
    console.log("USERS: " + this.allUsernames);
    console.log("Getting all tokens: " + counter
    );
      console.log(this.allUsers);
    //  console.log("LENGTH: " + this.allUsers.length);
      if (counter === 1){
        console.log("Inside if counter === 1");
        url = "http://localhost:8082/token/" + this.curUserId;
        this.http.put(url, {"userId" : this.curUserId}).subscribe(data => {
          console.log("DATA: " + data);
          sessionStorage.setItem("Host", data.toString());
        })
      }
    })
  }

  initializeQuestions() {
    if (sessionStorage.getItem("Host") !== null){
    let url = "http://localhost:8082/socket";
    this.http.get(url).subscribe(data => {
    });
  }
  }

  getTokens(){

    // Pages have different questions... I locked the windows so you can't jump. Sorry.
    // let url = "http://localhost:8082/socket/okok";
    // this.http.get(url).subscribe(data =>{
      // this.theQuestion = (JSON.parse(data[2]).results)[0].question;
      // this.correctAnswer = ((JSON.parse(data[2]).results)[0].correct_answer);

      let url = "http://localhost:8082/socket/ie";
      this.http.get(url).subscribe(data =>{
       // console.log(("Full: " + JSON.parse(data[2]).results)[0]);
      //  console.log((JSON.parse(data[2]).results)[0].question);
      //  console.log((JSON.parse(data[2]).results)[0].correct_answer);
        this.theQuestion = (JSON.parse(data[this.questionCounter]).results)[0].question;
        this.correctAnswer = ((JSON.parse(data[this.questionCounter]).results)[0].correct_answer);
        document.getElementById("questionDiv").innerHTML = this.theQuestion;
    })
  }

  sendMsg(){  
    this.socket.emit('chat', 
      {msg: this.message.nativeElement.value, 
        username: this.username.nativeElement.value
      });
      this.curUserAnswer = this.message.nativeElement.value;
     // this.userKey[this.curUserId] = this.curUserAnswer;
      //this.allAnswers.push(this.userKey);
      //console.log(this.userKey);
      console.log(this.allAnswers);
    this.message.nativeElement.value = "";
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  delayModal(temp) {
    setTimeout(function() {this.openModalWithClass(temp)}, 10000);
  }

  progressBarClass = "progress-bar progress-bar-striped progress-bar-animated active";

  reply: string;
  progressBarType: string = "";
  show: boolean = false;
  counterReachesZero = true;



  selection(selected : string){
    let selectedBtn = document.getElementById(selected);
    console.log(this.allAnswers);

    this.choicemade = true;
    for (let varAnswer in this.allUsernames) {
      console.log("VARANSWER: " + varAnswer);
      console.log("SELECTED: " + selectedBtn.innerHTML);
      console.log("ANSWER: " + this.userKey[this.allUsernames[varAnswer]]);
      if (selectedBtn.innerHTML === this.userKey[this.allUsernames[varAnswer]]){
        console.log(this.allUsernames[varAnswer] + " Id Chosen ");
        this.disabled = true;
        let url = "http://localhost:8082/game/" + this.allUsernames[varAnswer];
        this.http.post(url, {"truePoint" : true}).subscribe(data => {
          console.log(url);
        });
    } else if (selectedBtn.innerHTML === this.correctAnswer && sessionStorage.getItem("Host") !== null){
      console.log("CORRECT ANSWER CHOSEN");
      let url = "http://localhost:8082/game/" + this.curUserId;
      this.http.post(url, {"truePoint" : true}).subscribe(data => {
        console.log(url);
      });
    }
    }
  }

  playAgain(){
    console.log("Play Again");
    //this.questionCounter++;
    this.initializeQuestions();
    this.socket.emit("back_lobby", "holder");
    //this.getTokens();
    //this.lobby.startGame();
    
  }

  timer() {
        let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            console.log(this.counter)
            if(this.counter === 0 && this.round === 0) {
              //clearInterval(intervalId)
              if (sessionStorage.getItem("Host") === null) {
              this.show = !this.show;
            }
              this.counter = 10;
              this.round++;
            } else if (this.counter === 0 && this.round === 1){
            //  this.show = !this.show;
              if (this.answers !== null) {
                this.answers = this.user_answer.split("_$%");
              }
              console.log("THIS ANSWERS 2: " + this.answers);
              console.log("ALL USERNAMES: " + this.allUsernames);

              for (let i = 0; i < this.answers.length; i++){
                this.userKey[this.allUsernames[i]] = this.answers[i];
              }
              this.allAnswers.push(this.userKey);

              console.log(this.allAnswers);
              console.log(this.userKey[this.allUsernames[0]]);
              this.counter = 3;
              this.round++;

            } else if (this.counter === 0 && this.round === 2){
              clearInterval(intervalId);
              this.displayAnswers();
              this.show_answer = !this.show_answer;
              console.log("ROUND 2");
            }

        }, 1000)
    }

    
    displayAnswers() {
      this.btnOne = document.getElementById('btnOne');
      this.btnTwo = document.getElementById("btnTwo");
      this.btnThree = document.getElementById("btnThree");
      this.btnFour = document.getElementById("btnFour");
      let conOne = this.answers[0].toString();
      let conTwo = this.answers[1].toString();
      this.btnOne.innerHTML =  this.answers[0].toString();
      this.btnTwo.innerHTML = this.answers[1].toString();
      this.btnThree.innerHTML = this.answers[2].toString();
      this.btnFour.innerHTML = this.correctAnswer.toString();
    };

  saveAnswer() {
    console.log("saveAnswer is running");
  }

  getAnswer(answer_ : string) {
    this.user_answer = answer_;
  }

  getQuestions() {
    this.questionService.getQuestion()
     .then((all_Questions)=>{
      console.log(all_Questions.results[3]);
      this.question_ = all_Questions[0];
      console.log(all_Questions);
      this.q_ = all_Questions.results[3];
      console.log(this.q_);
      this.question_Asked = true;
    })

  }
  

}