import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions : object

  constructor(private data: DataService ) { }

  ngOnInit() {

    this.data.getQuestions().subscribe( data => {
      this.questions = data
      console.log(this.questions)
    }) 
  }

}
