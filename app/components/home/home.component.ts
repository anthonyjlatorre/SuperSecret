import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/Question';
import { Result } from 'src/app/models/Question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  res_ : Result[] = [{  
    category: "",
    type: "",
    difficulty: "",
    question: "",
    correctAnswer: ""}];

  
  question_: Question = {results: this.res_};

  questions_: Question[] = [];

  q_ : Result = { category: "",
  type: "",
  difficulty: "",
  question: "",
  correctAnswer: ""};

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  getQuestions() {
    this.questionService.getQuestion()
     .then((all_Questions)=>{
      console.log(all_Questions.results[3]);
      this.question_ = all_Questions[0];
      console.log(all_Questions);
      this.q_ = all_Questions.results[3];
      console.log(this.q_);
    })

  }

}
